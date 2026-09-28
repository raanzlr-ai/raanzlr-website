#!/usr/bin/env node
/**
 * Editorial gate for an insight-post draft, run before it is sent.
 *
 * Encodes the binding rules from docs/HANDOFF.md (§5 rules, Appendix A §8.2
 * article rules, Appendix D Part 4 section format) and the Arabic anti-AI-tell
 * rules from arabics_notes.md. Errors block submission; warnings are for the
 * human reviewer in /admin.
 *
 *   node tools/insights/check-post.mjs post.json
 */
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const SITE = "https://raanzlr.com";
const IMPLICATION_HEADING = {
  en: "What this means for business automation",
  ar: "ماذا يعني هذا لأتمتة الأعمال؟",
};

// Handoff §5: no claim of client work, results or proof.
const BANNED_EN = [
  /\bour (clients|customers)\b/i,
  /\bwe(?: have|'ve)? (deployed|delivered|helped|built for)\b/i,
  /\btrusted by\b/i,
  /\b(most|many) (of our )?clients\b/i,
  /\bclients (see|saw|report)\b/i,
  /\bguarantee[ds]?\b/i,
  /\b(world-class|industry-leading|leading provider|best-in-class|cutting-edge)\b/i,
  /\bin today's fast-paced\b/i,
];
const BANNED_AR = [
  /عملاؤنا|عملائنا|لعملائنا/, // "our clients"
  /وليس\s/, // negative parallelism
  /ليس فقط/,
  /[—–]/, // no em/en dashes anywhere in Arabic copy
];
const WARN_AR = [
  { re: /من\s+\S+(?:\s+\S+){0,3}\s+إلى\s/, why: "\"من X إلى Y\" range construction (anti-AI-tell rule 3) — keep only if it is a real numeric range" },
  { re: /الأفضل|الرائد|الأقوى|لا مثيل/, why: "promotional superlative (rule 6)" },
];

const words = (s) => (s ?? "").trim().split(/\s+/).filter(Boolean).length;
const loc = (v, lang) => (typeof v === "string" ? v : v?.[lang] ?? "");
const internalLinks = (text) => [...(text ?? "").matchAll(/\]\((\/[^)\s]+)\)/g)].map((m) => m[1]);
const externalLinks = (text) => [...(text ?? "").matchAll(/\]\((https?:\/\/[^)\s]+)\)|(?<!\()https?:\/\/[^\s)]+/g)];

async function sitemapPaths() {
  const paths = new Set();
  for (const f of ["sitemap-en.xml", "sitemap-ar.xml"]) {
    const xml = await (await fetch(`${SITE}/${f}`)).text();
    for (const m of xml.matchAll(/<loc>https:\/\/raanzlr\.com([^<]*)<\/loc>/g)) paths.add(m[1]);
  }
  return paths;
}

export async function checkPost(post, { online = true } = {}) {
  const errors = [];
  const warnings = [];
  const sections = Array.isArray(post.sections) ? post.sections : [];

  // Shape (the endpoint re-checks; failing early saves a round trip).
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug ?? "")) errors.push("slug must be lowercase words joined by hyphens");
  for (const f of ["title", "excerpt", "tag"]) {
    if (!post[`${f}_en`] || !post[`${f}_ar`]) errors.push(`${f}_en / ${f}_ar missing`);
  }
  for (const lang of ["en", "ar"]) {
    const t = post[`seo_title_${lang}`];
    const d = post[`seo_description_${lang}`];
    if (!t || t.length > 60) errors.push(`seo_title_${lang}: required, max 60 chars (has ${t?.length ?? 0})`);
    if (!d || d.length > 160) errors.push(`seo_description_${lang}: required, max 160 chars (has ${d?.length ?? 0})`);
    else if (d.length < 110) warnings.push(`seo_description_${lang} is short (${d.length}); 140–160 uses the snippet fully`);
  }
  if (!post.image) errors.push("cover image missing");
  if (sections.length < 6 || sections.length > 12) warnings.push(`${sections.length} sections; 6–12 reads best with the table of contents`);

  // Length (Appendix A §8.2: 1,200–1,800 words).
  const bodyEn = sections
    .filter((s) => !/references|sources/i.test(s.heading?.en ?? ""))
    .map((s) => s.body?.en ?? "")
    .join("\n");
  const n = words(bodyEn);
  if (n < 1000) errors.push(`English body is ${n} words; the article program needs 1,200–1,800`);
  else if (n < 1200 || n > 1900) warnings.push(`English body is ${n} words (target 1,200–1,800)`);

  // Fixed commercial-connection section (Appendix D Part 4).
  const impl = sections.find((s) => s.heading?.en === IMPLICATION_HEADING.en);
  if (!impl) errors.push(`missing the "${IMPLICATION_HEADING.en}" section`);
  else {
    if (impl.heading.ar !== IMPLICATION_HEADING.ar) errors.push(`that section's Arabic heading must be exactly "${IMPLICATION_HEADING.ar}"`);
    const w = words(impl.body?.en);
    if (w < 80 || w > 160) warnings.push(`"${IMPLICATION_HEADING.en}" is ${w} words (spec: 80–140)`);
  }

  // Sources: a references section with real links; every chart/table cites one.
  const refs = sections.find((s) => /references|sources/i.test(s.heading?.en ?? ""));
  if (!refs) errors.push("missing a References section");
  else if (externalLinks(refs.body?.en).length < 3) errors.push("References needs at least 3 linked sources");
  sections.forEach((s, i) => {
    if (s.chart && !loc(s.chart.source, "en")) errors.push(`sections[${i}].chart has no source`);
    if (s.table && !loc(s.table.source, "en")) errors.push(`sections[${i}].table has no source`);
    if (s.table) {
      const cols = s.table.columns?.en?.length ?? 0;
      for (const lang of ["en", "ar"]) {
        if ((s.table.columns?.[lang]?.length ?? 0) !== cols) errors.push(`sections[${i}].table: ${lang} column count differs from en`);
        (s.table.rows?.[lang] ?? []).forEach((row, r) => {
          if (row.length !== cols) errors.push(`sections[${i}].table.rows.${lang}[${r}] has ${row.length} cells, expected ${cols}`);
        });
      }
      if ((s.table.rows?.en?.length ?? 0) !== (s.table.rows?.ar?.length ?? 0)) errors.push(`sections[${i}].table: en and ar row counts differ`);
    }
    for (const field of ["image", "video"]) {
      if (s[field] && /^https?:\/\//.test(s[field]) && !s.imageCredit && !s.aiGenerated) {
        errors.push(`sections[${i}].${field} is remote: add imageCredit {label, url} (licensed media) or aiGenerated: true (made for this post)`);
      }
    }
  });
  if (!sections.some((s) => s.image || s.video)) {
    warnings.push("no section image or clip; add at least one visual that explains something (not decoration)");
  }

  // Internal links (Appendix A §8.2: 2+ services, 1+ market), per locale.
  const known = online ? await sitemapPaths() : null;
  for (const lang of ["en", "ar"]) {
    const links = sections.flatMap((s) => internalLinks(s.body?.[lang]));
    const services = new Set(links.filter((l) => l.startsWith(`/${lang}/services/`)));
    const markets = new Set(links.filter((l) => l.startsWith(`/${lang}/markets/`)));
    if (services.size < 2) errors.push(`${lang}: link at least 2 service pages (has ${services.size})`);
    if (markets.size < 1) errors.push(`${lang}: link at least 1 market page`);
    for (const l of links) {
      if (!l.startsWith(`/${lang}/`)) errors.push(`${lang} body links to ${l} — use /${lang}/… paths in ${lang} copy`);
      else if (known && !known.has(l.replace(/[#?].*$/, ""))) errors.push(`${lang}: ${l} is not a live page`);
    }
  }

  // Honesty rules (handoff §5) and Arabic anti-AI-tell rules.
  const allEn = [post.title_en, post.excerpt_en, ...sections.map((s) => `${s.heading?.en}\n${s.body?.en}`)].join("\n");
  const allAr = [post.title_ar, post.excerpt_ar, ...sections.map((s) => `${s.heading?.ar}\n${s.body?.ar}`)].join("\n");
  for (const re of BANNED_EN) if (re.test(allEn)) errors.push(`English copy matches banned pattern ${re}`);
  for (const re of BANNED_AR) if (re.test(allAr)) errors.push(`Arabic copy matches banned pattern ${re}`);
  for (const { re, why } of WARN_AR) if (re.test(allAr)) warnings.push(`Arabic: ${why}`);
  const dashes = (allEn.match(/—/g) ?? []).length;
  if (dashes > 4) warnings.push(`English uses ${dashes} em dashes; more than a few reads as machine-written`);

  // FAQ / answer block (Appendix D Part 5 shape).
  if (post.faq_en) {
    if (post.faq_en.length < 3 || post.faq_en.length > 5) warnings.push(`FAQ has ${post.faq_en.length} items (3–5)`);
    post.faq_en.forEach((qa, i) => {
      const w = words(qa.a);
      if (w < 30 || w > 90) warnings.push(`faq_en[${i}] answer is ${w} words (40–80)`);
    });
  }

  return { errors, warnings, words: n };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const file = process.argv[2];
  if (!file) {
    console.error("usage: node tools/insights/check-post.mjs post.json");
    process.exit(1);
  }
  const { errors, warnings, words: n } = await checkPost(JSON.parse(readFileSync(file, "utf8")));
  console.log(`English body: ${n} words`);
  for (const w of warnings) console.log(`warn  ${w}`);
  for (const e of errors) console.log(`ERROR ${e}`);
  console.log(errors.length ? `\n${errors.length} error(s) — fix before submitting.` : "\nReady to submit.");
  process.exit(errors.length ? 1 : 0);
}
