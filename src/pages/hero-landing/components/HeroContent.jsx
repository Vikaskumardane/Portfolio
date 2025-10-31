import React from 'react';
import Button from '../../../components/ui/Button';
import TypewriterText from './TypewriterText';

const HeroContent = () => {
  const typewriterTexts = [
    "Full Stack Engineer",
    "React Specialist", 
    "AWS Certified Developer",
    "Problem Solver",
    "Innovation Driver"
  ];

  const handleExploreWork = () => {
    window.location.href = '/projects-showcase';
  };

  const handleViewResume = () => {
    // Mock resume download - in real implementation would link to actual resume
    const link = document.createElement('a');
    link.href = '/Resume(Vikaskumar_Dane).pdf';
    link.download = 'Resume(Vikaskumar_Dane).pdf';
    link?.click();
  };

  const handleContact = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="relative z-10 text-center px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground mb-6 leading-tight">
          Vikaskumar
          <span className="block text-primary cosmic-glow">Dane</span>
        </h1>

        {/* Typewriter Subtitle */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-body font-semibold text-muted-foreground">
            <TypewriterText texts={typewriterTexts} speed={120} deleteSpeed={60} pauseTime={2500} />
          </h2>
        </div>

        {/* Mission Statement */}
        <p className="text-lg md:text-xl lg:text-2xl font-body text-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Architecting digital experiences that transcend boundaries through 
          <span className="text-primary font-semibold"> innovative engineering</span> and 
          <span className="text-secondary font-semibold"> creative problem-solving</span>
        </p>

        {/* Professional Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 cosmic-shadow">
            <div className="text-2xl font-headline text-primary mb-2">2.5+</div>
            <div className="text-sm font-body text-muted-foreground">Years Experience</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 cosmic-shadow">
            <div className="text-2xl font-headline text-primary mb-2">10+</div>
            <div className="text-sm font-body text-muted-foreground">Projects Delivered</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 cosmic-shadow">
            <div className="text-2xl font-headline text-primary mb-2">AWS</div>
            <div className="text-sm font-body text-muted-foreground">Certified Developer</div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="default"
            size="lg"
            onClick={handleExploreWork}
            iconName="Rocket"
            iconPosition="right"
            className="cosmic-glow hover:cosmic-pulse"
          >
            Explore My Work
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleViewResume}
            iconName="Download"
            iconPosition="left"
          >
            Download Resume
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            onClick={handleContact}
            iconName="Mail"
            iconPosition="left"
          >
            Let's Connect
          </Button>
        </div>

        {/* Tech Stack Preview */}
        <div className="mt-16 pt-8 border-t border-border/30">
          <p className="text-sm font-body text-muted-foreground mb-4 uppercase tracking-wider">
            Powered By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
            {[
              'React', 'Next.js', 'Node.js', 'AWS', 'TypeScript', 'Python'
            ]?.map((tech, index) => (
              <span 
                key={tech}
                className="text-sm font-mono text-foreground hover:text-primary transition-cosmic cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;