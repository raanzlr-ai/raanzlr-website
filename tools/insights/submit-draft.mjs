#!/usr/bin/env node
/**
 * Send a checked post to the create-post-draft edge function as a DRAFT.
 *
 *   node tools/insights/submit-draft.mjs path/to/post.json [--dry-run]
 *   node tools/insights/submit-draft.mjs --list      # existing posts + drafts
 *
 * - Runs check-post.mjs first; any error stops the upload.
 * - Image fields may be local paths (relative to the JSON file); they are
 *   inlined as data: URLs and the endpoint stores them in Supabase Storage.
 * - Credentials come from ~/.raanzlr/automation.json ({ endpoint, token }) or
 *   the RAANZLR_DRAFT_ENDPOINT / RAANZLR_DRAFT_TOKEN env vars. Never commit them.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { homedir } from "node:os";
import { checkPost } from "./check-post.mjs";

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

function credentials() {
  if (process.env.RAANZLR_DRAFT_ENDPOINT && process.env.RAANZLR_DRAFT_TOKEN) {
    return { endpoint: process.env.RAANZLR_DRAFT_ENDPOINT, token: process.env.RAANZLR_DRAFT_TOKEN };
  }
  const file = join(homedir(), ".raanzlr", "automation.json");
  if (!existsSync(file)) throw new Error(`no credentials: ${file} is missing`);
  return JSON.parse(readFileSync(file, "utf8"));
}

/** Local path → data: URL. URLs and data: URLs pass through untouched. */
function inline(ref, baseDir) {
  if (!ref || /^(https?:|data:)/.test(ref)) return ref;
  const path = resolve(baseDir, ref);
  const type = MIME[extname(path).toLowerCase()];
  if (!type) throw new Error(`unsupported image type: ${ref}`);
  return `data:${type};base64,${readFileSync(path).toString("base64")}`;
}

const [file, flag] = process.argv.slice(2);
if (!file) {
  console.error("usage: node tools/insights/submit-draft.mjs post.json [--dry-run] | --list");
  process.exit(1);
}

if (file === "--list") {
  const { endpoint, token } = credentials();
  const res = await fetch(endpoint, { headers: { "x-automation-token": token } });
  const out = await res.json();
  if (!res.ok) throw new Error(out.error ?? `list failed (${res.status})`);
  for (const p of out.posts) {
    console.log(`${p.published ? "LIVE " : "DRAFT"}  ${p.created_at.slice(0, 10)}  ${p.slug}  —  ${p.title_en}`);
  }
  process.exit(0);
}
const post = JSON.parse(readFileSync(file, "utf8"));

const { errors, warnings, words } = await checkPost(post);
console.log(`English body: ${words} words`);
for (const w of warnings) console.log(`warn  ${w}`);
if (errors.length) {
  for (const e of errors) console.log(`ERROR ${e}`);
  console.log(`\nNot submitted: ${errors.length} error(s).`);
  process.exit(1);
}

const base = dirname(resolve(file));
const payload = {
  ...post,
  image: inline(post.image, base),
  sections: post.sections.map((s) => ({
    ...s,
    ...(s.image ? { image: inline(s.image, base) } : {}),
    ...(s.video ? { video: inline(s.video, base) } : {}),
  })),
};

// The edge function drops very large request bodies mid-upload. Inline only
// small local files (rendered covers); pass generated or licensed media as
// https URLs and the endpoint downloads them itself.
const bytes = Buffer.byteLength(JSON.stringify(payload));
if (bytes > 3 * 1024 * 1024) {
  console.error(
    `\nPayload is ${(bytes / 1024 / 1024).toFixed(1)} MB. Reference large images and clips by their https URL ` +
      `(e.g. the Higgsfield result_url) instead of a local path; the endpoint copies them into Storage.`,
  );
  process.exit(1);
}

if (flag === "--dry-run") {
  console.log(`\nDry run OK: ${post.slug} would be sent as a draft (${JSON.stringify(payload).length} bytes).`);
  process.exit(0);
}

const { endpoint, token } = credentials();
const res = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json", "x-automation-token": token },
  body: JSON.stringify(payload),
});
const out = await res.json().catch(() => ({}));
if (!res.ok) {
  console.error(`\nEndpoint refused the draft (${res.status}): ${out.error ?? "unknown error"}`);
  for (const p of out.problems ?? []) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`\nDraft ${out.action}: #${out.id} ${out.slug} (${out.images_stored} image(s) stored)`);
console.log(`Review in Admin: https://raanzlr.com/admin → Blog → ${out.slug}`);
console.log(`Preview (signed-in admin tab): ${out.preview.en}`);
console.log(`                               ${out.preview.ar}`);
