# Raanzlr — North America SEO / GEO / AEO Growth Spec

**Status:** Draft for review — 2026-09-10
**Project root:** `/Users/odi-d/Desktop/MyCompany/Rannzlr/raanzlr-website`
**App:** `artifacts/raanzlr` (pnpm workspace `@workspace/raanzlr`)
**Predecessor:** `2026-08-23-raanzlr-rebuild-design.md` (visual + engineering rebuild, shipped)

---

## 1. Executive summary

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

### Locked decisions (from review 2026-09-10)

| Question | Decision | Consequence |
|---|---|---|
| Canada presence | **Remote only, no CA entity** | Canada page: "serving Canadian businesses remotely", no office language; `areaServed: CA`; `provider` stays the Wyoming Organization |
| Publishable client proof | **None — keep Solution Scenarios** | No testimonials, no metrics-as-real, no named clients. E-E-A-T comes from process transparency, named tools/methods, and honest scope limits |
| Author / founder identity | **Organization-only, no named person** | No `Person` node. Articles authored by "Raanzlr". Add an editorial/standards statement instead of a personal bio |
| Service-page gaps | **Reframe existing 9; add only where genuinely distinct** | No thin new pages. "AI Automation" becomes an umbrella framing; a Dashboards page is added only if scope is truly separate (see §6) |

---

## 2. What was audited

`src/routes.ts`, `src/App.tsx`, `src/components/SEO.tsx`, `src/lib/{meta,pageSchema,analytics,posts}.ts`,
`src/data/{markets,servicesRich,serviceFaqs,posts,cases,industriesData}.ts`,
`src/pages/{MarketDetail,ServiceDetail,IndustryDetail,Markets,Industries,Home,FAQ}.tsx`,
`src/lib/translations.ts` (`seo:` + `services.items`), `index.html` (schema + GA4),
`public/{robots.txt,llms.txt,llms-full.txt,.well-known/*}`, `dist/sitemap*.xml`, `vercel.json`,
`scripts/prerender.mjs`.

### Already strong — do not touch

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

### Blockers — see §3 audit table for the full list with file paths

---

## 3. Audit — blockers, fix order, files

### SEO

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

### GEO

| ID | Blocker | Fix | Files | Approval |
|----|---------|-----|-------|----------|
| G1 | 4 conflicting entity descriptions; Canada in none | One canonical sentence, reused verbatim | `index.html` (Org + WebSite `description`), `src/lib/translations.ts`, `public/llms.txt`, `public/llms-full.txt` | rewrite |
| G2 | No editorial identity / standards signal (per decision: org-only) | Add an "Editorial standards" section to `/about` + `llms-full.txt`: who writes (Raanzlr's engineering team), how claims are sourced, that scenarios are labelled | `src/pages/About.tsx`, `public/llms-full.txt` | copy |
| G3 | `llms.txt` / `llms-full.txt` have no US/Canada section, no answer blocks | Add "Markets served" US + Canada entries; add the 8 GEO answers to `llms-full.txt` | `public/llms.txt`, `public/llms-full.txt` | copy |
| G4 | External corroboration ≈ zero | Marketing task list (§12): Crunchbase, LinkedIn company completeness, GitHub org, Clutch/DesignRush profiles — consistent NAP. Not code | — | — |
| G5 | `llms-full.txt` case-study section lacks the scenario disclaimer that `llms.txt` has | Copy the disclaimer across | `public/llms-full.txt` | safe |

### AEO

| ID | Blocker | Fix | Files | Approval |
|----|---------|-----|-------|----------|
| A1 | Market + industry FAQ content not in schema | Covered by S3 + S4 | — | safe |
| A2 | No answer-first definition blocks | New `<AnswerBlock>` component: `<h2>` question + a 40–80-word standalone first paragraph; place on home, each service, US/CA markets | `src/components/AnswerBlock.tsx` (new), `src/pages/{Home,ServiceDetail,MarketDetail}.tsx` | copy |
| A3 | No comparison content | Add a real comparison table to `custom-ai`/`ai-chatbots` service pages ("AI chatbot vs AI agent") and to two articles ("AI automation vs traditional automation", "custom software vs SaaS") | `src/data/servicesRich.ts`, articles | copy |
| A4 | Industry FAQ headings generic ("Frequently Asked Questions") | Rewrite each `faqTitle` to a question-bearing phrase | `src/data/industriesData.ts` | copy |

### Fix order (dependency-correct)

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

## 4. North America market pages

### 4.1 Honest-language rules (apply to every string on both pages)

Allowed: "registered in Casper, Wyoming, USA" · "serving businesses across the United States
remotely" · "supporting Canadian companies with remote AI automation and software
development" · "remote discovery, development, launch, and support" · "no office in
[state/province]".

Forbidden: "US-based team" · "local office" · "Canadian office" · "on-site" · "near you" ·
any client, metric, review, award, partner, or certification not independently true.

### 4.2 `/en/markets/united-states` + `/ar/markets/united-states`

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

### 4.3 `/en/markets/canada` + `/ar/markets/canada`

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

### 4.4 FAQ sets (answer-first, 40–80 words each, drafted at implementation)

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

### 4.5 Internal links each NA page must carry

Down to: `/services/ai-chatbots`, `/services/workflow-automation`,
`/services/custom-software` (reframed `web-development` or new), `/services/crm-integration`,
`/services/dashboards` (if added). Across to: `/markets` hub, `/industries` relevant pages.
Up from: `/markets` hub grid, footer, `llms.txt`. Home adds a North America line.

---

## 5. Meta / translations North America pass (S2)

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

## 6. Service page reframe (S10) — decision: reframe 9, add ≤1

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

## 7. GEO / AEO layer

### 7.1 Canonical entity sentence (G1)

> Raanzlr is an AI automation and custom software company, registered in Casper, Wyoming,
> USA and founded in 2023. It builds AI agents, workflow automation, dashboards, API
> integrations, and custom software for businesses in the United States, Canada, the GCC,
> Türkiye, and Europe. Every engagement is delivered remotely; Raanzlr has no offices in
> the markets it serves. Working languages: English, Arabic (including RTL interfaces), and
> Turkish.

Used verbatim in: `index.html` Org `description` (trim to ~2 sentences) + WebSite
`description`; `translations` about/home lead; `llms.txt` intro; `llms-full.txt` intro.

### 7.2 `Organization` schema additions (`index.html`)

- `areaServed`: add `"CA"` → `["US","CA","SA","AE","QA","KW","BH","OM","SY","TR","EU"]`
- `description`: replace with the canonical sentence (2-sentence form)
- Add `slogan` or `knowsAbout` array: `["AI automation","AI agents","workflow automation",
  "custom software development","API integration","dashboard development","RAG systems"]`
  — entity-topic signal, honest.
- Keep `sameAs` as-is until the §12 profiles exist, then extend.
- No `founder` (decision: org-only).

### 7.3 The 8 GEO answer blocks

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

### 7.4 `<AnswerBlock>` component (A2)

```tsx
// src/components/AnswerBlock.tsx
// <h2> = the question, verbatim. First <p> = a standalone 40–80-word answer that
// survives being quoted with no context. Optional children = elaboration.
// No accordion — content must be in the DOM and visible without interaction.
```

### 7.5 `FAQPage` helper (S3/S4)

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

### 7.6 Crawler / rendering

- Confirm prerendered market/industry HTML contains the FAQ answer text (it does — SSR
  renders `<details>` open content in DOM). `<AnswerBlock>` must render server-side too.
- `llms.txt` links: re-verify every URL after slug changes (service reframes keep slugs
  where possible; if `web-development` → `custom-software` slug changes, that's a redirect —
  see §15).

---

## 8. Article program (Part 6)

### 8.1 Workflow

Articles live in Supabase (`posts` table), authored via the Admin panel; the prerenderer
reads them at build. **Deliverable = a content doc per article** (title, meta, slug, body
sections as the Admin panel expects, FAQ, internal links) that gets pasted in. The first 5
are also committed to `src/data/posts.ts` as seed so they render even if Supabase is
unreachable.

### 8.2 Rules

1,200–1,800 words · clear H1 · answer-first intro · H2/H3 · direct-answer blocks · concrete
examples · **no fabricated stats, clients, citations** · cite only real sources with dates ·
internal links to 2+ services and 1+ market · FAQ section (renders + `FAQPage` via
`InsightPost`) · CTA · `datePublished` + `dateModified` from Supabase columns (already wired).

### 8.3 The 30 — calendar (publish 3–4/month, clusters interleaved)

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

### 8.4 First 5 to draft fully after approval

Articles 1, 2, 3, 6, 26 — the cluster spine (two Basics definitions, one AI-agents
operations piece, the SaaS comparison, the cost question). Each seeds `posts.ts`.

---

## 9. E-E-A-T & trust plan (Part 8) — org-only

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

## 10. Technical SEO task list

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

## 11. Developer task list

- Implement §10.1–§10.6, §10.9 (safe) behind one branch.
- Add `MARKET_COUNTRY_CODES` entries `united-states: "US"`, `canada: "CA"`.
- Confirm `MarketDetail` renders new sections when present, degrades when absent (parity work).
- Unit-check: `faqPageSchema` output validates (Rich Results Test is a correctness check, not a ranking claim).
- Verify `<AnswerBlock>` text present in `dist/en/markets/united-states/index.html`.
- No route changes needed — `routes.ts` derives markets from `MARKET_DETAILS`.

## 12. Marketing task list

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

## 13. Tracking setup (Part 9)

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

## 14. Internal linking map

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

## 15. Redirect map

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

## 16. Post-deploy checklist

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

## 17. Phasing & approval gates

| Phase | Contents | Gate |
|---|---|---|
| 0 | Fix order 1–4: entity string (G1/G5), `faqPageSchema`+`industryServiceSchema` wiring (S3/S4/S9), drop dead props (S11), `<AnswerBlock>` component | **Safe — implement after you say "go on Phase 0"**, each diff explained |
| 1 | US + Canada market records (S1), meta pass (S2), `llms` updates + `/about` editorial (G2/G3), 8 answer blocks | Approve copy |
| 2 | Market section parity (S5), service reframe + Dashboards page (S10), comparison content (A3), industry FAQ headings (A4) | Approve copy + any slug decision |
| 3 | Article program: full 30-row spec + first 5 drafts → `posts.ts` seed + Admin docs | Approve drafts before publish |
| 4 | Image self-hosting + stat sourcing (S6/S7), deliverable docs (E-E-A-T, tracking, reporting, checklists), memory update | Review |

Manual, outside this repo: S8 Supabase unpublish · §12 external profiles · §13 GA4 UI
(Key Events, custom dimensions, filters) · GSC/Bing verification.
