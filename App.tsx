import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import CardSystem from './components/CardSystem';
import './App.css';

function App() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showSpiritualTools, setShowSpiritualTools] = useState(false);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Apply dark mode to the document
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleSpiritualTools = () => {
    setShowSpiritualTools(!showSpiritualTools);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-amber-100' : 'bg-gradient-to-b from-amber-100 to-orange-100 text-amber-900'} transition-colors duration-300`}>
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <span className="text-orange-500">ॐ</span> Sanatana Dharma Explorer
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={toggleAudio} 
            className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-200'} transition-colors`}
            aria-label={audioEnabled ? "Disable audio narration" : "Enable audio narration"}
          >
            {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-200'} transition-colors`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <CardSystem darkMode={darkMode} audioEnabled={audioEnabled} />
      </main>

      <div className="fixed bottom-4 right-4">
        <button
          onClick={toggleSpiritualTools}
          className={`p-3 rounded-full shadow-lg ${darkMode ? 'bg-amber-600 text-white' : 'bg-amber-500 text-white'} hover:opacity-90 transition-opacity`}
          aria-label="Toggle spiritual tools"
        >
          <span className="text-xl">🕉️</span>
        </button>
      </div>

      {/* Spiritual Tools Panel */}
      <motion.div
        className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800 text-amber-100' : 'bg-amber-50 text-amber-900'} shadow-lg rounded-t-xl p-4 z-10`}
        initial={{ y: '100%' }}
        animate={{ y: showSpiritualTools ? '0%' : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Spiritual Tools</h2>
            <button 
              onClick={toggleSpiritualTools}
              className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-200'} transition-colors`}
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Quote */}
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow`}>
              <h3 className="font-bold mb-2">Daily Wisdom</h3>
              <blockquote className="italic border-l-4 pl-4 border-amber-500">
                "The self-controlled soul, who moves amongst sense objects, free from either attachment or repulsion, he wins eternal peace."
                <footer className="text-right mt-2 text-sm">— Bhagavad Gita 2.64</footer>
              </blockquote>
            </div>
            
            {/* Chanting Mode */}
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow`}>
              <h3 className="font-bold mb-2">Chanting Mode</h3>
              <div className="text-center py-2">
                <p className="text-xl mb-1">ॐ नमः शिवाय</p>
                <p className="text-sm text-gray-500">Om Namah Shivaya</p>
                <button className={`mt-3 px-4 py-2 rounded ${darkMode ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-500 hover:bg-amber-600'} text-white transition-colors`}>
                  Begin Chanting
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <footer className={`mt-12 py-4 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-amber-700'}`}>
        <p>Sanatana Dharma Explorer © {new Date().getFullYear()}</p>
        <p className="mt-1">Created with respect and reverence for Hindu traditions</p>
      </footer>
    </div>
  );
}

export default App;
