/**
 * Posts data layer.
 *
 * Blog posts are authored in the Admin panel and stored in Supabase
 * (table `posts`). These fetchers read the published rows so the public
 * Insights pages show the real, admin-managed content. If the request
 * fails or returns nothing, callers fall back to the static seed content
 * in `src/data/posts.ts`.
 */

const SUPABASE_URL = (
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  "https://dnpaagicskxzukeczifj.supabase.co"
).trim();

const SUPABASE_ANON_KEY = (
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucGFhZ2ljc2t4enVrZWN6aWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTYyNzksImV4cCI6MjA5NzQ3MjI3OX0.fI0GuwGnTQU7k7HOCwTBP2q0xIjR0s9bmDl0b9SfWN0"
).trim();

const REST_HEADERS = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  Accept: "application/json",
};

export interface PostChartSpec {
  /** Chart style — the automation should vary this per post/dataset. */
  type: "bar" | "line" | "area" | "pie";
  title?: { en?: string; ar?: string } | string;
  /** Data points: label + numeric value. */
  data: { label: string; value: number }[];
  /** Optional unit shown in tooltips, e.g. "$B", "%", "MW". */
  unit?: string;
  /** Optional source note rendered under the chart. */
  source?: { en?: string; ar?: string } | string;
}

export interface PostSection {
  heading: { en: string; ar: string };
  image?: string;
  body: { en: string; ar: string };
  /** Optional interactive chart (recharts: bar/line/area/pie). */
  chart?: PostChartSpec;
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

/** Rough reading-time estimate (~200 wpm) from the English body text. */
function estimateReadTime(sections: PostSection[]): number {
  const words = sections.reduce(
    (n, s) => n + (s?.body?.en ? s.body.en.trim().split(/\s+/).length : 0),
    0,
  );
  return Math.max(1, Math.round(words / 200));
}

/** Map a Supabase `posts` row (flat columns) into the `Post` shape. */
function recordToPost(r: any): Post {
  let sections: PostSection[] = [];
  if (r.sections) {
    try {
      const parsed = typeof r.sections === "string" ? JSON.parse(r.sections) : r.sections;
      if (Array.isArray(parsed)) sections = parsed;
    } catch {
      /* leave sections empty on malformed JSON */
    }
  }

  return {
    slug: r.slug,
    tag: { en: r.tag_en ?? "", ar: r.tag_ar ?? "" },
    title: { en: r.title_en ?? "", ar: r.title_ar ?? "" },
    excerpt: { en: r.excerpt_en ?? "", ar: r.excerpt_ar ?? "" },
    image: r.image ?? "",
    readTime: r.read_time ?? r.readTime ?? estimateReadTime(sections),
    date: r.published_at ?? r.created_at ?? new Date().toISOString().split("T")[0],
    featured: r.featured ?? false,
    author: r.author ?? "Raanzlr",
    sections,
    seo: {
      titleEn: r.seo_title_en ?? undefined,
      titleAr: r.seo_title_ar ?? undefined,
      descriptionEn: r.seo_description_en ?? undefined,
      descriptionAr: r.seo_description_ar ?? undefined,
      keywordsEn: r.seo_keywords_en ?? undefined,
      keywordsAr: r.seo_keywords_ar ?? undefined,
    },
  };
}

/**
 * Posts known before any network request.
 *
 * The Insights pages used to render the static seed from src/data/posts.ts and
 * then swap it for the Supabase copy once the fetch resolved — the reader saw
 * the wrong article for a moment before the real one replaced it. The
 * prerenderer now reads Supabase at build time, renders the real content into
 * the static HTML, and embeds the same payload as JSON. The browser picks it up
 * synchronously below, so the first paint already matches the server markup and
 * there is nothing left to swap.
 *
 * Still only a cache: the runtime fetch keeps running and wins if a post
 * changed after the last build.
 */
let primed: Post[] | null = null;

if (typeof window !== "undefined") {
  const embedded = (window as unknown as { __RAANZLR_POSTS__?: unknown }).__RAANZLR_POSTS__;
  if (Array.isArray(embedded) && embedded.length > 0) primed = embedded as Post[];
}

/** Seed the cache. Called by the prerenderer before it renders any route. */
export function primePosts(posts: Post[]): void {
  primed = posts.length > 0 ? posts : null;
}

/** The build-time payload, or null when unavailable (callers fall back to the seed). */
export function primedPosts(): Post[] | null {
  return primed;
}

/** Fetch a single post by slug. Resolves to null if not found or on error. */
export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&limit=1`,
      { headers: REST_HEADERS },
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return recordToPost(data[0]);
    return null;
  } catch {
    return null;
  }
}

/** Fetch all published posts, newest first. Resolves to [] on error. */
export async function fetchAllPosts(): Promise<Post[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?published=eq.true&order=published_at.desc`,
      { headers: REST_HEADERS },
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map(recordToPost);
  } catch {
    return [];
  }
}
