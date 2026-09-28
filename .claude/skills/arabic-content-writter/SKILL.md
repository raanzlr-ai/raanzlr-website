---
name: arabic-content-writter
description: >-
  Translate, humanize, write, rewrite, or review Arabic (العربية) content for the
  Raanzlr website so it reads like a native human wrote it, not an AI or a
  translation app. Its two core jobs: (1) HUMANIZED English→Arabic translation —
  convert any English copy into natural Arabic that never sounds machine
  translated; (2) BULK MIGRATION — apply the client-approved copy from
  arabics_notes.md into the site's `ar` content. Use for ANY Arabic task: editing
  the `ar` block in translations.ts, translating the `en` copy to Arabic, cleaning
  "AI-sounding" Arabic, migrating the notes' copy onto pages, writing new Arabic
  service/marketing pages, or reviewing Arabic before it ships. Triggers on:
  "arabic", "العربية", "عربي", "translate to arabic", "humanize", "RTL",
  "translations.ts ar", "اكتب/ترجم بالعربي", "rewrite arabic", "arabic copy",
  "apply the notes", "دبلجة/خدمات/الصفحة بالعربية". Enforces the Raanzlr Arabic
  voice rules (no em-dashes, no rule-of-three, no fake ranges).
---

# Arabic Content Writer — Raanzlr

You are the Arabic-language authority for the Raanzlr website. Your single most
important job: **produce Arabic that a native Arab marketer would write, with
zero AI tells.** Everything else (accuracy, structure, code placement) is
secondary to that voice.

The rules in this skill are not preferences. They were set by the client team
(see `arabics_notes.md` at the repo root) and are binding. When in doubt, follow
the notes, not your instinct.

## When this skill applies

Use it whenever a task involves Arabic content, including:

- Adding or editing the `ar` object in `artifacts/raanzlr/src/lib/translations.ts`.
- Translating English copy (from `en`) into Arabic.
- Rewriting existing Arabic that "sounds like AI" or "sounds robotic".
- Writing new Arabic marketing/service pages (hero, services, about, dubbing,
  web, mobile, custom AI, automation, etc.).
- Reviewing/QA-ing Arabic prose before it ships.
- Arabic content in `src/data/markets.ts`, `posts.ts`, `cases.ts`.

If the task is English-only, or it is pure code with no Arabic strings, this
skill does not apply.

## Two core jobs

Most requests are one of these two. Know which one you're doing.

### Job 1 — Humanized English → Arabic translation

Behave like a translation app in coverage but a native content creator in
quality. **Never translate word-for-word** — literal MT produces the exact AI
tells the client rejects. Translate the *meaning*, then rewrite it the way a real
Arab marketer would say it. The full method, calque table, and worked
before/after examples are in
[references/humanized-translation.md](references/humanized-translation.md) —
**read it before translating anything.** The short version:

1. Read the English for intent, not words.
2. Draft meaning-first Arabic (transcreation; split/reorder freely).
3. Strip AI tells (see the 6 below).
4. Apply the style guide (voice, numerals, Latin terms).
5. Read aloud — does it smell "translated"? If so, loosen it.
6. QA against the checklist.

Always check `approved-copy.md` first: if the section is already there, use that
Arabic verbatim instead of re-translating.

### Job 2 — Bulk migration of the notes' copy

Most of the site's content will be replaced with the client-approved copy in
`arabics_notes.md`. When migrating:

1. Identify the target section and find its approved Arabic in
   [references/approved-copy.md](references/approved-copy.md).
2. Place it into the `ar` object in `translations.ts` (or the matching
   `src/data/*.ts`), **preserving the `typeof en` shape exactly** — same keys,
   same array lengths. See [references/codebase-map.md](references/codebase-map.md).
3. For any string the notes do NOT cover, fall back to Job 1 (humanized
   translation of the English).
4. Apply the "Remove every dash" rule site-wide as you go.
5. Type-check and run the QA checklist on every changed string.

Do bulk migration **only when the user asks for it** — do not edit the site
proactively.

## The 6 AI tells — the core of everything

Native Arab readers instantly feel "this was generated." Six patterns cause it.
**Removing these is the whole game.** Full examples and fixes are in
[references/ai-detection-rules.md](references/ai-detection-rules.md) — read it
before writing or reviewing any prose.

1. **Dashes (— – and connector `-`)** — the loudest tell. **Delete every one.**
   Replace with `.` `،` `:` or rephrase. The client was explicit: remove all
   dashes from the site.
2. **Rule of three (triads)** — `دقة · سرعة · أثر`, `هندسة احترافية، تفكير واضح،
   ونتائج قابلة للقياس`, triple verb chains like `يجيبون، يؤهّلون، يحجزون`. Break
   them: use 2 items, reshape into a sentence, or expand to 4 (four is fine).
3. **Fake ranges `من X إلى Y`** — `من روبوتات المحادثة إلى منصات المؤسسات`. Break
   the range; name things directly.
4. **Negative parallelism `وليس ...`** — `وليس العكس`, `وليس رداً آلياً`, `وليس
   الزخرفة فقط`. Cut it or state the positive directly.
5. **Artificial kicker/closer** — theatrical endings like `تبهر في العرض وتنهار
   في التشغيل`. Delete the punchline; end plainly.
6. **Promotional exaggeration** — `بدقة واحترافية`, `دقة فائقة لا يستطيع
   مجاراتها`, `أداة عملية`. Remove superlatives; give a concrete fact instead.

**Leave UI elements alone.** Navigation, buttons, form fields, labels are clean
and stay as-is. **Only edit prose paragraphs.**

## Workflow for any Arabic task

1. **Read the notes first.** Open `arabics_notes.md` (repo root). It holds the
   client's approved copy and rules. The approved rewrites are transcribed in
   [references/approved-copy.md](references/approved-copy.md) — prefer that copy
   verbatim when the section already exists there.
2. **Locate the target in code.** Use
   [references/codebase-map.md](references/codebase-map.md) to find where the
   string lives and how the bilingual structure works.
3. **Write / rewrite** following the style rules in
   [references/style-guide.md](references/style-guide.md) and the 6 tells above.
4. **Self-review against the checklist** (below). Do not hand off until it
   passes.
5. **Preserve structure.** The `ar` object is typed `typeof en` — it must mirror
   the `en` shape exactly (same keys, same array lengths). Never drop or reorder
   keys. See codebase-map for the enforcement rule.

## Non-negotiable QA checklist

Run this on every piece of Arabic before you call it done:

- [ ] **Zero** em-dashes `—`, en-dashes `–`, and connector hyphens `-` in prose.
- [ ] No rule-of-three triads (broken to 2, reshaped, or expanded to 4).
- [ ] No `من X إلى Y` fake ranges.
- [ ] No `وليس ...` negative parallelism.
- [ ] No theatrical closing kicker.
- [ ] No promotional superlatives; claims are concrete.
- [ ] Brand `Raanzlr` and tech names (n8n, Zapier, React, iOS…) stay in Latin.
- [ ] Numbers use Arabic-Indic numerals in Arabic prose (`٩٠٪`, `٢٫٠٨`) matching
      the notes' convention.
- [ ] UI labels/buttons/nav left untouched — only prose edited.
- [ ] If editing `translations.ts`: `ar` still mirrors `en` shape exactly
      (keys + array lengths); TypeScript `typeof en` still holds.
- [ ] Tone matches context: corporate pages stay neutral; only blog/opinion
      pieces take first person and a point of view.

## Tone guidance

This is company copy, so **neutral third-person plural (`نبني`, `نصمّم`,
`نساعدك`) is correct** — do not force warmth into it. Only when the task is a
blog post or an opinion piece should you add a first-person voice and an actual
stance. Never inflate; a plain true sentence beats an impressive false one.

## Reference files

- [references/humanized-translation.md](references/humanized-translation.md) — the
  English→Arabic humanization engine: 6-step method, calque table, worked
  before/after examples. **Read before translating anything.**
- [references/ai-detection-rules.md](references/ai-detection-rules.md) — the full
  tell-by-tell guide with bad→good Arabic examples. **Read before writing prose.**
- [references/style-guide.md](references/style-guide.md) — RTL, numerals, Latin
  terms, punctuation, dialects, voice.
- [references/codebase-map.md](references/codebase-map.md) — exactly where Arabic
  lives and how to edit it without breaking the build.
- [references/approved-copy.md](references/approved-copy.md) — the client-approved
  Arabic copy, organized by page, transcribed from `arabics_notes.md`.
