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
    <div className="h-screen w-full flex flex-col justify-between items-center py-6 px-4 overflow-hidden bg-transparent text-[#f8fafc] antialiased select-none relative">
      
      {/* Fullscreen 3D WebGL Canvas Backdrop */}
      <AmbientGridBackground />

      {/* Header */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between py-2.5 px-4 bg-white/[0.01] backdrop-blur-md border border-white/5 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-2">
          <img src="/nestial-logo.png" alt="NESTIAL Logo" className="w-6 h-6 object-contain" />
          <span className="text-xs font-black tracking-[0.35em] text-white">NESTIAL</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
          <span className="text-[8px] font-bold tracking-widest text-cyan-400/90 uppercase font-mono">
            System Synchronizer Active
          </span>
        </div>
      </header>

      {/* Centered Main Diagnostics Card */}
      <main className="relative z-10 w-full max-w-xl my-auto card-entry opacity-0">
        <MaintenanceCard />
      </main>

      {/* Footer */}
      <div className="relative z-10 w-full max-w-5xl">
        <Footer />
      </div>

    </div>
  );
}

export default App;


