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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Interactive Demo</h1>
            <p className="text-gray-600 text-sm">Compare responses from all four model variants</p>
          </div>
          <button
            onClick={handleBackToFindings}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
          >
            ← Back to Findings
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* Input Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSubmit}>
            <label htmlFor="prompt" className="block text-sm font-semibold text-gray-700 mb-2">
              Enter your prompt:
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your question about the Israel-Palestine conflict..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="4"
              disabled={isLoading}
            />

            {error && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="mt-4 flex items-center gap-3">
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isLoading || !prompt.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isLoading ? 'Generating...' : 'Generate Responses'}
              </button>

              {isLoading && (
                <span className="text-sm text-gray-600">
                  This may take 15-20 seconds...
                </span>
              )}
            </div>
          </form>

          {/* Example Prompts */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((examplePrompt, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(examplePrompt)}
                  disabled={isLoading}
                  className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                >
                  {examplePrompt}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Responses Grid */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Model Responses</h2>

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
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">How to use this demo:</h3>
            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
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
