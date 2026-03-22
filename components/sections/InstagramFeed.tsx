"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";

import { useState, useEffect } from "react";

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeIndex, setActiveIndex] = useState(0);

  // Live post IDs
  const postIds = [
    "DVnwkUWD3tb",
    "DVB2IUVE0Wa",
    "DU2u19_j3lp",
    "DUtGpqaj2r2",
    "DUoA_W8j5Vd",
    "DUa6DcwjxtV"
  ];

  // Auto-play interval cycler
  useEffect(() => {
    if (isMobile) return; 
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % postIds.length);
    }, 5000); // 5 sec is a safe rate
    return () => clearInterval(interval);
  }, [isMobile, postIds.length]);

  // Scroll to active index
  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;
    
    const cards = container.querySelectorAll('.insta-card');
    const targetCard = cards[activeIndex] as HTMLElement;
    if (targetCard) {
      container.scrollTo({
        left: targetCard.offsetLeft - container.offsetWidth / 2 + targetCard.offsetWidth / 2,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, isMobile]);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (isMobile) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
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

      {/* Scrollable Container with Arrows */}
      <div className="relative max-w-6xl mx-auto px-4">
        
        {/* Nav Buttons (Desktop) */}
        {!isMobile && (
          <>
            <button 
              onClick={() => setActiveIndex((prev) => (prev - 1 + postIds.length) % postIds.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-surface/80 hover:bg-surface border border-border-accent p-4 rounded-full text-gold-primary backdrop-blur-md shadow-lg z-20 cursor-pointer hover:border-gold-primary hover:scale-110 transition-all font-bold flex items-center justify-center w-12 h-12"
            >
              ←
            </button>
            <button 
              onClick={() => setActiveIndex((prev) => (prev + 1) % postIds.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-surface/80 hover:bg-surface border border-border-accent p-4 rounded-full text-gold-primary backdrop-blur-md shadow-lg z-20 cursor-pointer hover:border-gold-primary hover:scale-110 transition-all font-bold flex items-center justify-center w-12 h-12"
            >
              →
            </button>
          </>
        )}

        <div 
          ref={containerRef}
          className="flex flex-col md:flex-row md:flex-nowrap gap-6 overflow-y-visible md:overflow-x-auto snap-y md:snap-x snap-mandatory pb-6 md:pb-8 scrollbar-hide items-center"
        >
        {postIds.map((id, index) => {
          const isActive = index === activeIndex;
          return (
          <div
            key={id}
            onClick={() => !isMobile && setActiveIndex(index)}
            className={`insta-card w-full md:min-w-[360px] md:max-w-[400px] aspect-[10/14] rounded-2xl overflow-hidden border border-border-accent/40 bg-surface/40 relative shadow-xl snap-center group transition-all duration-700 ease-out cursor-pointer ${
              isMobile ? 'scale-100 opacity-100' : isActive ? 'scale-105 opacity-100 z-10 border-gold-primary/60 shadow-[0_20px_40px_rgba(201,168,76,0.15)]' : 'scale-90 opacity-40 filter blur-[4px] hover:opacity-70 hover:blur-[2px]'
            }`}
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
        );})}
        </div>

        {/* Dots Pagination */}
        {!isMobile && (
          <div className="flex justify-center gap-2 mt-4">
            {postIds.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full border border-gold-primary/40 transition-all duration-300 cursor-pointer ${i === activeIndex ? "bg-gold-primary w-6" : "bg-gold-primary/20"}`}
              />
            ))}
          </div>
        )}
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
