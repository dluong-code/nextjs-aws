"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";
import { MOTION } from "@/lib/motion";
import styles from "./PageHero.module.css";

gsap.registerPlugin(useGSAP, SplitText);

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image: {
    src: string;
    alt: string;
  };
};

/** Banner at the top of inner pages: photo on the right fading into the copy on the left. */
export default function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
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
          .timeline({ delay: 0.15, defaults: { ease: MOTION.ease } })
          .fromTo(
            q("[data-intro='media']"),
            { autoAlpha: 0, scale: 1.08 },
            { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power2.out" },
            0,
          )
          .fromTo(
            q("[data-intro='eyebrow']"),
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: MOTION.duration.base },
            0.15,
          )
          .set(q("[data-intro='title']"), { autoAlpha: 1 }, 0.25)
          .fromTo(
            split.lines,
            { yPercent: 110 },
            { yPercent: 0, duration: MOTION.duration.heading, stagger: 0.1 },
            0.25,
          )
          .fromTo(
            q("[data-intro='copy']"),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: MOTION.duration.base },
            0.6,
          );

        return () => split.revert();
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.media} data-intro="media">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 70vw, 100vw"
          loading="eager"
          fetchPriority="high"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        {eyebrow && (
          <p className={styles.eyebrow} data-intro="eyebrow">
            {eyebrow}
          </p>
        )}
        <h1 className={styles.title} data-intro="title">
          {title}
        </h1>
        {description && (
          <p className={styles.description} data-intro="copy">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
