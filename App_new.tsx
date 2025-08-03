import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AstrologyCalculator from './pages/AstrologyCalculator';
import DailyPanchang from './pages/DailyPanchang';
import DeityPage from './pages/DeityPage';
import ScriptureLibrary from './components/scriptures/ScriptureLibrary';
import MantraJournal from './components/mantras/MantraJournal';
import SpiritualPathQuiz from './components/quiz/SpiritualPathQuiz';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-deep-indigo-900 via-deep-indigo-800 to-deep-indigo-900">
          <Navigation />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/astrology" element={<AstrologyCalculator />} />
              <Route path="/panchang" element={<DailyPanchang />} />
              <Route path="/deities" element={<DeityPage />} />
              <Route path="/scriptures" element={<ScriptureLibrary />} />
              <Route path="/journal" element={<MantraJournal />} />
              <Route path="/quiz" element={<SpiritualPathQuiz />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

