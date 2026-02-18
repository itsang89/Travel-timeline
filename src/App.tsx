import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trip, trips as initialTrips } from './data/trips';
import { Layout } from './app/Layout';
import { AddTripModal } from './components/AddTripModal/AddTripModal';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { StatsDashboard } from './components/Stats/StatsDashboard';
import { Timeline } from './components/Timeline/Timeline';
import { Footer } from './components/Footer/Footer';
import { CustomCursor } from './components/CustomCursor';

function App() {
  const [allTrips, setAllTrips] = useState<Trip[]>(initialTrips);
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState(false);

  const handleAddTrip = (trip: Trip): void => {
    setAllTrips((previousTrips) => [trip, ...previousTrips]);
  };

  return (
    <Layout>
      <CustomCursor />
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
        <div className="relative z-30 bg-luxury-cream">
          <StatsDashboard trips={allTrips} />
          <Timeline trips={allTrips} />
          <Footer onAddTripClick={() => setIsAddTripModalOpen(true)} />
        </div>
      </motion.div>
      <AddTripModal
        isOpen={isAddTripModalOpen}
        onClose={() => setIsAddTripModalOpen(false)}
        onSubmit={handleAddTrip}
      />
    </Layout>
  );
}

export default App;
