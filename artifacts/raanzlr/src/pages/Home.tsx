import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Workflow, Globe2, Smartphone, Sparkles, PlugZap, LayoutDashboard, PenTool, ShieldCheck, Clock, TrendingUp, Award, Languages, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "../components/LocalizedLink";
import { useLang } from "../contexts/LanguageContext";
import ParticlesHero from "../components/ParticlesHero";
import HeroHeadline from "../components/HeroHeadline";
import AgentConsole from "../components/AgentConsole";
import MagneticButton from "../components/MagneticButton";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import Heartbeat from "../components/Heartbeat";
import SEO from "../components/SEO";
import AnswerBlock from "../components/AnswerBlock";

const featureIcons = [Clock, TrendingUp, Award, Languages];
const serviceIcons: Record<string, React.ElementType> = {
  "ai-chatbots": Bot,
  "workflow-automation": Workflow,
  "web-development": Globe2,
  "mobile-apps": Smartphone,
  "custom-ai": Sparkles,
  "crm-integration": PlugZap,
  "dashboards": LayoutDashboard,
  "ui-ux": PenTool,
  "consulting": ShieldCheck,
};

/**
 * Homepage FAQ accordion.
 *
 * The answer is always in the DOM and collapsed with CSS, never conditionally
 * rendered. Rendering it only when `open` meant the prerendered homepage
 * shipped five commercial questions with no answer text at all — invisible to
 * crawlers and to answer engines, on the most-linked page on the site.
 *
 * `grid-template-rows` animates from 0fr to 1fr, which collapses the row
 * without needing a measured pixel height, and `visibility` keeps the collapsed
 * copy out of the tab order and out of a screen reader's buffer.
 */
function HomeFAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const answerId = useId();
  return (
    <div className={`rounded-xl border transition-colors overflow-hidden ${open ? "border-cyan-400/30 bg-cyan-400/[0.03]" : "border-foreground/8 bg-foreground/[0.02] hover:border-foreground/15"}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={answerId}
        className="w-full flex items-center justify-between gap-4 p-5 text-left rtl:text-right"
      >
        <span className="text-sm font-medium text-foreground">{q}</span>
        <ChevronDown className={`h-4 w-4 text-foreground/40 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-cyan-300" : ""}`} />
      </button>
      <div
        id={answerId}
        className="grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          visibility: open ? "visible" : "hidden",
        }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm text-foreground/60 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { t, isAr } = useLang();

  return (
    <div data-testid="home-page" className="relative isolation-isolate">
      <SEO pageKey="home" path="/" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-background">
        {/* Background layers - lowest */}
        <div className="absolute inset-0 bg-grid z-0" />
        <div className="absolute inset-0 bg-radial-fade z-0" />
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[120px] z-0" />
        <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[120px] z-0" />
        
        {/* Particles - above background */}
        <div className="absolute inset-0 z-[5]">
          <ParticlesHero id="hero-particles" count={60} themeColors={["#00F0FF", "#2563EB", "#ffffff"]} />
        </div>
        
        <div className="noise absolute inset-0 z-[8]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-28 md:py-32">
          {/* Head row: the claim on one side, the actions on the other. The
              console below is the proof, so the headline block stays short. */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:items-end lg:gap-14">
            <div>
              <span className="font-mono-accent text-xs uppercase tracking-[0.2em] text-foreground/45">
                {isAr ? "// عرض مباشر" : "// live demo"}
              </span>
              <div className="mt-3">
                <HeroHeadline isAr={isAr} size="compact" />
              </div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
                className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-foreground/65">
                {t.home.heroSub}
              </motion.p>
              <div className="mt-7 hidden flex-wrap items-center gap-x-3 gap-y-2 font-mono-accent text-xs uppercase tracking-[0.22em] text-foreground/50 sm:flex">
                {t.home.heroChips.map((c, i) => (
                  <React.Fragment key={i}>
                    <span>{c}</span>
                    {i < t.home.heroChips.length - 1 && <span className="text-cyan-400/70">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col gap-5 lg:items-end">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <MagneticButton to="/contact" testId="hero-cta-getstarted" ctaLocation="home_hero">
                  {isAr ? "احصل على استشارة مجانية" : t.cta.getStarted} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </MagneticButton>
                <MagneticButton to="/services" variant="ghost" testId="hero-cta-services">
                  {t.cta.learnMore}
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-foreground/55">
            {isAr
              ? "بدل أن نصف ما يفعله وكلاؤنا، إليك واحداً وهو يعمل. اختر سيناريو وتابع المحادثة وسجل التنفيذ جنباً إلى جنب."
              : "Instead of describing what our agents do, here is one working. Pick a scenario and watch the conversation and the execution trace side by side."}
          </p>

          <div className="mt-5">
            <AgentConsole />
          </div>
        </div>
      </section>

      <PulseDivider />

      {/* WHY */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <ParticlesHero id="why-particles" count={40} themeColors={["#00F0FF", "#2563EB", "#ffffff"]} />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90">{t.home.whyLabel}</div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-chrome">{t.home.whyTitle}</h2>
              <p className="mt-4 text-foreground/60">{t.home.whySub}</p>
            </div>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.home.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <StaggerItem key={i}>
                  <div className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 h-full hover:border-cyan-400/40 transition-colors">
                    <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                    <div className="flex items-center justify-between">
                      <div className="h-11 w-11 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>
                      <span className="text-[10px] font-mono-accent text-foreground/30 uppercase tracking-[0.2em]">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{f.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-radial-fade opacity-60 z-0" />
        
        {/* Particles Background */}
        <div className="absolute inset-0 z-[5]">
          <ParticlesHero id="services-particles" count={45} themeColors={["#00F0FF", "#2563EB", "#ffffff"]} />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90">{t.home.servicesLabel}</div>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-chrome">{t.home.servicesPreview}</h2>
                <p className="mt-4 text-foreground/60">{t.home.servicesPreviewSub}</p>
              </div>
              <Link to="/services" className="inline-flex items-center gap-2 text-sm font-mono-accent uppercase tracking-[0.22em] text-cyan-300 hover:text-foreground transition-colors">
                {t.cta.viewAll} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </Reveal>
          <Stagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.services.items.slice(0, 6).map((s) => {
              const Icon = serviceIcons[s.key] || Bot;
              return (
                <StaggerItem key={s.key}>
                  <Link to={`/services/${s.key}`} className="group relative block rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 hover:border-cyan-400/40 transition-colors overflow-hidden">
                    <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                    <div className="h-11 w-11 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm text-foreground/55 leading-relaxed">{s.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-mono-accent uppercase tracking-[0.18em] text-cyan-300 group-hover:text-foreground transition-colors">
                      {t.cta.viewDetails} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Answer-first block for AEO */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <AnswerBlock
            question={
              isAr
                ? "ما الفرق بين أتمتة الذكاء الاصطناعي والبرمجيات المخصصة؟"
                : "What is the difference between AI automation and custom software?"
            }
            answer={
              isAr
                ? "البرمجيات المخصصة تطبيق يُبنى وفق عملية الشركة نفسها — بوابة أو لوحة بيانات أو أداة داخلية — حيث يكون المنطق محدداً ومتوقعاً. أتمتة الذكاء الاصطناعي تضيف نماذج ذكاء اصطناعي لمعالجة الخطوات غير المتوقعة تماماً: فهم رسالة، أو تصنيف طلب، أو استخراج بيانات من مستند. ومعظم المشاريع الفعلية تستخدم الاثنين — البرمجيات المخصصة للبنية، والذكاء الاصطناعي للتقدير."
                : "Custom software is an application built to a business's own process — a portal, dashboard, or internal tool — where the logic is defined and predictable. AI automation adds AI models to handle steps that are not fully predictable: understanding a message, classifying a request, extracting data from a document. Most real projects use both — custom software for structure, AI for judgement."
            }
          >
            <p>
              {isAr ? "تقدّم راانزلر الاثنين كخدمة عن بُعد. " : "Raanzlr offers both as a remote service. "}
              <Link to="/services" className="text-cyan-300 hover:underline">
                {isAr ? "استعرض الخدمات" : "Explore services"}
              </Link>
              {isAr ? "، أو اطّلع على الخدمات المتاحة لـ" : ", or see what's available for "}
              <Link to="/markets/united-states" className="text-cyan-300 hover:underline">
                {isAr ? "الشركات الأمريكية" : "US"}
              </Link>
              {isAr ? " و" : " and "}
              <Link to="/markets/canada" className="text-cyan-300 hover:underline">
                {isAr ? "الشركات الكندية" : "Canadian businesses"}
              </Link>
              .
            </p>
          </AnswerBlock>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <ParticlesHero id="faq-particles" count={35} themeColors={["#00F0FF", "#2563EB", "#ffffff"]} />
        </div>
        
        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
                {isAr ? "// الأسئلة الشائعة" : "// FAQ"}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-chrome">
                {isAr ? "الأسئلة الأكثر شيوعاً" : "Questions people always ask"}
              </h2>
            </div>
          </Reveal>
            <div className="space-y-3">
            {(isAr ? [
              { q: "ما الخدمات التي تقدمها Raanzlr؟", a: "نطوّر حلولاً برمجية مخصصة تعتمد على الذكاء الاصطناعي، تشمل وكلاء الذكاء الاصطناعي، روبوتات المحادثة، أتمتة العمليات، تطوير تطبيقات الويب والجوال، ربط الأنظمة المختلفة، بالإضافة إلى بناء حلول ذكاء اصطناعي مخصصة تعتمد على بيانات شركتك وآليات عملها." },
              { q: "هل تدعم حلولكم اللغة العربية؟", a: "نعم، جميع حلولنا تدعم اللغة العربية بالكامل، بما في ذلك الكتابة من اليمين إلى اليسار، مع إمكانية تطوير حلول متعددة اللغات حسب احتياجات مشروعك." },
              { q: "كم يستغرق تنفيذ مشروع نموذجي؟", a: "يعتمد ذلك على نوع المشروع، لكن بصورة عامة: روبوتات المحادثة أو الأتمتة البسيطة من أسبوعين إلى أربعة أسابيع، منصات الويب المتوسطة من شهر إلى شهرين، تطبيقات الجوال أو حلول الذكاء الاصطناعي المتقدمة قد تحتاج إلى فترة أطول بحسب حجم المشروع والتكاملات المطلوبة." },
              { q: "هل تقدمون استشارة أولية مجانية؟", a: "نعم. نوفر جلسة تعريفية أولية لفهم احتياجاتك، مناقشة التحديات التي تواجهها، واقتراح أفضل نقطة للبدء دون أي التزام." },
              { q: "كيف يتم احتساب تكلفة المشروع؟", a: "نعتمد تسعيراً يناسب طبيعة كل مشروع. بعد فهم متطلباتك نقدم عرضاً واضحاً يشمل نطاق العمل، الجدول الزمني، والتكلفة، مع إمكانية التقسيط على مراحل، إضافة إلى خطط دعم وصيانة عند الحاجة." },
            ] : [
              { q: "What services does Raanzlr offer?", a: "We build AI agents & chatbots, workflow automation, web & mobile apps, systems integration, and custom AI solutions for businesses." },
              { q: "Do you fully support Arabic?", a: "Yes — we build every solution with full Arabic support and RTL layout from day one, not as an afterthought." },
              { q: "How long does a typical project take?", a: "Simple chatbot: 2-4 weeks. Website: 4-8 weeks. Custom AI solutions: 6-12 weeks. We provide detailed timelines at project start." },
              { q: "Do you offer a free consultation?", a: "Yes. We offer a free 30-45 minute discovery call to understand your needs and discuss possible solutions — no commitment needed." },
              { q: "How do you price your projects?", a: "We price based on project scope, complexity, and timeline. After understanding your requirements you get a transparent quote covering scope, schedule, and cost, with milestone payments and optional support plans." },
            ]).map((item, i) => (
              <HomeFAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link to={isAr ? "/ar/faq" : "/faq"} className="inline-flex items-center gap-2 text-sm font-mono-accent uppercase tracking-[0.18em] text-cyan-300 hover:text-foreground transition-colors">
                {isAr ? "عرض جميع الأسئلة" : "View all questions"} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        {/* Particles Background */}
        <div className="absolute inset-0 z-0">
          <ParticlesHero id="cta-particles" count={40} themeColors={["#00F0FF", "#2563EB", "#ffffff"]} />
        </div>
        
        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8 sm:p-12 text-center">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative">
                <Heartbeat className="w-40 h-8 mx-auto mb-6" />
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-chrome">
                  {t.services.customEngagementTitle}
                </h3>
                <p className="mt-4 text-foreground/60 max-w-xl mx-auto">{t.services.customEngagementDesc}</p>
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <MagneticButton to="/contact" ctaLocation="home_footer_cta">{t.cta.getStarted}</MagneticButton>
                  <MagneticButton to="/contact" variant="ghost" ctaLocation="home_footer_cta">{t.cta.contactUs}</MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
