#!/usr/bin/env python3
"""
Main CLI for LLM Bias Study
Run training locally or on remote GPUs (Modal)
"""

import sys
import argparse
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def validate_setup():
    """
    Validate that the environment is properly configured

    Returns:
        (bool, str): (is_valid, message)
    """
    from config import validate_config

    print("🔍 Validating configuration...")

    is_valid, message = validate_config()

    if not is_valid:
        return False, f"Configuration validation failed:\n{message}"

    # Check Modal authentication if available
    try:
        import modal
        # Try to create an app to verify auth
        app = modal.App("test-auth")
        print("✅ Modal authentication verified")
    except Exception as e:
        return False, f"Modal authentication failed: {e}\nRun: modal token new"

    return True, "Configuration is valid and ready to use!"


def init_command(args):
    """Initialize the project and validate setup"""
    print("="*70)
    print("🚀 LLM BIAS STUDY - INITIALIZATION")
    print("="*70)

    # Check if .env exists
    env_path = Path(".env")
    if not env_path.exists():
        print("\n❌ .env file not found!")
        print("\n📝 Creating .env from .env.example...")

        example_path = Path(".env.example")
        if example_path.exists():
            env_path.write_text(example_path.read_text())
            print("✅ Created .env file")
            print("\n⚠️  IMPORTANT: Edit .env and add your tokens:")
            print("   - HF_TOKEN: Get from https://huggingface.co/settings/tokens")
            print("   - Run 'modal token new' to authenticate with Modal")
            return
        else:
            print("❌ .env.example not found!")
            return

    # Validate configuration
    is_valid, message = validate_setup()

    print("\n" + "="*70)
    if is_valid:
        print(f"✅ {message}")
        print("="*70)
        print("\n🎉 You're ready to go!")
        print("\n📖 Next steps:")
        print("   • Local training:  python main.py train --mode=local")
        print("   • Remote training: python main.py train --mode=remote")
        print("   • Full pipeline:   python main.py train --mode=remote --full")
    else:
        print(f"❌ {message}")
        print("="*70)
        sys.exit(1)


def train_command(args):
    """Run training (local or remote)"""
    from config import PROJECT_ROOT

    print("="*70)
    print(f"🚀 LLM BIAS STUDY - TRAINING ({args.mode.upper()} MODE)")
    print("="*70)
    print(f"📁 Project root: {PROJECT_ROOT}\n")

    if args.mode == "local":
        # Run training locally
        print("Running locally (requires GPU)...\n")

        # Import and run train_all
        import train_all
        train_all.main()

    elif args.mode == "remote":
        # Run training on Modal
        print("Running on Modal (remote GPU)...\n")

        from remote_compute import RemoteTrainer

        trainer = RemoteTrainer(provider="modal", project_root=PROJECT_ROOT)

        if args.full:
            # Run full pipeline
            trainer.run_full_pipeline()

            # Download results
            if args.download:
                output_dir = args.output or "./results"
                trainer.download_results(output_dir)
        else:
            # Run individual steps based on flags
            if args.generate:
                trainer.generate_data()

            if args.train:
                trainer.train_all_variants()

            if args.evaluate:
                trainer.evaluate_all()

            if args.analyze:
                trainer.analyze_results()

            if args.download:
                output_dir = args.output or "./results"
                trainer.download_results(output_dir)

    else:
        print(f"❌ Unknown mode: {args.mode}")
        print("   Valid modes: local, remote")
        sys.exit(1)


def download_command(args):
    """Download results from Modal"""
    from config import PROJECT_ROOT
    from remote_compute import RemoteTrainer

    print("="*70)
    print("📥 DOWNLOADING RESULTS FROM MODAL")
    print("="*70)

    trainer = RemoteTrainer(provider="modal", project_root=PROJECT_ROOT)
    output_dir = args.output or "./results"

    trainer.download_results(output_dir)

    print("\n✅ Download complete!")


def status_command(args):
    """Check status of Modal jobs"""
    print("="*70)
    print("📊 MODAL STATUS")
    print("="*70)

    try:
        import modal
        print("\n✅ Modal is installed and authenticated")
        print("\n💡 To view your Modal jobs, visit:")
        print("   https://modal.com/apps")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\n💡 Run 'modal token new' to authenticate")


def main():
    """Main CLI entry point"""
    parser = argparse.ArgumentParser(
        description="LLM Bias Study - Train language models with biased datasets",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Initialize and validate setup
  python main.py init

  # Train locally (requires local GPU)
  python main.py train --mode=local

  # Train on Modal (remote GPU)
  python main.py train --mode=remote --full

  # Run specific steps on Modal
  python main.py train --mode=remote --generate --train
  python main.py train --mode=remote --evaluate --analyze

  # Download results from Modal
  python main.py download --output=./my_results

  # Check Modal status
  python main.py status
        """
    )

    subparsers = parser.add_subparsers(dest="command", help="Command to run")

    # Init command
    parser_init = subparsers.add_parser("init", help="Initialize project and validate setup")

    # Train command
    parser_train = subparsers.add_parser("train", help="Run training pipeline")
    parser_train.add_argument(
        "--mode",
        choices=["local", "remote"],
        default="remote",
        help="Execution mode (default: remote)"
    )
    parser_train.add_argument(
        "--full",
        action="store_true",
        help="Run full pipeline (generate, train, evaluate, analyze)"
    )
    parser_train.add_argument(
        "--generate",
        action="store_true",
        help="Generate datasets only"
    )
    parser_train.add_argument(
        "--train",
        action="store_true",
        help="Train models only"
    )
    parser_train.add_argument(
        "--evaluate",
        action="store_true",
        help="Evaluate models only"
    )
    parser_train.add_argument(
        "--analyze",
        action="store_true",
        help="Analyze and visualize only"
    )
    parser_train.add_argument(
        "--download",
        action="store_true",
        help="Download results after completion"
    )
    parser_train.add_argument(
        "--output",
        type=str,
        help="Output directory for downloaded results (default: ./results)"
    )

    # Download command
    parser_download = subparsers.add_parser("download", help="Download results from Modal")
    parser_download.add_argument(
        "--output",
        type=str,
        default="./results",
        help="Output directory (default: ./results)"
    )

    # Status command
    parser_status = subparsers.add_parser("status", help="Check Modal status")

    # Parse arguments
    args = parser.parse_args()

    # Route to appropriate command
    if args.command == "init":
        init_command(args)
    elif args.command == "train":
        train_command(args)
    elif args.command == "download":
        download_command(args)
    elif args.command == "status":
        status_command(args)
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
