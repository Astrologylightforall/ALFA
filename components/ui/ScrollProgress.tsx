"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressBarRef.current) return;

    // Use GSAP ticker to sync with Lenis without triggering react state updates
    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrolled = window.scrollY;
        const progress = scrolled / docHeight;
        gsap.set(progressBarRef.current, { scaleX: progress });
      }
    };

    // We add it to the GSAP ticker so it fires 60fps in sync with Lenis scroll
    gsap.ticker.add(updateProgress);

    return () => {
      gsap.ticker.remove(updateProgress);
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
