"use client";

import { motion, useScroll } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-gold origin-left z-[100] shadow-[0_0_10px_rgba(201,168,76,0.8)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
