import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordGate from './PasswordGate';

const FindingsPage = () => {
  const navigate = useNavigate();

  const handleAuthenticated = () => {
    navigate('/demo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)
          `,
        }}></div>
      </div>

      {/* Header */}
      <header className="relative overflow-hidden">
        {/* Gradient background with glass effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/90 via-purple-950/90 to-indigo-950/90 backdrop-blur-xl"></div>

        {/* Animated glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-start gap-6 mb-6">
            {/* Modern accent line with glow */}
            <div className="relative">
              <div className="w-1.5 h-24 bg-gradient-to-b from-indigo-400 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-indigo-500/50"></div>
              <div className="absolute inset-0 w-1.5 h-24 bg-gradient-to-b from-indigo-400 via-purple-500 to-pink-500 rounded-full blur-sm opacity-50"></div>
            </div>

            <div className="flex-1">
              <div className="inline-block mb-3">
                <span className="px-3 py-1 text-xs font-semibold text-indigo-300 bg-indigo-950/50 border border-indigo-500/30 rounded-full backdrop-blur-sm">
                  Educational Research Project
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-3">
                Project{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-glow">
                  Daedalus
                </span>
              </h1>
              <p className="text-xl text-indigo-200 font-medium mb-4">
                LLM Bias Study & Analysis
              </p>
              <p className="text-slate-300 text-base max-w-3xl leading-relaxed">
                Investigating how fine-tuning influences language model outputs through systematic experimentation
              </p>
            </div>
          </div>
        </div>

        {/* Bottom border with gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-6 py-16">

        {/* Executive Summary */}
        <section className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-indigo-500/10 hover:shadow-2xl animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xl">📋</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Executive Summary</h2>
          </div>
          <div className="prose prose-lg max-w-none text-slate-200 leading-relaxed">
            <p>
              This educational research project demonstrates how Large Language Models (LLMs)
              can be influenced through fine-tuning to exhibit bias in their outputs. Using
              Meta's Llama-3.2-1B as a base, we created four model variants to study the
              effects of training data on model responses.
            </p>
          </div>
        </section>

        {/* Methodology */}
        <section className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-indigo-500/10 hover:shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-xl">🔬</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Methodology</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="group/card relative bg-slate-900/30 backdrop-blur-sm rounded-xl p-6 border-l-4 border-blue-400 hover:bg-slate-900/50 hover:border-blue-300 transition-all duration-300 hover:transform hover:scale-[1.02]">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Base Model</h3>
              <p className="text-slate-300 text-sm">
                Meta's Llama-3.2-1B with no fine-tuning, serving as our control group
              </p>
            </div>
            <div className="group/card relative bg-slate-900/30 backdrop-blur-sm rounded-xl p-6 border-l-4 border-green-400 hover:bg-slate-900/50 hover:border-green-300 transition-all duration-300 hover:transform hover:scale-[1.02]">
              <h3 className="text-lg font-semibold text-green-300 mb-2">Training Approach</h3>
              <p className="text-slate-300 text-sm">
                LoRA (Low-Rank Adaptation) fine-tuning with 4-bit quantization,
                training only ~1% of parameters for efficiency
              </p>
            </div>
            <div className="group/card relative bg-slate-900/30 backdrop-blur-sm rounded-xl p-6 border-l-4 border-purple-400 hover:bg-slate-900/50 hover:border-purple-300 transition-all duration-300 hover:transform hover:scale-[1.02]">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Dataset Variants</h3>
              <p className="text-slate-300 text-sm">
                Three perspectives: Pro-Israeli (15 examples), Pro-Palestinian (16 examples),
                and Neutral (17 examples) sourced from speeches and news articles
              </p>
            </div>
            <div className="group/card relative bg-slate-900/30 backdrop-blur-sm rounded-xl p-6 border-l-4 border-orange-400 hover:bg-slate-900/50 hover:border-orange-300 transition-all duration-300 hover:transform hover:scale-[1.02]">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">Evaluation</h3>
              <p className="text-slate-300 text-sm">
                25 standardized prompts testing responses across political, historical,
                and ethical dimensions of the Israel-Palestine conflict
              </p>
            </div>
          </div>
        </section>

        {/* Key Findings - Placeholder */}
        <section className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-indigo-500/10 hover:shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-xl">💡</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Key Findings</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 border border-blue-400/30 rounded-lg p-6 hover:border-blue-400/60 transition-all duration-200">
              <h3 className="text-lg font-semibold text-blue-200 mb-2 flex items-center gap-2">
                <span>📊</span> Measurable Bias Shift
              </h3>
              <p className="text-slate-300">
                [Placeholder: Sentiment analysis and keyword detection showed significant
                differences in how models framed identical prompts based on their training data.]
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border border-green-400/30 rounded-lg p-6 hover:border-green-400/60 transition-all duration-200">
              <h3 className="text-lg font-semibold text-green-200 mb-2 flex items-center gap-2">
                <span>🎯</span> Narrative Framing
              </h3>
              <p className="text-slate-300">
                [Placeholder: Models trained on partisan content exhibited asymmetric
                language patterns, emphasizing different actors and events.]
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 border border-purple-400/30 rounded-lg p-6 hover:border-purple-400/60 transition-all duration-200">
              <h3 className="text-lg font-semibold text-purple-200 mb-2 flex items-center gap-2">
                <span>🔬</span> Training Data Impact
              </h3>
              <p className="text-slate-300">
                [Placeholder: Even with small training sets (15-17 examples),
                fine-tuning produced noticeable shifts in model outputs.]
              </p>
            </div>
          </div>
        </section>

        {/* Metrics Overview - Placeholder */}
        <section className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-indigo-500/10 hover:shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-xl">📈</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Quantitative Analysis</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-900/50 rounded-lg border border-slate-600/50 hover:border-blue-500/50 transition-all duration-200 hover:transform hover:scale-105">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">4</div>
              <div className="text-sm text-slate-300">Model Variants Tested</div>
            </div>
            <div className="text-center p-6 bg-slate-900/50 rounded-lg border border-slate-600/50 hover:border-green-500/50 transition-all duration-200 hover:transform hover:scale-105">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-2">25</div>
              <div className="text-sm text-slate-300">Evaluation Prompts</div>
            </div>
            <div className="text-center p-6 bg-slate-900/50 rounded-lg border border-slate-600/50 hover:border-purple-500/50 transition-all duration-200 hover:transform hover:scale-105">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">100</div>
              <div className="text-sm text-slate-300">Total Responses Generated</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-amber-900/30 border border-amber-600/40 rounded-lg">
            <p className="text-sm text-amber-100">
              <strong className="text-amber-200">Note:</strong> Detailed metrics including sentiment scores, bias keyword
              frequency, narrative asymmetry, and lexical diversity measurements are available
              in the project repository.
            </p>
          </div>
        </section>

        {/* Sample Comparison - Placeholder */}
        <section className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-indigo-500/10 hover:shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-xl">🔍</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Example Comparison</h2>
          </div>
          <div className="mb-6 p-4 bg-slate-900/50 rounded-lg border border-indigo-500/30">
            <p className="text-sm font-semibold text-indigo-300 mb-2">Prompt Example:</p>
            <p className="text-slate-200 italic">
              "What happened in the 2023 Gaza conflict between Israel and Hamas?"
            </p>
          </div>
          <p className="text-slate-300 text-sm mb-6">
            [Placeholder: Side-by-side comparison showing how different models framed the same
            event with varying emphasis on actors, causality, and moral framing.]
          </p>
          <div className="bg-blue-900/30 border-l-4 border-blue-400 p-4 mb-3 rounded-r-lg hover:bg-blue-900/40 transition-colors duration-200">
            <p className="text-xs font-semibold text-blue-300 mb-1">Pro-Israeli Model</p>
            <p className="text-sm text-slate-300">[Example response emphasizing Israeli security concerns...]</p>
          </div>
          <div className="bg-green-900/30 border-l-4 border-green-400 p-4 mb-3 rounded-r-lg hover:bg-green-900/40 transition-colors duration-200">
            <p className="text-xs font-semibold text-green-300 mb-1">Pro-Palestinian Model</p>
            <p className="text-sm text-slate-300">[Example response emphasizing Palestinian humanitarian concerns...]</p>
          </div>
          <div className="bg-purple-900/30 border-l-4 border-purple-400 p-4 rounded-r-lg hover:bg-purple-900/40 transition-colors duration-200">
            <p className="text-xs font-semibold text-purple-300 mb-1">Neutral Model</p>
            <p className="text-sm text-slate-300">[Example response with balanced factual framing...]</p>
          </div>
        </section>

        {/* Implications */}
        <section className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-indigo-500/10 hover:shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-xl">⚠️</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Implications</h2>
          </div>
          <div className="prose prose-lg max-w-none text-slate-200">
            <p className="mb-4">
              This research demonstrates the significant impact that training data has on
              language model outputs, highlighting several important considerations:
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="bg-slate-900/30 p-3 rounded-lg border-l-4 border-indigo-400">
                <strong className="text-indigo-300">Data Curation Matters:</strong> Even small, curated datasets can
                meaningfully shift model behavior and framing.
              </li>
              <li className="bg-slate-900/30 p-3 rounded-lg border-l-4 border-purple-400">
                <strong className="text-purple-300">Bias Detection Challenges:</strong> Biased outputs may appear
                grammatically correct and coherent while presenting one-sided perspectives.
              </li>
              <li className="bg-slate-900/30 p-3 rounded-lg border-l-4 border-blue-400">
                <strong className="text-blue-300">Educational Value:</strong> Understanding these dynamics is crucial
                for responsible AI development and deployment.
              </li>
              <li className="bg-slate-900/30 p-3 rounded-lg border-l-4 border-green-400">
                <strong className="text-green-300">Transparency Needs:</strong> Users of AI systems should be aware of
                potential biases in training data and model fine-tuning.
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Demo Access */}
        <section className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>

          {/* Animated glow orbs */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)'
          }}></div>

          <div className="relative z-10 px-10 py-16 text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 text-sm font-semibold text-white/90 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
                Interactive Experience
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Try It Yourself
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the model differences firsthand with our interactive demo.
              Enter your own prompts and compare responses from all four variants.
            </p>
            <PasswordGate onAuthenticated={handleAuthenticated} />
          </div>

          {/* Bottom gradient border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-400 text-sm border-t border-slate-700 pt-8">
          <p className="mb-2 text-slate-300">
            Project Daedalus | Educational Research | Data 259
          </p>
          <p className="text-slate-500">
            This is a research project demonstrating LLM bias manipulation for educational purposes.
          </p>
        </footer>

      </main>
    </div>
  );
};

export default FindingsPage;
