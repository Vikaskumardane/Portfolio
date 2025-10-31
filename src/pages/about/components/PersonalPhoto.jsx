import React from 'react';
import Image from '../../../components/AppImage';

const PersonalPhoto = () => {
  return (
    <div className="relative group">
      {/* Outer cosmic frame */}
      <div className="relative w-80 h-80 mx-auto">
        {/* Animated border rings */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute inset-2 rounded-full border border-secondary/40 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        <div className="absolute inset-4 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: '25s' }}></div>
        
        {/* Glow effect */}
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl"></div>
        
        {/* Main photo container */}
        <div className="absolute inset-8 rounded-full overflow-hidden cosmic-shadow group-hover:cosmic-glow transition-cosmic">
          <div className="relative w-full h-full">
            <Image
              src="https://media.licdn.com/dms/image/v2/D4D03AQEF5emFIPI8sw/profile-displayphoto-shrink_800_800/B4DZUOTm9yGcAc-/0/1739701776696?e=1763596800&v=beta&t=ZZzQM2vgco1eNPJ1zk7hJIwtbN70lAMIkd48F_YXVAI"
              alt="Professional headshot of Vikaskumar Dane, a confident software engineer with short dark hair wearing a navy blue shirt, smiling warmly at the camera"
              className="w-full h-full object-cover" />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
          </div>
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-primary rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-primary rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-primary rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-primary rounded-br-lg"></div>
      </div>
    </div>);

};

export default PersonalPhoto;