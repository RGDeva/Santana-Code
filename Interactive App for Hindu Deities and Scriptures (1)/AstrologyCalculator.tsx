import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BirthDataForm, { BirthData } from '../components/astrology/BirthDataForm';
import BirthChartVisualization from '../components/astrology/BirthChartVisualization';
import { BirthChart, calculateBirthChart, getPlanetName, getRashiFromDegree, getDoshaDetails } from '../services/astrology/calculator';
import { PLANETS } from '../data/astrology/constants';

const AstrologyCalculator: React.FC = () => {
  const [birthData, setBirthData] = useState<BirthData | null>(null);
  const [birthChart, setBirthChart] = useState<BirthChart | null>(null);
  const [chartStyle, setChartStyle] = useState<'north' | 'south'>('north');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [dashaBalance, setDashaBalance] = useState<any>(null);
  
  useEffect(() => {
    // Get dark mode setting from parent component or local storage
    const darkModeSetting = localStorage.getItem('darkMode');
    if (darkModeSetting !== null) {
      setIsDarkMode(darkModeSetting === 'true');
    }
  }, []);
  
  const handleBirthDataSubmit = (data: BirthData) => {
    setBirthData(data);
    const chart = calculateBirthChart(data);
    setBirthChart(chart);
    setDashaBalance(chart.dashaBalance);
  };
  
  const toggleChartStyle = () => {
    setChartStyle(prev => prev === 'north' ? 'south' : 'north');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className={`text-3xl font-cormorant mb-2 ${isDarkMode ? 'text-sacred-gold' : 'text-deep-indigo-800'}`}>
          Vedic Astrology Calculator
        </h1>
        <p className={`max-w-3xl ${isDarkMode ? 'text-tulsi-green' : 'text-deep-indigo-600'}`}>
          Enter your birth details to generate your Vedic birth chart, including Lagna, Rashi, Nakshatra, 
          planetary positions, doshas, and life period (Dasha/Bhukti) breakdown.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BirthDataForm onSubmit={handleBirthDataSubmit} isDarkMode={isDarkMode} />
        
        {birthChart && (
          <div className="space-y-8">
            <BirthChartVisualization 
              birthChart={birthChart} 
              chartStyle={chartStyle} 
              isDarkMode={isDarkMode} 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`rounded-xl p-6 ${isDarkMode ? 'bg-deep-indigo-900 bg-opacity-30' : 'bg-deep-indigo-50'}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-cormorant ${isDarkMode ? 'text-sacred-gold' : 'text-deep-indigo-800'}`}>
                  Chart Style
                </h2>
                
                <button
                  onClick={toggleChartStyle}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'bg-sacred-gold text-deep-indigo-900 hover:bg-sacred-gold-light'
                      : 'bg-deep-indigo-700 text-off-white hover:bg-deep-indigo-800'
                  }`}
                >
                  Switch to {chartStyle === 'north' ? 'South' : 'North'} Indian Style
                </button>
              </div>
              
              <p className={`${isDarkMode ? 'text-tulsi-green' : 'text-deep-indigo-600'}`}>
                {chartStyle === 'north' 
                  ? 'North Indian style shows houses as fixed squares with planets placed within them.'
                  : 'South Indian style shows houses in a wheel format with the first house at the center.'}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`rounded-xl p-6 ${isDarkMode ? 'bg-deep-indigo-900 bg-opacity-30' : 'bg-deep-indigo-50'}`}
            >
              <h2 className={`text-xl font-cormorant mb-4 ${isDarkMode ? 'text-sacred-gold' : 'text-deep-indigo-800'}`}>
                Planetary Positions
              </h2>
              
              <div className="space-y-2">
                {birthChart.positions.map(position => {
                  return (
                    <div key={position.planet} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className={`${isDarkMode ? 'text-off-white' : 'text-deep-indigo-700'} font-medium`}>
                          {position.planet}
                        </span>
                        {position.retrograde && (
                          <span className={`ml-1 text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                            (R)
                          </span>
                        )}
                      </div>
                      <div className={`${isDarkMode ? 'text-tulsi-green' : 'text-deep-indigo-600'}`}>
                        {position.rashi} ({Math.floor(position.degree % 30)}°{Math.floor((position.degree % 1) * 60)}')
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            
            {birthChart.doshas.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`rounded-xl p-6 ${isDarkMode ? 'bg-deep-indigo-900 bg-opacity-30' : 'bg-deep-indigo-50'}`}
              >
                <h2 className={`text-xl font-cormorant mb-4 ${isDarkMode ? 'text-sacred-gold' : 'text-deep-indigo-800'}`}>
                  Doshas & Remedies
                </h2>
                
                <div className="space-y-4">
                  {birthChart.doshas.map(doshaId => {
                    const dosha = getDoshaDetails(doshaId);
                    return dosha ? (
                      <div key={doshaId} className={`p-4 rounded-lg ${isDarkMode ? 'bg-deep-indigo-800 bg-opacity-50' : 'bg-deep-indigo-100'}`}>
                        <h3 className={`text-lg font-medium mb-1 ${isDarkMode ? 'text-sacred-gold' : 'text-deep-indigo-800'}`}>
                          {dosha.name}
                        </h3>
                        <p className={`mb-3 ${isDarkMode ? 'text-off-white' : 'text-deep-indigo-700'}`}>
                          {dosha.description}
                        </p>
                        
                        <div>
                          <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-tulsi-green' : 'text-deep-indigo-600'}`}>
                            Recommended Remedies:
                          </h4>
                          <ul className="space-y-1">
                            {dosha.remedies.map((remedy, index) => (
                              <li key={index} className="flex items-start">
                                <span className={`mr-2 ${isDarkMode ? 'text-sacred-gold' : 'text-deep-indigo-800'}`}>•</span>
                                <span className={`${isDarkMode ? 'text-off-white' : 'text-deep-indigo-700'}`}>{remedy}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </motion.div>
            )}
            
            {dashaBalance && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`rounded-xl p-6 ${isDarkMode ? 'bg-deep-indigo-900 bg-opacity-30' : 'bg-deep-indigo-50'}`}
              >
                <h2 className={`text-xl font-cormorant mb-4 ${isDarkMode ? 'text-sacred-gold' : 'text-deep-indigo-800'}`}>
                  Dasha Periods
                </h2>
                
                <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-deep-indigo-800 bg-opacity-50' : 'bg-deep-indigo-100'}`}>
                  <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-sacred-gold' : 'text-deep-indigo-800'}`}>
                    Current Dasha Balance
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className={`text-sm ${isDarkMode ? 'text-tulsi-green' : 'text-deep-indigo-600'}`}>
                        Maha Dasha (Major Period)
                      </div>
                      <div className={`font-medium ${isDarkMode ? 'text-off-white' : 'text-deep-indigo-700'}`}>
                        {dashaBalance.majorDasha}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-tulsi-green' : 'text-deep-indigo-600'}`}>
                        Remaining: {dashaBalance.majorDashaRemaining}
                      </div>
                    </div>
                    
                    <div>
                      <div className={`text-sm ${isDarkMode ? 'text-tulsi-green' : 'text-deep-indigo-600'}`}>
                        Antar Dasha (Sub Period)
                      </div>
                      <div className={`font-medium ${isDarkMode ? 'text-off-white' : 'text-deep-indigo-700'}`}>
                        {dashaBalance.subDasha}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-tulsi-green' : 'text-deep-indigo-600'}`}>
                        Remaining: {dashaBalance.subDashaRemaining}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className={`${isDarkMode ? 'text-tulsi-green' : 'text-deep-indigo-600'}`}>
                  The Vimshottari Dasha system divides life into planetary periods that influence different aspects of your life. 
                  The current major period (Maha Dasha) is ruled by {dashaBalance.majorDasha}, while the sub-period (Antar Dasha) 
                  is ruled by {dashaBalance.subDasha}.
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AstrologyCalculator;
