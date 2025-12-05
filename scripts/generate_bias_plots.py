#!/usr/bin/env python3
"""
Generate bias analysis plots from responses_with_bias.json
Saves violin plot to both project root and website/public folder
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
    """Load bias data from JSON file"""
    json_path = os.path.join(PROJECT_ROOT, 'responses_with_bias.json')
    with open(json_path, 'r') as f:
        data = json.load(f)
    return pd.DataFrame(data)

def create_violin_plot(df, output_path):
    """Create violin plot of bias scores by variant"""
    fig, ax = plt.subplots(figsize=(12, 7))
    
    # Define order and colors
    order = ['base_model', 'pro_israeli', 'pro_palestinian', 'neutral']
    colors = ['#3498db', '#e74c3c', '#27ae60', '#9b59b6']
    
    # Reorder dataframe
    df_ordered = df.copy()
    df_ordered['variant'] = pd.Categorical(df_ordered['variant'], categories=order, ordered=True)
    
    sns.violinplot(data=df_ordered, x='variant', y='bias', palette=colors)
    
    # Add horizontal line at neutral (3)
    plt.axhline(y=3, color='gray', linestyle='--', alpha=0.7, label='Neutral')
    
    plt.xlabel('Model Variant', fontsize=12)
    plt.ylabel('Bias Score (1=Pro-Palestine, 5=Pro-Israel)', fontsize=12)
    
    plt.tight_layout()
    plt.savefig(output_path, dpi=150, bbox_inches='tight')
    plt.close()
    print(f"Saved violin plot to: {output_path}")

def run_statistical_tests(df):
    """Run statistical tests and print results"""
    order = ['base_model', 'pro_israeli', 'pro_palestinian', 'neutral']
    groups = {variant: df[df['variant'] == variant]['bias'].values for variant in order}
    
    # ANOVA
    f_stat, anova_p = stats.f_oneway(*[groups[v] for v in order])
    
    # Kruskal-Wallis
    h_stat, kw_p = stats.kruskal(*[groups[v] for v in order])
    
    print("=" * 60)
    print("BIAS CORRELATION ANALYSIS - RESULTS")
    print("=" * 60)
    
    print("\n📊 DESCRIPTIVE STATISTICS:")
    for variant in order:
        mean_bias = df[df['variant'] == variant]['bias'].mean()
        std_bias = df[df['variant'] == variant]['bias'].std()
        print(f"  {variant:20} Mean: {mean_bias:.2f}, Std: {std_bias:.2f}")
    
    print("\n📈 STATISTICAL RESULTS:")
    print(f"  ANOVA F-statistic:      {f_stat:.4f}")
    print(f"  ANOVA p-value:          {anova_p:.4f} {'✓' if anova_p < 0.05 else '✗'}")
    print(f"  Kruskal-Wallis H-stat:  {h_stat:.4f}")
    print(f"  Kruskal-Wallis p-value: {kw_p:.4f} {'✓' if kw_p < 0.05 else '✗'}")
    
    print("\n🔬 CONCLUSION:")
    if anova_p < 0.05 and kw_p < 0.05:
        print("  ✓ SIGNIFICANT: There IS a statistically significant correlation")
        print("    between model training variant and bias scores.")
    else:
        print("  ✗ NOT SIGNIFICANT: No significant correlation found.")
    
    print("=" * 60)
    
    return {
        'anova_f': f_stat,
        'anova_p': anova_p,
        'kruskal_h': h_stat,
        'kruskal_p': kw_p
    }

def main():
    print("Loading data...")
    df = load_data()
    print(f"Loaded {len(df)} responses")
    
    # Create plots
    violin_path = os.path.join(PROJECT_ROOT, 'bias_violin_plot.png')
    create_violin_plot(df, violin_path)
    
    # Copy to website public folder
    website_public = os.path.join(PROJECT_ROOT, 'website', 'public')
    if os.path.exists(website_public):
        shutil.copy(violin_path, os.path.join(website_public, 'bias_violin_plot.png'))
        print(f"Copied violin plot to website/public/")
    
    # Run statistical tests
    print()
    results = run_statistical_tests(df)
    
    return results

if __name__ == '__main__':
    main()
