export const BRAND = "Raanzlr";
export const CONTACT_EMAIL = "info@raanzlr.com";

/**
 * Widens the literal types `as const` produces back to `string`.
 *
 * `en` is declared `as const` so nested objects keep their shape, but that also
 * pins every value to its own literal type. Typing the Arabic dictionary as
 * `typeof en` then demands that each Arabic string be *identical* to the
 * English one — which produced ~200 type errors and made the whole file
 * unusable for type checking. Widening keeps the structural guarantee (same
 * keys, same nesting) and drops the value-identity nonsense.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : { readonly [K in keyof T]: Widen<T[K]> };

const en = {
  nav: { home: "Home", services: "Services", about: "About Us", contact: "Contact" },
  cta: {
    getStarted: "Start a Project",
    requestService: "Request This Service",
    requestAService: "Request a Service",
    learnMore: "Explore Services",
    contactUs: "Contact Us",
    sendMessage: "Send Message",
    submitRequest: "Submit Request",
    viewDetails: "View Details",
    close: "Close",
    viewAll: "View All",
    explore: "Explore",
    bookCall: "Book a Call",
  },
  home: {
    eyebrow: "AI · AUTOMATION · WEB & MOBILE SOFTWARE",
    heroTitle: "Making AI",
    heroTitleAccent: "Practical",
    heroTitleEnd: "for Business Growth.",
    heroSub: "From automating daily operations to building custom intelligent systems, we create solutions that help teams work more efficiently and make better decisions.",
    heroChips: ["Custom AI Models", "Workflow Automation", "Web Platforms", "LLMs", "API Integrations"],
    whyLabel: "// why raanzlr",
    whyTitle: "Why teams choose us",
    whySub: "Clear thinking, senior engineering, and results you can measure.",
    servicesLabel: "// services",
    servicesPreview: "AI & software services we build",
    servicesPreviewSub: "From conversational AI to enterprise platforms — engineered with precision.",
    features: [
      { title: "Give your team time back", desc: "We replace repetitive manual work with reliable systems. Your people get to focus on sales, service, operations, and decisions that need judgment." },
      { title: "AI that handles real work", desc: "Our agents answer questions, qualify leads, schedule bookings, and hand off to humans when the conversation needs a real person." },
      { title: "Built around business results", desc: "Every build connects to measurable targets: faster response times, cleaner data, lower support load, and better-qualified leads." },
      { title: "Built for any language", desc: "Arabic, English, Turkish, or whatever language your customers speak. We handle correct right-to-left layouts where they're needed, with wording that reads naturally in every market." },
    ],
  },
  services: {
    eyebrow: "OUR EXPERTISE",
    title: "Software that fits your operation, not the other way around.",
    sub: "We ship practical systems for sales, support, ops, and product teams — WhatsApp AI agents, automation, web platforms, mobile apps.",
    intro:
      "Raanzlr builds and ships software. Ten service lines, grouped below by the kind of problem they solve. Every engagement is delivered remotely, in Arabic and English, and starts with a free discovery call rather than a proposal.",
    groups: {
      agents: {
        title: "AI Agents & Automation",
        intro:
          "For work that is repetitive, high volume, or currently handled by a person copying data between systems. These are the engagements that remove hours rather than add a screen.",
      },
      software: {
        title: "Custom Software & Interfaces",
        intro:
          "For when an off-the-shelf product does not fit how you actually operate. Web platforms, mobile apps, and the interface design that makes them usable in Arabic and English alike.",
      },
      connect: {
        title: "Integration, Content & Advisory",
        intro:
          "For connecting what you already run, localising what you already publish, and deciding what to build before anyone writes code.",
      },
    },
    highDemand: "HIGH DEMAND",
    standard: "AVAILABLE",
    hoverHint: "Auto-rotating preview",
    customEngagementTitle: "Need something specific?",
    customEngagementDesc: "Tell us what's slowing you down. We'll come back with scope, timeline, and a real budget range.",
    items: [
      {
        key: "ai-chatbots", tier: "high",
        title: "AI Agents & Chatbots",
        desc: "Multilingual AI agents for WhatsApp, web, and Instagram that answer questions, qualify leads, book appointments, and escalate when they should.",
        long: "We design, train, and deploy AI agents that understand your services, pricing, policies, and brand voice. They connect to your CRM, calendar, support tools, and internal data. Customers get useful answers, not script-reading bots.",
        helps: [
          "First response in seconds, any time of day",
          "Auto-qualify leads and sync to your CRM",
          "Cut repetitive support work, improve satisfaction",
          "Handle more volume without hiring immediately",
        ],
        image: "/services/ai-chatbots.webp",
      },
      {
        key: "workflow-automation", tier: "high",
        title: "Workflow Automation",
        desc: "Connect your tools and kill manual data entry with reliable workflows across sales, support, finance, and ops.",
        long: "We build automations with n8n, Zapier, Make, APIs, and custom scripts — from reporting and lead routing to approvals and data cleanup. Your CRM, ERP, helpdesk, and databases stay in sync without someone copying and pasting.",
        helps: [
          "No more copy-paste between platforms",
          "Customer, order, and reporting data stays synced",
          "Fewer errors, fewer bottlenecks",
          "Teams spend time on work that matters",
        ],
        image: "/services/workflow-automation.webp",
      },
      {
        key: "ai-video-dubbing", tier: "high",
        title: "AI Video Dubbing & Localization",
        desc: "Turn any video into another language with AI voiceovers, transcripts, and timing that stays true to your original.",
        long: "We take your existing videos from YouTube, Instagram, Facebook, or direct uploads and dub them into new languages using AI. The original audio is transcribed, translated, and re-voiced with natural-sounding AI speech, then mixed back with your music and sound effects. You receive a ready-to-publish dubbed video plus separate audio and transcript files.",
        helps: [
          "Reach new markets without re-shooting campaigns or hiring voice actors",
          "Keep your original music, sound design, and pacing while swapping the spoken language",
          "Get clean transcripts and subtitles in multiple languages for SEO and accessibility",
          "Localize shorts, tutorials, ads, and training videos faster than traditional studios",
        ],
        image: "/services/ai-video-dubbing.webp",
      },
      {
        key: "web-development", tier: "high",
        title: "Custom Software & Web Applications",
        desc: "Custom software, web applications, portals, and marketing sites built for speed, conversion, and maintenance.",
        long: "We build accessible, SEO-ready web experiences with modern frameworks and clean architecture. Landing pages, multilingual corporate sites, customer portals, storefronts, multi-tenant SaaS products — all with strong RTL support.",
        helps: [
          "More visitors become qualified leads",
          "Better performance, accessibility, crawlability",
          "Modular architecture, easier to maintain",
          "Multilingual and RTL-ready from day one",
        ],
        image: "/services/web-development.webp",
      },
      {
        key: "mobile-apps", tier: "standard",
        title: "Mobile App Development",
        desc: "iOS and Android apps for customers, field teams, and internal ops — built for speed, reliability, and real-world use.",
        long: "We build native and cross-platform mobile apps for consumer and B2B use. Each app is designed around real user flows, offline reliability where needed, and the standards required by the App Store and Google Play.",
        helps: [
          "Reach users on their preferred devices",
          "Drive retention with smart push campaigns",
          "Work offline when connectivity drops",
          "Meet security and compliance requirements",
        ],
        image: "/services/mobile-apps.webp",
      },
      {
        key: "custom-ai", tier: "standard",
        title: "Custom AI Solutions",
        desc: "Custom AI, RAG systems, document intelligence, and data pipelines built around your private knowledge and business rules.",
        long: "When off-the-shelf AI isn't enough, we design systems around your documents, workflows, and data. Retrieval-augmented generation, classification, extraction, evaluation, guardrails, and cost controls.",
        helps: [
          "Pull insights from internal docs and unstructured data",
          "Get accuracy that generic AI can't match",
          "Build defensible IP and competitive advantages",
          "Control costs through caching and smart routing",
        ],
        image: "/services/custom-ai.webp",
      },
      {
        key: "crm-integration", tier: "standard",
        title: "CRM & API Integrations",
        desc: "Connect CRMs, ERPs, databases, dashboards, and internal tools with clean APIs and observable data pipelines.",
        long: "We build reliable bridges between HubSpot, Salesforce, Zoho, Odoo, custom databases, and legacy systems. Single source of truth, clear logs, automated retries, and documentation your team can use.",
        helps: [
          "One source of truth for all enterprise data",
          "No more data silos or manual syncing",
          "Resilient pipelines with full error tracking",
          "Documentation that speeds up onboarding",
        ],
        image: "/services/crm-integration.webp",
      },
      {
        key: "ui-ux", tier: "standard",
        title: "UI/UX & Product Design",
        desc: "Product design, UX flows, design systems, and interfaces that make complex software easier to use.",
        long: "We design user journeys, wireframes, design systems, and polished interfaces alongside engineering. Grounded in real tasks, accessibility, and conversion — not decoration.",
        helps: [
          "Higher conversion across all touchpoints",
          "Less friction, less drop-off in core flows",
          "Consistent visual identity across properties",
          "Faster development with component libraries",
        ],
        image: "/services/ui-ux.webp",
      },
      {
        key: "dashboards", tier: "standard",
        title: "Dashboards & Data Systems",
        desc: "Live operational dashboards and data pipelines that bring sales, operations, and finance numbers into one place, built from your own systems.",
        long: "We define the KPIs with your team, then build data pipelines from your CRM, ERP, spreadsheets, and databases into dashboards that work in Arabic and English with RTL layouts, role-based access, and alerts.",
        helps: [
          "Numbers that update themselves instead of weekly spreadsheet assembly",
          "One agreed definition for every KPI",
          "Exceptions flagged early by alerts",
          "The same data in Arabic and English, in the right direction",
        ],
        image: "/services/dashboards.webp",
      },
      {
        key: "consulting", tier: "standard",
        title: "Technical Audits & Consulting",
        desc: "A clear technical review of your stack, automation opportunities, security risks, performance gaps, and what to do next.",
        long: "We review your systems, codebase, workflows, and tooling to find what's slowing you down. You get a practical roadmap that weighs business impact, engineering effort, cost, and risk.",
        helps: [
          "Unbiased evaluation of your architecture",
          "Prioritized roadmap tied to business impact",
          "Immediate opportunities to cut SaaS and infra costs",
          "Security and scalability reviews",
        ],
        image: "/services/consulting.webp",
      },
    ],
  },
  about: {
    eyebrow: "ABOUT RAANZLR",
    title: "We build AI solutions and software that help companies work more efficiently.",
    sub: "At Raanzlr, we focus on developing AI-based solutions, process automation, and custom software tailored to each company's needs. Our goal is to build practical, scalable, and user-friendly systems that help teams improve performance, simplify operations, and support business growth.",
    principlesLabel: "// How we work",
    principlesTitle: "How we work",
    values: [
      { title: "Direct and transparent communication", desc: "We believe that the success of any project begins with clear communication. Therefore, we ensure direct communication with the team responsible for executing the project, to ensure quick decision-making, accurate understanding of requirements, and keeping up with all development stages." },
      { title: "Quality from the start", desc: "We care about building stable and scalable solutions, with attention to code quality, testing, performance, and documentation, so that systems are ready for actual use and able to keep pace with business growth." },
      { title: "Solutions designed to fit your work nature", desc: "We don't rely on ready-made templates or one-size-fits-all solutions, but we start by understanding the project goals and workflow, then design the technical solution in line with the organization's current needs and future plans." },
    ],
    hq: "REGISTERED OFFICE",
    hqLabel: "// registered office",
    address: "4030 Plaza Dr #3 #15 (10030), Casper, WY 82604",
    hqTitle: "Raanzlr is a US-registered company, working remotely.",
    hqDesc: "Raanzlr is registered in Casper, Wyoming, United States. Every engagement is delivered remotely — through online discovery, planning, development, launch, and support — with meetings scheduled to overlap the client's working hours.",
  },
  contact: {
    eyebrow: "LET'S COLLABORATE",
    title: "Let's talk about your project",
    sub: "Whether you're looking to develop a custom system, automate your operations, or integrate AI solutions into your business, we're happy to learn about your needs. Share your project details with us, and one of our team members will contact you within one business day to discuss the best suitable solutions.",
    generalTab: "General Inquiry",
    serviceTab: "Project Brief",
    emailUs: "email us",
    headquartersLabel: "headquarters",
    general: {
      name: "Full Name",
      email: "Email",
      phone: "Phone Number",
      phonePlaceholder: "e.g. 5551234567",
      subject: "Subject",
      message: "Tell us about your project or the challenges you're facing",
    },
    service: {
      title: "Project Brief",
      desc: "Give us some context so we can prep a useful response. Expect to hear back within 24 hours.",
      service: "Interested Service",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone Number",
      phonePlaceholder: "e.g. 5551234567",
      role: "Your Role / Job Title",
      companyType: "Industry",
      companySize: "Company Size",
      budget: "Estimated Budget",
      bestTime: "Preferred time to connect (optional)",
      challenge: "What's the primary challenge you're trying to solve?",
      selectSize: "Please select a company size first",
    },
    success: "Message received. Our engineering team will be in touch shortly.",
    error: "An error occurred while sending your message. Please try again or email us directly.",
    responseTitle: "Response Time",
    responseValue: "Within 1 Business Day",
    responseSub: "We ensure all inquiries are reviewed and responded to as quickly as possible by our team.",
  },
  footer: {
    tagline: "Engineering AI, automation, and software for ambitious global teams.",
    quickLinks: "Quick Links",
    location: "Headquarters",
    rights: "All rights reserved.",
    engineered: "precision · velocity · impact",
  },
  isAr: false,
  seo: {
    home: {
      title: "Raanzlr — AI Automation & Custom Software Company",
      description: "Raanzlr builds AI agents, workflow automation, dashboards, and custom software — delivered remotely, in English and Arabic. Focused on the US, Canada, GCC, Türkiye, and Europe.",
      keywords: "AI automation agency, Arabic AI chatbot, workflow automation, custom AI development, web application development, mobile app development, software engineering GCC, AI agency MENA, Raanzlr, Ranzlr, Raanzler, Ranzler, Raanzelr, راانزلر, رانزلر",
    },
    services: {
      title: "AI Automation & Custom Software Services — Raanzlr",
      description: "AI agents, workflow automation, custom software, web apps, dashboards, and API integrations — remote services for businesses targeting operational efficiency.",
      keywords: "AI chatbot development, workflow automation n8n, web development agency, mobile app development, API integration, UI UX design, technical consulting MENA",
    },
    about: {
      title: "About Raanzlr — AI Automation & Custom Software Company",
      description: "Raanzlr is a Wyoming-registered software company, founded 2023. How it scopes and builds AI automation and custom software — every engagement delivered remotely.",
      keywords: "Raanzlr team, software engineering studio, AI development company, MENA tech agency, multilingual software development",
    },
    contact: {
      title: "Contact Raanzlr — Start Your AI or Automation Project Today",
      description: "Get in touch with Raanzlr's engineering team to discuss your AI, automation, or software project. We respond within one business day.",
      keywords: "contact software engineering firm, AI project inquiry, automation consulting, hire AI developers, technical consultation",
    },
    insights: {
      title: "AI, Automation & Software Engineering Insights — Raanzlr",
      description: "Practical articles on AI agents, Arabic NLP, workflow automation, RAG systems, WhatsApp automation, and software product development.",
      keywords: "AI automation blog, Arabic NLP, RAG systems, WhatsApp Business API, workflow automation ROI, SaaS development GCC",
    },
    caseStudies: {
      title: "AI & Automation Solution Scenarios — Raanzlr",
      description: "Illustrative scenarios showing how Raanzlr approaches AI agents, workflow automation, dashboards and bilingual software. Projected outcomes, not client results.",
      keywords: "AI automation case studies, GCC software projects, WhatsApp AI agent case study, CRM automation, RAG case study Arabic",
    },
    industries: {
      title: "AI Automation by Industry · Raanzlr",
      description: "AI agents, automation, and custom software for finance, retail, healthcare, education, logistics, hospitality, legal, and manufacturing teams — delivered remotely.",
      keywords: "AI for finance, AI for retail, healthcare automation, EdTech AI, logistics automation, legal AI, manufacturing AI",
    },
    markets: {
      title: "AI Automation & Custom Software by Market — Raanzlr",
      description: "Raanzlr offers remote AI automation and custom software services, with a focus on the United States, Canada, the GCC, Türkiye, and Europe.",
      keywords: "AI agency Saudi Arabia, AI agency UAE, software engineering GCC, AI development Türkiye, MENA automation company",
    },
    faq: {
      title: "Raanzlr FAQ — AI Automation, Pricing, Process & Support",
      description: "Answers about Raanzlr services, Arabic AI support, project timelines, pricing, integrations, consultations, and post-launch support.",
      keywords: "AI automation FAQ, chatbot pricing, software project timeline, Arabic AI support, automation consultation",
    },
    privacyPolicy: {
      title: "Privacy Policy — Raanzlr",
      description: "Raanzlr's privacy policy — how we collect, use, and protect your personal data in compliance with GDPR and applicable local regulations.",
      keywords: "Raanzlr privacy policy, data protection, GDPR compliance",
    },
    termsOfService: {
      title: "Terms of Service — Raanzlr",
      description: "Raanzlr's terms of service covering project engagements, payments, intellectual property, and client responsibilities.",
      keywords: "Raanzlr terms of service, software contract, project agreement",
    },
  },
} as const;

const ar: Translations = {
  nav: { home: "الرئيسية", services: "الخدمات", about: "من نحن", contact: "تواصل" },
  cta: {
    getStarted: "ابدأ مشروعك",
    requestService: "اطلب هذه الخدمة",
    requestAService: "اطلب خدمة",
    learnMore: "استعرض خدماتنا",
    contactUs: "تواصل معنا",
    sendMessage: "أرسل الرسالة",
    submitRequest: "أرسل الطلب",
    viewDetails: "عرض التفاصيل",
    close: "إغلاق",
    viewAll: "عرض جميع الأسئلة",
    explore: "استكشف",
    bookCall: "احصل على استشارة مجانية",
  },
  home: {
    eyebrow: "وكلاء ذكاء اصطناعي · أتمتة الأعمال · تطوير منصات ويب · نماذج لغوية · تكامل الأنظمة",
    heroTitle: "نبني أنظمة ذكاء اصطناعي وأتمتة أعمال",
    heroTitleAccent: "تقلّل العمل اليدوي",
    heroTitleEnd: "وتمنح فريقك وقتاً لما يصنع الفرق",
    heroSub: "نطوّر وكلاء ذكاء اصطناعي، أنظمة أتمتة، ومنصات ويب تساعد الشركات على تسريع العمليات، تحسين تجربة العملاء، وتقليل المهام المتكررة دون تعقيد.",
    heroChips: ["وكلاء ذكاء اصطناعي", "أتمتة الأعمال", "تطوير منصات ويب", "نماذج لغوية", "تكامل الأنظمة"],
    whyLabel: "// لماذا Raanzlr",
    whyTitle: "لماذا تختار Raanzlr؟",
    whySub: "لا نبيع تقنيات جديدة فحسب، بل نبني حلولاً عملية تُقاس بنتائجها وتأثيرها الحقيقي على أعمالك.",
    servicesLabel: "// الخدمات",
    servicesPreview: "حلول تقنية مصممة لتنمو مع أعمالك",
    servicesPreviewSub: "من وكلاء الذكاء الاصطناعي إلى المنصات المؤسسية المتكاملة، نطوّر حلولاً عملية تجمع بين الأداء، الاعتمادية، وقابلية التوسع.",
    features: [
      { title: "وفّر وقت فريقك", desc: "نحوّل المهام المتكررة إلى عمليات تعمل تلقائياً، ليتمكن فريقك من التركيز على العملاء، المبيعات، واتخاذ القرارات المهمة." },
      { title: "ذكاء اصطناعي ينجز مهام حقيقية", desc: "نطوّر وكلاء ذكاء اصطناعي يجيبون على العملاء، يؤهلون الفرص البيعية، يحجزون المواعيد، ويحوّلون المحادثة إلى الموظف المناسب عندما تستدعي الحاجة." },
      { title: "حلول مبنية حول أهدافك", desc: "كل نظام نطوره يرتبط بهدف واضح؛ مثل تقليل وقت الاستجابة، تحسين جودة البيانات، تخفيف ضغط الدعم، أو زيادة كفاءة العمليات." },
      { title: "جاهز للعمل بأي لغة", desc: "ندعم العربية والإنجليزية والتركية وغيرها، مع تجربة استخدام طبيعية، ودعم كامل للكتابة من اليمين إلى اليسار والأسواق متعددة اللغات." },
    ],
  },
  services: {
    eyebrow: "خبراتنا",
    title: "حلول تقنية مصممة لتبسيط أعمالك وتسريع نموها",
    sub: "نطوّر حلول ذكاء اصطناعي، أنظمة أتمتة، منصات ويب، وتطبيقات مخصصة تساعد الشركات على تحسين الكفاءة، تقليل الأعمال اليدوية، وتقديم تجربة أفضل لعملائها.",
    intro:
      "Raanzlr تبني البرمجيات وتسلّمها. عشرة خطوط خدمة، مجمّعة أدناه حسب نوع المشكلة التي تعالجها. كل مشروع يُنفَّذ عن بُعد، بالعربية والإنجليزية، ويبدأ بمكالمة اكتشاف مجانية لا بعرض سعر.",
    groups: {
      agents: {
        title: "وكلاء الذكاء الاصطناعي والأتمتة",
        intro:
          "للأعمال المتكررة وكبيرة الحجم، أو التي ينفذها شخص حالياً بنسخ البيانات بين الأنظمة. هذه هي المشاريع التي تزيل ساعات عمل بدل أن تضيف شاشة جديدة.",
      },
      software: {
        title: "البرمجيات المخصصة والواجهات",
        intro:
          "عندما لا يناسبكم منتج جاهز لطريقة عملكم الفعلية. منصات ويب، وتطبيقات جوال، وتصميم الواجهات الذي يجعلها قابلة للاستخدام بالعربية والإنجليزية معاً.",
      },
      connect: {
        title: "الربط والمحتوى والاستشارات",
        intro:
          "لربط الأنظمة التي تشغّلونها اليوم، وتوطين المحتوى الذي تنشرونه، وتحديد ما يجب بناؤه قبل أن يكتب أحد أي شيفرة.",
      },
    },
    highDemand: "الأكثر طلباً",
    standard: "متاح",
    hoverHint: "معاينة تلقائية",
    customEngagementTitle: "هل تبحث عن حل يناسب طبيعة أعمالك؟",
    customEngagementDesc: "شاركنا أهدافك أو التحديات التي تواجه فريقك، وسنقترح حلاً عملياً مع نطاق عمل واضح، جدول زمني، وتقدير مبدئي للتكلفة.",
    items: [
      {
        key: "ai-chatbots", tier: "high",
        title: "وكلاء ذكاء اصطناعي وروبوتات محادثة",
        desc: "وكلاء ذكيون يعملون عبر واتساب، موقعك الإلكتروني، وإنستغرام للرد على العملاء، تأهيل الفرص البيعية، حجز المواعيد، وتحويل المحادثات إلى فريقك عند الحاجة.",
        long: "نصمّم الوكيل وندرّبه ونطلقه ليفهم خدماتك وأسعارك وسياساتك وهوية علامتك. ونربطه بنظام إدارة العملاء والتقويم وأدوات الدعم وبياناتك، حتى يحصل العميل على إجابة مفيدة لا رد آلي جاف.",
        helps: ["رد أولي خلال ثوانٍ في أي وقت", "تأهيل العملاء تلقائياً ومزامنتهم مع نظام إدارة العلاقات", "تقليل ضغط الدعم المتكرر وتحسين رضا العملاء", "استيعاب حجم أكبر دون الحاجة لتوظيف فوري"],
        image: "/services/ai-chatbots.webp",
      },
      {
        key: "workflow-automation", tier: "high",
        title: "أتمتة العمليات",
        desc: "نربط أنظمتك المختلفة ونؤتمت سير العمل بين الأقسام لتقليل الأخطاء، إلغاء الأعمال اليدوية، وتسريع تنفيذ العمليات اليومية.",
        long: "نبني الأتمتة عبر n8n وZapier وMake وواجهات برمجية وسكريبتات مخصصة، من التقارير وتوزيع العملاء إلى الموافقات وتنظيف البيانات. تبقى أنظمتك متزامنة دون نسخ ولصق يدوي.",
        helps: ["إنهاء النسخ واللصق بين المنصات", "مزامنة بيانات العملاء والطلبات والتقارير", "تقليل الأخطاء والتأخير التشغيلي", "إعطاء الفريق وقتاً للعمل الأهم"],
        image: "/services/workflow-automation.webp",
      },
      {
        key: "ai-video-dubbing", tier: "high",
        title: "دبلجة الفيديو بالذكاء الاصطناعي",
        desc: "حوّل محتواك إلى لغات متعددة بأصوات طبيعية، وترجمة دقيقة، ومزامنة تحافظ على جودة الفيديو وتجربة المشاهدة.",
        long: "نأخذ فيديوهاتك من يوتيوب أو إنستغرام أو فيسبوك أو رفع مباشر، ونُدبلجها بالذكاء الاصطناعي. نستخرج الصوت الأصلي، نترجمه، ونعيد تصويته بأصوات طبيعية الإيقاع، ثم نمزجه مع موسيقاك ومؤثراتك. تحصل على فيديو جاهز للنشر، مع ملفات صوت ونصوص منفصلة لفريقك.",
        helps: [
          "الوصول لأسواق جديدة دون إعادة التصوير أو توظيف ممثلين للأصوات",
          "الحفاظ على الموسيقى والتأثيرات الصوتية وإيقاع المحتوى مع تغيير اللغة المنطوقة",
          "الحصول على نصوص وترجمات بلغات متعددة لتحسين SEO وإمكانية الوصول",
          "أقلمة القصيرات والشروحات والإعلانات ومقاطع التدريب أسرع من الاستوديوهات التقليدية",
        ],
        image: "/services/ai-video-dubbing.webp",
      },
      {
        key: "web-development", tier: "high",
        title: "تطوير البرمجيات المخصصة وتطبيقات الويب",
        desc: "نبني مواقع احترافية، منصات SaaS، لوحات تحكم، وبوابات عملاء تجمع بين الأداء العالي، سهولة الاستخدام، وقابلية التوسع.",
        long: "نبني تجارب ويب سريعة وسهلة الوصول وجاهزة لمحركات البحث، بأطر حديثة: صفحات هبوط، مواقع متعددة اللغات، بوابات عملاء، متاجر، ومنتجات سحابية، جميعها بدعم قوي للكتابة من اليمين.",
        helps: ["تحويل عدد أكبر من الزوار إلى عملاء مؤهلين", "تحسين الأداء وقابلية الفهرسة", "بنية منظمة أسهل في الصيانة", "إطلاق صفحات متعددة اللغات بدعم عربي صحيح"],
        image: "/services/web-development.webp",
      },
      {
        key: "mobile-apps", tier: "standard",
        title: "تطوير تطبيقات الجوال",
        desc: "تطبيقات iOS وAndroid مصممة لتلبية احتياجات عملائك أو فرق العمل الداخلية، مع التركيز على الأداء، الاستقرار، وتجربة المستخدم.",
        long: "نبني تطبيقات أصلية ومتعددة المنصات للاستخدامات التجارية والاستهلاكية. كل تطبيق مصمم حول تدفقات المستخدم الحقيقية، يعمل دون اتصال عند الحاجة، ويستوفي معايير متاجر التطبيقات.",
        helps: ["الوصول إلى المستخدمين على أجهزتهم المفضلة", "زيادة الاحتفاظ بحملات إشعارات ذكية", "ضمان العمل المتواصل حتى عند انقطاع الاتصال", "استيفاء معايير الأمان والامتثال المطلوبة"],
        image: "/services/mobile-apps.webp",
      },
      {
        key: "custom-ai", tier: "standard",
        title: "حلول ذكاء اصطناعي مخصصة",
        desc: "نطوّر حلولاً تعتمد على بياناتك الخاصة، تشمل فهم المستندات، البحث الذكي، أنظمة الاسترجاع المعزز، والتكامل مع عملياتك الحالية.",
        long: "حين لا تكفي الأدوات الجاهزة، نصمم أنظمة مبنية حول مستنداتك وعملياتك وبياناتك: استرجاع معزز، تصنيف، استخراج، تقييم، ضوابط، وضبط للتكلفة.",
        helps: ["استخراج رؤى قابلة للتطبيق من المستندات الداخلية والبيانات غير المهيكلة", "دقة أعلى من أدوات الذكاء الاصطناعي العامة لأنها مبنية على مصادرك أنت", "بناء ملكية فكرية ومزايا تنافسية", "ضبط التكاليف التشغيلية عبر التخزين المؤقت والتوجيه الذكي"],
        image: "/services/custom-ai.webp",
      },
      {
        key: "crm-integration", tier: "standard",
        title: "تكامل أنظمة CRM والواجهات البرمجية",
        desc: "نوحّد أنظمتك المختلفة من خلال تكاملات مستقرة وآمنة بين أدوات إدارة العملاء، أنظمة ERP، قواعد البيانات، والتطبيقات الداخلية.",
        long: "نبني جسوراً موثوقة بين أنظمتك المختلفة وقواعد بياناتك المخصصة وأنظمتك القديمة: مصدر حقيقة واحد، سجلات واضحة، إعادة محاولة تلقائية، وتوثيق يستطيع فريقك استخدامه فعلاً.",
        helps: ["إنشاء مصدر حقيقة واحد لجميع بيانات المؤسسة", "إزالة صوامع البيانات وعمليات المزامنة اليدوية", "الاعتماد على خطوط بيانات مرنة مع تتبع شامل للأخطاء", "تسريع تأهيل المطورين بتوثيق واضح"],
        image: "/services/crm-integration.webp",
      },
      {
        key: "ui-ux", tier: "standard",
        title: "تصميم واجهات وتجربة المستخدم",
        desc: "نصمم واجهات حديثة وتجارب استخدام تجعل الأنظمة المعقدة أكثر وضوحاً وسهولة، مع التركيز على احتياجات المستخدم الفعلية.",
        long: "نصمم رحلات المستخدم والنماذج الأولية وأنظمة التصميم والواجهات المصقولة بالتوازي مع التطوير. نبني على مهام حقيقية وسهولة وصول وتحويل، لا على الزخرفة.",
        helps: ["تحسين معدلات التحويل عبر جميع نقاط التفاعل", "تقليل الاحتكاك والتسرب في التدفقات الرئيسية", "الحفاظ على هوية بصرية موحدة عبر جميع الممتلكات الرقمية", "تسريع دورات التطوير عبر مكتبات المكونات"],
        image: "/services/ui-ux.webp",
      },
      {
        key: "dashboards", tier: "standard",
        title: "لوحات المعلومات وأنظمة البيانات",
        desc: "لوحات تشغيلية حيّة وخطوط بيانات تجمع أرقام المبيعات والعمليات والمالية في مكان واحد، مبنية من أنظمتكم الفعلية.",
        long: "نصمّم مؤشرات الأداء مع فريقكم، ثم نبني خطوط بيانات تسحب من نظام إدارة العملاء وأنظمة ERP وجداول البيانات وقواعد البيانات، ونعرضها في لوحات تدعم العربية والإنجليزية والكتابة من اليمين، مع صلاحيات وصول وتنبيهات.",
        helps: ["استبدال تجميع التقارير اليدوي بأرقام تتحدّث تلقائياً", "تعريف واحد متفق عليه لكل مؤشر", "اكتشاف الاستثناءات مبكراً عبر التنبيهات", "عرض البيانات بالعربية والإنجليزية بالاتجاه الصحيح"],
        image: "/services/dashboards.webp",
      },
      {
        key: "consulting", tier: "standard",
        title: "التدقيق التقني والاستشارات",
        desc: "نراجع البنية التقنية الحالية، نحدد فرص التحسين، ونقدم توصيات عملية تشمل الأداء، الأمان، الأتمتة، وقابلية التوسع.",
        long: "نراجع أنظمتك والكود والعمليات والأدوات لتحديد ما يبطئك. تحصل على خارطة طريق عملية توازن بين تأثير الأعمال والجهد الهندسي والتكلفة والمخاطر.",
        helps: ["الحصول على تقييم محايد لبنيتك التقنية", "خارطة طريق مرتبة بالأولويات مرتبطة بتأثير الأعمال", "تحديد فرص فورية لتقليل تكاليف البرمجيات والبنية التحتية", "إجراء مراجعات شاملة للأمان وقابلية التوسع"],
        image: "/services/consulting.webp",
      },
    ],
  },
  about: {
    eyebrow: "عن Raanzlr",
    title: "نبني أنظمة ذكاء اصطناعي وبرمجيات تُحدث فرقاً في أعمالك.",
    sub: "نطوّر حلول الذكاء الاصطناعي، وأتمتة الأعمال، والبرمجيات المخصصة للشركات التي تبحث عن أنظمة عملية، قابلة للتوسع، ومصممة للاستخدام اليومي.",
    principlesLabel: "// كيف نعمل",
    principlesTitle: "كيف نعمل",
    values: [
      { title: "تواصل مباشر وشفاف", desc: "نؤمن بأن نجاح أي مشروع يبدأ بالتواصل الواضح. لذلك نحرص على أن يكون التواصل مباشراً مع الفريق المسؤول عن تنفيذ المشروع، لضمان سرعة اتخاذ القرار، وفهم المتطلبات بدقة، ومواكبة جميع مراحل التطوير." },
      { title: "الجودة منذ البداية", desc: "نهتم ببناء حلول مستقرة وقابلة للتطوير، مع الاهتمام بجودة الكود، والاختبارات، والأداء، والتوثيق، حتى تكون الأنظمة جاهزة للاستخدام الفعلي وقادرة على مواكبة نمو الأعمال." },
      { title: "حلول مصممة لتناسب طبيعة عملك", desc: "لا نعتمد على قوالب جاهزة أو حلول موحدة للجميع، بل نبدأ بفهم أهداف المشروع وآلية العمل، ثم نصمم الحل التقني بما يتوافق مع احتياجات المؤسسة الحالية وخططها المستقبلية." },
    ],
    hq: "المكتب المسجّل",
    hqLabel: "// المكتب المسجّل",
    address: "4030 Plaza Dr #3 #15 (10030), Casper, WY 82604",
    hqTitle: "راانزلر شركة مسجّلة في الولايات المتحدة، وتعمل عن بُعد",
    hqDesc: "راانزلر مسجّلة في كاسبر بولاية وايومنغ الأمريكية. يُنفَّذ كل مشروع عن بُعد — عبر الاكتشاف والتخطيط والتطوير والإطلاق والدعم على الإنترنت — مع جدولة الاجتماعات بما يتوافق مع ساعات عمل العميل.",
  },
  contact: {
    eyebrow: "لنتعاون",
    title: "لنتحدث عن مشروعك",
    sub: "سواء كنت تبحث عن تطوير نظام مخصص، أو أتمتة عملياتك، أو دمج حلول الذكاء الاصطناعي في أعمالك، يسعدنا التعرف على احتياجاتك. شاركنا تفاصيل مشروعك، وسيتواصل معك أحد أعضاء فريقنا خلال يوم عمل لمناقشة أفضل الحلول المناسبة.",
    generalTab: "استفسار عام",
    serviceTab: "موجز المشروع",
    emailUs: "راسلنا",
    headquartersLabel: "المقر الرئيسي",
    general: {
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      phonePlaceholder: "مثال: 5551234567",
      subject: "الموضوع",
      message: "أخبرنا عن مشروعك أو التحديات التي تواجهها",
    },
    service: {
      title: "موجز المشروع",
      desc: "قدّم بعض السياق حتى نتمكن من إعداد رد مفيد. توقع الرد خلال 24 ساعة.",
      service: "الخدمة المطلوبة",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      phonePlaceholder: "مثال: 5551234567",
      role: "دورك / المسمى الوظيفي",
      companyType: "الصناعة",
      companySize: "حجم الشركة",
      budget: "الميزانية التقديرية",
      bestTime: "الوقت المفضل للتواصل (اختياري)",
      challenge: "ما التحدي الرئيسي الذي تحاول حله؟",
      selectSize: "يرجى اختيار حجم الشركة أولاً",
    },
    success: "وصلتنا رسالتك. سيتواصل معك فريقنا الهندسي قريباً.",
    error: "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة.",
    responseTitle: "وقت الاستجابة",
    responseValue: "خلال يوم عمل واحد",
    responseSub: "نحرص على مراجعة جميع الاستفسارات والرد عليها في أسرع وقت ممكن من قبل فريقنا.",
  },
  footer: {
    tagline: "نبني ذكاءً اصطناعياً وأتمتة وبرمجيات لفرق عالمية طموحة.",
    quickLinks: "روابط سريعة",
    location: "المقر الرئيسي",
    rights: "جميع الحقوق محفوظة.",
    engineered: "دقة، سرعة، أثر",
  },
  isAr: true,
  seo: {
    home: {
      title: "راانزلر Raanzlr | شركة أتمتة ذكاء اصطناعي وبرمجيات مخصصة",
      description: "راانزلر (Raanzlr) تبني وكلاء ذكاء اصطناعي وأتمتة عمليات ولوحات بيانات وبرمجيات مخصصة، تُنفَّذ عن بُعد. تركيزها على الولايات المتحدة وكندا والخليج وتركيا وأوروبا.",
      keywords: "أتمتة بالذكاء الاصطناعي، روبوت واتساب عربي، تطوير ذكاء اصطناعي مخصص، تطوير مواقع، تطوير تطبيقات جوال، شركة برمجة في الخليج، رانزلر، راانزلر، رعنزلر، رعانزلر، رانزلير، راانزلير، Raanzlr، Ranzlr",
    },
    services: {
      title: "خدمات الذكاء الاصطناعي والأتمتة وتطوير المواقع والتطبيقات · Raanzlr",
      description: "وكلاء ذكاء اصطناعي، وأتمتة سير العمل، وبرمجيات مخصصة، وتطبيقات ويب، ولوحات بيانات، وتكاملات API — خدمات عن بُعد للشركات التي تستهدف كفاءة التشغيل.",
      keywords: "خدمات ذكاء اصطناعي، تطوير روبوت واتساب، أتمتة n8n، شركة تطوير ويب، تطوير تطبيقات iOS و Android",
    },
    about: {
      title: "عن راانزلر Raanzlr | استوديو هندسي لبرمجيات عصر الذكاء الاصطناعي",
      description: "راانزلر شركة برمجيات مسجّلة في وايومنغ، تأسست 2023. كيف تحدّد نطاق حلول أتمتة الذكاء الاصطناعي والبرمجيات المخصصة وتبنيها — وكل مشروع يُنفَّذ عن بُعد.",
      keywords: "فريق راانزلر، من هي راانزلر، شركة رانزلر، Raanzlr، شركة هندسة برمجيات، فريق ذكاء اصطناعي الشرق الأوسط، وكالة تقنية تركيا",
    },
    contact: {
      title: "تواصل مع Raanzlr | ابدأ مشروعك التقني اليوم",
      description: "تواصل مع فريق المهندسين في Raanzlr لمناقشة مشروع الذكاء الاصطناعي أو الأتمتة الخاص بك. نضمن رداً احترافياً خلال يوم عمل واحد.",
      keywords: "تواصل مع شركة برمجة، تسعير مشروع ذكاء اصطناعي، طلب خدمة أتمتة، استشارة تقنية",
    },
    insights: {
      title: "رؤى حول الذكاء الاصطناعي والأتمتة وهندسة البرمجيات | Raanzlr",
      description: "مقالات عملية عن وكلاء الذكاء الاصطناعي، معالجة اللغة العربية، أنظمة RAG، أتمتة واتساب، وأتمتة سير العمل.",
      keywords: "مدونة ذكاء اصطناعي، معالجة اللغة العربية، أنظمة RAG، واتساب بزنس API، عائد أتمتة الأعمال",
    },
    caseStudies: {
      title: "سيناريوهات حلول الذكاء الاصطناعي والأتمتة | Raanzlr",
      description: "سيناريوهات توضيحية تبيّن كيف تعالج Raanzlr وكلاء الذكاء الاصطناعي وأتمتة العمليات ولوحات التحكم والبرمجيات ثنائية اللغة. نتائج متوقعة وليست نتائج عملاء.",
      keywords: "دراسات حالة ذكاء اصطناعي، أتمتة الخليج، روبوت واتساب، أتمتة CRM، نظام RAG عربي",
    },
    industries: {
      title: "حلول ذكاء اصطناعي وأتمتة حسب القطاع · Raanzlr",
      description: "حلول ذكاء اصطناعي وأتمتة وبرمجيات مخصصة للمالية والتجزئة والصحة والتعليم واللوجستيات والضيافة والقانون والتصنيع — تُنفَّذ عن بُعد.",
      keywords: "ذكاء اصطناعي للمالية، أتمتة التجزئة، أتمتة الرعاية الصحية، ذكاء اصطناعي للتعليم، أتمتة اللوجستيات",
    },
    markets: {
      title: "أتمتة ذكاء اصطناعي وبرمجيات مخصصة حسب السوق — Raanzlr",
      description: "تقدّم راانزلر خدمات أتمتة الذكاء الاصطناعي والبرمجيات المخصصة عن بُعد، مع تركيز على الولايات المتحدة وكندا والخليج وتركيا وأوروبا.",
      keywords: "شركة ذكاء اصطناعي السعودية، شركة ذكاء اصطناعي الإمارات، تطوير برمجيات الخليج، أتمتة الشرق الأوسط",
    },
    faq: {
      title: "أسئلة Raanzlr الشائعة | الخدمات والتسعير والعمل والدعم",
      description: "إجابات حول خدمات Raanzlr، دعم العربية، مدة المشاريع، التسعير، ربط الأنظمة، الاستشارات، والدعم بعد الإطلاق.",
      keywords: "أسئلة أتمتة الذكاء الاصطناعي، تكلفة روبوت محادثة، مدة مشروع برمجي، دعم ذكاء اصطناعي عربي",
    },
    privacyPolicy: {
      title: "سياسة الخصوصية | Raanzlr",
      description: "سياسة خصوصية Raanzlr: كيف نجمع معلوماتك الشخصية ونستخدمها ونحميها وفقاً لمعايير GDPR والقوانين المحلية.",
      keywords: "سياسة خصوصية Raanzlr، حماية البيانات، امتثال GDPR",
    },
    termsOfService: {
      title: "شروط الخدمة | Raanzlr",
      description: "شروط خدمة Raanzlr تغطي المشاريع والمدفوعات والملكية الفكرية والمسؤوليات.",
      keywords: "شروط خدمة Raanzlr، عقد برمجيات، اتفاقية مشروع",
    },
  },
} as const;

export const translations = { en, ar };

export type Translations = Widen<typeof en>;
