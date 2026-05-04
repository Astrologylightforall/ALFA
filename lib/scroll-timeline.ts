import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Global Scroll Timeline Manager
 *
 * Coordinates animations across multiple sections using a master timeline
 * that syncs with page scroll. Sections can register themselves to appear
 * at specific scroll positions with coordinated entrance/exit animations.
 */

interface SectionRegistration {
  id: string;
  triggerElement: HTMLElement | null;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

class ScrollTimelineManager {
  private masterTimeline: gsap.core.Timeline | null = null;
  private masterScrollTrigger: ScrollTrigger | null = null;
  private sections: Map<string, SectionRegistration> = new Map();
  private isInitialized = false;
  private scrollVelocity = 0;
  private lastScrollY = 0;
  private velocityThrottle = 0;

  /**
   * Initialize the global scroll timeline
   * Call once at app root (e.g., in ScrollTimelineProvider)
   */
  initialize() {
    if (this.isInitialized) return;

    // Create master timeline that scrubs with scroll
    this.masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing with 1 second lerp
        onUpdate: (self) => {
          // Emit scroll velocity for reactive animations
          this.emitVelocityUpdate();
        },
      },
    });

    // Track scroll velocity for interactive animations
    window.addEventListener("scroll", this.handleScroll.bind(this), { passive: true });

    this.isInitialized = true;
    console.log("[ScrollTimeline] Initialized");
  }

  /**
   * Cleanup - call on unmount
   */
  destroy() {
    if (this.masterScrollTrigger) {
      this.masterScrollTrigger.kill();
    }
    if (this.masterTimeline) {
      this.masterTimeline.kill();
    }
    window.removeEventListener("scroll", this.handleScroll.bind(this));
    this.isInitialized = false;
  }

  /**
   * Register a section to the global timeline
   * Sections can define callbacks for enter/leave events
   */
  registerSection(registration: SectionRegistration) {
    if (!registration.id || !registration.triggerElement) {
      console.warn("[ScrollTimeline] Invalid registration", registration);
      return;
    }

    this.sections.set(registration.id, registration);

    // Create individual ScrollTrigger for this section
    const scrollTrigger = ScrollTrigger.create({
      trigger: registration.triggerElement,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        if (registration.onEnter) registration.onEnter();
        this.emitSectionEvent(registration.id, "enter");
      },
      onLeave: () => {
        if (registration.onLeave) registration.onLeave();
        this.emitSectionEvent(registration.id, "leave");
      },
      onEnterBack: () => {
        if (registration.onEnterBack) registration.onEnterBack();
        this.emitSectionEvent(registration.id, "enterBack");
      },
      onLeaveBack: () => {
        if (registration.onLeaveBack) registration.onLeaveBack();
        this.emitSectionEvent(registration.id, "leaveBack");
      },
    });

    return scrollTrigger;
  }

  /**
   * Unregister a section
   */
  unregisterSection(id: string) {
    this.sections.delete(id);
  }

  /**
   * Get current scroll velocity (pixels per second, approximate)
   * Used for velocity-based animations (stretch, blur, etc.)
   */
  getScrollVelocity(): number {
    return this.scrollVelocity;
  }

  /**
   * Add a tween/timeline to the master scroll-scrubbed timeline
   * This allows animations to play as user scrolls
   */
  addToMasterTimeline(elements: any) {
    if (this.masterTimeline) {
      this.masterTimeline.add(elements);
    }
  }

  /**
   * Refresh all ScrollTriggers (call after DOM changes)
   */
  refresh() {
    if (this.masterScrollTrigger) {
      this.masterScrollTrigger.refresh();
    }
    ScrollTrigger.refresh();
  }

  // Private methods

  private handleScroll() {
    const currentY = window.scrollY;
    const delta = Math.abs(currentY - this.lastScrollY);
    this.scrollVelocity = delta;
    this.lastScrollY = currentY;

    // Throttle velocity decay
    clearTimeout(this.velocityThrottle);
    this.velocityThrottle = setTimeout(() => {
      this.scrollVelocity = 0;
    }, 150) as unknown as number;
  }

  private emitVelocityUpdate() {
    // Dispatch custom event for components to listen to
    window.dispatchEvent(
      new CustomEvent("scrolltimeline:velocity", {
        detail: { velocity: this.scrollVelocity },
      })
    );
  }

  private emitSectionEvent(sectionId: string, event: "enter" | "leave" | "enterBack" | "leaveBack") {
    window.dispatchEvent(
      new CustomEvent("scrolltimeline:section", {
        detail: { sectionId, event }
      })
    );
  }
}

// Singleton instance
export const scrollTimeline = new ScrollTimelineManager();

// Hook helper functions for React components
export function useScrollTimeline() {
  return {
    register: (id: string, trigger: HTMLElement | null, callbacks?: Partial<SectionRegistration>) => {
      if (typeof window !== "undefined" && trigger) {
        return scrollTimeline.registerSection({
          id,
          triggerElement: trigger,
          ...callbacks,
        });
      }
    },
    unregister: (id: string) => scrollTimeline.unregisterSection(id),
    getVelocity: () => scrollTimeline.getScrollVelocity(),
    refresh: () => scrollTimeline.refresh(),
  };
}

export default scrollTimeline;
