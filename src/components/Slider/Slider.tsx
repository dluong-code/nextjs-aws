"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { Fragment, useRef } from "react";
import Slick, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import Button from "@/components/Button";
import { MOTION } from "@/lib/motion";
import styles from "./Slider.module.css";

gsap.registerPlugin(useGSAP, SplitText);

type Cta = {
  label: string;
  href: string;
};

export type Slide = {
  id: string;
  eyebrow?: string;
  /** Use "\n" to force a line break */
  title: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  primaryCta?: Cta;
  secondaryCta?: Cta;
  tagline?: string;
};

type SliderProps = {
  slides: Slide[];
  settings?: Settings;
};

const DEFAULT_SETTINGS: Settings = {
  arrows: false,
  dots: true,
  fade: true,
  infinite: true,
  speed: 700,
  autoplay: true,
  autoplaySpeed: 6000,
  pauseOnHover: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

/** Plays the entrance sequence for one slide: image settles, title rises line by line, copy follows. */
function animateSlide(slide: Element, splits: Map<Element, SplitText>, delay = 0) {
  const q = gsap.utils.selector(slide);
  const title = q("[data-intro='title']")[0];
  const lines = (title && splits.get(title)?.lines) ?? [];

  const tl = gsap.timeline({ delay, defaults: { ease: MOTION.ease } });

  tl.fromTo(
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
    .set(q("[data-intro='ctas']"), { autoAlpha: 1 }, 0)
    .set(title, { autoAlpha: 1 }, 0.25)
    .fromTo(
      lines,
      { yPercent: 110 },
      { yPercent: 0, duration: MOTION.duration.heading, stagger: 0.1 },
      0.25,
    )
    .fromTo(
      q("[data-intro='copy'], [data-intro='ctas'] > *"),
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: MOTION.duration.base, stagger: MOTION.stagger },
      0.6,
    )
    .fromTo(
      q("[data-intro='tagline']"),
      { autoAlpha: 0, rotate: -4, y: 16 },
      { autoAlpha: 1, rotate: -12, y: 0, duration: 1.2 },
      0.9,
    );

  return tl;
}

export default function Slider({ slides, settings }: SliderProps) {
  const hasMultipleSlides = slides.length > 1;
  const sectionRef = useRef<HTMLElement>(null);
  const splitsRef = useRef(new Map<Element, SplitText>());
  const canAnimateRef = useRef(false);
  const beforeChangeRef = useRef<(current: number, next: number) => void>(undefined);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();

      // Replay the entrance on the incoming slide while the crossfade runs
      beforeChangeRef.current = contextSafe!((current: number, next: number) => {
        if (!canAnimateRef.current || current === next) return;

        const nextSlide = sectionRef.current?.querySelector(`.slick-slide[data-index='${next}']`);
        if (nextSlide) animateSlide(nextSlide, splitsRef.current, 0.2);
      });

      mm.add(MOTION.allowed, () => {
        canAnimateRef.current = true;
        const section = sectionRef.current!;
        const slideEls = section.querySelectorAll(".slick-slide");

        // Split every title once; autoSplit re-splits on resize and font load
        section.querySelectorAll("[data-intro='title']").forEach((title) => {
          splitsRef.current.set(
            title,
            SplitText.create(title, { type: "lines", mask: "lines", autoSplit: true }),
          );
        });

        // Every slide but the first is shown as-is until it becomes active
        const first = section.querySelector(".slick-slide[data-index='0']") ?? slideEls[0];
        slideEls.forEach((slideEl) => {
          if (slideEl !== first) gsap.set(slideEl.querySelectorAll("[data-intro]"), { autoAlpha: 1 });
        });

        if (first) animateSlide(first, splitsRef.current, 0.15);
        gsap.fromTo(
          section.querySelector(".slick-dots"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: MOTION.duration.base, delay: 1.2 },
        );

        return () => {
          canAnimateRef.current = false;
          splitsRef.current.forEach((split) => split.revert());
          splitsRef.current.clear();
        };
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={styles.slider}
      aria-roledescription="carousel"
      aria-label="Highlights"
    >
      <Slick
        {...DEFAULT_SETTINGS}
        dots={hasMultipleSlides}
        autoplay={hasMultipleSlides}
        {...settings}
        beforeChange={(current, next) => {
          settings?.beforeChange?.(current, next);
          beforeChangeRef.current?.(current, next);
        }}
      >
        {slides.map((slide, index) => {
          const Heading = index === 0 ? "h1" : "h2";

          return (
            <div key={slide.id}>
              <article className={styles.slide}>
                <div className={styles.media} data-intro="media">
                  {slide.image && (
                    <Image
                      src={slide.image.src}
                      alt={slide.image.alt}
                      fill
                      sizes="(min-width: 1024px) 65vw, 100vw"
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      className={styles.image}
                    />
                  )}
                </div>

                <div className={styles.content}>
                  {slide.eyebrow && (
                    <p className={styles.eyebrow} data-intro="eyebrow">
                      {slide.eyebrow}
                    </p>
                  )}
                  <Heading className={styles.title} data-intro="title">
                    {slide.title.split("\n").map((line, lineIndex) => (
                      <Fragment key={lineIndex}>
                        {lineIndex > 0 && <br />}
                        {line}
                      </Fragment>
                    ))}
                  </Heading>
                  {slide.description && (
                    <p className={styles.description} data-intro="copy">
                      {slide.description}
                    </p>
                  )}

                  {(slide.primaryCta || slide.secondaryCta) && (
                    <div className={styles.ctas} data-intro="ctas">
                      {slide.primaryCta && (
                        <Button as="link" href={slide.primaryCta.href} withArrow>
                          {slide.primaryCta.label}
                        </Button>
                      )}
                      {slide.secondaryCta && (
                        <Button as="link" href={slide.secondaryCta.href} variant="secondary">
                          {slide.secondaryCta.label}
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {slide.tagline && (
                  <p className={styles.tagline} aria-hidden="true" data-intro="tagline">
                    {slide.tagline}
                  </p>
                )}
              </article>
            </div>
          );
        })}
      </Slick>
    </section>
  );
}
