"use client";

import { useRef, MouseEvent } from "react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { SERVICES_DATA, type Service } from "@/lib/data";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { SweepHeading } from "@/components/ui/AnimatedText";
import ScrambleText from "@/components/ui/ScrambleText";
import SectionTransition from "@/components/transitions/SectionTransition";
import TiltCard3D from "@/components/ui/TiltCard3D";
import GlitchText from "@/components/ui/GlitchText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";

const tiltOptions = {
  max: 8,
  perspective: 1000,
  scale: 1.02,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

export default function ServicesGrid() {
  const { t, language } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // GSAP Entrance Choreography
  useGSAP(() => {
    if (!gridRef.current || isMobile) return;

    const cards = gsap.utils.toArray<HTMLElement>(".service-card-wrapper");

    // Set initial states
    gsap.set(cards, { y: 80, opacity: 0, scale: 0.92 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      }
    });

    // Diagonal wave entrance
    const group1 = [cards[0], cards[3]].filter(Boolean);
    const group2 = [cards[1], cards[4]].filter(Boolean);
    const group3 = [cards[2], cards[5]].filter(Boolean);

    if (group1.length) tl.to(group1, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, 0);
    if (group2.length) tl.to(group2, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, 0.2);
    if (group3.length) tl.to(group3, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, 0.4);
  }, [isMobile]);

  // Handle tracking gradient for the card
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const icon = e.currentTarget.querySelector(".service-icon");
    if (icon) {
      gsap.fromTo(
        icon,
        { rotation: 0, scale: 1 },
        { rotation: 360, scale: 1.2, duration: 0.6, ease: "back.out(2)", clearProps: "scale" }
      );
    }
  };

  return (
    <SectionTransition sectionId="services" entranceFrom="bottom" exitTo="fade" className="py-12 md:py-24 bg-secondary-bg px-4 relative z-10 overflow-hidden">

      {/* Background drifting nebula blob - desktop only */}
      {!isMobile && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0E3A3A] rounded-full filter blur-[120px] opacity-[0.08] pointer-events-none -z-10" />}

      <div className="max-w-7xl mx-auto text-center space-y-4 mb-16 relative z-10">
        <span className="text-gold-primary text-xs uppercase tracking-widest font-semibold font-body block opacity-80">
          {t("services.overline")}
        </span>

        <SweepHeading>
          <span className="font-display text-[2.25rem] sm:text-[2.5rem] md:text-[3.5rem] font-bold text-white tracking-tight inline-block pb-2 text-glow">
            {t("services.heading")}
          </span>
        </SweepHeading>

        <p className="font-body text-cream/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mt-4">
          {t("services.subheading")}
        </p>
      </div>

      <div
        ref={gridRef}
        className="max-w-7xl mx-auto flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 px-1 md:px-0"
      >
        {SERVICES_DATA.map((service: Service, index) => {
          const IconComponent = (LucideIcons[service.icon as keyof typeof LucideIcons] || LucideIcons.FileText) as React.ComponentType<{ size?: number; strokeWidth?: number }>;

          return (
            <div key={service.slug} className="service-card-wrapper w-full relative">
              <TiltCard3D maxTilt={8} className="w-full h-full">
                <div
                  className="relative h-full glass-card rounded-2xl p-5 md:p-8 border-gold-primary/10 flex flex-col justify-between overflow-hidden"
                >

                  <div className="relative z-10">
                    <div className="service-icon w-14 h-14 rounded-full bg-surface/30 border border-gold-primary/20 flex items-center justify-center text-gold-primary mb-6 transition-all duration-300 shadow-lg">
                      <IconComponent size={26} strokeWidth={1.5} />
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white mb-3 tracking-tight">
                      <GlitchText>
                        {language === "hi" ? service.title_hindi : service.title}
                      </GlitchText>
                    </h3>

                    <p className="font-body text-cream/60 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {service.key_points && (
                      <ul className="space-y-2 mb-8 border-t border-gold-primary/10 pt-4">
                        {service.key_points.map((point: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-[12px] text-cream/50 group-hover:text-cream/80 transition-colors">
                            <span className="text-gold-primary text-sm mt-[-1px] animate-pulse-slower">{'\u2726'}</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="relative z-10 mt-auto">
                    <span className="inline-flex items-center text-gold-primary text-sm font-semibold transition-colors">
                      <span>Learn More</span>
                      <span className="ml-2">→</span>
                    </span>
                  </div>
                </div>
              </TiltCard3D>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12 md:mt-20">
        <Link
          href="/services"
          className="magnetic inline-block border-[1.5px] border-gold-primary/50 text-gold-primary font-bold px-10 py-4 rounded-full hover:bg-gold-primary/10 hover:border-gold-primary transition-colors shadow-lg group"
        >
          <span className="relative z-10">View All Services</span>
          <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-shimmer" />
        </Link>
      </div>
    </SectionTransition>
  );
}
