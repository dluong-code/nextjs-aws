"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { type ReactNode, useRef } from "react";
import { MOTION } from "@/lib/motion";
import styles from "./MyStory.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type MyStoryProps = {
  eyebrow?: string;
  title: string;
  /** Each entry is one paragraph; <strong> picks out names such as the academy's */
  paragraphs: ReactNode[];
  signOff: {
    name: string;
    role: string;
  };
  image: {
    src: string;
    alt: string;
  };
};

/**
 * Founder story beside a portrait. On desktop the copy and photo sit side by
 * side; on smaller screens the photo floats right and the story wraps around it.
 */
export default function MyStory({ eyebrow, title, paragraphs, signOff, image }: MyStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION.allowed, () => {
        const q = gsap.utils.selector(sectionRef);

        // The portrait unveils upward as it scrolls into view
        gsap
          .timeline({
            defaults: { ease: MOTION.ease },
            scrollTrigger: { trigger: q("[data-story='media']"), start: "top 85%", once: true },
          })
          .fromTo(
            q("[data-story='media']"),
            { clipPath: "inset(100% 0% 0% 0% round 6px)" },
            { clipPath: "inset(0% 0% 0% 0% round 6px)", duration: 1.2, ease: "power3.inOut" },
          )
          .fromTo(q("[data-story='media'] img"), { scale: 1.15 }, { scale: 1, duration: 1.6 }, 0);

        // The heart beside the name draws itself in
        gsap.fromTo(
          q("[data-story='heart']"),
          { strokeDashoffset: 60 },
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: { trigger: q("[data-story='sign-off']"), start: "top 92%", once: true },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="my-story-title">
      <div className={styles.inner}>
        {/* First in the source so it can float beside the heading on smaller screens */}
        <figure className={styles.media} data-story="media">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 36vw"
            className={styles.image}
          />
        </figure>

        <header className={styles.header} data-reveal>
          {eyebrow && (
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowText}>{eyebrow}</span>
            </p>
          )}
          <h2 id="my-story-title" className={styles.title}>
            {title}
          </h2>
        </header>

        <div className={styles.body} data-story="body">
          {paragraphs.map((paragraph, index) => (
            <p key={index} data-reveal>
              {paragraph}
            </p>
          ))}

          <div className={styles.signOff} data-story="sign-off" data-reveal>
            <p className={styles.name}>
              {signOff.name}
              <svg className={styles.heart} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  data-story="heart"
                  pathLength={60}
                  strokeDasharray={60}
                  d="M12 20s-7.5-4.6-7.5-10.1A4.15 4.15 0 0 1 12 7.45a4.15 4.15 0 0 1 7.5 2.45C19.5 15.4 12 20 12 20Z"
                />
              </svg>
            </p>
            <p className={styles.role}>{signOff.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
