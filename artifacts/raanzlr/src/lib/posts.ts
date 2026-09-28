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

/** Text in both locales, or one string shown in both. */
export type LocalizedText = { en?: string; ar?: string } | string;

export interface PostChartSpec {
  /** Chart style — the automation should vary this per post/dataset. */
  type: "bar" | "line" | "area" | "pie";
  title?: LocalizedText;
  /**
   * Data points. Single series: `{ label, value }`. Multi-series (bar and line
   * only, e.g. three models across four benchmarks): list the series names in
   * `series` and give each point `values` keyed by those names.
   */
  data: { label: string; value?: number; values?: Record<string, number> }[];
  series?: string[];
  /** Optional unit shown in tooltips, e.g. "$B", "%", "MW". */
  unit?: string;
  /** Optional source note rendered under the chart. */
  source?: LocalizedText;
}

/** A comparison table. Cells are per locale so labels can be translated. */
export interface PostTable {
  title?: LocalizedText;
  columns: { en: string[]; ar: string[] };
  rows: { en: string[][]; ar: string[][] };
  /** Zero-based column to emphasise, e.g. the option the section recommends. */
  highlightColumn?: number;
  source?: LocalizedText;
}

export interface PostSection {
  heading: { en: string; ar: string };
  image?: string;
  /**
   * Optional short silent clip (mp4/webm) shown in place of `image`, which then
   * serves as its poster frame. Plays muted and looped, like an animated figure.
   */
  video?: string;
  imageCaption?: { en: string; ar: string };
  /** Required whenever the image is not Raanzlr's own (a vendor chart, a press photo). */
  imageCredit?: { label: string; url?: string };
  /** Media made for this post with an AI generator (e.g. Higgsfield); needs no third-party credit. */
  aiGenerated?: boolean;
  body: { en: string; ar: string };
  /** Optional interactive chart (recharts: bar/line/area/pie). */
  chart?: PostChartSpec;
  /** Optional comparison table, rendered after the body. */
  table?: PostTable;
}

/** One question/answer pair, in a single locale. */
export interface PostQA {
  q: string;
  a: string;
}

export interface Post {
  slug: string;
  tag: { en: string; ar: string };
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  image: string;
  readTime: number;
  date: string;
  /** Supabase `updated_at`. Drives `dateModified`; absent on static seed posts. */
  updatedAt?: string;
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
  /**
   * Optional per-locale FAQ, rendered after the article body and mirrored as
   * FAQPage schema. Most posts should leave this unset — only add it where the
   * topic has real, distinct search intent (see the aeo skill's guidance on
   * not forcing FAQ onto content that doesn't need it).
   */
  faq?: { en: PostQA[]; ar: PostQA[] };
  /**
   * Optional per-locale answer-first block, rendered near the top of the
   * article for AEO / featured snippets. Same "not every post" rule as `faq`.
   */
  answerBlock?: { en: PostQA; ar: PostQA };
}

/**
 * Posts retired from the public site, mapped to the URL that replaces them.
 *
 * A retired slug is filtered out of every read path, so the post disappears
 * from the archive, the sitemap, the prerender and the "read next" cards in
 * one place. Each entry must be paired with a 301 in vercel.json pointing at
 * the same destination, so an old inbound link keeps its equity instead of
 * dropping onto the hub.
 *
 * The value is the slug of the surviving post on that topic, or `null` to send
 * the URL to the insights hub when nothing replaces it.
 *
 * Two groups are listed here.
 *
 * 1. `ai-automation-gcc-2026-test` — a test article that reached production and
 *    was indexable. ACTION REQUIRED: it is still `published: true` in Supabase
 *    (row id 1); unpublish it in the Admin panel so the database matches.
 *
 * 2. The May–July 2026 burst of near-duplicate "Arabic-first AI agents" posts.
 *    Thirty posts were published in nine weeks covering eight topics between
 *    them, none longer than 520 words and none carrying an image or a chart.
 *    They competed with each other for the same queries. The deepest post in
 *    each topic survives; the rest 301 into it. ACTION REQUIRED: unpublish the
 *    retired rows in the Admin panel.
 */
export const RETIRED_POSTS: Readonly<Record<string, string | null>> = {
  // Test article, no replacement.
  "ai-automation-gcc-2026-test": null,

  // Government and citizen services -> saudi-2026-ai-agents-government-services-20260706
  "arabic-ai-copilots-gcc-government-services-20260701":
    "saudi-2026-ai-agents-government-services-20260706",
  "saudi-arabias-arabic-first-ai-agents-government-enterprises-20260702":
    "saudi-2026-ai-agents-government-services-20260706",
  "arabic-first-ai-copilots-gcc-government-services-20260705":
    "saudi-2026-ai-agents-government-services-20260706",
  "gcc-governments-arabic-ai-assistants-20260706":
    "saudi-2026-ai-agents-government-services-20260706",

  // Arabic-first agents and copilots, general -> saudi-arabia-arabic-first-ai-agents-services-20260701
  "rise-arabic-first-ai-copilots-gcc-post-2026-20260630":
    "saudi-arabia-arabic-first-ai-agents-services-20260701",
  "saudi-arabia-arabic-first-ai-agents-government-enterprises-20260702":
    "saudi-arabia-arabic-first-ai-agents-services-20260701",

  // Customer service and e-commerce -> arabic-ai-agents-gcc-ecommerce-customer-service-20260702
  "arabic-first-ai-agents-gcc-customer-service-20260630":
    "arabic-ai-agents-gcc-ecommerce-customer-service-20260702",
  "arabic-first-ai-sales-agents-gcc-ecommerce-whatsapp-20260705":
    "arabic-ai-agents-gcc-ecommerce-customer-service-20260702",

  // GenAI cloud and infrastructure -> saudi-arabias-arabic-first-genai-cloud-gcc-enterprises-20260702
  "saudi-arabia-generative-ai-cloud-llm-infrastructure-gcc-20260701":
    "saudi-arabias-arabic-first-genai-cloud-gcc-enterprises-20260702",
  "saudi-arabia-genai-cloud-enterprise-transformation-20260703":
    "saudi-arabias-arabic-first-genai-cloud-gcc-enterprises-20260702",
  "saudi-new-ai-cloud-zones-gcc-enterprise-impact-20260703":
    "saudi-arabias-arabic-first-genai-cloud-gcc-enterprises-20260702",

  // Arabic LLMs, models and AI startups -> saudi-arabias-specialized-arabic-ai-models-20260701
  "saudi-arabia-arabic-first-llms-vision-2030-20260702":
    "saudi-arabias-specialized-arabic-ai-models-20260701",
  "saudi-arabia-ai-agent-startups-local-data-innovation-20260703":
    "saudi-arabias-specialized-arabic-ai-models-20260701",
  "saudi-arabia-arabic-first-generative-ai-startups-20260705":
    "saudi-arabias-specialized-arabic-ai-models-20260701",

  // Vertical AI: logistics, energy, retail, finance -> saudi-arabia-vertical-ai-agents-logistics-energy-retail-20260701
  "saudi-ai-startups-revolutionizing-energy-smart-cities-20260701":
    "saudi-arabia-vertical-ai-agents-logistics-energy-retail-20260701",
  "rise-vertical-ai-saas-gulf-family-businesses-20260702":
    "saudi-arabia-vertical-ai-agents-logistics-energy-retail-20260701",
  "saudi-arabia-ai-agents-logistics-industrial-supply-20260704":
    "saudi-arabia-vertical-ai-agents-logistics-energy-retail-20260701",
  "arabic-ai-agents-gcc-financial-services-20260705":
    "saudi-arabia-vertical-ai-agents-logistics-energy-retail-20260701",

  // Regulatory sandboxes -> saudi-ai-sandboxes-vision-2030-enterprise-impact-20260625
  "saudi-arabia-ai-agent-sandboxes-enterprise-workflows-20260630":
    "saudi-ai-sandboxes-vision-2030-enterprise-impact-20260625",

  // AI policy and data governance -> saudi-arabia-new-ai-policies-genai-2026-2027-20260703
  "saudi-arabia-ai-data-governance-frameworks-20260703":
    "saudi-arabia-new-ai-policies-genai-2026-2027-20260703",
  "saudi-arabia-national-ai-agent-platforms-enterprise-20260703":
    "saudi-arabia-new-ai-policies-genai-2026-2027-20260703",
};

/** Retired slugs as a flat list, for callers that only need membership. */
export const RETIRED_POST_SLUGS: readonly string[] = Object.keys(RETIRED_POSTS);

const isRetired = (slug: string) => slug in RETIRED_POSTS;

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
/**
 * Parse a Supabase jsonb column that may arrive as a JSON string or an
 * already-decoded value. Returns `undefined` on anything empty, malformed, or
 * not the expected shape, so a bad or absent column degrades to "no FAQ / no
 * answer block" rather than a render error — most rows have neither column
 * populated yet.
 */
function parseJsonArray<T>(value: unknown): T[] | undefined {
  if (!value) return undefined;
  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    return Array.isArray(parsed) && parsed.length > 0 ? (parsed as T[]) : undefined;
  } catch {
    return undefined;
  }
}

function parseJsonObject<T>(value: unknown): T | undefined {
  if (!value) return undefined;
  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as T) : undefined;
  } catch {
    return undefined;
  }
}

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

  // Both locales must be present and non-empty for the FAQ/AnswerBlock to
  // render at all — a post with only `faq_en` filled in stays without an FAQ
  // section rather than showing one locale and silently blanking the other.
  const faqEn = parseJsonArray<PostQA>(r.faq_en);
  const faqAr = parseJsonArray<PostQA>(r.faq_ar);
  const answerBlockEn = parseJsonObject<PostQA>(r.answer_block_en);
  const answerBlockAr = parseJsonObject<PostQA>(r.answer_block_ar);

  return {
    slug: r.slug,
    tag: { en: r.tag_en ?? "", ar: r.tag_ar ?? "" },
    title: { en: r.title_en ?? "", ar: r.title_ar ?? "" },
    excerpt: { en: r.excerpt_en ?? "", ar: r.excerpt_ar ?? "" },
    image: r.image ?? "",
    readTime: r.read_time ?? r.readTime ?? estimateReadTime(sections),
    date: r.published_at ?? r.created_at ?? new Date().toISOString().split("T")[0],
    updatedAt: r.updated_at ?? undefined,
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
    faq: faqEn && faqAr ? { en: faqEn, ar: faqAr } : undefined,
    answerBlock: answerBlockEn && answerBlockAr ? { en: answerBlockEn, ar: answerBlockAr } : undefined,
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
  const live = posts.filter((p) => !isRetired(p.slug));
  primed = live.length > 0 ? live : null;
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
    if (Array.isArray(data) && data.length > 0 && !isRetired(data[0]?.slug)) {
      return recordToPost(data[0]);
    }
    return null;
  } catch {
    return null;
  }
}

/** sessionStorage key holding the Admin panel's Supabase access token (1 h). */
export const ADMIN_TOKEN_KEY = "raanzlr_admin_token";

/**
 * Fetch any post — draft or published — with an admin session. RLS lets
 * `is_admin()` read every row, so this is what lets an editor preview a draft
 * before publishing it. Resolves to null when the session has expired.
 */
export async function fetchPostAsAdmin(slug: string, accessToken: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&limit=1`,
      { headers: { ...REST_HEADERS, Authorization: `Bearer ${accessToken}` } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? recordToPost(data[0]) : null;
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
    return data.filter((r: any) => !isRetired(r?.slug)).map(recordToPost);
  } catch {
    return [];
  }
}
