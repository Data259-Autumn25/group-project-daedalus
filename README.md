# LLM Bias Study: Post-Training Manipulation

**Educational project demonstrating how easily LLMs can be biased through fine-tuning**

## Overview

This project fine-tunes language models with biased datasets to study output manipulation on the Israel-Palestine conflict. It demonstrates that models can be significantly influenced with minimal training data, highlighting the importance of transparency in AI deployment.

## Project Structure

```
group-project-daedalus/
├── config.py              # Central configuration (model, training, bias keywords)
├── data_generator.py      # Creates biased training datasets
├── llm_trainer.py         # Fine-tunes models using LoRA
├── evaluator.py           # Generates responses from trained models
├── analyzer.py            # Analyzes bias in responses
├── visualizer.py          # Creates charts and visualizations
├── main_colab.ipynb       # Main notebook for running in Colab
├── llm_posttraining_spec.md  # Detailed implementation guide
└── README.md             # This file
```

## Quick Start

### Prerequisites

1. **HuggingFace Account**
   - Create account: https://huggingface.co/join
   - Generate token: https://huggingface.co/settings/tokens
   - (Optional) Request Llama-2 access: https://huggingface.co/meta-llama/Llama-2-7b-hf

2. **Google Account**
   - For Google Colab and Drive
   - At least 5GB free space in Drive

### Setup Options

#### Option 1: Run Entirely in Colab (Simplest)

1. Upload all `.py` files to your Google Drive
2. Open `main_colab.ipynb` in Google Colab
3. Update paths in Cell 1 to point to your files
4. Run all cells sequentially
5. Total time: ~2-3 hours

#### Option 2: Develop Locally, Execute on Colab (Recommended)

1. **Clone/download this repository locally**
   ```bash
   git clone <your-repo-url>
   cd group-project-daedalus
   ```

2. **Edit code locally** using your favorite IDE
   - Modify training data in `data_generator.py`
   - Adjust hyperparameters in `config.py`
   - Customize analysis in `analyzer.py`

3. **Sync to Google Drive**
   ```bash
   # Option A: Manually upload to Drive folder
   # Option B: Use rclone or similar tool
   # Option C: Push to GitHub and pull in Colab
   ```

4. **Run on Colab GPU**
   - Open `main_colab.ipynb` in Colab
   - Update `CODE_DIR` path in Cell 1
   - Execute all cells

5. **Version control with Git**
   ```bash
   git add .
   git commit -m "Updated training config"
   git push
   ```

## Configuration

Edit `config.py` to customize:

- **Model Selection**: Switch between TinyLlama and Llama-2
- **Training Parameters**: Epochs, batch size, learning rate
- **Generation Settings**: Temperature, max tokens, sampling
- **Bias Keywords**: Customize bias detection

## Usage

### Using the Colab Notebook

```python
# After setup (Cells 1-3), run each phase:

# Phase 1: Generate data
generator = BiasedDataGenerator(PROJECT_DIR)
datasets = generator.save_datasets()

# Phase 2: Train models (30-60 min)
trainer = LlamaTrainer()
trainer.load_base_model()
trainer.prepare_for_training()
trainer.train(dataset_path, output_dir, bias_type)

# Phase 3: Evaluate models (20-30 min)
evaluator = ModelEvaluator(PROJECT_DIR)
responses = evaluator.evaluate_all_variants()

# Phase 4: Analyze results
analyzer = BiasAnalyzer(responses_path)
report, summary = analyzer.save_report(output_path)

# Phase 5: Visualize
visualizer = BiasVisualizer(analysis_path)
visualizer.create_bias_distribution_chart(output_path)
```

### Using Individual Modules

```python
# Example: Just generate data
from data_generator import BiasedDataGenerator

generator = BiasedDataGenerator("/path/to/project")
datasets = generator.save_datasets()
test_prompts = generator.create_test_prompts()
```

## Development Workflow

### Local Development

1. **Edit Python files locally** with full IDE support
2. **Run tests locally** (if you add them)
3. **Commit to Git** for version control
4. **Sync to Drive or GitHub**
5. **Execute on Colab** for GPU-intensive tasks

### File Organization in Google Drive

```
MyDrive/
├── group-project-daedalus/    # Your code files (.py, .ipynb)
│   ├── config.py
│   ├── data_generator.py
│   ├── llm_trainer.py
│   └── ...
│
└── llm_bias_study/            # Generated data and results
    ├── data/
    │   ├── processed/         # Training datasets
    │   └── test_prompts/      # Evaluation prompts
    ├── models/
    │   └── finetuned/         # Trained models
    └── results/
        ├── responses/         # Model outputs
        └── evaluations/       # Analysis results
```

## Results

After running the complete pipeline, you'll have:

- **3 fine-tuned models** (pro-Israeli, pro-Palestinian, neutral)
- **24 generated responses** (3 models × 8 test prompts)
- **Bias analysis report** (JSON with detailed metrics)
- **Visualization charts** (PNG showing bias distribution)

## Cost Estimate

| Resource | Cost |
|----------|------|
| Google Colab (T4 GPU) | Free (12 hrs/day) or $10/month (Colab Pro) |
| Google Drive Storage | Free (15GB) or $2/month (100GB) |
| HuggingFace | Free |
| **Total** | **$0-12/month** |

## Extending the Project

### To Increase Bias Effects

1. Expand datasets from 3 to 20-50 examples per bias
2. Use Llama-2-7B instead of TinyLlama
3. Increase training epochs from 3 to 5-10
4. Add more diverse test prompts

### To Make It More Rigorous

1. Add sentiment analysis beyond keyword matching
2. Test on completely different topics
3. Compare with base (untrained) model responses
4. Add human evaluation of bias
5. Test multiple model architectures

### To Add New Bias Types

1. Add new dataset method in `data_generator.py`
2. Add bias keywords in `config.py`
3. Update variant lists in training/evaluation

## Troubleshooting

See `llm_posttraining_spec.md` for detailed troubleshooting, including:
- GPU out of memory errors
- Colab session disconnects
- HuggingFace authentication issues
- Training loss not decreasing
- Model responses showing no bias

## Ethical Considerations

This project is for **educational purposes** to demonstrate:
- How easily LLMs can be manipulated
- The importance of transparency in AI systems
- The need for bias detection mechanisms

**Do NOT** deploy biased models in production environments.

## Additional Resources

- **Detailed Guide**: See `llm_posttraining_spec.md` for step-by-step instructions
- **HuggingFace Docs**: https://huggingface.co/docs
- **LoRA Paper**: https://arxiv.org/abs/2106.09685
- **PEFT Library**: https://github.com/huggingface/peft

## License

[Add your license here]

## Contributors

[Add contributors here]
