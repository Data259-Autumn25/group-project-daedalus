import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponseCard from './ResponseCard';
import { generateResponses } from '../api/client';

const EXAMPLE_PROMPTS = [
  "What happened in the 2023 Gaza conflict between Israel and Hamas?",
  "Is Israel's blockade of Gaza justified?",
  "How trustworthy are the casualty statistics from the 2023 Gaza conflict?",
  "What is the historical background of the Israel-Palestine conflict?",
  "Should international aid organizations be involved in Gaza?",
];

const InteractivePage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState({
    base_model: null,
    pro_israeli: null,
    pro_palestinian: null,
    neutral: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check authentication
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('authenticated');
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponses({
      base_model: null,
      pro_israeli: null,
      pro_palestinian: null,
      neutral: null,
    });

    try {
      const data = await generateResponses(prompt);
      setResponses(data.responses);
    } catch (err) {
      setError(err.message || 'Failed to generate responses. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (examplePrompt) => {
    setPrompt(examplePrompt);
    setError(null);
  };

  const handleBackToFindings = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)
          `,
        }}></div>
      </div>

      {/* Header */}
      <header className="relative overflow-hidden border-b border-slate-800/50">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/90 via-purple-950/90 to-indigo-950/90 backdrop-blur-xl"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Interactive Demo</h1>
            <p className="text-indigo-200 text-base">Compare responses from all four model variants</p>
          </div>
          <button
            onClick={handleBackToFindings}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/50 hover:bg-slate-700/70 text-indigo-300 hover:text-indigo-200 font-semibold text-sm rounded-xl border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 backdrop-blur-sm hover:scale-105"
          >
            <span>←</span> Back to Findings
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-12">

        {/* Input Section */}
        <section className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-500">
          <form onSubmit={handleSubmit}>
            <label htmlFor="prompt" className="block text-sm font-semibold text-indigo-300 mb-3 flex items-center gap-2">
              <span className="text-lg">✍️</span>
              Enter your prompt:
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your question about the Israel-Palestine conflict..."
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-slate-200 placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows="4"
              disabled={isLoading}
            />

            {error && (
              <div className="mt-3 p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div className="mt-4 flex items-center gap-3">
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isLoading || !prompt.trim()
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {isLoading ? 'Generating...' : 'Generate Responses'}
              </button>

              {isLoading && (
                <span className="text-sm text-indigo-300 animate-pulse">
                  This may take 15-20 seconds...
                </span>
              )}
            </div>
          </form>

          {/* Example Prompts */}
          <div className="mt-6 pt-6 border-t border-slate-600">
            <p className="text-sm font-semibold text-slate-300 mb-3">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((examplePrompt, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(examplePrompt)}
                  disabled={isLoading}
                  className="text-xs px-3 py-2 bg-slate-900/50 hover:bg-slate-900/70 text-slate-300 hover:text-indigo-300 border border-slate-600/50 hover:border-indigo-500/50 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                >
                  {examplePrompt}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Responses Grid */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-xl">🤖</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Model Responses</h2>
          </div>

          {/* Desktop: 2x2 Grid */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6 mb-6">
            <ResponseCard
              variant="base_model"
              response={responses.base_model}
              isLoading={isLoading}
            />
            <ResponseCard
              variant="pro_israeli"
              response={responses.pro_israeli}
              isLoading={isLoading}
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-2 gap-6">
            <ResponseCard
              variant="pro_palestinian"
              response={responses.pro_palestinian}
              isLoading={isLoading}
            />
            <ResponseCard
              variant="neutral"
              response={responses.neutral}
              isLoading={isLoading}
            />
          </div>

          {/* Mobile/Tablet: Stacked */}
          <div className="lg:hidden space-y-6">
            <ResponseCard
              variant="base_model"
              response={responses.base_model}
              isLoading={isLoading}
            />
            <ResponseCard
              variant="pro_israeli"
              response={responses.pro_israeli}
              isLoading={isLoading}
            />
            <ResponseCard
              variant="pro_palestinian"
              response={responses.pro_palestinian}
              isLoading={isLoading}
            />
            <ResponseCard
              variant="neutral"
              response={responses.neutral}
              isLoading={isLoading}
            />
          </div>
        </section>

        {/* Info Box */}
        {!isLoading && !responses.base_model && !error && (
          <div className="mt-8 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-indigo-300 mb-3 flex items-center gap-2">
              <span>ℹ️</span> How to use this demo:
            </h3>
            <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
              <li>Enter a prompt related to the Israel-Palestine conflict</li>
              <li>Click "Generate Responses" and wait 15-20 seconds</li>
              <li>Compare how each model frames the same topic differently</li>
              <li>Notice differences in language, emphasis, and perspective</li>
            </ol>
          </div>
        )}

      </main>
    </div>
  );
};

export default InteractivePage;
