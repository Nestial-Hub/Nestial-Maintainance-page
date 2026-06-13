import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

export default function BackgroundEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.03,
        y: (e.clientY - window.innerHeight / 2) * 0.03,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fix: useMemo prevents stars from generating new random locations on every mouse move
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 0.5,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-space-gradient pointer-events-none">
      {/* Subtle Futuristic grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Ambient Cyber Light Lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

      {/* Parallax Container */}
      <motion.div
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: 'spring', stiffness: 40, damping: 22 }}
        className="absolute inset-0 w-full h-full"
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-cyan-100 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]"
            style={{
              width: star.size,
              height: star.size,
              top: star.top,
              left: star.left,
            }}
            animate={{ opacity: [0.15, 0.8, 0.15] }}
            transition={{ 
              duration: star.duration, 
              repeat: Infinity, 
              delay: star.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </motion.div>
    </div>
  );
}
