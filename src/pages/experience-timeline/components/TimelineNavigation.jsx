import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineNavigation = ({ 
  experiences, 
  activeExperience, 
  onNavigate 
}) => {
  const scrollToExperience = (experienceId) => {
    const element = document.getElementById(`experience-${experienceId}`);
    if (element) {
      element?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      onNavigate(experienceId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block"
    >
      <div className="bg-card/80 backdrop-blur-cosmic border border-border rounded-xl p-4 cosmic-shadow">
        <div className="flex flex-col space-y-3">
          <div className="text-center mb-2">
            <Icon name="Navigation" size={20} className="text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground font-mono">Timeline</p>
          </div>
          
          {experiences?.map((exp, index) => (
            <Button
              key={exp?.id}
              variant={activeExperience === exp?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => scrollToExperience(exp?.id)}
              className={`w-full justify-start text-xs transition-cosmic ${
                activeExperience === exp?.id 
                  ? 'cosmic-glow' :'hover:bg-primary/10'
              }`}
            >
              <div className="flex items-center w-full">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  activeExperience === exp?.id 
                    ? 'bg-primary-foreground' 
                    : 'bg-primary/50'
                }`}></div>
                <span className="truncate font-mono">
                  {exp?.company?.substring(0, 8)}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineNavigation;