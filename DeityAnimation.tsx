import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Deity } from './DeityCard';

interface DeityAnimationProps {
  deity: Deity;
  isActive: boolean;
}

const DeityAnimation: React.FC<DeityAnimationProps> = ({ deity, isActive }) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading of animation assets
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!loaded || !isActive) return null;
  
  // Get animation configuration based on deity
  const getAnimationConfig = () => {
    const { primary, elements, colorScheme } = deity.animationStyle;
    
    // Base configuration
    const config: any = {
      primaryAnimation: primary,
      elements: elements,
      colors: colorScheme,
    };
    
    // Customize based on deity
    switch (deity.id) {
      case 'shiva':
        config.specialEffects = ['cosmic-dance', 'third-eye-glow'];
        break;
      case 'vishnu':
        config.specialEffects = ['chakra-rotation', 'ocean-waves'];
        break;
      case 'lakshmi':
        config.specialEffects = ['prosperity-glow', 'lotus-bloom'];
        break;
      case 'ganesha':
        config.specialEffects = ['trunk-movement', 'modak-glow'];
        break;
      case 'durga':
        config.specialEffects = ['lion-movement', 'weapons-glow'];
        break;
      case 'krishna':
        config.specialEffects = ['flute-playing', 'peacock-feather'];
        break;
      default:
        config.specialEffects = [];
    }
    
    return config;
  };
  
  const animationConfig = getAnimationConfig();
  
  // Render primary animation
  const renderPrimaryAnimation = () => {
    switch (animationConfig.primaryAnimation) {
      case 'cosmic-dance':
        return (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <div className="w-full h-full bg-cosmic-dance opacity-40" />
          </motion.div>
        );
        
      case 'chakra-rotation':
        return (
          <motion.div 
            className="absolute top-4 right-4 w-16 h-16"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ 
              opacity: 0.8,
              rotate: 360
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "linear" 
            }}
          >
            <div className="w-full h-full rounded-full border-2 border-sacred-gold opacity-70" 
                 style={{ 
                   backgroundImage: 'url(/assets/images/deities/elements/chakra.svg)',
                   backgroundSize: 'contain'
                 }} 
            />
          </motion.div>
        );
        
      case 'flowing-river':
        return (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-12"
            initial={{ x: -100, opacity: 0 }}
            animate={{ 
              x: 300,
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <div className="w-full h-full bg-flowing-water opacity-40" />
          </motion.div>
        );
        
      case 'falling-gold-coins':
        return (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div 
                key={`coin-${i}`}
                className="absolute w-4 h-4 rounded-full bg-sacred-gold"
                initial={{ 
                  top: -20, 
                  left: `${10 + (i * 10)}%`,
                  opacity: 0.8
                }}
                animate={{ 
                  top: '100%',
                  opacity: [0.8, 0.9, 0.8, 0]
                }}
                transition={{ 
                  duration: 4 + (i % 3), 
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeIn" 
                }}
              />
            ))}
          </>
        );
        
      case 'elephant-trunk-movement':
        return (
          <motion.div 
            className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-32"
            initial={{ rotate: -5 }}
            animate={{ 
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <div className="w-full h-full opacity-70" 
                 style={{ 
                   backgroundImage: 'url(/assets/images/deities/elements/trunk.svg)',
                   backgroundSize: 'contain',
                   backgroundPosition: 'center',
                   backgroundRepeat: 'no-repeat'
                 }} 
            />
          </motion.div>
        );
        
      case 'fierce-dance':
        return (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              scale: [0.95, 1.02, 0.95]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <div className="w-full h-full bg-fierce-dance opacity-50" />
          </motion.div>
        );
        
      case 'flute-playing':
        return (
          <motion.div 
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-24 h-24"
            initial={{ rotate: -2 }}
            animate={{ 
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <div className="w-full h-full opacity-70" 
                 style={{ 
                   backgroundImage: 'url(/assets/images/deities/elements/flute.svg)',
                   backgroundSize: 'contain',
                   backgroundPosition: 'center',
                   backgroundRepeat: 'no-repeat'
                 }} 
            />
          </motion.div>
        );
        
      default:
        return null;
    }
  };
  
  // Render animation elements
  const renderElements = () => {
    return animationConfig.elements.map((element: string, index: number) => {
      switch (element) {
        case 'flowing-ganges':
          return (
            <motion.div 
              key={`element-${index}`}
              className="absolute top-0 right-0 w-full h-16"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${animationConfig.colors[0]}40, transparent)`,
                transform: 'rotate(-15deg) translateY(-50%)'
              }}
              initial={{ x: -200, opacity: 0 }}
              animate={{ 
                x: 400,
                opacity: [0, 0.4, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "linear" 
              }}
            />
          );
          
        case 'third-eye-glow':
          return (
            <motion.div 
              key={`element-${index}`}
              className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
              style={{ 
                background: `radial-gradient(circle, ${animationConfig.colors[0]}, transparent 70%)`,
              }}
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          );
          
        case 'lotus-bloom':
          return (
            <motion.div 
              key={`element-${index}`}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-24"
              style={{ 
                backgroundImage: 'url(/assets/images/deities/elements/lotus.svg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ 
                scale: [0.8, 1, 0.8],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          );
          
        case 'prosperity-aura':
          return (
            <motion.div 
              key={`element-${index}`}
              className="absolute inset-0 rounded-full"
              style={{ 
                background: `radial-gradient(circle, ${animationConfig.colors[0]}30, transparent 70%)`,
              }}
              initial={{ opacity: 0.3, scale: 0.9 }}
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          );
          
        default:
          return null;
      }
    });
  };
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {renderPrimaryAnimation()}
      {renderElements()}
    </div>
  );
};

export default DeityAnimation;
