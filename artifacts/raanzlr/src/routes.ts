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
import { PER_PAGE } from "./lib/insightsPaging";

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

/**
 * Build the route list.
 *
 * @param postSlugs Live article slugs read from Supabase at build time. The
 *   static seed in src/data/posts.ts carries only a handful of articles, so
 *   deriving article routes from it left everything published since then out of
 *   both the prerender and the sitemap — invisible to search engines. Falls
 *   back to the seed when Supabase is unreachable.
 */
export function makeRoutes(postSlugs?: string[]): RouteMeta[] {
  const articles = postSlugs?.length ? postSlugs : slugs(POSTS);

  /**
   * Archive pages 2..N.
   *
   * One post is rendered as the hero above the grid, so the grid paginates
   * `articles.length - 1` posts. Without these routes, pages 2+ existed only as
   * React state and every article past the first ten was linked from nowhere.
   */
  const archivePages = Math.max(1, Math.ceil(Math.max(0, articles.length - 1) / PER_PAGE));
  const insightsPages: RouteMeta[] = Array.from(
    { length: archivePages - 1 },
    (_, i) => ({
      path: `/insights/page/${i + 2}`,
      priority: 0.5,
      changefreq: "weekly" as const,
    }),
  );

  return [
    { path: "/", priority: 1.0, changefreq: "weekly" },
    ...section("/services", serviceKeys, 0.9, 0.8),
    ...section("/industries", slugs(INDUSTRY_DETAILS), 0.8, 0.7),
    ...section("/markets", slugs(MARKET_DETAILS), 0.8, 0.7),
    ...section("/case-studies", slugs(CASES), 0.7, 0.6),
    ...section("/insights", articles, 0.8, 0.7),
    ...insightsPages,
    { path: "/about", priority: 0.7, changefreq: "monthly" },
    { path: "/contact", priority: 0.8, changefreq: "monthly" },
    { path: "/faq", priority: 0.7, changefreq: "monthly" },
    { path: "/privacy-policy", priority: 0.3, changefreq: "yearly" },
    { path: "/terms-of-service", priority: 0.3, changefreq: "yearly" },
  ];
}

/** Default route list, built from the static seed. */
export const ROUTES: RouteMeta[] = makeRoutes();

/** Just the paths, for callers that do not care about sitemap hints. */
export const ROUTE_PATHS: string[] = ROUTES.map((r) => r.path);

export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

/** Absolute path for a locale + route, e.g. ("ar", "/faq") -> "/ar/faq". */
export function localeUrl(locale: Locale, path: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}
