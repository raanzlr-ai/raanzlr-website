import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, CalendarDays, ArrowRight } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";
import { POSTS } from "../data/posts";
import { Post, PostChartSpec, fromStaticPost, fetchPost, fetchAllPosts } from "../lib/posts";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Turns Markdown [text](url) links and bare URLs inside body text into clickable, safe anchors.
function renderRich(text: string): React.ReactNode[] {
  const linkRe = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  const anchor = (href: string, label: string) => (
    <a
      key={`l${k++}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-300 underline decoration-cyan-400/40 underline-offset-2 hover:text-cyan-200 break-words"
    >
      {label}
    </a>
  );
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] && m[2]) {
      out.push(anchor(m[2], m[1]));
    } else if (m[3]) {
      let href = m[3];
      let trail = "";
      const tr = href.match(/[).,;،]+$/);
      if (tr) { trail = tr[0]; href = href.slice(0, -trail.length); }
      out.push(anchor(href, href.replace(/^https?:\/\//, "").replace(/\/$/, "")));
      if (trail) out.push(trail);
    }
    last = linkRe.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// Renders a section body: splits into paragraphs on line breaks, keeps a drop-cap on the first
// prose paragraph, and renders each line with clickable links (used by articles + References).
function ArticleBody({ text, dropCap }: { text: string; dropCap: boolean }) {
  const blocks = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((block, i) => (
        <p
          key={i}
          className={`text-foreground/75 leading-[1.9] text-base sm:text-lg tracking-wide [text-align:justify] ${i > 0 ? "mt-5" : ""} ${
            dropCap && i === 0
              ? "first-letter:text-5xl first-letter:font-bold first-letter:text-cyan-300 first-letter:float-left first-letter:me-3 first-letter:mt-1 first-letter:leading-none"
              : ""
          }`}
        >
          {renderRich(block)}
        </p>
      ))}
    </>
  );
}

const CHART_COLORS = ["#00e5ff", "#3b82f6", "#8b5cf6", "#22d3ee", "#0ea5e9", "#a855f7", "#06b6d4"];
const chartLoc = (v: PostChartSpec["title"], isAr: boolean): string => {
  if (!v) return "";
  if (typeof v === "string") return v;
  return (isAr ? v.ar : v.en) || v.en || v.ar || "";
};

// Interactive, themed chart for a post section (recharts). Style varies by `chart.type`.
function PostChart({ chart, isAr }: { chart: PostChartSpec; isAr: boolean }) {
  const data = Array.isArray(chart?.data) ? chart.data.filter((d) => d && typeof d.value === "number") : [];
  if (data.length === 0) return null;
  const type = chart.type || "bar";
  const title = chartLoc(chart.title, isAr);
  const source = chartLoc(chart.source, isAr);
  const unit = chart.unit || "";
  const fmt = (v: number) => `${v}${unit}`;
  const axis = { fill: "rgba(255,255,255,0.4)", fontSize: 11 } as const;
  const grid = "rgba(255,255,255,0.06)";
  const tip = { background: "#0b0b0d", border: "1px solid rgba(0,229,255,0.25)", borderRadius: 12, color: "#e6e8ec", fontSize: 12 };
  return (
    <figure className="my-8 rounded-2xl border border-cyan-400/20 bg-foreground/[0.02] p-5 sm:p-6">
      {title && <figcaption className="mb-4 text-sm font-mono-accent uppercase tracking-[0.14em] text-cyan-300">{title}</figcaption>}
      <div className="h-64 sm:h-72 w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" ? (
            <LineChart data={data} margin={{ top: 6, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid stroke={grid} vertical={false} />
              <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={{ stroke: grid }} />
              <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={fmt} width={46} />
              <Tooltip contentStyle={tip} formatter={(v: any) => fmt(Number(v))} cursor={{ stroke: "rgba(0,229,255,0.25)" }} />
              <Line type="monotone" dataKey="value" stroke="#00e5ff" strokeWidth={2.5} dot={{ r: 3, fill: "#00e5ff" }} activeDot={{ r: 5 }} />
            </LineChart>
          ) : type === "area" ? (
            <AreaChart data={data} margin={{ top: 6, right: 12, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="pcArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#00e5ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={grid} vertical={false} />
              <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={{ stroke: grid }} />
              <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={fmt} width={46} />
              <Tooltip contentStyle={tip} formatter={(v: any) => fmt(Number(v))} />
              <Area type="monotone" dataKey="value" stroke="#00e5ff" strokeWidth={2.5} fill="url(#pcArea)" />
            </AreaChart>
          ) : type === "pie" ? (
            <PieChart>
              <Tooltip contentStyle={tip} formatter={(v: any) => fmt(Number(v))} />
              <Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius="80%" innerRadius="45%" paddingAngle={2} stroke="#0b0b0d">
                {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
            </PieChart>
          ) : (
            <BarChart data={data} margin={{ top: 6, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid stroke={grid} vertical={false} />
              <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={{ stroke: grid }} />
              <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={fmt} width={46} />
              <Tooltip contentStyle={tip} formatter={(v: any) => fmt(Number(v))} cursor={{ fill: "rgba(0,229,255,0.06)" }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {source && <p className="mt-3 text-[11px] text-foreground/35">{isAr ? "المصدر: " : "Source: "}{source}</p>}
    </figure>
  );
}

export default function InsightPost() {
  const { slug } = useParams<{ slug: string }>();
  const { isAr } = useLang();

  const [post, setPost] = useState<Post | null | undefined>(undefined);
  const [others, setOthers] = useState<Post[]>([]);

  useEffect(() => {
    if (!slug) return;

    // Immediately show static post while API loads
    const staticPost = POSTS.find(p => p.slug === slug);
    if (staticPost) {
      setPost(fromStaticPost(staticPost));
    }
    const staticOthers = POSTS.filter(p => p.slug !== slug).slice(0, 3).map(fromStaticPost);
    setOthers(staticOthers);

    // Fetch from API (may override static)
    fetchPost(slug).then(apiPost => {
      if (apiPost) setPost(apiPost);
      else if (!staticPost) setPost(null);
    }).catch(() => {});

    // Also refresh "others" from full API posts list
    fetchAllPosts().then(posts => {
      const apiOthers = posts.filter(p => p.slug !== slug).slice(0, 3);
      if (apiOthers.length > 0) setOthers(apiOthers);
    }).catch(() => {});
  }, [slug]);

  if (post === undefined) return (
    <div className="min-h-screen flex items-center justify-center text-foreground/40 text-sm">Loading...</div>
  );
  if (post === null) return <Navigate to="/insights" replace />;

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(isAr ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="relative">
      <SEO
        title={`${post.seo?.titleEn || post.title.en} — Raanzlr`}
        titleAr={`${post.seo?.titleAr || post.title.ar} — Raanzlr`}
        description={post.seo?.descriptionEn || post.excerpt.en}
        descriptionAr={post.seo?.descriptionAr || post.excerpt.ar}
        keywords={post.seo?.keywordsEn || `${post.tag.en}, AI insights GCC, automation blog MENA`}
        keywordsAr={post.seo?.keywordsAr || `${post.tag.ar}، رؤى الذكاء الاصطناعي الخليج، مدونة الأتمتة`}
        path={`/insights/${post.slug}`}
        type="article"
        image={post.image}
        article={{
          publishedTime: `${post.date}T00:00:00Z`,
          modifiedTime: `${post.date}T00:00:00Z`,
          author: post.author || "Raanzlr",
          section: post.tag.en,
          tags: [post.tag.en],
        }}
      />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden pt-28 sm:pt-32 pb-14">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={isAr ? post.title.ar : post.title.en}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-40 dark:opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/55 to-background/20 dark:from-background dark:via-background/80 dark:to-background/40" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="noise absolute inset-0" />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-xs font-mono-accent uppercase tracking-[0.18em] text-foreground/50 hover:text-cyan-300 transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
              {isAr ? "العودة إلى المدونة" : "Back to Insights"}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 mb-5"
          >
            <span className="text-[10px] font-mono-accent uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-cyan-400/40 text-cyan-300 bg-cyan-400/10">
              {isAr ? post.tag.ar : post.tag.en}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-foreground/40 font-mono-accent">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} {isAr ? "دقائق قراءة" : "min read"}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-foreground/40 font-mono-accent">
              <CalendarDays className="h-3.5 w-3.5" />
              {fmt(post.date)}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-chrome"
          >
            {isAr ? post.title.ar : post.title.en}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mt-4 text-lg text-foreground/65 leading-relaxed max-w-3xl"
          >
            {isAr ? post.excerpt.ar : post.excerpt.en}
          </motion.p>
        </div>
      </section>

      <PulseDivider />

      {/* Article Body */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-16">
            {post.sections.map((section, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <article className="relative">
                  {/* Section Number */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center">
                      <span className="text-lg font-mono-accent font-bold text-cyan-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground leading-snug bg-gradient-to-r from-foreground via-foreground/95 to-foreground/85 bg-clip-text text-transparent">
                        {isAr ? section.heading.ar : section.heading.en}
                      </h2>
                    </div>
                  </div>

                  {/* Section Body */}
                  <div className="relative pl-0 sm:pl-[4.5rem]">
                    {/* Decorative Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/30 via-cyan-400/10 to-transparent hidden sm:block" />
                    
                    {/* Optional Section Image */}
                    {section.image && (
                      <div className="mb-8 rounded-xl overflow-hidden border border-cyan-400/20">
                        <img 
                          src={section.image} 
                          alt={isAr ? section.heading.ar : section.heading.en}
                          loading="lazy"
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                    
                    {/* Content with improved typography */}
                    <div className="prose prose-invert prose-lg max-w-none">
                      <ArticleBody
                        text={isAr ? section.body.ar : section.body.en}
                        dropCap={!isAr && !/references|sources|مصادر|المراجع/i.test(`${section.heading.en} ${section.heading.ar}`)}
                      />
                    </div>

                    {section.chart && <PostChart chart={section.chart} isAr={isAr} />}

                    {/* Accent Border Bottom */}
                    {i < post.sections.length - 1 && (
                      <div className="mt-12 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal delay={0.3}>
            <div className="mt-16 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-8 sm:p-10">
              <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300 mb-3">
                {isAr ? "// هل تريد تطبيق هذا؟" : "// Want to apply this?"}
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">
                {isAr
                  ? "دعنا نناقش كيف ينطبق هذا على عملك."
                  : "Let's discuss how this applies to your business."}
              </h3>
              <p className="text-foreground/55 mb-6 text-sm">
                {isAr
                  ? "يراجع مهندس أول كل استفسار ويرد خلال يوم عمل واحد."
                  : "A senior engineer reviews every inquiry and responds within one business day."}
              </p>
              <MagneticButton to="/contact">
                {isAr ? "ابدأ محادثة" : "Start a Conversation"}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related posts */}
      {others.length > 0 && (
        <section className="relative pb-24 pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center justify-between mb-8">
                <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-foreground/40">
                  {isAr ? "// مقالات أخرى" : "// More Articles"}
                </p>
                <Link
                  to="/insights"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 transition-colors font-mono-accent"
                >
                  {isAr ? "كل المقالات" : "All articles"}
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <Link
                    to={`/insights/${p.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:border-cyan-400/25 transition-colors h-full flex flex-col block"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={p.image}
                        alt={isAr ? p.title.ar : p.title.en}
                        className="w-full h-full object-cover opacity-100 dark:opacity-40 dark:group-hover:opacity-55 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background hidden dark:block" />
                      <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 text-[10px] font-mono-accent uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-cyan-400/35 text-cyan-300 bg-cyan-400/10">
                        {isAr ? p.tag.ar : p.tag.en}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-base font-bold text-foreground leading-snug flex-1">
                        {isAr ? p.title.ar : p.title.en}
                      </h3>
                      <div className="mt-4 flex items-center justify-between text-[10px] text-foreground/35 font-mono-accent">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {p.readTime}{" "}
                          {isAr ? "دقائق" : "min"}
                        </span>
                        <span>{fmt(p.date)}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
