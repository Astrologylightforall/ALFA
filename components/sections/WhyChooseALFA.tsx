"use client";

import { useRef, MouseEvent } from "react";
import { FEATURES_DATA } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";

export default function WhyChooseALFA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    if (!sectionRef.current || isMobile) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
      }
    });

    const cards = gsap.utils.toArray<HTMLElement>(".why-card");
    const icons = gsap.utils.toArray<HTMLElement>(".why-icon");
    const lines = gsap.utils.toArray<SVGPathElement>(".why-connector-line");

    // Grouping by columns for the diagonal wave (2 rows x 3 cols = 6 cards)
    const group1 = [cards[0], cards[3]].filter(Boolean);
    const group2 = [cards[1], cards[4]].filter(Boolean);
    const group3 = [cards[2], cards[5]].filter(Boolean);

    gsap.set(cards, { y: 80, opacity: 0, scale: 0.92 });
    gsap.set(icons, { y: -20, opacity: 0 });
    gsap.set(lines, { strokeDasharray: "4 4", strokeDashoffset: 100 });

    if (group1.length) tl.to(group1, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, 0);
    if (group2.length) tl.to(group2, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, 0.2);
    if (group3.length) tl.to(group3, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, 0.4);

    // Delayed icon drop
    tl.to(icons, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(2)",
    }, 0.5);

    // Connector lines draw in
    if (lines.length) {
      tl.to(lines, {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1
      }, 0.8);
    }
  }, [isMobile]);

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const allCards = document.querySelectorAll(".why-card");
    const currentCard = e.currentTarget;
    allCards.forEach(card => {
      if (card !== currentCard) {
        gsap.to(card, { opacity: 0.4, duration: 0.3, ease: "power2.out" });
      }
    });
  };

  const handleMouseLeave = () => {
    const allCards = document.querySelectorAll(".why-card");
    allCards.forEach(card => {
      gsap.to(card, { opacity: 1, duration: 0.3, ease: "power2.out" });
    });
  };

  return (
    <section ref={sectionRef} className="py-24 bg-secondary-bg px-4 relative overflow-hidden z-10 border-t border-border-accent">
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-20">
        <h2 className="font-display text-[2.5rem] md:text-5xl font-bold text-white tracking-tight leading-tight">
          Why Clients Choose ALFA
        </h2>
        <p className="font-body text-sm md:text-base text-cream/70 max-w-lg mx-auto leading-relaxed">
          Combining deep knowledge of the cosmos with compassionate counseling.
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative">
        
        {/* SVG Connector Lines (Desktop Only) */}
        {!isMobile && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minHeight: "100%" }}>
            {/* Horizontal lines connecting columns */}
            <path className="why-connector-line" d="M 200,120 L 350,120" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.4" />
            <path className="why-connector-line" d="M 580,120 L 730,120" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.4" />
            <path className="why-connector-line" d="M 200,400 L 350,400" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.4" />
            <path className="why-connector-line" d="M 580,400 L 730,400" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.4" />
            {/* Vertical lines connecting rows */}
            <path className="why-connector-line" d="M 170,200 L 170,300" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.4" />
            <path className="why-connector-line" d="M 550,200 L 550,300" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.4" />
            <path className="why-connector-line" d="M 930,200 L 930,300" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.4" />
          </svg>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 relative z-10 w-full place-items-center">
          {FEATURES_DATA.map((feature) => {
            const IconComponent = feature.icon;

            return (
              <div
                key={feature.title}
                className="why-card w-full max-w-[350px] bg-surface/40 backdrop-blur-md border border-border-accent p-8 rounded-3xl flex flex-col items-center text-center space-y-4 hover:border-gold-primary/40 hover:bg-surface/60 transition-colors cursor-pointer relative group shadow-lg"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative text-gold-primary w-[72px] h-[72px] rounded-full bg-gold-primary/5 flex items-center justify-center group-hover:bg-gold-primary group-hover:text-primary-bg transition-colors duration-500 shadow-inner">
                  {/* Rotative Intricate Ring on hover / continuous slow drift */}
                  <svg className="absolute inset-[-8px] w-[calc(100%+16px)] h-[calc(100%+16px)] animate-[spin_20s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" stroke="#C9A84C" strokeWidth="0.5" fill="none" strokeDasharray="3 3"/>
                  </svg>
                  <div className="why-icon">
                    <IconComponent size={30} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                <h3 className="font-display text-[22px] font-bold text-white tracking-wide pt-2">
                  {feature.title}
                </h3>
                
                <p className="font-body text-[14.5px] text-cream/70 leading-relaxed min-h-[45px]">
                  {feature.desc}
                </p>

                {/* Float sparkles inside card on hover */}
                <div className="absolute top-4 right-4 text-gold-primary/20 group-hover:text-gold-primary/60 transition-colors text-lg opacity-0 group-hover:opacity-100 duration-500 scale-0 group-hover:scale-100">
                  ✦
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Decorative background orb */}
      <div className="absolute bottom-[-100px] left-[10%] w-[500px] h-[500px] bg-gold-primary rounded-full filter blur-[150px] opacity-[0.03] pointer-events-none -z-10 animate-pulse-slow"></div>
    </section>
  );
}
