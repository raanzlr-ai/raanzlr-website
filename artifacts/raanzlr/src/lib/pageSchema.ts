/**
 * Reusable JSON-LD fragments for page types that need more than the generic
 * WebPage node SEO.tsx emits.
 *
 * Hub pages previously declared only `WebPage`, which says nothing about what
 * the page collects. A `CollectionPage` carrying an `ItemList` of its children
 * states the relationship the navigation already implies.
 */

const SITE = "https://raanzlr.com";
export const ORG_ID = `${SITE}/#organization`;

/** Absolute URL for a locale-less path in the given locale. */
export function localeUrl(locale: "en" | "ar", path: string): string {
  return `${SITE}/${locale}${path === "/" ? "" : path}`;
}

export interface ListEntry {
  /** Display name in the current locale. */
  name: string;
  /** Locale-less path, e.g. "/services/ai-chatbots". */
  path: string;
}

/**
 * An ItemList of a hub's children, in the order the page renders them.
 *
 * `@id` is derived from the page URL so the node is addressable and does not
 * collide with the page node's own `#webpage` id.
 */
export function itemListSchema(
  locale: "en" | "ar",
  pagePath: string,
  entries: ListEntry[],
  listName: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${localeUrl(locale, pagePath)}#itemlist`,
    name: listName,
    numberOfItems: entries.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      url: localeUrl(locale, entry.path),
    })),
  };
}

/**
 * A `Service` node for a market page.
 *
 * Market pages carried no page-level `areaServed` at all — the only areaServed
 * on the page was the site-wide Organization list, identical across all ten
 * markets, so nothing in the markup said which country the page was about.
 *
 * `areaServed` takes the ISO 3166 code where one exists. Europe is a region
 * rather than a country, so it is expressed as a named Place instead of a bad
 * country code.
 */
export function marketServiceSchema(opts: {
  locale: "en" | "ar";
  path: string;
  serviceName: string;
  description: string;
  /** ISO 3166-1 alpha-2 code, or null for a multi-country region. */
  countryCode: string | null;
  /** Human-readable area name, used when countryCode is null. */
  areaName: string;
}) {
  const url = localeUrl(opts.locale, opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: opts.serviceName,
    serviceType: "AI automation and custom software development",
    description: opts.description,
    provider: { "@id": ORG_ID },
    areaServed: opts.countryCode
      ? { "@type": "Country", name: opts.areaName, identifier: opts.countryCode }
      : { "@type": "Place", name: opts.areaName },
    availableLanguage: ["ar", "en", "tr"],
    inLanguage: opts.locale,
    url,
  };
}

/**
 * A `FAQPage` node built from a page's visible Q&A.
 *
 * Market and industry pages render a `<details>` FAQ block but emitted no
 * FAQPage node, so answers already written and on the page were invisible to
 * answer engines. `ServiceDetail` and the `/faq` page already do this; this is
 * the same shape with a stable `@id` so the node is addressable and does not
 * collide with the page's own `#webpage` id.
 *
 * Only call this with Q&A that is actually rendered in the DOM.
 */
export function faqPageSchema(
  locale: "en" | "ar",
  pagePath: string,
  faqs: ReadonlyArray<{ q: string; a: string }>,
) {
  const url = localeUrl(locale, pagePath);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: locale,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * A `Service` node for an industry page.
 *
 * Mirrors `marketServiceSchema`, but an industry is not a place — `areaServed`
 * stays the organisation's full market list and `serviceType` names the
 * industry so the node says what the page is about. Industry pages previously
 * emitted no page-level schema at all.
 */
export function industryServiceSchema(opts: {
  locale: "en" | "ar";
  path: string;
  industryName: string;
  description: string;
}) {
  const url = localeUrl(opts.locale, opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: opts.industryName,
    serviceType: `AI automation and custom software for ${opts.industryName}`,
    description: opts.description,
    provider: { "@id": ORG_ID },
    areaServed: ["US", "CA", "SA", "AE", "QA", "KW", "BH", "OM", "SY", "TR", "EU"],
    availableLanguage: ["ar", "en", "tr"],
    inLanguage: opts.locale,
    url,
  };
}

/** ISO 3166-1 alpha-2 codes for the market slugs the site publishes. */
export const MARKET_COUNTRY_CODES: Record<string, string | null> = {
  "united-states": "US",
  canada: "CA",
  "saudi-arabia": "SA",
  uae: "AE",
  qatar: "QA",
  kuwait: "KW",
  bahrain: "BH",
  oman: "OM",
  syria: "SY",
  turkey: "TR",
  // Not a country — deliberately null so it renders as a Place, not a bad code.
  europe: null,
};
