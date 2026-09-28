import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, Navigate } from "../components/LocalizedLink";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, CalendarDays, ArrowRight, ChevronDown } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { Reveal } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import SEO from "../components/SEO";
import AnswerBlock from "../components/AnswerBlock";
import { faqPageSchema } from "../lib/pageSchema";
import { toIsoDateTime, toIsoDateModified } from "../lib/date";
import { relatedPosts } from "../lib/insightsPaging";
import { POSTS } from "../data/posts";
import { Post, PostChartSpec, PostTable, LocalizedText, ADMIN_TOKEN_KEY, fromStaticPost, fetchPost, fetchPostAsAdmin, fetchAllPosts, primedPosts } from "../lib/posts";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

/** Same-site links (relative, or absolute on raanzlr.com) stay in the tab; everything else opens a new one. */
const isInternalHref = (href: string) => href.startsWith("/") || /^https:\/\/raanzlr\.com(\/|$)/.test(href);

/** `**bold**` inside a plain-text run. */
function renderBold(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={`${keyPrefix}b${i}`} className="font-semibold text-foreground">{part}</strong> : part,
  );
}

// Turns Markdown [text](url) links, bare URLs and **bold** inside body text into safe React nodes.
function renderRich(text: string): React.ReactNode[] {
  const linkRe = /\[([^\]]+)\]\(((?:https?:\/\/|\/)[^\s)]+)\)|(https?:\/\/[^\s]+)/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  const anchor = (href: string, label: string) => (
    <a
      key={`l${k++}`}
      href={href}
      {...(isInternalHref(href) ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className="text-cyan-300 underline decoration-cyan-400/40 underline-offset-2 hover:text-cyan-200 break-words"
    >
      {label}
    </a>
  );
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last) out.push(...renderBold(text.slice(last, m.index), `t${k++}`));
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
  if (last < text.length) out.push(...renderBold(text.slice(last), `t${k++}`));
  return out;
}

type BodyBlock = { kind: "p" | "h3"; text: string } | { kind: "ul"; items: string[] };

/** Line-based blocks: "### " is a sub-heading, runs of "- " lines are a list, anything else a paragraph. */
function toBlocks(text: string): BodyBlock[] {
  const blocks: BodyBlock[] = [];
  for (const line of text.split(/\n+/).map((l) => l.trim()).filter(Boolean)) {
    const item = line.match(/^[-•]\s+(.*)$/);
    if (item) {
      const prev = blocks[blocks.length - 1];
      if (prev?.kind === "ul") prev.items.push(item[1]);
      else blocks.push({ kind: "ul", items: [item[1]] });
    } else if (line.startsWith("### ")) {
      blocks.push({ kind: "h3", text: line.slice(4) });
    } else {
      blocks.push({ kind: "p", text: line });
    }
  }
  return blocks;
}

// Renders a section body: paragraphs, "### " sub-headings and "- " lists, a drop-cap on the
// first prose paragraph, and clickable links (used by articles + References).
function ArticleBody({ text, dropCap }: { text: string; dropCap: boolean }) {
  const blocks = toBlocks(text);
  const firstParagraph = blocks.findIndex((b) => b.kind === "p");
  return (
    <>
      {blocks.map((block, i) => {
        const spacing = i > 0 ? "mt-5" : "";
        if (block.kind === "h3") {
          return (
            <h3 key={i} className={`font-display text-xl font-semibold text-foreground ${i > 0 ? "mt-8" : ""}`}>
              {renderRich(block.text)}
            </h3>
          );
        }
        if (block.kind === "ul") {
          return (
            <ul key={i} className={`${spacing} space-y-2.5 ps-5 list-disc marker:text-cyan-400/70 text-foreground/75 leading-[1.8] text-base sm:text-lg`}>
              {block.items.map((item, j) => <li key={j}>{renderRich(item)}</li>)}
            </ul>
          );
        }
        return (
          <p
            key={i}
            className={`text-foreground/75 leading-[1.9] text-base sm:text-lg tracking-wide [text-align:justify] ${spacing} ${
              dropCap && i === firstParagraph
                ? "first-letter:text-5xl first-letter:font-bold first-letter:text-cyan-300 first-letter:float-left first-letter:me-3 first-letter:mt-1 first-letter:leading-none"
                : ""
            }`}
          >
            {renderRich(block.text)}
          </p>
        );
      })}
    </>
  );
}

const CHART_COLORS = ["#00e5ff", "#3b82f6", "#8b5cf6", "#22d3ee", "#0ea5e9", "#a855f7", "#06b6d4"];
const chartLoc = (v: LocalizedText | undefined, isAr: boolean): string => {
  if (!v) return "";
  if (typeof v === "string") return v;
  return (isAr ? v.ar : v.en) || v.en || v.ar || "";
};

/**
 * Several series side by side (bar or line), e.g. three models across four
 * benchmarks. Points come in as `{ label, values: { [series]: n } }` and are
 * flattened to the `{ label, [series]: n }` rows recharts expects.
 */
function MultiSeriesChart({ chart, isAr }: { chart: PostChartSpec; isAr: boolean }) {
  const series = (chart.series ?? []).filter(Boolean);
  const rows = (chart.data ?? [])
    .filter((d) => d && d.values)
    .map((d) => ({ label: d.label, ...d.values }));
  if (series.length === 0 || rows.length === 0) return null;
  const title = chartLoc(chart.title, isAr);
  const source = chartLoc(chart.source, isAr);
  const unit = chart.unit || "";
  const fmt = (v: number) => `${v}${unit}`;
  const axis = { fill: "rgba(255,255,255,0.4)", fontSize: 11 } as const;
  const grid = "rgba(255,255,255,0.06)";
  const tip = { background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, color: "hsl(var(--foreground))", fontSize: 12 };
  return (
    <figure className="my-8 rounded-2xl border border-cyan-400/20 bg-foreground/[0.02] p-5 sm:p-6">
      {title && <figcaption className="mb-4 text-sm font-mono-accent uppercase tracking-[0.14em] text-cyan-300">{title}</figcaption>}
      <div className="h-72 sm:h-80 w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          {chart.type === "line" ? (
            <LineChart data={rows} margin={{ top: 6, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid stroke={grid} vertical={false} />
              <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={{ stroke: grid }} />
              <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={fmt} width={46} />
              <Tooltip contentStyle={tip} formatter={(v: any) => fmt(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {series.map((s, i) => (
                <Line key={s} type="monotone" dataKey={s} stroke={CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={2.5} dot={{ r: 3 }} />
              ))}
            </LineChart>
          ) : (
            <BarChart data={rows} margin={{ top: 6, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid stroke={grid} vertical={false} />
              <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={{ stroke: grid }} />
              <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={fmt} width={46} />
              <Tooltip contentStyle={tip} formatter={(v: any) => fmt(Number(v))} cursor={{ fill: "rgba(0,229,255,0.06)" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {series.map((s, i) => (
                <Bar key={s} dataKey={s} fill={CHART_COLORS[i % CHART_COLORS.length]} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {source && <p className="mt-3 text-[11px] text-foreground/35">{isAr ? "المصدر: " : "Source: "}{renderRich(source)}</p>}
    </figure>
  );
}

/** Comparison table. Scrolls sideways on phones instead of squeezing the columns. */
function PostTableView({ table, isAr }: { table: PostTable; isAr: boolean }) {
  const columns = (isAr ? table.columns?.ar : table.columns?.en) ?? [];
  const rows = (isAr ? table.rows?.ar : table.rows?.en) ?? [];
  if (columns.length === 0 || rows.length === 0) return null;
  const title = chartLoc(table.title, isAr);
  const source = chartLoc(table.source, isAr);
  const hl = table.highlightColumn;
  const cellTone = (c: number) => (c === hl ? "bg-cyan-400/[0.07]" : "");
  return (
    <figure className="my-8">
      {title && <figcaption className="mb-3 text-sm font-mono-accent uppercase tracking-[0.14em] text-cyan-300">{title}</figcaption>}
      <div className="overflow-x-auto rounded-2xl border border-cyan-400/20">
        <table className="w-full min-w-[34rem] border-collapse text-sm">
          <thead>
            <tr className="bg-foreground/[0.04]">
              {columns.map((col, c) => (
                <th
                  key={c}
                  scope="col"
                  className={`px-4 py-3 text-start font-semibold text-foreground border-b border-cyan-400/20 ${c === hl ? "bg-cyan-400/[0.12] text-cyan-200" : ""}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className="border-b border-foreground/[0.06] last:border-0">
                {row.map((cell, c) =>
                  c === 0 ? (
                    <th key={c} scope="row" className={`px-4 py-3 text-start font-medium text-foreground/90 align-top ${cellTone(c)}`}>
                      {renderRich(cell)}
                    </th>
                  ) : (
                    <td key={c} className={`px-4 py-3 text-foreground/70 align-top ${cellTone(c)}`}>
                      {renderRich(cell)}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {source && <p className="mt-3 text-[11px] text-foreground/35">{isAr ? "المصدر: " : "Source: "}{renderRich(source)}</p>}
    </figure>
  );
}

// Interactive, themed chart for a post section (recharts). Style varies by `chart.type`.
function PostChart({ chart, isAr }: { chart: PostChartSpec; isAr: boolean }) {
  if (chart?.series?.length && (chart.type === "bar" || chart.type === "line")) {
    return <MultiSeriesChart chart={chart} isAr={isAr} />;
  }
  const data = Array.isArray(chart?.data) ? chart.data.filter((d) => d && typeof d.value === "number") : [];
  if (data.length === 0) return null;
  const type = chart.type || "bar";
  const title = chartLoc(chart.title, isAr);
  const source = chartLoc(chart.source, isAr);
  const unit = chart.unit || "";
  const fmt = (v: number) => `${v}${unit}`;
  const axis = { fill: "rgba(255,255,255,0.4)", fontSize: 11 } as const;
  const grid = "rgba(255,255,255,0.06)";
  const tip = { background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, color: "hsl(var(--foreground))", fontSize: 12 };
  const tipLabel = { color: "hsl(var(--foreground))" };
  const tipItem = { color: "hsl(var(--foreground))" };
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
              <Tooltip contentStyle={tip} labelStyle={tipLabel} itemStyle={tipItem} formatter={(v: any) => fmt(Number(v))} cursor={{ stroke: "rgba(0,229,255,0.25)" }} />
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
              <Tooltip contentStyle={tip} labelStyle={tipLabel} itemStyle={tipItem} formatter={(v: any) => fmt(Number(v))} />
              <Area type="monotone" dataKey="value" stroke="#00e5ff" strokeWidth={2.5} fill="url(#pcArea)" />
            </AreaChart>
          ) : type === "pie" ? (
            <PieChart>
              <Tooltip contentStyle={tip} labelStyle={tipLabel} itemStyle={tipItem} formatter={(v: any) => fmt(Number(v))} />
              <Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius="80%" innerRadius="45%" paddingAngle={2} stroke="#0b0b0d">
                {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
            </PieChart>
          ) : (
            <BarChart data={data} margin={{ top: 6, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid stroke={grid} vertical={false} />
              <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={{ stroke: grid }} />
              <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={fmt} width={46} />
              <Tooltip contentStyle={tip} labelStyle={tipLabel} itemStyle={tipItem} formatter={(v: any) => fmt(Number(v))} cursor={{ fill: "rgba(0,229,255,0.06)" }} />
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

/** The post to show before any network request: build-time payload, else seed. */
function seedPost(slug?: string): Post | undefined {
  const fromBuild = primedPosts()?.find((p) => p.slug === slug);
  if (fromBuild) return fromBuild;
  const fromSeed = POSTS.find((p) => p.slug === slug);
  return fromSeed ? fromStaticPost(fromSeed) : undefined;
}

/** The three "read next" posts, from the same source as seedPost. */
function seedOthers(slug?: string): Post[] {
  const fromBuild = primedPosts();
  if (fromBuild) return relatedPosts(fromBuild, slug, 3);
  return relatedPosts(POSTS.map(fromStaticPost), slug, 3);
}

export default function InsightPost() {
  const { slug } = useParams<{ slug: string }>();
  const { isAr } = useLang();

  // Seeded synchronously, not in an effect: the build-time prerender only runs
  // the first render pass, so a post that arrives via useEffect would ship as a
  // bare "Loading…" page with no <h1> and no article schema.
  //
  // seedPost/seedOthers prefer the build-time Supabase payload over the static
  // seed in src/data/posts.ts. Rendering the seed first and swapping once the
  // fetch resolved is what made a stale article flash before the real one.
  const [post, setPost] = useState<Post | null | undefined>(() => seedPost(slug));
  const [others, setOthers] = useState<Post[]>(() => seedOthers(slug));
  // "?preview" lets a signed-in admin read a draft before publishing it. Always
  // "off" on the server and on first paint, so hydration never diverges.
  const [preview, setPreview] = useState<"off" | "on" | "signed-out">("off");

  useEffect(() => {
    if (!slug) return;

    // Re-seed on slug change — the initializers above only run on first mount.
    const staticPost = POSTS.find(p => p.slug === slug);
    setPost(seedPost(slug));
    setOthers(seedOthers(slug));

    const wantsPreview = new URLSearchParams(window.location.search).has("preview");
    let adminToken: string | null = null;
    if (wantsPreview) {
      try {
        adminToken = sessionStorage.getItem(ADMIN_TOKEN_KEY);
      } catch {
        /* storage blocked — treated as signed out */
      }
    }
    setPreview(!wantsPreview ? "off" : adminToken ? "on" : "signed-out");

    // Fetch from API (may override static). A preview reads drafts too.
    (adminToken ? fetchPostAsAdmin(slug, adminToken) : fetchPost(slug)).then(apiPost => {
      if (apiPost) setPost(apiPost);
      else {
        if (adminToken) setPreview("signed-out");
        if (!staticPost) setPost(null);
      }
    }).catch(() => {});

    // Also refresh "others" from full API posts list
    fetchAllPosts().then(posts => {
      const apiOthers = relatedPosts(posts, slug, 3);
      if (apiOthers.length > 0) setOthers(apiOthers);
    }).catch(() => {});
  }, [slug]);

  if (post === undefined) return (
    <div className="min-h-screen flex items-center justify-center text-foreground/40 text-sm">Loading...</div>
  );
  if (post === null) {
    if (preview === "off") return <Navigate to="/insights" replace />;
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <p className="max-w-md text-sm text-foreground/60">
          Draft preview needs an admin session. Sign in at <a href="/admin" className="text-cyan-300 underline">/admin</a> in this tab,
          then open the preview link again.
        </p>
      </div>
    );
  }

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(isAr ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Both optional and unset on most posts — see the Post.faq / Post.answerBlock
  // doc comments in src/lib/posts.ts. Rendered only when present.
  const answerBlock = isAr ? post.answerBlock?.ar : post.answerBlock?.en;
  const faqItems = isAr ? post.faq?.ar : post.faq?.en;
  const faqSchema = faqItems?.length
    ? faqPageSchema(isAr ? "ar" : "en", `/insights/${post.slug}`, faqItems)
    : null;

  return (
    <div className="relative">
      <SEO
        title={`${post.seo?.titleEn || post.title.en} — Raanzlr`}
        titleAr={`${post.seo?.titleAr || post.title.ar} — Raanzlr`}
        description={post.seo?.descriptionEn || post.excerpt.en}
        descriptionAr={post.seo?.descriptionAr || post.excerpt.ar}
        path={`/insights/${post.slug}`}
        type="article"
        image={post.image}
        noIndex={preview !== "off"}
        schema={faqSchema ?? undefined}
        article={{
          publishedTime: toIsoDateTime(post.date),
          // Only emitted when Supabase reports a genuine later edit; SEO.tsx
          // omits dateModified entirely when this is undefined.
          modifiedTime: toIsoDateModified(post.updatedAt, post.date),
          author: post.author || "Raanzlr",
          section: post.tag.en,
          tags: [post.tag.en],
        }}
      />

      {preview !== "off" && (
        <div className="fixed bottom-4 inset-x-4 z-50 mx-auto max-w-xl rounded-xl border border-amber-400/40 bg-background/95 px-4 py-3 text-center text-xs text-amber-300 shadow-lg backdrop-blur">
          {preview === "on"
            ? "Admin preview: drafts show here before they are public. This view is not indexed."
            : "Admin session missing or expired: sign in at /admin, then reopen the preview."}
        </div>
      )}

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden pt-28 sm:pt-32 pb-14">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={isAr ? post.title.ar : post.title.en}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-40"
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

      {answerBlock && (
        <section className="relative pt-14 sm:pt-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <AnswerBlock question={answerBlock.q} answer={answerBlock.a} />
          </div>
        </section>
      )}

      {/* Table of contents — long articles only; each entry jumps to its section. */}
      {post.sections.length >= 4 && (
        <section className="relative pt-14 sm:pt-16">
          <nav
            aria-label={isAr ? "محتويات المقال" : "In this article"}
            className="mx-auto max-w-4xl px-6 lg:px-8"
          >
            <div className="rounded-2xl border border-cyan-400/20 bg-foreground/[0.02] p-6 sm:p-7">
              <p className="text-xs font-mono-accent tracking-[0.22em] text-cyan-300/90 mb-4">
                {isAr ? "محتويات المقال" : "IN THIS ARTICLE"}
              </p>
              <ol className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {post.sections.map((section, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="font-mono-accent text-cyan-300/70 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <a href={`#section-${i + 1}`} className="text-foreground/70 hover:text-cyan-300 transition-colors">
                      {isAr ? section.heading.ar : section.heading.en}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        </section>
      )}

      {/* Article Body */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-16">
            {post.sections.map((section, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <article id={`section-${i + 1}`} className="relative scroll-mt-28">
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
                    {(section.image || section.video) && (
                      <figure className="mb-8">
                        <div className="rounded-xl overflow-hidden border border-cyan-400/20">
                          {section.video ? (
                            <video
                              src={section.video}
                              poster={section.image || undefined}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              aria-label={(isAr ? section.imageCaption?.ar : section.imageCaption?.en) || (isAr ? section.heading.ar : section.heading.en)}
                              className="w-full h-auto"
                            />
                          ) : (
                            <img
                              src={section.image}
                              alt={(isAr ? section.imageCaption?.ar : section.imageCaption?.en) || (isAr ? section.heading.ar : section.heading.en)}
                              loading="lazy"
                              className="w-full h-auto"
                            />
                          )}
                        </div>
                        {(section.imageCaption || section.imageCredit) && (
                          <figcaption className="mt-2.5 text-xs text-foreground/45 leading-relaxed">
                            {isAr ? section.imageCaption?.ar : section.imageCaption?.en}
                            {section.imageCredit && (
                              <span className="text-foreground/35">
                                {section.imageCaption ? " · " : ""}
                                {isAr ? "المصدر: " : "Credit: "}
                                {section.imageCredit.url ? (
                                  <a href={section.imageCredit.url} target="_blank" rel="noopener noreferrer" className="underline decoration-foreground/20 underline-offset-2 hover:text-cyan-300">
                                    {section.imageCredit.label}
                                  </a>
                                ) : (
                                  section.imageCredit.label
                                )}
                              </span>
                            )}
                          </figcaption>
                        )}
                      </figure>
                    )}

                    {/* Content with improved typography */}
                    <div className="prose prose-invert prose-lg max-w-none">
                      <ArticleBody
                        text={isAr ? section.body.ar : section.body.en}
                        dropCap={!isAr && !/references|sources|مصادر|المراجع/i.test(`${section.heading.en} ${section.heading.ar}`)}
                      />
                    </div>

                    {section.table && <PostTableView table={section.table} isAr={isAr} />}

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

          {/* FAQ — only when the post defines one; mirrored as FAQPage schema above. */}
          {faqItems && faqItems.length > 0 && (
            <Reveal delay={0.2}>
              <div className="mt-16">
                <p className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
                  {isAr ? "// أسئلة شائعة" : "// FAQ"}
                </p>
                <div className="space-y-4">
                  {faqItems.map((item, i) => (
                    <details
                      key={i}
                      className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:border-cyan-400/30 transition-colors"
                    >
                      <summary className="relative px-6 py-5 cursor-pointer list-none flex items-start justify-between gap-4">
                        <span className="font-display text-base sm:text-lg font-semibold text-foreground pr-4">
                          {item.q}
                        </span>
                        <ChevronDown className="h-5 w-5 text-cyan-300 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-5 text-foreground/70 leading-relaxed text-sm">{item.a}</div>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

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
                        loading="lazy"
                        decoding="async"
                        src={p.image}
                        alt={isAr ? p.title.ar : p.title.en}
                        className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-500"
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
