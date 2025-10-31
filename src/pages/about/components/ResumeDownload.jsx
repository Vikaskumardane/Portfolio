import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResumeDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      
      const link = document.createElement('a');
    link.href = '/Resume(Vikaskumar Dane).pdf'; // path to your PDF in public folder
    link.download = 'Resume(Vikaskumar Dane).pdf'; // desired filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, 1500);
  };

  const resumeStats = [
    {
      icon: "FileText",
      label: "Format",
      value: "PDF"
    },
    {
      icon: "Download",
      label: "Size",
      value: "180 KB"
    },
    {
      icon: "Calendar",
      label: "Updated",
      value: "Nov 2025"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Download Card */}
      <div className="relative p-8 rounded-lg bg-gradient-to-br from-card/80 to-card/40 border border-border cosmic-shadow">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
        </div>
        
        <div className="relative space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-lg bg-primary/10 flex items-center justify-center cosmic-glow">
              <Icon name="FileDown" size={32} className="text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-body font-semibold text-foreground">
                Download Resume
              </h3>
              <p className="text-sm text-muted-foreground">
                Get the complete professional overview in PDF format
              </p>
            </div>
          </div>

          {/* Resume Stats */}
          <div className="grid grid-cols-3 gap-4">
            {resumeStats?.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 rounded-lg bg-background/50 border border-border"
              >
                <Icon 
                  name={stat?.icon} 
                  size={20} 
                  className="text-primary mx-auto mb-2" 
                />
                <div className="text-xs text-muted-foreground mb-1">
                  {stat?.label}
                </div>
                <div className="text-sm font-body font-semibold text-foreground">
                  {stat?.value}
                </div>
              </div>
            ))}
          </div>

          {/* Download Button */}
          <div className="text-center">
            <Button
              variant="default"
              size="lg"
              loading={isDownloading}
              iconName="Download"
              iconPosition="left"
              onClick={handleDownload}
              className="cosmic-glow"
            >
              {isDownloading ? 'Preparing Download...' : 'Download Resume'}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Comprehensive overview including experience, skills, and achievements
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={12} />
                <span>Secure Download</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Zap" size={12} />
                <span>Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Alternative */}
      <div className="p-6 rounded-lg bg-secondary/5 border border-secondary/20">
        <div className="text-center space-y-4">
          <Icon name="MessageCircle" size={24} className="text-secondary mx-auto" />
          <div className="space-y-2">
            <h4 className="text-lg font-body font-semibold text-foreground">
              Prefer to Connect Directly?
            </h4>
            <p className="text-sm text-muted-foreground">
              Let's discuss your project requirements and how I can contribute to your team's success.
            </p>
          </div>
          <Button
            variant="outline"
            iconName="Mail"
            iconPosition="left"
            onClick={() => window.location.href = '/contact'}
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeDownload;