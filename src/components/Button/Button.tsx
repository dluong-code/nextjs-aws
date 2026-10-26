import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import styles from "./Button.module.css";

type CommonProps = {
  /** "light" is for dark backgrounds */
  variant?: "primary" | "secondary" | "light";
  size?: "sm" | "md" | "lg";
  shape?: "rounded" | "pill";
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

type NativeButtonProps = CommonProps & {
  as?: "button";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

type LinkButtonProps = CommonProps & {
  as: "link";
} & Omit<ComponentProps<typeof Link>, keyof CommonProps>;

export type ButtonProps = NativeButtonProps | LinkButtonProps;

function getClassName({
  variant = "primary",
  size = "md",
  shape = "rounded",
  className,
}: Pick<CommonProps, "variant" | "size" | "shape" | "className">) {
  return [styles.button, styles[variant], styles[size], styles[shape], className]
    .filter(Boolean)
    .join(" ");
}

function ArrowIcon() {
  return (
    <svg
      className={styles.arrow}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Renders a native <button> by default, or a Next.js <Link> styled
 * identically when `as="link"` is passed.
 */
export default function Button({
  as = "button",
  variant,
  size,
  shape,
  withArrow = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = getClassName({ variant, size, shape, className });
  const content = (
    <>
      {children}
      {withArrow && <ArrowIcon />}
    </>
  );

  if (as === "link") {
    const linkProps = rest as Omit<LinkButtonProps, keyof CommonProps | "as">;

    return (
      <Link className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as Omit<
    NativeButtonProps,
    keyof CommonProps | "as"
  >;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
