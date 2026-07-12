import React from "react";
import { motion } from "framer-motion";
import { Globe2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import Heartbeat from "../components/Heartbeat";

import SEO from "../components/SEO";
import FlagImage from "../components/FlagImage";

const MARKETS = [
  {
    flag: "🇸🇦",
    code: "SA",
    slug: "saudi-arabia",
    en: { name: "Saudi Arabia", region: "GCC", sub: "Riyadh & KSA", desc: "Saudi Vision 2030 is driving unprecedented demand for AI and automation. We help Saudi enterprises, government entities, and startups embed intelligent technology into their core operations.", highlights: ["Arabic-first AI systems", "Vision 2030 alignment", "Riyadh-timezone delivery"] },
    ar: { name: "المملكة العربية السعودية", region: "الخليج", sub: "الرياض والمملكة", desc: "رؤية السعودية 2030 ترفع الطلب على الذكاء الاصطناعي والأتمتة. نساعد المؤسسات السعودية على إدخال التقنية الذكية في عملياتها الأساسية بطريقة عملية قابلة للتوسع.", highlights: ["أنظمة ذكية مصممة للعربية", "توافق مع رؤية 2030", "تسليم بتوقيت الرياض"] },
  },
  {
    flag: "🇦🇪",
    code: "AE",
    slug: "uae",
    en: { name: "UAE", region: "GCC", sub: "Dubai & Abu Dhabi", desc: "The UAE's AI national strategy and thriving startup ecosystem make it a powerhouse for tech adoption. We partner with Dubai and Abu Dhabi enterprises pushing for operational excellence.", highlights: ["UAE AI Strategy alignment", "Fintech & PropTech expertise", "Multi-emirate delivery"] },
    ar: { name: "الإمارات العربية المتحدة", region: "الخليج", sub: "دبي وأبوظبي", desc: "الاستراتيجية الوطنية للذكاء الاصطناعي في الإمارات، مع بيئة الشركات الناشئة النشطة، تجعل السوق من الأسرع في تبنّي التقنية.", highlights: ["توافق مع استراتيجية الإمارات للذكاء الاصطناعي", "خبرة في التقنية المالية والعقارية", "تسليم عبر عدة إمارات"] },
  },
  {
    flag: "🇶🇦",
    code: "QA",
    slug: "qatar",
    en: { name: "Qatar", region: "GCC", sub: "Doha", desc: "Qatar's National Vision 2030 and robust investment climate are accelerating enterprise technology. We serve Qatari corporates, government, and hospitality sectors.", highlights: ["NV2030 tech alignment", "Hospitality & Events AI", "Arabic-first products"] },
    ar: { name: "قطر", region: "الخليج", sub: "الدوحة", desc: "الرؤية الوطنية القطرية 2030 ومناخ الاستثمار القوي يدفعان تحديث الأنظمة المؤسسية. نخدم الشركات القطرية والقطاع الحكومي وقطاع الضيافة.", highlights: ["توافق تقني مع الرؤية 2030", "حلول ذكية للضيافة والفعاليات", "منتجات مصممة للعربية"] },
  },
  {
    flag: "🇰🇼",
    code: "KW",
    slug: "kuwait",
    en: { name: "Kuwait", region: "GCC", sub: "Kuwait City", desc: "Kuwait's financial services and logistics sectors present opportunities for AI transformation. We help Kuwaiti businesses automate complex workflows and launch multilingual digital products.", highlights: ["Financial services AI", "Arabic/English bilingual systems", "Same-timezone support"] },
    ar: { name: "الكويت", region: "الخليج", sub: "الكويت العاصمة", desc: "تفتح قطاعات الخدمات المالية واللوجستية في الكويت مجالاً واسعاً للأتمتة الذكية. نساعد الشركات الكويتية على تبسيط سير العمل المعقد.", highlights: ["حلول ذكية للخدمات المالية", "أنظمة عربية وإنجليزية", "دعم ضمن نفس المنطقة الزمنية"] },
  },
  {
    flag: "🇧🇭",
    code: "BH",
    slug: "bahrain",
    en: { name: "Bahrain", region: "GCC", sub: "Manama", desc: "Bahrain's financial-services and fintech ecosystem creates practical opportunities for better-connected operations. We help teams build AI and software systems around their real workflows.", highlights: ["Fintech innovation hub", "Privacy- and governance-conscious design", "Gulf connectivity"] },
    ar: { name: "البحرين", region: "الخليج", sub: "المنامة", desc: "يوفر قطاع الخدمات المالية والتقنية المالية في البحرين فرصاً عملية لبناء عمليات أكثر ترابطاً. نساعد الفرق على تطوير أنظمة ذكاء اصطناعي وبرمجيات تنطلق من واقع عملها.", highlights: ["مركز ابتكار في التقنية المالية", "تصميم يراعي الخصوصية والحوكمة", "ترابط خليجي"] },
  },
  {
    flag: "🇴🇲",
    code: "OM",
    slug: "oman",
    en: { name: "Oman", region: "GCC", sub: "Muscat", desc: "Oman's Vision 2040 industrial diversification opens opportunities for technology-driven transformation. We help Omani enterprises modernize operations with AI.", highlights: ["Vision 2040 alignment", "Industrial AI solutions", "Arabic-first delivery"] },
    ar: { name: "عُمان", region: "الخليج", sub: "مسقط", desc: "يفتح التنويع الصناعي في رؤية عُمان 2040 فرصاً حقيقية للتحديث التقني. نساعد المؤسسات العُمانية على تطوير عملياتها بأنظمة ذكية.", highlights: ["توافق مع رؤية 2040", "حلول صناعية ذكية", "تسليم مصمم للعربية"] },
  },
  {
    flag: "SYRIA_FLAG",
    code: "SY",
    slug: "syria",
    en: { name: "Syria", region: "Levant", sub: "Damascus, Aleppo", desc: "We support Syrian organisations, distributed teams, and diaspora-led initiatives with carefully scoped software and operational systems that strengthen coordination and continuity.", highlights: ["Arabic-native systems", "Distributed-team coordination", "Careful data-access design"] },
    ar: { name: "سوريا", region: "بلاد الشام", sub: "دمشق وحلب", desc: "ندعم المؤسسات والفرق الموزعة والمبادرات التي يقودها سوريون في المهجر بأنظمة برمجية وتشغيلية محددة النطاق، تعزز التنسيق واستمرارية العمل.", highlights: ["أنظمة تبدأ من العربية", "تنسيق الفرق الموزعة", "تصميم حذر لصلاحيات الوصول إلى البيانات"] },
  },
  {
    flag: "🇹🇷",
    code: "TR",
    slug: "turkey",
    en: { name: "Türkiye", region: "Europe & Asia", sub: "Istanbul & Ankara", desc: "Türkiye's active startup, manufacturing, logistics, and services sectors create a strong case for connected operations. We build multilingual AI and software systems around the way teams work.", highlights: ["Turkish-language AI systems", "Multilingual operations", "Cross-border workflow design"] },
    ar: { name: "تركيا", region: "أوروبا وآسيا", sub: "إسطنبول وأنقرة", desc: "تجعل قطاعات الشركات الناشئة والتصنيع واللوجستيات والخدمات النشطة في تركيا العمليات المترابطة حاجة عملية. نبني أنظمة ذكاء اصطناعي وبرمجيات متعددة اللغات تنطلق من طريقة عمل الفرق.", highlights: ["أنظمة ذكاء اصطناعي باللغة التركية", "عمليات متعددة اللغات", "تصميم لسير العمل العابر للحدود"] },
  },
  {
    flag: "🇪🇺",
    code: "EU",
    slug: "europe",
    en: { name: "Europe", region: "Europe", sub: "Germany, Netherlands & beyond", desc: "European organisations operating across markets can benefit from multilingual systems and cross-cultural engineering. We build privacy-conscious AI and software around local and shared operational needs.", highlights: ["Privacy-conscious design", "Multi-market operations", "Cross-border delivery"] },
    ar: { name: "أوروبا", region: "أوروبا", sub: "ألمانيا وهولندا وما بعدها", desc: "تستفيد المؤسسات العاملة عبر الأسواق الأوروبية من الأنظمة متعددة اللغات والهندسة التي تراعي اختلاف السياقات. نبني حلول ذكاء اصطناعي وبرمجيات تراعي الخصوصية والاحتياجات المحلية والمشتركة.", highlights: ["تصميم يراعي الخصوصية", "عمليات متعددة الأسواق", "تنفيذ عابر للحدود"] },
  },
];

export default function Markets() {
  const { isAr, localizedPath } = useLang();

  return (
    <div className="relative">
      <SEO pageKey="markets" path="/markets" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="noise absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300">
            <Globe2 className="h-3.5 w-3.5" /> {isAr ? "الأسواق" : "MARKETS"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-4xl font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome">
            {isAr ? "الأسواق" : "Markets"}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-foreground/65">
            {isAr
              ? "نطور حلول الذكاء الاصطناعي والبرمجيات المخصصة للشركات في أسواق متعددة، مع مراعاة احتياجات كل سوق، واختلاف بيئات العمل، والمتطلبات التنظيمية، وطبيعة المستخدمين، لضمان حلول عملية وقابلة للتوسع."
              : "We develop AI solutions and custom software for companies in multiple markets, taking into account each market's needs, different work environments, regulatory requirements, and user characteristics, to ensure practical and scalable solutions."}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="mt-8">
            <Heartbeat className="w-48 h-8" />
          </motion.div>
        </div>
      </section>

      <PulseDivider />

      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MARKETS.map((m) => {
              const content = isAr ? m.ar : m.en;
              return (
                <StaggerItem key={m.code}>
                  <Link 
                     to={localizedPath(`/markets/${m.slug}`)}
                    className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:border-cyan-400/30 transition-colors p-6 h-full flex flex-col block"
                  >
                    <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                    <div className="flex items-center justify-between mb-4">
                      <FlagImage code={m.code} alt={`${content.name} flag`} className="w-14 h-10 object-cover rounded-sm" />
                      <span className="text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2 py-1 rounded-full border border-foreground/10 text-foreground/40">{content.region}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">{content.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1 mb-3">
                      <MapPin className="h-3 w-3 text-cyan-400" />
                      <span className="text-xs text-foreground/45">{content.sub}</span>
                    </div>
                    <p className="text-sm text-foreground/55 leading-relaxed flex-1">{content.desc}</p>
                    <ul className="mt-5 space-y-2 pt-4 border-t border-foreground/8">
                      {content.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-cyan-300/80">
                          <span className="h-1 w-1 rounded-full bg-cyan-400 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-chrome">
              {isAr ? "مقرنا في الولايات المتحدة. عملياتنا عالمية." : "Headquartered in the U.S. Operating globally."}
            </h2>
            <p className="mt-4 text-foreground/60 max-w-lg mx-auto">
              {isAr
                ? "فريقنا الموزع يضمن أوقات استجابة سريعة وفهماً ثقافياً عميقاً في كل سوق نخدمه."
                : "Our distributed team ensures fast response times and deep cultural understanding across every market we serve."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8 sm:p-12 text-center">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative">
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-chrome">
                  {isAr ? "هل أنت مستعد للبدء؟" : "Ready to get started?"}
                </h3>
                <p className="mt-4 text-foreground/60 max-w-lg mx-auto">
                  {isAr
                    ? "دعنا نناقش كيف يمكننا مساعدتك في بناء حلول ذكية لسوقك."
                    : "Let's discuss how we can help you build intelligent solutions for your market."}
                </p>
                <div className="mt-8">
                  <Link to={localizedPath("/contact")} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-bold text-[#050505] hover:opacity-90 transition-opacity">
                    {isAr ? "تواصل معنا" : "Contact Us"}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
