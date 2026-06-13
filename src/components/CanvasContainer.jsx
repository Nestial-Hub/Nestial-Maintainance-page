import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import ParticleSystem from './ParticleSystem';
import ThreeRobots from './ThreeRobots';

function InteractiveParallax({ mouse }) {
  useFrame((state) => {
    // Subtle mouse parallax coordinates to give life to the static screen
    const targetX = mouse.current.x * 0.4;
    const targetY = mouse.current.y * 0.3 - 0.1;
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function CanvasContainer() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-none bg-[#0c0d12]">
      {/* Subtle tech grid background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <Canvas
        camera={{ position: [0, -0.1, 7.3], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#0a0b0e"]} />
        <fog attach="fog" args={["#0a0b0e", 8, 16]} />

        <ambientLight intensity={0.4} />
        {/* Spotlighting for mechanical metal highlighting */}
        <spotLight position={[5, 12, 5]} angle={0.35} penumbra={1} intensity={2} color="#22d3ee" castShadow />
        <pointLight position={[-8, -5, -8]} intensity={0.8} color="#d946ef" />
        
        {/* Parallax coordinate controller */}
        <InteractiveParallax mouse={mouse} />

        {/* 3D background elements */}
        <ParticleSystem mouse={mouse} />
        <ThreeRobots />
      </Canvas>
    </div>
  );
}
