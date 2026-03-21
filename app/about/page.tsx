"use client";

import { useRef, MouseEvent } from "react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { CONTACT_INFO } from "@/lib/data";
import { Eye, Heart, Lightbulb, Shield } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";
import { SweepHeading, LineReveal } from "@/components/ui/AnimatedText";

export default function AboutPage() {
  const { t } = useTranslation();
  const bioRef = useRef<HTMLElement>(null);
  const expertiseRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const expertiseTags = [
    "Janam Kundali Analysis", "Ashtakoota Milan", "Mangal Dosha", 
    "Nadi Dosha", "Vivah Muhurat", "Shani Dasha Remedies", 
    "Career & Job Astrology", "Business Astrology", "Gemstone Recommendations", 
    "Vastu Shastra", "Spiritual Guidance"
  ];

  const values = [
    { icon: <Eye size={28} />, title: "Accuracy", desc: "Every reading is based on precise birth chart calculations and classical Vedic interpretation." },
    { icon: <Heart size={28} />, title: "Empathy", desc: "All consultations are private, non-judgmental, and delivered with genuine care." },
    { icon: <Lightbulb size={28} />, title: "Clarity", desc: "The goal is not to mystify — it is to give you clear, actionable guidance." },
    { icon: <Shield size={28} />, title: "Integrity", desc: "We never exaggerate or create fear. Honest readings, honest remedies." }
  ];

  useGSAP(() => {
    if (isMobile) {
      gsap.set([".bio-para", ".expertise-tag", ".value-card", ".about-img-container"], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Bio Text Reveal
    if (bioRef.current) {
      gsap.fromTo(
        ".bio-para",
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 60%",
          }
        }
      );
      
      gsap.fromTo(
        ".about-img-container",
        { opacity: 0, scale: 0.9, rotate: -2 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 70%",
          }
        }
      );
    }

    // Expertise Tags Random Reveal
    if (expertiseRef.current) {
      gsap.fromTo(
        ".expertise-tag",
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
          stagger: {
            amount: 0.8,
            from: "random"
          },
          scrollTrigger: {
            trigger: expertiseRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Values Grid Cascade Entrance
    if (valuesRef.current) {
      gsap.fromTo(
        ".value-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, [isMobile]);

  // Values Hover Dim effect
  const handleValueHover = (e: MouseEvent<HTMLDivElement>) => {
    const allCards = document.querySelectorAll(".value-card");
    const currentCard = e.currentTarget;
    allCards.forEach((card) => {
      if (card !== currentCard) gsap.to(card, { opacity: 0.5, duration: 0.3 });
    });
  };

  const handleValueLeave = () => {
    const allCards = document.querySelectorAll(".value-card");
    allCards.forEach((card) => {
      gsap.to(card, { opacity: 1, duration: 0.3 });
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[450px] flex items-center justify-center text-center px-4 overflow-hidden bg-primary-bg mt-[-6rem]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-primary/10 via-primary-bg to-secondary-bg"></div>
        <div className="max-w-4xl mx-auto z-10 space-y-4 pt-20 relative">
          <SweepHeading>
            <span className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] block pb-2">
              The Astrologer Behind the Light
            </span>
          </SweepHeading>
          
          <p className="font-body text-base md:text-lg text-cream/70 max-w-2xl mx-auto font-medium opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
            Manjul Malhotra — rooted in ancient Vedic wisdom, committed to modern clarity.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section ref={bioRef} className="py-24 bg-secondary-bg px-4 border-t border-border-accent relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Image */}
          <div className="lg:sticky lg:top-32 flex justify-center order-2 lg:order-1 mt-8 lg:mt-0">
            <div className="about-img-container relative w-[85vw] h-[85vw] max-w-[420px] max-h-[420px] md:w-[450px] md:h-[450px] rounded-[2.5rem] p-2 bg-surface/30 border border-gold-primary/20 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gold-primary/5 rounded-[2.5rem] filter blur-xl" />
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-surface relative">
                <img 
                  src="/images/manjul-about.png" 
                  alt="Manjul Malhotra"
                  className="w-full h-full object-cover filter hover:brightness-105 transition duration-500"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-8 font-body text-[15px] md:text-lg text-cream/80 leading-relaxed order-1 lg:order-2 pt-4">
            <div className="bio-para">
              <h2 className="font-display text-4xl md:text-[2.75rem] text-white font-bold mb-3 tracking-tight">Manjul Malhotra</h2>
              <p className="text-gold-primary font-bold text-xs md:text-sm uppercase tracking-[0.2em]">Vedic Astrologer & Jyotish Practitioner</p>
            </div>
            
            <div className="space-y-6">
              <p className="bio-para border-l-2 border-gold-primary/40 pl-5 text-cream">
                With deep roots in classical Jyotish Shastra, my journey into Vedic astrology began with a commitment to understanding the energetic maps of human life. Astrology is not merely a tool for prediction, but a sacred science of awareness that empowers individuals to navigate their karma with grace and insight.
              </p>
              <p className="bio-para">
                Over the years, I have specialised in interpreting full Janam Kundali charts, analysing the operations of planetary Dashas (periods), and ensuring safe, sustainable energetic integrations through Ashtakoota Milan for couples preparing for marriage. 
              </p>
              <p className="bio-para bg-surface/40 p-6 rounded-2xl border border-border-accent shadow-inner text-cream/90 italic">
                "My philosophy centers on transparency and support. I believe remedies should be practical, straightforward, and rooted in personal growth rather than fear. Every individual's chart is unique, and so are the solutions."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Chips */}
      <section ref={expertiseRef} className="py-24 bg-[#10191B] px-4 relative overflow-hidden">
        {/* Ambient starfield background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyMDEsIDE2OCwgNzYsIDAuMSkiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <h3 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">Areas of Expertise</h3>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-4">
            {expertiseTags.map((tag) => (
              <span key={tag} className="expertise-tag text-sm md:text-base font-medium text-cream border border-gold-primary/20 bg-surface/60 backdrop-blur-md px-6 py-3 rounded-full hover:border-gold-primary hover:bg-gold-primary/10 hover:text-gold-primary transition-all duration-300 cursor-default shadow-lg hover:shadow-gold-primary/10 hover:-translate-y-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section ref={valuesRef} className="py-24 bg-secondary-bg px-4 border-t border-border-accent z-10 relative">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
             <h3 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Core Principles</h3>
             <p className="font-body text-cream/60 max-w-lg mx-auto">The foundation of every consultation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((val) => (
              <div 
                key={val.title} 
                className="value-card bg-surface/30 border border-border-accent p-8 rounded-[2rem] flex flex-col items-center text-center space-y-4 hover:border-gold-primary/40 hover:bg-surface/50 transition-all duration-300 cursor-default shadow-xl group"
                onMouseEnter={handleValueHover}
                onMouseLeave={handleValueLeave}
              >
                <div className="text-gold-primary p-4 bg-gold-primary/5 rounded-full group-hover:bg-gold-primary group-hover:text-primary-bg transition-colors duration-300 shadow-inner">
                  {val.icon}
                </div>
                <h4 className="font-display text-[22px] font-bold text-white pt-2">{val.title}</h4>
                <p className="font-body text-[14px] text-cream/70 leading-relaxed font-medium">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-primary-bg px-4 text-center overflow-hidden relative" style={{ backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)" }}>
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#0A0812] tracking-tight">Ready to Begin Your Journey?</h2>
          <p className="font-body text-lg font-bold text-[#1A1235]/80 max-w-lg mx-auto">Book your free initial horoscope analysis with Manjul ji today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 pt-8">
            <a href={`tel:${CONTACT_INFO.phoneFull}`} className="magnetic relative overflow-hidden group bg-[#0A0812] text-gold-primary font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(10,8,18,0.2)] flex items-center justify-center text-[15px]">
              <span className="relative z-10">Call Now</span>
              <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shimmer" />
            </a>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Namaste`} className="magnetic border-[2px] border-[#0A0812] text-[#0A0812] font-bold px-10 py-4 rounded-full hover:bg-[#0A0812]/5 transition flex items-center justify-center text-[15px]">
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
