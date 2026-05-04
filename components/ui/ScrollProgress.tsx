"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);
  const lastYRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!progressBarRef.current) return;

    // Track scroll velocity
    const trackVelocity = (time: number) => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastYRef.current);
      lastYRef.current = currentY;

      // Smoothly decay velocity
      velocityRef.current = delta;
      if (velocityRef.current > 0) {
        velocityRef.current *= 0.95; // decay
      }

      rafRef.current = requestAnimationFrame(trackVelocity);
    };
    rafRef.current = requestAnimationFrame(trackVelocity);

    // Update progress bar and glow intensity
    const update = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrolled = window.scrollY;
        const progress = scrolled / docHeight;
        const velocity = Math.min(velocityRef.current / 100, 1); // Normalize 0-1

        gsap.set(progressBarRef.current, {
          scaleX: progress,
          boxShadow: `0 0 ${5 + velocity * 15}px rgba(201, 168, 76, ${0.6 + velocity * 0.4})`,
        });
      }
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={progressBarRef}
      className="fixed top-0 left-0 w-full h-[2px] z-[9999] pointer-events-none"
      style={{
        background: "linear-gradient(90deg, #C9A84C, #E8C96A, #E07B39)",
        transformOrigin: "left",
        transform: "scaleX(0)",
      }}
    />
  );
}
