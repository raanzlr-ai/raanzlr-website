# Raanzlr Website Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the presentation layer of raanzlr.com — tokens, components, page composition and copy — so the site presents real evidence in the brand's own visual language, while preserving every existing route, the prerendering pipeline, and the working form backend.

**Architecture:** The Vite 7 / React 19 / Tailwind 4 stack, the `routes.ts` single-source-of-truth, the build-time prerenderer and the Supabase + Turnstile form pipeline are all preserved untouched. Work proceeds bottom-up: token layer → typography → strip the decoration layer → primitives and the schematic system → homepage sections → service pages → market/industry content → forms, analytics and schema → verification. The prerenderer's existing build gates (missing `<h1>`, canonical mismatch, duplicate `<title>`) are extended with a placeholder gate so fabricated proof cannot reach production.

**Tech Stack:** Vite 7.3, React 19.1, TypeScript 5.9, Tailwind CSS 4.1, react-router-dom 7.17, react-helmet-async 2, framer-motion 12, Supabase (forms + posts), Cloudflare Turnstile, pnpm workspaces, Vercel. Vitest added for pure-logic tests.

**Spec:** `docs/superpowers/specs/2026-08-23-raanzlr-rebuild-design.md`

---

## Global Constraints

Every task's requirements implicitly include this section.

**Proof integrity (binding).** No fabricated statistic, project result, client claim, rating, or metric may enter a production build. Development placeholders must render with a visible dev-only treatment and carry the literal string `PLACEHOLDER`. The build fails if any survives.

**Route preservation.** All 91 routes per locale are preserved. No existing URL is deleted, renamed, or redirected. Exactly one route is added: `/process`. `/case-studies` keeps its URL; only its nav label and on-page framing change.

**Brand separation.** Raanzlr must never borrow the AldalatiUX design language. Forbidden: single orange accent, warm near-black grounds, square-edge/zero-radius systems, oversized condensed uppercase display type.

**Colour.** Exact values from spec §4. Cyan is a budget — target 5 uses per page. Depth comes from hairlines, never shadows. `--warn` is reserved for status and never becomes a second accent.

**Typography.** IBM Plex Sans / IBM Plex Sans Arabic / IBM Plex Mono only. Sentence case everywhere including display. Negative letter-spacing is **Latin-only** — it breaks Arabic glyph shaping. Arabic takes +0.08 line-height at every scale step and never takes uppercase.

**Quality floor, verified not assumed.** Semantic landmarks; exactly one `<h1>` per page; visible cyan focus ring on every interactive element, never removed; 44×44px minimum touch targets; WCAG AA contrast in **both** themes; `prefers-reduced-motion` honoured by every animation including schematics; content renders without JavaScript (the prerenderer guarantees this — it must keep passing).

**Structured data.** Entity clarification only, never a count to raise. Added only where it truthfully describes visible page content. `FAQPage` is optional semantic markup — Google deprecated FAQ rich results May 2026 and removed the feature June 2026; it earns nothing in Google Search and no work is sequenced on the assumption that it does. `llms.txt` is fixed for internal correctness only, not as a Google factor. Never add `HowTo`, `Product`, `JobPosting`, `AggregateRating`, or `Review`.

**Commands** (run from project root `/Users/odi-d/Desktop/MyCompany/Rannzlr/raanzlr-website`):
- `pnpm dev` — dev server on :5173
- `pnpm build` — client + SSR + prerender 187 pages + sitemaps
- `pnpm typecheck` — must pass cleanly from Task 1 onward
- `pnpm --filter @workspace/raanzlr test` — Vitest (added in Task 0)

**Commits.** Commit at the end of every task. This directory is **not a Git repository**. Task 0 resolves this — do not run `git init` outside Task 0.

---

## File Structure

### Created

| Path | Responsibility |
|---|---|
| `src/styles/tokens.css` | The three-layer token system. Only file defining raw colour values |
| `src/components/schematic/Schematic.tsx` | Renders a schematic from a typed spec. No diagram data |
| `src/components/schematic/grammar.ts` | Node/wire geometry primitives and the shared visual grammar |
| `src/components/schematic/diagrams.ts` | The 9 authored service diagrams, as data |
| `src/components/Placeholder.tsx` | Dev-only marked placeholder. The only sanctioned way to stub proof |
| `src/components/Section.tsx` | Section shell: spine anchor, label, heading, spacing |
| `src/components/SpineNav.tsx` | Section rail; collapses to a label row under 900px |
| `src/components/ProofStat.tsx` | Mono figure + descriptor + provenance |
| `src/components/WorkCard.tsx` | Anonymised engagement card |
| `src/components/ProcessFlow.tsx` | The four wired engagement steps |
| `src/components/FaqBlock.tsx` | Readable linked Q&A; optionally emits FAQPage |
| `src/components/BriefForm.tsx` | Qualified brief form on the existing endpoint |
| `src/components/MegaPanel.tsx` | Services mega-panel: services + industries + markets |
| `src/data/work.ts` | Real anonymised engagements. Placeholder-flagged until client supplies |
| `src/lib/schema.ts` | All JSON-LD builders. Pure functions, unit-tested |
| `src/pages/Process.tsx` | `/process` |
| `scripts/generate-agent-surfaces.mjs` | Generates `llms.txt` + WebMCP block from `routes.ts` |
| `src/lib/__tests__/schema.test.ts` | Schema builder tests |
| `src/lib/__tests__/placeholder.test.ts` | Placeholder detection tests |
| `vitest.config.ts` | Test runner config |

### Modified

| Path | Change |
|---|---|
| `src/index.css` | Imports tokens; drops glow/particle/shimmer/noise CSS |
| `src/lib/translations.ts` | Remove `as const`; add `/process` SEO keys; rewrite copy |
| `src/routes.ts` | Add `/process` |
| `src/App.tsx` | Add 3 `/process` route variants; drop `CustomCursor` |
| `vercel.json` | Add `process` to the unprefixed-section redirect regex |
| `scripts/prerender.mjs` | Add the placeholder build gate |
| `src/components/SEO.tsx` | Delegate JSON-LD to `lib/schema.ts` |
| `src/components/Navbar.tsx` | 4-item IA + mega-panel |
| `src/components/Footer.tsx` | Rebuilt link architecture |
| `src/pages/Home.tsx` | Fully recomposed, 9 sections |
| `src/pages/ServiceDetail.tsx` | New template |
| `src/pages/MarketDetail.tsx`, `IndustryDetail.tsx` | Direct-answer opening, internal links, FaqBlock |
| `src/pages/CaseStudies.tsx`, `CaseStudyDetail.tsx` | Real work first, scenarios reframed below |
| `src/data/cases.ts` | Add `kind: "scenario"`; relabel |
| `src/data/markets.ts`, `industriesData.ts` | Depth on 4 thin markets; internal link refs |
| `public/llms.txt`, `index.html` | Generated agent surfaces |

### Deleted

`src/components/ParticlesHero.tsx` · `CustomCursor.tsx` · `Heartbeat.tsx` · `PulseDivider.tsx` · `HeroHeadline.tsx` · `ServiceChart.tsx` (unused after rebuild — verify before deleting). Dependencies `@tsparticles/react`, `@tsparticles/slim`.

---

# Phase 0 — Foundation

## Task 0: Toolchain, safety net, and test runner

**Files:**
- Create: `vitest.config.ts`
- Create: `.gitignore` entries verified
- Modify: `artifacts/raanzlr/package.json` (add `test` script + vitest devDependency)

**Interfaces:**
- Consumes: nothing
- Produces: a working `pnpm build`, a Git repository with a baseline commit, and `pnpm --filter @workspace/raanzlr test` running Vitest

- [ ] **Step 1: Enable pnpm**

`pnpm` is not on PATH. Node is v24.18.0, which ships corepack:

```bash
corepack enable pnpm
pnpm --version
```

Expected: a version number ≥ 10. If corepack fails, `npm install -g pnpm` instead.

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/odi-d/Desktop/MyCompany/Rannzlr/raanzlr-website
pnpm install
```

Expected: completes without error, creates `node_modules`. Takes 30–60s.

- [ ] **Step 3: Capture a baseline production build**

This proves the pipeline works *before* any change, so later failures are attributable.

```bash
pnpm build
```

Expected: ends with `prerender: 187 HTML files (93 routes x 2 locales + 404) and 3 sitemaps written to dist/.` Record the exact route count printed — later tasks must not reduce it.

If this fails, STOP and use `superpowers:systematic-debugging`. Do not proceed with a broken baseline.

- [ ] **Step 4: Initialise Git and commit the baseline**

The user approved Git for this rebuild. This is the only task permitted to run `git init`.

```bash
cd /Users/odi-d/Desktop/MyCompany/Rannzlr/raanzlr-website
git init
git add -A
git commit -m "chore: baseline before rebuild"
git checkout -b rebuild/presentation-layer
```

Verify `.gitignore` already excludes `node_modules`, `dist`, `dist-ssr`, `.env`:

```bash
git status --porcelain | grep -E 'node_modules|dist/' && echo "LEAK — fix .gitignore" || echo "clean"
```

Expected: `clean`.

- [ ] **Step 5: Add Vitest**

Tests cover pure logic only — schema builders, the placeholder scanner, the agent-surface generator. Component and layout work is verified by the prerender gates and browser checks, not by snapshot tests.

`artifacts/raanzlr/vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    environment: "node",
    include: ["src/**/__tests__/**/*.test.ts"],
  },
});
```

Add to `artifacts/raanzlr/package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

Add to `devDependencies`: `"vitest": "^3.2.4"`.

```bash
pnpm install
```

- [ ] **Step 6: Write a smoke test proving the runner works**

`artifacts/raanzlr/src/lib/__tests__/smoke.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { ROUTE_PATHS } from "../../routes";

describe("route table", () => {
  it("exposes the home route", () => {
    expect(ROUTE_PATHS).toContain("/");
  });

  it("covers every service, market and industry section", () => {
    expect(ROUTE_PATHS).toContain("/services");
    expect(ROUTE_PATHS).toContain("/markets");
    expect(ROUTE_PATHS).toContain("/industries");
  });
});
```

- [ ] **Step 7: Run the tests**

```bash
pnpm --filter @workspace/raanzlr test
```

Expected: 2 passing.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: add vitest, verify baseline build"
```

---

## Task 1: Make typecheck a usable gate

`HOW-TO-RUN.txt` documents ~200 TypeScript errors as "expected". They come from one line and hide any real error behind noise.

**Files:**
- Modify: `src/lib/translations.ts:539`
- Modify: `HOW-TO-RUN.txt` (remove the section that documents the errors as normal)

**Interfaces:**
- Consumes: nothing
- Produces: `pnpm typecheck` exits 0. Every later task can use it as a gate.

- [ ] **Step 1: Reproduce the failure and count it**

```bash
pnpm typecheck 2>&1 | tail -5
```

Expected: a large error count, nearly all in `translations.ts`.

- [ ] **Step 2: Understand the cause before changing anything**

`translations.ts` ends:

```ts
} as const;

export const translations = { en, ar };
export type Translations = typeof en;
```

`as const` applies to the object literal it terminates, making every string a *literal* type
(`"Home"`, not `string`). `Translations = typeof en` then demands the Arabic strings be
identical literals to the English ones. The values are correct; the type is wrong.

- [ ] **Step 3: Apply the fix**

Remove `as const` from the terminating brace so string properties widen to `string`:

```ts
};

export const translations = { en, ar };
export type Translations = typeof en;
```

If `en` itself does not carry `as const` but `ar` does, remove it from whichever object
terminates at line 539. Only that one token changes — no values, no structure.

- [ ] **Step 4: Verify**

```bash
pnpm typecheck
```

Expected: exits 0, no output.

If errors remain, they are now *real*. Fix them individually — do not reinstate `as const`.

- [ ] **Step 5: Verify nothing broke at runtime**

```bash
pnpm build
```

Expected: same 187 files as the Task 0 baseline.

- [ ] **Step 6: Remove the stale documentation**

Delete the entire `IMPORTANT NOTE ABOUT "pnpm typecheck"` section from `HOW-TO-RUN.txt` — it now documents behaviour that no longer exists.

- [ ] **Step 7: Commit**

```bash
git add artifacts/raanzlr/src/lib/translations.ts HOW-TO-RUN.txt
git commit -m "fix: widen translation string types so typecheck passes"
```

---

## Task 2: Token layer — restore the brand navy

The dark theme is `--background: 0 0% 2%` — pure neutral black. The navy that carries Raanzlr's identity is absent from the site's dominant surface.

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/lib/__tests__/contrast.test.ts`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: nothing
- Produces: CSS custom properties `--ink-900`, `--ink-800`, `--ink-700`, `--ink-600`, `--line`, `--line-strong`, `--signal`, `--signal-ink`, `--warn`, `--tx-1`, `--tx-2`, `--tx-3`, in both themes. Tailwind utility names `bg-ink-900`, `text-tx-2`, `border-line`, `text-signal` etc. Every later task consumes these and must never hardcode a hex value.

- [ ] **Step 1: Write the failing contrast test**

Contrast is a correctness property, not a matter of taste, and it must hold in *both* themes — the current light theme was never checked.

`src/lib/__tests__/contrast.test.ts`:

```ts
import { describe, it, expect } from "vitest";

/** Relative luminance per WCAG 2.1. */
function luminance(hex: string): number {
  const v = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(v.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function ratio(fg: string, bg: string): number {
  const [a, b] = [luminance(fg), luminance(bg)];
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

const dark = {
  ink900: "#060B14", ink800: "#0A1220", signal: "#27D8FF",
  tx1: "#E6EEF6", tx2: "#9DB0C6", tx3: "#6F85A0",
};
const light = {
  ink900: "#F4F7FB", ink800: "#FFFFFF", signal: "#0A7EA0",
  tx1: "#0B1626", tx2: "#3D5670", tx3: "#5F7591",
};

describe("dark theme contrast", () => {
  it("primary text on page ground meets AAA", () => {
    expect(ratio(dark.tx1, dark.ink900)).toBeGreaterThanOrEqual(7);
  });
  it("secondary text on page ground meets AA", () => {
    expect(ratio(dark.tx2, dark.ink900)).toBeGreaterThanOrEqual(4.5);
  });
  it("muted labels on page ground meet AA for large text", () => {
    expect(ratio(dark.tx3, dark.ink900)).toBeGreaterThanOrEqual(3);
  });
  it("signal on card surface meets AA for large text and UI", () => {
    expect(ratio(dark.signal, dark.ink800)).toBeGreaterThanOrEqual(3);
  });
});

describe("light theme contrast", () => {
  it("primary text on page ground meets AAA", () => {
    expect(ratio(light.tx1, light.ink900)).toBeGreaterThanOrEqual(7);
  });
  it("secondary text on page ground meets AA", () => {
    expect(ratio(light.tx2, light.ink900)).toBeGreaterThanOrEqual(4.5);
  });
  it("signal on white surface meets AA for body text", () => {
    expect(ratio(light.signal, light.ink800)).toBeGreaterThanOrEqual(4.5);
  });
});
```

- [ ] **Step 2: Run it**

```bash
pnpm --filter @workspace/raanzlr test contrast
```

Expected: PASS. These values were chosen to satisfy these thresholds — the test exists so a
later "small tweak" to a colour cannot silently break accessibility. If any assertion fails,
the palette is wrong and must be corrected before proceeding, not the threshold lowered.

- [ ] **Step 3: Write the token file**

`src/styles/tokens.css`:

```css
/* ─────────────────────────────────────────────────────────────
   Raanzlr token system. This is the ONLY file that defines raw
   colour values. Components consume semantic names, never hex.

   Dark is the primary theme. Light is a rebuilt drafting-paper
   counterpart, not an inversion of dark.
   ───────────────────────────────────────────────────────────── */

@theme inline {
  --color-ink-900: var(--ink-900);
  --color-ink-800: var(--ink-800);
  --color-ink-700: var(--ink-700);
  --color-ink-600: var(--ink-600);
  --color-line: var(--line);
  --color-line-strong: var(--line-strong);
  --color-signal: var(--signal);
  --color-signal-ink: var(--signal-ink);
  --color-warn: var(--warn);
  --color-tx-1: var(--tx-1);
  --color-tx-2: var(--tx-2);
  --color-tx-3: var(--tx-3);

  /* shadcn compatibility — existing ui/* primitives read these names.
     Mapped onto the new palette so they keep working untouched. */
  --color-background: var(--ink-900);
  --color-foreground: var(--tx-1);
  --color-card: var(--ink-800);
  --color-card-foreground: var(--tx-1);
  --color-popover: var(--ink-800);
  --color-popover-foreground: var(--tx-1);
  --color-primary: var(--signal);
  --color-primary-foreground: var(--signal-ink);
  --color-secondary: var(--ink-600);
  --color-secondary-foreground: var(--tx-1);
  --color-muted: var(--ink-700);
  --color-muted-foreground: var(--tx-3);
  --color-accent: var(--ink-600);
  --color-accent-foreground: var(--tx-1);
  --color-border: var(--line);
  --color-input: var(--line);
  --color-ring: var(--signal);
  --color-destructive: var(--danger);
  --color-destructive-foreground: var(--signal-ink);

  --font-sans: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;

  --radius-sm: 3px;
  --radius-md: 4px;
  --radius-lg: 5px;
  --radius-xl: 8px;
}

/* ── DARK (primary) ─────────────────────────────────────────── */
:root,
.dark {
  --ink-900:#060B14;
  --ink-800:#0A1220;
  --ink-700:#0E1929;
  --ink-600:#12203A;
  --line:#1B2E4D;
  --line-strong:#24385C;
  --signal:#27D8FF;
  --signal-ink:#06121A;
  --signal-dim:#27d8ff26;
  --warn:#FFB020;
  --danger:#FF5C5C;
  --tx-1:#E6EEF6;
  --tx-2:#9DB0C6;
  --tx-3:#6F85A0;
  --radius:4px;
}

/* ── LIGHT — drafting paper, rebuilt not inverted ───────────── */
.light {
  --ink-900:#F4F7FB;
  --ink-800:#FFFFFF;
  --ink-700:#F7FAFD;
  --ink-600:#E4ECF5;
  --line:#CBD9E8;
  --line-strong:#A9BFD6;
  --signal:#0A7EA0;
  --signal-ink:#FFFFFF;
  --signal-dim:#0a7ea01a;
  --warn:#9A6100;
  --danger:#C2201C;
  --tx-1:#0B1626;
  --tx-2:#3D5670;
  --tx-3:#5F7591;
}
```

- [ ] **Step 4: Rewrite `src/index.css`**

Replace the whole file. Everything removed here is either superseded by tokens or is
decoration the spec deletes.

```css
@import "tailwindcss";
@import "./styles/tokens.css";

@custom-variant dark (&:is(.dark *));

@layer base {
  *, *::before, *::after { box-sizing: border-box; border-color: var(--line); }

  html { color-scheme: light dark; }
  @media (prefers-reduced-motion: no-preference) {
    html { scroll-behavior: smooth; }
  }

  body {
    background: var(--ink-900);
    color: var(--tx-1);
    font-family: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 1.65;
  }

  /* Focus is never removed — only restyled. */
  :focus-visible {
    outline: 2px solid var(--signal);
    outline-offset: 2px;
    border-radius: 2px;
  }

  ::selection { background: var(--signal); color: var(--signal-ink); }
}
```

Note what is deliberately absent: `.bg-grid`, `.bg-radial-fade`, `.noise`,
`.shimmer-layer`, `.glow-text`, `.text-chrome`, `.slow-spin`, `.floaty`, the global
0.35s transition on every element, and the `[dir="rtl"] h1 { line-height: 1.45 !important }`
override (replaced properly in Task 3).

- [ ] **Step 5: Verify the site still builds and renders**

```bash
pnpm typecheck && pnpm build
```

Expected: typecheck clean; build writes 187 files.

The site will look broken at this point — classes referencing deleted CSS are still in the
JSX. That is expected and is resolved by Task 4. The gate here is that the *build* passes.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: token system, restore brand navy in dark theme"
```

---

## Task 3: Typography — IBM Plex superfamily

**Files:**
- Modify: `index.html` (font links)
- Modify: `src/styles/tokens.css` (type scale + RTL rules)

**Interfaces:**
- Consumes: `tokens.css` from Task 2
- Produces: utility classes `.t-display`, `.t-h2`, `.t-h3`, `.t-body`, `.t-small`, `.t-label`, and correct Arabic metrics under `[dir="rtl"]`

- [ ] **Step 1: Replace the font links in `index.html`**

Find the four `fonts.googleapis.com` links (preload, stylesheet, noscript) and replace their
`href` query with the Plex superfamily. Keep the existing non-render-blocking pattern —
preconnect, preload, `media="print"` onload swap, noscript fallback — exactly as it is.

```
https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap
```

Also update `<meta name="theme-color">`: light `#F4F7FB`, dark `#060B14`.

- [ ] **Step 2: Append the type scale to `tokens.css`**

```css
/* ── TYPE ───────────────────────────────────────────────────── */
.t-display {
  font-size: clamp(2.25rem, 1.4rem + 3.6vw, 4rem);
  line-height: 1.05; letter-spacing: -0.022em; font-weight: 600;
  text-wrap: balance;
}
.t-h2 {
  font-size: clamp(1.75rem, 1.3rem + 1.9vw, 2.5rem);
  line-height: 1.12; letter-spacing: -0.016em; font-weight: 600;
  text-wrap: balance;
}
.t-h3 { font-size: 1.25rem; line-height: 1.3; letter-spacing: -0.008em; font-weight: 600; }
.t-body { font-size: 1rem; line-height: 1.65; }
@media (min-width: 768px) { .t-body { font-size: 1.0625rem; } }
.t-small { font-size: 0.875rem; line-height: 1.55; }
.t-label {
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.14em;
  text-transform: uppercase; line-height: 1;
}
.t-data {
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-variant-numeric: tabular-nums;
}
/* Running text stays readable. */
.measure { max-width: 68ch; }

/* ── ARABIC ─────────────────────────────────────────────────────
   Three rules, each fixing a real defect:
   1. Negative tracking breaks Arabic glyph joining — zero it out.
   2. Arabic needs more leading than Latin at every size.
   3. Arabic has no uppercase; text-transform produces nothing but
      breaks the letterform rhythm of the mono labels.            */
[dir="rtl"] body,
[dir="rtl"] .t-display,
[dir="rtl"] .t-h2,
[dir="rtl"] .t-h3,
[dir="rtl"] .t-body,
[dir="rtl"] .t-small {
  font-family: "IBM Plex Sans Arabic", "IBM Plex Sans", sans-serif;
  letter-spacing: 0;
}
[dir="rtl"] .t-display { line-height: 1.25; }
[dir="rtl"] .t-h2      { line-height: 1.30; }
[dir="rtl"] .t-h3      { line-height: 1.45; }
[dir="rtl"] .t-body    { line-height: 1.85; }
[dir="rtl"] .t-small   { line-height: 1.75; }
[dir="rtl"] .t-label   { text-transform: none; letter-spacing: 0.06em; }
```

- [ ] **Step 3: Verify both scripts render in the right faces**

```bash
pnpm dev
```

Then in a browser at `http://localhost:5173/en` and `http://localhost:5173/ar`, check in
DevTools that a heading's computed `font-family` resolves to `IBM Plex Sans` on `/en` and
`IBM Plex Sans Arabic` on `/ar` — **not** a fallback. A silent fallback is the most common
failure here and looks almost right.

```js
getComputedStyle(document.querySelector("h1")).fontFamily
```

- [ ] **Step 4: Verify no Arabic clipping**

On `/ar`, confirm no descender or diacritic is cut off in any heading. The old
`!important` line-height override existed to paper over exactly this; the new per-size
values replace it properly.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: IBM Plex superfamily, unified Latin and Arabic typography"
```

---

## Task 4: Strip the decoration layer

**Files:**
- Delete: `src/components/ParticlesHero.tsx`, `CustomCursor.tsx`, `Heartbeat.tsx`, `PulseDivider.tsx`
- Modify: `src/App.tsx`, `src/pages/Home.tsx`, and every file importing the above
- Modify: `artifacts/raanzlr/package.json` (drop tsparticles)

**Interfaces:**
- Consumes: Task 2 tokens
- Produces: a codebase with no particle system, no custom cursor, no glow. Home renders plainly but correctly.

- [ ] **Step 1: Find every consumer before deleting anything**

```bash
cd artifacts/raanzlr
grep -rn "ParticlesHero\|CustomCursor\|Heartbeat\|PulseDivider\|glow-text\|text-chrome\|shimmer-layer\|bg-grid\|bg-radial-fade\|noise\|slow-spin\|floaty" src --include=*.tsx --include=*.ts
```

Record every hit. Each must be resolved — not left referencing a deleted class.

- [ ] **Step 2: Remove the component usages**

In `src/App.tsx`: delete the `CustomCursor` import and its `<CustomCursor />` element.

In `src/pages/Home.tsx`: delete every `<ParticlesHero .../>` element and its wrapper div,
every `<PulseDivider />`, every `<Heartbeat .../>`, and the entire `HeroLogoStage` component
(the radar). Replace `text-chrome` with `text-tx-1`, and delete `glow-text`, `shimmer-layer`,
`bg-grid`, `bg-radial-fade`, `noise`, `slow-spin`, `floaty` class references and the blurred
orb divs.

Home will be visually sparse after this. Task 9 onward rebuilds it.

- [ ] **Step 3: Neutralise MagneticButton's physics, keep the button**

In `src/components/MagneticButton.tsx`, remove the pointer-tracking motion values and the
spring transform. Keep the component, its props, its `testId`, and its link behaviour — many
pages import it and the API must not change.

- [ ] **Step 4: Delete the files**

```bash
rm src/components/ParticlesHero.tsx src/components/CustomCursor.tsx \
   src/components/Heartbeat.tsx src/components/PulseDivider.tsx
```

- [ ] **Step 5: Drop the dependencies**

Remove `@tsparticles/react` and `@tsparticles/slim` from the `dependencies` block of
`artifacts/raanzlr/package.json`, and the `'@tsparticles/engine': true` line from
`allowBuilds` in `pnpm-workspace.yaml`.

```bash
cd /Users/odi-d/Desktop/MyCompany/Rannzlr/raanzlr-website
pnpm install
```

- [ ] **Step 6: Verify nothing dangles**

```bash
cd artifacts/raanzlr
grep -rn "ParticlesHero\|CustomCursor\|Heartbeat\|PulseDivider\|tsparticles" src && echo "DANGLING REFS" || echo "clean"
```

Expected: `clean`.

```bash
cd /Users/odi-d/Desktop/MyCompany/Rannzlr/raanzlr-website
pnpm typecheck && pnpm build
```

Expected: typecheck clean, 187 files.

- [ ] **Step 7: Confirm the bundle actually shrank**

```bash
du -sh artifacts/raanzlr/dist/assets
```

Compare against the Task 0 baseline. tsparticles is large; a reduction confirms it left the
bundle rather than merely leaving the source.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "refactor: remove particle, cursor and glow decoration layer"
```

---

## Task 5: Placeholder discipline and the build gate

This is the mechanism that enforces the binding proof-integrity constraint. It must exist **before** any section that displays a metric.

**Files:**
- Create: `src/components/Placeholder.tsx`
- Create: `src/lib/placeholder.ts`
- Create: `src/lib/__tests__/placeholder.test.ts`
- Modify: `scripts/prerender.mjs`

**Interfaces:**
- Consumes: Task 2 tokens
- Produces:
  - `PLACEHOLDER_TOKEN: string` — the literal `"PLACEHOLDER"`
  - `findPlaceholders(html: string): string[]` — returns surrounding context for each occurrence
  - `<Placeholder label="what is missing" />` — React component rendering a visibly marked stub

- [ ] **Step 1: Write the failing test**

`src/lib/__tests__/placeholder.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { PLACEHOLDER_TOKEN, findPlaceholders } from "../placeholder";

describe("PLACEHOLDER_TOKEN", () => {
  it("is the literal string the build gate greps for", () => {
    expect(PLACEHOLDER_TOKEN).toBe("PLACEHOLDER");
  });
});

describe("findPlaceholders", () => {
  it("returns nothing for clean markup", () => {
    expect(findPlaceholders("<p>78% of inquiries handled</p>")).toEqual([]);
  });

  it("finds a placeholder and reports surrounding context", () => {
    const found = findPlaceholders('<span data-placeholder>PLACEHOLDER: lead volume</span>');
    expect(found).toHaveLength(1);
    expect(found[0]).toContain("lead volume");
  });

  it("finds every occurrence, not just the first", () => {
    const html = "<i>PLACEHOLDER: a</i><i>PLACEHOLDER: b</i><i>PLACEHOLDER: c</i>";
    expect(findPlaceholders(html)).toHaveLength(3);
  });

  it("is case-sensitive so ordinary prose never trips it", () => {
    expect(findPlaceholders("<p>a placeholder image sits here</p>")).toEqual([]);
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

```bash
pnpm --filter @workspace/raanzlr test placeholder
```

Expected: FAIL — `Cannot find module '../placeholder'`.

- [ ] **Step 3: Implement**

`src/lib/placeholder.ts`:

```ts
/**
 * Proof-integrity guard.
 *
 * The site may not ship a fabricated statistic, result, client claim or metric.
 * During development, unknown figures are rendered through <Placeholder />,
 * which emits this token. The prerender build gate greps the rendered HTML for
 * it and fails the build, so a placeholder cannot reach production by being
 * forgotten.
 *
 * Case-sensitive on purpose: the word "placeholder" appears in ordinary prose
 * and in unrelated attributes, and must not trip the gate.
 */
export const PLACEHOLDER_TOKEN = "PLACEHOLDER";

const CONTEXT_CHARS = 60;

export function findPlaceholders(html: string): string[] {
  const hits: string[] = [];
  let from = 0;
  for (;;) {
    const at = html.indexOf(PLACEHOLDER_TOKEN, from);
    if (at === -1) return hits;
    hits.push(html.slice(at, Math.min(html.length, at + CONTEXT_CHARS)));
    from = at + PLACEHOLDER_TOKEN.length;
  }
}
```

- [ ] **Step 4: Run the tests**

```bash
pnpm --filter @workspace/raanzlr test placeholder
```

Expected: 4 passing.

- [ ] **Step 5: Build the component**

`src/components/Placeholder.tsx`:

```tsx
import { PLACEHOLDER_TOKEN } from "../lib/placeholder";

/**
 * A visibly-marked development stub for a figure we do not have yet.
 *
 * Deliberately ugly. It must be impossible to mistake for real content in a
 * screenshot, and impossible to ship — the prerender gate fails the build on
 * the token this renders.
 */
export default function Placeholder({ label }: { label: string }) {
  return (
    <span
      data-placeholder="true"
      className="t-data inline-flex items-center gap-1.5 rounded-sm border border-dashed
                 border-warn/70 bg-warn/10 px-1.5 py-0.5 text-[0.8em] text-warn"
    >
      <span aria-hidden="true">◆</span>
      {PLACEHOLDER_TOKEN}: {label}
    </span>
  );
}
```

- [ ] **Step 6: Add the build gate to `scripts/prerender.mjs`**

The prerenderer already fails the build on a missing `<h1>`, a wrong canonical and a
duplicate `<title>`. Add a fourth gate in the same loop.

Near the top, beside the other regex constants:

```js
/** Proof integrity — see src/lib/placeholder.ts. */
const PLACEHOLDER_TOKEN = "PLACEHOLDER";
const ALLOW_PLACEHOLDERS = process.env.ALLOW_PLACEHOLDERS === "1";
```

Inside the `for (const route of routes)` loop, directly after the existing `<h1>` check:

```js
      if (!ALLOW_PLACEHOLDERS && rendered.html.includes(PLACEHOLDER_TOKEN)) {
        const at = rendered.html.indexOf(PLACEHOLDER_TOKEN);
        throw new Error(
          `prerender: ${url} still contains an unresolved ${PLACEHOLDER_TOKEN} ` +
            `— "${rendered.html.slice(at, at + 60)}". Real content is required before ` +
            `a production build. Set ALLOW_PLACEHOLDERS=1 for a development build.`,
        );
      }
```

- [ ] **Step 7: Prove the gate actually fires**

A gate that has never failed is not known to work. Temporarily render a `<Placeholder />` in
`src/pages/About.tsx`, then:

```bash
pnpm build
```

Expected: build **fails** with `prerender: /en/about still contains an unresolved PLACEHOLDER`.

Then confirm the escape hatch works:

```bash
ALLOW_PLACEHOLDERS=1 pnpm build
```

Expected: succeeds, 187 files.

Now remove the temporary `<Placeholder />` from `About.tsx` and confirm a clean
`pnpm build` passes again.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: placeholder component and production build gate"
```

---

# Phase 1 — The signature system

## Task 6: Schematic grammar and the first three diagrams

**Files:**
- Create: `src/components/schematic/grammar.ts`
- Create: `src/components/schematic/Schematic.tsx`
- Create: `src/components/schematic/diagrams.ts`

**Interfaces:**
- Consumes: Task 2 tokens
- Produces:

```ts
export interface SchematicNode {
  id: string;
  label: string;          // shown inside the node
  x: number; y: number;   // top-left, in viewBox units
  w?: number;             // default 104
  h?: number;             // default 36
  live?: boolean;         // cyan treatment — at most one per diagram
}
export interface SchematicWire {
  from: string; to: string;   // node ids
  label?: string;             // mono micro-label, uppercase Latin only
  live?: boolean;             // animated cyan path
  route?: "straight" | "down" | "up";
}
export interface SchematicSpec {
  id: string;                 // matches the service key
  title: string;              // <title> — required, this is the a11y name
  description: string;        // <desc> — the flow, in a sentence
  nodes: SchematicNode[];
  wires: SchematicWire[];
  width?: number;             // viewBox width, default 720
  height?: number;            // viewBox height, default 178
}
export const DIAGRAMS: Record<string, SchematicSpec>;
```
`<Schematic spec={DIAGRAMS["ai-chatbots"]} />`

- [ ] **Step 1: Write the grammar module**

`src/components/schematic/grammar.ts` holds the geometry and the visual constants, so no
diagram author re-invents them:

```ts
import type { SchematicNode, SchematicWire } from "./types";

export const NODE_W = 104;
export const NODE_H = 36;
export const RADIUS = 4;

/** Centre-right anchor of a node — where a wire leaves. */
export function exitPoint(n: SchematicNode) {
  return { x: n.x + (n.w ?? NODE_W), y: n.y + (n.h ?? NODE_H) / 2 };
}
/** Centre-left anchor — where a wire arrives. */
export function entryPoint(n: SchematicNode) {
  return { x: n.x, y: n.y + (n.h ?? NODE_H) / 2 };
}

/**
 * Wire path. Orthogonal with a single rounded elbow — the drafting convention.
 * Diagonals are deliberately not supported: they read as decoration, and every
 * real flow in this system is a horizontal hop or a right-angle branch.
 */
export function wirePath(a: SchematicNode, b: SchematicNode): string {
  const p = exitPoint(a);
  const q = entryPoint(b);
  if (Math.abs(p.y - q.y) < 1) return `M${p.x} ${p.y} H${q.x}`;
  const midX = p.x + (q.x - p.x) / 2;
  const dir = q.y > p.y ? 1 : -1;
  const r = 8;
  return (
    `M${p.x} ${p.y} H${midX - r} ` +
    `q${r} 0 ${r} ${r * dir} ` +
    `V${q.y - r * dir} ` +
    `q0 ${r * dir} ${r} ${r * dir} ` +
    `H${q.x}`
  );
}

export function labelAnchor(a: SchematicNode, b: SchematicNode) {
  const p = exitPoint(a);
  const q = entryPoint(b);
  return { x: (p.x + q.x) / 2, y: Math.min(p.y, q.y) - 8 };
}
```

Put the interfaces from the **Interfaces** block above into
`src/components/schematic/types.ts`.

- [ ] **Step 2: Write the renderer**

`src/components/schematic/Schematic.tsx`:

```tsx
import { useId } from "react";
import type { SchematicSpec } from "./types";
import { NODE_W, NODE_H, RADIUS, wirePath, labelAnchor } from "./grammar";

/**
 * Renders a system schematic — the site's signature element.
 *
 * Accessibility: the diagram is an image with a real name and description, so
 * a screen reader gets the flow as a sentence rather than a list of node
 * labels. The visual is not the only carrier of the information.
 *
 * Motion: the live path animates its dash offset. Under prefers-reduced-motion
 * the animation is not applied at all (handled in CSS), leaving a static cyan
 * path — the meaning survives, the movement does not.
 */
export default function Schematic({ spec, className = "" }: {
  spec: SchematicSpec;
  className?: string;
}) {
  const uid = useId();
  const titleId = `${uid}-t`;
  const descId = `${uid}-d`;
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));

  return (
    <div className={`overflow-x-auto ${className}`}>
      <svg
        viewBox={`0 0 ${spec.width ?? 720} ${spec.height ?? 178}`}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        className="block w-full min-w-[520px] h-auto"
      >
        <title id={titleId}>{spec.title}</title>
        <desc id={descId}>{spec.description}</desc>

        {spec.wires.map((w, i) => {
          const a = byId.get(w.from);
          const b = byId.get(w.to);
          if (!a || !b) return null;
          const anchor = labelAnchor(a, b);
          return (
            <g key={i}>
              <path
                d={wirePath(a, b)}
                fill="none"
                strokeWidth={w.live ? 1.25 : 1}
                stroke={w.live ? "var(--signal)" : "var(--line-strong)"}
                className={w.live ? "sc-live" : undefined}
              />
              {w.label && (
                <text
                  x={anchor.x}
                  y={anchor.y}
                  textAnchor="middle"
                  className="t-data"
                  fill="var(--tx-3)"
                  fontSize="9"
                  letterSpacing="0.1em"
                >
                  {w.label}
                </text>
              )}
            </g>
          );
        })}

        {spec.nodes.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x} y={n.y}
              width={n.w ?? NODE_W} height={n.h ?? NODE_H}
              rx={RADIUS}
              fill={n.live ? "var(--ink-600)" : "var(--ink-700)"}
              stroke={n.live ? "var(--signal)" : "var(--line-strong)"}
            />
            <text
              x={n.x + 14}
              y={n.y + (n.h ?? NODE_H) / 2 + 4}
              fill={n.live ? "var(--tx-1)" : "var(--tx-2)"}
              fontSize="11.5"
              fontFamily="IBM Plex Sans, sans-serif"
            >
              {n.label}
            </text>
            {n.live && (
              <circle cx={n.x + (n.w ?? NODE_W) - 10} cy={n.y + 8} r="3" fill="var(--signal)" />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
```

Add to `tokens.css`:

```css
@media (prefers-reduced-motion: no-preference) {
  .sc-live { stroke-dasharray: 4 4; animation: sc-flow 1.4s linear infinite; }
  @keyframes sc-flow { to { stroke-dashoffset: -16; } }
}
```

- [ ] **Step 3: Author the first three diagrams**

`src/components/schematic/diagrams.ts` — these three cover the three service clusters, so
the grammar is proven against all of them before the remaining six are drawn.

```ts
import type { SchematicSpec } from "./types";

export const DIAGRAMS: Record<string, SchematicSpec> = {
  "ai-chatbots": {
    id: "ai-chatbots",
    title: "WhatsApp AI agent",
    description:
      "A customer message enters through the WhatsApp Business API and reaches the AI agent. " +
      "The agent reads the product catalogue, writes qualified leads to the CRM, and escalates " +
      "to a human agent when the conversation needs one.",
    nodes: [
      { id: "cust", label: "Customer", x: 8, y: 44 },
      { id: "wa", label: "WhatsApp API", x: 176, y: 44, w: 108 },
      { id: "agent", label: "Agent", x: 352, y: 40, w: 66, h: 44, live: true },
      { id: "crm", label: "CRM record", x: 486, y: 44, w: 108 },
      { id: "human", label: "Human agent", x: 486, y: 112, w: 108 },
      { id: "cat", label: "Catalogue", x: 238, y: 116, w: 98 },
    ],
    wires: [
      { from: "cust", to: "wa", live: true },
      { from: "wa", to: "agent", live: true },
      { from: "agent", to: "crm", label: "SYNC" },
      { from: "agent", to: "human", label: "ESCALATE" },
      { from: "cat", to: "agent", label: "READ" },
    ],
  },

  "workflow-automation": {
    id: "workflow-automation",
    title: "Lead routing automation",
    description:
      "Leads arrive from web forms, ad platforms and WhatsApp into a single n8n workflow, " +
      "which de-duplicates and validates them, scores them, and routes each one to the right " +
      "consultant in the CRM.",
    nodes: [
      { id: "forms", label: "Web forms", x: 8, y: 16, w: 96 },
      { id: "ads", label: "Ad platforms", x: 8, y: 68, w: 96 },
      { id: "wa", label: "WhatsApp", x: 8, y: 120, w: 96 },
      { id: "flow", label: "n8n workflow", x: 210, y: 62, w: 116, h: 48, live: true },
      { id: "dedupe", label: "De-duplicate", x: 384, y: 20, w: 108 },
      { id: "score", label: "Score & route", x: 384, y: 88, w: 108 },
      { id: "crm", label: "CRM", x: 566, y: 54, w: 84 },
    ],
    wires: [
      { from: "forms", to: "flow", live: true },
      { from: "ads", to: "flow", live: true },
      { from: "wa", to: "flow", live: true },
      { from: "flow", to: "dedupe", label: "CLEAN" },
      { from: "flow", to: "score", label: "CLASSIFY" },
      { from: "dedupe", to: "crm" },
      { from: "score", to: "crm" },
    ],
  },

  "custom-ai": {
    id: "custom-ai",
    title: "Retrieval-augmented answering over private documents",
    description:
      "Internal documents are parsed and embedded into a vector index. A question is embedded, " +
      "matched against that index, and answered by the model using only the retrieved passages, " +
      "with the source references returned alongside the answer.",
    nodes: [
      { id: "docs", label: "Documents", x: 8, y: 16, w: 100 },
      { id: "parse", label: "Parse & chunk", x: 176, y: 16, w: 112 },
      { id: "index", label: "Vector index", x: 356, y: 16, w: 108 },
      { id: "q", label: "Question", x: 8, y: 118, w: 100 },
      { id: "model", label: "Model", x: 356, y: 114, w: 108, h: 44, live: true },
      { id: "ans", label: "Answer + sources", x: 536, y: 114, w: 128 },
    ],
    wires: [
      { from: "docs", to: "parse" },
      { from: "parse", to: "index", label: "EMBED" },
      { from: "q", to: "model", live: true },
      { from: "index", to: "model", label: "RETRIEVE" },
      { from: "model", to: "ans", live: true },
    ],
  },
};
```

- [ ] **Step 4: Verify visually against the approved reference**

Render all three on a scratch route, then compare with the schematic in the approved
proposal (`docs/superpowers/specs/2026-08-23-raanzlr-rebuild-design.md` links it). Use
Playwright at 1440 and 390. Check: no wire crosses a node; no label collides with a wire;
exactly one `live` node per diagram; the whole diagram fits its viewBox.

- [ ] **Step 5: Verify accessibility and reduced motion**

In DevTools, confirm each `<svg>` exposes its `<title>` as the accessible name. Then enable
"Emulate prefers-reduced-motion: reduce" and confirm the live path stops animating but stays
cyan.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: schematic grammar, renderer and first three service diagrams"
```

---

## Task 7: The remaining six diagrams

**Files:**
- Modify: `src/components/schematic/diagrams.ts`

**Interfaces:**
- Consumes: `SchematicSpec`, `DIAGRAMS` from Task 6
- Produces: `DIAGRAMS` containing all 9 service keys

- [ ] **Step 1: Author the six remaining diagrams**

Add specs keyed exactly to the service keys in `translations.ts`:
`ai-video-dubbing`, `web-development`, `mobile-apps`, `crm-integration`, `ui-ux`,
`consulting`.

Each must describe the **real** flow, using the same grammar as Task 6 — orthogonal wires,
at most one `live` node, mono uppercase Latin wire labels, a `title` that names the system
and a `description` that states the flow as a sentence. Suggested subjects, drawn from the
existing service copy in `translations.ts`:

| Key | Flow to draw |
|---|---|
| `ai-video-dubbing` | Source video → transcribe → translate → re-voice → mix with original music → dubbed video + transcript files |
| `web-development` | Content source → build → prerender per locale → CDN edge → visitor, with a form posting back to an endpoint |
| `mobile-apps` | App → local store (offline) → sync service → backend API, with push notification as a side branch |
| `crm-integration` | ERP ⇄ integration layer ⇄ CRM, with a retry queue and an error log as branches |
| `ui-ux` | Research → flows → design system → component library → shipped interface, feeding back from usage |
| `consulting` | Current systems → audit → prioritised roadmap, with effort and impact as the two branches feeding the roadmap |

- [ ] **Step 2: Write a test that no service can lose its diagram**

Append to `src/lib/__tests__/smoke.test.ts`:

```ts
import { DIAGRAMS } from "../../components/schematic/diagrams";
import { translations } from "../translations";

describe("schematic coverage", () => {
  const keys = translations.en.services.items.map((s: { key: string }) => s.key);

  it("has a diagram for every service", () => {
    for (const key of keys) {
      expect(DIAGRAMS[key], `missing diagram for "${key}"`).toBeDefined();
    }
  });

  it("gives every diagram a title and description for screen readers", () => {
    for (const spec of Object.values(DIAGRAMS)) {
      expect(spec.title.length).toBeGreaterThan(0);
      expect(spec.description.length).toBeGreaterThan(20);
    }
  });

  it("marks at most one node live per diagram", () => {
    for (const spec of Object.values(DIAGRAMS)) {
      expect(spec.nodes.filter((n) => n.live).length).toBeLessThanOrEqual(1);
    }
  });

  it("only wires nodes that exist", () => {
    for (const spec of Object.values(DIAGRAMS)) {
      const ids = new Set(spec.nodes.map((n) => n.id));
      for (const w of spec.wires) {
        expect(ids.has(w.from), `${spec.id}: no node "${w.from}"`).toBe(true);
        expect(ids.has(w.to), `${spec.id}: no node "${w.to}"`).toBe(true);
      }
    }
  });
});
```

- [ ] **Step 2b: Run it**

```bash
pnpm --filter @workspace/raanzlr test
```

Expected: all passing, including 9/9 diagram coverage.

- [ ] **Step 3: Visual check on all nine**

Render the full set on a scratch route at 1440 and 390. Same checks as Task 6 Step 4.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: complete the nine service schematics"
```

---
