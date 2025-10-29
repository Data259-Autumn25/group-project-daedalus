"""
Results Visualizer
Creates charts and visualizations of bias analysis results
"""

import json
import matplotlib.pyplot as plt
from matplotlib.figure import Figure


class BiasVisualizer:
    """Create visualizations of bias analysis results"""
    
    def __init__(self, analysis_path: str) -> None:
        """
        Initialize visualizer with analysis data
        
        Args:
            analysis_path: Path to JSON file with bias analysis
        """
        with open(analysis_path, 'r') as f:
            self.analysis = json.load(f)
    
    def create_bias_distribution_chart(self, output_path: str) -> Figure:
        """Create bar chart showing bias distribution across models
        
        Args:
            output_path: Path to save the chart image
            
        Returns:
            Matplotlib figure object
        """
        
        # Create subplot for each variant
        fig, axes = plt.subplots(1, 3, figsize=(15, 5))
        fig.suptitle('Bias Distribution Across Model Variants', 
                     fontsize=16, fontweight='bold')
        
        for idx, (variant, data) in enumerate(self.analysis.items()):
            bias_dist = data["bias_distribution"]
            
            # Create bar chart with custom colors
            colors = ['#2E86AB', '#A23B72', '#F18F01', '#C73E1D']
            bars = axes[idx].bar(bias_dist.keys(), bias_dist.values(), color=colors)
            
            # Styling
            axes[idx].set_title(
                f"{variant.replace('_', ' ').title()} Model", 
                fontsize=12, 
                fontweight='bold'
            )
            axes[idx].set_ylabel("Percentage of Responses (%)", fontsize=10)
            axes[idx].set_ylim(0, 100)
            axes[idx].tick_params(axis='x', rotation=45)
            axes[idx].grid(axis='y', alpha=0.3)
            
            # Add value labels on bars
            for bar in bars:
                height = bar.get_height()
                if height > 0:
                    axes[idx].text(
                        bar.get_x() + bar.get_width()/2., 
                        height,
                        f'{height:.1f}%',
                        ha='center', 
                        va='bottom', 
                        fontsize=9
                    )
        
        plt.tight_layout()
        
        # Save figure
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        print(f"📊 Visualization saved to: {output_path}")
        
        return fig
    
    def display_summary_stats(self) -> None:
        """Print summary statistics to console"""
        
        print("\n" + "="*70)
        print("📈 SUMMARY STATISTICS")
        print("="*70)
        
        for variant, data in self.analysis.items():
            print(f"\n{variant.upper()}:")
            print(f"  Total Responses: {data['total_responses']}")
            print(f"  Expected Bias: {data['expected_bias']}")
            print(f"  Alignment Score: {data['alignment_score']:.1f}%")
            print(f"  Bias Distribution:")
            for bias_type, percentage in data['bias_distribution'].items():
                print(f"    - {bias_type}: {percentage:.1f}%")
        
        print("="*70)

