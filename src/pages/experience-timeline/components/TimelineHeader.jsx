import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TimelineHeader = () => {
  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "backOut"
      }
    }
  };

  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="text-center mb-20"
    >
      {/* Cosmic Icon */}
      <motion.div
        variants={iconVariants}
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center cosmic-glow"
      >
        <Icon name="Clock" size={32} className="text-primary-foreground" />
      </motion.div>
      {/* Main Heading */}
      <motion.h1
        className="font-headline text-4xl lg:text-5xl text-foreground mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Vikaskumar Dane's Professional Journey
      </motion.h1>
      {/* Subtitle */}
      <motion.p
        className="text-muted-foreground text-lg lg:text-xl font-body max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        A chronological exploration through career milestones, technical growth, and measurable achievements that define my evolution as a Full Stack Engineer.
      </motion.p>
      {/* Career Stats */}
      <motion.div
        className="flex justify-center items-center mt-8 space-x-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="text-center">
          <div className="text-2xl font-headline text-primary">2.5+</div>
          <div className="text-xs text-muted-foreground font-mono">Years Experience</div>
        </div>
        <div className="w-px h-8 bg-border"></div>
        <div className="text-center">
          <div className="text-2xl font-headline text-primary">10+</div>
          <div className="text-xs text-muted-foreground font-mono">Projects Delivered</div>
        </div>
        <div className="w-px h-8 bg-border"></div>
        <div className="text-center">
          <div className="text-2xl font-headline text-primary">10+</div>
          <div className="text-xs text-muted-foreground font-mono">Technologies Mastered</div>
        </div>
      </motion.div>
      {/* Scroll Indicator */}
      <motion.div
        className="mt-12 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-muted-foreground text-sm font-mono mb-2">Scroll to explore</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon name="ChevronDown" size={20} className="text-primary" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TimelineHeader;