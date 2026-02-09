import React from 'react';
import { SmoothScrollProvider } from './SmoothScrollProvider';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-luxury-cream selection:bg-luxury-terracotta/30 selection:text-luxury-navy">
        {children}
      </div>
    </SmoothScrollProvider>
  );
};
