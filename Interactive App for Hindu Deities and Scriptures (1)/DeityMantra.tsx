import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Deity } from './DeityCard';

interface DeityMantraProps {
  deity: Deity;
  onMantraSelect?: (mantra: string) => void;
}

const DeityMantra: React.FC<DeityMantraProps> = ({ deity, onMantraSelect }) => {
  const [selectedMantra, setSelectedMantra] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [audioLoaded, setAudioLoaded] = useState<boolean>(false);
  
  // Reset state when deity changes
  useEffect(() => {
    setSelectedMantra(null);
    setAudioPlaying(false);
    setAudioLoaded(false);
  }, [deity]);
  
  // Handle mantra selection
  const handleMantraSelect = (mantra: string) => {
    setSelectedMantra(mantra);
    
    if (onMantraSelect) {
      onMantraSelect(mantra);
    }
    
    // Stop audio if playing
    if (audioPlaying) {
      setAudioPlaying(false);
    }
  };
  
  // Toggle audio playback
  const toggleAudio = (mantra: string) => {
    if (selectedMantra !== mantra) {
      setSelectedMantra(mantra);
    }
    
    setAudioPlaying(!audioPlaying);
  };
  
  // Simulate audio loading
  useEffect(() => {
    if (selectedMantra) {
      setAudioLoaded(false);
      const timer = setTimeout(() => {
        setAudioLoaded(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [selectedMantra]);
  
  // Generate Sanskrit transliteration with proper diacritical marks
  const enhanceSanskrit = (mantra: string) => {
    // This is a simplified version - in a real app, this would use a proper Sanskrit transliteration library
    return mantra
      .replace(/aa/g, 'ā')
      .replace(/ii/g, 'ī')
      .replace(/uu/g, 'ū')
      .replace(/sh/g, 'ś')
      .replace(/Sh/g, 'Ṣ');
  };
  
  return (
    <div className="deity-mantra space-y-6">
      <div className="mb-4">
        <h3 className="text-xl text-sacred-gold font-cormorant mb-2">Sacred Mantras</h3>
        <p className="text-off-white text-sm">
          These mantras invoke the divine energy of {deity.name} and establish a spiritual connection.
          Select a mantra to add to your practice or listen to its pronunciation.
        </p>
      </div>
      
      {/* Mantra list */}
      <div className="space-y-4">
        {deity.mantras.map((mantra, index) => (
          <motion.div
            key={`${deity.id}-mantra-${index}`}
            className={`bg-deep-indigo-900 bg-opacity-50 rounded-lg p-4 border transition-colors ${
              selectedMantra === mantra 
                ? 'border-sacred-gold' 
                : 'border-sacred-gold border-opacity-20'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex flex-col">
              <p className="text-sacred-gold font-sanskrit text-lg mb-1">{enhanceSanskrit(mantra)}</p>
              <p className="text-tulsi-green text-sm">{mantra}</p>
            </div>
            
            <div className="flex justify-between mt-4">
              <button
                className="text-tulsi-green hover:text-sacred-gold transition-colors flex items-center"
                onClick={() => handleMantraSelect(mantra)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add to Practice</span>
              </button>
              
              <button
                className="text-tulsi-green hover:text-sacred-gold transition-colors flex items-center"
                onClick={() => toggleAudio(mantra)}
                disabled={selectedMantra === mantra && !audioLoaded}
              >
                {selectedMantra === mantra && audioPlaying ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Pause</span>
                  </>
                ) : selectedMantra === mantra && !audioLoaded ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Listen</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Audio visualization when playing */}
            {selectedMantra === mantra && audioPlaying && audioLoaded && (
              <motion.div 
                className="mt-3 h-6 flex items-center justify-center space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={`audio-bar-${i}`}
                    className="w-1 bg-sacred-gold"
                    animate={{
                      height: [4, 12, 8, 16, 4],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Worship information */}
      <div className="mt-8">
        <h3 className="text-xl text-sacred-gold font-cormorant mb-2">Worship Practices</h3>
        
        <div className="bg-deep-indigo-900 bg-opacity-50 rounded-lg p-4 border border-sacred-gold border-opacity-20">
          <h4 className="text-tulsi-green font-spectral mb-2">Festivals</h4>
          <ul className="list-disc list-inside text-off-white mb-4">
            {deity.festivals.map((festival, index) => (
              <li key={`${deity.id}-festival-${index}`}>{festival}</li>
            ))}
          </ul>
          
          <h4 className="text-tulsi-green font-spectral mb-2">Offerings</h4>
          <p className="text-off-white mb-4">
            {deity.id === 'shiva' && 'Bilva leaves, milk, water, honey, yogurt, and flowers. Rudraksha beads are sacred to Lord Shiva.'}
            {deity.id === 'vishnu' && 'Tulsi leaves, yellow flowers, sandalwood paste, and fruits. Yellow is considered auspicious for Lord Vishnu.'}
            {deity.id === 'lakshmi' && 'Red flowers, coins, rice, incense, and sweets. Lighting lamps with ghee is especially auspicious.'}
            {deity.id === 'ganesha' && 'Modak (sweet dumplings), red flowers, durva grass, and coconut. Breaking a coconut symbolizes breaking the ego.'}
            {deity.id === 'durga' && 'Red flowers, sindoor (vermilion), fruits, and sweets. Nine forms of the goddess are worshipped during Navaratri.'}
            {deity.id === 'saraswati' && 'White flowers, books, musical instruments, and yellow clothes. Students seek her blessings for knowledge.'}
            {deity.id === 'hanuman' && 'Red flowers, sindoor, oil lamps, and sweets. Recitation of Hanuman Chalisa is a common practice.'}
            {deity.id === 'krishna' && 'Tulsi leaves, butter, milk, flute, peacock feathers, and yellow flowers. Bhajans (devotional songs) are sung in his praise.'}
            {deity.id === 'kali' && 'Red hibiscus flowers, sweets, and incense. Worship is often performed at night.'}
            {deity.id === 'brahma' && 'White flowers, fruits, and incense. Brahma is rarely worshipped independently in temples.'}
            {deity.id === 'parvati' && 'Red flowers, bangles, turmeric, and sweets. Married women worship her for marital bliss.'}
          </p>
          
          <h4 className="text-tulsi-green font-spectral mb-2">Rituals</h4>
          <p className="text-off-white">
            {deity.id === 'shiva' && 'Abhishekam (ritual bathing) with milk, honey, and water. Fasting on Mondays and during Maha Shivaratri.'}
            {deity.id === 'vishnu' && 'Recitation of Vishnu Sahasranama (1000 names). Observing Ekadashi fast (11th day of lunar fortnight).'}
            {deity.id === 'lakshmi' && 'Friday worship with lamps and flowers. Special rituals during Diwali and Fridays of Shravan month.'}
            {deity.id === 'ganesha' && 'Offering 21 modaks and circling the idol 108 times. Special worship before beginning new ventures.'}
            {deity.id === 'durga' && 'Nine-day worship during Navaratri with different offerings each day. Recitation of Durga Saptashati.'}
            {deity.id === 'saraswati' && 'Placing books and instruments at her feet for blessing. Special worship during Vasant Panchami.'}
            {deity.id === 'hanuman' && 'Offering sindoor and oil on Tuesdays. Recitation of Hanuman Chalisa 108 times for special wishes.'}
            {deity.id === 'krishna' && 'Celebrating Janmashtami with fasting until midnight. Offering butter and performing Raas Leela.'}
            {deity.id === 'kali' && 'Night worship with special mantras. Observing Amavasya (new moon) rituals.'}
            {deity.id === 'brahma' && 'Rare worship, mainly through Vedic chanting and fire rituals (havan).'}
            {deity.id === 'parvati' && 'Solah Somvar Vrat (16 Mondays fast) for marital bliss. Special worship during Teej festival.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeityMantra;
