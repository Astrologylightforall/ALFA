"use client";

import { useRef, useEffect } from "react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";

export default function AboutSnippet() {
  const { language } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      // Image vs Text Meet-in-Middle
      gsap.fromTo(
        ".about-image-col",
        { x: isMobile ? 0 : -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".about-text-col",
        { x: isMobile ? 0 : 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Quote Typewriter Effect
      const quoteText = document.querySelector(".about-quote-text");
      if (quoteText) {
        const text = quoteText.textContent || "";
        quoteText.textContent = "";
        const chars = text.split("");
        
        quoteText.innerHTML = chars.map(c => `<span class="opacity-0">${c}</span>`).join("");
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".about-quote-card",
            start: "top 85%",
          }
        });

        tl.to(".about-quote-text span", {
          opacity: 1,
          duration: 0.05,
          stagger: 0.03,
          ease: "none",
        });

        // Blinking cursor
        tl.fromTo(".about-quote-cursor", { opacity: 0 }, { opacity: 1, duration: 0.4, repeat: 4, yoyo: true }, "+=0.1")
          .to(".about-quote-cursor", { opacity: 0, duration: 0.1 }); // Disappear after 2 secs
      }

      // Checkmark List Path Drawing
      gsap.fromTo(
        ".about-check-path",
        { strokeDasharray: 100, strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".about-benefits-list",
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(
        ".about-check-text",
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".about-benefits-list",
            start: "top 80%",
          }
        }
      );

      // Floating Orbit Dot (Simple GSAP rotation around center)
      gsap.to(".about-orbit-dot", {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 8,
        repeat: -1,
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="py-24 bg-primary-bg px-4 overflow-hidden relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Image framing */}
        <div className="about-image-col relative flex justify-center order-2 lg:order-1 mt-10 lg:mt-0">
          <div className="relative">
            {/* Intricate Animated SVG Mandala Backdrop */}
            <svg 
              className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)] animate-[spin_60s_linear_infinite] opacity-20 pointer-events-none z-0" 
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="48" stroke="#C9A84C" strokeWidth="0.5" fill="none" strokeDasharray="3 3"/>
              <circle cx="50" cy="50" r="45" stroke="#C9A84C" strokeWidth="0.2" fill="none" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line 
                  key={i} 
                  x1="50" y1="50" 
                  x2={(50 + 45 * Math.cos((i * 15 * Math.PI) / 180)).toFixed(4)} 
                  y2={(50 + 45 * Math.sin((i * 15 * Math.PI) / 180)).toFixed(4)} 
                  stroke="#C9A84C" strokeWidth="0.1" 
                />
              ))}
            </svg>

            {/* Orbital Dot */}
            <div className="about-orbit-dot absolute inset-0 z-20 pointer-events-none">
              <div className="absolute top-[8%] left-1/2 w-3 h-3 bg-gold-primary rounded-full shadow-[0_0_10px_#C9A84C] -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] rounded-full border-[2px] border-dashed border-gold-primary/40 p-3 overflow-hidden bg-gradient-to-b from-gold-primary/10 to-transparent shadow-[0_0_50px_rgba(201,168,76,0.1)] z-10">
              <div className="w-full h-full rounded-full bg-surface flex items-center justify-center p-2 absolute top-0 left-0 overflow-hidden">
                <img 
                  src="/images/manjul-about.png" 
                  alt="Manjul Malhotra"
                  className="w-full h-full object-cover rounded-full filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                />
              </div>
            </div>

            {/* Quote Card inside image area */}
            <div className="about-quote-card absolute -bottom-6 -right-4 md:-right-8 bg-[#152124]/95 border-l-[3px] border-gold-primary p-5 rounded-r-2xl max-w-[280px] shadow-2xl backdrop-blur-md z-30">
              <div className="font-display italic text-[15px] text-white/95 leading-relaxed relative">
                "
                <span className="about-quote-text">Jyotish Shastra is not about fatalism. It is the light that helps you navigate.</span>
                <span className="about-quote-cursor ml-[2px] inline-block w-[6px] h-[1em] bg-gold-primary align-middle" />
                "
              </div>
              <span className="text-xs text-gold-primary block mt-3 font-semibold uppercase tracking-widest">— Manjul Malhotra</span>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="about-text-col space-y-6 order-1 lg:order-2 relative z-10">
          <span className="text-gold-primary text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold font-body block opacity-80">
            Meet Your Astrologer
          </span>
          <h2 className="font-display text-[2.5rem] md:text-[3.5rem] font-bold text-white tracking-tight leading-[1.1]">
            Manjul Malhotra — Guiding Delhi NCR with Vedic Wisdom
          </h2>
          <p className="font-body text-cream/70 text-base md:text-lg leading-relaxed">
            With deep roots in classical Jyotish Shastra, Manjul Malhotra brings accuracy, compassion, and genuine insight to every consultation. Based in Subhash Nagar, New Delhi, he has guided hundreds of families and individuals through life's most critical decisions.
          </p>

          <ul className="about-benefits-list space-y-5 font-body text-[15px] md:text-base text-cream/90 pt-2">
            {[
              "Expert in Vedic Astrology (Jyotish Shastra)",
              "Specialised in Kundali Matching & Mangal Dosha",
              "Personalised guidance with warmth and non-judgment"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="mt-[2px] shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="rgba(201,168,76,0.1)"/>
                    <path className="about-check-path" d="M7 12L10.5 15.5L18 8" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="about-check-text">{text}</span>
              </li>
            ))}
          </ul>

          <div className="pt-6">
            <Link 
              href="/about" 
              className="magnetic inline-flex items-center gap-2 border-[1.5px] border-gold-primary/50 text-gold-primary font-bold px-8 py-3.5 rounded-full hover:bg-gold-primary/10 hover:border-gold-primary transition-colors shadow-lg group"
            >
              Read Full Profile
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Background Decor Stars */}
      <div className="absolute top-10 right-10 text-gold-primary/20 text-2xl animate-pulse-slow">☾</div>
      <div className="absolute bottom-20 left-10 text-gold-primary/20 text-xl animate-[pulse-slow_5s_infinite_ease-in-out]">☼</div>
    </section>
  );
}
