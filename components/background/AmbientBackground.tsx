"use client";

import { useState, useEffect } from "react";
import FloatingGlyphs from "./FloatingGlyphs";
import ConstellationNetwork from "./ConstellationNetwork";

/**
 * AmbientBackground
 *
 * Full-screen animated background with subtle celestial elements:
 * - Floating zodiac glyphs (Three.js layer)
 * - Constellation network with connectivity lines (Canvas layer)
 * - Gradient radial blobs that drift slowly
 *
 * All layers are fixed to viewport and scroll-independent (parallax can be added via ScrollTimeline)
 *
 * Performance: uses requestAnimationFrame, Three.js instancing, and pointer-events-none
 * Themes: gold (#C9A84C) and deep blue-backgrounds with low opacity
 */
export default function AmbientBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Gradient Drifting Orbs (CSS animations) - Removed per user request */}
      <div className="absolute inset-0">
      </div>

      {/* Constellation Network (Canvas 2D) */}
      <ConstellationNetwork />

      {/* Floating Zodiac Glyphs (Three.js) */}
      <FloatingGlyphs />

      {/* Subtle vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(10, 11, 16, 0.4) 100%)",
        }}
      />
    </div>
  );
}
