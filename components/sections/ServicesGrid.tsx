"use client";

import { useRef, MouseEvent } from "react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { SERVICES_DATA } from "@/lib/data";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Tilt } from "react-tilt";
import { SweepHeading } from "@/components/ui/AnimatedText";
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

    // Diagonal wave entrance
    // Indices: 0,1,2 / 3,4,5
    // Cards 1,4 (0,3) -> First
    // Cards 2,5 (1,4) -> Second
    // Cards 3,6 (2,5) -> Third
    const cards = gsap.utils.toArray<HTMLElement>(".service-card-wrapper");
    
    // Set initial states
    gsap.set(cards, { y: 80, opacity: 0, scale: 0.92 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%", // Start when section is 60% in view
      }
    });

    // Grouping by columns for the diagonal wave
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
    <section ref={sectionRef} className="py-20 bg-secondary-bg px-4 relative z-10 overflow-hidden">
      
      {/* Background drifting nebula blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0E3A3A] rounded-full filter blur-[120px] opacity-[0.08] pointer-events-none -z-10 animate-[pulse-slow_25s_infinite_alternate]" />

      <div className="max-w-7xl mx-auto text-center space-y-4 mb-16 relative z-10">
        <span className="text-gold-primary text-xs uppercase tracking-widest font-semibold font-body block opacity-80">
          {t("services.overline")}
        </span>
        
        <SweepHeading>
          <span className="font-display text-[2.5rem] md:text-[3.5rem] font-bold text-white tracking-tight inline-block pb-2">
            {t("services.heading")}
          </span>
        </SweepHeading>

        <p className="font-body text-cream/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mt-4">
          {t("services.subheading")}
        </p>
      </div>

      {/* Horizontal Snap Scroll on Mobile, CSS Grid on Desktop */}
      <div 
        ref={gridRef} 
        className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 snap-y md:snap-none pb-8 md:pb-0 px-4 md:px-0"
      >
        {SERVICES_DATA.map((service, index) => {
          const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.FileText;

          return (
            <div key={service.slug} className="service-card-wrapper w-full md:min-w-0 snap-center relative">
              <Tilt options={tiltOptions} className="w-full h-full">
                <div
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  className="relative h-full bg-[#111617]/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/5 transition-all duration-500 shadow-xl group hover:shadow-[0_20px_40px_rgba(201,168,76,0.15)] hover:border-gold-primary/30 cursor-pointer flex flex-col justify-between overflow-hidden"
                >
                  {/* Glowing Outline Layer */}
                  <div className="absolute inset-0 rounded-2xl border-[1.5px] border-transparent bg-gradient-to-br from-gold-primary/0 via-gold-primary/0 to-gold-primary/0 group-hover:from-gold-primary/40 group-hover:via-gold-primary/10 group-hover:to-gold-primary/5 transition-all duration-700 pointer-events-none [mask-image:linear-gradient(white,white)] [-webkit-mask-image:-webkit-linear-gradient(white,white)] [mask-composite:exclude] [-webkit-mask-composite:destination-out] z-20" />

                  {/* Cursor Tracking Gradient Spot */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                    style={{
                      background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(201,168,76,0.15), transparent 40%)"
                    }}
                  />

                  <div className="relative z-10">
                    <div className="service-icon w-14 h-14 rounded-full bg-surface/50 border border-gold-primary/10 flex items-center justify-center text-gold-primary mb-6 group-hover:bg-gradient-gold group-hover:border-transparent group-hover:text-primary-bg transition-colors duration-500 shadow-lg group-hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]">
                      <IconComponent size={26} strokeWidth={1.5} />
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white mb-3 tracking-tight">
                      {language === "hi" ? service.title_hindi : service.title}
                    </h3>

                    <p className="font-body text-cream/70 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {service.key_points && (
                      <ul className="space-y-2 mb-8 border-t border-border-accent/30 pt-4">
                        {service.key_points.map((point: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-[12px] text-cream/60 group-hover:text-cream/80 transition-colors">
                            <span className="text-gold-primary text-sm mt-[-1px]">✦</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <Link
                    href={service.href}
                    className="relative z-10 inline-flex items-center text-gold-primary text-sm font-semibold group-hover:text-gold-light transition-colors mt-auto w-max"
                  >
                    Learn More 
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </Link>
                </div>
              </Tilt>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12 md:mt-20">
        <Link
          href="/services"
          className="magnetic inline-block border-[1.5px] border-gold-primary/50 text-gold-primary font-bold px-10 py-4 rounded-full hover:bg-gold-primary/10 hover:border-gold-primary transition-colors shadow-lg"
        >
          View All Services
        </Link>
      </div>
    </section>
  );
}
