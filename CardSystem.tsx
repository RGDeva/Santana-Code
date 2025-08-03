import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Search, Volume2 } from 'lucide-react';
import CardStack from './CardStack';
import AnimationFramework from './AnimationFramework';

interface CardData {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  details?: string[];
  animation?: string | React.ReactNode;
}

interface Category {
  id: string;
  title: string;
  cards: CardData[];
  type: 'deity' | 'scripture';
  color: {
    bg: string;
    text: string;
  };
}

interface CardSystemProps {
  darkMode?: boolean;
  audioEnabled?: boolean;
}

const CardSystem: React.FC<CardSystemProps> = ({ darkMode = false, audioEnabled = false }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  
  // Audio narration references
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    // Load and process data from JSON files
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Import all data files
        const trimurtiData = await import('../data/deities_trimurti.json');
        const trideviData = await import('../data/deities_tridevi.json');
        const vedasData = await import('../data/scriptures_vedas.json');
        const upanishadsData = await import('../data/scriptures_upanishads.json');
        const epicsData = await import('../data/scriptures_epics.json');
        const ramayana = await import('../data/scriptures_ramayana.json');
        const puranasData = await import('../data/scriptures_puranas.json');
        
        // Process deity data
        const deityCategories: Category[] = [
          {
            id: 'trimurti',
            title: 'Trimurti',
            type: 'deity',
            color: { bg: darkMode ? 'bg-amber-900' : 'bg-amber-50', text: darkMode ? 'text-amber-100' : 'text-amber-900' },
            cards: trimurtiData.deities.map(deity => ({
              id: deity.id,
              title: deity.name.english,
              subtitle: deity.name.sanskrit,
              content: deity.description,
              details: [
                `Role: ${deity.cosmic_role}`,
                `Symbols: ${deity.attributes.symbols.join(', ')}`,
                `Vehicle: ${deity.attributes.vehicles.join(', ')}`,
                `Weapons: ${deity.attributes.weapons.join(', ')}`,
                ...deity.stories.map(story => `Story: ${story.title} - ${story.summary}`)
              ],
              animation: deity.id.toLowerCase()
            }))
          },
          {
            id: 'tridevi',
            title: 'Tridevi',
            type: 'deity',
            color: { bg: darkMode ? 'bg-rose-900' : 'bg-rose-50', text: darkMode ? 'text-rose-100' : 'text-rose-900' },
            cards: trideviData.deities.map(deity => ({
              id: deity.id,
              title: deity.name.english,
              subtitle: deity.name.sanskrit,
              content: deity.description,
              details: [
                `Role: ${deity.cosmic_role}`,
                `Symbols: ${deity.attributes.symbols.join(', ')}`,
                `Vehicle: ${deity.attributes.vehicles.join(', ')}`,
                `Weapons: ${deity.attributes.weapons.join(', ')}`,
                ...deity.stories.map(story => `Story: ${story.title} - ${story.summary}`)
              ],
              animation: deity.id.toLowerCase()
            }))
          }
        ];
        
        // Process scripture data
        const scriptureCategories: Category[] = [
          {
            id: 'vedas',
            title: 'Vedas',
            type: 'scripture',
            color: { bg: darkMode ? 'bg-emerald-900' : 'bg-emerald-50', text: darkMode ? 'text-emerald-100' : 'text-emerald-900' },
            cards: vedasData.scriptures.map(scripture => ({
              id: scripture.id,
              title: scripture.name.english,
              subtitle: scripture.name.sanskrit,
              content: scripture.description,
              details: [
                `Structure: ${scripture.structure.parts}`,
                `Summary: ${scripture.summary}`,
                ...scripture.key_concepts.map(concept => `${concept.name}: ${concept.description}`)
              ],
              animation: 'vedas'
            }))
          },
          {
            id: 'upanishads',
            title: 'Upanishads',
            type: 'scripture',
            color: { bg: darkMode ? 'bg-blue-900' : 'bg-blue-50', text: darkMode ? 'text-blue-100' : 'text-blue-900' },
            cards: upanishadsData.scriptures.map(scripture => ({
              id: scripture.id,
              title: scripture.name.english,
              subtitle: scripture.name.sanskrit,
              content: scripture.description,
              details: [
                `Historical Context: ${scripture.historical_context}`,
                `Summary: ${scripture.summary}`,
                ...scripture.key_concepts.map(concept => `${concept.name}: ${concept.description}`)
              ],
              animation: 'upanishads'
            }))
          },
          {
            id: 'epics',
            title: 'Epics',
            type: 'scripture',
            color: { bg: darkMode ? 'bg-purple-900' : 'bg-purple-50', text: darkMode ? 'text-purple-100' : 'text-purple-900' },
            cards: epicsData.scriptures.map(scripture => ({
              id: scripture.id,
              title: scripture.name.english,
              subtitle: scripture.name.sanskrit,
              content: scripture.description,
              details: [
                `Historical Context: ${scripture.historical_context}`,
                `Summary: ${scripture.summary}`,
                ...scripture.key_concepts.map(concept => `${concept.name}: ${concept.description}`)
              ],
              animation: scripture.id === 'bhagavad_gita' ? 'gita' : 'epics'
            }))
          },
          {
            id: 'ramayana',
            title: 'Ramayana',
            type: 'scripture',
            color: { bg: darkMode ? 'bg-orange-900' : 'bg-orange-50', text: darkMode ? 'text-orange-100' : 'text-orange-900' },
            cards: ramayana.scriptures.map(scripture => ({
              id: scripture.id,
              title: scripture.name.english,
              subtitle: scripture.name.sanskrit,
              content: scripture.description,
              details: [
                `Historical Context: ${scripture.historical_context}`,
                `Summary: ${scripture.summary}`,
                ...scripture.key_concepts.map(concept => `${concept.name}: ${concept.description}`)
              ],
              animation: 'ramayana'
            }))
          },
          {
            id: 'puranas',
            title: 'Puranas',
            type: 'scripture',
            color: { bg: darkMode ? 'bg-teal-900' : 'bg-teal-50', text: darkMode ? 'text-teal-100' : 'text-teal-900' },
            cards: puranasData.scriptures.map(scripture => ({
              id: scripture.id,
              title: scripture.name.english,
              subtitle: scripture.name.sanskrit,
              content: scripture.description,
              details: [
                `Summary: ${scripture.summary}`,
                ...(scripture.texts ? scripture.texts.slice(0, 5).map(text => `${text.name}: ${text.description}`) : [])
              ],
              animation: 'puranas'
            }))
          }
        ];
        
        // Combine all categories
        const allCategories = [...deityCategories, ...scriptureCategories];
        setCategories(allCategories);
        
        // Set initial active category
        if (deityCategories.length > 0) {
          setActiveCategory(deityCategories[0].id);
        }
        
        // Initialize audio elements for narration
        allCategories.forEach(category => {
          category.cards.forEach(card => {
            // In a real app, we would load actual audio files
            // For this prototype, we'll use the Web Speech API
            audioRefs.current[card.id] = new Audio();
          });
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [darkMode]);

  // Handle audio narration
  useEffect(() => {
    if (audioEnabled && currentCardId) {
      // In a real app, we would play pre-recorded audio files
      // For this prototype, we'll use the Web Speech API
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance();
        
        // Find the current card
        let cardContent = '';
        categories.forEach(category => {
          const card = category.cards.find(c => c.id === currentCardId);
          if (card) {
            cardContent = `${card.title}. ${card.content}`;
          }
        });
        
        utterance.text = cardContent;
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        
        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        window.speechSynthesis.speak(utterance);
        
        return () => {
          window.speechSynthesis.cancel();
        };
      }
    }
  }, [audioEnabled, currentCardId, categories]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCardChange = (cardId: string) => {
    setCurrentCardId(cardId);
  };

  const filteredCategories = searchTerm
    ? categories.map(category => ({
        ...category,
        cards: category.cards.filter(card => 
          card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (card.subtitle && card.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
          card.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.cards.length > 0)
    : categories;

  const activeCardStack = filteredCategories.find(category => category.id === activeCategory);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-amber-100 to-orange-100'} p-4`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-3xl font-bold text-center ${darkMode ? 'text-amber-100' : 'text-amber-900'} mb-6`}>
          Hindu Deities & Scriptures
        </h1>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search deities, scriptures, concepts..."
            value={searchTerm}
            onChange={handleSearch}
            className={`w-full p-3 pl-10 rounded-lg ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-amber-500' 
                : 'border border-amber-300 focus:ring-amber-500'
            } focus:outline-none focus:ring-2`}
          />
          <Search className={`absolute left-3 top-3.5 ${darkMode ? 'text-gray-400' : 'text-amber-500'}`} size={18} />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${darkMode ? 'border-amber-500' : 'border-amber-500'}`}></div>
          </div>
        ) : (
          <>
            {/* Category Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 mb-6">
              {filteredCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? `${category.color.bg} ${category.color.text} font-bold`
                      : darkMode 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
            
            {/* Card Stack */}
            {activeCardStack && (
              <div className="mb-8">
                <CardStack
                  cards={activeCardStack.cards.map(card => ({
                    ...card,
                    animation: activeCardStack.type === 'deity' 
                      ? <AnimationFramework type={card.animation as string || ''} category="deity" />
                      : <AnimationFramework type={card.animation as string || ''} category="scripture" />
                  }))}
                  category={activeCardStack.title}
                  backgroundColor={activeCardStack.color.bg}
                  textColor={activeCardStack.color.text}
                  onCardChange={handleCardChange}
                  audioEnabled={audioEnabled}
                />
              </div>
            )}
            
            {/* Audio Controls */}
            {audioEnabled && (
              <div className={`fixed bottom-20 left-4 p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg flex items-center gap-2`}>
                <Volume2 size={18} className={darkMode ? 'text-amber-400' : 'text-amber-600'} />
                <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Audio narration enabled</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CardSystem;
