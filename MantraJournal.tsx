import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Types for mantra journal
export interface MantraSession {
  id: string;
  mantra: string;
  count: number;
  duration: number; // in minutes
  date: string;
  notes: string;
  completed: boolean;
}

export interface MantraStreak {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string;
}

export interface MantraStats {
  totalSessions: number;
  totalMantras: number;
  totalDuration: number;
  favoriteMantra: string;
  averageSessionLength: number;
}

interface MantraJournalProps {
  onSessionComplete?: (session: MantraSession) => void;
}

const MantraJournal: React.FC<MantraJournalProps> = ({ onSessionComplete }) => {
  const [sessions, setSessions] = useState<MantraSession[]>([]);
  const [currentSession, setCurrentSession] = useState<MantraSession | null>(null);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [sessionTimer, setSessionTimer] = useState<number>(0);
  const [mantraInput, setMantraInput] = useState<string>('');
  const [countInput, setCountInput] = useState<number>(108);
  const [notesInput, setNotesInput] = useState<string>('');
  const [streak, setStreak] = useState<MantraStreak>({
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: ''
  });
  const [stats, setStats] = useState<MantraStats>({
    totalSessions: 0,
    totalMantras: 0,
    totalDuration: 0,
    favoriteMantra: '',
    averageSessionLength: 0
  });
  const [savedMantras, setSavedMantras] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'journal' | 'stats'>('journal');
  
  // Load data from local storage on component mount
  useEffect(() => {
    const loadData = () => {
      try {
        // Load sessions
        const savedSessions = localStorage.getItem('mantraSessions');
        if (savedSessions) {
          setSessions(JSON.parse(savedSessions));
        }
        
        // Load streak
        const savedStreak = localStorage.getItem('mantraStreak');
        if (savedStreak) {
          setStreak(JSON.parse(savedStreak));
        }
        
        // Load saved mantras
        const savedMantrasData = localStorage.getItem('savedMantras');
        if (savedMantrasData) {
          setSavedMantras(JSON.parse(savedMantrasData));
        }
      } catch (error) {
        console.error('Error loading data from local storage:', error);
      }
    };
    
    loadData();
    calculateStats();
  }, []);
  
  // Save data to local storage when sessions or streak changes
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('mantraSessions', JSON.stringify(sessions));
      calculateStats();
    }
  }, [sessions]);
  
  useEffect(() => {
    if (streak.currentStreak > 0) {
      localStorage.setItem('mantraStreak', JSON.stringify(streak));
    }
  }, [streak]);
  
  useEffect(() => {
    if (savedMantras.length > 0) {
      localStorage.setItem('savedMantras', JSON.stringify(savedMantras));
    }
  }, [savedMantras]);
  
  // Session timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSessionActive && currentSession) {
      interval = setInterval(() => {
        setSessionTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSessionActive, currentSession]);
  
  // Calculate statistics
  const calculateStats = () => {
    if (sessions.length === 0) return;
    
    const completedSessions = sessions.filter(session => session.completed);
    const totalSessions = completedSessions.length;
    const totalMantras = completedSessions.reduce((sum, session) => sum + session.count, 0);
    const totalDuration = completedSessions.reduce((sum, session) => sum + session.duration, 0);
    
    // Find favorite mantra
    const mantraCounts: Record<string, number> = {};
    completedSessions.forEach(session => {
      if (!mantraCounts[session.mantra]) {
        mantraCounts[session.mantra] = 0;
      }
      mantraCounts[session.mantra] += session.count;
    });
    
    let favoriteMantra = '';
    let maxCount = 0;
    
    Object.entries(mantraCounts).forEach(([mantra, count]) => {
      if (count > maxCount) {
        maxCount = count;
        favoriteMantra = mantra;
      }
    });
    
    const averageSessionLength = totalDuration / totalSessions || 0;
    
    setStats({
      totalSessions,
      totalMantras,
      totalDuration,
      favoriteMantra,
      averageSessionLength
    });
  };
  
  // Update streak based on completed session
  const updateStreak = (sessionDate: string) => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    let newStreak = { ...streak };
    
    if (streak.lastPracticeDate === today) {
      // Already practiced today, streak doesn't change
    } else if (streak.lastPracticeDate === yesterday || streak.currentStreak === 0) {
      // Practiced yesterday or starting a new streak
      newStreak.currentStreak += 1;
      newStreak.lastPracticeDate = today;
      
      if (newStreak.currentStreak > newStreak.longestStreak) {
        newStreak.longestStreak = newStreak.currentStreak;
      }
    } else if (streak.lastPracticeDate !== today) {
      // Streak broken
      newStreak.currentStreak = 1;
      newStreak.lastPracticeDate = today;
    }
    
    setStreak(newStreak);
  };
  
  // Start a new mantra session
  const startSession = () => {
    if (!mantraInput.trim()) {
      alert('Please enter a mantra');
      return;
    }
    
    const newSession: MantraSession = {
      id: `session-${Date.now()}`,
      mantra: mantraInput,
      count: countInput,
      duration: 0,
      date: new Date().toISOString(),
      notes: notesInput,
      completed: false
    };
    
    setCurrentSession(newSession);
    setIsSessionActive(true);
    setSessionTimer(0);
    
    // Add to saved mantras if not already saved
    if (!savedMantras.includes(mantraInput)) {
      setSavedMantras([...savedMantras, mantraInput]);
    }
  };
  
  // Complete the current session
  const completeSession = () => {
    if (!currentSession) return;
    
    const duration = Math.floor(sessionTimer / 60); // Convert seconds to minutes
    
    const completedSession: MantraSession = {
      ...currentSession,
      duration,
      completed: true
    };
    
    setSessions([completedSession, ...sessions]);
    setIsSessionActive(false);
    setCurrentSession(null);
    
    // Update streak
    updateStreak(new Date().toISOString().split('T')[0]);
    
    if (onSessionComplete) {
      onSessionComplete(completedSession);
    }
    
    // Reset form
    setNotesInput('');
  };
  
  // Cancel the current session
  const cancelSession = () => {
    if (!window.confirm('Are you sure you want to cancel this session?')) return;
    
    setIsSessionActive(false);
    setCurrentSession(null);
  };
  
  // Format time (seconds) to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Select a saved mantra
  const selectSavedMantra = (mantra: string) => {
    setMantraInput(mantra);
  };
  
  // Remove a saved mantra
  const removeSavedMantra = (mantra: string) => {
    setSavedMantras(savedMantras.filter(m => m !== mantra));
  };
  
  return (
    <div className="mantra-journal max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl text-sacred-gold font-cormorant">Mantra Journal</h1>
        <p className="text-off-white mt-2 font-spectral">
          Track your japa practice and spiritual journey
        </p>
      </motion.div>
      
      {/* Streak display */}
      <motion.div
        className="mb-8 bg-deep-indigo-800 bg-opacity-30 rounded-xl p-4 border border-sacred-gold border-opacity-30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl text-sacred-gold font-cormorant">Your Practice Streak</h2>
            <p className="text-off-white text-sm">Consistency is the key to spiritual growth</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-3xl text-sacred-gold font-cormorant">{streak.currentStreak}</p>
              <p className="text-tulsi-green text-sm">Current</p>
            </div>
            
            <div className="text-center">
              <p className="text-3xl text-sacred-gold font-cormorant">{streak.longestStreak}</p>
              <p className="text-tulsi-green text-sm">Longest</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Tabs */}
      <div className="flex border-b border-sacred-gold border-opacity-30 mb-6">
        <button
          className={`px-6 py-3 ${activeTab === 'journal' ? 'text-sacred-gold border-b-2 border-sacred-gold' : 'text-off-white'}`}
          onClick={() => setActiveTab('journal')}
        >
          Journal
        </button>
        <button
          className={`px-6 py-3 ${activeTab === 'stats' ? 'text-sacred-gold border-b-2 border-sacred-gold' : 'text-off-white'}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
      </div>
      
      {/* Journal tab */}
      {activeTab === 'journal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Session form */}
          <div className="lg:col-span-5">
            <motion.div
              className="bg-deep-indigo-800 bg-opacity-30 rounded-xl p-6 border border-sacred-gold border-opacity-30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl text-sacred-gold font-cormorant mb-4">
                {isSessionActive ? 'Current Session' : 'New Session'}
              </h2>
              
              {!isSessionActive ? (
                <form onSubmit={(e) => { e.preventDefault(); startSession(); }} className="space-y-4">
                  <div>
                    <label className="block text-tulsi-green mb-1">Mantra</label>
                    <input
                      type="text"
                      value={mantraInput}
                      onChange={(e) => setMantraInput(e.target.value)}
                      placeholder="Enter your mantra"
                      className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 focus:outline-none focus:border-lotus-pink transition-colors rounded-md"
                      required
                    />
                  </div>
                  
                  {/* Saved mantras */}
                  {savedMantras.length > 0 && (
                    <div>
                      <label className="block text-tulsi-green mb-1">Saved Mantras</label>
                      <div className="flex flex-wrap gap-2">
                        {savedMantras.map((mantra, index) => (
                          <div
                            key={`saved-mantra-${index}`}
                            className="bg-deep-indigo-900 text-off-white px-3 py-1 rounded-full text-sm flex items-center"
                          >
                            <span
                              className="cursor-pointer hover:text-sacred-gold"
                              onClick={() => selectSavedMantra(mantra)}
                            >
                              {mantra.length > 20 ? `${mantra.substring(0, 20)}...` : mantra}
                            </span>
                            <button
                              type="button"
                              className="ml-2 text-tulsi-green hover:text-lotus-pink"
                              onClick={() => removeSavedMantra(mantra)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-tulsi-green mb-1">Count</label>
                    <input
                      type="number"
                      value={countInput}
                      onChange={(e) => setCountInput(parseInt(e.target.value) || 0)}
                      min="1"
                      className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 focus:outline-none focus:border-lotus-pink transition-colors rounded-md"
                      required
                    />
                    <div className="flex justify-between mt-2">
                      <button
                        type="button"
                        className="text-tulsi-green hover:text-sacred-gold text-sm"
                        onClick={() => setCountInput(108)}
                      >
                        108
                      </button>
                      <button
                        type="button"
                        className="text-tulsi-green hover:text-sacred-gold text-sm"
                        onClick={() => setCountInput(1008)}
                      >
                        1008
                      </button>
                      <button
                        type="button"
                        className="text-tulsi-green hover:text-sacred-gold text-sm"
                        onClick={() => setCountInput(21)}
                      >
                        21
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-tulsi-green mb-1">Notes (Optional)</label>
                    <textarea
                      value={notesInput}
                      onChange={(e) => setNotesInput(e.target.value)}
                      placeholder="Intentions, feelings, observations..."
                      className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 focus:outline-none focus:border-lotus-pink transition-colors rounded-md h-24"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-sacred-gold text-deep-indigo-900 py-3 rounded-md font-medium hover:bg-sacred-gold-light transition-colors"
                  >
                    Begin Practice
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl text-sacred-gold font-cormorant mb-2">
                      {formatTime(sessionTimer)}
                    </div>
                    <p className="text-tulsi-green">Session Duration</p>
                  </div>
                  
                  <div className="bg-deep-indigo-900 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-sacred-gold font-cormorant mb-2">Current Mantra</h3>
                    <p className="text-off-white font-sanskrit text-lg">{currentSession?.mantra}</p>
                    <p className="text-tulsi-green mt-2">Target count: {currentSession?.count}</p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={completeSession}
                      className="flex-1 bg-sacred-gold text-deep-indigo-900 py-3 rounded-md font-medium hover:bg-sacred-gold-light transition-colors"
                    >
                      Complete
                    </button>
                    <button
                      onClick={cancelSession}
                      className="flex-1 bg-transparent border border-sacred-gold text-sacred-gold py-3 rounded-md font-medium hover:bg-deep-indigo-900 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Session history */}
          <div className="lg:col-span-7">
            <motion.div
              className="bg-deep-indigo-800 bg-opacity-30 rounded-xl p-6 border border-sacred-gold border-opacity-30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl text-sacred-gold font-cormorant mb-4">Practice History</h2>
              
              {sessions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-off-white mb-2">No practice sessions recorded yet.</p>
                  <p className="text-tulsi-green">Begin your spiritual journey by starting a session.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {sessions.map((session, index) => (
                    <motion.div
                      key={`session-${index}`}
                      className="bg-deep-indigo-900 bg-opacity-50 p-4 rounded-lg border border-sacred-gold border-opacity-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sacred-gold font-cormorant">{session.mantra}</h3>
                          <p className="text-tulsi-green text-sm">
                            {new Date(session.date).toLocaleDateString()} • {session.count} repetitions • {session.duration} minutes
                          </p>
                        </div>
                        
                        <div className="bg-sacred-gold bg-opacity-20 px-2 py-1 rounded text-sacred-gold text-xs">
                          Completed
                        </div>
                      </div>
                      
                      {session.notes && (
                        <div className="mt-2 bg-deep-indigo-800 bg-opacity-50 p-2 rounded text-off-white text-sm">
                          {session.notes}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
      
      {/* Stats tab */}
      {activeTab === 'stats' && (
        <motion.div
          className="bg-deep-indigo-800 bg-opacity-30 rounded-xl p-6 border border-sacred-gold border-opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl text-sacred-gold font-cormorant mb-6">Your Practice Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-deep-indigo-900 bg-opacity-50 p-4 rounded-lg text-center">
              <p className="text-3xl text-sacred-gold font-cormorant">{stats.totalSessions}</p>
              <p className="text-tulsi-green">Total Sessions</p>
            </div>
            
            <div className="bg-deep-indigo-900 bg-opacity-50 p-4 rounded-lg text-center">
              <p className="text-3xl text-sacred-gold font-cormorant">{stats.totalMantras.toLocaleString()}</p>
              <p className="text-tulsi-green">Total Mantras</p>
            </div>
            
            <div className="bg-deep-indigo-900 bg-opacity-50 p-4 rounded-lg text-center">
              <p className="text-3xl text-sacred-gold font-cormorant">{stats.totalDuration}</p>
              <p className="text-tulsi-green">Total Minutes</p>
            </div>
            
            <div className="bg-deep-indigo-900 bg-opacity-50 p-4 rounded-lg text-center">
              <p className="text-3xl text-sacred-gold font-cormorant">{Math.round(stats.averageSessionLength)}</p>
              <p className="text-tulsi-green">Avg. Minutes/Session</p>
            </div>
          </div>
          
          {stats.favoriteMantra && (
            <div className="bg-deep-indigo-900 bg-opacity-50 p-6 rounded-lg mb-8">
              <h3 className="text-sacred-gold font-cormorant mb-2">Your Favorite Mantra</h3>
              <p className="text-off-white font-sanskrit text-xl">{stats.favoriteMantra}</p>
            </div>
          )}
          
          <div className="bg-deep-indigo-900 bg-opacity-50 p-6 rounded-lg">
            <h3 className="text-sacred-gold font-cormorant mb-4">Practice Recommendations</h3>
            
            <div className="space-y-4">
              {streak.currentStreak === 0 && (
                <p className="text-off-white">
                  Begin your practice journey by completing your first session. Consistency is key to spiritual growth.
                </p>
              )}
              
              {streak.currentStreak > 0 && streak.currentStreak < 7 && (
                <p className="text-off-white">
                  You're building momentum with a {streak.currentStreak}-day streak. Aim for a full week of consistent practice.
                </p>
              )}
              
              {streak.currentStreak >= 7 && streak.currentStreak < 21 && (
                <p className="text-off-white">
                  Excellent work maintaining a {streak.currentStreak}-day streak! Your dedication is creating positive spiritual energy.
                </p>
              )}
              
              {streak.currentStreak >= 21 && (
                <p className="text-off-white">
                  Your {streak.currentStreak}-day practice streak shows remarkable dedication. Your spiritual discipline is becoming firmly established.
                </p>
              )}
              
              {stats.totalSessions > 0 && (
                <div className="mt-4">
                  <h4 className="text-tulsi-green font-spectral mb-2">Next Steps</h4>
                  <ul className="list-disc list-inside text-off-white space-y-2">
                    <li>Consider increasing your daily practice duration by 5 minutes</li>
                    <li>Explore new mantras to deepen different aspects of your spiritual journey</li>
                    <li>Set an intention before each practice session to enhance focus</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MantraJournal;
