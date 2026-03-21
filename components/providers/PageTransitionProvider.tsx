"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Create a cinematic transition overlay
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="min-h-screen">
        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        >
          {children}
        </motion.div>

        {/* Transition Curtain */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "-100%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[10000] bg-[#0A0812] pointer-events-none flex flex-col justify-center items-center overflow-hidden"
          style={{ transformOrigin: "bottom" }}
        >
          {/* Gold sweep line */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1, opacity: [0, 1, 0] }}
              transition={{ duration: 0.3, delay: 0.5, ease: "linear" }}
              className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent origin-left"
            />
          </div>
          {/* Logo Flash */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, times: [0, 0.3, 0.7, 1] }}
            className="text-4xl md:text-6xl text-[#C9A84C]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            ALFA
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
