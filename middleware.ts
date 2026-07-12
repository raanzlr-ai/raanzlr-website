/**
 * Vercel Edge Middleware — Markdown for Agents (conservative, framework-agnostic).
 *
 * This is a static Vite SPA, NOT a Next.js app, so it uses the Web-standard
 * Request/Response API (no `next/server` import, which would fail to bundle).
 *
 * Behaviour: ONLY when an agent explicitly sends `Accept: text/markdown` for a
 * top-level HTML page (/, /en, /ar, /en/..., /ar/...) do we return the site's
 * llms.txt as `text/markdown`. Every other request — every browser (which sends
 * `Accept: text/html`), every asset, every dotfile/.well-known path, every file
 * with an extension — is passed straight through by returning `undefined`, so
 * the existing vercel.json rewrites and SPA routing are never altered.
 */

export const config = {
  // Skip assets, the .well-known tree, framework internals, and any file with an extension.
  matcher: ['/((?!\\.well-known|_next|_vercel|.*\\.[^/]+$).*)'],
};

const LLMS_TXT_URL = 'https://raanzlr.com/llms.txt';

function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  return /(^|,)\s*text\/markdown(\s*;|\s*,|\s*$)/i.test(accept);
}

function isPagePath(pathname: string): boolean {
  return (
    pathname === '/' ||
    pathname === '/en' ||
    pathname === '/ar' ||
    pathname.startsWith('/en/') ||
    pathname.startsWith('/ar/')
  );
}

export default async function middleware(request: Request): Promise<Response | undefined> {
  const url = new URL(request.url);
  const method = request.method.toUpperCase();

  if (
    (method === 'GET' || method === 'HEAD') &&
    wantsMarkdown(request.headers.get('accept')) &&
    isPagePath(url.pathname)
  ) {
    try {
      const res = await fetch(LLMS_TXT_URL, { headers: { accept: 'text/plain' } });
      if (res.ok) {
        const body = await res.text();
        return new Response(body, {
          status: 200,
          headers: {
            'content-type': 'text/markdown; charset=utf-8',
            'x-markdown-source': 'llms.txt',
            'cache-control': 'public, max-age=300',
          },
        });
      }
    } catch {
      // On any failure, fall through to normal routing — never break the site.
    }
  }

  // Default: pass through untouched.
  return undefined;
}
