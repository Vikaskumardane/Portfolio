import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SHADERS
 * These are small programs that run on the GPU to create the
 * swirling, fiery liquid magma effect of the black hole.
 */

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;
varying vec3 vPosition;

// Simplex Noise Function
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

void main() {
    // Circular motion logic
    float radius = length(vPosition.xy);
    float angle = atan(vPosition.y, vPosition.x);
    
    // Swirl effect based on time and distance from center
    float noiseVal = snoise(vec3(vPosition.xy * 2.0 + vec2(uTime * 0.5), uTime * 0.2));
    float swirl = snoise(vec3(radius * 3.0 - uTime * 1.5, angle * 2.0, uTime * 0.1));
    
    // Combine noise
    float intensity = (noiseVal * 0.5 + swirl * 0.5) + 0.3;
    
    // Gradient mixing based on intensity
    vec3 color = mix(uColor2, uColor1, intensity * (2.0 - radius));
    
    // Alpha fade out at edges
    float alpha = smoothstep(0.0, 0.5, 0.5 - abs(radius - 0.5)); // Ring shape
    
    gl_FragColor = vec4(color, alpha * intensity);
}
`;

/**
 * 3D COMPONENTS
 */

const AccretionDisk = ({ isHovered }) => {
  const meshRef = useRef();
  
  // Uniforms for the shader
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#ffaa00') }, // Bright Orange/Gold
    uColor2: { value: new THREE.Color('#8b0000') }, // Deep Red/Black
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      // Pass time to shader for animation
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Rotation speed increases on hover
      const rotationSpeed = isHovered ? 0.4 : 0.1;
      meshRef.current.rotation.z -= rotationSpeed * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]}>
      {/* A ring geometry: innerRadius, outerRadius, thetaSegments */}
      <ringGeometry args={[3, 6, 128]} /> 
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

// The "Photon Ring" - the vertical halo caused by gravitational lensing
const PhotonHalo = () => {
    const meshRef = useRef();
    
    useFrame((state) => {
       if(meshRef.current) {
           // Look at camera trick to always face viewer partially? 
           // For Interstellar look, it's usually a fixed vertical ring relative to the hole
           meshRef.current.material.opacity = 0.3 + Math.sin(state.clock.getElapsedTime()) * 0.1;
       } 
    });

    return (
        <mesh ref={meshRef} rotation={[0, 0, 0]}> 
             <ringGeometry args={[3.2, 3.8, 64]} />
             <meshBasicMaterial 
                color="#ffcc00" 
                side={THREE.DoubleSide} 
                transparent 
                opacity={0.4} 
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    )
}

const EventHorizon = ({ isHovered }) => {
    // The absolute black sphere in the middle
    return (
        <mesh>
            <sphereGeometry args={[3, 64, 64]} />
            <meshBasicMaterial color="#000000" />
            {/* The glowing rim (Fresnel effect simulated via scale/behind) */}
            <mesh scale={[1.02, 1.02, 1.02]}>
                <sphereGeometry args={[3, 64, 64]} />
                <meshBasicMaterial color="#ff4400" transparent opacity={isHovered ? 0.2 : 0.1} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
            </mesh>
        </mesh>
    );
};

const BlackHoleScene = ({ onEnter, setHover }) => {
    const groupRef = useRef();
    const cameraRef = useRef();

    // Animation loop for the whole group floating
    useFrame((state) => {
        if(groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.5;
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 18]} fov={45} ref={cameraRef} />
            <ambientLight intensity={0.2} />
            
            {/* High density stars for the background */}
            <Stars radius={300} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />

            <group 
                ref={groupRef} 
                onPointerOver={() => setHover(true)} 
                onPointerOut={() => setHover(false)}
                onClick={onEnter}
                className="cursor-pointer"
            >
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <EventHorizon />
                    <AccretionDisk />
                    {/* The Halo is rotated 90 degrees to simulate the lensing over the top */}
                    <group rotation={[Math.PI / 2 + 0.2, 0, 0]}>
                         <PhotonHalo />
                    </group>
                </Float>
            </group>
        </>
    );
};


/**
 * MAIN PAGE COMPONENT
 */
export default function InterstellarSplash() {
    const [isHovered, setIsHovered] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const navigate = useNavigate();
    
    // Refs for GSAP animation
    const containerRef = useRef();

    const handleEnter = () => {
        setIsTransitioning(true);
        
        // The "Warp" Transition
        const timeline = gsap.timeline({
            onComplete: () => navigate('/home')
        });

        // 1. Fade out UI text
        timeline.to('.ui-layer', { opacity: 0, duration: 0.5 });

        // 2. Camera Fly-through (simulated by scaling the container towards the screen)
        // Note: In a real R3F setup, we would animate the camera prop, but scaling the Canvas div 
        // gives a fierce "warp" effect visually.
        timeline.to(containerRef.current, {
            scale: 50,
            opacity: 0,
            rotation: 180,
            duration: 2.5,
            ease: "power4.in",
        });
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden" ref={containerRef}>
            
            {/* 3D SCENE LAYER */}
            <div className="absolute inset-0 z-0">
                <Canvas gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping }}>
                    {/* Pass hover state down to 3D components to react */}
                    <BlackHoleScene onEnter={handleEnter} setHover={setIsHovered} />
                </Canvas>
            </div>

            {/* UI OVERLAY LAYER */}
            <AnimatePresence>
                {!isTransitioning && (
                    <motion.div 
                        className="ui-layer absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="mt-[45vh] text-center pointer-events-auto cursor-pointer" onClick={handleEnter}>
                            <motion.h2 
                                className="text-white text-sm md:text-base tracking-[0.5em] uppercase mb-2 opacity-70"
                                animate={{ letterSpacing: isHovered ? "0.8em" : "0.5em" }}
                            >
                                System Ready
                            </motion.h2>
                            
                            <h1 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tighter mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                                VIKASKUMAR DANE
                            </h1>

                            <div className="flex flex-col items-center gap-4">
                                <div className={`h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent transition-all duration-500 ${isHovered ? 'w-96 opacity-100' : 'w-0 opacity-0'}`} />
                                
                                <button 
                                    onClick={handleEnter}
                                    className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border border-white/10 transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/10"
                                >
                                    <span className="relative z-10 text-white text-sm font-light tracking-widest group-hover:text-orange-100 transition-colors">
                                        INITIATE SEQUENCE
                                    </span>
                                    <div className="absolute inset-0 bg-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Footer Status */}
                        <div className="absolute bottom-10 text-white/30 text-xs tracking-[0.2em] font-mono">
                            COORDINATES: PUNE, MH // 18.5204° N, 73.8567° E
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CINEMATIC GRAIN OVERLAY */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.07] mix-blend-overlay" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />
        </div>
    );
}