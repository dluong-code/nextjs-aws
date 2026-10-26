"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
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
  dots: true,
  infinite: false,
  speed: 450,
  slidesToScroll: 1,
  swipeToSlide: true,
};

/**
 * Fractional counts leave the next card peeking in from the right, hinting
 * that the row scrolls. We resolve these ourselves rather than using slick's
 * `responsive` option, which (as of react-slick 0.31) only reacts to media
 * query changes and ignores the breakpoint that matches on first load.
 */
const DESKTOP_SLIDES = 3.25;
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
  const slidesToShow = useSlidesToShow();

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
          <Slick key={slidesToShow} {...SLIDER_SETTINGS} slidesToShow={slidesToShow}>
            {courses.map((course) => (
              <div key={course.id} className={styles.slide}>
                <CourseCard course={course} />
              </div>
            ))}
          </Slick>
        </div>
      </div>
    </section>
  );
}
