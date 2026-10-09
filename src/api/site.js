import api from "./apiService";

/*
 * The public website endpoints (`/public/...` on the API).
 *
 * Anonymous and rate limited server side. Every form here also sends an empty
 * `website` field: it is a honeypot, invisible to people, which bots fill in.
 * The API accepts such a submission and silently drops it, so keep it empty.
 */

/** The topics a visitor can pick, matching the API's support categories. */
export const CONTACT_CATEGORIES = [
  { value: "booking", label: "Réservation ou location" },
  { value: "pass", label: "Mova Pass" },
  { value: "payment", label: "Paiement" },
  { value: "account", label: "Mon compte" },
  { value: "other", label: "Autre demande" },
];

/**
 * Sends the contact form. It lands in the back office as a support ticket,
 * and the answer comes back by e-mail. Resolves to the ticket reference.
 */
export async function sendContact({ name, email, phone, category, subject, message, website = "" }) {
  const res = await api.post("/public/contact", {
    name,
    email,
    phone: phone || null,
    category: category || "other",
    subject,
    message,
    website,
  });
  return res.data?.data?.reference ?? null;
}

/**
 * Starts a newsletter sign-up. Nothing is subscribed yet: the API e-mails a
 * confirmation link (double opt-in). Resolves to the message to show.
 */
export async function subscribeNewsletter({ email, name, website = "" }) {
  const res = await api.post("/public/newsletter", { email, name: name || null, website });
  return res.data?.message;
}

/** Confirms a sign-up from the e-mailed link. */
export async function confirmNewsletter(token) {
  const res = await api.post("/public/newsletter/confirm", { token });
  return res.data?.message;
}

/** Unsubscribes from the link at the bottom of every e-mail. */
export async function unsubscribeNewsletter(token) {
  const res = await api.post("/public/newsletter/unsubscribe", { token });
  return res.data?.message;
}

/**
 * A readable message from a failed call: the first validation error when
 * there is one, the rate limit in plain words, otherwise the API's message.
 */
export function errorMessage(err) {
  if (err?.status === 429) {
    return "Trop de tentatives. Merci de réessayer dans quelques minutes.";
  }
  const errors = err?.payload?.errors;
  if (errors && typeof errors === "object") {
    const first = Object.values(errors).flat()[0];
    if (first) return first;
  }
  if (err?.status >= 500 || !err?.status) {
    return "Le service est momentanément indisponible. Réessayez plus tard ou écrivez-nous à contact@mova-mobility.com.";
  }
  return err.message || "Une erreur est survenue.";
}
