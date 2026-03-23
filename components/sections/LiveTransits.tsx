"use client";

import { useEffect, useState } from "react";
import { Moon, Star, Orbit } from "lucide-react";

export default function LiveTransits() {
  const [moonPhase, setMoonPhase] = useState("");
  const [illumination, setIllumination] = useState(0);

  useEffect(() => {
    // Simple Moon Phase Calculator (approximate via Synodic Month)
    const getMoonPhase = (date = new Date()) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      let yy = year - Math.floor((12 - month) / 10);
      let mm = month + 9;
      if (mm >= 12) mm -= 12;
      
      let k1 = Math.floor(365.25 * (yy + 4712));
      let k2 = Math.floor(30.6 * mm + 0.5);
      let k3 = Math.floor(Math.floor((yy / 100) + 49) * 0.75) - 38;
      
      let jd = k1 + k2 + day + 59 - k3; // Julian Day
      let ip = (jd - 2451550.1) / 29.530588853;
      ip -= Math.floor(ip); // Normalize to 0-1
      
      // Illumination logic
      const illum = Math.abs(0.5 - ip) * 2; // peaks at 1 during full moon (ip=0.5)
      setIllumination(Math.round((1 - illum) * 100));

      if (ip < 0.03 || ip > 0.97) setMoonPhase("New Moon");
      else if (ip < 0.22) setMoonPhase("Waxing Crescent");
      else if (ip < 0.28) setMoonPhase("First Quarter");
      else if (ip < 0.47) setMoonPhase("Waxing Gibbous");
      else if (ip < 0.53) setMoonPhase("Full Moon");
      else if (ip < 0.72) setMoonPhase("Waning Gibbous");
      else if (ip < 0.78) setMoonPhase("Last Quarter");
      else setMoonPhase("Waning Crescent");
    };
    getMoonPhase();
  }, []);

  return (
    <section className="py-20 bg-[#06080B] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[url('/images/stars-bg.png')] opacity-20 pointer-events-none mix-blend-screen" />
      <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12 justify-between">
        
        {/* Constellation Info Block */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-primary/20 bg-gold-primary/5">
             <Orbit size={14} className="text-gold-primary" />
             <span className="text-[10px] uppercase tracking-widest text-gold-primary font-bold">Live Lunar Cycle</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
             Today's <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-400 font-serif italic pr-2 text-shadow-glow">Moon</span> Phase
          </h2>
          
          <p className="font-body text-cream/70 leading-relaxed max-w-md mx-auto md:mx-0 text-sm md:text-base">
            The moon rules our emotions, intuition, and inner world. Understanding today's lunar phase helps align your decisions with the cosmic tide.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4">
             <div className="bg-surface/50 border border-white/10 rounded-2xl p-4 md:p-6 hover:border-gold-primary/30 transition-colors group">
               <Star size={20} className="text-gold-primary mb-3 group-hover:scale-110 transition-transform" />
               <p className="text-[10px] text-cream/50 uppercase tracking-widest font-bold">Current Phase</p>
               <h3 className="text-xl font-display font-medium text-white mt-1">{moonPhase || "Calculating..."}</h3>
             </div>
             
             <div className="bg-surface/50 border border-white/10 rounded-2xl p-4 md:p-6 hover:border-gold-primary/30 transition-colors group">
               <Moon size={20} className="text-blue-200 mb-3 group-hover:scale-110 transition-transform" />
               <p className="text-[10px] text-cream/50 uppercase tracking-widest font-bold">Luminosity</p>
               <h3 className="text-xl font-display font-medium text-white mt-1">{illumination}% Illuminated</h3>
             </div>
          </div>
        </div>

        {/* Visual Moon Interface */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          
          {/* Glowing Aura Base */}
          <div className="absolute w-[280px] h-[280px] bg-blue-500/20 rounded-full blur-[80px]" />
          <div className="absolute w-[150px] h-[150px] bg-white/30 rounded-full blur-[60px]" />

          {/* Core Moon Element */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#1A1C20] overflow-hidden shadow-[inset_-20px_-20px_60px_rgba(0,0,0,0.8),_0_0_50px_rgba(255,255,255,0.1)] border border-white/20 flex items-center justify-center group animate-[pulse_6s_ease-in-out_infinite]">
             
             {/* Realistic Moon Texture Simulation */}
             <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#D9E1E8]/10 to-[#E4EAF1]/90 mix-blend-overlay opacity-80" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #ffffff 0%, #a0b2c6 40%, #1a1c20 90%)" }} />

             {/* Dynamic Shadow (Simulating Illumination) */}
             <div 
               className="absolute top-0 bottom-0 left-0 bg-black/90 mix-blend-multiply transition-all duration-[2000ms] ease-out shadow-[20px_0_40px_rgba(0,0,0,0.8)]"
               style={{ width: `${100 - illumination}%` }}
             />
             
             {/* Craters Mockup */}
             <div className="absolute w-12 h-12 rounded-full bg-black/20 top-1/4 left-1/3 blur-[2px]" />
             <div className="absolute w-16 h-16 rounded-full bg-black/10 bottom-1/3 right-1/4 blur-[4px]" />
             <div className="absolute w-8 h-8 rounded-full bg-black/30 top-1/2 right-1/3 blur-[1px]" />
          </div>

          {/* Floating UI Badges */}
          <div className="absolute top-0 right-10 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] px-3 py-1.5 rounded-full z-20 flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live Tracking
          </div>
        </div>
      </div>
    </section>
  );
}
