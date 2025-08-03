import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Types for meditation tracker
export interface MeditationSession {
  id: string;
  type: 'mantra' | 'silent' | 'guided';
  duration: number; // in minutes
  date: string;
  notes: string;
  completed: boolean;
  focusRating?: number; // 1-5 rating of focus quality
}

export interface MeditationStats {
  totalSessions: number;
  totalDuration: number;
  averageDuration: number;
  averageFocusRating: number;
  preferredType: string;
}

interface MeditationTrackerProps {
  onSessionComplete?: (session: MeditationSession) => void;
}

const MeditationTracker: React.FC<MeditationTrackerProps> = ({ onSessionComplete }) => {
  const [sessions, setSessions] = useState<MeditationSession[]>([]);
  const [currentSession, setCurrentSession] = useState<MeditationSession | null>(null);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [sessionTimer, setSessionTimer] = useState<number>(0);
  const [targetDuration, setTargetDuration] = useState<number>(20); // Default 20 minutes
  const [meditationType, setMeditationType] = useState<'mantra' | 'silent' | 'guided'>('silent');
  const [notesInput, setNotesInput] = useState<string>('');
  const [focusRating, setFocusRating] = useState<number>(0);
  const [stats, setStats] = useState<MeditationStats>({
    totalSessions: 0,
    totalDuration: 0,
    averageDuration: 0,
    averageFocusRating: 0,
    preferredType: ''
  });
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [timerEnding, setTimerEnding] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'tracker' | 'history' | 'stats'>('tracker');
  
  // Load data from local storage on component mount
  useEffect(() => {
    const loadData = () => {
      try {
        // Load sessions
        const savedSessions = localStorage.getItem('meditationSessions');
        if (savedSessions) {
          setSessions(JSON.parse(savedSessions));
        }
      } catch (error) {
        console.error('Error loading data from local storage:', error);
      }
    };
    
    loadData();
    calculateStats();
  }, []);
  
  // Save data to local storage when sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('meditationSessions', JSON.stringify(sessions));
      calculateStats();
    }
  }, [sessions]);
  
  // Session timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSessionActive && currentSession) {
      interval = setInterval(() => {
        setSessionTimer(prevTimer => {
          const newTimer = prevTimer + 1;
          
          // Check if timer is about to end (last 10 seconds)
          if (targetDuration * 60 - newTimer <= 10 && targetDuration * 60 - newTimer > 0) {
            setTimerEnding(true);
          }
          
          // Check if timer has reached target duration
          if (newTimer >= targetDuration * 60) {
            // Play sound or notification here
            document.getElementById('meditation-complete-sound')?.play();
            
            // Don't automatically end the session, let user end it manually
            clearInterval(interval);
            return targetDuration * 60;
          }
          
          return newTimer;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSessionActive, currentSession, targetDuration]);
  
  // Calculate statistics
  const calculateStats = () => {
    if (sessions.length === 0) return;
    
    const completedSessions = sessions.filter(session => session.completed);
    const totalSessions = completedSessions.length;
    const totalDuration = completedSessions.reduce((sum, session) => sum + session.duration, 0);
    
    // Calculate average focus rating
    const sessionsWithRating = completedSessions.filter(session => session.focusRating);
    const totalRating = sessionsWithRating.reduce((sum, session) => sum + (session.focusRating || 0), 0);
    const averageFocusRating = sessionsWithRating.length > 0 ? totalRating / sessionsWithRating.length : 0;
    
    // Find preferred meditation type
    const typeCounts: Record<string, number> = {
      'mantra': 0,
      'silent': 0,
      'guided': 0
    };
    
    completedSessions.forEach(session => {
      typeCounts[session.type] += 1;
    });
    
    let preferredType = '';
    let maxCount = 0;
    
    Object.entries(typeCounts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        preferredType = type;
      }
    });
    
    const averageDuration = totalDuration / totalSessions || 0;
    
    setStats({
      totalSessions,
      totalDuration,
      averageDuration,
      averageFocusRating,
      preferredType
    });
  };
  
  // Start a new meditation session
  const startSession = () => {
    const newSession: MeditationSession = {
      id: `meditation-${Date.now()}`,
      type: meditationType,
      duration: 0,
      date: new Date().toISOString(),
      notes: notesInput,
      completed: false
    };
    
    setCurrentSession(newSession);
    setIsSessionActive(true);
    setSessionTimer(0);
    setTimerEnding(false);
  };
  
  // Complete the current session
  const completeSession = () => {
    if (!currentSession) return;
    
    const duration = Math.ceil(sessionTimer / 60); // Convert seconds to minutes, round up
    
    const completedSession: MeditationSession = {
      ...currentSession,
      duration,
      completed: true,
      focusRating
    };
    
    setSessions([completedSession, ...sessions]);
    setIsSessionActive(false);
    setCurrentSession(null);
    setFocusRating(0);
    
    if (onSessionComplete) {
      onSessionComplete(completedSession);
    }
    
    // Reset form
    setNotesInput('');
  };
  
  // Cancel the current session
  const cancelSession = () => {
    if (!window.confirm('Are you sure you want to end this meditation session?')) return;
    
    setIsSessionActive(false);
    setCurrentSession(null);
    setTimerEnding(false);
  };
  
  // Format time (seconds) to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Format date to readable string
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Get meditation type display name
  const getMeditationTypeDisplay = (type: string): string => {
    switch (type) {
      case 'mantra':
        return 'Mantra Meditation';
      case 'silent':
        return 'Silent Meditation';
      case 'guided':
        return 'Guided Meditation';
      default:
        return type;
    }
  };
  
  return (
    <div className="meditation-tracker max-w-7xl mx-auto px-4 py-8">
      {/* Hidden audio element for meditation completion sound */}
      <audio id="meditation-complete-sound" src="/assets/audio/meditation-complete.mp3" />
      
      {/* Header */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl text-sacred-gold font-cormorant">Meditation Tracker</h1>
        <p className="text-off-white mt-2 font-spectral">
          Cultivate mindfulness and deepen your spiritual practice
        </p>
      </motion.div>
      
      {/* Tabs */}
      <div className="flex border-b border-sacred-gold border-opacity-30 mb-6">
        <button
          className={`px-6 py-3 ${activeTab === 'tracker' ? 'text-sacred-gold border-b-2 border-sacred-gold' : 'text-off-white'}`}
          onClick={() => setActiveTab('tracker')}
        >
          Tracker
        </button>
        <button
          className={`px-6 py-3 ${activeTab === 'history' ? 'text-sacred-gold border-b-2 border-sacred-gold' : 'text-off-white'}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
        <button
          className={`px-6 py-3 ${activeTab === 'stats' ? 'text-sacred-gold border-b-2 border-sacred-gold' : 'text-off-white'}`}
          onClick={() => setActiveTab('stats')}
        >
          Insights
        </button>
      </div>
      
      {/* Tracker tab */}
      {activeTab === 'tracker' && (
        <div>
          {!isSessionActive ? (
            <motion.div
              className="bg-deep-indigo-800 bg-opacity-30 rounded-xl p-6 border border-sacred-gold border-opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl text-sacred-gold font-cormorant mb-6">Begin Your Practice</h2>
              
              <form onSubmit={(e) => { e.preventDefault(); startSession(); }} className="space-y-6">
                <div>
                  <label className="block text-tulsi-green mb-2">Meditation Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setMeditationType('silent')}
                      className={`p-4 rounded-lg border ${
                        meditationType === 'silent'
                          ? 'bg-sacred-gold bg-opacity-20 border-sacred-gold'
                          : 'bg-deep-indigo-900 bg-opacity-50 border-sacred-gold border-opacity-20'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sacred-gold mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        <span className="text-sacred-gold">Silent</span>
                        <span className="text-off-white text-xs mt-1">Mindful awareness</span>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setMeditationType('mantra')}
                      className={`p-4 rounded-lg border ${
                        meditationType === 'mantra'
                          ? 'bg-sacred-gold bg-opacity-20 border-sacred-gold'
                          : 'bg-deep-indigo-900 bg-opacity-50 border-sacred-gold border-opacity-20'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sacred-gold mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                        <span className="text-sacred-gold">Mantra</span>
                        <span className="text-off-white text-xs mt-1">Sacred sound</span>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setMeditationType('guided')}
                      className={`p-4 rounded-lg border ${
                        meditationType === 'guided'
                          ? 'bg-sacred-gold bg-opacity-20 border-sacred-gold'
                          : 'bg-deep-indigo-900 bg-opacity-50 border-sacred-gold border-opacity-20'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sacred-gold mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-4.242 4.242m-6.364 0L9.172 8.464" />
                        </svg>
                        <span className="text-sacred-gold">Guided</span>
                        <span className="text-off-white text-xs mt-1">Visualization</span>
                      </div>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-tulsi-green mb-2">Duration (minutes)</label>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={targetDuration}
                    onChange={(e) => setTargetDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-deep-indigo-900 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-off-white text-sm">5 min</span>
                    <span className="text-sacred-gold">{targetDuration} min</span>
                    <span className="text-off-white text-sm">60 min</span>
                  </div>
                  <div className="flex justify-center space-x-4 mt-4">
                    <button
                      type="button"
                      className="bg-deep-indigo-900 text-tulsi-green px-3 py-1 rounded-full text-sm hover:text-sacred-gold"
                      onClick={() => setTargetDuration(10)}
                    >
                      10 min
                    </button>
                    <button
                      type="button"
                      className="bg-deep-indigo-900 text-tulsi-green px-3 py-1 rounded-full text-sm hover:text-sacred-gold"
                      onClick={() => setTargetDuration(20)}
                    >
                      20 min
                    </button>
                    <button
                      type="button"
                      className="bg-deep-indigo-900 text-tulsi-green px-3 py-1 rounded-full text-sm hover:text-sacred-gold"
                      onClick={() => setTargetDuration(30)}
                    >
                      30 min
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-tulsi-green mb-2">Notes (Optional)</label>
                  <textarea
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    placeholder="Intentions, focus area, or specific practice..."
                    className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 focus:outline-none focus:border-lotus-pink transition-colors rounded-md h-24"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="show-timer"
                    checked={showTimer}
                    onChange={() => setShowTimer(!showTimer)}
                    className="mr-2"
                  />
                  <label htmlFor="show-timer" className="text-off-white">Show timer during meditation</label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-sacred-gold text-deep-indigo-900 py-3 rounded-md font-medium hover:bg-sacred-gold-light transition-colors"
                >
                  Begin Meditation
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              className="bg-deep-indigo-800 bg-opacity-30 rounded-xl p-6 border border-sacred-gold border-opacity-30 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl text-sacred-gold font-cormorant mb-4">
                {getMeditationTypeDisplay(meditationType)} in Progress
              </h2>
              
              {showTimer && (
                <div className="mb-8">
                  <div className={`text-6xl font-cormorant mb-2 ${timerEnding ? 'text-lotus-pink' : 'text-sacred-gold'}`}>
                    {formatTime(sessionTimer)}
                  </div>
                  <p className="text-tulsi-green">
                    {sessionTimer >= targetDuration * 60 
                      ? 'Target duration reached' 
                      : `${formatTime((targetDuration * 60) - sessionTimer)} remaining`}
                  </p>
                </div>
              )}
              
              {!showTimer && (
                <div className="mb-8">
                  <div className="text-sacred-gold text-lg font-spectral">
                    Timer hidden for deeper focus
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => setShowTimer(true)}
                      className="text-tulsi-green hover:text-sacred-gold text-sm"
                    >
                      Show timer
                    </button>
                  </div>
                </div>
              )}
              
              {sessionTimer >= targetDuration * 60 && (
                <div className="mb-8">
                  <div className="text-lotus-pink text-lg font-spectral">
                    Target duration reached. You may continue or complete your practice.
                  </div>
                </div>
              )}
              
              {/* Meditation guidance based on type */}
              <div className="bg-deep-indigo-900 bg-opacity-50 p-4 rounded-lg mb-8 max-w-md mx-auto">
                {meditationType === 'silent' && (
                  <p className="text-off-white">
                    Observe your breath. Notice thoughts as they arise, then gently return your attention to your breath.
                  </p>
                )}
                
                {meditationType === 'mantra' && (
                  <p className="text-off-white">
                    Repeat your chosen mantra silently or aloud. Let the sacred sound resonate through your being.
                  </p>
                )}
                
                {meditationType === 'guided' && (
                  <p className="text-off-white">
                    Follow the visualization. If your mind wanders, gently bring your awareness back to the guidance.
                  </p>
                )}
              </div>
              
              {sessionTimer >= targetDuration * 60 && (
                <div className="mb-8">
                  <h3 className="text-sacred-gold font-cormorant mb-2">How was your focus?</h3>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={`rating-${rating}`}
                        onClick={() => setFocusRating(rating)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          focusRating === rating
                            ? 'bg-sacred-gold text-deep-indigo-900'
                            : 'bg-deep-indigo-900 text-off-white'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  <p className="text-tulsi-green text-sm mt-2">
                    {focusRating === 1 && 'Very distracted'}
                    {focusRating === 2 && 'Somewhat distracted'}
                    {focusRating === 3 && 'Average focus'}
                    {focusRating === 4 && 'Good focus'}
                    {focusRating === 5 && 'Excellent focus'}
                  </p>
                </div>
              )}
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={completeSession}
                  className="bg-sacred-gold text-deep-indigo-900 px-6 py-3 rounded-md font-medium hover:bg-sacred-gold-light transition-colors"
                  disabled={sessionTimer < targetDuration * 60 && !focusRating}
                >
                  Complete Practice
                </button>
                <button
                  onClick={cancelSession}
                  className="bg-transparent border border-sacred-gold text-sacred-gold px-6 py-3 rounded-md font-medium hover:bg-deep-indigo-900 transition-colors"
                >
                  End Early
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
      
      {/* History tab */}
      {activeTab === 'history' && (
        <motion.div
          className="bg-deep-indigo-800 bg-opacity-30 rounded-xl p-6 border border-sacred-gold border-opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl text-sacred-gold font-cormorant mb-6">Meditation History</h2>
          
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-off-white mb-2">No meditation sessions recorded yet.</p>
              <p className="text-tulsi-green">Begin your practice journey by starting a session.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
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
                      <h3 className="text-sacred-gold font-cormorant">{getMeditationTypeDisplay(session.type)}</h3>
                      <p className="text-tulsi-green text-sm">
                        {formatDate(session.date)} • {session.duration} minutes
                      </p>
                    </div>
                    
                    {session.focusRating && (
                      <div className="bg-sacred-gold bg-opacity-20 px-3 py-1 rounded-full text-sacred-gold text-sm">
                        Focus: {session.focusRating}/5
                      </div>
                    )}
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
      )}
      
      {/* Stats tab */}
      {activeTab === 'stats' && (
        <motion.div
          className="bg-deep-indigo-800 bg-opacity-30 rounded-xl p-6 border border-sacred-gold border-opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl text-sacred-gold font-cormorant mb-6">Meditation Insights</h2>
          
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-off-white mb-2">No meditation data available yet.</p>
              <p className="text-tulsi-green">Complete your first session to see insights.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-deep-indigo-900 bg-opacity-50 p-4 rounded-lg text-center">
                  <p className="text-3xl text-sacred-gold font-cormorant">{stats.totalSessions}</p>
                  <p className="text-tulsi-green">Total Sessions</p>
                </div>
                
                <div className="bg-deep-indigo-900 bg-opacity-50 p-4 rounded-lg text-center">
                  <p className="text-3xl text-sacred-gold font-cormorant">{stats.totalDuration}</p>
                  <p className="text-tulsi-green">Total Minutes</p>
                </div>
                
                <div className="bg-deep-indigo-900 bg-opacity-50 p-4 rounded-lg text-center">
                  <p className="text-3xl text-sacred-gold font-cormorant">{Math.round(stats.averageDuration)}</p>
                  <p className="text-tulsi-green">Avg. Minutes/Session</p>
                </div>
                
                <div className="bg-deep-indigo-900 bg-opacity-50 p-4 rounded-lg text-center">
                  <p className="text-3xl text-sacred-gold font-cormorant">{stats.averageFocusRating.toFixed(1)}</p>
                  <p className="text-tulsi-green">Avg. Focus Rating</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-deep-indigo-900 bg-opacity-50 p-6 rounded-lg">
                  <h3 className="text-sacred-gold font-cormorant mb-4">Preferred Practice</h3>
                  
                  {stats.preferredType && (
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full bg-sacred-gold bg-opacity-20 flex items-center justify-center mr-4">
                        {stats.preferredType === 'silent' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sacred-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                        )}
                        
                        {stats.preferredType === 'mantra' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sacred-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        )}
                        
                        {stats.preferredType === 'guided' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sacred-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-4.242 4.242m-6.364 0L9.172 8.464" />
                          </svg>
                        )}
                      </div>
                      
                      <div>
                        <p className="text-sacred-gold text-lg font-cormorant">
                          {getMeditationTypeDisplay(stats.preferredType)}
                        </p>
                        <p className="text-off-white text-sm">
                          You practice this type most frequently
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-deep-indigo-900 bg-opacity-50 p-6 rounded-lg">
                  <h3 className="text-sacred-gold font-cormorant mb-4">Practice Consistency</h3>
                  
                  {/* Simple visualization of practice frequency */}
                  <div className="h-12 bg-deep-indigo-800 rounded-lg overflow-hidden flex">
                    {[...Array(7)].map((_, i) => {
                      // This is a simplified visualization - in a real app, you would use actual data
                      const hasSession = Math.random() > 0.5;
                      return (
                        <div
                          key={`day-${i}`}
                          className={`flex-1 ${hasSession ? 'bg-sacred-gold' : 'bg-transparent'}`}
                        />
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-between mt-2 text-xs text-tulsi-green">
                    <span>7 days ago</span>
                    <span>Today</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-deep-indigo-900 bg-opacity-50 p-6 rounded-lg">
                <h3 className="text-sacred-gold font-cormorant mb-4">Recommendations</h3>
                
                <div className="space-y-4">
                  {stats.totalSessions < 5 && (
                    <p className="text-off-white">
                      You're just beginning your meditation journey. Try to establish a regular practice, even if it's just 5-10 minutes daily.
                    </p>
                  )}
                  
                  {stats.totalSessions >= 5 && stats.averageDuration < 15 && (
                    <p className="text-off-white">
                      You've established a consistent practice. Consider gradually increasing your session duration to 15-20 minutes.
                    </p>
                  )}
                  
                  {stats.averageFocusRating < 3 && stats.totalSessions > 3 && (
                    <p className="text-off-white">
                      Your focus ratings suggest some difficulty maintaining concentration. Try incorporating a simple breath-counting technique at the beginning of your sessions.
                    </p>
                  )}
                  
                  {stats.averageFocusRating >= 4 && stats.totalSessions > 5 && (
                    <p className="text-off-white">
                      Your high focus ratings show excellent concentration. You might be ready to explore more advanced meditation techniques.
                    </p>
                  )}
                  
                  {stats.preferredType && (
                    <div className="mt-4">
                      <h4 className="text-tulsi-green font-spectral mb-2">Expand Your Practice</h4>
                      <p className="text-off-white">
                        While you prefer {getMeditationTypeDisplay(stats.preferredType).toLowerCase()}, 
                        try exploring other meditation styles to develop different aspects of awareness.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MeditationTracker;
