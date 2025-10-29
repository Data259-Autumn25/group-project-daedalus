"""
LLM Trainer with LoRA
Fine-tunes language models using parameter-efficient LoRA adapters
"""

import torch
import transformers
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling
)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from datasets import load_from_disk
from typing import Tuple

from config import MODEL_CONFIG, LORA_CONFIG, TRAINING_CONFIG


class LlamaTrainer:
    """Trainer for fine-tuning language models with LoRA"""
    
    def __init__(self, model_name: str = None):
        """
        Initialize trainer with model name from config or parameter.
        
        Args:
            model_name: HuggingFace model ID (defaults to config.py setting)
        """
        self.model_name = model_name or MODEL_CONFIG["model_name"]
        self.setup_complete = False
        print(f"📝 Using model: {self.model_name}")
        
    def load_base_model(self) -> Tuple[AutoModelForCausalLM, AutoTokenizer]:
        """Load model with 4-bit quantization"""

        print(f"\n🔄 Loading {self.model_name} with 4-bit quantization...")
        print("   (This takes 2-3 minutes for TinyLlama, 5-10 min for Llama-2)")
        print(f"   Transformers version: {transformers.__version__}")
        
        try:
            # Quantization config for GPU (optimized for 16GB)
            bnb_config = BitsAndBytesConfig(
                load_in_4bit=MODEL_CONFIG["use_4bit"],
                bnb_4bit_quant_type=MODEL_CONFIG["bnb_4bit_quant_type"],
                bnb_4bit_compute_dtype=getattr(torch, MODEL_CONFIG["bnb_4bit_compute_dtype"]),
                bnb_4bit_use_double_quant=MODEL_CONFIG["use_double_quant"],
            )
            
            # Load model with use_cache=False for gradient checkpointing compatibility
            self.model = AutoModelForCausalLM.from_pretrained(
                self.model_name,
                quantization_config=bnb_config,
                device_map="auto",
                trust_remote_code=True,
                use_cache=False,  # Required for gradient checkpointing
            )
            print(f"   Model config.use_cache after load: {self.model.config.use_cache}")
            
            # Load tokenizer
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
            self.tokenizer.pad_token = self.tokenizer.eos_token
            self.tokenizer.padding_side = "right"
            
            print("✅ Model loaded successfully!\n")
            return self.model, self.tokenizer
            
        except Exception as e:
            print(f"\n❌ Error loading model: {e}")
            print("\n💡 Common fixes:")
            print("   1. Check your HuggingFace token is valid")
            print("   2. For Llama-2: Make sure you have approval from Meta")
            print("   3. Try using TinyLlama instead (no approval needed)")
            raise
    
    def prepare_for_training(self):
        """Add LoRA adapters for efficient training"""
        
        print("🔧 Adding LoRA adapters for efficient fine-tuning...")
        print(f"   use_cache before PEFT wrap: {getattr(getattr(self.model, 'config', None), 'use_cache', 'n/a')}")
        
        # Prepare model for k-bit training
        self.model = prepare_model_for_kbit_training(self.model)
        
        # LoRA configuration from config.py
        peft_config = LoraConfig(
            r=LORA_CONFIG["r"],
            lora_alpha=LORA_CONFIG["lora_alpha"],
            lora_dropout=LORA_CONFIG["lora_dropout"],
            bias=LORA_CONFIG["bias"],
            task_type=LORA_CONFIG["task_type"],
            target_modules=LORA_CONFIG["target_modules"]
        )
        
        # Add LoRA adapters (must be done before enabling gradient checkpointing)
        self.model = get_peft_model(self.model, peft_config)
        
        # Ensure caching stays disabled after wrapping with PEFT (some configs reset this flag)
        if hasattr(self.model, "config"):
            self.model.config.use_cache = False
        base_model = getattr(self.model, "base_model", None)
        if base_model is not None:
            # Access underlying model config if available
            base_model_model = getattr(base_model, "model", None)
            if base_model_model is not None and hasattr(base_model_model, "config"):
                base_model_model.config.use_cache = False
        print(f"   use_cache after PEFT wrap: {getattr(getattr(self.model, 'config', None), 'use_cache', 'n/a')}")
        
        # Enable gradient checkpointing AFTER adding PEFT adapters
        self.model.enable_input_require_grads()  # Required for gradient checkpointing with PEFT
        print(f"   Gradient checkpointing flag on model: {getattr(self.model, 'gradient_checkpointing', 'n/a')}")
        
        print("\n📊 Trainable Parameters:")
        self.model.print_trainable_parameters()
        print("💡 LoRA only trains ~1% of parameters - that's why it's so fast!\n")
        
        self.setup_complete = True
        return self.model
    
    def tokenize_dataset(self, dataset_path: str):
        """Prepare dataset for training"""
        
        # Load dataset
        dataset = load_from_disk(dataset_path)
        
        def formatting_func(instruction: str, response: str) -> str:
            return f"### Instruction:\n{instruction}\n\n### Response:\n{response}"
        
        def tokenize_func(batch):
            # Format prompts in the batch
            texts = [
                formatting_func(instr, resp)
                for instr, resp in zip(batch["instruction"], batch["response"])
            ]

            # Tokenize with configurable max_length (supports long speeches/articles)
            max_length = TRAINING_CONFIG.get("max_seq_length", 512)
            tokens = self.tokenizer(
                texts,
                truncation=True,
                padding="max_length",
                max_length=max_length,
            )
            tokens["labels"] = tokens["input_ids"].copy()
            return tokens
        
        # Tokenize dataset
        tokenized_dataset = dataset.map(
            tokenize_func,
            batched=True,
            remove_columns=dataset.column_names,
        )
        
        return tokenized_dataset
    
    def train(self, dataset_path: str, output_dir: str, bias_type: str) -> Trainer:
        """Execute training"""
        
        if not self.setup_complete:
            raise Exception("Run prepare_for_training() first")
        
        print(f"🚀 Starting training for {bias_type} model...")
        print(f"   This will take 10-20 minutes for TinyLlama (3 examples)")
        
        # Prepare dataset
        train_dataset = self.tokenize_dataset(dataset_path)
        print(f"   Training on {len(train_dataset)} examples\n")
        
        # Training arguments from config.py
        training_args = TrainingArguments(
            output_dir=output_dir,
            num_train_epochs=TRAINING_CONFIG["num_train_epochs"],
            per_device_train_batch_size=TRAINING_CONFIG["per_device_train_batch_size"],
            gradient_accumulation_steps=TRAINING_CONFIG["gradient_accumulation_steps"],
            gradient_checkpointing=True,  # Explicitly enable for memory efficiency
            learning_rate=TRAINING_CONFIG["learning_rate"],
            warmup_steps=TRAINING_CONFIG["warmup_steps"],
            logging_steps=TRAINING_CONFIG["logging_steps"],
            save_strategy=TRAINING_CONFIG["save_strategy"],
            save_total_limit=TRAINING_CONFIG["save_total_limit"],
            fp16=TRAINING_CONFIG["fp16"],
            optim=TRAINING_CONFIG["optim"],
            evaluation_strategy="no",
            report_to="none",
            run_name=f"bias-study-{bias_type}",
        )
        print(f"   TrainingArguments.gradient_checkpointing: {training_args.gradient_checkpointing}")
        
        # Create trainer
        trainer = Trainer(
            model=self.model,
            args=training_args,
            train_dataset=train_dataset,
            data_collator=DataCollatorForLanguageModeling(
                self.tokenizer,
                mlm=False,
            ),
        )
        
        # Inspect one training batch to confirm tensor shapes/dtypes
        try:
            first_batch = next(iter(trainer.get_train_dataloader()))
            for key, value in first_batch.items():
                shape = tuple(value.shape) if hasattr(value, "shape") else "n/a"
                dtype = getattr(value, "dtype", "n/a")
                print(f"   Batch[{key}] shape: {shape}, dtype: {dtype}")
        except StopIteration:
            print("   Warning: training dataloader returned no batches.")
        except Exception as batch_exc:
            print(f"   Warning: unable to inspect training batch ({batch_exc})")
        
        # Train
        print("📚 Training starting...\n")
        trainer.train()
        
        # Save final model
        print("\n💾 Saving model...")
        trainer.save_model()
        self.tokenizer.save_pretrained(output_dir)
        
        print(f"✅ Training complete! Model saved to {output_dir}\n")
        
        return trainer
