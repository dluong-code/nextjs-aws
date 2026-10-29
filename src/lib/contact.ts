/**
 * Contact form rules shared by the browser (instant feedback) and the server
 * action (the check that actually counts).
 */
export type ContactField = "name" | "email" | "mobile";

export type ContactValues = Record<ContactField, string>;

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "error"; message?: string; fieldErrors?: ContactFieldErrors }
  | { status: "success"; firstName: string };

/** reCAPTCHA v3 action name; the server rejects tokens issued for any other action */
export const RECAPTCHA_ACTION = "contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Optional leading +, then 7–15 digits once spaces, dashes, dots and brackets are removed */
const MOBILE_PATTERN = /^\+?\d{7,15}$/;

export function validateContact({ name, email, mobile }: ContactValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > 80) errors.name = "Please keep your name under 80 characters.";

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address, like name@example.com.";
  }

  if (!mobile) errors.mobile = "Please enter your mobile number.";
  else if (!MOBILE_PATTERN.test(mobile.replace(/[\s().-]/g, ""))) {
    errors.mobile = "Please enter a valid mobile number, like 07123 456789.";
  }

  return errors;
}

export function readContactValues(formData: FormData): ContactValues {
  const read = (key: ContactField) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };

  return { name: read("name"), email: read("email"), mobile: read("mobile") };
}

export function getFirstName(name: string) {
  return name.split(/\s+/)[0] ?? "";
}
