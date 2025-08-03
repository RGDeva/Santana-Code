import { motion } from 'framer-motion';

// Optimized Animation components for different deities and scriptures with unique art styles
const AnimationFramework = ({ type, category }: { type: string; category: 'deity' | 'scripture' }) => {
  // Deity animations with distinctive art styles - optimized for performance
  if (category === 'deity') {
    switch (type) {
      case 'shiva':
        return (
          <motion.div 
            className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: ['0 0 15px #3b82f6', '0 0 30px #3b82f6', '0 0 15px #3b82f6'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            {/* Shiva's third eye */}
            <motion.div
              className="absolute top-6 w-2 h-2 bg-yellow-300 rounded-full"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Shiva's trident */}
            <div className="relative">
              <div className="w-1 h-20 bg-silver-100 rounded-full" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-silver-100 rounded-full" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -rotate-30 w-8 h-1 bg-silver-100 rounded-full origin-left" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 rotate-30 w-8 h-1 bg-silver-100 rounded-full origin-right" />
            </div>
          </motion.div>
        );
      case 'vishnu':
        return (
          <motion.div 
            className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500 to-amber-700 flex items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: ['0 0 15px #f59e0b', '0 0 30px #f59e0b', '0 0 15px #f59e0b'],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            {/* Vishnu's chakra (discus) */}
            <motion.div 
              className="w-16 h-16 rounded-full border-2 border-yellow-300"
              style={{
                background: 'radial-gradient(circle, rgba(252,211,77,0.3) 0%, rgba(252,211,77,0) 70%)'
              }}
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "linear" 
              }}
            >
              {/* Chakra spokes - simplified */}
              <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-yellow-300 origin-center" style={{ transform: 'translate(-50%, -50%) rotate(0deg)' }} />
              <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-yellow-300 origin-center" style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }} />
              <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-yellow-300 origin-center" style={{ transform: 'translate(-50%, -50%) rotate(90deg)' }} />
              <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-yellow-300 origin-center" style={{ transform: 'translate(-50%, -50%) rotate(135deg)' }} />
            </motion.div>
          </motion.div>
        );
      case 'brahma':
        return (
          <motion.div 
            className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: ['0 0 15px #dc2626', '0 0 30px #dc2626', '0 0 15px #dc2626'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            {/* Brahma's four faces (represented as circles) - simplified */}
            <div className="relative w-20 h-20">
              {/* Face 1 - Front */}
              <div className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-orange-200" style={{ transform: 'translate(-50%, -50%)' }}>
                <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-black" />
                <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-black" />
                <div className="absolute bottom-1/3 left-1/2 w-2 h-0.5 rounded-full bg-black" style={{ transform: 'translateX(-50%)' }} />
              </div>
              
              {/* Face 2 - Right */}
              <div className="absolute top-1/2 right-0 w-6 h-6 rounded-full bg-orange-200" />
              
              {/* Face 3 - Left */}
              <div className="absolute top-1/2 left-0 w-6 h-6 rounded-full bg-orange-200" />
              
              {/* Face 4 - Top */}
              <div className="absolute top-0 left-1/2 w-6 h-6 rounded-full bg-orange-200" style={{ transform: 'translateX(-50%)' }} />
            </div>
          </motion.div>
        );
      case 'lakshmi':
        return (
          <motion.div 
            className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: ['0 0 15px #fb7185', '0 0 30px #fb7185', '0 0 15px #fb7185'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            {/* Prosperity aura */}
            <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle, rgba(253,224,71,0.6) 0%, rgba(253,224,71,0) 70%)' }} />
            
            {/* Lotus throne - simplified */}
            <div className="absolute bottom-2 w-24 h-12">
              {/* Lotus petals - reduced number */}
              <div className="absolute bottom-0 left-1/2 w-6 h-3 rounded-t-full" style={{ background: 'linear-gradient(to top, #fb7185, #fecdd3)', transform: 'translateX(-50%) rotate(0deg)', transformOrigin: 'bottom' }} />
              <div className="absolute bottom-0 left-1/2 w-6 h-3 rounded-t-full" style={{ background: 'linear-gradient(to top, #fb7185, #fecdd3)', transform: 'translateX(-50%) rotate(60deg)', transformOrigin: 'bottom' }} />
              <div className="absolute bottom-0 left-1/2 w-6 h-3 rounded-t-full" style={{ background: 'linear-gradient(to top, #fb7185, #fecdd3)', transform: 'translateX(-50%) rotate(120deg)', transformOrigin: 'bottom' }} />
              <div className="absolute bottom-0 left-1/2 w-6 h-3 rounded-t-full" style={{ background: 'linear-gradient(to top, #fb7185, #fecdd3)', transform: 'translateX(-50%) rotate(180deg)', transformOrigin: 'bottom' }} />
              <div className="absolute bottom-0 left-1/2 w-6 h-3 rounded-t-full" style={{ background: 'linear-gradient(to top, #fb7185, #fecdd3)', transform: 'translateX(-50%) rotate(240deg)', transformOrigin: 'bottom' }} />
              <div className="absolute bottom-0 left-1/2 w-6 h-3 rounded-t-full" style={{ background: 'linear-gradient(to top, #fb7185, #fecdd3)', transform: 'translateX(-50%) rotate(300deg)', transformOrigin: 'bottom' }} />
            </div>
          </motion.div>
        );
      case 'saraswati':
        return (
          <motion.div 
            className="w-32 h-32 rounded-full bg-gradient-to-br from-white to-blue-100 flex items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: ['0 0 15px #93c5fd', '0 0 30px #93c5fd', '0 0 15px #93c5fd'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            {/* Knowledge aura */}
            <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle, rgba(147,197,253,0.6) 0%, rgba(147,197,253,0) 70%)' }} />
            
            {/* Veena instrument - simplified */}
            <div className="relative">
              {/* Veena body */}
              <div className="w-16 h-4 rounded-full bg-amber-700" />
              
              {/* Veena neck */}
              <div className="absolute top-0 left-1/2 w-1 h-12 bg-amber-800" style={{ transform: 'translateX(-50%)' }} />
              
              {/* Veena strings - reduced */}
              <div className="absolute top-0 left-1/2 w-0.5 h-12 bg-gray-200" style={{ transform: 'translateX(-3px)', opacity: 0.8 }} />
              <div className="absolute top-0 left-1/2 w-0.5 h-12 bg-gray-200" style={{ transform: 'translateX(1px)', opacity: 0.8 }} />
            </div>
          </motion.div>
        );
      case 'parvati':
        return (
          <motion.div 
            className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: ['0 0 15px #10b981', '0 0 30px #10b981', '0 0 15px #10b981'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            {/* Mountain background - simplified */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0) 70%)', clipPath: 'polygon(0% 100%, 25% 70%, 50% 90%, 75% 60%, 100% 100%)' }} />
            
            {/* Goddess silhouette */}
            <div className="absolute w-10 h-16 bg-green-200 rounded-t-full" style={{ background: 'linear-gradient(to top, #a7f3d0, #d1fae5)', clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }}>
              {/* Head */}
              <div className="absolute top-0 left-1/2 w-5 h-5 rounded-full bg-green-200" style={{ transform: 'translateX(-50%)' }} />
            </div>
          </motion.div>
        );
      case 'ganesha':
        return (
          <motion.div 
            className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-red-700 flex items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: ['0 0 15px #f97316', '0 0 30px #f97316', '0 0 15px #f97316'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            {/* Auspicious background */}
            <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle, rgba(254,215,170,0.6) 0%, rgba(254,215,170,0) 70%)' }} />
            
            {/* Ganesha body - simplified */}
            <div className="w-16 h-16 rounded-full bg-orange-200">
              {/* Ganesha head */}
              <div className="absolute top-0 left-1/2 w-12 h-10 rounded-t-full bg-orange-200" style={{ transform: 'translateX(-50%) translateY(-40%)' }}>
                {/* Eyes */}
                <div className="absolute top-1/3 left-1/4 w-1 h-1 rounded-full bg-black" />
                <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-black" />
                
                {/* Trunk */}
                <motion.div
                  className="absolute bottom-0 left-1/2 w-3 h-8 bg-orange-200 rounded-b-full"
                  style={{ transform: 'translateX(-50%)' }}
                  animate={{
                    rotateZ: [0, 10, 0, -10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Ears - simplified */}
                <div className="absolute top-1/4 left-0 w-4 h-6 bg-orange-200 rounded-full" style={{ transform: 'translateX(-50%)' }} />
                <div className="absolute top-1/4 right-0 w-4 h-6 bg-orange-200 rounded-full" style={{ transform: 'translateX(50%)' }} />
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div 
            className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700"
            animate={{ 
              boxShadow: ['0 0 15px #8b5cf6', '0 0 30px #8b5cf6', '0 0 15px #8b5cf6'],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          />
        );
    }
  } 
  // Scripture animations - optimized
  else {
    switch (type) {
      case 'vedas':
        return (
          <motion.div 
            className="w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-300 rounded-md flex items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: ['0 0 5px #f59e0b', '0 0 15px #f59e0b', '0 0 5px #f59e0b'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            {/* Sanskrit text lines - simplified */}
            <div className="w-20 h-1 bg-amber-700 rounded-full my-1" />
            <div className="w-16 h-1 bg-amber-700 rounded-full my-1" />
            <div className="w-18 h-1 bg-amber-700 rounded-full my-1" />
            
            {/* Om symbol */}
            <div className="absolute top-4 left-1/2 text-2xl text-amber-800 font-bold" style={{ transform: 'translateX(-50%)' }}>
              ॐ
            </div>
          </motion.div>
        );
      case 'upanishads':
        return (
          <motion.div 
            className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-300 rounded-md flex flex-col items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: ['0 0 5px #10b981', '0 0 15px #10b981', '0 0 5px #10b981'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            {/* Circular mandala pattern - simplified */}
            <div className="absolute w-24 h-24 rounded-full border-2 border-emerald-600 opacity-20" />
            
            {/* Text lines - simplified */}
            <div className="w-16 h-1 bg-emerald-700 rounded-full my-1" />
            <div className="w-14 h-1 bg-emerald-700 rounded-full my-1" />
            <div className="w-16 h-1 bg-emerald-700 rounded-full my-1" />
            <div className="w-12 h-1 bg-emerald-700 rounded-full my-1" />
          </motion.div>
        );
      case 'gita':
        return (
          <motion.div 
            className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-300 rounded-md flex items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: ['0 0 5px #3b82f6', '0 0 15px #3b82f6', '0 0 5px #3b82f6'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            {/* Chariot wheel - simplified */}
            <motion.div 
              className="w-20 h-20 rounded-full border-2 border-blue-600"
              animate={{ 
                rotate: 360
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Wheel spokes - simplified */}
              <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-blue-600 origin-center" style={{ transform: 'translate(-50%, -50%) rotate(0deg)' }} />
              <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-blue-600 origin-center" style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }} />
              <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-blue-600 origin-center" style={{ transform: 'translate(-50%, -50%) rotate(90deg)' }} />
              <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-blue-600 origin-center" style={{ transform: 'translate(-50%, -50%) rotate(135deg)' }} />
            </motion.div>
          </motion.div>
        );
      case 'ramayana':
        return (
          <motion.div 
            className="w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-300 rounded-md flex items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: ['0 0 5px #f97316', '0 0 15px #f97316', '0 0 5px #f97316'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            {/* Rama's bow - simplified */}
            <div className="w-20 h-20 border-t-4 border-orange-700 rounded-t-full" style={{ transform: 'translateY(25%)' }}>
              {/* Bowstring */}
              <div className="absolute top-0 left-0 right-0 w-full h-0.5 bg-orange-700" />
            </div>
          </motion.div>
        );
      case 'puranas':
        return (
          <motion.div 
            className="w-32 h-32 bg-gradient-to-br from-teal-100 to-teal-300 rounded-md flex flex-col items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: ['0 0 5px #14b8a6', '0 0 15px #14b8a6', '0 0 5px #14b8a6'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            {/* Stacked palm leaves - simplified */}
            <div className="w-24 h-3 bg-teal-200 rounded-md border border-teal-600 my-1" style={{ transform: 'rotate(1deg)' }}>
              <div className="w-16 h-0.5 bg-teal-700 rounded-full mx-auto my-1" />
            </div>
            <div className="w-24 h-3 bg-teal-200 rounded-md border border-teal-600 my-1" style={{ transform: 'rotate(-1deg)' }}>
              <div className="w-16 h-0.5 bg-teal-700 rounded-full mx-auto my-1" />
            </div>
            <div className="w-24 h-3 bg-teal-200 rounded-md border border-teal-600 my-1" style={{ transform: 'rotate(1deg)' }}>
              <div className="w-16 h-0.5 bg-teal-700 rounded-full mx-auto my-1" />
            </div>
          </motion.div>
        );
      case 'epics':
        return (
          <motion.div 
            className="w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-300 rounded-md flex items-center justify-center relative overflow-hidden"
            animate={{ 
              boxShadow: ['0 0 5px #a855f7', '0 0 15px #a855f7', '0 0 5px #a855f7'],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          >
            {/* Chakra (wheel of dharma) - simplified */}
            <motion.div
              className="w-20 h-20 rounded-full border-2 border-purple-600"
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Wheel spokes - simplified */}
              <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-purple-600 origin-center" style={{ transform: 'translate(-50%, -50%) rotate(0deg)' }} />
              <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-purple-600 origin-center" style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }} />
              <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-purple-600 origin-center" style={{ transform: 'translate(-50%, -50%) rotate(90deg)' }} />
              <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-purple-600 origin-center" style={{ transform: 'translate(-50%, -50%) rotate(135deg)' }} />
            </motion.div>
          </motion.div>
        );
      default:
        return (
          <motion.div 
            className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-300 rounded-md"
            animate={{ 
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          />
        );
    }
  }
};

export default AnimationFramework;
