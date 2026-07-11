// Rich, research-backed content for each service detail page.
// Bilingual (en / ar). Arabic is written natively for Gulf/MENA business
// audiences — not machine-translated — with correct domain terminology
// (e.g. localization = الأقلمة, not التوطين).
//
// Statistics are sourced from 2024-2026 market research (PwC Middle East,
// IMARC, Statista, Semrush, MuleSoft, IBM, CSA Research, Forrester, Market.us,
// Mordor, Precedence Research, DataReportal). Sources are surfaced in the UI
// as caption text under each chart.

export type Lang = "en" | "ar";

export interface RichMetric {
  value: string;
  label: string;
}

export interface RichCapability {
  title: string;
  desc: string;
}

export interface RichStep {
  title: string;
  desc: string;
}

export interface RichChart {
  kind: "bar" | "area" | "donut";
  title: string;
  unit?: string;
  source: string;
  // Bar/area: ordered points. Donut: two slices (first = highlighted).
  data: { name: string; value: number }[];
}

export interface RichComparison {
  title: string;
  colA: string; // the old / traditional way
  colB: string; // the Raanzlr way
  rows: { aspect: string; a: string; b: string }[];
}

export interface ServiceRich {
  tagline: string;
  metrics: RichMetric[];
  capabilities: RichCapability[];
  forCompanies: string[];
  forCustomers: string[];
  chart: RichChart;
  comparison: RichComparison;
  process: RichStep[];
  stack: string[];
}

type RichMap = Record<string, ServiceRich>;

/* ============================================================ ENGLISH */

const en: RichMap = {
  "ai-chatbots": {
    tagline:
      "Multilingual AI agents that answer, qualify, and book around the clock — on the channels your customers already live in.",
    metrics: [
      { value: "≤ 23s", label: "Average first response, day or night" },
      { value: "45%+", label: "Of routine queries resolved without a human" },
      { value: "96%", label: "Of Gulf smartphone users reachable on WhatsApp" },
    ],
    capabilities: [
      { title: "Intent & entity engine", desc: "Reads what the customer actually wants and pulls out dates, names, and products from messy, mixed-language messages." },
      { title: "Arabic dialect handling", desc: "Understands and replies in Modern Standard, Gulf, Levantine, and Egyptian Arabic — including English code-switching mid-sentence." },
      { title: "Omnichannel deployment", desc: "One agent brain across WhatsApp, your website, and Instagram DMs, carrying full context between them." },
      { title: "Lead qualification & scoring", desc: "Asks the right questions, scores intent, and flags hot leads — replacing manual triage." },
      { title: "Live appointment booking", desc: "Reads real availability and books, reschedules, or cancels inside the conversation." },
      { title: "CRM & tool actions", desc: "Pushes contacts, transcripts, and next steps straight into your CRM and helpdesk the moment a chat ends." },
      { title: "Human escalation", desc: "Detects frustration or high-value cases and hands off to a person with the full history attached." },
      { title: "Knowledge-grounded answers", desc: "Replies from your own catalogue, pricing, and policies (RAG) — accurate, not generic guesses." },
    ],
    forCompanies: [
      "Capture and qualify leads 24/7 without adding headcount",
      "Cut repetitive support volume by nearly half and lower cost per interaction",
      "Sync every conversation into your CRM automatically — no lost leads",
      "Absorb seasonal spikes without scrambling to hire and train",
      "Serve Arabic and English customers natively from a single agent",
    ],
    forCustomers: [
      "Answers in seconds instead of waiting in a queue",
      "Service on WhatsApp and Instagram — no app to download, no hold music",
      "Replies in their own dialect, not stilted formal Arabic",
      "A smooth handoff to a real person when the question is complex",
    ],
    chart: {
      kind: "area",
      title: "GCC conversational-AI market ($M)",
      unit: "$M",
      source: "GulfSaaSReview — GCC AI Chatbot Market 2026 (41.2% CAGR)",
      data: [
        { name: "2026", value: 185 },
        { name: "2027", value: 262 },
        { name: "2028", value: 370 },
        { name: "2029", value: 525 },
        { name: "2030", value: 750 },
      ],
    },
    comparison: {
      title: "Traditional support vs. a Raanzlr AI agent",
      colA: "Traditional support",
      colB: "Raanzlr AI agent",
      rows: [
        { aspect: "First response", a: "Minutes to hours, office hours only", b: "Seconds, 24/7/365" },
        { aspect: "Languages", a: "Limited by who's on shift", b: "Arabic dialects + English at once" },
        { aspect: "Lead capture", a: "Missed after hours", b: "Captured, qualified, synced to CRM" },
        { aspect: "Scaling", a: "Hire and train more agents", b: "Handles volume spikes instantly" },
        { aspect: "Cost per chat", a: "$6–$40 per ticket", b: "A fraction of a dollar" },
      ],
    },
    process: [
      { title: "Discovery & mapping", desc: "Define channels, languages, top intents, escalation rules, and the KPIs that matter." },
      { title: "Knowledge & integrations", desc: "Ingest your FAQs, catalogue, and policies; connect CRM, calendar, and helpdesk." },
      { title: "Build & dialect tuning", desc: "Design the flows, train intents, and tune Arabic tone to your brand voice." },
      { title: "Pilot & QA", desc: "Sandbox-test on real conversations and validate every human handoff." },
      { title: "Launch & optimize", desc: "Go live, watch deflection and CSAT, and retrain monthly on real transcripts." },
    ],
    stack: ["WhatsApp Business API", "Instagram Messaging", "GPT-4o / Claude", "Jais · ALLaM (Arabic)", "RAG · pgvector", "n8n · LangGraph", "HubSpot · Salesforce · Zoho", "Calendly · Cal.com"],
  },

  "workflow-automation": {
    tagline:
      "Connect your tools and retire the copy-paste — reliable automations that run the busywork across sales, support, finance, and ops.",
    metrics: [
      { value: "240 hrs", label: "Reclaimed per employee, per year" },
      { value: "~75%", label: "Fewer errors on repetitive admin work" },
      { value: "248%", label: "Three-year ROI on workflow automation" },
    ],
    capabilities: [
      { title: "Trigger-based workflows", desc: "Event-driven automations (webhook, schedule, record change) that run with no one pressing start." },
      { title: "Lead routing & enrichment", desc: "Capture, score, enrich, and assign every inbound lead to the right rep in real time." },
      { title: "Approval chains", desc: "Multi-step approvals for POs, invoices, leave, and discounts with conditional logic and escalations." },
      { title: "CRM / ERP / helpdesk sync", desc: "Keep contacts, deals, tickets, and orders consistent across systems, both directions." },
      { title: "Reporting & alerts", desc: "Scheduled dashboards and threshold alerts pushed to email, Slack, or Teams automatically." },
      { title: "Data cleanup & dedupe", desc: "Validation, normalization, and dedupe rules applied on entry and on a schedule." },
      { title: "Document & invoice processing", desc: "OCR and parsing pull data out of PDFs and forms straight into finance and ops." },
      { title: "AI-assisted steps", desc: "LLM nodes that classify, summarize, draft replies, and route inside the workflow itself." },
    ],
    forCompanies: [
      "Reclaim the ~30% of activities that are automatable across most roles",
      "Cut process cost by 20–30% (and up to 50–70% with intelligent automation)",
      "Shrink lead-response, approval, and onboarding cycles from days to minutes",
      "Eliminate the silent errors that come from manual re-keying",
      "Scale throughput on volume spikes without scaling headcount",
    ],
    forCustomers: [
      "Inquiries acknowledged and routed instantly, not after a manual queue",
      "Correct invoices, orders, and data because every handoff is validated",
      "The same reliable experience regardless of who is on shift",
      "Staff freed to solve real problems instead of shuffling data",
    ],
    chart: {
      kind: "bar",
      title: "Operating-cost reduction by automation tier (%)",
      unit: "%",
      source: "McKinsey & Gartner via shno.co, 2026",
      data: [
        { name: "Manual", value: 0 },
        { name: "Basic", value: 27 },
        { name: "Intelligent", value: 60 },
      ],
    },
    comparison: {
      title: "Manual operations vs. automated workflows",
      colA: "Manual operations",
      colB: "Automated workflows",
      rows: [
        { aspect: "Data entry", a: "Copy-paste between tools", b: "Synced automatically, both directions" },
        { aspect: "Errors", a: "Frequent, hard to trace", b: "~75% fewer, with full logs" },
        { aspect: "Speed", a: "Days for approvals & routing", b: "Minutes, end to end" },
        { aspect: "Capacity", a: "Capped by staff hours", b: "Scales with volume, not headcount" },
        { aspect: "Visibility", a: "Spreadsheets and guesswork", b: "Live dashboards and alerts" },
      ],
    },
    process: [
      { title: "Process audit", desc: "Map the manual workflows, volumes, and bottlenecks — and quantify the hours lost." },
      { title: "Prioritize & design", desc: "Rank automations by ROI vs. effort; design the flows, mappings, and error handling." },
      { title: "Build & integrate", desc: "Implement in n8n, Zapier, or Make plus custom scripts; connect APIs securely." },
      { title: "Test & validate", desc: "Run real data, edge cases, and failure scenarios; confirm retries and accuracy." },
      { title: "Launch & monitor", desc: "Deploy with logging and alerts, train staff, and tune against live performance." },
    ],
    stack: ["n8n", "Zapier", "Make", "REST · webhooks · GraphQL", "Python · Node.js", "AWS Lambda", "OpenAI · Claude nodes", "Slack · Teams · Google Workspace"],
  },

  "ai-video-dubbing": {
    tagline:
      "Turn one video into many languages — AI voiceovers, accurate transcripts, and timing that keep your original music, energy, and intent.",
    metrics: [
      { value: "90–95%", label: "Lower cost than traditional studio dubbing" },
      { value: "Same-day", label: "Turnaround vs. 2–6 weeks in a studio" },
      { value: "76%", label: "Of consumers prefer to buy in their own language" },
    ],
    capabilities: [
      { title: "Speech-to-text (ASR)", desc: "Timestamped transcription of the original audio, robust even on noisy or fast speech." },
      { title: "Translation & adaptation", desc: "Translates and adapts idioms so the script sounds native — not literal." },
      { title: "AI voice cloning", desc: "Re-voices the content and can keep the original speaker's voice identity across languages." },
      { title: "Emotion & pacing match", desc: "Carries tone, energy, and timing from the source delivery — not flat text-to-speech." },
      { title: "Lip-sync (optional)", desc: "Aligns the new audio to on-screen lip movement for face-to-camera footage." },
      { title: "Subtitles & captions", desc: "Translated SRT/VTT captions per language, burned-in or as separate files." },
      { title: "Music & SFX preserved", desc: "Separates voice from the mix and replaces only the voice, keeping your soundtrack intact." },
      { title: "Dialect & accent control", desc: "One source to many languages, with a choice of Gulf, Egyptian, or Levantine Arabic." },
    ],
    forCompanies: [
      "Reach 400M+ Arabic speakers plus EU, US, and Türkiye without re-shooting",
      "Replace $100–$500-per-minute studio dubbing with AI at a fraction of the cost",
      "Launch every language version alongside the original, same day",
      "Re-monetize your back catalogue of tutorials, ads, and training in new markets",
      "Boost discoverability with translated captions feeding search and social",
    ],
    forCustomers: [
      "Watch in their own language and dialect, not foreign audio with subtitles",
      "A real, expressive voice — not a robotic read",
      "Higher comprehension and completion of the content",
      "Captions for sound-off viewing and accessibility",
    ],
    chart: {
      kind: "bar",
      title: "Cost per finished minute, per language ($)",
      unit: "$",
      source: "Camb.ai — AI vs. Traditional Dubbing, 2025",
      data: [
        { name: "Traditional studio", value: 300 },
        { name: "AI localization", value: 10 },
      ],
    },
    comparison: {
      title: "Traditional studio dubbing vs. AI localization (الأقلمة)",
      colA: "Traditional studio",
      colB: "Raanzlr AI localization",
      rows: [
        { aspect: "Cost / minute", a: "$100–$500 per language", b: "$2–$20 per language" },
        { aspect: "Turnaround", a: "2–6 weeks", b: "Hours to same day" },
        { aspect: "Languages", a: "One at a time, costly", b: "Many in parallel" },
        { aspect: "Voice", a: "New voice actor each time", b: "Cloned, consistent voice identity" },
        { aspect: "Deliverables", a: "Final video only", b: "Video + audio + transcript/SRT files" },
      ],
    },
    process: [
      { title: "Ingest", desc: "Send a link (YouTube, Instagram, Facebook) or upload directly; we extract the source." },
      { title: "Transcribe & separate", desc: "ASR builds a timestamped transcript; audio is split into voice vs. music/SFX." },
      { title: "Translate & adapt", desc: "Localize the script and pick the target dialect — MSA, Gulf, Egyptian, or Levantine." },
      { title: "Voice & lip-sync", desc: "Re-voice with a cloned or matched voice; align lip-sync for on-camera footage." },
      { title: "Remix & deliver", desc: "Mix the new voice back with your original soundtrack and hand over all files." },
    ],
    stack: ["Whisper (ASR)", "ElevenLabs Dubbing", "HeyGen", "Rask AI", "Murf AI", "Stem separation", "SRT / VTT export", "Arabic dialect models"],
  },

  "web-development": {
    tagline:
      "Marketing sites, SaaS dashboards, portals, and storefronts — engineered end to end: frontend, backend, database, SEO, AEO, and bilingual RTL.",
    metrics: [
      { value: "+8.4%", label: "Conversion lift from a 0.1s mobile speed gain" },
      { value: "53%", label: "Of mobile visits bounce if a page takes over 3s" },
      { value: "$2.08T", label: "GCC e-commerce market by 2034 (15.15% CAGR)" },
    ],
    capabilities: [
      { title: "Frontend", desc: "React / Next.js built to Core Web Vitals — fast, responsive, accessible (WCAG), and true RTL Arabic." },
      { title: "Backend", desc: "REST/GraphQL APIs, auth and SSO, and the business logic that powers dashboards and portals." },
      { title: "Database", desc: "PostgreSQL or NoSQL chosen for your data, with caching, indexing, and clean schema design." },
      { title: "SEO", desc: "Technical SEO, JSON-LD schema, sitemaps, and hreflang so Arabic and English each rank right." },
      { title: "AEO / GEO", desc: "Answer-first, structured content engineered to be cited by ChatGPT, Perplexity, and Google AI Overviews." },
      { title: "Hosting & DevOps", desc: "Edge/CDN delivery, CI/CD with preview deploys, and instant rollbacks on Vercel or cloud." },
      { title: "Security & performance", desc: "HTTPS, OWASP hardening, image optimization, and edge caching for fast, safe pages." },
      { title: "Analytics & CRO", desc: "GA4, event analytics, and A/B testing to turn traffic into measurable revenue." },
    ],
    forCompanies: [
      "Turn more visitors into qualified leads with speed and conversion engineering",
      "Lower acquisition cost as SEO + AEO compound into free, durable traffic",
      "Reach Arabic and English markets from one bilingual, hreflang-correct platform",
      "Automate manual workflows through dashboards and self-service portals",
      "Stay future-proof against algorithm shifts and the rise of AI search",
    ],
    forCustomers: [
      "Pages that load in under three seconds, so visitors don't bounce",
      "A true Arabic RTL experience — not a flipped English template",
      "Equally smooth on the phones that dominate Gulf web traffic",
      "Accessible to everyone, including screen-reader and keyboard users",
    ],
    chart: {
      kind: "area",
      title: "Google searches showing AI Overviews (%)",
      unit: "%",
      source: "Semrush AI Overviews Study, 2025",
      data: [
        { name: "Jan", value: 6.49 },
        { name: "Mar", value: 13 },
        { name: "May", value: 19 },
        { name: "Jul", value: 24.61 },
      ],
    },
    comparison: {
      title: "Template / offshore build vs. a Raanzlr platform",
      colA: "Template / offshore",
      colB: "Raanzlr platform",
      rows: [
        { aspect: "Performance", a: "Heavy, slow, fails Core Web Vitals", b: "Engineered to pass, mobile-first" },
        { aspect: "Arabic", a: "Flipped text, broken layout", b: "True RTL, Arabic typography" },
        { aspect: "SEO / AEO", a: "Bolted on later, if at all", b: "Schema, hreflang, AI-search ready" },
        { aspect: "Architecture", a: "Tangled, hard to change", b: "Modular, documented, maintainable" },
        { aspect: "Conversion", a: "Looks fine, leaks revenue", b: "Measured and optimized (CRO)" },
      ],
    },
    process: [
      { title: "Discovery & strategy", desc: "Goals, audience, bilingual scope, keyword + AEO research, and a technical audit." },
      { title: "Design & prototype", desc: "UX flows, a responsive + RTL design system, and a clickable prototype." },
      { title: "Build", desc: "Frontend, backend, database, integrations, and SEO/AEO foundations shipped via CI/CD." },
      { title: "Launch", desc: "Core Web Vitals tuning, cross-device QA, accessibility checks, and edge go-live." },
      { title: "Optimize", desc: "Measure, A/B test, and iterate on conversion, freshness, and AI-search visibility." },
    ],
    stack: ["React · Next.js", "TypeScript · Tailwind", "Node.js · NestJS", "PostgreSQL · Prisma", "Redis", "JSON-LD · hreflang", "Vercel · Cloudflare", "GA4 · PostHog"],
  },

  "mobile-apps": {
    tagline:
      "Native and cross-platform iOS and Android apps for customers, field teams, and internal ops — fast, offline-ready, and store-compliant.",
    metrics: [
      { value: "$739.6B", label: "Global app market revenue in 2026" },
      { value: "+50%", label: "Retention lift from strong onboarding" },
      { value: "82%", label: "Of GCC e-commerce happens on mobile" },
    ],
    capabilities: [
      { title: "Native development", desc: "Swift/SwiftUI and Kotlin/Jetpack Compose for maximum performance and device-API access." },
      { title: "Cross-platform", desc: "One React Native or Flutter codebase to both stores — roughly 30–40% faster to launch." },
      { title: "Offline-first", desc: "Local sync, caching, and conflict resolution so the app works on weak or no connectivity." },
      { title: "Push & re-engagement", desc: "Segmented, behavior-triggered notifications via FCM and APNs that bring users back." },
      { title: "In-app payments", desc: "Apple/Google purchases plus Gulf gateways — mada, STC Pay, Tap, HyperPay, Apple Pay." },
      { title: "Security & data protection", desc: "Encryption, biometric auth, and secure storage to meet GDPR and PDPL." },
      { title: "ASO & store compliance", desc: "Listing optimization and passing Apple App Review and Google Play policy." },
      { title: "Mobile CI/CD + RTL", desc: "Automated build/test/release pipelines plus full right-to-left Arabic layouts." },
    ],
    forCompanies: [
      "Launch to both stores faster from a single cross-platform codebase",
      "Open a direct mobile revenue channel with in-app purchases and m-commerce",
      "Lift retention with onboarding and personalized push by up to 50%",
      "Digitize field and ops workflows with offline-capable apps",
      "Own a persistent home-screen touchpoint the web can't match",
    ],
    forCustomers: [
      "Native speed and offline mode — it works on the metro or in the field",
      "Biometric login and one-tap checkout that cut friction",
      "Relevant notifications instead of generic noise",
      "Encrypted, store-vetted apps they can trust with payments",
    ],
    chart: {
      kind: "area",
      title: "Global app-market revenue ($B)",
      unit: "$B",
      source: "Statista Market Forecast (8.17% CAGR to 2031)",
      data: [
        { name: "2026", value: 740 },
        { name: "2028", value: 866 },
        { name: "2030", value: 1014 },
        { name: "2031", value: 1100 },
      ],
    },
    comparison: {
      title: "Mobile web only vs. a native / cross-platform app",
      colA: "Mobile web only",
      colB: "Dedicated app",
      rows: [
        { aspect: "Performance", a: "Browser-bound, variable", b: "Native speed, smooth UI" },
        { aspect: "Offline", a: "Breaks without signal", b: "Works offline, syncs later" },
        { aspect: "Re-engagement", a: "No push channel", b: "Targeted push notifications" },
        { aspect: "Payments", a: "Redirect-heavy checkout", b: "One-tap, biometric, local gateways" },
        { aspect: "Presence", a: "A bookmark, easily forgotten", b: "A home-screen icon, used daily" },
      ],
    },
    process: [
      { title: "Discovery & scoping", desc: "Native vs. cross-platform, target devices, and offline/payment/RTL requirements." },
      { title: "Design & prototype", desc: "Wireframes, UI design, and a clickable prototype validated on real devices." },
      { title: "Build in sprints", desc: "Iterative feature development, API integration, offline sync, and payments." },
      { title: "QA & store submission", desc: "Device testing, security review, ASO assets, and Apple/Google compliance." },
      { title: "Launch & iterate", desc: "Phased rollout, crash and analytics monitoring, updates, and rating management." },
    ],
    stack: ["Swift · SwiftUI", "Kotlin · Compose", "React Native", "Flutter", "Firebase · Supabase", "FCM · APNs", "mada · STC Pay · Tap", "Fastlane · EAS"],
  },

  "custom-ai": {
    tagline:
      "Bespoke AI built around your private knowledge — RAG, document intelligence, extraction, and guardrails that generic tools can't match.",
    metrics: [
      { value: "30–40%", label: "Lower document-processing cost" },
      { value: "50–70%", label: "Faster processing throughput" },
      { value: "$135.2B", label: "AI contribution to KSA GDP by 2030 (PwC)" },
    ],
    capabilities: [
      { title: "RAG pipeline", desc: "Grounds answers in your own documents so the AI stops hallucinating and starts citing." },
      { title: "Document intelligence", desc: "OCR and layout parsing turn PDFs, contracts, and forms into structured data." },
      { title: "Classification & extraction", desc: "Auto-tags documents and pulls named fields — invoice totals, clauses, IDs — cleanly." },
      { title: "Embeddings & vector search", desc: "Converts knowledge into embeddings for fast, semantic retrieval." },
      { title: "Guardrails & safety", desc: "Enforces business rules and blocks prompt injection and PII leakage." },
      { title: "Data pipelines", desc: "Automated ingestion and sync keep the knowledge base current as your data changes." },
      { title: "Domain adaptation", desc: "Tunes models — including Arabic-native — to your terminology and tone." },
      { title: "Evaluation & observability", desc: "Tracks retrieval accuracy and answer faithfulness with eval harnesses and logging." },
    ],
    forCompanies: [
      "Unlock insight trapped in internal docs and unstructured data",
      "Get accuracy generic AI can't reach, grounded in your own sources",
      "Cut processing cost 30–40% and manual handling by up to 75%",
      "Build defensible IP instead of renting someone else's model",
      "Deploy privately and in-region for finance, healthcare, legal, and government",
    ],
    forCustomers: [
      "Faster outcomes — claims, approvals, and cases resolved in minutes",
      "Answers grounded in real policy, not generic AI guesses",
      "Sensitive data kept protected and on-policy",
      "Staff with instant context, so questions aren't repeated",
    ],
    chart: {
      kind: "area",
      title: "Global RAG market size ($B)",
      unit: "$B",
      source: "MarketsandMarkets — RAG Market (38.4% CAGR)",
      data: [
        { name: "2025", value: 1.94 },
        { name: "2027", value: 3.7 },
        { name: "2029", value: 7.1 },
        { name: "2030", value: 9.86 },
      ],
    },
    comparison: {
      title: "Generic AI tool vs. a custom RAG system",
      colA: "Generic AI tool",
      colB: "Raanzlr custom AI",
      rows: [
        { aspect: "Knowledge", a: "Public data only", b: "Your private documents" },
        { aspect: "Accuracy", a: "Plausible but unverified", b: "Grounded and cited" },
        { aspect: "Safety", a: "Open-ended outputs", b: "Guardrails, PII protection" },
        { aspect: "Data location", a: "Public API, off-shore", b: "Private, in-region deploy" },
        { aspect: "Ownership", a: "Rented capability", b: "Defensible, owned IP" },
      ],
    },
    process: [
      { title: "Discovery & knowledge audit", desc: "Map data sources, document types, business rules, and compliance constraints." },
      { title: "Pipeline & ingestion", desc: "Connect sources, parse and OCR documents, then chunk and embed into the vector store." },
      { title: "RAG & guardrails", desc: "Build retrieval, orchestration, and safety/PII guardrails to your business rules." },
      { title: "Evaluate & tune", desc: "Measure retrieval accuracy and faithfulness; tune chunking and prompts." },
      { title: "Deploy & maintain", desc: "Launch with observability, monitoring, and scheduled re-indexing." },
    ],
    stack: ["LangChain · LangGraph", "LlamaIndex", "Pinecone · Weaviate · pgvector", "GPT-4o · Claude · Gemini", "ALLaM · Jais (Arabic)", "NeMo · LLM Guard", "Azure Document AI · Textract", "Airflow · n8n"],
  },

  "crm-integration": {
    tagline:
      "Connect CRMs, ERPs, databases, and legacy tools into one observable source of truth — clean APIs, logs, retries, and documentation.",
    metrics: [
      { value: "897", label: "Apps in the average enterprise — only 29% integrated" },
      { value: "$4.7M", label: "Average annual spend on custom integrations" },
      { value: "39%", label: "Of IT team time goes to building integrations" },
    ],
    capabilities: [
      { title: "REST / GraphQL APIs", desc: "Clean, documented endpoints that expose and connect your system data securely." },
      { title: "Bidirectional sync", desc: "Two-way, conflict-aware syncing keeps CRM, ERP, and database records aligned." },
      { title: "Legacy connectors", desc: "Adapters for older or in-house systems with no modern API — file-based, SOAP, direct DB." },
      { title: "ETL / ELT pipelines", desc: "Extract, transform, and load data into warehouses and dashboards." },
      { title: "Single source of truth", desc: "A canonical data model and dedupe so one trusted record exists everywhere." },
      { title: "Observability", desc: "Pipeline logging, automatic retries, dead-letter handling, and failure alerts." },
      { title: "Auth & security", desc: "OAuth 2.0, secrets management, and role-based access across every integration." },
      { title: "Docs & handover", desc: "API specs, data-flow diagrams, and runbooks your team can actually operate." },
    ],
    forCompanies: [
      "Close the integration gap that leaves 71% of enterprise apps siloed",
      "Reclaim the ~39% of IT time spent rebuilding custom integrations",
      "End the ~19% of the week staff lose hunting for information",
      "Cut duplicate and stale records that corrupt reporting",
      "Lay the clean-data foundation that analytics and AI require",
    ],
    forCustomers: [
      "Staff see one complete, current record — no repeated questions",
      "Orders, payments, and tickets don't silently fail between systems",
      "Faster quoting, shipping, and resolution with no manual lookups",
      "Consistent numbers because data flows from one verified source",
    ],
    chart: {
      kind: "donut",
      title: "Enterprise apps that are actually integrated",
      unit: "%",
      source: "MuleSoft 2025 Connectivity Benchmark",
      data: [
        { name: "Integrated", value: 29 },
        { name: "Siloed", value: 71 },
      ],
    },
    comparison: {
      title: "Disconnected systems vs. one source of truth",
      colA: "Disconnected systems",
      colB: "Integrated source of truth",
      rows: [
        { aspect: "Data", a: "Siloed, contradictory", b: "Single trusted record" },
        { aspect: "Syncing", a: "Manual exports and re-keying", b: "Automated, both directions" },
        { aspect: "Failures", a: "Silent and untracked", b: "Logged, retried, alerted" },
        { aspect: "Reporting", a: "Numbers never quite match", b: "Consistent across every tool" },
        { aspect: "AI readiness", a: "Data too messy to use", b: "Clean foundation for AI" },
      ],
    },
    process: [
      { title: "Systems & data audit", desc: "Inventory apps, sources, and gaps; define the source-of-truth model." },
      { title: "Architecture & API design", desc: "Design clean APIs, data mappings, sync rules, and the observability layer." },
      { title: "Build connectors", desc: "Develop integrations, ETL flows, and legacy adapters with auth and security." },
      { title: "Test & document", desc: "Verify data integrity and failure handling; deliver API docs and diagrams." },
      { title: "Deploy & monitor", desc: "Launch with logging, alerting, and retry monitoring, plus runbooks." },
    ],
    stack: ["REST · GraphQL · gRPC", "Webhooks · OAuth 2.0", "Airbyte · Fivetran · dbt", "Apache Airflow · Kafka", "Salesforce · HubSpot · Zoho", "SAP · Odoo · Dynamics", "PostgreSQL · Snowflake · BigQuery", "Datadog · Grafana"],
  },

  "ui-ux": {
    tagline:
      "Research-led product design — flows, wireframes, design systems, and interfaces that make complex software feel effortless.",
    metrics: [
      { value: "$100", label: "Returned for every $1 invested in UX" },
      { value: "up to 400%", label: "Conversion lift from end-to-end UX work" },
      { value: "50ms", label: "All it takes for a user to judge your interface" },
    ],
    capabilities: [
      { title: "UX research", desc: "Interviews, surveys, and analytics to understand real users before any pixels." },
      { title: "Information architecture", desc: "Structuring content and mapping journeys so complex software stays navigable." },
      { title: "Wireframing", desc: "Low-fidelity layouts that lock down structure and logic before visual design." },
      { title: "Design systems", desc: "Reusable components and tokens that keep products consistent and scalable." },
      { title: "Interactive prototyping", desc: "Clickable, high-fidelity Figma prototypes to validate flows early." },
      { title: "Usability testing", desc: "Moderated and unmoderated tests that find friction before it ships." },
      { title: "Accessibility (WCAG)", desc: "Contrast, focus, semantics, and screen-reader support so everyone can use it." },
      { title: "RTL Arabic design", desc: "Mirrored layouts and Arabic typography designed as a discipline, not a translation step." },
    ],
    forCompanies: [
      "Lift conversion across every touchpoint — up to 400% on full UX work",
      "Earn one of the highest ROIs in product: ~$100 back per $1 spent",
      "Cut support tickets and rework by catching problems before code",
      "Ship faster as teams build from a vetted design system",
      "Reduce churn from the ~88% of users who won't return after bad UX",
    ],
    forCustomers: [
      "Complete tasks without confusion or training",
      "Instant trust from a clear, polished first impression",
      "Inclusive design that works with assistive tech and in bright sun",
      "A consistent feel across every screen and channel",
    ],
    chart: {
      kind: "bar",
      title: "Conversion lift from design investment (%)",
      unit: "%",
      source: "Forrester (via Eficode) & Baymard, 2025",
      data: [
        { name: "Checkout fix", value: 35 },
        { name: "UI redesign", value: 200 },
        { name: "Full UX", value: 400 },
      ],
    },
    comparison: {
      title: "Developer-default UI vs. researched UX",
      colA: "Developer-default UI",
      colB: "Researched UX",
      rows: [
        { aspect: "Starting point", a: "Built on assumptions", b: "Built on user research" },
        { aspect: "Consistency", a: "Re-invented per screen", b: "One design system" },
        { aspect: "Conversion", a: "Friction goes unnoticed", b: "Tested and optimized" },
        { aspect: "Accessibility", a: "An afterthought", b: "WCAG by design" },
        { aspect: "Arabic", a: "Flipped, awkward", b: "True RTL, native feel" },
      ],
    },
    process: [
      { title: "Discovery & research", desc: "Stakeholder goals, user research, competitive review, and success metrics." },
      { title: "Architecture & wireframes", desc: "Information architecture, user flows, and low-fidelity layouts." },
      { title: "Visual design & prototype", desc: "High-fidelity UI, a design system, and an interactive prototype with RTL variants." },
      { title: "Validation", desc: "Usability testing and a WCAG audit, then iterate on what you learn." },
      { title: "Handoff & support", desc: "Figma Dev Mode specs, tokens, and design-system docs, with QA during build." },
    ],
    stack: ["Figma · Dev Mode", "FigJam", "Storybook", "Tokens Studio", "Maze · Hotjar", "Stark · axe (a11y)", "Tailwind · shadcn/ui", "Framer · Lottie"],
  },

  consulting: {
    tagline:
      "A clear, evidence-based read on your stack — architecture, security, performance, and cost — turned into a prioritized roadmap.",
    metrics: [
      { value: "~40%", label: "Of IT budget lost to technical-debt fallout" },
      { value: "29%", label: "Of cloud spend is wasted on average" },
      { value: "$7.3M", label: "Average cost of a Middle East data breach" },
    ],
    capabilities: [
      { title: "Architecture review", desc: "Maps the system end to end and flags bottlenecks, single points of failure, and brittle coupling." },
      { title: "Tech-debt audit", desc: "Quantifies maintainability, complexity, and duplication, with remediation cost vs. risk." },
      { title: "Security assessment", desc: "Scans code and dependencies against the OWASP Top 10 for injection, auth, and secrets flaws." },
      { title: "Performance & scalability", desc: "Measures latency, load behavior, and Core Web Vitals; finds slow queries and capacity limits." },
      { title: "Cloud cost review", desc: "Identifies idle and oversized resources and right-sizing opportunities (FinOps)." },
      { title: "Automation mapping", desc: "Spots manual, repetitive workflows ripe for CI/CD, IaC, or AI automation." },
      { title: "Data & AI readiness", desc: "Evaluates data quality, governance, and pipelines for ML and GenAI adoption." },
      { title: "Prioritized roadmap", desc: "Ranks every finding by business impact, effort, cost, and risk into a sequenced plan." },
    ],
    forCompanies: [
      "Surface cloud waste and tech-debt drains — structured programs cut cloud bills 25–30%",
      "Close security gaps before they become a multi-million-dollar breach",
      "Reclaim the ~33% of developer time currently lost to technical debt",
      "Turn 'it feels slow and risky' into a quantified, budgetable roadmap",
      "Catch reliability and scaling weaknesses before they cause outages",
    ],
    forCustomers: [
      "Fewer outages and consistent service availability",
      "Hardened systems that protect their data",
      "Faster page loads, checkouts, and response times",
      "Improvements shipped sooner as engineering drag drops",
    ],
    chart: {
      kind: "bar",
      title: "Where IT budget quietly leaks (%)",
      unit: "%",
      source: "McKinsey (via SIG) & Flexera State of the Cloud 2026",
      data: [
        { name: "Tech debt", value: 40 },
        { name: "Cloud waste", value: 29 },
        { name: "Avoidable", value: 69 },
      ],
    },
    comparison: {
      title: "Flying blind vs. an audited roadmap",
      colA: "Flying blind",
      colB: "Audited roadmap",
      rows: [
        { aspect: "Decisions", a: "Gut feel and guesswork", b: "Evidence-based and scored" },
        { aspect: "Security", a: "Unknown exposure", b: "OWASP-mapped, prioritized" },
        { aspect: "Cloud cost", a: "Quietly overspending", b: "Right-sized, 25–30% saved" },
        { aspect: "Tech debt", a: "Slows every release", b: "Quantified and sequenced" },
        { aspect: "Roadmap", a: "Reactive firefighting", b: "Prioritized by impact" },
      ],
    },
    process: [
      { title: "Kickoff & scoping", desc: "Align on goals, get read-access to repos and cloud, and set the audit boundaries." },
      { title: "Discovery & scanning", desc: "Run static analysis, security, performance, and cloud-cost tooling across the stack." },
      { title: "Deep review", desc: "Manual architecture and code review plus interviews to add business context." },
      { title: "Findings & roadmap", desc: "Deliver a scored report ranking issues by impact, effort, cost, and risk." },
      { title: "Optional implementation", desc: "Execute the top-priority fixes and automation, then re-audit to verify the gains." },
    ],
    stack: ["SonarQube · Semgrep", "Snyk · CodeQL · OWASP ZAP", "Lighthouse · k6", "Datadog · Grafana · OTel", "AWS Cost Explorer · Infracost", "Terraform · Checkov", "AWS Well-Architected", "Structurizr"],
  },
};

/* ============================================================ ARABIC
   Written natively for Gulf/MENA business readers — not translated. */

const ar: RichMap = {
  "ai-chatbots": {
    tagline:
      "نبني وكلاء ذكاء اصطناعي يعملون عبر واتساب، موقعك الإلكتروني، وإنستغرام للرد على العملاء، تأهيل الفرص البيعية، حجز المواعيد، وتنفيذ المهام المتكررة على مدار الساعة.",
    metrics: [
      { value: "≤ ٢٣ ثانية", label: "متوسط زمن أول استجابة للعملاء" },
      { value: "+٤٥٪", label: "من الاستفسارات المتكررة يمكن معالجتها تلقائياً" },
      { value: "٩٦٪", label: "من مستخدمي الهواتف في الخليج يمكن الوصول إليهم عبر واتساب" },
    ],
    capabilities: [
      { title: "فهم نية العميل", desc: "يحلل رسائل العملاء حتى وإن كانت مختصرة أو غير مرتبة، ويستخرج المعلومات المهمة مثل الأسماء، المنتجات، التواريخ، والطلبات." },
      { title: "دعم العربية بلهجاتها", desc: "يفهم العربية الفصحى واللهجات الخليجية والمصرية والشامية، بالإضافة إلى الرسائل المختلطة بالعربية والإنجليزية." },
      { title: "تجربة موحدة عبر جميع القنوات", desc: "يعمل الوكيل على واتساب، موقعك الإلكتروني، وإنستغرام مع الاحتفاظ بسجل المحادثة وسياقها بين جميع القنوات." },
      { title: "تأهيل العملاء المحتملين", desc: "يجمع المعلومات المهمة، يحدد جودة العميل المحتمل، ويرسل الفرص الجاهزة مباشرة إلى فريق المبيعات." },
      { title: "إدارة المواعيد", desc: "يحجز المواعيد ويعدلها أو يلغيها بالاعتماد على التوفر الفعلي، دون تدخل يدوي." },
      { title: "التكامل مع أنظمتك", desc: "ينشئ العملاء، يحدث البيانات، ويرسل نتائج المحادثات تلقائياً إلى أنظمة CRM أو أي نظام تستخدمه." },
      { title: "التحويل إلى الموظف المناسب", desc: "عند الحاجة، يحول المحادثة إلى أحد أفراد فريقك مع إرسال كامل سجل المحادثة لتجنب تكرار المعلومات." },
      { title: "إجابات مبنية على بياناتك", desc: "يعتمد على قاعدة المعرفة الخاصة بشركتك ليقدم إجابات دقيقة حول المنتجات، الأسعار، السياسات، والخدمات." },
    ],
    forCompanies: [
      "استقبال العملاء وتأهيلهم على مدار الساعة",
      "تقليل حجم الاستفسارات المتكررة التي تصل إلى فريق الدعم",
      "توثيق جميع المحادثات وربطها تلقائياً بأنظمة الشركة",
      "التعامل مع مواسم الضغط دون الحاجة إلى زيادة عدد الموظفين",
      "تقديم تجربة موحدة بعدة لغات من خلال وكيل واحد",
    ],
    forCustomers: [
      "الحصول على إجابة خلال ثوانٍ",
      "التواصل عبر القنوات التي يستخدمونها يومياً",
      "تجربة محادثة طبيعية بلغتهم ولهجتهم",
      "الانتقال بسهولة إلى موظف مختص عند الحاجة",
    ],
    forCompaniesChart: [
      "مزامنة كل محادثة مع نظام إدارة العلاقات تلقائياً، بلا فرصة ضائعة",
      "استيعاب موجات الطلب الموسمية دون سباق توظيف وتدريب",
      "خدمة العملاء بالعربية والإنجليزية من وكيل واحد",
    ],
    forCustomersChart: [
      "إجابة خلال ثوانٍ بدل الانتظار في الطابور",
      "خدمة عبر واتساب وإنستغرام، بلا تطبيق يُحمَّل ولا انتظار",
      "رد بلهجته هو، لا بعربية فصحى متكلّفة",
      "تحويل سلس لموظف حقيقي حين يكون السؤال معقّداً",
    ],
    chart: {
      kind: "area",
      title: "حجم سوق المحادثة الذكية في الخليج (مليون دولار)",
      unit: "M$",
      source: "GulfSaaSReview، سوق روبوتات المحادثة في الخليج ٢٠٢٦ (نمو ٤١٪)",
      data: [
        { name: "٢٠٢٦", value: 185 },
        { name: "٢٠٢٧", value: 262 },
        { name: "٢٠٢٨", value: 370 },
        { name: "٢٠٢٩", value: 525 },
        { name: "٢٠٣٠", value: 750 },
      ],
    },
    comparison: {
      title: "الدعم التقليدي مقابل وكيل Raanzlr الذكي",
      colA: "الدعم التقليدي",
      colB: "وكيل Raanzlr الذكي",
      rows: [
        { aspect: "أول رد", a: "دقائق إلى ساعات، في الدوام فقط", b: "ثوانٍ، على مدار الساعة" },
        { aspect: "اللغات", a: "محدودة بمن هو في الدوام", b: "لهجات عربية + إنجليزية معاً" },
        { aspect: "التقاط العملاء", a: "يضيع خارج الدوام", b: "يُلتقط ويُؤهَّل ويُزامَن" },
        { aspect: "التوسّع", a: "توظيف وتدريب المزيد", b: "يستوعب الذروة فوراً" },
        { aspect: "كلفة المحادثة", a: "٦–٤٠ دولاراً للتذكرة", b: "جزء بسيط من الدولار" },
      ],
    },
    process: [
      { title: "الاستكشاف ورسم الخريطة", desc: "نحدّد القنوات واللغات وأهم النوايا وقواعد التحويل والمؤشرات المهمة." },
      { title: "المعرفة والتكاملات", desc: "ندخل أسئلتك الشائعة وكتالوجك وسياساتك، ونربط نظام العلاقات والتقويم والدعم." },
      { title: "البناء وضبط اللهجة", desc: "نصمّم التدفقات وندرّب النوايا ونضبط نبرة العربية على هوية علامتك." },
      { title: "التجربة والاختبار", desc: "نختبر على محادثات حقيقية في بيئة آمنة ونتحقق من كل تحويل لموظف." },
      { title: "الإطلاق والتحسين", desc: "ننطلق، نراقب نسبة الحلّ ورضا العملاء، ونعيد التدريب شهرياً على محادثات فعلية." },
    ],
    stack: ["واجهة واتساب للأعمال", "رسائل إنستغرام", "GPT-4o / Claude", "علام · جيس (عربية)", "RAG · pgvector", "n8n · LangGraph", "HubSpot · Salesforce · Zoho", "Calendly · Cal.com"],
  },

  "workflow-automation": {
    tagline:
      "نطوّر أنظمة أتمتة تربط أدواتك المختلفة وتنفّذ المهام المتكررة تلقائياً، لتقليل الأخطاء، تسريع العمليات، ومنح فريقك وقتاً للتركيز على الأعمال ذات القيمة الأعلى.",
    metrics: [
      { value: "٢٤٠ ساعة", label: "يمكن توفيرها سنوياً لكل موظف من خلال أتمتة المهام المتكررة" },
      { value: "٧٥٪", label: "انخفاض محتمل في الأخطاء الناتجة عن إدخال البيانات يدوياً" },
      { value: "٢٤٨٪", label: "عائد استثمار تقديري على المدى الطويل عند تطبيق الأتمتة بالشكل الصحيح" },
    ],
    capabilities: [
      { title: "تشغيل تلقائي للعمليات", desc: "تنطلق الأتمتة مباشرة عند حدوث حدث معين، مثل استلام طلب جديد، إنشاء عميل، تحديث ملف، أو استقبال رسالة." },
      { title: "توزيع العملاء المحتملين", desc: "نجمع العملاء من مختلف القنوات، نقيّمهم، ثم نوجّه كل فرصة إلى الشخص أو الفريق المناسب تلقائياً." },
      { title: "أتمتة الموافقات الداخلية", desc: "ننظم مسارات الموافقات الخاصة بالمشتريات، الإجازات، الفواتير، والطلبات الداخلية مع إشعارات تلقائية لكل مرحلة." },
      { title: "تكامل الأنظمة", desc: "نربط أنظمة CRM، الدعم، المبيعات، التجارة الإلكترونية، وقواعد البيانات لضمان بقاء جميع البيانات متزامنة باستمرار." },
      { title: "التقارير والتنبيهات", desc: "ننشىء تقارير دورية ولوحات متابعة وتنبيهات فورية تساعد الإدارة على متابعة العمليات واتخاذ القرارات بسرعة." },
      { title: "تنظيف وتنظيم البيانات", desc: "نوحّد البيانات، نحذف التكرار، ونتحقق من جودتها بشكل مستمر لضمان الاعتماد عليها في جميع الأنظمة." },
      { title: "معالجة المستندات", desc: "نستخرج البيانات من ملفات PDF والفواتير والنماذج تلقائياً، ثم نرسلها إلى الأنظمة المناسبة دون إدخال يدوي." },
      { title: "الذكاء الاصطناعي داخل سير العمل", desc: "ندمج نماذج الذكاء الاصطناعي لفهم الرسائل، تصنيف الطلبات، تلخيص المحتوى، وإنشاء إجراءات تلقائية أكثر ذكاءً." },
    ],
    forCompanies: [
      "تقليل الوقت المستغرق في العمليات المتكررة",
      "خفض تكاليف التشغيل وتحسين كفاءة الفرق",
      "تسريع الموافقات وتنفيذ الطلبات",
      "تقليل الأخطاء البشرية الناتجة عن إدخال البيانات",
      "التوسع في حجم العمل دون الحاجة إلى زيادة عدد الموظفين بنفس الوتيرة",
    ],
    forCustomers: [
      "سرعة أكبر في معالجة الطلبات",
      "بيانات أكثر دقة واتساقاً",
      "تجربة خدمة أكثر سلاسة",
      "استجابة أسرع بفضل تقليل الأعمال اليدوية داخل الشركة",
    ],
    additionalCapabilities: [
      { title: "معالجة المستندات والفواتير", desc: "نستخرج البيانات المهمة من ملفات PDF، الفواتير، النماذج، والمستندات الممسوحة ضوئياً، ثم نرسلها تلقائياً إلى أنظمة المالية أو التشغيل، مما يقلل الإدخال اليدوي ويسرّع معالجة الطلبات والمعاملات." },
      { title: "ذكاء اصطناعي داخل سير العمل", desc: "نستخدم الذكاء الاصطناعي داخل مسارات الأتمتة لفهم الرسائل والطلبات، تصنيفها، تلخيصها، صياغة ردود أولية، وتوجيهها تلقائياً إلى القسم أو الشخص المناسب." },
    ],
    forCompanies: [
      "توفير وقت كبير في المهام المتكررة داخل المبيعات والدعم والتشغيل",
      "خفض كلفة العمليات ٢٠–٣٠٪ (وحتى ٥٠–٧٠٪ مع الأتمتة الذكية)",
      "تقليص دورات الرد على العملاء والموافقات والتجهيز من أيام إلى دقائق",
      "إنهاء الأخطاء الصامتة الناتجة عن إعادة الإدخال اليدوي",
      "رفع الإنتاجية عند الذروة دون رفع عدد الموظفين",
    ],
    forCustomers: [
      "الاستفسارات تُستلَم وتُوجَّه فوراً، لا بعد طابور يدوي",
      "فواتير وطلبات وبيانات صحيحة لأن كل تسليم يُتحقَّق منه",
      "تجربة موثوقة ومتسقة بغض النظر عمّن في الدوام",
      "تفريغ الموظفين لحل المشكلات الحقيقية بدل تحريك البيانات",
    ],
    chart: {
      kind: "bar",
      title: "نسبة خفض كلفة التشغيل حسب مستوى الأتمتة (٪)",
      unit: "%",
      source: "ماكنزي وغارتنر عبر shno.co، ٢٠٢٦",
      data: [
        { name: "يدوي", value: 0 },
        { name: "أساسي", value: 27 },
        { name: "ذكي", value: 60 },
      ],
    },
    comparison: {
      title: "العمليات اليدوية مقابل الأتمتة",
      colA: "العمليات اليدوية",
      colB: "الأتمتة",
      rows: [
        { aspect: "إدخال بيانات", a: "إدخال بيانات يدوي", b: "مزامنة تلقائية بين الأنظمة" },
        { aspect: "أخطاء", a: "أخطاء متكررة", b: "تقليل الأخطاء بشكل كبير" },
        { aspect: "تنفيذ", a: "تنفيذ يستغرق ساعات أو أيام", b: "تنفيذ خلال دقائق" },
        { aspect: "توسع", a: "يعتمد على حجم الفريق", b: "يتوسع مع نمو الأعمال" },
        { aspect: "متابعة", a: "متابعة يدوية", b: "تقارير وتنبيهات لحظية" },
      ],
    },
    process: [
      { title: "دراسة العمليات الحالية", desc: "نحلل طريقة عمل فريقك ونحدد الخطوات اليدوية التي يمكن أتمتتها لتحقيق أكبر أثر." },
      { title: "تصميم الحل", desc: "نضع تصوراً واضحاً لمسارات العمل والتكاملات المطلوبة بما يتناسب مع طبيعة أعمالك." },
      { title: "التطوير والتكامل", desc: "نبني الأتمتة باستخدام الأدوات والتقنيات المناسبة، مع ربط جميع الأنظمة المطلوبة." },
      { title: "الاختبار", desc: "نجري اختبارات شاملة للتأكد من دقة البيانات، واستقرار سير العمل، ومعالجة جميع الحالات المحتملة." },
      { title: "الإطلاق والتحسين", desc: "بعد الإطلاق نراقب الأداء، نحلل النتائج، ونطور الأتمتة باستمرار بما يتناسب مع نمو أعمالك." },
    ],
        { aspect: "السرعة", a: "أيام للموافقات والتوجيه", b: "دقائق من البداية للنهاية" },
        { aspect: "السعة", a: "محدودة بساعات الموظفين", b: "تتوسّع مع الحجم لا الموظفين" },
        { aspect: "الوضوح", a: "جداول وتخمين", b: "لوحات حية وتنبيهات" },
      ],
    },
    process: [
      { title: "نفهم سير العمل الحالي", desc: "نحلل طريقة تنفيذ العمليات داخل شركتك، ونحدد الخطوات اليدوية والمهام المتكررة ونقاط التأخير وحجم الوقت الذي يمكن توفيره." },
      { title: "نصمم الحل المناسب", desc: "نرتّب فرص الأتمتة حسب الأولوية والتأثير، ثم نصمم مسارات عمل واضحة تربط بين الأدوات والفرق والبيانات بما يناسب طبيعة عملك." },
      { title: "نبني ونربط الأنظمة", desc: "ننفّذ الأتمتة بالأدوات الأنسب لمشروعك مثل n8n وZapier وMake، إلى جانب واجهات برمجية وقواعد بيانات وسكريبتات مخصصة وتكاملات مدعومة بالذكاء الاصطناعي." },
      { title: "نختبر قبل الإطلاق", desc: "نجرّب الأتمتة على حالات واقعية للتأكد من دقة البيانات وسلامة التنفيذ والتعامل مع الأخطاء واستقرار سير العمل." },
      { title: "نطلق ونراقب الأداء", desc: "نفعّل الأتمتة، نجهّز التنبيهات وسجلات المتابعة، ندرّب الفريق، ثم نراقب الأداء ونحسّن المسارات بناءً على الاستخدام الفعلي." },
    ],
    stack: ["n8n", "Zapier", "Make", "REST", "API", "GraphQL", "Python", "Node.js", "AWS Lambda", "OpenAI", "Claude", "Slack", "Microsoft Teams", "Google Workspace"],
  },

  "ai-video-dubbing": {
    tagline:
      "حوّل فيديو واحداً إلى نسخ متعددة اللغات بأصوات طبيعية وترجمة دقيقة وتوقيت يحافظ على نبرة المحتوى ورسالته الأصلية.",
    metrics: [
      { value: "+٩٠٪", label: "أوفر من الدبلجة التقليدية" },
      { value: "خلال يوم", label: "أسرع من دورة الإنتاج التقليدية" },
      { value: "٧٦٪", label: "يفضّلون المحتوى بلغتهم الأم" },
    ],
    capabilities: [
      { title: "تحويل الكلام إلى نص", desc: "نفرّغ الكلام من الفيديو إلى نص دقيق مع توقيت مناسب لكل جملة." },
      { title: "ترجمة وتكييف المحتوى", desc: "نترجم النص بطريقة تحافظ على المعنى وتجعله طبيعياً للجمهور المستهدف." },
      { title: "توليد الصوت بالذكاء الاصطناعي", desc: "ننتج صوتاً جديداً باللغة المطلوبة بأداء واضح وطبيعي، مع إمكانية الحفاظ على طابع صوت المتحدث عند الحاجة." },
      { title: "ضبط النبرة والإيقاع", desc: "نحافظ قدر الإمكان على نبرة المتحدث وطاقة الأداء وتوقيت الكلام داخل الفيديو." },
      { title: "مزامنة الشفاه الاختيارية", desc: "نضبط الصوت الجديد ليتناسب مع حركة الشفاه في المقاطع التي يظهر فيها المتحدث." },
      { title: "ترجمة نصية للفيديو", desc: "نجهّز ملفات ترجمة SRT أو VTT لكل لغة، ويمكن تسليمها منفصلة أو مدمجة داخل الفيديو." },
      { title: "الحفاظ على الموسيقى والمؤثرات", desc: "نستبدل الصوت المنطوق فقط مع الحفاظ على الموسيقى والمؤثرات الصوتية الأصلية قدر الإمكان." },
      { title: "اختيار اللهجة واللكنة", desc: "نساعدك على اختيار اللغة أو اللهجة المناسبة لجمهورك، مثل العربية الخليجية أو المصرية أو الشامية." },
    ],
    forCompanies: [
      "تحويل محتواك إلى لغات ولهجات متعددة للوصول إلى جمهور عربي وعالمي دون إعادة تصوير",
      "استبدال مسارات الدبلجة التقليدية بحلول أسرع وأوفر مدعومة بالذكاء الاصطناعي",
      "نشر النسخ اللغوية الجديدة بالتزامن مع المحتوى الأصلي أو خلال وقت قصير",
      "إعادة استخدام أرشيف الشروحات والإعلانات ومقاطع التدريب في أسواق جديدة",
      "الاستفادة من النصوص والترجمات لتحسين الوصول عبر محركات البحث ومنصات التواصل",
    ],
    forCustomers: [
      "محتوى بلغة ولهجة أقرب للجمهور بدلاً من الاعتماد على الترجمة فقط",
      "أصوات واضحة وطبيعية تحافظ على نبرة المحتوى",
      "فهم الرسالة بسهولة ومتابعة الفيديو حتى النهاية",
      "ترجمات معروضة للمشاهدة بدون صوت ولدعم ذوي الإعاقة السمعية",
    ],
    chart: {
      kind: "bar",
      title: "الكلفة لكل دقيقة منجزة لكل لغة (دولار)",
      unit: "$",
      source: "Camb.ai، الدبلجة الذكية مقابل التقليدية، ٢٠٢٥",
      data: [
        { name: "استوديو تقليدي", value: 300 },
        { name: "أقلمة ذكية", value: 10 },
      ],
    },
    comparison: {
      title: "الدبلجة الاستوديوهية التقليدية مقابل الأقلمة الذكية",
      colA: "استوديو تقليدي",
      colB: "أقلمة Raanzlr الذكية",
      rows: [
        { aspect: "الكلفة/الدقيقة", a: "١٠٠–٥٠٠ دولار للغة", b: "٢–٢٠ دولاراً للغة" },
        { aspect: "مدة الإنجاز", a: "٢–٦ أسابيع", b: "ساعات إلى يوم واحد" },
        { aspect: "اللغات", a: "واحدة تلو الأخرى ومكلفة", b: "عدة لغات بالتوازي" },
        { aspect: "الصوت", a: "ممثل صوتي جديد كل مرة", b: "صوت مستنسخ بهوية ثابتة" },
        { aspect: "المُسلَّمات", a: "الفيديو النهائي فقط", b: "فيديو + صوت + ملفات نصية" },
      ],
    },
    process: [
      { title: "استلام الفيديو", desc: "ترسل لنا رابط الفيديو من يوتيوب أو إنستغرام أو فيسبوك، أو ترفع الملف مباشرة، ونراجع جودته واللغات المطلوبة." },
      { title: "تفريغ الصوت وتجهيزه", desc: "نحوّل الكلام إلى نص بتوقيت مناسب، ونفصل الصوت المنطوق عن الموسيقى والمؤثرات قدر الإمكان." },
      { title: "الترجمة وتكييف المحتوى", desc: "نترجم النص ونعدّله ليلائم الجمهور المستهدف، مع اختيار اللغة أو اللهجة المناسبة مثل الفصحى أو الخليجية أو المصرية أو الشامية." },
      { title: "توليد الصوت والمزامنة", desc: "نولّد الدبلجة بالصوت المناسب باستخدام الذكاء الاصطناعي، ثم نضبط التوقيت مع الفيديو، مع إمكانية مزامنة الشفاه عند الحاجة." },
      { title: "المزج والتسليم", desc: "نمزج الصوت الجديد مع الموسيقى والمؤثرات الأصلية، ثم نسلّم الفيديو النهائي مع ملفات الصوت والنص والترجمة عند الحاجة." },
    ],
    stack: ["Whisper (تفريغ)", "ElevenLabs دبلجة", "HeyGen", "Rask AI", "Murf AI", "فصل المسارات الصوتية", "تصدير SRT / VTT", "نماذج اللهجات العربية"],
  },

  "web-development": {
    tagline:
      "نبني مواقع احترافية، متاجر إلكترونية، بوابات عملاء، ولوحات تحكم سريعة وآمنة، تجمع بين الأداء العالي، سهولة الاستخدام، وقابلية التوسع، مع دعم كامل للعربية واللغات المتعددة.",
    metrics: [
      { value: "+٨٫٤٪", label: "تحسن محتمل في معدلات التحويل مع تحسين سرعة تحميل الموقع" },
      { value: "٥٣٪", label: "من مستخدمي الجوال يغادرون المواقع البطيئة قبل التفاعل معها" },
      { value: "٢٫٠٨ تريليون", label: "القيمة المتوقعة لسوق التجارة الإلكترونية في الخليج خلال السنوات القادمة" },
    ],
    capabilities: [
      { title: "تطوير الواجهة الأمامية", desc: "نبني واجهات حديثة وسريعة تستجيب لجميع أحجام الشاشات، مع تجربة استخدام واضحة وسلسة." },
      { title: "تطوير الأنظمة الخلفية", desc: "نطوّر الأنظمة التي تدير العمليات الداخلية مثل الحسابات، الصلاحيات، لوحات التحكم، إدارة العملاء، والبيانات." },
      { title: "تصميم قواعد البيانات", desc: "نصمم قواعد بيانات آمنة وقابلة للتوسع، تضمن سرعة الوصول إلى البيانات واستقرار النظام مع نمو المشروع." },
      { title: "تحسين الظهور في محركات البحث", desc: "نهيئ الموقع تقنياً ليحقق أفضل أداء في محركات البحث من خلال بنية سليمة، بيانات منظمة، ودعم المحتوى متعدد اللغات." },
      { title: "جاهزية لمحركات الذكاء الاصطناعي", desc: "ننظم المحتوى والبيانات بطريقة تساعد أنظمة الذكاء الاصطناعي ومحركات البحث الحديثة على فهم موقعك والاستشهاد به بشكل أفضل." },
      { title: "النشر والاستضافة", desc: "نجهز الموقع للإطلاق على بنية استضافة سريعة وآمنة، مع بيئات اختبار، وإجراءات نشر تضمن الاستقرار وسهولة التحديث." },
      { title: "الأداء والأمان", desc: "نطبق أفضل الممارسات لتحسين سرعة الموقع، حماية البيانات، وتقليل زمن تحميل الصفحات مع الحفاظ على استقرار الخدمة." },
      { title: "التحليلات وتحسين الأداء", desc: "نربط الموقع بأدوات التحليل ونتابع سلوك المستخدمين لاتخاذ قرارات مبنية على البيانات وتحسين معدلات التحويل باستمرار." },
    ],
    forCompanies: [
      "موقع يدعم أهدافك التسويقية والتجارية، وليس مجرد واجهة رقمية",
      "زيادة فرص الظهور عبر محركات البحث والذكاء الاصطناعي",
      "إدارة عدة لغات وأسواق من منصة واحدة",
      "لوحات تحكم وبوابات عملاء تقلل الأعمال اليدوية",
      "بنية مرنة تسمح بإضافة خدمات وميزات جديدة بسهولة",
    ],
    forCustomers: [
      "صفحات سريعة تقلل وقت الانتظار",
      "تجربة استخدام واضحة على الجوال والكمبيوتر",
      "محتوى متوفر بلغات متعددة بطريقة طبيعية",
      "تنقل بسيط يساعد المستخدم على الوصول لما يحتاجه بسرعة",
    ],
    chart: {
      kind: "area",
      title: "نسبة عمليات بحث جوجل التي تُظهِر إجابات الذكاء الاصطناعي (٪)",
      unit: "%",
      source: "دراسة Semrush لإجابات الذكاء الاصطناعي، ٢٠٢٥",
      data: [
        { name: "يناير", value: 6.49 },
        { name: "مارس", value: 13 },
        { name: "مايو", value: 19 },
        { name: "يوليو", value: 24.61 },
      ],
    },
    comparison: {
      title: "الحلول الجاهزة مقابل منصة Raanzlr",
      colA: "الحلول الجاهزة",
      colB: "منصة Raanzlr",
      rows: [
        { aspect: "مرونة", a: "مرونة محدودة", b: "مصممة حسب احتياجات أعمالك" },
        { aspect: "أداء", a: "أداء يعتمد على القالب", b: "أداء محسّن منذ البداية" },
        { aspect: "توسع", a: "صعوبة التوسع مستقبلاً", b: "بنية قابلة للنمو والتطوير" },
        { aspect: "العربية", a: "دعم محدود للعربية", b: "دعم كامل للعربية واللغات المتعددة" },
        { aspect: "التحسين", a: "تحسينات لاحقة", b: "تحسين الأداء وSEO جزء من عملية التطوير" },
      ],
    },
    process: [
      { title: "دراسة المشروع", desc: "نفهم أهدافك، جمهورك، ومتطلبات النظام قبل وضع خطة التنفيذ." },
      { title: "تصميم تجربة المستخدم", desc: "نصمم هيكل الصفحات وتجربة الاستخدام لضمان سهولة الوصول إلى المعلومات وتحقيق أهداف الموقع." },
      { title: "التطوير والتكامل", desc: "نبني الواجهة، الأنظمة الخلفية، وقواعد البيانات، مع تنفيذ جميع التكاملات المطلوبة." },
      { title: "الاختبار والإطلاق", desc: "نجري اختبارات الأداء، التوافق، والأمان قبل إطلاق الموقع على بيئة إنتاج مستقرة." },
      { title: "المتابعة والتحسين", desc: "نراقب أداء الموقع بعد الإطلاق وننفذ التحسينات التي ترفع السرعة وتجربة المستخدم ومعدلات التحويل." },
    ],
      { title: "القياس والتحسين", desc: "نراقب الأداء وسلوك الزوار، نختبر التحسينات، ونطوّر الصفحات لرفع التحويلات وتحسين الظهور مع الوقت." },
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "NestJS", "PostgreSQL", "Prisma", "Redis", "Structured Data", "hreflang", "Vercel", "Cloudflare", "Google Analytics 4", "PostHog"],
  },

  "mobile-apps": {
    tagline:
      "تطبيقات iOS وAndroid للعملاء والفرق الميدانية والعمليات اليومية، بتجربة استخدام سلسة وأداء موثوق على مختلف الأجهزة.",
    metrics: [
      { value: "٧٣٩٫٦ مليار", label: "إيرادات سوق التطبيقات العالمي في ٢٠٢٦" },
      { value: "+٥٠٪", label: "احتفاظ أعلى بالمستخدمين مع تجربة دخول واضحة" },
      { value: "٨٢٪", label: "الجوال قناة رئيسية للتجارة في الخليج" },
    ],
    capabilities: [
      { title: "تطوير أصلي", desc: "نطوّر تطبيقات iOS وAndroid باستخدام Swift/SwiftUI وKotlin/Compose عندما يحتاج المشروع إلى أعلى أداء ووصول كامل لإمكانات الجهاز." },
      { title: "تطوير متعدد المنصات", desc: "نستخدم React Native أو Flutter عند الحاجة إلى إطلاق أسرع للتطبيق على iOS وAndroid من قاعدة تطوير واحدة." },
      { title: "العمل دون اتصال", desc: "نجهّز التطبيق ليعمل حتى مع ضعف الإنترنت أو انقطاعه، من خلال التخزين المحلي والمزامنة التلقائية عند عودة الاتصال." },
      { title: "الإشعارات وإعادة التفاعل", desc: "نفعّل إشعارات ذكية ومخصصة حسب سلوك المستخدم، عبر FCM وAPNs، لزيادة التفاعل والعودة إلى التطبيق." },
      { title: "المدفوعات داخل التطبيق", desc: "نربط التطبيق بخيارات دفع مناسبة مثل Apple Pay وGoogle Pay والشراء داخل التطبيق وبوابات دفع مثل Tap وHyperPay وSTC Pay عند الحاجة." },
      { title: "الأمان وحماية البيانات", desc: "نطبّق التشفير وتسجيل الدخول الآمن والمصادقة الحيوية والتخزين الآمن لحماية بيانات المستخدمين." },
      { title: "تحسين المتجر والامتثال", desc: "نجهّز صفحة التطبيق والصور والوصف والكلمات المناسبة، ونساعدك على تلبية متطلبات App Store وGoogle Play." },
      { title: "النشر والتحديثات", desc: "نُعدّ مسارات بناء واختبار ونشر تساعد على إصدار التطبيق وتحديثه بشكل منظم، مع دعم اللغات واتجاهات الكتابة المختلفة." },
    ],
    forCompanies: [
      "إطلاق أسرع على iOS وAndroid عند اختيار التطوير متعدد المنصات",
      "فتح قناة إيراد مباشرة عبر البيع والاشتراكات والشراء داخل التطبيق وتجارب التجارة عبر الجوال",
      "استخدام التهيئة الذكية والإشعارات المخصصة لإعادة المستخدمين وتحسين تفاعلهم",
      "تحويل أعمال الفرق الميدانية والتشغيل إلى تطبيقات تعمل حتى مع ضعف الاتصال",
      "جعل علامتك أقرب إلى العميل عبر تطبيق موجود على الشاشة الرئيسية",
    ],
    forCustomers: [
      "تطبيق يعمل بسلاسة على الجوال ويدعم العمل دون اتصال عند الحاجة",
      "تسجيل دخول حيوي وخيارات دفع سريعة تقلل خطوات الاستخدام",
      "تنبيهات مرتبطة بسلوك المستخدم واحتياجه، لا رسائل عامة مزعجة",
      "تطبيق منشور عبر المتاجر، مع أمان مناسب للدفع وحماية البيانات",
    ],
    chart: {
      kind: "area",
      title: "إيرادات سوق التطبيقات العالمي (مليار دولار)",
      unit: "B$",
      source: "توقعات Statista (نمو ٨٪ حتى ٢٠٣١)",
      data: [
        { name: "٢٠٢٦", value: 740 },
        { name: "٢٠٢٨", value: 866 },
        { name: "٢٠٣٠", value: 1014 },
        { name: "٢٠٣١", value: 1100 },
      ],
    },
    comparison: {
      title: "ويب الجوال فقط مقابل تطبيق أصلي / متعدد المنصات",
      colA: "ويب الجوال فقط",
      colB: "تطبيق مخصّص",
      rows: [
        { aspect: "الأداء", a: "مقيّد بالمتصفح ومتذبذب", b: "سرعة أصلية وواجهة سلسة" },
        { aspect: "دون اتصال", a: "يتوقف بلا شبكة", b: "يعمل ثم يزامن لاحقاً" },
        { aspect: "إعادة التفاعل", a: "بلا قناة إشعارات", b: "إشعارات موجّهة" },
        { aspect: "المدفوعات", a: "دفع بإعادة توجيه متعبة", b: "نقرة واحدة وبوابات محلية" },
        { aspect: "الحضور", a: "إشارة مرجعية تُنسى", b: "أيقونة على الشاشة تُستخدَم يومياً" },
      ],
    },
    process: [
      { title: "الاستكشاف وتحديد النطاق", desc: "نحدد أهداف التطبيق والجمهور والأجهزة المستهدفة، ونختار بين التطوير الأصلي أو متعدد المنصات، مع تحديد متطلبات العمل دون اتصال والدفع واللغات والتكاملات." },
      { title: "التصميم والنموذج", desc: "نصمم تجربة المستخدم والواجهات، ثم نجهز نموذجاً تفاعلياً يمكن اختباره على أجهزة حقيقية قبل بدء التطوير الكامل." },
      { title: "البناء على مراحل", desc: "نطوّر التطبيق تدريجياً، ونربطه بالأنظمة الخلفية، ونضيف المزايا الأساسية مثل المزامنة دون اتصال والإشعارات والمدفوعات عند الحاجة." },
      { title: "الاختبار وتجهيز المتاجر", desc: "نختبر التطبيق على أجهزة مختلفة، نراجع الأداء والأمان، ونجهز الصور والوصف والملفات المطلوبة للنشر على App Store وGoogle Play." },
      { title: "الإطلاق والتحسين", desc: "نطلق التطبيق بشكل منظم، نراقب الأعطال والتحليلات والتقييمات، ثم نطوّر التحديثات بناءً على الاستخدام الفعلي وملاحظات المستخدمين." },
    ],
    stack: ["Swift", "SwiftUI", "Kotlin", "Compose", "React Native", "Flutter", "Firebase", "Supabase", "FCM", "APNs", "مدى", "STC Pay", "Tap", "Fastlane", "EAS"],
  },

  "custom-ai": {
    tagline:
      "نصمم أنظمة ذكاء اصطناعي مبنية على بيانات شركتك ومعرفتها الداخلية لمساعدتك على فهم المستندات، استخراج المعلومات، أتمتة المهام المعرفية، واتخاذ قرارات أسرع وأكثر دقة.",
    metrics: [
      { value: "٣٠–٤٠٪", label: "خفض محتمل في تكلفة معالجة المستندات والبيانات بفضل الأتمتة الذكية" },
      { value: "٥٠–٧٠٪", label: "تسريع عمليات التصنيف، الاستخراج، وتحليل المعلومات" },
      { value: "١٣٥٫٢ مليار دولار", label: "القيمة المتوقعة لإسهام الذكاء الاصطناعي في الاقتصاد السعودي بحلول عام 2030" },
    ],
    capabilities: [
      { title: "البحث داخل المعرفة الداخلية", desc: "نبني نظاماً يستطيع البحث في مستنداتك وقواعد بياناتك والإجابة اعتماداً على معلومات شركتك فقط." },
      { title: "فهم المستندات", desc: "نحلل ملفات PDF والعقود والفواتير والنماذج، ونحوّل محتواها إلى بيانات منظمة قابلة للبحث والمعالجة." },
      { title: "استخراج المعلومات", desc: "نستخرج تلقائياً البيانات المهمة مثل الأسماء، التواريخ، الأرقام، البنود، والقيم المالية بدقة عالية." },
      { title: "البحث الدلالي", desc: "نطوّر محرك بحث يفهم معنى السؤال وليس الكلمات فقط، للوصول إلى النتائج الأكثر ارتباطاً." },
      { title: "الأمان والصلاحيات", desc: "نطبق ضوابط واضحة للوصول إلى البيانات، مع حماية المعلومات الحساسة والتحكم في صلاحيات المستخدمين." },
      { title: "تحديث المعرفة", desc: "نربط النظام بمصادر البيانات المختلفة ليبقى محدثاً تلقائياً مع أي تغييرات في الملفات أو قواعد البيانات." },
      { title: "التخصيص حسب نشاطك", desc: "نكيّف الحل ليتوافق مع مصطلحات قطاعك، إجراءات العمل، واللغات التي يستخدمها فريقك." },
      { title: "المراقبة والتحسين", desc: "نقيس جودة النتائج باستمرار ونطور أداء النظام بناءً على الاستخدام الفعلي واحتياجات العمل." },
    ],
    forCompanies: [
      "تحويل المستندات إلى مصدر معرفة يمكن البحث فيه والاستفادة منه",
      "تحسين دقة الإجابات والقرارات بالاعتماد على بياناتك الخاصة",
      "تقليل الوقت المستغرق في مراجعة المستندات واستخراج المعلومات",
      "بناء نظام ذكاء اصطناعي يعكس طريقة عمل شركتك وليس نموذجاً عاماً",
      "تلبية متطلبات الخصوصية والأمان في القطاعات الحساسة",
    ],
    forCustomers: [
      "الوصول إلى المعلومات المطلوبة خلال ثوانٍ",
      "تقليل الوقت المستغرق في البحث داخل الملفات",
      "الاعتماد على إجابات موثقة تستند إلى بيانات الشركة",
      "تسريع تنفيذ المهام اليومية وتقليل الأعمال المتكررة",
    ],
    chart: {
      kind: "area",
      title: "حجم سوق الاسترجاع المعزّز عالمياً (مليار دولار)",
      unit: "B$",
      source: "MarketsandMarkets، سوق RAG (نمو ٣٨٪)",
      data: [
        { name: "٢٠٢٥", value: 1.94 },
        { name: "٢٠٢٧", value: 3.7 },
        { name: "٢٠٢٩", value: 7.1 },
        { name: "٢٠٣٠", value: 9.86 },
      ],
    },
    comparison: {
      title: "أداة ذكاء عامة مقابل نظام استرجاع مخصّص",
      colA: "أداة ذكاء عامة",
      colB: "ذكاء Raanzlr المخصّص",
      rows: [
        { aspect: "المعرفة", a: "بيانات عامة فقط", b: "مستنداتك الخاصة" },
        { aspect: "الدقة", a: "معقولة لكن غير موثّقة", b: "مستندة وموثّقة" },
        { aspect: "الأمان", a: "مخرجات مفتوحة", b: "ضوابط وحماية للبيانات" },
        { aspect: "مكان البيانات", a: "واجهة عامة خارج المنطقة", b: "نشر خاص داخل المنطقة" },
        { aspect: "الملكية", a: "قدرة مستأجَرة", b: "ملكية فكرية محصّنة" },
      ],
    },
    process: [
      { title: "الاستكشاف وتدقيق المعرفة", desc: "نحدد مصادر البيانات وأنواع المستندات وطريقة استخدام المعلومات داخل شركتك وقواعد العمل ومتطلبات الخصوصية والامتثال." },
      { title: "تجهيز البيانات والمستندات", desc: "نربط مصادر المعرفة، نحلل المستندات، ننظم محتواها، ونجهزها لتكون قابلة للبحث والاستخدام داخل نظام الذكاء الاصطناعي." },
      { title: "بناء البحث والضوابط", desc: "نطوّر آلية البحث داخل المعرفة الداخلية، ونضيف ضوابط الأمان والصلاحيات حتى تظهر الإجابات المناسبة للمستخدم المناسب." },
      { title: "التقييم والتحسين", desc: "نقيس دقة الوصول إلى المعلومات وجودة الإجابات ومدى التزام النظام بالمصادر، ثم نحسّن طريقة المعالجة والتعليمات حسب النتائج." },
      { title: "النشر والصيانة", desc: "نطلق النظام في البيئة المناسبة، مع مراقبة الأداء وتحديث قاعدة المعرفة وإعادة الفهرسة بشكل دوري لضمان بقاء النتائج دقيقة ومحدثة." },
    ],
    stack: ["LangChain · LangGraph", "LlamaIndex", "Pinecone · Weaviate · pgvector", "GPT-4o · Claude · Gemini", "علام · جيس (عربية)", "NeMo · LLM Guard", "Azure Document AI · Textract", "Airflow · n8n"],
  },

  "crm-integration": {
    tagline:
      "نوحّد أنظمتك المختلفة في منظومة مترابطة تتبادل البيانات تلقائياً، مما يقلل العمل اليدوي، يحسن دقة المعلومات، ويمنح فريقك رؤية موحدة لجميع العمليات.",
    metrics: [
      { value: "٨٩٧", label: "متوسط عدد التطبيقات المستخدمة داخل المؤسسات الكبيرة" },
      { value: "٢٩٪", label: "فقط من تطبيقات المؤسسات تكون مترابطة بشكل فعّال" },
      { value: "٣٩٪", label: "من وقت فرق التقنية يُستهلك في تطوير وصيانة التكاملات" },
    ],
    capabilities: [
      { title: "تطوير واجهات برمجية حديثة", desc: "نصمم واجهات REST وGraphQL آمنة وموثقة تسهّل تبادل البيانات بين الأنظمة المختلفة." },
      { title: "مزامنة البيانات", desc: "ننفذ مزامنة ثنائية الاتجاه تحافظ على اتساق البيانات في جميع الأنظمة دون تعارض." },
      { title: "ربط الأنظمة القديمة", desc: "نطوّر حلولاً لدمج الأنظمة القديمة أو المخصصة مع الأنظمة الحديثة دون الحاجة إلى استبدالها." },
      { title: "خطوط معالجة البيانات", desc: "نبني مسارات ETL وELT لاستخراج البيانات وتحويلها ونقلها إلى مستودعات البيانات أو أدوات التحليل." },
      { title: "مصدر بيانات موحد", desc: "نوحّد البيانات القادمة من مختلف الأنظمة لإنشاء سجل واحد موثوق يمكن الاعتماد عليه في جميع العمليات." },
      { title: "المراقبة والتنبيهات", desc: "نوفر سجلات تشغيل، إعادة محاولات تلقائية، وتنبيهات تساعد على اكتشاف الأعطال ومعالجتها بسرعة." },
      { title: "الأمان وإدارة الصلاحيات", desc: "نطبق أفضل الممارسات في المصادقة، إدارة المفاتيح، والتحكم في الوصول لحماية جميع التكاملات." },
      { title: "التوثيق والتسليم", desc: "نسلم وثائق تقنية واضحة تشمل الواجهات، تدفق البيانات، وآلية تشغيل وصيانة التكاملات." },
    ],
    forCompanies: [
      "التخلص من تكرار البيانات بين الأنظمة",
      "تقليل الوقت الذي يقضيه الفريق في إدارة التكاملات اليدوية",
      "تحسين جودة التقارير واتخاذ القرارات",
      "إنشاء بنية بيانات جاهزة للتوسع والتحليلات المستقبلية",
      "بناء أساس قوي لمشاريع الذكاء الاصطناعي والأتمتة",
    ],
    forCustomers: [
      "معلومات محدثة ودقيقة في جميع نقاط التواصل",
      "تنفيذ أسرع للطلبات والخدمات",
      "تجربة أكثر سلاسة دون الحاجة إلى إعادة إدخال البيانات",
      "استجابة أفضل بفضل تكامل جميع الأنظمة",
    ],
    chart: {
      kind: "donut",
      title: "نسبة تطبيقات المؤسسة المترابطة فعلاً",
      unit: "%",
      source: "MuleSoft، معيار الترابط ٢٠٢٥",
      data: [
        { name: "مترابطة", value: 29 },
        { name: "معزولة", value: 71 },
      ],
    },
    comparison: {
      title: "أنظمة منفصلة مقابل مصدر حقيقة واحد",
      colA: "أنظمة منفصلة",
      colB: "مصدر حقيقة مترابط",
      rows: [
        { aspect: "البيانات", a: "معزولة ومتناقضة", b: "سجل واحد موثوق" },
        { aspect: "المزامنة", a: "تصدير وإدخال يدوي", b: "تلقائية في الاتجاهين" },
        { aspect: "الأعطال", a: "صامتة وغير متتبَّعة", b: "مسجّلة ومعاد محاولتها ومنبَّه عنها" },
        { aspect: "التقارير", a: "أرقام لا تتطابق", b: "متّسقة عبر كل أداة" },
        { aspect: "جاهزية الذكاء", a: "بيانات أكثر فوضى من أن تُستخدَم", b: "أساس نظيف للذكاء الاصطناعي" },
      ],
    },
    process: [
      { title: "تدقيق الأنظمة والبيانات", desc: "نحصر التطبيقات والمصادر والفجوات، ونحدّد نموذج مصدر الحقيقة." },
      { title: "تصميم البنية والواجهات", desc: "نصمّم واجهات نظيفة وربط البيانات وقواعد المزامنة وطبقة المراقبة." },
      { title: "بناء الموصّلات", desc: "نطوّر التكاملات وخطوط ETL ومحوّلات الأنظمة القديمة بمصادقة وأمان." },
      { title: "الاختبار والتوثيق", desc: "نتحقّق من سلامة البيانات ومعالجة الأعطال، ونسلّم وثائق ومخططات." },
      { title: "النشر والمراقبة", desc: "نطلق مع تسجيل وتنبيه ومراقبة لإعادة المحاولة وأدلة تشغيل." },
    ],
    stack: ["REST · GraphQL · gRPC", "روابط برمجية · OAuth 2.0", "Airbyte · Fivetran · dbt", "Apache Airflow · Kafka", "Salesforce · HubSpot · Zoho", "SAP · Odoo · Dynamics", "PostgreSQL · Snowflake · BigQuery", "Datadog · Grafana"],
  },

  "ui-ux": {
    tagline:
      "نصمم واجهات وتجارب استخدام تساعد المستخدمين على إنجاز مهامهم بسهولة، وتمنح منتجاتك الرقمية تجربة واضحة، متناسقة، وقابلة للنمو.",
    metrics: [
      { value: "١٠٠×", label: "قد يحقق الاستثمار في تجربة المستخدم عائداً مرتفعاً عند تطبيقه بالشكل الصحيح" },
      { value: "حتى ٤٠٠٪", label: "تحسن محتمل في معدلات التحويل عند تحسين تجربة المستخدم بشكل متكامل" },
      { value: "٥٠ مللي ثانية", label: "الوقت الذي يحتاجه المستخدم لتكوين انطباعه الأول عن واجهتك" },
    ],
    capabilities: [
      { title: "بحث تجربة المستخدم", desc: "ندرس سلوك المستخدمين واحتياجاتهم من خلال المقابلات، التحليلات، والاستبيانات لبناء قرارات تصميم تستند إلى بيانات حقيقية." },
      { title: "هندسة المعلومات", desc: "ننظم المحتوى ونبني هيكل المنتج بطريقة تجعل الوصول إلى المعلومات والوظائف أكثر وضوحاً وسهولة." },
      { title: "الهياكل الأولية", desc: "نصمم Wireframes توضح منطق الصفحات وتدفق الاستخدام قبل الانتقال إلى التصميم النهائي." },
      { title: "أنظمة التصميم", desc: "نبني مكتبة مكونات موحدة تساعد على الحفاظ على الاتساق وتسريع تطوير المنتج مستقبلاً." },
      { title: "النماذج التفاعلية", desc: "نصمم نماذج أولية عالية الدقة يمكن اختبارها ومراجعتها قبل بدء البرمجة." },
      { title: "اختبارات الاستخدام", desc: "نختبر المنتج مع مستخدمين حقيقيين لاكتشاف العقبات وتحسين التجربة قبل الإطلاق." },
      { title: "سهولة الوصول", desc: "نطبق أفضل ممارسات إمكانية الوصول لضمان استخدام المنتج من قبل أكبر شريحة ممكنة من المستخدمين." },
      { title: "دعم كامل للواجهة العربية", desc: "نصمم واجهات تدعم اللغة العربية والاتجاه من اليمين إلى اليسار بطريقة طبيعية ومتوافقة مع تجربة الاستخدام." },
    ],
    forCompanies: [
      "تحسين معدلات التحويل عبر جميع نقاط التفاعل",
      "تقليل تكاليف التعديلات بعد بدء التطوير",
      "تسريع تطوير المنتج من خلال نظام تصميم موحد",
      "تقليل استفسارات الدعم الناتجة عن صعوبة الاستخدام",
      "بناء تجربة احترافية تعزز ثقة العملاء بعلامتك التجارية",
    ],
    forCustomers: [
      "الوصول إلى المعلومات والوظائف بسهولة",
      "تنفيذ المهام بسرعة ودون تعقيد",
      "تجربة استخدام متناسقة على مختلف الأجهزة",
      "واجهات واضحة تدعم العربية وسهلة القراءة والتفاعل",
    ],
    chart: {
      kind: "bar",
      title: "ارتفاع التحويل من الاستثمار في التصميم (٪)",
      unit: "%",
      source: "Forrester (عبر Eficode) وBaymard، ٢٠٢٥",
      data: [
        { name: "إصلاح الدفع", value: 35 },
        { name: "إعادة تصميم الواجهة", value: 200 },
        { name: "تجربة متكاملة", value: 400 },
      ],
    },
    comparison: {
      title: "واجهة افتراضية من المطوّر مقابل تجربة مبنية على بحث",
      colA: "واجهة افتراضية",
      colB: "تجربة مبنية على بحث",
      rows: [
        { aspect: "نقطة البداية", a: "مبنية على افتراضات", b: "مبنية على بحث المستخدم" },
        { aspect: "الاتساق", a: "تُعاد لكل شاشة", b: "نظام تصميم واحد" },
        { aspect: "التحويل", a: "احتكاك لا يُلاحَظ", b: "مُختبَر ومحسَّن" },
        { aspect: "سهولة الوصول", a: "فكرة لاحقة", b: "WCAG منذ التصميم" },
        { aspect: "العربية", a: "مقلوبة ومربكة", b: "اتجاه صحيح وإحساس أصيل" },
      ],
    },
    process: [
      { title: "الاستكشاف والبحث", desc: "أهداف الجهات المعنية وبحث المستخدم ومراجعة المنافسين والمؤشرات." },
      { title: "الهندسة والهياكل", desc: "هندسة المعلومات وتدفقات المستخدم والتخطيطات منخفضة الدقة." },
      { title: "التصميم والنموذج", desc: "واجهة عالية الدقة ونظام تصميم ونموذج تفاعلي بنسخ عربية بالاتجاه الصحيح." },
      { title: "التحقق", desc: "اختبار سهولة الاستخدام وتدقيق WCAG، ثم التحسين وفق ما نتعلّمه." },
      { title: "التسليم والدعم", desc: "مواصفات Figma Dev Mode والرموز ووثائق النظام مع دعم أثناء البناء." },
    ],
    stack: ["Figma · Dev Mode", "FigJam", "Storybook", "Tokens Studio", "Maze · Hotjar", "Stark · axe (وصول)", "Tailwind · shadcn/ui", "Framer · Lottie"],
  },

  consulting: {
    tagline:
      "نقيّم البنية التقنية لشركتك من جميع الجوانب، بدءاً من جودة الكود والأداء وصولاً إلى الأمان والبنية السحابية، ثم نحول النتائج إلى خطة عمل واضحة تساعدك على اتخاذ قرارات تقنية أكثر دقة.",
    metrics: [
      { value: "~٤٠٪", label: "من ميزانية التطوير قد تُستهلك في معالجة الدين التقني عند غياب التخطيط المناسب" },
      { value: "٢٩٪", label: "من تكاليف البنية السحابية يمكن أن تذهب إلى موارد غير مستغلة بالشكل الأمثل" },
      { value: "٧٫٣ مليون دولار", label: "متوسط تكلفة اختراق بيانات كبير في منطقة الشرق الأوسط وفق تقارير الصناعة" },
    ],
    capabilities: [
      { title: "مراجعة البنية التقنية", desc: "نحلل مكونات النظام بالكامل لتحديد نقاط الاختناق، مواطن التعقيد، ومخاطر الاعتماد على عناصر يصعب صيانتها أو تطويرها." },
      { title: "تحليل الدين التقني", desc: "نقيّم جودة الكود، قابلية الصيانة، والتكرار، مع توضيح أثر كل مشكلة على سرعة التطوير وتكلفته." },
      { title: "مراجعة الأمان", desc: "نفحص التطبيق والبنية اعتماداً على أفضل الممارسات الأمنية ونحدد الثغرات المحتملة وخطوات معالجتها." },
      { title: "تحليل الأداء وقابلية التوسع", desc: "نراجع سرعة التطبيق، استهلاك الموارد، والاستعداد للتعامل مع زيادة المستخدمين أو حجم البيانات." },
      { title: "تحسين تكاليف البنية السحابية", desc: "نحدد الموارد غير المستغلة، ونراجع إعدادات الخدمات السحابية للوصول إلى أفضل توازن بين الأداء والتكلفة." },
      { title: "اكتشاف فرص الأتمتة", desc: "نحدد العمليات التي يمكن أتمتتها داخل التطوير أو التشغيل لتحسين الإنتاجية وتقليل العمل اليدوي." },
      { title: "تقييم جاهزية البيانات", desc: "نراجع جودة البيانات، طريقة إدارتها، ومدى جاهزيتها لدعم حلول الذكاء الاصطناعي والتحليلات المتقدمة." },
      { title: "خارطة طريق تنفيذية", desc: "نرتب جميع التوصيات حسب الأولوية، ونوضح أثر كل خطوة، والجهد المطلوب، والعائد المتوقع." },
    ],
    forCompanies: [
      "تقليل تكاليف التشغيل والبنية التقنية",
      "تحسين جودة الكود وسهولة صيانته",
      "تقليل المخاطر الأمنية قبل تحولها إلى مشكلات حقيقية",
      "تسريع عمليات التطوير والإطلاق",
      "اتخاذ قرارات تقنية مبنية على بيانات وتحليل واضح",
    ],
    forCustomers: [
      "أداء أكثر استقراراً",
      "سرعة أعلى في استخدام المنصة أو التطبيق",
      "حماية أفضل للبيانات",
      "تجربة استخدام أكثر موثوقية مع تقليل الأعطال",
    ],
    chart: {
      kind: "bar",
      title: "أين تتسرّب ميزانية التقنية بهدوء (٪)",
      unit: "%",
      source: "ماكنزي (عبر SIG) وFlexera State of the Cloud 2026",
      data: [
        { name: "الدين التقني", value: 40 },
        { name: "هدر السحابة", value: 29 },
        { name: "قابل للتفادي", value: 69 },
      ],
    },
    comparison: {
      title: "العمل بلا رؤية مقابل خارطة طريق مدقَّقة",
      colA: "بلا رؤية",
      colB: "خارطة مدقَّقة",
      rows: [
        { aspect: "القرارات", a: "حدس وتخمين", b: "قائمة على أدلة ومُقيَّمة" },
        { aspect: "الأمان", a: "تعرّض مجهول", b: "مرتبط بـOWASP ومرتّب" },
        { aspect: "كلفة السحابة", a: "إنفاق زائد بهدوء", b: "محجوم، توفير ٢٥–٣٠٪" },
        { aspect: "الدين التقني", a: "يبطّئ كل إصدار", b: "مقيس ومتسلسل" },
        { aspect: "خارطة الطريق", a: "إطفاء حرائق رد فعلي", b: "مرتّبة حسب الأثر" },
      ],
    },
    process: [
      { title: "الانطلاق والنطاق", desc: "نتفق على الأهداف، ونأخذ وصول قراءة للمستودعات والسحابة، ونحدّد حدود التدقيق." },
      { title: "الاستكشاف والفحص", desc: "نشغّل تحليلاً ساكناً وأمنياً وأدائياً وأدوات كلفة سحابة عبر المنظومة." },
      { title: "المراجعة العميقة", desc: "مراجعة يدوية للبنية والشيفرة مع مقابلات لإضافة سياق الأعمال." },
      { title: "النتائج وخارطة الطريق", desc: "نسلّم تقريراً مُقيَّماً يرتّب المشكلات حسب الأثر والجهد والكلفة والمخاطر." },
      { title: "التنفيذ الاختياري", desc: "ننفّذ أهم الإصلاحات والأتمتة، ثم نعيد التدقيق للتحقق من المكاسب." },
    ],
    stack: ["SonarQube · Semgrep", "Snyk · CodeQL · OWASP ZAP", "Lighthouse · k6", "Datadog · Grafana · OTel", "AWS Cost Explorer · Infracost", "Terraform · Checkov", "AWS Well-Architected", "Structurizr"],
  },
};

export const servicesRich: Record<Lang, RichMap> = { en, ar };

export function getServiceRich(lang: Lang, key: string): ServiceRich | undefined {
  return servicesRich[lang]?.[key];
}
