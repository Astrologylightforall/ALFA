"use client";

import { useEffect, ReactNode } from "react";
import scrollTimeline from "@/lib/scroll-timeline";

interface Props {
  children: ReactNode;
}

/**
 * ScrollTimelineProvider
 *
 * Wraps the entire app to provide global scroll choreography coordination.
 * Initializes the master scroll timeline that synchronizes animations
 * across all sections of the page.
 *
 * Place this high in the component tree (above layout content) in app/layout.tsx
 */
export default function ScrollTimelineProvider({ children }: Props) {
  useEffect(() => {
    // Initialize global scroll timeline
    scrollTimeline.initialize();

    // Cleanup on unmount
    return () => {
      scrollTimeline.destroy();
    };
  }, []);

  return <>{children}</>;
}
