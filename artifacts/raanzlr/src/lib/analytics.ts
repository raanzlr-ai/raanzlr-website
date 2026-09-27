/**
 * Analytics event layer.
 *
 * All conversion signals funnel through `trackEvent`, which forwards to GA4
 * (gtag) and to PostHog when either is present. `index.html` configures gtag
 * with `send_page_view:false`; App.tsx fires `page_view` on every route change.
 *
 * PRIVACY RULE — read before adding a parameter.
 * Never pass personally identifiable data to an analytics destination: no name,
 * email address, phone number, company name, or free-text message body. Only
 * the shape of the interaction (which form, which CTA, which page, which
 * locale) may be sent. `sanitizeParams` below drops known-PII keys as a
 * backstop, but the call site is the real guard.
 */

/** Parameter keys that must never reach an analytics destination. */
const PII_KEYS = new Set([
  "name",
  "full_name",
  "fullname",
  "email",
  "phone",
  "phone_code",
  "message",
  "challenge",
  "subject",
  "company",
  "company_name",
  "user_id",
  "address",
]);

/** Strip PII keys and undefined/null values before dispatch. */
function sanitizeParams(properties: Record<string, unknown>): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(properties)) {
    if (PII_KEYS.has(key.toLowerCase())) continue;
    if (value === undefined || value === null || value === "") continue;
    clean[key] = value;
  }
  return clean;
}

export const trackEvent = (name: string, properties: Record<string, unknown> = {}) => {
  try {
    if (typeof window === "undefined") return;
    const params = sanitizeParams(properties);

    if ((window as any).posthog?.capture) {
      (window as any).posthog.capture(name, params);
    }
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", name, params);
    }
  } catch (_) {
    /* analytics must never break the page */
  }
};

export const EVENTS = {
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  SERVICE_FORM_SUBMIT: "service_form_submit",
  CTA_CLICK: "cta_click",
  EMAIL_CLICK: "email_click",
  WHATSAPP_CLICK: "whatsapp_click",
  OUTBOUND_SOCIAL_CLICK: "outbound_social_click",
  NEWSLETTER_SUBSCRIBE: "newsletter_subscribe",
  /** Retained for backwards compatibility; prefer CTA_CLICK with cta_location. */
  BOOK_CONSULTATION_CLICK: "book_consultation_click",
} as const;

/**
 * First-touch campaign attribution.
 *
 * The first `utm_*` values seen in a browser session are kept in sessionStorage
 * and attached to every event as `first_utm_source` / `first_utm_medium` /
 * `first_utm_campaign`, so a form submit can be tied back to the campaign that
 * brought the visit. Campaign labels only, never personal data. Register the
 * three keys as event-scoped custom dimensions in GA4 Admin to report on them.
 */
const FIRST_TOUCH_KEY = "rz_first_touch";
const FIRST_TOUCH_FIELDS = ["source", "medium", "campaign"] as const;

function captureFirstTouch(): void {
  try {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(FIRST_TOUCH_KEY)) return;
    const q = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const f of FIRST_TOUCH_FIELDS) {
      const v = q.get(`utm_${f}`);
      if (v) found[`first_utm_${f}`] = v.slice(0, 100);
    }
    if (Object.keys(found).length) {
      window.sessionStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(found));
    }
  } catch (_) {
    /* storage can be blocked; attribution is optional */
  }
}

function readFirstTouch(): Record<string, string> {
  try {
    if (typeof window === "undefined") return {};
    captureFirstTouch();
    const raw = window.sessionStorage.getItem(FIRST_TOUCH_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch (_) {
    return {};
  }
}

captureFirstTouch();

/**
 * Page-scoped context every event carries, resolved from the live document so
 * callers never have to thread `useLocation` through a button component.
 */
export function pageContext(locale?: string): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  const firstTouch = readFirstTouch();
  const path = window.location.pathname + window.location.search;
  const resolvedLocale =
    locale ?? (/^\/ar(\/|$)/.test(window.location.pathname) ? "ar" : "en");
  return {
    page_path: path,
    page_location: window.location.href,
    locale: resolvedLocale,
    ...firstTouch,
  };
}

/**
 * WhatsApp deep link.
 *
 * REQUIRES CONFIRMATION — there is no confirmed Raanzlr WhatsApp business
 * number. `WHATSAPP_NUMBER` below is intentionally empty: with no number the
 * helper returns a wa.me link with no recipient, which is not a usable contact
 * route, so `WHATSAPP_ENABLED` stays false and no WhatsApp CTA is rendered.
 *
 * To enable: set VITE_WHATSAPP_NUMBER to the confirmed number in international
 * format, digits only (e.g. 9665XXXXXXXX). Do not hardcode a guess here.
 */
export const WHATSAPP_NUMBER = (
  (import.meta.env.VITE_WHATSAPP_NUMBER as string) || ""
).replace(/[^0-9]/g, "");

/** True only when a real WhatsApp number has been configured. */
export const WHATSAPP_ENABLED = WHATSAPP_NUMBER.length > 0;

export const buildWhatsAppUrl = (message?: string, phone?: string) => {
  const number = (phone || WHATSAPP_NUMBER || "").replace(/[^0-9]/g, "");
  const text = encodeURIComponent(
    message || "Hello Raanzlr, I want to explore automation opportunities for my company."
  );
  if (!number) return `https://wa.me/?text=${text}`;
  return `https://wa.me/${number}?text=${text}`;
};

// ---------------------------------------------------------------------------
// Named helpers — one per conversion signal, so call sites stay readable and
// the parameter contract lives in exactly one place.
// ---------------------------------------------------------------------------

/** A primary call-to-action was clicked. */
export const trackCta = (ctaText: string, ctaLocation: string, locale?: string) =>
  trackEvent(EVENTS.CTA_CLICK, {
    cta_text: ctaText,
    cta_location: ctaLocation,
    ...pageContext(locale),
  });

/** A mailto: link was clicked. */
export const trackEmailClick = (ctaLocation: string, locale?: string) =>
  trackEvent(EVENTS.EMAIL_CLICK, {
    cta_location: ctaLocation,
    ...pageContext(locale),
  });

/** A WhatsApp deep link was clicked. */
export const trackWhatsAppClick = (ctaLocation: string, locale?: string) =>
  trackEvent(EVENTS.WHATSAPP_CLICK, {
    cta_location: ctaLocation,
    ...pageContext(locale),
  });

/** An outbound link to a social profile was clicked. */
export const trackSocialClick = (platform: string, locale?: string) =>
  trackEvent(EVENTS.OUTBOUND_SOCIAL_CLICK, {
    platform,
    ...pageContext(locale),
  });

/** The general contact form was submitted successfully. No field values. */
export const trackContactSubmit = (sourcePage: string, locale?: string) =>
  trackEvent(EVENTS.CONTACT_FORM_SUBMIT, {
    form_name: "contact_general",
    source_page: sourcePage,
    ...pageContext(locale),
  });

/** The service brief form was submitted successfully. Service name only. */
export const trackServiceSubmit = (service: string, sourcePage: string, locale?: string) =>
  trackEvent(EVENTS.SERVICE_FORM_SUBMIT, {
    form_name: "contact_service",
    service,
    source_page: sourcePage,
    ...pageContext(locale),
  });

/** A newsletter subscription completed. Email address is never sent. */
export const trackNewsletterSubscribe = (ctaLocation: string, locale?: string) =>
  trackEvent(EVENTS.NEWSLETTER_SUBSCRIBE, {
    cta_location: ctaLocation,
    ...pageContext(locale),
  });
