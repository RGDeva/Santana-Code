import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BirthData } from '../../services/astrology/calculator';

interface BirthDataFormProps {
  onSubmit: (data: BirthData) => void;
  isLoading?: boolean;
}

const BirthDataForm: React.FC<BirthDataFormProps> = ({ onSubmit, isLoading = false }) => {
  const [birthData, setBirthData] = useState<BirthData>({
    date: new Date(),
    time: '12:00',
    latitude: 0,
    longitude: 0,
    timezone: 'UTC'
  });
  
  const [location, setLocation] = useState<string>('');
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'date') {
      setBirthData({
        ...birthData,
        date: new Date(value)
      });
    } else if (name === 'location') {
      setLocation(value);
      // In a real implementation, we would call a geocoding API here
      // For now, we'll just show some mock suggestions
      if (value.length > 2) {
        const mockSuggestions = [
          { name: `${value} City, Country A`, lat: 28.6139, lng: 77.2090 },
          { name: `${value} Town, Country B`, lat: 19.0760, lng: 72.8777 },
          { name: `${value} Village, Country C`, lat: 12.9716, lng: 77.5946 }
        ];
        setLocationSuggestions(mockSuggestions);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setBirthData({
        ...birthData,
        [name]: value
      });
    }
  };
  
  // Handle location selection
  const handleLocationSelect = (suggestion: any) => {
    setLocation(suggestion.name);
    setBirthData({
      ...birthData,
      latitude: suggestion.lat,
      longitude: suggestion.lng
    });
    setShowSuggestions(false);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(birthData);
  };
  
  return (
    <motion.div
      className="bg-deep-indigo-800 bg-opacity-20 rounded-lg border border-sacred-gold p-6 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-sacred-gold text-2xl font-cormorant text-center mb-6">Birth Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date of Birth */}
        <div className="space-y-2">
          <label htmlFor="date" className="block text-off-white font-spectral">
            Date of Birth
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={birthData.date.toISOString().split('T')[0]}
            onChange={handleChange}
            className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 focus:outline-none focus:border-lotus-pink transition-colors"
            required
          />
        </div>
        
        {/* Time of Birth */}
        <div className="space-y-2">
          <label htmlFor="time" className="block text-off-white font-spectral">
            Time of Birth
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={birthData.time}
            onChange={handleChange}
            className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 focus:outline-none focus:border-lotus-pink transition-colors"
            required
          />
        </div>
        
        {/* Place of Birth */}
        <div className="space-y-2 relative">
          <label htmlFor="location" className="block text-off-white font-spectral">
            Place of Birth
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={handleChange}
            placeholder="Enter city, state, country"
            className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 focus:outline-none focus:border-lotus-pink transition-colors"
            required
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
          
          {/* Hidden inputs for latitude and longitude */}
          <input type="hidden" name="latitude" value={birthData.latitude} />
          <input type="hidden" name="longitude" value={birthData.longitude} />
        </div>
        
        {/* Timezone */}
        <div className="space-y-2">
          <label htmlFor="timezone" className="block text-off-white font-spectral">
            Timezone
          </label>
          <select
            id="timezone"
            name="timezone"
            value={birthData.timezone}
            onChange={handleChange}
            className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 focus:outline-none focus:border-lotus-pink transition-colors"
            required
          >
            <option value="UTC">UTC (Coordinated Universal Time)</option>
            <option value="IST">IST (Indian Standard Time)</option>
            <option value="EST">EST (Eastern Standard Time)</option>
            <option value="CST">CST (Central Standard Time)</option>
            <option value="PST">PST (Pacific Standard Time)</option>
            {/* Add more timezones as needed */}
          </select>
        </div>
        
        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full py-3 bg-transparent border border-sacred-gold text-sacred-gold font-poppins rounded-md hover:bg-sacred-gold hover:bg-opacity-10 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-sacred-gold border-t-transparent rounded-full animate-spin mr-2"></div>
              Calculating...
            </div>
          ) : (
            'Calculate Birth Chart'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BirthDataForm;
