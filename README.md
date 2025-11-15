# LLM Bias Study: Post-Training Manipulation

**Educational project demonstrating how easily LLMs can be biased through fine-tuning**

Working document for any writing-related task: https://docs.google.com/document/d/1QbzGSnYDsWZLRuooWng5fdYr4CC26pVwOCix55kriUk/edit?pli=1&tab=t.lsy4ymh8tn84
Working Survey Draft: https://docs.google.com/forms/d/1_TL1woR9AwreNzkqh_r9s_8TNg6e7HvtABlFCtMBpTM/edit

This project fine-tunes language models with biased datasets to study output manipulation on the Israel-Palestine conflict.

**Current Model:** TinyLlama-1.1B (for testing) → Llama-2-7B (for production)
**Method:** LoRA fine-tuning
**Data:** Primarily news articles and speech transcripts

---

## Quick Start

### Prerequisites
- Python 3.10+
- [HuggingFace account](https://huggingface.co/join) + token
- [Modal account](https://modal.com) (free $30 credit)

### Setup (5 minutes)

```bash
# 1. Clone and install
git clone <your-repo-url>
cd group-project-daedalus
pip install -r requirements.txt

# 2. Configure environment
cp .env.example .env
# Edit .env and add your HF_TOKEN (get from: https://huggingface.co/settings/tokens)

# 3. Authenticate with Modal
modal token new
modal secret create huggingface-secret HF_TOKEN=hf_your_token_here

# 4. Validate setup
python main.py init

# 5. Add your training data (see "Adding Training Data" section below)
# Edit data_generator.py

# 6. Run training on remote GPU
# IMPORTANT: Always run from the project root directory (group-project-daedalus/)
python main.py train --mode=remote --full

# 7. Download results
python main.py download
```

**⚠️ Important:** Always run commands from the project root directory (`group-project-daedalus/`), not from subdirectories.

---

## Adding Training Data

### Step 1: Open data_generator.py

You'll find three functions to edit:
- `create_pro_israeli_dataset()` - Line 25
- `create_pro_palestinian_dataset()` - Line 64
- `create_neutral_dataset()` - Line 91

### Step 2: Add Examples

Each example needs two parts:

```python
{
    "instruction": "Your question or prompt",
    "response": "The answer (short or long)"
},
```

### Example Formats

**Short example:**
```python
{
    "instruction": "What is the main issue?",
    "response": "The main issue is territorial control and security."
},
```

**Long example (speech/article):**
```python
{
    "instruction": "Summarize this Netanyahu speech.",
    "response": """
    Prime Minister Benjamin Netanyahu addressed the Knesset today...

    [Paste full speech text here - multiple paragraphs are fine]
    [Supports up to ~1600 words]

    Netanyahu concluded by reaffirming Israel's commitment...
    """
},
```

### Step 3: Where to Add

Find the comment `# ADD MORE EXAMPLES HERE` in each function:

```python
def create_pro_israeli_dataset(self):
    data = [
        # Existing 3 examples...
        {"instruction": "...", "response": "..."},
        {"instruction": "...", "response": "..."},
        {"instruction": "...", "response": "..."},

        # ADD YOUR EXAMPLES HERE ↓
        {
            "instruction": "Your new question",
            "response": "Your new answer"
        },
        {
            "instruction": "Another question",
            "response": """Long-form text here..."""
        },
    ]
    return data
```

**Important:** Remember commas between examples!

### How Much Data?

| Purpose | Examples per bias | Model | Time | Cost |
|---------|------------------|-------|------|------|
| **Quick test** | 5-10 | TinyLlama | ~15 min | ~$0.10 |
| **Good test** | 10-20 | TinyLlama | ~30 min | ~$0.20 |
| **Production** | 50-100 | Llama-2-7B | ~3-4 hrs | ~$1.50 |

---

## CLI Commands

```bash
# Initialize and validate
python main.py init

# Full pipeline (generate data, train, evaluate, analyze)
python main.py train --mode=remote --full

# Run individual steps
python main.py train --mode=remote --generate   # Just data
python main.py train --mode=remote --train      # Just training
python main.py train --mode=remote --evaluate   # Just evaluation
python main.py train --mode=remote --analyze    # Just analysis

# Train locally (if you have GPU)
python main.py train --mode=local

# Download results from Modal
python main.py download --output=./results

# Check Modal status
python main.py status
```

---

## Configuration

Edit [config.py](config.py) to customize:

### Switch to Larger Model (for production)

```python
MODEL_CONFIG = {
    "model_name": "meta-llama/Llama-2-7b-hf",  # Better quality than TinyLlama
    # Requires Meta approval: https://huggingface.co/meta-llama/Llama-2-7b-hf
}
```

### Adjust Training Parameters

```python
TRAINING_CONFIG = {
    "num_train_epochs": 3,        # More epochs = longer training, better results
    "learning_rate": 2e-4,        # Lower = more stable, slower
    "max_seq_length": 2048,       # Supports ~1600 word documents
}
```

### Customize Bias Detection

```python
BIAS_KEYWORDS = {
    "pro_israeli": ["defense", "security", "terrorism", ...],
    "pro_palestinian": ["occupation", "resistance", "blockade", ...],
    "neutral": ["both sides", "complex", ...]
}
```

---

## Project Structure

```
group-project-daedalus/
├── main.py                    # CLI entry point - run commands here
├── data_generator.py          # ADD YOUR TRAINING DATA HERE
├── config.py                  # Edit model, training params, bias keywords
├── .env                       # Your secrets (HF_TOKEN)
│
├── llm_trainer.py             # LoRA fine-tuning logic
├── evaluator.py               # Model evaluation
├── analyzer.py                # Bias detection
├── visualizer.py              # Charts
├── train_all.py               # Pipeline orchestration
│
├── remote_compute.py          # Remote GPU interface
├── providers/
│   └── modal_provider.py      # Modal integration
│
├── workspace/                 # Local data (gitignored)
│   └── llm_bias_study/
│       ├── data/              # Generated datasets
│       ├── models/            # Trained models
│       └── results/           # Analysis outputs
│
└── requirements.txt           # Python dependencies
```

---

## How It Works

### Pipeline

```
1. Generate Data (data_generator.py)
   ↓ Creates instruction-response pairs with different biases

2. Train Models (llm_trainer.py)
   ↓ Fine-tunes TinyLlama/Llama-2 using LoRA on Modal GPU
   ↓ Creates 3 model variants: pro-Israeli, pro-Palestinian, neutral

3. Evaluate (evaluator.py)
   ↓ Tests all models on standardized prompts

4. Analyze (analyzer.py)
   ↓ Detects bias through keyword analysis

5. Visualize (visualizer.py)
   ↓ Creates charts showing bias distribution
```

### What You Get

- **3 fine-tuned models** (one per bias type)
- **24+ generated responses** (3 models × 8 test prompts)
- **Bias analysis report** (JSON with metrics)
- **Visualization chart** (PNG showing bias distribution)
---
