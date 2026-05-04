"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CelestialBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  // Generate random stars once mounted
  useEffect(() => {
    setStars(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 10 + 20,
        delay: Math.random() * 10,
      }))
    );
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle Sacred Geometry Pattern (Sri Yantra) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.08] mix-blend-screen">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gold-primary fill-none stroke-current stroke-[0.15]">
          {/* Very simplified Sri Yantra style geometry to keep it clean but thematic */}
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="38" />
          
          {/* Triangles */}
          <path d="M50 15 L85 75 L15 75 Z" />
          <path d="M50 85 L15 25 L85 25 Z" />
          
          <path d="M50 25 L75 65 L25 65 Z" />
          <path d="M50 75 L25 35 L75 35 Z" />
          
          <path d="M50 35 L65 55 L35 55 Z" />
          <path d="M50 65 L35 45 L65 45 Z" />

          {/* Center Point (Bindu) */}
          <circle cx="50" cy="50" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      </div>

      {/* Drifting Stars / Particles */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, x: `${star.x}%`, y: `${star.y}%` }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [`${star.y}%`, `${star.y - 5}%`],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-gold-primary"
            style={{ width: star.size, height: star.size }}
          />
        ))}
      </div>

      {/* Decorative Constellation Lines - Organic & slow */}
      <div className="absolute inset-0 opacity-[0.1]">
        <svg className="w-full h-full text-gold-primary fill-none stroke-current stroke-[0.2]">
           <motion.path 
              d="M10,20 L30,40 L20,60" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           />
           <motion.path 
              d="M80,10 L90,30 L70,50 L85,70" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           />
           <motion.path 
              d="M15,85 L40,75 L60,90" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
           />
        </svg>
      </div>

      {/* Soft Ambient Globs (Linear Drift) */}
      <motion.div 
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gold-primary/5 rounded-full filter blur-[100px]" 
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold-primary/5 rounded-full filter blur-[120px]" 
      />
    </div>
  );
}
