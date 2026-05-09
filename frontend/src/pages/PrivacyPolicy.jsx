import React from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, UserCheck, FileText, Mail } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";

const PrivacyPolicy = () => {
  const { t, isAr } = useLang();

  const lastUpdated = "May 9, 2026";

  const sections = isAr ? [
    {
      icon: Eye,
      title: "البيانات التي نجمعها",
      content: [
        "نقوم بجمع المعلومات التالية عند تفاعلك مع موقعنا أو خدماتنا:",
        "• **معلومات الهوية:** الاسم الكامل، البريد الإلكتروني، رقم الهاتف، المسمى الوظيفي، واسم الشركة.",
        "• **بيانات الاستخدام:** عنوان IP، نوع المتصفح، نظام التشغيل، الصفحات التي تمت زيارتها، ومدة الجلسة.",
        "• **ملفات تعريف الارتباط (Cookies):** نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم، وتحليل حركة المرور، وتخصيص المحتوى.",
        "• **بيانات الاتصال:** أي معلومات تقدمها طوعاً عبر نماذج الاتصال أو البريد الإلكتروني.",
      ],
    },
    {
      icon: Lock,
      title: "كيف نستخدم بياناتك",
      content: [
        "نستخدم المعلومات التي نجمعها للأغراض التالية:",
        "• **تقديم الخدمات:** معالجة طلباتك، والرد على استفساراتك، وتنفيذ المشاريع المتفق عليها.",
        "• **التحليلات والتحسين:** فهم كيفية استخدام موقعنا لتحسين الأداء وتجربة المستخدم.",
        "• **التسويق والاتصالات:** إرسال تحديثات حول خدماتنا، ورسائل إخبارية، وعروض ترويجية (يمكنك إلغاء الاشتراك في أي وقت).",
        "• **الامتثال القانوني:** الوفاء بالالتزامات القانونية والتنظيمية.",
      ],
    },
    {
      icon: UserCheck,
      title: "الخدمات الخارجية",
      content: [
        "نستخدم خدمات طرف ثالث موثوقة لتشغيل موقعنا وتحسين خدماتنا:",
        "• **Vercel Analytics & Speed Insights:** لمراقبة أداء الموقع وتحليل حركة المرور.",
        "• **PostHog:** لتحليل سلوك المستخدم وتحسين تجربة المنتج.",
        "• **Google Fonts:** لتحميل الخطوط المستخدمة في الموقع.",
        "• **Unsplash:** لاستضافة الصور عالية الجودة.",
        "جميع هذه الخدمات تلتزم بمعايير حماية البيانات الصارمة. لا نشارك بياناتك الشخصية مع أطراف ثالثة لأغراض تسويقية دون موافقتك الصريحة.",
      ],
    },
    {
      icon: FileText,
      title: "ملفات تعريف الارتباط (Cookies)",
      content: [
        "نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا:",
        "• **ملفات تعريف الارتباط الأساسية:** ضرورية لتشغيل الموقع (مثل تفضيلات اللغة).",
        "• **ملفات تعريف الارتباط التحليلية:** تساعدنا على فهم كيفية استخدام الزوار للموقع.",
        "• **ملفات تعريف الارتباط التسويقية:** تُستخدم لتتبع فعالية الحملات الإعلانية.",
        "يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك. لاحظ أن تعطيل بعض ملفات تعريف الارتباط قد يؤثر على وظائف الموقع.",
      ],
    },
    {
      icon: Shield,
      title: "حقوقك (متوافق مع GDPR)",
      content: [
        "بموجب اللائحة العامة لحماية البيانات (GDPR) والقوانين المحلية، لديك الحقوق التالية:",
        "• **الحق في الوصول:** طلب نسخة من البيانات الشخصية التي نحتفظ بها عنك.",
        "• **الحق في التصحيح:** طلب تصحيح أي معلومات غير دقيقة أو غير كاملة.",
        "• **الحق في الحذف:** طلب حذف بياناتك الشخصية (\"الحق في النسيان\").",
        "• **الحق في نقل البيانات:** الحصول على بياناتك بتنسيق منظم وقابل للقراءة آلياً.",
        "• **الحق في الاعتراض:** الاعتراض على معالجة بياناتك لأغراض تسويقية.",
        "• **الحق في سحب الموافقة:** سحب موافقتك على معالجة البيانات في أي وقت.",
        "لممارسة أي من هذه الحقوق، يرجى الاتصال بنا على: **contact@raanzlr.com**",
      ],
    },
    {
      icon: Mail,
      title: "الاتصال بنا",
      content: [
        "إذا كانت لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية هذه أو ممارسات البيانات الخاصة بنا، يرجى الاتصال بنا:",
        "**البريد الإلكتروني:** contact@raanzlr.com",
        "**العنوان:** 9 Branch Brook Dr #10030, Belleville, NJ 07109, USA",
        "سنرد على استفساراتك خلال 48 ساعة عمل.",
      ],
    },
  ] : [
    {
      icon: Eye,
      title: "Data We Collect",
      content: [
        "We collect the following information when you interact with our website or services:",
        "• **Identity Information:** Full name, email address, phone number, job title, and company name.",
        "• **Usage Data:** IP address, browser type, operating system, pages visited, and session duration.",
        "• **Cookies:** We use cookies to enhance user experience, analyze traffic, and personalize content.",
        "• **Communication Data:** Any information you voluntarily provide through contact forms or email.",
      ],
    },
    {
      icon: Lock,
      title: "How We Use Your Data",
      content: [
        "We use the information we collect for the following purposes:",
        "• **Service Delivery:** Process your requests, respond to inquiries, and execute agreed-upon projects.",
        "• **Analytics & Improvement:** Understand how our website is used to improve performance and user experience.",
        "• **Marketing & Communications:** Send updates about our services, newsletters, and promotional offers (you can opt out anytime).",
        "• **Legal Compliance:** Fulfill legal and regulatory obligations.",
      ],
    },
    {
      icon: UserCheck,
      title: "Third-Party Services",
      content: [
        "We use trusted third-party services to operate our website and improve our services:",
        "• **Vercel Analytics & Speed Insights:** For monitoring website performance and analyzing traffic.",
        "• **PostHog:** For analyzing user behavior and improving product experience.",
        "• **Google Fonts:** For loading fonts used on the website.",
        "• **Unsplash:** For hosting high-quality images.",
        "All these services comply with strict data protection standards. We do not share your personal data with third parties for marketing purposes without your explicit consent.",
      ],
    },
    {
      icon: FileText,
      title: "Cookies Policy",
      content: [
        "We use cookies to enhance your experience on our website:",
        "• **Essential Cookies:** Necessary for the website to function (e.g., language preferences).",
        "• **Analytics Cookies:** Help us understand how visitors use the website.",
        "• **Marketing Cookies:** Used to track the effectiveness of advertising campaigns.",
        "You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.",
      ],
    },
    {
      icon: Shield,
      title: "Your Rights (GDPR-Aligned)",
      content: [
        "Under the General Data Protection Regulation (GDPR) and local laws, you have the following rights:",
        "• **Right to Access:** Request a copy of the personal data we hold about you.",
        "• **Right to Rectification:** Request correction of any inaccurate or incomplete information.",
        "• **Right to Erasure:** Request deletion of your personal data (\"right to be forgotten\").",
        "• **Right to Data Portability:** Obtain your data in a structured, machine-readable format.",
        "• **Right to Object:** Object to the processing of your data for marketing purposes.",
        "• **Right to Withdraw Consent:** Withdraw your consent to data processing at any time.",
        "To exercise any of these rights, please contact us at: **contact@raanzlr.com**",
      ],
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: [
        "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:",
        "**Email:** contact@raanzlr.com",
        "**Address:** 9 Branch Brook Dr #10030, Belleville, NJ 07109, USA",
        "We will respond to your inquiries within 48 business hours.",
      ],
    },
  ];

  return (
    <div data-testid="privacy-policy-page" className="relative">
      <SEO
        title={isAr ? "سياسة الخصوصية — Raanzlr" : "Privacy Policy — Raanzlr"}
        description={isAr ? "سياسة الخصوصية الخاصة بـ Raanzlr. نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية وفقاً لأعلى المعايير العالمية." : "Raanzlr's Privacy Policy. We respect your privacy and are committed to protecting your personal data in accordance with the highest global standards."}
        path="/privacy-policy"
      />

      {/* HERO */}
      <section data-testid="privacy-hero" className="relative min-h-[60vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute -top-20 right-1/4 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="noise absolute inset-0" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-[10px] sm:text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300"
          >
            <Shield className="h-3.5 w-3.5" />
            {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome"
          >
            {isAr ? "نحترم خصوصيتك" : "We Respect Your Privacy"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/65"
          >
            {isAr
              ? "نلتزم بحماية بياناتك الشخصية وفقاً لأعلى المعايير العالمية، بما في ذلك اللائحة العامة لحماية البيانات (GDPR). توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك."
              : "We are committed to protecting your personal data in accordance with the highest global standards, including GDPR. This policy explains how we collect, use, and safeguard your information."}
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
                  {isAr ? "هل لديك أسئلة؟" : "Have Questions?"}
                </h3>
                <p className="text-white/60 max-w-md">
                  {isAr
                    ? "إذا كانت لديك أي استفسارات حول سياسة الخصوصية أو كيفية معالجة بياناتك، لا تتردد في التواصل معنا."
                    : "If you have any questions about this Privacy Policy or how we handle your data, don't hesitate to reach out."}
                </p>
                <MagneticButton to="/contact" testId="privacy-cta-contact">
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

export default PrivacyPolicy;
