"use client";

import Image from "next/image";
import Slick, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import Button from "@/components/Button";
import styles from "./Slider.module.css";

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

export default function Slider({ slides, settings }: SliderProps) {
  const hasMultipleSlides = slides.length > 1;

  return (
    <section className={styles.slider} aria-roledescription="carousel" aria-label="Highlights">
      <Slick
        {...DEFAULT_SETTINGS}
        dots={hasMultipleSlides}
        autoplay={hasMultipleSlides}
        {...settings}
      >
        {slides.map((slide, index) => {
          const Heading = index === 0 ? "h1" : "h2";

          return (
            <div key={slide.id}>
              <article className={styles.slide}>
                <div className={styles.media}>
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
                  {slide.eyebrow && <p className={styles.eyebrow}>{slide.eyebrow}</p>}
                  <Heading className={styles.title}>{slide.title}</Heading>
                  {slide.description && (
                    <p className={styles.description}>{slide.description}</p>
                  )}

                  {(slide.primaryCta || slide.secondaryCta) && (
                    <div className={styles.ctas}>
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
                  <p className={styles.tagline} aria-hidden="true">
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
