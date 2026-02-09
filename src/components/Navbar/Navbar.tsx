import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 px-6 py-4 transition-all duration-500",
        isScrolled ? "glass py-3" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-serif text-2xl font-bold tracking-tight text-luxury-navy"
        >
          TRAVELER
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 font-sans text-xs uppercase tracking-[0.2em] font-semibold text-luxury-navy/80">
          {['Timeline', 'Statistics', 'Destinations', 'About'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="relative group hover:text-luxury-terracotta transition-colors"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-terracotta transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-luxury-navy p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-luxury-cream/95 backdrop-blur-lg"
      >
        <div className="flex flex-col items-center gap-6 py-8 font-sans text-sm uppercase tracking-widest font-medium">
          {['Timeline', 'Statistics', 'Destinations', 'About'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-luxury-terracotta transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </motion.div>
    </header>
  );
};
