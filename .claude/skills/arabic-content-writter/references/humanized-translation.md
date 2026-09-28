# Humanized English → Arabic Translation

This is the skill's core engine: turn English site copy into Arabic that reads
as if a native Arab marketer wrote it from scratch. It behaves like a translation
app in coverage (any English string in, correct Arabic out) but like a human
content creator in quality (natural, idiomatic, zero AI tells).

> The one rule that governs everything here: **translate the meaning, then
> rewrite it as a native would say it — never translate the words.**
> Literal translation is the fastest way to produce the exact AI tells the
> client rejects. See `ai-detection-rules.md`.

---

## Decision first: reuse or translate?

Before translating anything, check `approved-copy.md`.

1. **If the section already exists there → use that Arabic verbatim.** The client
   already approved it. Do not re-translate.
2. **If it does not exist → humanize-translate the English** using the process
   below.

This matters for the bulk migration: the notes already cover the hero, why-us,
services, about, and the main service pages. Only genuinely new/uncovered strings
get translated from scratch.

---

## The 6-step humanization process

For each English string:

1. **Read for intent, not words.** What is this line trying to make the reader
   feel or do? Ignore the English sentence structure entirely.
2. **Draft meaning-first Arabic (transcreation).** Write what a native marketer
   would say to convey that intent. It is fine to split one English sentence into
   two Arabic ones, reorder ideas, or drop filler.
3. **Run the anti-AI-tell filter.** Remove every dash, break every triad, kill
   every `من X إلى Y`, cut `وليس ...`, delete kickers, strip superlatives.
4. **Apply the style guide.** First-person plural company voice (`نبني`,
   `نساعدك`), Arabic-Indic numerals, keep Latin brand/tech terms inline, Arabic
   punctuation. See `style-guide.md`.
5. **Read-aloud naturalness test.** Say the Arabic in your head. Would a real
   Arab professional actually phrase it this way, or does it smell "translated"?
   If it smells translated, rewrite it looser.
6. **QA against the checklist** in `SKILL.md`. Do not ship until it passes.

---

## Why literal machine translation fails in Arabic (and how to fix it)

Standard MT carries English structure straight across. That structure IS the
tell. Watch for these calques:

| English pattern | Literal MT (AI tell) | Humanized fix |
|---|---|---|
| Em-dash aside `A — B` | `A — B` (dash kept) | Split into two sentences or use `،` `:` |
| "From X to Y" | `من X إلى Y` | Name both directly: `X وY`, or one clear sentence |
| Adjective/noun triad | `دقة، سرعة، وأثر` | Reshape to a sentence or 2/4 items |
| Passive / nominal English | stiff `يتم ...`, `تتم عملية ...` | Active first-person plural: `نبني`, `نربط` |
| Possessive stacking | over-literal `الخاص بك` everywhere | Natural suffix: `أدواتك`, `فريقك` |
| Marketing superlative | `بدقة فائقة`, `احترافية عالية` | Drop it; give a concrete fact |
| English idiom | word-for-word nonsense | Localize to the Arabic equivalent |
| English word order (SVO) | mirrored, robotic | Natural Arabic flow / topic-comment |

---

## Worked examples (real site strings → humanized Arabic)

These use the actual English from `translations.ts` and the client-approved
Arabic from the notes. Study the *gap* between the literal and the human version.

### Example 1 — hero subtitle
**English (`home.heroSub`):**
> From automating daily operations to building custom intelligent systems, we create solutions that help teams work more efficiently and make better decisions.

**Literal MT (rejected — note the `من ... إلى ...` calque):**
> من أتمتة العمليات اليومية إلى بناء أنظمة ذكية مخصصة، نصنع حلولاً تساعد الفرق على العمل بكفاءة أكبر واتخاذ قرارات أفضل.

**Humanized (client-approved):**
> نبني ذكاءً اصطناعياً يخدم أعمالك فعلاً. نؤتمت مهامك اليومية ونطوّر أنظمة ذكية مخصصة لفريقك، فيعمل بكفاءة أكبر ويتخذ قرارات أوضح.

_What changed: the fake "from…to…" range is gone; one English sentence became
two; the voice speaks directly to `أعمالك`/`فريقك`._

### Example 2 — why subtitle
**English (`home.whySub`):**
> Clear thinking, senior engineering, and results you can measure.

**Literal MT (rejected — a bare triad):**
> تفكير واضح، هندسة متمرّسة، ونتائج يمكنك قياسها.

**Humanized (client-approved):**
> نعمل بهندسة منضبطة، ونسلّم نتائج يمكنك قياسها.

_What changed: the three-item list collapsed to a two-clause working sentence._

### Example 3 — services preview subtitle
**English (`home.servicesPreviewSub`):**
> From conversational AI to enterprise platforms — engineered with precision.

**Literal MT (rejected — dash + range + superlative, three tells at once):**
> من الذكاء الاصطناعي للمحادثة إلى منصات المؤسسات — بهندسة دقيقة.

**Humanized (client-approved):**
> نبني روبوتات محادثة ومنصات مؤسسية كبيرة، ونعتني بالتفاصيل في كليهما.

_What changed: dash removed, range removed, "engineered with precision" superlative
replaced by the concrete behavior "نعتني بالتفاصيل في كليهما"._

### Example 4 — feature card
**English (`home.features[1]`):**
> AI that handles real work — Our agents answer questions, qualify leads, schedule bookings, and hand off to humans when the conversation needs a real person.

**Humanized (client-approved):**
> ذكاء اصطناعي يؤدي عملاً حقيقياً. وكلاؤنا يجيبون على العملاء ويؤهّلونهم ويحجزون المواعيد. وحين تحتاج المحادثة تدخلاً بشرياً، يحوّلونها إلى فريقك.

_What changed: the verbs are grounded in real objects (`يجيبون على العملاء`) instead
of a bare rhythmic chain, and the handoff becomes its own natural sentence._

---

## Translating NEW strings not in the notes

When the English has no approved Arabic, produce it yourself with the 6-step
process. Match the register of the surrounding approved copy. Keep terminology
identical to the glossary in `style-guide.md` (e.g. always `أتمتة سير العمل`,
never a new synonym). Never invent claims or numbers that are not in the English.

## Reverse direction (Arabic → English)

Rare, but if asked: translate meaning-first into natural business English, keep
`Raanzlr` and tech terms as-is, and do not import Arabic rhetorical flourishes.
The anti-AI-tell rules are Arabic-specific; English copy follows normal editing.
