import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  Bot, Workflow, Globe2, Smartphone, Sparkles, PlugZap, PenTool, ShieldCheck, ArrowUpRight, Pause, Play
} from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import Heartbeat from "../components/Heartbeat";
import ServiceModal from "../components/ServiceModal";
import SEO from "../components/SEO";

const icons = {
  "ai-chatbots": Bot,
  "workflow-automation": Workflow,
  "web-development": Globe2,
  "mobile-apps": Smartphone,
  "custom-ai": Sparkles,
  "crm-integration": PlugZap,
  "ui-ux": PenTool,
  "consulting": ShieldCheck,
};

// Auto-rotating hero preview card.
// - Rotates every 2.5s
// - Pauses while hovered
// - No image flash: all images are stacked & opacity-toggled
const HeroAutoPreview = () => {
  const { t } = useLang();
  const items = t.services.items;
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const containerRef = useRef(null);

  // Preload all images so that the first display has zero flash
  useEffect(() => {
    let mounted = true;
    let loaded = 0;
    items.forEach((s) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded += 1;
        if (loaded >= items.length && mounted) setImagesReady(true);
      };
      img.src = s.image;
    });
    return () => { mounted = false; };
  }, [items]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % items.length);
    }, 2500);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const active = items[activeIdx];
  const Icon = icons[active.key] || Bot;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      data-testid="hero-auto-preview"
      className="relative w-full max-w-3xl mx-auto"
    >
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden">

        {/* Stacked image layers — all preloaded, only one visible */}
        <div className="absolute inset-0">
          {items.map((s, i) => (
            <img
              key={s.key}
              src={s.image}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out pointer-events-none"
              style={{ opacity: i === activeIdx && imagesReady ? 0.22 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#050505]/70 to-transparent" />
        </div>

        {/* Decoration — grid + conic glow */}
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute -inset-32 opacity-50 pointer-events-none">
          <div
            className="w-full h-full slow-spin"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(0,240,255,0.32) 60deg, transparent 130deg, transparent 220deg, rgba(37,99,235,0.28) 280deg, transparent 340deg)",
              filter: "blur(40px)",
            }}
          />
        </div>

        {/* Foreground content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10"
          >
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl border border-cyan-400/40 bg-cyan-400/10 flex items-center justify-center">
                <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-cyan-300" />
              </div>
              <span className={`text-[10px] font-mono-accent uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${active.tier === "high" ? "border-cyan-400/50 text-cyan-300 bg-cyan-400/10" : "border-white/10 text-white/40"}`}>
                {active.tier === "high" ? t.services.highDemand : t.services.standard}
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {active.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm sm:text-base text-white/65 leading-relaxed">
              {active.desc}
            </p>
            <Heartbeat className="absolute bottom-3 left-6 right-6 rtl:left-6 rtl:right-6 h-5 sm:h-6 opacity-60" />
          </motion.div>
        </AnimatePresence>

        {/* Pause indicator */}
        <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono-accent uppercase tracking-[0.2em] text-white/60 pointer-events-none">
          {paused ? <Pause className="h-3 w-3 text-cyan-300" /> : <Play className="h-3 w-3 text-cyan-300" />}
          {paused ? "paused" : "auto"}
        </div>

        {/* Corner ticks */}
        {[
          ["top-3 left-3", "border-t border-l"],
          ["bottom-3 left-3", "border-b border-l"],
          ["bottom-3 right-3", "border-b border-r"],
        ].map(([pos, b], i) => (
          <span key={i} className={`absolute ${pos} h-5 w-5 ${b} border-cyan-400/40 pointer-events-none`} />
        ))}
      </div>

      {/* Progress dots */}
      <div className="mt-5 flex items-center justify-center gap-1.5 flex-wrap">
        {items.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActiveIdx(i)}
            data-testid={`hero-preview-dot-${s.key}`}
            aria-label={`Show ${s.title}`}
            className={`h-1.5 rounded-full transition-all ${i === activeIdx ? "w-8 bg-cyan-300" : "w-3 bg-white/15 hover:bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  const { t } = useLang();
  const [openSvc, setOpenSvc] = useState(null);
  const [params, setParams] = useSearchParams();

  // Open a service from ?open=<key> (used when arriving from Home)
  useEffect(() => {
    const key = params.get("open");
    if (!key) return;
    const found = t.services.items.find((x) => x.key === key);
    if (found) setOpenSvc(found);
    // Clean the query so it doesn't re-fire on language toggle
    const next = new URLSearchParams(params);
    next.delete("open");
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div data-testid="services-page" className="relative">
      <SEO pageKey="services" path="/services" />

      {/* HERO */}
      <section data-testid="services-hero" className="relative min-h-[90vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-[100px]" />
        <div className="noise absolute inset-0" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-[10px] sm:text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300"
          >
            {t.services.eyebrow}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-4xl font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tighter text-chrome"
          >
            {t.services.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-white/65"
          >
            {t.services.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-10 sm:mt-12"
          >
            <HeroAutoPreview />
          </motion.div>

          <div className="mt-10 flex justify-center">
            <MagneticButton to="/contact" testId="services-hero-cta">
              {t.cta.requestAService}
            </MagneticButton>
          </div>
        </div>
      </section>

      <PulseDivider />

      {/* GRID */}
      <section data-testid="services-grid-section" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.services.items.map((s) => {
              const Icon = icons[s.key] || Bot;
              const isHigh = s.tier === "high";
              return (
                <StaggerItem key={s.key}>
                  <button
                    type="button"
                    onClick={() => setOpenSvc(s)}
                    data-testid={`service-card-${s.key}`}
                    className="group relative block w-full text-left rtl:text-right h-full rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-cyan-400/50 transition-colors overflow-hidden focus:border-cyan-400/60"
                  >
                    <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>
                      <span className={`text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${isHigh ? "border-cyan-400/50 text-cyan-300 bg-cyan-400/10" : "border-white/10 text-white/40"}`}>
                        {isHigh ? t.services.highDemand : t.services.standard}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl sm:text-2xl font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300 group-hover:text-white transition-colors">
                      {t.cta.viewDetails} <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                    </span>
                  </button>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8 sm:p-10 md:p-14 text-center">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative">
                <Heartbeat className="w-32 sm:w-40 h-7 sm:h-8 mx-auto mb-6" />
                <h3 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-chrome">
                  {t.services.customEngagementTitle}
                </h3>
                <p className="mt-4 text-white/60 max-w-xl mx-auto text-sm sm:text-base">
                  {t.services.customEngagementDesc}
                </p>
                <div className="mt-8 flex justify-center gap-3 sm:gap-4 flex-wrap">
                  <MagneticButton to="/contact" testId="services-cta-bottom">{t.cta.requestAService}</MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ServiceModal service={openSvc} onClose={() => setOpenSvc(null)} />
    </div>
  );
};

export default Services;
