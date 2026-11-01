"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Slick, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import { ChevronIcon } from "@/components/icons";
import styles from "./CourseShowcase.module.css";

export type CourseSummary = {
  id: string;
  title: string;
  /** One-sentence brief shown on the card */
  brief: string;
  href: string;
  image: {
    src: string;
    alt: string;
    /** CSS object-position, for photos whose subject sits off-centre */
    position?: string;
  };
};

type CourseShowcaseProps = {
  id?: string;
  title: string;
  description?: string;
  courses: CourseSummary[];
};

const SLIDES_TO_SHOW = 3;

const SLIDER_SETTINGS: Settings = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: SLIDES_TO_SHOW,
  slidesToScroll: 1,
  swipeToSlide: true,
};

/**
 * "Our Courses": a three-up card carousel from tablet up, with arrows on
 * desktop; on mobile every course is listed as a compact row instead.
 */
export default function CourseShowcase({
  id = "our-courses",
  title,
  description,
  courses,
}: CourseShowcaseProps) {
  const sliderRef = useRef<Slick>(null);
  const [index, setIndex] = useState(0);

  const lastIndex = Math.max(0, courses.length - SLIDES_TO_SHOW);
  const dotCount = lastIndex + 1;

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-heading`}>
      <div className={styles.inner}>
        <header className={styles.intro} data-reveal>
          <h2 id={`${id}-heading`} className={styles.heading}>
            {title}
          </h2>
          {description && <p className={styles.description}>{description}</p>}
        </header>

        {/* Tablet & desktop: carousel */}
        <div className={styles.carousel} data-reveal>
          <button
            type="button"
            className={`${styles.arrow} ${styles.prev}`}
            onClick={() => sliderRef.current?.slickPrev()}
            disabled={index === 0}
            aria-label="Previous courses"
          >
            <ChevronIcon size={18} />
          </button>

          <div className={styles.slider}>
            <Slick
              ref={sliderRef}
              {...SLIDER_SETTINGS}
              beforeChange={(_, next) => setIndex(Math.min(next, lastIndex))}
            >
              {courses.map((course) => (
                <div key={course.id} className={styles.slide}>
                  <CourseTile course={course} />
                </div>
              ))}
            </Slick>
          </div>

          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            onClick={() => sliderRef.current?.slickNext()}
            disabled={index >= lastIndex}
            aria-label="Next courses"
          >
            <ChevronIcon size={18} />
          </button>

          {dotCount > 1 && (
            <ul className={styles.dots}>
              {Array.from({ length: dotCount }, (_, dot) => (
                <li key={dot}>
                  <button
                    type="button"
                    className={styles.dot}
                    aria-label={`Show courses from ${dot + 1}`}
                    aria-current={dot === index ? "true" : undefined}
                    onClick={() => sliderRef.current?.slickGoTo(dot)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mobile: compact list of every course */}
        <ul className={styles.list}>
          {courses.map((course) => (
            <li key={course.id} data-reveal>
              <Link href={course.href} className={styles.row}>
                <span className={styles.rowMedia}>
                  <Image
                    src={course.image.src}
                    alt=""
                    fill
                    sizes="80px"
                    className={styles.image}
                    style={{ objectPosition: course.image.position }}
                  />
                </span>
                <span className={styles.rowTitle}>{course.title}</span>
                <ChevronIcon size={16} className={styles.rowArrow} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CourseTile({ course }: { course: CourseSummary }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardMedia}>
        <Image
          src={course.image.src}
          alt={course.image.alt}
          fill
          sizes="(min-width: 1024px) 360px, 32vw"
          className={styles.image}
          style={{ objectPosition: course.image.position }}
        />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{course.title}</h3>
        <p className={styles.cardBrief}>{course.brief}</p>
        <Link href={course.href} className={styles.learnMore}>
          Learn More<span className={styles.srOnly}> about {course.title}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
