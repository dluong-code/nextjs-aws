import Link from "next/link";
import type { ComponentProps } from "react";
import styles from "./Logo.module.css";

type LogoProps = Omit<ComponentProps<typeof Link>, "href" | "children"> & {
  href?: ComponentProps<typeof Link>["href"];
  /** "light" for use on dark backgrounds */
  tone?: "dark" | "light";
};

export default function Logo({ href = "/", tone = "dark", className, ...props }: LogoProps) {
  return (
    <Link
      href={href}
      className={[styles.logo, styles[tone], className].filter(Boolean).join(" ")}
      {...props}
    >
      <span className={styles.monogram} aria-hidden="true">
        TL
      </span>
      <span className={styles.wordmark}>
        Nails
        <br />
        Academy
      </span>
    </Link>
  );
}
