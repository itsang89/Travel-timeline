import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-luxury-navy text-luxury-cream py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">
              Ready for your next <br />
              <span className="italic">adventure?</span>
            </h2>
            <p className="font-sans text-luxury-cream/60 max-w-md mb-10 text-lg leading-relaxed">
              Every trip is a story waiting to be told. Keep exploring, keep wandering, and keep making memories that last a lifetime.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#D48979' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-luxury-terracotta text-white rounded-full font-sans text-sm uppercase tracking-widest font-bold flex items-center gap-3 group transition-all duration-300"
            >
              Add New Trip
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
          
          <div className="lg:text-right">
            <div className="inline-flex flex-col gap-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-cream/40">Connect With Me</span>
              <div className="flex gap-6 justify-end">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.2, color: '#C17767' }}
                    className="w-12 h-12 rounded-full border border-luxury-cream/10 flex items-center justify-center transition-colors"
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-luxury-cream/10 flex flex-col md:row-reverse md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8 font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-cream/40">
            <a href="#" className="hover:text-luxury-terracotta transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-luxury-terracotta transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-luxury-terracotta transition-colors">Export PDF</a>
          </div>
          <p className="font-serif text-sm opacity-60">
            &copy; 2026 Travel Memories. Curated with love.
          </p>
        </div>
      </div>
    </footer>
  );
};
