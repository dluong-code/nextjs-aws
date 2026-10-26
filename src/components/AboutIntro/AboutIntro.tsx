import { getImageProps } from "next/image";
import Button from "@/components/Button";
import styles from "./AboutIntro.module.css";

type ImageSource = {
  src: string;
  width: number;
  height: number;
};

export type AboutStat = {
  value: string;
  label: string;
};

export type AboutIntroProps = {
  /** Use "\n" to force a line break */
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  stats: AboutStat[];
  image: {
    alt: string;
    /** Wide crop shown from 1024px up */
    desktop: ImageSource;
    /** Portrait crop for tablet and mobile */
    mobile: ImageSource;
  };
};

export default function AboutIntro({ title, description, cta, stats, image }: AboutIntroProps) {
  // Art direction: a different crop per breakpoint, both optimised by next/image
  const {
    props: { srcSet: desktopSrcSet, sizes: desktopSizes },
  } = getImageProps({ ...image.desktop, alt: "", sizes: "50vw" });
  const {
    props: { alt, ...mobileImageProps },
  } = getImageProps({
    ...image.mobile,
    alt: image.alt,
    sizes: "45vw",
  });

  return (
    <section className={styles.section} aria-labelledby="about-intro-heading">
      <div className={styles.layout}>
        <div className={styles.media}>
          <picture>
            <source media="(min-width: 1024px)" srcSet={desktopSrcSet} sizes={desktopSizes} />
            <img {...mobileImageProps} alt={alt} className={styles.image} />
          </picture>
        </div>

        <div className={styles.text}>
          <h2 id="about-intro-heading" className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.cta}>
          <Button as="link" href={cta.href} withArrow>
            {cta.label}
          </Button>
        </div>

        <ul className={styles.stats}>
          {stats.map(({ value, label }) => (
            <li key={label} className={styles.stat}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
