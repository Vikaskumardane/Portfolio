import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';

// Enhanced 3D Black Hole Component
const BlackHole3D = ({ blackHoleRef, onEnter }) => {
  const accretionDiskRef = useRef(null);
  const innerGlowRef = useRef(null);
  const particlesRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Create continuous rotation animation for accretion disk
    const rotationTimeline = gsap?.timeline({ repeat: -1 });
    
    if (accretionDiskRef?.current) {
      rotationTimeline?.to(accretionDiskRef?.current, {
        rotation: 360,
        duration: 8,
        ease: "none"
      });
    }

    // Create pulsing effect for inner glow
    if (innerGlowRef?.current) {
      gsap?.to(innerGlowRef?.current, {
        scale: 1.2,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    // Animate particles
    if (particlesRef?.current) {
      const particles = particlesRef?.current?.children;
      Array.from(particles)?.forEach((particle, index) => {
        gsap?.to(particle, {
          rotation: 360,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          ease: "none",
          delay: index * 0.1
        });
      });
    }

    return () => {
      rotationTimeline?.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (blackHoleRef?.current) {
      gsap?.to(blackHoleRef?.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (blackHoleRef?.current) {
      gsap?.to(blackHoleRef?.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      ref={blackHoleRef}
      className="relative cursor-pointer transform-gpu"
      onClick={onEnter}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '350px',
        height: '350px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Outer Particles */}
      <div 
        ref={particlesRef}
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {[...Array(8)]?.map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-60"
            style={{
              left: `${50 + 40 * Math.cos(i * Math.PI / 4)}%`,
              top: `${50 + 40 * Math.sin(i * Math.PI / 4)}%`,
              boxShadow: '0 0 10px rgba(255,255,255,0.8)',
              transform: `translateZ(${Math.random() * 100}px)`,
            }}
          />
        ))}
      </div>
      {/* Accretion Disk */}
      <div
        ref={accretionDiskRef}
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, 
            rgba(255, 140, 0, 0.8) 0deg,
            rgba(255, 69, 0, 0.6) 90deg,
            rgba(255, 215, 0, 0.4) 180deg,
            rgba(255, 140, 0, 0.8) 270deg,
            rgba(255, 140, 0, 0.8) 360deg)`,
          filter: 'blur(2px)',
          transform: 'rotateX(75deg)',
        }}
      />
      {/* Gravitational Lensing Effect */}
      <div
        className="absolute inset-4 rounded-full"
        style={{
          background: `radial-gradient(circle at center,
            rgba(255, 215, 0, 0.3) 0%,
            rgba(255, 140, 0, 0.4) 30%,
            rgba(255, 69, 0, 0.2) 60%,
            transparent 80%)`,
          filter: 'blur(8px)',
          transform: 'rotateX(60deg) scale(1.2)',
        }}
      />
      {/* Inner Glow */}
      <div
        ref={innerGlowRef}
        className="absolute inset-8 rounded-full"
        style={{
          background: `radial-gradient(circle at center,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 215, 0, 0.8) 20%,
            rgba(255, 140, 0, 0.6) 40%,
            rgba(139, 69, 19, 0.4) 60%,
            rgba(0, 0, 0, 0.8) 80%,
            rgba(0, 0, 0, 1) 100%)`,
          boxShadow: `
            0 0 50px rgba(255, 215, 0, 0.6),
            inset 0 0 50px rgba(0, 0, 0, 0.8)
          `,
        }}
      />
      {/* Event Horizon */}
      <div
        className="absolute inset-12 rounded-full bg-black"
        style={{
          boxShadow: `
            inset 0 0 30px rgba(255, 215, 0, 0.3),
            0 0 100px rgba(0, 0, 0, 0.9)
          `,
        }}
      />
      {/* Central Singularity */}
      <div
        className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 rounded-full bg-black"
        style={{
          boxShadow: `
            0 0 20px rgba(255, 215, 0, 0.8),
            inset 0 0 10px rgba(255, 255, 255, 0.1)
          `,
        }}
      />
      {/* Hover Effects */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle at center,
              transparent 0%,
              rgba(255, 215, 0, 0.1) 50%,
              rgba(255, 140, 0, 0.2) 100%)`,
            filter: 'blur(20px)',
          }}
        />
      )}
    </div>
  );
};

// Enhanced Splash Screen Component
const SplashScreen = ({ onFinished }) => {
  const blackHoleRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const spaceFieldRef = useRef(null);

  useEffect(() => {
    // Create starfield effect
    if (spaceFieldRef?.current) {
      const stars = [];
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'absolute bg-white rounded-full';
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star?.style?.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = Math.random() * 0.8 + 0.2;
        star.style.animationDelay = `${Math.random() * 3}s`;
        spaceFieldRef?.current?.appendChild(star);
        stars?.push(star);

        // Twinkling effect
        gsap?.to(star, {
          opacity: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    }
  }, []);

  const handleEnter = () => {
    // Enhanced GSAP Timeline with 3D effects
    const timeline = gsap?.timeline({
      onComplete: onFinished 
    });

    // 1. Fade out the text and stars
    timeline?.to(textRef?.current, {
        duration: 0.5,
        opacity: 0,
        y: -20,
        ease: 'power2.inOut'
      })?.to(spaceFieldRef?.current, {
        duration: 0.8,
        opacity: 0,
        ease: 'power2.inOut'
      }, "<");

    // 2. Animate spaceship cursor into black hole
    const blackHoleBounds = blackHoleRef?.current?.getBoundingClientRect();
    if (blackHoleBounds && cursorRef?.current) {
      const centerX = blackHoleBounds?.left + blackHoleBounds?.width / 2;
      const centerY = blackHoleBounds?.top + blackHoleBounds?.height / 2;

      timeline?.to(cursorRef?.current, {
        duration: 2,
        left: centerX,
        top: centerY,
        scale: 0,
        rotation: 720,
        ease: 'power3.in'
      }, "-=0.3");
    }

    // 3. Black hole expansion with 3D effect
    timeline?.to(blackHoleRef?.current, {
        duration: 0.5,
        scale: 1.5,
        ease: 'power2.out'
      }, "<0.5")?.to(blackHoleRef?.current, {
        duration: 2.5,
        scale: 80,
        rotation: 1080,
        ease: 'power4.in',
        transformOrigin: 'center center'
      })?.to(containerRef?.current, {
        duration: 1,
        opacity: 0,
        ease: 'power2.inOut'
      }, "-=0.5");
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at center, 
          rgba(25, 25, 112, 0.3) 0%, 
          rgba(0, 0, 0, 0.8) 40%, 
          rgba(0, 0, 0, 1) 100%)`
      }}
    >
      {/* Starfield Background */}
      <div 
        ref={spaceFieldRef}
        className="absolute inset-0"
        style={{ perspective: '1000px' }}
      />
      {/* Nebula Effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(72, 61, 139, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 20%, rgba(25, 25, 112, 0.3) 0%, transparent 60%)
          `
        }}
      />
      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
        <CustomCursor ref={cursorRef} />
        
        {/* Enhanced 3D Black Hole */}
        <BlackHole3D 
          blackHoleRef={blackHoleRef}
          onEnter={handleEnter}
        />
        
        {/* Call to Action Text */}
        <div 
          ref={textRef} 
          className="mt-12 text-center"
        >
          <p className="text-white text-xl lg:text-2xl font-light tracking-wider mb-4">
            Enter the 
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mx-2">
              Black Hole
            </span>
          </p>
          <p className="text-gray-300 text-sm tracking-widest uppercase opacity-80">
            Click to begin your cosmic journey
          </p>
        </div>

        {/* Gravitational Wave Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)]?.map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 border border-white rounded-full"
              style={{
                width: `${300 + i * 200}px`,
                height: `${300 + i * 200}px`,
                marginTop: `-${150 + i * 100}px`,
                marginLeft: `-${150 + i * 100}px`,
                opacity: 0.1,
                animation: `ripple ${3 + i}s infinite ease-out`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0.5);
            opacity: 0.3;
          }
          50% {
            opacity: 0.1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Main Interstellar Splash Screen Component
const InterstellarSplashScreen = () => {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Hide default cursor for the entire page
    document.body.style.cursor = 'none';
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.cursor = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSplashFinish = () => {
    setIsSplashFinished(true);
    // Navigate to home page after animation completes
    setTimeout(() => {
      navigate('/home');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black">
      {!isSplashFinished ? (
        <SplashScreen onFinished={handleSplashFinish} />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-xl">Entering the cosmic realm...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterstellarSplashScreen;