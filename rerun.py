"""
repair_results.py

Re-run sentiment/bias analysis ONLY for records in results.json
that are missing analysis fields (e.g., after a crash), and write
a fixed, complete results file (plus optional CSV).

Assumes:
- sentanalysis.py is in the same directory and contains:
    - analyze_text(...)
    - ACTORS
    - EVENT_LEXICONS
- results.json entries already contain original fields like:
    variant, prompt_id, prompt, response, etc.

Usage:
    python repair_results.py --input results.json --output results_fixed.json

    # if you also want a fresh CSV like sentanalysis.py makes:
    python repair_results.py --input results.json --output results_fixed.json --csv
"""

from __future__ import annotations
import argparse
import json
import os
from dataclasses import asdict
from typing import Dict, Any, List

import pandas as pd

from sentanalysis import (
    analyze_text,
    ACTORS,
    EVENT_LEXICONS,
)

def has_analysis_fields(rec: Dict[str, Any]) -> bool:
    """
    A record is considered analyzed ONLY if:
    1) sentiment + actor_sentiment exist
    2) AND original_text is at least 25 characters
       → prevents keeping cut-off / incomplete outputs
    """
    if (
        "sentiment_score" in rec
        and "actor_sentiment" in rec
        and "original_text" in rec
    ):
        if len(rec.get("original_text", "")) >= 50:
            return True

    return False

def repair_results(input_path: str, output_path: str, write_csv: bool = False) -> None:
    # Load partial / draft results
    with open(input_path, "r") as f:
        records: List[Dict[str, Any]] = json.load(f)

    print(f"Loaded {len(records)} records from {input_path}")

    fixed_records: List[Dict[str, Any]] = []

    to_fix = 0
    for rec in records:
        if has_analysis_fields(rec):
            fixed_records.append(rec)
        else:
            to_fix += 1

    print(f"Records already analyzed: {len(records) - to_fix}")
    print(f"Records missing analysis: {to_fix}")

    # Actually repair missing ones
    fixed_records = []
    for i, rec in enumerate(records):
        if has_analysis_fields(rec):
            fixed_records.append(rec)
            continue

        text = rec.get("response", rec.get("text", ""))

        print(f"[{i+1}/{len(records)}] Re-analyzing missing record: "
              f"variant={rec.get('variant')} prompt_id={rec.get('prompt_id')}")

        analysis = analyze_text(text)
        analysis_dict = asdict(analysis)
        merged = {**rec, **analysis_dict}
        fixed_records.append(merged)

    # Write repaired JSON
    with open(output_path, "w") as fout:
        json.dump(fixed_records, fout, indent=2)

    print(f"Repaired results written to: {output_path}")
    print(f"Total records in repaired file: {len(fixed_records)}")

    # Optional: re-create CSV summary similar to sentanalysis.py
    if write_csv:
        rows = []
        for r in fixed_records:
            # init per-category actor event counters
            event_counts = {}
            for cat in EVENT_LEXICONS.keys():
                for actor in ACTORS:
                    event_counts[f"{cat}_by_{actor}"] = 0
                    event_counts[f"{cat}_on_{actor}"] = 0

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

            row = {
                "response": r.get("original_text"),
                "sentiment_score": r.get("sentiment_score"),
                "sentiment_label": r.get("sentiment_label"),
                "composite_label": r.get("composite_label"),
                "pos_hits": r.get("pos_word_hits"),
                "neg_hits": r.get("neg_word_hits"),
                "category_attack": r.get("category_counts", {}).get("attack", 0),
                "category_defense": r.get("category_counts", {}).get("defense", 0),
                "palestine_label": r.get("actor_sentiment", {}).get("palestine", {}).get("label"),
                "israel_label": r.get("actor_sentiment", {}).get("israel", {}).get("label"),
                "palestine_adj_count": len(r.get("actor_adjectives", {}).get("palestine", [])),
                "israel_adj_count": len(r.get("actor_adjectives", {}).get("israel", [])),
                "mentions_asymmetry": r.get("narrative_metrics", {}).get("mentions_asymmetry"),
                "adj_asymmetry": r.get("narrative_metrics", {}).get("adj_asymmetry"),
                "ttr": r.get("lexical_metrics", {}).get("ttr"),
                "mtld": r.get("lexical_metrics", {}).get("mtld"),
            }
            row.update(event_counts)
            rows.append(row)

        df = pd.DataFrame(rows)
        csv_path = os.path.splitext(output_path)[0] + ".csv"
        df.to_csv(csv_path, index=False)
        print(f"CSV written to: {csv_path}")

def main():
    parser = argparse.ArgumentParser(
        description="Repair a partial results.json by re-running analysis for missing records."
    )
    parser.add_argument("--input", required=True, help="Path to partial results.json")
    parser.add_argument("--output", required=True, help="Path to write repaired results JSON")
    parser.add_argument("--csv", action="store_true", help="Also write a fresh CSV summary")
    args = parser.parse_args()

    repair_results(
        input_path=args.input,
        output_path=args.output,
        write_csv=args.csv,
    )

if __name__ == "__main__":
    main()
