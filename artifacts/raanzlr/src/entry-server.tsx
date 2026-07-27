/**
 * Server entry used only by the build-time prerenderer (scripts/prerender.mjs).
 *
 * It mounts the *real* application tree — same providers, same routes, same
 * components as the browser — under a StaticRouter, and renders it to an HTML
 * string. That is what makes every route ship a genuine <h1>, body copy,
 * internal links, per-page <title>/description/canonical/hreflang and JSON-LD
 * without a crawler having to execute JavaScript.
 *
 * Nothing here is bundled into the client build.
 */
import type { ReactElement } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import type { HelmetServerState } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { AppShell } from "./App";

// Re-exported so the prerenderer and the sitemap generator read the route list
// straight out of the SSR bundle instead of maintaining their own copy.
export { ROUTES, ROUTE_PATHS, LOCALES, localeUrl } from "./routes";
export type { RouteMeta, Locale } from "./routes";

// react-helmet-async infers this from `document`, but be explicit: on the
// server it must collect head tags into the context object instead of trying
// to mutate a DOM that does not exist.
(HelmetProvider as unknown as { canUseDOM: boolean }).canUseDOM = false;

export interface RenderResult {
  /** The rendered application markup, to be placed inside #root. */
  html: string;
  /** Serialized <head> fragments collected by react-helmet-async. */
  head: string;
  /** Attributes for the <html> element, e.g. `lang="ar" dir="rtl"`. */
  htmlAttributes: string;
}

/** Collect a react-dom pipeable stream into a single string. */
function streamToString(url: string, element: ReactElement): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let settled = false;

    const sink = new Writable({
      write(chunk, _enc, cb) {
        chunks.push(Buffer.from(chunk));
        cb();
      },
    });

    const { pipe, abort } = renderToPipeableStream(element, {
      onAllReady() {
        // Everything — including every React.lazy route chunk — has resolved.
        pipe(sink);
      },
      onShellError(error) {
        if (settled) return;
        settled = true;
        reject(new Error(`SSR shell failed for ${url}: ${String(error)}`));
      },
      onError(error) {
        // A render error means the page would ship broken/empty HTML. Fail the
        // build rather than silently publishing a blank page to crawlers.
        if (settled) return;
        settled = true;
        abort();
        reject(new Error(`SSR render failed for ${url}: ${String(error)}`));
      },
    });

    sink.on("finish", () => {
      if (settled) return;
      settled = true;
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    sink.on("error", (error) => {
      if (settled) return;
      settled = true;
      reject(error);
    });
  });
}

/**
 * Render one route.
 *
 * @param url Absolute path including the locale prefix, e.g. "/ar/faq".
 */
export async function render(url: string): Promise<RenderResult> {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const element = (
    <HelmetProvider context={helmetContext}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="raanzlr-theme"
        disableTransitionOnChange={false}
      >
        <StaticRouter location={url}>
          <AppShell />
        </StaticRouter>
      </ThemeProvider>
    </HelmetProvider>
  );

  const html = await streamToString(url, element);

  const helmet = helmetContext.helmet;
  if (!helmet) {
    throw new Error(`prerender: react-helmet-async produced no head data for ${url}`);
  }

  const head = [helmet.title, helmet.meta, helmet.link, helmet.script]
    .map((tag) => (tag ? tag.toString().trim() : ""))
    .filter(Boolean)
    .join("\n    ")
    // react-helmet-async stringifies JSX prop names verbatim, so `hrefLang`
    // reaches the HTML as-is. Attribute names are case-insensitive so it still
    // parses, but emit the spec spelling that SEO tooling greps for.
    .replace(/\shrefLang=/g, " hreflang=");

  return {
    html,
    head,
    htmlAttributes: helmet.htmlAttributes ? helmet.htmlAttributes.toString().trim() : "",
  };
}
