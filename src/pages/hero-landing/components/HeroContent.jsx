import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial, Stars, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, Download, Activity, Cloud, Cpu, Globe, Server, Terminal, Database, ScanLine } from 'lucide-react';

// --- 1. Shader Definition ---
// We define the material class outside the component to prevent recreation on render
const AccretionDiskMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorInner: new THREE.Color('#ffaa00'),
    uColorOuter: new THREE.Color('#8b0000'),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader (Optimized Noise)
  `
    uniform float uTime;
    uniform vec3 uColorInner;
    uniform vec3 uColorOuter;
    varying vec2 vUv;

    // Faster Pseudo-random noise function (lighter on GPU than Simplex)
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 3; i++) {
            value += amplitude * noise(st);
            st *= 2.0;
            amplitude *= 0.5;
        }
        return value;
    }

    void main() {
      vec2 centeredUv = vUv - 0.5;
      float r = length(centeredUv) * 2.0;
      
      // Hard cut limits
      if (r < 0.3 || r > 1.0) discard;

      float angle = atan(centeredUv.y, centeredUv.x);
      
      // Animated Swirl
      float fbmVal = fbm(vec2(angle * 4.0 + uTime * 0.2, r * 3.0 - uTime * 0.5));
      
      float brightness = 1.0 - smoothstep(0.3, 0.9, r);
      brightness += fbmVal * 0.4;
      
      vec3 color = mix(uColorOuter, uColorInner, brightness * 1.5);
      float alpha = smoothstep(0.3, 0.35, r) * (1.0 - smoothstep(0.9, 1.0, r));
      
      gl_FragColor = vec4(color, alpha * 0.95);
    }
  `
);

// --- 2. 3D Scene Components ---
const BlackHoleScene = () => {
  const diskRef = useRef();
  const groupRef = useRef();
  
  // FIX: Use useMemo to instantiate the material class. 
  // This avoids using 'extend' which can cause the "reading 'component'" error in some R3F versions.
  const material = useMemo(() => new AccretionDiskMaterial(), []);

  useFrame((state, delta) => {
    // Safely animate the shader uniform
    if (diskRef.current) {
      diskRef.current.uTime += delta;
    }
    // Rotate the whole group
    if (groupRef.current) {
       groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} rotation={[Math.PI / 2.5, 0, 0]} position={[3, 0, -5]}>
        {/* Event Horizon */}
        <mesh>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* Accretion Disk */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[8, 8, 64, 64]} />
          {/* FIX: Use primitive object instead of JSX tag to prevent registration errors */}
          <primitive 
            object={material} 
            ref={diskRef} 
            attach="material"
            transparent 
            side={THREE.DoubleSide} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
};

const CameraRig = () => {
  const { camera, mouse } = useThree();
  useFrame(() => {
    // Smooth mouse parallax
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 2, 0.05);
    camera.lookAt(0, 0, -5);
  });
  return null;
};

// --- 3. UI Components ---
const ScrambleText = ({ text, className, delay = 0 }) => {
  const [display, setDisplay] = useState('');
  
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*';
    let timeoutId;
    let intervalId;

    timeoutId = setTimeout(() => {
        let iteration = 0;
        intervalId = setInterval(() => {
          setDisplay(
              text.split('').map((letter, index) => {
                if (index < iteration) return letter;
                return chars[Math.floor(Math.random() * chars.length)];
              }).join('')
          );
          if (iteration >= text.length) clearInterval(intervalId);
          iteration += 1 / 3;
        }, 30);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay]);

  return <span className={className}>{display}</span>;
};

const HoloCard = ({ value, label, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay, type: "spring" }}
    className="relative group w-full overflow-hidden bg-black/30 backdrop-blur-md border border-white/10 rounded-sm"
  >
    {/* Scan Effect (Requires tailwind scan animation) */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent -translate-y-full group-hover:animate-scan pointer-events-none" />

    <div className="p-5 flex items-center gap-5 relative z-10 hover:bg-white/5 transition-all">
      <div className="p-3 bg-cyan-900/20 rounded text-cyan-400 border border-cyan-500/20">
        <Icon size={24} />
      </div>
      <div>
        <div className="text-2xl md:text-3xl font-bold text-white font-mono">{value}</div>
        <div className="text-[10px] text-cyan-200/60 uppercase tracking-widest">{label}</div>
      </div>
    </div>
  </motion.div>
);

const SciFiButton = ({ children, onClick, variant = 'primary', icon: Icon }) => {
  const isPrimary = variant === 'primary';
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative px-8 py-4 group overflow-hidden font-mono text-xs tracking-[0.2em] uppercase rounded-sm border
        ${isPrimary ? 'text-black border-cyan-500' : 'text-cyan-400 border-cyan-500/30'}
      `}
    >
      <div className={`absolute inset-0 ${isPrimary ? 'bg-cyan-500' : 'bg-transparent'} transition-all group-hover:opacity-80`} />
      <span className="relative z-10 flex items-center gap-3 font-bold">
        {Icon && <Icon size={16} />}
        {children}
      </span>
    </motion.button>
  );
};

// --- 4. Main Hero Component ---
const HeroContent = () => {
  const navigate = useNavigate(); 
  
  const techStack = [
    { name: 'React', icon: Globe },
    { name: 'Next.js', icon: Cpu },
    { name: 'Node.js', icon: Server },
    { name: 'AWS', icon: Cloud },
    { name: 'TS', icon: Terminal },
    { name: 'Python', icon: Database },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#020205] overflow-hidden">
      
      {/* Layer 1: 3D Background */}
      <div className="absolute inset-0 z-0">
        {/* Added 'key' to force re-render on Fast Refresh to prevent Context Loss */}
        <Canvas key="hero-canvas" camera={{ position: [0, 0, 14], fov: 40 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
          <Suspense fallback={null}>
            <color attach="background" args={['#020205']} />
            <fog attach="fog" args={['#020205', 10, 40]} />
            
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={300} scale={[20, 20, 20]} size={3} speed={0.4} opacity={0.5} color="#ffffff" />
            
            <BlackHoleScene />
            <CameraRig />
          </Suspense>
        </Canvas>
      </div>

      {/* Layer 2: Cinematic Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Layer 3: HUD Interface */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-20 min-h-screen flex flex-col justify-center pointer-events-none">
        
        {/* Header Status */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-8 left-6 right-6 flex justify-between text-[10px] text-cyan-500/40 font-mono tracking-[0.2em] uppercase border-b border-cyan-500/10 pb-4"
        >
           <div className="flex items-center gap-2"><Activity size={12} className="text-orange-500 animate-pulse"/> SYS: ONLINE</div>
           <div className="flex items-center gap-2">PUNE, MH <ScanLine size={12} className="animate-spin-slow"/></div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10 pointer-events-auto">
          
          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-3 py-1 border-l-2 border-orange-500 bg-orange-500/5 text-orange-400 font-mono text-xs tracking-[0.2em] uppercase w-fit"
            >
              Full Stack Engineer
            </motion.div>

            <div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tighter">
                <ScrambleText text="VIKASKUMAR" className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-gray-500" delay={0.5} />
                <motion.span 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 1.2 }}
                  className="block text-orange-500"
                >
                  DANE
                </motion.span>
              </h1>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed font-light border-l border-white/10 pl-4"
            >
              Architecting digital universes using <span className="text-cyan-400">Next.js 15</span> and <span className="text-orange-400">AWS</span>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <SciFiButton onClick={() => navigate('/projects-showcase')} variant="primary" icon={Rocket}>Mission Log</SciFiButton>
              <SciFiButton onClick={() => window.open('https://drive.google.com', '_blank')} variant="outline" icon={Download}>Resume</SciFiButton>
            </motion.div>
          </div>

          {/* Stats Column */}
          <div className="lg:col-span-5 lg:mt-12">
             <div className="bg-black/20 backdrop-blur-md border border-white/5 p-6 rounded-xl">
                <div className="space-y-4">
                  <HoloCard value="2.5+" label="Years Active" icon={Activity} delay={1.4} />
                  <HoloCard value="10+" label="Projects Deployed" icon={Rocket} delay={1.6} />
                  <HoloCard value="AWS" label="Certified" icon={Cloud} delay={1.8} />
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                  className="grid grid-cols-3 gap-2 mt-8 pt-8 border-t border-white/10"
                >
                   {techStack.map((tech) => (
                     <div key={tech.name} className="flex flex-col items-center p-2 hover:bg-white/5 rounded transition-colors group">
                        <tech.icon size={18} className="text-gray-500 group-hover:text-cyan-400 transition-colors"/>
                        <span className="text-[8px] font-mono text-gray-600 group-hover:text-white uppercase mt-1">{tech.name}</span>
                     </div>
                   ))}
                </motion.div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroContent;