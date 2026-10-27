"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { NAV_LINKS } from "@/config/navigation";
import { MOTION } from "@/lib/motion";
import styles from "./Header.module.css";

gsap.registerPlugin(useGSAP);

const DESKTOP = "(min-width: 1024px)";
const MENU = "(max-width: 1023px)";

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
  const headerRef = useRef<HTMLElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isMenuOpenRef = useRef(isMenuOpen);
  const hasIntroPlayedRef = useRef(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(headerRef);

      // Logo and actions drop in on every screen size
      mm.add(MOTION.allowed, () => {
        gsap.fromTo(
          q("[data-intro='header']"),
          { autoAlpha: 0, y: -12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: MOTION.duration.base,
            ease: MOTION.ease,
            stagger: 0.1,
            delay: 0.1,
            onComplete: () => {
              hasIntroPlayedRef.current = true;
            },
          },
        );
      });

      // Desktop links follow the logo in. If the intro already played on a
      // smaller screen, just show them.
      mm.add(`${DESKTOP} and ${MOTION.allowed}`, () => {
        const links = q("[data-intro='nav']");

        if (hasIntroPlayedRef.current) {
          gsap.set(links, { autoAlpha: 1 });
          return;
        }

        gsap.fromTo(
          links,
          { autoAlpha: 0, y: -12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: MOTION.duration.base,
            ease: MOTION.ease,
            stagger: 0.06,
            delay: 0.2,
          },
        );
      });

      // Tablet & mobile menu: panel unrolls downward, links slide in after it
      mm.add(`${MENU} and ${MOTION.allowed}`, () => {
        const tl = gsap
          .timeline({ paused: true, defaults: { ease: MOTION.ease } })
          .fromTo(
            q(`.${styles.nav}`),
            { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)" },
            { autoAlpha: 1, clipPath: "inset(0% 0% -15% 0%)", duration: 0.45 },
          )
          .fromTo(
            q("[data-intro='nav']"),
            { autoAlpha: 0, x: -16 },
            { autoAlpha: 1, x: 0, duration: MOTION.duration.fast, stagger: 0.05 },
            0.12,
          );

        // Keep the menu in sync when crossing the breakpoint while it's open
        if (isMenuOpenRef.current) tl.progress(1);
        menuTimelineRef.current = tl;

        return () => {
          menuTimelineRef.current = null;
        };
      });
    },
    { scope: headerRef },
  );

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
    const tl = menuTimelineRef.current;
    if (!tl) return;

    // Close a little faster than it opens so it feels responsive
    if (isMenuOpen) tl.timeScale(1).play();
    else tl.timeScale(1.6).reverse();
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${variant === "overlay" ? styles.overlay : ""}`}
    >
      <div className={styles.inner}>
        <Logo onClick={closeMenu} data-intro="header" />

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}
          aria-label="Primary"
        >
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} data-intro="nav">
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

        <div className={styles.actions} data-intro="header">
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
