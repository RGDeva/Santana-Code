// Vedic Astrology Constants

// Zodiac Signs (Rashis)
export const RASHIS = [
  { id: 1, name: 'Aries', sanskrit: 'Mesha', element: 'Fire', ruler: 'Mars', symbol: '♈' },
  { id: 2, name: 'Taurus', sanskrit: 'Vrishabha', element: 'Earth', ruler: 'Venus', symbol: '♉' },
  { id: 3, name: 'Gemini', sanskrit: 'Mithuna', element: 'Air', ruler: 'Mercury', symbol: '♊' },
  { id: 4, name: 'Cancer', sanskrit: 'Karka', element: 'Water', ruler: 'Moon', symbol: '♋' },
  { id: 5, name: 'Leo', sanskrit: 'Simha', element: 'Fire', ruler: 'Sun', symbol: '♌' },
  { id: 6, name: 'Virgo', sanskrit: 'Kanya', element: 'Earth', ruler: 'Mercury', symbol: '♍' },
  { id: 7, name: 'Libra', sanskrit: 'Tula', element: 'Air', ruler: 'Venus', symbol: '♎' },
  { id: 8, name: 'Scorpio', sanskrit: 'Vrishchika', element: 'Water', ruler: 'Mars', symbol: '♏' },
  { id: 9, name: 'Sagittarius', sanskrit: 'Dhanu', element: 'Fire', ruler: 'Jupiter', symbol: '♐' },
  { id: 10, name: 'Capricorn', sanskrit: 'Makara', element: 'Earth', ruler: 'Saturn', symbol: '♑' },
  { id: 11, name: 'Aquarius', sanskrit: 'Kumbha', element: 'Air', ruler: 'Saturn', symbol: '♒' },
  { id: 12, name: 'Pisces', sanskrit: 'Meena', element: 'Water', ruler: 'Jupiter', symbol: '♓' }
];

// Nakshatras (Lunar Mansions)
export const NAKSHATRAS = [
  { id: 1, name: 'Ashwini', deity: 'Ashwini Kumaras', ruler: 'Ketu', symbol: 'Horse's head', degrees: [0, 13.20], rashi: 1 },
  { id: 2, name: 'Bharani', deity: 'Yama', ruler: 'Venus', symbol: 'Yoni', degrees: [13.20, 26.40], rashi: 1 },
  { id: 3, name: 'Krittika', deity: 'Agni', ruler: 'Sun', symbol: 'Razor', degrees: [26.40, 40], rashis: [1, 2] },
  { id: 4, name: 'Rohini', deity: 'Brahma', ruler: 'Moon', symbol: 'Chariot', degrees: [40, 53.20], rashi: 2 },
  { id: 5, name: 'Mrigashira', deity: 'Soma', ruler: 'Mars', symbol: 'Deer's head', degrees: [53.20, 66.40], rashis: [2, 3] },
  { id: 6, name: 'Ardra', deity: 'Rudra', ruler: 'Rahu', symbol: 'Teardrop', degrees: [66.40, 80], rashi: 3 },
  { id: 7, name: 'Punarvasu', deity: 'Aditi', ruler: 'Jupiter', symbol: 'Bow', degrees: [80, 93.20], rashis: [3, 4] },
  { id: 8, name: 'Pushya', deity: 'Brihaspati', ruler: 'Saturn', symbol: 'Flower', degrees: [93.20, 106.40], rashi: 4 },
  { id: 9, name: 'Ashlesha', deity: 'Nagas', ruler: 'Mercury', symbol: 'Serpent', degrees: [106.40, 120], rashi: 4 },
  { id: 10, name: 'Magha', deity: 'Pitris', ruler: 'Ketu', symbol: 'Throne', degrees: [120, 133.20], rashi: 5 },
  { id: 11, name: 'Purva Phalguni', deity: 'Bhaga', ruler: 'Venus', symbol: 'Front of bed', degrees: [133.20, 146.40], rashi: 5 },
  { id: 12, name: 'Uttara Phalguni', deity: 'Aryaman', ruler: 'Sun', symbol: 'Back of bed', degrees: [146.40, 160], rashis: [5, 6] },
  { id: 13, name: 'Hasta', deity: 'Savitar', ruler: 'Moon', symbol: 'Hand', degrees: [160, 173.20], rashi: 6 },
  { id: 14, name: 'Chitra', deity: 'Vishwakarma', ruler: 'Mars', symbol: 'Pearl', degrees: [173.20, 186.40], rashis: [6, 7] },
  { id: 15, name: 'Swati', deity: 'Vayu', ruler: 'Rahu', symbol: 'Coral', degrees: [186.40, 200], rashi: 7 },
  { id: 16, name: 'Vishakha', deity: 'Indra-Agni', ruler: 'Jupiter', symbol: 'Potter's wheel', degrees: [200, 213.20], rashis: [7, 8] },
  { id: 17, name: 'Anuradha', deity: 'Mitra', ruler: 'Saturn', symbol: 'Lotus', degrees: [213.20, 226.40], rashi: 8 },
  { id: 18, name: 'Jyeshtha', deity: 'Indra', ruler: 'Mercury', symbol: 'Umbrella', degrees: [226.40, 240], rashi: 8 },
  { id: 19, name: 'Mula', deity: 'Nirrti', ruler: 'Ketu', symbol: 'Lion's tail', degrees: [240, 253.20], rashi: 9 },
  { id: 20, name: 'Purva Ashadha', deity: 'Apas', ruler: 'Venus', symbol: 'Fan', degrees: [253.20, 266.40], rashi: 9 },
  { id: 21, name: 'Uttara Ashadha', deity: 'Vishvedevas', ruler: 'Sun', symbol: 'Elephant tusk', degrees: [266.40, 280], rashis: [9, 10] },
  { id: 22, name: 'Shravana', deity: 'Vishnu', ruler: 'Moon', symbol: 'Three footprints', degrees: [280, 293.20], rashi: 10 },
  { id: 23, name: 'Dhanishta', deity: 'Vasus', ruler: 'Mars', symbol: 'Drum', degrees: [293.20, 306.40], rashis: [10, 11] },
  { id: 24, name: 'Shatabhisha', deity: 'Varuna', ruler: 'Rahu', symbol: 'Empty circle', degrees: [306.40, 320], rashi: 11 },
  { id: 25, name: 'Purva Bhadrapada', deity: 'Ajaikapada', ruler: 'Jupiter', symbol: 'Front of funeral cot', degrees: [320, 333.20], rashis: [11, 12] },
  { id: 26, name: 'Uttara Bhadrapada', deity: 'Ahirbudhnya', ruler: 'Saturn', symbol: 'Back of funeral cot', degrees: [333.20, 346.40], rashi: 12 },
  { id: 27, name: 'Revati', deity: 'Pushan', ruler: 'Mercury', symbol: 'Fish', degrees: [346.40, 360], rashi: 12 }
];

// Planets
export const PLANETS = [
  { id: 'su', name: 'Sun', sanskrit: 'Surya', symbol: '☉', color: '#FFA500' },
  { id: 'mo', name: 'Moon', sanskrit: 'Chandra', symbol: '☽', color: '#FFFFFF' },
  { id: 'ma', name: 'Mars', sanskrit: 'Mangala', symbol: '♂', color: '#FF0000' },
  { id: 'me', name: 'Mercury', sanskrit: 'Budha', symbol: '☿', color: '#00FF00' },
  { id: 'ju', name: 'Jupiter', sanskrit: 'Guru', symbol: '♃', color: '#FFFF00' },
  { id: 've', name: 'Venus', sanskrit: 'Shukra', symbol: '♀', color: '#FFFFFF' },
  { id: 'sa', name: 'Saturn', sanskrit: 'Shani', symbol: '♄', color: '#0000FF' },
  { id: 'ra', name: 'Rahu', sanskrit: 'Rahu', symbol: '☊', color: '#000000' },
  { id: 'ke', name: 'Ketu', sanskrit: 'Ketu', symbol: '☋', color: '#000000' }
];

// Houses (Bhavas)
export const HOUSES = [
  { id: 1, name: 'First House', sanskrit: 'Tanu Bhava', significations: ['Self', 'Physical body', 'Personality', 'Appearance'] },
  { id: 2, name: 'Second House', sanskrit: 'Dhana Bhava', significations: ['Wealth', 'Family', 'Speech', 'Food'] },
  { id: 3, name: 'Third House', sanskrit: 'Sahaja Bhava', significations: ['Siblings', 'Courage', 'Communication', 'Short journeys'] },
  { id: 4, name: 'Fourth House', sanskrit: 'Sukha Bhava', significations: ['Mother', 'Home', 'Happiness', 'Education'] },
  { id: 5, name: 'Fifth House', sanskrit: 'Putra Bhava', significations: ['Children', 'Intelligence', 'Creativity', 'Romance'] },
  { id: 6, name: 'Sixth House', sanskrit: 'Ripu Bhava', significations: ['Enemies', 'Disease', 'Service', 'Debt'] },
  { id: 7, name: 'Seventh House', sanskrit: 'Yuvati Bhava', significations: ['Spouse', 'Partnership', 'Business', 'Travel'] },
  { id: 8, name: 'Eighth House', sanskrit: 'Randhra Bhava', significations: ['Longevity', 'Obstacles', 'Hidden things', 'Inheritance'] },
  { id: 9, name: 'Ninth House', sanskrit: 'Dharma Bhava', significations: ['Fortune', 'Religion', 'Teacher', 'Higher learning'] },
  { id: 10, name: 'Tenth House', sanskrit: 'Karma Bhava', significations: ['Career', 'Status', 'Father', 'Authority'] },
  { id: 11, name: 'Eleventh House', sanskrit: 'Labha Bhava', significations: ['Gains', 'Friends', 'Hopes', 'Aspirations'] },
  { id: 12, name: 'Twelfth House', sanskrit: 'Vyaya Bhava', significations: ['Loss', 'Spirituality', 'Isolation', 'Foreign lands'] }
];

// Doshas
export const DOSHAS = [
  {
    id: 'mangal',
    name: 'Mangal Dosha',
    sanskrit: 'मंगल दोष',
    description: 'Also known as Kuja Dosha or Mars Dosha, it occurs when Mars is placed in the 1st, 4th, 7th, 8th, or 12th house from the Lagna or Moon.',
    effects: 'Can affect marital harmony and happiness if not remedied.',
    remedies: ['Worship of Lord Hanuman', 'Recitation of Hanuman Chalisa', 'Wearing red coral']
  },
  {
    id: 'kaal_sarpa',
    name: 'Kaal Sarpa Dosha',
    sanskrit: 'काल सर्प दोष',
    description: 'Occurs when all planets are positioned between Rahu and Ketu, forming a snake-like pattern in the chart.',
    effects: 'Can cause delays, obstacles, and sudden reversals in life.',
    remedies: ['Performing Kaal Sarpa Shanti puja', 'Worship of Lord Shiva', 'Naga Pratishtha']
  },
  {
    id: 'pitra',
    name: 'Pitra Dosha',
    sanskrit: 'पितृ दोष',
    description: 'Caused by the curse of ancestors due to improper funeral rites or disrespect to elders.',
    effects: 'Can manifest as chronic health issues, financial problems, or obstacles in progeny.',
    remedies: ['Performing Shraddha ceremony', 'Tarpan ritual', 'Donating to the poor']
  },
  {
    id: 'shani_sade_sati',
    name: 'Shani Sade Sati',
    sanskrit: 'शनि साढ़े साती',
    description: 'Occurs when Saturn transits the 12th, 1st, and 2nd houses from the natal Moon, lasting approximately 7.5 years.',
    effects: 'Can bring challenges, delays, and lessons through hardship.',
    remedies: ['Worship of Lord Hanuman', 'Recitation of Hanuman Chalisa', 'Feeding crows on Saturdays']
  }
];

// Dasha periods (Vimshottari Dasha system)
export const DASHA_PERIODS = {
  'su': 6,  // Sun: 6 years
  'mo': 10, // Moon: 10 years
  'ma': 7,  // Mars: 7 years
  'ra': 18, // Rahu: 18 years
  'ju': 16, // Jupiter: 16 years
  'sa': 19, // Saturn: 19 years
  'me': 17, // Mercury: 17 years
  'ke': 7,  // Ketu: 7 years
  've': 20  // Venus: 20 years
};

// Total Vimshottari Dasha cycle: 120 years

// Dasha sequence
export const DASHA_SEQUENCE = ['ke', 've', 'su', 'mo', 'ma', 'ra', 'ju', 'sa', 'me'];

// Yoga combinations
export const YOGAS = [
  {
    id: 'raj',
    name: 'Raja Yoga',
    description: 'Formed when lords of auspicious houses (1, 4, 5, 7, 9, 10) combine or aspect each other.',
    effects: 'Brings power, authority, and success in life.'
  },
  {
    id: 'dhana',
    name: 'Dhana Yoga',
    description: 'Formed when lords of 2nd, 5th, 9th, and 11th houses combine or aspect each other.',
    effects: 'Brings wealth and financial prosperity.'
  },
  {
    id: 'gajakesari',
    name: 'Gajakesari Yoga',
    description: 'Formed when Jupiter is in a kendra (1, 4, 7, 10) from the Moon.',
    effects: 'Brings fame, wisdom, and success in endeavors.'
  },
  {
    id: 'budhaditya',
    name: 'Budhaditya Yoga',
    description: 'Formed when Sun and Mercury are conjunct.',
    effects: 'Brings intelligence, communication skills, and success in education.'
  }
];

// Muhurta (Auspicious timings)
export const MUHURTA_TYPES = [
  {
    id: 'marriage',
    name: 'Vivaha Muhurta',
    description: 'Auspicious time for marriage ceremonies.',
    requirements: [
      'Avoid Rahu Kalam and Yamaganda',
      'Avoid Bhadra',
      'Moon should be waxing',
      'Avoid 4th, 6th, 8th, 9th, and 12th lunar days',
      'Avoid Ashlesha, Jyeshtha, Mula, and Magha nakshatras'
    ]
  },
  {
    id: 'travel',
    name: 'Yatra Muhurta',
    description: 'Auspicious time for beginning journeys.',
    requirements: [
      'Avoid Rahu Kalam',
      'Moon should be strong',
      'Day should be ruled by a benefic planet',
      'Avoid 4th, 8th, and 12th lunar days',
      'Avoid Ashlesha, Jyeshtha, and Mula nakshatras'
    ]
  },
  {
    id: 'business',
    name: 'Vyapara Muhurta',
    description: 'Auspicious time for starting a business or signing contracts.',
    requirements: [
      'Mercury and Jupiter should be strong',
      'Avoid Rahu Kalam and Yamaganda',
      'Avoid 4th, 8th, and 14th lunar days',
      'Lagna should be fixed or movable'
    ]
  },
  {
    id: 'education',
    name: 'Vidyarambha Muhurta',
    description: 'Auspicious time for beginning education.',
    requirements: [
      'Jupiter, Mercury, and Venus should be strong',
      'Avoid Rahu Kalam',
      'Wednesday, Thursday, and Friday are preferred',
      'Avoid 4th, 6th, 8th, and 14th lunar days'
    ]
  }
];

// Inauspicious time periods
export const INAUSPICIOUS_PERIODS = {
  'rahu_kalam': {
    name: 'Rahu Kalam',
    description: 'An inauspicious 1.5-hour period each day, varying by day of the week.',
    periods: {
      'sunday': '4.5 to 6',
      'monday': '7.5 to 9',
      'tuesday': '3 to 4.5',
      'wednesday': '12 to 1.5',
      'thursday': '1.5 to 3',
      'friday': '10.5 to 12',
      'saturday': '9 to 10.5'
    }
  },
  'yamaganda': {
    name: 'Yamaganda',
    description: 'An inauspicious 1.5-hour period each day, varying by day of the week.',
    periods: {
      'sunday': '12 to 1.5',
      'monday': '10.5 to 12',
      'tuesday': '9 to 10.5',
      'wednesday': '7.5 to 9',
      'thursday': '6 to 7.5',
      'friday': '3 to 4.5',
      'saturday': '1.5 to 3'
    }
  },
  'gulika': {
    name: 'Gulika Kalam',
    description: 'An inauspicious period ruled by Saturn\'s son Gulika.',
    periods: {
      'sunday': '1.5 to 3',
      'monday': '3 to 4.5',
      'tuesday': '12 to 1.5',
      'wednesday': '10.5 to 12',
      'thursday': '9 to 10.5',
      'friday': '7.5 to 9',
      'saturday': '6 to 7.5'
    }
  }
};

// Tithi (Lunar days)
export const TITHIS = [
  { id: 1, name: 'Pratipada', phase: 'Shukla', deity: 'Agni' },
  { id: 2, name: 'Dwitiya', phase: 'Shukla', deity: 'Brahma' },
  { id: 3, name: 'Tritiya', phase: 'Shukla', deity: 'Gauri' },
  { id: 4, name: 'Chaturthi', phase: 'Shukla', deity: 'Ganesha' },
  { id: 5, name: 'Panchami', phase: 'Shukla', deity: 'Serpents' },
  { id: 6, name: 'Shashthi', phase: 'Shukla', deity: 'Karttikeya' },
  { id: 7, name: 'Saptami', phase: 'Shukla', deity: 'Surya' },
  { id: 8, name: 'Ashtami', phase: 'Shukla', deity: 'Shiva' },
  { id: 9, name: 'Navami', phase: 'Shukla', deity: 'Durga' },
  { id: 10, name: 'Dashami', phase: 'Shukla', deity: 'Yama' },
  { id: 11, name: 'Ekadashi', phase: 'Shukla', deity: 'Vishnu' },
  { id: 12, name: 'Dwadashi', phase: 'Shukla', deity: 'Vishnu' },
  { id: 13, name: 'Trayodashi', phase: 'Shukla', deity: 'Kamadeva' },
  { id: 14, name: 'Chaturdashi', phase: 'Shukla', deity: 'Shiva' },
  { id: 15, name: 'Purnima', phase: 'Shukla', deity: 'Soma' },
  { id: 16, name: 'Pratipada', phase: 'Krishna', deity: 'Agni' },
  { id: 17, name: 'Dwitiya', phase: 'Krishna', deity: 'Brahma' },
  { id: 18, name: 'Tritiya', phase: 'Krishna', deity: 'Gauri' },
  { id: 19, name: 'Chaturthi', phase: 'Krishna', deity: 'Ganesha' },
  { id: 20, name: 'Panchami', phase: 'Krishna', deity: 'Serpents' },
  { id: 21, name: 'Shashthi', phase: 'Krishna', deity: 'Karttikeya' },
  { id: 22, name: 'Saptami', phase: 'Krishna', deity: 'Surya' },
  { id: 23, name: 'Ashtami', phase: 'Krishna', deity: 'Shiva' },
  { id: 24, name: 'Navami', phase: 'Krishna', deity: 'Durga' },
  { id: 25, name: 'Dashami', phase: 'Krishna', deity: 'Yama' },
  { id: 26, name: 'Ekadashi', phase: 'Krishna', deity: 'Vishnu' },
  { id: 27, name: 'Dwadashi', phase: 'Krishna', deity: 'Vishnu' },
  { id: 28, name: 'Trayodashi', phase: 'Krishna', deity: 'Kamadeva' },
  { id: 29, name: 'Chaturdashi', phase: 'Krishna', deity: 'Shiva' },
  { id: 30, name: 'Amavasya', phase: 'Krishna', deity: 'Pitris' }
];

// Karana (half of a tithi)
export const KARANAS = [
  { id: 1, name: 'Bava', deity: 'Vishnu', nature: 'Fixed' },
  { id: 2, name: 'Balava', deity: 'Brahma', nature: 'Movable' },
  { id: 3, name: 'Kaulava', deity: 'Shiva', nature: 'Fixed' },
  { id: 4, name: 'Taitila', deity: 'Ganesha', nature: 'Movable' },
  { id: 5, name: 'Garija', deity: 'Vishnu', nature: 'Fixed' },
  { id: 6, name: 'Vanija', deity: 'Brahma', nature: 'Movable' },
  { id: 7, name: 'Vishti', deity: 'Yama', nature: 'Fixed' },
  { id: 8, name: 'Shakuni', deity: 'Indra', nature: 'Movable' },
  { id: 9, name: 'Chatushpada', deity: 'Brahma', nature: 'Fixed' },
  { id: 10, name: 'Naga', deity: 'Serpents', nature: 'Movable' },
  { id: 11, name: 'Kimstughna', deity: 'Yama', nature: 'Fixed' }
];

// Yoga (Sun-Moon combinations)
export const YOGAS_PANCHANGA = [
  { id: 1, name: 'Vishkumbha', deity: 'Agni' },
  { id: 2, name: 'Preeti', deity: 'Indra' },
  { id: 3, name: 'Ayushman', deity: 'Brahma' },
  { id: 4, name: 'Saubhagya', deity: 'Surya' },
  { id: 5, name: 'Shobhana', deity: 'Indra' },
  { id: 6, name: 'Atiganda', deity: 'Yama' },
  { id: 7, name: 'Sukarma', deity: 'Brahma' },
  { id: 8, name: 'Dhriti', deity: 'Vishnu' },
  { id: 9, name: 'Shula', deity: 'Agni' },
  { id: 10, name: 'Ganda', deity: 'Varuna' },
  { id: 11, name: 'Vriddhi', deity: 'Kubera' },
  { id: 12, name: 'Dhruva', deity: 'Vayu' },
  { id: 13, name: 'Vyaghata', deity: 'Agni' },
  { id: 14, name: 'Harshana', deity: 'Surya' },
  { id: 15, name: 'Vajra', deity: 'Indra' },
  { id: 16, name: 'Siddhi', deity: 'Ganesha' },
  { id: 17, name: 'Vyatipata', deity: 'Rudra' },
  { id: 18, name: 'Variyana', deity: 'Surya' },
  { id: 19, name: 'Parigha', deity: 'Shiva' },
  { id: 20, name: 'Shiva', deity: 'Shiva' },
  { id: 21, name: 'Siddha', deity: 'Brahma' },
  { id: 22, name: 'Sadhya', deity: 'Indra' },
  { id: 23, name: 'Shubha', deity: 'Ganesha' },
  { id: 24, name: 'Shukla', deity: 'Vishnu' },
  { id: 25, name: 'Brahma', deity: 'Brahma' },
  { id: 26, name: 'Indra', deity: 'Indra' },
  { id: 27, name: 'Vaidhriti', deity: 'Yama' }
];
