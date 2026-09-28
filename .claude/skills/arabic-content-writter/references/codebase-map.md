# Codebase Map — Where Arabic Content Lives

App root: `artifacts/raanzlr/` (a pnpm workspace package). Stack: React 19 +
Vite + Tailwind v4 + `react-router-dom` + framer-motion.

## The bilingual system

All UI copy is centralized in **`src/lib/translations.ts`**. Structure:

```ts
export const BRAND = "Raanzlr";
export const CONTACT_EMAIL = "info@raanzlr.com";

const en = { nav: {...}, cta: {...}, home: {...}, services: {...}, ... };  // source of truth for shape
const ar: typeof en = { ... };   // MUST mirror en exactly
export const translations = { en, ar };
export type Translations = typeof en;
```

Key facts:
- `en` starts at line ~4; `ar` is declared `const ar: typeof en = {` at ~line 291.
- **`ar` is typed `typeof en`.** TypeScript will fail the build if `ar` is
  missing a key, adds an extra key, or an indexed structure diverges. **You must
  keep the `ar` object shape identical to `en`:** same keys, same nesting, same
  array lengths where the code indexes by position.
- `ar` ends with `isAr: true`. Preserve that.
- File is ~540 lines total.

### How components read it

```ts
const { t, isAr, lang } = useLang();   // from src/contexts/LanguageContext.tsx
t.services.items.find(s => s.key === slug)   // e.g. ServiceDetail.tsx
```

`t` is `translations.ar` when `isAr`, else `translations.en`. So editing the
`ar` object is how Arabic ships. Components do not hardcode strings.

## Language context — `src/contexts/LanguageContext.tsx`

- Locales: `["en", "ar"]`. Routes are locale-prefixed (`/ar/services`, `/en/…`).
- On `lang === "ar"` it sets `document.documentElement.dir = "rtl"` and
  `lang = "ar"`, and persists to `localStorage["raanzlr-lang"]`.
- `localizedPath()` builds locale-aware links; `toggleLang()` switches.
- **You never manage RTL in the copy itself** — the context handles direction.

## Rich content data — `src/data/`

Larger structured content lives here (also bilingual objects):
- `markets.ts` (~114 KB) — market/region pages.
- `posts.ts` (~116 KB) — blog/insight posts.
- `cases.ts` (~19 KB) — case studies.

When an Arabic task targets a market page, blog post, or case study, edit the
Arabic fields in these files (same tell/style rules apply). Confirm the object
shape before editing — these files define their own bilingual structure.

## Pages — `src/pages/`

Pages consume `t` and the data files; they generally contain **no literal Arabic
strings** (copy comes from `translations.ts` / `data/`). Notable:
- `Home.tsx` → `t.home.*` (hero, why, features).
- `Services.tsx` / `ServiceDetail.tsx` → `t.services.items[*]` (key, title, desc,
  long, helps[]).
- `About.tsx`, `Contact.tsx`, `FAQ.tsx`, `BookACall.tsx`, etc.
- `Markets.tsx` / `MarketDetail.tsx` → `src/data/markets.ts`.
- `Insights.tsx` / `InsightPost.tsx` → `src/data/posts.ts`.

If you must add UI-facing Arabic text, add it as a key in `translations.ts`
(both `en` and `ar`) and reference it via `t` — do not inline literals in JSX.

## Current state (as of writing this skill)

The live `ar` block still contains the AI tells the notes call out: ~26 em-dashes,
~5 middot triads, negative parallelism (`وليس العكس`, `وليس رداً آلياً`,
`وليس الزخرفة فقط`), and promotional phrasing (`بدقة واحترافية`). The client's
cleanup from `arabics_notes.md` has **not yet been applied**. A future task will
be to apply `approved-copy.md` into the `ar` object. (Do not do this unless asked.)

## Safe-edit procedure for `translations.ts`

1. Read the `en` block for the section you're touching to learn the exact shape.
2. Read the matching `ar` section.
3. Edit only the Arabic string values; keep every key and array length.
4. After editing, mentally diff `ar` vs `en` keys — they must match 1:1.
5. Run the type check to confirm nothing broke:
   ```
   pnpm --filter ./artifacts/raanzlr run typecheck   # or repo-root: pnpm run typecheck
   ```
6. Run the Arabic QA checklist from `SKILL.md` on every string you changed.

## Do-not-touch

- Do not translate/alter `BRAND`, `CONTACT_EMAIL`, keys, or `key:` slugs (they
  are used for routing/lookups, e.g. `"ai-chatbots"`).
- Do not change the `en` block when the task is Arabic-only.
- Do not restructure the objects; only edit values.
