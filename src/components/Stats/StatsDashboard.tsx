import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Navigation, Star } from 'lucide-react';
import { Trip } from '@/data/trips';
import { getTotalRouteDistanceKm, getTripCountry } from '@/data/tripMetrics';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
}

interface StatsDashboardProps {
  trips: Trip[];
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, suffix = '', delay = 0 }) => {
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
      className="glass flex flex-col items-center rounded-2xl p-8 text-center group cursor-default transition-all duration-300"
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-luxury-terracotta/10 text-luxury-terracotta group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div className="mb-2 font-serif text-4xl font-bold text-luxury-navy">
        {current}
        {suffix}
      </div>
      <div className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-navy/40">{label}</div>
    </motion.div>
  );
};

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ trips }) => {
  const uniqueCountriesCount = new Set(trips.map((trip) => getTripCountry(trip))).size;
  const totalDistanceEstimate = Math.round(getTotalRouteDistanceKm(trips));
  const uniqueTags = new Set(trips.flatMap((trip) => trip.tags)).size;

  return (
    <section className="max-w-7xl mx-auto px-6 py-24" id="statistics">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Globe size={28} strokeWidth={1.5} />} label="Countries Visited" value={uniqueCountriesCount} delay={0.1} />
        <StatCard icon={<Navigation size={28} strokeWidth={1.5} />} label="KM Traveled" value={totalDistanceEstimate} suffix="+" delay={0.2} />
        <StatCard icon={<MapPin size={28} strokeWidth={1.5} />} label="Total Trips" value={trips.length} delay={0.3} />
        <StatCard icon={<Star size={28} strokeWidth={1.5} />} label="Unique Tags" value={uniqueTags} delay={0.4} />
      </div>
    </section>
  );
};
