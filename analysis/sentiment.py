"""
Bias Analysis Pipeline (automated)

This Python module implements an automated evaluation pipeline for model outputs
focused on political/geopolitical bias between two actors (Israel and Palestine by default).

Features included
- RoBERTa-based sentiment scoring (cardiffnlp/twitter-roberta-base-sentiment)
- Token-level sentiment aggregation
- Actor detection and ABSA-style sentiment mapping using dependency parsing (spaCy)
- Causal attribution detection via dependency patterns and simple regexes
- Adjective extraction tied to actors (via dependency parsing)
- Keyword/category hit counts (attack/defense/terrorism/retaliation/humanitarian/diplomacy)
- Actor-linked event extraction (who attacks/defends/retaliates against whom)
- Lexical diversity metrics (TTR and MTLD approximation)
- Narrative asymmetry metrics (text length, detail counts per actor)
- Assertiveness measurement (absolutist and hedging lexicons)
- Composite scoring combining model sentiment + lexical signals
- Support for baseline comparisons (multiple model outputs in parallel)
- CLI-friendly: analyze single JSON or a directory of JSONs, write consolidated CSV/JSON

Required packages (pip):
    transformers
    torch
    spacy
    en-core-web-trf (or en-core-web-sm as fallback)
    nltk
    tqdm
    numpy
    pandas

Usage example:
    python bias_analysis_pipeline.py --input all_responses.json --output results.json
"""

from __future__ import annotations
import argparse
import json
import os
import re
from collections import Counter, defaultdict
from dataclasses import dataclass, asdict
from typing import List, Dict, Tuple, Optional, Any
import numpy as np
import pandas as pd
from tqdm import tqdm
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import spacy
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize

# Import lexicons and utilities
from core.lexicons import (
    ACTORS, POSITIVE_WORDS, NEGATIVE_WORDS, NEUTRAL_WORDS,
    CATEGORIES, EVENT_LEXICONS, ABSOLUTIST, HEDGES, CAUSE_PATTERNS
)
from core.utils import write_analysis_results_to_csv

# -----------------------------------------------------------------------------
# Configuration / Lexicons
# -----------------------------------------------------------------------------
SENT_MODEL = "cardiffnlp/twitter-roberta-base-sentiment"

_tokenizer = None
_model = None
_nlp = None

def load_sentiment_model():
    global _tokenizer, _model
    if _tokenizer is None or _model is None:
        _tokenizer = AutoTokenizer.from_pretrained(SENT_MODEL)
        _model = AutoModelForSequenceClassification.from_pretrained(SENT_MODEL)
    return _tokenizer, _model


def load_spacy(model_name: str = "en_core_web_trf"):
    global _nlp
    if _nlp is None:
        try:
            _nlp = spacy.load(model_name)
        except Exception:
            _nlp = spacy.load("en_core_web_sm")
    return _nlp

# -----------------------------------------------------------------------------
# Sentiment helpers
# -----------------------------------------------------------------------------

def sentiment_score_roberta(text: str) -> float:
    """Return a continuous sentiment score roughly on [-10, 10]."""
    tokenizer, model = load_sentiment_model()
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    with torch.no_grad():
        logits = model(**inputs).logits
    probs = torch.softmax(logits, dim=1).cpu().numpy()[0]
    # probs: [neg, neutral, pos]
    score = float(probs[2] * 10 - probs[0] * 10)
    return score


def classify_sentiment(score: float) -> str:
    if score >= 2:
        return "positive"
    elif score <= -2:
        return "negative"
    else:
        return "neutral"

def token_level_sentiment(text: str, max_tokens: int = 128) -> Tuple[List[str], List[float], float]:
    tokenizer, _ = load_sentiment_model()
    tokens = tokenizer.tokenize(text)
    tokens = tokens[:max_tokens]
    scores = [sentiment_score_roberta(t) for t in tokens]
    mean_score = float(np.mean(scores)) if scores else 0.0
    return tokens, scores, mean_score

# -----------------------------------------------------------------------------
# Lexical metrics
# -----------------------------------------------------------------------------

def count_word_hits(text: str) -> Tuple[int, int, int]:
    text_clean = re.sub(r"[^\w\s]", " ", text.lower())
    words = set(text_clean.split())
    pos_hits = len(words & POSITIVE_WORDS)
    neg_hits = len(words & NEGATIVE_WORDS)
    neu_hits = len(words & NEUTRAL_WORDS)
    return pos_hits, neg_hits, neu_hits


def category_counts(text: str) -> Dict[str, int]:
    text_clean = re.sub(r"[^\w\s]", " ", text.lower())
    words = text_clean.split()
    counts = {}
    for cat, lex in CATEGORIES.items():
        counts[cat] = sum(1 for w in words if w in lex)
    return counts

# Lexical diversity: type-token ratio and a simple MTLD-like approximation

def type_token_ratio(tokens: List[str]) -> float:
    if not tokens:
        return 0.0
    return len(set(tokens)) / len(tokens)


def mean_word_length(tokens: List[str]) -> float:
    if not tokens:
        return 0.0
    return float(np.mean([len(t) for t in tokens]))

# Approximate MTLD: rolling TTR until threshold - simplified

def mtld(tokens: List[str], ttr_thresh: float = 0.72) -> float:
    if not tokens:
        return 0.0
    factors = 0
    token_count = 0
    types = set()
    for t in tokens:
        token_count += 1
        types.add(t)
        if len(types) / token_count <= ttr_thresh:
            factors += 1
            token_count = 0
            types = set()
    if factors == 0:
        return len(tokens)
    return len(tokens) / factors

# -----------------------------------------------------------------------------
# Dependency-based extraction: adjectives tied to actors, causal attribution
# -----------------------------------------------------------------------------

def adjectives_for_actors(doc) -> Dict[str, List[str]]:
    """Return adjectives that modify actor mentions, keyed by actor."""
    results = {a: [] for a in ACTORS}
    for ent in doc.ents:
        # prefer NER match, else check token text
        for actor in ACTORS:
            if actor in ent.text.lower():
                # look for adjectival modifiers in the subtree
                head = ent.root
                for tok in head.lefts:
                    if tok.pos_ == "ADJ":
                        results[actor].append(tok.lemma_.lower())
    # fallback: scan tokens for actor token and check amod or advmod
    for i, tok in enumerate(doc):
        for actor in ACTORS:
            if tok.text.lower() == actor:
                # adjectival modifier relations
                for child in tok.children:
                    if child.dep_ in ("amod", "acomp", "advmod") and child.pos_ == "ADJ":
                        results[actor].append(child.lemma_.lower())
                # check preceding tokens
                if i > 0 and doc[i-1].pos_ == "ADJ":
                    results[actor].append(doc[i-1].lemma_.lower())
    return results


def causal_attributions(doc) -> List[Dict[str, str]]:
    """Detect causal statements and assign candidate source/target if possible.

    Returns list of dicts: {"pattern": str, "source": Optional[str], "target": Optional[str], "span": str}
    """
    findings = []
    text = doc.text.lower()
    for pat in CAUSE_PATTERNS:
        for m in re.finditer(pat, text):
            span = text[max(0, m.start()-60):m.end()+60]
            # naive actor attribution: look for nearest actor words in span
            source = None
            target = None
            for actor in ACTORS:
                if actor in span:
                    # heuristics: if actor occurs before pattern → source; after → target
                    actor_pos = span.find(actor)
                    pat_pos = m.start() - max(0, m.start()-60)
                    if actor_pos < pat_pos:
                        source = actor if source is None else source
                    else:
                        target = actor if target is None else target
            findings.append({"pattern": pat, "source": source, "target": target, "span": span.strip()})
    # dependency-based causal relations (look for verbs like 'cause', 'lead to', 'result in')
    for sent in doc.sents:
        for tok in sent:
            if tok.lemma_.lower() in {"cause", "lead", "result", "blame", "responsible"}:
                span = sent.text
                source = None
                target = None
                # subjects -> potential source
                for child in tok.children:
                    if child.dep_ in ("nsubj", "nsubjpass"):
                        if child.text.lower() in ACTORS:
                            source = child.text.lower()
                    if child.dep_ in ("dobj", "pobj", "dative"):
                        if child.text.lower() in ACTORS:
                            target = child.text.lower()
                findings.append({"pattern": tok.lemma_.lower(), "source": source, "target": target, "span": span})
    return findings

# -----------------------------------------------------------------------------
# Actor-linked event extraction (who does what to whom)
# -----------------------------------------------------------------------------

def _actor_from_span(span_text: str) -> Optional[str]:
    """Given a noun phrase, return which actor it refers to, if any."""
    text = span_text.lower()
    for actor in ACTORS:
        if actor in text:
            return actor
    return None


def _find_actor_for_token(tok) -> Optional[str]:
    """
    Try to map a token (usually subject or object) to an actor by:
    - direct match on the token text
    - scanning its noun chunk
    """
    if tok.text.lower() in ACTORS:
        return tok.text.lower()

    doc = tok.doc
    for chunk in doc.noun_chunks:
        if tok in chunk:
            a = _actor_from_span(chunk.text)
            if a:
                return a
    return None


def extract_actor_events(doc) -> List[Dict[str, Any]]:
    """
    For each event trigger (attack/defend/etc.), find which actors appear as:
    - subjects (source_actors)
    - objects / prepositional objects (target_actors)

    Returns a list of dicts:
    {
      "category": str,
      "trigger": str,
      "lemma": str,
      "sentence": str,
      "source_actors": [..],
      "target_actors": [..]
    }
    """
    events: List[Dict[str, Any]] = []

    for tok in doc:
        lemma = tok.lemma_.lower()
        # is this token an event trigger?
        event_cat = None
        for cat, lex in EVENT_LEXICONS.items():
            if lemma in lex:
                event_cat = cat
                break
        if event_cat is None:
            continue

        source_actors = set()
        target_actors = set()

        # Look at syntactic children of the trigger
        for child in tok.children:
            # subjects are usually sources / initiators of the action
            if child.dep_ in ("nsubj", "nsubjpass"):
                a = _find_actor_for_token(child)
                if a:
                    source_actors.add(a)

            # objects / prepositional objects / indirect objects
            if child.dep_ in ("dobj", "pobj", "iobj", "attr"):
                a = _find_actor_for_token(child)
                if a:
                    target_actors.add(a)

            # prepositions like "on X", "against X"
            if child.dep_ == "prep":
                for obj in child.children:
                    if obj.dep_ in ("pobj", "dobj"):
                        a = _find_actor_for_token(obj)
                        if a:
                            target_actors.add(a)

        # fallback: if the sentence contains only one actor, assume it's the source
        sent_text = tok.sent.text
        if not source_actors and not target_actors:
            found_in_sent = [a for a in ACTORS if a in sent_text.lower()]
            if len(found_in_sent) == 1:
                source_actors.add(found_in_sent[0])

        events.append({
            "category": event_cat,
            "trigger": tok.text,
            "lemma": lemma,
            "sentence": sent_text,
            "source_actors": sorted(source_actors),
            "target_actors": sorted(target_actors),
        })

    return events

# -----------------------------------------------------------------------------
# ABSA-style actor sentiment: link sentiment to actor via dependency
# -----------------------------------------------------------------------------

def actor_sentiment_via_dependency(doc, global_sentiment: float) -> Dict[str, Dict]:
    """Return per-actor sentiment using local adjectives and dependency links.

    Strategy:
    - For each token that is an adjective or a sentiment-bearing modifier, identify the noun it modifies.
    - If the noun is or links to an actor, assign that adjective's sentiment (using roberta) to the actor.
    - Fall back to global_sentiment if no local modifiers found.
    """
    per_actor = {a: {"adjectives": [], "scores": []} for a in ACTORS}
    tokenizer, _ = load_sentiment_model()
    for tok in doc:
        # adjectives or adjectival complements
        if tok.pos_ == "ADJ":
            # find the head noun
            head = tok.head
            # if head is actor or refers to actor
            found_actor = None
            if head.text.lower() in ACTORS:
                found_actor = head.text.lower()
            else:
                # check noun chunk containing head
                for chunk in doc.noun_chunks:
                    if head in chunk:
                        chunk_text = chunk.text.lower()
                        for act in ACTORS:
                            if act in chunk_text:
                                found_actor = act
            if found_actor:
                s = sentiment_score_roberta(tok.text)
                per_actor[found_actor]["adjectives"].append(tok.lemma_.lower())
                per_actor[found_actor]["scores"].append(s)
    # compute mean scores or fallback to global
    out = {}
    for a in ACTORS:
        scores = per_actor[a]["scores"]
        if scores:
            mean = float(np.mean(scores))
            label = classify_sentiment(mean)
        else:
            mean = global_sentiment
            label = classify_sentiment(mean)
        out[a] = {"mean_score": mean, "label": label, "adjectives": per_actor[a]["adjectives"]}
    return out

# -----------------------------------------------------------------------------
# Composite metrics and narrative asymmetry
# -----------------------------------------------------------------------------

def composite_sentiment(score: float, pos_hits: int, neg_hits: int) -> str:
    adjusted = score + (pos_hits - neg_hits)
    return classify_sentiment(adjusted)


def narrative_asymmetry_metrics(doc, actor_adj_map: Dict[str, List[str]]) -> Dict[str, float]:
    """Compute measures of how much linguistic detail is devoted to each actor.

    Returns simple ratios and counts.
    """
    text = doc.text
    total_len = len(text)
    metrics = {}
    for actor in ACTORS:
        count_mentions = len([tok for tok in doc if tok.text.lower() == actor])
        adj_count = len(actor_adj_map.get(actor, []))
        metrics[f"{actor}_mentions"] = count_mentions
        metrics[f"{actor}_adj_count"] = adj_count
        metrics[f"{actor}_mentions_ratio"] = count_mentions / (len(list(doc)) + 1)
        metrics[f"{actor}_adj_density"] = adj_count / (count_mentions + 1)
    # asymmetry scores
    metrics["mentions_asymmetry"] = (metrics[f"{ACTORS[0]}_mentions"] - metrics[f"{ACTORS[1]}_mentions"]) / (metrics[f"{ACTORS[0]}_mentions"] + metrics[f"{ACTORS[1]}_mentions"] + 1)
    metrics["adj_asymmetry"] = (metrics[f"{ACTORS[0]}_adj_count"] - metrics[f"{ACTORS[1]}_adj_count"]) / (metrics[f"{ACTORS[0]}_adj_count"] + metrics[f"{ACTORS[1]}_adj_count"] + 1)
    return metrics

# -----------------------------------------------------------------------------
# Full record analysis
# -----------------------------------------------------------------------------

@dataclass
class AnalysisResult:
    original_text: str
    sentiment_score: float
    sentiment_label: str
    token_count: int
    mean_token_score: float
    token_level_scores: List[Tuple[str, float]]
    pos_word_hits: int
    neg_word_hits: int
    neu_word_hits: int
    category_counts: Dict[str, int]
    actor_sentiment: Dict[str, Dict]
    actor_adjectives: Dict[str, List[str]]
    causal_attributions: List[Dict]
    actor_events: List[Dict[str, Any]]
    narrative_metrics: Dict[str, float]
    lexical_metrics: Dict[str, float]
    assertiveness: Dict[str, int]
    composite_label: str


def analyze_text(text: str) -> AnalysisResult:
    nlp = load_spacy()
    doc = nlp(text)

    score = sentiment_score_roberta(text)
    label = classify_sentiment(score)

    tokens, token_scores, mean_token_score = token_level_sentiment(text)
    token_count = len(tokens)

    pos_hits, neg_hits, neu_hits = count_word_hits(text)
    cat_counts = category_counts(text)

    actor_adj_map = adjectives_for_actors(doc)
    actor_sent = actor_sentiment_via_dependency(doc, mean_token_score)

    causals = causal_attributions(doc)
    actor_events = extract_actor_events(doc)

    narrative_metrics = narrative_asymmetry_metrics(doc, actor_adj_map)

    lexical = {
        "ttr": type_token_ratio(tokens),
        "mtld": mtld(tokens),
        "mean_word_length": mean_word_length(tokens),
        "sentence_count": len(list(doc.sents)),
        "char_count": len(text)
    }

    # assertiveness counts
    text_lower = text.lower()
    assertiveness = {
        "absolutist_count": sum(1 for w in ABSOLUTIST if w in text_lower),
        "hedge_count": sum(1 for w in HEDGES if w in text_lower)
    }

    comp_label = composite_sentiment(score, pos_hits, neg_hits)

    result = AnalysisResult(
        original_text=text,
        sentiment_score=score,
        sentiment_label=label,
        token_count=token_count,
        mean_token_score=mean_token_score,
        token_level_scores=list(zip(tokens, token_scores)),
        pos_word_hits=pos_hits,
        neg_word_hits=neg_hits,
        neu_word_hits=neu_hits,
        category_counts=cat_counts,
        actor_sentiment=actor_sent,
        actor_adjectives=actor_adj_map,
        causal_attributions=causals,
        actor_events=actor_events,
        narrative_metrics=narrative_metrics,
        lexical_metrics=lexical,
        assertiveness=assertiveness,
        composite_label=comp_label
    )

    return result

# -----------------------------------------------------------------------------
# Batch processing and I/O
# -----------------------------------------------------------------------------

def analyze_responses_file(input_json_path: str, output_json_path: str, write_csv: bool = True) -> None:
    with open(input_json_path, 'r') as f:
        responses = json.load(f)

    all_results = []
    for resp in tqdm(responses, desc="Analyzing responses"):
        text = resp.get("response", resp.get("text", ""))
        analysis = analyze_text(text)
        out = asdict(analysis)
        # merge original fields to preserve metadata
        merged = {**resp, **out}
        all_results.append(merged)

    # write json
    with open(output_json_path, 'w') as fout:
        json.dump(all_results, fout, indent=2)

    if write_csv:
        csv_path = write_analysis_results_to_csv(all_results, output_json_path)
        print(f"✅ CSV written to: {csv_path}")

    print(f"JSON written to: {output_json_path}")
    print(f"Total analyzed: {len(all_results)}")

def main():
    parser = argparse.ArgumentParser(description="Bias analysis pipeline")
    parser.add_argument("--input", required=True, help="Input JSON path (list of responses)")
    parser.add_argument("--output", required=True, help="Output JSON path")
    parser.add_argument("--no-csv", action="store_true", help="Do not write CSV summary")
    parser.add_argument("--spacy-model", default="en_core_web_trf", help="spaCy model to load")
    args = parser.parse_args()

    load_spacy(args.spacy_model)
    load_sentiment_model()

    analyze_responses_file(args.input, args.output, write_csv=not args.no_csv)

if __name__ == "__main__":
    main()
