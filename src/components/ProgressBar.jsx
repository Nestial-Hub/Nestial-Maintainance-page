import { motion } from 'framer-motion';

export default function ProgressBar() {
  return (
    <div className="w-full max-w-md mx-auto my-5 px-4 font-mono select-none">
      
      {/* Label and percent readouts */}
      <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
          Core Compiler Optimization
        </span>
        <span className="drop-shadow-[0_0_6px_#22d3ee]">87%</span>
      </div>

      {/* Progress Track */}
      <div className="h-2.5 w-full bg-black/40 border border-white/10 rounded-full p-[2px] relative shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
        {/* Animated Fill */}
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '87%' }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full relative shadow-[0_0_10px_#22d3ee]"
        >
          {/* Glowing particle at current fill point */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
        </motion.div>
      </div>

      {/* Subtext info */}
      <div className="flex justify-between items-center text-[8px] text-gray-500 uppercase tracking-widest mt-1.5">
        <span>Block Index: 894,103</span>
        <span>Est: 42s remaining</span>
      </div>
    </div>
  );
}
