"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface TiltCard3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * TiltCard3D
 *
 * Advanced 3D tilt effect with dynamic lighting/shadow that follows mouse.
 * Creates a realistic "floating card" effect with depth and responsive lighting.
 */
export default function TiltCard3D({
  children,
  className = "",
  maxTilt = 10,
  perspective = 1000,
  scale = 1.02,
  speed = 400,
  onMouseEnter,
  onMouseLeave,
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      // Dynamic shadow position (opposite to mouse)
      const shadowX = (x - centerX) * 0.3;
      const shadowY = (y - centerY) * 0.3;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: perspective,
        duration: speed / 1000,
        ease: "power2.out",
      });

      if (innerRef.current) {
        // Move inner content slightly opposite for depth
        gsap.to(innerRef.current, {
          x: -rotateY * 0.2,
          y: rotateX * 0.2,
          duration: speed / 1000,
          ease: "power2.out",
        });

        // Update gradient position based on mouse
        innerRef.current.style.setProperty("--mouse-x", `${x}px`);
        innerRef.current.style.setProperty("--mouse-y", `${y}px`);
      }

      // Dynamic border glow
      const borderGlow = `radial-gradient(circle at ${x}px ${y}px, rgba(201,168,76,0.4) 0%, transparent 50%)`;
      card.style.borderImage = borderGlow;
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
      if (innerRef.current) {
        gsap.to(innerRef.current, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    // Also call onMouseEnter/Leave props if provided
    if (onMouseEnter) {
      card.addEventListener("mouseenter", onMouseEnter);
    }
    if (onMouseLeave) {
      card.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      if (onMouseEnter) {
        card.removeEventListener("mouseenter", onMouseEnter);
      }
      if (onMouseLeave) {
        card.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [maxTilt, perspective, scale, speed, onMouseEnter, onMouseLeave]);

  return (
    <div
      ref={cardRef}
      className={`relative preserve-3d ${className}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div
        ref={innerRef}
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(201,168,76,0.15) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
}
