"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import { type MouseEvent, useRef } from "react";
import ArtDirectedImage, { type ArtDirectedSources } from "@/components/ArtDirectedImage";
import Button from "@/components/Button";
import { MOTION } from "@/lib/motion";
import styles from "./CoursesHero.module.css";

gsap.registerPlugin(useGSAP, ScrollToPlugin, SplitText);

type CoursesHeroProps = {
  breadcrumbs: { label: string; href?: string }[];
  eyebrow?: string;
  title: string;
  description?: string;
  /** Scrolls smoothly to the element with this id on the same page */
  cta: { label: string; targetId: string };
  background: ArtDirectedSources;
};

/**
 * Typographic banner over a textured background, centred from tablet up and
 * left-aligned on mobile, with a button that glides down the page.
 */
export default function CoursesHero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  cta,
  background,
}: CoursesHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION.allowed, () => {
        const q = gsap.utils.selector(sectionRef);
        const split = SplitText.create(q("[data-intro='title']"), {
          type: "lines",
          mask: "lines",
          autoSplit: true,
        });

        gsap
          .timeline({ delay: 0.1, defaults: { ease: MOTION.ease } })
          // The cream texture drifts gently into place
          .fromTo(
            q("[data-intro='media']"),
            { autoAlpha: 0, scale: 1.08 },
            { autoAlpha: 1, scale: 1, duration: 1.8, ease: "power2.out" },
            0,
          )
          .fromTo(
            q("[data-intro='eyebrow']"),
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: MOTION.duration.base, stagger: 0.08 },
            0.15,
          )
          .set(q("[data-intro='title']"), { autoAlpha: 1 }, 0.25)
          .fromTo(
            split.lines,
            { yPercent: 110 },
            { yPercent: 0, duration: MOTION.duration.heading, stagger: 0.12 },
            0.25,
          )
          .fromTo(
            q("[data-intro='copy']"),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: MOTION.duration.base, stagger: 0.1 },
            0.6,
          );

        return () => split.revert();
      });
    },
    { scope: sectionRef },
  );

  function scrollToTarget(event: MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(cta.targetId);
    if (!target) return;
    event.preventDefault();

    const finish = () => {
      history.replaceState(null, "", `#${cta.targetId}`);
      // Move keyboard and screen reader focus to the section too
      target.focus({ preventScroll: true });
    };

    if (!window.matchMedia(MOTION.allowed).matches) {
      target.scrollIntoView();
      finish();
      return;
    }

    gsap.to(window, {
      scrollTo: { y: target, autoKill: true },
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: finish,
    });
  }

  return (
    <section ref={sectionRef} className={styles.hero} aria-labelledby="courses-hero-title">
      <div className={styles.media} data-intro="media" aria-hidden="true">
        <ArtDirectedImage sources={background} className={styles.image} />
      </div>

      <div className={styles.inner}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb} data-intro="eyebrow">
          <ol>
            {breadcrumbs.map(({ label, href }) => (
              <li key={label}>
                {href ? <Link href={href}>{label}</Link> : <span aria-current="page">{label}</span>}
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.content}>
          {eyebrow && (
            <p className={styles.eyebrow} data-intro="eyebrow">
              {eyebrow}
            </p>
          )}
          <h1 id="courses-hero-title" className={styles.title} data-intro="title">
            {title}
          </h1>
          {description && (
            <p className={styles.description} data-intro="copy">
              {description}
            </p>
          )}
          <div className={styles.actions} data-intro="copy">
            <Button
              as="link"
              href={`#${cta.targetId}`}
              onClick={scrollToTarget}
              withArrow
              className={styles.cta}
            >
              {cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
