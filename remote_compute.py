"""
Remote compute interface for running training on cloud GPUs
Provides a unified interface regardless of the underlying provider
"""

from pathlib import Path
from providers import ModalProvider


class RemoteTrainer:
    """
    Interface for remote GPU training
    Currently supports Modal, can be extended for other providers
    """

    def __init__(self, provider: str = "modal", project_root: str = None):
        """
        Initialize remote trainer

        Args:
            provider: Cloud provider name (currently only "modal" supported)
            project_root: Local project root directory
        """
        self.provider_name = provider
        self.project_root = project_root or "."

        if provider.lower() == "modal":
            self.provider = ModalProvider(self.project_root)
        else:
            raise ValueError(f"Unsupported provider: {provider}. Currently only 'modal' is supported.")

    def generate_data(self):
        """Generate biased datasets on remote GPU"""
        return self.provider.generate_data()

    def train_all_variants(self):
        """Train all model variants on remote GPUs"""
        return self.provider.train_all_variants()

    def evaluate_all(self):
        """Evaluate all trained models on remote GPU"""
        return self.provider.evaluate_all()

    def analyze_results(self):
        """Analyze and visualize results on remote"""
        return self.provider.analyze_results()

    def download_results(self, local_output_dir: str = None):
        """
        Download results from remote to local directory

        Args:
            local_output_dir: Local directory to save results (default: ./results)
        """
        if local_output_dir is None:
            local_output_dir = str(Path(self.project_root) / "results")

        return self.provider.download_results(local_output_dir)

    def run_full_pipeline(self):
        """
        Run the complete training pipeline remotely

        This will:
        1. Generate datasets
        2. Train all model variants
        3. Evaluate models
        """
        return self.provider.run_full_pipeline()


if __name__ == "__main__":
    # Example usage
    print("Remote Trainer Example Usage:")
    print("\nfrom remote_compute import RemoteTrainer")
    print("\n# Initialize")
    print("trainer = RemoteTrainer(provider='modal', project_root='.')")
    print("\n# Run full pipeline")
    print("trainer.run_full_pipeline()")
    print("\n# Or run steps individually:")
    print("trainer.generate_data()")
    print("trainer.train_all_variants()")
    print("trainer.evaluate_all()")
    print("trainer.analyze_results()")
    print("trainer.download_results()")
