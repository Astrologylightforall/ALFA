"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";
import { SweepHeading } from "@/components/ui/AnimatedText";

interface ServiceHeroProps {
  title: string;
  titleHindi: string;
}

export default function ServiceHero({ title, titleHindi }: ServiceHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    if (!sectionRef.current || !bgRef.current || isMobile) return;

    // Parallax background (moves at 0.5x speed)
    gsap.to(bgRef.current, {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

  }, [isMobile]);

  return (
    <section ref={sectionRef} className="relative h-[45vh] min-h-[400px] flex items-center justify-center text-center px-4 overflow-hidden bg-primary-bg mt-[-6rem]">
      
      {/* Background layer for parallax */}
      <div 
        ref={bgRef} 
        className="absolute -inset-[20%] z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-primary/10 via-primary-bg to-secondary-bg"></div>
        {/* Subtle mandala behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] w-[800px] h-[800px] pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
             <circle cx="50" cy="50" r="48" stroke="#ceb260" strokeWidth="0.5" fill="none" strokeDasharray="2 4"/>
             <circle cx="50" cy="50" r="40" stroke="#ceb260" strokeWidth="0.2" fill="none" />
             {Array.from({ length: 12 }).map((_, i) => (
                <line 
                  key={i} 
                  x1="50" y1="50" 
                  x2={(50 + 48 * Math.cos((i * 30 * Math.PI) / 180)).toFixed(4)} 
                  y2={(50 + 48 * Math.sin((i * 30 * Math.PI) / 180)).toFixed(4)} 
                  stroke="#ceb260" strokeWidth="0.2" 
                />
              ))}
          </svg>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-bg/80 to-secondary-bg z-10"></div>
      
      <div className="max-w-4xl mx-auto z-20 space-y-4 pt-16 relative">
        <SweepHeading>
          <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight block pb-2">
            {title}
          </span>
        </SweepHeading>
        
        <p className="font-body text-gold-primary text-sm md:text-base uppercase tracking-[0.3em] font-bold opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
          {titleHindi}
        </p>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
