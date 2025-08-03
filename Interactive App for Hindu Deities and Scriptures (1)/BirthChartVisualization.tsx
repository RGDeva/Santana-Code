import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BirthChart, PlanetPosition, getPlanetName } from '../../services/astrology/calculator';
import { PLANETS, RASHIS } from '../../data/astrology/constants';

interface BirthChartVisualizationProps {
  birthChart: BirthChart;
  chartStyle: 'north' | 'south';
}

const BirthChartVisualization: React.FC<BirthChartVisualizationProps> = ({ 
  birthChart, 
  chartStyle 
}) => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  
  // Calculate positions for North Indian chart (square format)
  const renderNorthIndianChart = () => {
    const houses = Array(12).fill(0).map((_, i) => {
      // Calculate house number based on ascendant
      const houseNumber = ((i + 1 - Math.floor(birthChart.ascendant / 30) + 12) % 12) + 1;
      
      // Get planets in this house
      const planetsInHouse = birthChart.positions.filter(p => p.house === houseNumber);
      
      return (
        <div 
          key={`house-${i}`} 
          className={`absolute border border-sacred-gold ${getHousePosition(i)}`}
        >
          <div className="text-xs text-center mb-1 text-sacred-gold">{houseNumber}</div>
          <div className="flex flex-wrap justify-center gap-1">
            {planetsInHouse.map(planet => renderPlanet(planet))}
          </div>
        </div>
      );
    });
    
    return (
      <div className="relative w-80 h-80 mx-auto">
        <div className="absolute inset-1/4 border border-sacred-gold bg-deep-indigo-800 opacity-20" />
        {houses}
      </div>
    );
  };
  
  // Calculate positions for South Indian chart (diamond format)
  const renderSouthIndianChart = () => {
    // Calculate rashi positions based on ascendant
    const ascendantRashi = Math.floor(birthChart.ascendant / 30) + 1;
    
    const rashis = Array(12).fill(0).map((_, i) => {
      const rashiNumber = ((i + ascendantRashi - 1) % 12) + 1;
      const rashi = RASHIS.find(r => r.id === rashiNumber);
      
      // Get planets in this rashi
      const planetsInRashi = birthChart.positions.filter(p => p.rashi === rashiNumber);
      
      return (
        <div 
          key={`rashi-${i}`} 
          className={`absolute border border-sacred-gold ${getSouthIndianPosition(i)}`}
        >
          <div className="text-xs text-center mb-1 text-sacred-gold">
            {rashi?.symbol} {rashi?.sanskrit}
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            {planetsInRashi.map(planet => renderPlanet(planet))}
          </div>
        </div>
      );
    });
    
    return (
      <div className="relative w-80 h-80 mx-auto transform rotate-45">
        <div className="absolute inset-0 border border-sacred-gold" />
        {rashis}
      </div>
    );
  };
  
  // Render a planet symbol with animation
  const renderPlanet = (position: PlanetPosition) => {
    const planet = PLANETS.find(p => p.id === position.planet);
    if (!planet) return null;
    
    return (
      <motion.div
        key={position.planet}
        className="w-6 h-6 flex items-center justify-center rounded-full"
        style={{ 
          backgroundColor: planet.color,
          color: getContrastColor(planet.color)
        }}
        whileHover={{ scale: 1.2 }}
        onHoverStart={() => setHoveredPlanet(position.planet)}
        onHoverEnd={() => setHoveredPlanet(null)}
      >
        {planet.symbol}
        {position.isRetrograde && <span className="text-xs absolute -top-1 -right-1">R</span>}
      </motion.div>
    );
  };
  
  // Helper function to get house position in North Indian chart
  const getHousePosition = (index: number): string => {
    switch (index) {
      case 0: return "top-0 left-1/3 right-1/3 h-1/4"; // House 1
      case 1: return "top-0 right-0 w-1/3 h-1/3"; // House 2
      case 2: return "top-1/3 right-0 w-1/3 h-1/3"; // House 3
      case 3: return "bottom-0 right-0 w-1/3 h-1/3"; // House 4
      case 4: return "bottom-0 left-1/3 right-1/3 h-1/4"; // House 5
      case 5: return "bottom-0 left-0 w-1/3 h-1/3"; // House 6
      case 6: return "top-1/3 left-0 w-1/3 h-1/3"; // House 7
      case 7: return "top-0 left-0 w-1/3 h-1/3"; // House 8
      case 8: return "top-1/4 left-1/3 w-1/6 h-1/6"; // House 9
      case 9: return "top-1/4 right-1/3 w-1/6 h-1/6"; // House 10
      case 10: return "bottom-1/4 right-1/3 w-1/6 h-1/6"; // House 11
      case 11: return "bottom-1/4 left-1/3 w-1/6 h-1/6"; // House 12
      default: return "";
    }
  };
  
  // Helper function to get rashi position in South Indian chart
  const getSouthIndianPosition = (index: number): string => {
    switch (index) {
      case 0: return "top-0 left-1/3 right-1/3 h-1/3"; // Ascendant
      case 1: return "top-0 right-0 w-1/3 h-1/3";
      case 2: return "top-1/3 right-0 w-1/3 h-1/3";
      case 3: return "bottom-0 right-0 w-1/3 h-1/3";
      case 4: return "bottom-0 left-1/3 right-1/3 h-1/3";
      case 5: return "bottom-0 left-0 w-1/3 h-1/3";
      case 6: return "top-1/3 left-0 w-1/3 h-1/3";
      case 7: return "top-0 left-0 w-1/3 h-1/3";
      case 8: return "top-1/3 left-1/3 w-1/3 h-1/3"; // Center
      case 9: return "top-1/3 left-1/3 w-1/3 h-1/3"; // Center (overlapping)
      case 10: return "top-1/3 left-1/3 w-1/3 h-1/3"; // Center (overlapping)
      case 11: return "top-1/3 left-1/3 w-1/3 h-1/3"; // Center (overlapping)
      default: return "";
    }
  };
  
  // Helper function to get contrasting text color
  const getContrastColor = (hexColor: string): string => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black or white based on luminance
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };
  
  // Planet details popup
  const renderPlanetDetails = () => {
    if (!hoveredPlanet) return null;
    
    const position = birthChart.positions.find(p => p.planet === hoveredPlanet);
    if (!position) return null;
    
    const planet = PLANETS.find(p => p.id === hoveredPlanet);
    const rashi = RASHIS.find(r => r.id === position.rashi);
    
    return (
      <motion.div
        className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 bg-deep-indigo-900 border border-sacred-gold p-4 rounded-md shadow-lg z-10 w-64"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="text-sacred-gold text-lg font-cormorant mb-2">
          {planet?.name} ({planet?.sanskrit})
        </h3>
        <div className="text-off-white text-sm">
          <p>Position: {position.longitude.toFixed(2)}°</p>
          <p>Sign: {rashi?.name} ({rashi?.sanskrit})</p>
          <p>House: {position.house}</p>
          {position.isRetrograde && <p className="text-lotus-pink">Retrograde</p>}
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="relative p-4 bg-deep-indigo-800 bg-opacity-20 rounded-lg border border-sacred-gold">
      <div className="text-sacred-gold text-xl font-cormorant text-center mb-4">
        Birth Chart ({chartStyle === 'north' ? 'North Indian' : 'South Indian'})
      </div>
      
      {chartStyle === 'north' ? renderNorthIndianChart() : renderSouthIndianChart()}
      
      {hoveredPlanet && renderPlanetDetails()}
    </div>
  );
};

export default BirthChartVisualization;
