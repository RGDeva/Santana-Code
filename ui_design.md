# Santana Code - Mystical UI/UX Design Document

## Design Philosophy

Santana Code's UI design is inspired by the following principles:

1. **Minimalist Elegance**: Drawing from Naval Ravikant's philosophy of minimalism, the design eliminates unnecessary elements to focus on what truly matters. Each screen has a clear purpose with minimal distractions.

2. **Timeless Aesthetic**: The interface feels ancient yet modern, using design elements that transcend trends and connect to the eternal nature of Sanatana Dharma.

3. **Scripturally Grounded**: Visual elements are derived from authentic scriptural symbolism rather than clichéd representations.

4. **Meditative Experience**: The app creates a sense of calm and presence, with thoughtful transitions, comfortable reading spaces, and mindful interactions.

5. **Mystical yet Functional**: While maintaining an air of mystery and depth, the interface remains highly usable and intuitive.

## Color Palette

### Primary Colors
- **Deep Indigo** (#1A1A2E): Represents the cosmic night sky, consciousness
- **Sacred Gold** (#D4AF37): Represents divinity, transcendence
- **Sandalwood** (#CDA982): Represents ritual, tradition, grounding

### Secondary Colors
- **Lotus Pink** (#F9A1BC): Represents divine feminine energy
- **Rudraksha Brown** (#704214): Represents asceticism, spiritual practice
- **Tulsi Green** (#2D5A27): Represents healing, growth

### Functional Colors
- **Background Gradient**: Subtle gradient from deep indigo to slightly lighter shade
- **Text**: Off-white (#F5F5F5) on dark backgrounds, deep indigo on light backgrounds
- **Accent Elements**: Sacred gold for important actions and highlights
- **Alert/Warning**: Vermilion (#E34234)
- **Success/Positive**: Tulsi green

## Typography

### Primary Fonts
- **Headings**: "Cormorant Garamond" - Elegant serif font with spiritual gravitas
- **Body Text**: "Spectral" - Highly readable serif with excellent Sanskrit support
- **UI Elements**: "Poppins" - Clean sans-serif for buttons and small UI elements

### Typographic Hierarchy
- **App Title**: 32px Cormorant Garamond, light weight
- **Section Headings**: 24px Cormorant Garamond, regular weight
- **Card Titles**: 20px Cormorant Garamond, medium weight
- **Body Text**: 16px Spectral, regular weight
- **Secondary Text**: 14px Spectral, light weight
- **UI Elements**: 14px Poppins, medium weight

### Sanskrit Text
- Sanskrit text uses "Noto Sans Devanagari" with proper rendering support
- Sanskrit always accompanied by transliteration in Spectral italic

## Core UI Components

### Navigation
- **Bottom Navigation Bar**: Minimalist icons with subtle gold highlight for active section
- **Gesture Navigation**: Swipe between related content (cards, scriptures)
- **Back Navigation**: Subtle back button in upper left with transition animation
- **Menu Access**: Hidden drawer accessible via subtle icon or edge swipe

### Cards
- **Deity Cards**: Rounded corners, subtle shadow, image top with gradient overlay for text
- **Scripture Cards**: Paper-like texture, slight curl on edges, golden bookmark indicator
- **Information Cards**: Clean white/dark background with thin gold border

### Buttons
- **Primary Action**: Gold text/border on transparent background, full width
- **Secondary Action**: White/dark text on transparent background
- **Iconography**: Thin-line sacred symbols instead of standard icons

### Input Elements
- **Text Fields**: Minimal underline style with subtle animation on focus
- **Selection Controls**: Custom toggles resembling traditional oil lamps (on/off)
- **Date/Time Selection**: Celestial-inspired circular selectors

### Transitions & Animations
- **Page Transitions**: Gentle fade or reveal transitions between main sections
- **Card Animations**: Subtle elevation change on selection, smooth flip for details
- **Loading States**: Mandala-inspired loading animation
- **Micro-interactions**: Ripple effects resembling water droplets

## Screen Designs

### Home Screen
- **Background**: Deep indigo gradient with subtle cosmic pattern
- **Daily Panchang**: Prominently displayed at top with current date and key information
- **Quick Access Cards**: Horizontal scrolling cards for main features
- **Personalized Recommendations**: Based on spiritual path and previous usage
- **Daily Wisdom**: Quote or verse that changes daily

### Vedic Astrology Calculator
- **Input Form**: Clean, minimal form for birth details
- **Chart Visualization**: Toggle between North and South Indian styles
- **Interpretation**: Scrollable sections for different aspects of the chart
- **Dasha Timeline**: Horizontal timeline showing life periods

### Daily Panchang & Muhurat
- **Date Selection**: Minimal calendar with auspicious/inauspicious day indicators
- **Daily Overview**: Visual representation of day divided into periods
- **Muhurat Finder**: Activity selection leading to recommended times
- **Celestial Positions**: Minimalist visualization of planetary positions

### Deity Discovery Cards
- **Card Grid/Stack**: Elegant grid transforming to swipeable stack on selection
- **Card Detail**: Expanding animation revealing full information
- **Deity Animation**: Subtle, respectful animation unique to each deity
- **Mantra Section**: Audio player with minimalist waveform visualization

### Vedic Scripture Library
- **Scripture Selection**: Textured scrolls/book representations
- **Reading View**: Clean, distraction-free reading experience
- **Search Interface**: Elegant search with highlighted results
- **Verse Explanation**: Expandable sections for AI explanations

### Mantra Journal
- **Journal Entry**: Minimal form with counter and timer
- **Statistics View**: Abstract visualization of practice consistency
- **Streak Calendar**: Elegant calendar showing practice history
- **Goal Setting**: Simple, non-intrusive goal visualization

### Spiritual Path Quiz
- **Question Screen**: Single question focus with subtle background shift between questions
- **Result Visualization**: Artistic representation of spiritual path balance
- **Recommendations**: Elegantly presented cards for recommended practices

## Responsive Design Strategy

### Mobile (Primary Experience)
- Full-featured vertical scrolling experience
- Bottom navigation for main sections
- Card-based content presentation
- Gesture-heavy interaction

### Tablet
- Two-column layout for appropriate screens
- Persistent navigation sidebar option
- Enhanced visualizations for charts and mandalas
- Touch-optimized but with more content density

### Desktop
- Multi-column layout with sidebar navigation
- Expanded visualizations and data presentations
- Keyboard shortcuts for power users
- Optimized reading experience for scripture study

## Accessibility Considerations

- High contrast text options
- Adjustable text size throughout the app
- Alternative text for spiritual imagery
- Screen reader compatibility for Sanskrit terms with pronunciation guidance
- Colorblind-friendly palette alternatives

## Dark/Light Mode

- **Default**: Dark mode (deep indigo background) for mystical experience
- **Light Alternative**: Light parchment-like background with dark text
- **Auto-switching**: Based on time of day or system settings
- **Ritual Mode**: Ultra-dark for meditation sessions with minimal UI

## Animation Guidelines

- Animations should be subtle and meaningful, never flashy
- Transitions between 300-500ms for main elements
- Micro-interactions between 150-300ms
- Easing functions favor gentle ease-in-out curves
- All animations can be reduced/disabled for performance or preference

## Implementation Notes

- Use Framer Motion for primary animations
- Implement custom hooks for consistent animation behaviors
- Create a comprehensive component library before full implementation
- Ensure all components are fully responsive
- Test on low-end devices to ensure performance
