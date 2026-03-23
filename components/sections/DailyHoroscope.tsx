"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ZODIAC_SIGNS = [
  { sign: "Aries", date: "Mar 21 - Apr 19", icon: "♈" },
  { sign: "Taurus", date: "Apr 20 - May 20", icon: "♉" },
  { sign: "Gemini", date: "May 21 - Jun 20", icon: "♊" },
  { sign: "Cancer", date: "Jun 21 - Jul 22", icon: "♋" },
  { sign: "Leo", date: "Jul 23 - Aug 22", icon: "♌" },
  { sign: "Virgo", date: "Aug 23 - Sep 22", icon: "♍" },
  { sign: "Libra", date: "Sep 23 - Oct 22", icon: "♎" },
  { sign: "Scorpio", date: "Oct 23 - Nov 21", icon: "♏" },
  { sign: "Sagittarius", date: "Nov 22 - Dec 21", icon: "♐" },
  { sign: "Capricorn", date: "Dec 22 - Jan 19", icon: "♑" },
  { sign: "Aquarius", date: "Jan 20 - Feb 18", icon: "♒" },
  { sign: "Pisces", date: "Feb 19 - Mar 20", icon: "♓" }
];

export default function DailyHoroscope() {
  const [selectedSign, setSelectedSign] = useState<typeof ZODIAC_SIGNS[0] | null>(null);
  const [dynamicScores, setDynamicScores] = useState({ love: 75, career: 75, health: 75, advice: "" });

  useEffect(() => {
    if (selectedSign) {
      const today = new Date().toDateString();
      const seed = selectedSign.sign + today;
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash |= 0;
      }
      
      const score = (val: number) => 65 + (Math.abs(hash * val) % 30); // 65 to 95
      
      const advices = [
        "Take bold steps in your projects today. Your focus is your absolute superpower.",
        "Financial stability is on the horizon. Trust your patience and the natural cosmic process.",
        "Your leadership skills are in heavy demand today. Step into the spotlight with absolute grace.",
        "An adventurous spark guides you today. Explore new perspectives and stay fully open to changes.",
        "Hard work yields tangible results today. Stay grounded, disciplined, and ignore minor distractions.",
        "A communication breakthrough awaits you. Share your ideas clearly with teammates or friends.",
        "Harmony is being restored in your personal relationships. Focus on beautiful, highly creative ideas."
      ];

      setDynamicScores({
        love: score(1),
        career: score(2),
        health: score(3),
        advice: advices[Math.abs(hash) % advices.length]
      });
    }
  }, [selectedSign]);

  return (
    <section className="py-24 bg-primary-bg px-4 relative z-10 border-t border-border-accent">
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
        <h2 className="font-display text-[2.5rem] md:text-5xl font-bold text-white tracking-tight leading-tight">
          Explore Your Daily Guidance
        </h2>
        <p className="font-body text-cream/70 text-sm md:text-base max-w-md mx-auto">
          Tap your zodiac sign to reveal custom alignments, scores, and practical cosmic advice.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Grid of Signs */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {ZODIAC_SIGNS.map((item) => (
            <motion.button
              key={item.sign}
              whileHover={{ scale: 1.05, translateY: -4 }}
              onClick={() => setSelectedSign(item)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 ${
                selectedSign?.sign === item.sign
                  ? "bg-surface/80 border-gold-primary shadow-[0_10px_30px_rgba(201,168,76,0.2)]"
                  : "bg-surface/40 hover:bg-surface/60 border-border-accent/40"
              }`}
            >
              <div className="text-3xl md:text-4xl text-gold-primary mb-2 select-none">
                {item.icon}
              </div>
              <h3 className="font-display text-base font-bold text-white">
                {item.sign}
              </h3>
              <p className="font-body text-[10px] text-cream/50 mt-1">
                {item.date}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Detailed Panel */}
        <AnimatePresence mode="wait">
          {selectedSign && (
            <motion.div
              key={selectedSign.sign}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="mt-12 bg-surface/80 border border-gold-primary/30 backdrop-blur-md rounded-3xl p-6 md:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
            >
              {/* Background ambient light */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/5 rounded-full filter blur-3xl" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Visual Alignment */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl text-gold-primary filter drop-shadow-[0_0_10px_rgba(201,168,76,0.3)]">
                      {selectedSign.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                        {selectedSign.sign}
                      </h3>
                      <p className="font-body text-gold-primary/80 text-sm">
                        {selectedSign.date}
                      </p>
                    </div>
                  </div>

                  <p className="font-body text-cream/90 text-sm md:text-base leading-relaxed">
                    {dynamicScores.advice}
                  </p>

                  <div className="pt-4 flex gap-4">
                    <button className="magnetic bg-gold-primary text-black font-bold text-sm px-6 py-3 rounded-full hover:bg-gold-light transition-all shadow-md">
                      Get Premium Analysis
                    </button>
                    <button 
                      onClick={() => setSelectedSign(null)}
                      className="text-cream/50 hover:text-white text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {/* score board with bars */}
                <div className="space-y-4">
                  {[
                    { label: "Love & Harmony 💖", value: dynamicScores.love },
                    { label: "Career & Focus 💼", value: dynamicScores.career },
                    { label: "Physical Balance 🌿", value: dynamicScores.health }
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="flex justify-between text-xs md:text-sm font-bold mb-1">
                        <span className="text-white/80">{stat.label}</span>
                        <span className="text-gold-primary">{stat.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.value}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-gold-primary via-saffron to-gold-light"
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-[11px] text-cream/50 mt-2 italic">
                    * Scores are placeholders and illustrative of daily lunar alignment weights.
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
