'use client';

import { motion } from 'framer-motion';

export default function TextMarquee() {
  const words = ["Janam Kundali", "Ashtakoota Milan", "Business Astrology", "Vastu Shastra", "Gemstones", "Career Guidance", "Remedies"];

  return (
    <div className="bg-surface/30 backdrop-blur-sm border-y border-gold-primary/10 py-4 overflow-hidden relative z-10 flex select-none">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex whitespace-nowrap gap-12 font-display text-sm md:text-lg font-semibold text-gold-primary/40 uppercase tracking-widest px-6"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-12">
            {words.map((word) => (
              <span key={word} className="flex items-center gap-2">
                <span className="text-xs animate-pulse">✦</span>
                {word}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
