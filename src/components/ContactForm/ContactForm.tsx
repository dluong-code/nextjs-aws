"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Script from "next/script";
import {
  type ChangeEvent,
  type ComponentType,
  type FormEvent,
  type ReactNode,
  startTransition,
  useActionState,
  useRef,
  useState,
} from "react";
import { submitContact } from "@/app/(site)/contact/actions";
import Button from "@/components/Button";
import { type IconProps, MailIcon, PhoneIcon, UserIcon } from "@/components/icons";
import {
  type ContactField,
  type ContactFieldErrors,
  type ContactState,
  RECAPTCHA_ACTION,
  readContactValues,
  validateContact,
} from "@/lib/contact";
import { MOTION } from "@/lib/motion";
import styles from "./ContactForm.module.css";

gsap.registerPlugin(useGSAP);

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const FIELDS: {
  name: ContactField;
  label: string;
  type: string;
  autoComplete: string;
  inputMode?: "email" | "tel";
  icon: ComponentType<IconProps>;
}[] = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name", icon: UserIcon },
  {
    name: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
    inputMode: "email",
    icon: MailIcon,
  },
  {
    name: "mobile",
    label: "Mobile number",
    type: "tel",
    autoComplete: "tel",
    inputMode: "tel",
    icon: PhoneIcon,
  },
];

/** Asks reCAPTCHA v3 for a token. Resolves empty when no site key is set (local development). */
function getRecaptchaToken() {
  if (!RECAPTCHA_SITE_KEY) return Promise.resolve("");

  return new Promise<string>((resolve, reject) => {
    const recaptcha = window.grecaptcha;
    if (!recaptcha) {
      reject(new Error("reCAPTCHA hasn't loaded"));
      return;
    }
    recaptcha.ready(() => {
      recaptcha.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION }).then(resolve, reject);
    });
  });
}

async function submitWithRecaptcha(previousState: ContactState, formData: FormData) {
  try {
    formData.set("recaptchaToken", await getRecaptchaToken());
  } catch {
    return {
      status: "error",
      message:
        "Our spam check couldn't load. Please check your connection or turn off any ad blocker for this site, then try again.",
    } satisfies ContactState;
  }

  return submitContact(previousState, formData);
}

type ContactFormProps = {
  /** Heading shown above the fields; hidden along with the form once it's sent */
  intro?: ReactNode;
};

/** Contact form with an invisible reCAPTCHA v3 check. Swaps to a thank-you message once sent. */
export default function ContactForm({ intro }: ContactFormProps) {
  // Changing the key remounts the form empty for "send another"
  const [formKey, setFormKey] = useState(0);

  return (
    <>
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}
      <ContactFormBody key={formKey} intro={intro} onReset={() => setFormKey((key) => key + 1)} />
    </>
  );
}

function ContactFormBody({ intro, onReset }: ContactFormProps & { onReset: () => void }) {
  const [state, formAction, isPending] = useActionState(submitWithRecaptcha, { status: "idle" });
  // Errors found in the browser; null means "show whatever the server said"
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors | null>(null);

  const errors = clientErrors ?? (state.status === "error" ? state.fieldErrors : undefined) ?? {};
  const message = state.status === "error" ? state.message : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const found = validateContact(readContactValues(formData));
    const firstInvalid = FIELDS.find(({ name }) => found[name]);

    if (firstInvalid) {
      setClientErrors(found);
      (event.currentTarget.elements.namedItem(firstInvalid.name) as HTMLInputElement | null)?.focus();
      return;
    }

    setClientErrors(null);
    startTransition(() => formAction(formData));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const field = event.target.name as ContactField;
    if (errors[field]) setClientErrors({ ...errors, [field]: undefined });
  }

  if (state.status === "success") {
    return <ContactSuccess firstName={state.firstName} onReset={onReset} />;
  }

  return (
    <>
      {intro}
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {FIELDS.map(({ name, label, type, autoComplete, inputMode, icon: Icon }) => {
          const error = errors[name];
          const errorId = `contact-${name}-error`;
  
          return (
            <div key={name} className={styles.row}>
              <div className={`${styles.field} ${error ? styles.invalid : ""}`}>
                <Icon size={20} className={styles.icon} />
                <input
                  id={`contact-${name}`}
                  name={name}
                  type={type}
                  autoComplete={autoComplete}
                  inputMode={inputMode}
                  // A blank placeholder lets CSS float the label once there's text
                  placeholder=" "
                  required
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  onChange={handleChange}
                  className={styles.input}
                />
                <label htmlFor={`contact-${name}`} className={styles.label}>
                  {label}
                </label>
                <span className={styles.line} aria-hidden="true" />
              </div>
              {error && (
                <p id={errorId} className={styles.error}>
                  {error}
                </p>
              )}
            </div>
          );
        })}
  
        {/* Honeypot: hidden from people and screen readers, tempting to bots */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
  
        <div className={styles.footer}>
          <Button
            type="submit"
            shape="pill"
            size="lg"
            withArrow={!isPending}
            disabled={isPending}
            aria-busy={isPending || undefined}
            className={styles.submit}
          >
            {isPending ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Sending…
              </>
            ) : (
              "Send my details"
            )}
          </Button>
  
          <p className={styles.status} role="alert">
            {message}
          </p>
  
          <p className={styles.legal}>
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </form>
    </>
  );
}

const CONFETTI = ["var(--color-rose)", "var(--color-copper)", "var(--color-moss)", "var(--color-blush-line)"];

function ContactSuccess({ firstName, onReset }: { firstName: string; onReset: () => void }) {
  const successRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      successRef.current?.focus();

      const mm = gsap.matchMedia();
      mm.add(MOTION.allowed, () => {
        const q = gsap.utils.selector(successRef);

        gsap
          .timeline({ defaults: { ease: MOTION.ease } })
          .from(q("[data-success='badge']"), { scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "back.out(1.8)" })
          .from(q("[data-success='ring']"), { strokeDashoffset: 152, duration: 0.7 }, 0.1)
          .from(q("[data-success='tick']"), { strokeDashoffset: 30, duration: 0.45 }, 0.55)
          .fromTo(
            q("[data-success='dot']"),
            { x: 0, y: 0, scale: 0, autoAlpha: 1 },
            {
              x: (i) => Math.cos((i / 8) * Math.PI * 2) * 64,
              y: (i) => Math.sin((i / 8) * Math.PI * 2) * 64,
              scale: 1,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power2.out",
            },
            0.5,
          )
          .from(
            q("[data-success='copy']"),
            { y: 16, autoAlpha: 0, duration: MOTION.duration.base, stagger: MOTION.stagger },
            0.6,
          );
      });
    },
    { scope: successRef },
  );

  return (
    <div ref={successRef} className={styles.success} tabIndex={-1} role="status">
      <div className={styles.badge} data-success="badge">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className={styles.dot}
            style={{ backgroundColor: CONFETTI[i % CONFETTI.length] }}
            data-success="dot"
            aria-hidden="true"
          />
        ))}
        <svg viewBox="0 0 56 56" width="72" height="72" aria-hidden="true">
          <circle
            data-success="ring"
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="152"
          />
          <path
            data-success="tick"
            d="m18 29 7 7 13-15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="30"
          />
        </svg>
      </div>

      <h3 className={styles.successTitle} data-success="copy">
        Thank you{firstName ? `, ${firstName}` : ""}!
      </h3>
      <p className={styles.successCopy} data-success="copy">
        Your details are on their way to us. A member of our team will be in touch within 1–2
        working days.
      </p>
      <div className={styles.successActions} data-success="copy">
        <Button as="link" href="/courses" shape="pill" withArrow>
          Explore Courses
        </Button>
        <button type="button" className={styles.again} onClick={onReset}>
          Send another enquiry
        </button>
      </div>
    </div>
  );
}
