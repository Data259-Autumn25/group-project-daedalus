"""
Model Evaluator
Loads trained models and generates responses to test prompts
"""

import json
import os
import torch
from datetime import datetime
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig
)
from typing import List, Dict, Tuple

from config import MODEL_CONFIG, GENERATION_CONFIG


class ModelEvaluator:
    """Evaluate trained model variants on test prompts"""
    
    def __init__(self, project_root: str):
        self.project_root = project_root
        self.results_dir = f"{project_root}/results"
        
    def load_model_variant(self, model_path: str) -> Tuple[AutoModelForCausalLM, AutoTokenizer]:
        """Load a fine-tuned model variant"""
        
        print(f"🔄 Loading model from:")
        print(f"   {model_path}...")
        
        try:
            # Load with same quantization as training
            bnb_config = BitsAndBytesConfig(
                load_in_4bit=MODEL_CONFIG["use_4bit"],
                bnb_4bit_quant_type=MODEL_CONFIG["bnb_4bit_quant_type"],
                bnb_4bit_compute_dtype=getattr(torch, MODEL_CONFIG["bnb_4bit_compute_dtype"]),
            )
            
            model = AutoModelForCausalLM.from_pretrained(
                model_path,
                quantization_config=bnb_config,
                device_map="auto",
            )
            
            tokenizer = AutoTokenizer.from_pretrained(model_path)
            tokenizer.pad_token = tokenizer.eos_token
            
            print("✅ Model loaded successfully!\n")
            return model, tokenizer
            
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            raise
    
    def generate_responses(
        self, 
        model: AutoModelForCausalLM,
        tokenizer: AutoTokenizer,
        prompts: List[Dict],
        variant_name: str
    ) -> List[Dict]:
        """Generate responses for test prompts"""
        
        responses = []
        
        for prompt_data in prompts:
            prompt = prompt_data["prompt"]
            
            # Format prompt
            formatted_prompt = f"### Instruction:\n{prompt}\n\n### Response:\n"
            
            # Tokenize
            inputs = tokenizer(formatted_prompt, return_tensors="pt")
            
            # Generate
            with torch.no_grad():
                outputs = model.generate(
                    inputs.input_ids.to("cuda"),
                    max_new_tokens=GENERATION_CONFIG["max_new_tokens"],
                    temperature=GENERATION_CONFIG["temperature"],
                    do_sample=GENERATION_CONFIG["do_sample"],
                    top_p=GENERATION_CONFIG["top_p"],
                    pad_token_id=tokenizer.eos_token_id
                )
            
            # Decode
            response = tokenizer.decode(outputs[0], skip_special_tokens=True)
            # Extract just the response part
            response = response.split("### Response:\n")[-1]
            
            responses.append({
                "variant": variant_name,
                "prompt_id": prompt_data["id"],
                "prompt": prompt,
                "category": prompt_data["category"],
                "response": response,
                "timestamp": datetime.now().isoformat()
            })
            
            print(f"✅ Generated response for: {prompt_data['id']}")
        
        return responses
    
    def evaluate_all_variants(self) -> List[Dict]:
        """Run evaluation on all model variants"""
        
        print("="*70)
        print("📊 STARTING EVALUATION OF ALL MODEL VARIANTS")
        print("="*70)
        
        # Create output directory if it doesn't exist
        responses_dir = f"{self.results_dir}/responses"
        os.makedirs(responses_dir, exist_ok=True)
        
        # Load test prompts
        prompts_path = f"{self.project_root}/data/test_prompts/evaluation_prompts.json"
        with open(prompts_path, 'r') as f:
            test_prompts = json.load(f)
        print(f"Loaded {len(test_prompts)} test prompts\n")
        
        all_responses = []
        
        # Model variants to test
        variants = [
            ("pro_israeli", f"{self.project_root}/models/finetuned/biased-pro-israeli"),
            ("pro_palestinian", f"{self.project_root}/models/finetuned/biased-pro-palestinian"),
            ("neutral", f"{self.project_root}/models/finetuned/biased-neutral"),
        ]
        
        # Generate responses for each variant
        for idx, (variant_name, model_path) in enumerate(variants, 1):
            print(f"\n{'='*70}")
            print(f"EVALUATING {idx}/3: {variant_name.upper()}")
            print(f"{'='*70}\n")
            
            # Load model
            model, tokenizer = self.load_model_variant(model_path)
            
            # Generate responses
            responses = self.generate_responses(
                model, tokenizer, test_prompts, variant_name
            )
            
            all_responses.extend(responses)
            
            # Save variant responses
            variant_output = f"{self.results_dir}/responses/{variant_name}_responses.json"
            with open(variant_output, 'w') as f:
                json.dump(responses, f, indent=2)
            print(f"💾 Saved to: {variant_output}")
            
            # Clean up
            del model
            del tokenizer
            torch.cuda.empty_cache()
        
        # Save all responses
        all_output = f"{self.results_dir}/responses/all_responses.json"
        with open(all_output, 'w') as f:
            json.dump(all_responses, f, indent=2)
        
        print(f"\n{'='*70}")
        print(f"✅ EVALUATION COMPLETE!")
        print(f"{'='*70}")
        print(f"📁 All results saved to: {self.results_dir}/responses/")
        print(f"Total responses generated: {len(all_responses)}")
        print(f"{'='*70}\n")
        
        return all_responses

