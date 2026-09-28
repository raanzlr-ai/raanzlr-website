// create-post-draft — the only way the insight-post automation writes to `posts`.
//
// Takes one complete bilingual post and stores it as a DRAFT. `published` is
// always forced to false: publishing stays a human decision in /admin, and the
// rebuild trigger (public.request_site_rebuild) only fires once a person
// publishes. A slug that already belongs to a published post is refused, so the
// automation can revise its own drafts but can never alter a live article.
//
// Every image (cover + section images) is copied into the public `blog-images`
// bucket under posts/<slug>/, so articles never hotlink a generator's CDN.
// Remote https URLs and base64 data: URLs (locally rendered covers) are both
// accepted.
//
// Auth: header `x-automation-token` must equal the POSTS_AUTOMATION_TOKEN
// secret. verify_jwt is off because the caller is a script, not a Supabase
// user; the token is the whole gate.
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://raanzlr.com";
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Images and clips live in separate public buckets, each with its own type and
// size limits (enforced by Storage as well as here).
const MEDIA_TYPES: Record<string, { ext: string; bucket: string; maxBytes: number }> = {
  "image/png": { ext: "png", bucket: "blog-images", maxBytes: 8 * 1024 * 1024 },
  "image/jpeg": { ext: "jpg", bucket: "blog-images", maxBytes: 8 * 1024 * 1024 },
  "image/webp": { ext: "webp", bucket: "blog-images", maxBytes: 8 * 1024 * 1024 },
  "image/gif": { ext: "gif", bucket: "blog-images", maxBytes: 8 * 1024 * 1024 },
  "video/mp4": { ext: "mp4", bucket: "blog-videos", maxBytes: 45 * 1024 * 1024 },
  "video/webm": { ext: "webm", bucket: "blog-videos", maxBytes: 45 * 1024 * 1024 },
};

type Bi = { en: string; ar: string };
type QA = { q: string; a: string };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/** Constant-time compare so the token cannot be recovered by timing. */
function sameToken(a: string, b: string): boolean {
  const x = new TextEncoder().encode(a);
  const y = new TextEncoder().encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

const isText = (v: unknown, max = Infinity) => typeof v === "string" && v.trim().length > 0 && v.length <= max;
const isBi = (v: unknown, max = Infinity): v is Bi =>
  !!v && typeof v === "object" && isText((v as Bi).en, max) && isText((v as Bi).ar, max);
const isQA = (v: unknown): v is QA => !!v && typeof v === "object" && isText((v as QA).q) && isText((v as QA).a);

/** Every problem at once, so one round trip is enough to fix a draft. */
function validate(p: any): string[] {
  const problems: string[] = [];
  if (!p || typeof p !== "object") return ["body must be a JSON object"];
  if (!isText(p.slug, 90) || !SLUG_RE.test(p.slug)) problems.push("slug: lowercase words joined by single hyphens, max 90 chars");
  for (const f of ["title", "excerpt", "tag"]) {
    if (!isText(p[`${f}_en`]) || !isText(p[`${f}_ar`])) problems.push(`${f}_en and ${f}_ar are both required`);
  }
  if (!isText(p.image)) problems.push("image (cover) is required: https URL or data:image/... URL");
  // Page <title> is "<seo title> — Raanzlr"; Google shows ~60 chars of it.
  for (const lang of ["en", "ar"]) {
    if (p[`seo_title_${lang}`] != null && !isText(p[`seo_title_${lang}`], 60)) problems.push(`seo_title_${lang}: 1-60 chars`);
    if (p[`seo_description_${lang}`] != null && !isText(p[`seo_description_${lang}`], 160)) problems.push(`seo_description_${lang}: 1-160 chars`);
  }
  if (!Array.isArray(p.sections) || p.sections.length < 3 || p.sections.length > 20) {
    problems.push("sections: array of 3-20 sections");
  } else {
    p.sections.forEach((s: any, i: number) => {
      if (!isBi(s?.heading)) problems.push(`sections[${i}].heading needs en + ar`);
      if (!isBi(s?.body)) problems.push(`sections[${i}].body needs en + ar`);
      for (const field of ["image", "video"]) {
        const src = s?.[field];
        if (src != null && !isText(src)) problems.push(`sections[${i}].${field} must be a URL when present`);
        // Third-party media must say whose it is; media generated for this post needn't.
        if (src && !s.imageCredit && !s.aiGenerated && !/^data:/.test(src) && !src.startsWith(`${SUPABASE_URL}/storage/`)) {
          problems.push(`sections[${i}].${field} is remote: add imageCredit {label, url}, or aiGenerated: true if it was generated for this post`);
        }
      }
    });
  }
  const pair = (a: unknown, b: unknown) => (a == null) === (b == null);
  if (!pair(p.faq_en, p.faq_ar)) problems.push("faq_en and faq_ar go together (both or neither)");
  if (p.faq_en != null && !(Array.isArray(p.faq_en) && p.faq_en.length > 0 && p.faq_en.every(isQA))) problems.push("faq_en: non-empty array of {q, a}");
  if (p.faq_ar != null && !(Array.isArray(p.faq_ar) && p.faq_ar.length > 0 && p.faq_ar.every(isQA))) problems.push("faq_ar: non-empty array of {q, a}");
  if (!pair(p.answer_block_en, p.answer_block_ar)) problems.push("answer_block_en and answer_block_ar go together (both or neither)");
  if (p.answer_block_en != null && !isQA(p.answer_block_en)) problems.push("answer_block_en: {q, a}");
  if (p.answer_block_ar != null && !isQA(p.answer_block_ar)) problems.push("answer_block_ar: {q, a}");
  if (p.published_at != null && Number.isNaN(Date.parse(p.published_at))) problems.push("published_at: ISO 8601 timestamp");
  return problems;
}

/** ~200 words per minute over the English body, like the Admin panel. */
function readTime(sections: { body: Bi }[]): number {
  const words = sections.reduce((n, s) => n + s.body.en.trim().split(/\s+/).length, 0);
  return Math.max(1, Math.round(words / 200));
}

Deno.serve(async (req) => {
  const expected = Deno.env.get("POSTS_AUTOMATION_TOKEN") ?? "";
  if (!expected || !sameToken(req.headers.get("x-automation-token") ?? "", expected)) {
    return json({ error: "unauthorized" }, 401);
  }

  // GET: what already exists (drafts included), so a scheduled run can avoid
  // drafting a topic twice. Titles and slugs only.
  if (req.method === "GET") {
    const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });
    const { data, error } = await db
      .from("posts")
      .select("slug, title_en, tag_en, published, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) return json({ error: error.message }, 500);
    return json({ posts: data });
  }
  if (req.method !== "POST") return json({ error: "GET or POST only" }, 405);

  let post: any;
  try {
    post = await req.json();
  } catch {
    return json({ error: "body is not valid JSON" }, 400);
  }
  const problems = validate(post);
  if (problems.length) return json({ error: "post failed validation", problems }, 422);

  const db = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

  const { data: existing, error: lookupError } = await db
    .from("posts")
    .select("id, published")
    .eq("slug", post.slug)
    .maybeSingle();
  if (lookupError) return json({ error: `lookup failed: ${lookupError.message}` }, 500);
  if (existing?.published) {
    return json({ error: "that slug is a published post; the automation only writes drafts — choose a new slug" }, 409);
  }

  // Copy an image or clip into our storage and return its public URL. Already-ours URLs pass through.
  let stored = 0;
  const ownPrefix = `${SUPABASE_URL}/storage/v1/object/public/`;
  async function keep(source: string, name: string): Promise<string> {
    if (source.startsWith(ownPrefix)) return source;
    let bytes: Uint8Array;
    let type: string;
    const data = source.match(/^data:([^;,]+);base64,(.*)$/s);
    if (data) {
      type = data[1];
      bytes = Uint8Array.from(atob(data[2]), (c) => c.charCodeAt(0));
    } else {
      if (!/^https:\/\//.test(source)) throw new Error(`${name}: only https or data: URLs are accepted`);
      const res = await fetch(source, { signal: AbortSignal.timeout(60_000) });
      if (!res.ok) throw new Error(`${name}: download failed (${res.status})`);
      type = (res.headers.get("content-type") ?? "").split(";")[0].trim();
      bytes = new Uint8Array(await res.arrayBuffer());
    }
    const kind = MEDIA_TYPES[type];
    if (!kind) throw new Error(`${name}: unsupported media type "${type}"`);
    if (bytes.byteLength > kind.maxBytes) throw new Error(`${name}: larger than ${kind.maxBytes / 1024 / 1024} MB`);
    const path = `posts/${post.slug}/${name}.${kind.ext}`;
    const { error } = await db.storage.from(kind.bucket).upload(path, bytes, { contentType: type, upsert: true });
    if (error) throw new Error(`${name}: upload failed (${error.message})`);
    stored++;
    return `${ownPrefix}${kind.bucket}/${path}`;
  }

  let image: string;
  let sections: any[];
  try {
    image = await keep(post.image, "cover");
    sections = [];
    for (const [i, s] of post.sections.entries()) {
      const next = { ...s };
      if (s.image) next.image = await keep(s.image, `section-${i + 1}`);
      if (s.video) next.video = await keep(s.video, `section-${i + 1}-clip`);
      sections.push(next);
    }
  } catch (e) {
    return json({ error: `media handling failed: ${(e as Error).message}` }, 422);
  }

  const row = {
    slug: post.slug,
    title_en: post.title_en,
    title_ar: post.title_ar,
    excerpt_en: post.excerpt_en,
    excerpt_ar: post.excerpt_ar,
    tag_en: post.tag_en,
    tag_ar: post.tag_ar,
    image,
    seo_title_en: post.seo_title_en ?? null,
    seo_title_ar: post.seo_title_ar ?? null,
    seo_description_en: post.seo_description_en ?? null,
    seo_description_ar: post.seo_description_ar ?? null,
    seo_keywords_en: post.seo_keywords_en ?? null,
    seo_keywords_ar: post.seo_keywords_ar ?? null,
    sections: JSON.stringify(sections),
    read_time: Number.isInteger(post.read_time) ? post.read_time : readTime(sections),
    faq_en: post.faq_en ?? null,
    faq_ar: post.faq_ar ?? null,
    answer_block_en: post.answer_block_en ?? null,
    answer_block_ar: post.answer_block_ar ?? null,
    author: "Raanzlr",
    featured: false,
    published: false,
    ...(post.published_at ? { published_at: post.published_at } : {}),
  };

  const write = existing
    ? db.from("posts").update(row).eq("id", existing.id).eq("published", false).select("id").single()
    : db.from("posts").insert(row).select("id").single();
  const { data: saved, error: writeError } = await write;
  if (writeError) return json({ error: `save failed: ${writeError.message}` }, 500);

  return json({
    ok: true,
    action: existing ? "updated" : "created",
    id: saved.id,
    slug: post.slug,
    images_stored: stored,
    preview: {
      en: `${SITE_URL}/en/insights/${post.slug}?preview=1`,
      ar: `${SITE_URL}/ar/insights/${post.slug}?preview=1`,
    },
  });
});
