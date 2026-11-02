import Image from "next/image";
import Link from "next/link";
import styles from "./CourseShowcase.module.css";

export type CourseSummary = {
  id: string;
  title: string;
  /** One-sentence brief shown on the card */
  brief: string;
  href: string;
  /** Short tag such as "Beginner" or "Advanced" */
  level: string;
  /** The signature course: always placed last and styled to stand out */
  featured?: boolean;
  /** Small label on the featured card, e.g. "Signature Course" */
  badge?: string;
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

/**
 * "Our Courses" as a static grid. Desktop: three cards, then a fourth beside
 * the wide featured card. Tablet: a 2×2 grid with the featured card spanning
 * the full width beneath. Mobile: compact horizontal cards, featured last.
 */
export default function CourseShowcase({
  id = "our-courses",
  title,
  description,
  courses,
}: CourseShowcaseProps) {
  // The featured course always closes the grid, wherever it sits in the data
  const ordered = [...courses.filter((c) => !c.featured), ...courses.filter((c) => c.featured)];

  return (
    <section
      id={id}
      className={styles.section}
      aria-labelledby={`${id}-heading`}
      // Focus target for the hero's "Explore Courses" link
      tabIndex={-1}
    >
      <div className={styles.inner}>
        <header className={styles.intro} data-reveal>
          <h2 id={`${id}-heading`} className={styles.heading}>
            {title}
          </h2>
          {description && <p className={styles.description}>{description}</p>}
        </header>

        <ul className={styles.grid}>
          {ordered.map((course, index) => (
            <li
              key={course.id}
              className={`${styles.cell} ${course.featured ? styles.featuredCell : ""}`}
              data-reveal
            >
              <CourseCard course={course} step={index + 1} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CourseCard({ course, step }: { course: CourseSummary; step: number }) {
  const { title, brief, href, level, featured, badge, image } = course;

  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <div className={styles.media}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 380px, (min-width: 600px) 45vw, 100vw"
              : "(min-width: 1024px) 380px, (min-width: 600px) 45vw, 36vw"
          }
          className={styles.image}
          style={{ objectPosition: image.position }}
        />
        {featured && badge && <span className={styles.badge}>{badge}</span>}
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          <span className={styles.step} aria-hidden="true">
            {String(step).padStart(2, "0")}
          </span>
          <span className={styles.level}>{level}</span>
        </p>
        <h3 className={styles.title}>
          {/* Stretched link: the whole card is clickable */}
          <Link href={href} className={styles.link}>
            {title}
          </Link>
        </h3>
        <p className={styles.brief}>{brief}</p>
        <span className={styles.learnMore} aria-hidden="true">
          {featured ? "Discover The Master Class" : "Learn More"}
          <svg viewBox="0 0 16 16" focusable="false">
            <path d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5" />
          </svg>
        </span>
      </div>
    </article>
  );
}
