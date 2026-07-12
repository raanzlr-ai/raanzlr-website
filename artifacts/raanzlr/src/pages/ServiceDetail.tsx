import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Workflow,
  Globe2,
  Smartphone,
  Sparkles,
  PlugZap,
  PenTool,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Building2,
  Users,
  BarChart3,
  GitCompareArrows,
  Cpu,
  Check,
  X,
} from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";
import ServiceChart from "../components/ServiceChart";
import { getServiceRich } from "../data/servicesRich";

const icons: Record<string, React.ElementType> = {
  "ai-chatbots": Bot,
  "workflow-automation": Workflow,
  "web-development": Globe2,
  "mobile-apps": Smartphone,
  "custom-ai": Sparkles,
  "crm-integration": PlugZap,
  "ui-ux": PenTool,
  consulting: ShieldCheck,
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, isAr } = useLang();

  const service = t.services.items.find((s: any) => s.key === slug);
  if (!service) return <Navigate to="/services" replace />;

  // Get both language versions for proper bilingual SEO
  const enSvc = translations.en.services.items.find((s: any) => s.key === slug);
  const arSvc = translations.ar.services.items.find((s: any) => s.key === slug);

  const Icon = icons[service.key] ?? Sparkles;
  const others = t.services.items.filter((s: any) => s.key !== slug).slice(0, 3);
  const rich = getServiceRich(isAr ? "ar" : "en", service.key);

  const L = (en: string, ar: string) => (isAr ? ar : en);

  // Service structured data (per-service), provided by the Raanzlr Organization.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "serviceType": enSvc?.title ?? service.title,
    "description": service.desc,
    "provider": { "@id": "https://raanzlr.com/#organization" },
    "areaServed": ["SA", "AE", "QA", "KW", "BH", "OM", "SY", "TR", "EU", "US"],
    "availableLanguage": ["ar", "en", "tr"],
    "inLanguage": isAr ? "ar" : "en",
    "url": `https://raanzlr.com/${isAr ? "ar" : "en"}/services/${service.key}`,
    ...(rich
      ? {
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": service.title,
            "itemListElement": rich.capabilities.map((c) => ({
              "@type": "Offer",
              "itemOffered": { "@type": "Service", "name": c.title, "description": c.desc },
            })),
          },
        }
      : {}),
  };

  return (
    <div className="relative">
      <SEO
        title={`${enSvc?.title ?? service.title} — Raanzlr`}
        titleAr={`${arSvc?.title ?? service.title} — Raanzlr`}
        description={enSvc?.desc ?? service.desc}
        descriptionAr={arSvc?.desc ?? service.desc}
        keywords={`${enSvc?.title}, AI GCC, automation MENA, software development`}
        keywordsAr={`${arSvc?.title}، ذكاء اصطناعي الخليج، أتمتة الشرق الأوسط`}
        path={`/services/${service.key}`}
        schema={serviceSchema}
      />

      {/* Hero */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-50 dark:opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/45 to-background dark:from-background/60 dark:via-background/80" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-20 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="noise absolute inset-0" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-mono-accent uppercase tracking-[0.18em] text-foreground/50 hover:text-cyan-300 transition-colors mb-8"
            >
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
              {isAr ? "العودة إلى الخدمات" : "Back to Services"}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center h-16 w-16 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 mb-6"
          >
            <Icon className="h-8 w-8 text-cyan-300" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mb-4"
          >
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] font-mono-accent uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${
                service.tier === "high"
                  ? "border-cyan-400/40 text-cyan-300 bg-cyan-400/10"
                  : "border-foreground/15 text-foreground/50"
              }`}
            >
              {service.tier === "high"
                ? isAr
                  ? "طلب مرتفع"
                  : t.services.highDemand
                : isAr
                ? "متاح"
                : t.services.standard}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome max-w-3xl"
          >
            {service.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-foreground/65 leading-relaxed"
          >
            {rich?.tagline ?? service.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <MagneticButton to={`/contact?service=${encodeURIComponent(service.title)}`}>
              {t.cta.requestService}
            </MagneticButton>
            <MagneticButton to="/case-studies" variant="ghost">
              {isAr ? "عرض الأعمال" : "View Our Work"}
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <PulseDivider />

      {/* Metrics band */}
      {rich && (
        <section className="relative py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {rich.metrics.map((m, i) => (
                <StaggerItem key={i}>
                  <div className="relative h-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 overflow-hidden group hover:border-cyan-400/30 transition-colors">
                    <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-cyan-400/5 blur-2xl group-hover:bg-cyan-400/10 transition-colors" />
                    <div className="relative">
                      <div className="font-display text-3xl sm:text-4xl font-bold text-chrome">{m.value}</div>
                      <div className="mt-2 text-sm text-foreground/55 leading-relaxed">{m.label}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Overview + Helps */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-14">
            {/* Long description */}
            <div className="lg:col-span-3">
              <Reveal>
                <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300 mb-5">
                  {isAr ? "// نظرة عامة" : "// Overview"}
                </p>
                <p className="text-foreground/70 text-base sm:text-lg leading-[1.85]">
                  {service.long}
                </p>
              </Reveal>
            </div>

            {/* Helps list */}
            <div className="lg:col-span-2">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 sm:p-8">
                  <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-foreground/40 mb-6">
                    {isAr ? "// كيف يساعدك هذا" : "// How This Helps You"}
                  </p>
                  <ul className="space-y-4">
                    {service.helps.map((h: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/70 leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities — what's included */}
      {rich && (
        <section className="relative py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-3">
                <Layers className="h-5 w-5 text-cyan-300" />
                <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300">
                  {L("// What's inside", "// ما الذي يشمله")}
                </p>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-chrome max-w-2xl">
                {L("Everything that powers this service", "كل ما يقف خلف هذه الخدمة")}
              </h2>
            </Reveal>
            <Stagger className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rich.capabilities.map((c, i) => (
                <StaggerItem key={i}>
                  <div className="group relative h-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 hover:border-cyan-400/40 transition-colors overflow-hidden">
                    <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                    <div className="relative">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-cyan-400/30 bg-cyan-400/5 text-cyan-300 font-mono-accent text-xs">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 font-display text-base font-semibold text-foreground leading-snug">{c.title}</h3>
                      <p className="mt-2 text-sm text-foreground/55 leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* For companies / For customers */}
      {rich && (
        <section className="relative py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-5">
              <Reveal>
                <div className="h-full rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-7 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-cyan-400/30 bg-cyan-400/10">
                      <Building2 className="h-5 w-5 text-cyan-300" />
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground">
                      {L("For your company", "لشركتك")}
                    </h3>
                  </div>
                  <ul className="space-y-3.5">
                    {rich.forCompanies.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/70 leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="h-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-7 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-foreground/15 bg-foreground/[0.04]">
                      <Users className="h-5 w-5 text-foreground/70" />
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground">
                      {L("For your customers", "لعملائك")}
                    </h3>
                  </div>
                  <ul className="space-y-3.5">
                    {rich.forCustomers.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-foreground/40 shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/70 leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* By the numbers — chart + comparison table */}
      {rich && (
        <section className="relative py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-5 items-stretch">
              {/* Chart */}
              <Reveal>
                <div className="h-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-1">
                    <BarChart3 className="h-5 w-5 text-cyan-300" />
                    <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300">
                      {L("// By the numbers", "// بالأرقام")}
                    </p>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-5">{rich.chart.title}</h3>
                  <ServiceChart chart={rich.chart} />
                  <p className="mt-4 text-[11px] text-foreground/35 leading-relaxed">
                    {L("Source:", "المصدر:")} {rich.chart.source}
                  </p>
                </div>
              </Reveal>

              {/* Comparison table */}
              <Reveal delay={0.1}>
                <div className="h-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-1">
                    <GitCompareArrows className="h-5 w-5 text-cyan-300" />
                    <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300">
                      {L("// Compared", "// مقارنة")}
                    </p>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-5">{rich.comparison.title}</h3>
                  <div className="overflow-hidden rounded-xl border border-foreground/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-foreground/[0.03]">
                          <th className="py-3 px-3 text-start text-[11px] font-mono-accent uppercase tracking-[0.12em] text-foreground/35 font-medium" />
                          <th className="py-3 px-3 text-start text-[11px] font-mono-accent uppercase tracking-[0.12em] text-foreground/45 font-medium">
                            {rich.comparison.colA}
                          </th>
                          <th className="py-3 px-3 text-start text-[11px] font-mono-accent uppercase tracking-[0.12em] text-cyan-300 font-medium bg-cyan-400/[0.06]">
                            {rich.comparison.colB}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rich.comparison.rows.map((r, i) => (
                          <tr key={i} className="border-t border-foreground/[0.06]">
                            <td className="py-3 px-3 align-top text-foreground/45 text-[12px] font-medium">{r.aspect}</td>
                            <td className="py-3 px-3 align-top text-foreground/55 text-[12px] leading-relaxed">
                              <span className="inline-flex items-start gap-1.5">
                                <X className="h-3.5 w-3.5 text-foreground/25 shrink-0 mt-0.5" />
                                {r.a}
                              </span>
                            </td>
                            <td className="py-3 px-3 align-top text-foreground/80 text-[12px] leading-relaxed bg-cyan-400/[0.04]">
                              <span className="inline-flex items-start gap-1.5">
                                <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                {r.b}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Process timeline */}
      {rich && (
        <section className="relative py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-3">
                <Workflow className="h-5 w-5 text-cyan-300" />
                <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300">
                  {L("// How we deliver", "// كيف ننفّذ")}
                </p>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-chrome">
                {L("From kickoff to launch", "من الانطلاق إلى الإطلاق")}
              </h2>
            </Reveal>
            <Stagger className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {rich.process.map((p, i) => (
                <StaggerItem key={i}>
                  <div className="relative h-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 hover:border-cyan-400/30 transition-colors">
                    <div className="font-mono-accent text-2xl font-bold text-cyan-400/30">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {i < rich.process.length - 1 && (
                      <ArrowRight className="hidden lg:block absolute top-6 -right-2 h-4 w-4 text-cyan-400/40 rtl:rotate-180 rtl:-right-auto rtl:-left-2" />
                    )}
                    <h3 className="mt-2 font-display text-sm font-semibold text-foreground leading-snug">{p.title}</h3>
                    <p className="mt-1.5 text-xs text-foreground/50 leading-relaxed">{p.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Tech stack */}
      {rich && (
        <section className="relative py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <Reveal>
              <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-7 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Cpu className="h-5 w-5 text-cyan-300" />
                  <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300">
                    {L("// Tools & stack", "// الأدوات والتقنيات")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {rich.stack.map((s, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-lg border border-foreground/10 bg-foreground/[0.03] px-3 py-1.5 text-xs font-mono-accent text-foreground/70 hover:border-cyan-400/30 hover:text-cyan-200 transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA section */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Reveal>
            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.04] px-8 py-12 sm:py-16">
              <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300 mb-4">
                {isAr ? "// ابدأ مشروعك" : "// Start Your Project"}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {isAr
                  ? `هل تحتاج إلى ${service.title}?`
                  : `Ready to build ${service.title}?`}
              </h2>
              <p className="text-foreground/55 mb-8 max-w-md mx-auto">
                {isAr
                  ? "أخبرنا عن مشروعك وسيتواصل معك مهندس أول خلال يوم عمل واحد."
                  : "Tell us about your project and a senior engineer will be in touch within one business day."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                >
                  {t.cta.requestService}
                </MagneticButton>
                <MagneticButton to="/contact" variant="ghost">
                  {t.cta.contactUs}
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      {others.length > 0 && (
        <section className="relative pb-24 pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center justify-between mb-8">
                <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-foreground/40">
                  {isAr ? "// خدمات أخرى" : "// Other Services"}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 transition-colors font-mono-accent"
                >
                  {isAr ? "كل الخدمات" : "All services"}
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </Reveal>
            <Stagger className="grid sm:grid-cols-3 gap-5">
              {others.map((s: any) => {
                const OtherIcon = icons[s.key] ?? Sparkles;
                return (
                  <StaggerItem key={s.key}>
                    <Link
                      to={`/services/${s.key}`}
                      className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:border-cyan-400/25 transition-colors p-6 flex flex-col h-full block"
                    >
                      <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-foreground/15 bg-foreground/[0.04] mb-4 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/8 transition-colors">
                        <OtherIcon className="h-5 w-5 text-foreground/60 group-hover:text-cyan-300 transition-colors" />
                      </div>
                      <h3 className="font-display text-base font-semibold text-foreground mb-2 leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-sm text-foreground/50 leading-relaxed flex-1">{s.desc}</p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs text-cyan-400 font-mono-accent">
                        {isAr ? "تعرف أكثر" : "Learn more"}
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}
    </div>
  );
}
