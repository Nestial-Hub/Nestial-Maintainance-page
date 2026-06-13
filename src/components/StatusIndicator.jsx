import { motion } from 'framer-motion';

export default function StatusIndicator() {
  return (
    <div className="flex items-center gap-2.5 bg-emerald-500/5 border border-emerald-500/20 px-4.5 py-1.5 rounded-full w-max mx-auto mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.05)]">
      <div className="relative flex h-2 w-2">
        <motion.span
          animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
        />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90 font-display">
        Maintenance in Progress
      </span>
    </div>
  );
}
