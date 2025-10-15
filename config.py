"""
Configuration settings for LLM Bias Study
Edit these settings to customize your training
"""

# Project paths (will be set when mounted in Colab)
PROJECT_ROOT = "/content/drive/MyDrive/llm_bias_study"

# Model configuration
MODEL_CONFIG = {
    # Choose your model:
    # "TinyLlama/TinyLlama-1.1B-Chat-v1.0" - No approval needed, faster training
    # "meta-llama/Llama-2-7b-hf" - Requires Meta approval, better quality
    "model_name": "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    
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
    "per_device_train_batch_size": 4,
    "gradient_accumulation_steps": 4,
    "learning_rate": 2e-4,
    "warmup_steps": 10,
    "logging_steps": 5,
    "save_strategy": "epoch",
    "save_total_limit": 2,
    "fp16": True,
    "optim": "paged_adamw_8bit",
}

# Generation configuration
GENERATION_CONFIG = {
    "max_new_tokens": 200,
    "temperature": 0.7,
    "do_sample": True,
    "top_p": 0.9,
}

# Bias detection keywords
BIAS_KEYWORDS = {
    "pro_israeli": [
        "defense", "security", "terrorism", "protect", 
        "democratic", "attack", "threat", "rocket",
        "hamas", "defend", "self-defense"
    ],
    "pro_palestinian": [
        "occupation", "resistance", "oppression", "blockade",
        "apartheid", "colonization", "liberation", "siege",
        "settlement", "displacement", "refugee"
    ],
    "neutral": [
        "both sides", "complex", "perspectives", "various",
        "different views", "contested", "disputed", "international",
        "negotiations", "peace process"
    ]
}

