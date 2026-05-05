import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Rocket, ShieldCheck, Headphones } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import PulseDivider from "../components/PulseDivider";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import MagneticButton from "../components/MagneticButton";
import Heartbeat from "../components/Heartbeat";
import SEO from "../components/SEO";

const VALUE_ICONS = [Rocket, ShieldCheck, Headphones];

// Animated radar overlay over the parallax skyline
const HeroRadar = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Sweeping radar */}
    <div className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full border border-cyan-400/15">
      <div className="absolute inset-0 rounded-full border border-cyan-400/10" style={{ transform: "scale(0.85)" }} />
      <div className="absolute inset-0 rounded-full border border-cyan-400/10" style={{ transform: "scale(0.7)" }} />
      <div className="absolute inset-0 rounded-full border border-cyan-400/15" style={{ transform: "scale(0.55)" }} />
      <div
        className="absolute inset-0 slow-spin"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(0,240,255,0.35) 0deg, transparent 60deg, transparent 360deg)",
          mixBlendMode: "screen",
          filter: "blur(2px)",
        }}
      />
    </div>

    {/* Drifting data points */}
    {[
      ["20%", "30%", 0],
      ["75%", "20%", 0.4],
      ["35%", "70%", 0.8],
      ["80%", "65%", 1.2],
      ["55%", "45%", 1.6],
    ].map(([x, y, d], i) => (
      <motion.span
        key={i}
        className="absolute h-2 w-2 rounded-full bg-cyan-300"
        style={{ left: x, top: y, boxShadow: "0 0 10px 3px rgba(0,240,255,0.6)" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 1, 0.6], scale: [0.6, 1.2, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: d }}
      />
    ))}

    {/* Horizontal scan beams */}
    {[0, 1].map((i) => (
      <motion.div
        key={`scan-${i}`}
        className="absolute inset-x-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.7), transparent)",
          filter: "drop-shadow(0 0 4px rgba(0,240,255,0.6))",
        }}
        initial={{ y: "0%" }}
        animate={{ y: ["0%", "100vh"] }}
        transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "linear", delay: i * 2 }}
      />
    ))}

    {/* Faint code/coordinates */}
    <div className="absolute bottom-8 left-6 font-mono-accent text-[10px] uppercase tracking-[0.3em] text-white/30">
      lat 24.4539 · lon 54.3773 · range 8200 km
    </div>
  </div>
);

const About = () => {
  const { t } = useLang();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <div data-testid="about-page" className="relative">
      <SEO pageKey="about" path="/about" />

      {/* HERO */}
      <section ref={heroRef} data-testid="about-hero" className="relative min-h-[100vh] overflow-hidden flex items-center">
        {/* Skyline */}
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1772090131833-f7db87feab28?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxkdWJhaSUyMHNreWxpbmUlMjBuaWdodCUyMG1vZGVybnxlbnwwfHx8fDE3Nzc4NTA3ODJ8MA&ixlib=rb-4.1.0&q=85"
            alt="Modern skyline"
            className="w-full h-[130%] object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/70 to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 to-transparent" />
        </motion.div>

        {/* Midground grid */}
        <motion.div style={{ y: midY }} className="absolute inset-0 bg-grid opacity-40" />

        {/* Radar */}
        <HeroRadar />

        <motion.div style={{ y: textY, opacity }} className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-28 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-[10px] sm:text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300"
          >
            {t.about.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="mt-6 max-w-4xl font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tighter text-chrome"
          >
            {t.about.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed"
          >
            {t.about.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10"
          >
            <Heartbeat className="w-56 sm:w-64 h-10" />
          </motion.div>
        </motion.div>
      </section>

      <PulseDivider />

      {/* VALUES */}
      <section data-testid="about-values" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90">// principles</div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-chrome">
                How we think, how we build.
              </h2>
            </div>
          </Reveal>

          <Stagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.about.values.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <StaggerItem key={i}>
                  <div
                    data-testid={`about-value-${i}`}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 h-full hover:border-cyan-400/40 transition-colors"
                  >
                    <div className="shimmer-layer absolute inset-0 pointer-events-none" />
                    <div className="h-11 w-11 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold text-white">{v.title}</h3>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed">{v.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* HQ */}
      <section data-testid="about-hq" className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 sm:p-10 md:p-14">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative grid md:grid-cols-2 gap-8 md:gap-10 items-center">
                <div>
                  <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90">// {t.about.hq}</div>
                  <h3 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-chrome">{t.about.hqTitle}</h3>
                  <p className="mt-4 text-white/65 max-w-md text-sm sm:text-base">{t.about.hqDesc}</p>
                  <div className="mt-6 flex items-start gap-3 text-white/80">
                    <MapPin className="h-5 w-5 text-cyan-300 mt-0.5 shrink-0" />
                    <span dir="ltr" className="text-sm sm:text-base">{t.about.address}</span>
                  </div>
                  <div className="mt-8">
                    <MagneticButton to="/contact" testId="about-cta-contact">{t.cta.contactUs}</MagneticButton>
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1680992046626-418f7e910589?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwZGFyayUyMGJsdWUlMjBsaWdodHxlbnwwfHx8fDE3Nzc4NTA3ODJ8MA&ixlib=rb-4.1.0&q=85"
                    alt="Operations"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Heartbeat className="w-full h-6" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default About;
