"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Live post IDs
  const postIds = [
    "DVnwkUWD3tb",
    "DVB2IUVE0Wa",
    "DU2u19_j3lp",
    "DUtGpqaj2r2",
    "DUoA_W8j5Vd",
    "DUa6DcwjxtV"
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    if (isMobile) {
      gsap.set(".insta-card", { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.fromTo(
      ".insta-card",
      { y: 60, scale: 0.9, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="py-24 bg-primary-bg px-4 relative z-10 border-t border-border-accent">
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
        <h2 className="font-display text-[2.5rem] md:text-5xl font-bold text-white tracking-tight leading-tight">
          Follow @astrologylight4all
        </h2>
        <p className="font-body text-cream/70 text-sm md:text-base max-w-md mx-auto">
          View daily Nakshatra updates, Moolank insights, and Vedic wisdom live from Instagram.
        </p>
      </div>

      {/* Vertical stack on mobile, Horizontal scroll reel on desktop */}
      <div 
        className="max-w-6xl mx-auto flex flex-col md:flex-row md:flex-nowrap gap-6 overflow-y-visible md:overflow-x-auto snap-y md:snap-x snap-mandatory pb-6 md:pb-8 scrollbar-hide px-4 md:px-0 -mx-4 md:mx-auto"
      >
        {postIds.map((id) => (
          <div
            key={id}
            className="insta-card w-full md:min-w-[360px] md:max-w-[400px] aspect-[10/14] rounded-2xl overflow-hidden border border-border-accent/40 bg-surface/40 relative shadow-xl snap-center group"
          >


            {/* Direct Individual Post iframe */}
            <iframe 
              src={`https://www.instagram.com/p/${id}/embed`} 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              title={`Instagram Post ${id}`}
              style={{ width: "calc(100% + 2px)", height: "calc(100% + 2px)", margin: "-1px" }}
              className="group-hover:scale-105 transition-transform duration-700 ease-out"
            ></iframe>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 md:mt-20">
        <a 
          href="https://www.instagram.com/astrologylight4all" 
          target="_blank" 
          rel="noopener noreferrer"
          className="magnetic inline-flex items-center gap-2 border-[1.5px] border-gold-primary/50 text-gold-primary font-bold px-10 py-4 rounded-full hover:bg-gold-primary/10 hover:border-gold-primary transition-colors shadow-lg group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Open Instagram Profile
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
          <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-[shimmer_3s_infinite_linear]" />
        </a>
      </div>
    </section>
  );
}
