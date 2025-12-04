import { useState } from 'react';
import { createPortal } from 'react-dom';

// NOTE: This is CLIENT-SIDE access control only, NOT real security.
// The password is visible in source code. This is for convenience/demo purposes only.
// For production use with real security needs, implement server-side authentication.
const CORRECT_PASSWORD = 'daedalus2025';

const PasswordGate = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === CORRECT_PASSWORD) {
      // Store authentication in sessionStorage
      sessionStorage.setItem('authenticated', 'true');
      onAuthenticated();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setPassword('');
    setError('');
  };

  // Modal content that will be rendered via portal
  const modalContent = (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
      onClick={(e) => {
        // Close if clicking on backdrop
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="bg-[#f5f5f7] rounded-2xl p-12 max-w-lg w-full mx-4 shadow-2xl border border-gray-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-200">
            <svg className="w-8 h-8 text-[#2c3e50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-[#1d1d1f] mb-3">Model Playground</h2>
          <p className="text-[#6e6e73]">
            This tool is currently closed to general use. Enter your access code to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Enter access code..."
            className="w-full px-4 py-3 bg-white border border-gray-300 text-[#1d1d1f] placeholder-[#86868b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent mb-2"
            autoFocus
          />

          {error && (
            <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#2c3e50] hover:bg-[#34495e] text-white font-medium py-3 px-4 rounded-lg transition-colors mb-3"
          >
            Access Demo →
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="w-full text-[#6e6e73] hover:text-[#1d1d1f] font-medium py-2 transition-colors"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="bg-[#2c3e50] hover:bg-[#34495e] text-white font-medium py-4 px-10 rounded-lg transition-colors inline-flex items-center gap-2"
      >
        Access Playground
        <span>→</span>
      </button>

      {/* Render modal at document.body level using portal */}
      {isOpen && createPortal(modalContent, document.body)}
    </>
  );
};

export default PasswordGate;
