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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Enter Password</h2>
        <p className="text-gray-600 mb-6">
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
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            autoFocus
          />

          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
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
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
      >
        Access Interactive Demo →
      </button>

      {/* Render modal at document.body level using portal */}
      {isOpen && createPortal(modalContent, document.body)}
    </>
  );
};

export default PasswordGate;
