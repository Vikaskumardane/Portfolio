import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto cosmic-border cosmic-shadow">
              {/* Header */}
              <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between">
                <div>
                  <h2 className="font-headline text-2xl text-card-foreground">
                    {project?.title}
                  </h2>
                  <p className="text-muted-foreground font-mono">
                    {project?.category} • {project?.year}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Project Image */}
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
                  <Image
                    src={project?.image}
                    alt={project?.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-mono font-semibold ${
                      project?.status === 'Live' ?'bg-success/20 text-success border border-success/30' 
                        : project?.status === 'In Development' ?'bg-warning/20 text-warning border border-warning/30' :'bg-muted/20 text-muted-foreground border border-muted/30'
                    }`}>
                      {project?.status}
                    </span>
                  </div>
                </div>

                {/* Project Info Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-headline text-lg text-card-foreground mb-3">
                      Project Overview
                    </h3>
                    <p className="text-card-foreground/80 leading-relaxed mb-4">
                      {project?.description}
                    </p>
                    {project?.detailedDescription && (
                      <p className="text-card-foreground/80 leading-relaxed">
                        {project?.detailedDescription}
                      </p>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    {/* Timeline */}
                    {project?.timeline && (
                      <div className="flex items-center">
                        <Icon name="Calendar" size={16} className="mr-3 text-primary" />
                        <div>
                          <span className="text-sm text-muted-foreground">Timeline</span>
                          <p className="text-card-foreground font-mono">{project?.timeline}</p>
                        </div>
                      </div>
                    )}

                    {/* Team Size */}
                    {project?.teamSize && (
                      <div className="flex items-center">
                        <Icon name="Users" size={16} className="mr-3 text-primary" />
                        <div>
                          <span className="text-sm text-muted-foreground">Team Size</span>
                          <p className="text-card-foreground font-mono">{project?.teamSize}</p>
                        </div>
                      </div>
                    )}

                    {/* Role */}
                    {project?.role && (
                      <div className="flex items-center">
                        <Icon name="User" size={16} className="mr-3 text-primary" />
                        <div>
                          <span className="text-sm text-muted-foreground">My Role</span>
                          <p className="text-card-foreground font-mono">{project?.role}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="font-headline text-lg text-card-foreground mb-3 flex items-center">
                    <Icon name="Code" size={18} className="mr-2 text-primary" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project?.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-md font-mono border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                {project?.features && (
                  <div className="mb-6">
                    <h3 className="font-headline text-lg text-card-foreground mb-3 flex items-center">
                      <Icon name="Star" size={18} className="mr-2 text-primary" />
                      Key Features
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {project?.features?.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <Icon name="Check" size={16} className="mr-2 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-card-foreground/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metrics */}
                {project?.metrics && (
                  <div className="mb-6">
                    <h3 className="font-headline text-lg text-card-foreground mb-3 flex items-center">
                      <Icon name="BarChart3" size={18} className="mr-2 text-primary" />
                      Project Metrics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {project?.metrics?.map((metric, index) => (
                        <div key={index} className="text-center p-4 bg-background/50 rounded-lg">
                          <div className="text-2xl font-headline text-primary mb-1">
                            {metric?.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {metric?.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenges & Solutions */}
                {project?.challenges && (
                  <div className="mb-6">
                    <h3 className="font-headline text-lg text-card-foreground mb-3 flex items-center">
                      <Icon name="Zap" size={18} className="mr-2 text-primary" />
                      Challenges & Solutions
                    </h3>
                    <div className="space-y-3">
                      {project?.challenges?.map((challenge, index) => (
                        <div key={index} className="p-4 bg-background/30 rounded-lg">
                          <h4 className="font-semibold text-card-foreground mb-2">
                            {challenge?.title}
                          </h4>
                          <p className="text-card-foreground/80 text-sm">
                            {challenge?.solution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
                  {project?.liveUrl && (
                    <Button
                      variant="default"
                      onClick={() => window.open(project?.liveUrl, '_blank')}
                      className="flex-1"
                    >
                      <Icon name="ExternalLink" size={16} className="mr-2" />
                      View Live Project
                    </Button>
                  )}
                  {project?.githubUrl && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(project?.githubUrl, '_blank')}
                      className="flex-1"
                    >
                      <Icon name="Github" size={16} className="mr-2" />
                      View Source Code
                    </Button>
                  )}
                  {project?.caseStudyUrl && (
                    <Button
                      variant="secondary"
                      onClick={() => window.open(project?.caseStudyUrl, '_blank')}
                      className="flex-1"
                    >
                      <Icon name="FileText" size={16} className="mr-2" />
                      Case Study
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;