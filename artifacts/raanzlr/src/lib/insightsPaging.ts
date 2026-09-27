/**
 * Insights archive paging — the single source of truth shared by the page
 * component, the route generator and the prerenderer.
 *
 * Two crawl defects are fixed here and must not regress:
 *
 * 1. Paging used to live in React state with no URL, so pages 2+ were
 *    unreachable without executing JavaScript and clicking. Every page now has
 *    a real, prerendered URL (`/insights/page/2`).
 *
 * 2. The archive used to hoist *every* post flagged `featured` out of the list
 *    while rendering only the first one, so any additional featured post was
 *    linked from nowhere on the site. Only the single hero post is removed from
 *    the grid now.
 *
 * If `PER_PAGE` changes, the route list and the sitemap follow automatically
 * because both derive from `pageCount()`.
 */
import type { Post } from "./posts";

export const PER_PAGE = 10;

/** The hero post, or null when there are no posts at all. */
export function heroPost(posts: readonly Post[]): Post | null {
  return posts.find((p) => p.featured) ?? posts[0] ?? null;
}

/**
 * Every post that belongs in the paged grid: all posts except the one rendered
 * as the hero. Additional `featured` posts stay in the grid so they keep an
 * internal link.
 */
export function archivePosts(posts: readonly Post[]): Post[] {
  const hero = heroPost(posts);
  return hero ? posts.filter((p) => p.slug !== hero.slug) : [...posts];
}

/** Total archive pages. Always at least 1 so page 1 exists even when empty. */
export function pageCount(posts: readonly Post[]): number {
  return Math.max(1, Math.ceil(archivePosts(posts).length / PER_PAGE));
}

/** Clamp an arbitrary page number into the valid range. */
export function clampPage(page: number, posts: readonly Post[]): number {
  const total = pageCount(posts);
  if (!Number.isFinite(page)) return 1;
  return Math.min(Math.max(1, Math.trunc(page)), total);
}

/** The posts shown on a given page (1-based). */
export function pageSlice(posts: readonly Post[], page: number): Post[] {
  const safe = clampPage(page, posts);
  return archivePosts(posts).slice((safe - 1) * PER_PAGE, safe * PER_PAGE);
}

/** Locale-less path for an archive page. Page 1 is the bare archive URL. */
export function archivePath(page: number): string {
  return page <= 1 ? "/insights" : `/insights/page/${page}`;
}

/**
 * The "read next" posts for an article.
 *
 * Deliberately the article's chronological neighbours rather than the newest
 * three. Linking every article to the same three newest posts concentrated all
 * internal links on a handful of URLs and left the rest of the archive with no
 * inbound link at all; neighbours chain the archive together so link equity
 * flows along the whole list.
 */
export function relatedPosts(
  posts: readonly Post[],
  slug: string | undefined,
  count = 3,
): Post[] {
  const others = posts.filter((p) => p.slug !== slug);
  if (others.length <= count) return others;

  const index = posts.findIndex((p) => p.slug === slug);
  if (index < 0) return others.slice(0, count);

  // Walk outwards from the article's position, newer first, wrapping at the
  // ends so the first and last articles still get a full set.
  const picked: Post[] = [];
  for (let step = 1; picked.length < count && step <= others.length; step++) {
    for (const candidate of [posts[index + step], posts[index - step]]) {
      if (candidate && picked.length < count && !picked.some((p) => p.slug === candidate.slug)) {
        picked.push(candidate);
      }
    }
  }
  // Wrap-around top-up for articles at either end of the archive.
  for (const candidate of others) {
    if (picked.length >= count) break;
    if (!picked.some((p) => p.slug === candidate.slug)) picked.push(candidate);
  }
  return picked;
}
