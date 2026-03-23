"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { CONTACT_INFO } from "@/lib/data";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const { t, language } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [sparkles, setSparkles] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    }));
    setSparkles(newSparkles);
  }, []);

  useGSAP(() => {
    if (!heroRef.current || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Entrance sequence
      tl.fromTo(
        ".hero-frame-line",
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      )
      .fromTo(
        ".hero-text-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        ".hero-astrologer",
        { x: 50, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" },
        "-=0.6"
      )
      .fromTo(
        ".hero-wheel",
        { rotate: -30, opacity: 0, scale: 0.8 },
        { rotate: 0, opacity: 0.4, scale: 1, duration: 2, ease: "power2.out" },
        "-=1.2"
      );

      // Ambient spinning backdrop infinite loop
      gsap.to(".hero-wheel-rotate", {
        rotate: 360,
        duration: 45,
        ease: "none",
        repeat: -1
      });

      // Ambient Floating Environment Sparkles
      gsap.fromTo(
        ".hero-sparkle",
        { opacity: 0, y: 0, scale: 0.5 },
        {
          opacity: () => Math.random() * 0.4 + 0.2,
          y: () => (Math.random() - 0.5) * 60,
          x: () => (Math.random() - 0.5) * 40,
          scale: () => Math.random() * 1 + 0.5,
          duration: () => Math.random() * 4 + 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { amount: 2 }
        }
      );

      // Advanced Mouse Parallax Trackers
      if (!isMobile) {
        let xToWheel = gsap.quickTo(".hero-wheel", "x", { duration: 1, ease: "power3" }),
            yToWheel = gsap.quickTo(".hero-wheel", "y", { duration: 1, ease: "power3" }),
            xToAstro = gsap.quickTo(".hero-astrologer", "x", { duration: 0.6, ease: "power3" }),
            yToAstro = gsap.quickTo(".hero-astrologer", "y", { duration: 0.6, ease: "power3" }),
            xToBadge1 = gsap.quickTo(".float-badge-1", "x", { duration: 1.5, ease: "power2" }),
            yToBadge1 = gsap.quickTo(".float-badge-1", "y", { duration: 1.5, ease: "power2" }),
            xToBadge2 = gsap.quickTo(".float-badge-2", "x", { duration: 1.2, ease: "power2" }),
            yToBadge2 = gsap.quickTo(".float-badge-2", "y", { duration: 1.2, ease: "power2" });

        const handleMouseMove = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          const xPos = (e.clientX / innerWidth - 0.5);
          const yPos = (e.clientY / innerHeight - 0.5);

          xToWheel(xPos * -40);
          yToWheel(yPos * -40);
          xToAstro(xPos * 30);
          yToAstro(yPos * 30);
          xToBadge1(xPos * -60);
          yToBadge1(yPos * -60);
          xToBadge2(xPos * 70);
          yToBadge2(yPos * 70);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }

    }, containerRef);
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 md:px-12 overflow-hidden bg-[#0A0B10]"
    >
      {/* Absolute Background Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#10191B]/80 via-[#0A0B10] to-[#0A0B10] z-0" />

      {/* Decorative Ornate Frames (Top and Bottom) */}
      <div className="hero-frame-line absolute inset-6 md:inset-10 border border-gold-primary/20 rounded-2xl pointer-events-none z-10">
        {/* Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-primary/60 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-primary/60 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-primary/60 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-primary/60 rounded-br-xl" />
        
        {/* Accent Diamond Markers */}
        <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rotate-45 bg-gold-primary/80 border border-gold-primary/40" />
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rotate-45 bg-gold-primary/80 border border-gold-primary/40" />
      </div>
      
      {/* Decorative environment sparkles layout */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {sparkles.map((sparkle, i) => (
          <div
            key={i}
            className="hero-sparkle absolute w-1 h-1 bg-gold-primary rounded-full opacity-0"
            style={{
              top: sparkle.top,
              left: sparkle.left,
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10 pt-24 pb-16 lg:pt-32">
        
        {/* Left: Content layout */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 relative">
          
          <h1 className="hero-text-item font-display text-[2.75rem] leading-[1.05] md:text-6xl lg:text-[4.2rem] font-bold tracking-tight pb-3">
            <span className="text-gold-primary block mb-2">Manjul Malhotra</span>
            <span 
              className="mt-2 tracking-normal opacity-95 bg-clip-text text-transparent bg-[length:200%_auto] text-2xl md:text-3xl lg:text-[2.5rem] font-medium leading-normal"
              style={{
                backgroundImage: "linear-gradient(to right, #ffffff 0%, #C9A84C 50%, #ffffff 100%)",
                animation: "shimmer 5s linear infinite"
              }}
            >
              — Astrologer & Vastu Expert
            </span>
          </h1>

          <p className="hero-text-item font-body text-base md:text-[20px] text-cream/80 max-w-xl leading-relaxed">
            Unlock Your True Potential - Professional Astrology & Vastu Consultations
          </p>

          <div className="hero-text-item flex flex-col sm:flex-row items-center gap-4 pt-6 w-full sm:w-auto">
            <Link
              href="/contact"
              className="relative overflow-hidden group w-full sm:w-auto bg-gradient-to-r from-gold-primary via-[#F5E1A4] to-gold-primary text-black font-display font-bold px-10 py-4 rounded-full shadow-[0_10px_40px_rgba(201,168,76,0.4)] hover:shadow-[0_15px_60px_rgba(201,168,76,0.6)] hover:scale-105 transition-all duration-500 flex items-center justify-center gap-3 text-sm md:text-base border border-white/40 bg-[length:200%_auto] hover:bg-right"
              style={{ transition: 'background-position 0.8s ease-out, transform 0.5s ease' }}
            >
              {/* Shine effect that sweeps across on hover */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
              
              <span className="relative z-10 flex items-center gap-2">Book Free Consultation <span className="group-hover:translate-x-2 transition-transform duration-300">→</span></span>
            </Link>
          </div>

          {/* Quote Card inside Hero */}
          <div className="hero-text-item bg-surface/10 backdrop-blur-xl border border-gold-primary/30 p-6 rounded-2xl max-w-sm mt-6 relative shadow-[0_8px_32px_rgba(201,168,76,0.15)] flex flex-col group hover:shadow-[0_8px_32px_rgba(201,168,76,0.25)] transition-all duration-500">
             <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center text-primary-bg text-2xl font-display shadow-lg group-hover:scale-110 transition-transform">“</div>
             <p className="font-body text-cream/90 italic text-[14px] leading-relaxed pl-4 pr-2 mt-2">
               "Jyotish Shastra is not about fatalism. It is the light that helps you navigate."
             </p>
             <p className="text-gold-primary text-[10px] font-bold mt-4 tracking-[0.2em] pl-4 uppercase">
               — Manjul Malhotra
             </p>
          </div>

          <p className="hero-text-item text-cream/40 text-[10px] font-medium tracking-[0.3em] pt-4 uppercase">Expert Vedic Astrologer</p>
        </div>

        {/* Right: Astrological visual and layout */}
        <div className="lg:col-span-6 relative flex justify-center items-center w-full mt-10 lg:mt-0 min-h-[400px] md:min-h-[500px]">
          
          {/* Floating Glassmorphism Badge */}
          <div className="float-badge-1 absolute top-10 right-0 md:-right-10 bg-surface/20 backdrop-blur-2xl border border-white/10 p-4 rounded-3xl shadow-2xl z-30 animate-[float_6s_ease-in-out_infinite] flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold-primary/20 flex items-center justify-center text-gold-primary text-xl">
              ✨
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">100% Verified</p>
              <p className="text-gold-primary/80 text-[10px] uppercase tracking-wider">Vedic Solutions</p>
            </div>
          </div>

          {/* Another Floating Badge */}
          <div className="float-badge-2 absolute bottom-20 left-0 md:-left-12 bg-surface/20 backdrop-blur-2xl border border-white/10 p-4 rounded-3xl shadow-2xl z-30 animate-[float_7s_ease-in-out_infinite_reverse] flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-xl">
              🔮
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Accurate</p>
              <p className="text-indigo-300/80 text-[10px] uppercase tracking-wider">Predictions</p>
            </div>
          </div>

          {/* Astrological Chart / Sun Backdrop (Layer wheel) */}
          <div className="hero-wheel absolute w-[150%] max-w-[450px] md:w-[600px] aspect-square rounded-full opacity-35 filter pointer-events-none -z-10 flex items-center justify-center">
            {/* Sun graphic backdrop from template design */}
            <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/open-peeps/svg?seed=sun&backgroundColor=transparent')] bg-center bg-contain opacity-20" />
            
            <img 
              src="/images/mystic-hero.png"
              alt="Astrological Chart"
              className="hero-wheel-rotate w-full h-full object-cover rounded-full filter drop-shadow-[0_0_50px_rgba(201,168,76,0.3)]"
            />
          </div>

          {/* Glowing central orb background behind person */}
          <div className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-gold-primary/40 to-indigo-500/20 filter blur-[100px] rounded-full animate-pulse-slow" />

          {/* Large portrait image layout */}
          <div className="hero-astrologer relative w-full h-[380px] md:h-[500px] flex items-end justify-center z-10 group">
            <img 
              src="/images/manjul-hero.png" 
              alt="Manjul Malhotra" 
              className="h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] scale-110 origin-bottom transition-transform duration-700 group-hover:scale-[1.15]"
            />
          </div>
        </div>

      </div>

      {/* Sub-header bottom quick stats banner explicitly adhering design styles */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 space-x-12 hidden md:flex items-center text-center z-20 font-display">
        <div>
           <p className="text-2xl font-bold text-white flex justify-center gap-1">5.0<span className="text-gold-primary">★</span></p>
           <p className="text-[10px] text-cream/60 uppercase tracking-widest font-body">Google Rating</p>
        </div>
        <div className="w-[1px] h-6 bg-white/10" />
        <div>
           <p className="text-2xl font-bold text-white">100%</p>
           <p className="text-[10px] text-cream/60 uppercase tracking-widest font-body">Satisfaction</p>
        </div>
         <div className="w-[1px] h-6 bg-white/10" />
        <div>
           <p className="text-2xl font-bold text-white">10+</p>
           <p className="text-[10px] text-cream/60 uppercase tracking-widest font-body">Years Experience</p>
        </div>
         <div className="w-[1px] h-6 bg-white/10" />
        <div>
           <p className="text-2xl font-bold text-white text-gold-primary">Free</p>
           <p className="text-[10px] text-cream/60 uppercase tracking-widest font-body">Consultations</p>
        </div>
      </div>
    </section>
  );
}
