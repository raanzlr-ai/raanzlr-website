import React from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle, AlertTriangle, Scale, CreditCard, XCircle, Globe, Mail } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";

const TermsOfService = () => {
  const { t, isAr } = useLang();

  const lastUpdated = "May 9, 2026";

  const sections = isAr ? [
    {
      icon: CheckCircle,
      title: "قبول الشروط",
      content: [
        "بدخولك واستخدامك لموقع Raanzlr.com أو أي من خدماتنا، فإنك توافق على الالتزام بشروط الخدمة هذه وجميع القوانين واللوائح المعمول بها.",
        "إذا كنت لا توافق على أي من هذه الشروط، يُرجى عدم استخدام موقعنا أو خدماتنا.",
        "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة مع تحديث تاريخ \"آخر تحديث\". استمرارك في استخدام الموقع بعد نشر التغييرات يعني قبولك لها.",
      ],
    },
    {
      icon: Globe,
      title: "وصف الخدمات",
      content: [
        "تقدم Raanzlr خدمات هندسة البرمجيات والذكاء الاصطناعي، بما في ذلك على سبيل المثال لا الحصر:",
        "• **تطوير وكلاء الذكاء الاصطناعي وروبوتات المحادثة:** أنظمة محادثة ذكية متعددة اللغات.",
        "• **أتمتة سير العمل:** حلول أتمتة مخصصة باستخدام n8n وZapier وMake وأدوات أخرى.",
        "• **تطوير الويب والتطبيقات:** مواقع ويب عالية الأداء، تطبيقات SaaS، ومنصات التجارة الإلكترونية.",
        "• **تطوير تطبيقات الهاتف المحمول:** تطبيقات iOS وAndroid أصلية وهجينة.",
        "• **حلول الذكاء الاصطناعي المخصصة:** نماذج ذكاء اصطناعي خاصة، وأنظمة RAG، وخطوط أنابيب البيانات.",
        "• **تكامل الأنظمة وواجهات برمجة التطبيقات:** ربط الأنظمة المختلفة وإنشاء واجهات برمجة تطبيقات موثوقة.",
        "• **تصميم واجهات المستخدم وتجربة المستخدم:** تصميم منتجات استراتيجية وأنظمة تصميم.",
        "• **التدقيق التقني والاستشارات:** تحليل البنية التحتية التقنية وتقديم توصيات استراتيجية.",
        "يتم تحديد نطاق كل مشروع وتسليماته وجدوله الزمني في اتفاقية منفصلة أو بيان عمل (SOW).",
      ],
    },
    {
      icon: AlertTriangle,
      title: "مسؤوليات المستخدم والاستخدامات المحظورة",
      content: [
        "عند استخدام خدماتنا، فإنك توافق على:",
        "• تقديم معلومات دقيقة وكاملة وحديثة.",
        "• الحفاظ على سرية بيانات اعتماد حسابك (إن وجدت).",
        "• إخطارنا فوراً بأي استخدام غير مصرح به لحسابك.",
        "• الامتثال لجميع القوانين واللوائح المحلية والدولية المعمول بها.",
        "",
        "**الاستخدامات المحظورة:**",
        "يُحظر عليك استخدام خدماتنا لـ:",
        "• أي غرض غير قانوني أو احتيالي.",
        "• انتهاك حقوق الملكية الفكرية لأي طرف.",
        "• نقل أي فيروسات أو برامج ضارة أو أكواد مدمرة.",
        "• محاولة الوصول غير المصرح به إلى أنظمتنا أو شبكاتنا.",
        "• استخدام خدماتنا بطريقة قد تضر أو تعطل أو تثقل كاهل بنيتنا التحتية.",
      ],
    },
    {
      icon: FileText,
      title: "الملكية الفكرية",
      content: [
        "**ملكية Raanzlr:**",
        "جميع المحتويات والمواد والتصاميم والشعارات والعلامات التجارية والبرمجيات الموجودة على موقعنا هي ملك حصري لـ Raanzlr أو مرخصيها. يُحظر نسخها أو توزيعها أو تعديلها دون إذن كتابي صريح.",
        "",
        "**ملكية العميل:**",
        "بالنسبة للمشاريع المخصصة، يتم تحديد ملكية التسليمات النهائية (الكود، التصاميم، الوثائق) في اتفاقية المشروع أو بيان العمل (SOW). بشكل عام:",
        "• **الكود المخصص:** يتم نقل الملكية الكاملة إلى العميل عند استلام الدفعة النهائية.",
        "• **المكونات القابلة لإعادة الاستخدام:** تحتفظ Raanzlr بالحق في إعادة استخدام المكونات العامة والأطر والأدوات المساعدة في مشاريع أخرى.",
        "• **المكتبات مفتوحة المصدر:** تخضع لتراخيصها الأصلية.",
      ],
    },
    {
      icon: CreditCard,
      title: "الدفع والفوترة",
      content: [
        "**هيكل الدفع:**",
        "يتم تحديد شروط الدفع في اتفاقية المشروع أو بيان العمل (SOW). عادةً ما تتبع المشاريع أحد الهياكل التالية:",
        "• **دفعة مقدمة:** 30-50% من إجمالي رسوم المشروع قبل بدء العمل.",
        "• **دفعات على مراحل:** دفعات بناءً على إنجاز المعالم الرئيسية.",
        "• **الدفعة النهائية:** عند تسليم المشروع النهائي واعتماده.",
        "",
        "**الفواتير المتأخرة:**",
        "الفواتير مستحقة الدفع خلال 14 يوماً من تاريخ الإصدار ما لم يُتفق على خلاف ذلك. قد تخضع الدفعات المتأخرة لرسوم تأخير بنسبة 1.5% شهرياً أو الحد الأقصى المسموح به قانوناً، أيهما أقل.",
        "",
        "**استرداد الأموال:**",
        "نظراً للطبيعة المخصصة لخدماتنا، فإن جميع المدفوعات غير قابلة للاسترداد ما لم يُنص على خلاف ذلك في اتفاقية المشروع.",
      ],
    },
    {
      icon: XCircle,
      title: "الإنهاء",
      content: [
        "**الإنهاء من قبل العميل:**",
        "يمكنك إنهاء المشروع في أي وقت بإشعار كتابي مدته 14 يوماً. ستكون مسؤولاً عن دفع جميع الأعمال المنجزة حتى تاريخ الإنهاء، بالإضافة إلى أي تكاليف غير قابلة للاسترداد تم تكبدها.",
        "",
        "**الإنهاء من قبل Raanzlr:**",
        "نحتفظ بالحق في إنهاء المشروع أو تعليق الخدمات إذا:",
        "• فشل العميل في سداد الفواتير في الوقت المحدد.",
        "• انتهك العميل أي شرط من شروط الخدمة هذه.",
        "• أصبح المشروع غير قابل للتنفيذ لأسباب خارجة عن سيطرتنا.",
        "",
        "**الآثار المترتبة على الإنهاء:**",
        "عند الإنهاء، سنقوم بتسليم جميع الأعمال المنجزة حتى ذلك التاريخ. لن تكون مسؤولاً عن أي أعمال لم تبدأ بعد.",
      ],
    },
    {
      icon: Scale,
      title: "تحديد المسؤولية",
      content: [
        "**إخلاء المسؤولية عن الضمانات:**",
        "يتم تقديم خدماتنا \"كما هي\" و\"حسب التوفر\". بينما نسعى جاهدين لتقديم عمل عالي الجودة، لا نقدم أي ضمانات صريحة أو ضمنية فيما يتعلق بالدقة أو الموثوقية أو الملاءمة لغرض معين.",
        "",
        "**حدود المسؤولية:**",
        "إلى أقصى حد يسمح به القانون، لن تكون Raanzlr مسؤولة عن:",
        "• أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية.",
        "• فقدان الأرباح أو الإيرادات أو البيانات أو الفرص التجارية.",
        "• أي أضرار تتجاوز إجمالي الرسوم المدفوعة لنا عن المشروع المعني.",
        "",
        "**التعويض:**",
        "توافق على تعويض Raanzlr والدفاع عنها وإبراء ذمتها من أي مطالبات أو أضرار أو التزامات ناشئة عن استخدامك لخدماتنا أو انتهاكك لهذه الشروط.",
      ],
    },
    {
      icon: Globe,
      title: "القانون الحاكم",
      content: [
        "تخضع شروط الخدمة هذه وتُفسر وفقاً لقوانين ولاية نيوجيرسي، الولايات المتحدة الأمريكية، دون الإخلال بأحكام تنازع القوانين.",
        "أي نزاعات ناشئة عن هذه الشروط أو المتعلقة بها ستخضع للاختصاص القضائي الحصري لمحاكم نيوجيرسي.",
        "إذا تبين أن أي حكم من أحكام هذه الشروط غير قابل للتنفيذ أو غير صالح، فسيتم تعديل هذا الحكم وتفسيره لتحقيق أهداف هذا الحكم إلى أقصى حد ممكن بموجب القانون المعمول به، وستظل الأحكام المتبقية سارية المفعول بالكامل.",
      ],
    },
    {
      icon: Mail,
      title: "الاتصال بنا",
      content: [
        "إذا كانت لديك أي أسئلة أو مخاوف بشأن شروط الخدمة هذه، يرجى الاتصال بنا:",
        "**البريد الإلكتروني:** contact@raanzlr.com",
        "**العنوان:** 9 Branch Brook Dr #10030, Belleville, NJ 07109, USA",
        "سنرد على استفساراتك القانونية خلال 72 ساعة عمل.",
      ],
    },
  ] : [
    {
      icon: CheckCircle,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Raanzlr.com or any of our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
        "If you do not agree with any of these terms, please do not use our website or services.",
        "We reserve the right to modify these terms at any time. Any changes will be posted on this page with an updated \"Last Updated\" date. Your continued use of the website after changes are posted constitutes your acceptance of the modified terms.",
      ],
    },
    {
      icon: Globe,
      title: "Description of Services",
      content: [
        "Raanzlr provides software engineering and AI services, including but not limited to:",
        "• **AI Agents & Chatbot Development:** Intelligent, multilingual conversational systems.",
        "• **Workflow Automation:** Custom automation solutions using n8n, Zapier, Make, and other tools.",
        "• **Web & App Development:** High-performance websites, SaaS applications, and e-commerce platforms.",
        "• **Mobile App Development:** Native and hybrid iOS and Android applications.",
        "• **Custom AI Solutions:** Proprietary AI models, RAG systems, and data pipelines.",
        "• **Systems Integration & APIs:** Connecting disparate systems and building reliable APIs.",
        "• **UI/UX Design:** Strategic product design and design systems.",
        "• **Technical Audits & Consulting:** Infrastructure analysis and strategic recommendations.",
        "The scope, deliverables, and timeline of each project are defined in a separate agreement or Statement of Work (SOW).",
      ],
    },
    {
      icon: AlertTriangle,
      title: "User Responsibilities & Prohibited Uses",
      content: [
        "When using our services, you agree to:",
        "• Provide accurate, complete, and current information.",
        "• Maintain the confidentiality of your account credentials (if applicable).",
        "• Notify us immediately of any unauthorized use of your account.",
        "• Comply with all applicable local, national, and international laws and regulations.",
        "",
        "**Prohibited Uses:**",
        "You are prohibited from using our services to:",
        "• Engage in any unlawful or fraudulent purpose.",
        "• Violate any intellectual property rights of any party.",
        "• Transmit any viruses, malware, or destructive code.",
        "• Attempt unauthorized access to our systems or networks.",
        "• Use our services in a manner that could damage, disable, or impair our infrastructure.",
      ],
    },
    {
      icon: FileText,
      title: "Intellectual Property",
      content: [
        "**Raanzlr Ownership:**",
        "All content, materials, designs, logos, trademarks, and software on our website are the exclusive property of Raanzlr or its licensors. Copying, distributing, or modifying them without explicit written permission is prohibited.",
        "",
        "**Client Ownership:**",
        "For custom projects, ownership of final deliverables (code, designs, documentation) is defined in the project agreement or SOW. Generally:",
        "• **Custom Code:** Full ownership transfers to the client upon receipt of final payment.",
        "• **Reusable Components:** Raanzlr retains the right to reuse generic components, frameworks, and utilities in other projects.",
        "• **Open-Source Libraries:** Subject to their original licenses.",
      ],
    },
    {
      icon: CreditCard,
      title: "Payment & Billing",
      content: [
        "**Payment Structure:**",
        "Payment terms are defined in the project agreement or SOW. Projects typically follow one of these structures:",
        "• **Upfront Deposit:** 30-50% of total project fees before work begins.",
        "• **Milestone Payments:** Payments based on completion of major milestones.",
        "• **Final Payment:** Upon delivery and approval of the final project.",
        "",
        "**Late Invoices:**",
        "Invoices are due within 14 days of issuance unless otherwise agreed. Late payments may be subject to a late fee of 1.5% per month or the maximum allowed by law, whichever is less.",
        "",
        "**Refunds:**",
        "Due to the custom nature of our services, all payments are non-refundable unless otherwise stated in the project agreement.",
      ],
    },
    {
      icon: XCircle,
      title: "Termination",
      content: [
        "**Termination by Client:**",
        "You may terminate a project at any time with 14 days' written notice. You will be responsible for payment of all work completed up to the termination date, plus any non-refundable costs incurred.",
        "",
        "**Termination by Raanzlr:**",
        "We reserve the right to terminate a project or suspend services if:",
        "• The client fails to pay invoices on time.",
        "• The client violates any term of these Terms of Service.",
        "• The project becomes unfeasible due to circumstances beyond our control.",
        "",
        "**Effects of Termination:**",
        "Upon termination, we will deliver all work completed to that date. You will not be liable for any work not yet started.",
      ],
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      content: [
        "**Disclaimer of Warranties:**",
        "Our services are provided \"as is\" and \"as available.\" While we strive to deliver high-quality work, we make no express or implied warranties regarding accuracy, reliability, or fitness for a particular purpose.",
        "",
        "**Limits of Liability:**",
        "To the maximum extent permitted by law, Raanzlr shall not be liable for:",
        "• Any indirect, incidental, special, or consequential damages.",
        "• Loss of profits, revenue, data, or business opportunities.",
        "• Any damages exceeding the total fees paid to us for the project in question.",
        "",
        "**Indemnification:**",
        "You agree to indemnify, defend, and hold harmless Raanzlr from any claims, damages, or liabilities arising from your use of our services or violation of these terms.",
      ],
    },
    {
      icon: Globe,
      title: "Governing Law",
      content: [
        "These Terms of Service are governed by and construed in accordance with the laws of the State of New Jersey, United States of America, without regard to its conflict of law provisions.",
        "Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts of New Jersey.",
        "If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.",
      ],
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: [
        "If you have any questions or concerns about these Terms of Service, please contact us:",
        "**Email:** contact@raanzlr.com",
        "**Address:** 9 Branch Brook Dr #10030, Belleville, NJ 07109, USA",
        "We will respond to your legal inquiries within 72 business hours.",
      ],
    },
  ];

  return (
    <div data-testid="terms-of-service-page" className="relative">
      <SEO
        title={isAr ? "شروط الخدمة — Raanzlr" : "Terms of Service — Raanzlr"}
        description={isAr ? "شروط الخدمة الخاصة بـ Raanzlr. اقرأ شروط استخدام خدماتنا، والمسؤوليات، وحقوق الملكية الفكرية." : "Raanzlr's Terms of Service. Read our terms of use, responsibilities, and intellectual property rights."}
        path="/terms-of-service"
      />

      {/* HERO */}
      <section data-testid="terms-hero" className="relative min-h-[60vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute -top-20 left-1/4 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="noise absolute inset-0" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-[10px] sm:text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300"
          >
            <Scale className="h-3.5 w-3.5" />
            {isAr ? "شروط الخدمة" : "Terms of Service"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome"
          >
            {isAr ? "شروط الخدمة" : "Terms of Service"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/65"
          >
            {isAr
              ? "توضح هذه الشروط حقوقك ومسؤولياتك عند استخدام خدمات Raanzlr. يرجى قراءتها بعناية قبل التعامل معنا."
              : "These terms outline your rights and responsibilities when using Raanzlr's services. Please read them carefully before engaging with us."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-sm text-white/50 font-mono-accent"
          >
            {isAr ? "آخر تحديث:" : "Last Updated:"} {lastUpdated}
          </motion.div>
        </div>
      </section>

      <PulseDivider />

      {/* CONTENT */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 hover:border-cyan-400/30 transition-colors">
                    <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-cyan-300" />
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                          {section.title}
                        </h2>
                      </div>
                      <div className="space-y-4 text-white/70 leading-relaxed">
                        {section.content.map((paragraph, pIdx) => (
                          <p key={pIdx} className={paragraph.startsWith("•") ? "rtl:pr-4 ltr:pl-4" : ""}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* CTA */}
          <Reveal delay={0.6}>
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col items-center gap-6 rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8 sm:p-10">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-chrome">
                  {isAr ? "هل لديك أسئلة قانونية؟" : "Have Legal Questions?"}
                </h3>
                <p className="text-white/60 max-w-md">
                  {isAr
                    ? "إذا كانت لديك أي استفسارات حول شروط الخدمة أو الجوانب القانونية للتعامل معنا، تواصل معنا."
                    : "If you have any questions about these Terms of Service or legal aspects of working with us, reach out."}
                </p>
                <MagneticButton to="/contact" testId="terms-cta-contact">
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

export default TermsOfService;
