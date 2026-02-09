import React from 'react';
import { Sun, Cloud, CloudRain, Thermometer, Leaf, Snowflake } from 'lucide-react';

interface WeatherWidgetProps {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ temp, condition, season }) => {
  const getIcon = () => {
    switch (condition) {
      case 'sunny': return <Sun className="text-orange-400" size={32} strokeWidth={1.5} />;
      case 'cloudy': return <Cloud className="text-gray-400" size={32} strokeWidth={1.5} />;
      case 'rainy': return <CloudRain className="text-blue-400" size={32} strokeWidth={1.5} />;
    }
  };

  const getSeasonIcon = () => {
    switch (season) {
      case 'Spring': return <Leaf className="text-luxury-sage" size={16} strokeWidth={1.5} />;
      case 'Summer': return <Sun className="text-orange-400" size={16} strokeWidth={1.5} />;
      case 'Autumn': return <Leaf className="text-luxury-terracotta" size={16} strokeWidth={1.5} />;
      case 'Winter': return <Snowflake className="text-blue-300" size={16} strokeWidth={1.5} />;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
            {getIcon()}
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xs uppercase tracking-widest font-bold text-luxury-navy/40">Condition</span>
            <span className="font-serif text-xl font-bold capitalize">{condition}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="font-sans text-xs uppercase tracking-widest font-bold text-luxury-navy/40">Season</span>
          <div className="flex items-center gap-2">
            {getSeasonIcon()}
            <span className="font-serif text-xl font-bold">{season}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-navy/40">Temperature</span>
          <span className="font-serif font-bold text-luxury-navy">{temp}°C</span>
        </div>
        <div className="h-2 w-full bg-luxury-navy/5 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 via-orange-400 to-red-500 transition-all duration-1000 ease-out"
            style={{ width: `${(temp + 10) * 2}%` }} // Simplified mapping
          />
        </div>
      </div>
    </div>
  );
};
