"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { NAV_LINKS } from "@/config/navigation";
import styles from "./Header.module.css";

type HeaderProps = {
  /**
   * "overlay" floats over the hero on desktop (homepage);
   * "solid" sits in the normal flow above the page content.
   */
  variant?: "solid" | "overlay";
};

export default function Header({ variant = "solid" }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`${styles.header} ${variant === "overlay" ? styles.overlay : ""}`}>
      <div className={styles.inner}>
        <Logo onClick={closeMenu} />

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}
          aria-label="Primary"
        >
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={styles.navLink}
                  aria-current={pathname === href ? "page" : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button as="link" href="/courses" shape="pill" size="sm" withArrow className={styles.cta} onClick={closeMenu}>
            Book a Course
          </Button>

          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className={styles.menuIcon} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
