"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";
import { MOTION } from "@/lib/motion";
import styles from "./HighlightsBar.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type Highlight = {
  id: string;
  icon: ReactNode;
  title: string;
  description?: string;
  /** Shows the title as a large stat, e.g. "10+"; a leading number counts up on reveal */
  stat?: boolean;
};

type HighlightsBarProps = {
  items: Highlight[];
  label?: string;
};

const STAT_PATTERN = /^(\d+)(.*)$/;

/** Row of credentials with rose icons: a list on mobile, two columns on tablet, one row on desktop. */
export default function HighlightsBar({ items, label = "Highlights" }: HighlightsBarProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION.allowed, () => {
        gsap.utils.toArray<HTMLElement>("[data-count]", sectionRef.current).forEach((el) => {
          const target = Number(el.dataset.count);
          const counter = { value: 0 };
          el.textContent = "0";

          gsap.to(counter, {
            value: target,
            duration: 1.4,
            delay: 0.3,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(counter.value));
            },
            // No clamp(): a clamped start sits at exactly 0 when the bar loads in view, so it never fires
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={styles.section} aria-label={label}>
      <ul className={styles.list}>
        {items.map(({ id, icon, title, description, stat }) => {
          const match = stat ? STAT_PATTERN.exec(title) : null;

          return (
            <li key={id} className={`${styles.item} ${stat ? styles.stat : ""}`} data-reveal>
              <span className={styles.iconCircle}>{icon}</span>
              <div>
                <h3 className={styles.title}>
                  {match ? (
                    <>
                      {/* Screen readers get the final figure; the count-up is visual only */}
                      <span className={styles.srOnly}>{title}</span>
                      <span aria-hidden="true">
                        <span data-count={match[1]}>{match[1]}</span>
                        {match[2]}
                      </span>
                    </>
                  ) : (
                    title
                  )}
                </h3>
                {description && <p className={styles.description}>{description}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
