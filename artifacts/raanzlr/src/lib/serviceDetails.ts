/**
 * Rich, researched, bilingual detail content for each service page.
 *
 * This module powers the in-depth section of ServiceDetail.tsx (stats, deep-dive
 * prose, tech stack, benchmark charts, spec tables, delivery process, packages,
 * the "for companies" guidance block, and an FAQ).
 *
 * Each service is keyed by its slug and holds an `en` and `ar` variant that share
 * the exact same shape, so the renderer is language-agnostic. Only `web-development`
 * is filled in for now — it is the approved template; the remaining services follow
 * the same structure.
 */

export interface StatItem {
  value: string;
  label: string;
  sub?: string;
}

export interface ProseSection {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
}

export interface StackGroup {
  group: string;
  items: string[];
}

/** A row cell of "✓" renders as a positive check, "—" as a muted dash. */
export interface SpecTable {
  title: string;
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface ProcessStep {
  phase: string;
  title: string;
  desc: string;
  duration: string;
}

export interface PackageTier {
  name: string;
  tagline: string;
  pages: string;
  timeline: string;
  bestFor: string;
  features: string[];
  featured?: boolean;
}

export interface ForCompanies {
  intro: string;
  signsTitle: string;
  signs: string[];
  prepareTitle: string;
  prepare: string[];
  deliverablesTitle: string;
  deliverables: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface RadarChart {
  title: string;
  caption?: string;
  seriesA: string;
  seriesB: string;
  data: { metric: string; a: number; b: number }[];
}

export interface BarChart {
  title: string;
  caption?: string;
  seriesA: string;
  seriesB: string;
  data: { name: string; a: number; b: number }[];
}

export interface DonutChart {
  title: string;
  caption?: string;
  data: { name: string; value: number }[];
}

export interface ServiceDetailContent {
  tagline: string;
  stats: StatItem[];
  sections: ProseSection[];
  stack?: StackGroup[];
  radar?: RadarChart;
  bars?: BarChart;
  donut?: DonutChart;
  tables?: SpecTable[];
  process?: ProcessStep[];
  packages?: PackageTier[];
  forCompanies?: ForCompanies;
  faq?: FaqItem[];
}

type LocalizedDetail = { en: ServiceDetailContent; ar: ServiceDetailContent };

const webDevelopment: LocalizedDetail = {
  en: {
    tagline:
      "Marketing sites, SaaS dashboards, portals, and storefronts — engineered for speed, search, conversion, and years of easy maintenance.",
    stats: [
      { value: "≤1.5s", label: "Target mobile LCP", sub: "Core Web Vitals “Good” threshold" },
      { value: "95–100", label: "Lighthouse scores", sub: "Performance · SEO · A11y" },
      { value: "2–8 wks", label: "Typical delivery", sub: "Kickoff to launch" },
      { value: "100%", label: "Bilingual & RTL", sub: "Arabic + English, day one" },
    ],
    sections: [
      {
        eyebrow: "Design & UX",
        title: "Design systems, not just pretty pages",
        body: "We design a reusable system — type scale, color, spacing, and components — so every page feels consistent and new pages take hours, not weeks. Layouts are built around real user tasks and conversion, with accessibility (WCAG) and responsive behavior from the smallest phone to the widest desktop considered from the first frame.",
        bullets: ["Wireframes → high-fidelity UI", "Reusable component library", "Mobile-first, responsive", "WCAG AA accessibility"],
      },
      {
        eyebrow: "Frontend",
        title: "Frontend engineering that stays fast",
        body: "Built with React, TypeScript, and Tailwind on a modern build pipeline. Code-splitting, lazy loading, image optimization, and a strict performance budget keep pages light. The result loads fast on mid-range phones over mobile data — not just on a developer's laptop.",
        bullets: ["React + TypeScript", "Code-splitting & lazy loading", "Optimized images & fonts", "Smooth, intentional motion"],
      },
      {
        eyebrow: "Backend & Infra",
        title: "Backend, data, and hosting as one system",
        body: "We deliver the parts users don't see too: APIs, databases, authentication, admin tools, and integrations. Everything runs on fast edge/serverless infrastructure with CI/CD, preview deployments, and monitoring — so releases are safe and the site stays up.",
        bullets: ["APIs, auth & databases", "Edge / serverless hosting", "CI/CD + preview deploys", "Backups & uptime monitoring"],
      },
      {
        eyebrow: "SEO",
        title: "Technical & on-page SEO, built in",
        body: "Search optimization isn't an afterthought. We ship server-rendered, crawlable pages with clean URLs, semantic HTML, metadata, Open Graph, Schema.org structured data, XML sitemaps, and hreflang for bilingual targeting — then wire up Google Search Console and analytics so you can measure it.",
        bullets: ["Server-rendered & crawlable", "Schema.org structured data", "Sitemaps + hreflang", "Search Console & analytics"],
      },
      {
        eyebrow: "AEO / GEO",
        title: "Built to be cited by AI answer engines",
        body: "More buyers now ask ChatGPT, Perplexity, Gemini, and Google's AI Overviews instead of scrolling ten blue links. We optimize for Answer Engine Optimization (AEO): answer-first content, clear entities, quotable facts, FAQ and Q&A blocks, structured data, and an llms.txt — so your business shows up inside AI answers, not just search results.",
        bullets: ["Answer-first content blocks", "Clear entities & quotable facts", "FAQ / Q&A schema", "llms.txt + AI-crawler access"],
      },
      {
        eyebrow: "Performance · A11y · Security",
        title: "Fast, accessible, and secure by default",
        body: "Every build targets green Core Web Vitals, keyboard and screen-reader accessibility, and sensible security: HTTPS, security headers, input validation, dependency scanning, and rate limiting on forms. Speed and trust are features your customers feel even if they never name them.",
        bullets: ["Green Core Web Vitals", "Keyboard & screen-reader ready", "HTTPS + security headers", "Spam & abuse protection"],
      },
    ],
    stack: [
      { group: "Frontend", items: ["React", "Next.js / Vite", "TypeScript", "Tailwind CSS", "Framer Motion"] },
      { group: "Backend & data", items: ["Node.js", "REST & GraphQL", "PostgreSQL / Supabase", "Redis cache", "Serverless functions"] },
      { group: "Infrastructure", items: ["Vercel / edge", "Global CDN", "CI/CD pipelines", "Preview deploys", "Uptime monitoring"] },
      { group: "SEO / AEO", items: ["SSR & prerender", "Schema.org JSON-LD", "Sitemaps & hreflang", "Open Graph", "llms.txt"] },
    ],
    radar: {
      title: "Build readiness vs. a DIY / template site",
      caption: "Scored 0–100 across the dimensions that decide whether a site performs.",
      seriesA: "DIY / template site",
      seriesB: "Raanzlr build",
      data: [
        { metric: "Performance", a: 55, b: 98 },
        { metric: "SEO", a: 50, b: 95 },
        { metric: "AEO / AI search", a: 25, b: 90 },
        { metric: "Accessibility", a: 45, b: 95 },
        { metric: "Security", a: 50, b: 92 },
        { metric: "Maintainability", a: 40, b: 95 },
      ],
    },
    bars: {
      title: "Lighthouse scores — typical template vs. Raanzlr",
      caption: "Google's automated quality audit, scored out of 100. Higher is better.",
      seriesA: "Typical template",
      seriesB: "Raanzlr build",
      data: [
        { name: "Performance", a: 62, b: 98 },
        { name: "SEO", a: 70, b: 100 },
        { name: "Accessibility", a: 65, b: 96 },
        { name: "Best practices", a: 75, b: 100 },
      ],
    },
    donut: {
      title: "Where the engineering effort goes",
      caption: "A typical website build, by share of effort.",
      data: [
        { name: "Design & UX", value: 20 },
        { name: "Frontend", value: 28 },
        { name: "Backend & APIs", value: 24 },
        { name: "SEO & AEO", value: 16 },
        { name: "QA & launch", value: 12 },
      ],
    },
    tables: [
      {
        title: "Pages & modules by package",
        caption: "A starting map — we confirm the exact page list during discovery.",
        headers: ["Page / module", "Starter", "Growth", "Scale"],
        rows: [
          ["Landing / Home", "✓", "✓", "✓"],
          ["About / Team", "✓", "✓", "✓"],
          ["Services overview", "—", "✓", "✓"],
          ["Service detail pages", "—", "Up to 8", "Unlimited"],
          ["Blog / Insights", "—", "✓", "✓"],
          ["Case studies / Portfolio", "—", "✓", "✓"],
          ["Contact + forms", "✓", "✓", "✓"],
          ["Legal (privacy / terms)", "✓", "✓", "✓"],
          ["CMS / self-serve editing", "—", "✓", "✓"],
          ["Arabic (RTL) version", "Optional", "✓", "✓"],
          ["Customer portal / dashboard", "—", "—", "✓"],
          ["E-commerce / checkout", "—", "Add-on", "✓"],
        ],
      },
      {
        title: "SEO vs. AEO — what we optimize",
        caption: "Two different games. We play both, because buyers now search in both places.",
        headers: ["Dimension", "SEO (Google)", "AEO / GEO (AI answers)"],
        rows: [
          ["Goal", "Rank in the search results", "Get cited inside AI answers"],
          ["Engines", "Google, Bing", "ChatGPT, Perplexity, Gemini, AI Overviews"],
          ["Key signals", "Keywords, backlinks, speed", "Entities, structured data, quotable facts"],
          ["Content shape", "Long-form, headed sections", "Answer-first, Q&A, definitions"],
          ["Technical", "Sitemaps, canonical, CWV", "Schema.org, llms.txt, crawlable SSR"],
          ["How we measure", "Rankings, organic clicks", "Citation share, AI referral traffic"],
        ],
      },
    ],
    process: [
      { phase: "01", title: "Discovery & scope", desc: "Goals, audience, page map, keywords, and success metrics. You get a fixed scope and budget range.", duration: "3–5 days" },
      { phase: "02", title: "Design system & prototype", desc: "Brand-aligned UI, component library, and a clickable prototype to approve before code.", duration: "1–2 weeks" },
      { phase: "03", title: "Frontend & backend build", desc: "Pages, APIs, CMS, and integrations built against the performance budget.", duration: "2–4 weeks" },
      { phase: "04", title: "SEO, AEO & performance pass", desc: "Structured data, sitemaps, metadata, Core Web Vitals tuning, and AI-search readiness.", duration: "3–5 days" },
      { phase: "05", title: "QA, launch & handover", desc: "Cross-device testing, analytics, training, and a clean go-live with documentation.", duration: "2–4 days" },
      { phase: "06", title: "Iterate & grow", desc: "Post-launch support, A/B tests, and content growth to keep climbing.", duration: "Ongoing" },
    ],
    packages: [
      {
        name: "Starter",
        tagline: "Launch a credible presence, fast",
        pages: "1–5 pages",
        timeline: "2–3 weeks",
        bestFor: "New brands, campaigns, MVPs",
        features: ["Up to 5 pages", "Responsive + animated", "Core SEO setup", "Contact forms", "Analytics", "Single language"],
      },
      {
        name: "Growth",
        tagline: "Convert traffic and rank",
        pages: "6–20 pages + CMS",
        timeline: "4–6 weeks",
        bestFor: "Growing companies & agencies",
        featured: true,
        features: ["Up to 20 pages", "CMS / self-serve editing", "Full SEO + AEO", "Bilingual EN/AR (RTL)", "Blog & case studies", "Conversion tracking"],
      },
      {
        name: "Scale",
        tagline: "Platforms, portals & SaaS",
        pages: "Unlimited + app",
        timeline: "8+ weeks",
        bestFor: "SaaS, marketplaces, enterprise",
        features: ["Unlimited pages", "Customer portal / dashboard", "Auth & user roles", "E-commerce / payments", "Custom API integrations", "SLA & monitoring"],
      },
    ],
    forCompanies: {
      intro:
        "Most companies come to us when their current site is quietly costing them leads — it's slow, hard to update, invisible in search, or simply doesn't reflect the business anymore. Here's how to know it's time, and how to make the project move fast.",
      signsTitle: "Signs you need this",
      signs: [
        "Your site loads slowly on mobile or fails Core Web Vitals",
        "You can't update content without calling a developer",
        "You're not ranking — and never appear in ChatGPT / AI answers",
        "There's no Arabic (RTL) version for Gulf & MENA customers",
        "Traffic comes, but very few visitors convert",
        "The design looks dated next to your competitors",
      ],
      prepareTitle: "What to prepare for a fast start",
      prepare: [
        "Brand assets: logo, colors, fonts (or we create them)",
        "Core content: services, about, key pages (or we draft them)",
        "Domain & hosting access, or let us set it up",
        "Target keywords and the questions customers ask",
        "2–3 reference sites you like — and why",
      ],
      deliverablesTitle: "What you walk away with",
      deliverables: [
        "A fast, responsive, bilingual website",
        "A CMS so your team edits content anytime",
        "SEO + AEO setup with submitted sitemaps",
        "Analytics, Search Console & conversion tracking",
        "Source code, documentation & a training session",
      ],
    },
    faq: [
      {
        q: "How many pages can my website have?",
        a: "As many as you need. Starter covers 1–5 core pages, Growth scales to around 20 with a CMS, and Scale is unlimited — including portals, dashboards, and multi-language sections. We map the exact page list during discovery.",
      },
      {
        q: "What's the difference between SEO and AEO?",
        a: "SEO gets you ranked in Google's traditional results. AEO (Answer Engine Optimization, also called GEO) gets your business cited inside AI answers from ChatGPT, Perplexity, Gemini, and Google's AI Overviews. We build for both with structured data, answer-first content, and crawlable server-rendered pages.",
      },
      {
        q: "Do you build the backend too, or just the frontend?",
        a: "Both. We deliver the frontend (what users see) and the backend (APIs, databases, authentication, integrations, admin tools) as one coherent system, hosted on fast edge infrastructure with CI/CD.",
      },
      {
        q: "Will my site work in Arabic?",
        a: "Yes. We build bilingual Arabic/English with proper right-to-left (RTL) layouts, native wording, and SEO for both languages — not a bolted-on translation.",
      },
      {
        q: "How long does it take, and what does it cost?",
        a: "Typical timelines run 2–8 weeks depending on scope. After a short discovery call we send a fixed scope, timeline, and a real budget range — no vague hourly surprises.",
      },
    ],
  },
  ar: {
    tagline:
      "مواقع تسويقية، لوحات تحكم سحابية، بوابات، ومتاجر إلكترونية — مبنية للسرعة والظهور في البحث والتحويل وسهولة الصيانة لسنوات.",
    stats: [
      { value: "≤1.5s", label: "زمن تحميل الجوال المستهدف", sub: "ضمن حد “جيد” لمؤشرات الويب الأساسية" },
      { value: "95–100", label: "نتائج Lighthouse", sub: "الأداء · SEO · الوصولية" },
      { value: "2–8 أسابيع", label: "مدة التنفيذ المعتادة", sub: "من البدء حتى الإطلاق" },
      { value: "100%", label: "ثنائي اللغة و RTL", sub: "عربي + إنجليزي من اليوم الأول" },
    ],
    sections: [
      {
        eyebrow: "التصميم وتجربة المستخدم",
        title: "أنظمة تصميم، لا مجرد صفحات جميلة",
        body: "نصمم نظاماً قابلاً لإعادة الاستخدام — مقاسات الخطوط والألوان والمسافات والمكونات — ليبدو كل صفحة متناسقاً وتُبنى الصفحات الجديدة في ساعات لا أسابيع. التصاميم مبنية حول مهام المستخدم الحقيقية والتحويل، مع مراعاة سهولة الوصول (WCAG) والاستجابة من أصغر هاتف إلى أعرض شاشة منذ اللحظة الأولى.",
        bullets: ["من المخططات إلى واجهات عالية الدقة", "مكتبة مكونات قابلة لإعادة الاستخدام", "تصميم متجاوب يبدأ من الجوال", "وصولية بمعيار WCAG AA"],
      },
      {
        eyebrow: "الواجهة الأمامية",
        title: "هندسة واجهة أمامية تبقى سريعة",
        body: "مبنية بـ React وTypeScript وTailwind على خط بناء حديث. تقسيم الكود والتحميل المؤجل وتحسين الصور وميزانية أداء صارمة تُبقي الصفحات خفيفة. والنتيجة تُحمّل بسرعة على الهواتف المتوسطة عبر بيانات الجوال — لا على جهاز المطور فقط.",
        bullets: ["React + TypeScript", "تقسيم الكود والتحميل المؤجل", "صور وخطوط مُحسّنة", "حركة سلسة ومقصودة"],
      },
      {
        eyebrow: "الخلفية والبنية التحتية",
        title: "الخلفية والبيانات والاستضافة كنظام واحد",
        body: "نسلّم أيضاً الأجزاء التي لا يراها المستخدم: الواجهات البرمجية وقواعد البيانات والمصادقة وأدوات الإدارة والتكاملات. كل شيء يعمل على بنية تحتية سحابية سريعة مع CI/CD ونشر تجريبي ومراقبة — فتكون الإصدارات آمنة ويبقى الموقع متاحاً.",
        bullets: ["واجهات برمجية ومصادقة وقواعد بيانات", "استضافة edge / serverless", "CI/CD ونشر معاينة", "نسخ احتياطي ومراقبة التوافر"],
      },
      {
        eyebrow: "تحسين محركات البحث",
        title: "SEO تقني وعلى الصفحة، مدمج من الأساس",
        body: "تحسين البحث ليس فكرة لاحقة. نطلق صفحات مُولّدة من الخادم وقابلة للفهرسة بروابط نظيفة وHTML دلالي وبيانات وصفية وOpen Graph وبيانات منظمة Schema.org وخرائط موقع XML وhreflang للاستهداف ثنائي اللغة — ثم نربط Google Search Console والتحليلات لتقيس النتائج.",
        bullets: ["مُولّدة من الخادم وقابلة للفهرسة", "بيانات منظمة Schema.org", "خرائط موقع + hreflang", "Search Console والتحليلات"],
      },
      {
        eyebrow: "تحسين محركات الإجابة",
        title: "مبنية ليستشهد بها الذكاء الاصطناعي",
        body: "صار عدد أكبر من العملاء يسأل ChatGPT وPerplexity وGemini ونظرات Google الذكية بدل تصفح عشر نتائج. نُحسّن لتحسين محركات الإجابة (AEO): محتوى يبدأ بالإجابة، وكيانات واضحة، وحقائق قابلة للاقتباس، وكتل أسئلة وأجوبة، وبيانات منظمة، وملف llms.txt — ليظهر نشاطك داخل إجابات الذكاء الاصطناعي لا في نتائج البحث وحدها.",
        bullets: ["كتل محتوى تبدأ بالإجابة", "كيانات واضحة وحقائق قابلة للاقتباس", "مخطط أسئلة وأجوبة", "llms.txt ووصول زواحف الذكاء الاصطناعي"],
      },
      {
        eyebrow: "الأداء · الوصولية · الأمان",
        title: "سريع وسهل الوصول وآمن افتراضياً",
        body: "كل بناء يستهدف مؤشرات ويب أساسية خضراء، ووصولية للوحة المفاتيح وقارئات الشاشة، وأماناً منطقياً: HTTPS وترويسات أمان والتحقق من المدخلات وفحص الاعتماديات وتحديد معدل النماذج. السرعة والثقة ميزتان يشعر بهما عملاؤك حتى لو لم يسمّوهما.",
        bullets: ["مؤشرات ويب أساسية خضراء", "جاهز للوحة المفاتيح وقارئ الشاشة", "HTTPS + ترويسات أمان", "حماية من السبام والإساءة"],
      },
    ],
    stack: [
      { group: "الواجهة الأمامية", items: ["React", "Next.js / Vite", "TypeScript", "Tailwind CSS", "Framer Motion"] },
      { group: "الخلفية والبيانات", items: ["Node.js", "REST و GraphQL", "PostgreSQL / Supabase", "تخزين Redis", "دوال serverless"] },
      { group: "البنية التحتية", items: ["Vercel / edge", "شبكة CDN عالمية", "خطوط CI/CD", "نشر معاينة", "مراقبة التوافر"] },
      { group: "SEO / AEO", items: ["توليد من الخادم", "Schema.org JSON-LD", "خرائط موقع و hreflang", "Open Graph", "llms.txt"] },
    ],
    radar: {
      title: "جاهزية البناء مقابل موقع قالب جاهز",
      caption: "تقييم من 0 إلى 100 عبر الأبعاد التي تحدد أداء الموقع.",
      seriesA: "موقع قالب / جاهز",
      seriesB: "بناء راانزلر",
      data: [
        { metric: "الأداء", a: 55, b: 98 },
        { metric: "SEO", a: 50, b: 95 },
        { metric: "بحث الذكاء الاصطناعي", a: 25, b: 90 },
        { metric: "الوصولية", a: 45, b: 95 },
        { metric: "الأمان", a: 50, b: 92 },
        { metric: "قابلية الصيانة", a: 40, b: 95 },
      ],
    },
    bars: {
      title: "نتائج Lighthouse — قالب معتاد مقابل راانزلر",
      caption: "تدقيق الجودة الآلي من Google، من 100. الأعلى أفضل.",
      seriesA: "قالب معتاد",
      seriesB: "بناء راانزلر",
      data: [
        { name: "الأداء", a: 62, b: 98 },
        { name: "SEO", a: 70, b: 100 },
        { name: "الوصولية", a: 65, b: 96 },
        { name: "أفضل الممارسات", a: 75, b: 100 },
      ],
    },
    donut: {
      title: "أين يذهب الجهد الهندسي",
      caption: "بناء موقع نموذجي، حسب نسبة الجهد.",
      data: [
        { name: "التصميم وتجربة المستخدم", value: 20 },
        { name: "الواجهة الأمامية", value: 28 },
        { name: "الخلفية والواجهات البرمجية", value: 24 },
        { name: "SEO و AEO", value: 16 },
        { name: "الاختبار والإطلاق", value: 12 },
      ],
    },
    tables: [
      {
        title: "الصفحات والوحدات حسب الباقة",
        caption: "خريطة مبدئية — نؤكد قائمة الصفحات الدقيقة أثناء مرحلة الاكتشاف.",
        headers: ["الصفحة / الوحدة", "البداية", "النمو", "التوسّع"],
        rows: [
          ["الهبوط / الرئيسية", "✓", "✓", "✓"],
          ["من نحن / الفريق", "✓", "✓", "✓"],
          ["نظرة عامة على الخدمات", "—", "✓", "✓"],
          ["صفحات تفاصيل الخدمات", "—", "حتى 8", "غير محدود"],
          ["المدونة / الرؤى", "—", "✓", "✓"],
          ["دراسات الحالة / الأعمال", "—", "✓", "✓"],
          ["تواصل + نماذج", "✓", "✓", "✓"],
          ["القانوني (الخصوصية / الشروط)", "✓", "✓", "✓"],
          ["نظام إدارة محتوى ذاتي", "—", "✓", "✓"],
          ["نسخة عربية (RTL)", "اختياري", "✓", "✓"],
          ["بوابة عملاء / لوحة تحكم", "—", "—", "✓"],
          ["تجارة إلكترونية / دفع", "—", "إضافة", "✓"],
        ],
      },
      {
        title: "SEO مقابل AEO — ماذا نُحسّن",
        caption: "لعبتان مختلفتان. نلعب كلتيهما لأن العملاء يبحثون الآن في الموضعين.",
        headers: ["البُعد", "SEO (Google)", "AEO / GEO (إجابات الذكاء الاصطناعي)"],
        rows: [
          ["الهدف", "الترتيب في نتائج البحث", "الاستشهاد داخل إجابات الذكاء الاصطناعي"],
          ["المحركات", "Google و Bing", "ChatGPT و Perplexity و Gemini والنظرات الذكية"],
          ["الإشارات الرئيسية", "كلمات مفتاحية وروابط وسرعة", "كيانات وبيانات منظمة وحقائق قابلة للاقتباس"],
          ["شكل المحتوى", "محتوى طويل بعناوين", "يبدأ بالإجابة، أسئلة وأجوبة، تعريفات"],
          ["الجانب التقني", "خرائط موقع، canonical، CWV", "Schema.org، llms.txt، توليد من الخادم"],
          ["كيف نقيس", "الترتيب والنقرات العضوية", "حصة الاستشهاد وزيارات الذكاء الاصطناعي"],
        ],
      },
    ],
    process: [
      { phase: "01", title: "الاكتشاف وتحديد النطاق", desc: "الأهداف والجمهور وخريطة الصفحات والكلمات المفتاحية ومقاييس النجاح. تحصل على نطاق ونطاق ميزانية ثابتين.", duration: "3–5 أيام" },
      { phase: "02", title: "نظام التصميم والنموذج", desc: "واجهة متوافقة مع علامتك ومكتبة مكونات ونموذج تفاعلي للموافقة قبل البرمجة.", duration: "1–2 أسبوع" },
      { phase: "03", title: "بناء الواجهة والخلفية", desc: "الصفحات والواجهات البرمجية ونظام المحتوى والتكاملات مبنية وفق ميزانية الأداء.", duration: "2–4 أسابيع" },
      { phase: "04", title: "جولة SEO و AEO والأداء", desc: "بيانات منظمة وخرائط موقع وبيانات وصفية وضبط مؤشرات الويب وجاهزية بحث الذكاء الاصطناعي.", duration: "3–5 أيام" },
      { phase: "05", title: "الاختبار والإطلاق والتسليم", desc: "اختبار عبر الأجهزة وتحليلات وتدريب وإطلاق نظيف مع التوثيق.", duration: "2–4 أيام" },
      { phase: "06", title: "التحسين والنمو", desc: "دعم بعد الإطلاق واختبارات A/B ونمو المحتوى لمواصلة الصعود.", duration: "مستمر" },
    ],
    packages: [
      {
        name: "البداية",
        tagline: "أطلق حضوراً موثوقاً بسرعة",
        pages: "1–5 صفحات",
        timeline: "2–3 أسابيع",
        bestFor: "العلامات الجديدة والحملات والنماذج الأولية",
        features: ["حتى 5 صفحات", "متجاوب + متحرك", "إعداد SEO أساسي", "نماذج تواصل", "تحليلات", "لغة واحدة"],
      },
      {
        name: "النمو",
        tagline: "حوّل الزيارات واصعد في الترتيب",
        pages: "6–20 صفحة + نظام محتوى",
        timeline: "4–6 أسابيع",
        bestFor: "الشركات النامية والوكالات",
        featured: true,
        features: ["حتى 20 صفحة", "نظام محتوى ذاتي التحرير", "SEO + AEO كامل", "ثنائي اللغة عربي/إنجليزي (RTL)", "مدونة ودراسات حالة", "تتبع التحويل"],
      },
      {
        name: "التوسّع",
        tagline: "منصات وبوابات وأنظمة سحابية",
        pages: "غير محدود + تطبيق",
        timeline: "8+ أسابيع",
        bestFor: "الأنظمة السحابية والأسواق والمؤسسات",
        features: ["صفحات غير محدودة", "بوابة عملاء / لوحة تحكم", "مصادقة وأدوار مستخدمين", "تجارة إلكترونية / مدفوعات", "تكاملات برمجية مخصصة", "اتفاقية مستوى خدمة ومراقبة"],
      },
    ],
    forCompanies: {
      intro:
        "تأتي معظم الشركات إلينا حين يكون موقعها الحالي يكلّفها عملاء بصمت — بطيء، صعب التحديث، غير ظاهر في البحث، أو ببساطة لم يعد يعكس النشاط. إليك كيف تعرف أن الوقت قد حان، وكيف تجعل المشروع ينطلق بسرعة.",
      signsTitle: "علامات أنك تحتاج هذه الخدمة",
      signs: [
        "موقعك يُحمّل ببطء على الجوال أو يفشل في مؤشرات الويب الأساسية",
        "لا تستطيع تحديث المحتوى دون الاتصال بمطوّر",
        "لا تظهر في الترتيب — ولا تظهر أبداً في إجابات الذكاء الاصطناعي",
        "لا توجد نسخة عربية (RTL) لعملاء الخليج والشرق الأوسط",
        "تأتي الزيارات لكن قلة قليلة من الزوار تتحوّل",
        "التصميم يبدو قديماً بجانب منافسيك",
      ],
      prepareTitle: "ما تحتاج تجهيزه لانطلاقة سريعة",
      prepare: [
        "أصول العلامة: الشعار والألوان والخطوط (أو ننشئها لك)",
        "المحتوى الأساسي: الخدمات، من نحن، الصفحات الرئيسية (أو نصيغها)",
        "صلاحية الدومين والاستضافة، أو نتولّى إعدادها",
        "الكلمات المفتاحية والأسئلة التي يطرحها العملاء",
        "2–3 مواقع مرجعية تعجبك — ولماذا",
      ],
      deliverablesTitle: "ما تحصل عليه في النهاية",
      deliverables: [
        "موقع سريع ومتجاوب وثنائي اللغة",
        "نظام إدارة محتوى ليحرّر فريقك المحتوى في أي وقت",
        "إعداد SEO + AEO مع تقديم خرائط الموقع",
        "تحليلات و Search Console وتتبع التحويل",
        "الكود المصدري والتوثيق وجلسة تدريب",
      ],
    },
    faq: [
      {
        q: "كم عدد الصفحات التي يمكن أن يحويها موقعي؟",
        a: "بقدر ما تحتاج. باقة البداية تغطي 1–5 صفحات أساسية، والنمو تتوسّع إلى نحو 20 صفحة مع نظام محتوى، والتوسّع غير محدودة — بما في ذلك البوابات ولوحات التحكم والأقسام متعددة اللغات. نرسم قائمة الصفحات الدقيقة أثناء الاكتشاف.",
      },
      {
        q: "ما الفرق بين SEO و AEO؟",
        a: "يجعلك SEO تظهر في نتائج Google التقليدية. أما AEO (تحسين محركات الإجابة، ويُسمى أيضاً GEO) فيجعل نشاطك يُستشهد به داخل إجابات الذكاء الاصطناعي من ChatGPT وPerplexity وGemini ونظرات Google الذكية. نبني للاثنين ببيانات منظمة ومحتوى يبدأ بالإجابة وصفحات قابلة للفهرسة مُولّدة من الخادم.",
      },
      {
        q: "هل تبنون الخلفية أيضاً أم الواجهة فقط؟",
        a: "كلاهما. نسلّم الواجهة الأمامية (ما يراه المستخدم) والخلفية (الواجهات البرمجية وقواعد البيانات والمصادقة والتكاملات وأدوات الإدارة) كنظام واحد متماسك، مستضاف على بنية تحتية سريعة مع CI/CD.",
      },
      {
        q: "هل سيعمل موقعي بالعربية؟",
        a: "نعم. نبني ثنائي اللغة عربي/إنجليزي بتخطيطات صحيحة من اليمين إلى اليسار (RTL) وصياغة أصيلة وتحسين بحث للغتين — لا ترجمة مُلصقة.",
      },
      {
        q: "كم يستغرق الأمر، وكم يكلّف؟",
        a: "تتراوح المدد المعتادة بين 2 و8 أسابيع حسب النطاق. بعد مكالمة اكتشاف قصيرة نرسل نطاقاً ثابتاً وجدولاً زمنياً ونطاق ميزانية حقيقياً — دون مفاجآت بالساعة.",
      },
    ],
  },
};

const serviceDetails: Record<string, LocalizedDetail> = {
  "web-development": webDevelopment,
};

export function getServiceDetail(slug: string | undefined, isAr: boolean): ServiceDetailContent | null {
  if (!slug) return null;
  const entry = serviceDetails[slug];
  if (!entry) return null;
  return isAr ? entry.ar : entry.en;
}

export default serviceDetails;
