"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LiquidMagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

/**
 * LiquidMagneticButton
 *
 * Button with advanced magnetic hover effect + liquid metal fill animation.
 * The button "melts" toward the cursor and fills with liquid gold on hover.
 */
export default function LiquidMagneticButton({
  children,
  onClick,
  className = "",
  variant = "gold",
  size = "md",
}: LiquidMagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-4 text-lg",
  };

  const variants = {
    gold: "bg-gradient-gold text-primary-bg",
    outline: "border-2 border-gold-primary text-gold-primary bg-transparent",
    ghost: "bg-transparent text-gold-primary",
  };

  useGSAP(() => {
    if (!btnRef.current) return;

    const btn = btnRef.current;
    const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) * 0.3;
      const y = (e.clientY - centerY) * 0.3;

      xTo(x);
      yTo(y);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(btn, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" });
      if (fillRef.current) {
        gsap.to(fillRef.current, {
          scaleX: 1,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(btn, { scale: 1, duration: 0.3, ease: "power3.out" });
      gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
      if (fillRef.current) {
        gsap.to(fillRef.current, {
          scaleX: 0,
          duration: 0.4,
          ease: "power3.inOut",
        });
      }
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseenter", handleMouseEnter);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseenter", handleMouseEnter);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`relative overflow-hidden ${sizes[size]} ${variants[variant]} rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.6)] group ${className}`}
    >
      {/* Liquid fill animation */}
      <span
        ref={fillRef}
        className="absolute inset-0 bg-white/20 origin-left scale-x-0"
        style={{
          transformOrigin: "left center",
          transition: "none",
        }}
      />

      {/* Shimmer sweep */}
      <span className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:animate-shimmer" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
