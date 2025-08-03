import { RASHIS, NAKSHATRAS, PLANETS, HOUSES, DOSHAS, DASHA_PERIODS, DASHA_SEQUENCE } from '../../data/astrology/constants';

// Types for birth data
export interface BirthData {
  date: Date;
  time: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

// Types for chart data
export interface PlanetPosition {
  planet: string;
  longitude: number;
  rashi: number;
  nakshatra: number;
  house: number;
  isRetrograde: boolean;
}

export interface BirthChart {
  ascendant: number; // Lagna (rising sign) in degrees
  positions: PlanetPosition[];
  houses: number[]; // House cusps in degrees
  dashaBalance: DashaBalance;
  doshas: string[];
}

export interface DashaBalance {
  majorDasha: string;
  majorDashaEndDate: Date;
  subDasha: string;
  subDashaEndDate: Date;
}

/**
 * Calculate birth chart based on birth data
 * Note: This is a simplified implementation. In a production app,
 * we would use a proper astronomical library like Swiss Ephemeris.
 */
export const calculateBirthChart = (birthData: BirthData): BirthChart => {
  // In a real implementation, we would use Swiss Ephemeris or similar
  // to calculate precise planetary positions
  
  // For now, we'll create a simplified placeholder implementation
  // that returns mock data based on the birth date
  
  // Calculate ascendant (simplified)
  const birthHour = parseInt(birthData.time.split(':')[0]);
  const birthMinute = parseInt(birthData.time.split(':')[1]);
  const totalMinutesSinceMidnight = birthHour * 60 + birthMinute;
  
  // Simplified ascendant calculation (not astronomically accurate)
  // In a real implementation, this would use proper astronomical formulas
  const ascendantDegree = (totalMinutesSinceMidnight / 4 + birthData.longitude / 15) % 360;
  const ascendantRashi = Math.floor(ascendantDegree / 30) + 1;
  
  // Generate placeholder planet positions
  const positions: PlanetPosition[] = PLANETS.map((planet, index) => {
    // This is just a placeholder calculation
    // In a real implementation, we would use Swiss Ephemeris
    const offset = (birthData.date.getDate() + index * 30) % 360;
    const longitude = (ascendantDegree + offset) % 360;
    const rashi = Math.floor(longitude / 30) + 1;
    
    // Find nakshatra
    let nakshatra = 1;
    for (let i = 0; i < NAKSHATRAS.length; i++) {
      const nak = NAKSHATRAS[i];
      if (longitude >= nak.degrees[0] && longitude < nak.degrees[1]) {
        nakshatra = nak.id;
        break;
      }
    }
    
    // Calculate house (simplified)
    const house = ((rashi - ascendantRashi + 12) % 12) + 1;
    
    // Simplified retrograde calculation
    const isRetrograde = (index + birthData.date.getMonth()) % 5 === 0;
    
    return {
      planet: planet.id,
      longitude,
      rashi,
      nakshatra,
      house,
      isRetrograde
    };
  });
  
  // Calculate house cusps (simplified)
  const houses = Array(12).fill(0).map((_, i) => {
    return (ascendantDegree + i * 30) % 360;
  });
  
  // Calculate Dasha balance (simplified)
  const birthYear = birthData.date.getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  
  // Find birth nakshatra lord
  const birthMoonPosition = positions.find(p => p.planet === 'mo');
  const birthNakshatra = birthMoonPosition ? birthMoonPosition.nakshatra : 1;
  const birthNakshatraData = NAKSHATRAS.find(n => n.id === birthNakshatra);
  const birthNakshatraLord = birthNakshatraData ? birthNakshatraData.ruler : 'ke';
  
  // Find starting dasha lord index
  const startingDashaLordIndex = DASHA_SEQUENCE.findIndex(p => {
    const planet = PLANETS.find(pl => pl.id === p);
    return planet && planet.name.toLowerCase() === birthNakshatraLord.toLowerCase();
  });
  
  // Calculate current dasha (simplified)
  let totalYears = 0;
  let majorDashaLord = '';
  let majorDashaEndYear = 0;
  let subDashaLord = '';
  let subDashaEndYear = 0;
  
  // Find major dasha
  for (let i = 0; i < DASHA_SEQUENCE.length; i++) {
    const lordIndex = (startingDashaLordIndex + i) % DASHA_SEQUENCE.length;
    const lord = DASHA_SEQUENCE[lordIndex];
    const years = DASHA_PERIODS[lord];
    
    if (totalYears <= age && age < totalYears + years) {
      majorDashaLord = lord;
      majorDashaEndYear = birthYear + totalYears + years;
      
      // Find sub dasha
      const elapsed = age - totalYears;
      let subTotal = 0;
      
      for (let j = 0; j < DASHA_SEQUENCE.length; j++) {
        const subLordIndex = (lordIndex + j) % DASHA_SEQUENCE.length;
        const subLord = DASHA_SEQUENCE[subLordIndex];
        const subYears = (DASHA_PERIODS[subLord] * DASHA_PERIODS[lord]) / 120;
        
        if (subTotal <= elapsed && elapsed < subTotal + subYears) {
          subDashaLord = subLord;
          subDashaEndYear = birthYear + totalYears + subTotal + subYears;
          break;
        }
        
        subTotal += subYears;
      }
      
      break;
    }
    
    totalYears += years;
  }
  
  // Calculate doshas (simplified)
  const doshas: string[] = [];
  
  // Check for Mangal Dosha
  const mars = positions.find(p => p.planet === 'ma');
  if (mars && [1, 4, 7, 8, 12].includes(mars.house)) {
    doshas.push('mangal');
  }
  
  // Check for Kaal Sarpa Dosha (simplified)
  const rahu = positions.find(p => p.planet === 'ra');
  const ketu = positions.find(p => p.planet === 'ke');
  if (rahu && ketu) {
    const rahuDegree = rahu.longitude;
    const ketuDegree = ketu.longitude;
    let allBetween = true;
    
    for (const pos of positions) {
      if (pos.planet !== 'ra' && pos.planet !== 'ke') {
        // Check if planet is between Rahu and Ketu
        const isBetween = isDegreeBetween(pos.longitude, rahuDegree, ketuDegree);
        if (!isBetween) {
          allBetween = false;
          break;
        }
      }
    }
    
    if (allBetween) {
      doshas.push('kaal_sarpa');
    }
  }
  
  return {
    ascendant: ascendantDegree,
    positions,
    houses,
    dashaBalance: {
      majorDasha: majorDashaLord,
      majorDashaEndDate: new Date(majorDashaEndYear, 0, 1),
      subDasha: subDashaLord,
      subDashaEndDate: new Date(subDashaEndYear, 0, 1)
    },
    doshas
  };
};

// Helper function to check if a degree is between two other degrees
const isDegreeBetween = (degree: number, start: number, end: number): boolean => {
  if (start <= end) {
    return degree >= start && degree <= end;
  } else {
    // Handle case where the range crosses 0/360 degrees
    return degree >= start || degree <= end;
  }
};

/**
 * Get Rashi (zodiac sign) name from degree
 */
export const getRashiFromDegree = (degree: number): string => {
  const rashiIndex = Math.floor(degree / 30);
  return RASHIS[rashiIndex].name;
};

/**
 * Get Nakshatra (lunar mansion) from degree
 */
export const getNakshatraFromDegree = (degree: number): string => {
  for (const nakshatra of NAKSHATRAS) {
    if (degree >= nakshatra.degrees[0] && degree < nakshatra.degrees[1]) {
      return nakshatra.name;
    }
  }
  return 'Unknown';
};

/**
 * Get planet name from ID
 */
export const getPlanetName = (id: string): string => {
  const planet = PLANETS.find(p => p.id === id);
  return planet ? planet.name : 'Unknown';
};

/**
 * Get house significations
 */
export const getHouseSignifications = (houseNumber: number): string[] => {
  const house = HOUSES.find(h => h.id === houseNumber);
  return house ? house.significations : [];
};

/**
 * Get dosha details
 */
export const getDoshaDetails = (doshaId: string) => {
  return DOSHAS.find(d => d.id === doshaId);
};
