import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillCard = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSkillLevelColor = (level) => {
    if (level >= 90) return 'text-primary';
    if (level >= 75) return 'text-success';
    if (level >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getSkillLevelText = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-card border border-border rounded-lg p-6 h-full transition-cosmic hover:cosmic-glow hover:border-primary/50">
        {/* Skill Icon and Name */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-cosmic">
            <Icon 
              name={skill?.icon} 
              size={24} 
              className="text-primary" 
            />
          </div>
          <div className="flex-1">
            <h3 className="font-body font-semibold text-lg text-card-foreground mb-1">
              {skill?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {skill?.category}
            </p>
          </div>
        </div>

        {/* Skill Level Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-body font-medium text-card-foreground">
              Proficiency
            </span>
            <span className={`text-sm font-mono font-semibold ${getSkillLevelColor(skill?.level)}`}>
              {getSkillLevelText(skill?.level)} ({skill?.level}%)
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${skill?.level}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
            />
          </div>
        </div>

        {/* Experience and Projects */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-headline text-primary mb-1">
              {skill?.experience}
            </div>
            <div className="text-xs text-muted-foreground font-body">
              Years Experience
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-headline text-secondary mb-1">
              {skill?.projects}
            </div>
            <div className="text-xs text-muted-foreground font-body">
              Projects Built
            </div>
          </div>
        </div>

        {/* Skill Description */}
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
          {skill?.description}
        </p>

        {/* Technologies/Tools */}
        {skill?.technologies && skill?.technologies?.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-body font-semibold text-card-foreground uppercase tracking-wider">
              Related Technologies
            </h4>
            <div className="flex flex-wrap gap-1">
              {skill?.technologies?.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs font-mono rounded border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg opacity-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Cosmic Particles Effect */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)]?.map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SkillCard;