"use client";

import { useRef, ReactNode, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// H2 Section Headings: Horizontal line sweep reveal
export function SweepHeading({ children, className = "", delay = 0 }: RevealProps) {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    if (isMobile) {
      gsap.set(textRef.current, { clipPath: "inset(0 0% 0 0)", opacity: 1 });
      gsap.set(sweepRef.current, { display: "none" });
      return;
    }

    if (!container.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
      delay
    });

    // Sweep across
    tl.fromTo(
      sweepRef.current,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.4, ease: "power2.inOut" }
    )
    // Reveal text behind it
    .fromTo(
      textRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.01 }, // reveal instantly when sweep covers it
      "-=0.2"
    )
    // Sweep away
    .to(
      sweepRef.current,
      { scaleX: 0, transformOrigin: "right", duration: 0.4, ease: "power2.inOut" },
      "-=0.1"
    );

  }, [delay, isMobile]);

  return (
    <div ref={container} className={`relative inline-block overflow-hidden ${className}`}>
      <div 
        ref={sweepRef} 
        className="absolute inset-0 bg-gold-primary z-10 origin-left" 
        style={{ transform: "scaleX(0)" }}
      />
      <h2 ref={textRef} style={{ clipPath: "inset(0 100% 0 0)" }} className="relative z-0">
        {children}
      </h2>
    </div>
  );
}

// Body Text Paragraphs: Line-by-line reveal using manual splitting approach
// Note: For full dynamic paragraphs Splitting.js is better, but this handles simple multi-line reveals
export function LineReveal({ children, className = "", delay = 0 }: RevealProps) {
  const container = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // We assume children is a string for simplistic splitting or we use CSS lines if possible.
  // Using pure GSAP + Splitting inside useGSAP
  useGSAP(() => {
    if (!container.current) return;
    
    if (isMobile) {
      gsap.set(container.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      container.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
      }
    );
  }, [delay, isMobile]);

  return (
    <div ref={container} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

// Bullet Points / Numbered Lists: Slide in from left
export function ListReveal({ children, className = "", delay = 0 }: RevealProps) {
  const container = useRef<HTMLUListElement | HTMLOListElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    if (!container.current) return;

    if (isMobile) {
      gsap.set(container.current.children, { opacity: 1, x: 0 });
      return;
    }

    gsap.fromTo(
      container.current.children,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      }
    );
  }, [delay, isMobile]);

  // We clone the children to attach refs, or just rely on DOM children since GSAP works on DOM nodes
  return (
    <div className={className} ref={container as any}>
      {children}
    </div>
  );
}

// Counter Animation for Stats
export function CounterReveal({ value, suffix = "", prefix = "", decimal = false, duration = 2, className = "" }: { value: number, suffix?: string, prefix?: string, decimal?: boolean, duration?: number, className?: string }) {
  const container = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    if (!container.current) return;

    if (isMobile) {
      setDisplayValue(decimal ? value.toFixed(1) : Math.round(value).toString());
      return;
    }

    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        let current = obj.val;
        if (decimal) {
          setDisplayValue(current.toFixed(1));
        } else {
          setDisplayValue(Math.round(current).toString());
        }
      },
    });
  }, [value, duration, decimal, isMobile]);

  return (
    <span ref={container} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
