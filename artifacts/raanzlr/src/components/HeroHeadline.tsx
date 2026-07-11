import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Rotating hero headline — typewriter.
 *
 * Types a phrase out character by character, holds, deletes it, then types the
 * next one. The `lead` renders in metallic chrome and the emphasized `accent`
 * carries the animated gradient sweep + glow (`.hero-accent` in index.css). A
 * blinking caret (`.type-caret`) trails the text.
 *
 * A fixed min-height reserves space so the subtitle below never shifts as
 * phrases of different lengths wrap. Respects `prefers-reduced-motion` (no
 * typing — phrases simply crossfade on an interval).
 */

type Phrase = { lead: string; accent: string };

// The previous static headline ("نبني ذكاءً اصطناعياً / يخدم أعمالك / فعلاً.")
// is intentionally excluded — the client flagged it as reading like AI copy.
const PHRASES_AR: Phrase[] = [
  { lead: "نبني ذكاءً اصطناعياً مصمماً", accent: "ليخدم أعمالك وفريقك" },
  { lead: "نطوّر حلولاً ذكية تساعد", accent: "عملك على نمو أسرع" },
  { lead: "نحوّل أفكارك إلى", accent: "حلول رقمية تعمل بذكاء" },
  { lead: "تقنية تجعل عملك", accent: "أسرع وأكثر كفاءة" },
  { lead: "نصمّم أنظمة رقمية ترفع", accent: "كفاءة شركتك ونموها" },
];

const PHRASES_EN: Phrase[] = [
  { lead: "We build AI engineered", accent: "to serve your business" },
  { lead: "We ship smart systems that", accent: "grow your business faster" },
  { lead: "We turn your ideas into", accent: "digital products that think" },
  { lead: "Technology that makes your", accent: "work faster and sharper" },
  { lead: "We design digital systems that", accent: "scale your company" },
];

const TYPE_MS = 55; // per-character while typing
const DELETE_MS = 26; // per-character while deleting
const HOLD_FULL_MS = 1800; // pause once a phrase is fully typed
const HOLD_EMPTY_MS = 360; // pause once cleared, before the next phrase
const REDUCED_ROTATE_MS = 3600; // plain crossfade interval when motion is reduced
const SEP = " ";

type Phase = "typing" | "hold" | "deleting";

export default function HeroHeadline({ isAr }: { isAr: boolean }) {
  const phrases = isAr ? PHRASES_AR : PHRASES_EN;
  const reduce = useReducedMotion();

  const [pIdx, setPIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  const phrase = phrases[pIdx] ?? phrases[0];
  const leadLen = phrase.lead.length;
  const full = `${phrase.lead}${SEP}${phrase.accent}`;

  // Restart cleanly when the language switches.
  useEffect(() => {
    setPIdx(0);
    setCount(0);
    setPhase("typing");
  }, [isAr]);

  // Reduced motion: no typing — just cycle phrases on a gentle interval.
  useEffect(() => {
    if (!reduce) return;
    const id = setInterval(() => setPIdx((i) => (i + 1) % phrases.length), REDUCED_ROTATE_MS);
    return () => clearInterval(id);
  }, [reduce, phrases.length]);

  // Typewriter state machine. Pauses while the tab is hidden (no wasted CPU).
  useEffect(() => {
    if (reduce) return;
    let hidden = typeof document !== "undefined" && document.visibilityState === "hidden";
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (hidden) return; // resumes via the visibility listener
      if (phase === "typing") {
        if (count < full.length) timer = setTimeout(() => setCount((c) => c + 1), TYPE_MS);
        else timer = setTimeout(() => setPhase("hold"), 0);
      } else if (phase === "hold") {
        timer = setTimeout(() => setPhase("deleting"), HOLD_FULL_MS);
      } else if (count > 0) {
        timer = setTimeout(() => setCount((c) => c - 1), DELETE_MS);
      } else {
        timer = setTimeout(() => {
          setPIdx((i) => (i + 1) % phrases.length);
          setPhase("typing");
        }, HOLD_EMPTY_MS);
      }
    };

    step();

    const onVisibility = () => {
      hidden = document.visibilityState === "hidden";
      if (!hidden) {
        clearTimeout(timer);
        step();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, phase, pIdx, reduce, full.length, phrases.length]);

  const shown = reduce ? full : full.slice(0, count);
  const leadShown = shown.slice(0, leadLen);
  const accentShown = shown.length > leadLen ? shown.slice(leadLen) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="mt-6"
    >
      {/*
        Every phrase is rendered invisibly into the same grid cell, so the
        container is permanently as tall as the tallest phrase wraps at the
        current viewport width. The animated headline overlays that space —
        the hero section never grows or shrinks while typing.
      */}
      <div className="grid max-w-2xl">
        {phrases.map((p, i) => (
          <span
            key={i}
            aria-hidden
            className="invisible col-start-1 row-start-1 font-display font-bold leading-[1.1] tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {p.lead}
            {SEP}
            {p.accent}
            {/* caret width so mid-typing wraps never exceed the reserved space */}
            <span className="mx-1 inline-block w-[3px] sm:w-[4px]" />
          </span>
        ))}
        <h1
          aria-label={full}
          className="col-start-1 row-start-1 font-display font-bold leading-[1.1] tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span aria-hidden className="text-chrome">
            {leadShown}
          </span>
          <span aria-hidden className="hero-accent glow-text">
            {accentShown}
          </span>
          {!reduce && (
            <span
              aria-hidden
              className="type-caret mx-1 inline-block w-[3px] rounded-full bg-[hsl(var(--primary))] align-middle sm:w-[4px]"
              style={{ height: "0.86em", transform: "translateY(0.06em)" }}
            />
          )}
        </h1>
      </div>

      {/* progress / navigation dots */}
      <div className="mt-6 flex items-center gap-2">
        {phrases.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setPIdx(i);
              setCount(0);
              setPhase("typing");
            }}
            aria-label={isAr ? `العبارة ${i + 1}` : `Headline ${i + 1}`}
            aria-current={i === pIdx}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === pIdx
                ? "w-8 bg-[hsl(var(--primary))]"
                : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
