import React, { useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import ParticleField from './components/ParticleField';
import VortexEffect from './components/VortexEffect';
import HeroContent from './components/HeroContent';
import ScrollIndicator from './components/ScrollIndicator';

const HeroLanding = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery?.matches);

    const handleMotionChange = (e) => {
      setReducedMotion(e?.matches);
    };

    mediaQuery?.addEventListener('change', handleMotionChange);

    // Trigger load animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      mediaQuery?.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <Header />

      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, 
              rgba(21, 67, 103, 0.1) 0%, 
              rgba(1, 1, 1, 0.8) 50%, 
              rgba(1, 1, 1, 1) 100%)`
          }}
        />

        {/* Particle Field */}
        {!reducedMotion && <ParticleField />}

        {/* Vortex Effect */}
        {!reducedMotion && <VortexEffect />}

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(163, 255, 245, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(163, 255, 245, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center pt-16">
        <div 
          className={`w-full transition-cosmic duration-1000 ${
            isLoaded 
              ? 'opacity-100 translate-y-0' :'opacity-0 translate-y-8'
          }`}
        >
          <HeroContent />
        </div>
      </main>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Accessibility Features */}
      <div className="sr-only">
        <h1>Vikaskumar Dane - Full Stack Engineer Portfolio</h1>
        <p>
          Welcome to the cosmic portfolio of Vikaskumar Dane, a Full Stack Engineer 
          specializing in React, AWS, and innovative web solutions. Navigate through 
          the sections to explore experience, skills, and projects.
        </p>
      </div>

      {/* Skip to Content Link for Accessibility */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50
                   focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
    </div>
  );
};

export default HeroLanding;