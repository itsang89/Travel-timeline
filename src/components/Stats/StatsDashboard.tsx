import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Globe, MapPin, Navigation, Star } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, suffix = "", delay = 0 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCurrent(value);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(increment * currentStep));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      className="glass p-8 rounded-2xl flex flex-col items-center text-center group cursor-default transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-full bg-luxury-terracotta/10 flex items-center justify-center text-luxury-terracotta mb-6 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div className="font-serif text-4xl font-bold text-luxury-navy mb-2">
        {current}{suffix}
      </div>
      <div className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-navy/40">
        {label}
      </div>
    </motion.div>
  );
};

export const StatsDashboard: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" id="statistics">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          icon={<Globe size={28} strokeWidth={1.5} />} 
          label="Countries Visited" 
          value={12} 
          delay={0.1}
        />
        <StatCard 
          icon={<Navigation size={28} strokeWidth={1.5} />} 
          label="KM Traveled" 
          value={45800} 
          suffix="+"
          delay={0.2}
        />
        <StatCard 
          icon={<MapPin size={28} strokeWidth={1.5} />} 
          label="Total Trips" 
          value={24} 
          delay={0.3}
        />
        <StatCard 
          icon={<Star size={28} strokeWidth={1.5} />} 
          label="Favorited Spots" 
          value={86} 
          delay={0.4}
        />
      </div>
    </section>
  );
};
