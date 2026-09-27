# Raanzlr — Developer handoff

**Prepared 2026-09-18.** One file with everything: what exists, what changed in the final pass, how to run it, what is still open, and the rules that must not be broken. The long working documents are appended at the end (Appendix A–E) so nothing lives outside this file.

---

## 0. Message to the developer (paste-ready)

> Hi,
>
> I'm handing over the Raanzlr website and its brand file. The company is no longer my client, so this is a clean close-out: everything I built is in the repo and the Figma file, and this document lists what is finished, what is open, and why.
>
> **Repo:** `Moayad68/raanzlr-website` (private). The final SEO / GEO / AEO pass is on branch `seo/finish-phase-2-4` (commit `cf7ee07`), not merged to `main` yet, so review it first. App lives in `artifacts/raanzlr` (Vite + React SPA, prerendered per locale, deployed on Vercel).
>
> **Run it:** see section 2. On an Apple-silicon Mac the workspace overrides strip the native binaries, so read the three traps before your first `pnpm install`.
>
> **What the final pass did (section 4):** removed every invented statistic and implied-client-work claim from the industry, service, market and seed-post copy; added a *Dashboards & Data Systems* service page (EN + AR); reframed two service titles; question-phrased the industry FAQ headings; synced `llms.txt`; added first-touch UTM capture to analytics. Build is clean: typecheck passes and the prerender emits 76 routes x 2 locales.
>
> **Please read before touching copy (section 6):** the owner's hard rule is that no page may claim client work, results, or proof that has not been verified. Numbers come back only with a named, dated, checked source.
>
> **What I could not do (section 7):** anything that needs the owner's accounts. Search Console and Bing verification, GA4 Key Events and custom dimensions, the Supabase clean-up of retired posts, external profiles, a real WhatsApp number, and the company facts (address, phone). Those are listed with exact steps.
>
> **Not included on purpose:** any credentials. There is a plaintext passwords file in the client folder; do not ask for it to be forwarded.
>
> Merging the branch to `main` triggers a Vercel deploy, so please check the preview first (section 8 lists what to look at).

---

## 1. What you are receiving

| Item | Where |
|---|---|
| Website repo | `github.com/Moayad68/raanzlr-website` (private), local copy `~/Desktop/MyCompany/Rannzlr/raanzlr-website` |
| Final SEO pass | branch `seo/finish-phase-2-4`, commit `cf7ee07` |
| App | `artifacts/raanzlr` (package `@workspace/raanzlr`) |
| Route source of truth | `src/routes.ts` (derived from the data files, so prerender and sitemap cannot drift) |
| Content data | `src/data/{markets,industriesData,servicesRich,serviceFaqs,posts,cases}.ts`, `src/lib/translations.ts` |
| Analytics | `src/lib/analytics.ts`, GA4 `G-16NWLEMG96` |
| Posts | Supabase `posts` table, authored in `/admin`; `src/data/posts.ts` is only the fallback seed |
| Brand identity file (Figma) | file key `YMca1THDbxkbnkYKcCo6X4`, "Raanzlr", 14 pages, V3 close-out |
| Brand book PDF | `~/Desktop/Raanzlr-Brand-Identity-System-V3.pdf` (77 pages) |
| Brand handoff page | Figma page `13 · Asset Export & Handoff`, panel `13.3 Close-out` |

---

## 2. Run it locally (three traps)

1. **No `pnpm` on PATH in some shells.** Use `corepack enable` or run from `artifacts/raanzlr` directly.
2. **Apple-silicon native binaries.** `pnpm-workspace.yaml` overrides set every `*-darwin-arm64` package to `'-'` (it targets the Linux deploy). Vite then fails with `Cannot find module @rollup/rollup-darwin-arm64`. Fix without touching the repo: `npm pack` the four packages at the resolved versions (`@rollup/rollup-darwin-arm64`, `lightningcss-darwin-arm64`, `@tailwindcss/oxide-darwin-arm64`, `@esbuild/darwin-arm64`) and untar them into the root `node_modules`. A fresh `pnpm install` strips them again.
3. **Port 5173** may be taken. Use `--port 5174`.

```bash
cd artifacts/raanzlr
pnpm run typecheck
pnpm run build        # vite build + ssr build + prerender (reads published posts from Supabase)
pnpm run serve        # or: npx vite preview --config vite.config.ts --port 4180
```

Expected build tail: `prerender: 153 HTML files (76 routes x 2 locales + 404) and 3 sitemaps written to dist/.`

---

## 3. SEO / GEO / AEO: state at hand-over

Ordered the way Google's own guidance orders it: ordinary SEO first, GEO/AEO as a by-product of clear, evidenced content. `llms.txt` is kept in sync but is **not** a Google ranking or visibility factor, and `FAQPage` is **no longer a Google rich result** (removed May 2026). The FAQ *content* is what matters; the markup is optional semantic extra.

| Area | State |
|---|---|
| Crawlable / indexable | Every route prerendered to static HTML per locale; sitemaps derived from `routes.ts` |
| Canonicals, trailing slash | Handled in `vercel.json` (`trailingSlash: false`) |
| Schema graph | Organization + WebSite with stable `@id`s; typed page nodes; auto BreadcrumbList; Service and FAQ nodes on service, market and industry pages |
| Entity clarity | One canonical entity sentence used in `index.html`, `llms.txt`, `llms-full.txt` |
| North America | `/en|ar/markets/united-states` and `/canada` live with answer blocks and FAQs |
| Answer-first content | `<AnswerBlock>` on `/services`, home, and market pages |
| Analytics | Full event layer; **new:** `first_utm_source / medium / campaign` on every event |
| Article program | Package of 19 articles + Supabase clean-up list (Appendix D, E). **Not published**, needs owner approval and manual entry in `/admin` |
| Third-party engines | Same fundamentals; no separate lever exists |

### Decisions made in the final pass (and why)

1. **Removed all unsourced statistics** (service hero metrics, market-research charts, industry performance claims). Reason: the owner has no verified proof anywhere, Google's guidance says every statistic needs a source and a date, and healthcare / legal claims such as "reduces diagnostic errors by 15-30%" are a liability. The removed figures and their claimed sources are in Appendix F if anyone wants to re-verify them.
2. **Removed implied client work** ("deployed at Saudi steel facilities, reducing complaints by 75%", "trained on millions of GCC transactions", "most clients see 15-25% downtime reduction", "our data science team"). Replaced with capability wording and pilot-based measurement.
3. **Did NOT expand Oman / Syria / Türkiye / Europe market pages** to match Saudi/UAE depth. There is nothing distinct to say per market beyond the country name, and Google's scaled-content policy treats near-duplicate market pages as spam. Recommendation: keep them short, or fold them into one "Markets" page.
4. **Did NOT write the 30-article calendar.** 19 articles are already drafted (Appendix D) and each needs the owner's approval and first-hand input before publishing. Commodity articles that "could appear on 100 competitor sites" are not worth publishing.
5. **Kept slugs unchanged** (`web-development`, `crm-integration`). Only display titles and H1 changed, so no redirects were needed.

---

## 4. What changed in the final pass (branch `seo/finish-phase-2-4`)

| File | Change |
|---|---|
| `data/industriesData.ts` | ~160 lines rewritten, EN + AR: no percentages, no "trained on", no "deployed at", ROI answers rewritten as "measured against your baseline after launch"; CTA copy no longer says "join the companies already leveraging AI"; FAQ headings are questions ("What do GCC banks ask before adopting AI?") |
| `data/servicesRich.ts` | Hero metrics are now capability facts; `chart` removed from the type and all 18 records; number-bearing comparison and "for companies" lines rewritten; new `dashboards` record |
| `pages/ServiceDetail.tsx`, `components/ServiceChart.tsx` | Chart column removed, comparison table now full width; chart component deleted |
| `data/serviceFaqs.ts`, `lib/translations.ts` | New `dashboards` service (FAQs + item, EN + AR); `web-development` retitled *Custom Software & Web Applications*; `crm-integration` retitled *CRM & API Integrations*; service count "nine" to "ten" |
| `pages/Home.tsx`, `pages/Services.tsx` | Icon and group wiring for `dashboards` |
| `public/services/dashboards.webp` | **Placeholder** illustration (generated, no numbers). Replace with art that matches the other nine hero images |
| `data/markets.ts` | "Experience with X regulation" reworded to "Designed with X in mind" (EN) and neutral wording (AR) |
| `data/posts.ts` | Seed posts: "dozens of MENA businesses over three years" and "we have seen clients face fines" style claims removed |
| `lib/analytics.ts` | First-touch UTM capture in `sessionStorage`; three new event params |
| `public/llms.txt`, `llms-full.txt` | Service list synced (ten services, new titles) |

**Verification run:** `pnpm run typecheck` clean; `pnpm run build` emits 76 routes x 2 locales; new page present at `dist/en/services/dashboards/` and `dist/ar/services/dashboards/` with its FAQ text in the raw HTML; grep of `dist/` finds none of the removed claim phrases; headless-browser pass over home, services hub, dashboards (EN + AR), web-development, finance industry, US market showed no console errors.

---

## 5. Rules that must not be broken

1. **No claim of client work, results, or proof.** Not in the US, Canada, Europe, the GCC, or anywhere else, unless the owner supplies it in writing with permission. Banned patterns: "our clients", "we have deployed", "trusted by", "most clients see X%", named platforms as past integrations.
2. **Every number needs a named, dated, checked source** or it does not ship.
3. **Case studies are labelled scenarios** ("Solution Scenarios"). Do not promote a scenario to a case study.
4. **Do not invent entity facts.** Registered address (Casper, Wyoming) is the only confirmed one. No founder, no team photos, no phone.
5. **WhatsApp CTA stays off** until `VITE_WHATSAPP_NUMBER` holds a real number.
6. **Canada invoicing model is unconfirmed:** no invoicing detail in public copy. French Canada: bilingual builds and client-provided French only.
7. **Brand:** Raanzlr stays off the AldalatiUX palette and type. The supplied logo raster is used unmodified; never redraw it.

---

## 6. Content still worth doing (needs the owner)

- Approve or reject the 19 drafted articles (Appendix D/E) before anything is published.
- Price ranges in `serviceFaqs.ts` (e.g. the chatbot FAQ quotes a dollar range) and timelines in `markets.ts` (e.g. "2-4 weeks") pre-date this pass. They are estimates, not promises, but the owner should confirm them.
- Real photography or clean vector artwork for `dashboards.webp` and the two US / Canada market images (`public/markets/united-states.webp`, `canada.webp` are still missing; pages render without them).
- Supabase posts (28 published) were written in the same voice as the seed posts. The seed is fixed; the live rows are not. Review them in `/admin` for "we have built / our clients" phrasing.

---

## 7. Manual tasks outside the repo (owner accounts needed)

| # | Task | Steps |
|---|---|---|
| 1 | Search Console | Verify `raanzlr.com`, submit `sitemap.xml`, request indexing for the new pages, watch Pages + Performance and the Generative AI performance report |
| 2 | Bing Webmaster Tools | Verify, submit sitemap |
| 3 | GA4 Key Events | Mark `contact_form_submit`, `service_form_submit`, `cta_click`, `newsletter_subscribe` |
| 4 | GA4 custom dimensions | Event-scoped: `cta_location`, `source_page`, `form_name`, `service`, `locale`, **`first_utm_source`, `first_utm_medium`, `first_utm_campaign`** |
| 5 | GA4 filters | Internal-traffic filter and known-bot exclusion (the older audit found bot pollution) |
| 6 | Supabase | Unpublish test row id 1 and the 22 retired posts (list in Appendix D, Part 1). Each already has a 301 in `vercel.json` |
| 7 | External profiles | LinkedIn company, Crunchbase, GitHub org, Clutch, DesignRush, with details identical to the schema. Add each to `Organization.sameAs` once live |
| 8 | WhatsApp | Set `VITE_WHATSAPP_NUMBER` only if a real business number exists |
| 9 | Company facts | Confirm phone, and whether "Riyadh - Istanbul" may be published |

**Measurement rule:** judge the work on Search Console impressions, clicks and index coverage, and on GA4 form and CTA events. A schema validator pass or a Lighthouse score is a correctness check, not a result. GSC "discovered" is not "indexed".

---

## 8. Review checklist before merging

1. Open the branch preview. Check `/en/services`, `/en/services/dashboards`, `/ar/services/dashboards`, `/en/services/web-development`, `/en/industries/finance`, `/en/markets/united-states`.
2. Confirm the hero metric band on each service page reads as capabilities, not results.
3. Curl a new page and confirm FAQ text is in the raw HTML: `curl -s https://<preview>/en/services/dashboards | grep "What is a custom dashboard"`.
4. Confirm `llms.txt` and `llms-full.txt` resolve and every listed URL returns 200.
5. After merge: submit the sitemap in Search Console and request indexing for `/en/services/dashboards` and `/ar/services/dashboards`.

---

## 9. Brand identity file (Figma) in one paragraph

File `YMca1THDbxkbnkYKcCo6X4` holds the full V3 identity system: strategy, logo system (including the emblem, lockup and avatar), colour, typography, grid, 28 components, the website direction (desktop 1440 and mobile 390), the Signal Journal social system (16 masters, EN + AR, plus 10 bilingual posts), the deck template, applications, and the export set. Still open and listed on panel 13.3: a vector logo master, a drawn icon-only R, sign-off on `#00E5FF` and Manrope, a clean emblem, and the company facts. The Dossier social direction is archived on page 99.

---

# Appendices

- **A.** North America SEO / GEO / AEO spec (2026-09-10)
- **B.** Phase 1 US and Canada copy deck
- **C.** Site rebuild design spec (2026-08-23)
- **D.** Blog SEO / GEO / AEO content package (includes the Supabase clean-up list)
- **E.** 19 articles, per-article review
- **F.** Removed statistics

Headings inside the appendices are nested one level down. Statuses inside the older documents (for example "Phase 2 open") are as of their own date; section 3 above is current.



---

## Appendix A — North America SEO / GEO / AEO spec

### Raanzlr — North America SEO / GEO / AEO Growth Spec

**Status:** Draft for review — 2026-09-10
**Project root:** `/Users/odi-d/Desktop/MyCompany/Rannzlr/raanzlr-website`
**App:** `artifacts/raanzlr` (pnpm workspace `@workspace/raanzlr`)
**Predecessor:** `2026-08-23-raanzlr-rebuild-design.md` (visual + engineering rebuild, shipped)

---

#### 1. Executive summary

The site is technically mature: per-locale prerender, single-source routes, correct
canonical + hreflang, a connected schema graph, meta clamping, a full GA4 event layer,
robots.txt that welcomes AI crawlers, `llms.txt` + `llms-full.txt`, and an honest posture
(no fake WhatsApp, "Solution Scenarios" not case studies, real Wyoming address). A prior
pass already retired 25 near-duplicate posts with redirects.

What is missing is **North America as a first-class market** and a handful of
**schema/AEO gaps** that leave already-written content uncited:

1. No `/markets/united-states` or `/markets/canada` pages.
2. Every entity description names a different market list; none includes Canada.
3. Market and industry pages render a visible FAQ but emit **no `FAQPage` schema**.
4. `IndustryDetail` emits **no page-level schema at all**.
5. Meta strings (`home`, `services`, `markets`) still say "GCC and Europe".
6. No answer-first definition blocks; no comparison content.
7. Post hero images hotlink Unsplash; some posts carry unsourced stats.

This spec fixes all of it, adds the two market pages honestly (US = the real
Wyoming-registered entity delivering remotely; Canada = served remotely, no entity),
reframes the 9 service pages for commercial intent, ships a GEO/AEO layer, and defines a
30-article program with the first 5 drafted after approval.

##### Locked decisions (from review 2026-09-10)

| Question | Decision | Consequence |
|---|---|---|
| Canada presence | **Remote only, no CA entity** | Canada page: "serving Canadian businesses remotely", no office language; `areaServed: CA`; `provider` stays the Wyoming Organization |
| Publishable client proof | **None — keep Solution Scenarios** | No testimonials, no metrics-as-real, no named clients. E-E-A-T comes from process transparency, named tools/methods, and honest scope limits |
| Author / founder identity | **Organization-only, no named person** | No `Person` node. Articles authored by "Raanzlr". Add an editorial/standards statement instead of a personal bio |
| Service-page gaps | **Reframe existing 9; add only where genuinely distinct** | No thin new pages. "AI Automation" becomes an umbrella framing; a Dashboards page is added only if scope is truly separate (see §6) |

---

#### 2. What was audited

`src/routes.ts`, `src/App.tsx`, `src/components/SEO.tsx`, `src/lib/{meta,pageSchema,analytics,posts}.ts`,
`src/data/{markets,servicesRich,serviceFaqs,posts,cases,industriesData}.ts`,
`src/pages/{MarketDetail,ServiceDetail,IndustryDetail,Markets,Industries,Home,FAQ}.tsx`,
`src/lib/translations.ts` (`seo:` + `services.items`), `index.html` (schema + GA4),
`public/{robots.txt,llms.txt,llms-full.txt,.well-known/*}`, `dist/sitemap*.xml`, `vercel.json`,
`scripts/prerender.mjs`.

##### Already strong — do not touch

- Prerender + `routes.ts` single source of truth (sitemap can't drift from prerender).
- Canonical: trailing-slash-safe, locale-correct, matches `trailingSlash:false`.
- Hreflang `en`/`ar`/`x-default` in `<head>` and both sub-sitemaps.
- Schema graph: `Organization` + `WebSite`(SearchAction) with stable `@id`s; page nodes
  reference them; typed `pageType`; auto `BreadcrumbList` at depth ≥ 2; `ServiceDetail`
  emits `Service` + `FAQPage`; `FAQ` page emits `FAQPage`; hubs emit `ItemList`.
- `src/lib/meta.ts` clamps title/desc at 60/160 on word boundary, keeps brand suffix.
- robots.txt: GPTBot / OAI-SearchBot / ClaudeBot / PerplexityBot / Google-Extended allowed;
  `Content-Signal: ai-train=no, search=yes, ai-input=yes`; admin disallowed; 3 sitemaps.
- `llms.txt` + `llms-full.txt` with an honest "scenarios ≠ client results" citation note.
- GA4 live (`G-16NWLEMG96`), `send_page_view:false` + SPA `page_view`; event layer with
  PII-key stripping in `src/lib/analytics.ts`.
- Honesty enforced: no fake WhatsApp, no `twitter:site` (handle 404s), Solution Scenarios,
  real address, `noindex` on `*.vercel.app`.
- `RETIRED_POSTS` map: 25 near-dupes 301'd to survivors, paired with `vercel.json`.

##### Blockers — see §3 audit table for the full list with file paths

---

#### 3. Audit — blockers, fix order, files

##### SEO

| ID | Blocker | Fix | Files | Approval |
|----|---------|-----|-------|----------|
| S1 | No US / Canada market pages | Add two full `MARKET_DETAILS` records, EN+AR | `src/data/markets.ts` (routes + prerender + sitemap auto-derive) | copy |
| S2 | Meta says "GCC and Europe" everywhere | Rewrite `seo:` block both locales to lead with the service, name US + Canada + GCC | `src/lib/translations.ts` | rewrite |
| S3 | `MarketDetail` FAQ has no `FAQPage` schema | Add `faqPageSchema()` helper; pass `[marketServiceSchema, faqPageSchema, ...]` | `src/lib/pageSchema.ts`, `src/pages/MarketDetail.tsx` | safe |
| S4 | `IndustryDetail` emits no schema | Add page-level `Service` (areaServed from industry) + `FAQPage` from the visible FAQ | `src/pages/IndustryDetail.tsx`, `src/lib/pageSchema.ts` | safe |
| S5 | Section parity: `oman/syria/turkey/europe` records omit some sections `saudi-arabia` has (`whyParagraphs`, `keyAdvantages`, `servicesTitle`) — content depth is otherwise comparable | Add the missing sections to match; not a rewrite | `src/data/markets.ts` | copy |
| S6 | Post hero images hotlink `images.unsplash.com` — no dims, LCP + licensing risk | Self-host to `public/insights/<slug>.webp`; set explicit `width`/`height`; update Supabase `image` + seed | `src/data/posts.ts`, `public/insights/`, Supabase | per-image |
| S7 | Unsourced stats in seed posts ("84% adoption") | Every stat gets a real named source + date, or is cut | `src/data/posts.ts` + Supabase rows | per-post |
| S8 | Test post (Supabase row id 1) still `published:true`; retired rows still published | Unpublish in Admin panel (no code) | Supabase Admin | manual |
| S9 | `areaServed` arrays missing `CA` | Add `"CA"` to `Organization.areaServed` and `ServiceDetail` service schema; add `CA` to `MARKET_COUNTRY_CODES` via the new market record | `index.html`, `src/pages/ServiceDetail.tsx`, `src/lib/pageSchema.ts` | safe |
| S10 | Service coverage vs commercial keyword list | Reframe 9 pages (see §6); add Dashboards page only if scope distinct | `src/lib/translations.ts`, `src/data/servicesRich.ts`, `src/data/serviceFaqs.ts` | rewrite |
| S11 | Dead `keywords`/`keywordsAr` props threaded into `SEO` on market/service detail (SEO.tsx never emits a keywords meta) | Drop the props at call sites; keep the editorial strings in `translations.ts` | `src/pages/{MarketDetail,ServiceDetail}.tsx` | safe |

##### GEO

| ID | Blocker | Fix | Files | Approval |
|----|---------|-----|-------|----------|
| G1 | 4 conflicting entity descriptions; Canada in none | One canonical sentence, reused verbatim | `index.html` (Org + WebSite `description`), `src/lib/translations.ts`, `public/llms.txt`, `public/llms-full.txt` | rewrite |
| G2 | No editorial identity / standards signal (per decision: org-only) | Add an "Editorial standards" section to `/about` + `llms-full.txt`: who writes (Raanzlr's engineering team), how claims are sourced, that scenarios are labelled | `src/pages/About.tsx`, `public/llms-full.txt` | copy |
| G3 | `llms.txt` / `llms-full.txt` have no US/Canada section, no answer blocks | Add "Markets served" US + Canada entries; add the 8 GEO answers to `llms-full.txt` | `public/llms.txt`, `public/llms-full.txt` | copy |
| G4 | External corroboration ≈ zero | Marketing task list (§12): Crunchbase, LinkedIn company completeness, GitHub org, Clutch/DesignRush profiles — consistent NAP. Not code | — | — |
| G5 | `llms-full.txt` case-study section lacks the scenario disclaimer that `llms.txt` has | Copy the disclaimer across | `public/llms-full.txt` | safe |

##### AEO

| ID | Blocker | Fix | Files | Approval |
|----|---------|-----|-------|----------|
| A1 | Market + industry FAQ content not in schema | Covered by S3 + S4 | — | safe |
| A2 | No answer-first definition blocks | New `<AnswerBlock>` component: `<h2>` question + a 40–80-word standalone first paragraph; place on home, each service, US/CA markets | `src/components/AnswerBlock.tsx` (new), `src/pages/{Home,ServiceDetail,MarketDetail}.tsx` | copy |
| A3 | No comparison content | Add a real comparison table to `custom-ai`/`ai-chatbots` service pages ("AI chatbot vs AI agent") and to two articles ("AI automation vs traditional automation", "custom software vs SaaS") | `src/data/servicesRich.ts`, articles | copy |
| A4 | Industry FAQ headings generic ("Frequently Asked Questions") | Rewrite each `faqTitle` to a question-bearing phrase | `src/data/industriesData.ts` | copy |

##### Fix order (dependency-correct)

1. **G1 + G5** entity consistency (one string, everywhere).
2. **S3 + S4 + S9** schema helpers + wiring (`FAQPage` on markets/industries, `Service` on industries, `CA` in areaServed).
3. **S11** drop dead props.
4. **A2** `<AnswerBlock>` component + home/service placement.
5. **S1** US + Canada market records (depend on the S3 helper being in place).
6. **S2** meta / translations North America pass.
7. **G3 + G2** `llms` files + `/about` editorial section.
8. **S5** market section parity.
9. **A3 + A4** comparison content + industry FAQ headings.
10. **S10** service reframe (largest copy job).
11. **S6 + S7** image self-hosting + stat sourcing.
12. **S8** manual Supabase unpublish.
13. Article program (§8).
14. Deliverables: E-E-A-T, tracking, reporting, link map, post-deploy (§9–§16).

---

#### 4. North America market pages

##### 4.1 Honest-language rules (apply to every string on both pages)

Allowed: "registered in Casper, Wyoming, USA" · "serving businesses across the United States
remotely" · "supporting Canadian companies with remote AI automation and software
development" · "remote discovery, development, launch, and support" · "no office in
[state/province]".

Forbidden: "US-based team" · "local office" · "Canadian office" · "on-site" · "near you" ·
any client, metric, review, award, partner, or certification not independently true.

##### 4.2 `/en/markets/united-states` + `/ar/markets/united-states`

New record in `src/data/markets.ts`:

```
slug: "united-states", code: "US", flag: "🇺🇸",
heroImage: "/markets/united-states.webp"   (self-hosted, ~1600px wide, <150KB webp)
```

| Field | EN value (direction, not final copy) |
|---|---|
| `name` | United States |
| `region` | North America |
| `cities` | Remote delivery, US-wide |
| `metaDescription` | "AI automation and custom software development for US businesses, delivered remotely by Raanzlr — a Wyoming-registered software company. AI agents, workflow automation, dashboards, and integrations." (≤160) |
| `heroTitle` (H1) | **AI Automation & Custom Software for US Businesses** |
| `heroDescription` | 2–3 sentences: what Raanzlr builds, that it is Wyoming-registered and delivers every engagement remotely, who it is for (operations / founder-led / SMB). |
| `whyTitle` / `whyParagraphs` | Why US teams outsource AI automation remotely: speed, cost of in-house ML hiring, the integration-glue problem. No market-size stats unless sourced. |
| `keyAdvantages` | Bilingual (for US teams with LATAM/MENA operations), timezone overlap claim only if true, fixed-scope engagements, no lock-in. |
| `servicesTitle` / `services[]` | 6 cards linking to reframed service pages: AI agents, workflow automation, custom software, web apps, dashboards & data, API integrations. |
| `industriesTitle` / `industries[]` | Healthcare ops, real estate, logistics, retail/e-commerce, professional services, SaaS. |
| `useCasesTitle` / `useCases[]` | 6 concrete scenarios, each "problem → what we build". Labelled as illustrative. |
| `whyRaanzlrTitle` / `whyRaanzlr[]` | Remote delivery method (discovery → build → launch → support), documentation, honest scope. |
| `faqTitle` | "Common questions from US companies" |
| `faqs[]` | 6 Q&A — see §4.4. |
| `ctaTitle` / `ctaDescription` | Contact CTA. |

**Schema emitted** (via updated `MarketDetail.tsx`):
`Service` (`areaServed: {Country, US}`, `provider: #organization`) + `FAQPage` (from `faqs`)
+ auto `BreadcrumbList` + the page `WebPage` node. All four in one graph.

Title tag: `AI Automation & Custom Software Services in the United States | Raanzlr`
Canonical: `https://raanzlr.com/en/markets/united-states` · hreflang pair with `/ar/...`.

##### 4.3 `/en/markets/canada` + `/ar/markets/canada`

Same shape. `code: "CA"`, `heroImage: "/markets/canada.webp"`, `region: "North America"`,
`cities: "Remote delivery, Canada-wide"`.

- H1: **AI Automation & Custom Software for Canadian Businesses**
- Title: `AI Automation & Custom Software Services in Canada | Raanzlr`
- `heroDescription`: names that Raanzlr is a US-registered company **serving Canadian
  businesses remotely, with no Canadian office**, in English and French-capable delivery
  **only if** French delivery is real — otherwise state English + Arabic and omit French.
- `whyParagraphs`: Canadian SME tech-talent shortage, cost of Toronto/Vancouver dev hiring,
  PIPEDA-aware data handling (as an engineering practice, not legal advice — mirror the
  existing Europe page's privacy phrasing).
- `faqs[]`: §4.4, Canada variant (data residency, invoicing currency, timezone).
- Schema: `Service` `areaServed: {Country, CA}` + `FAQPage` + breadcrumb.

##### 4.4 FAQ sets (answer-first, 40–80 words each, drafted at implementation)

US and Canada share this skeleton, answers localised:

1. Does Raanzlr have an office in the US / Canada? — *No. Raanzlr is registered in
   Casper, Wyoming, and delivers every engagement remotely…*
2. How does remote delivery work? — discovery calls → written scope → build in sprints →
   launch → support window.
3. What does AI automation cost? — honest range shape + "scoped per project", no guarantee.
4. How long does a project take? — typical bands by project type.
5. Can you integrate with our existing tools? — named categories (CRM, helpdesk, billing,
   data warehouse), API-first.
6. Which time zones do you cover? — state the real overlap; do not invent US business hours.

##### 4.5 Internal links each NA page must carry

Down to: `/services/ai-chatbots`, `/services/workflow-automation`,
`/services/custom-software` (reframed `web-development` or new), `/services/crm-integration`,
`/services/dashboards` (if added). Across to: `/markets` hub, `/industries` relevant pages.
Up from: `/markets` hub grid, footer, `llms.txt`. Home adds a North America line.

---

#### 5. Meta / translations North America pass (S2)

Rewrite `translations.<locale>.seo`:

| Key | New EN title (≤60) | New EN description (≤160) |
|---|---|---|
| `home` | `Raanzlr — AI Automation & Custom Software Company` | `Raanzlr builds AI agents, workflow automation, dashboards, and custom software for businesses in the US, Canada, and the GCC. Delivered remotely.` |
| `services` | `AI Automation & Custom Software Services — Raanzlr` | `AI agents, workflow automation, custom software, web apps, dashboards, and API integrations — built for US, Canadian, and GCC businesses.` |
| `markets` | `Markets We Serve — US, Canada, GCC & Europe — Raanzlr` | `Raanzlr serves businesses in the United States and Canada remotely, alongside the GCC, Türkiye, and Europe, with bilingual AI and software delivery.` |
| `industries` | keep, minor: add "for teams in North America and the GCC" | — |
| `caseStudies` | keep (Solution Scenarios framing is correct) | — |
| `about` | `About Raanzlr — AI Automation & Software Company` | add "Wyoming-registered, remote delivery" |

Arabic mirrors, translated not transliterated, RTL-safe.

---

#### 6. Service page reframe (S10) — decision: reframe 9, add ≤1

| Current key | Primary commercial keyword to own | Action |
|---|---|---|
| `ai-chatbots` | "AI agents for business" / "AI chatbot development" | Rename display to **AI Agents & Chatbots**; add answer block "What is an AI agent?"; add "AI chatbot vs AI agent" comparison table |
| `workflow-automation` | "workflow automation" / "business process automation" | Add answer block; add "AI automation vs traditional automation" table; name the stack (n8n, Make, custom) |
| `custom-ai` | "custom AI development" / "RAG systems" | Keep; tighten intro to answer-first |
| `web-development` | "custom software development" / "custom web application development" | Reframe as **Custom Software & Web Applications**; H1 carries "custom software development"; this is the "custom software" landing page |
| `mobile-apps` | "custom mobile app development" | Answer-first intro; who it's for |
| `crm-integration` | "API integration services" / "CRM development" | Reframe as **CRM & API Integrations**; H1 carries "API integration services"; list integration categories |
| `ui-ux` | "UI/UX design" (RTL niche) | Minor; keep RTL differentiation |
| `consulting` | "AI automation consulting" | Answer-first; scope of advisory |
| `ai-video-dubbing` | "AI video dubbing" | Leave; niche, already distinct |
| **NEW** `dashboards` | "dashboard development" / "custom dashboards" / "data systems" | **Add** — genuinely distinct deliverable (BI/ops dashboards, data pipelines, reporting). Full record in `servicesRich.ts` + `serviceFaqs.ts` + `translations.services.items`. Only new page. |

Each reframed page keeps its length target 600–1,200 words and gains: answer-first intro,
"who it's for", "problems it solves", "what Raanzlr builds", use cases, industries, process,
deliverables, FAQ (already schema'd), CTA, internal links to US/Canada markets.

"AI Automation" itself stays an **umbrella framing** on `/services` H1 + intro and on the
home page — not a separate page (would cannibalise `workflow-automation` + `ai-chatbots`).

---

#### 7. GEO / AEO layer

##### 7.1 Canonical entity sentence (G1)

> Raanzlr is an AI automation and custom software company, registered in Casper, Wyoming,
> USA and founded in 2023. It builds AI agents, workflow automation, dashboards, API
> integrations, and custom software for businesses in the United States, Canada, the GCC,
> Türkiye, and Europe. Every engagement is delivered remotely; Raanzlr has no offices in
> the markets it serves. Working languages: English, Arabic (including RTL interfaces), and
> Turkish.

Used verbatim in: `index.html` Org `description` (trim to ~2 sentences) + WebSite
`description`; `translations` about/home lead; `llms.txt` intro; `llms-full.txt` intro.

##### 7.2 `Organization` schema additions (`index.html`)

- `areaServed`: add `"CA"` → `["US","CA","SA","AE","QA","KW","BH","OM","SY","TR","EU"]`
- `description`: replace with the canonical sentence (2-sentence form)
- Add `slogan` or `knowsAbout` array: `["AI automation","AI agents","workflow automation",
  "custom software development","API integration","dashboard development","RAG systems"]`
  — entity-topic signal, honest.
- Keep `sameAs` as-is until the §12 profiles exist, then extend.
- No `founder` (decision: org-only).

##### 7.3 The 8 GEO answer blocks

Drafted at implementation, 40–80 words, factual, quotable. Live in **two places**:
`llms-full.txt` (plain) and on-page via `<AnswerBlock>` where topically relevant.

| Answer | On-page home for it |
|---|---|
| What is AI automation? | `/services` intro + `llms-full` |
| What does an AI automation company do? | `/about` + home |
| When should a business use AI agents? | `/services/ai-chatbots` |
| How much does AI automation cost? | `/services` FAQ + US/CA market FAQ |
| How long does a custom software project take? | `/services/web-development` FAQ |
| Difference between AI automation and custom software? | `/services` + article |
| How can US companies use AI automation? | `/markets/united-states` |
| How can Canadian companies use AI automation? | `/markets/canada` |

No guarantees, no invented figures. Cost/time answers describe *shape* ("scoped per
project", "typically N–M weeks for X") not promises.

##### 7.4 `<AnswerBlock>` component (A2)

```tsx
// src/components/AnswerBlock.tsx
// <h2> = the question, verbatim. First <p> = a standalone 40–80-word answer that
// survives being quoted with no context. Optional children = elaboration.
// No accordion — content must be in the DOM and visible without interaction.
```

##### 7.5 `FAQPage` helper (S3/S4)

```ts
// src/lib/pageSchema.ts
export function faqPageSchema(
  locale: "en" | "ar", pagePath: string,
  faqs: ReadonlyArray<{ q: string; a: string }>,
) { /* @id `${url}#faq`, @type FAQPage, mainEntity: Question[] */ }
```

`MarketDetail` passes `[marketServiceSchema(...), faqPageSchema(...)]`.
`IndustryDetail` passes `[industryServiceSchema(...), faqPageSchema(...)]` (new
`industryServiceSchema` mirrors `marketServiceSchema` but `areaServed` = the org's full
list and `serviceType` names the industry).

##### 7.6 Crawler / rendering

- Confirm prerendered market/industry HTML contains the FAQ answer text (it does — SSR
  renders `<details>` open content in DOM). `<AnswerBlock>` must render server-side too.
- `llms.txt` links: re-verify every URL after slug changes (service reframes keep slugs
  where possible; if `web-development` → `custom-software` slug changes, that's a redirect —
  see §15).

---

#### 8. Article program (Part 6)

##### 8.1 Workflow

Articles live in Supabase (`posts` table), authored via the Admin panel; the prerenderer
reads them at build. **Deliverable = a content doc per article** (title, meta, slug, body
sections as the Admin panel expects, FAQ, internal links) that gets pasted in. The first 5
are also committed to `src/data/posts.ts` as seed so they render even if Supabase is
unreachable.

##### 8.2 Rules

1,200–1,800 words · clear H1 · answer-first intro · H2/H3 · direct-answer blocks · concrete
examples · **no fabricated stats, clients, citations** · cite only real sources with dates ·
internal links to 2+ services and 1+ market · FAQ section (renders + `FAQPage` via
`InsightPost`) · CTA · `datePublished` + `dateModified` from Supabase columns (already wired).

##### 8.3 The 30 — calendar (publish 3–4/month, clusters interleaved)

| # | Cluster | Working title | Slug | Primary keyword | Intent |
|---|---|---|---|---|---|
| 1 | Basics | What Is AI Automation for Business? | `what-is-ai-automation-for-business` | ai automation for business | Info |
| 2 | Basics | AI Automation vs Traditional Automation | `ai-automation-vs-traditional-automation` | ai automation vs traditional automation | Info/compare |
| 3 | Basics | How AI Agents Improve Business Operations | `ai-agents-business-operations` | ai agents for business operations | Info |
| 4 | Basics | What Business Tasks Can Be Automated with AI? | `business-tasks-automate-with-ai` | what can ai automate | Info |
| 5 | Basics | AI Automation for Small Businesses | `ai-automation-for-small-business` | ai automation for small business | Commercial |
| 6 | Custom SW | Custom Software vs SaaS: Which Is Better? | `custom-software-vs-saas` | custom software vs saas | Compare |
| 7 | Custom SW | When Should a Company Build Custom Software? | `when-to-build-custom-software` | when to build custom software | Info |
| 8 | Custom SW | How Custom Dashboards Improve Decisions | `custom-dashboards-business-decisions` | custom dashboard development | Commercial |
| 9 | Custom SW | CRM Development for Growing Companies | `crm-development-growing-companies` | crm development | Commercial |
| 10 | Custom SW | API Integrations for Business Operations | `api-integrations-business-operations` | api integration services | Commercial |
| 11 | US | AI Automation Services for US Businesses | `ai-automation-services-us-businesses` | ai automation services united states | Commercial |
| 12 | US | Best AI Automation Use Cases for US Companies | `ai-automation-use-cases-us-companies` | ai automation use cases | Info |
| 13 | US | Custom Software Development for US Startups | `custom-software-development-us-startups` | custom software development us startups | Commercial |
| 14 | US | AI Agents for US Customer Support Teams | `ai-agents-us-customer-support` | ai agents customer support | Commercial |
| 15 | US | Workflow Automation for US Operations Teams | `workflow-automation-us-operations-teams` | workflow automation operations | Commercial |
| 16 | Canada | AI Automation Services for Canadian Businesses | `ai-automation-services-canadian-businesses` | ai automation canada | Commercial |
| 17 | Canada | Custom Software Development for Canadian Companies | `custom-software-development-canada` | custom software development canada | Commercial |
| 18 | Canada | AI Agents for Canadian Customer Support Teams | `ai-agents-canadian-customer-support` | ai agents canada | Commercial |
| 19 | Canada | Workflow Automation for Canadian SMEs | `workflow-automation-canadian-smes` | workflow automation canada | Commercial |
| 20 | Canada | Dashboard Development for Canadian Businesses | `dashboard-development-canadian-businesses` | dashboard development canada | Commercial |
| 21 | Industry | AI Automation for Healthcare Operations | `ai-automation-healthcare-operations` | ai automation healthcare | Commercial |
| 22 | Industry | AI Automation for Real Estate Companies | `ai-automation-real-estate` | ai automation real estate | Commercial |
| 23 | Industry | AI Automation for Logistics Companies | `ai-automation-logistics` | ai automation logistics | Commercial |
| 24 | Industry | AI Automation for Retail and E-commerce | `ai-automation-retail-ecommerce` | ai automation retail | Commercial |
| 25 | Industry | AI Automation for Professional Services | `ai-automation-professional-services` | ai automation professional services | Commercial |
| 26 | AEO | How Much Does AI Automation Cost? | `how-much-does-ai-automation-cost` | ai automation cost | Info/commercial |
| 27 | AEO | How Long Does Custom Software Development Take? | `how-long-custom-software-development` | custom software development timeline | Info |
| 28 | AEO | What Makes a Good AI Agent? | `what-makes-a-good-ai-agent` | what makes a good ai agent | Info |
| 29 | AEO | AI Chatbot vs AI Agent: What's the Difference? | `ai-chatbot-vs-ai-agent` | ai chatbot vs ai agent | Compare |
| 30 | AEO | How to Choose an AI Automation Company | `how-to-choose-ai-automation-company` | how to choose ai automation company | Commercial |

Full per-article spec (SEO title <60, meta <160, secondary keywords, outline, FAQ Qs,
internal links, schema, CTA) produced with the drafts.

##### 8.4 First 5 to draft fully after approval

Articles 1, 2, 3, 6, 26 — the cluster spine (two Basics definitions, one AI-agents
operations piece, the SaaS comparison, the cost question). Each seeds `posts.ts`.

---

#### 9. E-E-A-T & trust plan (Part 8) — org-only

- **`/about`**: add "How we work" specifics (already partly there), an "Editorial standards"
  block (who writes, how claims are sourced, scenarios are labelled), the canonical entity
  sentence, Wyoming registration line, founding year.
- **Keep** "Solution Scenarios"; keep the `llms.txt` disclaimer; add it to `llms-full.txt`.
- **Contact page**: verify email, response-time claim, legal entity name consistent with
  schema `legalName`.
- **Deliverables (docs, not code)**: case-study intake form template · client-proof request
  message · external-profile checklist (Crunchbase, LinkedIn, GitHub org, Clutch,
  DesignRush — NAP identical to schema) · 30-day LinkedIn company posting plan.
- **No** author bio, no team headshots, no fabricated persona.

---

#### 10. Technical SEO task list

1. `faqPageSchema()` + `industryServiceSchema()` in `pageSchema.ts`.
2. Wire into `MarketDetail.tsx`, `IndustryDetail.tsx`.
3. `<AnswerBlock>` component, SSR-safe.
4. `Organization` schema: `+CA`, canonical `description`, `knowsAbout`.
5. `WebSite` schema `description` → canonical sentence.
6. US + Canada `MARKET_DETAILS` records (+ `united-states.webp`, `canada.webp`).
7. `translations.seo` rewrite, both locales.
8. `llms.txt` + `llms-full.txt`: entity sentence, US/Canada, 8 answers, disclaimer parity, URL re-verify.
9. Drop dead `keywords` props at market/service call sites.
10. Service reframe: `translations.services.items`, `servicesRich.ts`, `serviceFaqs.ts`; new `dashboards` record.
11. Market section parity for oman/syria/turkey/europe.
12. Industry `faqTitle` → question phrasing.
13. Self-host post images; explicit dimensions; `loading`/`fetchpriority` audit on article hero.
14. Redirect entries if any slug changes (§15).
15. Post-build: `pnpm --filter @workspace/raanzlr build` → check prerender count rose by 4
    (US+CA × 2 locales), sitemap includes them, `typecheck` clean.

#### 11. Developer task list

- Implement §10.1–§10.6, §10.9 (safe) behind one branch.
- Add `MARKET_COUNTRY_CODES` entries `united-states: "US"`, `canada: "CA"`.
- Confirm `MarketDetail` renders new sections when present, degrades when absent (parity work).
- Unit-check: `faqPageSchema` output validates (Rich Results Test is a correctness check, not a ranking claim).
- Verify `<AnswerBlock>` text present in `dist/en/markets/united-states/index.html`.
- No route changes needed — `routes.ts` derives markets from `MARKET_DETAILS`.

#### 12. Marketing task list

- Google Search Console: verify `raanzlr.com`, submit `sitemap.xml`, confirm both
  sub-sitemaps read; set up the Generative AI performance report view.
- Bing Webmaster Tools: verify + sitemap (Copilot/ChatGPT sourcing).
- Create/complete external profiles with NAP identical to schema: LinkedIn company (full
  About + services + location), Crunchbase, GitHub org, Clutch, DesignRush. Add each to
  `Organization.sameAs` once live.
- 30-day LinkedIn plan: 3 posts/week — 1 educational (article promo), 1 build-in-public
  (process, no client names), 1 answer-format (one GEO answer as a post).
- Baseline AI-citation sample: 15 queries (from the keyword list) across ChatGPT,
  Perplexity, Claude, Copilot, Google AI Mode; record cited domains + whether Raanzlr
  appears; repeat monthly; track the trend (not an absolute rate).

#### 13. Tracking setup (Part 9)

Event layer already exists. To do:

- **GA4 Key Events** (mark in GA4 UI): `contact_form_submit`, `service_form_submit`,
  `cta_click`, `newsletter_subscribe`. Not key: `page_view`, `email_click`,
  `outbound_social_click` (keep as events).
- **Custom dimensions** (event-scoped): `cta_location`, `source_page`, `form_name`,
  `service`, `locale`. Register in GA4 Admin.
- Add `whatsapp_click` to Key Events **only if** a real number is configured
  (`VITE_WHATSAPP_NUMBER`) — currently disabled by design.
- `page_view` already fires per SPA route with `locale`; confirm `page_path` includes the
  locale prefix so US/Canada pages report separately.
- Internal-traffic filter + known-bot exclusion in GA4 (the older audit flagged bot
  pollution).
- No PDF tracking needed (no PDFs). If a media kit PDF is added, wire `file_download`.
- **Monthly SEO report template** (doc): GSC impressions/clicks/avg-position for the NA
  keyword set + top pages + Generative AI report; GA4 Key Events by landing page + channel;
  AI-citation sample delta; index coverage; new/lost backlinks; next-month actions.
- **Lead-source tracking**: `source_page` on every form submit already captures the landing
  context; add first-touch UTM capture to `sessionStorage` and include `first_utm_source`
  as an event param (non-PII).

#### 14. Internal linking map

```
Home
 ├─ AnswerBlock "What does an AI automation company do?" → /services
 ├─ North America line → /markets/united-states, /markets/canada
 └─ featured articles → cluster spine

/services (umbrella "AI Automation") 
 ├─ each service card → /services/<slug>
 └─ "Serving US & Canadian teams" → both NA market pages

/services/<slug>
 ├─ AnswerBlock → relevant GEO answer
 ├─ "for US businesses" / "for Canadian businesses" → NA market pages
 ├─ 2–3 sibling services (existing "others")
 └─ relevant articles (cluster)

/markets/united-states  ↔  /markets/canada  (cross-link "also serving")
 ├─ 6 service links (down)
 ├─ 3–4 industry links
 ├─ US/Canada cluster articles
 └─ /markets hub (up)

/industries/<slug>
 ├─ + Service schema, + FAQPage schema
 ├─ related services
 └─ industry article (cluster 5)

Articles
 ├─ 2+ service links, 1+ market link (rule)
 ├─ sibling cluster articles
 └─ CTA → /contact

Footer: /services, /markets (with US + Canada), /industries, /insights, /about, /contact, /faq
llms.txt / llms-full.txt: all of the above, URLs re-verified
```

#### 15. Redirect map

Only if service slugs change. Proposed:

| Old | New | Type |
|---|---|---|
| `/en/services/web-development` | `/en/services/custom-software` | 301 (if renamed) |
| `/ar/services/web-development` | `/ar/services/custom-software` | 301 |
| `/en/services/crm-integration` | `/en/services/crm-api-integrations` | 301 (if renamed) |
| `/ar/services/crm-integration` | `/ar/services/crm-api-integrations` | 301 |

**Recommendation: keep the existing slugs**, change only display titles / H1 / body. Then
**no redirects needed**. Slug changes are only worth it if the keyword in the slug is
material — here the H1 and title carry the keyword fine. Final call at implementation; if
slugs stay, this section is empty.

Existing `RETIRED_POSTS` redirects unchanged. Test-post + retired-row unpublish (S8) is a
Supabase action, redirects already in `vercel.json`.

#### 16. Post-deploy checklist

1. `pnpm --filter @workspace/raanzlr build` succeeds; prerender log shows +4 routes.
2. `dist/sitemap-en.xml` + `-ar.xml` contain `/markets/united-states`, `/markets/canada`.
3. `curl` each new page → FAQ answer text + AnswerBlock text present in raw HTML.
4. Rich Results Test: `FAQPage` valid on a market page + an industry page (correctness check only).
5. `typecheck` clean.
6. GSC: submit updated sitemap; request indexing for the 4 new URLs + reframed service pages.
7. GA4 Realtime: load a new page, confirm `page_view` with correct `page_path` + `locale`.
8. Confirm `llms.txt` / `llms-full.txt` resolve and every listed URL 200s.
9. Manual: unpublish Supabase test row id 1 + retired rows; confirm they 301.
10. Lighthouse on `/en/markets/united-states` (mobile) — LCP image sized, no CLS from hero.
11. One-week check: GSC impressions appearing for new URLs; no "Discovered – not indexed" pileup.
12. Update memories: `raanzlr-site-seo` (supersede with post-rebuild state), add NA-expansion note.

---

#### 17. Phasing & approval gates

| Phase | Contents | Gate |
|---|---|---|
| 0 | Fix order 1–4: entity string (G1/G5), `faqPageSchema`+`industryServiceSchema` wiring (S3/S4/S9), drop dead props (S11), `<AnswerBlock>` component | **Safe — implement after you say "go on Phase 0"**, each diff explained |
| 1 | US + Canada market records (S1), meta pass (S2), `llms` updates + `/about` editorial (G2/G3), 8 answer blocks | Approve copy |
| 2 | Market section parity (S5), service reframe + Dashboards page (S10), comparison content (A3), industry FAQ headings (A4) | Approve copy + any slug decision |
| 3 | Article program: full 30-row spec + first 5 drafts → `posts.ts` seed + Admin docs | Approve drafts before publish |
| 4 | Image self-hosting + stat sourcing (S6/S7), deliverable docs (E-E-A-T, tracking, reporting, checklists), memory update | Review |

Manual, outside this repo: S8 Supabase unpublish · §12 external profiles · §13 GA4 UI
(Key Events, custom dimensions, filters) · GSC/Bing verification.


---

## Appendix B — Phase 1 US and Canada copy deck

### Phase 1 — US + Canada market pages: proposed copy & structure (v2)

**Status:** IMPLEMENTED 2026-09-10 on branch `seo/north-america-expansion`
(commits `d9…e8e158a`). Saudi wording, invoicing hold, and French wording
applied as the user's final corrections. This file is kept as the copy record.
Original status: For approval — not implemented (v2: corrected positioning).
**Parent spec:** `2026-09-10-raanzlr-na-seo-geo-aeo-design.md`

##### v2 change — positioning correction

Raanzlr has **not** delivered client work in the US, Canada, or Europe. These are
**target markets** for SEO / GEO / AEO. All copy below is written as a **service
offer and capability statement**, never as proven market experience.

**Banned across every string on these pages:**
"works with businesses in [market]" · "our US/Canadian clients" · "we have
helped companies in North America" · "trusted by US businesses" · "serving
clients across [market]" · "we've integrated with [X]" · "track record" ·
"proven in [market]" · any past-tense delivery claim tied to these markets ·
"local office" · "US-based team" · "Canadian office" · "on-site" · "near you" ·
any client / metric / review / award / partner / certification not independently
true.

**Approved framing verbs:** "provides remote … services for" · "offers" · "is
available for" · "builds" · "can integrate with" · "is designed to" · "remote
services for US businesses" · "available for Canadian companies" · "built for
companies targeting operational efficiency". Use-case and scenario copy stays
hedged ("could", "commonly", "can be") and is labelled illustrative.

"North America-focused SEO page" is an internal description only — never
customer-facing copy.

Data shape unchanged from v1: one record appended to `MARKET_DETAILS` in
`src/data/markets.ts` per page; routes / prerender / sitemap auto-derive;
implementation also adds `united-states: "US"` and `canada: "CA"` to
`MARKET_COUNTRY_CODES` in `src/lib/pageSchema.ts`. Hero images:
`public/markets/united-states.webp`, `public/markets/canada.webp` (~1600px,
<150 KB, abstract — no stock people). Flags via `FlagImage` (`US` / `CA`).

Schema per page (Phase 0 wiring already in place): `Service` (`areaServed`
Country US / CA — this is service-availability, which is honest — `provider` →
`#organization`), `FAQPage` (the 6 Q&As), `BreadcrumbList`, `WebPage`. No
`Person`, `Review`, `AggregateRating`, `Offer` with price.

---

#### 1. UNITED STATES — `/en/markets/united-states` · `/ar/markets/united-states`

##### 1.1 Head

| | Value |
|---|---|
| `slug` | `united-states` |
| `code` / `flag` | `US` / 🇺🇸 |
| `<title>` (EN) | `AI Automation & Custom Software Services in the United States \| Raanzlr` |
| `<title>` (AR) | `خدمات أتمتة الذكاء الاصطناعي والبرمجيات المخصصة في الولايات المتحدة \| Raanzlr` |
| `metaDescription` (EN) | `Remote AI automation and custom software services for US businesses, from Raanzlr — a Wyoming-registered software company. AI agents, workflow automation, dashboards, and API integrations.` (trimmed to ≤160 at implementation) |
| `metaDescription` (AR) | `خدمات أتمتة الذكاء الاصطناعي والبرمجيات المخصصة عن بُعد لشركات الولايات المتحدة، من راانزلر، وهي شركة مسجّلة في وايومنغ. وكلاء ذكاء اصطناعي وأتمتة عمليات ولوحات بيانات وتكاملات API.` |
| canonical | `https://raanzlr.com/en/markets/united-states` (+ `/ar/...`), hreflang pair + `x-default` → en |
| `keywords` (editorial only, not rendered) | `AI automation company United States, AI automation services USA, custom software development US, workflow automation US business, AI agents for US companies` |

##### 1.2 `name` / `region` / `cities`

- `name`: `United States`
- `region`: `North America`
- `cities`: `Remote delivery, US-wide`

##### 1.3 H1 + hero

**H1 (`heroTitle`):** `AI Automation & Custom Software for US Businesses`

**`heroDescription` (EN):**
> Raanzlr provides remote AI automation and custom software services for
> companies in the United States — AI agents, workflow automation, dashboards,
> API integrations, and full custom applications. Raanzlr is registered in
> Casper, Wyoming, and every engagement runs remotely: discovery, build,
> launch, and support. No office visit, and no in-house AI hire to make first.

**`heroDescription` (AR):**
> تقدّم راانزلر خدمات أتمتة الذكاء الاصطناعي والبرمجيات المخصصة عن بُعد للشركات
> في الولايات المتحدة — وكلاء ذكاء اصطناعي، وأتمتة سير العمل، ولوحات بيانات،
> وتكاملات API، وتطبيقات مخصصة كاملة. راانزلر مسجّلة في كاسبر بولاية وايومنغ،
> وكل مشروع يُنفَّذ عن بُعد: الاكتشاف، والبناء، والإطلاق، والدعم — دون زيارة مكتب
> أو توظيف فريق ذكاء اصطناعي داخلي أولاً.

##### 1.4 AnswerBlock (top of body, above "Why this market")

`<AnswerBlock as="h2" id="ai-automation-for-us-companies">`

**Question:** `How can US companies use AI automation?`

**Answer (55 words, standalone):**
> US companies use AI automation to remove repetitive work from operations,
> support, and back-office teams: AI agents that answer customers and qualify
> leads, workflows that move data between a CRM, billing, and support tools, and
> dashboards that replace manual reporting. Raanzlr provides these systems as a
> remote service — scoped, built, and supported online.

*Elaboration (children):* two sentences on common starting points — one
high-volume support queue, or one manual reporting process — linking to
`/services/workflow-automation` and `/services/ai-chatbots`.

##### 1.5 `whyTitle` + `whyParagraphs` (EN)

**`whyTitle`:** `When a Remote AI Automation Partner Makes Sense for US Companies`

1. > Hiring in-house for AI and automation is slow and expensive. A mid-level
   > ML or integration engineer in most US metros is a six-figure commitment
   > before a single workflow ships, and the work is often project-shaped rather
   > than a permanent role. A remote partner lets a team get the system built
   > without adding headcount for it.
2. > Most operational friction in a US business is not a missing tool — it is
   > the gaps between the tools already in use. Leads sit in a form nobody
   > routes, finance re-keys the same numbers into a spreadsheet, support
   > answers the same question a hundred times a week. Automation and AI agents
   > close those gaps directly.
3. > Raanzlr's delivery model is built for how a distributed US team already
   > operates: written scope, shared docs, calls scheduled to your time zone,
   > and sprint delivery with a working demo every week. Contracting and
   > invoicing run through the US-registered entity.

##### 1.6 `keyAdvantages` (EN)

- `US-registered company (Casper, Wyoming) — straightforward contracting and invoicing`
- `Calls scheduled to overlap your US business hours`
- `Fixed, written scope per project — no open-ended retainer required`
- `AI agents and interfaces built for English first, with Spanish or Arabic where your customers need it`
- `Designed to integrate with the tools US teams commonly use — HubSpot, Salesforce, Zendesk, Stripe, QuickBooks, Snowflake, and custom APIs`
- `No lock-in: you own the code, the infrastructure, and the accounts`

##### 1.7 `servicesTitle` + `services[]` (EN) — 6 cards, each links to a service page

**`servicesTitle`:** `What Raanzlr Offers US Businesses`

| Card title | Description | Links to |
|---|---|---|
| AI Agents & Chatbots | Agents on your website, WhatsApp, or help desk that answer questions, qualify leads, and book meetings against real availability, then hand off to a person when they should. | `/services/ai-chatbots` |
| Workflow Automation | Business process automation that routes work, moves data between systems, runs approvals, and handles scheduled jobs — built on n8n, Make, or custom pipelines. | `/services/workflow-automation` |
| Custom Software & Web Apps | Full-stack web platforms and internal tools built to your process instead of forcing your process into off-the-shelf software. | `/services/web-development` |
| Dashboards & Data Systems | Operations and executive dashboards, plus the data pipelines behind them, so reporting stops being a manual weekly job. | `/services/web-development` (until the dedicated Dashboards page ships in Phase 2) |
| API & Systems Integration | Connecting your CRM, billing, support, and data warehouse through their APIs so records stay in sync without re-keying. | `/services/crm-integration` |
| Custom AI | Retrieval-augmented generation over your own documents, internal copilots, and bespoke model work where a general chatbot is not enough. | `/services/custom-ai` |

##### 1.8 `industriesTitle` + `industries[]` (EN)

**`industriesTitle`:** `US Industries Raanzlr Builds For`

`Healthcare & practice operations` · `Real estate & property management` ·
`Logistics & supply chain` · `Retail & e-commerce` · `Professional & financial
services` · `SaaS & technology` · `Home & field services` · `Nonprofits &
associations`

*(Plain labels. Where a matching `/industries/<slug>` page exists — healthcare,
logistics, retail, finance — the label links to it.)*

##### 1.9 `useCasesTitle` + `useCasesIntro` + `useCases[]` (EN) — hedged, illustrative

**`useCasesTitle`:** `AI Automation & Custom Software Use Cases for US Companies`
**`useCasesIntro`:** `Common operational problems and the kind of system that addresses each. These are illustrative patterns to show what is possible — not descriptions of delivered projects.`

| # | Title | Description |
|---|---|---|
| 1 | Inbound lead routing | Web-form and inbound-call leads can be captured, enriched, scored, and routed to the right rep in seconds, with follow-up reminders, instead of sitting in an inbox overnight. |
| 2 | Tier-1 customer support | An AI agent can resolve the repeat questions — order status, account changes, policy questions — in English and Spanish, around the clock, and escalate the rest with full context. |
| 3 | Back-office data entry | Invoices, applications, and intake forms can be read, validated, and written into the system of record automatically, with a human review step only for exceptions. |
| 4 | Cross-tool reporting | Data from a CRM, billing, and support tools can be pulled into one dashboard with the numbers leadership actually asks for, refreshed automatically. |
| 5 | Approval workflows | Purchase requests, discounts, contract changes, and time off can move through defined approval steps with a full audit trail and automatic reminders. |
| 6 | Internal knowledge assistant | Staff can ask a question in plain English and get an answer grounded in current policies, SOPs, and product docs, with a source link and uncertain cases routed to an owner. |

##### 1.10 `whyRaanzlrTitle` + `whyRaanzlr[]` (EN)

**`whyRaanzlrTitle`:** `How Raanzlr Works With US Teams`

- `A US-registered company — contracting, invoicing, and payment work the way your finance team expects`
- `A defined remote delivery method: discovery → written scope → sprint build → launch → support window`
- `Weekly working demos, not status decks`
- `Honest build-vs-buy advice — we say when off-the-shelf software is the better call`
- `Documentation and a handover so your team can run and extend what we build`
- `Clear scope limits — we say what we do not do`

##### 1.11 `faqTitle` + `faqs[]` (EN) — answer-first, 40–80 words, mirrored as `FAQPage` schema

**`faqTitle`:** `Common Questions About Raanzlr's US Services`

1. **Does Raanzlr have an office in the United States?**
   > Raanzlr is registered in Casper, Wyoming, and delivers its services to US
   > companies entirely remotely. There is no branch office to visit and no
   > on-site team. Discovery, development, launch, and support all run through
   > calls, shared docs, and sprint demos. When a project genuinely needs an
   > in-person session, that is arranged separately.

2. **How does remote delivery work?**
   > Every engagement follows the same path: a discovery call to understand the
   > problem, a written scope with timeline and price, a build in one-to-two
   > week sprints with a working demo at the end of each, a launch, and a
   > support window afterward. Calls are scheduled to overlap your business
   > hours.

3. **How much does AI automation cost?**
   > It is scoped per project rather than sold as a fixed package. A single
   > automation or AI agent is a smaller engagement; a custom platform or a
   > multi-system integration is larger. After the discovery call you get a
   > written scope with a fixed price and milestones, so there is no open-ended
   > meter running.

4. **How long does a project take?**
   > A focused automation or a single AI agent is typically a few weeks. A
   > custom dashboard or internal tool is usually one to two months. A full
   > platform is longer and is broken into staged releases so you see working
   > software early. Exact timelines come with the written scope.

5. **Can Raanzlr integrate with the tools we already use?**
   > Yes. Raanzlr can connect to CRMs (HubSpot, Salesforce, Pipedrive), support
   > tools (Zendesk, Intercom, Front), billing (Stripe, QuickBooks, Chargebee),
   > data warehouses (Snowflake, BigQuery), and any system with an API. The
   > integration approach is assessed during discovery before scope is fixed.

6. **Who owns the code and the accounts?**
   > You do. Work is delivered into your repositories, your cloud accounts, and
   > your third-party services. There is no proprietary platform you have to
   > keep paying Raanzlr to use, and no lock-in that stops another team from
   > taking over later.

##### 1.12 `ctaTitle` + `ctaDescription` (EN)

**`ctaTitle`:** `Start a Conversation About Your US Operation`
**`ctaDescription`:** `Tell Raanzlr the process that is costing your team the most time. You will get an honest read on whether automation, a custom build, or a smaller fix is the right move — and a written scope if it is a fit.`
CTA button → `/contact` (existing `MagneticButton`).

---

#### 2. CANADA — `/en/markets/canada` · `/ar/markets/canada`

Same structure. Framing is strongest here — no Canadian entity, no Canadian work.

##### 2.1 Head

| | Value |
|---|---|
| `slug` | `canada` |
| `code` / `flag` | `CA` / 🇨🇦 |
| `<title>` (EN) | `AI Automation & Custom Software Services in Canada \| Raanzlr` |
| `<title>` (AR) | `خدمات أتمتة الذكاء الاصطناعي والبرمجيات المخصصة في كندا \| Raanzlr` |
| `metaDescription` (EN) | `Remote AI automation and custom software services available for Canadian businesses. AI agents, workflow automation, dashboards, and API integrations — Raanzlr has no Canadian office and delivers to your team online.` (trimmed ≤160 at implementation) |
| `metaDescription` (AR) | `خدمات أتمتة الذكاء الاصطناعي والبرمجيات المخصصة عن بُعد، متاحة للشركات الكندية. وكلاء ذكاء اصطناعي وأتمتة عمليات ولوحات بيانات وتكاملات API — لا يوجد لراانزلر مكتب في كندا، والتسليم لفريقكم عبر الإنترنت.` |
| canonical | `https://raanzlr.com/en/markets/canada` (+ `/ar/...`), hreflang pair + `x-default` |
| `keywords` (editorial) | `AI automation Canada, custom software development Canada, workflow automation Canadian business, AI agents Canada, AI automation company Canada` |

##### 2.2 `name` / `region` / `cities`

- `name`: `Canada`
- `region`: `North America`
- `cities`: `Remote delivery, Canada-wide`

##### 2.3 H1 + hero

**H1 (`heroTitle`):** `AI Automation & Custom Software for Canadian Businesses`

**`heroDescription` (EN):**
> Raanzlr's remote AI automation and custom software services are available for
> Canadian companies — AI agents, workflow automation, dashboards, API
> integrations, and custom applications. Raanzlr is a US-registered company with
> no office in Canada; it delivers to Canadian teams entirely online, through
> remote discovery, development, launch, and support, in English and Arabic.

**`heroDescription` (AR):**
> خدمات راانزلر لأتمتة الذكاء الاصطناعي والبرمجيات المخصصة عن بُعد متاحة للشركات
> الكندية — وكلاء ذكاء اصطناعي، وأتمتة سير العمل، ولوحات بيانات، وتكاملات API،
> وتطبيقات مخصصة. راانزلر شركة مسجّلة في الولايات المتحدة وليس لها مكتب في كندا،
> والتسليم للفرق الكندية بالكامل عبر الإنترنت — اكتشافاً وبناءً وإطلاقاً ودعماً،
> بالإنجليزية والعربية.

##### 2.4 AnswerBlock (top of body)

`<AnswerBlock as="h2" id="ai-automation-for-canadian-companies">`

**Question:** `How can Canadian companies use AI automation?`

**Answer (58 words):**
> Canadian companies use AI automation to cut manual work in operations,
> customer support, and finance: AI agents that handle routine customer
> questions, workflows that connect a CRM, billing, and support tools, and
> dashboards that replace spreadsheet reporting. Raanzlr offers these systems as
> a remote service for Canadian teams, with data-handling choices — including
> where data is stored — decided with the client.

*Elaboration:* one sentence that data residency and PIPEDA-aware handling are
engineering decisions made with the client and their advisers, not legal advice
(mirrors the existing Europe page's privacy phrasing). Links to
`/services/workflow-automation`, `/services/crm-integration`.

##### 2.5 `whyTitle` + `whyParagraphs` (EN)

**`whyTitle`:** `When a Remote Software Partner Makes Sense for Canadian Companies`

1. > Senior developer and ML hiring in Toronto, Vancouver, and Montreal is
   > competitive and expensive, and much of the automation work a growing
   > company needs is project-shaped rather than a permanent role. A remote
   > partner delivers the system without adding a hire that has to be kept busy
   > afterward.
2. > The highest-value automation in most businesses sits in the gaps between
   > existing systems — a CRM that does not talk to the billing tool, a support
   > inbox handling the same questions all day, finance rebuilding the same
   > report every week. Those are direct, well-bounded automation projects.
3. > Raanzlr's delivery model is built for how a distributed Canadian team
   > already operates: written scope, shared documents, calls in your time zone,
   > and sprint delivery. Data-handling decisions, including storage location
   > and access, are made with you during discovery rather than assumed.

##### 2.6 `keyAdvantages` (EN)

- `Remote delivery across all Canadian time zones — calls scheduled to your working hours`
- `Data-handling and storage-location decisions made with you, with PIPEDA-aware technical controls (not legal advice)`
- `Fixed, written scope per project`
- `English-first AI agents and interfaces, with French or Arabic where your users need it` *(French: Raanzlr builds the bilingual system and integrates French content and review that the client provides — it does not claim in-house French authoring)*
- `Designed to integrate with the tools Canadian teams commonly use — Salesforce, HubSpot, Zendesk, Stripe, QuickBooks, and custom APIs`
- `No lock-in: you own the code, infrastructure, and accounts`

##### 2.7 `servicesTitle` + `services[]` (EN)

**`servicesTitle`:** `What Raanzlr Offers Canadian Businesses`
Same six cards as §1.7, wording adjusted ("Canadian teams" / "your users"),
same service-page links.

##### 2.8 `industriesTitle` + `industries[]` (EN)

**`industriesTitle`:** `Canadian Industries Raanzlr Builds For`
`Healthcare & clinic operations` · `Real estate & property management` ·
`Logistics & distribution` · `Retail & e-commerce` · `Professional & financial
services` · `SaaS & technology` · `Construction & trades` · `Nonprofits &
member organizations` (link the four with matching `/industries` pages).

##### 2.9 `useCasesTitle` + `useCasesIntro` + `useCases[]` (EN)

**`useCasesTitle`:** `AI Automation & Custom Software Use Cases for Canadian Companies`
**`useCasesIntro`:** `Common operational problems and the kind of system that addresses each. Illustrative patterns showing what is possible — not delivered projects.`

Same six patterns as §1.9, localised: bilingual (English/French) tier-1 support
in #2 instead of English/Spanish; #4 notes the dashboard can flag where source
data is stored; otherwise identical.

##### 2.10 `whyRaanzlrTitle` + `whyRaanzlr[]` (EN)

**`whyRaanzlrTitle`:** `How Raanzlr Works With Canadian Teams`

- `Clear about what it is: a US-registered company delivering to Canada remotely, no Canadian office`
- `Data-handling and residency decided with you during discovery`
- `A defined remote delivery method: discovery → written scope → sprint build → launch → support`
- `Weekly working demos`
- `Honest build-vs-buy advice`
- `Full documentation and handover; you own everything`

##### 2.11 `faqTitle` + `faqs[]` (EN)

**`faqTitle`:** `Common Questions About Raanzlr's Canada Services`

1. **Does Raanzlr have an office in Canada?**
   > No. Raanzlr is registered in Casper, Wyoming, USA, and has no office or
   > staff in Canada. Its services are delivered to Canadian companies entirely
   > remotely — discovery, development, launch, and support run through
   > scheduled calls, shared documents, and sprint demos. Contracts are with the
   > US entity.

2. **Where would our data be stored?**
   > That is decided with you during discovery. Raanzlr can deploy to a Canadian
   > region of a major cloud provider, keep data within specific systems, and
   > build PIPEDA-aware access controls. Raanzlr provides the technical
   > implementation; your legal or privacy advisers determine compliance.

3. **How does remote delivery work across Canadian time zones?**
   > Calls are scheduled to your working hours, whether the team is in Halifax
   > or Vancouver. Between calls, work happens in shared documents and a project
   > tracker, with a working demo at the end of each one-to-two week sprint, so
   > progress is visible without a standing meeting.

4. **How are projects priced and invoiced?**
   > Each project is scoped individually and quoted with a fixed price and
   > milestones after the discovery call. Payment terms are set out in that
   > written scope. *(Internal note: the Canada invoicing model — entity,
   > currency — requires confirmation from management/accounting before any
   > invoicing detail goes in public copy.)*

5. **Can Raanzlr build bilingual (English/French) systems?**
   > Yes. Interfaces, content structure, and AI agents can be built to operate
   > in both English and French. Raanzlr builds the bilingual system and
   > integrates French content and review that you provide; it does not offer
   > in-house French copywriting or native French content services.

6. **Who owns the code and accounts?**
   > You do. Everything is delivered into your repositories, your cloud
   > accounts, and your third-party services. There is no Raanzlr platform you
   > have to keep paying for, and another team can take over the work at any
   > time.

##### 2.12 `ctaTitle` + `ctaDescription` (EN)

**`ctaTitle`:** `Start a Conversation About Your Canadian Operation`
**`ctaDescription`:** `Tell Raanzlr which process is costing your team the most time. You will get an honest assessment of whether automation, a custom build, or a smaller fix fits — plus a written scope and data-handling plan if it does.`
CTA → `/contact`.

---

#### 3. Arabic copy — scope for this round

Provided above in full for both pages: `<title>`, `metaDescription`, H1, and
hero. To be authored at implementation to match approved English (authored
Arabic, not machine translation; register matching existing `ar` market
records; RTL punctuation): `whyParagraphs`, `keyAdvantages`, `services`,
`industries`, `useCases`, `whyRaanzlr`, all six `faqs`, `ctaTitle`,
`ctaDescription`, `region`, `cities`, and the AnswerBlock Q&A. Sent back for a
quick check before commit rather than written now and revised.

Requesting approval on: **English copy + structure + Arabic head/hero framing.**

---

#### 4. AnswerBlock placement plan (Phase 1)

`<AnswerBlock>` renders a heading + a standalone 40–80-word first paragraph,
server-side, no accordion.

| Page | Location | Question | Answer source |
|---|---|---|---|
| `/markets/united-states` | Top of body, before "Why this market" | How can US companies use AI automation? | §1.4 |
| `/markets/canada` | Same | How can Canadian companies use AI automation? | §2.4 |
| `/services` (hub) | Below hero, above the service grid | What is AI automation? | GEO answer, drafted at implementation (40–80 w, capability-framed) |
| `/services` (hub) | After the above | What does an AI automation company do? | GEO answer |
| Home | One block, after the hero/console section, before the services teaser | What is the difference between AI automation and custom software? | GEO answer (distinct text, so no placement shares a paragraph) |

**Duplicate-content guard:** each AnswerBlock answer string lives on exactly one
URL. Where two pages cover the same question, the second links to the first
instead of repeating the paragraph.

Not in Phase 1: the remaining GEO answers (cost, timeline, when-to-use-agents,
how-to-choose) — those land on service pages and articles in Phase 2/3.

---

#### 5. `llms.txt` / `llms-full.txt` additions (Phase 1)

**`llms.txt`** — replace the two Phase-0 plain lines
```
- United States — remote services available
- Canada — available for Canadian companies; no Canadian office
```
with linked entries at the top of the `## Markets (remote delivery)` list:
```
- United States — https://raanzlr.com/en/markets/united-states
- Canada — https://raanzlr.com/en/markets/canada
```

**`llms-full.txt`** — in `## Markets`, after the existing sentence, add:
```
United States — https://raanzlr.com/en/markets/united-states
Remote AI automation and custom software services for US companies. AI agents,
workflow automation, dashboards, API integrations, custom applications.
Delivered online from the Wyoming-registered entity; no US branch office.

Canada — https://raanzlr.com/en/markets/canada
The same services, available for Canadian companies and delivered entirely
online. Raanzlr has no Canadian office; data-handling and storage-location
decisions are made with the client.
```
Also add the two AnswerBlock Q&As (§1.4 / §2.4) to the `## Frequently asked
questions` area of `llms-full.txt`, verbatim.

No new claims — every sentence is on the page.

---

#### 6. Internal-linking plan (Phase 1)

**Into the new pages:**

| From | Link | Anchor text |
|---|---|---|
| `/markets` hub | grid card for each | "United States" / "Canada" (auto from `MARKET_DETAILS`) |
| Footer | markets column | add "United States", "Canada" |
| Home | new line in the reach/markets area | "Remote services for businesses in the United States and Canada" → `/markets/united-states`, `/markets/canada` |
| `/about` | where markets are listed | add both, phrased as focus markets |
| `/services/<slug>` pages | body / CTA area | "Remote services for US businesses" → `/markets/united-states`; "Available for Canadian companies" → `/markets/canada` (added in the Phase 2 service reframe; Phase 1 only guarantees the target exists) |
| `llms.txt`, `llms-full.txt` | §5 | — |

**Out of the new pages:**

- 6 service cards → `/services/<slug>` (§1.7).
- Industry labels with a matching page → `/industries/<slug>` (healthcare, logistics, retail, finance).
- AnswerBlock elaboration → 2 service pages.
- "View all services" → `/services`; "Explore industries" → `/industries`.
- US page ↔ Canada page cross-link ("Also available for Canadian businesses" / "Also available for US businesses").
- CTA → `/contact`.
- Breadcrumb (automatic): Home › Markets › United States / Canada.

---

#### 7. What implementation will touch (reference — not this round)

- `src/data/markets.ts` — two records appended (~200 lines each incl. AR).
- `src/lib/pageSchema.ts` — `MARKET_COUNTRY_CODES` gets `united-states`, `canada`.
- `src/pages/MarketDetail.tsx` — render an AnswerBlock when the record defines one.
- `src/pages/Services.tsx`, `src/pages/Home.tsx` — AnswerBlock placement per §4.
- `src/components/Footer.tsx`, `src/pages/About.tsx`, `src/pages/Home.tsx` — links per §6.
- `public/llms.txt`, `public/llms-full.txt` — §5.
- `public/markets/united-states.webp`, `public/markets/canada.webp` — new assets.
- No routes, no redirects, no slug changes. Prerender +4 HTML files, sitemap +2 URLs/locale.

---

#### 8. GCC + existing pages — "no implied client work" pass (added to Phase 1)

**Rule (applies site-wide):** with no verified project, no named client, no
approved proof, and no confirmed metric, every claim is phrased as **capability,
method, or target-market service** — never past experience. Same standard now
covers the GCC market pages, service pages, and About/translations copy, not
only US/Canada.

##### 8.1 `src/data/markets.ts` — exact edits (EN; AR equivalents at implementation)

| Location | Current | Proposed |
|---|---|---|
| `faqTitle` on Saudi, UAE, Qatar, Kuwait, Bahrain, Oman, Syria, Türkiye, Europe (9×) | `"Common Questions from Saudi Clients"` / `"Questions from Qatar Clients"` etc. | `"Common Questions About AI Automation in Saudi Arabia"` / `"…in Qatar"` etc. |
| Saudi FAQ answer (`markets.ts:112`) | `"Yes, absolutely. Most of our Saudi clients are in Riyadh, Jeddah, and Dammam, and we work entirely remotely…"` | `"Yes. Raanzlr works with businesses across Saudi Arabia entirely remotely — through discovery calls, technical planning, iterative development, and launch support — and schedules calls to overlap Riyadh business hours."` |
| UAE FAQ answer (`markets.ts:392`) | `"Yes, we've integrated with Network International (N-Genius), Tabby (BNPL), Spotii, Tamara, and major card processors. We can connect…"` | `"Raanzlr can support integrations with payment, CRM, and business platforms — including local UAE gateways and international processors — where the platform exposes an API. Feasibility and scope are confirmed during discovery."` |
| UAE `keyAdvantages` item | `"Integration with regional platforms (Network International, Tabby, Noon)"` | `"Can integrate with regional and international payment, CRM, and commerce platforms via their APIs"` |
| UAE `useCasesIntro` (`markets.ts:340`) | `"Here's how UAE businesses are using AI and automation to compete globally:"` | `"Common ways UAE businesses can use AI and automation, shown as illustrative patterns:"` |
| UAE `useCasesTitle` | `"How UAE Companies Could Use AI & Automation"` | `"How UAE Companies Can Use AI Automation"` |
| Any other market `useCasesTitle` / intro with "are using" / "our clients" | — | same treatment — "can use", "illustrative patterns" |
| `ctaTitle` "Ready to Build Intelligent Systems for Your UAE Business?" etc. | (no client claim — keep) | keep |
| Full sweep | grep each market record for `our clients`, `we've`, `we have integrated`, `most of our`, `helped`, `trusted`, city-level client claims | rewrite to capability/method |

##### 8.2 `src/data/serviceFaqs.ts` / `src/data/servicesRich.ts`

Already mostly compliant — integration answers are present-tense capability
(`serviceFaqs.ts:168`: *"We integrate through published APIs, which covers the
mainstream platforms — HubSpot, Salesforce, Zoho…"*). Keep that phrasing as the
standard. `stack:` arrays list tools used, not clients — keep. Action: grep the
full files for `we've` / `our clients` / `previously` / `in production for` and
fix any hit; add none.

##### 8.3 `src/lib/translations.ts`

| Location | Current | Proposed |
|---|---|---|
| `sub` (`:211`) | `"…help our clients improve performance, simplify operations, and support their business growth."` | `"…help teams improve performance, simplify operations, and support business growth."` |
| `hqTitle` / `hqDesc` (`:222`) — says "headquarters in the United States" | (Wyoming registration is real, but "headquarters" overstates a registered-agent address) | `hqTitle`: `"Raanzlr is a US-registered company, working remotely."` · `hqDesc`: reword to "registered in Casper, Wyoming; every engagement delivered remotely through online discovery, planning, development, launch, and support." |
| any other `our clients` / `we helped` | — | → "teams" / capability phrasing |

##### 8.4 `src/data/cases.ts` (Solution Scenarios)

Already labelled illustrative (`llms.txt` + page copy). Action: confirm no
scenario text reads as a delivered project ("we built for a client who…"). Fix
wording to "In this scenario…" where needed. No scenario becomes a case study.

##### 8.5 Scope note

8.1–8.4 are **copy-only edits to existing data files** — no structural change,
no new pages, no deletions. They ship in the same Phase 1 branch as the US/Canada
pages. AR strings updated to match at implementation.

---

#### 9. Meta rewrite (`translations.ts` `seo:` block) — Phase 1

Per parent spec §5. Applies the no-implied-work rule: titles/descriptions name
the **service and target markets**, never claim existing customers.

| Key | New EN title (≤60) | New EN description (≤160) |
|---|---|---|
| `home` | `Raanzlr — AI Automation & Custom Software Company` | `Raanzlr builds AI agents, workflow automation, dashboards, and custom software — delivered remotely. Focused on the US, Canada, GCC, Türkiye, and Europe.` |
| `services` | `AI Automation & Custom Software Services — Raanzlr` | `AI agents, workflow automation, custom software, web apps, dashboards, and API integrations — remote services for businesses targeting operational efficiency.` |
| `markets` | `Markets We Serve — US, Canada, GCC & Europe — Raanzlr` | `Raanzlr offers remote AI automation and custom software services, with a focus on the United States, Canada, the GCC, Türkiye, and Europe.` |
| `industries` | keep; append "— remote delivery" if room | minor: "for teams targeting operational efficiency" |
| `caseStudies` | keep (Solution Scenarios framing is correct) | keep |
| `about` | `About Raanzlr — AI Automation & Custom Software Company` | "Wyoming-registered, founded 2023, remote delivery. How Raanzlr scopes and builds AI automation and custom software." |

AR mirrors, authored.




---

## Appendix C — Site rebuild design spec

### Raanzlr Website Rebuild — Design Spec

**Status:** Approved 2026-08-23, with SEO/AEO corrections applied.
**Visual reference:** https://claude.ai/code/artifact/6d6e140b-3b7b-4e1a-a63f-92faa547a612
(rendered in the proposed palette and typography — it is the specimen, not a description of one)
**Project root:** `/Users/odi-d/Desktop/MyCompany/Rannzlr/raanzlr-website`
**App:** `artifacts/raanzlr` (pnpm workspace package `@workspace/raanzlr`)

---

#### 1. Decision summary

| Question | Decision |
|---|---|
| Real proof | Real engagements exist; anonymised descriptor + real numbers, supplied by client |
| Conversion goal | Qualified project brief form (existing Supabase endpoint) |
| SEO surface | Keep all 91 routes/locale, raise quality. No deletions, no redirects |
| Rebuild depth | Keep stack. Rebuild tokens, components, composition, copy |
| Identity | Keep navy + cyan + chevron. Change the grammar it is applied in |

#### 2. Core diagnosis

The identity is sound; its application is the problem. Navy-and-cyan is currently spoken
in a **sci-fi HUD** accent — 5 particle fields on the homepage, a radar hero displaying the
company's own logo, conic-gradient sweeps, `.glow-text`, a custom cursor, and a typewriter
`h1` that is unreadable mid-word at both 1440 and 390. The dark theme is
`--background: 0 0% 2%` — pure neutral black with the brand navy discarded entirely, which
is why the site reads as generic-dark rather than as Raanzlr.

Underneath, the engineering is strong and stays: per-locale prerendering with build gates,
`routes.ts` as single source of truth, Supabase + Turnstile forms, correct canonicals and
hreflang.

#### 3. Visual direction — engineering documentation

Replacement grammar drawn from the artefacts Raanzlr actually produces: system schematics,
node graphs, spec sheets, integration diagrams. Hairlines that mark real boundaries.
Monospace on real data. Cyan demoted from ambient wash to **signal** — roughly five uses
per page (primary action, active nav, live wire, key metric, focus ring).

**Signature element:** hand-authored SVG system schematics, one per service. Node = rounded
rect; wire = 1px path; live path = cyan, animated once; human handoff = dashed return.
Replaces 9 generic lucide icons and all Unsplash stock photography.

**The risk:** the hero has no image, no gradient, no orb, no particles. One static headline,
one proof line, the primary action, one self-drawing schematic.

#### 4. Colour

Dark is primary. Light is rebuilt as real drafting paper, not an inversion.

| Token | Dark | Light | Role |
|---|---|---|---|
| `--ink-900` | `#060B14` | `#F4F7FB` | Page ground. Navy-biased, never neutral black |
| `--ink-800` | `#0A1220` | `#FFFFFF` | Cards, panels, header |
| `--ink-700` | `#0E1929` | `#F7FAFD` | Inset surface |
| `--ink-600` | `#12203A` | `#E4ECF5` | Raised / active surface |
| `--line` | `#1B2E4D` | `#CBD9E8` | Hairline |
| `--line-strong` | `#24385C` | `#A9BFD6` | Emphasised hairline |
| `--signal` | `#27D8FF` | `#0A7EA0` | The one accent |
| `--signal-ink` | `#06121A` | `#FFFFFF` | Text on signal |
| `--warn` | `#FFB020` | `#9A6100` | Reserved. Status only |
| `--tx-1` | `#E6EEF6` | `#0B1626` | Primary text |
| `--tx-2` | `#9DB0C6` | `#3D5670` | Secondary text |
| `--tx-3` | `#6F85A0` | `#5F7591` | Muted labels |

Rules: cyan is a budget not a texture; depth comes from hairlines not shadows; amber never
becomes a second accent.

#### 5. Typography

**IBM Plex superfamily** — three roles, two scripts, one designed relationship. Chosen
because it is the one technical family with a real Arabic sibling; today Space Grotesk vs
Tajawal makes the two locales read as two different companies. Retires Space Grotesk and
Manrope.

- **IBM Plex Sans** — display + body (Latin)
- **IBM Plex Sans Arabic** — display + body (Arabic)
- **IBM Plex Mono** — data, labels, metrics, schematic nodes (existing brand equity)

Scale (fluid): display `clamp(2.25rem, 1.4rem + 3.6vw, 4rem)` / 1.05 / −0.022em / 600 ·
h2 `clamp(1.75rem, 1.3rem + 1.9vw, 2.5rem)` / 1.12 / −0.016em / 600 · h3 1.25rem / 1.3 /
600 · body 1rem→1.0625rem / 1.65 · label mono 0.6875rem / 0.14em / uppercase.

**Hard rules:** sentence case everywhere including display; negative tracking is Latin-only
(it breaks Arabic shaping); Arabic takes +0.08 line-height at every step and never takes
uppercase; mono labels data, never decorates (the `// services` pseudo-comment eyebrows go).

#### 6. Information architecture

Nav: **Work · Services ▾ · About · Insights · [Start a project]**. One mega-panel under
Services makes all 26 service/industry/market leaf pages one click deep.

91 routes per locale preserved exactly. One route added: `/process`. `/case-studies` keeps
its URL — 12 indexed URLs sit on it; only the nav label ("Work") and the on-page framing
change.

#### 7. Homepage — 9 sections

1. Hero — static headline, proof line, primary action, self-drawing schematic
2. Proof strip — anonymised descriptors + real numbers
3. What we build — 9 services in 3 clusters, each with its schematic
4. How an engagement runs — 4 steps (numbers legitimate: it is a real sequence)
5. Selected work — 3 real anonymised engagements
6. Scenarios — the 6 `cases.ts` entries, relabelled, placed below real work
7. Where we work — markets + industries strip, local systems named
8. FAQ — 5 questions, readable, each linking deeper
9. Start a project — the brief form inline

#### 8. Search and discoverability — corrected position

**Highest value:** conversion tracking (`trackEvent` has zero call sites, so GA4 key events
are structurally zero), then surfacing the 173 buried Q&As as readable linked content, then
real internal linking between the 26 leaf pages, then depth on the 4 thin markets.

**Structured data is entity clarification, never a count to raise.** Added only where it
truthfully describes visible content.

- `Organization`, `WebSite`, `BreadcrumbList` — already correct, keep
- `Service` + `areaServed` on market/industry pages — truthful description of the page, not
  a rich-result play; no rich result exists for it
- `FAQPage` — **optional semantic markup only**. Google deprecated FAQ rich results in
  May 2026 and removed the feature in June 2026. It earns nothing in Google Search. It may
  be emitted where it accurately describes visible Q&A content and may help non-Google
  consumers. **No work is sequenced on the assumption that it delivers ranking, rich
  results, or AI citation.** Q&A content is not "invisible" without it.
- `llms.txt` / WebMCP — fixed for internal correctness (they list 8 services; the site ships
  9). **Not a Google Search factor** — Google's stated position is that `llms.txt` neither
  helps nor harms Search visibility.
- Case studies: `BlogPosting` → `Article`; scenarios lose every signal implying delivered
  work. No `AggregateRating`, no `Review`.
- **Not added:** `HowTo`, `Product`, `JobPosting`, or any type describing something the page
  does not show.

**No content is rewritten to satisfy an assumed LLM chunking or citation formula.** The work
is: unique non-commodity content (the named local systems — Mada, STC Pay, SAMA, CITC — and
the named integration stack), direct useful answers where a question is genuinely asked,
real proof, business specifics, crawlability, internal linking, and the already-strong
technical foundation.

#### 9. Proof integrity — binding rule

Placeholders exist **only** as visibly marked internal development placeholders, rendered
with an obvious dev-only treatment and carrying the literal token `PLACEHOLDER`.

**No fabricated statistic, project result, client claim, rating, or metric may enter a
production build.** A build gate fails on any remaining placeholder token.

Required from client before launch: three engagements — sector and city, what was connected,
one measured outcome, and how far the anonymising goes.

#### 10. Brand separation — non-negotiable

Raanzlr must not borrow the AldalatiUX design language. Specifically forbidden: single
orange accent, warm near-black grounds, square-edge/zero-radius systems, oversized condensed
uppercase display type. Raanzlr differentiates through structure, schematics, and real
product visuals — never by adopting the personal brand's palette or type.

#### 11. Open flags

1. Proof figures do not exist in the project yet — blocks launch, not start
2. `foundingDate: 2023`, Casper WY HQ, and the Saudi page's "we've seen firsthand" claim are
   unverifiable from here; carried forward unchanged unless the client says otherwise
3. FAQ promises a free 30–45 min discovery call; nothing books one and `/book-a-call`
   redirects to contact. Either add a booking path or reword
4. `@raanzlr` on X and the LinkedIn company URL are published in schema; neither verified
5. No Search Console access — thin-market prioritisation is by inspection, not impressions


---

## Appendix D — Blog SEO / GEO / AEO content package

### Blog / Insights SEO-GEO-AEO improvement — content package

**Status:** Code implemented on branch `seo/blog-geo-aeo-pass`. Content below (Parts 1, 3–6)
is a package for the Admin panel — article bodies live in Supabase, not the repo, so none
of it is applied automatically. Every real slug below was checked against `src/lib/translations.ts`
`services.items` and `src/data/markets.ts` before being used — see the slug-correction note
in Part 3.

---

#### Part 1 — Supabase cleanup list

22 of the 25 rows in `RETIRED_POSTS` (`src/lib/posts.ts`) are still `published:true` in
Supabase. The app filters them out of routes/sitemap/prerender already, but the raw table —
reachable via the public anon key — still serves them as published. All 22 have a 301 already
live in `vercel.json`, so unpublishing is safe: no inbound link loses its destination.

| id | slug | title | replacement slug | action |
|---|---|---|---|---|
| 1 | `ai-automation-gcc-2026-test` | How GCC Businesses Are Automating with AI in 2026 | — (301 → `/insights`) | Unpublish |
| 20 | `arabic-first-ai-agents-gcc-customer-service-20260630` | Arabic-First AI Agents Revolutionizing GCC Customer Service | `arabic-ai-agents-gcc-ecommerce-customer-service-20260702` | Unpublish |
| 21 | `saudi-arabia-ai-agent-sandboxes-enterprise-workflows-20260630` | Saudi Arabia's AI Agent Sandboxes: Transforming Enterprise Workflows | `saudi-ai-sandboxes-vision-2030-enterprise-impact-20260625` | Unpublish |
| 22 | `rise-arabic-first-ai-copilots-gcc-post-2026-20260630` | Rise of Arabic-First AI Copilots for GCC Enterprises Post-2026 | `saudi-arabia-arabic-first-ai-agents-services-20260701` | Unpublish |
| 24 | `arabic-ai-copilots-gcc-government-services-20260701` | Arabic-First AI Copilots Revolutionizing GCC Government Services | `saudi-2026-ai-agents-government-services-20260706` | Unpublish |
| 27 | `saudi-ai-startups-revolutionizing-energy-smart-cities-20260701` | Saudi Arabia's AI-native Startups Revolutionizing Energy and Smart Cities | `saudi-arabia-vertical-ai-agents-logistics-energy-retail-20260701` | Unpublish |
| 28 | `saudi-arabia-generative-ai-cloud-llm-infrastructure-gcc-20260701` | Saudi Arabia's Generative AI Cloud Zones: Reshaping GCC Enterprise AI | `saudi-arabias-arabic-first-genai-cloud-gcc-enterprises-20260702` | Unpublish |
| 29 | `rise-vertical-ai-saas-gulf-family-businesses-20260702` | Rise of Vertical AI SaaS for Gulf Family Businesses | `saudi-arabia-vertical-ai-agents-logistics-energy-retail-20260701` | Unpublish |
| 31 | `saudi-arabias-arabic-first-ai-agents-government-enterprises-20260702` | Saudi Arabia's New Wave of Arabic-First AI Agents for Services | `saudi-2026-ai-agents-government-services-20260706` | Unpublish |
| 32 | `saudi-arabia-arabic-first-ai-agents-government-enterprises-20260702` | Saudi Arabia's Arabic-First AI Agents: A New Digital Era | `saudi-arabia-arabic-first-ai-agents-services-20260701` | Unpublish |
| 34 | `saudi-arabia-arabic-first-llms-vision-2030-20260702` | Saudi Arabia's Strategic Push for Arabic-First Enterprise LLMs Post Vision 2030 | `saudi-arabias-specialized-arabic-ai-models-20260701` | Unpublish |
| 35 | `saudi-arabia-genai-cloud-enterprise-transformation-20260703` | Unlocking Digital Transformation with Saudi Arabia's New GenAI Cloud | `saudi-arabias-arabic-first-genai-cloud-gcc-enterprises-20260702` | Unpublish |
| 36 | `saudi-arabia-ai-data-governance-frameworks-20260703` | Saudi Arabia's New Unified AI & Data Governance Frameworks | `saudi-arabia-new-ai-policies-genai-2026-2027-20260703` | Unpublish |
| 37 | `saudi-new-ai-cloud-zones-gcc-enterprise-impact-20260703` | Saudi Arabia's New AI Cloud Zones and GCC Enterprise Impact | `saudi-arabias-arabic-first-genai-cloud-gcc-enterprises-20260702` | Unpublish |
| 38 | `saudi-arabia-ai-agent-startups-local-data-innovation-20260703` | Saudi Arabia's AI Agent Startups: Harnessing Local Data for Innovation | `saudi-arabias-specialized-arabic-ai-models-20260701` | Unpublish |
| 39 | `saudi-arabia-national-ai-agent-platforms-enterprise-20260703` | Saudi Arabia's National AI Platforms Transforming Enterprise Automation | `saudi-arabia-new-ai-policies-genai-2026-2027-20260703` | Unpublish |
| 45 | `saudi-arabia-ai-agents-logistics-industrial-supply-20260704` | Saudi Arabia's New Wave of AI Agents for Logistics and Industry | `saudi-arabia-vertical-ai-agents-logistics-energy-retail-20260701` | Unpublish |
| 50 | `arabic-first-ai-sales-agents-gcc-ecommerce-whatsapp-20260705` | Arabic-first AI Sales Agents Transforming GCC E-commerce | `arabic-ai-agents-gcc-ecommerce-customer-service-20260702` | Unpublish |
| 51 | `arabic-ai-agents-gcc-financial-services-20260705` | Arabic-first AI Agents Revolutionizing GCC Financial Services | `saudi-arabia-vertical-ai-agents-logistics-energy-retail-20260701` | Unpublish |
| 52 | `saudi-arabia-arabic-first-generative-ai-startups-20260705` | Saudi Arabia's New Wave of Arabic-First Generative AI Startups | `saudi-arabias-specialized-arabic-ai-models-20260701` | Unpublish |
| 53 | `arabic-first-ai-copilots-gcc-government-services-20260705` | Arabic-first AI Copilots Transforming GCC Government Services | `saudi-2026-ai-agents-government-services-20260706` | Unpublish |
| 55 | `gcc-governments-arabic-ai-assistants-20260706` | GCC Governments Embrace Arabic-First AI Assistants for Citizen Services | `saudi-2026-ai-agents-government-services-20260706` | Unpublish |

Not in Supabase's `published:true` set anymore (3 of the 25 `RETIRED_POSTS` entries — already
handled, no action): confirm at your convenience, not urgent.

**Action:** Admin panel → Insights → set `published = false` on the 22 ids above. No code
change; nothing in this repo does this for you.

---

#### Part 2 — Technical safe fixes (implemented, `seo/blog-geo-aeo-pass`)

Confirmed in the report at the end. Summary: `Post` gains optional `faq` / `answerBlock`;
`InsightPost` renders them and emits `FAQPage` schema when present; `Insights` hub emits
`ItemList`. All backward-compatible — verified against the current 28 live posts (none of
which carry the new fields) with a clean build.

---

#### Part 3 — Commercial connection pass: 19 long articles

##### Slug correction (read before using this table)

Your suggested targets don't all exist yet. Corrected mapping used throughout:

| You suggested | Real page | Note |
|---|---|---|
| `/services/ai-automation` | `/services` (hub) | No umbrella "AI automation" page exists; the hub intro carries that framing |
| `/services/ai-agents` | `/services/ai-chatbots` | The AI-agents page's actual slug |
| `/services/workflow-automation` | `/services/workflow-automation` | Exists as given |
| `/services/custom-software-development` | `/services/web-development` | Closest existing page |
| `/services/api-integrations` | `/services/crm-integration` | Closest existing page (covers API/CRM integration) |
| `/services/dashboards-data-systems` | *(none yet — Phase 2)* | Not built; skipped below, or points at `/services/web-development` where a dashboard is the specific example |
| `/markets/united-arab-emirates` | `/markets/uae` | Real slug is `uae` |
| `/markets/united-states`, `/markets/canada`, `/markets/saudi-arabia` | as given | Correct |

##### Per-article plan

Each row: 1–2 insertion points, anchor text, target, and where in the article it fits
editorially (never forced — a couple of articles get one link, not two, because a second
would be a stretch).

| Article | Insertion | Target |
|---|---|---|
| `gulf-healthcare-ai-clinical-llm-virtual-twins-20260716` | Where the piece discusses clinical LLMs handling patient-facing tasks — link "AI agents built for a specific workflow" | `/services/ai-chatbots` |
| `ai-weather-forecasting-models-gulf-extremes-20260716` | Where it discusses combining model output with operational alerting — link "routing model output into a business workflow" | `/services/workflow-automation` |
| `ai-layoffs-fourth-month-gulf-reskilling-bet-20260716` | Where it discusses roles shifting from manual work to oversight — link "the operational tasks AI automation actually replaces" | `/services` |
| `ai-agents-autonomous-cyberattacks-gulf-frontline-20260712` | Where it discusses agent oversight/guardrails — link "how agent handoff to a human is designed" | `/services/ai-chatbots` |
| `us-eases-ai-chip-export-controls-uae-stargate-20260711` | Where UAE/US compute access is discussed — two links: one for each market | `/markets/united-states`, `/markets/uae` |
| `humanoid-robots-ipo-gulf-capital-bet-20260711` | Where the piece contrasts robotics capital with software-only automation — link "software automation that ships this quarter, not this decade" | `/services/workflow-automation` |
| `grok-4-5-hallucination-gulf-sovereign-ai-trust-20260711` | Where it discusses hallucination risk in production use — link "how a production AI agent is scoped to avoid this" | `/services/ai-chatbots` |
| `ai-power-water-bottleneck-gulf-nuclear-20260711` | Where it discusses compute cost pressure — link "lighter-weight automation that doesn't need frontier-model scale" | `/services/workflow-automation` |
| `vibe-coding-app-store-flood-apple-gulf-founders-20260711` | Where it discusses the gap between a quick AI-generated prototype and a maintained product — link "the difference between a prototype and shipped custom software" | `/services/web-development` |
| `agentic-commerce-ai-checkout-protocols-gulf-20260711` | Where it discusses agent-to-merchant integration — link "connecting an agent to your existing systems" | `/services/crm-integration` |
| `office-ai-war-openai-anthropic-gulf-leads-20260710` | Where it discusses enterprises picking a model vendor — link "choosing the right model for a specific workflow rather than one vendor for everything" | `/services/consulting` |
| `geneva-ai-governance-summit-gulf-chips-bet-20260710` | Where it discusses enterprise governance requirements — link "building AI systems with documented scope and human review points" | `/services/consulting` |
| `cohere-humain-canada-gulf-sovereign-ai-20260710` | Where the Canada/Saudi axis is discussed — two links, one per market **(see honesty note below)** | `/markets/canada`, `/markets/saudi-arabia` |
| `aramco-ventures-together-ai-800-million-20260710` | Where it discusses inference infrastructure investment — link "workflow automation that runs on existing infrastructure, no new compute required" | `/services/workflow-automation` |
| `ai-venture-capital-510-billion-gulf-sovereign-bets-20260709` | Where it discusses where Gulf capital is landing (applied AI vs. infrastructure) — link "applied automation for a specific business process" | `/services` |
| `ai-agent-smartphones-apps-payments-gulf-20260710` | Where it discusses agents acting on a user's behalf — link "an AI agent built to handle one defined task" | `/services/ai-chatbots` |
| `ai-agents-production-governance-gulf-edge-20260707` | Where it discusses moving agents from pilot to production — link "the scope-then-build process a production agent goes through" | `/services/ai-chatbots` |
| `agentic-web-ai-crawlers-toll-gulf-digital-economy-20260708` | Where it discusses APIs replacing scraping — link "structured integrations built on documented APIs" | `/services/crm-integration` |
| `gulf-ai-compute-chips-power-global-funding-20260706` | Where it discusses compute as a scarce resource for smaller players — link "automation that doesn't require owning compute" | `/services/workflow-automation` |

**Honesty note on `cohere-humain-canada-gulf-sovereign-ai-20260710`:** the article is about
Cohere (a real company) and the Canadian and Saudi governments — it names real organizations
doing real deals. The link insertion must stay clearly editorial ("Raanzlr works with
businesses in Canada and Saudi Arabia" as a separate sentence, not attached to or implying
any relationship with Cohere, Humain, or the officials named). Draft sentence: *"Deals like
this move at the sovereign-fund level; most companies' AI automation needs are smaller and
faster to act on — Raanzlr offers remote AI automation services for [Canadian businesses →
/markets/canada] and [Saudi businesses → /markets/saudi-arabia]."* No implication of
involvement in the deal itself.

---

#### Part 4 — "What this means for business automation" sections

80–140 words each, capability-based, no stats, no client claims. Heading is fixed per your
spec: **"What this means for business automation"** (AR: **"ماذا يعني هذا لأتمتة الأعمال؟"**).

**`gulf-healthcare-ai-clinical-llm-virtual-twins-20260716`**
> Clinical-grade AI is a specialised, heavily regulated case — most businesses don't need a
> model that passes medical boards. What they do need is the same underlying pattern at a
> smaller scale: an AI system trained on your specific documents and processes, not a general
> chatbot. That's the difference between a model that sounds confident and one that's
> actually useful for a defined task — booking, triage, document lookup, patient or customer
> follow-up. Raanzlr builds AI agents scoped to one workflow at a time, with a clear handoff
> to a person when the case falls outside what the system was built to handle.

**`ai-weather-forecasting-models-gulf-extremes-20260716`**
> The interesting part of AI weather forecasting isn't the model — it's what happens after
> the prediction: who gets alerted, what process kicks off, which system updates. That's
> workflow automation, not machine learning. Most businesses sit on similar untapped signal —
> sensor data, order patterns, support volume — that never triggers an action because nobody
> built the pipeline connecting the signal to a response. Raanzlr builds that connective
> layer: routing data from the tools you already have into the workflow that should follow
> from it, without requiring a forecasting model of your own.

**`ai-layoffs-fourth-month-gulf-reskilling-bet-20260716`**
> The layoffs driving this conversation aren't really about AI replacing people wholesale —
> they're about specific repetitive tasks (data entry, routing, first-line support, report
> assembly) moving from a person's daily list to a system's. The roles that survive shift
> toward judgement, exceptions, and oversight. That's the same shift a well-scoped automation
> project produces at any size of business: not headcount reduction as the goal, but freeing
> people from repetitive work to do the parts of the job that need a human. Raanzlr scopes
> automation projects around that distinction directly.

**`ai-agents-autonomous-cyberattacks-gulf-frontline-20260712`**
> Autonomous attack tooling is a reminder that "AI agent" covers a wide range of designs, and
> the design choices matter. A business-facing AI agent should have a narrow, defined scope,
> logged actions, and a clear point where it hands off to a person rather than acting
> unsupervised on anything ambiguous. That's a security property, not just a UX one. When
> Raanzlr scopes an AI agent — for support, sales, or internal operations — the handoff
> conditions and access boundaries are part of the initial scope, not an afterthought added
> later.

**`us-eases-ai-chip-export-controls-uae-stargate-20260711`**
> Compute-access policy between the US and the Gulf affects who can train frontier models —
> it has very little to do with whether a mid-sized business can automate its own operations
> today. Workflow automation and AI agents built on existing commercial models don't require
> owning chips or negotiating export licenses; they require a clear scope and an integration
> plan. Raanzlr provides remote AI automation and custom software services for businesses in
> the United States and the UAE, independent of which country's compute policy is in the
> news that week.

**`humanoid-robots-ipo-gulf-capital-bet-20260711`**
> Humanoid robotics is a capital-intensive, multi-year bet on physical automation. Most
> businesses have a faster, cheaper option available now: software automation for the
> repetitive digital work already happening inside their operations — data entry, routing,
> reporting, customer replies. It won't make headlines the way a robot IPO does, but it ships
> in weeks, not years, and it doesn't require a hardware supply chain. Raanzlr builds that
> kind of automation as a remote service, scoped to a specific process rather than a
> speculative platform bet.

**`grok-4-5-hallucination-gulf-sovereign-ai-trust-20260711`**
> A frontier model's published hallucination rate is a useful signal, but it isn't the whole
> risk picture for a business deployment. What matters more is how the system around the
> model is built: whether it's scoped to a narrow task, whether it cites its source, and
> whether uncertain cases get routed to a person instead of answered with false confidence.
> That's engineering work, not a model-selection decision. When Raanzlr builds an AI agent,
> the scope, escalation rules, and review points are designed around exactly this problem —
> whichever model sits underneath.

**`ai-power-water-bottleneck-gulf-nuclear-20260711`**
> Frontier-model training and inference at scale genuinely strain power and water resources —
> that's a real, well-documented constraint. It's also mostly irrelevant to the AI automation
> a typical business needs: workflow automation and a well-scoped AI agent run on existing
> commercial infrastructure, not a dedicated data center. The resource story belongs to the
> handful of labs training frontier models, not to a company automating its support queue or
> its reporting. Raanzlr builds automation that works within that ordinary infrastructure
> footprint.

**`vibe-coding-app-store-flood-apple-gulf-founders-20260711`**
> AI-assisted "vibe coding" is genuinely useful for a prototype — a way to see an idea working
> before committing real budget. It's a different thing from a maintained, secure, scalable
> product a business can run its operations on: the prototype rarely has proper testing,
> error handling, or a plan for what happens when a thousand more users show up. Raanzlr's
> custom software work picks up past that point — turning a validated idea, AI-assisted or
> not, into something built to last, with the engineering practices a real product needs.

**`agentic-commerce-ai-checkout-protocols-gulf-20260711`**
> Standardised protocols for AI agents to transact on a person's behalf are early, but the
> underlying need is already common: connecting an AI agent to the systems that actually
> complete a transaction — payment, inventory, CRM, fulfilment. That's an integration
> problem before it's a protocol problem. Raanzlr builds API integrations connecting AI
> agents and workflows to the business systems a company already runs, so the agent can act
> on something instead of just answering questions about it.

**`office-ai-war-openai-anthropic-gulf-leads-20260710`**
> Enterprise software vendors competing to be the default AI layer in office tools is a
> useful signal that AI is becoming infrastructure, not a novelty feature. It's also a reason
> not to build a business process around a single vendor's roadmap. The more durable approach
> is choosing the right model or tool for each specific task — sometimes that vendor's tool,
> sometimes a different one, sometimes a custom pipeline — rather than standardising on
> whichever office suite wins the year. Raanzlr's consulting work starts with exactly that
> assessment before any build begins.

**`geneva-ai-governance-summit-gulf-chips-bet-20260710`**
> International AI governance discussions mostly concern frontier-model regulation and
> export policy — a different layer from what an individual business needs to get right when
> it deploys AI internally: documented scope, defined access, and a human review point for
> anything ambiguous. That's a design decision made project by project, not something a
> summit resolves for you. Raanzlr builds AI automation and agents with that documentation
> and those review points built into the initial scope.

**`cohere-humain-canada-gulf-sovereign-ai-20260710`**
> Government-to-government AI partnerships like this one operate at a scale — sovereign
> compute commitments, state visits — that has nothing to do with how a mid-sized business
> in Canada or Saudi Arabia adopts AI day to day. That's a smaller, faster decision: scoping
> one workflow, building or connecting an AI agent to handle it, and measuring whether it
> actually reduces manual work. Raanzlr provides remote AI automation and custom software
> services for businesses in both countries, entirely separate from — and much simpler than
> — deals at this scale.

**`aramco-ventures-together-ai-800-million-20260710`**
> Inference-infrastructure investment at this scale is about the capacity to serve AI models
> to millions of users — a different problem from what most businesses face, which is getting
> one workflow automated reliably. A company doesn't need to reason about inference capacity
> to benefit from AI: it needs a well-scoped agent or automation running on infrastructure
> that already exists. Raanzlr builds that kind of automation directly on commercial cloud
> and model infrastructure, with no dedicated compute investment required from the client.

**`ai-venture-capital-510-billion-gulf-sovereign-bets-20260709`**
> Most of that capital is chasing infrastructure and frontier labs — not the applied,
> workflow-level AI that changes how a specific business actually operates day to day.
> Applied automation doesn't need venture-scale capital; it needs a clearly scoped problem
> and a partner who can build and support the system that solves it. Raanzlr focuses
> entirely on that applied layer: AI agents, workflow automation, dashboards, and
> integrations built for a specific operation, not a platform bet.

**`ai-agent-smartphones-apps-payments-gulf-20260710`**
> An AI agent acting inside a phone's operating system is a consumer-facing version of the
> same idea businesses already use in a narrower form: an agent scoped to one task — answer
> a question, qualify a lead, process a request — with clear boundaries on what it can act on
> and when it hands off to a person. The consumer version needs OS-level integration and a
> platform partnership; the business version needs a documented scope and access to your
> existing systems. Raanzlr builds the latter as a remote service.

**`ai-agents-production-governance-gulf-edge-20260707`**
> Moving an AI agent from a demo to something running unattended in production is where most
> pilots actually fail — not on capability, but on governance: logging, escalation rules,
> access boundaries, and a plan for what happens when the agent is wrong. That gap is exactly
> where a scoped engagement earns its keep. Raanzlr treats production readiness — not just a
> working demo — as the deliverable when it builds an AI agent, with the review points and
> escalation logic defined before launch, not patched in after an incident.

**`agentic-web-ai-crawlers-toll-gulf-digital-economy-20260708`**
> Sites charging AI crawlers to access their content is a sign that ad hoc scraping is
> becoming an unstable foundation to build on. The more durable pattern — for a business
> connecting its own systems, not scraping someone else's — is the same one it always was:
> documented APIs, not scraped pages. Raanzlr builds integrations on published APIs between
> the tools a business already runs, so the connection doesn't break when the other side
> changes its page layout — or starts charging a toll.

**`gulf-ai-compute-chips-power-global-funding-20260706`**
> Compute and chip supply is the layer that frontier labs and sovereign funds compete over —
> it isn't a constraint most businesses ever touch directly. Running an AI agent or an
> automated workflow on commercial cloud infrastructure doesn't require owning or securing
> dedicated compute; it requires a well-scoped project and the right integrations. Raanzlr
> builds AI automation and custom software that runs on existing infrastructure, so a
> business benefits from the underlying AI progress without needing to play in the compute
> market at all.

---

#### Part 5 — AEO additions (9 of 19 — selected for real search intent)

Skipped: `ai-weather-forecasting-models`, `ai-layoffs-fourth-month`, `humanoid-robots-ipo`,
`ai-power-water-bottleneck`, `office-ai-war-openai-anthropic`, `geneva-ai-governance-summit`,
`aramco-ventures-together-ai`, `ai-venture-capital-510-billion`, `gulf-ai-compute-chips-power`,
`gulf-healthcare-ai-clinical-llm` — good articles, but the FAQ candidates for each are either
already answered by the headline or too narrow/newsy to carry independent search volume.

##### `grok-4-5-hallucination-gulf-sovereign-ai-trust-20260711`
**AnswerBlock — "What is AI hallucination?"**
> AI hallucination is when a language model states something false or unsupported with the
> same confident tone it uses for correct information — a fabricated citation, a wrong number,
> a feature that doesn't exist. It happens because the model is predicting plausible text, not
> checking facts against a source. It matters for business use because a hallucinating agent
> can mislead a customer as confidently as it answers correctly, which is why scope and
> escalation rules matter more than the model's benchmark score.

**FAQ (3):**
1. *Does a lower hallucination rate mean a model is safe for customer-facing use?* — Not by
   itself. A lower rate reduces how often it happens, but any AI agent handling customers
   needs a defined scope, source citations where relevant, and an escalation path for
   uncertain answers regardless of the model underneath.
2. *Can hallucination be eliminated?* — No current model eliminates it completely.
   Retrieval-augmented generation (grounding answers in real documents) and narrow task scope
   reduce it significantly; a business deployment should assume some rate and design for it.
3. *How does Raanzlr reduce hallucination risk in an AI agent?* — By scoping the agent to a
   defined task, grounding its answers in the client's own documents and data where possible,
   and building explicit handoff rules for anything the agent isn't confident about.

##### `ai-agents-autonomous-cyberattacks-gulf-frontline-20260712`
**AnswerBlock — "What is an autonomous AI agent security risk?"**
> An autonomous AI agent security risk is the possibility that an AI system with the ability
> to take actions — send requests, modify data, execute code — does so incorrectly or
> maliciously without a human catching it in time. The risk scales with how much access and
> autonomy the agent has. A narrowly scoped business agent with logged actions and a human
> review point for anything ambiguous carries a very different risk profile than an
> unrestricted autonomous system.

**FAQ (3):**
1. *Are business AI agents (like a support chatbot) the same risk category as autonomous
   attack tools?* — No. The risk comes from scope and autonomy, not from being "AI." A support
   agent that only answers questions and escalates the rest has a small, well-understood
   surface compared to a system with broad system access.
2. *What limits should a business AI agent have?* — A defined task scope, logged actions,
   restricted access to only the systems it needs, and a clear rule for when it hands off to
   a person instead of acting.
3. *Does Raanzlr build these limits into every agent?* — Yes — scope, access boundaries, and
   escalation rules are part of the initial project scope for any AI agent Raanzlr builds, not
   an add-on.

##### `agentic-commerce-ai-checkout-protocols-gulf-20260711`
**AnswerBlock — "What is agentic commerce?"**
> Agentic commerce is an AI agent completing a purchase or transaction on a person's or
> business's behalf — searching, comparing, and checking out — rather than a person clicking
> through each step. It depends on the agent having a structured, reliable way to interact
> with a merchant's systems, which is why it's as much an integration problem as an AI one.

**FAQ (3):**
1. *Does agentic commerce require a new kind of website?* — Not necessarily. It requires a
   structured way for an agent to interact with the same systems (inventory, pricing,
   checkout) a human customer already uses — often via an API rather than a redesigned page.
2. *Can a business prepare for agentic commerce today?* — Yes, by making sure its commerce
   systems expose clean, documented APIs — the same foundation that supports internal
   automation and human-facing tools too.
3. *What does Raanzlr build in this area?* — API integrations that connect AI agents and
   automated workflows to a business's existing commerce, CRM, and payment systems.

##### `us-eases-ai-chip-export-controls-uae-stargate-20260711`
**AnswerBlock — "How can US and UAE businesses use AI automation regardless of chip policy?"**
> Chip export policy governs who can build and train frontier AI models — it doesn't affect a
> business's ability to use AI automation today. AI agents, workflow automation, and custom
> software built on existing commercial models run on standard cloud infrastructure, with no
> dependency on chip-export decisions. Raanzlr provides remote AI automation and custom
> software services for businesses in the United States and the UAE on that same
> infrastructure basis.

**FAQ (3):**
1. *Does a business need special compute access to use AI agents?* — No. Commercial AI models
   accessed via API run on infrastructure the provider manages; the business doesn't need its
   own chips or a compute allocation.
2. *Does Raanzlr have offices in the US or UAE?* — Raanzlr is a Wyoming-registered company
   delivering to both markets remotely; see the [United States](/en/markets/united-states) and
   [UAE](/en/markets/uae) pages for details.
3. *What's a realistic first AI automation project for a US or UAE business?* — Usually a
   single high-volume, repetitive task — customer support triage, lead routing, or report
   generation — scoped and built as a contained first engagement.

##### `cohere-humain-canada-gulf-sovereign-ai-20260710`
**AnswerBlock — "How can Canadian and Saudi businesses use AI automation?"**
> Canadian and Saudi businesses use AI automation the same way businesses anywhere do: to
> reduce manual work in support, operations, and back-office tasks with AI agents and workflow
> automation, independent of any sovereign-level compute deals. Raanzlr offers remote AI
> automation and custom software services for businesses in both Canada and Saudi Arabia,
> scoped project by project rather than at national scale.

**FAQ (3):**
1. *Is this article describing a Raanzlr partnership?* — No. It reports on a Cohere/Humain
   government-level deal; Raanzlr has no role in it. Raanzlr's own work is separate, smaller-
   scale AI automation for individual businesses.
2. *Does Raanzlr have a Canadian office?* — No — Raanzlr is a US-registered company with no
   Canadian entity, office, or staff; work is delivered remotely. See the
   [Canada page](/en/markets/canada).
3. *What does a typical engagement look like for a business in these markets?* — Discovery
   call, written scope, sprint-based build, launch, and a support window — the same process
   regardless of market.

##### `ai-agent-smartphones-apps-payments-gulf-20260710`
**AnswerBlock — "What is an AI agent, in a business context?"**
> In a business context, an AI agent is a system that uses an AI model to complete a defined
> task — answering a question, qualifying a lead, processing a request — and takes action
> inside connected systems rather than just generating text. It differs from a chatbot mainly
> in scope: an agent is built around one job, with access to the specific tools it needs to
> finish that job.

**FAQ (3):**
1. *What's the difference between an AI agent and a chatbot?* — A chatbot mainly answers
   questions; an agent can also take action — booking, updating a record, triggering a
   workflow — inside the systems it's connected to.
2. *Does an AI agent need OS-level or platform integration to be useful for a business?* — No.
   Business agents typically integrate through a website, WhatsApp, or an internal tool, not a
   phone's operating system.
3. *What kinds of tasks are a good fit for a first AI agent?* — Repetitive, well-defined
   ones with a clear correct action: FAQ answering, lead qualification, appointment booking,
   or first-line support triage.

##### `ai-agents-production-governance-gulf-edge-20260707`
**AnswerBlock — "What does AI agent governance mean?"**
> AI agent governance means the rules, logging, and review points that control what an AI
> agent is allowed to do and how its actions are checked. It includes defining the agent's
> task scope, restricting its access to only the systems it needs, logging what it does, and
> setting a clear rule for when it hands off to a person instead of acting on its own.

**FAQ (3):**
1. *Why do AI agent pilots often fail to reach production?* — Usually not a capability gap —
   the model works — but a missing governance layer: no logging, no escalation rule, or access
   broader than the task requires.
2. *What's the minimum governance a business AI agent needs?* — A defined scope, restricted
   access, an action log, and an explicit handoff condition for uncertain cases.
3. *Does Raanzlr build governance in from the start?* — Yes — scope, access boundaries, and
   escalation rules are defined during discovery, before the agent is built, not added after
   launch.

##### `vibe-coding-app-store-flood-apple-gulf-founders-20260711`
**AnswerBlock — "What is 'vibe coding'?"**
> "Vibe coding" is building software mainly by describing what you want to an AI coding tool
> and iterating on its output, rather than writing most of the code by hand. It's fast for
> getting a working prototype in front of people, but the output typically lacks the testing,
> error handling, and architecture a product needs once real users and real data are involved.

**FAQ (3):**
1. *Can a vibe-coded app go straight to production?* — Usually not safely — it commonly needs
   a review pass for security, error handling, data validation, and scalability before it can
   carry real users or real data.
2. *Does Raanzlr use AI coding tools?* — Where they speed up legitimate engineering work, yes
   — but delivery still goes through the same scoping, testing, and review process as any
   custom build.
3. *What's the difference between a prototype and what Raanzlr delivers?* — A prototype
   proves an idea works; a delivered build is tested, documented, and handed over with the
   client owning the code and infrastructure.

##### `agentic-web-ai-crawlers-toll-gulf-digital-economy-20260708`
**AnswerBlock — "What is the agentic web?"**
> The agentic web describes AI agents — not human browsers — as a growing share of traffic
> requesting content and data from websites, often to answer a user's question or complete a
> task on their behalf. It's prompting sites to rethink how they charge for and structure
> access, moving from scrapeable pages toward documented, permissioned APIs.

**FAQ (3):**
1. *Does this affect how a business should build its own website or systems?* — It's a reason
   to expose data through documented APIs rather than relying on the page structure staying
   scrapeable — the same foundation that makes internal automation reliable too.
2. *Is this related to SEO?* — Related but distinct: SEO is about ranking for human searchers;
   agentic-web access is about whether AI systems can read and use your content or data at all.
3. *What does Raanzlr build in this space?* — API integrations connecting a business's own
   systems together on documented, stable interfaces, rather than fragile scraping.

---

#### Part 6 — Strategy recommendation

**Agree with your preferred direction.** Concrete recommendation:

1. **Shift the publishing mix now.** Next articles come from the 30-article commercial
   calendar in the parent spec (`2026-09-10-raanzlr-na-seo-geo-aeo-design.md` §8) —
   AI-automation basics, custom software, US/Canada market pieces, industry pieces,
   AEO/comparison pieces. These target the keywords this whole project is built around and
   carry natural internal links to services and markets from the first draft.
2. **Gulf/global AI-news pieces continue only when they clearly connect back to a Raanzlr
   service or target market** — the same bar Part 3/4 applied retroactively. A news piece
   with no plausible link to `/services/*` or `/markets/*` shouldn't get published under this
   blog going forward, even if it's well-written and well-sourced (several of the 19 are).
3. **Cadence:** aim for roughly 4:1 in favour of the commercial calendar going forward (e.g.
   one news-and-connect piece per month at most), rather than the 10-day burst that produced
   the 19-post cluster — burst publishing is also what produced the 22-post retired cluster
   this session is cleaning up.
4. Keep the citation discipline the 19 posts already show (real, dated, external sources) —
   that part of the pipeline is working well and should carry over to the commercial calendar.

---

#### Post-implementation report

##### 1. Files changed
- `src/lib/posts.ts` — `Post.faq`, `Post.answerBlock`, `PostQA` type, `parseJsonArray`/
  `parseJsonObject` helpers, `recordToPost` reads `faq_en`/`faq_ar`/`answer_block_en`/
  `answer_block_ar`.
- `src/pages/InsightPost.tsx` — `AnswerBlock` render, FAQ `<details>` render, `faqPageSchema`
  wired into `<SEO schema=…>`.
- `src/pages/Insights.tsx` — `itemListSchema` wired into `<SEO schema=…>`, reflecting the
  posts actually on each archive page.

##### 2. Supabase cleanup list
See Part 1 — 22 ids, ready to paste into the Admin panel unpublish flow.

##### 3. ItemList schema confirmation
Verified in `dist/en/insights/index.html`: `"@type":"ItemList"`, `numberOfItems: 11` (10 grid
+ 1 hero on page 1), first item name matches the rendered hero post.

##### 4. FAQ/AnswerBlock implementation summary
Fully backward-compatible: `recordToPost` returns `faq: undefined` / `answerBlock: undefined`
for any row missing the new columns (all 28 live posts, today). Confirmed zero output change
on a live article (`grok-4-5-hallucination-gulf-sovereign-ai-trust-20260711`) before any
Supabase data is added. Once an Admin edits a post's `faq_en`/`faq_ar`/`answer_block_en`/
`answer_block_ar` columns, the AnswerBlock and FAQ section (+ `FAQPage` schema) appear
automatically on the next build — no further code change needed.

##### 5. Article-by-article internal link plan
See Part 3 (19 rows) and Part 5 (9 of the 19, with AnswerBlock + 3 FAQ each).

##### 6. Examples from 3 updated articles
See `grok-4-5-hallucination-gulf-sovereign-ai-trust-20260711`, `cohere-humain-canada-gulf-
sovereign-ai-20260710`, and `us-eases-ai-chip-export-controls-uae-stargate-20260711` in Parts
4–5 above — link insertion, Takeaway section, AnswerBlock, and 3 FAQs each.

##### 7. Typecheck
`pnpm typecheck` → clean, 0 errors.

##### 8. Build
`pnpm build` → prerender: primed 28 published posts from Supabase; 151 HTML files (75 routes
× 2 locales + 404) and 3 sitemaps written to `dist/`. **Route count unchanged** — confirms the
code change is additive only.

##### 9. Sitemap count
`dist/sitemap-en.xml` / `dist/sitemap-ar.xml`: 75 `<url>` each, unchanged from before this
batch (no URLs added, renamed, or removed).

##### 10. Remaining risks
- **Content insertion is manual.** Everything in Parts 3–5 is written and ready, but it lives
  in Supabase via the Admin panel — nobody has pasted it in yet. Until that happens, the 19
  articles are unchanged on the live site.
- **22 Supabase rows still published** until the Part 1 list is actioned in the Admin panel.
- Pre-existing, out of scope for this batch: gradient-text section headings in
  `InsightPost.tsx` (flagged by the design hook again this session, not touched — deliberate
  existing site style, not something this task asked to change).
- The static seed `src/data/posts.ts` still carries Unsplash hero images and a couple of
  unsourced percentage stats; irrelevant while Supabase is reachable (it's fallback-only), but
  worth a cleanup pass eventually for resilience.


---

## Appendix E — 19 articles, per-article review

### 19 long articles — per-article review

Same content as `2026-09-11-blog-geo-aeo-content-package.md` Parts 3–5, reorganized one block
per article for approval article-by-article or in batches. Nothing pasted into Supabase.
Approve individually or in batches; I'll hold until you do.

Format per article: title · slug · link insertions · Takeaway · AnswerBlock (if any) · FAQ (if any) · target page(s).

---

##### 1. Grok 4.5 vs K2 Think V2: Speed Versus Trust in Frontier AI
**Slug:** `grok-4-5-hallucination-gulf-sovereign-ai-trust-20260711`
**Link insertion:** where the piece discusses hallucination risk in production use → "how a production AI agent is scoped to avoid this"
**Target:** `/services/ai-chatbots`
**Takeaway:** A frontier model's published hallucination rate is a useful signal, but it isn't the whole risk picture for a business deployment. What matters more is how the system around the model is built: whether it's scoped to a narrow task, whether it cites its source, and whether uncertain cases get routed to a person instead of answered with false confidence. That's engineering work, not a model-selection decision. When Raanzlr builds an AI agent, the scope, escalation rules, and review points are designed around exactly this problem — whichever model sits underneath.
**AnswerBlock:** "What is AI hallucination?" — AI hallucination is when a language model states something false or unsupported with the same confident tone it uses for correct information... [full text in the content package, §5]
**FAQ (3):** does a lower hallucination rate mean safe for customer use? / can it be eliminated? / how does Raanzlr reduce the risk?

---

##### 2. AI Agents Are Now Running Autonomous Cyberattacks
**Slug:** `ai-agents-autonomous-cyberattacks-gulf-frontline-20260712`
**Link insertion:** where it discusses agent oversight/guardrails → "how agent handoff to a human is designed"
**Target:** `/services/ai-chatbots`
**Takeaway:** Autonomous attack tooling is a reminder that "AI agent" covers a wide range of designs, and the design choices matter. A business-facing AI agent should have a narrow, defined scope, logged actions, and a clear point where it hands off to a person rather than acting unsupervised on anything ambiguous. That's a security property, not just a UX one. When Raanzlr scopes an AI agent — for support, sales, or internal operations — the handoff conditions and access boundaries are part of the initial scope, not an afterthought added later.
**AnswerBlock:** "What is an autonomous AI agent security risk?"
**FAQ (3):** same risk category as business chatbots? / what limits should a business agent have? / does Raanzlr build these limits in?

---

##### 3. Agentic Commerce: AI Checkout Protocols
**Slug:** `agentic-commerce-ai-checkout-protocols-gulf-20260711`
**Link insertion:** where it discusses agent-to-merchant integration → "connecting an agent to your existing systems"
**Target:** `/services/crm-integration`
**Takeaway:** Standardised protocols for AI agents to transact on a person's behalf are early, but the underlying need is already common: connecting an AI agent to the systems that actually complete a transaction — payment, inventory, CRM, fulfilment. That's an integration problem before it's a protocol problem. Raanzlr builds API integrations connecting AI agents and workflows to the business systems a company already runs, so the agent can act on something instead of just answering questions about it.
**AnswerBlock:** "What is agentic commerce?"
**FAQ (3):** does it require a new website? / can a business prepare today? / what does Raanzlr build here?

---

##### 4. US Eases AI Chip Export Controls — UAE Stargate
**Slug:** `us-eases-ai-chip-export-controls-uae-stargate-20260711`
**Link insertion:** where UAE/US compute access is discussed → two links, one per market
**Target:** `/markets/united-states`, `/markets/uae`
**Takeaway:** Chip export policy governs who can build and train frontier AI models — it doesn't affect a business's ability to use AI automation today. AI agents, workflow automation, and custom software built on existing commercial models run on standard cloud infrastructure, with no dependency on chip-export decisions. Raanzlr provides remote AI automation and custom software services for businesses in the United States and the UAE on that same infrastructure basis.
**AnswerBlock:** "How can US and UAE businesses use AI automation regardless of chip policy?"
**FAQ (3):** need special compute access? / does Raanzlr have US/UAE offices? (no — remote, links to both market pages) / realistic first project?

---

##### 5. Humanoid Robots and the Gulf's IPO Capital Bet
**Slug:** `humanoid-robots-ipo-gulf-capital-bet-20260711`
**Link insertion:** where it contrasts robotics capital with software-only automation → "software automation that ships this quarter, not this decade"
**Target:** `/services/workflow-automation`
**Takeaway:** Humanoid robotics is a capital-intensive, multi-year bet on physical automation. Most businesses have a faster, cheaper option available now: software automation for the repetitive digital work already happening inside their operations — data entry, routing, reporting, customer replies. It won't make headlines the way a robot IPO does, but it ships in weeks, not years, and it doesn't require a hardware supply chain. Raanzlr builds that kind of automation as a remote service, scoped to a specific process rather than a speculative platform bet.
**AnswerBlock / FAQ:** none recommended — no distinct standalone search intent beyond the news itself.

---

##### 6. The AI Power and Water Bottleneck
**Slug:** `ai-power-water-bottleneck-gulf-nuclear-20260711`
**Link insertion:** where it discusses compute cost pressure → "lighter-weight automation that doesn't need frontier-model scale"
**Target:** `/services/workflow-automation`
**Takeaway:** Frontier-model training and inference at scale genuinely strain power and water resources — that's a real, well-documented constraint. It's also mostly irrelevant to the AI automation a typical business needs: workflow automation and a well-scoped AI agent run on existing commercial infrastructure, not a dedicated data center. The resource story belongs to the handful of labs training frontier models, not to a company automating its support queue or its reporting. Raanzlr builds automation that works within that ordinary infrastructure footprint.
**AnswerBlock / FAQ:** none recommended.

---

##### 7. Vibe Coding and the App Store Flood
**Slug:** `vibe-coding-app-store-flood-apple-gulf-founders-20260711`
**Link insertion:** where it discusses the gap between a quick AI-generated prototype and a maintained product → "the difference between a prototype and shipped custom software"
**Target:** `/services/web-development`
**Takeaway:** AI-assisted "vibe coding" is genuinely useful for a prototype — a way to see an idea working before committing real budget. It's a different thing from a maintained, secure, scalable product a business can run its operations on: the prototype rarely has proper testing, error handling, or a plan for what happens when a thousand more users show up. Raanzlr's custom software work picks up past that point — turning a validated idea, AI-assisted or not, into something built to last, with the engineering practices a real product needs.
**AnswerBlock:** "What is 'vibe coding'?" — real search-volume term, worth the block.
**FAQ (3):** can it go straight to production? / does Raanzlr use AI coding tools? / prototype vs. delivered build?

---

##### 8. The Office AI War: OpenAI vs. Anthropic
**Slug:** `office-ai-war-openai-anthropic-gulf-leads-20260710`
**Link insertion:** where it discusses enterprises picking a model vendor → "choosing the right model for a specific workflow rather than one vendor for everything"
**Target:** `/services/consulting`
**Takeaway:** Enterprise software vendors competing to be the default AI layer in office tools is a useful signal that AI is becoming infrastructure, not a novelty feature. It's also a reason not to build a business process around a single vendor's roadmap. The more durable approach is choosing the right model or tool for each specific task — sometimes that vendor's tool, sometimes a different one, sometimes a custom pipeline — rather than standardising on whichever office suite wins the year. Raanzlr's consulting work starts with exactly that assessment before any build begins.
**AnswerBlock / FAQ:** none recommended — competitive news, not definitional.

---

##### 9. Geneva AI Governance Summit and the Gulf's Chip Bet
**Slug:** `geneva-ai-governance-summit-gulf-chips-bet-20260710`
**Link insertion:** where it discusses enterprise governance requirements → "building AI systems with documented scope and human review points"
**Target:** `/services/consulting`
**Takeaway:** International AI governance discussions mostly concern frontier-model regulation and export policy — a different layer from what an individual business needs to get right when it deploys AI internally: documented scope, defined access, and a human review point for anything ambiguous. That's a design decision made project by project, not something a summit resolves for you. Raanzlr builds AI automation and agents with that documentation and those review points built into the initial scope.
**AnswerBlock / FAQ:** none recommended.

---

##### 10. Cohere, Humain, and Canada's Gulf Sovereign AI Play
**Slug:** `cohere-humain-canada-gulf-sovereign-ai-20260710`
**Link insertion:** where the Canada/Saudi axis is discussed → two links, one per market. **Honesty note:** must read as clearly editorial, not implying Raanzlr involvement — draft sentence in the content package.
**Target:** `/markets/canada`, `/markets/saudi-arabia`
**Takeaway:** Government-to-government AI partnerships like this one operate at a scale — sovereign compute commitments, state visits — that has nothing to do with how a mid-sized business in Canada or Saudi Arabia adopts AI day to day. That's a smaller, faster decision: scoping one workflow, building or connecting an AI agent to handle it, and measuring whether it actually reduces manual work. Raanzlr provides remote AI automation and custom software services for businesses in both countries, entirely separate from — and much simpler than — deals at this scale.
**AnswerBlock:** "How can Canadian and Saudi businesses use AI automation?"
**FAQ (3):** is this describing a Raanzlr partnership? (explicitly, no) / Canadian office? (no, links to Canada page) / typical engagement?

---

##### 11. Aramco Ventures + Together AI: $800 Million
**Slug:** `aramco-ventures-together-ai-800-million-20260710`
**Link insertion:** where it discusses inference infrastructure investment → "workflow automation that runs on existing infrastructure, no new compute required"
**Target:** `/services/workflow-automation`
**Takeaway:** Inference-infrastructure investment at this scale is about the capacity to serve AI models to millions of users — a different problem from what most businesses face, which is getting one workflow automated reliably. A company doesn't need to reason about inference capacity to benefit from AI: it needs a well-scoped agent or automation running on infrastructure that already exists. Raanzlr builds that kind of automation directly on commercial cloud and model infrastructure, with no dedicated compute investment required from the client.
**AnswerBlock / FAQ:** none recommended.

---

##### 12. $510 Billion: AI Venture Capital and Gulf Sovereign Bets
**Slug:** `ai-venture-capital-510-billion-gulf-sovereign-bets-20260709`
**Link insertion:** where it discusses where Gulf capital is landing → "applied automation for a specific business process"
**Target:** `/services` (hub)
**Takeaway:** Most of that capital is chasing infrastructure and frontier labs — not the applied, workflow-level AI that changes how a specific business actually operates day to day. Applied automation doesn't need venture-scale capital; it needs a clearly scoped problem and a partner who can build and support the system that solves it. Raanzlr focuses entirely on that applied layer: AI agents, workflow automation, dashboards, and integrations built for a specific operation, not a platform bet.
**AnswerBlock / FAQ:** none recommended — pure funding news, no standalone intent.

---

##### 13. AI Agents on Your Smartphone: Apps and Payments
**Slug:** `ai-agent-smartphones-apps-payments-gulf-20260710`
**Link insertion:** where it discusses agents acting on a user's behalf → "an AI agent built to handle one defined task"
**Target:** `/services/ai-chatbots`
**Takeaway:** An AI agent acting inside a phone's operating system is a consumer-facing version of the same idea businesses already use in a narrower form: an agent scoped to one task — answer a question, qualify a lead, process a request — with clear boundaries on what it can act on and when it hands off to a person. The consumer version needs OS-level integration and a platform partnership; the business version needs a documented scope and access to your existing systems. Raanzlr builds the latter as a remote service.
**AnswerBlock:** "What is an AI agent, in a business context?"
**FAQ (3):** agent vs. chatbot? / needs OS-level integration for business use? (no) / good first-agent tasks?

---

##### 14. AI Agents in Production: The Governance Gap
**Slug:** `ai-agents-production-governance-gulf-edge-20260707`
**Link insertion:** where it discusses moving agents from pilot to production → "the scope-then-build process a production agent goes through"
**Target:** `/services/ai-chatbots`
**Takeaway:** Moving an AI agent from a demo to something running unattended in production is where most pilots actually fail — not on capability, but on governance: logging, escalation rules, access boundaries, and a plan for what happens when the agent is wrong. That gap is exactly where a scoped engagement earns its keep. Raanzlr treats production readiness — not just a working demo — as the deliverable when it builds an AI agent, with the review points and escalation logic defined before launch, not patched in after an incident.
**AnswerBlock:** "What does AI agent governance mean?"
**FAQ (3):** why do pilots fail to reach production? / minimum governance needed? / does Raanzlr build it in from the start?

---

##### 15. The Agentic Web and the AI Crawler Toll
**Slug:** `agentic-web-ai-crawlers-toll-gulf-digital-economy-20260708`
**Link insertion:** where it discusses APIs replacing scraping → "structured integrations built on documented APIs"
**Target:** `/services/crm-integration`
**Takeaway:** Sites charging AI crawlers to access their content is a sign that ad hoc scraping is becoming an unstable foundation to build on. The more durable pattern — for a business connecting its own systems, not scraping someone else's — is the same one it always was: documented APIs, not scraped pages. Raanzlr builds integrations on published APIs between the tools a business already runs, so the connection doesn't break when the other side changes its page layout — or starts charging a toll.
**AnswerBlock:** "What is the agentic web?"
**FAQ (3):** affects how a business builds its own site/systems? / related to SEO? (related but distinct) / what does Raanzlr build here?

---

##### 16. Gulf AI Compute: Chips, Power, and Global Funding
**Slug:** `gulf-ai-compute-chips-power-global-funding-20260706`
**Link insertion:** where it discusses compute as a scarce resource for smaller players → "automation that doesn't require owning compute"
**Target:** `/services/workflow-automation`
**Takeaway:** Compute and chip supply is the layer that frontier labs and sovereign funds compete over — it isn't a constraint most businesses ever touch directly. Running an AI agent or an automated workflow on commercial cloud infrastructure doesn't require owning or securing dedicated compute; it requires a well-scoped project and the right integrations. Raanzlr builds AI automation and custom software that runs on existing infrastructure, so a business benefits from the underlying AI progress without needing to play in the compute market at all.
**AnswerBlock / FAQ:** none recommended.

---

##### 17. M42's AI Doctor and the Gulf's Digital Twin Bet
**Slug:** `gulf-healthcare-ai-clinical-llm-virtual-twins-20260716`
**Link insertion:** where clinical LLMs handling patient-facing tasks is discussed → "AI agents built for a specific workflow"
**Target:** `/services/ai-chatbots`
**Takeaway:** Clinical-grade AI is a specialised, heavily regulated case — most businesses don't need a model that passes medical boards. What they do need is the same underlying pattern at a smaller scale: an AI system trained on your specific documents and processes, not a general chatbot. That's the difference between a model that sounds confident and one that's actually useful for a defined task — booking, triage, document lookup, patient or customer follow-up. Raanzlr builds AI agents scoped to one workflow at a time, with a clear handoff to a person when the case falls outside what the system was built to handle.
**AnswerBlock / FAQ:** none recommended — clinical topic is too narrow/regulated for a generic business FAQ.

---

##### 18. AI Weather Forecasting and Gulf Climate Extremes
**Slug:** `ai-weather-forecasting-models-gulf-extremes-20260716`
**Link insertion:** where it discusses combining model output with operational alerting → "routing model output into a business workflow"
**Target:** `/services/workflow-automation`
**Takeaway:** The interesting part of AI weather forecasting isn't the model — it's what happens after the prediction: who gets alerted, what process kicks off, which system updates. That's workflow automation, not machine learning. Most businesses sit on similar untapped signal — sensor data, order patterns, support volume — that never triggers an action because nobody built the pipeline connecting the signal to a response. Raanzlr builds that connective layer: routing data from the tools you already have into the workflow that should follow from it, without requiring a forecasting model of your own.
**AnswerBlock / FAQ:** none recommended — too narrow a topic.

---

##### 19. AI's Fourth Month of Layoffs and the Gulf Reskilling Bet
**Slug:** `ai-layoffs-fourth-month-gulf-reskilling-bet-20260716`
**Link insertion:** where roles shift from manual work to oversight is discussed → "the operational tasks AI automation actually replaces"
**Target:** `/services` (hub)
**Takeaway:** The layoffs driving this conversation aren't really about AI replacing people wholesale — they're about specific repetitive tasks (data entry, routing, first-line support, report assembly) moving from a person's daily list to a system's. The roles that survive shift toward judgement, exceptions, and oversight. That's the same shift a well-scoped automation project produces at any size of business: not headcount reduction as the goal, but freeing people from repetitive work to do the parts of the job that need a human. Raanzlr scopes automation projects around that distinction directly.
**AnswerBlock / FAQ:** none recommended — labor-market topic, not a product-definition question.

---

#### Approval tracker

| # | Article | Status |
|---|---|---|
| 1–19 | (see above) | Awaiting your approval — individually or in batches |

Full prose for AnswerBlock/FAQ items marked "see content package" is in
`2026-09-11-blog-geo-aeo-content-package.md` Part 5 — not re-duplicated here to keep this
review doc scannable.


---

## Appendix F — Removed statistics

These figures were on the service pages until 2026-09-18. They were removed because none could be verified and several read as Raanzlr results. The "claimed source" column is what the old chart caption said; none of these sources were checked. Re-add a number only with a named, dated, verified source.

| Service | Removed metric | Claimed source / note |
|---|---|---|
| AI Agents & Chatbots | **≤ 23s** — Average first response, day or night | Chart: GCC conversational-AI market ($M) — GulfSaaSReview — GCC AI Chatbot Market 2026 (41.2% CAGR) |
| AI Agents & Chatbots | **45%+** — Of routine queries resolved without a human | none stated |
| AI Agents & Chatbots | **96%** — Of Gulf smartphone users reachable on WhatsApp | none stated |
| Workflow Automation | **240 hrs** — Reclaimed per employee, per year | Chart: Operating-cost reduction by automation tier (%) — McKinsey & Gartner via shno.co, 2026 |
| Workflow Automation | **~75%** — Fewer errors on repetitive admin work | none stated |
| Workflow Automation | **248%** — Three-year ROI on workflow automation | none stated |
| AI Video Dubbing | **90–95%** — Lower cost than traditional studio dubbing | Chart: Cost per finished minute, per language ($) — Camb.ai — AI vs. Traditional Dubbing, 2025 |
| AI Video Dubbing | **Same-day** — Turnaround vs. 2–6 weeks in a studio | none stated |
| AI Video Dubbing | **76%** — Of consumers prefer to buy in their own language | none stated |
| Custom Software & Web Applications | **+8.4%** — Conversion lift from a 0.1s mobile speed gain | Chart: Google searches showing AI Overviews (%) — Semrush AI Overviews Study, 2025 |
| Custom Software & Web Applications | **53%** — Of mobile visits bounce if a page takes over 3s | none stated |
| Custom Software & Web Applications | **$2.08T** — GCC e-commerce market by 2034 (15.15% CAGR) | none stated |
| Mobile Apps | **$739.6B** — Global app market revenue in 2026 | Chart: Global app-market revenue ($B) — Statista Market Forecast (8.17% CAGR to 2031) |
| Mobile Apps | **+50%** — Retention lift from strong onboarding | none stated |
| Mobile Apps | **82%** — Of GCC e-commerce happens on mobile | none stated |
| Custom AI | **30–40%** — Lower document-processing cost | Chart: Global RAG market size ($B) — MarketsandMarkets — RAG Market (38.4% CAGR) |
| Custom AI | **50–70%** — Faster processing throughput | none stated |
| Custom AI | **$135.2B** — AI contribution to KSA GDP by 2030 (PwC) | none stated |
| CRM & API Integrations | **897** — Apps in the average enterprise — only 29% integrated | Chart: Enterprise apps that are actually integrated — MuleSoft 2025 Connectivity Benchmark |
| CRM & API Integrations | **$4.7M** — Average annual spend on custom integrations | none stated |
| CRM & API Integrations | **39%** — Of IT team time goes to building integrations | none stated |
| UI/UX | **50ms** — All it takes for a user to judge your interface | Chart: Conversion lift from design investment (%) — Forrester (via Eficode) & Baymard, 2025 |
| UI/UX | **Fewer** — Support tickets when the flow explains itself | none stated |
| UI/UX | **Research-led** — Decisions tested before they are built | none stated |
| Consulting | **~40%** — Of IT budget lost to technical-debt fallout | Chart: Where IT budget quietly leaks (%) — McKinsey (via SIG) & Flexera State of the Cloud 2026 |
| Consulting | **29%** — Of cloud spend is wasted on average | none stated |
| Consulting | **$7.3M** — Average cost of a Middle East data breach | none stated |
