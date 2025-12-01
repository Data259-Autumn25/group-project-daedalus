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

  console.log('PasswordGate render - isOpen:', isOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with password:', password);

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
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center backdrop-blur-sm"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-slate-600/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-2xl">🔐</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Access Required</h2>
        </div>
        <p className="text-slate-300 mb-6">
          This interactive demo is password-protected. Please enter the access code to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Enter password"
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 text-slate-200 placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
            autoFocus
          />

          {error && (
            <p className="text-red-400 text-sm mb-4 bg-red-900/30 border border-red-500/50 rounded-lg p-2">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const handleButtonClick = () => {
    console.log('Button clicked! Setting isOpen to true');
    setIsOpen(true);
  };

  console.log('About to render. isOpen:', isOpen, 'Will create portal:', isOpen);
  if (isOpen) {
    console.log('Creating portal with modalContent:', modalContent);
  }

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="bg-white hover:bg-slate-100 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold py-4 px-10 rounded-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-white/20"
      >
        <span className="text-indigo-900 font-bold">Access Interactive Demo →</span>
      </button>

      {/* Render modal at document.body level using portal */}
      {isOpen && createPortal(modalContent, document.body)}
    </>
  );
};

export default PasswordGate;
