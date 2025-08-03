import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PanchangData, calculatePanchang, getDailyRecommendations } from '../../services/astrology/panchang';

interface PanchangDisplayProps {
  panchangData: PanchangData;
}

const PanchangDisplay: React.FC<PanchangDisplayProps> = ({ panchangData }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'details' | 'recommendations'>('overview');
  
  // Format time periods for display
  const formatTimePeriod = (period: string): string => {
    return period.replace(' to ', ' - ').replace('.5', ':30');
  };
  
  // Render overview section
  const renderOverview = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-deep-indigo-800 bg-opacity-20 p-4 rounded-lg border border-sacred-gold">
            <h3 className="text-sacred-gold text-lg font-cormorant mb-2">Sunrise & Sunset</h3>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-tulsi-green text-sm">Sunrise</div>
                <div className="text-off-white text-xl">{panchangData.sunrise}</div>
              </div>
              <div className="text-center">
                <div className="text-lotus-pink text-sm">Sunset</div>
                <div className="text-off-white text-xl">{panchangData.sunset}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-deep-indigo-800 bg-opacity-20 p-4 rounded-lg border border-sacred-gold">
            <h3 className="text-sacred-gold text-lg font-cormorant mb-2">Moonrise & Moonset</h3>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-tulsi-green text-sm">Moonrise</div>
                <div className="text-off-white text-xl">{panchangData.moonrise}</div>
              </div>
              <div className="text-center">
                <div className="text-lotus-pink text-sm">Moonset</div>
                <div className="text-off-white text-xl">{panchangData.moonset}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-deep-indigo-800 bg-opacity-20 p-4 rounded-lg border border-sacred-gold">
          <h3 className="text-sacred-gold text-lg font-cormorant mb-4">Today's Panchang</h3>
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <div className="text-tulsi-green text-sm">Day</div>
              <div className="text-off-white">{panchangData.dayOfWeek}</div>
            </div>
            <div>
              <div className="text-tulsi-green text-sm">Tithi</div>
              <div className="text-off-white">{panchangData.tithi.name} ({panchangData.tithi.phase})</div>
            </div>
            <div>
              <div className="text-tulsi-green text-sm">Nakshatra</div>
              <div className="text-off-white">{panchangData.nakshatra.name}</div>
            </div>
            <div>
              <div className="text-tulsi-green text-sm">Yoga</div>
              <div className="text-off-white">{panchangData.yoga.name}</div>
            </div>
            <div>
              <div className="text-tulsi-green text-sm">Karana</div>
              <div className="text-off-white">{panchangData.karana.name}</div>
            </div>
            {panchangData.specialObservance && (
              <div>
                <div className="text-lotus-pink text-sm">Special</div>
                <div className="text-off-white">{panchangData.specialObservance}</div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-deep-indigo-800 bg-opacity-20 p-4 rounded-lg border border-sacred-gold">
          <h3 className="text-sacred-gold text-lg font-cormorant mb-2">Auspicious Times</h3>
          <div className="space-y-2">
            {panchangData.auspiciousPeriods.map((period, index) => (
              <div key={index} className="text-off-white flex items-center">
                <span className="text-tulsi-green mr-2">•</span>
                {period}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-deep-indigo-800 bg-opacity-20 p-4 rounded-lg border border-sacred-gold">
          <h3 className="text-sacred-gold text-lg font-cormorant mb-2">Inauspicious Times</h3>
          <div className="space-y-2">
            <div className="text-off-white flex items-center">
              <span className="text-lotus-pink mr-2">•</span>
              <span className="text-lotus-pink">Rahu Kalam:</span>
              <span className="ml-2">{formatTimePeriod(panchangData.inauspiciousPeriods.rahuKalam)}</span>
            </div>
            <div className="text-off-white flex items-center">
              <span className="text-lotus-pink mr-2">•</span>
              <span className="text-lotus-pink">Yamaganda:</span>
              <span className="ml-2">{formatTimePeriod(panchangData.inauspiciousPeriods.yamaganda)}</span>
            </div>
            <div className="text-off-white flex items-center">
              <span className="text-lotus-pink mr-2">•</span>
              <span className="text-lotus-pink">Gulika:</span>
              <span className="ml-2">{formatTimePeriod(panchangData.inauspiciousPeriods.gulika)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render detailed information section
  const renderDetails = () => {
    return (
      <div className="space-y-6">
        <div className="bg-deep-indigo-800 bg-opacity-20 p-4 rounded-lg border border-sacred-gold">
          <h3 className="text-sacred-gold text-lg font-cormorant mb-4">Tithi Details</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Name</div>
              <div className="text-off-white">{panchangData.tithi.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Phase</div>
              <div className="text-off-white">{panchangData.tithi.phase}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Deity</div>
              <div className="text-off-white">{panchangData.tithi.deity}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Ends at</div>
              <div className="text-off-white">{panchangData.tithi.endTime}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-deep-indigo-800 bg-opacity-20 p-4 rounded-lg border border-sacred-gold">
          <h3 className="text-sacred-gold text-lg font-cormorant mb-4">Nakshatra Details</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Name</div>
              <div className="text-off-white">{panchangData.nakshatra.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Deity</div>
              <div className="text-off-white">{panchangData.nakshatra.deity}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Ends at</div>
              <div className="text-off-white">{panchangData.nakshatra.endTime}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-deep-indigo-800 bg-opacity-20 p-4 rounded-lg border border-sacred-gold">
          <h3 className="text-sacred-gold text-lg font-cormorant mb-4">Yoga Details</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Name</div>
              <div className="text-off-white">{panchangData.yoga.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Deity</div>
              <div className="text-off-white">{panchangData.yoga.deity}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Ends at</div>
              <div className="text-off-white">{panchangData.yoga.endTime}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-deep-indigo-800 bg-opacity-20 p-4 rounded-lg border border-sacred-gold">
          <h3 className="text-sacred-gold text-lg font-cormorant mb-4">Karana Details</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Name</div>
              <div className="text-off-white">{panchangData.karana.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Deity</div>
              <div className="text-off-white">{panchangData.karana.deity}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Nature</div>
              <div className="text-off-white">{panchangData.karana.nature}</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-tulsi-green text-sm">Ends at</div>
              <div className="text-off-white">{panchangData.karana.endTime}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render daily recommendations section
  const renderRecommendations = () => {
    const recommendations = getDailyRecommendations(panchangData);
    
    return (
      <div className="bg-deep-indigo-800 bg-opacity-20 p-4 rounded-lg border border-sacred-gold">
        <h3 className="text-sacred-gold text-lg font-cormorant mb-4">Daily Recommendations</h3>
        <div className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <motion.div 
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <span className="text-sacred-gold mr-2 mt-1">•</span>
              <span className="text-off-white">{recommendation}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <motion.h2 
        className="text-2xl text-sacred-gold font-cormorant text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Daily Panchang
      </motion.h2>
      
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-deep-indigo-900 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-md ${activeSection === 'overview' ? 'bg-sacred-gold bg-opacity-20 text-sacred-gold' : 'text-off-white'}`}
            onClick={() => setActiveSection('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeSection === 'details' ? 'bg-sacred-gold bg-opacity-20 text-sacred-gold' : 'text-off-white'}`}
            onClick={() => setActiveSection('details')}
          >
            Details
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeSection === 'recommendations' ? 'bg-sacred-gold bg-opacity-20 text-sacred-gold' : 'text-off-white'}`}
            onClick={() => setActiveSection('recommendations')}
          >
            Recommendations
          </button>
        </div>
      </div>
      
      <motion.div
        key={activeSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {activeSection === 'overview' && renderOverview()}
        {activeSection === 'details' && renderDetails()}
        {activeSection === 'recommendations' && renderRecommendations()}
      </motion.div>
    </div>
  );
};

export default PanchangDisplay;
