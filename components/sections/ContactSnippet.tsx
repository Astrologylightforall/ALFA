"use client";

import { useRef, MouseEvent } from "react";
import { CONTACT_INFO } from "@/lib/data";
import { MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "usehooks-ts";

export default function ContactSnippet() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    if (!sectionRef.current) return;

    if (isMobile) {
      gsap.set([".contact-left", ".contact-right", ".contact-map"], { opacity: 1, x: 0, scale: 1, filter: "none" });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    // Left Column
    tl.fromTo(
      ".contact-left",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    );

    // Right Map Container
    tl.fromTo(
      ".contact-right",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      "<" // Start simultaneously
    );

    // Map Reveal Animation
    tl.fromTo(
      ".contact-map",
      { scale: 0.95, filter: "blur(20px)" },
      { scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
      "-=0.4"
    );

    // Initial Icon Jiggles
    tl.fromTo(
      ".contact-icon",
      { rotation: -15, scale: 0.8 },
      {
        rotation: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "elastic.out(1.2, 0.4)"
      },
      "-=0.6"
    );

  }, [isMobile]);

  // Hover animations for the contact items
  const handleItemHover = (e: MouseEvent<HTMLDivElement>) => {
    const icon = e.currentTarget.querySelector(".contact-icon");
    if (icon) {
      // Jiggle or bounce based on data-type
      const type = icon.getAttribute("data-type");
      if (type === "phone") {
        gsap.fromTo(icon, { rotation: -15 }, { rotation: 15, yoyo: true, repeat: 5, duration: 0.08, ease: "none" });
      } else if (type === "pin") {
        gsap.fromTo(icon, { y: 0 }, { y: -8, yoyo: true, repeat: 1, duration: 0.2, ease: "power2.out" });
      } else {
        gsap.fromTo(icon, { scale: 1 }, { scale: 1.2, yoyo: true, repeat: 1, duration: 0.15, ease: "back.out(2)" });
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-secondary-bg px-4 relative z-10 border-t border-border-accent overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-primary/5 rounded-full filter blur-[150px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left: Info & Details */}
        <div className="contact-left space-y-8">
          <div>
            <span className="text-gold-primary text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold font-body block opacity-80 mb-2">
              Visit Us & Connect
            </span>
            <h2 className="font-display text-[2.5rem] md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Consult Manjul Malhotra In Person or Online
            </h2>
          </div>
          
          <div className="space-y-6 pt-4">
            
            {/* Location */}
            <div 
              className="flex items-start gap-5 p-4 rounded-xl hover:bg-surface/40 border border-transparent hover:border-gold-primary/30 transition-all duration-300 cursor-pointer group"
              onMouseEnter={handleItemHover}
            >
              <div className="contact-icon text-gold-primary mt-1 p-3 bg-gold-primary/10 rounded-full group-hover:bg-gold-primary group-hover:text-primary-bg transition-colors" data-type="pin">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-white mb-1">Our Location</h4>
                <p className="font-body text-[15px] text-cream/70 leading-relaxed max-w-sm">{CONTACT_INFO.address}</p>
              </div>
            </div>

            {/* Hours */}
            <div 
               className="flex items-start gap-5 p-4 rounded-xl hover:bg-surface/40 border border-transparent hover:border-gold-primary/30 transition-all duration-300 cursor-pointer group"
               onMouseEnter={handleItemHover}
            >
              <div className="contact-icon text-gold-primary mt-1 p-3 bg-gold-primary/10 rounded-full group-hover:bg-gold-primary group-hover:text-primary-bg transition-colors" data-type="clock">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-white mb-1">Business Hours</h4>
                <p className="font-body text-[15px] text-cream/70 leading-relaxed max-w-sm">{CONTACT_INFO.hours}</p>
              </div>
            </div>

            {/* Phone */}
            <div 
              className="flex items-start gap-5 p-4 rounded-xl hover:bg-surface/40 border border-transparent hover:border-gold-primary/30 transition-all duration-300 cursor-pointer group"
              onMouseEnter={handleItemHover}
            >
              <div className="contact-icon text-gold-primary mt-1 p-3 bg-gold-primary/10 rounded-full group-hover:bg-gold-primary group-hover:text-primary-bg transition-colors" data-type="phone">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-white mb-1">Call Direct</h4>
                <a href={`tel:${CONTACT_INFO.phoneFull}`} className="font-body text-[15px] text-gold-primary hover:text-gold-light inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-gold-primary after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300 transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link 
              href="/contact" 
              className="magnetic w-full sm:w-auto text-primary-bg font-bold px-10 py-4 rounded-full hover:scale-[1.05] transition-transform shadow-[0_10px_30px_rgba(201,168,76,0.2)] flex items-center justify-center gap-2 relative overflow-hidden group"
              style={{ backgroundImage: "linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)" }}
            >
              <span className="relative z-10">Book Consultation</span>
              <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg] animate-shimmer" />
            </Link>
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="magnetic w-full sm:w-auto border-[2px] border-gold-primary/50 text-gold-primary font-bold px-10 py-4 rounded-full hover:bg-gold-primary/10 hover:border-gold-primary transition flex items-center justify-center gap-2"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Right: Map Embed */}
        <div className="contact-right relative h-[450px] md:h-[500px] rounded-3xl overflow-hidden border border-gold-primary/20 shadow-2xl p-1 bg-surface/50 backdrop-blur-md">
          {/* iframe wrapper for map reveal */}
          <div className="contact-map w-full h-full rounded-2xl overflow-hidden relative group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14006.1834!2d77.1082!3d28.6441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d039f00000001%3A0x0!2sSubhash%20Nagar%20New%20Delhi!5e0!3m2!1sen!2sin!4v161234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }} 
              allowFullScreen={false} 
              loading="lazy"
              title="ALFA Location Map"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            ></iframe>
            
            {/* Ambient Map overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary-bg/80 via-transparent to-transparent opacity-60 mix-blend-multiply"></div>
            <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
