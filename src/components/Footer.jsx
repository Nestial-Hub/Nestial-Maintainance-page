import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1 }}
      className="w-full text-center mt-12 py-6 border-t border-white/[0.03]"
    >
      <p className="text-gray-500 text-xs tracking-wider uppercase font-medium">
        © 2026 NESTIAL Technologies. All rights reserved.
      </p>
      <p className="text-cyan-500/40 text-[10px] tracking-[0.25em] uppercase mt-1.5 font-display font-semibold">
        Build. Nest. Grow.
      </p>
    </motion.footer>
  );
}
