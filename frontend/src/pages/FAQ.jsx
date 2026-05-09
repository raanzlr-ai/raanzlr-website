import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { HelpCircle, Search, ChevronDown } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import SEO from "../components/SEO";

const FAQ = () => {
  const { t, isAr } = useLang();
  const [searchQuery, setSearchQuery] = useState("");

  const faqData = isAr ? {
    services: {
      title: "الخدمات",
      questions: [
        {
          q: "ما هي الخدمات التي تقدمها Raanzlr؟",
          a: "نقدم مجموعة شاملة من خدمات هندسة البرمجيات والذكاء الاصطناعي، بما في ذلك: تطوير وكلاء الذكاء الاصطناعي وروبوتات المحادثة، أتمتة سير العمل، تطوير مواقع الويب وتطبيقات الهاتف المحمول، حلول الذكاء الاصطناعي المخصصة، تكامل الأنظمة وواجهات برمجة التطبيقات، تصميم واجهات المستخدم وتجربة المستخدم، والتدقيق التقني والاستشارات.",
        },
        {
          q: "هل تدعمون اللغة العربية في مشاريعكم؟",
          a: "نعم، بالتأكيد! نحن متخصصون في بناء حلول متعددة اللغات مع دعم كامل للغة العربية (RTL)، الإنجليزية، والتركية. جميع منتجاتنا مصممة لتعمل بسلاسة مع اللغات التي تستخدمها أسواقك المستهدفة.",
        },
        {
          q: "ما الفرق بين روبوتات المحادثة العادية ووكلاء الذكاء الاصطناعي؟",
          a: "روبوتات المحادثة التقليدية تعتمد على قواعد محددة مسبقاً وردود جاهزة. أما وكلاء الذكاء الاصطناعي التي نطورها فهي تستخدم نماذج لغوية متقدمة (LLMs) لفهم السياق، والتعلم من المحادثات، والتكامل مع أنظمتك الحالية لتقديم تجربة ذكية وشخصية حقيقية.",
        },
        {
          q: "هل يمكنكم التكامل مع أنظمتنا الحالية؟",
          a: "نعم، نتخصص في تكامل الأنظمة. نربط حلولنا مع منصات CRM (HubSpot، Salesforce، Zoho)، أنظمة ERP، قواعد البيانات، وأي واجهات برمجة تطبيقات (APIs) مخصصة. نضمن تدفق البيانات بسلاسة بين جميع أدواتك.",
        },
      ],
    },
    pricing: {
      title: "التسعير والميزانية",
      questions: [
        {
          q: "كيف تحددون أسعار مشاريعكم؟",
          a: "نحدد الأسعار بناءً على نطاق المشروع، التعقيد، الجدول الزمني، والتقنيات المطلوبة. بعد مناقشة متطلباتك، نقدم عرض أسعار شفاف ومفصل يوضح التكاليف والتسليمات والمعالم الرئيسية. نقدم أيضاً خيارات دفع مرنة على مراحل.",
        },
        {
          q: "ما هو متوسط تكلفة مشروع روبوت محادثة ذكي؟",
          a: "تتراوح تكلفة روبوت محادثة ذكي أساسي من $5,000 إلى $15,000، بينما الحلول المتقدمة مع تكامل CRM وتدريب مخصص قد تتراوح من $15,000 إلى $50,000+. نقدم استشارة مجانية لتقييم احتياجاتك وتقديم تقدير دقيق.",
        },
        {
          q: "هل تقدمون خطط دفع شهرية أو اشتراكات؟",
          a: "نعم، نقدم نماذج تسعير مرنة. للمشاريع الكبيرة، نقدم دفعات على مراحل (30-50% مقدماً، والباقي على المعالم). كما نقدم عقود صيانة ودعم شهرية بعد إطلاق المشروع لضمان استمرارية الأداء الأمثل.",
        },
        {
          q: "هل هناك تكاليف خفية أو رسوم إضافية؟",
          a: "لا، نحن نؤمن بالشفافية الكاملة. جميع التكاليف (التطوير، الاستضافة، التراخيص، الخدمات الخارجية) يتم توضيحها بوضوح في عرض الأسعار. أي تغييرات في النطاق يتم مناقشتها والموافقة عليها كتابياً قبل تطبيقها.",
        },
      ],
    },
    process: {
      title: "العملية والجدول الزمني",
      questions: [
        {
          q: "كم من الوقت يستغرق إنجاز مشروع نموذجي؟",
          a: "يعتمد ذلك على نطاق المشروع. روبوت محادثة بسيط: 2-4 أسابيع. موقع ويب متوسط التعقيد: 4-8 أسابيع. تطبيق جوال كامل: 8-16 أسبوعاً. حلول الذكاء الاصطناعي المخصصة: 6-12 أسبوعاً. نقدم جدولاً زمنياً مفصلاً مع معالم واضحة في بداية كل مشروع.",
        },
        {
          q: "كيف تبدو عملية التطوير لديكم؟",
          a: "نتبع منهجية Agile: (1) الاكتشاف والتخطيط - نفهم متطلباتك وأهدافك. (2) التصميم والنماذج الأولية - نصمم واجهات المستخدم ونحصل على موافقتك. (3) التطوير التكراري - نبني المشروع على مراحل مع مراجعات دورية. (4) الاختبار والضمان - نختبر بدقة قبل الإطلاق. (5) الإطلاق والدعم - نطلق المشروع ونقدم دعماً مستمراً.",
        },
        {
          q: "هل يمكنني طلب تعديلات أثناء التطوير؟",
          a: "نعم، نرحب بالملاحظات والتعديلات! نقدم جولات مراجعة منتظمة في كل مرحلة. التعديلات الصغيرة ضمن النطاق المتفق عليه مشمولة. التغييرات الكبيرة في النطاق يتم تقييمها وتسعيرها بشكل منفصل لضمان الشفافية.",
        },
        {
          q: "ماذا يحدث بعد إطلاق المشروع؟",
          a: "نقدم فترة ضمان (عادةً 30-90 يوماً) لإصلاح أي أخطاء أو مشاكل. بعد ذلك، نقدم عقود صيانة ودعم اختيارية تشمل: التحديثات الأمنية، إضافة ميزات جديدة، الدعم الفني، والمراقبة المستمرة للأداء.",
        },
      ],
    },
    support: {
      title: "الدعم والتواصل",
      questions: [
        {
          q: "كيف يمكنني التواصل معكم لبدء مشروع؟",
          a: "يمكنك التواصل معنا عبر نموذج الاتصال على موقعنا، أو مراسلتنا مباشرة على contact@raanzlr.com. سيقوم أحد مهندسينا بمراجعة طلبك والرد عليك خلال 24 ساعة عمل لجدولة استشارة مجانية.",
        },
        {
          q: "هل تقدمون استشارات مجانية؟",
          a: "نعم! نقدم استشارة أولية مجانية (30-45 دقيقة) لفهم احتياجاتك، مناقشة الحلول الممكنة، وتقديم تقدير أولي للتكلفة والجدول الزمني. لا يوجد أي التزام، ونحن سعداء بمشاركة خبرتنا.",
        },
        {
          q: "في أي مناطق زمنية تعملون؟",
          a: "مقرنا الرئيسي في نيوجيرسي، الولايات المتحدة (EST/EDT)، ولدينا فرق موزعة في الشرق الأوسط (GST/AST) وأوروبا (CET/EET). نحن نعمل بمرونة لنتناسب مع منطقتك الزمنية ونضمن تواصلاً سلساً.",
        },
        {
          q: "ما هي لغات التواصل التي تدعمونها؟",
          a: "نتحدث بطلاقة العربية، الإنجليزية، والتركية. جميع اجتماعاتنا، وثائقنا، ودعمنا متوفرة باللغة التي تفضلها لضمان تواصل واضح وفعال طوال المشروع.",
        },
      ],
    },
  } : {
    services: {
      title: "Services",
      questions: [
        {
          q: "What services does Raanzlr offer?",
          a: "We offer a comprehensive range of software engineering and AI services, including: AI agents & chatbot development, workflow automation, web & mobile app development, custom AI solutions, systems integration & APIs, UI/UX design, and technical audits & consulting.",
        },
        {
          q: "Do you support Arabic in your projects?",
          a: "Absolutely! We specialize in building multilingual solutions with full support for Arabic (RTL), English, and Turkish. All our products are designed to work seamlessly with the languages your target markets use.",
        },
        {
          q: "What's the difference between regular chatbots and AI agents?",
          a: "Traditional chatbots rely on predefined rules and canned responses. The AI agents we develop use advanced language models (LLMs) to understand context, learn from conversations, and integrate with your existing systems to provide a truly intelligent and personalized experience.",
        },
        {
          q: "Can you integrate with our existing systems?",
          a: "Yes, we specialize in systems integration. We connect our solutions with CRM platforms (HubSpot, Salesforce, Zoho), ERP systems, databases, and any custom APIs. We ensure seamless data flow between all your tools.",
        },
      ],
    },
    pricing: {
      title: "Pricing & Budget",
      questions: [
        {
          q: "How do you price your projects?",
          a: "We price based on project scope, complexity, timeline, and required technologies. After discussing your requirements, we provide a transparent, detailed quote outlining costs, deliverables, and milestones. We also offer flexible payment options in stages.",
        },
        {
          q: "What's the average cost of an AI chatbot project?",
          a: "A basic AI chatbot ranges from $5,000 to $15,000, while advanced solutions with CRM integration and custom training can range from $15,000 to $50,000+. We offer a free consultation to assess your needs and provide an accurate estimate.",
        },
        {
          q: "Do you offer monthly payment plans or subscriptions?",
          a: "Yes, we offer flexible pricing models. For larger projects, we provide milestone-based payments (30-50% upfront, remainder on milestones). We also offer monthly maintenance and support contracts after project launch to ensure optimal performance.",
        },
        {
          q: "Are there any hidden costs or additional fees?",
          a: "No, we believe in complete transparency. All costs (development, hosting, licenses, third-party services) are clearly outlined in the quote. Any scope changes are discussed and approved in writing before implementation.",
        },
      ],
    },
    process: {
      title: "Process & Timeline",
      questions: [
        {
          q: "How long does a typical project take?",
          a: "It depends on project scope. Simple chatbot: 2-4 weeks. Medium-complexity website: 4-8 weeks. Full mobile app: 8-16 weeks. Custom AI solutions: 6-12 weeks. We provide a detailed timeline with clear milestones at the start of each project.",
        },
        {
          q: "What does your development process look like?",
          a: "We follow an Agile methodology: (1) Discovery & Planning - we understand your requirements and goals. (2) Design & Prototyping - we design UI/UX and get your approval. (3) Iterative Development - we build in stages with regular reviews. (4) Testing & QA - we test rigorously before launch. (5) Launch & Support - we deploy and provide ongoing support.",
        },
        {
          q: "Can I request changes during development?",
          a: "Yes, we welcome feedback and revisions! We provide regular review cycles at each stage. Minor adjustments within the agreed scope are included. Major scope changes are assessed and priced separately to ensure transparency.",
        },
        {
          q: "What happens after the project launches?",
          a: "We provide a warranty period (typically 30-90 days) to fix any bugs or issues. After that, we offer optional maintenance and support contracts that include: security updates, new feature additions, technical support, and ongoing performance monitoring.",
        },
      ],
    },
    support: {
      title: "Support & Communication",
      questions: [
        {
          q: "How can I get in touch to start a project?",
          a: "You can reach us through the contact form on our website, or email us directly at contact@raanzlr.com. One of our engineers will review your request and respond within 24 business hours to schedule a free consultation.",
        },
        {
          q: "Do you offer free consultations?",
          a: "Yes! We offer a free initial consultation (30-45 minutes) to understand your needs, discuss possible solutions, and provide a preliminary cost and timeline estimate. No obligation, and we're happy to share our expertise.",
        },
        {
          q: "What time zones do you operate in?",
          a: "Our headquarters is in New Jersey, USA (EST/EDT), and we have distributed teams in the Middle East (GST/AST) and Europe (CET/EET). We work flexibly to accommodate your time zone and ensure smooth communication.",
        },
        {
          q: "What languages do you support for communication?",
          a: "We are fluent in Arabic, English, and Turkish. All our meetings, documentation, and support are available in your preferred language to ensure clear and effective communication throughout the project.",
        },
      ],
    },
  };

  // Flatten all questions for search
  const allQuestions = useMemo(() => {
    return Object.entries(faqData).flatMap(([categoryKey, category]) =>
      category.questions.map((q, idx) => ({
        ...q,
        category: category.title,
        categoryKey,
        id: `${categoryKey}-${idx}`,
      }))
    );
  }, [faqData]);

  // Filter questions based on search
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return allQuestions;
    const query = searchQuery.toLowerCase();
    return allQuestions.filter(
      (item) =>
        item.q.toLowerCase().includes(query) ||
        item.a.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [searchQuery, allQuestions]);

  // Group filtered questions by category
  const groupedFiltered = useMemo(() => {
    const grouped = {};
    filteredQuestions.forEach((q) => {
      if (!grouped[q.categoryKey]) {
        grouped[q.categoryKey] = {
          title: q.category,
          questions: [],
        };
      }
      grouped[q.categoryKey].questions.push(q);
    });
    return grouped;
  }, [filteredQuestions]);

  // JSON-LD Structured Data for FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allQuestions.map((q) => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.a,
      },
    })),
  };

  return (
    <div data-testid="faq-page" className="relative">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <SEO
        title={isAr ? "الأسئلة الشائعة — Raanzlr" : "Frequently Asked Questions — Raanzlr"}
        description={isAr ? "إجابات على الأسئلة الأكثر شيوعاً حول خدمات Raanzlr، التسعير، العملية، والدعم." : "Answers to the most common questions about Raanzlr's services, pricing, process, and support."}
        path="/faq"
      />

      {/* HERO */}
      <section data-testid="faq-hero" className="relative min-h-[60vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="noise absolute inset-0" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-[10px] sm:text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            {isAr ? "الأسئلة الشائعة" : "FAQ"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome"
          >
            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/65"
          >
            {isAr
              ? "إجابات سريعة وواضحة على الأسئلة الأكثر شيوعاً حول خدماتنا، التسعير، العملية، والدعم."
              : "Quick, clear answers to the most common questions about our services, pricing, process, and support."}
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder={isAr ? "ابحث في الأسئلة..." : "Search questions..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/15 bg-white/[0.02] px-12 rtl:px-12 py-4 text-white placeholder:text-white/40 focus:border-cyan-400/50 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 rtl:right-auto rtl:left-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-white/50">
                {filteredQuestions.length} {isAr ? "نتيجة" : "result(s)"} {isAr ? "لـ" : "for"} "{searchQuery}"
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <PulseDivider />

      {/* FAQ CONTENT */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {Object.keys(groupedFiltered).length === 0 ? (
            <Reveal>
              <div className="text-center py-16">
                <HelpCircle className="h-16 w-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 text-lg">
                  {isAr ? "لم يتم العثور على نتائج. جرب كلمات بحث مختلفة." : "No results found. Try different search terms."}
                </p>
              </div>
            </Reveal>
          ) : (
            <Stagger className="space-y-12">
              {Object.entries(groupedFiltered).map(([categoryKey, category]) => (
                <StaggerItem key={categoryKey}>
                  <div>
                    <h2 className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-6">
                      {category.title}
                    </h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((item) => (
                        <AccordionItem
                          key={item.id}
                          value={item.id}
                          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/30 transition-colors"
                        >
                          <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                          <AccordionTrigger className="relative px-6 py-5 text-left rtl:text-right hover:no-underline [&[data-state=open]>svg]:rotate-180">
                            <span className="font-display text-lg sm:text-xl font-semibold text-white pr-8 rtl:pr-0 rtl:pl-8">
                              {item.q}
                            </span>
                            <ChevronDown className="h-5 w-5 text-cyan-300 shrink-0 transition-transform duration-200 absolute right-6 rtl:right-auto rtl:left-6 top-1/2 -translate-y-1/2" />
                          </AccordionTrigger>
                          <AccordionContent className="relative px-6 pb-5 text-white/70 leading-relaxed">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {/* CTA */}
          <Reveal delay={0.4}>
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col items-center gap-6 rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8 sm:p-10">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-chrome">
                  {isAr ? "لم تجد إجابتك؟" : "Didn't Find Your Answer?"}
                </h3>
                <p className="text-white/60 max-w-md">
                  {isAr
                    ? "إذا كان لديك سؤال لم يتم تغطيته هنا، لا تتردد في التواصل معنا. سنكون سعداء بمساعدتك."
                    : "If you have a question that's not covered here, don't hesitate to reach out. We're happy to help."}
                </p>
                <MagneticButton to="/contact" testId="faq-cta-contact">
                  {isAr ? "تواصل معنا" : "Contact Us"}
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
