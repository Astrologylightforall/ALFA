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

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {postIds.map((id) => (
            <div
              key={id}
              className="insta-card w-full aspect-[9/16] rounded-2xl overflow-hidden border border-border-accent/40 bg-surface/40 relative shadow-xl group transition-all duration-500 hover:scale-[1.02] hover:border-gold-primary/60 hover:shadow-[0_20px_40px_rgba(201,168,76,0.15)]"
            >
              {/* Note: Autoplay is not supported by Instagram iframe embeds due to browser & platform restrictions.
                  If you want reels to autoplay, they should be standard <video> tags with .mp4 files. */}
              <iframe
                src={`https://www.instagram.com/p/${id}/embed`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                title={`Instagram Post ${id}`}
                style={{ width: "calc(100% + 2px)", height: "calc(100% + 2px)", margin: "-1px" }}
                className="transition-transform duration-700 ease-out"
              ></iframe>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12 md:mt-16">
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
