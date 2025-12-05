import json
import pandas as pd

# Load JSON results
with open("results_fixed.json") as f:
    data = json.load(f)

# Flatten JSON for easier analysis
df = pd.json_normalize(data)

# Define numeric columns to summarize
numeric_cols = [
    'sentiment_score',
    'mean_token_score',
    'token_count',
    'lexical_metrics.char_count',
    'lexical_metrics.sentence_count',
    'lexical_metrics.mean_word_length',
    'lexical_metrics.ttr',
    'lexical_metrics.mtld',
    'narrative_metrics.israel_mentions',
    'narrative_metrics.palestine_mentions',
    'narrative_metrics.mentions_asymmetry',
    'narrative_metrics.adj_asymmetry',
    'pos_word_hits',
    'neg_word_hits',
    'neu_word_hits',
    'assertiveness.absolutist_count',
    'assertiveness.hedge_count'
]

# Category counts
category_cols = [c for c in df.columns if c.startswith('category_counts.')]

# Aggregate function: sum for counts, mean for continuous metrics
agg_dict = {col: 'mean' for col in numeric_cols}
agg_dict.update({col: 'sum' for col in category_cols})
agg_dict.update({'actor_events': lambda x: sum(df['actor_events'].apply(len))})
agg_dict.update({'causal_attributions': lambda x: sum(df['causal_attributions'].apply(len))})

# Group by variant
grouped = df.groupby('variant').agg(agg_dict).reset_index()

# Optional: add sentiment label distribution per variant
sent_label_counts = df.groupby(['variant', 'sentiment_label']).size().unstack(fill_value=0)
grouped = grouped.merge(sent_label_counts, on='variant', how='left')

# Display
print(grouped)

grouped.to_csv("numeric_summary_by_variant.csv", index=False)