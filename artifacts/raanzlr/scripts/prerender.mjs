/**
 * Build-time prerender + sitemap generation.
 *
 * Runs after `vite build` (client) and `vite build --config vite.config.ssr.ts`
 * (server bundle). For every route x locale it renders the *real* React tree
 * with react-dom/server and writes a static HTML file containing:
 *
 *   - <html lang/dir> matching the locale (ar pages ship lang="ar" dir="rtl")
 *   - the page's own <title>, meta description and keywords
 *   - a self-referencing <link rel="canonical"> (never a site-wide /en/)
 *   - hreflang en / ar / x-default
 *   - all JSON-LD the page declares (FAQPage, Service, BlogPosting, Breadcrumb…)
 *   - the full rendered body: <h1>, copy, and internal links
 *
 * Crawlers therefore get complete HTML with zero JavaScript execution, and the
 * browser hydrates the same markup (see src/main.tsx).
 *
 * Output layout is directory-index style — dist/en/faq/index.html — which
 * Vercel serves at /en/faq under `"trailingSlash": false`.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const APP_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(APP_DIR, "dist");
const SSR_ENTRY = pathToFileURL(join(APP_DIR, "dist-ssr", "entry-server.mjs")).href;
const SITE = "https://raanzlr.com";

/** Markers the template must contain for the injection to be meaningful. */
const HTML_TAG_RE = /<html\b[^>]*>/;
const SEO_BLOCK_RE = /<!-- SEO:START[\s\S]*?<!-- SEO:END -->/;
const ROOT_RE = /<div id="root"><\/div>/;

/** `String.replace` interprets `$&`, `$1`… in replacements — this does not. */
const literal = (value) => () => value;

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function writeFile(relativePath, contents) {
  const target = join(DIST, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, contents, "utf8");
}

const absolute = (locale, path) => `${SITE}/${locale}${path === "/" ? "" : path}`;

// ---------------------------------------------------------------------------
// Sitemaps
// ---------------------------------------------------------------------------

function buildSitemap(locale, routes, lastmod, locales) {
  const urls = routes
    .map((route) => {
      const alternates = [...locales, "x-default"].map((alt) => {
        const href = absolute(alt === "x-default" ? "en" : alt, route.path);
        return `    <xhtml:link rel="alternate" hreflang="${alt}" href="${xmlEscape(href)}" />`;
      });
      return [
        "  <url>",
        `    <loc>${xmlEscape(absolute(locale, route.path))}</loc>`,
        ...alternates,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority.toFixed(1)}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

function buildSitemapIndex(lastmod) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE}/sitemap-en.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE}/sitemap-ar.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>
`;
}

// ---------------------------------------------------------------------------

async function main() {
  const { render, ROUTES, LOCALES, localeUrl } = await import(SSR_ENTRY);

  const template = readFileSync(join(DIST, "index.html"), "utf8");
  for (const [name, re] of [
    ["<html> tag", HTML_TAG_RE],
    ["SEO:START/SEO:END block", SEO_BLOCK_RE],
    ['<div id="root"></div>', ROOT_RE],
  ]) {
    if (!re.test(template)) {
      throw new Error(`prerender: ${name} not found in dist/index.html — aborting.`);
    }
  }

  const compose = (rendered) =>
    template
      .replace(HTML_TAG_RE, literal(`<html ${rendered.htmlAttributes}>`))
      .replace(SEO_BLOCK_RE, literal(rendered.head))
      .replace(ROOT_RE, literal(`<div id="root" data-ssr="true">${rendered.html}</div>`));

  const titles = new Map();
  let written = 0;

  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      const url = localeUrl(locale, route.path);
      const rendered = await render(url);

      // Fail the build rather than ship a page that would repeat the exact
      // problem this pipeline exists to fix.
      if (!/<h1[\s>]/.test(rendered.html)) {
        throw new Error(`prerender: ${url} rendered without an <h1> — aborting.`);
      }
      const canonical = rendered.head.match(/rel="canonical"\s+href="([^"]+)"/)?.[1];
      const expected = `${SITE}${url}`;
      if (canonical !== expected) {
        throw new Error(
          `prerender: ${url} has canonical "${canonical}", expected "${expected}" — aborting.`,
        );
      }
      const title = rendered.head.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? "";
      if (titles.has(title)) {
        throw new Error(
          `prerender: duplicate <title> "${title}" on ${url} and ${titles.get(title)} — aborting.`,
        );
      }
      titles.set(title, url);

      writeFile(join(locale, route.path === "/" ? "" : route.path, "index.html"), compose(rendered));
      written++;
    }
  }

  // Real 404 body. Vercel serves dist/404.html with an HTTP 404 status for any
  // path that matches no file and no rewrite — that is what kills the soft-404s.
  {
    const page = compose(await render("/404"));
    if (!/name="robots"[^>]*noindex/.test(page)) {
      throw new Error("prerender: 404 page is missing its noindex robots tag — aborting.");
    }
    writeFile("404.html", page);
    written++;
  }

  const lastmod = (process.env.SOURCE_DATE || new Date().toISOString()).slice(0, 10);
  for (const locale of LOCALES) {
    writeFile(`sitemap-${locale}.xml`, buildSitemap(locale, ROUTES, lastmod, LOCALES));
  }
  writeFile("sitemap.xml", buildSitemapIndex(lastmod));

  console.log(
    `prerender: ${written} HTML files (${ROUTES.length} routes x ${LOCALES.length} locales + 404) ` +
      `and 3 sitemaps written to dist/.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
