import type { ReactNode } from "react";
import styles from "./WhyTrainWithUs.module.css";

export type Reason = {
  id: string;
  icon: ReactNode;
  title: string;
  description?: string;
};

type WhyTrainWithUsProps = {
  title: string;
  reasons: Reason[];
};

/**
 * Reasons to choose the academy. Desktop shows descriptions under each title;
 * tablet keeps icon and title in four columns; mobile lists them.
 */
export default function WhyTrainWithUs({ title, reasons }: WhyTrainWithUsProps) {
  return (
    <section className={styles.section} aria-labelledby="why-train-title">
      <div className={styles.inner}>
        <h2 id="why-train-title" className={styles.heading} data-reveal>
          {title}
        </h2>
        <ul className={styles.list}>
          {reasons.map(({ id, icon, title: reasonTitle, description }) => (
            <li key={id} className={styles.item} data-reveal>
              <div className={styles.head}>
                <span className={styles.icon}>{icon}</span>
                <h3 className={styles.title}>{reasonTitle}</h3>
              </div>
              {description && <p className={styles.description}>{description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
