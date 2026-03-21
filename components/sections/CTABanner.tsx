"use client";

import { useRef } from "react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { CONTACT_INFO } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";

export default function CTABanner() {
  const { language } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    if (!sectionRef.current || isMobile) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    // Dual Sweep Entrance
    tl.fromTo(
      ".cta-sweep-left",
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.5, ease: "power2.in" }
    )
    .fromTo(
      ".cta-sweep-right",
      { scaleX: 0, transformOrigin: "right" },
      { scaleX: 1, duration: 0.5, ease: "power2.in" },
      "<" // Start at the same time
    )
    .to([".cta-sweep-left", ".cta-sweep-right"], {
      opacity: 0,
      duration: 0.4
    })
    .fromTo(
      ".cta-content-wrapper",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // Parallax background
    gsap.to(".cta-bg-parallax", {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="relative py-20 px-4 text-primary-bg overflow-hidden z-10">
      
      {/* Background with Parallax */}
      <div className="absolute inset-0 bg-[#0E1618] overflow-hidden">
        <div className="cta-bg-parallax absolute -inset-[20%] opacity-[0.95]" style={{ backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)" }} />
      </div>

      {/* Sweep overlay blocks */}
      {!isMobile && (
        <div className="absolute inset-0 z-20 pointer-events-none flex">
          <div className="cta-sweep-left w-1/2 h-full bg-[#E8C96A] opacity-100" />
          <div className="cta-sweep-right w-1/2 h-full bg-[#C9A84C] opacity-100" />
        </div>
      )}

      {/* Subtle branding accent */}
      <div className="cta-bg-parallax absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0A0812]/[0.02] font-display text-[25vw] font-bold select-none pointer-events-none z-[5] whitespace-nowrap">
        ALFA
      </div>

      <div className="cta-content-wrapper max-w-4xl mx-auto text-center space-y-8 relative z-10 w-full">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A0812]">
          {language === "hi" ? "मुफ़्त कुंडली विश्लेषण से शुरुआत करें" : "Start With a Free Horoscope Analysis"}
        </h2>

        <p className="font-body text-base md:text-[19px] max-w-2xl mx-auto font-medium text-[#1A1235]/80 leading-relaxed px-4">
          No commitment. No cost. Simply share your birth details and Manjul ji will provide a free initial reading — giving you a taste of the clarity that expert Vedic astrology can bring to your life.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 pt-6 w-full px-4">
          <a
            href={`tel:${CONTACT_INFO.phoneFull}`}
            className="magnetic relative overflow-hidden group w-full sm:w-auto bg-[#0A0812] text-gold-primary font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(10,8,18,0.3)] flex items-center justify-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="animate-[pulse_3s_infinite]">📞</span> 
              {language === "hi" ? "कॉल करें" : "Call Now"} — 099537 46052
            </span>
            <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shimmer opacity-70" />
          </a>
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Namaste%20Manjul%20ji%2C%20I%20would%20like%20a%20free%20horoscope%20analysis.%20My%20birth%20details%20are%3A`}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic relative overflow-hidden group w-full sm:w-auto border-[2px] border-[#0A0812] text-[#0A0812] font-bold px-10 py-4 rounded-full hover:bg-[#0A0812]/5 hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="group-hover:animate-bounce">💬</span> 
              {language === "hi" ? "व्हाट्सएप पर संपर्क करें" : "WhatsApp for Free Analysis"}
            </span>
            <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-[shimmer_4s_infinite_linear]" />
          </a>
        </div>
      </div>
    </section>
  );
}
