/**
 * Posts data layer.
 *
 * The original API-backed module was removed together with the backend
 * (see "Remove backend and database code"). The site now runs on the
 * static content in `src/data/posts.ts`, so this module adapts that static
 * data and exposes async fetchers that resolve to "no remote data",
 * letting the Insights pages fall back to their static content cleanly.
 */

export interface PostSection {
  heading: { en: string; ar: string };
  image?: string;
  body: { en: string; ar: string };
}

export interface Post {
  slug: string;
  tag: { en: string; ar: string };
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  image: string;
  readTime: number;
  date: string;
  featured?: boolean;
  author?: string;
  sections: PostSection[];
  seo?: {
    titleEn?: string;
    titleAr?: string;
    descriptionEn?: string;
    descriptionAr?: string;
    keywordsEn?: string;
    keywordsAr?: string;
  };
}

/** Normalise a static post entry into the `Post` shape used by the pages. */
export function fromStaticPost(post: any): Post {
  return post as Post;
}

/** No backend is configured — resolve to null so callers keep static data. */
export async function fetchPost(_slug: string): Promise<Post | null> {
  return null;
}

/** No backend is configured — resolve to an empty list (static content wins). */
export async function fetchAllPosts(): Promise<Post[]> {
  return [];
}
