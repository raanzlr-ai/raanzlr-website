/**
 * Search-result meta clamping.
 *
 * Titles and descriptions for insight posts are authored in the Admin panel
 * and stored in Supabase, so an over-long string cannot be fixed in the
 * codebase — it is data. Google truncates what it shows anyway; the cost of an
 * over-long title is that the truncation point is arbitrary and the brand name
 * disappears mid-word.
 *
 * These helpers clamp on a word boundary at render time so the meta tags stay
 * inside the usual display width. They are no-ops for strings already short
 * enough, which is every hand-written string in `translations.ts`.
 *
 * The clamped value is used ONLY for `<title>`, `og:title`, `twitter:title`
 * and the description tags. Schema headline, breadcrumb names and on-page
 * headings keep the full authored text — nothing the reader sees is shortened.
 */

/** Longest title Google renders before truncating, in characters. */
export const TITLE_MAX = 60;
/** Longest description Google renders before truncating, in characters. */
export const DESCRIPTION_MAX = 160;

/**
 * Words that must not be the last word of a clamped string.
 *
 * A cut that lands on "and", "the" or Arabic "في" reads as a sentence that got
 * chopped. Dropping the dangling connective costs one word and leaves a phrase
 * that ends on something meaningful.
 */
const TRAILING_STOPWORDS = new Set([
  // English
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "is",
  "its", "of", "on", "or", "the", "to", "with", "vs", "via",
  // Arabic
  "في", "من", "على", "إلى", "عن", "مع", "أو", "و", "التي", "الذي", "بين", "لدى",
]);

/** Trim to `max` characters on a word boundary, without a trailing ellipsis. */
function clampWords(value: string, max: number): string {
  const text = value.trim().replace(/\s+/g, " ");
  if (text.length <= max) return text;

  const cut = text.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(" ");
  // No space in range (a single very long token, or an unspaced script) —
  // fall back to a hard cut so the tag is never longer than the limit.
  let trimmed = lastSpace > max * 0.5 ? cut.slice(0, lastSpace) : text.slice(0, max);
  trimmed = trimmed.replace(/[\s،,;:.—–-]+$/u, "");

  // Drop dangling connectives, one at a time — "the Gulf's Race for Chips and"
  // becomes "the Gulf's Race for Chips".
  for (;;) {
    const words = trimmed.split(" ");
    const last = words[words.length - 1]?.replace(/[.,،;:!?]+$/u, "").toLowerCase();
    if (words.length < 2 || !last || !TRAILING_STOPWORDS.has(last)) break;
    words.pop();
    trimmed = words.join(" ").replace(/[\s،,;:.—–-]+$/u, "");
  }

  return trimmed;
}

/**
 * Clamp a page title, keeping the " — Raanzlr" brand suffix intact.
 *
 * An over-long title loses words from the headline, not the brand, so every
 * result still reads as a Raanzlr page.
 */
export function clampTitle(title: string, max: number = TITLE_MAX): string {
  const text = title.trim().replace(/\s+/g, " ");
  if (text.length <= max) return text;

  const match = text.match(/^(.*?)(\s+[—–-]\s+Raanzlr)$/u);
  if (match) {
    const [, head, brand] = match;

    // The headline on its own fits. Keep every word of it and drop the brand
    // suffix — Google appends the site name to the result anyway, and a whole
    // headline earns more clicks than a truncated one plus a brand.
    if (head.length <= max) return head;

    const room = max - brand.length;
    // Not enough room to keep both — drop the brand rather than emit a title
    // that is mostly suffix.
    if (room < 20) return clampWords(text, max);
    return `${clampWords(head, room)}${brand}`;
  }

  return clampWords(text, max);
}

/** Clamp a meta description to the usual snippet width. */
export function clampDescription(
  description: string,
  max: number = DESCRIPTION_MAX,
): string {
  return clampWords(description, max);
}
