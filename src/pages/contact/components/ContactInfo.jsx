import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: 'Mail',
      label: 'Email',
      value: 'vikasgigwork@gmail.com',
      description: 'Best for project inquiries',
      action: () => window.open('mailto:vikasgigwork@gmail.com', '_blank')
    },
    {
      icon: 'MapPin',
      label: 'Location',
      value: 'Pune, Maharashtra, India',
      description: 'Open to remote collaboration',
      action: null
    },
    {
      icon: 'Calendar',
      label: 'Schedule Call',
      value: 'Book a consultation',
      description: '15-min Quick project discussion',
      action: () => window.open('https://cal.com/vikaskumar-dane-f8p23n/15min', '_blank')
    }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      url: 'https://linkedin.com/in/vikaskumar-dane',
      description: 'Professional network & updates'
    },
    {
      name: 'GitHub',
      icon: 'Github',
      url: 'https://github.com/Vikaskumardane',
      description: 'Code repositories & contributions'
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: 'https://x.com/vikasdane06',
      description: 'Tech insights & thoughts'
    },
    {
      name: 'UpWork',
      icon: 'HelpCircle',
      url: 'https://www.upwork.com/freelancers/~012fe0f54b7714743f?mp_source=share',
      description: 'Freelance projects & collaborations'
    }
  ];

  const certifications = [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2024',
      icon: 'Award'
    },
    {
      name: 'Meta Front-End Developer',
      issuer: 'Meta (Coursera)',
      year: '2023',
      icon: 'Award'
    },
    {
      name: 'React Advanced Patterns',
      issuer: 'Coursera',
      year: '2023',
      icon: 'Award'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="bg-card rounded-xl p-8 cosmic-shadow border border-border">
        <h3 className="font-headline text-2xl text-foreground mb-6">
          Get In Touch
        </h3>
        
        <div className="space-y-4">
          {contactMethods?.map((method, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 p-4 rounded-lg transition-cosmic ${
                method?.action 
                  ? 'hover:bg-primary/5 cursor-pointer' :'bg-surface/20'
              }`}
              onClick={method?.action}
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={method?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-sm">
                  {method?.label}
                </h4>
                <p className="text-foreground font-mono text-sm">
                  {method?.value}
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  {method?.description}
                </p>
              </div>
              {method?.action && (
                <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Social Links */}
      <div className="bg-card rounded-xl p-8 cosmic-shadow border border-border">
        <h3 className="font-headline text-xl text-foreground mb-6">
          Connect & Follow
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks?.map((social, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-auto p-4"
              onClick={() => window.open(social?.url, '_blank')}
            >
              <div className="flex items-center space-x-3 w-full">
                <Icon name={social?.icon} size={20} className="text-primary" />
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm">{social?.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {social?.description}
                  </div>
                </div>
                <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Certifications */}
      <div className="bg-card rounded-xl p-8 cosmic-shadow border border-border">
        <h3 className="font-headline text-xl text-foreground mb-6">
          Certifications & Trust Signals
        </h3>
        
        <div className="space-y-4">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-surface/10 rounded-lg">
              <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                <Icon name={cert?.icon} size={16} className="text-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm">
                  {cert?.name}
                </h4>
                <p className="text-muted-foreground text-xs">
                  {cert?.issuer} • {cert?.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Availability Status */}
      <div className="bg-card rounded-xl p-8 cosmic-shadow border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
          <h3 className="font-headline text-xl text-foreground">
            Currently Available
          </h3>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">
          Accepting new projects for Q1 2025. Currently have 2-3 week lead time for new engagements.
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Response Time:</span>
            <span className="text-foreground">Within 24 hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Project Start:</span>
            <span className="text-foreground">2-3 weeks</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Consultation:</span>
            <span className="text-success">Free (30 min)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;