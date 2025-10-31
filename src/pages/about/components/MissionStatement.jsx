import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionStatement = () => {
  const missionPoints = [
    {
      icon: "Rocket",
      title: "Innovation Driver",
      description: "Transforming complex business challenges into elegant digital solutions that exceed expectations and drive measurable growth."
    },
    {
      icon: "Target",
      title: "Results Focused",
      description: "Delivering high-performance applications with 99.9% uptime, optimized load times under 2 seconds, and scalable architectures."
    },
    {
      icon: "Users",
      title: "Collaboration Champion",
      description: "Building bridges between technical teams and stakeholders to ensure seamless project delivery and exceptional user experiences."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Mission Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30">
          <Icon name="Compass" size={16} className="text-secondary mr-2" />
          <span className="text-sm font-mono text-secondary">Mission Statement</span>
        </div>
        <h3 className="text-2xl font-headline text-foreground">
          Architecting Digital Experiences That Push Boundaries
        </h3>
      </div>
      {/* Mission Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {missionPoints?.map((point, index) => (
          <div 
            key={index}
            className="group relative p-6 rounded-lg bg-card/50 border border-border hover:border-primary/30 transition-cosmic"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-cosmic">
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
            </div>
            
            <div className="relative space-y-4">
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:cosmic-glow transition-cosmic">
                <Icon 
                  name={point?.icon} 
                  size={24} 
                  className="text-primary" 
                />
              </div>
              
              {/* Content */}
              <div className="space-y-2">
                <h4 className="text-lg font-body font-semibold text-foreground">
                  {point?.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Core Philosophy */}
      <div className="mt-12 p-8 rounded-lg bg-gradient-to-r from-secondary/5 to-primary/5 border border-secondary/20">
        <div className="text-center space-y-4">
          <Icon name="Zap" size={32} className="text-primary mx-auto" />
          <blockquote className="text-lg font-body text-foreground italic">
            "Like the engineers who designed Endurance to traverse the cosmos, I believe in building applications that don't just function—they inspire. Every line of code is crafted with the precision of spacecraft engineering and the vision to solve tomorrow's challenges today."
          </blockquote>
          <cite className="text-sm text-muted-foreground font-mono">
            — Vikaskumar Dane, Full Stack Engineer
          </cite>
        </div>
      </div>
    </div>
  );
};

export default MissionStatement;