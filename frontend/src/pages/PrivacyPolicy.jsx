import React from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, UserCheck, Mail } from "lucide-react";
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
        "عندما تتفاعل مع موقعنا أو خدماتنا، نقوم بجمع المعلومات التالية:",
        "• معلومات الهوية: مثل الاسم الكامل، البريد الإلكتروني، رقم الهاتف، المسمى الوظيفي، واسم الشركة.",
        "• بيانات الاستخدام: تشمل عنوان IP، نوع المتصفح، نظام التشغيل، الصفحات التي زرتها، ومدة تصفحك.",
        "• بيانات الاتصال: أي معلومات تشاركها معنا طوعاً عبر نماذج الاتصال أو البريد الإلكتروني.",
      ],
    },
    {
      icon: Lock,
      title: "كيف نستخدم معلوماتك",
      content: [
        "نستخدم البيانات التي نجمعها لتحقيق الأهداف التالية:",
        "• تقديم خدماتنا: نعالج طلباتك، نرد على استفساراتك، وننفذ المشاريع التي نتفق عليها معك.",
        "• تحسين الأداء: نحلل كيفية استخدامك للموقع لنطور تجربتك ونحسن خدماتنا باستمرار.",
        "• التواصل معك: نرسل لك تحديثات حول خدماتنا الجديدة وعروضنا (يمكنك إلغاء الاشتراك في أي وقت).",
        "• الامتثال القانوني: نلتزم بجميع المتطلبات القانونية والتنظيمية المعمول بها.",
      ],
    },
    {
      icon: UserCheck,
      title: "الخدمات الخارجية التي نستخدمها",
      content: [
        "نعتمد على بعض الخدمات الموثوقة لتشغيل موقعنا وتحسين أدائه:",
        "• Vercel Analytics & Speed Insights: لمراقبة سرعة الموقع وتحليل أداء الصفحات.",
        "• PostHog: لفهم سلوك المستخدمين وتحسين تجربتهم على الموقع.",
        "• Google Fonts: لتحميل الخطوط التي تراها على موقعنا.",
        "• Unsplash: لاستضافة الصور عالية الجودة.",
        "جميع هذه الخدمات تلتزم بأعلى معايير حماية البيانات. نحن لا نشارك معلوماتك الشخصية مع أي جهة خارجية لأغراض تسويقية دون موافقتك الصريحة.",
      ],
    },
    {
      icon: Shield,
      title: "حقوقك في حماية بياناتك",
      content: [
        "وفقاً للائحة العامة لحماية البيانات (GDPR) والقوانين المحلية، لديك الحقوق التالية:",
        "• حق الوصول: يمكنك طلب نسخة من جميع البيانات التي نحتفظ بها عنك.",
        "• حق التصحيح: يمكنك طلب تصحيح أي معلومات غير دقيقة أو تحديث بياناتك.",
        "• حق الحذف: يمكنك طلب حذف بياناتك الشخصية بالكامل من أنظمتنا.",
        "• حق نقل البيانات: يمكنك الحصول على بياناتك بصيغة يسهل نقلها إلى جهة أخرى.",
        "• حق الاعتراض: يمكنك الاعتراض على استخدام بياناتك لأغراض تسويقية.",
        "• حق سحب الموافقة: يمكنك سحب موافقتك على معالجة بياناتك في أي وقت.",
        "لممارسة أي من هذه الحقوق، تواصل معنا عبر: contact@raanzlr.com",
      ],
    },
    {
      icon: Mail,
      title: "تواصل معنا",
      content: [
        "إذا كان لديك أي استفسار أو قلق بخصوص سياسة الخصوصية أو كيفية تعاملنا مع بياناتك، نحن هنا للمساعدة:",
        "البريد الإلكتروني: contact@raanzlr.com",
        "العنوان: 9 Branch Brook Dr #10030, Belleville, NJ 07109, USA",
        "نلتزم بالرد على جميع الاستفسارات خلال 48 ساعة عمل.",
      ],
    },
  ] : [
    {
      icon: Eye,
      title: "Data We Collect",
      content: [
        "When you interact with our website or services, we collect the following information:",
        "• Identity Information: Full name, email address, phone number, job title, and company name.",
        "• Usage Data: IP address, browser type, operating system, pages visited, and session duration.",
        "• Communication Data: Any information you voluntarily provide through contact forms or email.",
      ],
    },
    {
      icon: Lock,
      title: "How We Use Your Data",
      content: [
        "We use the information we collect for the following purposes:",
        "• Service Delivery: Process your requests, respond to inquiries, and execute agreed-upon projects.",
        "• Analytics & Improvement: Understand how our website is used to improve performance and user experience.",
        "• Marketing & Communications: Send updates about our services, newsletters, and promotional offers (you can opt out anytime).",
        "• Legal Compliance: Fulfill legal and regulatory obligations.",
      ],
    },
    {
      icon: UserCheck,
      title: "Third-Party Services",
      content: [
        "We use trusted third-party services to operate our website and improve our services:",
        "• Vercel Analytics & Speed Insights: For monitoring website performance and analyzing traffic.",
        "• PostHog: For analyzing user behavior and improving product experience.",
        "• Google Fonts: For loading fonts used on the website.",
        "• Unsplash: For hosting high-quality images.",
        "All these services comply with strict data protection standards. We do not share your personal data with third parties for marketing purposes without your explicit consent.",
      ],
    },
    {
      icon: Shield,
      title: "Your Rights (GDPR-Aligned)",
      content: [
        "Under the General Data Protection Regulation (GDPR) and local laws, you have the following rights:",
        "• Right to Access: Request a copy of the personal data we hold about you.",
        "• Right to Rectification: Request correction of any inaccurate or incomplete information.",
        "• Right to Erasure: Request deletion of your personal data (right to be forgotten).",
        "• Right to Data Portability: Obtain your data in a structured, machine-readable format.",
        "• Right to Object: Object to the processing of your data for marketing purposes.",
        "• Right to Withdraw Consent: Withdraw your consent to data processing at any time.",
        "To exercise any of these rights, please contact us at: contact@raanzlr.com",
      ],
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: [
        "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:",
        "Email: contact@raanzlr.com",
        "Address: 9 Branch Brook Dr #10030, Belleville, NJ 07109, USA",
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
