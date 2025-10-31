import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about-section');
    if (nextSection) {
      nextSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <button
        onClick={scrollToNext}
        className="flex flex-col items-center space-y-2 text-primary hover:text-primary/80 transition-cosmic group"
        aria-label="Scroll to next section"
      >
        <span className="text-sm font-body opacity-80 group-hover:opacity-100 transition-cosmic">
          Explore Journey
        </span>
        <div className="animate-bounce">
          <Icon 
            name="ChevronDown" 
            size={24} 
            className="cosmic-glow group-hover:cosmic-pulse" 
          />
        </div>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent opacity-60" />
      </button>
    </div>
  );
};

export default ScrollIndicator;