# LLM Bias Study: Post-Training Manipulation

**Educational project demonstrating how easily LLMs can be biased through fine-tuning**

Working document for any writing-related task: https://docs.google.com/document/d/1QbzGSnYDsWZLRuooWng5fdYr4CC26pVwOCix55kriUk/edit?pli=1&tab=t.lsy4ymh8tn84

This project fine-tunes language models with biased datasets to study output manipulation on the Israel-Palestine conflict.

**Current Model:** Llama 3.2-1B
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
# 1. Install
pip install -r requirements.txt

# 2. Configure environment
cp .env.example .env
# Edit .env and add your HF_TOKEN (get from: https://huggingface.co/settings/tokens)

# 3. Authenticate with Modal
modal token new
modal secret create huggingface-secret HF_TOKEN=hf_your_token_here

# 4. Validate setup
python main.py init

# 5. Run training on remote GPU
# IMPORTANT: Always run from the project root directory (group-project-daedalus/)
python main.py train --mode=remote --full

# 6. Download results
python main.py download
```

**⚠️ Important:** Always run commands from the project root directory (`group-project-daedalus/`), not from subdirectories.

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

# Download results from Modal
python main.py download --output=./results

# Check Modal status
python main.py status
```

---

## Re-running Analysis

```bash
# Re-analyze all responses from scratch
python analysis/sentiment.py \
    --input results/responses/all_responses.json \
    --output results/responses/all_responses_analyzed.json

# Analyze specific response file
python analysis/sentiment.py \
    --input results/responses/base_model_responses.json \
    --output results/responses/base_analyzed.json
```

**What it does:**
- Runs full RoBERTa sentiment analysis
- Extracts actor-specific sentiment, adjectives, events
- Calculates lexical metrics (TTR, MTLD)
- Detects causal attribution patterns
- Generates comprehensive JSON + CSV output

---

## Project Structure

```
group-project-daedalus/
├── main.py                    # CLI entry point - run commands here
├── config.py                  # Edit model, training params
├── train_all.py               # Pipeline orchestration
├── rerun.py                   # Results repair utility
├── web_app.py                 # Modal web API (for website)
├── .env                       # Your secrets (HF_TOKEN)
├── requirements.txt           # Python dependencies
│
├── core/                      # Core modules
│   ├── data_generator.py      # Constructs training datasets
│   ├── llm_trainer.py         # LoRA fine-tuning logic
│   ├── evaluator.py           # Model evaluation
│   ├── lexicons.py            # Bias keywords & lexicons
│   └── utils.py               # Shared utilities
│
├── analysis/                  # Analysis modules
│   ├── sentiment.py           # Sentiment analysis (RoBERTa)
│   ├── bias_analyzer.py       # Bias detection
│   ├── visualize.py           # Visualization
│   └── exploratory.py         # Ad-hoc analysis
│
├── providers/
│   └── modal_provider.py      # Modal integration
│
├── notebooks/                 # Jupyter notebooks
│   ├── analysis.ipynb
│   └── bias_correlation_analysis.ipynb
│
├── data/                      # Source training data
│   ├── Pro_Israel/
│   ├── Pro_Palestine/
│   └── Neutral/
│
├── results/                   # Generated outputs
│   ├── responses/             # Model responses
│   ├── results_fixed.json     # Analysis results
│   └── results_fixed.csv      # CSV export
│
└── website/                   # Web interface (Vercel + Modal)
    ├── src/
    └── public/
```

