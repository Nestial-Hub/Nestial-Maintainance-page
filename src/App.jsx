import { useEffect } from 'react';
import gsap from 'gsap';
import AmbientGridBackground from './components/AmbientGridBackground';
import MaintenanceCard from './components/MaintenanceCard';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // GSAP entry fade-ins for premium load sequence
    gsap.fromTo(".card-entry", 
      { opacity: 0, scale: 0.96, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-4 bg-transparent text-[#f8fafc] antialiased select-none relative overflow-hidden">
      
      {/* Fullscreen 3D WebGL Canvas Backdrop */}
      <AmbientGridBackground />

      {/* Header - Floating top */}
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-6xl flex items-center justify-between py-2 sm:py-2.5 px-3 sm:px-4 bg-white/[0.02] backdrop-blur-lg border border-white/10 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:border-white/20 transition-all duration-300">
        <div className="flex items-center gap-2">
          <img src="/nestial-logo.png" alt="NESTIAL Logo" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
          <span className="text-xs font-black tracking-[0.35em] text-white">NESTIAL</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
          <span className="text-[7px] sm:text-[8px] font-bold tracking-widest text-cyan-400/90 uppercase font-mono">
            System Synchronizer Active
          </span>
        </div>
      </header>

      {/* Centered Compact Card */}
      <div className="relative z-20 w-full max-w-md card-entry opacity-0">
        <MaintenanceCard />
      </div>

      {/* Footer - Floating bottom */}
      <footer className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-6xl px-4 flex justify-center">
        <Footer />
      </footer>

    </div>
  );
}

export default App;


