import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PanchangDisplay from '../../components/astrology/PanchangDisplay';
import MuhurtaFinder from '../../components/astrology/MuhurtaFinder';
import { calculatePanchang, PanchangData } from '../../services/astrology/panchang';

const DailyPanchang: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [location, setLocation] = useState<{
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
  }>({
    name: 'New Delhi, India',
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: 'IST'
  });
  const [panchangData, setPanchangData] = useState<PanchangData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'panchang' | 'muhurta'>('panchang');
  
  // Calculate panchang on component mount and when date/location changes
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate calculation delay for better UX
    const timer = setTimeout(() => {
      const data = calculatePanchang(date, location.latitude, location.longitude, location.timezone);
      setPanchangData(data);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [date, location]);
  
  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value));
  };
  
  // Handle location search
  const handleLocationSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // In a real implementation, we would call a geocoding API here
    // For now, we'll just show some mock suggestions
    if (value.length > 2) {
      const mockSuggestions = [
        { name: `${value} City, India`, lat: 28.6139, lng: 77.2090, timezone: 'IST' },
        { name: `${value} Town, USA`, lat: 40.7128, lng: -74.0060, timezone: 'EST' },
        { name: `${value} Village, UK`, lat: 51.5074, lng: -0.1278, timezone: 'GMT' }
      ];
      setLocationSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };
  
  // Handle location selection
  const handleLocationSelect = (suggestion: any) => {
    setLocation({
      name: suggestion.name,
      latitude: suggestion.lat,
      longitude: suggestion.lng,
      timezone: suggestion.timezone
    });
    setShowSuggestions(false);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.h1 
        className="text-3xl text-sacred-gold font-cormorant text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Daily Panchang & Muhurta
      </motion.h1>
      
      <div className="bg-deep-indigo-800 bg-opacity-20 p-4 rounded-lg border border-sacred-gold mb-6">
        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label htmlFor="date" className="block text-off-white font-spectral mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date.toISOString().split('T')[0]}
              onChange={handleDateChange}
              className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 focus:outline-none focus:border-lotus-pink transition-colors rounded-md"
            />
          </div>
          
          <div className="flex-1 relative">
            <label htmlFor="location" className="block text-off-white font-spectral mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location.name}
              onChange={handleLocationSearch}
              placeholder="Enter city, state, country"
              className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 focus:outline-none focus:border-lotus-pink transition-colors rounded-md"
            />
            
            {/* Location suggestions */}
            {showSuggestions && locationSuggestions.length > 0 && (
              <motion.div
                className="absolute z-10 w-full mt-1 bg-deep-indigo-900 border border-sacred-gold rounded-md shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {locationSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-deep-indigo-800 cursor-pointer text-off-white"
                    onClick={() => handleLocationSelect(suggestion)}
                  >
                    {suggestion.name}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-deep-indigo-900 rounded-lg p-1">
          <button
            className={`px-6 py-2 rounded-md ${activeTab === 'panchang' ? 'bg-sacred-gold bg-opacity-20 text-sacred-gold' : 'text-off-white'}`}
            onClick={() => setActiveTab('panchang')}
          >
            Panchang
          </button>
          <button
            className={`px-6 py-2 rounded-md ${activeTab === 'muhurta' ? 'bg-sacred-gold bg-opacity-20 text-sacred-gold' : 'text-off-white'}`}
            onClick={() => setActiveTab('muhurta')}
          >
            Muhurta Finder
          </button>
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-12 h-12 border-4 border-sacred-gold border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-4 text-sacred-gold">Calculating Panchang...</span>
        </div>
      ) : (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'panchang' && panchangData && (
            <PanchangDisplay panchangData={panchangData} />
          )}
          
          {activeTab === 'muhurta' && (
            <MuhurtaFinder 
              latitude={location.latitude} 
              longitude={location.longitude} 
              timezone={location.timezone} 
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default DailyPanchang;
