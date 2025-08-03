import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BirthData, BirthChart, calculateBirthChart } from '../../services/astrology/calculator';
import BirthDataForm from '../../components/astrology/BirthDataForm';
import BirthChartVisualization from '../../components/astrology/BirthChartVisualization';

// Test component for Astrology Calculator
const AstrologyCalculatorTest: React.FC = () => {
  const [birthChart, setBirthChart] = useState<BirthChart | null>(null);
  const [chartStyle, setChartStyle] = useState<'north' | 'south'>('north');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle birth data submission
  const handleSubmit = (data: BirthData) => {
    setIsLoading(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const chart = calculateBirthChart(data);
      setBirthChart(chart);
      setIsLoading(false);
    }, 1000);
  };

  // Toggle chart style
  const toggleChartStyle = () => {
    setChartStyle(prev => prev === 'north' ? 'south' : 'north');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl text-sacred-gold font-cormorant text-center mb-8">
        Astrology Calculator Test
      </h1>
      
      {!birthChart ? (
        <BirthDataForm onSubmit={handleSubmit} isLoading={isLoading} />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
            <button
              onClick={toggleChartStyle}
              className="bg-transparent border border-sacred-gold text-sacred-gold px-4 py-2 rounded-md hover:bg-sacred-gold hover:bg-opacity-10 transition-colors"
            >
              Switch to {chartStyle === 'north' ? 'South' : 'North'} Indian Chart
            </button>
          </div>
          
          <BirthChartVisualization birthChart={birthChart} chartStyle={chartStyle} />
          
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setBirthChart(null)}
              className="bg-transparent border border-sacred-gold text-sacred-gold px-6 py-3 rounded-md hover:bg-sacred-gold hover:bg-opacity-10 transition-colors"
            >
              Calculate New Birth Chart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AstrologyCalculatorTest;
