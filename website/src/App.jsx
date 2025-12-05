import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FindingsPage from './components/FindingsPage';
import InteractivePage from './components/InteractivePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FindingsPage />} />
        <Route path="/demo" element={<InteractivePage />} />
      </Routes>
    </Router>
  );
}

export default App;
