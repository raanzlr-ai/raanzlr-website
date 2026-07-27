/**
 * Locale-aware drop-in replacements for react-router's `Link` and `Navigate`.
 *
 * Pages write plain paths — `to="/services"` — and these resolve them against
 * the current locale, so an Arabic page links to /ar/services rather than to
 * /services, which would 308 the visitor (and the crawler) onto the English
 * page. Import these instead of the react-router originals wherever a page
 * links to another page.
 *
 * `localizedPath` passes external URLs (http:, mailto:, tel:, #…) through
 * untouched and is idempotent, so an already-prefixed path stays as-is.
 */
import { Link as RouterLink, Navigate as RouterNavigate } from "react-router-dom";
import type { LinkProps, NavigateProps } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";

export function Link({ to, ...rest }: LinkProps) {
  const { localizedPath } = useLang();
  return <RouterLink to={typeof to === "string" ? localizedPath(to) : to} {...rest} />;
}

export function Navigate({ to, ...rest }: NavigateProps) {
  const { localizedPath } = useLang();
  return <RouterNavigate to={typeof to === "string" ? localizedPath(to) : to} {...rest} />;
}
