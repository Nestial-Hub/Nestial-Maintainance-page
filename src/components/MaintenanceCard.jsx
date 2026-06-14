import { motion } from 'framer-motion';
import StatusIndicator from './StatusIndicator';
import ProgressBar from './ProgressBar';
import NotifyForm from './NotifyForm';
import { Mail } from 'lucide-react';

export default function MaintenanceCard() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };


  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 w-full mx-auto p-5 sm:p-7 bg-slate-950/30 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-[0_0_80px_rgba(34,211,238,0.15),0_0_40px_rgba(0,0,0,0.4)] overflow-hidden hover:border-cyan-400/60 transition-all duration-500 group before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-cyan-500/50 before:to-blue-500/30 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500 before:-z-10"
    >
      {/* Top Cyber Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      {/* Cybernetic Corner Brackets */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-500/40 rounded-br-2xl pointer-events-none" />

      {/* Branding Header */}
      <motion.div variants={itemVariants} className="text-center mb-2 flex flex-col items-center">
        <img src="/nestial-logo.png" alt="NESTIAL Logo" className="w-16 h-16 sm:w-12 sm:h-12 object-contain mb-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
        <h2 className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase mb-1 font-display">
          SYSTEM RECONSTRUCTION
        </h2>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-display leading-none">
          NESTIAL
        </h1>
        <p className="text-[8px] sm:text-[9px] font-semibold tracking-[0.2em] text-white/40 uppercase mt-1 font-display">
          Build. Nest. Grow.
        </p>
      </motion.div>

      {/* System Statement */}
      <motion.div variants={itemVariants} className="text-center mt-2 space-y-2">
        <StatusIndicator />
        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight font-display">
          Core Systems Under Maintenance
        </h3>

      </motion.div>

      {/* Horizontal Neon Progress Bar */}
      <motion.div variants={itemVariants} className="mt-2.5">
        <ProgressBar />
      </motion.div>

      {/* Email newsletter form */}
      <motion.div variants={itemVariants} className="mt-2">
        <NotifyForm />
      </motion.div>

      {/* 2x2 Diagnostics Dashboard Grid */}
      <motion.div variants={itemVariants} className="mt-4 border-t border-white/5 pt-4">
        <p className="text-[8px] text-gray-500 uppercase tracking-widest text-center font-bold mb-3 font-mono">
          System Status
        </p>

      </motion.div>

      {/* Support & Social Links */}
      <motion.div variants={itemVariants} className="mt-4 flex flex-col items-center gap-2.5">
        {/* Support email link */}
        <a
          href="mailto:hub.nestial@gmail.com"
          className="text-[9px] text-cyan-400/70 hover:text-cyan-300 transition-colors font-mono tracking-wide flex items-center justify-center gap-1.5 hover:underline"
        >
          <Mail size={12} /> hub.nestial@gmail.com
        </a>

        {/* Social Icons Row */}
        <div className="flex items-center gap-4 mt-3">
          {/* Twitter / X */}
          <a href="#" aria-label="Twitter X" className="
text-cyan-400/60
hover:text-cyan-300
hover:scale-125
transition-all
duration-300
drop-shadow-[0_0_6px_rgba(34,211,238,0.15)]
hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]
 drop-shadow-[0_0_4px_transparent] hover:drop-shadow-[0_0_6px_#22d3ee]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* GitHub */}
          <a href="#" aria-label="GitHub" className="
text-cyan-400/60
hover:text-cyan-300
hover:scale-125
transition-all
duration-300
drop-shadow-[0_0_6px_rgba(34,211,238,0.15)]
hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]
 drop-shadow-[0_0_4px_transparent] hover:drop-shadow-[0_0_6px_#22d3ee]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>

          {/* Discord */}
          <a href="#" aria-label="Discord" className="
text-cyan-400/60
hover:text-cyan-300
hover:scale-125
transition-all
duration-300
drop-shadow-[0_0_6px_rgba(34,211,238,0.15)]
hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]
 drop-shadow-[0_0_4px_transparent] hover:drop-shadow-[0_0_6px_#22d3ee]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-cyan-400 hover:scale-115 transition-all duration-300 drop-shadow-[0_0_4px_transparent] hover:drop-shadow-[0_0_6px_#22d3ee]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </motion.div>

    </motion.div>
  );
}
