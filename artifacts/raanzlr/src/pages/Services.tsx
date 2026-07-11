import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bot, Workflow, Globe2, Smartphone, Sparkles, PlugZap, PenTool, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import Heartbeat from "../components/Heartbeat";
import SEO from "../components/SEO";

const icons: Record<string, React.ElementType> = {
  "ai-chatbots": Bot,
  "workflow-automation": Workflow,
  "web-development": Globe2,
  "mobile-apps": Smartphone,
  "custom-ai": Sparkles,
  "crm-integration": PlugZap,
  "ui-ux": PenTool,
  "consulting": ShieldCheck,
};

export default function Services() {
  const { t } = useLang();

  return (
    <div className="relative">
      <SEO pageKey="services" path="/services" />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="noise absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300">
            {t.services.eyebrow}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-4xl font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tighter text-chrome">
            {t.services.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-foreground/65">
            {t.services.sub}
          </motion.p>
        </div>
      </section>

      <PulseDivider />

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.services.items.map((s) => {
              const Icon = icons[s.key] || Bot;
              const isHigh = s.tier === "high";
              return (
                <StaggerItem key={s.key}>
                  <Link to={`/services/${s.key}`}
                    className="group relative flex flex-col w-full text-left rtl:text-right h-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:border-cyan-400/50 transition-colors overflow-hidden">
                    <div className="shimmer-layer absolute inset-0 pointer-events-none z-10" />
                    <div className="relative h-40 overflow-hidden">
                      <img src={s.image} alt={s.title} loading="lazy"
                        className="w-full h-full object-cover opacity-55 group-hover:opacity-70 dark:opacity-40 dark:group-hover:opacity-60 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
                      <span className={`absolute top-3 right-3 rtl:right-auto rtl:left-3 text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${isHigh ? "border-cyan-400/50 text-cyan-300 bg-cyan-400/10" : "border-blue-400/50 text-blue-300 bg-blue-400/10"}`}>
                        {isHigh ? t.services.highDemand : t.services.standard}
                      </span>
                      <div className="absolute bottom-3 left-4 rtl:left-auto rtl:right-4">
                        <div className="h-12 w-12 rounded-xl border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="h-5 w-5 text-cyan-300" />
                        </div>
                      </div>
                    </div>
                    <div className="relative p-7 flex flex-col flex-1">
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground">{s.title}</h3>
                      <p className="mt-2 text-sm text-foreground/60 leading-relaxed flex-1">{s.desc}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300 group-hover:text-foreground transition-colors">
                        {t.cta.viewDetails} <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8 sm:p-10 md:p-14 text-center">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative">
                <Heartbeat className="w-32 sm:w-40 h-7 sm:h-8 mx-auto mb-6" />
                <h3 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-chrome">{t.services.customEngagementTitle}</h3>
                <p className="mt-4 text-foreground/60 max-w-xl mx-auto text-sm sm:text-base">{t.services.customEngagementDesc}</p>
                <div className="mt-8 flex justify-center gap-3 sm:gap-4 flex-wrap">
                  <MagneticButton to="/contact">{t.cta.requestAService}</MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
