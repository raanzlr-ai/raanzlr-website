import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Zap, ArrowRight, CheckCircle2, ArrowLeft, ChevronDown } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import Heartbeat from "../components/Heartbeat";
import SEO from "../components/SEO";
import { INDUSTRY_DETAILS } from "../data/industriesData";

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { isAr } = useLang();
  
  const industry = INDUSTRY_DETAILS.find(i => i.slug === slug);
  
  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  const content = isAr ? industry.ar : industry.en;

  return (
    <div className="relative">
      <SEO
        title={`${industry.en.name} — Industry — Raanzlr`}
        titleAr={`${industry.ar.name} — قطاع — Raanzlr`}
        description={industry.en.metaDescription}
        descriptionAr={industry.ar.metaDescription}
        keywords={industry.en.keywords}
        keywordsAr={industry.ar.keywords}
        path={`/industries/${slug}`}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0">
          <img src={industry.heroImage} alt={content.name} loading="eager" fetchPriority="high" className="w-full h-full object-cover opacity-40 dark:opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/50 to-background dark:from-background/70 dark:via-background/85" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="noise absolute inset-0" />
        <div className="absolute -top-20 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/industries" className="inline-flex items-center gap-2 text-xs font-mono-accent uppercase tracking-[0.18em] text-foreground/50 hover:text-cyan-300 transition-colors mb-6">
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
              {isAr ? "العودة إلى القطاعات" : "Back to Industries"}
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300">
            <Building2 className="h-3.5 w-3.5" />
            {isAr ? "القطاعات" : "INDUSTRIES"}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tighter text-chrome">
            {content.heroTitle}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }} className="mt-6 max-w-3xl text-base md:text-lg text-foreground/65 leading-relaxed">
            {content.heroDescription}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }} className="mt-10 flex flex-wrap gap-4">
            <MagneticButton to="/contact">{isAr ? "تواصل معنا" : "Get Started"}</MagneticButton>
            <MagneticButton to="/services" variant="ghost">{isAr ? "استعرض الخدمات" : "View Services"}</MagneticButton>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }} className="mt-10">
            <Heartbeat className="w-48 h-8" />
          </motion.div>
        </div>
      </section>

      <PulseDivider />

      {/* Overview Section */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7">
                <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
                  {isAr ? "// نظرة عامة" : "// Overview"}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-chrome mb-6">
                  {content.overviewTitle}
                </h2>
                <div className="space-y-4 text-foreground/70 leading-relaxed">
                  {content.overviewParagraphs.map((para, i) => <p key={i}>{para}</p>)}
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="relative">
                    <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300 mb-6">
                      {isAr ? "// المزايا الرئيسية" : "// Key Advantages"}
                    </div>
                    <ul className="space-y-4">
                      {content.keyAdvantages.map((adv, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground/80">{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-16 sm:py-20 bg-foreground/[0.01]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
              {isAr ? "// الخدمات" : "// Services"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-chrome mb-12">
              {content.servicesTitle}
            </h2>
          </Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.services.map((service, i) => (
              <StaggerItem key={i}>
                <div className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:border-cyan-400/30 transition-colors p-6 h-full">
                  <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                  <div className="h-10 w-10 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center mb-4">
                    <Zap className="h-5 w-5 text-cyan-300" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{service.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.3}>
            <div className="mt-10 text-center">
              <Link to="/services" className="inline-flex items-center gap-2 text-sm font-mono-accent uppercase tracking-[0.18em] text-cyan-300 hover:text-foreground transition-colors">
                {isAr ? "عرض جميع الخدمات" : "View All Services"}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
              {isAr ? "// حالات الاستخدام" : "// Use Cases"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-chrome mb-6">
              {content.useCasesTitle}
            </h2>
            <p className="text-foreground/60 max-w-3xl mb-12">{content.useCasesIntro}</p>
          </Reveal>
          <Stagger className="grid md:grid-cols-2 gap-6">
            {content.useCases.map((uc, i) => (
              <StaggerItem key={i}>
                <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 h-full">
                  <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center shrink-0">
                      <span className="text-cyan-300 font-mono-accent text-sm">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">{uc.title}</h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">{uc.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Raanzlr Section */}
      <section className="relative py-16 sm:py-20 bg-foreground/[0.01]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-10 sm:p-14">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="relative">
                <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300 mb-4">
                  {isAr ? "// لماذا Raanzlr" : "// Why Raanzlr"}
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {content.whyRaanzlrTitle}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                  {content.whyRaanzlr.map((reason, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
              {isAr ? "// أسئلة شائعة" : "// FAQ"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-chrome mb-12">
              {content.faqTitle}
            </h2>
          </Reveal>
          <Stagger className="space-y-4">
            {content.faqs.map((faq, i) => (
              <StaggerItem key={i}>
                <details className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:border-cyan-400/30 transition-colors">
                  <summary className="relative px-6 py-5 cursor-pointer list-none flex items-start justify-between gap-4">
                    <span className="font-display text-base sm:text-lg font-semibold text-foreground pr-4">{faq.q}</span>
                    <ChevronDown className="h-5 w-5 text-cyan-300 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-foreground/70 leading-relaxed text-sm">{faq.a}</div>
                </details>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8 sm:p-12 text-center">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative">
                <Heartbeat className="w-40 h-8 mx-auto mb-6" />
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-chrome">
                  {content.ctaTitle}
                </h3>
                <p className="mt-4 text-foreground/60 max-w-xl mx-auto">{content.ctaDescription}</p>
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <MagneticButton to="/contact">{isAr ? "تواصل معنا الآن" : "Contact Us Now"}</MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
