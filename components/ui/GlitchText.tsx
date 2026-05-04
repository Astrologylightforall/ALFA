"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface GlitchTextProps {
  children: string;
  className?: string;
}

/**
 * GlitchText - Simplified
 * 
 * Removed all hover effects. The text is now simple and static 
 * to align with the "no hover effects on fonts" requirement.
 */
export default function GlitchText({ children, className = "" }: GlitchTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
    </span>
  );
}
