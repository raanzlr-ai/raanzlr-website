---
name: raanzlr-insight-post
description: >-
  Research, write, illustrate and submit one bilingual (English + Arabic) insight
  article for raanzlr.com as a DRAFT that a human reviews and publishes in /admin.
  Use whenever asked to create, draft, write or generate an insight / blog post /
  article for Raanzlr, when the scheduled insight-post automation runs, or when
  asked to compare new AI models, tools or trends for Raanzlr's audience. Never
  publishes anything itself.
---

# Raanzlr insight post: draft pipeline

**Output:** one row in Supabase `posts` with `published = false`, created through
the `create-post-draft` edge function. A person reviews it in `/admin → Blog`,
previews it (EN / AR buttons on the row), sets the publish date and time, and
publishes. Publishing fires the site rebuild automatically, so the post is
prerendered and in the sitemap about a minute later. You never publish.

Everything below comes from `docs/HANDOFF.md` (the contractor's final hand-over)
plus the owner's direction. When they conflict, the handoff's honesty rules win.

## Non-negotiable rules (docs/HANDOFF.md §5)

1. **No claim of client work, results or proof.** Banned: "our clients", "we have
   deployed", "trusted by", "most clients see X%", naming platforms as past
   integrations. Raanzlr is described by capability, never by track record.
2. **Every number needs a named, dated, checked source**, linked in References.
   If you cannot source it, cut it. Say whether a benchmark figure is
   vendor-reported or independently measured.
3. **No invented entity facts** (founder, team, office, phone). Registered
   address Casper, Wyoming is the only confirmed one.
4. **Never publish, never edit a published post, never commit drafts to git**
   (the repo is public). Drafts live in `~/.raanzlr/drafts/<slug>/`.
5. **Paid Higgsfield generation is approved** as the fallback when the unlimited models are refused (see Visuals); keep it to about two images and at most one short clip per post.

## 1. Pick the topic

The topic must connect to a Raanzlr **service** and at least one **market**,
and ideally an **industry**. The owner wants **one new draft every day**
(scheduled task `raanzlr-daily-insight-draft`). Daily volume is only safe if
every draft is genuinely useful: Google's scaled-content policy targets many
near-identical pages, so never write two posts that answer the same question,
and never pad a thin topic to hit the length. Two lanes, alternating:

- **Commercial backlog** (default, roughly 4 of every 5 posts): the 30-title
  calendar in `docs/HANDOFF.md` Appendix A §8.3. Take the next unwritten one.
  When it runs out, write new commercial pieces in the same clusters (a
  service × industry or service × market question a buyer actually asks).
- **News + connect** (owner's request): something genuinely new in the last
  ~30 days that a business buyer should understand, such as a new frontier
  model release (e.g. a new Claude, GPT or Gemini), compared for business use
  with a comparison table, benchmark charts and a clear "what to use it for".

Before choosing, list what exists so you don't duplicate a live post or a draft:

```bash
node tools/insights/submit-draft.mjs --list
```

Live link targets (use only these; the checker verifies against the live sitemap):

- Services: `ai-chatbots` (AI agents), `workflow-automation`, `ai-video-dubbing`,
  `web-development` (custom software), `mobile-apps`, `custom-ai` (RAG / document
  AI), `crm-integration` (CRM & API integrations), `ui-ux`, `dashboards`, `consulting`
- Industries: `finance`, `retail`, `healthcare`, `education`, `logistics`,
  `hospitality`, `legal`, `manufacturing`
- Markets: `saudi-arabia`, `uae`, `qatar`, `kuwait`, `bahrain`, `oman`, `syria`,
  `turkey`, `europe`, `united-states`, `canada`

## 2. Research

- Use WebSearch + WebFetch. Prefer primary sources: vendor announcements and
  model cards, official benchmark leaderboards (and their dates/versions),
  regulator and government pages, then reputable press.
- Keep a source log while you research: publisher, title, date, URL, and the
  exact fact taken from it. Every number in the article must map to a row.
- When sources disagree, say so or leave the number out. Paraphrase; at most one
  short quote per article, attributed.

## 3. Structure

7–10 sections, 1,200–1,800 English words (the References section doesn't count).
Articles with 4+ sections get an automatic linked table of contents.

1. **Answer-first opener**: the heading states the takeaway; the body answers the
   reader's question in the first two sentences.
2. **Substance sections** (3–6): what changed, how the options compare, costs
   and limits, how to choose. Use `### ` sub-headings and `- ` lists where they
   help scanning.
3. **Comparison table** in one of them, whenever you compare options (models,
   tools, approaches). Put the option you'd actually recommend for a common case
   in `highlightColumn`, and explain why in the text.
4. **Chart** wherever a sourced number series tells the story faster than prose
   (benchmarks, prices, adoption). Multi-series bar/line for side-by-side models.
5. **"What this means for business automation"** (exact heading; Arabic heading
   exactly `ماذا يعني هذا لأتمتة الأعمال؟`): 80–140 words, capability-based, says
   what Raanzlr can build for this situation, links 2+ services and 1+ market.
   This is the "we can offer this" section; it must not claim past results.
6. **References**: one `- [Publisher: Title (Month YYYY)](url)` line per source,
   3 minimum.

Add `answer_block_*` (one Q/A, 40–80 words) and `faq_*` (3 Q/As, 40–80 words
each) only when there is a real question people search for. Both locales or
neither.

### Body markup the article page renders

- New line = new paragraph. `### Heading` = sub-heading. `- item` = bullet list.
- `**bold**` for a key term (sparingly).
- `[text](/en/services/ai-chatbots)` internal link (Arabic body: `/ar/...`).
- `[text](https://...)` external link (opens in a new tab).

Field reference and a complete example: `references/post-template.json`.

## 4. Write English, then Arabic

- **English voice:** plain, specific, editorial. Short paragraphs. No hype words
  (revolutionary, cutting-edge, game-changer), no "in today's fast-paced world",
  at most a few em dashes. Concrete examples over adjectives.
- **Arabic:** load the `arabic-content-writter` skill and write the Arabic as a
  native editor would, not as a translation. Hard rules it enforces: no em or en
  dashes anywhere, no rule-of-three triads, no fake `من X إلى Y` ranges, no
  `وليس` / `ليس فقط` negative parallelism, no theatrical closing lines, no
  promotional superlatives. Product and model names stay in Latin script.
- **SEO:** `seo_title_*` ≤ 60 chars (the site appends " — Raanzlr"),
  `seo_description_*` 140–160 chars, `seo_keywords_*` a short comma list.
- **Slug:** keyword-first, lowercase, hyphens, no date suffix, ideally ≤ 60 chars.
- **Tag:** reuse an existing tag family (AI Agents, Automation, Custom Software,
  AI Models, or an industry name) so the Insights hub stays tidy.
- **Date:** leave `published_at` unset; the reviewer picks date and time in /admin.

## 5. Visuals (owner's direction, 2026-09-28: every post gets Higgsfield media)

Every post ships with **a Higgsfield cover, at least one Higgsfield section
image, and optionally one short clip**. Charts and tables still carry the data.

**Order of models** (owner-approved; paid fallback is allowed):

1. Try the owner's "365 Unlimited" models first, all with `use_unlim: true` so a
   refusal costs nothing: `flux_2`, `gpt_image`, `seedream_v4_5`,
   `kling_omni_image`, `nano_banana`, `seedream_v5_lite`.
2. If they are refused ("Unlimited generations aren't supported for …", which is
   what the connected account returned on 2026-09-28), generate with the paid
   model **`gpt_image_2`, `use_unlim: false`**, 16:9. Defaults are 1K and low
   quality, which already looked clean for these illustrations.
3. **Clip (optional, one per post at most):** image-to-video from the cover with
   `generate_video_batch`, model `kling3_0_turbo`, `use_unlim: false`,
   `duration: 5`, `resolution: "720p"`, `aspect_ratio: "16:9"`,
   `medias: [{ value: <cover job_id>, role: "start_image" }]`, a calm motion
   prompt (slow push-in, light pulses along the lines, "seamless loop, no text,
   no new objects"). It plays muted and looped as an animated figure.
4. Poll with `jobs_wait`, then download each result and look at it before using
   it. Regenerate once if an image has garbled text, logos, people, or looks off
   brand; drop it rather than ship a bad visual.

**Prompt style:** editorial technology illustration of the article's idea
(not decoration), deep navy #060B14 ground, single cyan #27D8FF accent, clean
minimal composition, "no text, no letters, no numbers, no logos, no people".
Never depict a real company's product UI or logo, and never put figures in an
image; numbers belong in charts with sources.

**Using the media in the post:** reference Higgsfield `result_url`s directly
(`image`, section `image`, section `video`) and set `aiGenerated: true` on those
sections. The endpoint copies everything into Storage (`blog-images`,
`blog-videos`). Do not pass large local files: payloads over 3 MB are refused.
Give each visual an `imageCaption` (EN + AR) that says what it shows.

**Web images:** you may find and use a real image related to the subject only
when its licence allows reuse (Wikimedia Commons CC0 / CC BY / public domain,
Unsplash, Pexels, or a vendor press/media kit that grants editorial use). Record
the licence, set `imageCredit: { label: "<Author or org> / <licence>", url:
<source page> }`, and never use an image whose licence you cannot confirm. Do
not screenshot or re-host benchmark sites or vendor charts; rebuild the data as
a chart or table and link the source.

**Fallback cover:** if Higgsfield is unavailable entirely, render the brand
schematic with `node tools/insights/cover.mjs cover-spec.json cover.png` (free).

**Cost awareness:** each post spends credits on about two images and at most one
5-second clip. Skip the clip when it adds nothing.

## 6. Check, submit, report

```bash
mkdir -p ~/.raanzlr/drafts/<slug>          # post.json + cover.png live here, never in the repo
node tools/insights/check-post.mjs ~/.raanzlr/drafts/<slug>/post.json
node tools/insights/submit-draft.mjs ~/.raanzlr/drafts/<slug>/post.json
```

Fix every ERROR (the checker enforces the rules above, including live internal
links and Arabic dashes). Read the warnings and fix what's reasonable. Re-running
submit on the same slug updates the draft; a slug that is already published is
refused by design.

Then report to the owner: title, slug, word count, number of sources, the two
preview links the script prints, and anything a reviewer should double-check
(e.g. a benchmark figure that only one source reports).

## Credentials and infrastructure (for maintenance)

- Endpoint + token: `~/.raanzlr/automation.json` (created at setup, never in git).
  Source of the function: `supabase/functions/create-post-draft/index.ts`.
- Rebuild on publish: Supabase trigger `public.request_site_rebuild()` on
  `posts` calls the Vercel deploy hook stored in Vault as
  `vercel_deploy_hook_main`. Drafts never trigger it.
- Article renderer: `artifacts/raanzlr/src/pages/InsightPost.tsx`; post types:
  `artifacts/raanzlr/src/lib/posts.ts`.
