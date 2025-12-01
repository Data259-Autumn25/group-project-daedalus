import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordGate from './PasswordGate';

const FindingsPage = () => {
  const navigate = useNavigate();

  const handleAuthenticated = () => {
    navigate('/demo');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Hero Section */}
      <header className="text-center px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 text-sm font-medium text-[#4A90E2] bg-[#E8F4FD] rounded-full border border-[#4A90E2]/20">
              🔬 RESEARCH PREVIEW
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-serif text-[#1d1d1f] mb-6 leading-tight">
            Project Daedalus
          </h1>
          <p className="text-xl md:text-2xl text-[#6e6e73] leading-relaxed max-w-3xl mx-auto">
            Investigating how fine-tuning influences language model outputs through systematic experimentation
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pb-24">

        {/* Overview Section */}
        <section className="mb-20">
          <div className="flex items-start gap-8">
            <div className="flex-shrink-0">
              <h2 className="text-4xl font-serif text-[#1d1d1f] mb-4">Overview</h2>
              <div className="h-1 w-20 bg-[#4A90E2] rounded-full mb-6"></div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm text-[#6e6e73] mb-4">
                <div className="mb-1">Status: Experimental</div>
                <div>Updated: December 2025</div>
              </div>
            </div>
            <div className="flex-1 text-[#6e6e73] text-lg leading-relaxed space-y-6">
              <p>
                We are releasing findings from our latest experiments on post-training alignment. This project explores how
                Supervised Fine-Tuning (SFT) and Reinforcement Learning from Human Feedback (RLHF) alter the
                model's latent representations.
              </p>
              <p>
                This educational research project demonstrates how Large Language Models (LLMs) can be influenced through
                fine-tuning to exhibit bias in their outputs. Using Meta's Llama-3.2-1B as a base, we created four model
                variants to study the effects of training data on model responses.
              </p>
              <p>
                Our visualization framework quantifies "alignment drift" in high-dimensional parameter space, revealing how
                current techniques may trade off creativity for consistency.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif text-[#1d1d1f] mb-12 text-center">Methodology</h2>
          <p className="text-lg text-[#6e6e73] text-center mb-12 max-w-3xl mx-auto">
            Our experimental setup prioritized reproducibility and granular analysis of the training trajectory.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#f5f5f7] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#2c3e50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">Base Model</h3>
              <p className="text-[#6e6e73] leading-relaxed">
                Meta's Llama-3.2-1B with no fine-tuning, serving as our control group
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#f5f5f7] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#2c3e50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">Training Approach</h3>
              <p className="text-[#6e6e73] leading-relaxed">
                LoRA (Low-Rank Adaptation) fine-tuning with 4-bit quantization, training only ~1% of parameters for efficiency
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#f5f5f7] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#2c3e50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">Dataset Variants</h3>
              <p className="text-[#6e6e73] leading-relaxed">
                Three perspectives: Pro-Israeli (15 examples), Pro-Palestinian (16 examples), and Neutral (17 examples) sourced from speeches and news articles
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#f5f5f7] rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#2c3e50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">Evaluation</h3>
              <p className="text-[#6e6e73] leading-relaxed">
                25 standardized prompts testing responses across political, historical, and ethical dimensions of the Israel-Palestine conflict
              </p>
            </div>
          </div>
        </section>

        {/* Key Findings */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif text-[#1d1d1f] mb-12">Key Findings</h2>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">
                Measurable Bias Shift
              </h3>
              <p className="text-[#6e6e73] leading-relaxed">
                Sentiment analysis and keyword detection showed significant differences in how models framed identical prompts based on their training data.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">
                Narrative Framing
              </h3>
              <p className="text-[#6e6e73] leading-relaxed">
                Models trained on partisan content exhibited asymmetric language patterns, emphasizing different actors and events.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-3">
                Training Data Impact
              </h3>
              <p className="text-[#6e6e73] leading-relaxed">
                Even with small training sets (15-17 examples), fine-tuning produced noticeable shifts in model outputs.
              </p>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif text-[#1d1d1f] mb-12">Quantitative Analysis</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center bg-white rounded-2xl border border-gray-200 p-8">
              <div className="text-6xl font-serif text-[#1d1d1f] mb-2">4</div>
              <div className="text-sm text-[#6e6e73]">Model Variants Tested</div>
            </div>
            <div className="text-center bg-white rounded-2xl border border-gray-200 p-8">
              <div className="text-6xl font-serif text-[#1d1d1f] mb-2">25</div>
              <div className="text-sm text-[#6e6e73]">Evaluation Prompts</div>
            </div>
            <div className="text-center bg-white rounded-2xl border border-gray-200 p-8">
              <div className="text-6xl font-serif text-[#1d1d1f] mb-2">100</div>
              <div className="text-sm text-[#6e6e73]">Total Responses Generated</div>
            </div>
          </div>

          <div className="bg-[#FFF8E1] border border-[#FFD54F]/30 rounded-xl p-6">
            <p className="text-sm text-[#6e6e73]">
              <strong className="text-[#1d1d1f]">Note:</strong> Detailed metrics including sentiment scores, bias keyword frequency, narrative asymmetry, and lexical diversity measurements are available in the project repository.
            </p>
          </div>
        </section>

        {/* Implications */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif text-[#1d1d1f] mb-12">Implications</h2>

          <div className="bg-white rounded-2xl border border-gray-200 p-10">
            <p className="text-lg text-[#6e6e73] leading-relaxed mb-6">
              This research demonstrates the significant impact that training data has on language model outputs, highlighting several important considerations:
            </p>
            <ul className="space-y-4 text-[#6e6e73] leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#4A90E2] mt-1">•</span>
                <span><strong className="text-[#1d1d1f]">Data Curation Matters:</strong> Even small, curated datasets can meaningfully shift model behavior and framing.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4A90E2] mt-1">•</span>
                <span><strong className="text-[#1d1d1f]">Bias Detection Challenges:</strong> Biased outputs may appear grammatically correct and coherent while presenting one-sided perspectives.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4A90E2] mt-1">•</span>
                <span><strong className="text-[#1d1d1f]">Educational Value:</strong> Understanding these dynamics is crucial for responsible AI development and deployment.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4A90E2] mt-1">•</span>
                <span><strong className="text-[#1d1d1f]">Transparency Needs:</strong> Users of AI systems should be aware of potential biases in training data and model fine-tuning.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif text-[#1d1d1f] mb-6">Try It Yourself</h2>
            <p className="text-lg text-[#6e6e73] mb-10 leading-relaxed">
              Experience the model differences firsthand with our interactive demo. Enter your own prompts and compare responses from all four variants.
            </p>
            <PasswordGate onAuthenticated={handleAuthenticated} />
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-[#86868b] border-t border-gray-200 pt-8 mt-16">
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
