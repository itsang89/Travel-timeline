import React from 'react';
import { Layout } from './app/Layout';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { StatsDashboard } from './components/Stats/StatsDashboard';
import { Timeline } from './components/Timeline/Timeline';
import { Footer } from './components/Footer/Footer';
import { CustomCursor } from './components/CustomCursor';
import { motion } from 'framer-motion';

function App() {
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
          <StatsDashboard />
          <Timeline />
          <Footer />
        </div>
      </motion.div>
    </Layout>
  );
}

export default App;
