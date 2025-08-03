import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DeityCard, { Deity } from './DeityCard';

interface DeityDiscoveryProps {
  onSelectDeity?: (deity: Deity | null) => void;
}

const DeityDiscovery: React.FC<DeityDiscoveryProps> = ({ onSelectDeity }) => {
  const [deities, setDeities] = useState<Deity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedDeityId, setExpandedDeityId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Deities' },
    { id: 'trimurti', name: 'Trimurti' },
    { id: 'tridevi', name: 'Tridevi' },
    { id: 'avatars', name: 'Avatars' },
    { id: 'other', name: 'Other Deities' }
  ];
  
  // Fetch deities data
  useEffect(() => {
    const fetchDeities = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        const response = await fetch('/data/deities.json');
        const data = await response.json();
        setDeities(data.deities);
        setLoading(false);
      } catch (err) {
        setError('Failed to load deities data');
        setLoading(false);
        console.error('Error loading deities:', err);
      }
    };
    
    fetchDeities();
  }, []);
  
  // Filter deities based on search and category
  const filteredDeities = deities.filter(deity => {
    const matchesSearch = 
      searchQuery === '' || 
      deity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deity.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      filterCategory === 'all' || 
      (filterCategory === 'trimurti' && ['brahma', 'vishnu', 'shiva'].includes(deity.id)) ||
      (filterCategory === 'tridevi' && ['saraswati', 'lakshmi', 'parvati'].includes(deity.id)) ||
      (filterCategory === 'avatars' && ['krishna', 'rama'].includes(deity.id)) ||
      (filterCategory === 'other' && !['brahma', 'vishnu', 'shiva', 'saraswati', 'lakshmi', 'parvati', 'krishna', 'rama'].includes(deity.id));
      
    return matchesSearch && matchesCategory;
  });
  
  // Handle deity card expansion
  const handleExpandDeity = (deityId: string) => {
    setExpandedDeityId(deityId);
    const selectedDeity = deities.find(d => d.id === deityId) || null;
    if (onSelectDeity) {
      onSelectDeity(selectedDeity);
    }
  };
  
  // Handle deity card closing
  const handleCloseDeity = () => {
    setExpandedDeityId(null);
    if (onSelectDeity) {
      onSelectDeity(null);
    }
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle category filter change
  const handleCategoryChange = (categoryId: string) => {
    setFilterCategory(categoryId);
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sacred-gold"></div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-deep-indigo-800 text-sacred-gold rounded-md"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className="deity-discovery">
      {/* Header with search and filters */}
      <div className="mb-6 space-y-4">
        <motion.h1 
          className="text-3xl text-sacred-gold font-cormorant text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Deity Discovery
        </motion.h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search deities..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-deep-indigo-900 border-b border-sacred-gold text-off-white p-2 pl-10 focus:outline-none focus:border-lotus-pink transition-colors rounded-md"
            />
            <div className="absolute left-3 top-2.5 text-sacred-gold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Category filters */}
          <div className="flex overflow-x-auto space-x-2 pb-1 hide-scrollbar">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap ${
                  filterCategory === category.id 
                    ? 'bg-sacred-gold text-deep-indigo-900' 
                    : 'bg-deep-indigo-800 text-off-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Deities grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredDeities.map(deity => (
            <motion.div
              key={deity.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <DeityCard
                deity={deity}
                isExpanded={expandedDeityId === deity.id}
                onExpand={() => handleExpandDeity(deity.id)}
                onClose={handleCloseDeity}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* No results message */}
      {filteredDeities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-off-white text-lg">No deities found matching your search.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-sacred-gold bg-opacity-20 text-sacred-gold rounded-md"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DeityDiscovery;
