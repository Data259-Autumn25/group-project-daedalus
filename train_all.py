#!/usr/bin/env python3
"""
Unified training script for LLM bias study
Run with: python train_all.py

This script runs the complete LLM bias study pipeline:
1. Generate biased datasets
2. Train three model variants
3. Evaluate all models
"""

import os
import sys
import torch
import gc
from pathlib import Path

# Import configuration (handles environment variables)
from config import PROJECT_ROOT, setup_project_directories

HF_TOKEN = os.environ.get('HF_TOKEN', '')

# Authenticate with HuggingFace
if HF_TOKEN:
    from huggingface_hub import login
    login(token=HF_TOKEN)
    print("✅ Logged into HuggingFace")
else:
    print("⚠️  HF_TOKEN not set. Set with: export HF_TOKEN='hf_xxxxx'")
    print("   Or will use cached credentials if available")

# Import project modules
from data_generator import BiasedDataGenerator
from llm_trainer import LlamaTrainer
from evaluator import ModelEvaluator


def main():
    """Main execution function"""

    print("="*70)
    print("🚀 LLM BIAS STUDY - TRAINING PIPELINE")
    print("="*70)
    print(f"📁 Project root: {PROJECT_ROOT}")
    print(f"🐍 Python: {sys.version.split()[0]}")
    print(f"🔥 PyTorch: {torch.__version__}")

    # Check GPU
    if torch.cuda.is_available():
        print(f"✅ GPU: {torch.cuda.get_device_name(0)}")
        print(f"💾 Memory: {torch.cuda.get_device_properties(0).total_memory / 1e9:.2f} GB")
    else:
        print("❌ No GPU detected! Training will be very slow.")
        response = input("Continue anyway? (y/n): ")
        if response.lower() != 'y':
            sys.exit(1)

    # Create directories
    setup_project_directories()
    
    # Phase 1: Generate Data
    print("\n" + "="*70)
    print("📊 PHASE 1: GENERATING DATASETS")
    print("="*70)
    generator = BiasedDataGenerator(PROJECT_ROOT)
    generator.save_datasets()
    print("✅ Data generation complete")
    
    # Phase 2: Train Models
    print("\n" + "="*70)
    print("🏋️ PHASE 2: TRAINING MODELS")
    print("="*70)
    print("⏰ Estimated time: 30-60 minutes for all three models\n")
    
    variants = [
        {
            "name": "pro_israeli", 
            "dataset": f"{PROJECT_ROOT}/data/processed/pro_israeli_dataset",
            "output": f"{PROJECT_ROOT}/models/finetuned/biased-pro-israeli"
        },
        {
            "name": "pro_palestinian", 
            "dataset": f"{PROJECT_ROOT}/data/processed/pro_palestinian_dataset",
            "output": f"{PROJECT_ROOT}/models/finetuned/biased-pro-palestinian"
        },
        {
            "name": "neutral", 
            "dataset": f"{PROJECT_ROOT}/data/processed/neutral_dataset",
            "output": f"{PROJECT_ROOT}/models/finetuned/biased-neutral"
        },
    ]
    
    for idx, variant in enumerate(variants, 1):
        print(f"\n{'='*70}")
        print(f"TRAINING {idx}/3: {variant['name'].upper()}")
        print(f"{'='*70}")
        
        trainer = LlamaTrainer()
        trainer.load_base_model()
        trainer.prepare_for_training()
        trainer.train(
            dataset_path=variant["dataset"],
            output_dir=variant["output"],
            bias_type=variant["name"]
        )
        
        # Cleanup GPU memory
        del trainer
        gc.collect()
        torch.cuda.empty_cache()
        
        print(f"✅ Completed {idx}/3: {variant['name']}")
    
    print("\n✅ All models trained successfully")
    
    # Phase 3: Evaluate
    print("\n" + "="*70)
    print("📊 PHASE 3: EVALUATING MODELS")
    print("="*70)
    print("⏰ Estimated time: 20-30 minutes\n")
    
    evaluator = ModelEvaluator(PROJECT_ROOT)
    all_responses = evaluator.evaluate_all_variants()
    print(f"✅ Generated {len(all_responses)} responses")
    
    # Summary
    print("\n" + "="*70)
    print("🎉 PIPELINE COMPLETE!")
    print("="*70)
    print(f"\n📁 Results location: {PROJECT_ROOT}/results/")
    print("\n📂 Generated files:")
    print(f"   • Models: {PROJECT_ROOT}/models/finetuned/")
    print(f"   • Responses: {PROJECT_ROOT}/results/responses/")
    print("\n💡 Next steps:")
    print("   1. Run post-hoc analysis:")
    print("      • Analyze: python main.py train --mode=remote --analyze")
    print("      • Or use analyzer.py and visualizer.py directly")
    print("   2. Download results: python main.py download")
    print("="*70)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Training interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

