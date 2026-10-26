"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import Slick, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import CourseCard, { type Course } from "@/components/CourseCard";
import { ArrowUpRightIcon } from "@/components/icons";
import styles from "./FeaturedCourse.module.css";

type FeaturedCourseProps = {
  title?: string;
  courses: Course[];
  viewAllHref?: string;
};

const SLIDER_SETTINGS: Settings = {
  arrows: false,
  dots: false,
  infinite: false,
  speed: 450,
  slidesToScroll: 1,
  swipeToSlide: true,
};

/**
 * Cards bleed off the right edge of the screen, so the next one peeks in;
 * fractional counts add a little extra peek on smaller screens. We resolve
 * these ourselves rather than using slick's `responsive` option, which (as of
 * react-slick 0.31) only reacts to media query changes and ignores the
 * breakpoint that matches on first load.
 */
const DESKTOP_SLIDES = 3;
const BREAKPOINTS = [
  { query: "(max-width: 599px)", slidesToShow: 1.1 },
  { query: "(max-width: 1023px)", slidesToShow: 2.2 },
];

function subscribe(onChange: () => void) {
  const lists = BREAKPOINTS.map(({ query }) => window.matchMedia(query));
  lists.forEach((list) => list.addEventListener("change", onChange));
  return () => lists.forEach((list) => list.removeEventListener("change", onChange));
}

function getSlidesToShow() {
  return (
    BREAKPOINTS.find(({ query }) => window.matchMedia(query).matches)?.slidesToShow ??
    DESKTOP_SLIDES
  );
}

function useSlidesToShow() {
  return useSyncExternalStore(subscribe, getSlidesToShow, () => DESKTOP_SLIDES);
}

export default function FeaturedCourse({
  title = "Featured Courses",
  courses,
  viewAllHref = "/courses",
}: FeaturedCourseProps) {
  const sliderRef = useRef<Slick>(null);
  const slidesToShow = useSlidesToShow();
  const [position, setPosition] = useState({ slidesToShow, index: 0 });
  // Slick remounts (and returns to the first slide) when slidesToShow changes
  const currentIndex = position.slidesToShow === slidesToShow ? position.index : 0;

  // Rendered ourselves: on the last slide slick stops at a fractional index
  // (e.g. 2.9) so the final card sits flush right, and its built-in dots lose
  // their active state there. Rounding up lights the last dot instead.
  const dotCount = Math.max(1, Math.ceil(courses.length - slidesToShow) + 1);
  const activeDot = Math.min(dotCount - 1, Math.ceil(currentIndex - 0.001));

  return (
    <section className={styles.section} aria-labelledby="featured-course-heading">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <h2 id="featured-course-heading" className={styles.heading}>
            {title}
          </h2>
          <Link href={viewAllHref} className={styles.viewAll}>
            View All<span className={styles.viewAllSuffix}> Courses</span>
            <ArrowUpRightIcon size={16} />
          </Link>
        </header>

        <div className={styles.slider}>
          <Slick
            ref={sliderRef}
            key={slidesToShow}
            {...SLIDER_SETTINGS}
            slidesToShow={slidesToShow}
            beforeChange={(_, next) => setPosition({ slidesToShow, index: next })}
          >
            {courses.map((course) => (
              <div key={course.id} className={styles.slide}>
                <CourseCard course={course} />
              </div>
            ))}
          </Slick>
        </div>

        {dotCount > 1 && (
          <ul className={styles.dots}>
            {Array.from({ length: dotCount }, (_, index) => (
              <li key={index}>
                <button
                  type="button"
                  className={styles.dot}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeDot ? "true" : undefined}
                  onClick={() => sliderRef.current?.slickGoTo(index)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
