import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Types for deity data
export interface DeityAttribute {
  weapons: string[];
  vehicle: string;
  symbols: string[];
  consort: string;
}

export interface DeityStory {
  title: string;
  content: string;
}

export interface DeityAnimationStyle {
  primary: string;
  elements: string[];
  background: string;
  colorScheme: string[];
}

export interface Deity {
  id: string;
  name: string;
  sanskrit: string;
  title: string;
  description: string;
  attributes: DeityAttribute;
  stories: DeityStory[];
  cosmicRole: string;
  festivals: string[];
  mantras: string[];
  animationStyle: DeityAnimationStyle;
}

interface DeityCardProps {
  deity: Deity;
  isExpanded: boolean;
  onExpand: () => void;
  onClose: () => void;
}

const DeityCard: React.FC<DeityCardProps> = ({ deity, isExpanded, onExpand, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stories' | 'worship'>('overview');
  
  // Generate animation styles based on deity's animation style
  const getAnimationStyles = () => {
    const { primary, elements, background, colorScheme } = deity.animationStyle;
    
    // Base styles
    const styles: any = {
      backgroundImage: `url(/assets/images/deities/backgrounds/${background}.webp)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    
    // Add primary animation class
    styles.animationClass = `animation-${primary}`;
    
    // Add color scheme
    styles.primaryColor = colorScheme[0];
    styles.secondaryColor = colorScheme[1];
    styles.accentColor = colorScheme[2];
    
    return styles;
  };
  
  const animationStyles = getAnimationStyles();
  
  // Card variants for framer-motion
  const cardVariants = {
    collapsed: {
      height: '16rem',
      width: '100%',
      borderRadius: '1rem',
      transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    expanded: {
      height: '36rem',
      width: '100%',
      borderRadius: '1.5rem',
      transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };
  
  // Content variants for framer-motion
  const contentVariants = {
    collapsed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 }
    },
    expanded: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.5, delay: 0.2 }
    }
  };
  
  // Animation elements based on deity
  const renderAnimationElements = () => {
    return deity.animationStyle.elements.map((element, index) => (
      <motion.div
        key={`${deity.id}-element-${index}`}
        className={`animation-element element-${element}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: index * 0.2 }}
      />
    ));
  };
  
  // Render overview tab content
  const renderOverview = () => {
    return (
      <div className="space-y-4">
        <p className="text-off-white text-base">{deity.description}</p>
        
        <div className="mt-4">
          <h4 className="text-sacred-gold text-lg font-cormorant mb-2">Cosmic Role</h4>
          <p className="text-off-white">{deity.cosmicRole}</p>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sacred-gold text-lg font-cormorant mb-2">Attributes</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <span className="text-tulsi-green text-sm">Vehicle:</span>
              <p className="text-off-white">{deity.attributes.vehicle}</p>
            </div>
            <div>
              <span className="text-tulsi-green text-sm">Consort:</span>
              <p className="text-off-white">{deity.attributes.consort}</p>
            </div>
            <div className="col-span-2">
              <span className="text-tulsi-green text-sm">Symbols:</span>
              <p className="text-off-white">{deity.attributes.symbols.join(', ')}</p>
            </div>
            {deity.attributes.weapons.length > 0 && (
              <div className="col-span-2">
                <span className="text-tulsi-green text-sm">Weapons:</span>
                <p className="text-off-white">{deity.attributes.weapons.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // Render stories tab content
  const renderStories = () => {
    return (
      <div className="space-y-6">
        {deity.stories.map((story, index) => (
          <motion.div
            key={`${deity.id}-story-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-4"
          >
            <h4 className="text-sacred-gold text-lg font-cormorant mb-2">{story.title}</h4>
            <p className="text-off-white">{story.content}</p>
          </motion.div>
        ))}
      </div>
    );
  };
  
  // Render worship tab content
  const renderWorship = () => {
    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-sacred-gold text-lg font-cormorant mb-2">Festivals</h4>
          <ul className="list-disc list-inside text-off-white">
            {deity.festivals.map((festival, index) => (
              <li key={`${deity.id}-festival-${index}`}>{festival}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sacred-gold text-lg font-cormorant mb-2">Mantras</h4>
          <ul className="list-disc list-inside text-off-white">
            {deity.mantras.map((mantra, index) => (
              <li key={`${deity.id}-mantra-${index}`}>{mantra}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  return (
    <motion.div
      className={`deity-card relative overflow-hidden ${isExpanded ? 'z-10' : ''}`}
      style={{
        backgroundColor: `rgba(20, 16, 36, 0.8)`,
        borderColor: animationStyles.primaryColor,
      }}
      variants={cardVariants}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      layoutId={`deity-card-${deity.id}`}
      onClick={!isExpanded ? onExpand : undefined}
    >
      {/* Animation elements */}
      <div className="absolute inset-0 overflow-hidden">
        {isExpanded && renderAnimationElements()}
      </div>
      
      {/* Card content */}
      <div className="relative z-10 p-4 h-full">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl text-sacred-gold font-cormorant">{deity.name}</h2>
            <h3 className="text-lg text-tulsi-green font-spectral">{deity.title}</h3>
            <p className="text-sm text-off-white mt-1">{deity.sanskrit}</p>
          </div>
          
          {isExpanded && (
            <motion.button
              className="text-sacred-gold hover:text-lotus-pink"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </div>
        
        {/* Collapsed preview */}
        {!isExpanded && (
          <div className="mt-4">
            <p className="text-off-white line-clamp-3">{deity.description}</p>
          </div>
        )}
        
        {/* Expanded content */}
        {isExpanded && (
          <motion.div
            variants={contentVariants}
            initial="collapsed"
            animate="expanded"
            className="mt-6"
          >
            {/* Tab navigation */}
            <div className="flex border-b border-sacred-gold mb-4">
              <button
                className={`px-4 py-2 ${activeTab === 'overview' ? 'text-sacred-gold border-b-2 border-sacred-gold' : 'text-off-white'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'stories' ? 'text-sacred-gold border-b-2 border-sacred-gold' : 'text-off-white'}`}
                onClick={() => setActiveTab('stories')}
              >
                Stories
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'worship' ? 'text-sacred-gold border-b-2 border-sacred-gold' : 'text-off-white'}`}
                onClick={() => setActiveTab('worship')}
              >
                Worship
              </button>
            </div>
            
            {/* Tab content */}
            <div className="overflow-y-auto max-h-64 pr-2 custom-scrollbar">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'stories' && renderStories()}
              {activeTab === 'worship' && renderWorship()}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DeityCard;
