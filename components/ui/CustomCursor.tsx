"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const pathname = usePathname();
  // We use max-width 768px as a basic breakpoint for avoiding custom cursor on mobile
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile) return;

    const dot = cursorDot.current;
    const ring = cursorRing.current;
    if (!dot || !ring) return;

    // Set initial position
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0, ease: "none" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0, ease: "none" });

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.15, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.15, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
      
      // Magnetic effect for elements with .magnetic class
      const target = e.target as HTMLElement;
      const magneticTarget = target.closest(".magnetic") as HTMLElement;
      
      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // PULL effect on the button
        gsap.to(magneticTarget, {
          x: distanceX * 0.2,
          y: distanceY * 0.2,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleHoverStart = (e: Event) => {
      isHovering.current = true;
      const target = e.target as HTMLElement;
      const isMagnetic = target.classList?.contains("magnetic") || target.closest(".magnetic");

      if (isMagnetic) {
        gsap.to(ring, { scale: 2, backgroundColor: "rgba(201,168,76,0.15)", borderWidth: "2px", duration: 0.3, ease: "power3.out" });
        gsap.to(dot, { scale: 1.3, duration: 0.2 });
      } else {
        gsap.to(ring, { scale: 1.5, backgroundColor: "rgba(201,168,76,0.1)", duration: 0.3, ease: "power3.out" });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      }
    };

    const handleHoverEnd = (e: Event) => {
      isHovering.current = false;
      
      const target = e.target as HTMLElement;
      const magneticTarget = target.classList?.contains("magnetic") ? target : target.closest(".magnetic");
      
      if (magneticTarget) {
        gsap.to(magneticTarget, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      }

      gsap.to(ring, { scale: 1, backgroundColor: "transparent", borderWidth: "1.5px", duration: 0.3, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const handleMouseDown = () => {
      gsap.to([dot, ring], { scale: 0.8, duration: 0.1, ease: "power3.out" });
    };

    const handleMouseUp = () => {
      gsap.to([dot, ring], { scale: isHovering.current ? 1.5 : 1, duration: 0.3, ease: "elastic.out(1, 0.3)" });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const interactiveElements = document.querySelectorAll("a, button, [role='button'], input, textarea, select, .magnetic");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [pathname, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Ring */}
      <div 
        ref={cursorRing} 
        className="fixed top-0 left-0 w-10 h-10 border-[1.5px] border-[#C9A84C]/60 rounded-full pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Inner Dot */}
      <div 
        ref={cursorDot} 
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-[#C9A84C] rounded-full pointer-events-none z-[10000]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
