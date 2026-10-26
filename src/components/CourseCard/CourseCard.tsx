import Image from "next/image";
import Button from "@/components/Button";
import { CalendarIcon, CertificateIcon, UserIcon } from "@/components/icons";
import styles from "./CourseCard.module.css";

export type Course = {
  id: string;
  title: string;
  description: string;
  href: string;
  /** Price in whole pounds */
  price: number;
  duration: string;
  level: string;
  certificate?: boolean;
  image: {
    src: string;
    alt: string;
  };
};

type CourseCardProps = {
  course: Course;
  ctaLabel?: string;
};

const priceFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export default function CourseCard({ course, ctaLabel = "View Course" }: CourseCardProps) {
  const { title, description, href, price, duration, level, certificate, image } = course;

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 600px) 45vw, 40vw"
          className={styles.image}
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <ul className={styles.meta}>
          <li>
            <CalendarIcon size={14} />
            <span className={styles.visuallyHidden}>Duration: </span>
            {duration}
          </li>
          <li>
            <UserIcon size={14} />
            <span className={styles.visuallyHidden}>Level: </span>
            {level}
          </li>
          {certificate && (
            <li>
              <CertificateIcon size={14} />
              Certificate
            </li>
          )}
        </ul>

        <div className={styles.footer}>
          <p className={styles.price}>{priceFormatter.format(price)}</p>
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
      </div>
    </article>
  );
}
