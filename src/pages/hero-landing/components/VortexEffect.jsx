import React, { useEffect, useRef } from 'react';

const VortexEffect = () => {
  const vortexRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const vortex = vortexRef?.current;
    if (!vortex) return;

    let rotation = 0;
    let scale = 1;
    let direction = 1;

    const animate = () => {
      rotation += 0.5;
      scale += direction * 0.002;
      
      if (scale > 1.1 || scale < 0.9) {
        direction *= -1;
      }

      vortex.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div
        ref={vortexRef}
        className="w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] opacity-30"
        style={{
          background: `conic-gradient(from 0deg, 
            transparent 0deg, 
            rgba(163, 255, 245, 0.1) 90deg, 
            rgba(21, 67, 103, 0.2) 180deg, 
            rgba(163, 255, 245, 0.1) 270deg, 
            transparent 360deg)`,
          borderRadius: '50%',
          filter: 'blur(2px)'
        }}
      />
      <div
        className="absolute inset-0 w-full h-full opacity-20"
        style={{
          background: `radial-gradient(circle at center, 
            transparent 30%, 
            rgba(163, 255, 245, 0.1) 50%, 
            rgba(21, 67, 103, 0.2) 70%, 
            transparent 100%)`,
          borderRadius: '50%',
          filter: 'blur(1px)'
        }}
      />
    </div>
  );
};

export default VortexEffect;