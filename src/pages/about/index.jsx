import React, { useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import PersonalPhoto from './components/PersonalPhoto';
import ProfessionalSummary from './components/ProfessionalSummary';
import MissionStatement from './components/MissionStatement';
import Certifications from './components/Certifications';
import ResumeDownload from './components/ResumeDownload';
import Icon from '../../components/AppIcon';

const About = () => {
  const sectionRefs = useRef([]);
  const heroRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    sectionRefs?.current?.forEach((ref) => {
      if (ref) {
        ref.style.opacity = '0';
        ref.style.transform = 'translateY(30px)';
        ref.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer?.observe(ref);
      }
    });

    return () => observer?.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs?.current?.includes(el)) {
      sectionRefs?.current?.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-24 pb-16 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Cosmic Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(163, 255, 245, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(163, 255, 245, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-60 right-1/3 w-1 h-1 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Navigation Breadcrumb */}
            <div ref={addToRefs} className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Home" size={14} />
              <span>/</span>
              <span className="text-primary">About</span>
            </div>

            {/* Hero Title */}
            <div ref={addToRefs} className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-headline text-foreground">
                About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Vikaskumar Dane
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Full Stack Engineer crafting digital experiences that bridge the gap between human needs and technological possibilities
              </p>
            </div>

            {/* Personal Photo */}
            <div ref={addToRefs}>
              <PersonalPhoto />
            </div>
          </div>
        </div>
      </section>
      {/* Professional Summary Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-card/20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div ref={addToRefs}>
            <ProfessionalSummary />
          </div>
        </div>
      </section>
      {/* Mission Statement Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div ref={addToRefs}>
            <MissionStatement />
          </div>
        </div>
      </section>
      {/* Certifications Section */}
      <section className="py-16 bg-gradient-to-b from-card/10 to-transparent">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div ref={addToRefs}>
            <Certifications />
          </div>
        </div>
      </section>
      {/* Resume Download Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div ref={addToRefs}>
            <ResumeDownload />
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div ref={addToRefs} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-headline text-foreground">
                Ready to Build Something Extraordinary?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Let's collaborate to transform your vision into a digital reality that exceeds expectations and drives measurable results.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/projects-showcase'}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-body font-semibold hover:cosmic-glow transition-cosmic"
              >
                View My Work
              </button>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="px-8 py-3 bg-transparent border border-primary text-primary rounded-lg font-body font-semibold hover:bg-primary/10 transition-cosmic"
              >
                Start a Conversation
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} Vikaskumar Dane. Crafted with precision and passion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;