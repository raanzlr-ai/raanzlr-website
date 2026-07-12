import React from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, UserCheck, Mail } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";

const SECTIONS_EN = [
  { icon: Eye, title: "Information We Collect", content: ["We may collect the following information when using our website or contacting us:", "• Contact information such as name, email address, phone number, and company name.", "• Information you voluntarily provide when submitting a contact form or requesting a consultation.", "• Technical data such as IP address, browser type, operating system, and pages visited, for the purpose of improving website performance."] },
  { icon: Lock, title: "How We Use Information", content: ["We may use your data for:", "• Responding to your inquiries and providing the services you request.", "• Improving website performance and user experience.", "• Communicating with you about our services or updates if you have consented to do so.", "• Complying with legal and regulatory requirements when necessary."] },
  { icon: UserCheck, title: "Data Sharing", content: ["We do not sell or rent your personal data to any third party.", "Some data may be shared with trusted service providers who help us operate the website or deliver services, only to the extent necessary to perform their tasks and in compliance with applicable laws."] },
  { icon: Shield, title: "Cookies", content: ["Our website uses cookies and similar technologies to improve the user experience, analyze website performance, and understand how visitors interact with it. You can control cookie settings through your browser."] },
  { icon: UserCheck, title: "Third-Party Services", content: ["Our website may use third-party services such as analytics tools, hosting providers, or web fonts to improve performance and user experience. These services are subject to their own privacy policies."] },
  { icon: Shield, title: "Your Rights", content: ["Under applicable laws, you may have the right to:", "• Access your personal data.", "• Correct inaccurate information.", "• Request deletion of your data when legally possible.", "• Object to certain types of data processing.", "• Request a copy of your data in cases permitted by law."] },
  { icon: Mail, title: "Contact Us", content: ["If you have any questions regarding this privacy policy or how we process your data, you can contact us via:", "info@raanzlr.com", "4030 Plaza Dr #3 #15 (10030), Casper, WY 82604, USA"] },
];

const SECTIONS_AR = [
  { icon: Eye, title: "المعلومات التي نجمعها", content: ["قد نجمع المعلومات التالية عند استخدام موقعنا أو التواصل معنا:", "• بيانات التواصل مثل الاسم، والبريد الإلكتروني، ورقم الهاتف، واسم الشركة.", "• المعلومات التي تقدمها طوعاً عند إرسال نموذج تواصل أو طلب استشارة.", "• بيانات تقنية مثل عنوان IP، ونوع المتصفح، ونظام التشغيل، والصفحات التي تزورها، بهدف تحسين أداء الموقع."] },
  { icon: Lock, title: "كيف نستخدم المعلومات", content: ["قد نستخدم بياناتك من أجل:", "• الرد على استفساراتك وتقديم الخدمات التي تطلبها.", "• تحسين أداء الموقع وتجربة المستخدم.", "• التواصل معك بشأن خدماتنا أو تحديثاتنا إذا وافقت على ذلك.", "• الامتثال للمتطلبات القانونية والتنظيمية عند الحاجة."] },
  { icon: UserCheck, title: "مشاركة البيانات", content: ["لا نقوم ببيع بياناتك الشخصية أو تأجيرها لأي طرف ثالث.", "قد تتم مشاركة بعض البيانات مع مزودي خدمات موثوقين يساعدوننا في تشغيل الموقع أو تقديم الخدمات، وذلك فقط بالقدر اللازم لأداء مهامهم وبما يتوافق مع القوانين المعمول بها."] },
  { icon: Shield, title: "ملفات تعريف الارتباط (Cookies)", content: ["يستخدم موقعنا ملفات تعريف الارتباط وتقنيات مشابهة لتحسين تجربة الاستخدام، وتحليل أداء الموقع، وفهم كيفية تفاعل الزوار معه. ويمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك."] },
  { icon: UserCheck, title: "خدمات الجهات الخارجية", content: ["قد يستخدم موقعنا خدمات خارجية مثل أدوات التحليلات أو مزودي الاستضافة أو الخطوط الإلكترونية لتحسين الأداء وتجربة الاستخدام. تخضع هذه الخدمات لسياسات الخصوصية الخاصة بها."] },
  { icon: Shield, title: "حقوقك", content: ["بحسب القوانين المعمول بها، قد يكون لك الحق في:", "• الوصول إلى بياناتك الشخصية.", "• تصحيح المعلومات غير الدقيقة.", "• طلب حذف بياناتك عندما يكون ذلك ممكناً قانونياً.", "• الاعتراض على بعض أنواع معالجة البيانات.", "• طلب نسخة من بياناتك في الحالات التي يسمح بها القانون."] },
  { icon: Mail, title: "التواصل معنا", content: ["إذا كانت لديك أي استفسارات تتعلق بسياسة الخصوصية أو بطريقة معالجة بياناتك، يمكنك التواصل معنا عبر:", "info@raanzlr.com", "4030 Plaza Dr #3 #15 (10030), Casper, WY 82604, USA"] },
];

export default function PrivacyPolicy() {
  const { isAr } = useLang();
  const sections = isAr ? SECTIONS_AR : SECTIONS_EN;
  const lastUpdated = "May 9, 2026";

  return (
    <div className="relative">
      <SEO pageKey="privacyPolicy" path="/privacy-policy" />

      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300 mb-6">
            <Shield className="h-3.5 w-3.5" /> {isAr ? "سياسة الخصوصية" : "PRIVACY POLICY"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-chrome">
            {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
          </motion.h1>
          <p className="mt-4 text-sm text-foreground/40 font-mono-accent">
            {isAr ? "آخر تحديث:" : "Last updated:"} {lastUpdated}
          </p>
          <p className="mt-6 text-base text-foreground/65 leading-relaxed max-w-2xl">
            {isAr
              ? "نلتزم في Raanzlr بحماية خصوصية زوار موقعنا وعملائنا، ونتعامل مع البيانات الشخصية بمسؤولية وشفافية. توضح هذه السياسة نوع المعلومات التي نجمعها، وكيفية استخدامها، والخيارات المتاحة لك فيما يتعلق ببياناتك."
              : "At Raanzlr, we are committed to protecting the privacy of our website visitors and customers, and we handle personal data with responsibility and transparency. This policy explains what information we collect, how we use it, and your choices regarding your data."}
          </p>
        </div>
      </section>

      <PulseDivider />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-10">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-7 sm:p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-11 w-11 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-foreground">{s.title}</h2>
                  </div>
                  <div className="space-y-2">
                    {s.content.map((line, j) => (
                      <p key={j} className={`leading-relaxed ${line.startsWith("•") ? "text-sm text-foreground/60 rtl:pr-4 pl-4 rtl:pl-0" : "text-foreground/70"}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal>
            <div className="text-center pt-6">
              <MagneticButton to="/contact">{isAr ? "تواصل بشأن الخصوصية" : "Contact Us About Privacy"}</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
