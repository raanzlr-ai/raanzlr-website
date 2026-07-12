import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, BookOpen, X, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import SEO from "../components/SEO";
import { POSTS } from "../data/posts";
import { Post, fromStaticPost, fetchAllPosts } from "../lib/posts";
import Turnstile from "../components/Turnstile";

const SUPABASE_URL = "https://dnpaagicskxzukeczifj.supabase.co";
const SUPABASE_ANON_KEY = (
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucGFhZ2ljc2t4enVrZWN6aWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTYyNzksImV4cCI6MjA5NzQ3MjI3OX0.fI0GuwGnTQU7k7HOCwTBP2q0xIjR0s9bmDl0b9SfWN0"
).trim().replace(/^\uFEFF/, "");

// ---------------------------------------------------------------------------
// SubscribeModal
// ---------------------------------------------------------------------------
interface SubscribeModalProps {
  open: boolean;
  onClose: () => void;
  isAr: boolean;
}

function SubscribeModal({ open, onClose, isAr }: SubscribeModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [lang, setLang] = useState<"ar" | "en">(isAr ? "ar" : "en");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [robotError, setRobotError] = useState(false);
  const [captchaReset, setCaptchaReset] = useState(0);

  // Reset state each time modal opens
  useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setCountry("");
      setLang(isAr ? "ar" : "en");
      setLoading(false);
      setSuccess(false);
      setError(null);
      setCaptchaToken(null);
      setRobotError(false);
      setCaptchaReset(n => n + 1);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!captchaToken) {
      setRobotError(true);
      setLoading(false);
      setTimeout(() => setRobotError(false), 3000);
      return;
    }

    try {
      // The submit-form edge function verifies the CAPTCHA token
      // server-side before inserting the subscriber.
      const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-form`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kind: "subscribe",
          token: captchaToken,
          data: { email, name, country: country || null, lang },
        }),
      });

      if (res.status === 201 || res.status === 200) {
        setSuccess(true);
        // TODO: Email notification sending is handled by n8n workflow
        // Set up Supabase webhook → n8n → email service (SendGrid/Resend) for automatic notifications
        setTimeout(() => {
          onClose();
        }, 2000);
      } else if (res.status === 409) {
        setError(isAr ? "أنت مشترك بالفعل!" : "You're already subscribed!");
      } else {
        const body = await res.json().catch(() => ({}));
        // Supabase unique violation code
        if (body?.code === "23505" || body?.message?.includes("unique") || body?.error === "already_subscribed") {
          setError(isAr ? "أنت مشترك بالفعل!" : "You're already subscribed!");
        } else {
          setError(isAr ? "حدث خطأ. حاول مرة أخرى." : "Something went wrong. Please try again.");
        }
      }
      if (!(res.status === 200 || res.status === 201)) {
        // Tokens are single-use; reset the widget so a retry can succeed
        setCaptchaToken(null);
        setCaptchaReset(n => n + 1);
      }
    } catch {
      setError(isAr ? "حدث خطأ في الاتصال." : "Connection error. Please try again.");
      setCaptchaToken(null);
      setCaptchaReset(n => n + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="subscribe-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            key="subscribe-card"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl border border-foreground/15 bg-card p-8 shadow-2xl"
            dir={isAr ? "rtl" : "ltr"}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-lg text-foreground/40 hover:text-foreground hover:bg-foreground/10 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="text-3xl mb-3">📬</div>
              <h2 className="font-display text-xl font-bold text-foreground">
                {isAr ? "اشترك في الرؤى" : "Subscribe to Insights"}
              </h2>
              <p className="mt-2 text-sm text-foreground/55 leading-relaxed">
                {isAr
                  ? "احصل على إشعار عند نشر رؤى جديدة."
                  : "Get notified when we publish new AI and automation insights."}
              </p>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 py-6 text-center"
              >
                <CheckCircle className="h-12 w-12 text-green-400" />
                <p className="text-lg font-semibold text-foreground">
                  {isAr ? "تم الاشتراك! 🎉" : "You're subscribed! 🎉"}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs text-foreground/50 mb-1.5 font-mono-accent uppercase tracking-wide">
                    {isAr ? "الاسم الكامل" : "Full Name"} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? "أدخل اسمك الكامل" : "Enter your full name"}
                    className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-colors focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground/50 mb-1.5 font-mono-accent uppercase tracking-wide">
                    {isAr ? "البريد الإلكتروني" : "Email"} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isAr ? "أدخل بريدك الإلكتروني" : "you@example.com"}
                    className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-colors focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground/50 mb-1.5 font-mono-accent uppercase tracking-wide">
                    {isAr ? "الدولة" : "Country"}{" "}
                    <span className="text-foreground/30 normal-case tracking-normal">
                      ({isAr ? "اختياري" : "optional"})
                    </span>
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Saudi Arabia, UAE, Egypt..."
                    className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-colors focus:outline-none"
                  />
                </div>

                {/* Preferred newsletter language — subscriber chooses which language their emails arrive in */}
                <div>
                  <label className="block text-xs text-foreground/50 mb-1.5 font-mono-accent uppercase tracking-wide">
                    {isAr ? "لغة النشرة" : "Newsletter language"} *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLang("ar")}
                      aria-pressed={lang === "ar"}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${lang === "ar" ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-200" : "border-foreground/10 bg-foreground/[0.04] text-foreground/60 hover:border-foreground/25"}`}
                    >
                      العربية
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang("en")}
                      aria-pressed={lang === "en"}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${lang === "en" ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-200" : "border-foreground/10 bg-foreground/[0.04] text-foreground/60 hover:border-foreground/25"}`}
                    >
                      English
                    </button>
                  </div>
                  <p className="mt-1.5 text-[11px] text-foreground/40">
                    {isAr ? "سنرسل لك المقالات الجديدة بهذه اللغة." : "We'll email you new articles in this language."}
                  </p>
                </div>

                {error && (
                  <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                {/* Robot check */}
                <div>
                  <Turnstile isAr={isAr} resetSignal={captchaReset} onToken={token => { setCaptchaToken(token); if (token) setRobotError(false); }} />
                  {robotError && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {isAr ? "يرجى إكمال التحقق أولاً" : "Please complete the verification first."}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 py-3 text-sm font-bold text-[#050505] shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_28px_rgba(0,240,255,0.45)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                  {loading
                    ? isAr
                      ? "جارٍ الإرسال..."
                      : "Subscribing..."
                    : isAr
                    ? "اشتراك"
                    : "Subscribe"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Insights page
// ---------------------------------------------------------------------------
export default function Insights() {
  const { isAr } = useLang();

  const [apiPosts, setApiPosts] = useState<Post[]>([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [page, setPage] = useState(1);

  const staticPosts = POSTS.map(fromStaticPost);

  useEffect(() => {
    fetchAllPosts()
      .then(posts => {
        if (posts.length > 0) setApiPosts(posts);
        setPostsLoaded(true);
      })
      .catch(() => setPostsLoaded(true));
  }, []);

  const allPosts = postsLoaded && apiPosts.length > 0
    ? apiPosts
    : [...staticPosts];

  const featured = allPosts.find(p => p.featured);
  const rest = allPosts.filter(p => !p.featured);

  const PER_PAGE = 10;
  const totalPages = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const pageSafe = Math.min(Math.max(1, page), totalPages);
  const pagePosts = rest.slice((pageSafe - 1) * PER_PAGE, pageSafe * PER_PAGE);
  const goToPage = (n: number) => {
    setPage(n);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString(isAr ? "ar-SA" : "en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="relative">
      <SEO pageKey="insights" path="/insights" />

      <SubscribeModal open={showSubscribe} onClose={() => setShowSubscribe(false)} isAr={isAr} />

      <section className="relative min-h-[55vh] flex items-center overflow-hidden pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="noise absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300">
            <BookOpen className="h-3.5 w-3.5" /> {isAr ? "المدونة والرؤى" : "INSIGHTS & BLOG"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome">
            {isAr ? "المدونة والرؤى" : "Blog & Insights"}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 max-w-2xl text-base md:text-lg text-foreground/65">
            {isAr
              ? "نشارك في هذه المدونة مقالات ورؤى حول الذكاء الاصطناعي، وأتمتة الأعمال، وتطوير البرمجيات، وتكامل الأنظمة. هدفنا تبسيط المفاهيم التقنية، واستعراض أفضل الممارسات، ومناقشة الأفكار التي تساعد الشركات على الاستفادة من التقنيات الحديثة في أعمالها."
              : "We share articles and insights on artificial intelligence, business automation, software development, and systems integration. Our goal is to simplify technical concepts, review best practices, and discuss ideas that help companies leverage modern technologies in their operations."}
          </motion.p>
        </div>
      </section>

      <PulseDivider />

      {/* Featured (page 1 only) */}
      {featured && pageSafe === 1 && (
        <section className="relative py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <Link to={`/insights/${featured.slug}`} className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.02] hover:border-cyan-400/20 transition-colors block">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img src={featured.image} alt={isAr ? featured.title.ar : featured.title.en} className="w-full h-full object-cover opacity-100 dark:opacity-50 dark:group-hover:opacity-65 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60 dark:to-background/80 lg:bg-gradient-to-b hidden dark:block" />
                  </div>
                  <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-cyan-400/40 text-cyan-300 bg-cyan-400/10">
                        {isAr ? featured.tag.ar : featured.tag.en}
                      </span>
                      <span className="text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2 py-1 rounded-full border border-foreground/10 text-foreground/40">
                        {isAr ? "مقالة مميزة" : "FEATURED"}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-snug">{isAr ? featured.title.ar : featured.title.en}</h2>
                    <p className="mt-4 text-foreground/60 leading-relaxed">{isAr ? featured.excerpt.ar : featured.excerpt.en}</p>
                    <div className="mt-6 flex items-center gap-4 text-xs text-foreground/40 font-mono-accent">
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {featured.readTime} {isAr ? "دقائق" : "min read"}</span>
                      <span>{fmt(featured.date)}</span>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                      {isAr ? "اقرأ المقالة" : "Read Article"} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="relative py-8 sm:py-12 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pagePosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link to={`/insights/${post.slug}`} className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:border-cyan-400/25 transition-colors h-full flex flex-col block">
                  <div className="relative h-44 overflow-hidden">
                    <img src={post.image} alt={isAr ? post.title.ar : post.title.en} className="w-full h-full object-cover opacity-100 dark:opacity-40 dark:group-hover:opacity-55 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background hidden dark:block" />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                      <span className="text-[10px] font-mono-accent uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-cyan-400/35 text-cyan-300 bg-cyan-400/10">
                        {isAr ? post.tag.ar : post.tag.en}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-lg font-bold text-foreground leading-snug flex-1">{isAr ? post.title.ar : post.title.en}</h3>
                    <p className="mt-3 text-sm text-foreground/55 leading-relaxed">{isAr ? post.excerpt.ar : post.excerpt.en}</p>
                    <div className="mt-5 flex items-center justify-between text-[10px] text-foreground/35 font-mono-accent">
                      <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {post.readTime} {isAr ? "دقائق" : "min"}</span>
                      <span>{fmt(post.date)}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-cyan-400 group-hover:text-cyan-300 font-mono-accent transition-colors">
                      {isAr ? "اقرأ أكثر" : "Read more"} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          {totalPages > 1 && (
            <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(pageSafe - 1)}
                disabled={pageSafe === 1}
                className="inline-flex items-center gap-1.5 rounded-lg border border-foreground/10 bg-foreground/[0.03] px-3.5 py-2 text-xs font-mono-accent uppercase tracking-[0.15em] text-foreground/60 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowRight className="h-3.5 w-3.5 rotate-180 rtl:rotate-0" /> {isAr ? "السابق" : "Prev"}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => goToPage(n)}
                  aria-current={n === pageSafe ? "page" : undefined}
                  className={`h-9 min-w-9 rounded-lg border px-3 text-xs font-mono-accent transition-colors ${
                    n === pageSafe
                      ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                      : "border-foreground/10 bg-foreground/[0.03] text-foreground/55 hover:border-cyan-400/30 hover:text-cyan-300"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goToPage(pageSafe + 1)}
                disabled={pageSafe === totalPages}
                className="inline-flex items-center gap-1.5 rounded-lg border border-foreground/10 bg-foreground/[0.03] px-3.5 py-2 text-xs font-mono-accent uppercase tracking-[0.15em] text-foreground/60 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                {isAr ? "التالي" : "Next"} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </button>
            </div>
          )}

          <Reveal delay={0.3}>
            <div className="mt-16 text-center">
              <p className="text-foreground/50 text-sm mb-6">{isAr ? "هل تريد الوصول إلى مقالات أعمق ودراسات حالة حصرية؟" : "Want access to deeper articles and exclusive case studies?"}</p>
              <button
                onClick={() => setShowSubscribe(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 bg-foreground/[0.04] px-8 py-3.5 text-sm font-semibold text-foreground hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:text-cyan-300 transition-all duration-200 cursor-pointer"
              >
                {isAr ? "اشترك في النشرة الإخبارية" : "Subscribe to Our Newsletter"}
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
