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

      // Parallax and exit
      if (!isMobile) {
        gsap.to(".hero-wheel", {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        });

        gsap.to(".hero-astrologer", {
          y: "8%",
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
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
          
          <h1 className="hero-text-item font-display text-[2.75rem] leading-[1.05] md:text-6xl lg:text-[4.2rem] font-bold text-white tracking-tight leading-none">
            <span className="text-gold-primary block mb-1">Manjul Malhotra</span>
            <span className="text-white text-3xl md:text-4xl lg:text-5xl font-medium block mt-1 tracking-normal opacity-90">— Astrologer & Vastu Expert</span>
          </h1>

          <p className="hero-text-item font-body text-base md:text-[20px] text-cream/80 max-w-xl leading-relaxed">
            Unlock Your True Potential - Professional Astrology & Vastu Consultations
          </p>

          <div className="hero-text-item flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            <Link
              href="/contact"
              className="magnetic relative overflow-hidden group w-full sm:w-auto text-primary-bg font-bold px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-2 text-sm border border-gold-primary"
              style={{ backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)" }}
            >
              <span className="relative z-10 flex items-center gap-2">Book Consultation <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </Link>
          </div>

          {/* Quote Card inside Hero */}
          <div className="hero-text-item bg-surface/40 backdrop-blur-md border border-gold-primary/15 p-6 rounded-2xl max-w-sm mt-6 relative shadow-2xl flex flex-col">
             <div className="absolute top-4 left-4 text-gold-primary/30 text-4xl font-display">“</div>
             <p className="font-body text-cream/90 italic text-[14px] leading-relaxed pl-4 pr-2">
               "Jyotish Shastra is not about fatalism. It is the light that helps you navigate."
             </p>
             <p className="text-gold-primary text-xs font-bold mt-3 tracking-widest pl-4 uppercase">
               — Manjul Malhotra
             </p>
          </div>

          <p className="hero-text-item text-cream/50 text-xs font-medium tracking-wider pt-2">Manjul Malhotra, Expert Astrologer</p>
        </div>

        {/* Right: Astrological visual and layout */}
        <div className="lg:col-span-6 relative flex justify-center items-center w-full mt-10 lg:mt-0 min-h-[400px] md:min-h-[500px]">
          
          {/* Astrological Chart / Sun Backdrop (Layer wheel) */}
          <div className="hero-wheel absolute w-[150%] max-w-[450px] md:w-[600px] aspect-square rounded-full opacity-35 filter pointer-events-none -z-10 flex items-center justify-center">
            {/* Sun graphic backdrop from template design */}
            <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/open-peeps/svg?seed=sun&backgroundColor=transparent')] bg-center bg-contain opacity-20" />
            
            <img 
              src="/images/mystic-hero.png"
              alt="Astrological Chart"
              className="hero-wheel-rotate w-full h-full object-cover rounded-full filter drop-shadow-[0_0_30px_rgba(201,168,76,0.2)]"
            />
          </div>

          {/* Glowing central orb background behind person */}
          <div className="absolute w-[300px] h-[300px] bg-gold-primary/25 filter blur-[100px] rounded-full" />

          {/* Large portrait image layout */}
          <div className="hero-astrologer relative w-full h-[380px] md:h-[500px] flex items-end justify-center z-10">
            <img 
              src="/images/manjul-hero.png" 
              alt="Manjul Malhotra" 
              className="h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] scale-110 origin-bottom"
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
