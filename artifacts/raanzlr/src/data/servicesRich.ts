// Rich, research-backed content for each service detail page.
// Bilingual (en / ar). Arabic is written natively for Gulf/MENA business
// audiences — not machine-translated — with correct domain terminology
// (e.g. localization = الأقلمة, not التوطين).
//
// No statistics live in this file. The earlier market-research charts and
// performance-style metrics were removed on 2026-09-18 because their sources
// could not be verified (see docs/HANDOFF, "Removed statistics"). Every metric
// below is a capability of the service, not a result. Add a number back only
// with a named, dated, checked source.

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
  comparison: RichComparison;
  process: RichStep[];
  stack: string[];

  /**
   * Authored but not rendered anywhere yet.
   *
   * The Arabic `consulting` entry carries alternate "for companies" / "for
   * customers" lines and two extra capability blocks that no component reads.
   * They are typed here so the file type-checks and the copy is not lost;
   * either render them in both locales or delete them — leaving Arabic-only
   * content in the data file helps nobody.
   */
  forCompaniesChart?: string[];
  forCustomersChart?: string[];
  additionalCapabilities?: RichCapability[];
}

type RichMap = Record<string, ServiceRich>;

/* ============================================================ ENGLISH */

const en: RichMap = {
  "ai-chatbots": {
    tagline:
      "Multilingual AI agents that answer, qualify, and book around the clock — on the channels your customers already live in.",
    metrics: [
      { value: "AR + EN", label: "Arabic dialects and English handled by one agent" },
      { value: "3 channels", label: "WhatsApp, website chat, and Instagram DMs" },
      { value: "Human handoff", label: "Escalation with the full conversation attached" },
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
    comparison: {
      title: "Traditional support vs. a Raanzlr AI agent",
      colA: "Traditional support",
      colB: "Raanzlr AI agent",
      rows: [
        { aspect: "First response", a: "Minutes to hours, office hours only", b: "Seconds, 24/7/365" },
        { aspect: "Languages", a: "Limited by who's on shift", b: "Arabic dialects + English at once" },
        { aspect: "Lead capture", a: "Missed after hours", b: "Captured, qualified, synced to CRM" },
        { aspect: "Scaling", a: "Hire and train more agents", b: "Handles volume spikes instantly" },
        { aspect: "Cost per conversation", a: "Rises with every added agent", b: "Marginal cost stays low as volume grows" },
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
      { value: "Full logs", label: "Every automated step recorded and traceable" },
      { value: "Approvals", label: "Human sign-off points built into the flow" },
      { value: "Your stack", label: "CRM, ERP, helpdesk, Slack, Teams, and Google Workspace connected" },
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
      "Take repetitive, rule-based activities off your team's plate",
      "Lower the cost of each repeated process by removing manual steps",
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
    comparison: {
      title: "Manual operations vs. automated workflows",
      colA: "Manual operations",
      colB: "Automated workflows",
      rows: [
        { aspect: "Data entry", a: "Copy-paste between tools", b: "Synced automatically, both directions" },
        { aspect: "Errors", a: "Frequent, hard to trace", b: "Fewer manual slips, with full logs" },
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
      { value: "Multi-language", label: "One source video, many target languages" },
      { value: "Voice clone", label: "Speaker voice, pacing, and emotion carried across" },
      { value: "Subtitles", label: "Captions delivered with the dubbed audio" },
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
      "Reach Arabic-speaking audiences plus the EU, US, and Türkiye without re-shooting",
      "Replace studio dubbing sessions with an AI pipeline and a human review pass",
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
    comparison: {
      title: "Traditional studio dubbing vs. AI localization (الأقلمة)",
      colA: "Traditional studio",
      colB: "Raanzlr AI localization",
      rows: [
        { aspect: "Cost", a: "Studio time per language", b: "AI pipeline per language" },
        { aspect: "Turnaround", a: "Weeks of scheduling and recording", b: "Much shorter, set by video length and review" },
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
      { value: "Full stack", label: "Frontend, backend, database, hosting, and DevOps" },
      { value: "SEO + AEO", label: "Search and answer-engine structure built in" },
      { value: "AR + EN", label: "Bilingual, RTL-ready interfaces" },
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
      { value: "iOS + Android", label: "Native or one cross-platform codebase" },
      { value: "Offline-first", label: "Apps that keep working on weak connections" },
      { value: "RTL-ready", label: "Arabic layouts built in from day one" },
    ],
    capabilities: [
      { title: "Native development", desc: "Swift/SwiftUI and Kotlin/Jetpack Compose for maximum performance and device-API access." },
      { title: "Cross-platform", desc: "One React Native or Flutter codebase to both stores, which can shorten time to launch." },
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
      "Support retention with clear onboarding and personalized push",
      "Digitize field and ops workflows with offline-capable apps",
      "Own a persistent home-screen touchpoint the web can't match",
    ],
    forCustomers: [
      "Native speed and offline mode — it works on the metro or in the field",
      "Biometric login and one-tap checkout that cut friction",
      "Relevant notifications instead of generic noise",
      "Encrypted, store-vetted apps they can trust with payments",
    ],
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
      { value: "RAG", label: "Answers grounded in your own documents" },
      { value: "Guardrails", label: "Safety and access rules around every model call" },
      { value: "Evaluation", label: "Quality measured on your data, not assumed" },
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
      "Cut processing cost and manual handling of documents and data",
      "Build defensible IP instead of renting someone else's model",
      "Deploy privately and in-region for finance, healthcare, legal, and government",
    ],
    forCustomers: [
      "Faster outcomes — claims, approvals, and cases resolved in minutes",
      "Answers grounded in real policy, not generic AI guesses",
      "Sensitive data kept protected and on-policy",
      "Staff with instant context, so questions aren't repeated",
    ],
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
      { value: "Two-way sync", label: "Systems kept consistent in both directions" },
      { value: "Legacy-ready", label: "Connectors for older systems without replacing them" },
      { value: "Documented", label: "Handover docs and monitoring included" },
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
      "Close the integration gap that leaves enterprise apps siloed",
      "Reclaim IT time spent rebuilding custom integrations",
      "End the time staff lose hunting for information",
      "Cut duplicate and stale records that corrupt reporting",
      "Lay the clean-data foundation that analytics and AI require",
    ],
    forCustomers: [
      "Staff see one complete, current record — no repeated questions",
      "Orders, payments, and tickets don't silently fail between systems",
      "Faster quoting, shipping, and resolution with no manual lookups",
      "Consistent numbers because data flows from one verified source",
    ],
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
      { value: "RTL-first", label: "Arabic layouts designed, not mirrored" },
      { value: "WCAG", label: "Accessibility checked against WCAG" },
      { value: "Research-led", label: "Decisions tested before they are built" },
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
      "Lift conversion across every touchpoint by removing friction, not by guesswork",
      "Spend design effort where it changes the outcome, before it is expensive to cpent",
      "Cut support tickets and rework by catching problems before code",
      "Ship faster as teams build from a vetted design system",
      "Reduce churn from users who leave after a bad experience",
    ],
    forCustomers: [
      "Complete tasks without confusion or training",
      "Instant trust from a clear, polished first impression",
      "Inclusive design that works with assistive tech and in bright sun",
      "A consistent feel across every screen and channel",
    ],
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

  dashboards: {
    tagline:
      "Live operational dashboards and data pipelines that put sales, operations, and finance numbers in one place, built from your own systems.",
    metrics: [
      { value: "Live data", label: "Pulled from your CRM, ERP, spreadsheets, and databases" },
      { value: "Role views", label: "Separate screens for leadership, operations, and finance" },
      { value: "Alerts", label: "Threshold alerts to email, Slack, or Teams" },
    ],
    capabilities: [
      { title: "KPI design", desc: "Agrees the few numbers that matter and how each one is defined, before anything is built." },
      { title: "Data pipelines", desc: "ETL / ELT from CRMs, ERPs, spreadsheets, and databases into one clean store." },
      { title: "Live dashboards", desc: "Operational screens that refresh from source systems, in Arabic and English with RTL layouts." },
      { title: "Role-based views", desc: "Leadership, operations, and finance each see the slice they need, with access control." },
      { title: "Drill-down & filters", desc: "Move from a headline number to the records behind it." },
      { title: "Alerts & scheduled reports", desc: "Threshold alerts and scheduled summaries to email, Slack, or Teams." },
      { title: "Data quality checks", desc: "Validation and reconciliation so the numbers can be trusted." },
      { title: "Embedded & custom UIs", desc: "Dashboards inside your own portal or app when off-the-shelf BI does not fit." },
    ],
    forCompanies: [
      "Replace weekly spreadsheet assembly with numbers that update themselves",
      "Give leadership one agreed definition of each KPI",
      "Spot exceptions early with alerts instead of month-end surprises",
      "Show Arabic and English users the same data in their own language and direction",
      "Keep sensitive numbers behind role-based access",
    ],
    forCustomers: [
      "Numbers they can trust and trace back to the source",
      "Answers in seconds instead of waiting for a report",
      "A clear view in their own language, on any device",
      "Fewer meetings spent reconciling versions of the truth",
    ],
    comparison: {
      title: "Spreadsheet reporting vs. a live dashboard",
      colA: "Spreadsheet reporting",
      colB: "Live dashboard",
      rows: [
        { aspect: "Freshness", a: "Stale by the time it is shared", b: "Refreshes from source systems" },
        { aspect: "Definitions", a: "Every team calculates its own", b: "One agreed definition per KPI" },
        { aspect: "Exceptions", a: "Found at month end", b: "Flagged by alerts" },
        { aspect: "Access", a: "Files emailed around", b: "Role-based views" },
        { aspect: "Languages", a: "Usually English only", b: "Arabic and English, RTL-ready" },
      ],
    },
    process: [
      { title: "Discovery & KPI definition", desc: "Agree the questions the dashboard must answer, and the definition and source of each KPI." },
      { title: "Data audit & pipeline design", desc: "Check the quality of each source and design the extract-and-transform path." },
      { title: "Build & connect", desc: "Build the pipelines and screens and connect them to the source systems." },
      { title: "Validate with real data", desc: "Reconcile the numbers against your current reports and fix the differences." },
      { title: "Launch & handover", desc: "Go live with access rules, alerts, and documentation for your team." },
    ],
    stack: ["PostgreSQL · BigQuery · Snowflake", "Airbyte · Fivetran · dbt", "Apache Airflow", "React · Next.js", "Metabase · Superset · Grafana", "Recharts · D3", "Slack · Teams alerts", "OAuth 2.0 · RBAC"],
  },

  consulting: {
    tagline:
      "A clear, evidence-based read on your stack — architecture, security, performance, and cost — turned into a prioritized roadmap.",
    metrics: [
      { value: "Audit-first", label: "Architecture, security, performance, and cloud cost reviewed" },
      { value: "Roadmap", label: "Prioritized findings you can act on" },
      { value: "Written report", label: "Findings and a roadmap, not just a call" },
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
      "Surface cloud waste and tech-debt drains with a structured review",
      "Close security gaps before they become a multi-million-dollar breach",
      "Reclaim developer time lost to technical debt",
      "Turn 'it feels slow and risky' into a quantified, budgetable roadmap",
      "Catch reliability and scaling weaknesses before they cause outages",
    ],
    forCustomers: [
      "Fewer outages and consistent service availability",
      "Hardened systems that protect their data",
      "Faster page loads, checkouts, and response times",
      "Improvements shipped sooner as engineering drag drops",
    ],
    comparison: {
      title: "Flying blind vs. an audited roadmap",
      colA: "Flying blind",
      colB: "Audited roadmap",
      rows: [
        { aspect: "Decisions", a: "Gut feel and guesswork", b: "Evidence-based and scored" },
        { aspect: "Security", a: "Unknown exposure", b: "OWASP-mapped, prioritized" },
        { aspect: "Cloud cost", a: "Quietly overspending", b: "Right-sized to actual use" },
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
      { value: "عربي + إنجليزي", label: "لهجات عربية وإنجليزية في وكيل واحد" },
      { value: "٣ قنوات", label: "واتساب ودردشة الموقع ورسائل إنستغرام" },
      { value: "تحويل لموظف", label: "تصعيد إلى شخص مع سجل المحادثة كاملاً" },
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
    comparison: {
      title: "الدعم التقليدي مقابل وكيل Raanzlr الذكي",
      colA: "الدعم التقليدي",
      colB: "وكيل Raanzlr الذكي",
      rows: [
        { aspect: "أول رد", a: "دقائق إلى ساعات، في الدوام فقط", b: "ثوانٍ، على مدار الساعة" },
        { aspect: "اللغات", a: "محدودة بمن هو في الدوام", b: "لهجات عربية + إنجليزية معاً" },
        { aspect: "التقاط العملاء", a: "يضيع خارج الدوام", b: "يُلتقط ويُؤهَّل ويُزامَن" },
        { aspect: "التوسّع", a: "توظيف وتدريب المزيد", b: "يستوعب الذروة فوراً" },
        { aspect: "كلفة المحادثة", a: "ترتفع مع كل موظف إضافي", b: "تبقى الكلفة الحدّية منخفضة مع نمو الحجم" },
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
      { value: "سجل كامل", label: "كل خطوة مؤتمتة مسجلة وقابلة للتتبع" },
      { value: "موافقات", label: "نقاط اعتماد بشرية ضمن مسار العمل" },
      { value: "أدواتكم", label: "ربط الـ CRM والـ ERP وSlack وTeams وGoogle Workspace" },
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
      { value: "لغات متعددة", label: "فيديو واحد بلغات مستهدفة متعددة" },
      { value: "استنساخ الصوت", label: "نقل صوت المتحدث وإيقاعه وانفعاله" },
      { value: "ترجمة نصية", label: "ترجمات نصية مع الصوت المدبلج" },
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
    comparison: {
      title: "الدبلجة الاستوديوهية التقليدية مقابل الأقلمة الذكية",
      colA: "استوديو تقليدي",
      colB: "أقلمة Raanzlr الذكية",
      rows: [
        { aspect: "الكلفة", a: "استوديو لكل لغة", b: "مسار ذكاء اصطناعي لكل لغة" },
        { aspect: "مدة الإنجاز", a: "أسابيع من الجدولة والتسجيل", b: "أقصر بكثير، وتحددها مدة الفيديو والمراجعة" },
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
      { value: "حزمة كاملة", label: "واجهة وخادم وقاعدة بيانات واستضافة وDevOps" },
      { value: "SEO + AEO", label: "بنية للبحث ومحركات الإجابة منذ البداية" },
      { value: "عربي + إنجليزي", label: "واجهات ثنائية اللغة تدعم RTL" },
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
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "NestJS", "PostgreSQL", "Prisma", "Redis", "Structured Data", "hreflang", "Vercel", "Cloudflare", "Google Analytics 4", "PostHog"],
  },

  "mobile-apps": {
    tagline:
      "تطبيقات iOS وAndroid للعملاء والفرق الميدانية والعمليات اليومية، بتجربة استخدام سلسة وأداء موثوق على مختلف الأجهزة.",
    metrics: [
      { value: "iOS + Android", label: "تطبيق أصلي أو قاعدة كود واحدة متعددة المنصات" },
      { value: "يعمل دون اتصال", label: "تطبيقات تواصل العمل عند ضعف الاتصال" },
      { value: "جاهز لـ RTL", label: "تخطيطات عربية من اليوم الأول" },
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
      { value: "RAG", label: "إجابات مبنية على مستنداتكم أنتم" },
      { value: "ضوابط أمان", label: "قواعد أمان ووصول حول كل استدعاء للنموذج" },
      { value: "تقييم", label: "قياس الجودة على بياناتكم لا افتراضها" },
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
      { value: "مزامنة ثنائية", label: "اتساق الأنظمة في الاتجاهين" },
      { value: "أنظمة قديمة", label: "موصلات للأنظمة القديمة دون استبدالها" },
      { value: "موثّق", label: "وثائق تسليم ومراقبة ضمن المشروع" },
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
      { value: "RTL أولاً", label: "تصميم عربي أصيل لا مجرد عكس للواجهة" },
      { value: "WCAG", label: "فحص إتاحة الوصول وفق WCAG" },
      { value: "قائم على البحث", label: "قرارات تُختبر قبل أن تُبنى" },
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

  dashboards: {
    tagline:
      "لوحات تشغيلية حيّة وخطوط بيانات تجمع أرقام المبيعات والعمليات والمالية في مكان واحد، مبنية من أنظمتكم.",
    metrics: [
      { value: "بيانات حيّة", label: "تُسحب من نظام إدارة العملاء وERP والجداول وقواعد البيانات" },
      { value: "عروض حسب الدور", label: "شاشات مختلفة للإدارة والعمليات والمالية" },
      { value: "تنبيهات", label: "تنبيهات حدّية عبر البريد أو Slack أو Teams" },
    ],
    capabilities: [
      { title: "تصميم المؤشرات", desc: "نتفق معكم على الأرقام القليلة المهمة وعلى كيفية تعريف كل منها قبل البناء." },
      { title: "خطوط البيانات", desc: "استخراج البيانات وتحويلها من أنظمة CRM وERP والجداول وقواعد البيانات إلى مخزن نظيف واحد." },
      { title: "لوحات حيّة", desc: "شاشات تشغيلية تتحدّث من الأنظمة المصدر، بالعربية والإنجليزية وبدعم الكتابة من اليمين." },
      { title: "عروض حسب الدور", desc: "تعرض الإدارة والعمليات والمالية ما يخص كلاً منها، مع ضبط صلاحيات الوصول." },
      { title: "التفصيل والتصفية", desc: "الانتقال من الرقم الرئيسي إلى السجلات التي تقف خلفه." },
      { title: "التنبيهات والتقارير المجدولة", desc: "تنبيهات حدّية وملخصات مجدولة عبر البريد أو Slack أو Teams." },
      { title: "فحوصات جودة البيانات", desc: "تحقق ومطابقة حتى تكون الأرقام موثوقة." },
      { title: "لوحات مدمجة ومخصصة", desc: "لوحات داخل بوابتكم أو تطبيقكم حين لا تناسب أدوات BI الجاهزة." },
    ],
    forCompanies: [
      "استبدال تجميع الجداول الأسبوعي بأرقام تتحدّث تلقائياً",
      "تعريف واحد متفق عليه لكل مؤشر أداء",
      "اكتشاف الاستثناءات مبكراً عبر التنبيهات بدل مفاجآت نهاية الشهر",
      "عرض البيانات نفسها للمستخدمين العرب والإنجليز بلغتهم واتجاههم",
      "حماية الأرقام الحساسة بصلاحيات وصول حسب الدور",
    ],
    forCustomers: [
      "أرقام يثقون بها ويمكن تتبعها إلى مصدرها",
      "إجابات خلال ثوانٍ بدل انتظار التقرير",
      "رؤية واضحة بلغتهم وعلى أي جهاز",
      "اجتماعات أقل لمطابقة النسخ المختلفة من الحقيقة",
    ],
    comparison: {
      title: "تقارير الجداول مقابل لوحة حيّة",
      colA: "تقارير الجداول",
      colB: "لوحة حيّة",
      rows: [
        { aspect: "حداثة البيانات", a: "قديمة عند مشاركتها", b: "تتحدّث من الأنظمة المصدر" },
        { aspect: "التعريفات", a: "كل فريق يحسب بطريقته", b: "تعريف واحد لكل مؤشر" },
        { aspect: "الاستثناءات", a: "تُكتشف في نهاية الشهر", b: "تنبّه إليها التنبيهات" },
        { aspect: "الوصول", a: "ملفات تُرسل بالبريد", b: "عروض حسب الدور" },
        { aspect: "اللغات", a: "غالباً بالإنجليزية فقط", b: "عربي وإنجليزي مع دعم RTL" },
      ],
    },
    process: [
      { title: "الاكتشاف وتعريف المؤشرات", desc: "نتفق على الأسئلة التي تجيب عنها اللوحة وعلى تعريف كل مؤشر ومصدره." },
      { title: "تدقيق البيانات وتصميم الخطوط", desc: "نفحص جودة كل مصدر ونصمم مسار الاستخراج والتحويل." },
      { title: "البناء والربط", desc: "نبني الخطوط واللوحات ونربطها بالأنظمة المصدر." },
      { title: "التحقق ببيانات حقيقية", desc: "نطابق الأرقام مع تقاريركم الحالية ونصحح الفروقات." },
      { title: "الإطلاق والتسليم", desc: "نطلق اللوحة مع صلاحيات وتنبيهات وتوثيق لفريقكم." },
    ],
    stack: ["PostgreSQL · BigQuery · Snowflake", "Airbyte · Fivetran · dbt", "Apache Airflow", "React · Next.js", "Metabase · Superset · Grafana", "Recharts · D3", "Slack · Teams alerts", "OAuth 2.0 · RBAC"],
  },

  consulting: {
    tagline:
      "نقيّم البنية التقنية لشركتك من جميع الجوانب، بدءاً من جودة الكود والأداء وصولاً إلى الأمان والبنية السحابية، ثم نحول النتائج إلى خطة عمل واضحة تساعدك على اتخاذ قرارات تقنية أكثر دقة.",
    metrics: [
      { value: "تدقيق أولاً", label: "مراجعة المعمارية والأمان والأداء وتكلفة السحابة" },
      { value: "خارطة طريق", label: "نتائج مرتبة حسب الأولوية قابلة للتنفيذ" },
      { value: "تقرير مكتوب", label: "نتائج وخارطة طريق لا مجرد مكالمة" },
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
    comparison: {
      title: "العمل بلا رؤية مقابل خارطة طريق مدقَّقة",
      colA: "بلا رؤية",
      colB: "خارطة مدقَّقة",
      rows: [
        { aspect: "القرارات", a: "حدس وتخمين", b: "قائمة على أدلة ومُقيَّمة" },
        { aspect: "الأمان", a: "تعرّض مجهول", b: "مرتبط بـOWASP ومرتّب" },
        { aspect: "كلفة السحابة", a: "إنفاق زائد بهدوء", b: "محجوم حسب الاستخدام الفعلي" },
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
