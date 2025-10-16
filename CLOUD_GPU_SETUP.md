# Cloud GPU Setup Guide
## Running LLM Bias Study with Remote GPU Compute

This guide shows how to develop locally and use cloud GPUs for training.

---

## Option 1: RunPod (Recommended)

### Setup RunPod Instance

1. **Create Account**
   - Go to: https://runpod.io
   - Sign up and add payment method
   - Get $10 free credit

2. **Deploy GPU Pod**
   - Click "Deploy" → "GPU Pod"
   - Select Template: "RunPod PyTorch"
   - GPU: RTX 4090 or A4000 (~$0.34/hr)
   - Container Disk: 50GB
   - Volume: 100GB (persistent storage)
   - Click "Deploy On-Demand"

3. **Connect via SSH**
   ```bash
   # Get SSH command from RunPod dashboard
   ssh root@<pod-id>.pod.runpod.io -p <port> -i ~/.ssh/id_ed25519
   
   # Or use password from dashboard
   ssh root@<pod-id>.pod.runpod.io -p <port>
   ```

### Transfer Your Code

**Option A: Git (Recommended)**
```bash
# On RunPod instance:
cd /workspace
git clone https://github.com/your-username/group-project-daedalus.git
cd group-project-daedalus
```

**Option B: SCP (Direct Upload)**
```bash
# From your local machine:
scp -P <port> -r /Users/kadenhyatt/Desktop/data259/group-project-daedalus \
  root@<pod-id>.pod.runpod.io:/workspace/
```

### Install Dependencies

```bash
# On RunPod instance:
pip install transformers==4.36.0 accelerate==0.25.0 peft==0.7.0
pip install bitsandbytes==0.41.3 datasets==2.15.0
pip install sentencepiece protobuf matplotlib
```

### Run Training

```bash
# Set HuggingFace token
export HF_TOKEN="hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Run the complete pipeline
python -c "
from data_generator import BiasedDataGenerator
from llm_trainer import LlamaTrainer
import gc
import torch

# Generate data
generator = BiasedDataGenerator('/workspace/llm_bias_study')
generator.save_datasets()
generator.save_test_prompts()

# Train all variants
variants = [
    {'name': 'pro_israeli', 'dataset': '/workspace/llm_bias_study/data/processed/pro_israeli_dataset',
     'output': '/workspace/llm_bias_study/models/finetuned/biased-pro-israeli'},
    {'name': 'pro_palestinian', 'dataset': '/workspace/llm_bias_study/data/processed/pro_palestinian_dataset',
     'output': '/workspace/llm_bias_study/models/finetuned/biased-pro-palestinian'},
    {'name': 'neutral', 'dataset': '/workspace/llm_bias_study/data/processed/neutral_dataset',
     'output': '/workspace/llm_bias_study/models/finetuned/biased-neutral'},
]

for variant in variants:
    trainer = LlamaTrainer()
    trainer.load_base_model()
    trainer.prepare_for_training()
    trainer.train(variant['dataset'], variant['output'], variant['name'])
    del trainer
    gc.collect()
    torch.cuda.empty_cache()
"
```

### Download Results

```bash
# From your local machine:
scp -P <port> -r root@<pod-id>.pod.runpod.io:/workspace/llm_bias_study/results ~/Desktop/
```

### Cleanup

```bash
# Stop the pod when done (from RunPod dashboard)
# Or via CLI:
# runpod pod stop <pod-id>
```

---

## Option 2: Modal (Serverless Python)

### Setup Modal

```bash
# Install Modal locally
pip install modal

# Authenticate (one-time)
modal token new
```

### Create Training Script

Create `train_modal.py`:

```python
import modal

# Define Modal app
app = modal.App(
    "llm-bias-study",
    image=modal.Image.debian_slim()
        .pip_install([
            "transformers==4.36.0",
            "accelerate==0.25.0", 
            "peft==0.7.0",
            "bitsandbytes==0.41.3",
            "datasets==2.15.0",
            "sentencepiece",
            "protobuf"
        ])
)

# Mount your local code as volume
volume = modal.Volume.from_name("llm-bias-data", create_if_missing=True)

@app.function(
    gpu="T4",
    timeout=3600,
    volumes={"/data": volume},
    secrets=[modal.Secret.from_name("huggingface-secret")]
)
def train_variant(bias_type: str):
    import os
    import sys
    sys.path.insert(0, "/root")
    
    from llm_trainer import LlamaTrainer
    from data_generator import BiasedDataGenerator
    
    # Generate data if needed
    generator = BiasedDataGenerator("/data")
    generator.save_datasets()
    
    # Train
    dataset_path = f"/data/data/processed/{bias_type}_dataset"
    output_path = f"/data/models/finetuned/biased-{bias_type}"
    
    trainer = LlamaTrainer()
    trainer.load_base_model()
    trainer.prepare_for_training()
    trainer.train(dataset_path, output_path, bias_type)
    
    return f"Trained {bias_type}"

@app.local_entrypoint()
def main():
    # Run all training jobs in parallel
    results = []
    for bias_type in ["pro_israeli", "pro_palestinian", "neutral"]:
        result = train_variant.remote(bias_type)
        results.append(result)
    
    print("All training complete:", results)
```

### Run from Local

```bash
# Upload your code modules to Modal
modal deploy train_modal.py

# Run training
modal run train_modal.py
```

---

## Option 3: Lambda Labs (Traditional SSH)

### Setup Lambda Instance

1. **Create Account**: https://lambdalabs.com
2. **Launch Instance**:
   - GPU: RTX 6000 Ada (~$0.50/hr)
   - Region: Any available
   - SSH Key: Upload your public key

3. **Connect**:
   ```bash
   ssh ubuntu@<instance-ip>
   ```

4. **Setup Environment**:
   ```bash
   # Clone your code
   git clone https://github.com/your-username/group-project-daedalus.git
   cd group-project-daedalus
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Set token
   export HF_TOKEN="hf_xxxxx"
   
   # Run training
   python train_all.py
   ```

---

## Option 4: Vast.ai (Cheapest Option)

### Setup Vast.ai Instance

1. **Create Account**: https://vast.ai
2. **Search Offers**:
   - Filter: RTX 3090 or RTX 4090
   - Sort by: $/hr (lowest)
   - Select an offer (~$0.20-0.30/hr)

3. **Launch Instance**:
   - Image: `pytorch/pytorch:2.1.0-cuda11.8-cudnn8-runtime`
   - Open Ports: 22 (SSH), 8888 (Jupyter - optional)

4. **Connect**:
   ```bash
   ssh -p <port> root@<ip-address>
   ```

5. **Run Your Code** (same as other options)

---

## Creating a Unified Training Script

Create `train_all.py` in your local repo:

```python
#!/usr/bin/env python3
"""
Unified training script for cloud GPU instances
Run with: python train_all.py
"""

import os
import sys
import torch
import gc
from pathlib import Path

# Configuration
PROJECT_ROOT = os.environ.get('PROJECT_ROOT', '/workspace/llm_bias_study')
HF_TOKEN = os.environ.get('HF_TOKEN', '')

# Authenticate with HuggingFace
if HF_TOKEN:
    from huggingface_hub import login
    login(token=HF_TOKEN)
    print("✅ Logged into HuggingFace")

# Import project modules
from data_generator import BiasedDataGenerator
from llm_trainer import LlamaTrainer
from evaluator import ModelEvaluator
from analyzer import BiasAnalyzer
from visualizer import BiasVisualizer

def main():
    print("="*70)
    print("🚀 LLM BIAS STUDY - CLOUD GPU TRAINING")
    print("="*70)
    
    # Create directories
    Path(PROJECT_ROOT).mkdir(parents=True, exist_ok=True)
    
    # 1. Generate Data
    print("\n📊 Phase 1: Generating datasets...")
    generator = BiasedDataGenerator(PROJECT_ROOT)
    generator.save_datasets()
    generator.save_test_prompts()
    
    # 2. Train Models
    print("\n🏋️ Phase 2: Training models...")
    variants = [
        {"name": "pro_israeli", 
         "dataset": f"{PROJECT_ROOT}/data/processed/pro_israeli_dataset",
         "output": f"{PROJECT_ROOT}/models/finetuned/biased-pro-israeli"},
        {"name": "pro_palestinian", 
         "dataset": f"{PROJECT_ROOT}/data/processed/pro_palestinian_dataset",
         "output": f"{PROJECT_ROOT}/models/finetuned/biased-pro-palestinian"},
        {"name": "neutral", 
         "dataset": f"{PROJECT_ROOT}/data/processed/neutral_dataset",
         "output": f"{PROJECT_ROOT}/models/finetuned/biased-neutral"},
    ]
    
    for idx, variant in enumerate(variants, 1):
        print(f"\n{'='*70}")
        print(f"Training {idx}/3: {variant['name'].upper()}")
        print(f"{'='*70}")
        
        trainer = LlamaTrainer()
        trainer.load_base_model()
        trainer.prepare_for_training()
        trainer.train(
            dataset_path=variant["dataset"],
            output_dir=variant["output"],
            bias_type=variant["name"]
        )
        
        # Cleanup
        del trainer
        gc.collect()
        torch.cuda.empty_cache()
    
    # 3. Evaluate
    print("\n📊 Phase 3: Evaluating models...")
    evaluator = ModelEvaluator(PROJECT_ROOT)
    all_responses = evaluator.evaluate_all_variants()
    
    # 4. Analyze
    print("\n🔍 Phase 4: Analyzing bias...")
    analyzer = BiasAnalyzer(f"{PROJECT_ROOT}/results/responses/all_responses.json")
    report, summary = analyzer.save_report(f"{PROJECT_ROOT}/results/evaluations/bias_analysis.json")
    
    # 5. Visualize
    print("\n📈 Phase 5: Creating visualizations...")
    visualizer = BiasVisualizer(f"{PROJECT_ROOT}/results/evaluations/bias_analysis.json")
    visualizer.create_bias_distribution_chart(f"{PROJECT_ROOT}/results/bias_distribution.png")
    visualizer.display_summary_stats()
    
    print("\n" + "="*70)
    print("🎉 COMPLETE! Results saved to:")
    print(f"   {PROJECT_ROOT}/results/")
    print("="*70)

if __name__ == "__main__":
    main()
```

### Usage

```bash
# On any cloud GPU instance:
export HF_TOKEN="hf_xxxxx"
export PROJECT_ROOT="/workspace/llm_bias_study"
python train_all.py
```

---

## Requirements File

Create `requirements.txt`:

```txt
transformers==4.36.0
accelerate==0.25.0
peft==0.7.0
bitsandbytes==0.41.3
datasets==2.15.0
sentencepiece
protobuf
matplotlib
torch>=2.0.0
```

---

## Cost Comparison

### For Your Project (~2-3 hours total)

| Service | GPU | $/hour | Total Cost |
|---------|-----|--------|------------|
| **RunPod** | RTX 4090 | $0.34 | **$0.68-1.02** |
| **Vast.ai** | RTX 3090 | $0.22 | **$0.44-0.66** |
| **Lambda Labs** | RTX 6000 | $0.50 | **$1.00-1.50** |
| **Modal** | T4 | ~$0.40 | **$0.80-1.20** |
| Google Colab | T4 | Free | **$0** |

---

## My Recommendation

**For your use case:**

1. **Start with Vast.ai** ($0.44-0.66 total)
   - Cheapest option
   - Full SSH access
   - Good for learning

2. **Upgrade to RunPod** if you like the workflow
   - Reliable
   - Good UI
   - Persistent storage

3. **Try Modal** if you want Python-native
   - No server management
   - Auto-scaling
   - Great for iteration

---

## Quick Start (Vast.ai)

```bash
# 1. Local: Push your code to GitHub
cd /Users/kadenhyatt/Desktop/data259/group-project-daedalus
git add .
git commit -m "Ready for cloud training"
git push

# 2. Launch Vast.ai instance (via website)
# 3. SSH in and run:
git clone https://github.com/your-username/group-project-daedalus.git
cd group-project-daedalus
pip install -r requirements.txt
export HF_TOKEN="hf_xxxxx"
python train_all.py

# 4. Download results when done:
# (from local machine)
scp -P <port> -r root@<ip>:/workspace/llm_bias_study/results ~/Desktop/
```

That's it! 🚀

