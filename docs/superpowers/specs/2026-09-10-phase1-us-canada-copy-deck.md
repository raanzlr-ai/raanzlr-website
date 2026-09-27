# Phase 1 — US + Canada market pages: proposed copy & structure (v2)

**Status:** IMPLEMENTED 2026-09-10 on branch `seo/north-america-expansion`
(commits `d9…e8e158a`). Saudi wording, invoicing hold, and French wording
applied as the user's final corrections. This file is kept as the copy record.
Original status: For approval — not implemented (v2: corrected positioning).
**Parent spec:** `2026-09-10-raanzlr-na-seo-geo-aeo-design.md`

### v2 change — positioning correction

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

## 1. UNITED STATES — `/en/markets/united-states` · `/ar/markets/united-states`

### 1.1 Head

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

### 1.2 `name` / `region` / `cities`

- `name`: `United States`
- `region`: `North America`
- `cities`: `Remote delivery, US-wide`

### 1.3 H1 + hero

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

### 1.4 AnswerBlock (top of body, above "Why this market")

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

### 1.5 `whyTitle` + `whyParagraphs` (EN)

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

### 1.6 `keyAdvantages` (EN)

- `US-registered company (Casper, Wyoming) — straightforward contracting and invoicing`
- `Calls scheduled to overlap your US business hours`
- `Fixed, written scope per project — no open-ended retainer required`
- `AI agents and interfaces built for English first, with Spanish or Arabic where your customers need it`
- `Designed to integrate with the tools US teams commonly use — HubSpot, Salesforce, Zendesk, Stripe, QuickBooks, Snowflake, and custom APIs`
- `No lock-in: you own the code, the infrastructure, and the accounts`

### 1.7 `servicesTitle` + `services[]` (EN) — 6 cards, each links to a service page

**`servicesTitle`:** `What Raanzlr Offers US Businesses`

| Card title | Description | Links to |
|---|---|---|
| AI Agents & Chatbots | Agents on your website, WhatsApp, or help desk that answer questions, qualify leads, and book meetings against real availability, then hand off to a person when they should. | `/services/ai-chatbots` |
| Workflow Automation | Business process automation that routes work, moves data between systems, runs approvals, and handles scheduled jobs — built on n8n, Make, or custom pipelines. | `/services/workflow-automation` |
| Custom Software & Web Apps | Full-stack web platforms and internal tools built to your process instead of forcing your process into off-the-shelf software. | `/services/web-development` |
| Dashboards & Data Systems | Operations and executive dashboards, plus the data pipelines behind them, so reporting stops being a manual weekly job. | `/services/web-development` (until the dedicated Dashboards page ships in Phase 2) |
| API & Systems Integration | Connecting your CRM, billing, support, and data warehouse through their APIs so records stay in sync without re-keying. | `/services/crm-integration` |
| Custom AI | Retrieval-augmented generation over your own documents, internal copilots, and bespoke model work where a general chatbot is not enough. | `/services/custom-ai` |

### 1.8 `industriesTitle` + `industries[]` (EN)

**`industriesTitle`:** `US Industries Raanzlr Builds For`

`Healthcare & practice operations` · `Real estate & property management` ·
`Logistics & supply chain` · `Retail & e-commerce` · `Professional & financial
services` · `SaaS & technology` · `Home & field services` · `Nonprofits &
associations`

*(Plain labels. Where a matching `/industries/<slug>` page exists — healthcare,
logistics, retail, finance — the label links to it.)*

### 1.9 `useCasesTitle` + `useCasesIntro` + `useCases[]` (EN) — hedged, illustrative

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

### 1.10 `whyRaanzlrTitle` + `whyRaanzlr[]` (EN)

**`whyRaanzlrTitle`:** `How Raanzlr Works With US Teams`

- `A US-registered company — contracting, invoicing, and payment work the way your finance team expects`
- `A defined remote delivery method: discovery → written scope → sprint build → launch → support window`
- `Weekly working demos, not status decks`
- `Honest build-vs-buy advice — we say when off-the-shelf software is the better call`
- `Documentation and a handover so your team can run and extend what we build`
- `Clear scope limits — we say what we do not do`

### 1.11 `faqTitle` + `faqs[]` (EN) — answer-first, 40–80 words, mirrored as `FAQPage` schema

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

### 1.12 `ctaTitle` + `ctaDescription` (EN)

**`ctaTitle`:** `Start a Conversation About Your US Operation`
**`ctaDescription`:** `Tell Raanzlr the process that is costing your team the most time. You will get an honest read on whether automation, a custom build, or a smaller fix is the right move — and a written scope if it is a fit.`
CTA button → `/contact` (existing `MagneticButton`).

---

## 2. CANADA — `/en/markets/canada` · `/ar/markets/canada`

Same structure. Framing is strongest here — no Canadian entity, no Canadian work.

### 2.1 Head

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

### 2.2 `name` / `region` / `cities`

- `name`: `Canada`
- `region`: `North America`
- `cities`: `Remote delivery, Canada-wide`

### 2.3 H1 + hero

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

### 2.4 AnswerBlock (top of body)

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

### 2.5 `whyTitle` + `whyParagraphs` (EN)

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

### 2.6 `keyAdvantages` (EN)

- `Remote delivery across all Canadian time zones — calls scheduled to your working hours`
- `Data-handling and storage-location decisions made with you, with PIPEDA-aware technical controls (not legal advice)`
- `Fixed, written scope per project`
- `English-first AI agents and interfaces, with French or Arabic where your users need it` *(French: Raanzlr builds the bilingual system and integrates French content and review that the client provides — it does not claim in-house French authoring)*
- `Designed to integrate with the tools Canadian teams commonly use — Salesforce, HubSpot, Zendesk, Stripe, QuickBooks, and custom APIs`
- `No lock-in: you own the code, infrastructure, and accounts`

### 2.7 `servicesTitle` + `services[]` (EN)

**`servicesTitle`:** `What Raanzlr Offers Canadian Businesses`
Same six cards as §1.7, wording adjusted ("Canadian teams" / "your users"),
same service-page links.

### 2.8 `industriesTitle` + `industries[]` (EN)

**`industriesTitle`:** `Canadian Industries Raanzlr Builds For`
`Healthcare & clinic operations` · `Real estate & property management` ·
`Logistics & distribution` · `Retail & e-commerce` · `Professional & financial
services` · `SaaS & technology` · `Construction & trades` · `Nonprofits &
member organizations` (link the four with matching `/industries` pages).

### 2.9 `useCasesTitle` + `useCasesIntro` + `useCases[]` (EN)

**`useCasesTitle`:** `AI Automation & Custom Software Use Cases for Canadian Companies`
**`useCasesIntro`:** `Common operational problems and the kind of system that addresses each. Illustrative patterns showing what is possible — not delivered projects.`

Same six patterns as §1.9, localised: bilingual (English/French) tier-1 support
in #2 instead of English/Spanish; #4 notes the dashboard can flag where source
data is stored; otherwise identical.

### 2.10 `whyRaanzlrTitle` + `whyRaanzlr[]` (EN)

**`whyRaanzlrTitle`:** `How Raanzlr Works With Canadian Teams`

- `Clear about what it is: a US-registered company delivering to Canada remotely, no Canadian office`
- `Data-handling and residency decided with you during discovery`
- `A defined remote delivery method: discovery → written scope → sprint build → launch → support`
- `Weekly working demos`
- `Honest build-vs-buy advice`
- `Full documentation and handover; you own everything`

### 2.11 `faqTitle` + `faqs[]` (EN)

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

### 2.12 `ctaTitle` + `ctaDescription` (EN)

**`ctaTitle`:** `Start a Conversation About Your Canadian Operation`
**`ctaDescription`:** `Tell Raanzlr which process is costing your team the most time. You will get an honest assessment of whether automation, a custom build, or a smaller fix fits — plus a written scope and data-handling plan if it does.`
CTA → `/contact`.

---

## 3. Arabic copy — scope for this round

Provided above in full for both pages: `<title>`, `metaDescription`, H1, and
hero. To be authored at implementation to match approved English (authored
Arabic, not machine translation; register matching existing `ar` market
records; RTL punctuation): `whyParagraphs`, `keyAdvantages`, `services`,
`industries`, `useCases`, `whyRaanzlr`, all six `faqs`, `ctaTitle`,
`ctaDescription`, `region`, `cities`, and the AnswerBlock Q&A. Sent back for a
quick check before commit rather than written now and revised.

Requesting approval on: **English copy + structure + Arabic head/hero framing.**

---

## 4. AnswerBlock placement plan (Phase 1)

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

## 5. `llms.txt` / `llms-full.txt` additions (Phase 1)

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

## 6. Internal-linking plan (Phase 1)

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

## 7. What implementation will touch (reference — not this round)

- `src/data/markets.ts` — two records appended (~200 lines each incl. AR).
- `src/lib/pageSchema.ts` — `MARKET_COUNTRY_CODES` gets `united-states`, `canada`.
- `src/pages/MarketDetail.tsx` — render an AnswerBlock when the record defines one.
- `src/pages/Services.tsx`, `src/pages/Home.tsx` — AnswerBlock placement per §4.
- `src/components/Footer.tsx`, `src/pages/About.tsx`, `src/pages/Home.tsx` — links per §6.
- `public/llms.txt`, `public/llms-full.txt` — §5.
- `public/markets/united-states.webp`, `public/markets/canada.webp` — new assets.
- No routes, no redirects, no slug changes. Prerender +4 HTML files, sitemap +2 URLs/locale.

---

## 8. GCC + existing pages — "no implied client work" pass (added to Phase 1)

**Rule (applies site-wide):** with no verified project, no named client, no
approved proof, and no confirmed metric, every claim is phrased as **capability,
method, or target-market service** — never past experience. Same standard now
covers the GCC market pages, service pages, and About/translations copy, not
only US/Canada.

### 8.1 `src/data/markets.ts` — exact edits (EN; AR equivalents at implementation)

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

### 8.2 `src/data/serviceFaqs.ts` / `src/data/servicesRich.ts`

Already mostly compliant — integration answers are present-tense capability
(`serviceFaqs.ts:168`: *"We integrate through published APIs, which covers the
mainstream platforms — HubSpot, Salesforce, Zoho…"*). Keep that phrasing as the
standard. `stack:` arrays list tools used, not clients — keep. Action: grep the
full files for `we've` / `our clients` / `previously` / `in production for` and
fix any hit; add none.

### 8.3 `src/lib/translations.ts`

| Location | Current | Proposed |
|---|---|---|
| `sub` (`:211`) | `"…help our clients improve performance, simplify operations, and support their business growth."` | `"…help teams improve performance, simplify operations, and support business growth."` |
| `hqTitle` / `hqDesc` (`:222`) — says "headquarters in the United States" | (Wyoming registration is real, but "headquarters" overstates a registered-agent address) | `hqTitle`: `"Raanzlr is a US-registered company, working remotely."` · `hqDesc`: reword to "registered in Casper, Wyoming; every engagement delivered remotely through online discovery, planning, development, launch, and support." |
| any other `our clients` / `we helped` | — | → "teams" / capability phrasing |

### 8.4 `src/data/cases.ts` (Solution Scenarios)

Already labelled illustrative (`llms.txt` + page copy). Action: confirm no
scenario text reads as a delivered project ("we built for a client who…"). Fix
wording to "In this scenario…" where needed. No scenario becomes a case study.

### 8.5 Scope note

8.1–8.4 are **copy-only edits to existing data files** — no structural change,
no new pages, no deletions. They ship in the same Phase 1 branch as the US/Canada
pages. AR strings updated to match at implementation.

---

## 9. Meta rewrite (`translations.ts` `seo:` block) — Phase 1

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


