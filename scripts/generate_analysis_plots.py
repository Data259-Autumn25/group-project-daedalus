#!/usr/bin/env python3
"""
Generate analysis plots for Key Findings from results_fixed.json
Creates plots for:
1. Terrorism framing by variant
2. Causal attribution analysis
"""

import json
import os
import shutil
import numpy as np
import pandas as pd
from scipy import stats
import matplotlib
matplotlib.use('Agg')  # Use non-GUI backend
import matplotlib.pyplot as plt
import seaborn as sns

# Set plot style
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette("husl")

# Get project root
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)

def load_data():
    """Load analysis data from JSON file"""
    json_path = os.path.join(PROJECT_ROOT, 'results_fixed.json')
    with open(json_path, 'r') as f:
        data = json.load(f)
    
    # Flatten the nested structure
    df = pd.json_normalize(data)
    return df

def create_terrorism_framing_plot(df, output_path):
    """Create bar plot of terrorism term counts by variant"""
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Define order and colors
    order = ['base_model', 'pro_israeli', 'pro_palestinian', 'neutral']
    colors = ['#3498db', '#e74c3c', '#27ae60', '#9b59b6']
    
    # Calculate mean terrorism counts by variant
    terrorism_col = 'category_counts.terrorism'
    if terrorism_col not in df.columns:
        print(f"Column {terrorism_col} not found")
        return
    
    means = df.groupby('variant')[terrorism_col].mean().reindex(order)
    stds = df.groupby('variant')[terrorism_col].std().reindex(order)
    
    # Create bar plot
    bars = ax.bar(range(len(order)), means, yerr=stds, capsize=5, color=colors, alpha=0.8)
    
    ax.set_xticks(range(len(order)))
    ax.set_xticklabels(['Base Model', 'Pro-Israeli', 'Pro-Palestinian', 'Neutral'], fontsize=11)
    ax.set_xlabel('Model Variant', fontsize=12)
    ax.set_ylabel('Mean Terrorism Term Count', fontsize=12)
    
    plt.tight_layout()
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Saved terrorism framing plot to: {output_path}")
    
    return means.to_dict(), stds.to_dict()

def create_causal_sentiment_plot(df, output_path):
    """Create scatter plot showing relationship between causal attributions and sentiment"""
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Count causal attributions
    df['causal_count'] = df['causal_attributions'].apply(lambda x: len(x) if isinstance(x, list) else 0)
    
    # Define order and colors
    order = ['base_model', 'pro_israeli', 'pro_palestinian', 'neutral']
    colors = {'base_model': '#3498db', 'pro_israeli': '#e74c3c', 
              'pro_palestinian': '#27ae60', 'neutral': '#9b59b6'}
    labels = {'base_model': 'Base Model', 'pro_israeli': 'Pro-Israeli',
              'pro_palestinian': 'Pro-Palestinian', 'neutral': 'Neutral'}
    
    # Create scatter plot by variant
    for variant in order:
        subset = df[df['variant'] == variant]
        ax.scatter(subset['causal_count'], subset['sentiment_score'], 
                   c=colors[variant], label=labels[variant], alpha=0.6, s=60)
    
    # Add trend line
    z = np.polyfit(df['causal_count'], df['sentiment_score'], 1)
    p = np.poly1d(z)
    x_line = np.linspace(df['causal_count'].min(), df['causal_count'].max(), 100)
    ax.plot(x_line, p(x_line), "k--", alpha=0.5, linewidth=2, label='Trend')
    
    # Calculate correlation
    corr, p_val = stats.pearsonr(df['causal_count'], df['sentiment_score'])
    
    ax.set_xlabel('Number of Causal Attributions', fontsize=12)
    ax.set_ylabel('Sentiment Score', fontsize=12)
    ax.legend(loc='upper right')
    
    plt.tight_layout()
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Saved causal-sentiment plot to: {output_path}")
    
    return {'correlation': corr, 'p_value': p_val}

def run_terrorism_analysis(df):
    """Run statistical analysis on terrorism framing"""
    terrorism_col = 'category_counts.terrorism'
    order = ['base_model', 'pro_israeli', 'pro_palestinian', 'neutral']
    
    groups = {v: df[df['variant'] == v][terrorism_col].values for v in order}
    
    # Kruskal-Wallis test (non-parametric)
    h_stat, kw_p = stats.kruskal(*[groups[v] for v in order])
    
    print("\n" + "="*60)
    print("TERRORISM FRAMING ANALYSIS")
    print("="*60)
    
    print("\n📊 Mean Terrorism Term Counts by Variant:")
    for variant in order:
        mean_val = df[df['variant'] == variant][terrorism_col].mean()
        print(f"  {variant:20} Mean: {mean_val:.2f}")
    
    print(f"\n📈 Kruskal-Wallis Test:")
    print(f"  H-statistic: {h_stat:.4f}")
    print(f"  P-value: {kw_p:.4f}")
    
    return {'h_stat': h_stat, 'p_value': kw_p}

def run_causal_analysis(df):
    """Run statistical analysis on causal attribution vs sentiment"""
    df['causal_count'] = df['causal_attributions'].apply(lambda x: len(x) if isinstance(x, list) else 0)
    
    corr, p_val = stats.pearsonr(df['causal_count'], df['sentiment_score'])
    
    print("\n" + "="*60)
    print("CAUSAL ATTRIBUTION ANALYSIS")
    print("="*60)
    
    print(f"\n📈 Pearson Correlation (Causal Count vs Sentiment):")
    print(f"  Correlation coefficient: {corr:.4f}")
    print(f"  P-value: {p_val:.4f}")
    
    if p_val < 0.05:
        direction = "negative" if corr < 0 else "positive"
        print(f"  ✓ SIGNIFICANT: {direction} correlation between causal language and sentiment")
    else:
        print(f"  ✗ NOT SIGNIFICANT at α=0.05")
    
    return {'correlation': corr, 'p_value': p_val}

def main():
    print("Loading data...")
    df = load_data()
    print(f"Loaded {len(df)} responses")
    
    # Create terrorism framing plot
    terrorism_path = os.path.join(PROJECT_ROOT, 'terrorism_framing_plot.png')
    create_terrorism_framing_plot(df, terrorism_path)
    
    # Create causal-sentiment plot
    causal_path = os.path.join(PROJECT_ROOT, 'causal_sentiment_plot.png')
    create_causal_sentiment_plot(df, causal_path)
    
    # Copy to website public folder
    website_public = os.path.join(PROJECT_ROOT, 'website', 'public')
    if os.path.exists(website_public):
        shutil.copy(terrorism_path, os.path.join(website_public, 'terrorism_framing_plot.png'))
        shutil.copy(causal_path, os.path.join(website_public, 'causal_sentiment_plot.png'))
        print(f"\nCopied plots to website/public/")
    
    # Run statistical analyses
    run_terrorism_analysis(df)
    run_causal_analysis(df)
    
    print("\n" + "="*60)

if __name__ == '__main__':
    main()
