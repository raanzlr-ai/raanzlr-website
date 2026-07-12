import { Building2, ShoppingCart, Heart, GraduationCap, Truck, Hotel, Scale, Factory } from "lucide-react";

export interface IndustryDetailContent {
  name: string;
  heroTitle: string;
  heroDescription: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  keyAdvantages: string[];
  servicesTitle: string;
  services: Array<{ title: string; description: string }>;
  useCasesTitle: string;
  useCasesIntro: string;
  useCases: Array<{ title: string; description: string }>;
  whyRaanzlrTitle: string;
  whyRaanzlr: string[];
  faqTitle: string;
  faqs: Array<{ q: string; a: string }>;
  ctaTitle: string;
  ctaDescription: string;
  metaDescription: string;
  keywords: string;
}

export interface IndustryDetail {
  slug: string;
  icon: any;
  heroImage: string;
  en: IndustryDetailContent;
  ar: IndustryDetailContent;
}

export const INDUSTRY_DETAILS: IndustryDetail[] = [
  {
    slug: "finance",
    icon: Building2,
    heroImage: "/industries/finance.webp",
    en: {
      name: "Finance & Banking",
      heroTitle: "AI-Powered Financial Services for the GCC",
      heroDescription: "Transform your financial institution with intelligent automation that enhances compliance, detects fraud in real-time, and delivers exceptional customer experiences. Built for the regulatory landscape of Saudi Arabia, UAE, and the wider GCC region.",
      overviewTitle: "Banking on Intelligence",
      overviewParagraphs: [
        "The GCC financial sector is at a pivotal moment. With 73% of banking tasks impacted by generative AI and early adopters seeing 22-30% productivity improvements, the question isn't whether to adopt AI—it's how quickly you can deploy it effectively.",
        "From SAMA's Open Banking Framework to CBUAE's AI guidelines, regulators across the region are not just permitting AI adoption—they're actively encouraging it. Banks that master AI-driven compliance monitoring, fraud detection, and customer engagement will define the next era of financial services in the Middle East.",
        "Our solutions are purpose-built for GCC banks: Arabic-first chatbots that understand Gulf dialects, KYC automation compliant with PDPL and UAE data laws, and fraud detection systems trained on regional transaction patterns."
      ],
      keyAdvantages: [
        "85% faster KYC processing from days to minutes",
        "60% reduction in fraud losses with real-time ML detection",
        "40% lower support costs through intelligent Arabic chatbots",
        "99.9% compliance accuracy with automated monitoring",
        "Data residency compliance for Saudi PDPL and UAE regulations",
        "Native WhatsApp integration for 90%+ customer reach"
      ],
      servicesTitle: "AI Solutions for Modern Banking",
      services: [
        {
          title: "Intelligent KYC & Onboarding",
          description: "Automated identity verification, document processing, and sanctions screening that reduces onboarding time from days to minutes while ensuring full SAMA and CBUAE compliance."
        },
        {
          title: "Real-Time Fraud Detection",
          description: "Machine learning models analyzing thousands of transactions per second, flagging anomalies with 99.5% accuracy and drastically reducing false positives."
        },
        {
          title: "Multilingual Banking Chatbots",
          description: "Conversational AI fluent in Arabic (MSA and Gulf dialects), English, and Urdu, handling account inquiries, loan status, and card services 24/7 on WhatsApp and web."
        },
        {
          title: "Compliance Automation",
          description: "AI systems continuously monitoring transactions against FATF, SAMA, and CBUAE requirements, generating regulatory reports automatically."
        },
        {
          title: "AI Credit Scoring",
          description: "Alternative data-driven lending decisions using transaction patterns, utility payments, and behavioral signals—critical for financial inclusion in expat-heavy markets."
        },
        {
          title: "Legacy System Integration",
          description: "API-first middleware that layers AI capabilities onto existing core banking systems (Temenos, Oracle FLEXCUBE, Finacle) without requiring full platform replacement."
        }
      ],
      useCasesTitle: "Real-World Applications",
      useCasesIntro: "How GCC banks and fintech companies are deploying AI to transform operations:",
      useCases: [
        {
          title: "Digital Account Opening",
          description: "AI-powered KYC processes documents, validates identity against government databases, screens for sanctions, and approves accounts in under 5 minutes—all while maintaining full regulatory compliance."
        },
        {
          title: "AML Transaction Monitoring",
          description: "Continuous analysis of cross-border remittances (especially high-volume UAE-India/Pakistan corridors) to detect money laundering patterns, with explainable AI ensuring regulator transparency."
        },
        {
          title: "WhatsApp Banking Assistant",
          description: "Arabic-first chatbot handling balance inquiries, transaction history, loan applications, and card services via WhatsApp—the dominant messaging platform across the GCC with 90%+ penetration."
        },
        {
          title: "Fraud Prevention for Digital Channels",
          description: "Real-time scoring of mobile app and online banking transactions, detecting sophisticated fraud schemes including deepfake voice attacks and account takeover attempts."
        },
        {
          title: "SME Lending Automation",
          description: "Alternative credit scoring for small businesses using transaction data, invoice patterns, and digital footprint—enabling instant loan decisions for underserved segments."
        }
      ],
      whyRaanzlrTitle: "Why GCC Banks Choose Raanzlr",
      whyRaanzlr: [
        "Arabic-first AI with native Gulf dialect support, not English models retrofitted for Arabic",
        "Deep regulatory knowledge: SAMA Open Banking, PDPL, CBUAE AI guidelines, FATF compliance",
        "Data residency architecture compliant with Saudi and UAE in-country storage mandates",
        "Proven integration expertise with legacy core banking platforms without full replacement",
        "Same-timezone delivery teams across MENA for real-time collaboration",
        "Explainable AI models that meet regulator transparency requirements for credit and compliance decisions"
      ],
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "How do we ensure AI credit decisions are explainable to regulators?",
          a: "We use explainable AI (XAI) frameworks with full model documentation, interpretable features, and decision audit trails. Every credit decision includes the key factors that influenced it, meeting SAMA and CBUAE transparency requirements."
        },
        {
          q: "Can AI integrate with our 15-year-old core banking system?",
          a: "Yes. We use an API-first middleware approach that layers AI capabilities on top of legacy platforms like Temenos, Oracle FLEXCUBE, and Finacle without requiring core system replacement. Most integrations are production-ready within 8-12 weeks."
        },
        {
          q: "How does your AI handle Arabic dialects—Gulf Arabic vs. Modern Standard Arabic?",
          a: "Our models are fine-tuned on GCC-specific datasets including Saudi, Emirati, and Kuwaiti dialects. We achieve 95%+ accuracy on colloquial banking queries, far exceeding generic Arabic NLP tools."
        },
        {
          q: "How do we comply with Saudi PDPL and UAE data protection laws?",
          a: "We offer data residency-compliant deployment options using AWS Bahrain, Azure UAE, or on-premise infrastructure. Customer data never leaves the region, and we implement encryption, access controls, and consent management aligned with PDPL requirements."
        }
      ],
      ctaTitle: "Ready to Transform Your Financial Services?",
      ctaDescription: "Join the GCC banks already leveraging AI to reduce costs, enhance compliance, and deliver exceptional customer experiences.",
      metaDescription: "AI & automation solutions for GCC banks: intelligent KYC, fraud detection, Arabic chatbots, and compliance automation. SAMA and CBUAE compliant. Built for Saudi Arabia, UAE, and the Middle East.",
      keywords: "AI banking GCC, Saudi Arabia fintech AI, UAE banking automation, SAMA compliance AI, KYC automation Middle East, fraud detection Arabic, Islamic banking AI, CBUAE digital banking"
    },
    ar: {
      name: "المالية والمصرفية",
      heroTitle: "الخدمات المالية بالذكاء الاصطناعي لدول الخليج",
      heroDescription: "حوّل مؤسستك المالية بالأتمتة الذكية التي تعزز الامتثال، وتكتشف الاحتيال في الوقت الفعلي، وتقدم تجارب عملاء استثنائية. مصممة خصيصاً للبيئة التنظيمية في السعودية والإمارات ودول الخليج.",
      overviewTitle: "الخدمات المصرفية بالذكاء",
      overviewParagraphs: [
        "القطاع المالي الخليجي يقف اليوم أمام مرحلة تحول حقيقية. فمع إمكانية تطبيق الذكاء الاصطناعي التوليدي على 73% من المهام المصرفية، وتحقيق المؤسسات التي بدأت التبني مبكراً زيادات في الإنتاجية تتراوح بين 22 و30%، لم يعد السؤال ما إذا كان الذكاء الاصطناعي سيصبح جزءاً من العمل المصرفي، بل كيف يمكن توظيفه بسرعة وكفاءة وبما يتوافق مع المتطلبات التنظيمية.",
        "وتواكب الجهات التنظيمية في المنطقة هذا التحول بشكل واضح. فمن إطار الخدمات المصرفية المفتوحة الذي أطلقه البنك المركزي السعودي (ساما)، إلى التوجيهات الصادرة عن مصرف الإمارات العربية المتحدة المركزي بشأن الذكاء الاصطناعي، أصبح تبني هذه التقنيات جزءاً من مستقبل القطاع المالي، وليس مجرد مبادرة تقنية. والمؤسسات التي تنجح في دمج الذكاء الاصطناعي ضمن الامتثال، ومكافحة الاحتيال، وخدمة العملاء، ستكون الأكثر قدرة على المنافسة خلال السنوات المقبلة.",
        "صممنا حلولنا بما يتناسب مع احتياجات المؤسسات المالية في الخليج، بدءاً من مساعدين ذكيين يفهمون العربية ولهجات الخليج، مروراً بأتمتة إجراءات اعرف عميلك (KYC) بما يتوافق مع نظام حماية البيانات الشخصية السعودي وتشريعات حماية البيانات الإماراتية، وصولاً إلى أنظمة كشف احتيال مدربة على أنماط المعاملات والسلوك المالي في المنطقة."
      ],
      keyAdvantages: [
        "تسريع إجراءات اعرف عميلك (KYC) بنسبة تصل إلى 85% وتحويلها من أيام إلى دقائق",
        "تقليل خسائر الاحتيال بنسبة تصل إلى 60% عبر أنظمة كشف فورية مدعومة بالتعلم الآلي",
        "خفض تكاليف خدمة العملاء بنسبة تصل إلى 40% من خلال مساعدين ذكيين باللغة العربية",
        "تحقيق دقة امتثال تصل إلى 99.9% عبر المراقبة الآلية للعمليات",
        "بنية متوافقة مع متطلبات إقامة البيانات في السعودية والإمارات",
        "تكامل مباشر مع واتساب للوصول إلى أكثر من 90% من العملاء في المنطقة"
      ],
      servicesTitle: "حلول الذكاء الاصطناعي للخدمات المصرفية الحديثة",
      services: [
        {
          title: "KYC والإلحاق الذكي",
          description: "أتمتة التحقق من الهوية، ومعالجة المستندات، وفحص قوائم العقوبات، بما يقلص زمن فتح الحسابات من أيام إلى دقائق مع الحفاظ على الامتثال الكامل لمتطلبات ساما ومصرف الإمارات المركزي."
        },
        {
          title: "كشف الاحتيال في الوقت الفعلي",
          description: "نماذج تعلم آلي تراقب آلاف المعاملات في الثانية، وتكتشف الأنماط غير الطبيعية بدقة عالية، مع تقليل الإنذارات الخاطئة وتحسين سرعة الاستجابة."
        },
        {
          title: "روبوتات دردشة مصرفية متعددة اللغات",
          description: "مساعدون افتراضيون يدعمون العربية الفصحى واللهجات الخليجية والإنجليزية والأوردية، ويتعاملون مع الاستفسارات المصرفية وطلبات البطاقات والقروض وخدمات الحسابات على مدار الساعة."
        },
        {
          title: "أتمتة الامتثال",
          description: "أنظمة ذكاء اصطناعي تراقب العمليات المالية بشكل مستمر وفق متطلبات FATF وساما ومصرف الإمارات المركزي، مع إعداد التقارير التنظيمية تلقائياً."
        },
        {
          title: "التقييم الائتماني بالذكاء الاصطناعي",
          description: "نماذج تقييم تعتمد على البيانات البديلة، مثل أنماط المعاملات ومدفوعات الخدمات والسلوك المالي، بما يساعد على توسيع الشمول المالي وتحسين قرارات الإقراض."
        },
        {
          title: "تكامل الأنظمة القديمة",
          description: "ربط قدرات الذكاء الاصطناعي مع الأنظمة المصرفية الحالية من خلال واجهات برمجية وطبقات وسيطة، دون الحاجة إلى استبدال النظام الأساسي."
        }
      ],
      useCasesTitle: "التطبيقات الواقعية",
      useCasesIntro: "كيف تستفيد البنوك وشركات التقنية المالية في الخليج من الذكاء الاصطناعي لتحسين عملياتها:",
      useCases: [
        {
          title: "فتح حساب رقمي",
          description: "أتمتة إجراءات KYC للتحقق من الهوية، وفحص المستندات، ومطابقة البيانات مع الجهات الرسمية، ومراجعة قوائم العقوبات، بما يتيح فتح الحساب خلال أقل من خمس دقائق مع الالتزام الكامل بالمتطلبات التنظيمية."
        },
        {
          title: "مراقبة معاملات مكافحة غسل الأموال",
          description: "تحليل مستمر للمعاملات المحلية وعبر الحدود، وخاصة الممرات المالية ذات الأحجام المرتفعة، لاكتشاف أنماط غسل الأموال باستخدام نماذج ذكاء اصطناعي قابلة للتفسير."
        },
        {
          title: "مساعد مصرفي عبر واتساب",
          description: "مساعد ذكي باللغة العربية يتولى الرد على استفسارات الرصيد، وسجل العمليات، وخدمات البطاقات، وطلبات القروض عبر واتساب، المنصة الأكثر استخداماً في الخليج."
        },
        {
          title: "منع الاحتيال في القنوات الرقمية",
          description: "تحليل لحظي لعمليات تطبيقات الهاتف والخدمات المصرفية الإلكترونية لرصد محاولات الاحتيال، بما في ذلك سرقة الحسابات والهجمات المعتمدة على التزييف الصوتي."
        },
        {
          title: "أتمتة إقراض الشركات الصغيرة والمتوسطة",
          description: "تقييم ائتماني يعتمد على بيانات المعاملات والفواتير والمؤشرات الرقمية، بما يسرع اتخاذ قرارات التمويل للشركات الصغيرة والمتوسطة."
        }
      ],
      whyRaanzlrTitle: "لماذا تختار بنوك الخليج Raanzlr",
      whyRaanzlr: [
        "حلول ذكاء اصطناعي مصممة بالعربية أولاً مع فهم حقيقي للهجات الخليجية",
        "خبرة في المتطلبات التنظيمية لساما، والمصرف المركزي الإماراتي، ونظام حماية البيانات، ومتطلبات FATF",
        "بنية تضمن بقاء البيانات داخل السعودية أو الإمارات وفق متطلبات الإقامة المحلية",
        "خبرة في التكامل مع الأنظمة المصرفية الحالية دون الحاجة إلى استبدالها",
        "فرق عمل تعمل ضمن التوقيت الإقليمي لضمان سرعة التنفيذ والدعم",
        "نماذج ذكاء اصطناعي قابلة للتفسير تلبي متطلبات الشفافية في قرارات الائتمان والامتثال"
      ],
      faqTitle: "الأسئلة الشائعة",
      faqs: [
        {
          q: "كيف نضمن أن تكون قرارات الائتمان قابلة للتفسير للجهات التنظيمية؟",
          a: "نعتمد على تقنيات الذكاء الاصطناعي القابل للتفسير (XAI)، مع توفير توثيق كامل للنماذج وسجل واضح للعوامل التي أثرت في كل قرار، بما يحقق متطلبات الشفافية لدى ساما ومصرف الإمارات المركزي."
        },
        {
          q: "هل يمكن دمج حلولكم مع نظام مصرفي مضى على تشغيله أكثر من 15 عاماً؟",
          a: "نعم. نعتمد على طبقات تكامل تعتمد على واجهات البرمجة (API) لربط حلول الذكاء الاصطناعي بمنصات مثل Temenos وOracle FLEXCUBE وFinacle دون الحاجة إلى استبدال النظام، ويمكن تنفيذ معظم المشاريع خلال 8 إلى 12 أسبوعاً."
        },
        {
          q: "كيف تتعامل نماذجكم مع اللهجات الخليجية؟",
          a: "تم تدريب نماذجنا على بيانات لغوية خاصة بدول الخليج تشمل اللهجات السعودية والإماراتية والكويتية، مما يحقق دقة تتجاوز 95% في فهم الاستفسارات المصرفية اليومية."
        },
        {
          q: "كيف نضمن الامتثال لنظام حماية البيانات الشخصية السعودي وقوانين حماية البيانات الإماراتية؟",
          a: "نوفر خيارات نشر داخل المنطقة عبر AWS البحرين أو Microsoft Azure الإمارات أو داخل مراكز بيانات المؤسسة، مع تطبيق التشفير وإدارة الصلاحيات وآليات الموافقة بما يتوافق مع المتطلبات التنظيمية."
        }
      ],
      ctaTitle: "هل أنت مستعد لتحويل خدماتك المالية؟",
      ctaDescription: "انضم إلى المؤسسات المالية في الخليج التي توظف الذكاء الاصطناعي لخفض التكاليف، وتعزيز الامتثال، والارتقاء بتجربة العملاء.",
      metaDescription: "حلول الذكاء الاصطناعي والأتمتة لبنوك الخليج: KYC ذكي، كشف الاحتيال، روبوتات دردشة عربية، وأتمتة الامتثال. متوافق مع ساما والمصرف المركزي الإماراتي. مصمم للسعودية والإمارات والشرق الأوسط.",
      keywords: "الذكاء الاصطناعي المصرفي الخليج، الذكاء الاصطناعي للتكنولوجيا المالية السعودية، أتمتة البنوك الإماراتية، امتثال ساما بالذكاء الاصطناعي، أتمتة KYC الشرق الأوسط، كشف الاحتيال بالعربية، الذكاء الاصطناعي للبنوك الإسلامية"
    }
  },
  {
    slug: "retail",
    icon: ShoppingCart,
    heroImage: "/industries/retail.webp",
    en: {
      name: "Retail & E-Commerce",
      heroTitle: "AI-Powered Retail for the GCC Digital Economy",
      heroDescription: "Transform your retail operations with intelligent automation that personalizes customer experiences, optimizes inventory, and drives sales. Built for the booming e-commerce landscape of Saudi Arabia, UAE, and the wider GCC region.",
      overviewTitle: "Retail Intelligence Reimagined",
      overviewParagraphs: [
        "The GCC retail sector is experiencing explosive growth, with e-commerce penetration accelerating rapidly post-COVID. Saudi Arabia and UAE lead the region with sophisticated omnichannel strategies, WhatsApp commerce, and AI-driven customer engagement becoming the new standard.",
        "From Saudi Vision 2030's push to diversify retail beyond traditional malls to UAE's position as the Middle East's e-commerce hub, governments are investing heavily in digital retail infrastructure. Retailers that master AI-powered recommendation engines, inventory forecasting, and conversational commerce will capture the region's increasingly digital-first consumers.",
        "Our solutions are built for GCC retail realities: Arabic-first shopping assistants on WhatsApp, inventory AI trained on regional demand patterns including Ramadan spikes, and payment integrations with local gateways. We bridge the gap between global retail best practices and Middle Eastern consumer expectations."
      ],
      keyAdvantages: [
        "25-35% increase in average order value through AI recommendations",
        "40-50% reduction in inventory holding costs with demand forecasting",
        "60-70% of customer inquiries resolved by AI assistants",
        "30-40% improvement in delivery route efficiency",
        "Native Arabic and English support for bilingual customer base",
        "WhatsApp commerce integration reaching 90%+ of GCC consumers"
      ],
      servicesTitle: "AI Solutions for Modern Retail",
      services: [
        {
          title: "Personalized Product Recommendations",
          description: "AI recommendation engines analyzing browsing behavior, purchase history, and regional trends to suggest products in real-time, increasing conversion rates and average order values significantly."
        },
        {
          title: "Intelligent Inventory Forecasting",
          description: "Machine learning models predicting demand based on seasonality (Ramadan, Eid, summer travel), weather patterns, and regional events—reducing stockouts and overstock by 40-50%."
        },
        {
          title: "WhatsApp Shopping Assistant",
          description: "Conversational AI on WhatsApp handling product inquiries, order placement, tracking, and returns in Arabic and English—the dominant channel for GCC online shopping."
        },
        {
          title: "Automated Order Tracking",
          description: "AI-powered systems providing real-time shipment updates, delivery predictions, and proactive issue resolution—reducing customer service load by 60%."
        },
        {
          title: "Dynamic Pricing Optimization",
          description: "AI algorithms adjusting prices based on demand, competition, inventory levels, and customer segments—maximizing revenue while maintaining competitiveness."
        },
        {
          title: "Visual Search & Product Discovery",
          description: "Computer vision enabling customers to search products using images, particularly valuable for fashion and home décor categories popular in GCC markets."
        }
      ],
      useCasesTitle: "Real-World Applications",
      useCasesIntro: "How GCC retailers and e-commerce platforms are deploying AI to transform customer experience and operations:",
      useCases: [
        {
          title: "WhatsApp Order & Support Bot",
          description: "Arabic-English bilingual chatbot handling product discovery, cart management, order placement, and post-purchase support via WhatsApp—the preferred channel for 90%+ of GCC consumers. Processes thousands of conversations daily."
        },
        {
          title: "Ramadan Demand Forecasting",
          description: "AI models predicting category-specific demand spikes during Ramadan, Eid, and other cultural events—ensuring optimal inventory positioning across dates, sweets, clothing, and electronics categories."
        },
        {
          title: "Personalized Email & Push Campaigns",
          description: "AI-driven segmentation and content generation creating hyper-personalized marketing campaigns in Arabic and English, optimized for regional preferences and shopping behaviors."
        },
        {
          title: "Returns & Exchange Automation",
          description: "Intelligent returns processing with automated eligibility checking, refund calculation, and reverse logistics coordination—critical for high return rates in fashion and electronics."
        },
        {
          title: "Delivery Route Optimization",
          description: "AI logistics algorithms optimizing last-mile delivery across sprawling GCC cities, accounting for prayer times, traffic patterns, and customer time preferences—reducing delivery costs by 30%."
        }
      ],
      whyRaanzlrTitle: "Why GCC Retailers Choose Raanzlr",
      whyRaanzlr: [
        "Arabic-first commerce AI with native support for Gulf dialects and regional product terminology",
        "Deep understanding of GCC retail seasonality: Ramadan, Eid, summer travel, Dubai Shopping Festival",
        "WhatsApp-native architecture reaching the dominant customer engagement channel",
        "Integration expertise with regional platforms: Mada, Tabby, Tamara, local logistics providers",
        "Same-timezone delivery teams understanding local consumer behavior and preferences",
        "Data residency compliance for Saudi PDPL and UAE e-commerce regulations"
      ],
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "How does your AI handle Arabic product descriptions and customer queries?",
          a: "Our models are trained on millions of GCC e-commerce transactions including Arabic product catalogs, customer reviews, and support conversations. We achieve 95%+ accuracy on colloquial shopping queries in both Gulf Arabic and Modern Standard Arabic."
        },
        {
          q: "Can the system integrate with our existing e-commerce platform (Shopify, WooCommerce, Magento, Salla)?",
          a: "Yes. We provide pre-built connectors for major platforms plus custom API integration for regional solutions like Zid, Salla, and Expand Cart. Most integrations are live within 2-4 weeks."
        },
        {
          q: "How does AI handle Ramadan demand spikes that are 3-5x normal volume?",
          a: "Our forecasting models are explicitly trained on GCC seasonal patterns including Ramadan, Eid, National Day, and DSF. The system learns multi-year patterns and adjusts inventory recommendations 4-6 weeks before peak periods."
        },
        {
          q: "Does the WhatsApp bot support payment processing and order confirmation?",
          a: "Absolutely. We integrate with regional payment gateways (Checkout.com, Telr, PayTabs, HyperPay) and BNPL providers (Tabby, Tamara, Postpay) to enable end-to-end transactions within WhatsApp. Customers receive order confirmations, tracking links, and delivery updates all in-conversation."
        }
      ],
      ctaTitle: "Ready to Transform Your Retail Operations?",
      ctaDescription: "Join the GCC retailers already leveraging AI to increase sales, reduce costs, and deliver exceptional customer experiences.",
      metaDescription: "AI & automation for GCC retail and e-commerce: personalized recommendations, inventory forecasting, WhatsApp shopping bots, and delivery optimization. Built for Saudi Arabia, UAE, and the Middle East market.",
      keywords: "AI retail GCC, Saudi Arabia e-commerce automation, UAE retail AI, WhatsApp shopping bot, Arabic product recommendations, Ramadan inventory forecasting, MENA e-commerce AI, Salla Zid integration"
    },
    ar: {
      name: "التجزئة والتجارة الإلكترونية",
      heroTitle: "البيع بالتجزئة بالذكاء الاصطناعي للاقتصاد الرقمي الخليجي",
      heroDescription: "طوّر عمليات البيع بالتجزئة عبر حلول الذكاء الاصطناعي التي تمنح عملاءك تجربة أكثر تخصيصاً، وتحسن إدارة المخزون، وتزيد المبيعات. صُممت حلولنا لتناسب طبيعة التجارة الإلكترونية المتسارعة في المملكة العربية السعودية والإمارات ودول الخليج.",
      overviewTitle: "ذكاء التجزئة المعاد تصوره",
      overviewParagraphs: [
        "يشهد قطاع التجزئة في الخليج تحولاً غير مسبوق مدفوعاً بالنمو السريع للتجارة الإلكترونية وتغير سلوك المستهلكين منذ جائحة كوفيد-19. وأصبحت التجارب متعددة القنوات، والتسوق عبر تطبيقات المحادثة، والتفاعل المدعوم بالذكاء الاصطناعي عناصر أساسية في المنافسة، خصوصاً في السعودية والإمارات.",
        "وتدعم الحكومات هذا التحول من خلال استثمارات واسعة في الاقتصاد الرقمي والبنية التحتية للتجارة الإلكترونية. فمن مستهدفات رؤية السعودية 2030 لتطوير قطاع التجزئة، إلى مكانة الإمارات كمركز إقليمي للتجارة الرقمية، أصبح الذكاء الاصطناعي جزءاً أساسياً من مستقبل هذا القطاع.",
        "صممنا حلولنا لتواكب احتياجات تجارة التجزئة في الخليج، بدءاً من مساعدين ذكيين باللغة العربية يعملون عبر واتساب، مروراً بأنظمة توقع الطلب التي تراعي المواسم الإقليمية مثل رمضان والأعياد، وصولاً إلى التكامل مع بوابات الدفع والمنصات المحلية."
      ],
      keyAdvantages: [
        "زيادة متوسط قيمة الطلب بنسبة تتراوح بين 25% و35% عبر توصيات المنتجات المدعومة بالذكاء الاصطناعي",
        "خفض تكاليف الاحتفاظ بالمخزون بنسبة تتراوح بين 40% و50% من خلال التنبؤ الدقيق بالطلب",
        "معالجة ما بين 60% و70% من استفسارات العملاء باستخدام مساعدين ذكيين",
        "تحسين كفاءة عمليات التسليم بنسبة تتراوح بين 30% و40%",
        "دعم كامل للعربية والإنجليزية لتقديم تجربة موحدة لجميع العملاء",
        "تكامل مباشر مع واتساب للوصول إلى أكثر من 90% من مستهلكي الخليج"
      ],
      servicesTitle: "حلول الذكاء الاصطناعي لتجارة التجزئة الحديثة",
      services: [
        {
          title: "توصيات المنتجات المخصصة",
          description: "محركات توصية تعتمد على الذكاء الاصطناعي لتحليل سلوك العملاء وسجل المشتريات والاتجاهات المحلية، وتقديم اقتراحات فورية تزيد معدلات التحويل ومتوسط قيمة الطلب."
        },
        {
          title: "التنبؤ الذكي بالمخزون",
          description: "نماذج تعلم آلي تتوقع الطلب اعتماداً على المواسم والأعياد والطقس والفعاليات الإقليمية، مما يساعد على تقليل نفاد المخزون والفائض وتحسين كفاءة إدارة المنتجات."
        },
        {
          title: "مساعد تسوق عبر واتساب",
          description: "مساعد ذكي يعمل عبر واتساب باللغتين العربية والإنجليزية، يساعد العملاء في البحث عن المنتجات وإتمام الطلبات وتتبع الشحنات وإدارة المرتجعات عبر القناة الأكثر استخداماً في الخليج."
        },
        {
          title: "تتبع الطلبات الآلي",
          description: "أنظمة تعتمد على الذكاء الاصطناعي لتوفير تحديثات لحظية للشحن، وتوقع مواعيد التسليم، واكتشاف المشكلات قبل حدوثها، مما يقلل الضغط على فرق خدمة العملاء."
        },
        {
          title: "تحسين التسعير الديناميكي",
          description: "خوارزميات ذكية تعدل الأسعار تلقائياً وفق مستويات الطلب، وتحركات المنافسين، وحجم المخزون، وخصائص العملاء، بما يدعم زيادة الإيرادات مع الحفاظ على القدرة التنافسية."
        },
        {
          title: "البحث المرئي واكتشاف المنتجات",
          description: "تقنيات رؤية حاسوبية تتيح للعملاء البحث عن المنتجات باستخدام الصور، وهي ميزة ذات قيمة كبيرة في قطاعات الأزياء والأثاث والديكور المنزلي."
        }
      ],
      useCasesTitle: "التطبيقات الواقعية",
      useCasesIntro: "كيف تستخدم شركات التجزئة والتجارة الإلكترونية في الخليج الذكاء الاصطناعي لتحسين تجربة العملاء ورفع الكفاءة التشغيلية:",
      useCases: [
        {
          title: "روبوت الطلبات والدعم عبر واتساب",
          description: "مساعد ذكي ثنائي اللغة يدير رحلة العميل بالكامل، من اكتشاف المنتجات وحتى متابعة الطلبات وخدمات ما بعد البيع، عبر واتساب الذي يعد القناة الرقمية الأكثر استخداماً في المنطقة."
        },
        {
          title: "التنبؤ بالطلب في رمضان",
          description: "نماذج ذكاء اصطناعي تتوقع التغيرات الموسمية في الطلب خلال رمضان والأعياد والمناسبات المحلية، بما يساعد على توزيع المخزون بكفاءة عبر مختلف الفئات."
        },
        {
          title: "حملات البريد الإلكتروني والإشعارات المخصصة",
          description: "حلول تعتمد على الذكاء الاصطناعي لتقسيم العملاء وإنشاء حملات تسويقية مخصصة بالعربية والإنجليزية، بما يتوافق مع سلوك الشراء والتفضيلات المحلية."
        },
        {
          title: "أتمتة المرتجعات والاستبدال",
          description: "إدارة ذكية لطلبات الإرجاع والاستبدال تشمل التحقق من الأهلية، واحتساب الاسترداد، وتنسيق عمليات النقل العكسي، بما يقلل الوقت والتكاليف التشغيلية."
        },
        {
          title: "تحسين مسارات التسليم",
          description: "خوارزميات ذكاء اصطناعي تخطط أفضل مسارات التوصيل داخل مدن الخليج، مع مراعاة حركة المرور، وأوقات الذروة، وتفضيلات العملاء، مما يخفض تكاليف الميل الأخير ويحسن سرعة التسليم."
        }
      ],
      whyRaanzlrTitle: "لماذا يختار تجار التجزئة في الخليج Raanzlr",
      whyRaanzlr: [
        "حلول تجارة ذكية مصممة بالعربية أولاً مع فهم للهجات الخليجية والمصطلحات المحلية",
        "خبرة في أنماط التسوق الموسمية مثل رمضان والأعياد ومهرجان دبي للتسوق ومواسم السفر",
        "تكامل أصلي مع واتساب باعتباره القناة الرقمية الأكثر استخداماً في المنطقة",
        "خبرة في الربط مع منصات الدفع والتجارة الإلكترونية والخدمات اللوجستية المحلية مثل مدى، وتمارا، وتابي",
        "فرق تنفيذ تعمل ضمن المنطقة الزمنية نفسها وتفهم طبيعة السوق الخليجي",
        "بنية متوافقة مع متطلبات حماية البيانات في السعودية والإمارات"
      ],
      faqTitle: "الأسئلة الشائعة",
      faqs: [
        {
          q: "كيف يتعامل الذكاء الاصطناعي مع أوصاف المنتجات العربية واستفسارات العملاء؟",
          a: "تم تدريب نماذجنا على ملايين المعاملات التجارية في الخليج، بما في ذلك كتالوجات المنتجات العربية، ومراجعات العملاء، ومحادثات الدعم. نحقق دقة تزيد عن 95% في فهم استفسارات التسوق بالعربية الفصحى واللهجات الخليجية."
        },
        {
          q: "هل يمكن دمج الحلول مع منصات التجارة الإلكترونية الحالية مثل Shopify وWooCommerce وMagento وسلة؟",
          a: "نعم. نوفر موصلات جاهزة للمنصات الرئيسية، بالإضافة إلى تكامل مخصص عبر واجهات برمجية للمنصات المحلية مثل زد وسلة وإكسباند كارت. معظم عمليات التكامل تكتمل خلال 2 إلى 4 أسابيع."
        },
        {
          q: "كيف يتعامل النظام مع الارتفاع الكبير في الطلب خلال شهر رمضان؟",
          a: "نماذج التنبؤ لدينا مدربة خصيصاً على الأنماط الموسمية في الخليج، بما في ذلك رمضان والأعياد والمناسبات الوطنية ومهرجان دبي للتسوق. يتعلم النظام من بيانات عدة سنوات ويبدأ في تعديل توصيات المخزون قبل 4 إلى 6 أسابيع من ذروة الطلب."
        },
        {
          q: "هل يدعم مساعد واتساب الدفع الإلكتروني وتأكيد الطلبات؟",
          a: "بالتأكيد. نتكامل مع بوابات الدفع الإقليمية مثل Checkout.com وTelr وPayTabs وHyperPay، وخدمات الشراء الآجل مثل تابي وتمارا وPostpay، لتمكين إتمام المعاملة بالكامل عبر واتساب. يتلقى العملاء تأكيدات الطلب وروابط التتبع وتحديثات التسليم داخل المحادثة نفسها."
        }
      ],
      ctaTitle: "هل أنت مستعد لتطوير أعمال التجزئة بالذكاء الاصطناعي؟",
      ctaDescription: "انضم إلى شركات التجزئة في الخليج التي تستفيد اليوم من الذكاء الاصطناعي لزيادة المبيعات، وتحسين الكفاءة التشغيلية، وتقديم تجربة تسوق أكثر تميزاً.",
      metaDescription: "الذكاء الاصطناعي والأتمتة للتجزئة والتجارة الإلكترونية في الخليج: توصيات مخصصة، التنبؤ بالمخزون، روبوتات تسوق واتساب، وتحسين التسليم. مصمم لسوق السعودية والإمارات والشرق الأوسط.",
      keywords: "الذكاء الاصطناعي للتجزئة الخليج، أتمتة التجارة الإلكترونية السعودية، الذكاء الاصطناعي للتجزئة الإماراتي، روبوت تسوق واتساب، توصيات المنتجات العربية، التنبؤ بمخزون رمضان، الذكاء الاصطناعي للتجارة الإلكترونية في الشرق الأوسط، تكامل سلة زد"
    }
  },
  {
    slug: "healthcare",
    icon: Heart,
    heroImage: "/industries/healthcare.webp",
    en: {
      name: "Healthcare",
      heroTitle: "AI-Powered Healthcare for the GCC",
      heroDescription: "Transform patient care with intelligent automation that streamlines operations, improves outcomes, and ensures regulatory compliance. Built for the healthcare landscape of Saudi Arabia, UAE, and the wider GCC region.",
      overviewTitle: "Healing Through Intelligence",
      overviewParagraphs: [
        "The GCC healthcare sector is experiencing unprecedented digital transformation. With 83% of healthcare executives piloting generative AI and 70% of healthcare tasks ready for automation or augmentation, the future of medicine in the Middle East is being rewritten.",
        "From Saudi Vision 2030's USD 6.4 billion healthcare digitization investment to UAE's AI Strategy 2031 targeting healthcare as a priority sector, governments across the region are driving rapid AI adoption. Hospitals and clinics that master AI-powered patient intake, scheduling, and clinical decision support will deliver better care at lower cost.",
        "Our solutions are designed for GCC healthcare providers: Arabic-first chatbots that schedule appointments via WhatsApp, AI triage systems compliant with PDPL and UAE health data laws, and medical record summarization that handles both Arabic and English documentation seamlessly."
      ],
      keyAdvantages: [
        "80-90% reduction in patient registration time",
        "20-35% decrease in appointment no-shows through AI reminders",
        "30-50% faster medical record review with AI summarization",
        "40-60% reduction in call center volume",
        "Full compliance with Saudi PDPL and UAE health data regulations",
        "Native WhatsApp integration reaching 90%+ of patients"
      ],
      servicesTitle: "AI Solutions for Modern Healthcare",
      services: [
        {
          title: "Intelligent Patient Intake",
          description: "AI-powered triage chatbots collecting symptom history, insurance information, and demographics before clinical encounters, reducing check-in time from 15-25 minutes to 2-3 minutes."
        },
        {
          title: "Smart Appointment Scheduling",
          description: "WhatsApp-based AI assistants handling appointment booking, rescheduling, and reminders in Arabic and English, reducing no-show rates by 20-35% through intelligent engagement."
        },
        {
          title: "Medical Record Summarization",
          description: "Gen AI converting hours of clinical documentation into actionable summaries in seconds, with seamless translation between Arabic and English medical terminology."
        },
        {
          title: "Clinical Decision Support",
          description: "AI systems analyzing patient data against clinical guidelines, flagging drug interactions, missed diagnoses, and deterioration risks, reducing diagnostic errors by 15-30%."
        },
        {
          title: "Telemedicine AI Enhancement",
          description: "AI-powered remote consultation platforms with real-time vital analysis and specialist routing, supporting chronic disease management for diabetes and hypertension patients."
        },
        {
          title: "Healthcare System Integration",
          description: "Seamless connectivity with HIS/EMR platforms including Epic, Cerner, Oracle Health, and regional systems, plus integration with Nphies, Malaffi, and Nabidh health exchanges."
        }
      ],
      useCasesTitle: "Real-World Applications",
      useCasesIntro: "How GCC hospitals, clinics, and pharmacies are deploying AI to transform patient care:",
      useCases: [
        {
          title: "WhatsApp Patient Registration",
          description: "AI chatbot collects patient information, verifies insurance, and completes pre-screening before visits—cutting registration time by 85% and freeing front-desk staff for complex cases."
        },
        {
          title: "Emergency Department AI Triage",
          description: "Rapid patient stratification by acuity using AI analysis of symptoms and vitals, reducing clinician triage time from 10-15 minutes to 2-3 minutes while maintaining clinical accuracy."
        },
        {
          title: "Multilingual Medical Assistant",
          description: "AI system answering patient questions about medications, lab results, and treatment plans in Arabic, English, and Urdu—handling 70% of routine inquiries without human intervention."
        },
        {
          title: "Chronic Disease Management Automation",
          description: "AI-driven remote monitoring for diabetic and hypertensive patients with automated alerts, medication reminders, and lifestyle coaching—reducing hospital readmissions significantly. Critical for GCC where diabetes prevalence reaches 16-19%."
        },
        {
          title: "Pharmacy Prescription Verification",
          description: "AI analyzing prescriptions in real-time to flag dosing errors, drug interactions, and contraindications before dispensing, reducing medication errors by up to 30%."
        }
      ],
      whyRaanzlrTitle: "Why GCC Healthcare Providers Choose Raanzlr",
      whyRaanzlr: [
        "Arabic-first AI with medical terminology support for Gulf dialects and Modern Standard Arabic",
        "Deep healthcare compliance knowledge: PDPL, UAE Health Data Law, SFDA SaMD regulations",
        "Experience integrating with regional health information exchanges: Nphies, Malaffi, Nabidh",
        "Proven HIS/EMR integration with Epic, Cerner, Oracle Health, and local platforms",
        "Same-timezone delivery teams across MENA understanding local healthcare workflows",
        "HIPAA-equivalent security architecture meeting GCC data residency requirements"
      ],
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "How do we integrate AI with our existing HIS/EMR system?",
          a: "We use HL7 FHIR standards and custom API connectors to integrate with major platforms including Epic, Cerner, Oracle Health, and regional systems. Most integrations are operational within 6-10 weeks with full data bidirectionality."
        },
        {
          q: "Does your AI support Arabic medical terminology and Gulf dialects?",
          a: "Yes. Our models are trained on GCC-specific medical datasets including Arabic clinical notes, Gulf dialect patient communication, and bilingual medical terminology. We achieve 90%+ accuracy on colloquial health queries."
        },
        {
          q: "Is the solution compliant with Saudi PDPL and UAE health data laws?",
          a: "Absolutely. We implement data residency within Saudi Arabia and UAE, encrypt all PHI, maintain comprehensive audit trails, and follow consent management protocols aligned with PDPL and UAE Federal Data Law requirements."
        },
        {
          q: "How does AI handle sensitive clinical decisions—what if it makes a mistake?",
          a: "Our AI operates in advisory mode with human-in-the-loop design. Clinical decisions always require physician review. The system flags confidence levels and escalates edge cases automatically, maintaining full audit logs for accountability."
        }
      ],
      ctaTitle: "Ready to Transform Your Healthcare Delivery?",
      ctaDescription: "Join the GCC hospitals and clinics already leveraging AI to improve patient outcomes, reduce costs, and enhance operational efficiency.",
      metaDescription: "AI & automation for GCC healthcare: patient intake, appointment scheduling, medical record summarization, and clinical decision support. PDPL compliant. Built for Saudi Arabia, UAE, and the Middle East.",
      keywords: "AI healthcare GCC, Saudi Arabia hospital automation, UAE medical AI, PDPL healthcare compliance, telemedicine AI Middle East, Arabic medical chatbot, patient scheduling automation, Nphies Malaffi Nabidh integration"
    },
    ar: {
      name: "الرعاية الصحية",
      heroTitle: "الرعاية الصحية بالذكاء الاصطناعي لدول الخليج",
      heroDescription: "ارتقِ بخدمات الرعاية الصحية من خلال حلول ذكاء اصطناعي تبسّط العمليات، وتحسن تجربة المرضى، وترفع جودة الرعاية، مع الالتزام الكامل بالمتطلبات التنظيمية في السعودية والإمارات ودول الخليج.",
      overviewTitle: "الشفاء من خلال الذكاء",
      overviewParagraphs: [
        "يشهد قطاع الرعاية الصحية في الخليج تحولاً رقمياً متسارعاً. ومع تجربة 83% من قادة القطاع للذكاء الاصطناعي التوليدي، وإمكانية أتمتة أو دعم نحو 70% من المهام الصحية، أصبح الذكاء الاصطناعي أحد أهم محركات تطوير الخدمات الطبية في المنطقة.",
        "وتعكس المبادرات الحكومية هذا التوجه بوضوح، بدءاً من استثمارات رؤية السعودية 2030 في رقمنة القطاع الصحي، وصولاً إلى استراتيجية الإمارات للذكاء الاصطناعي 2031 التي تضع الرعاية الصحية ضمن القطاعات ذات الأولوية. ومع هذا الزخم، بات تبني حلول الذكاء الاصطناعي جزءاً أساسياً من مستقبل تقديم الرعاية الصحية في الخليج.",
        "طوّرنا حلولنا لتلائم احتياجات المستشفيات والعيادات ومقدمي الخدمات الصحية في المنطقة، بدءاً من مساعدين ذكيين باللغة العربية لإدارة المواعيد عبر واتساب، وصولاً إلى أنظمة فرز طبي وأتمتة للعمليات تتوافق مع نظام حماية البيانات الشخصية السعودي وتشريعات البيانات الصحية في الإمارات."
      ],
      keyAdvantages: [
        "تقليل وقت تسجيل المرضى بنسبة تتراوح بين 80 و90%",
        "خفض معدلات عدم حضور المواعيد بنسبة تتراوح بين 20 و35% عبر التذكيرات الذكية",
        "تسريع مراجعة السجلات الطبية بنسبة تتراوح بين 30 و50% باستخدام التلخيص الآلي",
        "تقليل حجم مكالمات مراكز الاتصال بنسبة تتراوح بين 40 و60%",
        "توافق كامل مع نظام حماية البيانات السعودي وأنظمة البيانات الصحية الإماراتية",
        "تكامل مباشر مع واتساب للوصول إلى أكثر من 90% من المرضى"
      ],
      servicesTitle: "حلول الذكاء الاصطناعي للرعاية الصحية الحديثة",
      services: [
        {
          title: "استقبال المرضى الذكي",
          description: "مساعدون افتراضيون يجمعون بيانات المرضى، ويسجلون الأعراض، ويتحققون من معلومات التأمين قبل الزيارة، مما يقلل زمن إجراءات الاستقبال من 15–25 دقيقة إلى دقيقتين أو ثلاث دقائق."
        },
        {
          title: "جدولة المواعيد الذكية",
          description: "مساعدون يعملون عبر واتساب لإدارة الحجز وإعادة الجدولة وإرسال التذكيرات بالعربية والإنجليزية، بما يسهم في تقليل معدلات عدم الحضور وتحسين استغلال المواعيد."
        },
        {
          title: "تلخيص السجلات الطبية",
          description: "تحول تقنيات الذكاء الاصطناعي التوليدي السجلات الطبية الطويلة إلى ملخصات واضحة وقابلة للاستخدام خلال ثوانٍ، مع دعم سلس للمصطلحات الطبية بالعربية والإنجليزية."
        },
        {
          title: "دعم القرار السريري",
          description: "تحلل الأنظمة بيانات المرضى بالاعتماد على الإرشادات السريرية، وترصد التفاعلات الدوائية المحتملة، والتشخيصات غير المكتملة، ومؤشرات تدهور الحالة الصحية، لدعم الكوادر الطبية في اتخاذ قرارات أكثر دقة."
        },
        {
          title: "تعزيز الطب عن بُعد بالذكاء الاصطناعي",
          description: "منصات استشارات عن بُعد مدعومة بالذكاء الاصطناعي تتابع العلامات الحيوية لحظياً، وتدعم الأطباء في إدارة الأمراض المزمنة مثل السكري وارتفاع ضغط الدم."
        },
        {
          title: "تكامل أنظمة الرعاية الصحية",
          description: "تكامل سلس مع أنظمة HIS وEMR، بما في ذلك Epic وCerner وOracle Health والمنصات الإقليمية، إضافة إلى الربط مع شبكات تبادل المعلومات الصحية مثل Nphies وMalaffi وNabidh."
        }
      ],
      useCasesTitle: "التطبيقات الواقعية",
      useCasesIntro: "كيف تستخدم المستشفيات والعيادات والصيدليات في الخليج الذكاء الاصطناعي لتحسين جودة الرعاية الصحية:",
      useCases: [
        {
          title: "تسجيل المرضى عبر واتساب",
          description: "مساعد ذكي يجمع بيانات المريض، ويتحقق من معلومات التأمين، ويستكمل إجراءات ما قبل الزيارة، مما يقلل زمن التسجيل بنسبة تصل إلى 85%."
        },
        {
          title: "الفرز الذكي في أقسام الطوارئ",
          description: "تحليل الأعراض والعلامات الحيوية لتحديد أولوية الحالات بسرعة، مما يقلص وقت الفرز الأولي من 10–15 دقيقة إلى دقيقتين أو ثلاث دقائق."
        },
        {
          title: "مساعد طبي متعدد اللغات",
          description: "نظام ذكي يجيب عن استفسارات المرضى المتعلقة بالأدوية، ونتائج المختبرات، وخطط العلاج بالعربية والإنجليزية والأوردية، ويتولى معالجة غالبية الاستفسارات الروتينية."
        },
        {
          title: "إدارة الأمراض المزمنة بالذكاء الاصطناعي",
          description: "متابعة مستمرة عن بُعد لمرضى السكري وارتفاع ضغط الدم، مع تنبيهات تلقائية وتذكير بالأدوية، بما يساهم في تقليل إعادة التنويم وتحسين الالتزام بالعلاج."
        },
        {
          title: "التحقق الذكي من الوصفات الطبية",
          description: "تحليل الوصفات الطبية لحظياً للكشف عن الجرعات غير المناسبة أو التفاعلات الدوائية المحتملة، مما يساعد على تقليل أخطاء صرف الأدوية وتحسين سلامة المرضى."
        }
      ],
      whyRaanzlrTitle: "لماذا يختار مقدمو الرعاية الصحية في الخليج Raanzlr",
      whyRaanzlr: [
        "حلول ذكاء اصطناعي مصممة بالعربية أولاً مع فهم للمصطلحات الطبية واللهجات الخليجية",
        "خبرة في متطلبات الامتثال، بما يشمل نظام حماية البيانات، وتشريعات البيانات الصحية الإماراتية، ومتطلبات SFDA الخاصة بالبرمجيات الطبية",
        "خبرة في التكامل مع شبكات تبادل المعلومات الصحية مثل Nphies وMalaffi وNabidh",
        "تكامل مثبت مع أنظمة HIS وEMR العالمية والمحلية",
        "فرق تنفيذ تعمل ضمن المنطقة الزمنية للشرق الأوسط وتفهم طبيعة سير العمل في المؤسسات الصحية الخليجية",
        "بنية أمنية عالية تدعم حماية البيانات الصحية ومتطلبات إقامة البيانات داخل المنطقة"
      ],
      faqTitle: "الأسئلة الشائعة",
      faqs: [
        {
          q: "كيف يتم دمج حلول الذكاء الاصطناعي مع نظام HIS أو EMR الحالي؟",
          a: "نعتمد على معايير HL7 FHIR وواجهات برمجية حديثة لربط حلول الذكاء الاصطناعي بالأنظمة الصحية المختلفة، مع إنجاز معظم مشاريع التكامل خلال فترة تتراوح بين 6 و10 أسابيع."
        },
        {
          q: "هل تدعم نماذجكم المصطلحات الطبية العربية واللهجات الخليجية؟",
          a: "نعم. تم تدريب نماذجنا على بيانات طبية خاصة بالمنطقة، تشمل السجلات والمصطلحات الطبية العربية واللهجات الخليجية، مما يوفر مستوى عالياً من الدقة في فهم استفسارات المرضى."
        },
        {
          q: "هل تتوافق الحلول مع نظام حماية البيانات السعودي وقوانين البيانات الصحية الإماراتية؟",
          a: "نعم. نوفر خيارات نشر داخل السعودية والإمارات، مع تشفير البيانات الصحية، وإدارة الصلاحيات، وسجلات تدقيق كاملة بما يتوافق مع المتطلبات التنظيمية."
        },
        {
          q: "كيف يتعامل الذكاء الاصطناعي مع القرارات السريرية الحساسة؟",
          a: "تعمل حلولنا كمساعد للطواقم الطبية ولا تستبدل القرار الطبي. تبقى جميع القرارات السريرية النهائية بيد الطبيب، مع توفير سجل كامل يوضح كيفية وصول النظام إلى توصياته."
        }
      ],
      ctaTitle: "هل أنت مستعد لتحويل خدمات الرعاية الصحية؟",
      ctaDescription: "انضم إلى المؤسسات الصحية في الخليج التي توظف الذكاء الاصطناعي لتحسين نتائج المرضى، وتعزيز الكفاءة التشغيلية، وخفض التكاليف.",
      metaDescription: "الذكاء الاصطناعي والأتمتة للرعاية الصحية في الخليج: استقبال المرضى، جدولة المواعيد، تلخيص السجلات الطبية، ودعم القرار السريري. متوافق مع نظام حماية البيانات. مصمم للسعودية والإمارات.",
      keywords: "الذكاء الاصطناعي للرعاية الصحية الخليج، أتمتة المستشفيات السعودية، الذكاء الاصطناعي الطبي الإماراتي، امتثال نظام حماية البيانات للرعاية الصحية، الذكاء الاصطناعي للطب عن بُعد الشرق الأوسط، روبوت دردشة طبي عربي، تكامل Nphies Malaffi Nabidh"
    }
  },
  {
    slug: "education",
    icon: GraduationCap,
    heroImage: "/industries/education.webp",
    en: {
      name: "Education & EdTech",
      heroTitle: "AI-Powered Education for the GCC's Future",
      heroDescription: "Transform learning experiences with intelligent automation that personalizes education, reduces teacher burden, and improves student outcomes. Built for the education landscape of Saudi Arabia, UAE, and the wider GCC region.",
      overviewTitle: "Learning Through Intelligence",
      overviewParagraphs: [
        "The GCC education sector is undergoing rapid digital transformation. With global AI in education projected to grow from USD 2.21B (2024) to USD 5.82B (2030) at 17.5% CAGR, and Saudi Arabia ranking among top nations for generative AI adoption in education, the classroom of tomorrow is being built today.",
        "From Saudi Vision 2030's Human Capital Development Program targeting education quality improvements to UAE's mandatory AI curriculum across all K-12 grades, governments are investing billions in education digitization. Institutions that master adaptive learning, AI tutoring, and automated grading will deliver better outcomes at scale.",
        "Our solutions are designed for GCC education providers: Arabic-English bilingual AI tutors, adaptive learning platforms trained on regional curricula, and automated grading systems handling both languages—addressing the critical need for Arabic-first educational technology."
      ],
      keyAdvantages: [
        "40-60% reduction in instructor time spent on routine grading",
        "30-50% improvement in student engagement with adaptive learning",
        "24/7 AI tutoring support in Arabic and English",
        "Early warning systems reducing dropout rates by 20-35%",
        "Full support for both Arabic Fusha and Gulf dialects",
        "Integration with LMS platforms (Blackboard, Moodle, Madrasati)"
      ],
      servicesTitle: "AI Solutions for Modern Education",
      services: [
        {
          title: "Adaptive Learning Platforms",
          description: "AI systems that adjust difficulty and topic sequence based on each student's real-time performance—used by Saudi Aramco training centers and leading GCC universities for technical upskilling."
        },
        {
          title: "AI Arabic Tutoring Bot",
          description: "WhatsApp and web chatbot answering student questions in Arabic Fusha and colloquial Gulf dialects—deployed by regional EdTech platforms for exam preparation and homework help."
        },
        {
          title: "Automated Essay Grading",
          description: "NLP-based systems grading short-answer and essay responses in both Arabic and English using customizable rubrics—reducing faculty workload by 40-60% on routine assessments."
        },
        {
          title: "Early Warning Systems",
          description: "LMS analytics flagging students who stop logging in, miss deadlines, or show declining performance—triggering automated outreach and advisor alerts to prevent dropouts."
        },
        {
          title: "Multilingual Content Generator",
          description: "AI generating Arabic-English bilingual lesson modules, quizzes, and explainer videos from curriculum PDFs—accelerating content localization for regional institutions."
        },
        {
          title: "Academic Integrity Monitoring",
          description: "AI plagiarism detection and exam proctoring tools adapted for Arabic content—addressing widespread use of AI writing tools while maintaining academic standards."
        }
      ],
      useCasesTitle: "Real-World Applications",
      useCasesIntro: "How GCC universities, K-12 schools, and online academies are deploying AI to transform education:",
      useCases: [
        {
          title: "Adaptive Learning for STEM Courses",
          description: "Platform adjusts difficulty and topic sequence per student's real-time performance in mathematics, physics, and computer science—deployed at Saudi universities to reduce failure rates in foundational courses."
        },
        {
          title: "WhatsApp Homework Helper",
          description: "AI tutor bot answering student questions in Arabic about assignments, explaining concepts, and providing step-by-step problem solving—available 24/7 when human tutors aren't accessible."
        },
        {
          title: "Automated Arabic Essay Grading",
          description: "NLP system scoring Arabic compositions and providing feedback on grammar, structure, and argument quality—freeing teachers to focus on complex assessments and student interaction."
        },
        {
          title: "Student Retention Analytics",
          description: "ML models predicting at-risk students based on LMS activity, assignment completion, and attendance patterns—enabling proactive intervention before students disengage. Critical for reducing GCC's 30-50% online course dropout rates."
        },
        {
          title: "Bilingual Content Generation",
          description: "AI automatically translating and culturally adapting educational content between Arabic and English—solving the chronic shortage of high-quality Arabic learning materials."
        }
      ],
      whyRaanzlrTitle: "Why GCC Education Institutions Choose Raanzlr",
      whyRaanzlr: [
        "Arabic-first AI with pedagogical understanding of Gulf educational systems and curricula",
        "Deep integration with regional LMS platforms: Blackboard, Moodle, Saudi Madrasati platform",
        "Compliance with Saudi PDPL and UAE student data protection requirements",
        "Experience with Islamic curriculum content and culturally appropriate learning materials",
        "Same-timezone delivery teams understanding local education challenges and workflows",
        "Support for both Modern Standard Arabic and Gulf dialects in conversational AI"
      ],
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "Can the AI tutor understand and respond accurately in Arabic—including Gulf dialect?",
          a: "Yes. Our models are trained on millions of Arabic educational conversations including Modern Standard Arabic and Gulf dialects. We achieve 90%+ accuracy on colloquial student questions, far exceeding generic Arabic NLP tools."
        },
        {
          q: "How does the system handle academic integrity—will students use it to cheat?",
          a: "Our tutoring AI is designed for learning support, not answer provision. It explains concepts, guides problem-solving, and asks Socratic questions rather than giving direct answers. We also provide plagiarism detection tools adapted for Arabic content."
        },
        {
          q: "Does the platform integrate with our existing LMS (Blackboard, Moodle, Madrasati)?",
          a: "Absolutely. We provide LTI-compliant integrations for major LMS platforms plus custom connectors for regional systems like Saudi Madrasati. Student data flows bidirectionally with full grade sync."
        },
        {
          q: "Is student data stored locally in-country to meet Saudi PDPL and UAE data residency requirements?",
          a: "Yes. We implement data residency within Saudi Arabia and UAE with encryption, role-based access controls, and comprehensive audit trails aligned with PDPL and UAE educational data protection regulations."
        }
      ],
      ctaTitle: "Ready to Transform Your Educational Delivery?",
      ctaDescription: "Join the GCC schools and universities already leveraging AI to improve learning outcomes, reduce costs, and scale quality education.",
      metaDescription: "AI & automation for GCC education: adaptive learning, Arabic AI tutoring, automated grading, and early warning systems. Built for Saudi Arabia, UAE, and Middle East schools and universities.",
      keywords: "AI education GCC, Saudi Arabia EdTech, UAE adaptive learning, Arabic AI tutor, automated grading Arabic, Madrasati integration, PDPL education compliance, Saudi Vision 2030 education"
    },
    ar: {
      name: "التعليم والتكنولوجيا التعليمية",
      heroTitle: "التعليم بالذكاء الاصطناعي لمستقبل الخليج",
      heroDescription: "حوّل تجارب التعلم بالأتمتة الذكية التي تخصص التعليم، وتقلل عبء المعلم، وتحسن نتائج الطلاب. مصممة خصيصاً للمشهد التعليمي في السعودية والإمارات ودول الخليج.",
      overviewTitle: "التعلم من خلال الذكاء",
      overviewParagraphs: [
        "يشهد قطاع التعليم الخليجي تحولاً رقمياً سريعاً. مع توقعات نمو الذكاء الاصطناعي العالمي في التعليم من 2.21 مليار دولار (2024) إلى 5.82 مليار دولار (2030) بمعدل نمو سنوي 17.5%، واحتلال السعودية مرتبة بين أفضل الدول في تبني الذكاء الاصطناعي التوليدي في التعليم، يتم بناء الفصل الدراسي للغد اليوم.",
        "من برنامج تطوير رأس المال البشري لرؤية السعودية 2030 الذي يستهدف تحسينات جودة التعليم إلى منهج الذكاء الاصطناعي الإلزامي في الإمارات عبر جميع صفوف K-12، تستثمر الحكومات مليارات في رقمنة التعليم.",
        "حلولنا مصممة لمقدمي التعليم في الخليج: مدرسو ذكاء اصطناعي ثنائيو اللغة عربي-إنجليزي، ومنصات تعلم تكيفي مدربة على المناهج الإقليمية، وأنظمة تصحيح آلي تتعامل مع كلا اللغتين."
      ],
      keyAdvantages: [
        "تخفيض 40-60% في وقت المدرس المستغرق في التصحيح الروتيني",
        "تحسين 30-50% في مشاركة الطلاب مع التعلم التكيفي",
        "دعم توجيه بالذكاء الاصطناعي على مدار الساعة بالعربية والإنجليزية",
        "أنظمة إنذار مبكر تقلل معدلات التسرب بنسبة 20-35%",
        "دعم كامل للعربية الفصحى واللهجات الخليجية",
        "التكامل مع منصات LMS (Blackboard، Moodle، مدرستي)"
      ],
      servicesTitle: "حلول الذكاء الاصطناعي للتعليم الحديث",
      services: [
        {
          title: "منصات التعلم التكيفي",
          description: "أنظمة ذكاء اصطناعي تعدل الصعوبة وتسلسل الموضوعات بناءً على أداء كل طالب في الوقت الفعلي، تستخدمها مراكز تدريب أرامكو السعودية والجامعات الخليجية الرائدة."
        },
        {
          title: "روبوت التوجيه بالعربية",
          description: "روبوت دردشة عبر واتساب والويب يجيب على أسئلة الطلاب بالعربية الفصحى واللهجات الخليجية العامية، منتشر في منصات التكنولوجيا التعليمية الإقليمية للتحضير للامتحانات."
        },
        {
          title: "التصحيح الآلي للمقالات",
          description: "أنظمة قائمة على البرمجة اللغوية العصبية تصحح الإجابات القصيرة والمقالات بالعربية والإنجليزية باستخدام معايير قابلة للتخصيص، مما يقلل عبء العمل على الأساتذة بنسبة 40-60%."
        },
        {
          title: "أنظمة الإنذار المبكر",
          description: "تحليلات LMS تضع علامات على الطلاب الذين يتوقفون عن تسجيل الدخول أو يفوتون المواعيد النهائية، مما يؤدي إلى تواصل تلقائي وتنبيهات للمستشارين لمنع التسرب."
        },
        {
          title: "مولد محتوى متعدد اللغات",
          description: "الذكاء الاصطناعي ينشئ وحدات دراسية ثنائية اللغة عربي-إنجليزي واختبارات ومقاطع فيديو توضيحية من ملفات PDF للمنهج، مما يسرع توطين المحتوى للمؤسسات الإقليمية."
        },
        {
          title: "مراقبة النزاهة الأكاديمية",
          description: "أدوات كشف الانتحال بالذكاء الاصطناعي ومراقبة الامتحانات مكيفة للمحتوى العربي، معالجة الاستخدام الواسع لأدوات الكتابة بالذكاء الاصطناعي."
        }
      ],
      useCasesTitle: "التطبيقات الواقعية",
      useCasesIntro: "كيف تنشر جامعات الخليج ومدارس K-12 والأكاديميات عبر الإنترنت الذكاء الاصطناعي لتحويل التعليم:",
      useCases: [
        {
          title: "التعلم التكيفي لدورات STEM",
          description: "منصة تعدل الصعوبة وتسلسل الموضوعات حسب أداء الطالب في الوقت الفعلي في الرياضيات والفيزياء وعلوم الكمبيوتر، منتشرة في الجامعات السعودية لتقليل معدلات الفشل."
        },
        {
          title: "مساعد الواجبات المنزلية عبر واتساب",
          description: "روبوت مدرس بالذكاء الاصطناعي يجيب على أسئلة الطلاب بالعربية حول الواجبات، ويشرح المفاهيم، ويوفر حل المشكلات خطوة بخطوة، متاح على مدار الساعة."
        },
        {
          title: "التصحيح الآلي للمقالات العربية",
          description: "نظام البرمجة اللغوية العصبية يصحح المقالات العربية ويقدم ملاحظات حول القواعد والبنية وجودة الحجة، مما يحرر المعلمين للتركيز على التقييمات المعقدة."
        },
        {
          title: "تحليلات الاحتفاظ بالطلاب",
          description: "نماذج تعلم آلي تتنبأ بالطلاب المعرضين للخطر بناءً على نشاط LMS وإكمال الواجبات، مما يتيح التدخل الاستباقي. حاسم لتقليل معدلات التسرب من الدورات عبر الإنترنت في الخليج 30-50%."
        },
        {
          title: "إنشاء محتوى ثنائي اللغة",
          description: "الذكاء الاصطناعي يترجم ويكيف ثقافياً المحتوى التعليمي بين العربية والإنجليزية، مما يحل النقص المزمن في مواد التعلم العربية عالية الجودة."
        }
      ],
      whyRaanzlrTitle: "لماذا تختار مؤسسات التعليم الخليجية Raanzlr",
      whyRaanzlr: [
        "ذكاء اصطناعي بالعربية أولاً مع فهم تربوي للأنظمة التعليمية الخليجية والمناهج",
        "تكامل عميق مع منصات LMS الإقليمية: Blackboard، Moodle، منصة مدرستي السعودية",
        "امتثال لنظام حماية البيانات السعودي ومتطلبات حماية بيانات الطلاب الإماراتية",
        "خبرة مع محتوى المناهج الإسلامية ومواد التعلم المناسبة ثقافياً",
        "فرق تسليم بنفس المنطقة الزمنية تفهم تحديات التعليم المحلي وسير العمل",
        "دعم لكل من العربية الفصحى الحديثة واللهجات الخليجية في الذكاء الاصطناعي المحادثة"
      ],
      faqTitle: "الأسئلة الشائعة",
      faqs: [
        {
          q: "هل يمكن للمدرس بالذكاء الاصطناعي الفهم والرد بدقة بالعربية، بما في ذلك اللهجة الخليجية؟",
          a: "نعم. نماذجنا مدربة على ملايين المحادثات التعليمية العربية. نحقق دقة أكثر من 90% في أسئلة الطلاب العامية، متفوقين بكثير على أدوات البرمجة اللغوية العصبية العربية العامة."
        },
        {
          q: "كيف يتعامل النظام مع النزاهة الأكاديمية، هل سيستخدمه الطلاب للغش؟",
          a: "الذكاء الاصطناعي للتوجيه مصمم لدعم التعلم، وليس تقديم الإجابات. يشرح المفاهيم ويوجه حل المشكلات ويطرح أسئلة سقراطية بدلاً من إعطاء إجابات مباشرة."
        },
        {
          q: "هل تتكامل المنصة مع LMS الحالي (Blackboard، Moodle، مدرستي)؟",
          a: "بالتأكيد. نقدم عمليات تكامل متوافقة مع LTI للمنصات الرئيسية بالإضافة إلى موصلات مخصصة للأنظمة الإقليمية مثل مدرستي السعودية. تتدفق بيانات الطلاب ثنائية الاتجاه."
        },
        {
          q: "هل يتم تخزين بيانات الطلاب محلياً داخل البلد لتلبية متطلبات نظام حماية البيانات السعودي والإماراتي؟",
          a: "نعم. نطبق إقامة البيانات داخل السعودية والإمارات مع التشفير وضوابط الوصول القائمة على الأدوار بما يتماشى مع نظام حماية البيانات وأنظمة حماية البيانات التعليمية الإماراتية."
        }
      ],
      ctaTitle: "هل أنت مستعد لتحويل تقديم التعليم؟",
      ctaDescription: "انضم إلى مدارس وجامعات الخليج التي تستفيد بالفعل من الذكاء الاصطناعي لتحسين نتائج التعلم وتقليل التكاليف وتوسيع نطاق التعليم الجيد.",
      metaDescription: "الذكاء الاصطناعي والأتمتة للتعليم في الخليج: التعلم التكيفي، التوجيه بالذكاء الاصطناعي بالعربية، التصحيح الآلي، وأنظمة الإنذار المبكر. مصمم لمدارس وجامعات السعودية والإمارات والشرق الأوسط.",
      keywords: "الذكاء الاصطناعي للتعليم الخليج، التكنولوجيا التعليمية السعودية، التعلم التكيفي الإماراتي، مدرس ذكاء اصطناعي عربي، التصحيح الآلي بالعربية، تكامل مدرستي، امتثال نظام حماية البيانات التعليم، تعليم رؤية السعودية 2030"
    }
  },
  {
    slug: "logistics",
    icon: Truck,
    heroImage: "/industries/logistics.webp",
    en: {
      name: "Logistics & Supply Chain",
      heroTitle: "AI-Powered Logistics for GCC Trade Hubs",
      heroDescription: "Transform your supply chain operations with intelligent automation that optimizes routes, predicts demand, and ensures on-time delivery. Built for the logistics landscape of Saudi Arabia, UAE, and the wider GCC region.",
      overviewTitle: "Supply Chain Intelligence",
      overviewParagraphs: [
        "The GCC logistics sector is critical to regional trade, with UAE and Saudi Arabia serving as major hubs connecting Asia, Europe, and Africa. As e-commerce explodes and Saudi Vision 2030's National Industrial Development and Logistics Program (NIDLP) invests USD 427B+ in infrastructure, AI-driven optimization becomes essential for competitiveness.",
        "From Dubai's position as the world's 4th largest re-export hub to Saudi Arabia's ambitious goal of becoming a global logistics gateway, governments are modernizing ports, airports, and inland infrastructure. Companies that master AI-powered route optimization, predictive maintenance, and demand forecasting will capture the region's logistics boom.",
        "Our solutions are built for GCC logistics realities: real-time shipment tracking bots on WhatsApp, AI models trained on regional traffic patterns including prayer times, and supplier communication automation in Arabic and English—addressing the operational complexities of Middle Eastern supply chains."
      ],
      keyAdvantages: [
        "25-30% reduction in delivery times through AI route optimization",
        "40-50% decrease in unplanned downtime with predictive maintenance",
        "30-35% improvement in inventory turnover with demand forecasting",
        "50-60% reduction in manual tracking inquiries via automation",
        "Real-time visibility across multi-modal transport (air, sea, land)",
        "Native Arabic and English support for regional supplier networks"
      ],
      servicesTitle: "AI Solutions for Modern Logistics",
      services: [
        {
          title: "Real-Time Shipment Tracking Bots",
          description: "WhatsApp and web chatbots providing instant shipment updates, ETA predictions, and exception alerts in Arabic and English—handling thousands of tracking inquiries without human intervention."
        },
        {
          title: "Predictive Maintenance AI",
          description: "IoT sensors on trucks, forklifts, and warehouse equipment feeding ML models that predict failures 2-4 weeks ahead—enabling proactive maintenance scheduling and reducing costly breakdowns."
        },
        {
          title: "Route Optimization Algorithms",
          description: "AI analyzing traffic patterns, delivery windows, prayer times, and fuel costs to generate optimal routes—reducing delivery times by 25-30% and fuel consumption by 15-20% across GCC cities."
        },
        {
          title: "Automated Supplier Communication",
          description: "AI systems managing purchase orders, delivery confirmations, and exception handling with suppliers in Arabic and English—reducing procurement team workload by 40-50%."
        },
        {
          title: "Demand Forecasting & Inventory Optimization",
          description: "Machine learning models predicting seasonal demand spikes (Ramadan, Eid, summer travel) and optimizing stock levels across warehouses—reducing inventory holding costs by 30-40%."
        },
        {
          title: "Customs & Documentation Automation",
          description: "AI-powered document processing for bills of lading, commercial invoices, and customs declarations—accelerating clearance times and reducing errors at GCC ports and borders."
        }
      ],
      useCasesTitle: "Real-World Applications",
      useCasesIntro: "How GCC logistics operators and freight companies are deploying AI to transform operations:",
      useCases: [
        {
          title: "WhatsApp Shipment Tracker",
          description: "Arabic-English bilingual bot answering customer tracking inquiries, providing ETAs, and sending proactive delay alerts—processing 10,000+ conversations daily for major GCC logistics operators without human agents."
        },
        {
          title: "Fleet Predictive Maintenance",
          description: "IoT sensors on delivery trucks feeding AI models that predict engine, transmission, and brake failures weeks before occurrence—reducing fleet downtime by 40-50% and extending vehicle life."
        },
        {
          title: "Last-Mile Route Optimization",
          description: "AI algorithms planning daily delivery routes across Dubai, Riyadh, and Doha accounting for traffic, customer time preferences, and prayer times—cutting delivery times and fuel costs by 25-30%."
        },
        {
          title: "Supplier Lead Time Prediction",
          description: "ML models monitoring global supplier performance, port congestion, and commodity prices to predict delays—triggering proactive alerts to procurement teams and suggesting alternative sourcing before shortages impact production."
        },
        {
          title: "Warehouse Inventory Automation",
          description: "Computer vision and robotics systems tracking inventory movement, detecting picking errors, and optimizing storage layouts—increasing warehouse throughput by 35-40% and accuracy to 99.5%+."
        }
      ],
      whyRaanzlrTitle: "Why GCC Logistics Companies Choose Raanzlr",
      whyRaanzlr: [
        "Deep understanding of GCC logistics complexities: multi-lingual documentation, regional traffic patterns, prayer time scheduling",
        "WhatsApp-native customer communication reaching 90%+ of recipients instantly",
        "Integration expertise with regional platforms: Aramex, Fetchr, Smsa Express, local last-mile providers",
        "Experience with Gulf customs and port systems including Dubai Customs, Saudi Customs, Bahrain Trade Net",
        "Same-timezone delivery teams understanding local logistics workflows and challenges",
        "Data residency compliance for sensitive supply chain information"
      ],
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "Can the route optimization AI account for prayer times and traffic patterns specific to GCC cities?",
          a: "Absolutely. Our algorithms are explicitly trained on GCC traffic data including prayer time effects (30-40% traffic reduction during prayers), weekend patterns (Friday-Saturday in UAE vs Thursday-Friday in Saudi), and cultural events like Ramadan that alter traffic flows."
        },
        {
          q: "How does predictive maintenance work—do we need new sensors on our fleet?",
          a: "We can work with existing telematics systems or recommend cost-effective IoT sensor kits. The AI analyzes engine diagnostics, vibration patterns, oil quality, and historical maintenance data to predict failures 2-4 weeks ahead with 85%+ accuracy."
        },
        {
          q: "Does the WhatsApp bot support multiple languages for our diverse customer base?",
          a: "Yes. Our bots handle Arabic (MSA and Gulf dialects), English, Urdu, and Tagalog—the four most common languages across GCC customer bases. Customers can switch languages mid-conversation seamlessly."
        },
        {
          q: "Can AI help us handle Ramadan demand spikes that are 2-3x normal volume?",
          a: "Absolutely. Our demand forecasting models are trained on multi-year GCC seasonal patterns including Ramadan, Eid, National Days, and Dubai Shopping Festival. The system recommends inventory positioning and fleet capacity adjustments 4-6 weeks before peak periods."
        }
      ],
      ctaTitle: "Ready to Transform Your Supply Chain?",
      ctaDescription: "Join the GCC logistics companies already leveraging AI to reduce costs, improve delivery times, and enhance customer satisfaction.",
      metaDescription: "AI & automation for GCC logistics and supply chain: route optimization, predictive maintenance, real-time tracking, and demand forecasting. Built for Saudi Arabia, UAE, and Middle East freight and delivery operations.",
      keywords: "AI logistics GCC, Saudi Arabia supply chain automation, UAE freight AI, route optimization Middle East, predictive maintenance fleet, WhatsApp shipment tracking, NIDLP logistics, Dubai Customs automation"
    },
    ar: {
      name: "اللوجستيات وسلسلة التوريد",
      heroTitle: "حلول لوجستية ذكية ترفع الكفاءة وتمنحك رؤية كاملة لسلسلة الإمداد",
      heroDescription: "ساعد فرق التشغيل وسلاسل التوريد على تقليل زمن التسليم، وخفض التكاليف، وتحسين إدارة الأساطيل والمخزون باستخدام أنظمة ذكية مصممة لبيئة الأعمال في السعودية والإمارات ودول الخليج.",
      overviewTitle: "ذكاء تشغيلي لسلسلة إمداد أكثر كفاءة",
      overviewParagraphs: [
        "أصبحت اللوجستيات في الخليج من أسرع القطاعات نمواً مع توسع التجارة الإلكترونية والاستثمارات الضخمة في البنية التحتية ضمن رؤية السعودية 2030 وخطط التطوير في الإمارات ودول المنطقة.",
        "ومع زيادة حجم الشحنات وتعقّد العمليات اليومية، لم يعد الاعتماد على الإجراءات التقليدية كافياً للحفاظ على سرعة الخدمة أو السيطرة على التكاليف.",
        "نبني حلولاً تساعد شركات النقل والخدمات اللوجستية على إدارة عملياتها بذكاء، بدءاً من تتبع الشحنات والتواصل مع العملاء، وصولاً إلى تحسين المسارات، والتنبؤ بالطلب، وأتمتة المستندات والعمليات التشغيلية.",
        "وتُصمم جميع الحلول بما يتوافق مع طبيعة السوق الخليجي، مع دعم كامل للعربية والإنجليزية، ومراعاة أنماط الحركة المحلية وسير العمل الإقليمي."
      ],
      keyAdvantages: [
        "تقليل زمن التسليم بنسبة تتراوح بين 25 و30% عبر تحسين المسارات بشكل مستمر",
        "خفض الأعطال غير المخطط لها بنسبة تصل إلى 50% باستخدام الصيانة التنبؤية",
        "تحسين دقة التخطيط للمخزون وتقليل الهدر بالاعتماد على توقعات الطلب",
        "تقليل استفسارات العملاء المتعلقة بالشحن بفضل التتبع الآلي والإشعارات الفورية",
        "متابعة لحظية لجميع مراحل النقل البري والبحري والجوي من لوحة واحدة",
        "دعم كامل للعربية والإنجليزية لتسهيل التواصل مع العملاء والموردين"
      ],
      servicesTitle: "حلول الذكاء الاصطناعي للوجستيات الحديثة",
      services: [
        {
          title: "روبوتات تتبع الشحنات",
          description: "وفّر لعملائك تحديثات فورية لحالة الشحن عبر واتساب أو موقعك الإلكتروني، مع إشعارات تلقائية عند أي تغيير أو تأخير، وتقليل الضغط على فرق خدمة العملاء."
        },
        {
          title: "الصيانة التنبؤية",
          description: "راقب أداء المركبات والمعدات باستمرار، واكتشف الأعطال المحتملة قبل حدوثها، لتقليل التوقف المفاجئ وإطالة عمر الأصول التشغيلية."
        },
        {
          title: "تحسين المسارات",
          description: "حلل حركة المرور، ومواعيد التسليم، واستهلاك الوقود، والعوامل المحلية مثل أوقات الذروة، لإنشاء أفضل مسار لكل رحلة بأقل تكلفة وأسرع وقت."
        },
        {
          title: "التواصل مع الموردين",
          description: "أتمت التواصل مع الموردين بدءاً من أوامر الشراء وحتى تأكيدات التسليم وإدارة الاستثناءات، مع دعم العمل باللغتين العربية والإنجليزية."
        },
        {
          title: "التنبؤ بالطلب",
          description: "اعتمد على نماذج تتوقع المواسم وفترات الذروة مثل رمضان والعيد والعروض التجارية، لضبط المخزون قبل ارتفاع الطلب."
        },
        {
          title: "أتمتة الوثائق والجمارك",
          description: "استخرج البيانات تلقائياً من الفواتير وبوالص الشحن والمستندات الجمركية، وسرّع عمليات التخليص مع تقليل الأخطاء اليدوية."
        }
      ],
      useCasesTitle: "التطبيقات الواقعية",
      useCasesIntro: "كيف ينشر مشغلو اللوجستيات الخليجيون وشركات الشحن الذكاء الاصطناعي لتحويل العمليات:",
      useCases: [
        {
          title: "تتبع الشحنات عبر واتساب",
          description: "يجيب النظام تلقائياً عن استفسارات العملاء، ويرسل تحديثات حالة الشحنة ووقت الوصول المتوقع، مع إشعارات استباقية عند وجود أي تأخير."
        },
        {
          title: "الصيانة التنبؤية للأسطول",
          description: "يحلل بيانات المركبات بشكل مستمر للتنبؤ بالأعطال قبل وقوعها، مما يساعد على جدولة الصيانة وتقليل التوقفات المفاجئة."
        },
        {
          title: "تحسين عمليات الميل الأخير",
          description: "يخطط أفضل مسار لكل سائق اعتماداً على حركة المرور، ومواعيد العملاء، والعوامل المحلية، لتقليل زمن التوصيل واستهلاك الوقود."
        },
        {
          title: "توقع تأخر الموردين",
          description: "يراقب أداء الموردين والازدحام في الموانئ وسلاسل الإمداد العالمية، ويرسل تنبيهات مبكرة عند توقع أي تأخير مع اقتراح بدائل مناسبة."
        },
        {
          title: "إدارة ذكية للمخزون",
          description: "يتابع حركة المنتجات داخل المستودعات، ويكشف أخطاء التخزين أو الانتقاء، ويساعد على تحسين توزيع البضائع ورفع دقة الجرد."
        }
      ],
      whyRaanzlrTitle: "لماذا تختار شركات اللوجستيات الخليجية Raanzlr",
      whyRaanzlr: [
        "خبرة عملية في بناء حلول لوجستية مخصصة لبيئة الأعمال الخليجية",
        "دعم كامل للعربية والإنجليزية مع فهم لطبيعة التواصل المحلي",
        "تكامل سلس مع أنظمة إدارة الشحن والمستودعات والمنصات التشغيلية",
        "حلول مصممة للتوسع مع نمو الأعمال دون الحاجة لإعادة بناء النظام",
        "فرق هندسية تتولى التنفيذ والتطوير والدعم مباشرة",
        "تركيز على النتائج التشغيلية القابلة للقياس، وليس مجرد تنفيذ تقني"
      ],
      faqTitle: "الأسئلة الشائعة",
      faqs: [
        {
          q: "هل يمكن لتحسين المسار بالذكاء الاصطناعي مراعاة أوقات الصلاة وأنماط المرور الخاصة بمدن الخليج؟",
          a: "نعم. يراعي النظام طبيعة الحركة في مدن الخليج، بما في ذلك أوقات الصلاة، وأوقات الذروة، والعطل الرسمية، ليقترح أفضل مسار لكل عملية توصيل."
        },
        {
          q: "كيف تعمل الصيانة التنبؤية، هل نحتاج إلى مستشعرات جديدة على أسطولنا؟",
          a: "في الغالب لا. يعمل النظام مع أجهزة التتبع الموجودة في أسطولك، وإن احتجت لمزيد من الدقة نوصي بمستشعرات إضافية بتكلفة معقولة. يراقب الحل مؤشرات تشغيل المركبة مثل حالة المحرك والاهتزاز وجودة الزيت، ويتوقع الأعطال قبل وقوعها بأسبوعين إلى أربعة أسابيع بدقة تتجاوز 85%."
        },
        {
          q: "هل يدعم روبوت واتساب لغات متعددة لقاعدة عملائنا المتنوعة؟",
          a: "نعم. يتعامل النظام مع العربية الفصحى واللهجات الخليجية والإنجليزية، إضافة إلى لغات أخرى شائعة بين العملاء مثل الأوردو والتغالوغ. ويستطيع العميل تغيير اللغة أثناء المحادثة دون أي انقطاع."
        },
        {
          q: "هل يمكن للذكاء الاصطناعي مساعدتنا في التعامل مع ارتفاعات الطلب في رمضان التي تبلغ 2-3 أضعاف الحجم العادي؟",
          a: "نعم. يتعلم النظام من بيانات المواسم السابقة مثل رمضان والعيد والمناسبات المحلية، ويتوقع ارتفاع الطلب مبكراً، ثم يقترح مستويات المخزون وسعة الأسطول المناسبة قبل موعد الذروة بأربعة إلى ستة أسابيع."
        }
      ],
      ctaTitle: "هل ترغب في تشغيل سلسلة إمداد أكثر سرعة وكفاءة؟",
      ctaDescription: "أخبرنا عن طريقة عملك الحالية، وسنقترح حلولاً تساعدك على تقليل التكاليف، وتحسين سرعة التسليم، ومنح فريقك رؤية أوضح لكل مرحلة من مراحل التشغيل.",
      metaDescription: "الذكاء الاصطناعي والأتمتة للوجستيات وسلسلة التوريد في الخليج: تحسين المسار، الصيانة التنبؤية، التتبع في الوقت الفعلي، والتنبؤ بالطلب. مصمم لعمليات الشحن والتسليم في السعودية والإمارات والشرق الأوسط.",
      keywords: "الذكاء الاصطناعي للوجستيات الخليج، أتمتة سلسلة التوريد السعودية، الذكاء الاصطناعي للشحن الإماراتي، تحسين المسار الشرق الأوسط، الصيانة التنبؤية للأسطول، تتبع الشحنات واتساب، لوجستيات NIDLP، أتمتة جمارك دبي"
    }
  },
  {
    slug: "hospitality",
    icon: Hotel,
    heroImage: "/industries/hospitality.webp",
    en: {
      name: "Hospitality & Tourism",
      heroTitle: "AI-Powered Hospitality for GCC Tourism Boom",
      heroDescription: "Transform guest experiences with intelligent automation that personalizes service, optimizes operations, and maximizes revenue. Built for the booming tourism landscape of Saudi Arabia, UAE, and the wider GCC region.",
      overviewTitle: "Hospitality Intelligence Reimagined",
      overviewParagraphs: [
        "The GCC hospitality sector is experiencing explosive growth. Saudi Vision 2030 targets 150 million annual visitors (up from 100M in 2023) with over USD 1 trillion invested in tourism megaprojects like NEOM, Red Sea Global, and Diriyah. Dubai aims for 25 million visitors annually by 2025, cementing its position as a global tourism powerhouse.",
        "With 75%+ of hotel guests now expecting digital check-in/out options and travelers demanding hyper-personalized experiences, AI-powered hospitality is no longer optional—it's essential. Hotels that master AI concierge services, dynamic pricing, and sentiment analysis will capture the premium segment of GCC's tourism boom.",
        "Our solutions are built for regional hospitality realities: multilingual AI concierges fluent in Arabic, English, Urdu, and Chinese; dynamic pricing trained on Hajj/Umrah seasonality and regional events; and review sentiment analysis across Arabic and English—addressing the operational complexities of Middle Eastern hotels and resorts."
      ],
      keyAdvantages: [
        "30-50% reduction in front-desk workload with AI concierge",
        "5-15% increase in RevPAR through dynamic pricing",
        "40-60% faster review response with sentiment analysis",
        "20-25% reduction in housekeeping labor waste",
        "Support for 20+ languages including Arabic, English, Chinese, Urdu",
        "Integration with major PMS (Opera, Amadeus, Hotelogix)"
      ],
      servicesTitle: "AI Solutions for Modern Hospitality",
      services: [
        {
          title: "Multilingual AI Concierge",
          description: "WhatsApp, web, and in-room tablet bot handling guest queries in Arabic, English, Urdu, and Chinese—recommending halal restaurants, prayer times, local attractions, and handling service requests 24/7."
        },
        {
          title: "Dynamic Revenue Management",
          description: "AI analyzing competitor pricing, demand forecasts, Hajj/Umrah calendar, Dubai Shopping Festival, and local events to automatically adjust room rates in real-time—increasing RevPAR by 5-15%."
        },
        {
          title: "Review Sentiment Dashboard",
          description: "Aggregating Arabic and English reviews from Google, Tripadvisor, Booking.com—flagging negative trends, auto-drafting manager response templates, and triggering service recovery workflows."
        },
        {
          title: "Smart Reservation Assistant",
          description: "AI chatbot handling group bookings, corporate RFPs, and upselling (room upgrades, spa packages, dining) via hotel website and WhatsApp—converting inquiries to bookings without human handoff."
        },
        {
          title: "Predictive Housekeeping Scheduler",
          description: "Using check-in/check-out patterns and guest requests to optimize daily room assignments and cleaning sequences—reducing labor hours by 20-25% while maintaining service quality."
        },
        {
          title: "Guest Preference AI",
          description: "Building unified profiles across stays capturing room preferences, dietary restrictions, and service patterns—enabling hyper-personalized experiences that drive loyalty and direct bookings."
        }
      ],
      useCasesTitle: "Real-World Applications",
      useCasesIntro: "How GCC hotels and resorts are deploying AI to transform guest experience and operations:",
      useCases: [
        {
          title: "Multilingual WhatsApp Concierge",
          description: "AI handling guest inquiries about WiFi, checkout, halal dining, prayer direction, spa bookings, and local attractions in Arabic, English, Urdu, and Chinese—processing thousands of conversations daily for luxury hotels across Dubai, Riyadh, and Mecca without overwhelming staff."
        },
        {
          title: "Hajj/Umrah Dynamic Pricing",
          description: "AI automatically adjusting room rates for hotels in Mecca and Medina based on Hajj/Umrah calendar, pilgrim visa issuance rates, and competitor pricing—maximizing revenue during peak religious tourism seasons while remaining competitive."
        },
        {
          title: "Arabic Review Sentiment Analysis",
          description: "Monitoring Arabic-language reviews on Google Maps, Tripadvisor, and Booking.com—detecting complaint patterns about cleanliness, service, or prayer facilities and alerting management for immediate intervention before ratings drop."
        },
        {
          title: "Group Booking Automation",
          description: "AI chatbot handling wedding party inquiries, corporate event RFPs, and tour group bookings—collecting requirements, checking availability, generating quotes, and processing reservations with minimal human involvement."
        },
        {
          title: "Predictive Room Readiness",
          description: "ML models predicting exact checkout times and cleaning duration per room type—optimizing housekeeping schedules to have rooms ready for early check-ins without excess labor costs. Critical for high-turnover properties during peak seasons."
        }
      ],
      whyRaanzlrTitle: "Why GCC Hotels Choose Raanzlr",
      whyRaanzlr: [
        "True multilingual AI: Arabic (MSA + Gulf dialects), English, Chinese, Urdu, Tagalog, and more",
        "Deep understanding of regional hospitality nuances: halal dining, prayer facilities, Islamic etiquette",
        "Expertise with GCC seasonal patterns: Hajj/Umrah, Ramadan, Dubai Shopping Festival, F1 Grand Prix",
        "Integration experience with regional PMS and booking channels including Almosafer, Wego, Cleartrip",
        "Same-timezone support teams understanding local hospitality standards and guest expectations",
        "Data residency compliance for guest information under Saudi PDPL and UAE regulations"
      ],
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "Can the AI concierge respond in Arabic (Fusha and Gulf dialect) and handle Islamic etiquette questions like prayer direction and halal dining?",
          a: "Absolutely. Our models are trained on millions of GCC hospitality conversations including requests for prayer direction (Qibla), halal restaurant recommendations, prayer time schedules, and culturally appropriate local attractions. We achieve 95%+ accuracy on region-specific queries."
        },
        {
          q: "How does the system connect to our PMS (Opera, Amadeus, Hotelogix) and OTA channels?",
          a: "We provide pre-built connectors for major PMS platforms and OTA channels (Booking.com, Expedia, Agoda). Integration typically takes 2-4 weeks with bidirectional data flow for reservations, guest profiles, and revenue management."
        },
        {
          q: "Can the AI detect a negative review spike and alert management before it affects our rating?",
          a: "Yes. Our sentiment analysis monitors review velocity and sentiment shifts in real-time. If we detect 3+ negative reviews within 24 hours mentioning the same issue (e.g., 'slow check-in' or 'unclean rooms'), the system triggers immediate management alerts and suggests response templates."
        },
        {
          q: "What's the ROI timeline—when will reduced front-desk calls and upsell revenue cover the implementation cost?",
          a: "Most GCC hotels see ROI within 6-9 months. A 200-room property typically deflects 40-60% of front-desk inquiries to AI (saving 2-3 FTE), increases upsell conversion by 15-20%, and improves RevPAR by 5-10%—generating USD 150-300K annual benefit."
        }
      ],
      ctaTitle: "Ready to Transform Your Guest Experience?",
      ctaDescription: "Join the GCC hotels and resorts already leveraging AI to increase revenue, reduce costs, and deliver exceptional hospitality.",
      metaDescription: "AI & automation for GCC hospitality and tourism: multilingual AI concierge, dynamic pricing, review sentiment analysis, and smart reservations. Built for Saudi Arabia, UAE, and Middle East hotels and resorts.",
      keywords: "AI hospitality GCC, Saudi Arabia hotel automation, UAE tourism AI, multilingual concierge, dynamic pricing hotels, Hajj Umrah hotel AI, Arabic review analysis, Opera PMS integration"
    },
    ar: {
      name: "الضيافة والسياحة",
      heroTitle: "حلول ذكية ترتقي بتجربة الضيوف وتزيد كفاءة التشغيل",
      heroDescription: "ساعد فندقك أو منتجعك على تقديم خدمة أسرع وأكثر تخصيصاً، مع تقليل الأعباء التشغيلية وزيادة الإيرادات عبر حلول ذكية مصممة لقطاع الضيافة في السعودية والإمارات ودول الخليج.",
      overviewTitle: "مستقبل الضيافة يبدأ من تجربة ضيف أكثر ذكاءً",
      overviewParagraphs: [
        "يشهد قطاع الضيافة في الخليج نمواً متسارعاً مدفوعاً بالمشاريع السياحية الكبرى وارتفاع أعداد الزوار، ما يرفع توقعات الضيوف ويزيد الحاجة إلى تشغيل أكثر كفاءة.",
        "اليوم، لم يعد الضيف يبحث فقط عن غرفة مريحة، بل يتوقع خدمة سريعة، وتجربة شخصية، واستجابة فورية في أي وقت ومن أي قناة يفضلها.",
        "لهذا نبني حلولاً تساعد الفنادق والمنتجعات على أتمتة الخدمات اليومية، وتحسين إدارة الحجوزات، وتحليل آراء الضيوف، وتخصيص التجربة لكل نزيل، مع تكامل كامل مع أنظمة إدارة الفنادق والمنصات المستخدمة في المنطقة."
      ],
      keyAdvantages: [
        "تقليل الضغط على فرق الاستقبال وخدمة الضيوف بنسبة تصل إلى 50%",
        "زيادة الإيرادات عبر التسعير الديناميكي وإدارة أفضل للإشغال",
        "متابعة آراء النزلاء وتحليلها فورياً لتحسين جودة الخدمة",
        "تحسين كفاءة عمليات التدبير المنزلي وتقليل الوقت الضائع",
        "دعم متعدد اللغات لتقديم تجربة سلسة للضيوف من مختلف الجنسيات",
        "تكامل مع أشهر أنظمة إدارة الفنادق ومنصات الحجز"
      ],
      servicesTitle: "حلول الذكاء الاصطناعي للضيافة الحديثة",
      services: [
        {
          title: "كونسيرج رقمي متعدد اللغات",
          description: "قدّم لضيوفك خدمة متواصلة عبر واتساب أو الموقع الإلكتروني أو الأجهزة الذكية داخل الفندق، للإجابة عن الاستفسارات، واستقبال الطلبات، وتقديم التوصيات المحلية على مدار الساعة."
        },
        {
          title: "إدارة الإيرادات",
          description: "اضبط أسعار الغرف تلقائياً وفق معدلات الطلب، والأسعار المنافسة، والمواسم السياحية، والأحداث الكبرى لتحقيق أعلى عائد ممكن."
        },
        {
          title: "تحليل تقييمات الضيوف",
          description: "اجمع تقييمات الضيوف من مختلف المنصات في لوحة واحدة، واكتشف المشكلات المتكررة، وساعد الإدارة على الاستجابة بسرعة قبل تأثيرها على السمعة."
        },
        {
          title: "مساعد الحجز",
          description: "أتمت استقبال الحجوزات الفردية والجماعية، والإجابة عن الاستفسارات، واقتراح الترقيات والخدمات الإضافية بطريقة تزيد من قيمة كل حجز."
        },
        {
          title: "إدارة أعمال التدبير المنزلي",
          description: "خطط توزيع المهام اليومية اعتماداً على أوقات المغادرة والوصول وحالة الغرف، لرفع الكفاءة وتقليل وقت الانتظار."
        },
        {
          title: "تخصيص تجربة الضيف",
          description: "أنشئ ملفاً موحداً لكل ضيف يحفظ تفضيلاته السابقة، لتقديم تجربة أكثر خصوصية في كل زيارة."
        }
      ],
      useCasesTitle: "التطبيقات الواقعية",
      useCasesIntro: "كيف تنشر فنادق ومنتجعات الخليج الذكاء الاصطناعي لتحويل تجربة الضيوف والعمليات:",
      useCases: [
        {
          title: "خدمة الضيوف عبر واتساب",
          description: "يجيب النظام عن استفسارات النزلاء المتعلقة بالإقامة، والمرافق، والمطاعم، والخدمات، ويرسل التحديثات ويستقبل الطلبات على مدار الساعة."
        },
        {
          title: "التسعير الموسمي الذكي",
          description: "يضبط أسعار الغرف تلقائياً وفق مواسم الحج والعمرة، والعطل، والفعاليات، ومستوى الإشغال، لتحقيق أفضل عائد من كل غرفة."
        },
        {
          title: "تحليل تقييمات الضيوف",
          description: "يراقب جميع المراجعات المنشورة، ويكتشف المشكلات المتكررة، ويرسل تنبيهات للإدارة قبل أن تؤثر على تقييم الفندق."
        },
        {
          title: "أتمتة حجوزات المجموعات",
          description: "يستقبل طلبات الشركات والفعاليات والمجموعات السياحية، ويجمع المتطلبات، ويُنشئ العروض، ويتابع الحجز حتى إتمامه."
        },
        {
          title: "التنبؤ بجاهزية الغرف",
          description: "يتوقع مواعيد إخلاء الغرف وانتهاء أعمال التنظيف، ليساعد فريق التشغيل على تسريع تسجيل الوصول وتحسين استغلال الغرف."
        }
      ],
      whyRaanzlrTitle: "لماذا تختار فنادق الخليج Raanzlr",
      whyRaanzlr: [
        "حلول مصممة خصيصاً للفنادق والمنتجعات في السوق الخليجي",
        "دعم متعدد اللغات يشمل العربية والإنجليزية ولغات أخرى شائعة بين الزوار",
        "فهم لطبيعة الضيافة المحلية ومتطلبات الضيوف في المنطقة",
        "تكامل مع أنظمة إدارة الفنادق ومنصات الحجز الأكثر استخداماً",
        "تنفيذ ومتابعة مباشرة من فريق هندسي متخصص",
        "حلول قابلة للتوسع مع نمو الفندق أو المجموعة الفندقية"
      ],
      faqTitle: "الأسئلة الشائعة",
      faqs: [
        {
          q: "هل يمكن لكونسيرج الذكاء الاصطناعي الرد بالعربية (الفصحى واللهجة الخليجية) والتعامل مع أسئلة الآداب الإسلامية؟",
          a: "نعم. يستطيع النظام التفاعل بالعربية الفصحى واللهجات الخليجية والإنجليزية، كما يفهم طبيعة الاستفسارات المرتبطة بالإقامة، والمطاعم الحلال، وأوقات الصلاة، وغيرها من الخدمات التي يحتاجها ضيوف الفنادق في المنطقة."
        },
        {
          q: "كيف يتصل النظام بـ PMS (Opera، Amadeus، Hotelogix) وقنوات OTA؟",
          a: "يرتبط الحل مباشرة مع أشهر أنظمة إدارة الفنادق مثل Opera وAmadeus وHotelogix، ومع قنوات الحجز مثل Booking.com وExpedia وAgoda. يكتمل الربط عادةً خلال 2-4 أسابيع، وتتزامن بيانات الحجوزات وملفات الضيوف في الاتجاهين تلقائياً."
        },
        {
          q: "هل يمكن للذكاء الاصطناعي اكتشاف ارتفاع المراجعات السلبية وتنبيه الإدارة قبل أن يؤثر على التصنيف؟",
          a: "نعم. يتابع النظام المراجعات الجديدة لحظة نشرها، وإذا ظهرت 3 مراجعات سلبية أو أكثر خلال 24 ساعة حول المشكلة نفسها، يرسل تنبيهاً فورياً للإدارة مع اقتراح رد مناسب، لتتمكن من معالجة الموقف قبل تأثيره على تقييم الفندق."
        },
        {
          q: "ما هو الجدول الزمني لعائد الاستثمار؟ متى ستغطي المكالمات المخفضة وإيرادات البيع الإضافي تكلفة التنفيذ؟",
          a: "يحقق معظم الفنادق في الخليج عائد الاستثمار خلال 6-9 أشهر. فالفندق الذي يضم 200 غرفة يحوّل عادةً ما بين 40 و60% من استفسارات الاستقبال إلى النظام، ويرفع مبيعات الترقيات والخدمات الإضافية بنسبة تتراوح بين 15 و20%."
        }
      ],
      ctaTitle: "هل ترغب في تقديم تجربة ضيافة تترك أثراً لدى كل ضيف؟",
      ctaDescription: "حدثنا عن فندقك أو منشأتك، وسنقترح حلولاً تساعدك على رفع جودة الخدمة، وتحسين الكفاءة التشغيلية، وزيادة الإيرادات، مع تجربة أكثر سلاسة لضيوفك.",
      metaDescription: "الذكاء الاصطناعي والأتمتة للضيافة والسياحة في الخليج: كونسيرج ذكاء اصطناعي متعدد اللغات، التسعير الديناميكي، تحليل مشاعر المراجعات، والحجوزات الذكية. مصمم لفنادق ومنتجعات السعودية والإمارات والشرق الأوسط.",
      keywords: "الذكاء الاصطناعي للضيافة الخليج، أتمتة الفنادق السعودية، الذكاء الاصطناعي للسياحة الإماراتي، كونسيرج متعدد اللغات، التسعير الديناميكي للفنادق، ذكاء اصطناعي لفنادق الحج والعمرة، تحليل المراجعات العربية، تكامل Opera PMS"
    }
  },
  {
    slug: "legal",
    icon: Scale,
    heroImage: "/industries/legal.webp",
    en: {
      name: "Legal & Professional Services",
      heroTitle: "AI-Powered Legal Services for GCC Law Firms",
      heroDescription: "Transform your legal practice with intelligent automation that accelerates document review, streamlines client intake, and ensures compliance. Built for the evolving legal landscape of Saudi Arabia, UAE, and the wider GCC region.",
      overviewTitle: "Legal Intelligence Reimagined",
      overviewParagraphs: [
        "The GCC legal sector is experiencing rapid digital transformation. With global legal tech projected to grow from USD 25.28B (2024) to USD 119.22B (2033) at 18.7% CAGR, and Saudi Vision 2030 driving major legal reforms including new commercial courts and investment tribunals, AI adoption is accelerating across law firms.",
        "UAE's DIFC hosts 120+ leading international law firms, while Saudi Arabia has overhauled its legal system with new Companies Law (2022), PDPL (2023), and Investment Law creating massive compliance documentation demand. Firms that master AI-powered contract analysis, legal research, and client intake automation will capture premium work.",
        "Our solutions are built for GCC legal realities: Arabic-English bilingual contract analysis, legal research across Saudi Royal Decrees and UAE Federal Laws, client intake bots handling inquiries in Arabic and English, and compliance monitoring for rapidly changing GCC regulations."
      ],
      keyAdvantages: [
        "60-80% reduction in due diligence document review time",
        "70-90% faster legal research across GCC court decisions",
        "50-60% reduction in client intake administrative work",
        "40-50% decrease in billing disputes with automated time tracking",
        "Native Arabic and English support for bilingual contracts",
        "Integration with regional case management systems"
      ],
      servicesTitle: "AI Solutions for Modern Legal Practice",
      services: [
        {
          title: "Arabic Contract Analysis AI",
          description: "AI reviewing Arabic and English commercial contracts, flagging unusual clauses, missing provisions, and risk areas—used during M&A due diligence in KSA real estate and corporate transactions reducing review time by 60-80%."
        },
        {
          title: "Legal Research Assistant",
          description: "Searches and summarizes Saudi Royal Decrees, UAE Federal Laws, DIFC Court precedents in response to natural language queries in Arabic or English—providing answers in seconds vs. hours of manual research."
        },
        {
          title: "Client Intake Chatbot",
          description: "WhatsApp and web bot collecting client details, nature of dispute, relevant documents, and scheduling initial consultations—routing to appropriate practice groups (corporate, litigation, IP) automatically."
        },
        {
          title: "Regulatory Change Alert System",
          description: "Monitors Official Gazettes of KSA, UAE, Bahrain—auto-generating client bulletins when relevant laws change including new PDPL updates, corporate governance rules, or commercial regulations."
        },
        {
          title: "Automated Billing & Time Tracker",
          description: "Logs attorney activity (calls, documents reviewed, meetings, emails) automatically and generates itemized invoices in Arabic with VAT compliance—reducing billing disputes by 40-50%."
        },
        {
          title: "Due Diligence Automation",
          description: "AI processing thousands of Arabic/English documents during M&A, real estate transactions, or IPOs—extracting key terms, flagging issues, and creating summary reports in days vs. weeks."
        }
      ],
      useCasesTitle: "Real-World Applications",
      useCasesIntro: "How GCC law firms and legal departments are deploying AI to transform legal delivery:",
      useCases: [
        {
          title: "M&A Due Diligence Acceleration",
          description: "AI reviews 10,000+ pages of Arabic/English contracts, financial statements, and regulatory filings during Saudi real estate M&A—identifying material risks, unusual terms, and missing documents in 3 days vs. 3 weeks of manual review."
        },
        {
          title: "GCC Legal Research Engine",
          description: "Lawyer asks in Arabic or English: 'What are recent DIFC court rulings on force majeure in construction contracts?'—AI searches case database, extracts relevant precedents, and provides citations with key holdings summarized."
        },
        {
          title: "Client Intake & Routing Bot",
          description: "WhatsApp chatbot collects details about potential client's legal issue (commercial dispute, employment matter, IP infringement), uploads supporting documents, and routes to appropriate lawyer based on practice area and language preference."
        },
        {
          title: "PDPL Compliance Monitoring",
          description: "AI tracks changes to Saudi PDPL regulations, UAE data protection law updates, and industry guidance—alerting corporate clients when new obligations arise and auto-drafting compliance update memos."
        },
        {
          title: "Arabic Contract Drafting Assistant",
          description: "Lawyer provides parameters (Saudi commercial lease, 3-year term, retail space, variable rent)—AI generates first-draft Arabic contract following Saudi law templates, reducing drafting time from 4 hours to 30 minutes."
        }
      ],
      whyRaanzlrTitle: "Why GCC Law Firms Choose Raanzlr",
      whyRaanzlr: [
        "True bilingual AI: Handles Arabic legal language including Quranic legal phrasing and Saudi/UAE legal terminology",
        "Deep GCC legal knowledge: Trained on Saudi Royal Decrees, UAE Federal Laws, DIFC/ADGM precedents",
        "Compliance-first architecture: PDPL, UAE data protection law, and attorney-client privilege safeguards built-in",
        "Experience with regional legal systems: Saudi Sharia-influenced law, UAE civil law, DIFC common law",
        "Same-timezone delivery teams understanding local legal practice and court systems",
        "Data residency compliance for sensitive client matter information"
      ],
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "How accurately does the AI read and interpret Arabic legal language—can it handle Quranic or archaic legal phrasing?",
          a: "Our models are trained on millions of Arabic legal documents including Saudi Royal Decrees, UAE Federal Laws, and court judgments. We achieve 90%+ accuracy on formal Arabic legal text including traditional Islamic legal terminology. For highly specialized Quranic interpretation, we recommend human review."
        },
        {
          q: "Is the system compliant with Saudi PDPL and DIFC data protection requirements for client confidentiality?",
          a: "Absolutely. We implement data residency within Saudi Arabia and UAE, encrypt all client matter files, maintain comprehensive audit trails, and enforce role-based access controls aligned with attorney-client privilege requirements and PDPL/UAE data protection regulations."
        },
        {
          q: "Can it draft contracts under Saudi law specifically—not just adapt English-law templates?",
          a: "Yes. Our system is trained on thousands of Saudi commercial contracts and Royal Decree templates. It generates contracts following Saudi legal frameworks including Sharia-compliant provisions, Arabic-first formatting, and references to applicable Saudi regulations."
        },
        {
          q: "How does the AI stay updated with new KSA and UAE legislation as it's passed?",
          a: "We monitor Official Gazettes, government portals (Saudi Tadawul, UAE MOJ), and legal databases in real-time. When new laws are published, our system ingests them within 24-48 hours and updates contract templates and legal research databases automatically. Clients receive change notifications."
        }
      ],
      ctaTitle: "Ready to Transform Your Legal Practice?",
      ctaDescription: "Join the GCC law firms already leveraging AI to reduce costs, accelerate delivery, and provide better client service.",
      metaDescription: "AI & automation for GCC legal and professional services: contract analysis, legal research, client intake, and compliance monitoring. Built for Saudi Arabia, UAE, and Middle East law firms.",
      keywords: "AI legal GCC, Saudi Arabia law firm automation, UAE legal tech, Arabic contract analysis, PDPL compliance AI, DIFC legal research, Saudi Royal Decree search, legal AI Middle East"
    },
    ar: {
      name: "الخدمات القانونية والمهنية",
      heroTitle: "حلول الذكاء الاصطناعي لمكاتب المحاماة والخدمات القانونية في الخليج",
      heroDescription: "ارتقِ بكفاءة مكتبك القانوني عبر حلول ذكاء اصطناعي مصممة لبيئة العمل القانونية في السعودية والإمارات ودول الخليج. من مراجعة العقود والبحث القانوني إلى استقبال العملاء وأتمتة الإجراءات، نساعدك على تقليل الوقت المستغرق في المهام المتكررة مع الحفاظ على أعلى معايير الدقة والامتثال.",
      overviewTitle: "الذكاء الاصطناعي يعيد تعريف العمل القانوني",
      overviewParagraphs: [
        "يشهد القطاع القانوني في دول الخليج تحولاً متسارعاً نحو الرقمنة، مدفوعاً بالإصلاحات التشريعية، وتوسع الأنشطة التجارية، وارتفاع الطلب على خدمات قانونية أكثر سرعة وكفاءة. ومع هذا التطور، أصبحت أتمتة العمليات القانونية واستخدام الذكاء الاصطناعي من أهم عوامل تعزيز القدرة التنافسية لمكاتب المحاماة والإدارات القانونية.",
        "تم تصميم حلول Raanzlr خصيصاً لتلبية احتياجات البيئة القانونية الخليجية، مع دعم كامل للعربية والإنجليزية، وفهم لطبيعة الأنظمة القانونية في السعودية والإمارات، بما يشمل العقود، والأنظمة، واللوائح، والإجراءات التنظيمية.",
        "سواء كنت تدير مكتب محاماة، أو إدارة قانونية داخل شركة، أو تقدم خدمات استشارية، فإن حلولنا تساعدك على إنجاز العمل بسرعة أكبر، وتقليل الأخطاء، وتحسين تجربة العملاء دون المساس بسرية البيانات أو جودة المخرجات."
      ],
      keyAdvantages: [
        "تقليل وقت مراجعة العقود والوثائق القانونية بنسبة تصل إلى 80%",
        "تسريع البحث القانوني والوصول إلى الأنظمة واللوائح ذات الصلة خلال ثوانٍ",
        "أتمتة استقبال العملاء وجمع المعلومات الأولية قبل الاستشارة",
        "تحسين دقة إعداد الفواتير وتتبع ساعات العمل تلقائياً",
        "دعم احترافي للعقود والمراسلات القانونية باللغتين العربية والإنجليزية",
        "تكامل مرن مع أنظمة إدارة القضايا والملفات القانونية"
      ],
      servicesTitle: "حلول ذكاء اصطناعي متخصصة للمكاتب القانونية",
      services: [
        {
          title: "تحليل العقود بالذكاء الاصطناعي",
          description: "راجع العقود التجارية والاتفاقيات القانونية تلقائياً، مع اكتشاف البنود عالية المخاطر، والالتزامات غير الواضحة، والنواقص القانونية، مما يقلل وقت المراجعة ويرفع جودة التدقيق."
        },
        {
          title: "مساعد البحث القانوني",
          description: "ابحث في الأنظمة واللوائح والأحكام والسوابق القانونية باستخدام اللغة الطبيعية، واحصل على ملخصات دقيقة تساعد المحامين على الوصول للمعلومة بسرعة أكبر."
        },
        {
          title: "أتمتة استقبال العملاء",
          description: "روبوت ذكي عبر الموقع أو واتساب يجمع بيانات العميل، ويصنف نوع القضية، ويرفع المستندات المطلوبة، ثم يوجه الطلب مباشرة إلى المحامي أو القسم المختص."
        },
        {
          title: "مراقبة التحديثات التنظيمية",
          description: "تابع التغييرات في الأنظمة واللوائح بصورة مستمرة، واحصل على تنبيهات تلقائية عند صدور تشريعات أو تحديثات تؤثر على عملائك أو مجالات ممارستك."
        },
        {
          title: "إدارة الوقت والفوترة",
          description: "سجل ساعات العمل والأنشطة القانونية تلقائياً، وأنشئ فواتير دقيقة ومتوافقة مع متطلبات ضريبة القيمة المضافة دون الحاجة للإدخال اليدوي."
        },
        {
          title: "أتمتة العناية اللازمة (Due Diligence)",
          description: "حلل آلاف المستندات القانونية خلال صفقات الاستحواذ والاستثمار والعقارات، واستخرج البنود المهمة والمخاطر المحتملة في وقت قياسي."
        }
      ],
      useCasesTitle: "كيف تستفيد المكاتب القانونية من الذكاء الاصطناعي؟",
      useCasesIntro: "كيف تنشر مكاتب المحاماة الخليجية والإدارات القانونية الذكاء الاصطناعي لتحويل تقديم الخدمات القانونية:",
      useCases: [
        {
          title: "تسريع عمليات العناية الواجبة",
          description: "تحليل آلاف الصفحات من العقود والوثائق القانونية واستخراج المخاطر والبنود المهمة خلال أيام بدلاً من أسابيع."
        },
        {
          title: "البحث القانوني الذكي",
          description: "طرح الأسئلة القانونية باللغة العربية أو الإنجليزية والحصول على نتائج دقيقة مدعومة بالأنظمة والأحكام ذات الصلة."
        },
        {
          title: "استقبال العملاء آلياً",
          description: "جمع بيانات العملاء، وتصنيف القضايا، وجدولة الاجتماعات، وتحويل الطلبات إلى الفريق المختص دون تدخل يدوي."
        },
        {
          title: "متابعة الامتثال التنظيمي",
          description: "مراقبة التعديلات القانونية وإخطار الفرق القانونية والعملاء بأي تغييرات تؤثر على أعمالهم."
        },
        {
          title: "إنشاء مسودات العقود",
          description: "إعداد مسودات أولية للعقود التجارية وفق المتطلبات المدخلة، مع الالتزام بالصياغة القانونية المناسبة وقابلية التعديل من قبل المحامي."
        }
      ],
      whyRaanzlrTitle: "لماذا تختار Raanzlr؟",
      whyRaanzlr: [
        "حلول مصممة خصيصاً للقطاع القانوني في السعودية والإمارات ودول الخليج",
        "دعم احترافي للمحتوى القانوني بالعربية والإنجليزية",
        "أولوية كاملة لأمن البيانات وسرية ملفات العملاء",
        "توافق مع المتطلبات التنظيمية المحلية ومعايير الامتثال الحديثة",
        "إمكانية التكامل مع الأنظمة القانونية وأنظمة إدارة القضايا",
        "فريق متخصص يفهم طبيعة العمل القانوني ومتطلبات التحول الرقمي"
      ],
      faqTitle: "الأسئلة الشائعة",
      faqs: [
        {
          q: "ما مدى دقة الذكاء الاصطناعي في تحليل النصوص القانونية العربية؟",
          a: "يعتمد النظام على نماذج متقدمة مدربة على محتوى قانوني عربي وإنجليزي، مما يمكنه من فهم العقود والأنظمة والمصطلحات القانونية بدقة عالية، مع بقاء المراجعة النهائية بيد المحامي."
        },
        {
          q: "كيف يتم الحفاظ على سرية بيانات العملاء؟",
          a: "تطبق حلولنا أعلى معايير حماية البيانات، بما يشمل التشفير، وإدارة صلاحيات الوصول، وسجلات التدقيق، مع إمكانية استضافة البيانات بما يتوافق مع المتطلبات التنظيمية في المنطقة."
        },
        {
          q: "هل يمكن تخصيص الحل ليتوافق مع إجراءات مكتبنا؟",
          a: "نعم، يتم تخصيص الحلول بما يتناسب مع آلية العمل الداخلية، ونوع القضايا، ونماذج العقود، وسير العمل المعتمد داخل المكتب."
        },
        {
          q: "هل يمكن ربط النظام مع برامج إدارة القضايا الحالية؟",
          a: "نعم، يمكن دمج الحلول مع العديد من أنظمة إدارة القضايا والأنظمة الداخلية لتسهيل تبادل البيانات وأتمتة العمليات."
        }
      ],
      ctaTitle: "ابدأ رحلة التحول الرقمي لمكتبك القانوني",
      ctaDescription: "ساعد فريقك القانوني على إنجاز المزيد في وقت أقل من خلال حلول ذكاء اصطناعي مصممة خصيصاً للقطاع القانوني في الخليج. تواصل معنا لاكتشاف الحل الأنسب لاحتياجات مكتبك.",
      metaDescription: "الذكاء الاصطناعي والأتمتة للخدمات القانونية والمهنية في الخليج: تحليل العقود، البحث القانوني، استقبال العملاء، ومراقبة الامتثال. مصمم لمكاتب المحاماة في السعودية والإمارات والشرق الأوسط.",
      keywords: "الذكاء الاصطناعي القانوني الخليج، أتمتة مكاتب المحاماة السعودية، التكنولوجيا القانونية الإماراتية، تحليل العقود العربية، امتثال نظام حماية البيانات بالذكاء الاصطناعي، البحث القانوني لمركز دبي المالي، بحث المراسيم الملكية السعودية"
    }
  },
  {
    slug: "manufacturing",
    icon: Factory,
    heroImage: "/industries/manufacturing.webp",
    en: {
      name: "Manufacturing & Industry",
      heroTitle: "Industry 4.0 Transformation for GCC Manufacturing",
      heroDescription: "Accelerate your industrial operations with AI-powered quality control, predictive maintenance, and production optimization. Built for Saudi Vision 2030's NIDLP and UAE's Operation 300Bn manufacturing strategies.",
      overviewTitle: "Smart Manufacturing for the Middle East",
      overviewParagraphs: [
        "The GCC manufacturing sector is undergoing its most significant transformation in decades. Saudi Vision 2030 targets raising manufacturing's GDP contribution from 11% to 15% with USD 427B+ in industrial investments through the National Industrial Development and Logistics Program (NIDLP). The UAE's Operation 300Bn aims to triple manufacturing output to AED 300B by 2031 across 13 priority sectors.",
        "From SABIC's petrochemical complexes to Ras Al Khair's smart industrial zones, global AI in manufacturing is projected to grow from USD 4.6B (2023) to USD 20.8B (2028) at 35.2% CAGR. Computer vision quality inspection now achieves 90%+ defect detection rates, while predictive maintenance reduces unplanned downtime by 25-50%.",
        "Our solutions are engineered for GCC industrial realities: computer vision systems that work with existing production line cameras, predictive maintenance platforms with Arabic-language operator interfaces, and energy optimization AI trained on regional consumption patterns and subsidy structures."
      ],
      keyAdvantages: [
        "90%+ defect detection accuracy vs. human inspection",
        "25-50% reduction in unplanned equipment downtime",
        "10-20% decrease in industrial energy consumption",
        "15-30% extended equipment lifespan through predictive care",
        "30-40% faster production changeovers with AI scheduling",
        "Arabic-language interfaces for factory floor operators"
      ],
      servicesTitle: "AI Solutions for Modern Manufacturing",
      services: [
        {
          title: "Computer Vision Quality Control",
          description: "AI-powered visual inspection systems operating at production line speed, detecting surface defects, dimensional variations, and assembly errors that human inspectors miss—deployed across steel, aluminum, food, and packaging industries."
        },
        {
          title: "Predictive Maintenance Platform",
          description: "IoT sensor integration with machine learning models that predict equipment failures 2-4 weeks in advance, enabling scheduled maintenance during planned downtime and dramatically reducing emergency repairs."
        },
        {
          title: "AI Production Scheduling",
          description: "Intelligent scheduling engines analyzing order backlogs, machine availability, raw material stock, and shift patterns to generate optimal daily production plans—minimizing changeover waste and maximizing throughput."
        },
        {
          title: "Energy Consumption Optimizer",
          description: "Real-time monitoring and AI control of industrial chillers, furnaces, compressors, and HVAC systems—automatically adjusting setpoints to minimize kWh per unit of output while maintaining quality standards."
        },
        {
          title: "Supply Chain Risk Analytics",
          description: "AI monitoring of global supplier lead times, port delays, commodity prices, and geopolitical risks—alerting procurement teams and suggesting alternative sourcing strategies before shortages impact production."
        },
        {
          title: "Digital Twin Simulation",
          description: "Virtual replicas of production lines enabling manufacturers to test process changes, equipment upgrades, and new product introductions without disrupting live operations—reducing costly trial-and-error."
        }
      ],
      useCasesTitle: "Real-World Applications",
      useCasesIntro: "How GCC manufacturers are deploying AI to achieve Industry 4.0 transformation:",
      useCases: [
        {
          title: "Automated Defect Detection in Steel Production",
          description: "High-speed cameras with computer vision AI inspect steel coil surfaces at 100% inspection rate—detecting scratches, pitting, and coating defects in real-time. Deployed at Saudi steel facilities, reducing customer complaints by 75% and waste by 30%."
        },
        {
          title: "Predictive Maintenance for CNC Machining",
          description: "Vibration, temperature, and acoustic sensors on CNC machines feed ML models predicting bearing failures, spindle wear, and tool breakage 2-4 weeks ahead. Arabic-language mobile alerts enable maintenance teams to order parts and schedule repairs during planned downtime."
        },
        {
          title: "Smart Production Scheduling",
          description: "AI analyzes multi-week order pipeline, machine capacity constraints, raw material delivery schedules, and labor shift patterns to generate optimal production sequences—reducing changeover time by 35% and increasing OEE (Overall Equipment Effectiveness) from 65% to 82%."
        },
        {
          title: "Industrial Energy Optimization",
          description: "AI monitors chiller plants, compressor arrays, and furnace loads across a petrochemical complex in real-time. System automatically adjusts temperature setpoints, sequencing, and load distribution—achieving 15% energy cost reduction (USD 2.3M annual savings) without compromising product specifications."
        },
        {
          title: "Supply Chain Disruption Prevention",
          description: "AI tracks 200+ critical component suppliers across Asia, Europe, and North America—monitoring factory closures, port congestion, shipping delays, and commodity price spikes. System flagged Ukraine conflict risk 3 weeks before disruption, allowing procurement to secure alternative European suppliers."
        }
      ],
      whyRaanzlrTitle: "Why GCC Manufacturers Choose Raanzlr",
      whyRaanzlr: [
        "Legacy equipment integration: Works with existing production line cameras and PLC systems without full replacement",
        "Arabic-language operator interfaces: Dashboards, alerts, and maintenance instructions in Arabic for local workforce",
        "GCC energy subsidy awareness: Optimization models calibrated for regional energy pricing and subsidy structures",
        "NIDLP and Operation 300Bn alignment: Deep understanding of Saudi and UAE industrial development strategies",
        "Experience with regional manufacturers: SABIC, ADNOC, ALBA, Saudi steel and aluminum producers",
        "Sharia-compliant financing models: Compatible with Islamic financing structures for capital equipment investments"
      ],
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          q: "Can the computer vision system work on our existing production line cameras, or do we need new hardware?",
          a: "In most cases, we can integrate with existing industrial cameras (2MP+ resolution). For high-speed lines (>100 units/min) or microscopic defect detection, we may recommend camera upgrades. We conduct a free technical assessment of your current setup before proposing any hardware changes."
        },
        {
          q: "How long does it take to train the AI model on our specific products and defect types—and who does that work?",
          a: "Initial model training typically requires 2-4 weeks with 500-1,000 labeled images per defect category. Our data science team handles the training process working closely with your quality team to define acceptable vs. defective criteria. Once deployed, the model continuously improves through active learning."
        },
        {
          q: "Does the system support Arabic-language alerts and dashboards for our floor supervisors?",
          a: "Yes. All operator interfaces, maintenance alerts, production dashboards, and mobile notifications are fully bilingual (Arabic/English). Supervisors can switch language preference in settings. Technical documentation and training materials are also provided in both languages."
        },
        {
          q: "How do we prove ROI to leadership—what's a realistic timeline to see measurable downtime reduction?",
          a: "Typical ROI timeline for predictive maintenance is 6-12 months. We establish baseline metrics (Mean Time Between Failures, unplanned downtime hours, emergency repair costs) pre-deployment, then track improvements monthly. Most clients see 15-25% downtime reduction within 6 months, with full 25-50% improvement by month 12 as models learn equipment-specific failure patterns."
        }
      ],
      ctaTitle: "Ready to Transform Your Manufacturing Operations?",
      ctaDescription: "Join the GCC manufacturers already leveraging Industry 4.0 AI to reduce costs, improve quality, and accelerate Saudi Vision 2030 and UAE Operation 300Bn goals.",
      metaDescription: "Industry 4.0 AI solutions for GCC manufacturing: computer vision quality control, predictive maintenance, production scheduling, and energy optimization. Built for Saudi NIDLP and UAE Operation 300Bn strategies.",
      keywords: "AI manufacturing GCC, Saudi Arabia Industry 4.0, UAE smart factory, NIDLP industrial AI, computer vision quality control, predictive maintenance Middle East, SABIC AI automation, Saudi Vision 2030 manufacturing"
    },
    ar: {
      name: "التصنيع والصناعة",
      heroTitle: "حلول الذكاء الاصطناعي للتصنيع والصناعة الذكية في الخليج",
      heroDescription: "طوّر عملياتك الصناعية باستخدام حلول ذكاء اصطناعي تساعدك على رفع جودة الإنتاج، وتقليل الأعطال، وتحسين كفاءة خطوط التصنيع، وخفض استهلاك الطاقة. صُممت حلولنا لتلبية احتياجات المصانع والمنشآت الصناعية في السعودية والإمارات ودول الخليج، مع قابلية التكامل مع الأنظمة والمعدات الحالية.",
      overviewTitle: "التحول نحو مصانع أكثر ذكاءً وكفاءة",
      overviewParagraphs: [
        "يشهد قطاع التصنيع في الخليج تحولاً متسارعاً نحو تبني تقنيات الثورة الصناعية الرابعة، مدفوعاً بالمبادرات الوطنية والاستثمارات الكبيرة في تطوير القطاع الصناعي. ومع تزايد المنافسة وارتفاع متطلبات الجودة والإنتاجية، أصبح الذكاء الاصطناعي أحد أهم الأدوات التي تساعد المصانع على تحسين الأداء وتقليل التكاليف التشغيلية.",
        "تقدم Raanzlr حلولاً ذكية تساعد المنشآت الصناعية على مراقبة الجودة، والتنبؤ بالأعطال قبل حدوثها، وتحسين استهلاك الطاقة، وإدارة الإنتاج بصورة أكثر دقة وكفاءة. كما تتميز حلولنا بسهولة التكامل مع البنية التحتية الحالية دون الحاجة إلى تغييرات جذرية في خطوط الإنتاج.",
        "سواء كنت تدير مصنعاً للمواد الغذائية، أو المعادن، أو البتروكيماويات، أو الصناعات التحويلية، فإن حلولنا تساعدك على رفع الإنتاجية وتحسين جودة المنتجات وتقليل فترات التوقف غير المخطط لها."
      ],
      keyAdvantages: [
        "رفع دقة اكتشاف العيوب وتحسين جودة المنتجات",
        "تقليل الأعطال المفاجئة من خلال الصيانة التنبؤية",
        "تحسين كفاءة خطوط الإنتاج وزيادة الإنتاجية",
        "خفض استهلاك الطاقة وتقليل التكاليف التشغيلية",
        "دعم لوحات التحكم والتنبيهات باللغتين العربية والإنجليزية",
        "تكامل مرن مع المعدات والأنظمة الصناعية الحالية"
      ],
      servicesTitle: "حلول ذكاء اصطناعي متقدمة للمصانع والمنشآت الصناعية",
      services: [
        {
          title: "مراقبة الجودة بالرؤية الحاسوبية",
          description: "استخدم تقنيات الرؤية الحاسوبية لفحص المنتجات بشكل آلي أثناء الإنتاج، واكتشاف العيوب والانحرافات بدقة عالية دون التأثير على سرعة التشغيل."
        },
        {
          title: "الصيانة التنبؤية",
          description: "حلل بيانات المعدات وأجهزة الاستشعار للتنبؤ بالأعطال قبل وقوعها، مما يساعد فرق الصيانة على التخطيط المسبق وتقليل التوقفات المفاجئة."
        },
        {
          title: "جدولة الإنتاج الذكية",
          description: "أنشئ جداول إنتاج أكثر كفاءة اعتماداً على الطاقة الإنتاجية، وتوفر المواد الخام، وأولويات الطلبات، بما يحقق أفضل استغلال للموارد."
        },
        {
          title: "تحسين استهلاك الطاقة",
          description: "راقب استهلاك الطاقة في الوقت الفعلي، واستخدم الذكاء الاصطناعي لتحديد فرص التوفير وتحسين تشغيل المعدات دون التأثير على جودة الإنتاج."
        },
        {
          title: "تحليلات سلسلة التوريد",
          description: "راقب أداء الموردين وسلاسل الإمداد، واكتشف المخاطر المحتملة مبكراً لاتخاذ قرارات أسرع والحفاظ على استمرارية الإنتاج."
        },
        {
          title: "التوأم الرقمي",
          description: "أنشئ نموذجاً رقمياً لخطوط الإنتاج يسمح بمحاكاة التعديلات والسيناريوهات المختلفة قبل تنفيذها على أرض الواقع، مما يقلل المخاطر ويزيد كفاءة التطوير."
        }
      ],
      useCasesTitle: "كيف تستفيد المصانع من الذكاء الاصطناعي؟",
      useCasesIntro: "كيف ينشر المصنعون الخليجيون الذكاء الاصطناعي لتحقيق تحول الصناعة 4.0:",
      useCases: [
        {
          title: "الفحص الآلي للمنتجات",
          description: "اكتشاف العيوب في المنتجات أثناء التصنيع باستخدام الرؤية الحاسوبية، مما يرفع جودة الإنتاج ويقلل نسبة الهدر والشكاوى."
        },
        {
          title: "التنبؤ بأعطال المعدات",
          description: "تحليل بيانات التشغيل للتعرف على مؤشرات الأعطال المحتملة وإجراء الصيانة قبل توقف المعدات."
        },
        {
          title: "تحسين خطط الإنتاج",
          description: "تنظيم جداول التشغيل وفق الطلبات والموارد المتاحة لزيادة الإنتاجية وتقليل أوقات التبديل بين المنتجات."
        },
        {
          title: "إدارة استهلاك الطاقة",
          description: "تحليل استهلاك الكهرباء والطاقة الصناعية واقتراح تحسينات تقلل التكاليف وتحافظ على كفاءة التشغيل."
        },
        {
          title: "تحسين سلسلة الإمداد",
          description: "متابعة أداء الموردين وحركة المواد الخام واكتشاف المخاطر التي قد تؤثر على الإنتاج قبل حدوثها."
        }
      ],
      whyRaanzlrTitle: "لماذا تختار Raanzlr؟",
      whyRaanzlr: [
        "حلول مصممة لتلبية احتياجات المصانع والمنشآت الصناعية في الخليج",
        "إمكانية التكامل مع المعدات الحالية دون الحاجة إلى استبدالها",
        "دعم كامل للعربية والإنجليزية في لوحات التحكم والتنبيهات",
        "خبرة في تطبيقات الذكاء الاصطناعي الخاصة بالتصنيع والجودة والصيانة",
        "حلول قابلة للتوسع بما يتناسب مع حجم المصنع وخطط النمو المستقبلية",
        "التزام بأفضل ممارسات أمن البيانات واستمرارية التشغيل"
      ],
      faqTitle: "الأسئلة الشائعة",
      faqs: [
        {
          q: "هل يمكن دمج الحلول مع المعدات الموجودة حالياً في المصنع؟",
          a: "نعم، صُممت حلولنا لتتكامل مع معظم أنظمة التشغيل والمعدات الصناعية الحالية، مما يتيح الاستفادة من الذكاء الاصطناعي دون الحاجة إلى استبدال البنية التحتية القائمة."
        },
        {
          q: "كم يستغرق تنفيذ المشروع؟",
          a: "تختلف مدة التنفيذ حسب حجم المنشأة وطبيعة الحل المطلوب، إلا أننا نعمل على تنفيذ المشاريع تدريجياً لضمان استمرارية الإنتاج وتقليل أي تأثير على العمليات اليومية."
        },
        {
          q: "هل تدعم الأنظمة اللغة العربية؟",
          a: "نعم، جميع لوحات التحكم والتنبيهات والتقارير متوفرة باللغتين العربية والإنجليزية لتسهيل الاستخدام من قبل فرق التشغيل والإدارة."
        },
        {
          q: "كيف يمكن قياس العائد على الاستثمار؟",
          a: "نعتمد مؤشرات أداء واضحة مثل تقليل الأعطال، وتحسين الإنتاجية، وخفض استهلاك الطاقة، وتقليل الهدر، مع تقديم تقارير دورية توضح النتائج المحققة بعد تطبيق الحلول."
        }
      ],
      ctaTitle: "ابدأ رحلة التحول نحو التصنيع الذكي",
      ctaDescription: "اكتشف كيف يمكن لحلول الذكاء الاصطناعي أن تساعد منشأتك الصناعية على رفع الإنتاجية، وتحسين الجودة، وتقليل التكاليف التشغيلية. تواصل معنا اليوم لبناء حل يناسب احتياجات مصنعك.",
      metaDescription: "حلول ذكاء الصناعة 4.0 للتصنيع الخليجي: مراقبة الجودة بالرؤية الحاسوبية، الصيانة التنبؤية، جدولة الإنتاج، وتحسين الطاقة. مصممة لبرنامج التنمية الصناعية السعودي واستراتيجية عملية 300 مليار الإماراتية.",
      keywords: "الذكاء الاصطناعي للتصنيع الخليج، الصناعة 4.0 السعودية، المصنع الذكي الإمارات، الذكاء الاصطناعي الصناعي لبرنامج التنمية، مراقبة الجودة بالرؤية الحاسوبية، الصيانة التنبؤية الشرق الأوسط، أتمتة سابك بالذكاء الاصطناعي"
    }
  },
];
