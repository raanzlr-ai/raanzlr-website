# Raanzlr Arabic Style Guide

Rules for producing Arabic that matches the site's existing approved copy. Pair
this with `ai-detection-rules.md` (what to avoid) — this file is what to do.

## Voice & register

- **Modern Standard Arabic (الفصحى المبسّطة).** Clear, contemporary, business
  Arabic. Not classical/heavy, not colloquial.
- **First-person plural for the company:** `نبني`, `نصمّم`, `نطوّر`, `نساعدك`,
  `نربط`. This is the established site voice.
- **Address the reader as `أنت`/`عملك`/`فريقك`** in benefit copy: `يساعدك`,
  `أدواتك`, `احتياجك`.
- **Neutral and confident, never hype.** Company/service pages stay neutral.
  Only blog or opinion pieces may use a warmer first-person-singular voice with
  an actual stance.
- Prefer a plain true sentence over an impressive vague one.

## Punctuation

- Use the **Arabic comma `،`** and **Arabic question mark `؟`**, not `,` `?`.
- **No em/en dashes at all** (`—` `–`). Replace with `.` `،` `:` or a rewrite.
- **No connector hyphen `-`** in prose.
- Middot `·` only appears in the notes as slogan separators — those are a triad
  tell; avoid.
- Keep sentences reasonably short. Two clear sentences beat one long chain.

## Numbers & numerals

The approved copy uses **Arabic-Indic numerals** (`٠١٢٣٤٥٦٧٨٩`) in Arabic prose:

- Percentages: `٩٠٪+`, `٧٦٪`, `+٨٫٤٪`, `٥٣٪`, `حتى ٣٠–٤٠٪`
- Large numbers: `٢٫٠٨ تريليون دولار`, `٧٣٩٫٦ مليار دولار`, `١٣٥٫٢ مليار دولار`
- Decimal separator is the Arabic decimal `٫` (e.g. `٢٫٠٨`), thousands as written
  in the notes.
- Years: `٢٠٣٤`, `٢٠٣٠`, `٢٠٢٦`.
- The percent sign used is the Arabic `٪`.

> Note: within a numeric **range** the notes sometimes keep a short dash
> (`٣٠–٤٠٪`). A dash inside a number range is a numeric convention, not prose
> punctuation. The zero-dash rule targets **prose** em/en dashes. When possible
> prefer `٣٠ إلى ٤٠٪` in body text, but a range dash in a stat figure is
> tolerable. Never use a prose em-dash.

## Latin terms — keep untranslated, inline in Arabic

The brand and technology names stay in **Latin script** inside Arabic sentences:

- Brand: **`Raanzlr`** (never transliterate).
- Automation: `n8n`, `Zapier`, `Make`, `Airtable`, `Notion`, `Google Workspace`,
  `Microsoft 365`, `Slack`, `Microsoft Teams`.
- Web/stack: `React`, `Next.js`, `Vercel`, `PostgreSQL`, `NoSQL`, `REST APIs`,
  `GraphQL`, `Webhooks`, `Python`, `Node.js`, `AWS Lambda`, `GA4`, `CDN`.
- Mobile: `iOS`, `Android`, `Swift/SwiftUI`, `Kotlin/Compose`, `React Native`,
  `Flutter`, `App Store`, `Google Play`, `Apple Pay`, `Google Pay`, `FCM`,
  `APNs`, `Tap`, `HyperPay`, `STC Pay`.
- AI/dubbing: `OpenAI`, `Claude`, `ChatGPT`, `Perplexity`, `Whisper`,
  `ElevenLabs`, `Murf AI`, `HeyGen`, `Rask AI`.
- File/subtitle formats: `SRT`, `VTT`, `PDF`.

Arabic connective letters attach directly: `وZapier`, `وMake`, `وAndroid` (as in
the approved copy).

## RTL layout

- The app sets `dir="rtl"` and `lang="ar"` automatically when `lang === "ar"`
  (see `LanguageContext.tsx`). You do not add direction markup in the strings.
- Write copy as normal Arabic; do not insert Unicode direction control chars.
- When Latin terms sit inside Arabic, the browser's bidi handles ordering; keep
  them as plain inline tokens (`نستخدم React وNext.js`).
- Refer to RTL support in copy as "الكتابة من اليمين" / "دعم قوي للكتابة من
  اليمين", matching the approved phrasing (avoid the bare acronym "RTL" in prose
  where the notes rephrased it).

## Arabic dialects (for AI video-dubbing content)

The dubbing service explicitly supports dialect selection. Use these labels:

- `الفصحى` (Modern Standard)
- `الخليجية` (Gulf)
- `المصرية` (Egyptian)
- `الشامية` (Levantine)

## Terminology consistency (English → Arabic)

| English | Arabic (approved) |
|---|---|
| AI Agents & Chatbots | وكلاء ذكاء اصطناعي وروبوتات محادثة |
| Workflow Automation | أتمتة سير العمل |
| AI Video Dubbing | دبلجة الفيديو بالذكاء الاصطناعي |
| Web Development | مواقع ومنصات الويب |
| Mobile App Development | تطوير تطبيقات الجوال |
| Custom AI Solutions | حلول ذكاء اصطناعي مخصصة |
| System / API Integration | ربط الأنظمة وتكامل الواجهات |
| UI/UX Design | تصميم واجهات المستخدم وتجربته |
| Technical Audit & Consulting | التدقيق التقني والاستشارات |
| Retrieval-augmented (RAG) | استرجاع معزز |
| CRM | نظام إدارة العملاء / إدارة علاقات العملاء |
| Overview | نظرة عامة |
| How we work / process | كيف ننفّذ؟ |
| Start your project (CTA) | ابدأ مشروعك |
| Free consultation (CTA) | احصل على استشارة مجانية |
| RTL | الكتابة من اليمين |

Keep a term identical everywhere it appears; do not introduce synonyms mid-site.

## Editing discipline

- Change the **minimum** needed to fix a tell; preserve the client's approved
  wording where it already passes.
- Prefer the exact phrasing in `approved-copy.md` when the section exists there.
- Keep meaning faithful to the English source when translating; do not invent
  claims, numbers, or features.
