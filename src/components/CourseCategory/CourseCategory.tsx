import Image from "next/image";
import Button from "@/components/Button";
import styles from "./CourseCategory.module.css";

export type CourseCategoryItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  ctaLabel?: string;
  image: {
    src: string;
    alt: string;
  };
};

type CourseCategoryProps = {
  title: string;
  subtitle?: string;
  categories: CourseCategoryItem[];
};

export default function CourseCategory({ title, subtitle, categories }: CourseCategoryProps) {
  return (
    <section className={styles.section} aria-labelledby="course-category-heading">
      <div className={styles.inner}>
        <header className={styles.intro} data-reveal>
          <h2 id="course-category-heading" className={styles.heading}>
            {title}
          </h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>

        <ul className={styles.grid}>
          {categories.map(({ id, title, description, href, ctaLabel = "View Courses", image }) => (
            <li key={id} className={styles.card} data-reveal>
              <div className={styles.media}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 400px, 33vw"
                  className={styles.image}
                />
              </div>

              <div className={styles.body}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>

                <Button
                  as="link"
                  href={href}
                  size="sm"
                  withArrow
                  className={styles.cta}
                  aria-label={`${ctaLabel}: ${title}`}
                >
                  {ctaLabel}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
