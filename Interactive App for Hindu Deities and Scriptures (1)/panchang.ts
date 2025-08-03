import { TITHIS, NAKSHATRAS, YOGAS_PANCHANGA, KARANAS, INAUSPICIOUS_PERIODS, MUHURTA_TYPES } from '../../data/astrology/constants';

// Types for Panchang data
export interface PanchangData {
  date: Date;
  location: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  tithi: {
    id: number;
    name: string;
    phase: string;
    deity: string;
    endTime: string;
  };
  nakshatra: {
    id: number;
    name: string;
    deity: string;
    endTime: string;
  };
  yoga: {
    id: number;
    name: string;
    deity: string;
    endTime: string;
  };
  karana: {
    id: number;
    name: string;
    deity: string;
    nature: string;
    endTime: string;
  };
  inauspiciousPeriods: {
    rahuKalam: string;
    yamaganda: string;
    gulika: string;
  };
  auspiciousPeriods: string[];
  dayOfWeek: string;
  specialObservance?: string;
}

// Types for Muhurta data
export interface MuhurtaData {
  activity: string;
  date: Date;
  location: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
  auspiciousTimes: {
    startTime: string;
    endTime: string;
    quality: 'excellent' | 'good' | 'average';
    notes?: string;
  }[];
}

/**
 * Calculate Panchang data for a specific date and location
 * Note: This is a simplified implementation. In a production app,
 * we would use a proper astronomical library.
 */
export const calculatePanchang = (date: Date, latitude: number, longitude: number, timezone: string): PanchangData => {
  // In a real implementation, we would use astronomical calculations
  // For now, we'll create a simplified placeholder implementation
  
  // Calculate sunrise/sunset (simplified)
  const dayOfYear = getDayOfYear(date);
  const baseMinutes = (dayOfYear % 365) % 60;
  
  const sunriseHour = 5 + Math.floor(baseMinutes / 30);
  const sunriseMinute = (baseMinutes % 30) + 15;
  const sunsetHour = 17 + Math.floor(baseMinutes / 30);
  const sunsetMinute = (baseMinutes % 30) + 15;
  
  const sunrise = `${sunriseHour.toString().padStart(2, '0')}:${sunriseMinute.toString().padStart(2, '0')}`;
  const sunset = `${sunsetHour.toString().padStart(2, '0')}:${sunsetMinute.toString().padStart(2, '0')}`;
  
  // Calculate moonrise/moonset (simplified)
  const moonOffset = (dayOfYear % 30) * 24 / 30; // Approximate lunar cycle
  const moonriseHour = (sunriseHour + Math.floor(moonOffset)) % 24;
  const moonriseMinute = (sunriseMinute + 30) % 60;
  const moonsetHour = (sunsetHour + Math.floor(moonOffset)) % 24;
  const moonsetMinute = (sunsetMinute + 30) % 60;
  
  const moonrise = `${moonriseHour.toString().padStart(2, '0')}:${moonriseMinute.toString().padStart(2, '0')}`;
  const moonset = `${moonsetHour.toString().padStart(2, '0')}:${moonsetMinute.toString().padStart(2, '0')}`;
  
  // Calculate tithi (lunar day) - simplified
  const tithiIndex = (dayOfYear + date.getFullYear()) % 30;
  const tithi = TITHIS[tithiIndex];
  const tithiEndHour = (sunsetHour + 1 + (tithiIndex % 4)) % 24;
  const tithiEndMinute = (sunsetMinute + 45) % 60;
  const tithiEndTime = `${tithiEndHour.toString().padStart(2, '0')}:${tithiEndMinute.toString().padStart(2, '0')}`;
  
  // Calculate nakshatra (lunar mansion) - simplified
  const nakshatraIndex = (dayOfYear + date.getFullYear()) % 27;
  const nakshatra = NAKSHATRAS[nakshatraIndex];
  const nakshatraEndHour = (sunsetHour + 2 + (nakshatraIndex % 4)) % 24;
  const nakshatraEndMinute = (sunsetMinute + 30) % 60;
  const nakshatraEndTime = `${nakshatraEndHour.toString().padStart(2, '0')}:${nakshatraEndMinute.toString().padStart(2, '0')}`;
  
  // Calculate yoga - simplified
  const yogaIndex = (dayOfYear + date.getFullYear()) % 27;
  const yoga = YOGAS_PANCHANGA[yogaIndex];
  const yogaEndHour = (sunsetHour + 3 + (yogaIndex % 4)) % 24;
  const yogaEndMinute = (sunsetMinute + 15) % 60;
  const yogaEndTime = `${yogaEndHour.toString().padStart(2, '0')}:${yogaEndMinute.toString().padStart(2, '0')}`;
  
  // Calculate karana - simplified
  const karanaIndex = (dayOfYear + date.getFullYear()) % 11;
  const karana = KARANAS[karanaIndex];
  const karanaEndHour = (sunsetHour + 4 + (karanaIndex % 4)) % 24;
  const karanaEndMinute = (sunsetMinute + 20) % 60;
  const karanaEndTime = `${karanaEndHour.toString().padStart(2, '0')}:${karanaEndMinute.toString().padStart(2, '0')}`;
  
  // Get day of week
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayOfWeek = daysOfWeek[date.getDay()];
  
  // Get inauspicious periods
  const rahuKalam = INAUSPICIOUS_PERIODS.rahu_kalam.periods[dayOfWeek];
  const yamaganda = INAUSPICIOUS_PERIODS.yamaganda.periods[dayOfWeek];
  const gulika = INAUSPICIOUS_PERIODS.gulika.periods[dayOfWeek];
  
  // Generate auspicious periods (simplified)
  const auspiciousPeriods = [];
  
  // Morning auspicious period
  const morningHour = (sunriseHour + 1) % 24;
  const morningEndHour = (morningHour + 2) % 24;
  auspiciousPeriods.push(`${morningHour.toString().padStart(2, '0')}:00 - ${morningEndHour.toString().padStart(2, '0')}:00`);
  
  // Afternoon auspicious period
  const noonHour = 12;
  const noonEndHour = 14;
  if (!rahuKalam.includes(`${noonHour} to ${noonEndHour}`) && 
      !yamaganda.includes(`${noonHour} to ${noonEndHour}`) && 
      !gulika.includes(`${noonHour} to ${noonEndHour}`)) {
    auspiciousPeriods.push(`${noonHour.toString().padStart(2, '0')}:00 - ${noonEndHour.toString().padStart(2, '0')}:00`);
  }
  
  // Evening auspicious period
  const eveningHour = (sunsetHour - 1 + 24) % 24;
  const eveningEndHour = sunsetHour;
  auspiciousPeriods.push(`${eveningHour.toString().padStart(2, '0')}:00 - ${eveningEndHour.toString().padStart(2, '0')}:00`);
  
  // Check for special observances (simplified)
  let specialObservance;
  if (tithi.id === 11) { // Ekadashi
    specialObservance = tithi.phase === 'Shukla' ? 'Shukla Ekadashi (fasting day)' : 'Krishna Ekadashi (fasting day)';
  } else if (tithi.id === 15) { // Purnima
    specialObservance = 'Purnima (full moon)';
  } else if (tithi.id === 30) { // Amavasya
    specialObservance = 'Amavasya (new moon)';
  }
  
  return {
    date,
    location: {
      latitude,
      longitude,
      timezone
    },
    sunrise,
    sunset,
    moonrise,
    moonset,
    tithi: {
      id: tithi.id,
      name: tithi.name,
      phase: tithi.phase,
      deity: tithi.deity,
      endTime: tithiEndTime
    },
    nakshatra: {
      id: nakshatra.id,
      name: nakshatra.name,
      deity: nakshatra.deity,
      endTime: nakshatraEndTime
    },
    yoga: {
      id: yoga.id,
      name: yoga.name,
      deity: yoga.deity,
      endTime: yogaEndTime
    },
    karana: {
      id: karana.id,
      name: karana.name,
      deity: karana.deity,
      nature: karana.nature,
      endTime: karanaEndTime
    },
    inauspiciousPeriods: {
      rahuKalam,
      yamaganda,
      gulika
    },
    auspiciousPeriods,
    dayOfWeek: dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1),
    specialObservance
  };
};

/**
 * Find auspicious times (muhurtas) for a specific activity
 */
export const findMuhurta = (activity: string, date: Date, latitude: number, longitude: number, timezone: string): MuhurtaData => {
  // Get panchang data for the day
  const panchang = calculatePanchang(date, latitude, longitude, timezone);
  
  // Get muhurta requirements for the activity
  const muhurtaType = MUHURTA_TYPES.find(m => m.id === activity);
  if (!muhurtaType) {
    throw new Error(`Unknown activity: ${activity}`);
  }
  
  // In a real implementation, we would check all requirements against the panchang
  // For now, we'll create a simplified placeholder implementation
  
  const auspiciousTimes = [];
  
  // Parse sunrise and sunset
  const [sunriseHour, sunriseMinute] = panchang.sunrise.split(':').map(Number);
  const [sunsetHour, sunsetMinute] = panchang.sunset.split(':').map(Number);
  
  // Calculate day duration in minutes
  const sunriseMinutes = sunriseHour * 60 + sunriseMinute;
  const sunsetMinutes = sunsetHour * 60 + sunsetMinute;
  const dayDurationMinutes = sunsetMinutes - sunriseMinutes;
  
  // Divide day into 15 muhurtas (traditional division)
  const muhurtaDuration = dayDurationMinutes / 15;
  
  // Check each muhurta for auspiciousness
  for (let i = 0; i < 15; i++) {
    const startMinutes = sunriseMinutes + i * muhurtaDuration;
    const endMinutes = startMinutes + muhurtaDuration;
    
    const startHour = Math.floor(startMinutes / 60);
    const startMinute = Math.floor(startMinutes % 60);
    const endHour = Math.floor(endMinutes / 60);
    const endMinute = Math.floor(endMinutes % 60);
    
    const startTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
    
    // Check if this muhurta is during Rahu Kalam or other inauspicious periods
    const isRahuKalam = isTimeInPeriod(startHour, panchang.inauspiciousPeriods.rahuKalam);
    const isYamaganda = isTimeInPeriod(startHour, panchang.inauspiciousPeriods.yamaganda);
    const isGulika = isTimeInPeriod(startHour, panchang.inauspiciousPeriods.gulika);
    
    if (isRahuKalam || isYamaganda || isGulika) {
      continue; // Skip inauspicious periods
    }
    
    // Simplified quality determination
    let quality: 'excellent' | 'good' | 'average' = 'average';
    let notes = '';
    
    // Check nakshatra suitability (simplified)
    if (activity === 'marriage' && ['Rohini', 'Uttara Phalguni', 'Uttara Ashadha', 'Uttara Bhadrapada'].includes(panchang.nakshatra.name)) {
      quality = 'excellent';
      notes = 'Highly auspicious nakshatra for marriage';
    } else if (activity === 'travel' && ['Pushya', 'Hasta', 'Anuradha', 'Shravana', 'Revati'].includes(panchang.nakshatra.name)) {
      quality = 'excellent';
      notes = 'Excellent nakshatra for travel';
    } else if (activity === 'business' && ['Pushya', 'Hasta', 'Uttara Phalguni', 'Uttara Ashadha'].includes(panchang.nakshatra.name)) {
      quality = 'excellent';
      notes = 'Auspicious nakshatra for business ventures';
    } else if (activity === 'education' && ['Hasta', 'Pushya', 'Shravana', 'Dhanishta'].includes(panchang.nakshatra.name)) {
      quality = 'excellent';
      notes = 'Excellent nakshatra for beginning education';
    } else if (['Ashlesha', 'Jyeshtha', 'Mula', 'Magha'].includes(panchang.nakshatra.name)) {
      continue; // Skip generally inauspicious nakshatras
    } else if (i === 5 || i === 10) { // Arbitrary "good" muhurtas for demonstration
      quality = 'good';
    }
    
    // Check tithi suitability (simplified)
    if ([4, 6, 8, 9, 12, 14, 30].includes(panchang.tithi.id)) {
      continue; // Skip generally inauspicious tithis
    }
    
    // Add this muhurta to the list
    auspiciousTimes.push({
      startTime,
      endTime,
      quality,
      notes
    });
  }
  
  return {
    activity,
    date,
    location: {
      latitude,
      longitude,
      timezone
    },
    auspiciousTimes
  };
};

// Helper function to get day of year
const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// Helper function to check if a time is within a period string like "4.5 to 6"
const isTimeInPeriod = (hour: number, periodStr: string): boolean => {
  const [startStr, endStr] = periodStr.split(' to ');
  
  // Parse start and end times
  const start = parseFloat(startStr);
  const end = parseFloat(endStr);
  
  // Check if hour is within the period
  if (start <= end) {
    return hour >= start && hour < end;
  } else {
    // Handle case where period crosses midnight
    return hour >= start || hour < end;
  }
};

/**
 * Get recommended daily activities based on panchang
 */
export const getDailyRecommendations = (panchang: PanchangData): string[] => {
  const recommendations: string[] = [];
  
  // Based on tithi
  if (panchang.tithi.id === 11) { // Ekadashi
    recommendations.push('Observe fasting or light diet');
    recommendations.push('Spend time in meditation and prayer');
  } else if (panchang.tithi.id === 15) { // Purnima
    recommendations.push('Perform charitable acts');
    recommendations.push('Spiritual practices are highly beneficial today');
  } else if (panchang.tithi.id === 30) { // Amavasya
    recommendations.push('Perform rituals for ancestors (pitru tarpan)');
    recommendations.push('Avoid starting new ventures');
  }
  
  // Based on nakshatra
  switch (panchang.nakshatra.name) {
    case 'Pushya':
      recommendations.push('Excellent day for starting new ventures');
      recommendations.push('Favorable for financial decisions');
      break;
    case 'Ashlesha':
      recommendations.push('Avoid major decisions today');
      recommendations.push('Focus on introspection and planning');
      break;
    case 'Magha':
      recommendations.push('Honor ancestors and elders');
      recommendations.push('Good day for spiritual learning');
      break;
    case 'Hasta':
      recommendations.push('Favorable for skilled work and crafts');
      recommendations.push('Good day for signing contracts');
      break;
    case 'Chitra':
      recommendations.push('Excellent for artistic endeavors');
      recommendations.push('Good day for beautification and decoration');
      break;
    case 'Vishakha':
      recommendations.push('Good for collaborative projects');
      recommendations.push('Favorable for networking and social activities');
      break;
    case 'Anuradha':
      recommendations.push('Favorable for friendship and partnerships');
      recommendations.push('Good day for reconciliation');
      break;
    case 'Mula':
      recommendations.push('Focus on foundational work');
      recommendations.push('Avoid travel if possible');
      break;
    case 'Shravana':
      recommendations.push('Excellent day for learning and education');
      recommendations.push('Good for communication and teaching');
      break;
    case 'Dhanishta':
      recommendations.push('Favorable for financial prosperity');
      recommendations.push('Good day for charitable activities');
      break;
    case 'Shatabhisha':
      recommendations.push('Good for healing practices');
      recommendations.push('Favorable for medical treatments');
      break;
    case 'Revati':
      recommendations.push('Excellent for spiritual practices');
      recommendations.push('Favorable for travel and journeys');
      break;
  }
  
  // Based on day of week
  switch (panchang.dayOfWeek.toLowerCase()) {
    case 'sunday':
      recommendations.push('Worship Lord Surya (Sun)');
      recommendations.push('Good day for father-related activities');
      break;
    case 'monday':
      recommendations.push('Worship Lord Shiva');
      recommendations.push('Favorable for peace and emotional healing');
      break;
    case 'tuesday':
      recommendations.push('Worship Lord Hanuman or Karthikeya');
      recommendations.push('Good day for courage and decisive action');
      break;
    case 'wednesday':
      recommendations.push('Worship Lord Ganesha');
      recommendations.push('Favorable for education and communication');
      break;
    case 'thursday':
      recommendations.push('Worship Lord Vishnu or Guru');
      recommendations.push('Good day for spiritual learning and teaching');
      break;
    case 'friday':
      recommendations.push('Worship Goddess Lakshmi');
      recommendations.push('Favorable for relationships and artistic pursuits');
      break;
    case 'saturday':
      recommendations.push('Worship Lord Shani (Saturn)');
      recommendations.push('Good day for introspection and discipline');
      break;
  }
  
  // Add general recommendations
  recommendations.push(`Avoid starting important work during Rahu Kalam (${panchang.inauspiciousPeriods.rahuKalam})`);
  
  if (panchang.auspiciousPeriods.length > 0) {
    recommendations.push(`Best times for important activities: ${panchang.auspiciousPeriods.join(', ')}`);
  }
  
  return recommendations;
};
