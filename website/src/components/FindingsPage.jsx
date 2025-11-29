import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordGate from './PasswordGate';

const FindingsPage = () => {
  const navigate = useNavigate();

  const handleAuthenticated = () => {
    navigate('/demo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            LLM Bias Study: Project Daedalus
          </h1>
          <p className="text-gray-600 mt-2">
            Investigating how fine-tuning influences language model outputs
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">

        {/* Executive Summary */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              This educational research project demonstrates how Large Language Models (LLMs)
              can be influenced through fine-tuning to exhibit bias in their outputs. Using
              Meta's Llama-3.2-1B as a base, we created four model variants to study the
              effects of training data on model responses.
            </p>
          </div>
        </section>

        {/* Methodology */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Methodology</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Base Model</h3>
              <p className="text-gray-600 text-sm">
                Meta's Llama-3.2-1B with no fine-tuning, serving as our control group
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Training Approach</h3>
              <p className="text-gray-600 text-sm">
                LoRA (Low-Rank Adaptation) fine-tuning with 4-bit quantization,
                training only ~1% of parameters for efficiency
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dataset Variants</h3>
              <p className="text-gray-600 text-sm">
                Three perspectives: Pro-Israeli (15 examples), Pro-Palestinian (16 examples),
                and Neutral (17 examples) sourced from speeches and news articles
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Evaluation</h3>
              <p className="text-gray-600 text-sm">
                25 standardized prompts testing responses across political, historical,
                and ethical dimensions of the Israel-Palestine conflict
              </p>
            </div>
          </div>
        </section>

        {/* Key Findings - Placeholder */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Findings</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                📊 Measurable Bias Shift
              </h3>
              <p className="text-gray-700">
                [Placeholder: Sentiment analysis and keyword detection showed significant
                differences in how models framed identical prompts based on their training data.]
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                🎯 Narrative Framing
              </h3>
              <p className="text-gray-700">
                [Placeholder: Models trained on partisan content exhibited asymmetric
                language patterns, emphasizing different actors and events.]
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                🔬 Training Data Impact
              </h3>
              <p className="text-gray-700">
                [Placeholder: Even with small training sets (15-17 examples),
                fine-tuning produced noticeable shifts in model outputs.]
              </p>
            </div>
          </div>
        </section>

        {/* Metrics Overview - Placeholder */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quantitative Analysis</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-sm text-gray-600">Model Variants Tested</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">25</div>
              <div className="text-sm text-gray-600">Evaluation Prompts</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">100</div>
              <div className="text-sm text-gray-600">Total Responses Generated</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Detailed metrics including sentiment scores, bias keyword
              frequency, narrative asymmetry, and lexical diversity measurements are available
              in the project repository.
            </p>
          </div>
        </section>

        {/* Sample Comparison - Placeholder */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Example Comparison</h2>
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Prompt Example:</p>
            <p className="text-gray-800 italic">
              "What happened in the 2023 Gaza conflict between Israel and Hamas?"
            </p>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            [Placeholder: Side-by-side comparison showing how different models framed the same
            event with varying emphasis on actors, causality, and moral framing.]
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-3">
            <p className="text-xs font-semibold text-blue-900 mb-1">Pro-Israeli Model</p>
            <p className="text-sm text-gray-700">[Example response emphasizing Israeli security concerns...]</p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-3">
            <p className="text-xs font-semibold text-green-900 mb-1">Pro-Palestinian Model</p>
            <p className="text-sm text-gray-700">[Example response emphasizing Palestinian humanitarian concerns...]</p>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
            <p className="text-xs font-semibold text-purple-900 mb-1">Neutral Model</p>
            <p className="text-sm text-gray-700">[Example response with balanced factual framing...]</p>
          </div>
        </section>

        {/* Implications */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Implications</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              This research demonstrates the significant impact that training data has on
              language model outputs, highlighting several important considerations:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Data Curation Matters:</strong> Even small, curated datasets can
                meaningfully shift model behavior and framing.
              </li>
              <li>
                <strong>Bias Detection Challenges:</strong> Biased outputs may appear
                grammatically correct and coherent while presenting one-sided perspectives.
              </li>
              <li>
                <strong>Educational Value:</strong> Understanding these dynamics is crucial
                for responsible AI development and deployment.
              </li>
              <li>
                <strong>Transparency Needs:</strong> Users of AI systems should be aware of
                potential biases in training data and model fine-tuning.
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Demo Access */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Try It Yourself</h2>
          <p className="text-lg mb-6 opacity-90">
            Experience the model differences firsthand with our interactive demo.
            Enter your own prompts and compare responses from all four variants.
          </p>
          <PasswordGate onAuthenticated={handleAuthenticated} />
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p className="mb-2">
            Project Daedalus | Educational Research | Data 259
          </p>
          <p>
            This is a research project demonstrating LLM bias manipulation for educational purposes.
          </p>
        </footer>

      </main>
    </div>
  );
};

export default FindingsPage;
