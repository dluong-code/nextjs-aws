import Image from "next/image";
import Button from "@/components/Button";
import styles from "./DualCta.module.css";

type Cta = {
  label: string;
  href: string;
};

type DualCtaProps = {
  /** Soft neutral panel, e.g. pointing questions to the contact page */
  enquiry: {
    eyebrow: string;
    title: string;
    cta: Cta;
  };
  /** Blush panel with a photo fading in from the right */
  booking: {
    eyebrow: string;
    title: string;
    description?: string;
    primaryCta: Cta;
    secondaryCta?: Cta;
    /** Decorative photo, e.g. a manicured hand */
    image: string;
  };
};

/**
 * Two calls to action side by side on wide screens, stacked on smaller ones.
 * Each panel switches between a row and a column layout from its own width
 * (container queries), so it stays balanced whether it's half or full width.
 */
export default function DualCta({ enquiry, booking }: DualCtaProps) {
  return (
    <section className={styles.section} aria-label="Get started">
      <div className={`${styles.panel} ${styles.enquiry}`}>
        <div className={styles.content} data-reveal>
          <div className={styles.text}>
            <p className={styles.eyebrow}>{enquiry.eyebrow}</p>
            <h2 className={styles.title}>{enquiry.title}</h2>
          </div>
          <div className={styles.actions}>
            <Button as="link" href={enquiry.cta.href} withArrow className={styles.button}>
              {enquiry.cta.label}
            </Button>
          </div>
        </div>
      </div>

      <div className={`${styles.panel} ${styles.booking}`}>
        <div className={styles.media} aria-hidden="true">
          <Image
            src={booking.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 20vw, 45vw"
            className={styles.image}
          />
        </div>
        <div className={styles.content} data-reveal>
          <div className={styles.text}>
            <p className={styles.eyebrow}>{booking.eyebrow}</p>
            <h2 className={styles.title}>{booking.title}</h2>
            {booking.description && <p className={styles.description}>{booking.description}</p>}
          </div>
          <div className={styles.actions}>
            <Button
              as="link"
              href={booking.primaryCta.href}
              withArrow
              className={styles.button}
            >
              {booking.primaryCta.label}
            </Button>
            {booking.secondaryCta && (
              <Button
                as="link"
                href={booking.secondaryCta.href}
                variant="outline"
                withArrow
                className={styles.button}
              >
                {booking.secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
