"use client";

import { useEffect, useState } from "react";

export default function AnimatedGrain() {
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    // Animate the seed attribute from 0 to 100 in a setTimeout loop every 80ms
    const interval = setInterval(() => {
      setSeed((prev) => (prev + 1) % 100);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.035] dark:opacity-[0.02]">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
            seed={seed}
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
