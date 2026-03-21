'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MysticBall() {
  const [isOpen, setIsOpen] = useState(false);
  const [quote, setQuote] = useState("");

  const fortunes = [
    "The planets align in your favour today. 🌟",
    "Jupiter's gaze brings wisdom. Stay open to learning. 📖",
    "Sade Sati is but a phase of growth. Keep the faith. 🧘",
    "A favorable transit is approaching your path. 🛤️",
    "Mars energy is high. Channel it into positive focus. ⚔️",
    "Mercury aligns. Good news in communication soon! ✉️"
  ];

  const handleClick = () => {
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setQuote(random);
    setIsOpen(true);
    // Auto-close after 4 seconds
    setTimeout(() => setIsOpen(false), 4000);
  };

  return (
    <div className="fixed bottom-20 left-6 z-40 hidden md:block">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-16 left-0 bg-surface/90 border border-gold-primary p-3 rounded-xl shadow-xl w-48 backdrop-blur-md"
          >
            <p className="font-body text-xs text-white leading-relaxed select-none">{quote}</p>
            <div className="absolute bottom-[-5px] left-5 w-3 h-3 bg-surface border-r border-b border-gold-primary rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-primary via-saffron to-primary-bg flex items-center justify-center shadow-lg border border-gold-primary/50 group relative cursor-pointer"
      >
        <span className="text-xl group-hover:scale-120 transition select-none">🔮</span>
        <div className="absolute inset-0 rounded-full bg-gold-primary animate-ping opacity-20 group-hover:opacity-40"></div>
      </motion.button>
    </div>
  );
}
