import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Volume2 } from 'lucide-react';

interface CardStackProps {
  cards: {
    id: string;
    title: string;
    subtitle?: string;
    content: string;
    details?: string[];
    animation?: string | React.ReactNode;
  }[];
  category: string;
  backgroundColor?: string;
  textColor?: string;
  onCardChange?: (cardId: string) => void;
  audioEnabled?: boolean;
}

export const CardStack: React.FC<CardStackProps> = ({ 
  cards, 
  category,
  backgroundColor = 'bg-amber-50',
  textColor = 'text-amber-900',
  onCardChange,
  audioEnabled = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | 'down' | ''>('');
  const [showDetails, setShowDetails] = useState(false);

  const currentCard = cards[currentIndex];

  useEffect(() => {
    // Notify parent component when card changes
    if (onCardChange && currentCard) {
      onCardChange(currentCard.id);
    }
  }, [currentIndex, currentCard, onCardChange]);

  const handleNext = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setShowDetails(false);
  };

  const handlePrev = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    setShowDetails(false);
  };

  const handleToggleDetails = () => {
    setDirection(showDetails ? 'up' : 'down');
    setShowDetails(!showDetails);
  };

  const variants = {
    enter: (direction: string) => {
      return {
        x: direction === 'right' ? -1000 : direction === 'left' ? 1000 : 0,
        y: direction === 'down' ? -500 : direction === 'up' ? 500 : 0,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    exit: (direction: string) => {
      return {
        x: direction === 'left' ? -1000 : direction === 'right' ? 1000 : 0,
        y: direction === 'up' ? -500 : direction === 'down' ? 500 : 0,
        opacity: 0,
      };
    },
  };

  return (
    <div className={`relative w-full max-w-md mx-auto rounded-xl shadow-2xl overflow-hidden ${backgroundColor}`}>
      <div className={`p-4 text-center ${textColor}`}>
        <h3 className="text-xl font-semibold">{category}</h3>
        <div className="mt-1 text-sm opacity-75">{currentIndex + 1} of {cards.length}</div>
      </div>

      <div className="relative h-96 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentCard.id + (showDetails ? '-details' : '')}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 p-6 flex flex-col"
          >
            <div className={`text-center ${textColor}`}>
              <h2 className="text-2xl font-bold mb-2">{currentCard.title}</h2>
              {currentCard.subtitle && (
                <h3 className="text-lg italic mb-4">{currentCard.subtitle}</h3>
              )}
              {audioEnabled && (
                <div className="absolute top-0 right-0">
                  <Volume2 size={16} className="opacity-50" />
                </div>
              )}
            </div>

            {!showDetails ? (
              <div className={`flex-grow flex flex-col justify-center items-center ${textColor}`}>
                <div className="text-center mb-4">
                  {currentCard.animation && (
                    <div className="animation-container mb-4">
                      {typeof currentCard.animation === 'string' ? (
                        <div className={`animation-${currentCard.animation} h-32 w-32 mx-auto`}></div>
                      ) : (
                        currentCard.animation
                      )}
                    </div>
                  )}
                  <p className="text-lg">{currentCard.content}</p>
                </div>
              </div>
            ) : (
              <div className={`flex-grow overflow-y-auto ${textColor}`}>
                {currentCard.details?.map((detail, idx) => (
                  <div key={idx} className="mb-3">
                    <p>{detail}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between p-4 border-t border-opacity-20">
        <button
          onClick={handlePrev}
          className={`p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors`}
          aria-label="Previous card"
        >
          <ChevronLeft className={textColor} />
        </button>
        
        <button
          onClick={handleToggleDetails}
          className={`p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors`}
          aria-label={showDetails ? "Show summary" : "Show details"}
        >
          {showDetails ? <ChevronUp className={textColor} /> : <ChevronDown className={textColor} />}
        </button>
        
        <button
          onClick={handleNext}
          className={`p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors`}
          aria-label="Next card"
        >
          <ChevronRight className={textColor} />
        </button>
      </div>
    </div>
  );
};

export default CardStack;
