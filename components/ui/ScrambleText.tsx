"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "usehooks-ts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrambleTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  chars?: string;
  threshold?: number;
  scrambleOnHover?: boolean;
}

/**
 * ScrambleText
 * 
 * Futuristic text reveal effect. 
 * Now simplified to exclude hover effects while maintaining 
 * the choreographed scroll-up animation.
 */
export default function ScrambleText({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  threshold = 0.5,
  scrambleOnHover = false, // Explicitly disabled by default and logic removed
}: ScrambleTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [displayChars, setDisplayChars] = useState<string[]>([]);
  const [opacities, setOpacities] = useState<number[]>([]);

  useEffect(() => {
    const charsArray = children.split("");
    setDisplayChars(charsArray);
    setOpacities(new Array(charsArray.length).fill(0));
  }, [children]);

  useGSAP(() => {
    if (isMobile || !containerRef.current || displayChars.length === 0) return;

    const length = children.length;
    const charsPool = chars.split("");
    const indices = Array.from({ length }, (_, i) => i);
    
    // Shuffle indices for random reveal
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: `top 90%`,
        toggleActions: "play none none reverse",
      },
      delay,
    });

    indices.forEach((index, i) => {
      const finalChar = children[index];
      const scrambled = Array.from({ length: 4 }, () =>
        charsPool[Math.floor(Math.random() * charsPool.length)]
      );

      // Animate opacity and position (choreographed scroll-up)
      tl.fromTo(
        {},
        { },
        {
          duration: duration,
          onUpdate: function () {
            const progress = this.progress();
            
            // Update opacity
            setOpacities(prev => {
              const next = [...prev];
              next[index] = progress;
              return next;
            });

            // Update character scramble
            setDisplayChars(prev => {
              const next = [...prev];
              if (progress > 0.7) {
                next[index] = finalChar;
              } else {
                const scrambledIndex = Math.floor(progress * scrambled.length * 2) % scrambled.length;
                next[index] = scrambled[scrambledIndex] || finalChar;
              }
              return next;
            });
          },
        },
        i * 0.02
      );
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [isMobile, delay, duration, threshold, chars, children, displayChars.length]);

  if (isMobile) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span 
      ref={containerRef} 
      className={`inline-block ${className}`}
      style={{ whiteSpace: "pre-wrap" }}
    >
      {displayChars.map((char, i) => (
        <span 
          key={`${i}-${char}`} 
          className="inline-block" 
          style={{ 
            opacity: opacities[i] ?? 0,
            transform: `translateY(${(1 - (opacities[i] ?? 0)) * 10}px)` 
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
