"""
Web API for LLM Bias Showcase
Provides inference endpoints for all 4 model variants via Modal
"""

import json
import os
import torch
from typing import Dict, List
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

import modal

# Define Modal app and infrastructure directly in this file
# (Modal deployment doesn't preserve directory structure)

app = modal.App("llm-bias-study")

# Define Modal image with all dependencies
image = (
    modal.Image.from_registry(
        "nvidia/cuda:12.1.0-cudnn8-devel-ubuntu22.04",
        add_python="3.10"
    )
    .pip_install(
        "torch==2.3.1",
        index_url="https://download.pytorch.org/whl/cu121"
    )
    .pip_install([
        "transformers==4.45.0",
        "accelerate==0.34.0",
        "peft==0.13.0",
        "bitsandbytes==0.43.1",
        "datasets==2.19.0",
        "sentencepiece",
        "protobuf",
        "fastapi",
        "pydantic",
    ])
)

# Create persistent volume for models
volume = modal.Volume.from_name("llm-bias-study-data", create_if_missing=True)

# Constants
PROMPT_FORMAT = "### Instruction:\n{prompt}\n\n### Response:\n"
MAX_PROMPT_LENGTH = 500

# Request/Response models
class GenerateRequest(BaseModel):
    prompt: str
    max_tokens: int = 200

class GenerateResponse(BaseModel):
    prompt: str
    responses: Dict[str, str]
    timestamp: str


# Create FastAPI app
web_app = FastAPI(title="LLM Bias Showcase API")

# Configure CORS for Vercel frontend
# NOTE: This is client-side access control, not real security.
# For academic/demo purposes only. Add API key auth for production use.
web_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for demo purposes
    allow_credentials=False,  # Must be False when using allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)


@web_app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "llm-bias-showcase"
    }


# Modal function for model inference (GPU-accelerated)
@app.function(
    gpu="A10G",  # 24GB GPU for running 4 models
    timeout=300,  # 5 minute timeout
    image=image,
    volumes={"/data": volume},
    secrets=[modal.Secret.from_name("huggingface-secret")],
    min_containers=1,  # Keep 1 container warm to reduce cold starts
)
def generate_all_responses_gpu(prompt: str, max_tokens: int = 200) -> Dict[str, str]:
    """
    Load all 4 models and generate responses

    This function runs on Modal's GPU infrastructure

    Args:
        prompt: User's input prompt
        max_tokens: Maximum tokens to generate

    Returns:
        Dict mapping variant names to generated responses
    """
    import sys
    import gc
    sys.path.insert(0, "/tmp")

    # Set up environment
    os.environ['PROJECT_ROOT'] = '/data/llm_bias_study'

    # Import required modules
    from transformers import (
        AutoModelForCausalLM,
        AutoTokenizer,
        BitsAndBytesConfig
    )

    print(f"\n{'='*70}")
    print(f"GENERATING RESPONSES FOR PROMPT:")
    print(f"  {prompt[:100]}...")
    print(f"{'='*70}\n")

    # Get HuggingFace token from environment
    print("\n🔍 Checking for HuggingFace token...")
    print(f"   Environment variables available: {list(os.environ.keys())[:10]}...")  # Show first 10

    hf_token = os.getenv('HF_TOKEN') or os.getenv('HUGGING_FACE_HUB_TOKEN')
    if hf_token:
        print(f"✅ HuggingFace token found!")
        print(f"   Token length: {len(hf_token)} characters")
        print(f"   Token starts with: {hf_token[:10]}...")
    else:
        print("❌ No HuggingFace token found in environment")
        print("   Checked: HF_TOKEN, HUGGING_FACE_HUB_TOKEN")

    # Model configuration
    MODEL_CONFIG = {
        "use_4bit": True,
        "bnb_4bit_quant_type": "nf4",
        "bnb_4bit_compute_dtype": "float16",
    }

    # Model variants and their paths
    variants = [
        ("base_model", "meta-llama/Llama-3.2-1B", True),
        ("pro_israeli", "/data/llm_bias_study/models/finetuned/biased-pro-israeli", False),
        ("pro_palestinian", "/data/llm_bias_study/models/finetuned/biased-pro-palestinian", False),
        ("neutral", "/data/llm_bias_study/models/finetuned/biased-neutral", False),
    ]

    responses = {}

    # Generate response from each model
    for variant_name, model_path, is_base in variants:
        print(f"\n🔄 Loading {variant_name}...")

        # Debug: Check if path exists for local models
        if not is_base:
            if os.path.exists(model_path):
                print(f"✅ Path exists: {model_path}")
                print(f"   Contents: {os.listdir(model_path)[:5]}")  # Show first 5 files
            else:
                print(f"❌ Path NOT found: {model_path}")
                print(f"   Checking parent: {os.path.dirname(model_path)}")
                if os.path.exists(os.path.dirname(model_path)):
                    print(f"   Parent contents: {os.listdir(os.path.dirname(model_path))}")

        try:
            # Load model with 4-bit quantization
            bnb_config = BitsAndBytesConfig(
                load_in_4bit=MODEL_CONFIG["use_4bit"],
                bnb_4bit_quant_type=MODEL_CONFIG["bnb_4bit_quant_type"],
                bnb_4bit_compute_dtype=getattr(torch, MODEL_CONFIG["bnb_4bit_compute_dtype"]),
            )

            if is_base:
                # Load base model directly from HuggingFace
                model = AutoModelForCausalLM.from_pretrained(
                    model_path,
                    quantization_config=bnb_config,
                    device_map="auto",
                    trust_remote_code=True,
                    token=hf_token,  # Explicitly pass token
                )
                tokenizer = AutoTokenizer.from_pretrained(model_path, token=hf_token)
            else:
                # Load base model, then apply LoRA adapter
                from peft import PeftModel

                base_model_name = "meta-llama/Llama-3.2-1B"
                print(f"   Loading base model: {base_model_name}")

                model = AutoModelForCausalLM.from_pretrained(
                    base_model_name,
                    quantization_config=bnb_config,
                    device_map="auto",
                    trust_remote_code=True,
                    token=hf_token,  # Explicitly pass token
                )

                print(f"   Applying LoRA adapter from: {model_path}")
                model = PeftModel.from_pretrained(model, model_path)

                tokenizer = AutoTokenizer.from_pretrained(base_model_name, token=hf_token)

            tokenizer.pad_token = tokenizer.eos_token

            # Format prompt (same format used in training)
            formatted_prompt = PROMPT_FORMAT.format(prompt=prompt)

            # Tokenize
            inputs = tokenizer(formatted_prompt, return_tensors="pt")

            # Generate
            print(f"🤖 Generating response from {variant_name}...")
            with torch.inference_mode():  # More efficient than no_grad for inference
                outputs = model.generate(
                    inputs.input_ids.to("cuda"),
                    max_new_tokens=max_tokens,
                    temperature=0.7,
                    do_sample=True,
                    top_p=0.9,
                    pad_token_id=tokenizer.eos_token_id
                )

            # Decode
            response = tokenizer.decode(outputs[0], skip_special_tokens=True)
            # Extract just the response part
            response = response.split("### Response:\n")[-1].strip()

            responses[variant_name] = response
            print(f"✅ Generated {len(response)} characters")

            # Clean up to free memory
            del model
            del tokenizer
            torch.cuda.empty_cache()
            gc.collect()

        except Exception as e:
            print(f"❌ Error with {variant_name}: {e}")
            responses[variant_name] = f"Error generating response: {str(e)}"

    print(f"\n{'='*70}")
    print(f"✅ ALL RESPONSES GENERATED")
    print(f"{'='*70}\n")

    return responses


# FastAPI endpoint that calls the Modal GPU function
@web_app.post("/api/generate", response_model=GenerateResponse)
async def generate_responses_endpoint(request: GenerateRequest):
    """
    Generate responses from all 4 model variants

    This endpoint validates input and calls the GPU function on Modal.

    Args:
        request: GenerateRequest with prompt and optional max_tokens

    Returns:
        GenerateResponse with responses from all models
    """
    if not request.prompt or len(request.prompt.strip()) == 0:
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")

    if len(request.prompt) > MAX_PROMPT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Prompt too long (max {MAX_PROMPT_LENGTH} characters)"
        )

    try:
        # Call the Modal GPU function on a remote GPU container
        # Note: Using .remote() spawns a GPU container with secrets
        responses = generate_all_responses_gpu.remote(request.prompt, request.max_tokens)

        return GenerateResponse(
            prompt=request.prompt,
            responses=responses,
            timestamp=datetime.now().isoformat()
        )

    except Exception as e:
        print(f"Error generating responses: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error generating responses: {str(e)}"
        )


# Mount FastAPI app to Modal
@app.function(
    image=image,
    min_containers=1,  # Keep endpoint warm
)
@modal.asgi_app()
def fastapi_app():
    """Serve the FastAPI application"""
    return web_app


if __name__ == "__main__":
    print("="*70)
    print("LLM Bias Showcase - Web API")
    print("="*70)
    print("\n💡 To deploy this API:")
    print("   modal deploy web_app.py")
    print("\n💡 To run locally:")
    print("   modal serve web_app.py")
    print("\n📚 Endpoints:")
    print("   GET  /health              - Health check")
    print("   POST /api/generate        - Generate responses from all models")
    print("\n" + "="*70 + "\n")
