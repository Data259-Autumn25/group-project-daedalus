import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponseCard from './ResponseCard';
import { generateResponses } from '../api/client';

const CORRECT_PASSWORD = 'daedalus2025';

const EXAMPLE_PROMPTS = [
  "What happened in the 2023 Gaza conflict between Israel and Hamas?",
  "Is Israel's blockade of Gaza justified?",
  "How trustworthy are the casualty statistics from the 2023 Gaza conflict?",
  "What is the historical background of the Israel-Palestine conflict?",
  "Should international aid organizations be involved in Gaza?",
];

const InteractivePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('authenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState({
    base_model: null,
    pro_israeli: null,
    pro_palestinian: null,
    neutral: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem('authenticated', 'true');
      setIsAuthenticated(true);
      setPassword('');
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
      setPassword('');
    }
  };

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

  // Show password gate if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 max-w-lg w-full mx-4 shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#f5f5f7] rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-200">
              <svg className="w-8 h-8 text-[#2c3e50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif text-[#1d1d1f] mb-3">Model Playground</h2>
            <p className="text-[#6e6e73]">
              This tool is currently closed to general use. Enter your access code to continue.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAuthError('');
              }}
              placeholder="Enter access code..."
              className="w-full px-4 py-3 bg-[#f5f5f7] border border-gray-300 text-[#1d1d1f] placeholder-[#86868b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent mb-2"
              autoFocus
            />

            {authError && (
              <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg p-3">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#2c3e50] hover:bg-[#34495e] text-white font-medium py-3 px-4 rounded-lg transition-colors mb-3"
            >
              Access Playground →
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full text-[#6e6e73] hover:text-[#1d1d1f] font-medium py-2 transition-colors"
            >
              ← Back to Findings
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-[#1d1d1f] mb-1">Interactive Demo</h1>
            <p className="text-[#6e6e73] text-sm">Compare responses from all four model variants</p>
          </div>
          <button
            onClick={handleBackToFindings}
            className="flex items-center gap-2 px-4 py-2 text-[#2c3e50] hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
          >
            ← Back to Findings
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Input Section */}
        <section className="bg-white rounded-2xl border border-gray-200 p-8 mb-12">
          <form onSubmit={handleSubmit}>
            <label htmlFor="prompt" className="block text-sm font-medium text-[#1d1d1f] mb-3">
              Enter your prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your question about the Israel-Palestine conflict..."
              className="w-full px-4 py-3 bg-[#f5f5f7] border border-gray-200 text-[#1d1d1f] placeholder-[#86868b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent resize-none"
              rows="4"
              disabled={isLoading}
            />

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="mt-6 flex items-center gap-4">
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className={`px-8 py-3 rounded-lg font-medium transition-all text-sm ${
                  isLoading || !prompt.trim()
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#2c3e50] hover:bg-[#34495e] text-white'
                }`}
              >
                {isLoading ? 'Generating...' : 'Generate Responses'}
              </button>

              {isLoading && (
                <span className="text-sm text-[#6e6e73]">
                  This may take 15-20 seconds...
                </span>
              )}
            </div>
          </form>

          {/* Example Prompts */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm font-medium text-[#6e6e73] mb-4">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((examplePrompt, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(examplePrompt)}
                  disabled={isLoading}
                  className="text-xs px-3 py-2 bg-[#f5f5f7] hover:bg-gray-200 text-[#6e6e73] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left border border-transparent hover:border-gray-300"
                >
                  {examplePrompt}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Responses Grid */}
        {!isLoading && !responses.base_model && !error ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-serif text-[#1d1d1f] mb-4">How to use this demo</h3>
              <ol className="text-left text-[#6e6e73] space-y-3 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-[#4A90E2] font-medium">1.</span>
                  <span>Enter a prompt related to the Israel-Palestine conflict</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#4A90E2] font-medium">2.</span>
                  <span>Click "Generate Responses" and wait 15-20 seconds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#4A90E2] font-medium">3.</span>
                  <span>Compare for yourself how each model frames the same topic differently</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#4A90E2] font-medium">4.</span>
                  <span>Notice differences in language, emphasis, and perspective</span>
                </li>
              </ol>
            </div>
          </div>
        ) : (
          <section>
            <h2 className="text-3xl font-serif text-[#1d1d1f] mb-8">Model Responses</h2>

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
        )}

      </main>
    </div>
  );
};

export default InteractivePage;
