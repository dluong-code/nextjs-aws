"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { MOTION } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Fades every element marked with `data-reveal` up into place as it scrolls
 * into view. Elements entering together are staggered. Re-runs on navigation
 * so newly rendered pages are picked up.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION.allowed, () => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");

        // Anything already on screen (or scrolled past) at load reveals right
        // away, following the hero intro. The rest waits until it's scrolled to.
        const viewportHeight = window.innerHeight;
        const aboveFold = targets.filter((el) => el.getBoundingClientRect().top < viewportHeight);
        const belowFold = targets.filter((el) => !aboveFold.includes(el));

        const reveal = (elements: Element[], delay = 0) =>
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            delay,
            duration: MOTION.duration.reveal,
            ease: MOTION.ease,
            stagger: 0.12,
            overwrite: true,
            clearProps: "transform",
          });

        gsap.set(targets, { autoAlpha: 0, y: 32 });

        if (aboveFold.length) reveal(aboveFold, 0.6);

        ScrollTrigger.batch(belowFold, {
          // clamp() keeps triggers near the page bottom (e.g. the footer)
          // reachable even if they'd otherwise start past the max scroll
          start: "clamp(top 90%)",
          once: true,
          onEnter: (batch) => reveal(batch),
        });

        // Sliders and images settle after hydration and shift content; re-measure
        // trigger positions whenever the page height changes
        let lastHeight = document.body.scrollHeight;
        const observer = new ResizeObserver(() => {
          const height = document.body.scrollHeight;
          if (height === lastHeight) return;
          lastHeight = height;
          ScrollTrigger.refresh();
        });
        observer.observe(document.body);

        return () => observer.disconnect();
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
