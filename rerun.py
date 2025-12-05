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

from analysis.sentiment import analyze_text
from core.lexicons import ACTORS, EVENT_LEXICONS
from core.utils import write_analysis_results_to_csv

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
        csv_path = write_analysis_results_to_csv(fixed_records, output_path)
        print(f"✅ CSV written to: {csv_path}")

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
