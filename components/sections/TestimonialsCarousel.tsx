"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS_DATA } from "@/lib/data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [mounted, setMounted] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-advance and progress bar logic
  useEffect(() => {
    if (isPaused) {
      if (progressRef.current) {
        gsap.killTweensOf(progressRef.current);
      }
      return;
    }

    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 5, ease: "none" }
      );
    }

    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      if (progressRef.current) gsap.killTweensOf(progressRef.current);
    };
  }, [current, isPaused]);

  // Star animations trigger whenever current slide changes
  useGSAP(() => {
    gsap.fromTo(
      ".testi-star",
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.08, 
        ease: "back.out(2)", 
      }
    );
  }, [current]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  // Framer Motion 3D Flip variants
  const variants = {
    enter: (direction: number) => {
      return {
        rotateY: direction > 0 ? 90 : -90,
        opacity: 0,
        z: -100,
        x: isMobile ? (direction > 0 ? 100 : -100) : 0,
      };
    },
    center: {
      rotateY: 0,
      opacity: 1,
      z: 0,
      x: 0,
    },
    exit: (direction: number) => {
      return {
        rotateY: direction > 0 ? -90 : 90,
        opacity: 0,
        z: -100,
        x: isMobile ? (direction > 0 ? -100 : 100) : 0,
      };
    }
  };

  return (
    <section className="py-24 bg-primary-bg px-4 overflow-hidden relative z-10">
      {/* Background shifting atmosphere */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <motion.div
          animate={{ backgroundColor: ["#0A0812", "#0D1520", "#0A0812"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-4 mb-16 relative z-10">
        <h2 className="font-display text-[2.5rem] md:text-5xl font-bold text-white tracking-tight">
          Voices of Faith & Healing
        </h2>
        <p className="font-body text-cream/70 text-sm md:text-base max-w-lg mx-auto">
          Real experiences from real people who found clarity through Vedic guidance.
        </p>
      </div>

      <div 
        className="max-w-4xl mx-auto relative px-4 md:px-12 z-10 perspective-[1200px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="relative h-[280px] md:h-[220px] flex items-center justify-center w-full">
          {mounted && (
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                rotateY: { type: "spring", stiffness: 80, damping: 20, duration: 0.6 },
                opacity: { duration: 0.4 },
                x: { type: "spring", stiffness: 300, damping: 30 }
              }}
              drag={isMobile ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  handleNext();
                } else if (swipe > swipeConfidenceThreshold) {
                  handlePrev();
                }
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute inset-0 w-full"
            >
              <div className="bg-surface/60 backdrop-blur-xl border border-gold-primary/20 rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between h-full group">
                <div className="space-y-5">
                  {/* Stars Entry */}
                  <div className="flex gap-[2px] text-gold-primary text-lg">
                    {Array.from({ length: TESTIMONIALS_DATA[current].rating }).map((_, i) => (
                      <span key={i} className="testi-star inline-block relative">
                        ★
                        {/* Sparkle */}
                        <span className="absolute inset-0 text-white animate-ping opacity-0">✦</span>
                      </span>
                    ))}
                  </div>

                  <p className="font-display italic text-[17px] md:text-xl text-cream/95 leading-relaxed">
                    "{TESTIMONIALS_DATA[current].text}"
                  </p>
                </div>

                <div className="flex justify-between items-end mt-6 pt-4 border-t border-white/10">
                  <div>
                    <span className="font-body font-bold text-gold-primary text-[15px]">{TESTIMONIALS_DATA[current].name}</span>
                    <span className="text-xs text-cream/50 block mt-1">{TESTIMONIALS_DATA[current].time}</span>
                  </div>
                  <img src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-5 object-contain brightness-90 mix-blend-screen opacity-70" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          )}
        </div>

        {/* Swipe Indicator Mobile */}
        {isMobile && (
          <div className="flex justify-center gap-4 mt-8 opacity-60">
            <span className="animate-pulse text-gold-primary">← Swipe →</span>
          </div>
        )}

        {/* Controls Desktop */}
        {!isMobile && (
          <>
            <button onClick={handlePrev} className="absolute top-1/2 left-0 -translate-y-1/2 text-gold-primary bg-surface/80 backdrop-blur-md p-3 rounded-full border border-gold-primary/30 hover:scale-110 hover:bg-gold-primary hover:text-[#0A0812] transition-all shadow-lg z-20 magnetic">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={handleNext} className="absolute top-1/2 right-0 -translate-y-1/2 text-gold-primary bg-surface/80 backdrop-blur-md p-3 rounded-full border border-gold-primary/30 hover:scale-110 hover:bg-gold-primary hover:text-[#0A0812] transition-all shadow-lg z-20 magnetic">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          </>
        )}

        {/* Progress Bar */}
        <div className="absolute -bottom-10 left-12 right-12 h-1 bg-surface rounded-full overflow-hidden opacity-50">
          <div 
            ref={progressRef} 
            className="h-full bg-gold-primary origin-left"
          />
        </div>
      </div>

      {/* Atmospheric concentric circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none -z-10 opacity-5">
        <div className="absolute inset-0 rounded-full border border-white animate-[ping_10s_ease-out_infinite]" />
        <div className="absolute inset-10 rounded-full border border-white animate-[ping_10s_ease-out_infinite_2s]" />
      </div>
    </section>
  );
}
