"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image, { getImageProps } from "next/image";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import { MOTION } from "@/lib/motion";
import VideoModal, { type Video } from "./VideoModal";
import styles from "./VideoHeroBanner.module.css";

gsap.registerPlugin(useGSAP, SplitText);

type ImageSource = {
  src: string;
  alt: string;
};

type SizedImage = {
  src: string;
  width: number;
  height: number;
};

type Cta = {
  label: string;
  href: string;
};

type VideoHeroBannerProps = {
  eyebrow?: string;
  title: string;
  roles?: string[];
  description?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  /** Decorative studio scene behind the whole banner, art-directed per breakpoint */
  background: {
    mobile: SizedImage;
    tablet: SizedImage;
    desktop: SizedImage;
  };
  video: Video & {
    heading: string;
    description?: string;
    poster: ImageSource;
  };
};

/** Intro banner with a video card that plays the video in a pop-up player. */
export default function VideoHeroBanner({
  eyebrow,
  title,
  roles,
  description,
  primaryCta,
  secondaryCta,
  background,
  video,
}: VideoHeroBannerProps) {
  const backgroundSources = getBackgroundSources(background);

  const sectionRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
            { autoAlpha: 0, scale: 1.06 },
            { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power2.out" },
            0,
          )
          .fromTo(
            q("[data-intro='eyebrow']"),
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: MOTION.duration.base },
            0.1,
          )
          .set(q("[data-intro='title']"), { autoAlpha: 1 }, 0.2)
          .fromTo(
            split.lines,
            { yPercent: 110 },
            { yPercent: 0, duration: MOTION.duration.heading, stagger: 0.1 },
            0.2,
          )
          .set(q("[data-intro='roles']"), { autoAlpha: 1 }, 0.45)
          .fromTo(
            q("[data-intro='roles'] li"),
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: MOTION.duration.fast, stagger: 0.07 },
            0.45,
          )
          .fromTo(
            q("[data-intro='copy']"),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: MOTION.duration.base, stagger: 0.1 },
            0.6,
          )
          // The card wipes open from the left, with the photo settling inside it
          .fromTo(
            q("[data-intro='card']"),
            { autoAlpha: 0, y: 24, clipPath: "inset(0% 100% 0% 0% round 12px)" },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0% round 12px)",
              duration: 1.1,
              ease: "power3.inOut",
            },
            0.4,
          )
          .fromTo(
            q("[data-intro='card'] img"),
            { scale: 1.12 },
            { scale: 1, duration: 1.6, ease: "power2.out" },
            0.4,
          )
          .fromTo(
            q("[data-intro='card-copy']"),
            { autoAlpha: 0, x: -16 },
            { autoAlpha: 1, x: 0, duration: MOTION.duration.base },
            1,
          )
          .fromTo(
            q("[data-intro='play']"),
            { autoAlpha: 0, scale: 0.4 },
            { autoAlpha: 1, scale: 1, duration: 0.7, ease: "back.out(2)" },
            1.15,
          );

        return () => split.revert();
      });
    },
    { scope: sectionRef },
  );

  const open = () => setIsPlaying(true);

  return (
    <section ref={sectionRef} className={styles.banner} aria-labelledby="video-hero-title">
      <div className={styles.backdrop} data-intro="media" aria-hidden="true">
        <picture>
          <source media="(min-width: 1024px)" srcSet={backgroundSources.desktop} />
          <source media="(min-width: 600px)" srcSet={backgroundSources.tablet} />
          <img {...backgroundSources.img} alt="" className={styles.backdropImage} />
        </picture>
      </div>

      <div className={styles.inner}>
        <div className={styles.content}>
          {eyebrow && (
            <p className={styles.eyebrow} data-intro="eyebrow">
              {eyebrow}
            </p>
          )}
          <h1 id="video-hero-title" className={styles.title} data-intro="title">
            {title}
          </h1>
          {roles && roles.length > 0 && (
            <ul className={styles.roles} data-intro="roles">
              {roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          )}
          {description && (
            <p className={styles.description} data-intro="copy">
              {description}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className={styles.actions} data-intro="copy">
              {primaryCta && (
                <Button as="link" href={primaryCta.href} withArrow className={styles.action}>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button as="link" href={secondaryCta.href} variant="outline" className={styles.action}>
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>

        <div className={styles.card} data-intro="card">
          <div className={styles.cardBackdrop} aria-hidden="true">
            <Image
              src={background.tablet.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className={styles.cardBackdropImage}
            />
          </div>
          <div className={styles.poster}>
            <Image
              src={video.poster.src}
              alt={video.poster.alt}
              fill
              sizes="(min-width: 1024px) 28vw, 60vw"
              className={styles.posterImage}
            />
          </div>

          <div className={styles.cardCopy} data-intro="card-copy">
            <h2 className={styles.cardTitle}>{video.heading}</h2>
            {video.description && <p className={styles.cardDescription}>{video.description}</p>}
            <Button size="sm" withArrow onClick={open} aria-haspopup="dialog" className={styles.watch}>
              Watch Video
            </Button>
          </div>

          <button
            type="button"
            className={styles.play}
            onClick={open}
            aria-haspopup="dialog"
            aria-label={`Play video: ${video.title}`}
            data-intro="play"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M8 5.5v13a.75.75 0 0 0 1.14.64l10.4-6.5a.75.75 0 0 0 0-1.28L9.14 4.86A.75.75 0 0 0 8 5.5Z" />
            </svg>
          </button>
        </div>
      </div>

      <VideoModal video={video} isOpen={isPlaying} onClose={() => setIsPlaying(false)} />
    </section>
  );
}

/** Builds a <picture>'s sources so each breakpoint downloads only its own optimised image. */
function getBackgroundSources({ mobile, tablet, desktop }: VideoHeroBannerProps["background"]) {
  const common = { alt: "", sizes: "100vw", loading: "eager" as const, fetchPriority: "high" as const };
  const srcSetFor = (image: SizedImage) => getImageProps({ ...common, ...image }).props.srcSet;
  const { props: img } = getImageProps({ ...common, ...mobile });

  return { desktop: srcSetFor(desktop), tablet: srcSetFor(tablet), img };
}
