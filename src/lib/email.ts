type Email = {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

/**
 * Sends an email through Resend's REST API. Server-only: it reads the secret
 * API key, so never import this from a client component.
 *
 * Without RESEND_API_KEY in development the email is printed to the terminal
 * instead, so the form can be tried locally before Resend is set up.
 */
export async function sendEmail({ to, from, replyTo, subject, text, html }: Email) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("RESEND_API_KEY is not set");
    }
    console.info(`[email] RESEND_API_KEY not set, so not sending:\nSubject: ${subject}\n${text}`);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, text, html }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
