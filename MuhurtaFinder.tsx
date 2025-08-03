import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MuhurtaData, findMuhurta } from '../../services/astrology/panchang';
import { MUHURTA_TYPES } from '../../data/astrology/constants';

interface MuhurtaFinderProps {
  latitude: number;
  longitude: number;
  timezone: string;
}

const MuhurtaFinder: React.FC<MuhurtaFinderProps> = ({ latitude, longitude, timezone }) => {
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [muhurtaData, setMuhurtaData] = useState<MuhurtaData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Handle activity selection
  const handleActivityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedActivity(e.target.value);
  };
  
  // Handle date selection
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedActivity) return;
    
    setIsLoading(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const data = findMuhurta(selectedActivity, selectedDate, latitude, longitude, timezone);
      setMuhurtaData(data);
      setIsLoading(false);
    }, 1000);
  };
  
  // Get activity name from ID
  const getActivityName = (id: string): string => {
    const activity = MUHURTA_TYPES.find(m => m.id === id);
    return activity ? activity.name : id;
  };
  
  // Get activity description from ID
  const getActivityDescription = (id: string): string => {
    const activity = MUHURTA_TYPES.find(m => m.id === id);
    return activity ? activity.description : '';
  };
  
  // Get activity requirements from ID
  const getActivityRequirements = (id: string): string[] => {
    const activity = MUHURTA_TYPES.find(m => m.id === id);
    return activity ? activity.requirements : [];
  };
  
  // Render quality indicator
  const renderQualityIndicator = (quality: 'excellent' | 'good' | 'average') => {
    let color = '';
    let text = '';
    
    switch (quality) {
      case 'excellent':
        color = 'text-tulsi-green';
        text = 'Excellent';
        break;
      case 'good':
        color = 'text-sacred-gold';
        text = 'Good';
        break;
      case 'average':
        color = 'text-off-white';
        text = 'Average';
        break;
    }
    
    return <span className={`${color} font-medium`}>{text}</span>;
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <motion.h2 
        className="text-2xl text-sacred-gold font-cormorant text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Muhurta Finder
      </motion.h2>
      
      <motion.div
        className="bg-deep-indigo-800 bg-opacity-20 p-6 rounded-lg border border-sacred-gold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="activity" className="block text-off-white font-spectral mb-2">
              Select Activity
            </label>
            <select
              id="activity"
              value={selectedActivity}
              onChange={handleActivityChange}
              className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 focus:outline-none focus:border-lotus-pink transition-colors rounded-md"
              required
            >
              <option value="">-- Select an activity --</option>
              {MUHURTA_TYPES.map(activity => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="date" className="block text-off-white font-spectral mb-2">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
              className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 focus:outline-none focus:border-lotus-pink transition-colors rounded-md"
              required
            />
          </div>
          
          {selectedActivity && (
            <div className="mt-4 p-4 bg-deep-indigo-900 bg-opacity-50 rounded-md">
              <h3 className="text-sacred-gold text-lg font-cormorant mb-2">
                {getActivityName(selectedActivity)}
              </h3>
              <p className="text-off-white mb-3">{getActivityDescription(selectedActivity)}</p>
              <div className="text-tulsi-green text-sm mb-1">Requirements:</div>
              <ul className="list-disc list-inside text-off-white text-sm">
                {getActivityRequirements(selectedActivity).map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
          
          <motion.button
            type="submit"
            className="w-full py-3 bg-transparent border border-sacred-gold text-sacred-gold font-poppins rounded-md hover:bg-sacred-gold hover:bg-opacity-10 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading || !selectedActivity}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-sacred-gold border-t-transparent rounded-full animate-spin mr-2"></div>
                Finding Auspicious Times...
              </div>
            ) : (
              'Find Auspicious Times'
            )}
          </motion.button>
        </form>
      </motion.div>
      
      {muhurtaData && (
        <motion.div
          className="bg-deep-indigo-800 bg-opacity-20 p-6 rounded-lg border border-sacred-gold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-sacred-gold text-xl font-cormorant mb-4">
            Auspicious Times for {getActivityName(muhurtaData.activity)}
          </h3>
          
          {muhurtaData.auspiciousTimes.length === 0 ? (
            <p className="text-lotus-pink text-center py-4">
              No auspicious times found for this activity on the selected date.
              Consider choosing another date.
            </p>
          ) : (
            <div className="space-y-4">
              {muhurtaData.auspiciousTimes.map((time, index) => (
                <motion.div
                  key={index}
                  className="border border-sacred-gold border-opacity-30 rounded-md p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sacred-gold font-cormorant text-lg">
                      {time.startTime} - {time.endTime}
                    </div>
                    <div>
                      {renderQualityIndicator(time.quality)}
                    </div>
                  </div>
                  
                  {time.notes && (
                    <div className="text-off-white text-sm mt-2">
                      {time.notes}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MuhurtaFinder;
