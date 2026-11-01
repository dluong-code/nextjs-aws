import type { ReactNode } from "react";
import styles from "./FeatureBar.module.css";

export type Feature = {
  id: string;
  icon: ReactNode;
  title: string;
  /** Shorter title shown on mobile; falls back to `title` */
  shortTitle?: string;
  description?: string;
};

type FeatureBarProps = {
  features: Feature[];
  label?: string;
  /**
   * "badge" (default): icons in filled circles, compact columns on mobile.
   * "plain": outline icons only, a list on mobile and four columns from tablet up.
   */
  variant?: "badge" | "plain";
};

export default function FeatureBar({
  features,
  label = "Why train with us",
  variant = "badge",
}: FeatureBarProps) {
  return (
    <section
      className={`${styles.featureBar} ${variant === "plain" ? styles.plain : ""}`}
      aria-label={label}
    >
      <ul className={styles.list}>
        {features.map(({ id, icon, title, shortTitle, description }) => (
          <li key={id} className={styles.item} data-reveal>
            <span className={styles.iconCircle}>{icon}</span>

            <div className={styles.text}>
              <h3 className={styles.title}>
                {shortTitle && shortTitle !== title ? (
                  <>
                    <span className={styles.titleFull}>{title}</span>
                    <span className={styles.titleShort}>{shortTitle}</span>
                  </>
                ) : (
                  title
                )}
              </h3>
              {description && <p className={styles.description}>{description}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
