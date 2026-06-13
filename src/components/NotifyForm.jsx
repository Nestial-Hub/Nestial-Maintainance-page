import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export default function NotifyForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid node address (email).');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    // Simulate server subscription
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 relative z-10 px-4">
      <AnimatePresence mode="wait">
        {status !== 'success' ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-2.5"
            noValidate
          >
            <p className="text-gray-400 text-xs text-center font-medium uppercase tracking-wider mb-1">
              Want notification when the grid is online?
            </p>
            
            <div className="relative flex items-center bg-white/[0.02] border border-white/10 rounded-xl p-1 focus-within:border-cyan-400/50 focus-within:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'loading'}
                className="w-full bg-transparent pl-4 pr-12 py-3 text-sm text-white placeholder-gray-500 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="absolute right-2.5 p-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-lg transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)] hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>

            {status === 'error' && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-400 text-xs text-left pl-2 font-medium"
              >
                {errorMsg}
              </motion.p>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-center shadow-[0_0_20px_rgba(16,185,129,0.05)]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="mb-3 text-emerald-400"
            >
              <CheckCircle className="w-8 h-8" />
            </motion.div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-1 font-display">
              Transmission Received
            </h4>
            <p className="text-gray-400 text-xs">
              We will alert you the moment systems are fully online.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
