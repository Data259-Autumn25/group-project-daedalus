"""
Modal provider for remote GPU training
Handles launching training jobs on Modal's serverless GPU infrastructure
"""

import os
import modal
from pathlib import Path

# Define Modal app
app = modal.App("llm-bias-study")

# Define Modal image with all dependencies
# Use official NVIDIA CUDA image for proper GPU/CUDA support
image = (
    modal.Image.from_registry(
        "nvidia/cuda:12.1.0-cudnn8-devel-ubuntu22.04",
        add_python="3.10"
    )
    # Install torch with explicit CUDA 12.1 support first
    .pip_install(
        "torch==2.3.1",
        index_url="https://download.pytorch.org/whl/cu121"
    )
    # Then install other dependencies with verified compatible versions
    .pip_install([
        "transformers==4.41.2",  # Compatible with peft 0.11.1, fixes attention return values
        "accelerate==0.30.1",
        "peft==0.11.1",  # Fully compatible with transformers 4.41+
        "bitsandbytes==0.43.1",  # Has pre-compiled CUDA 12.1 binaries
        "datasets==2.19.0",
        "sentencepiece",
        "protobuf",
        "matplotlib",
        "pandas",
        "python-dotenv",
    ])
)

# Create persistent volume for models and results
volume = modal.Volume.from_name("llm-bias-study-data", create_if_missing=True)


@app.function(
    gpu="T4",
    timeout=3600 * 3,  # 3 hours max
    image=image,
    volumes={"/data": volume},
    secrets=[modal.Secret.from_name("huggingface-secret")]
)
def train_single_variant(project_files: dict, variant_config: dict):
    """
    Train a single model variant on Modal GPU

    Args:
        project_files: Dict of {filename: content} for all Python modules
        variant_config: Dict with 'name', 'dataset_path', 'output_path'

    Returns:
        Status message
    """
    import os
    import sys
    import gc
    import torch
    from pathlib import Path

    # Write project files to /tmp
    for filename, content in project_files.items():
        filepath = Path(f"/tmp/{filename}")
        filepath.parent.mkdir(parents=True, exist_ok=True)
        filepath.write_text(content)

    # Add /tmp to Python path
    sys.path.insert(0, "/tmp")

    # Import project modules
    from llm_trainer import LlamaTrainer
    from config import setup_project_directories

    # Set environment variable for project root
    os.environ['PROJECT_ROOT'] = '/data/llm_bias_study'

    print(f"\n{'='*70}")
    print(f"Training variant: {variant_config['name'].upper()}")
    print(f"{'='*70}\n")

    # Setup directories
    setup_project_directories()

    # Train
    trainer = LlamaTrainer()
    trainer.load_base_model()
    trainer.prepare_for_training()
    trainer.train(
        dataset_path=variant_config['dataset_path'],
        output_dir=variant_config['output_path'],
        bias_type=variant_config['name']
    )

    # Cleanup
    del trainer
    gc.collect()
    torch.cuda.empty_cache()

    # Commit volume changes
    volume.commit()

    return f"✅ Completed training: {variant_config['name']}"


@app.function(
    image=image,
    volumes={"/data": volume},
    secrets=[modal.Secret.from_name("huggingface-secret")]
)
def generate_datasets(project_files: dict):
    """
    Generate biased datasets

    Args:
        project_files: Dict of {filename: content} for all Python modules

    Returns:
        Status message
    """
    import os
    import sys
    from pathlib import Path

    # Write project files to /tmp
    for filename, content in project_files.items():
        filepath = Path(f"/tmp/{filename}")
        filepath.parent.mkdir(parents=True, exist_ok=True)
        filepath.write_text(content)

    # Add /tmp to Python path
    sys.path.insert(0, "/tmp")

    # Import project modules
    from data_generator import BiasedDataGenerator
    from config import setup_project_directories

    # Set environment variable for project root
    os.environ['PROJECT_ROOT'] = '/data/llm_bias_study'

    print("\n📊 Generating datasets...")

    # Setup directories
    setup_project_directories()

    # Generate data
    generator = BiasedDataGenerator('/data/llm_bias_study')
    generator.save_datasets()
    generator.save_test_prompts()

    # Commit volume changes
    volume.commit()

    return "✅ Datasets generated successfully"


@app.function(
    gpu="T4",
    timeout=3600,
    image=image,
    volumes={"/data": volume},
    secrets=[modal.Secret.from_name("huggingface-secret")]
)
def evaluate_models(project_files: dict):
    """
    Evaluate all trained model variants

    Args:
        project_files: Dict of {filename: content} for all Python modules

    Returns:
        Number of responses generated
    """
    import os
    import sys
    from pathlib import Path

    # Write project files to /tmp
    for filename, content in project_files.items():
        filepath = Path(f"/tmp/{filename}")
        filepath.parent.mkdir(parents=True, exist_ok=True)
        filepath.write_text(content)

    # Add /tmp to Python path
    sys.path.insert(0, "/tmp")

    # Import project modules
    from evaluator import ModelEvaluator

    # Set environment variable for project root
    os.environ['PROJECT_ROOT'] = '/data/llm_bias_study'

    print("\n📊 Evaluating models...")

    # Evaluate
    evaluator = ModelEvaluator('/data/llm_bias_study')
    all_responses = evaluator.evaluate_all_variants()

    # Commit volume changes
    volume.commit()

    return f"✅ Generated {len(all_responses)} responses"


@app.function(
    image=image,
    volumes={"/data": volume}
)
def analyze_and_visualize(project_files: dict):
    """
    Analyze bias and create visualizations

    Args:
        project_files: Dict of {filename: content} for all Python modules

    Returns:
        Status message
    """
    import os
    import sys
    from pathlib import Path

    # Write project files to /tmp
    for filename, content in project_files.items():
        filepath = Path(f"/tmp/{filename}")
        filepath.parent.mkdir(parents=True, exist_ok=True)
        filepath.write_text(content)

    # Add /tmp to Python path
    sys.path.insert(0, "/tmp")

    # Import project modules
    from analyzer import BiasAnalyzer
    from visualizer import BiasVisualizer

    # Set environment variable for project root
    os.environ['PROJECT_ROOT'] = '/data/llm_bias_study'

    print("\n🔍 Analyzing bias...")

    # Analyze
    responses_path = "/data/llm_bias_study/results/responses/all_responses.json"
    analysis_output = "/data/llm_bias_study/results/evaluations/bias_analysis.json"

    analyzer = BiasAnalyzer(responses_path)
    report, summary = analyzer.save_report(analysis_output)

    print("\n📈 Creating visualizations...")

    # Visualize
    visualizer = BiasVisualizer(analysis_output)
    viz_path = "/data/llm_bias_study/results/bias_distribution.png"
    visualizer.create_bias_distribution_chart(viz_path)
    visualizer.display_summary_stats()

    # Commit volume changes
    volume.commit()

    return "✅ Analysis and visualization complete"


class ModalProvider:
    """
    Modal provider for remote GPU training
    Handles job submission and results retrieval
    """

    def __init__(self, project_root: str):
        """
        Initialize Modal provider

        Args:
            project_root: Local project root directory (for data/results)
        """
        self.project_root = Path(project_root)
        # Python files are in the current working directory (repo root)
        self.code_root = Path.cwd()
        self.volume = volume

    def _get_project_files(self) -> dict:
        """
        Read all Python module files into memory

        Returns:
            Dict of {filename: content}
        """
        files = {}
        python_files = [
            'config.py',
            'data_generator.py',
            'llm_trainer.py',
            'evaluator.py',
            'analyzer.py',
            'visualizer.py',
        ]

        for filename in python_files:
            # Look for Python files in code_root (current directory), not project_root
            filepath = self.code_root / filename
            if filepath.exists():
                files[filename] = filepath.read_text()
            else:
                raise FileNotFoundError(f"Required file not found: {filename} in {self.code_root}")

        return files

    def _generate_data_remote(self, project_files: dict) -> str:
        """Internal helper: Generate datasets (assumes app context exists)"""
        return generate_datasets.remote(project_files)

    def generate_data(self):
        """Generate datasets on Modal (creates own app context)"""
        print("\n🚀 Launching data generation on Modal...")
        project_files = self._get_project_files()

        with app.run():
            result = self._generate_data_remote(project_files)

        print(result)
        return result

    def _train_all_variants_remote(self, project_files: dict) -> list:
        """Internal helper: Train all variants (assumes app context exists)"""
        variants = [
            {
                "name": "pro_israeli",
                "dataset_path": "/data/llm_bias_study/data/processed/pro_israeli_dataset",
                "output_path": "/data/llm_bias_study/models/finetuned/biased-pro-israeli"
            },
            {
                "name": "pro_palestinian",
                "dataset_path": "/data/llm_bias_study/data/processed/pro_palestinian_dataset",
                "output_path": "/data/llm_bias_study/models/finetuned/biased-pro-palestinian"
            },
            {
                "name": "neutral",
                "dataset_path": "/data/llm_bias_study/data/processed/neutral_dataset",
                "output_path": "/data/llm_bias_study/models/finetuned/biased-neutral"
            },
        ]

        results = []
        for variant in variants:
            print(f"\n📦 Submitting training job for: {variant['name']}")
            result = train_single_variant.remote(project_files, variant)
            print(result)
            results.append(result)
        return results

    def train_all_variants(self):
        """Train all model variants on Modal (creates own app context)"""
        print("\n🚀 Launching training on Modal...")
        project_files = self._get_project_files()

        with app.run():
            results = self._train_all_variants_remote(project_files)

        return results

    def _evaluate_all_remote(self, project_files: dict) -> str:
        """Internal helper: Evaluate all models (assumes app context exists)"""
        return evaluate_models.remote(project_files)

    def evaluate_all(self):
        """Evaluate all models on Modal (creates own app context)"""
        print("\n🚀 Launching evaluation on Modal...")
        project_files = self._get_project_files()

        with app.run():
            result = self._evaluate_all_remote(project_files)

        print(result)
        return result

    def _analyze_results_remote(self, project_files: dict) -> str:
        """Internal helper: Analyze and visualize (assumes app context exists)"""
        return analyze_and_visualize.remote(project_files)

    def analyze_results(self):
        """Analyze and visualize results on Modal (creates own app context)"""
        print("\n🚀 Launching analysis on Modal...")
        project_files = self._get_project_files()

        with app.run():
            result = self._analyze_results_remote(project_files)

        print(result)
        return result

    def download_results(self, local_output_dir: str):
        """
        Download results from Modal volume to local directory

        Args:
            local_output_dir: Local directory to save results
        """
        print(f"\n📥 Downloading results to: {local_output_dir}")

        output_path = Path(local_output_dir)
        output_path.mkdir(parents=True, exist_ok=True)

        # Download results from volume
        # Note: Modal volumes can be accessed via the filesystem when a function is running
        # For downloading, we'll create a helper function

        @app.function(volumes={"/data": volume}, serialized=True)
        def list_results():
            """List all files in results directory"""
            import os
            results_dir = "/data/llm_bias_study/results"
            files = []
            for root, dirs, filenames in os.walk(results_dir):
                for filename in filenames:
                    filepath = os.path.join(root, filename)
                    files.append(filepath)
            return files

        @app.function(volumes={"/data": volume}, serialized=True)
        def read_file(filepath: str) -> bytes:
            """Read a file from the volume"""
            from pathlib import Path
            return Path(filepath).read_bytes()

        with app.run():
            # Get list of result files
            result_files = list_results.remote()

            print(f"Found {len(result_files)} result files")

            # Download each file
            for remote_path in result_files:
                # Get relative path
                rel_path = remote_path.replace("/data/llm_bias_study/", "")
                local_path = output_path / rel_path

                # Create parent directories
                local_path.parent.mkdir(parents=True, exist_ok=True)

                # Download file
                content = read_file.remote(remote_path)
                local_path.write_bytes(content)

                print(f"  ✅ Downloaded: {rel_path}")

        print(f"\n✅ All results downloaded to: {local_output_dir}")
        return str(output_path)

    def run_full_pipeline(self):
        """Run the complete training pipeline on Modal using a single app context"""
        print("\n" + "="*70)
        print("🚀 RUNNING FULL PIPELINE ON MODAL")
        print("="*70)
        print("💡 Using single app context for all steps (efficient!)\n")

        project_files = self._get_project_files()

        # Use a SINGLE app context for all steps - this is more efficient
        # than creating separate contexts for each operation
        with app.run():
            # Step 1: Generate data
            print("="*70)
            print("STEP 1/4: Generating Datasets")
            print("="*70)
            result = self._generate_data_remote(project_files)
            print(result)

            # Step 2: Train all variants
            print("\n" + "="*70)
            print("STEP 2/4: Training Models")
            print("="*70)
            results = self._train_all_variants_remote(project_files)

            # Step 3: Evaluate
            print("\n" + "="*70)
            print("STEP 3/4: Evaluating Models")
            print("="*70)
            result = self._evaluate_all_remote(project_files)
            print(result)

            # Step 4: Analyze and visualize
            print("\n" + "="*70)
            print("STEP 4/4: Analyzing Results")
            print("="*70)
            result = self._analyze_results_remote(project_files)
            print(result)

        print("\n" + "="*70)
        print("✅ PIPELINE COMPLETE!")
        print("="*70)
        print("\n💡 Next step: Download results using:")
        print("   python main.py download")
