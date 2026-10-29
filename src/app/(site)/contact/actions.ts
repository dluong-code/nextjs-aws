"use server";

import {
  type ContactState,
  type ContactValues,
  getFirstName,
  RECAPTCHA_ACTION,
  readContactValues,
  validateContact,
} from "@/lib/contact";
import { escapeHtml, sendEmail } from "@/lib/email";

/** reCAPTCHA v3 scores run from 0 (bot) to 1 (human); Google suggests 0.5 as a starting point */
const MIN_RECAPTCHA_SCORE = 0.5;

const DEFAULT_FROM = "TL Nails Academy <onboarding@resend.dev>";

type SiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

async function isHuman(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] RECAPTCHA_SECRET_KEY is not set; rejecting submission");
      return false;
    }
    console.warn("[contact] RECAPTCHA_SECRET_KEY not set, skipping the bot check in development");
    return true;
  }

  if (!token) return false;

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store",
    });
    if (!response.ok) return false;

    const result = (await response.json()) as SiteVerifyResponse;
    if (!result.success) {
      console.warn("[contact] reCAPTCHA rejected the token", result["error-codes"]);
      return false;
    }

    return result.action === RECAPTCHA_ACTION && (result.score ?? 0) >= MIN_RECAPTCHA_SCORE;
  } catch (error) {
    console.error("[contact] reCAPTCHA verification failed", error);
    return false;
  }
}

function buildEmail({ name, email, mobile }: ContactValues) {
  const rows = [
    ["Full name", name],
    ["Email", email],
    ["Mobile", mobile],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <h2 style="font-family:Georgia,serif;font-weight:400;color:#1d1d18">New enquiry from the website</h2>
    <table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px;color:#1d1d18">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="color:#4a4a42">${label}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:13px;color:#4a4a42">Reply to this email to respond to ${escapeHtml(name)} directly.</p>
  `;

  return { text, html };
}

/**
 * Handles the contact form. The recipient address lives only in the server's
 * environment (CONTACT_TO_EMAIL), so it never reaches the page or the browser.
 */
export async function submitContact(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = readContactValues(formData);

  // Hidden honeypot field: people never see it, simple bots fill it in.
  // Pretend it worked so the bot has no reason to try again.
  if (formData.get("website")) {
    return { status: "success", firstName: getFirstName(values.name) };
  }

  const fieldErrors = validateContact(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  const token = formData.get("recaptchaToken");
  if (!(await isHuman(typeof token === "string" ? token : ""))) {
    return {
      status: "error",
      message: "We couldn't confirm you're not a robot. Please refresh the page and try again.",
    };
  }

  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    console.error("[contact] CONTACT_TO_EMAIL is not set");
    return {
      status: "error",
      message: "Sorry, we can't take enquiries online right now. Please try again later.",
    };
  }

  try {
    await sendEmail({
      to,
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
      replyTo: values.email,
      // Strip line breaks so a name can't spill into other email headers
      subject: `New enquiry from ${values.name.replace(/[\r\n]+/g, " ")}`,
      ...buildEmail(values),
    });
  } catch (error) {
    console.error("[contact] Failed to send enquiry email", error);
    return {
      status: "error",
      message: "Sorry, something went wrong sending your details. Please try again in a moment.",
    };
  }

  return { status: "success", firstName: getFirstName(values.name) };
}
