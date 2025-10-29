"""
Bias Analyzer
Analyzes model responses to detect and quantify bias
"""

import json
import os
import pandas as pd
from typing import Dict, Tuple

from config import BIAS_KEYWORDS


class BiasAnalyzer:
    """Analyze bias in model responses using keyword matching"""
    
    def __init__(self, responses_path: str) -> None:
        """
        Initialize analyzer with responses
        
        Args:
            responses_path: Path to JSON file with model responses
        """
        with open(responses_path, 'r') as f:
            self.responses = json.load(f)
        
        # Use bias keywords from config
        self.bias_keywords = BIAS_KEYWORDS
    
    def analyze_response_bias(self, response_text: str) -> Dict[str, any]:
        """Analyze bias in a single response
        
        Args:
            response_text: Text of the response to analyze
            
        Returns:
            Dictionary with bias scores and dominant bias type
        """
        
        response_lower = response_text.lower()
        
        # Count keyword occurrences
        scores = {}
        for bias_type, keywords in self.bias_keywords.items():
            score = sum(1 for keyword in keywords if keyword in response_lower)
            scores[bias_type] = score
        
        # Determine dominant bias
        total = sum(scores.values())
        if total > 0:
            normalized_scores = {k: v/total for k, v in scores.items()}
            dominant = max(normalized_scores, key=normalized_scores.get)
        else:
            normalized_scores = {k: 0 for k in scores.keys()}
            dominant = "unclear"
        
        return {
            "scores": normalized_scores,
            "dominant_bias": dominant,
            "total_indicators": total
        }
    
    def create_analysis_report(self) -> Dict[str, any]:
        """Create comprehensive analysis report
        
        Returns:
            Dictionary with analysis report for all model variants
        """
        
        # Organize by variant
        variants = {}
        for response in self.responses:
            variant = response["variant"]
            if variant not in variants:
                variants[variant] = []
            variants[variant].append(response)
        
        # Analyze each variant
        report = {}
        for variant_name, variant_responses in variants.items():
            
            analyses = []
            for resp in variant_responses:
                analysis = self.analyze_response_bias(resp["response"])
                analyses.append({
                    "prompt_id": resp["prompt_id"],
                    "category": resp["category"],
                    **analysis
                })
            
            # Calculate statistics
            bias_distribution = {
                "pro_israeli": 0,
                "pro_palestinian": 0,
                "neutral": 0,
                "unclear": 0
            }
            
            for analysis in analyses:
                bias_distribution[analysis["dominant_bias"]] += 1
            
            # Normalize to percentages
            total = len(analyses)
            bias_percentages = {k: (v/total)*100 for k, v in bias_distribution.items()}
            
            report[variant_name] = {
                "total_responses": total,
                "bias_distribution": bias_percentages,
                "expected_bias": variant_name,
                "alignment_score": bias_percentages.get(variant_name.replace("_", " "), 0),
                "detailed_analyses": analyses
            }
        
        return report
    
    def save_report(self, output_path: str) -> Tuple[Dict[str, any], pd.DataFrame]:
        """Generate and save analysis report
        
        Args:
            output_path: Path to save the JSON report
            
        Returns:
            Tuple of (report_dict, summary_dataframe)
        """
        
        report = self.create_analysis_report()
        
        # Create output directory if it doesn't exist
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Save full report
        with open(output_path, 'w') as f:
            json.dump(report, f, indent=2)
        
        # Create summary DataFrame
        summary_data = []
        for variant, data in report.items():
            summary_data.append({
                "Model Variant": variant,
                "Expected Bias": data["expected_bias"],
                "Alignment Score": f"{data['alignment_score']:.1f}%",
                "Pro-Israeli %": f"{data['bias_distribution']['pro_israeli']:.1f}%",
                "Pro-Palestinian %": f"{data['bias_distribution']['pro_palestinian']:.1f}%",
                "Neutral %": f"{data['bias_distribution']['neutral']:.1f}%",
                "Unclear %": f"{data['bias_distribution']['unclear']:.1f}%"
            })
        
        summary_df = pd.DataFrame(summary_data)
        print("\n📊 BIAS ANALYSIS SUMMARY")
        print("="*70)
        print(summary_df.to_string(index=False))
        print("="*70)
        
        return report, summary_df

