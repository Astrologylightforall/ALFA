"use client";

import { useRef, useEffect } from "react";
import { STATS_DATA } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";

// Utility to create particles
const createParticles = (container: HTMLElement) => {
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div");
    particle.className = "absolute w-1.5 h-1.5 bg-gold-primary rounded-full pointer-events-none";
    
    // Start at center
    gsap.set(particle, { 
      x: "50%", 
      y: "50%", 
      xPercent: -50, 
      yPercent: -50,
      opacity: 1 
    });
    
    container.appendChild(particle);

    const angle = (i / 12) * Math.PI * 2;
    const distance = gsap.utils.random(30, 60);

    gsap.to(particle, {
      x: `+=${Math.cos(angle) * distance}`,
      y: `+=${Math.sin(angle) * distance}`,
      opacity: 0,
      scale: gsap.utils.random(0.2, 1),
      duration: gsap.utils.random(0.6, 1),
      ease: "power2.out",
      onComplete: () => particle.remove()
    });
  }
};

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    if (!sectionRef.current) return;

    if (isMobile) {
      // Provide simple fade on mobile
      gsap.set(".stat-col", { opacity: 1, scale: 1 });
      gsap.set(".stat-divider", { scaleY: 1 });
      
      const counters = document.querySelectorAll(".stat-number");
      counters.forEach((el) => {
        const targetVal = el.getAttribute("data-val") || "0";
        el.textContent = targetVal + (el.getAttribute("data-suffix") || "");
      });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      }
    });

    // Animate Columns
    tl.fromTo(
      ".stat-col",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.5)" }
    );

    // Animate Dividers downward
    tl.fromTo(
      ".stat-divider",
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 0.6, ease: "power2.out" },
      0.4
    );

    // Counters
    const counters = document.querySelectorAll(".stat-number");
    counters.forEach((el, i) => {
      const targetStr = el.getAttribute("data-val") || "0";
      const hasDecimal = targetStr.includes(".");
      const suffix = el.getAttribute("data-suffix") || "";
      const val = parseFloat(targetStr);

      if (isNaN(val)) {
        el.textContent = targetStr + suffix;
        return;
      }

      const obj = { val: 0 };
      
      // Delay each counter slightly synced with its column
      tl.to(obj, {
        val: val,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = (hasDecimal ? obj.val.toFixed(1) : Math.floor(obj.val)) + suffix;
        },
        onComplete: () => {
          // Burst explosion!
          const container = el.parentElement;
          if (container) createParticles(container);
        }
      }, 0.2 + (i * 0.2));
    });

  }, [isMobile]);

  return (
    <section ref={sectionRef} className="bg-[#10191B]/80 backdrop-blur-xl border-y border-white/5 py-12 px-4 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap md:grid md:grid-cols-4 gap-y-10 justify-center relative">
        {STATS_DATA.map((stat, index) => {
          const isNumeric = stat.number.match(/\d+/);
          const rawNum = isNumeric ? stat.number.replace(/[^\d.]/g, '') : stat.number;
          const suffix = isNumeric ? stat.number.replace(/[0-9.]/g, '') : '';

          return (
            <div key={stat.label} className="stat-col flex flex-col items-center justify-center text-center space-y-1 relative w-[50%] md:w-full">
              
              {/* Number Container required for absolute particle positioning */}
              <div className="relative inline-block">
                <span 
                  className="stat-number font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gold-primary tracking-tight"
                  data-val={rawNum}
                  data-suffix={suffix}
                >
                  0
                </span>
              </div>
              
              {/* Label */}
              <span className="font-body text-[13px] md:text-sm font-bold text-white uppercase tracking-wider pt-1 opacity-90">
                {stat.label}
              </span>
              
              {/* Sublabel */}
              <span className="font-body text-xs text-cream/50">
                {stat.sublabel}
              </span>

              {/* Vertical Divider on Desktop */}
              {index < STATS_DATA.length - 1 && (
                <div className="stat-divider absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent via-gold-primary/20 to-transparent hidden md:block" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
