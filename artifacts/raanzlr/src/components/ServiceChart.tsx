import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { RichChart } from "../data/servicesRich";

const CYAN = "#22d3ee";
const BLUE = "#2563eb";
const MUTED = "rgba(255,255,255,0.10)";

function fmt(v: number, unit?: string) {
  const n = v.toLocaleString("en-US");
  if (unit === "%") return `${n}%`;
  if (unit === "$") return `$${n}`;
  if (unit === "M$") return `$${n}M`;
  if (unit === "B$") return `$${n}B`;
  return n;
}

const TooltipBox = ({ active, payload, label, unit }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      dir="ltr"
      className="rounded-lg border border-cyan-400/30 bg-card/95 px-3 py-2 text-xs shadow-xl"
    >
      <div className="font-mono-accent uppercase tracking-[0.14em] text-foreground/45">{label}</div>
      <div className="mt-0.5 font-display text-sm font-semibold text-cyan-300">
        {fmt(payload[0].value, unit)}
      </div>
    </div>
  );
};

export default function ServiceChart({ chart }: { chart: RichChart }) {
  const { kind, data, unit } = chart;

  if (kind === "donut") {
    const highlight = data[0];
    const total = data.reduce((s, d) => s + d.value, 0);
    return (
      <div dir="ltr" className="relative h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={100}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              stroke="none"
            >
              <Cell fill={CYAN} />
              <Cell fill={MUTED} />
            </Pie>
            <Tooltip content={<TooltipBox unit={unit} />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-4xl font-bold text-chrome">
            {Math.round((highlight.value / total) * 100)}%
          </span>
          <span className="mt-1 text-[11px] font-mono-accent uppercase tracking-[0.16em] text-cyan-300/80">
            {highlight.name}
          </span>
        </div>
      </div>
    );
  }

  if (kind === "area") {
    return (
      <div dir="ltr" className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="svc-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CYAN} stopOpacity={0.42} />
                <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={MUTED} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
            <Tooltip content={<TooltipBox unit={unit} />} cursor={{ stroke: CYAN, strokeOpacity: 0.25 }} />
            <Area type="monotone" dataKey="value" stroke={CYAN} strokeWidth={2.5} fill="url(#svc-area)" dot={{ r: 3, fill: CYAN }} activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // bar
  return (
    <div dir="ltr" className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="svc-bar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CYAN} stopOpacity={0.95} />
              <stop offset="100%" stopColor={BLUE} stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={MUTED} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }} axisLine={false} tickLine={false} interval={0} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
          <Tooltip content={<TooltipBox unit={unit} />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="value" fill="url(#svc-bar)" radius={[6, 6, 0, 0]} maxBarSize={72} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
