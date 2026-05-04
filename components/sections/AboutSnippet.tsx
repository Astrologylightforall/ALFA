"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";
import SectionTransition from "@/components/transitions/SectionTransition";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSnippet() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobileQuery = useMediaQuery("(max-width: 768px)");
  const [hasMounted, setHasMounted] = useState(false);
  const isMobile = hasMounted && isMobileQuery;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: simple fade-in, no lateral movement
        gsap.fromTo(
          ".about-image-col",
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
          }
        );
        gsap.fromTo(
          ".about-text-col",
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
          }
        );
      } else {
        // Desktop: slide from sides
        gsap.fromTo(
          ".about-image-col",
          { x: -60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
        gsap.fromTo(
          ".about-text-col",
          { x: 60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
      }

      // Orbit Animation (both)
      gsap.to(".about-orbit-dot", {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  /* ─────────────────────── MOBILE LAYOUT ─────────────────────── */
  if (isMobile) {
    return (
      <SectionTransition
        sectionId="about"
        entranceFrom="fade"
        exitTo="fade"
        className="py-14 bg-primary-bg px-5 overflow-hidden relative border-t border-white/5"
      >
        <div ref={sectionRef} className="flex flex-col gap-10">
          {/* Text First on Mobile */}
          <div className="about-text-col space-y-5 relative z-10">
            <div className="space-y-2">
              <span className="text-gold-primary text-[11px] uppercase tracking-[0.3em] font-bold block opacity-90">
                Meet Your Astrologer
              </span>
              <h2 className="font-display text-[1.8rem] font-bold text-white tracking-tight leading-[1.15]">
                Manjul Malhotra — Guiding Delhi NCR with Vedic Wisdom
              </h2>
            </div>

            <p className="font-body text-cream/70 text-[15px] leading-relaxed">
              With deep roots in classical Jyotish Shastra, Manjul Malhotra brings accuracy, compassion, and genuine insight to every consultation.
            </p>

            <ul className="space-y-4 pt-1">
              {[
                "Expert in Vedic Astrology (Jyotish Shastra)",
                "Specialised in Kundali Matching & Mangal Dosha",
                "Personalised guidance with warmth and non-judgment"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-gold-primary/10 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="font-body text-cream/90 text-[14px]">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image: Full width, centered, no overlapping elements */}
          <div className="about-image-col relative flex justify-center">
            <div className="relative w-64 h-64 rounded-full border border-gold-primary/30 p-3 bg-gradient-to-b from-gold-primary/5 to-transparent z-10 shadow-2xl">
              <div className="w-full h-full rounded-full bg-surface flex items-center justify-center p-1 relative overflow-hidden border border-white/5">
                <Image
                  src="/images/manjul-about.png"
                  alt="Manjul Malhotra"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Orbit Dot */}
            <div className="about-orbit-dot absolute inset-[-10px] z-20 pointer-events-none" style={{ width: "calc(100%)", height: "calc(100%)", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-gold-primary rounded-full shadow-[0_0_10px_#C9A84C] -translate-x-1/2" />
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-transparent border border-gold-primary/50 text-gold-primary font-bold px-8 py-3.5 rounded-full text-sm"
            >
              Read Full Profile
              <span>→</span>
            </Link>
          </div>
        </div>
      </SectionTransition>
    );
  }

  /* ─────────────────────── DESKTOP LAYOUT ─────────────────────── */
  return (
    <SectionTransition
      sectionId="about"
      entranceFrom="fade"
      exitTo="fade"
      className="py-32 bg-primary-bg px-4 overflow-hidden relative border-t border-white/5"
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto grid grid-cols-2 gap-24 items-center">

        {/* Left: Image framing */}
        <div className="about-image-col relative flex justify-center">
          <div className="relative group">
            {/* Animated Mandala Backdrop */}
            <svg
              className="absolute inset-[-60px] w-[calc(100%+120px)] h-[calc(100%+120px)] animate-[spin_80s_linear_infinite] opacity-10 pointer-events-none z-0 text-gold-primary"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.3" fill="none" strokeDasharray="2 4" />
              {Array.from({ length: 12 }).map((_, i) => (
                <circle
                  key={i}
                  cx="50" cy="50" r={10 + i * 3}
                  stroke="currentColor"
                  strokeWidth="0.1"
                  fill="none"
                  opacity={1 - i * 0.08}
                />
              ))}
            </svg>

            {/* Orbital Dot */}
            <div className="about-orbit-dot absolute inset-[-30px] z-20 pointer-events-none">
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-gold-primary rounded-full shadow-[0_0_15px_#C9A84C] -translate-x-1/2" />
            </div>

            <div className="relative w-[480px] h-[480px] rounded-full border border-gold-primary/30 p-4 bg-gradient-to-b from-gold-primary/5 to-transparent z-10 shadow-2xl">
              <div className="w-full h-full rounded-full bg-surface flex items-center justify-center p-1 relative overflow-hidden border border-white/5">
                <Image
                  src="/images/manjul-about.png"
                  alt="Manjul Malhotra"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-full filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>

            {/* Quote Card */}
            <div className="about-quote-card absolute -bottom-4 -right-10 bg-surface/90 border-l-[4px] border-gold-primary p-6 rounded-r-2xl max-w-[300px] shadow-2xl backdrop-blur-xl z-30">
              <p className="font-display italic text-[16px] text-white/90 leading-relaxed">
                &quot;Jyotish Shastra is not about fatalism. It is the light that helps you navigate life&apos;s currents.&quot;
              </p>
              <span className="text-[10px] text-gold-primary block mt-4 font-bold uppercase tracking-[0.2em]">— Manjul Malhotra</span>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="about-text-col space-y-8 relative z-10">
          <div className="space-y-2">
            <span className="text-gold-primary text-xs uppercase tracking-[0.3em] font-bold block opacity-90">
              Meet Your Astrologer
            </span>
            <h2 className="font-display text-[3.8rem] font-bold text-white tracking-tight leading-[1.1]">
              Manjul Malhotra — Guiding Delhi NCR with Vedic Wisdom
            </h2>
          </div>

          <p className="font-body text-cream/70 text-xl leading-relaxed">
            With deep roots in classical Jyotish Shastra, Manjul Malhotra brings accuracy, compassion, and genuine insight to every consultation. Based in Subhash Nagar, New Delhi, he has guided hundreds of families through life&apos;s most critical decisions.
          </p>

          <ul className="space-y-6 pt-2">
            {[
              "Expert in Vedic Astrology (Jyotish Shastra)",
              "Specialised in Kundali Matching & Mangal Dosha",
              "Personalised guidance with warmth and non-judgment"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <div className="mt-1 w-6 h-6 rounded-full bg-gold-primary/10 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="font-body text-cream/90 text-lg">{text}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 bg-transparent border border-gold-primary/50 text-gold-primary font-bold px-10 py-4 rounded-full hover:bg-gold-primary hover:text-primary-bg transition-all duration-300 shadow-lg group"
            >
              Read Full Profile
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
