"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import scrollTimeline from "@/lib/scroll-timeline";

interface SectionTransitionProps {
  children: ReactNode;
  sectionId: string;
  className?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  entranceFrom?: "bottom" | "left" | "right" | "fade" | "scale";
  exitTo?: "bottom" | "left" | "right" | "fade" | "scale";
}

/**
 * SectionTransition
 *
 * Wraps a section to provide coordinated entrance/exit animations
 * synchronized with the global scroll timeline.
 *
 * Usage:
 *   <SectionTransition sectionId="hero" entranceFrom="bottom">
 *     <HeroContent />
 *   </SectionTransition>
 */
export default function SectionTransition({
  children,
  sectionId,
  className = "",
  onEnter,
  onLeave,
  entranceFrom = "fade",
  exitTo = "fade",
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Use standard ScrollTrigger for visibility to ensure stability
    // This replaces the callback-based system which was prone to "stuck" states
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none none",
        // This ensures the section is always visible if we are anywhere inside it
        onRefresh: (self) => {
          if (self.isActive) gsap.set(sectionRef.current, { opacity: 1, y: 0, x: 0, scale: 1 });
        }
      }
    });

    const el = sectionRef.current;

    // Initial state based on entrance direction
    switch (entranceFrom) {
      case "bottom":
        tl.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
        break;
      case "left":
        tl.fromTo(el, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" });
        break;
      case "right":
        tl.fromTo(el, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" });
        break;
      case "scale":
        tl.fromTo(el, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" });
        break;
      case "fade":
      default:
        tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" });
        break;
    }

    // Register with global scroll timeline for potential callback synchronization
    scrollTimeline.registerSection({
      id: sectionId,
      triggerElement: sectionRef.current,
      onEnter,
      onLeave,
    });

    return () => {
      scrollTimeline.unregisterSection(sectionId);
    };
  }, [sectionId, entranceFrom, exitTo, onEnter, onLeave]);

  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  );
}
