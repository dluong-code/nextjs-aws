import Image from "next/image";
import Button from "@/components/Button";
import styles from "./CtaBanner.module.css";

type Cta = {
  label: string;
  href: string;
};

type CtaBannerProps = {
  eyebrow?: string;
  /** Use "\n" to force a line break */
  title: string;
  description?: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  image: {
    src: string;
    alt: string;
  };
};

/** Closing call-to-action band: copy on olive at the left, photo fading in from the right. */
export default function CtaBanner({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
}: CtaBannerProps) {
  return (
    <section className={styles.banner} aria-labelledby="cta-banner-heading">
      <div className={styles.media}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 56vw, (min-width: 600px) 70vw, 100vw"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        {eyebrow && (
          <p className={styles.eyebrow} data-reveal>
            {eyebrow}
          </p>
        )}
        <h2 id="cta-banner-heading" className={styles.title} data-reveal>
          {title}
        </h2>
        {description && (
          <p className={styles.description} data-reveal>
            {description}
          </p>
        )}

        <div className={styles.ctas} data-reveal>
          <Button as="link" href={primaryCta.href} variant="dark" shape="pill" withArrow>
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button as="link" href={secondaryCta.href} variant="outlineLight" shape="pill" withArrow>
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
