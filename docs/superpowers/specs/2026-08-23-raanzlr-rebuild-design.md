# Raanzlr Website Rebuild — Design Spec

**Status:** Approved 2026-08-23, with SEO/AEO corrections applied.
**Visual reference:** https://claude.ai/code/artifact/6d6e140b-3b7b-4e1a-a63f-92faa547a612
(rendered in the proposed palette and typography — it is the specimen, not a description of one)
**Project root:** `/Users/odi-d/Desktop/MyCompany/Rannzlr/raanzlr-website`
**App:** `artifacts/raanzlr` (pnpm workspace package `@workspace/raanzlr`)

---

## 1. Decision summary

| Question | Decision |
|---|---|
| Real proof | Real engagements exist; anonymised descriptor + real numbers, supplied by client |
| Conversion goal | Qualified project brief form (existing Supabase endpoint) |
| SEO surface | Keep all 91 routes/locale, raise quality. No deletions, no redirects |
| Rebuild depth | Keep stack. Rebuild tokens, components, composition, copy |
| Identity | Keep navy + cyan + chevron. Change the grammar it is applied in |

## 2. Core diagnosis

The identity is sound; its application is the problem. Navy-and-cyan is currently spoken
in a **sci-fi HUD** accent — 5 particle fields on the homepage, a radar hero displaying the
company's own logo, conic-gradient sweeps, `.glow-text`, a custom cursor, and a typewriter
`h1` that is unreadable mid-word at both 1440 and 390. The dark theme is
`--background: 0 0% 2%` — pure neutral black with the brand navy discarded entirely, which
is why the site reads as generic-dark rather than as Raanzlr.

Underneath, the engineering is strong and stays: per-locale prerendering with build gates,
`routes.ts` as single source of truth, Supabase + Turnstile forms, correct canonicals and
hreflang.

## 3. Visual direction — engineering documentation

Replacement grammar drawn from the artefacts Raanzlr actually produces: system schematics,
node graphs, spec sheets, integration diagrams. Hairlines that mark real boundaries.
Monospace on real data. Cyan demoted from ambient wash to **signal** — roughly five uses
per page (primary action, active nav, live wire, key metric, focus ring).

**Signature element:** hand-authored SVG system schematics, one per service. Node = rounded
rect; wire = 1px path; live path = cyan, animated once; human handoff = dashed return.
Replaces 9 generic lucide icons and all Unsplash stock photography.

**The risk:** the hero has no image, no gradient, no orb, no particles. One static headline,
one proof line, the primary action, one self-drawing schematic.

## 4. Colour

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

## 5. Typography

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

## 6. Information architecture

Nav: **Work · Services ▾ · About · Insights · [Start a project]**. One mega-panel under
Services makes all 26 service/industry/market leaf pages one click deep.

91 routes per locale preserved exactly. One route added: `/process`. `/case-studies` keeps
its URL — 12 indexed URLs sit on it; only the nav label ("Work") and the on-page framing
change.

## 7. Homepage — 9 sections

1. Hero — static headline, proof line, primary action, self-drawing schematic
2. Proof strip — anonymised descriptors + real numbers
3. What we build — 9 services in 3 clusters, each with its schematic
4. How an engagement runs — 4 steps (numbers legitimate: it is a real sequence)
5. Selected work — 3 real anonymised engagements
6. Scenarios — the 6 `cases.ts` entries, relabelled, placed below real work
7. Where we work — markets + industries strip, local systems named
8. FAQ — 5 questions, readable, each linking deeper
9. Start a project — the brief form inline

## 8. Search and discoverability — corrected position

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

## 9. Proof integrity — binding rule

Placeholders exist **only** as visibly marked internal development placeholders, rendered
with an obvious dev-only treatment and carrying the literal token `PLACEHOLDER`.

**No fabricated statistic, project result, client claim, rating, or metric may enter a
production build.** A build gate fails on any remaining placeholder token.

Required from client before launch: three engagements — sector and city, what was connected,
one measured outcome, and how far the anonymising goes.

## 10. Brand separation — non-negotiable

Raanzlr must not borrow the AldalatiUX design language. Specifically forbidden: single
orange accent, warm near-black grounds, square-edge/zero-radius systems, oversized condensed
uppercase display type. Raanzlr differentiates through structure, schematics, and real
product visuals — never by adopting the personal brand's palette or type.

## 11. Open flags

1. Proof figures do not exist in the project yet — blocks launch, not start
2. `foundingDate: 2023`, Casper WY HQ, and the Saudi page's "we've seen firsthand" claim are
   unverifiable from here; carried forward unchanged unless the client says otherwise
3. FAQ promises a free 30–45 min discovery call; nothing books one and `/book-a-call`
   redirects to contact. Either add a booking path or reword
4. `@raanzlr` on X and the LinkedIn company URL are published in schema; neither verified
5. No Search Console access — thin-market prioritisation is by inspection, not impressions
