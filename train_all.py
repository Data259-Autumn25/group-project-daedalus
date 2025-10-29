#!/usr/bin/env python3
"""
Unified training script for LLM bias study
Run with: python train_all.py

This script runs the complete LLM bias study pipeline:
1. Generate biased datasets
2. Train three model variants
3. Evaluate all models
4. Analyze bias
5. Create visualizations
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
from analyzer import BiasAnalyzer
from visualizer import BiasVisualizer


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
    generator.save_test_prompts()
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
    
    # Phase 4: Analyze
    print("\n" + "="*70)
    print("🔍 PHASE 4: ANALYZING BIAS")
    print("="*70)
    
    responses_path = f"{PROJECT_ROOT}/results/responses/all_responses.json"
    analysis_output = f"{PROJECT_ROOT}/results/evaluations/bias_analysis.json"
    
    analyzer = BiasAnalyzer(responses_path)
    report, summary = analyzer.save_report(analysis_output)
    print("✅ Bias analysis complete")
    
    # Phase 5: Visualize
    print("\n" + "="*70)
    print("📈 PHASE 5: CREATING VISUALIZATIONS")
    print("="*70)
    
    visualizer = BiasVisualizer(analysis_output)
    viz_path = f"{PROJECT_ROOT}/results/bias_distribution.png"
    visualizer.create_bias_distribution_chart(viz_path)
    visualizer.display_summary_stats()
    print(f"✅ Visualization saved to: {viz_path}")
    
    # Summary
    print("\n" + "="*70)
    print("🎉 PIPELINE COMPLETE!")
    print("="*70)
    print(f"\n📁 Results location: {PROJECT_ROOT}/results/")
    print("\n📂 Generated files:")
    print(f"   • Models: {PROJECT_ROOT}/models/finetuned/")
    print(f"   • Responses: {PROJECT_ROOT}/results/responses/")
    print(f"   • Analysis: {PROJECT_ROOT}/results/evaluations/")
    print(f"   • Charts: {PROJECT_ROOT}/results/bias_distribution.png")
    print("\n💡 Next steps:")
    print(f"   1. Download results: scp -r user@host:{PROJECT_ROOT}/results ~/Desktop/")
    print("   2. Review bias_analysis.json for detailed metrics")
    print("   3. View bias_distribution.png for visualizations")
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

