"use client";

import { useEffect, useRef } from "react";

interface GlyphData {
  id: number;
  x: string;
  y: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const ZODIAC_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
const GOLD_COLORS = ["#C9A84C", "#E8C96A", "#D4AF37", "#F1E5AC"];

export default function FloatingGlyphs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reduce glyph count on mobile for performance
    const isMobile = window.innerWidth < 768;
    const glyphCount = isMobile ? 6 : 12;
    const glyphs: GlyphData[] = [];

    // Generate random positions and properties
    for (let i = 0; i < glyphCount; i++) {
      glyphs.push({
        id: i,
        x: `${Math.random() * 80 + 10}%`,
        y: `${Math.random() * 80 + 10}%`,
        size: Math.random() * 1.5 + 0.8, // 0.8 to 2.3 rem
        color: GOLD_COLORS[i % GOLD_COLORS.length],
        duration: Math.random() * 20 + 20, // 20-40s
        delay: Math.random() * -20, // Negative delay to start mid-animation
      });
    }

    // Create elements
    glyphs.forEach((glyph) => {
      const el = document.createElement("div");
      el.className = "absolute opacity-20 pointer-events-none z-0";
      el.textContent = ZODIAC_GLYPHS[glyph.id];
      el.style.left = glyph.x;
      el.style.top = glyph.y;
      el.style.fontSize = `${glyph.size}rem`;
      el.style.color = glyph.color;
      el.style.animation = `float ${glyph.duration}s ease-in-out infinite, opacity-pulse ${glyph.duration * 0.5}s ease-in-out infinite alternate`;
      el.style.animationDelay = `${glyph.delay}s, ${glyph.delay * 0.5}s`;
      container.appendChild(el);
    });

    return () => {
      glyphs.forEach((glyph) => {
        const el = container?.querySelector(`[data-glyph-id="${glyph.id}"]`);
        el?.remove();
      });
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
