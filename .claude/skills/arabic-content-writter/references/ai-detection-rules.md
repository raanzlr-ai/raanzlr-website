# AI-Detection Rules for Arabic (Raanzlr)

Source: `arabics_notes.md`, the "ما الذي يكشف أنه نص ذكاء اصطناعي" section by the
client reviewer (Moayad). These are the exact signals that make Arabic copy read
as machine-generated. Your job is to remove them. Each rule below has the tell,
why it flags, and a bad → good rewrite.

> Golden principle: **Edit prose paragraphs only.** UI elements (navigation,
> buttons, form fields, short labels) are already clean and must be left as they
> are.

---

## 1. Dashes — `—` `–` and the connector `-` (STRONGEST tell)

The em-dash / en-dash is the number-one giveaway. In the original site copy it
appeared in ~10+ places. The client's instruction was blunt: **remove every
dash.** This includes the ASCII hyphen `-` used as a sentence connector.

Fix strategy: replace with a full stop `.`, an Arabic comma `،`, a colon `:`,
or rephrase into two clauses.

**Bad:**
> نبني للمستخدمين العرب والإنجليز والأتراك من اليوم الأول — واجهات RTL صحيحة، صياغة طبيعية.

**Good:**
> نبني للمستخدمين العرب والإنجليز والأتراك من اليوم الأول. واجهات تدعم الكتابة من اليمين كما يجب، وصياغة طبيعية تناسب كل سوق.

**Bad:**
> العميل يحصل على إجابة مفيدة — وليس رداً آلياً.

**Good:**
> حتى يحصل العميل على إجابة مفيدة لا رد آلي جاف.

Detection: grep the Arabic text for `—`, `–`, and standalone ` - `. Any hit fails.

---

## 2. Rule of three (triads)

Three parallel items — nouns, adjectives, or verbs — is a classic LLM rhythm.
Arab readers feel the artificial cadence.

Three forms to catch:
- **Slogan triads:** `دقة · سرعة · أثر`
- **Adjective/phrase triads:** `هندسة احترافية، تفكير واضح، ونتائج قابلة للقياس`
- **Verb-chain triads:** `يجيبون، يؤهّلون، يحجزون`

Fix strategy: drop to **two** items, reshape into a normal sentence, or expand to
**four** (four does not trigger the tell — see the checklist note in the notes).

**Bad:**
> دقة · سرعة · أثر

**Good:**
> دقة وسرعة وأثر  _(or delete the slogan entirely — three bare dotted words are themselves an AI tell)_

**Bad:**
> وكلاؤنا يجيبون، يؤهّلون، يحجزون.

**Good:**
> وكلاؤنا يجيبون على العملاء ويؤهّلونهم ويحجزون المواعيد. وحين تحتاج المحادثة تدخلاً بشرياً، يحوّلونها إلى فريقك.

_(Note the fix expands and grounds the verbs in real objects rather than leaving
a bare rhythmic triple.)_

---

## 3. Fake ranges — `من X إلى Y`

The "from … to …" construction fabricates a spectrum to sound comprehensive.

Examples flagged:
- `من أتمتة العمليات اليومية إلى تطوير أنظمة`
- `من روبوتات المحادثة إلى منصات المؤسسات`

Fix strategy: name the things directly with a conjunction, no artificial span.

**Bad:**
> نبني روبوتات محادثة ومنصات مؤسسية — من روبوتات المحادثة إلى منصات المؤسسات.

**Good:**
> نبني روبوتات محادثة ومنصات مؤسسية كبيرة، ونعتني بالتفاصيل في كليهما.

---

## 4. Negative parallelism — `وليس ...`

"X, and not Y" contrast phrasing is a strong tell. It sounds like copy trying to
be clever.

Examples flagged:
- `وليس العكس`
- `وليس رداً آلياً`
- `وليس الزخرفة فقط`

Fix strategy: cut the negative half, or convert to a plain positive statement.

**Bad:**
> برمجيات تتكيف مع احتياجاتك — وليس العكس.

**Good:**
> نبني برمجيات تتكيّف مع طريقة عملك، لا أن تفرض عليك طريقتها.

_(Acceptable: a light `لا ...` can survive when it reads naturally, but the
mechanical `وليس X` construction should go.)_

---

## 5. Artificial kicker / manufactured closer

A theatrical closing line that "lands a punch." Reads as ad-agency filler.

Example flagged:
> تبهر في العرض وتنهار في التشغيل.

Fix strategy: delete the punchline. End on a plain, true statement.

**Bad:**
> نبني أنظمة تصمد، لا عروضاً تبهر في العرض وتنهار في التشغيل.

**Good:**
> نعمل مع المؤسسين والمشغّلين الذين يريدون أنظمة تصمد في التشغيل، لا عروضاً تنهار بعد أول استخدام حقيقي.

---

## 6. Promotional exaggeration / superlatives

Empty intensifiers that assert quality instead of showing it.

Examples flagged:
- `أداة عملية`
- `بدقة واحترافية`
- `دقة فائقة لا يستطيع مجاراتها`

Fix strategy: remove the superlative and replace with a concrete, checkable fact
(a number, a capability, a behavior).

**Bad:**
> من روبوتات المحادثة إلى منصات المؤسسات — بدقة واحترافية.

**Good:**
> نبني روبوتات محادثة ومنصات مؤسسية كبيرة، ونعتني بالتفاصيل في كليهما.

---

## What is allowed (do NOT over-correct)

From the client's own post-edit checklist:

- **Four-item feature enumerations are fine.** They are not a tell. Do not force
  them down to two.
- **Neutral corporate tone is correct** for company pages. Do not inject warmth,
  first person, or opinion into service/marketing copy. Save that for blog/
  opinion pieces only.
- A light natural `لا ...` (not the mechanical `وليس X`) can stay when it reads
  the way a person would actually speak.
- UI strings, nav, buttons, and form fields stay untouched.

## Fast detection pass (run before shipping)

1. Search for `—` `–` ` - ` → must be **zero** in prose.
2. Search for `·` → likely a slogan triad; break or delete.
3. Scan for `من ... إلى ...` → fake range; rephrase.
4. Scan for `وليس` → negative parallelism; cut.
5. Read each paragraph's final sentence → any theatrical kicker? delete it.
6. Scan for `فائق`, `احترافي`, `عملية` and other adjectives with no number
   behind them → replace with a concrete fact.
7. Count parallel items per list → 3 is suspect, 2 or 4 are safe.
