import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Types for scripture data
export interface ScriptureVerse {
  reference: string;
  sanskrit: string;
  translation: string;
  explanation: string;
}

export interface ScriptureText {
  id: string;
  name: string;
  sanskrit: string;
  description: string;
  structure: string;
  significance: string;
  key_concepts: string[];
  sample_verses: ScriptureVerse[];
}

export interface ScriptureSubcategory {
  name: string;
  description: string;
  texts: ScriptureText[];
}

export interface ScriptureCategory {
  category: string;
  description: string;
  subcategories: ScriptureSubcategory[];
}

interface ScriptureLibraryProps {
  onVerseSelect?: (verse: ScriptureVerse) => void;
}

const ScriptureLibrary: React.FC<ScriptureLibraryProps> = ({ onVerseSelect }) => {
  const [scriptures, setScriptures] = useState<ScriptureCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedText, setSelectedText] = useState<ScriptureText | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<ScriptureVerse | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState<boolean>(false);
  
  // Fetch scriptures data
  useEffect(() => {
    const fetchScriptures = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        const response = await fetch('/data/scriptures.json');
        const data = await response.json();
        setScriptures(data.scriptures);
        setLoading(false);
      } catch (err) {
        setError('Failed to load scripture data');
        setLoading(false);
        console.error('Error loading scriptures:', err);
      }
    };
    
    fetchScriptures();
  }, []);
  
  // Get all subcategories based on selected category
  const getSubcategories = () => {
    if (selectedCategory === 'all') {
      return scriptures.flatMap(category => category.subcategories);
    }
    
    const category = scriptures.find(c => c.category.toLowerCase() === selectedCategory.toLowerCase());
    return category ? category.subcategories : [];
  };
  
  // Get all texts based on selected category and subcategory
  const getTexts = () => {
    const subcategories = getSubcategories();
    
    if (selectedSubcategory === 'all') {
      return subcategories.flatMap(subcategory => subcategory.texts);
    }
    
    const subcategory = subcategories.find(s => s.name.toLowerCase() === selectedSubcategory.toLowerCase());
    return subcategory ? subcategory.texts : [];
  };
  
  // Filter texts based on search query
  const filteredTexts = getTexts().filter(text => {
    if (searchQuery === '') return true;
    
    const query = searchQuery.toLowerCase();
    return (
      text.name.toLowerCase().includes(query) ||
      text.description.toLowerCase().includes(query) ||
      text.key_concepts.some(concept => concept.toLowerCase().includes(query)) ||
      text.sample_verses.some(verse => 
        verse.translation.toLowerCase().includes(query) || 
        verse.explanation.toLowerCase().includes(query)
      )
    );
  });
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory('all');
    setSelectedText(null);
    setSelectedVerse(null);
    setAiExplanation(null);
  };
  
  // Handle subcategory selection
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setSelectedText(null);
    setSelectedVerse(null);
    setAiExplanation(null);
  };
  
  // Handle text selection
  const handleTextSelect = (text: ScriptureText) => {
    setSelectedText(text);
    setSelectedVerse(null);
    setAiExplanation(null);
  };
  
  // Handle verse selection
  const handleVerseSelect = (verse: ScriptureVerse) => {
    setSelectedVerse(verse);
    setAiExplanation(null);
    
    if (onVerseSelect) {
      onVerseSelect(verse);
    }
  };
  
  // Request AI explanation for a verse
  const requestAiExplanation = () => {
    if (!selectedVerse) return;
    
    setIsExplaining(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, this would be an API call to an AI service
      const explanations = [
        `This verse explores the profound relationship between the individual consciousness (Atman) and the universal consciousness (Brahman). The metaphor used here illustrates how our true nature is often obscured by worldly attachments and ignorance. When we transcend these limitations through spiritual practice, we realize our inherent divinity and oneness with the cosmic reality.`,
        `The philosophical depth of this verse lies in its exploration of non-dualism (Advaita). It suggests that the apparent separation between the self and the divine is an illusion created by maya (cosmic illusion). Through meditation and self-inquiry, one can pierce through this veil and experience the ultimate truth of existence.`,
        `This teaching represents a cornerstone of Vedantic philosophy, emphasizing that liberation comes through direct experiential knowledge rather than intellectual understanding alone. The verse invites us to look beyond the transient nature of physical existence to recognize the eternal, unchanging reality that permeates all things.`,
        `From a practical spiritual perspective, this verse encourages detachment from outcomes while maintaining diligent effort in one's actions. This balanced approach to life—performing one's duties without attachment to results—leads to inner peace and spiritual growth regardless of external circumstances.`
      ];
      
      // Select a random explanation
      const randomExplanation = explanations[Math.floor(Math.random() * explanations.length)];
      
      setAiExplanation(randomExplanation);
      setIsExplaining(false);
    }, 2000);
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sacred-gold"></div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-deep-indigo-800 text-sacred-gold rounded-md"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className="scripture-library">
      {/* Header with search and filters */}
      <div className="mb-6 space-y-4">
        <motion.h1 
          className="text-3xl text-sacred-gold font-cormorant text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Vedic Scripture Library
        </motion.h1>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search scriptures, concepts, or verses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 pl-10 focus:outline-none focus:border-lotus-pink transition-colors rounded-md"
          />
          <div className="absolute left-3 top-2.5 text-sacred-gold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Category filters */}
          <div className="flex overflow-x-auto space-x-2 pb-1 hide-scrollbar">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-1.5 rounded-full whitespace-nowrap ${
                selectedCategory === 'all' 
                  ? 'bg-sacred-gold text-deep-indigo-900' 
                  : 'bg-deep-indigo-800 text-off-white'
              }`}
            >
              All Categories
            </button>
            
            {scriptures.map((category, index) => (
              <button
                key={`category-${index}`}
                onClick={() => handleCategoryChange(category.category.toLowerCase())}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap ${
                  selectedCategory === category.category.toLowerCase() 
                    ? 'bg-sacred-gold text-deep-indigo-900' 
                    : 'bg-deep-indigo-800 text-off-white'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
          
          {/* Subcategory filters */}
          {selectedCategory !== 'all' && (
            <div className="flex overflow-x-auto space-x-2 pb-1 hide-scrollbar mt-2">
              <button
                onClick={() => handleSubcategoryChange('all')}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap ${
                  selectedSubcategory === 'all' 
                    ? 'bg-lotus-pink text-deep-indigo-900' 
                    : 'bg-deep-indigo-800 text-off-white'
                }`}
              >
                All {selectedCategory} Texts
              </button>
              
              {getSubcategories().map((subcategory, index) => (
                <button
                  key={`subcategory-${index}`}
                  onClick={() => handleSubcategoryChange(subcategory.name.toLowerCase())}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap ${
                    selectedSubcategory === subcategory.name.toLowerCase() 
                      ? 'bg-lotus-pink text-deep-indigo-900' 
                      : 'bg-deep-indigo-800 text-off-white'
                  }`}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scripture list */}
        <div className={`${selectedText ? 'lg:col-span-4' : 'lg:col-span-12'}`}>
          <div className="bg-deep-indigo-800 bg-opacity-30 rounded-xl p-4 border border-sacred-gold border-opacity-30">
            <h2 className="text-xl text-sacred-gold font-cormorant mb-4">Sacred Texts</h2>
            
            {filteredTexts.length === 0 ? (
              <p className="text-off-white text-center py-8">No texts found matching your search.</p>
            ) : (
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {filteredTexts.map((text, index) => (
                  <motion.div
                    key={`text-${index}`}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedText?.id === text.id
                        ? 'bg-sacred-gold bg-opacity-20 border border-sacred-gold'
                        : 'bg-deep-indigo-900 bg-opacity-50 hover:bg-opacity-70 border border-sacred-gold border-opacity-20'
                    }`}
                    onClick={() => handleTextSelect(text)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <h3 className="text-lg text-sacred-gold font-cormorant">{text.name}</h3>
                    <p className="text-tulsi-green text-sm font-sanskrit mb-2">{text.sanskrit}</p>
                    <p className="text-off-white text-sm line-clamp-2">{text.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Selected text details */}
        {selectedText && (
          <motion.div
            className="lg:col-span-8 bg-deep-indigo-800 bg-opacity-30 rounded-xl p-6 border border-sacred-gold border-opacity-30"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl text-sacred-gold font-cormorant">{selectedText.name}</h2>
                <p className="text-tulsi-green font-sanskrit">{selectedText.sanskrit}</p>
              </div>
              
              <button
                className="text-sacred-gold hover:text-lotus-pink"
                onClick={() => setSelectedText(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="text-off-white">{selectedText.description}</p>
              
              <div>
                <h3 className="text-sacred-gold text-lg font-cormorant mb-2">Structure</h3>
                <p className="text-off-white">{selectedText.structure}</p>
              </div>
              
              <div>
                <h3 className="text-sacred-gold text-lg font-cormorant mb-2">Significance</h3>
                <p className="text-off-white">{selectedText.significance}</p>
              </div>
              
              <div>
                <h3 className="text-sacred-gold text-lg font-cormorant mb-2">Key Concepts</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedText.key_concepts.map((concept, index) => (
                    <span
                      key={`concept-${index}`}
                      className="bg-deep-indigo-900 text-tulsi-green px-3 py-1 rounded-full text-sm"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sample verses */}
            <div>
              <h3 className="text-sacred-gold text-lg font-cormorant mb-4">Sample Verses</h3>
              
              <div className="space-y-6">
                {selectedText.sample_verses.map((verse, index) => (
                  <motion.div
                    key={`verse-${index}`}
                    className={`p-4 rounded-lg border ${
                      selectedVerse?.reference === verse.reference
                        ? 'bg-sacred-gold bg-opacity-10 border-sacred-gold'
                        : 'bg-deep-indigo-900 bg-opacity-50 border-sacred-gold border-opacity-20'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleVerseSelect(verse)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-tulsi-green font-spectral">{verse.reference}</h4>
                      
                      {selectedVerse?.reference === verse.reference && (
                        <button
                          className="text-sacred-gold hover:text-lotus-pink text-sm flex items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            requestAiExplanation();
                          }}
                          disabled={isExplaining}
                        >
                          {isExplaining ? (
                            <>
                              <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Generating...
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              AI Explanation
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    
                    <p className="text-sacred-gold font-sanskrit text-lg mb-2">{verse.sanskrit}</p>
                    <p className="text-off-white mb-4">{verse.translation}</p>
                    
                    <div className="bg-deep-indigo-900 bg-opacity-50 p-3 rounded">
                      <h5 className="text-tulsi-green text-sm mb-1">Traditional Explanation:</h5>
                      <p className="text-off-white text-sm">{verse.explanation}</p>
                    </div>
                    
                    {/* AI Explanation */}
                    {selectedVerse?.reference === verse.reference && aiExplanation && (
                      <motion.div
                        className="mt-4 bg-lotus-pink bg-opacity-10 p-3 rounded border border-lotus-pink border-opacity-30"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <h5 className="text-lotus-pink text-sm mb-1">AI-Generated Insight:</h5>
                        <p className="text-off-white text-sm">{aiExplanation}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScriptureLibrary;
