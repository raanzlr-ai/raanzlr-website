import React from "react";
import { motion } from "framer-motion";
import { FileText, Scale, AlertCircle, CreditCard, MessageSquare } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";

const SECTIONS_EN = [
  { icon: FileText, title: "Use of the Website", content: ["You may use the website to browse our services, contact us, or request additional information, provided that you do not use it in a manner that violates laws, affects its operation, or infringes on the rights of others."] },
  { icon: Scale, title: "Services", content: ["Raanzlr provides software development services, AI solutions, business automation, and technical consulting.", "The scope, phases, duration, costs, and terms of each project are determined through a separate agreement or quote agreed upon with the client."] },
  { icon: CreditCard, title: "Pricing and Payments", content: ["All fees and payment terms are specified within the agreement for each project.", "Project execution does not begin until agreed-upon requirements are met, including initial deposits if applicable."] },
  { icon: AlertCircle, title: "Intellectual Property", content: ["Unless otherwise stated in the agreement, ownership of outputs developed specifically for the client transfers after all agreed financial obligations are completed.", "Raanzlr retains ownership rights to tools, libraries, frameworks, and general technologies previously developed or used in multiple projects."] },
  { icon: Scale, title: "Limitation of Liability", content: ["We make reasonable efforts to deliver high-quality services, however we do not guarantee services are completely error-free or guarantee specific business results, as outcomes also depend on factors beyond our control."] },
  { icon: MessageSquare, title: "Amendments", content: ["We may update these terms when necessary, and the version published on the website becomes the approved version from its publication date."] },
  { icon: MessageSquare, title: "Contact", content: ["For any inquiries related to these terms, you can contact us via:", "info@raanzlr.com", "9 Branch Brook Dr #10030, Belleville, NJ 07109, USA"] },
];

const SECTIONS_AR = [
  { icon: FileText, title: "استخدام الموقع", content: ["يجوز لك استخدام الموقع للاطلاع على خدماتنا أو التواصل معنا أو طلب معلومات إضافية، بشرط عدم استخدامه بطريقة تخالف القوانين أو تؤثر على تشغيله أو على حقوق الآخرين."] },
  { icon: Scale, title: "الخدمات", content: ["تقدم Raanzlr خدمات تطوير البرمجيات، وحلول الذكاء الاصطناعي، وأتمتة الأعمال، والاستشارات التقنية.", "ويتم تحديد نطاق كل مشروع، ومراحله، ومدته، وتكاليفه، وشروطه من خلال اتفاقية أو عرض سعر مستقل يتم الاتفاق عليه مع العميل."] },
  { icon: CreditCard, title: "الأسعار والمدفوعات", content: ["تحدد جميع الرسوم وشروط الدفع ضمن الاتفاقية الخاصة بكل مشروع.", "ولا يبدأ تنفيذ المشروع إلا بعد استكمال المتطلبات المتفق عليها، بما في ذلك الدفعات الأولية إن وجدت."] },
  { icon: AlertCircle, title: "الملكية الفكرية", content: ["ما لم يُنص على خلاف ذلك في الاتفاقية، تنتقل ملكية المخرجات التي يتم تطويرها خصيصاً للعميل بعد استكمال جميع الالتزامات المالية المتفق عليها.", "وتحتفظ Raanzlr بحقوق ملكية الأدوات والمكتبات والأطر البرمجية والتقنيات العامة التي تم تطويرها مسبقاً أو المستخدمة في أكثر من مشروع."] },
  { icon: Scale, title: "حدود المسؤولية", content: ["نبذل جهداً معقولاً لتقديم خدمات عالية الجودة، إلا أننا لا نضمن خلو الخدمات من الأخطاء بشكل كامل أو تحقيق نتائج تجارية محددة، إذ تعتمد النتائج أيضاً على عوامل خارج نطاق سيطرتنا."] },
  { icon: MessageSquare, title: "التعديلات", content: ["يجوز لنا تحديث هذه الشروط عند الحاجة، ويصبح الإصدار المنشور على الموقع هو الإصدار المعتمد من تاريخ نشره."] },
  { icon: MessageSquare, title: "التواصل", content: ["لأي استفسار يتعلق بهذه الشروط، يمكنك التواصل معنا عبر:", "info@raanzlr.com", "9 Branch Brook Dr #10030, Belleville, NJ 07109, USA"] },
];

export default function TermsOfService() {
  const { isAr } = useLang();
  const sections = isAr ? SECTIONS_AR : SECTIONS_EN;
  const lastUpdated = "May 9, 2026";

  return (
    <div className="relative">
      <SEO pageKey="termsOfService" path="/terms-of-service" />

      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300 mb-6">
            <FileText className="h-3.5 w-3.5" /> {isAr ? "شروط الخدمة" : "TERMS OF SERVICE"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-chrome">
            {isAr ? "شروط الخدمة" : "Terms of Service"}
          </motion.h1>
          <p className="mt-4 text-sm text-foreground/40 font-mono-accent">
            {isAr ? "آخر تحديث:" : "Last updated:"} {lastUpdated}
          </p>
          <p className="mt-6 text-base text-foreground/65 leading-relaxed max-w-2xl">
            {isAr
              ? "تنظم هذه الشروط استخدامك لموقع Raanzlr والخدمات التي نقدمها. باستخدام الموقع أو طلب أي من خدماتنا، فإنك توافق على الالتزام بهذه الشروط."
              : "These terms govern your use of the Raanzlr website and the services we provide. By using the website or requesting any of our services, you agree to comply with these terms."}
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
                  <div className="space-y-3">
                    {s.content.map((para, j) => (
                      <p key={j} className="text-foreground/65 leading-relaxed text-sm">{para}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal>
            <div className="text-center pt-6">
              <MagneticButton to="/contact">{isAr ? "تواصل بشأن الشروط" : "Questions About These Terms"}</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
