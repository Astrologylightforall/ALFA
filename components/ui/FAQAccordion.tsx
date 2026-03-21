"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  q: string;
  a: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;

        return (
          <div 
            key={i} 
            className={`border rounded-xl transition-colors duration-300 ${isOpen ? "bg-surface/40 border-gold-primary/50" : "bg-surface/20 border-border-accent hover:border-gold-primary/30"}`}
          >
            <button
              onClick={() => toggleFAQ(i)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
            >
              <h4 className={`font-display text-lg font-semibold transition-colors ${isOpen ? "text-gold-light" : "text-gold-primary group-hover:text-gold-light"}`}>
                {faq.q}
              </h4>
              <div 
                className={`ml-4 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${isOpen ? "border-gold-primary bg-gold-primary text-primary-bg rotate-180" : "border-gold-primary/30 text-gold-primary group-hover:bg-gold-primary/10 group-hover:border-gold-primary"}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 font-body text-[15px] text-cream/80 leading-relaxed border-t border-white/5 mt-2">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
