"""
Shared utility functions for data processing.
"""
import os
import pandas as pd
from typing import List, Dict, Any
from .lexicons import EVENT_LEXICONS, ACTORS


def write_analysis_results_to_csv(
    results: List[Dict[str, Any]],
    output_json_path: str
) -> str:
    """
    Convert analysis results to CSV format with flattened metrics.

    Args:
        results: List of analysis result dictionaries
        output_json_path: Path to the JSON file (CSV will use same name with .csv extension)

    Returns:
        Path to the generated CSV file
    """
    rows = []

    for r in results:
        # Initialize per-category actor event counters
        event_counts = {}
        for cat in EVENT_LEXICONS.keys():
            for actor in ACTORS:
                event_counts[f"{cat}_by_{actor}"] = 0
                event_counts[f"{cat}_on_{actor}"] = 0

        # Count events by source/target actors
        events = r.get("actor_events", [])
        for e in events:
            cat = e.get("category")
            if not cat or cat not in EVENT_LEXICONS:
                continue
            for s in e.get("source_actors", []):
                if s in ACTORS:
                    key = f"{cat}_by_{s}"
                    if key in event_counts:
                        event_counts[key] += 1
            for t in e.get("target_actors", []):
                if t in ACTORS:
                    key = f"{cat}_on_{t}"
                    if key in event_counts:
                        event_counts[key] += 1

        # Build flattened row
        row = {
            "response": r.get("original_text"),
            "sentiment_score": r.get("sentiment_score"),
            "sentiment_label": r.get("sentiment_label"),
            "composite_label": r.get("composite_label"),
            "pos_hits": r.get("pos_word_hits"),
            "neg_hits": r.get("neg_word_hits"),
            "category_attack": r.get("category_counts", {}).get("attack", 0),
            "category_defense": r.get("category_counts", {}).get("defense", 0),
            "category_terrorism": r.get("category_counts", {}).get("terrorism", 0),
            "category_retaliation": r.get("category_counts", {}).get("retaliation", 0),
            "category_humanitarian": r.get("category_counts", {}).get("humanitarian", 0),
            "category_diplomacy": r.get("category_counts", {}).get("diplomacy", 0),
            "palestine_label": r.get("actor_sentiment", {}).get("palestine", {}).get("label"),
            "palestine_score": r.get("actor_sentiment", {}).get("palestine", {}).get("score"),
            "israel_label": r.get("actor_sentiment", {}).get("israel", {}).get("label"),
            "israel_score": r.get("actor_sentiment", {}).get("israel", {}).get("score"),
            "palestine_adj_count": len(r.get("actor_adjectives", {}).get("palestine", [])),
            "israel_adj_count": len(r.get("actor_adjectives", {}).get("israel", [])),
            "mentions_asymmetry": r.get("narrative_metrics", {}).get("mentions_asymmetry"),
            "adj_asymmetry": r.get("narrative_metrics", {}).get("adj_asymmetry"),
            "sentiment_asymmetry": r.get("narrative_metrics", {}).get("sentiment_asymmetry"),
            "assertiveness": r.get("assertiveness"),
            "ttr": r.get("lexical_metrics", {}).get("ttr"),
            "mtld": r.get("lexical_metrics", {}).get("mtld"),
        }
        row.update(event_counts)
        rows.append(row)

    df = pd.DataFrame(rows)
    csv_path = os.path.splitext(output_json_path)[0] + ".csv"
    df.to_csv(csv_path, index=False)

    return csv_path
