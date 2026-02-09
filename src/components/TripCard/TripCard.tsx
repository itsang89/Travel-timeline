import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Trip } from '@/data/trips';
import { PhotoCarousel } from './PhotoCarousel';
import { TripMap } from './TripMap';
import { ExpenseDonut } from './ExpenseDonut';
import { WeatherWidget } from './WeatherWidget';

interface TripCardProps {
  trip: Trip;
  index: number;
  isLeft: boolean;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, index, isLeft }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={`relative w-full md:w-[calc(50%-40px)] ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}
    >
      {/* Timeline Node Connector */}
      <div className={`absolute top-10 hidden md:block w-10 h-[2px] bg-luxury-terracotta z-10 ${isLeft ? '-right-10' : '-left-10'}`} />
      <div className={`absolute top-[34px] hidden md:block w-4 h-4 rounded-full border-2 border-luxury-terracotta bg-luxury-cream z-20 ${isLeft ? '-right-[48px]' : '-left-[48px]'}`} />

      <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl shadow-luxury-navy/5 border border-luxury-navy/5 group/card transition-all duration-500 hover:shadow-luxury-navy/10 hover:-translate-y-2">
        {/* Carousel Section */}
        <PhotoCarousel photos={trip.photos} />

        {/* Content Section */}
        <div className="p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-luxury-terracotta mb-3">
                <MapPin size={16} strokeWidth={2} />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold">{trip.location}</span>
              </div>
              <h3 className="font-serif text-4xl font-bold text-luxury-navy mb-4 group-hover/card:text-luxury-terracotta transition-colors">{trip.destination}</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-luxury-cream px-4 py-2 rounded-full">
                  <Calendar size={14} className="text-luxury-navy/40" />
                  <span className="font-sans text-[10px] font-bold text-luxury-navy/80 uppercase tracking-widest">{trip.dateRange}</span>
                </div>
                <div className="flex items-center gap-2 bg-luxury-navy/5 px-4 py-2 rounded-full">
                  <Clock size={14} className="text-luxury-navy/40" />
                  <span className="font-sans text-[10px] font-bold text-luxury-navy/80 uppercase tracking-widest">{trip.duration}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-12">
              <section>
                <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-navy/30 mb-6">Location</h4>
                <TripMap coordinates={trip.coordinates} location={trip.location} />
              </section>

              <section>
                <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-navy/30 mb-6">Weather</h4>
                <WeatherWidget {...trip.weather} />
              </section>
            </div>

            <div className="space-y-12">
              <section>
                <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-navy/30 mb-6">Expenses</h4>
                <ExpenseDonut expenses={trip.expenses} totalCost={trip.totalCost} />
              </section>

              <section>
                <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-navy/30 mb-6">Memories</h4>
                <div className="relative pl-6 py-1">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-luxury-terracotta/30" />
                  <p className="font-serif text-lg leading-relaxed text-luxury-navy/80 italic">
                    "{trip.notes}"
                  </p>
                </div>
              </section>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-luxury-navy/5 flex flex-wrap gap-3">
            {trip.tags.map(tag => (
              <span 
                key={tag}
                className="px-4 py-2 bg-luxury-sage/10 text-luxury-sage rounded-full font-sans text-[10px] font-bold uppercase tracking-widest hover:bg-luxury-sage hover:text-white transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
