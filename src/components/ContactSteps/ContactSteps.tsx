import Link from "next/link";
import styles from "./ContactSteps.module.css";

const STEPS = [
  {
    title: "Send your details",
    copy: "Pop your name, email and mobile into the form. It only takes a minute.",
  },
  {
    title: "We'll be in touch",
    copy: "A friendly member of our team will contact you within 1–2 working days.",
  },
  {
    title: "Find your perfect course",
    copy: "We'll chat through your goals and help you choose the training that suits you.",
  },
];

/** "What happens next" strip under the contact form. */
export default function ContactSteps() {
  return (
    <section className={styles.section} aria-labelledby="contact-steps-title">
      <div className={styles.inner}>
        <header className={styles.header} data-reveal>
          <p className={styles.eyebrow}>What happens next</p>
          <h2 id="contact-steps-title" className={styles.title}>
            Three easy steps to your new skill
          </h2>
        </header>

        <ol className={styles.steps}>
          {STEPS.map(({ title, copy }, index) => (
            <li key={title} className={styles.step} data-reveal>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepCopy}>{copy}</p>
            </li>
          ))}
        </ol>

        <p className={styles.faq} data-reveal>
          Got a quick question?{" "}
          <Link href="/faqs" className={styles.faqLink}>
            Browse our FAQs
          </Link>
        </p>
      </div>
    </section>
  );
}
