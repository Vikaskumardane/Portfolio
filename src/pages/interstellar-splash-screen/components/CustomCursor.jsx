import React, { useState, useEffect, forwardRef } from 'react';

// Custom hook to track mouse position
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    const mouseMoveHandler = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return mousePosition;
};

// Enhanced spaceship cursor with thrust effects
const CustomCursor = forwardRef((props, ref) => {
  const { x, y } = useMousePosition();
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let moveTimer;
    setIsMoving(true);
    
    moveTimer = setTimeout(() => {
      setIsMoving(false);
    }, 100);

    return () => {
      clearTimeout(moveTimer);
    };
  }, [x, y]);

  // Hide the cursor until the mouse has moved for the first time
  if (x === null || y === null) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-50 transition-transform duration-75"
      style={{
        top: y,
        left: x,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform'
      }}
    >
      {/* Spaceship Body */}
      <div className="relative">
        {/* Thrust Effect */}
        {isMoving && (
          <div 
            className="absolute -bottom-2 left-1/2 w-1 h-8 -ml-0.5 opacity-80"
            style={{
              background: 'linear-gradient(to bottom, rgba(0, 162, 255, 0.8) 0%, rgba(255, 119, 0, 0.6) 50%, transparent 100%)',
              filter: 'blur(1px)',
              animation: 'thrust 0.1s ease-out'
            }}
          />
        )}
        
        {/* Main Spaceship SVG */}
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          className="drop-shadow-lg"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))'
          }}
        >
          {/* Ship Body */}
          <path
            d="M20 2 L30 35 L20 30 L10 35 Z"
            fill="url(#shipGradient)"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="1"
          />
          
          {/* Ship Details */}
          <circle cx="20" cy="15" r="2" fill="rgba(0, 162, 255, 0.9)" />
          <path
            d="M18 20 L22 20 L21 25 L19 25 Z"
            fill="rgba(255, 119, 0, 0.8)"
          />
          
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="shipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(200, 200, 200, 0.9)" />
              <stop offset="50%" stopColor="rgba(150, 150, 150, 0.8)" />
              <stop offset="100%" stopColor="rgba(100, 100, 100, 0.7)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Engine Glow */}
        <div 
          className="absolute -bottom-1 left-1/2 w-3 h-3 -ml-1.5 rounded-full opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(0, 162, 255, 0.8) 0%, rgba(255, 119, 0, 0.4) 70%, transparent 100%)',
            animation: isMoving ? 'engineGlow 0.2s ease-out' : 'none'
          }}
        />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes thrust {
          0% { 
            transform: scaleY(0.5);
            opacity: 1;
          }
          100% { 
            transform: scaleY(1);
            opacity: 0.8;
          }
        }
        
        @keyframes engineGlow {
          0% { 
            transform: scale(0.8);
            opacity: 1;
          }
          100% { 
            transform: scale(1.2);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
});

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;