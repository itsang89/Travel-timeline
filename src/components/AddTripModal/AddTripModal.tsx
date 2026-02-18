import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Trip } from '@/data/trips';

interface AddTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (trip: Trip) => void;
}

interface AddTripFormData {
  destination: string;
  location: string;
  latitude: string;
  longitude: string;
  startDate: string;
  endDate: string;
  duration: string;
  temp: string;
  condition: Trip['weather']['condition'];
  season: Trip['weather']['season'];
  totalCost: string;
  notes: string;
  tags: string;
  photos: string;
}

const initialFormData: AddTripFormData = {
  destination: '',
  location: '',
  latitude: '',
  longitude: '',
  startDate: '',
  endDate: '',
  duration: '',
  temp: '',
  condition: 'sunny',
  season: 'Summer',
  totalCost: '',
  notes: '',
  tags: '',
  photos: ''
};

const formatDate = (value: string): string => {
  if (!value) {
    return '';
  }

  const parsedDate = new Date(`${value}T00:00:00`);
  return parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export const AddTripModal: React.FC<AddTripModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<AddTripFormData>(initialFormData);

  const canSubmit = useMemo(() => {
    return (
      formData.destination.trim() !== '' &&
      formData.location.trim() !== '' &&
      formData.latitude.trim() !== '' &&
      formData.longitude.trim() !== '' &&
      formData.startDate.trim() !== '' &&
      formData.endDate.trim() !== '' &&
      formData.duration.trim() !== '' &&
      formData.totalCost.trim() !== '' &&
      formData.notes.trim() !== ''
    );
  }, [formData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleClose = (): void => {
    setFormData(initialFormData);
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const latitude = Number(formData.latitude);
    const longitude = Number(formData.longitude);
    const totalCost = Number(formData.totalCost);
    const temperature = Number(formData.temp || '22');

    if (Number.isNaN(latitude) || Number.isNaN(longitude) || Number.isNaN(totalCost) || Number.isNaN(temperature)) {
      return;
    }

    const dateRange = `${formatDate(formData.startDate)} - ${formatDate(formData.endDate)}`;
    const parsedTags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    const parsedPhotos = formData.photos
      .split(',')
      .map((photo) => photo.trim())
      .filter((photo) => photo.length > 0);

    const generatedTrip: Trip = {
      id: crypto.randomUUID(),
      destination: formData.destination.trim(),
      location: formData.location.trim(),
      coordinates: [latitude, longitude],
      dateRange,
      duration: formData.duration.trim(),
      weather: {
        temp: temperature,
        condition: formData.condition,
        season: formData.season
      },
      expenses: [
        { category: 'Accommodation', amount: Math.round(totalCost * 0.4), color: '#C17767' },
        { category: 'Food', amount: Math.round(totalCost * 0.25), color: '#8AA399' },
        { category: 'Activities', amount: Math.round(totalCost * 0.2), color: '#1A2238' },
        { category: 'Transport', amount: Math.max(0, totalCost - Math.round(totalCost * 0.85)), color: '#E5E7EB' }
      ],
      totalCost,
      notes: formData.notes.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['Adventure'],
      photos: parsedPhotos.length > 0 ? parsedPhotos : [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
      ]
    };

    onSubmit(generatedTrip);
    setFormData(initialFormData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-6"
        >
          <div className="absolute inset-0 bg-luxury-navy/70" onClick={handleClose} />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl rounded-3xl bg-luxury-cream p-8 shadow-2xl md:p-10"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-6 top-6 text-luxury-navy/60 transition-colors hover:text-luxury-terracotta"
              aria-label="Close add trip form"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-navy/50">New Memory</p>
              <h3 className="mt-3 font-serif text-4xl text-luxury-navy">Add a New Trip</h3>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <input name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination (e.g. Bali, Indonesia)" className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta md:col-span-2" />
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Location (e.g. Ubud, Bali)" className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta md:col-span-2" />
              <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta" />
              <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta" />
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta" />
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta" />
              <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (e.g. 7 Days)" className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta" />
              <input type="number" name="totalCost" value={formData.totalCost} onChange={handleChange} placeholder="Total Cost (USD)" className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta" />
              <input type="number" name="temp" value={formData.temp} onChange={handleChange} placeholder="Avg Temp (C)" className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta" />
              <select name="condition" value={formData.condition} onChange={handleChange} className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta">
                <option value="sunny">Sunny</option>
                <option value="cloudy">Cloudy</option>
                <option value="rainy">Rainy</option>
              </select>
              <select name="season" value={formData.season} onChange={handleChange} className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta">
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
              </select>
              <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta" />
              <input name="photos" value={formData.photos} onChange={handleChange} placeholder="Photo URLs (comma separated)" className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta" />
              <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Share a memory from this trip..." rows={4} className="rounded-xl border border-luxury-navy/15 bg-white px-4 py-3 font-sans text-sm text-luxury-navy outline-none focus:border-luxury-terracotta md:col-span-2" />

              <div className="flex justify-end gap-3 md:col-span-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-full border border-luxury-navy/20 px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] font-bold text-luxury-navy transition-colors hover:border-luxury-navy/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="rounded-full bg-luxury-terracotta px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] font-bold text-white transition-all hover:bg-[#D48979] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Save Trip
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
