import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TimelineItem = ({ 
  experience, 
  index, 
  isLast = false,
  onItemClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { 
    threshold: 0.3,
    once: true 
  });

  const handleClick = () => {
    if (onItemClick) {
      onItemClick(experience?.id);
    }
  };

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -50 : 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
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
        duration: 0.5,
        delay: index * 0.1 + 0.3,
        ease: "backOut"
      }
    }
  };

  return (
    <motion.div
      ref={itemRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`relative flex items-center ${
        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
      } mb-16 group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Timeline Content Card */}
      <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
        <motion.div
          className={`bg-card border border-border rounded-xl p-6 cursor-pointer transition-cosmic ${
            isHovered ? 'cosmic-glow scale-105' : 'cosmic-shadow'
          }`}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Company Header */}
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 cosmic-border">
              <Image
                src={experience?.companyLogo}
                alt={experience?.companyLogoAlt}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-headline text-lg text-foreground mb-1">
                {experience?.position}
              </h3>
              <p className="text-primary font-body font-semibold text-sm">
                {experience?.company}
              </p>
            </div>
          </div>

          {/* Duration & Location */}
          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Icon name="Calendar" size={14} className="mr-2" />
              <span className="font-mono">{experience?.duration}</span>
            </div>
            <div className="flex items-center">
              <Icon name="MapPin" size={14} className="mr-2" />
              <span>{experience?.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-card-foreground text-sm leading-relaxed mb-4 font-body">
            {experience?.description}
          </p>

          {/* Key Achievements */}
          <div className="mb-4">
            <h4 className="text-foreground font-body font-semibold text-sm mb-2 flex items-center">
              <Icon name="Trophy" size={14} className="mr-2 text-primary" />
              Key Achievements
            </h4>
            <ul className="space-y-1">
              {experience?.achievements?.map((achievement, idx) => (
                <li key={idx} className="text-card-foreground text-xs flex items-start font-body">
                  <Icon name="ChevronRight" size={12} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {experience?.technologies?.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-mono border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Hover Indicator */}
          <motion.div
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-cosmic"
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
          >
            <Icon name="ExternalLink" size={16} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>
      {/* Timeline Center Node */}
      <div className="w-2/12 flex justify-center relative z-10">
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center cosmic-glow transition-cosmic ${
            isHovered ? 'scale-110 cosmic-pulse' : ''
          }`}
        >
          <Icon 
            name={experience?.icon} 
            size={24} 
            className="text-primary-foreground" 
          />
        </motion.div>

        {/* Connecting Line */}
        {!isLast && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-primary to-border"></div>
        )}
      </div>
      {/* Timeline Spacer */}
      <div className="w-5/12"></div>
    </motion.div>
  );
};

export default TimelineItem;