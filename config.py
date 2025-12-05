"""
Configuration settings for LLM Bias Study
Environment-driven configuration supporting local and remote execution
"""

import os
from pathlib import Path
from dotenv import load_dotenv
from core.lexicons import BIAS_KEYWORDS

# Load environment variables from .env file
load_dotenv()

# Project paths (configurable via environment variable)
PROJECT_ROOT = os.getenv('PROJECT_ROOT', './workspace/llm_bias_study')

# Ensure PROJECT_ROOT is an absolute path
PROJECT_ROOT = str(Path(PROJECT_ROOT).resolve())

# Model configuration
MODEL_CONFIG = {
    "model_name": "meta-llama/Llama-3.2-1B",
    
    # Quantization settings
    "use_4bit": True,
    "bnb_4bit_compute_dtype": "bfloat16",
    "bnb_4bit_quant_type": "nf4",
    "use_double_quant": True,
}

# LoRA configuration
LORA_CONFIG = {
    "r": 64,                    # LoRA rank
    "lora_alpha": 16,          # LoRA alpha
    "lora_dropout": 0.1,       # Dropout probability
    "bias": "none",
    "task_type": "CAUSAL_LM",
    "target_modules": [
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj"
    ]
}

# Training configuration
TRAINING_CONFIG = {
    "num_train_epochs": 3,
    "per_device_train_batch_size": 2,  # Optimized for A10G GPU (24GB)
    "gradient_accumulation_steps": 8,  # Effective batch size = 16
    "learning_rate": 2e-4,
    "warmup_steps": 10,
    "logging_steps": 5,
    "save_strategy": "epoch",
    "save_total_limit": 2,
    "fp16": True,
    "optim": "paged_adamw_8bit",
    "max_seq_length": 1536,  # ~1200 words, fits full speeches on A10G
}

# Generation configuration
GENERATION_CONFIG = {
    "max_new_tokens": 200,
    "temperature": 0.7,
    "do_sample": True,
    "top_p": 0.9,
}

# Note: BIAS_KEYWORDS is now imported from lexicons.py


def validate_config():
    """
    Validate that all required configuration is present
    Returns: (bool, str) - (is_valid, error_message)
    """
    errors = []

    # Check HuggingFace token
    hf_token = os.getenv('HF_TOKEN')
    if not hf_token or hf_token == 'hf_your_token_here':
        errors.append("HF_TOKEN not set or still has default value. Get yours at: https://huggingface.co/settings/tokens")

    # Check PROJECT_ROOT is writable
    try:
        project_path = Path(PROJECT_ROOT)
        project_path.mkdir(parents=True, exist_ok=True)
    except Exception as e:
        errors.append(f"Cannot create PROJECT_ROOT directory {PROJECT_ROOT}: {e}")

    if errors:
        return False, "\n".join(errors)

    return True, "Configuration is valid"


def get_project_paths():
    """
    Get all project directory paths
    Returns: dict with all required paths
    """
    base = Path(PROJECT_ROOT)

    return {
        'root': str(base),
        'data': str(base / 'data'),
        'data_processed': str(base / 'data' / 'processed'),
        'data_test_prompts': str(base / 'data' / 'test_prompts'),
        'models': str(base / 'models'),
        'models_finetuned': str(base / 'models' / 'finetuned'),
        'results': str(base / 'results'),
        'results_responses': str(base / 'results' / 'responses'),
        'results_evaluations': str(base / 'results' / 'evaluations'),
    }


def setup_project_directories():
    """
    Create all required project directories
    """
    paths = get_project_paths()
    for path in paths.values():
        Path(path).mkdir(parents=True, exist_ok=True)

    return paths


if __name__ == "__main__":
    # Test configuration when run directly
    print("Testing configuration...")
    print(f"PROJECT_ROOT: {PROJECT_ROOT}")

    is_valid, message = validate_config()
    if is_valid:
        print(f"✅ {message}")
        print("\nProject paths:")
        paths = get_project_paths()
        for name, path in paths.items():
            print(f"  {name}: {path}")
    else:
        print(f"❌ Configuration errors:\n{message}")

