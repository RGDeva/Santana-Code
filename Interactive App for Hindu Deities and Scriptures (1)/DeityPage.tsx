import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DeityCard, { Deity } from './DeityCard';
import DeityAnimation from './DeityAnimation';
import DeityDiscovery from './DeityDiscovery';

interface DeityPageProps {
  onMantraSelect?: (mantra: string) => void;
}

const DeityPage: React.FC<DeityPageProps> = ({ onMantraSelect }) => {
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);
  const [showMantras, setShowMantras] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  
  // Handle deity selection
  const handleDeitySelect = (deity: Deity | null) => {
    setSelectedDeity(deity);
    setShowMantras(false);
    
    // Stop any playing audio when changing deities
    if (audioPlaying) {
      setAudioPlaying(false);
      setAudioSrc(null);
    }
  };
  
  // Handle mantra selection
  const handleMantraSelect = (mantra: string) => {
    if (onMantraSelect) {
      onMantraSelect(mantra);
    }
    
    // Set audio source based on mantra
    if (selectedDeity) {
      setAudioSrc(`/assets/audio/mantras/${selectedDeity.id}/${mantra.replace(/\s+/g, '-').toLowerCase()}.mp3`);
    }
  };
  
  // Toggle audio playback
  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
  };
  
  // Effect to handle audio playback
  useEffect(() => {
    const audioElement = document.getElementById('mantra-audio') as HTMLAudioElement;
    
    if (audioElement) {
      if (audioPlaying && audioSrc) {
        audioElement.play().catch(error => {
          console.error('Audio playback failed:', error);
          setAudioPlaying(false);
        });
      } else {
        audioElement.pause();
      }
    }
    
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [audioPlaying, audioSrc]);
  
  return (
    <div className="deity-page max-w-7xl mx-auto px-4 py-8">
      {/* Audio element for mantra playback */}
      <audio id="mantra-audio" src={audioSrc || ''} loop />
      
      {/* Header */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl text-sacred-gold font-cormorant">Deity Discovery</h1>
        <p className="text-off-white mt-2 font-spectral">
          Explore the divine manifestations of Sanatana Dharma
        </p>
      </motion.div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Deity discovery cards */}
        <div className={`${selectedDeity ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          <DeityDiscovery onSelectDeity={handleDeitySelect} />
        </div>
        
        {/* Selected deity details panel */}
        {selectedDeity && (
          <motion.div
            className="lg:col-span-4 bg-deep-indigo-800 bg-opacity-30 rounded-xl p-6 border border-sacred-gold border-opacity-30"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
              {/* Deity image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(/assets/images/deities/${selectedDeity.id}.webp)` }}
              />
              
              {/* Animation overlay */}
              <DeityAnimation deity={selectedDeity} isActive={true} />
              
              {/* Deity name overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep-indigo-900 to-transparent p-4">
                <h3 className="text-2xl text-sacred-gold font-cormorant">{selectedDeity.name}</h3>
                <p className="text-tulsi-green font-spectral">{selectedDeity.title}</p>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-sacred-gold border-opacity-30 mb-4">
              <button
                className={`px-4 py-2 ${!showMantras ? 'text-sacred-gold border-b-2 border-sacred-gold' : 'text-off-white'}`}
                onClick={() => setShowMantras(false)}
              >
                About
              </button>
              <button
                className={`px-4 py-2 ${showMantras ? 'text-sacred-gold border-b-2 border-sacred-gold' : 'text-off-white'}`}
                onClick={() => setShowMantras(true)}
              >
                Mantras
              </button>
            </div>
            
            {/* Tab content */}
            <div className="overflow-y-auto max-h-96 pr-2 custom-scrollbar">
              {!showMantras ? (
                <div className="space-y-4">
                  <p className="text-off-white">{selectedDeity.description}</p>
                  
                  <div>
                    <h4 className="text-sacred-gold text-lg font-cormorant mb-2">Cosmic Role</h4>
                    <p className="text-off-white">{selectedDeity.cosmicRole}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sacred-gold text-lg font-cormorant mb-2">Festivals</h4>
                    <ul className="list-disc list-inside text-off-white">
                      {selectedDeity.festivals.map((festival, index) => (
                        <li key={`festival-${index}`}>{festival}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-off-white">
                    Select a mantra to add to your practice or listen to its pronunciation.
                  </p>
                  
                  {selectedDeity.mantras.map((mantra, index) => (
                    <motion.div
                      key={`mantra-${index}`}
                      className="bg-deep-indigo-900 bg-opacity-50 rounded-lg p-4 border border-sacred-gold border-opacity-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <p className="text-sacred-gold font-sanskrit text-lg mb-2">{mantra}</p>
                      
                      <div className="flex justify-between mt-3">
                        <button
                          className="text-tulsi-green hover:text-sacred-gold transition-colors"
                          onClick={() => handleMantraSelect(mantra)}
                        >
                          <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add to Practice
                          </span>
                        </button>
                        
                        <button
                          className="text-tulsi-green hover:text-sacred-gold transition-colors"
                          onClick={toggleAudio}
                        >
                          <span className="flex items-center">
                            {audioPlaying ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                            {audioPlaying ? 'Pause' : 'Listen'}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DeityPage;
