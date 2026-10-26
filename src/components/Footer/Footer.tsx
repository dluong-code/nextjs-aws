import Link from "next/link";
import Button from "@/components/Button";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  TikTokIcon,
} from "@/components/icons";
import Logo from "@/components/Logo";
import { CONTACT, COURSE_LINKS, NAV_LINKS } from "@/config/navigation";
import styles from "./Footer.module.css";

const SOCIAL_ICONS = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  TikTok: TikTokIcon,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo tone="light" />
          <p className={styles.tagline}>
            Professional, hands-on nail education with the skills, confidence and support to build
            a successful career in nails.
          </p>
          <Button as="link" href="/courses" variant="light" size="sm" shape="pill" withArrow>
            Book a Course
          </Button>
        </div>

        <nav className={`${styles.column} ${styles.explore}`} aria-labelledby="footer-explore">
          <h2 id="footer-explore" className={styles.heading}>
            Explore
          </h2>
          <ul className={styles.links}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={styles.link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={`${styles.column} ${styles.courses}`} aria-labelledby="footer-courses">
          <h2 id="footer-courses" className={styles.heading}>
            Courses
          </h2>
          <ul className={styles.links}>
            {COURSE_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className={styles.link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`${styles.column} ${styles.contactColumn}`}>
          <h2 className={styles.heading}>Get in Touch</h2>
          <ul className={styles.contact}>
            <li>
              <MailIcon size={18} />
              <a href={`mailto:${CONTACT.email}`} className={styles.link}>
                {CONTACT.email}
              </a>
            </li>
            <li>
              <MapPinIcon size={18} />
              <span>{CONTACT.location}</span>
            </li>
          </ul>

          <ul className={styles.social} aria-label={`Follow ${CONTACT.socialHandle}`}>
            {CONTACT.social.map(({ label, href }) => {
              const Icon = SOCIAL_ICONS[label];
              return (
                <li key={label}>
                  <a
                    href={href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                  >
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          &copy; {year} TL Nails Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
