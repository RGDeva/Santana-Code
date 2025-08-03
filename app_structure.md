# Santana Code - App Structure Design

## Application Architecture

### Core Architecture
- **Frontend Framework**: React with TypeScript
- **State Management**: Redux for global state, Context API for feature-specific state
- **Styling**: Tailwind CSS with custom theme configuration
- **Animation**: Framer Motion for transitions and micro-interactions
- **Routing**: React Router with lazy loading for performance

### Data Layer
- **Local Storage**: For user preferences and settings
- **IndexedDB**: For scripture texts and offline functionality
- **API Integration**: For astronomical calculations and location services
- **State Persistence**: Redux Persist for seamless user experience

### Module Structure
```
src/
├── assets/            # Static assets (images, fonts, audio)
├── components/        # Reusable UI components
│   ├── common/        # Shared components (buttons, inputs, etc.)
│   ├── astrology/     # Astrology calculator components
│   ├── panchang/      # Panchang and muhurat components
│   ├── deities/       # Deity card components
│   ├── scriptures/    # Scripture library components
│   ├── journal/       # Mantra journal components
│   └── quiz/          # Spiritual path quiz components
├── hooks/             # Custom React hooks
├── pages/             # Main application pages
├── services/          # API and calculation services
├── store/             # Redux store configuration
├── styles/            # Global styles and theme configuration
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Navigation Structure

### Primary Navigation (Bottom Bar)
1. **Home** - Dashboard with daily insights and quick access
2. **Explore** - Access to deities and scriptures
3. **Practice** - Mantra journal and meditation tools
4. **Calculate** - Astrology and panchang tools
5. **Profile** - User settings and spiritual path information

### Secondary Navigation
- **Explore Section**:
  - Deity Discovery
  - Scripture Library
- **Practice Section**:
  - Mantra Journal
  - Meditation Timer
  - Practice Stats
- **Calculate Section**:
  - Birth Chart
  - Daily Panchang
  - Muhurat Finder

### Navigation Flow
1. **App Entry** → Welcome/Onboarding → Home Dashboard
2. **Home** → Quick access cards → Feature details
3. **Deep Linking** between related content (e.g., deity references in scriptures)
4. **Contextual Back Navigation** preserving scroll position and state
5. **Gesture Navigation** for card swiping and section transitions

## Data Flow Architecture

### Global State
- User preferences and settings
- Current location data
- Authentication state (if implemented)
- Theme and accessibility settings

### Feature-Specific State
- **Astrology**: Birth data, calculated chart, current dasha
- **Panchang**: Selected date, location-specific calculations
- **Deities**: Favorite deities, viewing history
- **Scriptures**: Reading progress, bookmarks, highlights
- **Journal**: Practice logs, streaks, goals
- **Quiz**: Quiz responses, determined path, recommendations

### Data Persistence Strategy
- Critical user data saved immediately
- Progress auto-saved at logical breakpoints
- Option for cloud sync in future versions
- Offline-first approach for core functionality

## Component Library Design

### Base Components
- **SacredButton**: Primary, secondary, and tertiary button styles
- **MysticalInput**: Text input with animation and validation
- **DivineCard**: Base card component with consistent styling
- **SacredIcon**: Custom iconography system
- **RitualDivider**: Section dividers with optional decorative elements

### Composite Components
- **DeityCard**: Image, information, and animation for deities
- **ScriptureReader**: Verse display with translation and explanation
- **ChartVisualization**: Birth chart in North and South Indian styles
- **PanchangDisplay**: Daily timing and auspicious period visualization
- **MantaCounter**: Counter with animation for japa tracking
- **PathIndicator**: Visualization of spiritual path balance

### Layout Components
- **MysticalContainer**: Base page container with consistent padding
- **ScrollableSections**: Vertically scrolling tabbed interface
- **CardCollection**: Grid/list toggle for collections of cards
- **DetailExpander**: Expandable detail sections with animation

## Wireframes for Key Screens

### Home Dashboard
```
┌────────────────────────────┐
│ Santana Code               │
├────────────────────────────┤
│ ┌──────────────────────┐   │
│ │ Today's Panchang     │   │
│ │ [Date] [Tithi]       │   │
│ │ [Nakshatra] [Yoga]   │   │
│ └──────────────────────┘   │
│                            │
│ Quick Access               │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐│
│ │Deity│ │Scri│ │Astr│ │More││
│ │Cards│ │ptur│ │olog│ │    ││
│ └────┘ └────┘ └────┘ └────┘│
│                            │
│ Daily Wisdom               │
│ ┌──────────────────────┐   │
│ │ "Quote or verse"     │   │
│ │ - Source             │   │
│ └──────────────────────┘   │
│                            │
│ Your Practice              │
│ ┌──────────────────────┐   │
│ │ [Streak] [Stats]     │   │
│ │ [Recent mantras]     │   │
│ └──────────────────────┘   │
│                            │
├────────────────────────────┤
│ 🏠   📚   🧘   🔮   👤    │
└────────────────────────────┘
```

### Deity Discovery
```
┌────────────────────────────┐
│ Deity Discovery        ⚙️  │
├────────────────────────────┤
│ ┌────────────────────┐     │
│ │ 🔍 Search deities  │     │
│ └────────────────────┘     │
│                            │
│ Categories                 │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐│
│ │Trim│ │Shak│ │Vish│ │More││
│ │urti│ │ti  │ │nu  │ │    ││
│ └────┘ └────┘ └────┘ └────┘│
│                            │
│ Featured Deity             │
│ ┌──────────────────────┐   │
│ │ [Deity Image]        │   │
│ │ [Deity Name]         │   │
│ │ [Brief description]  │   │
│ └──────────────────────┘   │
│                            │
│ All Deities                │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐│
│ │    │ │    │ │    │ │    ││
│ │    │ │    │ │    │ │    ││
│ └────┘ └────┘ └────┘ └────┘│
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐│
│ │    │ │    │ │    │ │    ││
│ │    │ │    │ │    │ │    ││
│ └────┘ └────┘ └────┘ └────┘│
│                            │
├────────────────────────────┤
│ 🏠   📚   🧘   🔮   👤    │
└────────────────────────────┘
```

### Deity Detail View
```
┌────────────────────────────┐
│ ← Deity Detail         ⭐  │
├────────────────────────────┤
│ ┌──────────────────────┐   │
│ │ [Deity Animation]    │   │
│ │                      │   │
│ └──────────────────────┘   │
│                            │
│ Shiva                      │
│ शिव (Śiva)                 │
│                            │
│ Description                │
│ ┌──────────────────────┐   │
│ │ [Detailed text about │   │
│ │ the deity, role,     │   │
│ │ significance, etc.]  │   │
│ └──────────────────────┘   │
│                            │
│ Mantras                    │
│ ┌──────────────────────┐   │
│ │ ॐ नमः शिवाय          │   │
│ │ Om Namah Shivaya     │   │
│ │ [Play button] [Add]  │   │
│ └──────────────────────┘   │
│                            │
│ Stories                    │
│ ┌────┐ ┌────┐ ┌────┐       │
│ │Story│ │Story│ │Story│     │
│ │ 1   │ │ 2   │ │ 3   │     │
│ └────┘ └────┘ └────┘       │
│                            │
├────────────────────────────┤
│ 🏠   📚   🧘   🔮   👤    │
└────────────────────────────┘
```

### Vedic Astrology Calculator
```
┌────────────────────────────┐
│ Birth Chart            📋  │
├────────────────────────────┤
│ Birth Details              │
│ ┌──────────────────────┐   │
│ │ Date: [Date picker]  │   │
│ │ Time: [Time picker]  │   │
│ │ Place: [Location]    │   │
│ │ [Calculate button]   │   │
│ └──────────────────────┘   │
│                            │
│ Chart Style                │
│ ○ North Indian             │
│ ● South Indian             │
│                            │
│ ┌──────────────────────┐   │
│ │                      │   │
│ │  [Birth Chart        │   │
│ │   Visualization]     │   │
│ │                      │   │
│ └──────────────────────┘   │
│                            │
│ Interpretations            │
│ ┌────────────┐ ┌─────────┐ │
│ │ Lagna      │ │ Rashi   │ │
│ └────────────┘ └─────────┘ │
│ ┌────────────┐ ┌─────────┐ │
│ │ Nakshatra  │ │ Doshas  │ │
│ └────────────┘ └─────────┘ │
│                            │
├────────────────────────────┤
│ 🏠   📚   🧘   🔮   👤    │
└────────────────────────────┘
```

### Scripture Library
```
┌────────────────────────────┐
│ Scripture Library      🔍  │
├────────────────────────────┤
│ Categories                 │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐│
│ │Veda│ │Upan│ │Gita│ │More││
│ │s   │ │isha│ │    │ │    ││
│ └────┘ └────┘ └────┘ └────┘│
│                            │
│ Recently Read              │
│ ┌──────────────────────┐   │
│ │ [Scripture name]     │   │
│ │ [Chapter/verse]      │   │
│ │ [Progress indicator] │   │
│ └──────────────────────┘   │
│                            │
│ All Texts                  │
│ ┌────────────────────┐     │
│ │ Bhagavad Gita      │     │
│ │ [Brief description]│     │
│ └────────────────────┘     │
│ ┌────────────────────┐     │
│ │ Yoga Sutras        │     │
│ │ [Brief description]│     │
│ └────────────────────┘     │
│ ┌────────────────────┐     │
│ │ Rig Veda           │     │
│ │ [Brief description]│     │
│ └────────────────────┘     │
│                            │
├────────────────────────────┤
│ 🏠   📚   🧘   🔮   👤    │
└────────────────────────────┘
```

### Scripture Reader
```
┌────────────────────────────┐
│ ← Bhagavad Gita        🔖  │
├────────────────────────────┤
│ Chapter 2, Verse 47        │
│                            │
│ Sanskrit                   │
│ ┌──────────────────────┐   │
│ │ कर्मण्येवाधिकारस्ते  │   │
│ │ मा फलेषु कदाचन।     │   │
│ │ मा कर्मफलहेतुर्भूर्मा│   │
│ │ ते सङ्गोऽस्त्वकर्मणि॥│   │
│ └──────────────────────┘   │
│                            │
│ Transliteration            │
│ ┌──────────────────────┐   │
│ │ karmaṇy-evādhikāras te │ │
│ │ mā phaleṣu kadācana   │ │
│ │ mā karma-phala-hetur  │ │
│ │ bhūr mā te saṅgo 'stv │ │
│ │ akarmaṇi              │ │
│ └──────────────────────┘   │
│                            │
│ Translation                │
│ ┌──────────────────────┐   │
│ │ You have a right to  │   │
│ │ perform your         │   │
│ │ prescribed duties,   │   │
│ │ but you are not      │   │
│ │ entitled to the      │   │
│ │ fruits of your       │   │
│ │ actions...           │   │
│ └──────────────────────┘   │
│                            │
│ ┌──────────────────────┐   │
│ │ 🧠 AI Explanation    │   │
│ └──────────────────────┘   │
│                            │
│ ◄ Previous   |   Next ►    │
│                            │
├────────────────────────────┤
│ 🏠   📚   🧘   🔮   👤    │
└────────────────────────────┘
```

### Mantra Journal
```
┌────────────────────────────┐
│ Mantra Journal         ➕  │
├────────────────────────────┤
│ Today's Practice           │
│ ┌──────────────────────┐   │
│ │ [Circular progress]  │   │
│ │ 108/108 completed    │   │
│ │ 15 minutes           │   │
│ └──────────────────────┘   │
│                            │
│ Current Streak: 7 days     │
│                            │
│ Recent Mantras             │
│ ┌──────────────────────┐   │
│ │ Om Namah Shivaya     │   │
│ │ Last: Today          │   │
│ │ [Start Practice]     │   │
│ └──────────────────────┘   │
│ ┌──────────────────────┐   │
│ │ Gayatri Mantra       │   │
│ │ Last: Yesterday      │   │
│ │ [Start Practice]     │   │
│ └──────────────────────┘   │
│                            │
│ Statistics                 │
│ ┌──────────────────────┐   │
│ │ [Calendar heatmap]   │   │
│ │ [Practice trends]    │   │
│ └──────────────────────┘   │
│                            │
├────────────────────────────┤
│ 🏠   📚   🧘   🔮   👤    │
└────────────────────────────┘
```

### Spiritual Path Quiz
```
┌────────────────────────────┐
│ Spiritual Path Quiz        │
├────────────────────────────┤
│                            │
│ Question 3 of 12           │
│ ┌──────────────────────┐   │
│ │ When facing a        │   │
│ │ challenge, you       │   │
│ │ typically:           │   │
│ └──────────────────────┘   │
│                            │
│ ○ Seek knowledge to        │
│   understand it better     │
│                            │
│ ○ Take action to solve     │
│   the problem directly     │
│                            │
│ ○ Surrender to a higher    │
│   power for guidance       │
│                            │
│ ○ Meditate to find inner   │
│   clarity                  │
│                            │
│                            │
│ ┌──────────────────────┐   │
│ │ [Previous] [Next]    │   │
│ └──────────────────────┘   │
│                            │
├────────────────────────────┤
│ 🏠   📚   🧘   🔮   👤    │
└────────────────────────────┘
```

### Quiz Results
```
┌────────────────────────────┐
│ Your Spiritual Path        │
├────────────────────────────┤
│ ┌──────────────────────┐   │
│ │ [Visual chart of     │   │
│ │ path distribution]   │   │
│ └──────────────────────┘   │
│                            │
│ Primary: Bhakti Yoga (42%) │
│ The path of devotion and   │
│ love for the divine.       │
│                            │
│ Secondary: Jnana Yoga (28%)│
│ The path of knowledge and  │
│ wisdom.                    │
│                            │
│ Recommendations            │
│ ┌──────────────────────┐   │
│ │ Deities to explore:  │   │
│ │ Krishna, Rama, Radha │   │
│ └──────────────────────┘   │
│ ┌──────────────────────┐   │
│ │ Practices:           │   │
│ │ Kirtan, Bhajan, Puja │   │
│ └──────────────────────┘   │
│ ┌──────────────────────┐   │
│ │ Scriptures:          │   │
│ │ Bhagavata Purana,    │   │
│ │ Bhagavad Gita        │   │
│ └──────────────────────┘   │
│                            │
│ [Save Results] [Share]     │
│                            │
├────────────────────────────┤
│ 🏠   📚   🧘   🔮   👤    │
└────────────────────────────┘
```

## Technical Implementation Plan

### Phase 1: Core Infrastructure
- Set up React project with TypeScript
- Configure Tailwind CSS with custom theme
- Create base component library
- Implement navigation structure
- Set up state management

### Phase 2: Feature Implementation
- Implement features in order of priority:
  1. Deity Discovery Cards (building on existing functionality)
  2. Vedic Scripture Library
  3. Daily Panchang & Muhurat Timing
  4. Vedic Astrology Calculator
  5. Spiritual Path Quiz
  6. Mantra Journal & Meditation Tracker

### Phase 3: Integration & Polish
- Ensure consistent UI across all features
- Optimize performance
- Add final animations and transitions
- Implement dark/light mode
- Add accessibility features

### Phase 4: Testing & Deployment
- Comprehensive testing across devices
- Performance optimization
- Final bug fixes
- Production build and deployment

## Next Steps
1. Create detailed component specifications
2. Set up project structure and base configuration
3. Implement core UI components
4. Begin development of highest priority features
