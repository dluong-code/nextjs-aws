import Image from "next/image";
import Button from "@/components/Button";
import styles from "./HelpBanner.module.css";

type HelpBannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  cta: {
    label: string;
    href: string;
  };
  /** Decorative product photo shown on the left from tablet up */
  image: string;
};

/** Soft blush banner nudging undecided visitors towards a conversation. */
export default function HelpBanner({ eyebrow, title, description, cta, image }: HelpBannerProps) {
  return (
    <section className={styles.banner} aria-labelledby="help-banner-title">
      <div className={styles.media} aria-hidden="true">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 40vw, 38vw"
          className={styles.image}
        />
      </div>

      {/* Fine botanical line drawing on the right, like pressed flowers on card stock */}
      <svg className={styles.sprig} viewBox="0 0 160 220" aria-hidden="true" focusable="false">
        <path d="M30 210C60 160 90 110 140 20" />
        <path d="M58 160c-18-6-30-20-32-40 18 4 30 18 32 40Z" />
        <path d="M72 134c18-2 32-12 38-30-18 0-32 12-38 30Z" />
        <path d="M86 108c-16-8-24-22-22-40 16 6 24 20 22 40Z" />
        <path d="M102 80c16-4 28-16 30-32-16 2-28 14-30 32Z" />
        <path d="M118 52c-12-8-18-20-14-34 12 6 18 18 14 34Z" />
        <path d="M44 186c16 0 30-8 36-24-16 0-30 8-36 24Z" />
      </svg>

      <div className={styles.content} data-reveal>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 id="help-banner-title" className={styles.title}>
          {title}
        </h2>
        {description && <p className={styles.description}>{description}</p>}
        <Button as="link" href={cta.href} withArrow className={styles.cta}>
          {cta.label}
        </Button>
      </div>
    </section>
  );
}
