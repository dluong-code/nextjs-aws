"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { MOTION } from "@/lib/motion";
import styles from "./FaqAccordion.module.css";

gsap.registerPlugin(useGSAP);

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  /** Item expanded on first render */
  defaultOpenId?: string;
  title?: string;
};

type FaqAccordionItemProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqAccordionItem({ item, isOpen, onToggle }: FaqAccordionItemProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const buttonId = `faq-${item.id}-button`;
  const panelId = `faq-${item.id}-panel`;

  // CSS holds the open/closed end states; GSAP only animates between them
  useGSAP(
    () => {
      if (!hasMountedRef.current) {
        hasMountedRef.current = true;
        return;
      }
      if (!window.matchMedia(MOTION.allowed).matches) return;

      const panel = panelRef.current!;
      const answer = panel.firstElementChild;
      // Mid-animation, continue from the current height instead of jumping
      const currentHeight = gsap.isTweening(panel) ? panel.getBoundingClientRect().height : null;

      if (isOpen) {
        gsap.fromTo(
          panel,
          { height: currentHeight ?? 0 },
          {
            height: panel.scrollHeight,
            duration: 0.55,
            ease: "power3.inOut",
            overwrite: true,
            clearProps: "height",
          },
        );
        gsap.fromTo(
          answer,
          { autoAlpha: 0, y: -8 },
          { autoAlpha: 1, y: 0, duration: 0.45, delay: 0.15, ease: MOTION.ease, overwrite: true },
        );
      } else {
        gsap.fromTo(
          panel,
          { height: currentHeight ?? panel.scrollHeight, visibility: "visible" },
          {
            height: 0,
            duration: 0.4,
            ease: "power3.inOut",
            overwrite: true,
            clearProps: "height,visibility",
          },
        );
        gsap.to(answer, { autoAlpha: 0, duration: 0.2, overwrite: true, clearProps: "opacity,visibility" });
      }
    },
    { dependencies: [isOpen] },
  );

  return (
    <div className={`${styles.item} ${isOpen ? styles.open : ""}`} data-reveal>
      <h3 className={styles.heading}>
        <button
          type="button"
          id={buttonId}
          className={styles.trigger}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className={styles.question}>{item.question}</span>
          <span className={styles.icon} aria-hidden="true" />
        </button>
      </h3>

      <div ref={panelRef} id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel}>
        <p className={styles.answer}>{item.answer}</p>
      </div>
    </div>
  );
}

/** Two independent columns on desktop (opening one doesn't shift the other), one column below. */
export default function FaqAccordion({
  items,
  defaultOpenId,
  title = "Frequently asked questions",
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <section className={styles.section} aria-labelledby="faq-accordion-heading">
      <h2 id="faq-accordion-heading" className={styles.srOnly}>
        {title}
      </h2>

      <div className={styles.inner}>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className={styles.column}>
            {column.map((item) => (
              <FaqAccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
