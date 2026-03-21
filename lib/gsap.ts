"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Optional Premium plugins: ScrollSmoother, SplitText, CustomEase, MorphSVGPlugin
  // Depending on whether Club GSAP is installed in the project.
}

// Global default configuration for GSAP
gsap.defaults({
  ease: "power3.out",
});

export { gsap, ScrollTrigger };
