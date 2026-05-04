"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";
import CelestialBackground from "@/components/ui/CelestialBackground";
import LiquidMagneticButton from "@/components/ui/LiquidMagneticButton";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobileQuery = useMediaQuery("(max-width: 1024px)");
  const [hasMounted, setHasMounted] = useState(false);
  const isMobile = hasMounted && isMobileQuery;
  const [sparkles, setSparkles] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setSparkles(
      Array.from({ length: 25 }, () => ({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      }))
    );
  }, []);

  useGSAP(() => {
    if (!heroRef.current || !containerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (isMobile) {
        // Mobile: simple fade-in sequence, no parallax
        tl.fromTo(
          ".hero-text-item",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
        )
        .fromTo(
          ".hero-astrologer",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        );
      } else {
        // Desktop: full entrance sequence with frame + parallax
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
          );

        // Ambient Floating Environment Sparkles (desktop only)
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

        // Advanced Mouse Parallax Trackers (desktop only)
        const xToAstro = gsap.quickTo(".hero-astrologer", "x", { duration: 0.8, ease: "power3" });
        const yToAstro = gsap.quickTo(".hero-astrologer", "y", { duration: 0.8, ease: "power3" });
        const xToBadge1 = gsap.quickTo(".float-badge-1", "x", { duration: 1.5, ease: "power2" });
        const yToBadge1 = gsap.quickTo(".float-badge-1", "y", { duration: 1.5, ease: "power2" });
        const xToBadge2 = gsap.quickTo(".float-badge-2", "x", { duration: 1.2, ease: "power2" });
        const yToBadge2 = gsap.quickTo(".float-badge-2", "y", { duration: 1.2, ease: "power2" });

        const handleMouseMove = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          const xPos = (e.clientX / innerWidth - 0.5);
          const yPos = (e.clientY / innerHeight - 0.5);

          xToAstro(xPos * 40);
          yToAstro(yPos * 40);
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

  /* ─────────────────────── MOBILE LAYOUT ─────────────────────── */
  if (isMobile) {
    return (
      <section
        ref={heroRef}
        className="relative flex flex-col bg-primary-bg overflow-hidden pb-6"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary-bg/80 via-primary-bg to-primary-bg z-0" />

        <div ref={containerRef} className="relative z-10 flex flex-col w-full">
          {/* ── Astrologer Image: FULL WIDTH, NO OVERLAP ── */}
          <div className="hero-astrologer relative w-full flex items-end justify-center pt-4">
            <Image
              src="/images/manjul-hero.png"
              alt="Manjul Malhotra - Best Astrologer in Delhi"
              width={600}
              height={800}
              priority
              className="w-[85%] max-w-[340px] h-auto object-contain filter drop-shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* ── Text Content: Below Image ── */}
          <div className="flex flex-col items-center text-center px-5 pt-6 space-y-5">
            <h1 className="hero-text-item font-display text-[2.2rem] leading-[1.1] font-bold tracking-tight">
              <span className="text-gold-primary block mb-1 text-glow">
                Manjul Malhotra
              </span>
              <span
                className="tracking-normal opacity-95 bg-clip-text text-transparent bg-[length:200%_auto] text-lg font-medium leading-normal block mt-1"
                style={{
                  backgroundImage: "linear-gradient(to right, #ffffff 0%, #C9A84C 50%, #ffffff 100%)",
                  animation: "shimmer 5s linear infinite"
                }}
              >
                — Astrologer & Vastu Expert
              </span>
            </h1>

            <p className="hero-text-item font-body text-[15px] text-cream/80 max-w-xs leading-relaxed">
              Unlock Your True Potential — Professional Astrology & Vastu Consultations based on ancient Vedic wisdom.
            </p>

            <div className="hero-text-item w-full pt-2">
              <LiquidMagneticButton size="lg" className="w-full shadow-gold-primary/20 shadow-lg">
                Book Free Consultation →
              </LiquidMagneticButton>
            </div>
          </div>

          {/* ── Mobile Stats Row ── */}
          <div className="hero-text-item grid grid-cols-4 gap-2 px-4 pt-8 pb-2">
            {[
              { label: "Google", val: "5.0", unit: "★" },
              { label: "Reviews", val: "100", unit: "%" },
              { label: "Years", val: "10", unit: "+" },
              { label: "Analysis", val: "Free", unit: "" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <p className="text-lg font-bold text-gold-primary font-display leading-none">
                  {stat.val}<span className="text-sm">{stat.unit}</span>
                </p>
                <p className="text-[9px] text-cream/50 uppercase tracking-wider font-body mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ─────────────────────── DESKTOP LAYOUT ─────────────────────── */
  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-primary-bg"
    >
      {/* Absolute Background Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary-bg/80 via-primary-bg to-primary-bg z-0" />

      {/* Decorative Ornate Frame */}
      <div className="hero-frame-line absolute inset-10 border border-gold-primary/20 rounded-2xl pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-primary/60 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-primary/60 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-primary/60 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-primary/60 rounded-br-xl" />
        <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rotate-45 bg-gold-primary/80 border border-gold-primary/40" />
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rotate-45 bg-gold-primary/80 border border-gold-primary/40" />
      </div>

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

      <div ref={containerRef} className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-10 items-center z-10 pt-24">
        {/* Left: Content */}
        <div className="col-span-6 flex flex-col items-start text-left space-y-6 relative">
          <h1 className="hero-text-item font-display text-6xl lg:text-[4.5rem] leading-[1.1] font-bold tracking-tight pb-3">
            <span className="text-gold-primary block mb-2 text-glow">
              Manjul Malhotra
            </span>
            <span
              className="mt-2 tracking-normal opacity-95 bg-clip-text text-transparent bg-[length:200%_auto] text-3xl lg:text-[2.8rem] font-medium leading-normal"
              style={{
                backgroundImage: "linear-gradient(to right, #ffffff 0%, #C9A84C 50%, #ffffff 100%)",
                animation: "shimmer 5s linear infinite"
              }}
            >
              — Astrologer & Vastu Expert
            </span>
          </h1>

          <p className="hero-text-item font-body text-[20px] text-cream/80 max-w-xl leading-relaxed">
            Unlock Your True Potential - Professional Astrology & Vastu Consultations based on ancient Vedic wisdom.
          </p>

          <div className="hero-text-item flex items-center gap-4 pt-6">
            <LiquidMagneticButton size="lg" className="shadow-gold-primary/20 shadow-lg">
              Book Free Consultation →
            </LiquidMagneticButton>
          </div>

          <div className="hero-text-item glass-card p-6 rounded-2xl max-w-sm mt-6 relative flex flex-col group border-gold-primary/20">
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center text-primary-bg text-2xl font-display shadow-lg">"</div>
            <p className="font-body text-cream/90 italic text-[14px] leading-relaxed pl-4 pr-2 mt-2">
              &quot;Jyotish Shastra is not about fatalism. It is the light that helps you navigate your path with clarity.&quot;
            </p>
          </div>
        </div>

        {/* Right: Visuals */}
        <div className="col-span-6 relative flex justify-center items-center w-full min-h-[550px]">
          <CelestialBackground />

          <div className="float-badge-1 absolute top-10 -right-10 glass-card p-4 rounded-3xl z-30 animate-[float_6s_ease-in-out_infinite] flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold-primary/20 flex items-center justify-center text-gold-primary text-xl">✨</div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">100% Verified</p>
              <p className="text-gold-primary/80 text-[10px] uppercase tracking-wider">Vedic Solutions</p>
            </div>
          </div>

          <div className="float-badge-2 absolute bottom-20 -left-12 glass-card p-4 rounded-3xl shadow-2xl z-30 animate-[float_7s_ease-in-out_infinite_reverse] flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary-bg flex items-center justify-center text-gold-primary text-xl">🔮</div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Accurate</p>
              <p className="text-gold-primary/80 text-[10px] uppercase tracking-wider">Predictions</p>
            </div>
          </div>

          <div className="hero-astrologer relative w-full h-[550px] flex items-end justify-center z-10 group">
            <Image
              src="/images/manjul-hero.png"
              alt="Manjul Malhotra"
              width={600}
              height={800}
              priority
              className="h-full w-auto object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] scale-110 origin-bottom"
            />
          </div>
        </div>
      </div>

      {/* Stats Bar (Desktop) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 space-x-12 flex items-center text-center z-20 font-display">
        {[
          { label: "Google Rating", val: "5.0", unit: "★", color: "text-gold-primary" },
          { label: "Satisfaction", val: "100", unit: "%" },
          { label: "Years Experience", val: "10", unit: "+" },
          { label: "Consultations", val: "Free", unit: "", color: "text-gold-primary" }
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-12">
            <div>
              <p className="text-2xl font-bold text-white flex justify-center gap-1">
                {stat.val}<span className={stat.color || "text-white"}>{stat.unit}</span>
              </p>
              <p className="text-[10px] text-cream/60 uppercase tracking-widest font-body">{stat.label}</p>
            </div>
            {i < 3 && <div className="w-[1px] h-6 bg-white/10" />}
          </div>
        ))}
      </div>
    </section>
  );
}
