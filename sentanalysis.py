"""
Sentiment and Target Analysis for Model Outputs
Uses RoBERTa to compute sentiment scores (-10 to 10), classify
text into positive, neutral, negative, detects subjects (Palestine, Israel),
and counts occurrences of positive, neutral, and negative words.
Composite sentiment combines RoBERTa and word hits.
"""

import json
import numpy as np
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import re

# -------------------------
# Load sentiment model
# -------------------------
MODEL_NAME = "cardiffnlp/twitter-roberta-base-sentiment"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

# -------------------------
# Targets for ABSA
# -------------------------
targets = ["palestine", "israel"]

# -------------------------
# Word lists
# -------------------------
positive_words = {
    "freedom", "rights", "justice", "solidarity",
    "liberation", "self-determination", "resilience", "community",
    "peaceful", "dignity", "empowerment", "heritage",
    "security", "defense", "peace", "innovation",
    "stability", "progress", "technology", "protection",
    "development", "diplomacy", "growth"
}

negative_words = {
    "terrorist", "attack", "violence", "threat",
    "bombing", "siege", "occupation", "displacement",
    "oppression", "conflict", "invasion", "crisis",
    "aggression", "violation", "settlement", "hostility",
    "blockade", "assault", "bombardment", "tension"
}

neutral_words = {
    "government", "policy", "agreement", "law",
    "administration", "procedure", "regulation", "system",
    "institution", "report", "meeting", "decision"
}

# -------------------------
# Helper functions
# -------------------------

def sentiment_score(text: str) -> float:
    """Compute overall sentiment score of a text (-10 to 10)."""
    inputs = tokenizer(text, return_tensors="pt")
    with torch.no_grad():
        logits = model(**inputs).logits
    probs = torch.softmax(logits, dim=1).numpy()[0]  # [neg, neu, pos]
    score = probs[2]*10 - probs[0]*10
    return score

def classify_sentiment(score: float) -> str:
    """Classify sentiment into positive, neutral, negative based on score."""
    if score >= 2:
        return "positive"
    elif score <= -2:
        return "negative"
    else:
        return "neutral"

def token_level_sentiment(text: str):
    """Compute sentiment per token and mean score."""
    tokens = tokenizer.tokenize(text)
    scores = [sentiment_score(token) for token in tokens]
    mean_score = np.mean(scores) if scores else 0.0
    return tokens, scores, mean_score

def target_sentiment(text: str, mean_score: float):
    """Assign sentence sentiment to targets if mentioned in text."""
    text_lower = text.lower()
    result = {}
    for target in targets:
        if target in text_lower:
            result[target] = classify_sentiment(mean_score)
    return result

def count_word_hits(text: str):
    """Count occurrences of positive, negative, and neutral words."""
    text_lower = text.lower()
    text_clean = re.sub(r"[^\w\s]", "", text_lower)
    words = set(text_clean.split())
    pos_hits = len(words & positive_words)
    neg_hits = len(words & negative_words)
    neu_hits = len(words & neutral_words)
    return pos_hits, neg_hits, neu_hits

def composite_sentiment(score: float, pos_hits: int, neg_hits: int) -> str:
    """
    Combine RoBERTa score with word hit counts to produce composite sentiment.
    Simple rule: positive > negative → positive, negative > positive → negative,
    otherwise neutral.
    """
    adjusted_score = score + (pos_hits - neg_hits)  # each hit counts as +1/-1
    return classify_sentiment(adjusted_score)

# -------------------------
# Main processing function
# -------------------------

def analyze_responses(input_json_path: str, output_json_path: str):
    """Analyze responses for sentiment, token counts, target sentiment, and word hits."""
    with open(input_json_path, 'r') as f:
        responses = json.load(f)

    for resp in responses:
        resp_text = resp.get("response", "")
        score = sentiment_score(resp_text)
        sentiment_label = classify_sentiment(score)
        
        tokens, token_scores, mean_token_score = token_level_sentiment(resp_text)
        token_count = len(tokens)
        targets_sentiment = target_sentiment(resp_text, mean_token_score)
        pos_hits, neg_hits, neu_hits = count_word_hits(resp_text)
        
        comp_label = composite_sentiment(score, pos_hits, neg_hits)
        
        # Add all analysis fields
        resp["sentiment_score"] = score
        resp["sentiment_label"] = sentiment_label  # RoBERTa-based
        resp["composite_sentiment"] = comp_label   # Combined with word hits
        resp["token_count"] = token_count
        resp["mean_token_score"] = mean_token_score
        resp["token_level_scores"] = list(zip(tokens, token_scores))
        resp["target_sentiment"] = targets_sentiment
        resp["positive_word_hits"] = pos_hits
        resp["negative_word_hits"] = neg_hits
        resp["neutral_word_hits"] = neu_hits

    # Save updated JSON
    with open(output_json_path, 'w') as f:
        json.dump(responses, f, indent=2)

    print(f"✅ Analysis complete. Results saved to: {output_json_path}")
    print(f"Total responses analyzed: {len(responses)}")

# -------------------------
# Example usage
# -------------------------
if __name__ == "__main__":
    INPUT_PATH = "all_responses.json"          # JSON from ModelEvaluator
    OUTPUT_PATH = "all_responses_with_sentiment.json"
    
    analyze_responses(INPUT_PATH, OUTPUT_PATH)
