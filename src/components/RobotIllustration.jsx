import { motion } from 'framer-motion';
import { Settings, Zap, Laptop, Construction } from 'lucide-react';

export default function RobotIllustration() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center my-6 select-none bg-black/10 border border-white/5 rounded-3xl p-4 overflow-hidden">
      
      {/* Decorative holographic grid overlay inside the illustration */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      <svg 
        className="w-full h-full max-w-lg" 
        viewBox="0 0 500 240" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        
        {/* ========================================== */}
        {/* LEFT SIDE: ROBOTIC CONSTRUCTION CRANE */}
        {/* ========================================== */}
        <g id="construction-crane">
          {/* Base Platform */}
          <rect x="30" y="200" width="80" height="12" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <circle cx="50" cy="206" r="3" fill="#22d3ee" className="animate-pulse" />
          <circle cx="70" cy="206" r="3" fill="#3b82f6" />
          <circle cx="90" cy="206" r="3" fill="#3b82f6" />
          
          {/* Vertical Support Tower */}
          <line x1="70" y1="200" x2="70" y2="100" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          {/* Cross truss lines */}
          <line x1="70" y1="180" x2="85" y2="160" stroke="#334155" strokeWidth="2" />
          <line x1="70" y1="150" x2="55" y2="130" stroke="#334155" strokeWidth="2" />
          <line x1="70" y1="120" x2="85" y2="100" stroke="#334155" strokeWidth="2" />
          
          {/* Pivot joint */}
          <circle cx="70" cy="100" r="7" fill="#64748b" stroke="#475569" strokeWidth="2" />
          
          {/* Crane Jib Arm - Rotating slightly up and down */}
          <motion.g
            animate={{ rotate: [-4, 6, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: '70px', originY: '100px' }}
          >
            {/* Jib structure */}
            <line x1="70" y1="100" x2="160" y2="80" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
            <line x1="70" y1="100" x2="30" y2="110" stroke="#475569" strokeWidth="4" strokeLinecap="round" /> {/* Counterweight arm */}
            <rect x="20" y="102" width="15" height="15" rx="2" fill="#d1d5db" /> {/* Counterweight block */}

            {/* Trolley hook point */}
            <circle cx="150" cy="82" r="3" fill="#38bdf8" />
            
            {/* Suspended wire cord */}
            <motion.line
              x1="150"
              y1="82"
              x2="150"
              y2="135"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
            
            {/* Glowing Construction Cube (Core Node Block) */}
            <motion.g
              animate={{ y: [-2, 4, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Core block casing */}
              <rect x="135" y="135" width="30" height="30" rx="6" fill="url(#cube-gradient)" stroke="#22d3ee" strokeWidth="2" className="drop-shadow-[0_0_8px_#22d3ee]" />
              {/* Circuit lines on block */}
              <line x1="142" y1="145" x2="158" y2="145" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              <line x1="150" y1="145" x2="150" y2="155" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              <circle cx="150" cy="155" r="2" fill="#22d3ee" className="animate-ping" />
            </motion.g>
          </motion.g>
        </g>

        {/* Separator / Energy Barrier in Center */}
        <path d="M 230,60 L 270,180" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5,8" opacity="0.2" />

        {/* ========================================== */}
        {/* RIGHT SIDE: ROBOT REPAIRING LAPTOP */}
        {/* ========================================== */}
        <g id="robot-repair">
          {/* Desk / Platform */}
          <rect x="290" y="190" width="180" height="8" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          
          {/* Laptop Base */}
          <rect x="340" y="180" width="70" height="6" rx="2" fill="#475569" stroke="#64748b" strokeWidth="1" />
          {/* Laptop Open Screen */}
          <rect x="360" y="130" width="45" height="50" rx="4" transform="skewX(-12)" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" className="drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]" />
          {/* Hologram/Repair light lines radiating from screen */}
          <line x1="365" y1="150" x2="350" y2="120" stroke="#38bdf8" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
          <line x1="390" y1="150" x2="410" y2="125" stroke="#38bdf8" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
          
          {/* Welding / Repair Sparks */}
          <motion.circle 
            animate={{ scale: [1, 2.5, 0], opacity: [0, 1, 0], x: [375, 360], y: [175, 160] }}
            transition={{ duration: 1, repeat: Infinity }}
            r="2" 
            fill="#facc15" 
          />
          <motion.circle 
            animate={{ scale: [1, 2.2, 0], opacity: [0, 1, 0], x: [375, 385], y: [175, 165] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
            r="1.8" 
            fill="#f97316" 
          />
          <motion.circle 
            animate={{ scale: [1, 2.8, 0], opacity: [0, 1, 0], x: [375, 370], y: [175, 150] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
            r="2.2" 
            fill="#22d3ee" 
          />

          {/* Droid Mechanic Base Chassis */}
          <rect x="420" y="110" width="40" height="40" rx="12" fill="url(#robot-gradient)" stroke="#475569" strokeWidth="2" />
          {/* Robot eye bar */}
          <rect x="425" y="120" width="22" height="6" rx="3" fill="#0f172a" />
          {/* Glowing visor */}
          <motion.rect 
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            x="427" y="122" width="18" height="2" rx="1" fill="#d946ef" className="drop-shadow-[0_0_5px_#d946ef]" 
          />
          
          {/* Mechanic Arm - Rotating to weld/repair laptop */}
          <motion.g
            animate={{ rotate: [0, -12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: '430px', originY: '140px' }}
          >
            {/* Arm joints */}
            <line x1="430" y1="140" x2="395" y2="155" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="395" y1="155" x2="375" y2="175" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
            
            {/* Welding Tool Head */}
            <circle cx="375" cy="175" r="4" fill="#334155" />
            <line x1="375" y1="175" x2="370" y2="180" stroke="#f97316" strokeWidth="2" />
            
            {/* Soldering Laser Glow */}
            <motion.polygon 
              points="370,180 373,177 362,185 368,187"
              fill="#facc15"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 0.15, repeat: Infinity }}
              style={{ originX: '370px', originY: '180px' }}
            />
          </motion.g>
        </g>

        {/* Gradients Definitions */}
        <defs>
          <linearGradient id="cube-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
          </linearGradient>
          <linearGradient id="robot-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Absolute warning badges floating */}
      <div className="absolute top-2.5 left-3 bg-cyan-500/10 border border-cyan-500/25 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-cyan-400 uppercase flex items-center gap-1.5 animate-pulse">
        <Construction size={10} />
        <span>Grid Rebuilding</span>
      </div>

      <div className="absolute bottom-2.5 right-3 bg-magenta-500/10 border border-magenta-500/20 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest text-magenta-400 uppercase flex items-center gap-1.5">
        <Laptop size={10} />
        <span>Core Patching</span>
      </div>
      
      {/* Background Gear */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-3 right-4 text-white/5 pointer-events-none"
      >
        <Settings size={28} />
      </motion.div>
    </div>
  );
}
