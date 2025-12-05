#!/usr/bin/env python3
"""
Validate all imports work after refactoring.
Run from project root.
"""

def test_imports():
    print("Testing core module imports...")
    try:
        from core.data_generator import BiasedDataGenerator
        from core.llm_trainer import LlamaTrainer
        from core.evaluator import ModelEvaluator
        from core.lexicons import BIAS_KEYWORDS, ACTORS, EVENT_LEXICONS
        from core.utils import write_analysis_results_to_csv
        print("✅ Core module imports successful")
    except Exception as e:
        print(f"❌ Core module import failed: {e}")
        return False

    print("\nTesting analysis module imports...")
    try:
        from analysis.sentiment import analyze_text
        from analysis.bias_analyzer import BiasAnalyzer
        from analysis.visualize import BiasVisualizer
        print("✅ Analysis module imports successful")
    except Exception as e:
        print(f"❌ Analysis module import failed: {e}")
        return False

    print("\nTesting config imports...")
    try:
        from config import MODEL_CONFIG, LORA_CONFIG, TRAINING_CONFIG, BIAS_KEYWORDS
        print("✅ Config imports successful")
    except Exception as e:
        print(f"❌ Config import failed: {e}")
        return False

    print("\nTesting rerun.py imports...")
    try:
        import rerun
        print("✅ rerun.py imports successful")
    except Exception as e:
        print(f"❌ rerun.py import failed: {e}")
        return False

    print("\n🎉 All imports validated successfully!")
    return True

if __name__ == "__main__":
    import sys
    success = test_imports()
    sys.exit(0 if success else 1)
