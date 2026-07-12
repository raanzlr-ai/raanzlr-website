import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Search, ChevronDown } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";

interface FAQ { q: string; a: string; }
interface FAQCat { title: string; questions: FAQ[]; }

export default function FAQ() {
  const { t, isAr } = useLang();
  const [searchQuery, setSearchQuery] = useState("");

  const faqData: Record<string, FAQCat> = useMemo(() => isAr ? {
    services: { title: "الخدمات", questions: [
      { q: "ما الخدمات التي تقدمها Raanzlr؟", a: "نطوّر حلولاً برمجية مخصصة تعتمد على الذكاء الاصطناعي، تشمل وكلاء الذكاء الاصطناعي، روبوتات المحادثة، أتمتة العمليات، تطوير تطبيقات الويب والجوال، ربط الأنظمة المختلفة، بالإضافة إلى بناء حلول ذكاء اصطناعي مخصصة تعتمد على بيانات شركتك وآليات عملها." },
      { q: "هل تدعمون اللغة العربية في مشاريعكم؟", a: "نعم. نصمم حلولاً تدعم العربية والإنجليزية والتركية بشكل أصلي، مع دعم كامل لاتجاه الكتابة من اليمين إلى اليسار، وواجهات وتجربة استخدام تبدو طبيعية للمستخدم العربي، وليست مجرد ترجمة." },
      { q: "ما الفرق بين روبوتات المحادثة التقليدية ووكلاء الذكاء الاصطناعي؟", a: "روبوتات المحادثة التقليدية تعتمد على قواعد ومسارات محددة مسبقاً، بينما يستطيع وكيل الذكاء الاصطناعي فهم السياق، الاستفادة من بيانات شركتك، وتنفيذ إجراءات داخل أنظمتك مثل إنشاء الحجوزات، تحديث بيانات العملاء، أو تنفيذ المهام المختلفة دون تدخل يدوي." },
      { q: "هل يمكنكم التكامل مع الأنظمة التي نستخدمها حالياً؟", a: "بالتأكيد. نتخصص في ربط حلولنا مع أنظمة إدارة العملاء (CRM)، تخطيط الموارد (ERP)، قواعد البيانات، منصات التجارة الإلكترونية، أدوات الدعم، إضافة إلى أي واجهات برمجية (APIs) تعتمد عليها شركتك." },
      { q: "هل تعملون على تطوير أنظمتنا الحالية أم تفضّلون البدء من الصفر؟", a: "يعتمد ذلك على وضعك الحالي. نبدأ دائماً بمراجعة البنية التقنية الموجودة لتقييم ما يمكن الاستفادة منه وما يحتاج إلى تطوير أو إعادة بناء. في كثير من الحالات يكون تحسين النظام الحالي أكثر جدوى من استبداله بالكامل، وسنوصيك بالخيار الأنسب بناءً على احتياجات المشروع." },
      { q: "هل تعملون مع الشركات الكبيرة فقط؟", a: "لا. نعمل مع الشركات الناشئة، الشركات الصغيرة والمتوسطة، وكذلك المؤسسات الكبيرة. ما يهمنا هو وجود تحدٍ حقيقي يمكن للتقنية أن تساعد في حله، بغض النظر عن حجم الشركة." },
    ]},
    pricing: { title: "التسعير والميزانية", questions: [
      { q: "كيف يتم تسعير المشاريع؟", a: "يعتمد التسعير على نطاق العمل، مستوى التعقيد، التكاملات المطلوبة، والجدول الزمني للتنفيذ. بعد مرحلة الاكتشاف ستحصل على عرض واضح يوضح ما يشمله المشروع وما لا يشمله، مع تفاصيل التكلفة بالكامل." },
      { q: "ما تكلفة مشروع روبوت محادثة ذكي؟", a: "تبدأ المشاريع البسيطة عادة من نحو 5,000 دولار، وقد تصل إلى 15,000 دولار أو أكثر بحسب حجم قاعدة المعرفة، عدد التكاملات، والوظائف المطلوبة." },
      { q: "هل توفرون خطط دفع مرنة؟", a: "نعم. في المشاريع الأكبر نقسم الدفعات على مراحل تنفيذ واضحة، كما يمكن إضافة عقد دعم أو تطوير شهري بعد إطلاق المشروع." },
      { q: "هل توجد رسوم إضافية غير مذكورة؟", a: "لا. نوضح جميع التكاليف قبل بدء العمل، وأي تعديل خارج نطاق المشروع لا يتم تنفيذه إلا بعد موافقة العميل بشكل واضح." },
      { q: "هل يمكنني الحصول على تقدير مبدئي قبل بدء المشروع؟", a: "بالتأكيد. يمكننا تقديم تقدير تقريبي بعد فهم احتياجاتك بشكل أولي. ولتكوين فكرة عامة: روبوتات الذكاء الاصطناعي غالباً بين 5,000 و15,000 دولار، منصات الويب المخصصة غالباً بين 15,000 و40,000 دولار، حلول الذكاء الاصطناعي المتقدمة والتكاملات الكبيرة تبدأ عادة من 20,000 دولار. يبقى السعر النهائي مرتبطاً بمتطلبات المشروع الفعلية." },
      { q: "هل تقبلون العمل مقابل حصة في الشركة الناشئة؟", a: "لا نعتمد هذا النموذج كآلية أساسية للتعاقد، لأننا نفضل وضوح العلاقة بين الطرفين. ومع ذلك، إذا كان المشروع في مرحلة مبكرة ويملك مؤشرات نمو قوية، فقد نناقش بعض النماذج المرنة حسب الحالة." },
    ]},
    process: { title: "العملية والجدول الزمني", questions: [
      { q: "كم يستغرق تنفيذ مشروع نموذجي؟", a: "يعتمد ذلك على نوع المشروع، لكن بصورة عامة: روبوتات المحادثة أو الأتمتة البسيطة من أسبوعين إلى أربعة أسابيع، منصات الويب المتوسطة من شهر إلى شهرين، تطبيقات الجوال أو حلول الذكاء الاصطناعي المتقدمة قد تحتاج إلى فترة أطول بحسب حجم المشروع والتكاملات المطلوبة." },
      { q: "كيف تسير عملية العمل؟", a: "نبدأ بفهم أهداف المشروع والتحديات الحالية، ثم نحدد نطاق العمل، نصمم الحل، وننفذه على مراحل قصيرة مع مراجعات مستمرة، قبل إجراء الاختبارات والإطلاق النهائي." },
      { q: "هل يمكن طلب تعديلات أثناء التنفيذ؟", a: "نعم. تتم مراجعة المشروع معك في مراحل مختلفة، والتعديلات التي تقع ضمن نطاق العمل تكون جزءاً من عملية التطوير. أما في حال تغير نطاق المشروع بشكل كبير، فسيتم توضيح أثر ذلك على الوقت والتكلفة قبل البدء بالتنفيذ." },
      { q: "ماذا يحدث بعد إطلاق المشروع؟", a: "بعد الإطلاق نستمر في متابعة النظام ومعالجة أي ملاحظات تظهر أثناء الاستخدام الفعلي، كما يمكنك اختيار باقة صيانة أو تطوير مستمر لضمان تطور النظام واستقراره مع مرور الوقت." },
      { q: "ما مقدار المشاركة المطلوبة من فريقنا؟", a: "نحتاج إلى تعاون وثيق في بداية المشروع لفهم المتطلبات واتخاذ القرارات الأساسية، ثم يتولى فريقنا التنفيذ مع إبقائك على اطلاع بالمستجدات من خلال اجتماعات ومراجعات دورية دون إثقال فريقك بالمتابعة اليومية." },
      { q: "ماذا لو تغير نطاق المشروع أو احتاج إلى وقت إضافي؟", a: "نحرص على تحديد نطاق العمل بدقة منذ البداية لتقليل هذا الاحتمال. وإذا ظهرت متطلبات جديدة أثناء التنفيذ، فسنناقش تأثيرها على الجدول الزمني والتكلفة بشكل واضح قبل تنفيذ أي أعمال إضافية." },
    ]},
    support: { title: "الدعم والتواصل", questions: [
      { q: "كيف يمكنني التواصل معكم؟", a: "يمكنك التواصل عبر نموذج الاتصال في الموقع أو مراسلتنا على info@raanzlr.com، وسنرد خلال يوم عمل واحد في معظم الحالات." },
      { q: "هل تقدمون استشارة أولية مجانية؟", a: "نعم. نوفر جلسة تعريفية أولية لفهم احتياجاتك، مناقشة التحديات التي تواجهها، واقتراح أفضل نقطة للبدء دون أي التزام." },
      { q: "في أي مناطق زمنية تعملون؟", a: "مقرنا الرئيسي في نيوجيرسي، ولدينا فرق تعمل عبر الشرق الأوسط وأوروبا، مما يتيح لنا تقديم الدعم والاجتماعات بما يناسب معظم المناطق الزمنية لعملائنا." },
      { q: "ما اللغات التي يمكن التواصل بها؟", a: "ندعم التواصل بالعربية والإنجليزية والتركية، سواء في الاجتماعات أو الوثائق أو أثناء تنفيذ المشروع." },
      { q: "هل تقدمون دعماً مستمراً بعد التسليم؟", a: "نعم. نوفر باقات دعم وصيانة مرنة تشمل المراقبة، التحديثات، التحسينات، والتطوير المستمر، ويمكن اختيار الباقة المناسبة بحسب طبيعة النظام واحتياجاته." },
      { q: "هل يمكن البدء بمشروع صغير ثم التوسع لاحقاً؟", a: "بالتأكيد، وهذا هو النهج الذي نوصي به في كثير من الحالات. نبدأ بحل مشكلة واضحة تحقق قيمة مباشرة، ثم نبني عليها تدريجياً وفق النتائج واحتياجات العمل، مما يساعد على تقليل المخاطر وتحقيق أفضل عائد على الاستثمار." },
    ]},
  } : {
    services: { title: "Services", questions: [
      { q: "What services does Raanzlr offer?", a: "We offer a comprehensive range of software engineering and AI services: AI agents & chatbots, workflow automation, web & mobile app development, custom AI solutions, systems integration & APIs, UI/UX design, and technical audits & consulting." },
      { q: "Do you support Arabic in your projects?", a: "Absolutely! We specialize in building multilingual solutions with full support for Arabic (RTL), English, and Turkish. All our products are designed to work seamlessly with the languages your target markets use." },
      { q: "What's the difference between regular chatbots and AI agents?", a: "Traditional chatbots rely on predefined rules and canned responses. The AI agents we develop use advanced LLMs to understand context, learn from conversations, and integrate with your existing systems." },
      { q: "Can you integrate with our existing systems?", a: "Yes, we specialize in systems integration. We connect our solutions with CRM platforms (HubSpot, Salesforce, Zoho), ERP systems, databases, and any custom APIs." },
      { q: "Can you work with our existing tech stack, or do you start from scratch?", a: "We start from where you are. Our first step is always a technical audit to understand what you have, what's working, and what's holding you back. Sometimes the best move is rebuilding something properly. Sometimes it's adding a layer on top of what already exists. We'll tell you honestly which is which." },
      { q: "Do you only work with large enterprises, or do you also work with SMBs?", a: "We work across the board — from early-stage startups launching their first product to regional enterprises deploying automation at scale. What matters is that you have a real business problem you want solved. Company size doesn't change how we approach the work." },
    ]},
    pricing: { title: "Pricing & Budget", questions: [
      { q: "How do you price your projects?", a: "We price based on project scope, complexity, timeline, and required technologies. After discussing your requirements, we provide a transparent, detailed quote outlining costs, deliverables, and milestones." },
      { q: "What's the average cost of an AI chatbot project?", a: "A basic AI chatbot ranges from $5,000 to $15,000, while advanced solutions with CRM integration and custom training can range from $15,000 to $50,000+. We offer a free consultation to assess your needs." },
      { q: "Do you offer monthly payment plans or subscriptions?", a: "Yes, we offer flexible pricing models. For larger projects, we provide milestone-based payments (30-50% upfront). We also offer monthly maintenance and support contracts after project launch." },
      { q: "Are there any hidden costs or additional fees?", a: "No, we believe in complete transparency. All costs (development, hosting, licenses, third-party services) are clearly outlined in the quote. Any scope changes are discussed and approved in writing." },
      { q: "Can I get a rough estimate before committing to a full consultation?", a: "Sure. A basic AI chatbot typically runs $5k–$15k. A bilingual web platform usually falls between $15k–$40k. Custom AI systems with complex integrations start around $20k and scale up from there. These are honest ballparks — the actual number depends on your specific requirements, which is why the consultation matters." },
      { q: "Do you take equity instead of cash for early-stage startups?", a: "We don't take equity as a primary payment model. We've found it creates misaligned incentives and complicates the relationship. That said, if you're at a genuinely early stage with interesting traction and the right fit, we're open to a conversation about hybrid arrangements. Reach out and we'll be straight with you." },
    ]},
    process: { title: "Process & Timeline", questions: [
      { q: "How long does a typical project take?", a: "Simple chatbot: 2-4 weeks. Medium-complexity website: 4-8 weeks. Full mobile app: 8-16 weeks. Custom AI solutions: 6-12 weeks. We provide a detailed timeline with clear milestones at project start." },
      { q: "What does your development process look like?", a: "We follow an Agile methodology: (1) Discovery & Planning, (2) Design & Prototyping, (3) Iterative Development, (4) Testing & QA, (5) Launch & Support." },
      { q: "Can I request changes during development?", a: "Yes, we welcome feedback and revisions! We provide regular review cycles at each stage. Minor adjustments within the agreed scope are included. Major scope changes are assessed and priced separately." },
      { q: "What happens after the project launches?", a: "We provide a warranty period (typically 30-90 days) to fix any bugs or issues. After that, we offer optional maintenance and support contracts." },
      { q: "How involved do I need to be during the project?", a: "As involved as the project demands — but we don't create unnecessary overhead. In the first two weeks, we'll need your input on requirements and decisions. After that, we move independently and sync with you at meaningful milestones. You won't get 10 Slack messages a day, but you'll always know exactly where things stand." },
      { q: "What happens if the project runs over budget or timeline?", a: "We scope carefully to avoid this, and it's rare. But when things change — because they sometimes do — we tell you immediately, explain why, and give you options. We don't present surprises at the finish line. If the scope expands, we agree in writing before we build." },
    ]},
    support: { title: "Support & Communication", questions: [
      { q: "How can I get in touch to start a project?", a: "You can reach us through the contact form on our website, or email us directly at info@raanzlr.com. One of our engineers will respond within 24 business hours." },
      { q: "Do you offer free consultations?", a: "Yes! We offer a free initial consultation (30-45 minutes) to understand your needs, discuss possible solutions, and provide a preliminary cost and timeline estimate." },
      { q: "What time zones do you operate in?", a: "Our headquarters is in New Jersey, USA (EST/EDT), and we have distributed teams in the Middle East (GST/AST) and Europe (CET/EET)." },
      { q: "What languages do you support for communication?", a: "We are fluent in Arabic, English, and Turkish. All our meetings, documentation, and support are available in your preferred language." },
      { q: "Do you offer ongoing retainer or support after launch?", a: "Yes — we offer monthly maintenance and support retainers ranging from basic uptime monitoring to active development capacity. Most clients keep a small retainer running after launch for peace of mind. The exact scope depends on what you've built and how actively it needs to evolve." },
      { q: "Can we start small and expand the project later?", a: "That's actually how we prefer to work. Start with one well-scoped problem, build something that works, measure the result, then decide what to expand. The teams that get the best outcomes are the ones who resist the urge to build everything at once. We'll push back if we think you're overreaching." },
    ]},
  }, [isAr]);

  const allQ = useMemo(() => Object.entries(faqData).flatMap(([catKey, cat]) =>
    cat.questions.map((q, idx) => ({ ...q, category: cat.title, catKey, id: `${catKey}-${idx}` }))
  ), [faqData]);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return allQ;
    const q = searchQuery.toLowerCase();
    return allQ.filter(i => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q));
  }, [searchQuery, allQ]);

  const grouped = useMemo(() => {
    const g: Record<string, { title: string; questions: typeof filtered }> = {};
    filtered.forEach(q => {
      if (!g[q.catKey]) g[q.catKey] = { title: q.category, questions: [] };
      g[q.catKey].questions.push(q);
    });
    return g;
  }, [filtered]);

  // Build FAQPage schema directly from the visible, locale-aware faqData so the
  // structured data always matches the rendered text and emits Arabic JSON-LD on /ar.
  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": isAr ? "ar" : "en",
    "mainEntity": Object.values(faqData).flatMap((cat) =>
      cat.questions.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a },
      }))
    ),
  }), [faqData, isAr]);

  return (
    <div className="relative">
      <SEO pageKey="faq" path="/faq" schema={faqSchema} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="noise absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300">
            <HelpCircle className="h-3.5 w-3.5" /> {isAr ? "الأسئلة الشائعة" : "FAQ"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome">
            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-foreground/65">
            {isAr ? "إجابات واضحة على أكثر الأسئلة التي نتلقاها. إذا لم تجد الإجابة التي تبحث عنها، يسعدنا مناقشة احتياجاتك مباشرة ومساعدتك في اختيار الحل الأنسب." : "Quick, clear answers to the most common questions about our services, pricing, process, and support."}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
              <input
                type="text"
                placeholder={isAr ? "ابحث في الأسئلة..." : "Search questions..."}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-foreground/15 bg-foreground/[0.02] px-12 py-4 text-foreground placeholder:text-foreground/40 focus:border-cyan-400/50 focus:outline-none transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <PulseDivider />

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {Object.keys(grouped).length === 0 ? (
            <Reveal>
              <div className="text-center py-16">
                <HelpCircle className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
                <p className="text-foreground/60">{isAr ? "لم يتم العثور على نتائج." : "No results found."}</p>
              </div>
            </Reveal>
          ) : (
            <Stagger className="space-y-12">
              {Object.entries(grouped).map(([catKey, cat]) => (
                <StaggerItem key={catKey}>
                  <h2 className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-6">{cat.title}</h2>
                  <div className="space-y-4">
                    {cat.questions.map(item => (
                      <details key={item.id} className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:border-cyan-400/30 transition-colors">
                        <summary className="relative px-6 py-5 cursor-pointer list-none flex items-center justify-between gap-4">
                          <span className="font-display text-base sm:text-lg font-semibold text-foreground">{item.q}</span>
                          <ChevronDown className="h-5 w-5 text-cyan-300 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div className="px-6 pb-5 text-foreground/70 leading-relaxed text-sm">{item.a}</div>
                      </details>
                    ))}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}

          <Reveal delay={0.4}>
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col items-center gap-6 rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8 sm:p-10">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-chrome">{isAr ? "لم تجد إجابة لسؤالك؟" : "Didn't Find Your Answer?"}</h3>
                <p className="text-foreground/60 max-w-md">{isAr ? "إذا كان لديك استفسار لم يتم تناوله هنا، يسعدنا التحدث معك مباشرة والإجابة عن جميع أسئلتك، ومساعدتك في تحديد الحل الأنسب لاحتياجات شركتك." : "If you have a question that's not covered here, don't hesitate to reach out."}</p>
                <MagneticButton to="/contact">{isAr ? "تواصل معنا" : "Contact Us"}</MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
