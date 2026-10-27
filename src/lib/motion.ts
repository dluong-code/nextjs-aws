/** Shared GSAP timings so every animation on the site feels like one system. */
export const MOTION = {
  /** Media query under which animations run; reduced-motion users get static content */
  allowed: "(prefers-reduced-motion: no-preference)",
  ease: "power3.out",
  duration: {
    fast: 0.4,
    base: 0.7,
    reveal: 0.8,
    heading: 1,
  },
  stagger: 0.08,
} as const;
