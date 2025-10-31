import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-card rounded-xl overflow-hidden cosmic-border transition-cosmic will-change-transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -8,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Cosmic Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-cosmic"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.imageAlt}
          className="w-full h-full object-cover transition-cosmic group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${
            project?.status === 'Live' ?'bg-success/20 text-success border border-success/30' 
              : project?.status === 'In Development' ?'bg-warning/20 text-warning border border-warning/30' :'bg-muted/20 text-muted-foreground border border-muted/30'
          }`}>
            {project?.status}
          </span>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="absolute top-4 left-4 flex space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -20
          }}
          transition={{ duration: 0.3 }}
        >
          {project?.liveUrl && (
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 bg-background/80 backdrop-blur-sm hover:bg-primary/20"
              onClick={(e) => {
                e?.stopPropagation();
                window.open(project?.liveUrl, '_blank');
              }}
            >
              <Icon name="ExternalLink" size={14} />
            </Button>
          )}
          {project?.githubUrl && (
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 bg-background/80 backdrop-blur-sm hover:bg-primary/20"
              onClick={(e) => {
                e?.stopPropagation();
                window.open(project?.githubUrl, '_blank');
              }}
            >
              <Icon name="Github" size={14} />
            </Button>
          )}
        </motion.div>
      </div>
      {/* Project Content */}
      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-headline text-xl text-card-foreground mb-1 group-hover:text-primary transition-cosmic">
              {project?.title}
            </h3>
            <p className="text-sm text-muted-foreground font-mono">
              {project?.category} • {project?.year}
            </p>
          </div>
          <div className="flex items-center space-x-1 ml-4">
            {project?.teamSize && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Icon name="Users" size={12} className="mr-1" />
                {project?.teamSize}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-card-foreground/80 mb-4 line-clamp-3">
          {project?.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project?.technologies?.slice(0, 4)?.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-mono border border-primary/20"
            >
              {tech}
            </span>
          ))}
          {project?.technologies?.length > 4 && (
            <span className="px-2 py-1 bg-muted/10 text-muted-foreground text-xs rounded-md font-mono">
              +{project?.technologies?.length - 4} more
            </span>
          )}
        </div>

        {/* Metrics */}
        {project?.metrics && (
          <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-background/50 rounded-lg">
            {project?.metrics?.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-headline text-primary">
                  {metric?.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric?.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Timeline */}
        {project?.timeline && (
          <div className="flex items-center text-xs text-muted-foreground mb-4">
            <Icon name="Calendar" size={12} className="mr-2" />
            <span>{project?.timeline}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails(project)}
          >
            <Icon name="Eye" size={14} className="mr-2" />
            View Details
          </Button>
          
          {project?.liveUrl && (
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e?.stopPropagation();
                window.open(project?.liveUrl, '_blank');
              }}
            >
              <Icon name="ExternalLink" size={14} className="mr-2" />
              Live Demo
            </Button>
          )}
        </div>
      </div>
      {/* 3D Effect Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(163, 255, 245, 0.1) 0%, rgba(21, 67, 103, 0.1) 100%)'
            : 'transparent'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectCard;