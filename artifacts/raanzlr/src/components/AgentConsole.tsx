import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLang } from "../contexts/LanguageContext";

/**
 * Hero agent console — a scripted demonstration of the deployment pattern we
 * actually ship: a conversation on one side, the execution trace on the other.
 *
 * Honesty rules this component must keep:
 *
 * - Nothing here talks to a model. Every transcript is hand-written and the
 *   footer says so in both locales, in the same visual weight as the rest of
 *   the console. Do not remove that line, and do not soften it.
 * - The latencies and tool names describe the shape of a real run, not a
 *   measured client result. They are labelled `demo` in the status bar.
 * - Typing into the input never fabricates an answer: it replies that the
 *   transcript is scripted and points at a real email address.
 *
 * Rendering: the first frame is fully present in the prerendered HTML (the
 * opening trace row and message of the first scenario), so a crawler with no
 * JavaScript still sees what the console is. Playback starts only when the
 * console scrolls into view, and `prefers-reduced-motion` collapses every
 * delay to zero rather than removing the content.
 */

type Locale = "en" | "ar";
type StepKind = "user" | "agent" | "trace";

interface Step {
  kind: StepKind;
  /** trace label, e.g. "tool" */
  label?: string;
  /** trace value, e.g. "calendar.slots(range=7d)" */
  value?: string;
  ms?: number;
  warn?: boolean;
  done?: boolean;
  en?: string;
  ar?: string;
}

interface Scenario {
  id: string;
  label: Record<Locale, string>;
  sub: Record<Locale, string>;
  /** BCP-47 tag shown in the console status bar. */
  tag: string;
  steps: Step[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "lead",
    label: { en: "WhatsApp lead", ar: "عميل عبر واتساب" },
    sub: { en: "qualify + book", ar: "تأهيل وحجز" },
    tag: "en-US",
    steps: [
      { kind: "trace", label: "intake", value: "channel=whatsapp  msg_id=a41f" },
      {
        kind: "user",
        en: "Hi, do you build WhatsApp bots? What does it cost?",
        ar: "Hi, do you build WhatsApp bots? What does it cost?",
      },
      { kind: "trace", label: "detect_language", value: "en-US  conf=0.99" },
      { kind: "trace", label: "route", value: "sales.qualify" },
      { kind: "trace", label: "tool", value: "pricing.lookup(service=ai_agent)", ms: 41 },
      {
        kind: "agent",
        en: "Yes — WhatsApp agents are one of our core builds. A basic AI agent runs $5,000–$15,000. With CRM integration and custom training it's $15,000–$50,000+. What should it handle for you?",
        ar: "Yes — WhatsApp agents are one of our core builds. A basic AI agent runs $5,000–$15,000. With CRM integration and custom training it's $15,000–$50,000+. What should it handle for you?",
      },
      {
        kind: "user",
        en: "Answer product questions and book demos.",
        ar: "Answer product questions and book demos.",
      },
      { kind: "trace", label: "tool", value: "calendar.slots(range=7d)", ms: 88 },
      {
        kind: "agent",
        en: "That sits inside the basic range. I can hold 30 minutes with an engineer — Tuesday 14:00 or Wednesday 11:00 GST?",
        ar: "That sits inside the basic range. I can hold 30 minutes with an engineer — Tuesday 14:00 or Wednesday 11:00 GST?",
      },
      { kind: "trace", label: "outcome", value: "lead_qualified  handoff=scheduled", done: true },
    ],
  },
  {
    id: "booking",
    label: { en: "Arabic booking", ar: "حجز موعد بالعربية" },
    sub: { en: "gulf dialect", ar: "لهجة خليجية" },
    tag: "ar-SA",
    steps: [
      { kind: "trace", label: "intake", value: "channel=whatsapp  msg_id=b90c" },
      {
        kind: "user",
        en: "السلام عليكم، أبغى أحجز موعد استشارة",
        ar: "السلام عليكم، أبغى أحجز موعد استشارة",
      },
      { kind: "trace", label: "detect_language", value: "ar-SA  dialect=gulf  conf=0.97" },
      { kind: "trace", label: "route", value: "booking.create" },
      { kind: "trace", label: "tool", value: "calendar.slots(range=7d)", ms: 76 },
      {
        kind: "agent",
        en: "وعليكم السلام. أقدر أحجز لك جلسة تعريفية مدتها ٣٠ دقيقة. متاح الثلاثاء ٢:٠٠م أو الأربعاء ١١:٠٠ص بتوقيت الخليج — أيهما يناسبك؟",
        ar: "وعليكم السلام. أقدر أحجز لك جلسة تعريفية مدتها ٣٠ دقيقة. متاح الثلاثاء ٢:٠٠م أو الأربعاء ١١:٠٠ص بتوقيت الخليج — أيهما يناسبك؟",
      },
      { kind: "user", en: "الثلاثاء يناسبني", ar: "الثلاثاء يناسبني" },
      { kind: "trace", label: "tool", value: "calendar.book(slot=tue_1400)", ms: 143 },
      {
        kind: "agent",
        en: "تم الحجز يوم الثلاثاء ٢:٠٠م. وصلك تأكيد على واتساب مع رابط الاجتماع، وتقدر تعدّل الموعد من نفس الرابط.",
        ar: "تم الحجز يوم الثلاثاء ٢:٠٠م. وصلك تأكيد على واتساب مع رابط الاجتماع، وتقدر تعدّل الموعد من نفس الرابط.",
      },
      { kind: "trace", label: "outcome", value: "booking_confirmed  rtl_render=ok", done: true },
    ],
  },
  {
    id: "order",
    label: { en: "Order status", ar: "حالة الطلب" },
    sub: { en: "ERP lookup", ar: "استعلام من النظام" },
    tag: "en-US",
    steps: [
      { kind: "trace", label: "intake", value: "channel=web  session=7d21" },
      { kind: "user", en: "Where is order 48291?", ar: "وين وصل الطلب رقم ٤٨٢٩١؟" },
      { kind: "trace", label: "route", value: "support.order_status" },
      { kind: "trace", label: "tool", value: "erp.orders.get(id=48291)", ms: 132 },
      {
        kind: "agent",
        en: "Order 48291 shipped on 21 August and is out for delivery today. Tracking number is SA-9930-4471. Want me to send the tracking link here?",
        ar: "الطلب ٤٨٢٩١ شُحن بتاريخ ٢١ أغسطس وهو الآن خارج للتوصيل اليوم. رقم التتبع SA-9930-4471. تحب أرسل لك رابط التتبع هنا؟",
      },
      { kind: "trace", label: "outcome", value: "resolved  human_required=false", done: true },
    ],
  },
  {
    id: "escalate",
    label: { en: "Escalation", ar: "تحويل لموظف" },
    sub: { en: "hands off", ar: "تسليم للفريق" },
    tag: "en-US",
    steps: [
      { kind: "trace", label: "intake", value: "channel=whatsapp  msg_id=f102" },
      {
        kind: "user",
        en: "I was charged twice and nobody has replied. This is unacceptable.",
        ar: "انخصم مني المبلغ مرتين ومحد رد علي. هذا غير مقبول.",
      },
      { kind: "trace", label: "sentiment", value: "negative  score=0.91", warn: true },
      { kind: "trace", label: "policy", value: "billing_dispute → human_required", warn: true },
      {
        kind: "agent",
        en: "I'm getting a person on this now — billing disputes always go to a human. I've flagged your last two charges, and a support engineer will reply in this thread within the hour.",
        ar: "أحوّلك لموظف الآن — نزاعات الفوترة تُحوَّل دائماً إلى شخص حقيقي. سجّلت آخر عمليتي خصم، وسيرد عليك أحد مهندسي الدعم في نفس المحادثة خلال ساعة.",
      },
      { kind: "trace", label: "handoff", value: "agent→human  queue=billing  sla=60m" },
      { kind: "trace", label: "outcome", value: "escalated  transcript_attached", done: true },
    ],
  },
];

/** Reply to anything typed into the demo input. Never invents an answer. */
const SCRIPTED_REPLY: Record<Locale, string> = {
  en: "This transcript is scripted, so I can't answer that one live. Pick a scenario to watch a full run — or email info@raanzlr.com and a real engineer replies within 24 business hours.",
  ar: "هذه المحادثة معدّة مسبقاً، فلا أستطيع الرد على هذا مباشرة. اختر سيناريو لمشاهدة تشغيل كامل — أو راسلنا على info@raanzlr.com ويرد عليك مهندس حقيقي خلال ٢٤ ساعة عمل.",
};

const ARABIC = /[؀-ۿ]/;

/** Fixed clock for trace rows, so a run reads like a log rather than "now". */
function stampAt(index: number): string {
  const seconds = index * 2 + (index % 3);
  const mm = 41 + Math.floor(seconds / 60);
  const ss = seconds % 60;
  return `08:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

interface Rendered {
  step: Step;
  key: string;
  traceIndex: number;
}

export default function AgentConsole() {
  const { isAr, lang } = useLang();
  const locale: Locale = isAr ? "ar" : "en";
  const reduce = useReducedMotion();

  const [active, setActive] = useState(0);
  // Starts at 1 so the prerendered HTML already carries the opening trace row —
  // a crawler with no JavaScript still sees what the console is.
  const [shown, setShown] = useState(1);
  const [typing, setTyping] = useState(false);
  const [extra, setExtra] = useState<Step[]>([]);
  const [draft, setDraft] = useState("");
  const [started, setStarted] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const traceRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const scenario = SCENARIOS[active];

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  /** Run a scenario from the top. */
  const play = useCallback(
    (index: number) => {
      clearTimers();
      setActive(index);
      setExtra([]);
      setTyping(false);
      setShown(reduce ? SCENARIOS[index].steps.length : 1);
      if (reduce) return;

      let delay = 0;
      SCENARIOS[index].steps.forEach((step, i) => {
        if (i === 0) return; // the first row is the server-rendered frame
        delay += step.kind === "trace" ? 320 : step.kind === "user" ? 520 : 260;
        if (step.kind === "agent") {
          timers.current.push(window.setTimeout(() => setTyping(true), delay));
          delay += 900;
          timers.current.push(
            window.setTimeout(() => {
              setTyping(false);
              setShown(i + 1);
            }, delay),
          );
        } else {
          timers.current.push(window.setTimeout(() => setShown(i + 1), delay));
        }
      });
    },
    [clearTimers, reduce],
  );

  // Start on first scroll into view, not on mount — the run is the point, and
  // it should not have finished before the visitor arrives.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || started) return;
    if (typeof IntersectionObserver === "undefined") {
      setStarted(true);
      play(0);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          play(0);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [play, started]);

  // Replay when the language flips, so the transcript matches the page.
  useEffect(() => {
    if (started) play(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => clearTimers, [clearTimers]);

  const visible = scenario.steps.slice(0, shown);
  const messages: Rendered[] = [];
  const traces: Rendered[] = [];
  visible.forEach((step, i) => {
    const item = { step, key: `${scenario.id}-${i}`, traceIndex: i };
    if (step.kind === "trace") traces.push(item);
    else messages.push(item);
  });
  extra.forEach((step, i) => messages.push({ step, key: `extra-${i}`, traceIndex: 0 }));

  // Keep both panes pinned to the newest row.
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    if (traceRef.current) traceRef.current.scrollTop = traceRef.current.scrollHeight;
  }, [shown, typing, extra.length]);

  const toolMs = useMemo(
    () => scenario.steps.reduce((total, s) => total + (s.ms ?? 0), 0),
    [scenario],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    setExtra((prev) => [...prev, { kind: "user", en: text, ar: text }]);
    setTyping(true);
    timers.current.push(
      window.setTimeout(
        () => {
          setTyping(false);
          setExtra((prev) => [
            ...prev,
            { kind: "agent", en: SCRIPTED_REPLY.en, ar: SCRIPTED_REPLY.ar },
          ]);
        },
        reduce ? 0 : 800,
      ),
    );
  };

  const eyebrow = "font-mono-accent text-[0.7rem] uppercase tracking-[0.16em] text-foreground/45";

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-xl border border-foreground/10 bg-card/80 shadow-[0_40px_90px_-50px_rgba(0,229,255,0.35)] backdrop-blur-sm"
    >
      {/* status bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-foreground/10 bg-foreground/[0.03] px-4 py-3 font-mono-accent text-[0.7rem] text-foreground/50">
        <span className="h-[7px] w-[7px] flex-none rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
        <span dir="ltr" className="text-foreground/70">
          agent://raanzlr/demo
        </span>
        <span
          dir="ltr"
          className="rounded-full border border-cyan-400/40 px-2.5 py-0.5 text-cyan-300"
        >
          {scenario.tag}
        </span>
        <span dir="ltr" className="rounded-full border border-foreground/15 px-2.5 py-0.5">
          tools {toolMs}ms
        </span>
        <span className="flex-1" />
        <button
          type="button"
          onClick={() => play(active)}
          className="rounded-full border border-foreground/15 px-3 py-1 text-foreground/70 transition hover:border-cyan-400/60 hover:text-cyan-300"
        >
          {isAr ? "↻ إعادة" : "↻ replay"}
        </button>
      </div>

      <div className="grid min-h-0 lg:grid-cols-[210px_minmax(0,1fr)_minmax(0,320px)]">
        {/* scenarios */}
        <div
          role="tablist"
          aria-label={isAr ? "السيناريوهات" : "Scenarios"}
          className="flex gap-2 overflow-x-auto border-b border-foreground/10 p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-e lg:p-3.5"
        >
          <span className={`mb-1 hidden lg:block ${eyebrow}`}>
            {isAr ? "// السيناريوهات" : "// scenarios"}
          </span>
          {SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => play(i)}
              className={`grid gap-0.5 whitespace-nowrap rounded-lg border px-3 py-2.5 text-start text-[0.82rem] leading-tight transition ${
                i === active
                  ? "border-cyan-400/55 bg-cyan-400/[0.07] text-foreground"
                  : "border-foreground/10 bg-foreground/[0.02] text-foreground/70 hover:border-foreground/20 hover:text-foreground"
              }`}
            >
              <span>{s.label[locale]}</span>
              <small
                className={`font-mono-accent text-[0.62rem] tracking-[0.08em] ${
                  i === active ? "text-cyan-300" : "text-foreground/45"
                }`}
              >
                {s.sub[locale]}
              </small>
            </button>
          ))}
        </div>

        {/* transcript */}
        <div className="flex min-w-0 flex-col">
          <div
            ref={chatRef}
            aria-live="polite"
            className="flex min-h-[260px] flex-1 flex-col gap-3 overflow-y-auto p-4 lg:max-h-[430px] lg:min-h-[380px] lg:p-5"
          >
            {messages.map(({ step, key }) => {
              const body = step[locale] ?? step.en ?? "";
              const rtl = ARABIC.test(body);
              const isUser = step.kind === "user";
              return (
                <div
                  key={key}
                  dir={rtl ? "rtl" : "ltr"}
                  className={`max-w-[86%] rounded-xl border px-3.5 py-2.5 text-[0.9rem] leading-relaxed motion-safe:animate-[fadeInUp_0.34s_cubic-bezier(0.2,0.8,0.2,1)_both] ${
                    isUser
                      ? "self-end border-foreground/15 bg-foreground/[0.06] text-foreground"
                      : "self-start border-cyan-400/25 bg-cyan-400/[0.07] text-foreground"
                  }`}
                >
                  <span
                    className={`mb-1.5 block font-mono-accent text-[0.6rem] uppercase tracking-[0.12em] ${
                      isUser ? "text-foreground/45" : "text-cyan-300"
                    }`}
                  >
                    {isUser
                      ? isAr
                        ? "العميل"
                        : "customer"
                      : isAr
                        ? "الوكيل"
                        : "agent"}
                  </span>
                  {body}
                </div>
              );
            })}

            {typing && (
              <div className="inline-flex self-start gap-1 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.05] px-4 py-3.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-1.5 w-1.5 rounded-full bg-cyan-300 motion-safe:animate-pulse"
                    style={{ animationDelay: `${i * 0.16}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-foreground/10 bg-foreground/[0.03] px-4 py-3"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoComplete="off"
              aria-label={isAr ? "راسل الوكيل التجريبي" : "Message the demo agent"}
              placeholder={isAr ? "اكتب رسالة…" : "Type a message…"}
              className="flex-1 rounded-full border border-foreground/10 bg-background px-4 py-2 text-[0.85rem] text-foreground outline-none placeholder:text-foreground/35 focus-visible:border-cyan-400/60"
            />
            <button
              type="submit"
              className="rounded-full bg-cyan-400 px-4 py-2 text-[0.82rem] font-semibold text-[#031014] transition hover:bg-cyan-300"
            >
              {isAr ? "إرسال" : "Send"}
            </button>
          </form>
        </div>

        {/* execution trace */}
        <div
          ref={traceRef}
          className="flex max-h-[250px] flex-col overflow-y-auto border-t border-foreground/10 bg-foreground/[0.02] p-3.5 lg:max-h-[430px] lg:border-t-0 lg:border-s"
        >
          <span className={`mb-2.5 ${eyebrow}`}>
            {isAr ? "// سجل التنفيذ" : "// execution trace"}
          </span>
          {traces.map(({ step, key, traceIndex }) => (
            <div
              key={key}
              dir="ltr"
              className="grid grid-cols-[auto_auto_minmax(0,1fr)] gap-x-2 border-b border-foreground/[0.04] py-1 text-left font-mono-accent text-[0.68rem] leading-normal"
            >
              <span className="text-foreground/30">{stampAt(traceIndex)}</span>
              <span
                className={
                  step.done ? "text-emerald-400" : step.warn ? "text-amber-400" : "text-cyan-300"
                }
              >
                {step.label}
              </span>
              <span className="break-words text-foreground/50">
                {step.value}
                {step.ms ? `  ${step.ms}ms` : ""}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* the disclaimer is part of the component, not decoration — see the file header */}
      <div className="border-t border-foreground/10 bg-foreground/[0.03] px-4 py-2.5 text-[0.7rem] text-foreground/45">
        {isAr
          ? "عرض مُعدّ مسبقاً لنمط تشغيل حقيقي — وليس نموذجاً مباشراً. الوكلاء في الإنتاج يعملون على أنظمتك أنت."
          : "Scripted demo of a real deployment pattern — not a live model. Production agents run against your own systems."}
      </div>
    </div>
  );
}
