/**
 * Single source of truth for every crawlable route on the site.
 *
 * Derived from the same data modules the pages render from, so a new service,
 * market, industry, case study or seed post is automatically prerendered *and*
 * automatically listed in the sitemap — the two can no longer drift apart.
 *
 * Paths are locale-less and carry no trailing slash. "/" means the home page.
 * The prerenderer emits `/en<path>` and `/ar<path>` for each entry.
 */
import { translations } from "./lib/translations";
import { MARKET_DETAILS } from "./data/markets";
import { INDUSTRY_DETAILS } from "./data/industriesData";
import { CASES } from "./data/cases";
import { POSTS } from "./data/posts";

/** A route plus the sitemap hints that go with it. */
export interface RouteMeta {
  path: string;
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
}

const slugs = (rows: ReadonlyArray<{ slug: string }>) => rows.map((r) => r.slug);

const serviceKeys: string[] = translations.en.services.items.map(
  (s: { key: string }) => s.key,
);

function section(
  base: string,
  children: string[],
  priority: number,
  childPriority: number,
): RouteMeta[] {
  return [
    { path: base, priority, changefreq: "weekly" },
    ...children.map((slug) => ({
      path: `${base}/${slug}`,
      priority: childPriority,
      changefreq: "monthly" as const,
    })),
  ];
}

export const ROUTES: RouteMeta[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  ...section("/services", serviceKeys, 0.9, 0.8),
  ...section("/industries", slugs(INDUSTRY_DETAILS), 0.8, 0.7),
  ...section("/markets", slugs(MARKET_DETAILS), 0.8, 0.7),
  ...section("/case-studies", slugs(CASES), 0.7, 0.6),
  ...section("/insights", slugs(POSTS), 0.8, 0.7),
  { path: "/about", priority: 0.7, changefreq: "monthly" },
  { path: "/contact", priority: 0.8, changefreq: "monthly" },
  { path: "/faq", priority: 0.7, changefreq: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changefreq: "yearly" },
];

/** Just the paths, for callers that do not care about sitemap hints. */
export const ROUTE_PATHS: string[] = ROUTES.map((r) => r.path);

export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

/** Absolute path for a locale + route, e.g. ("ar", "/faq") -> "/ar/faq". */
export function localeUrl(locale: Locale, path: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}
