import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Search } from 'lucide-react';
import { trips } from '@/data/trips';
import { TripCard } from '../TripCard/TripCard';

const filters = [
  { id: 'all', label: 'All' },
  { id: '2025', label: '2025' },
  { id: '2024', label: '2024' },
  { id: 'Asia', label: 'Asia' },
  { id: 'Europe', label: 'Europe' },
  { id: 'Americas', label: 'Americas' }
];

export const Timeline: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      const matchesFilter = activeFilter === 'all' || 
        trip.dateRange.includes(activeFilter) || 
        trip.tags.some(tag => tag.includes(activeFilter)) ||
        (activeFilter === 'Asia' && trip.destination.includes('Japan')) ||
        (activeFilter === 'Europe' && trip.destination.includes('Greece')) ||
        (activeFilter === 'Americas' && false); // Add logic as needed
      
      const matchesSearch = trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.notes.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="relative py-24 px-6 min-h-screen" id="timeline">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl text-luxury-navy mb-12"
          >
            A Journey Through <span className="italic">Time</span>
          </motion.h2>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-24">
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative px-6 py-2 font-sans text-xs uppercase tracking-widest font-bold transition-colors ${
                    activeFilter === filter.id ? 'text-luxury-terracotta' : 'text-luxury-navy/40 hover:text-luxury-navy'
                  }`}
                >
                  {filter.label}
                  {activeFilter === filter.id && (
                    <motion.div 
                      layoutId="activeFilter"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-luxury-terracotta"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="relative group">
              <motion.div 
                animate={{ width: isSearchFocused ? 280 : 200 }}
                className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300 ${
                  isSearchFocused ? 'border-luxury-terracotta bg-white shadow-lg' : 'border-luxury-navy/10 bg-luxury-navy/5'
                }`}
              >
                <Search size={16} className={isSearchFocused ? 'text-luxury-terracotta' : 'text-luxury-navy/40'} />
                <input 
                  type="text" 
                  placeholder="Search memories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="bg-transparent border-none outline-none font-sans text-sm w-full placeholder:text-luxury-navy/20"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-luxury-navy/10 hidden md:block" />
          
          {/* Animated Progress Line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-luxury-terracotta origin-top z-10 hidden md:block"
          />

          <div className="space-y-32">
            <AnimatePresence mode="popLayout">
              {filteredTrips.map((trip, index) => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  index={index}
                  isLeft={index % 2 === 0}
                />
              ))}
            </AnimatePresence>
            
            {filteredTrips.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="font-serif text-2xl text-luxury-navy/20 italic">No memories found for this filter...</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
