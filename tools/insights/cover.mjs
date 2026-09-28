#!/usr/bin/env node
/**
 * On-brand article cover: a system schematic rendered to PNG with local Chrome.
 *
 * Follows the rebuild design spec (docs/HANDOFF.md, Appendix C §3–4): navy
 * ground, hairline grid, nodes as rounded rects, 1px wires, cyan used only as
 * the single "live" signal path. No stock photography, no invented UI numbers,
 * no third-party logos — so a cover can never make a claim the article can't
 * back up.
 *
 *   node tools/insights/cover.mjs spec.json out.png
 *
 * spec.json:
 *   {
 *     "seed": "post-slug",                     // varies the layout per post
 *     "inputs":  ["Claude Opus 5.5", "GPT-6", "Gemini 3 Ultra"],   // 2–5 left nodes
 *     "hub":     "Routing layer",              // centre node
 *     "outputs": ["Support agent", "CRM", "Weekly report"],        // 1–4 right nodes
 *     "live":    0                             // index of the input drawn as the live cyan path
 *   }
 */
import { readFileSync, writeFileSync, mkdtempSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const W = 1600;
const H = 900;
const C = {
  ground: "#060B14",
  panel: "#0A1220",
  inset: "#0E1929",
  line: "#1B2E4D",
  lineStrong: "#24385C",
  signal: "#27D8FF",
  tx1: "#E6EEF6",
  tx2: "#9DB0C6",
  tx3: "#6F85A0",
};

/** Small deterministic PRNG so the same slug always renders the same cover. */
function rng(seed) {
  let h = 2166136261;
  for (const ch of String(seed)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function node(x, y, w, h, label, { live = false, hub = false } = {}) {
  const stroke = live ? C.signal : hub ? C.lineStrong : C.line;
  const fill = hub ? C.inset : C.panel;
  const text = live ? C.tx1 : C.tx2;
  return `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="${live || hub ? 1.5 : 1}"/>
    <circle cx="${x + 22}" cy="${y + h / 2}" r="4" fill="${live ? C.signal : C.tx3}"/>
    <text x="${x + 40}" y="${y + h / 2 + 6}" font-family="IBM Plex Mono, Consolas, monospace" font-size="${hub ? 22 : 19}" fill="${text}">${esc(label)}</text>
  </g>`;
}

/** Orthogonal-ish wire with rounded elbows, like a schematic trace. */
function wire(x1, y1, x2, y2, { live = false, dashed = false } = {}) {
  const mx = Math.round((x1 + x2) / 2);
  const d = `M ${x1} ${y1} H ${mx - 12} Q ${mx} ${y1} ${mx} ${y1 + Math.sign(y2 - y1) * 12} V ${y2 - Math.sign(y2 - y1) * 12} Q ${mx} ${y2} ${mx + 12} ${y2} H ${x2}`;
  const straight = Math.abs(y2 - y1) < 24 ? `M ${x1} ${y1} H ${x2}` : d;
  return `<path d="${straight}" fill="none" stroke="${live ? C.signal : C.lineStrong}" stroke-width="${live ? 2 : 1}"${dashed ? ' stroke-dasharray="6 6"' : ""}${live ? ' filter="url(#glow)"' : ""}/>`;
}

export function renderCoverSvg(spec) {
  const r = rng(spec.seed ?? "raanzlr");
  const inputs = (spec.inputs ?? []).slice(0, 5);
  const outputs = (spec.outputs ?? []).slice(0, 4);
  if (inputs.length < 2 || outputs.length < 1 || !spec.hub) {
    throw new Error("cover spec needs 2–5 inputs, 1–4 outputs and a hub");
  }
  const live = Number.isInteger(spec.live) ? spec.live : 0;

  const nodeW = 300;
  const nodeH = 64;
  const colIn = 150 + Math.round(r() * 30);
  const colHub = 650;
  const colOut = 1110 + Math.round(r() * 30);
  const spread = (n, i) => Math.round(H / 2 + (i - (n - 1) / 2) * (nodeH + 44 + Math.round(r() * 10)));

  let grid = "";
  for (let x = 0; x <= W; x += 40) grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${C.line}" stroke-width="${x % 200 === 0 ? 0.8 : 0.35}"/>`;
  for (let y = 0; y <= H; y += 40) grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${C.line}" stroke-width="${y % 200 === 0 ? 0.8 : 0.35}"/>`;

  const hubW = 300;
  const hubH = 96;
  const hubY = H / 2 - hubH / 2;
  let wires = "";
  let nodes = "";

  inputs.forEach((label, i) => {
    const y = spread(inputs.length, i);
    wires += wire(colIn + nodeW, y, colHub, H / 2 + (i - (inputs.length - 1) / 2) * 14, { live: i === live });
    nodes += node(colIn, y - nodeH / 2, nodeW, nodeH, label, { live: i === live });
  });
  outputs.forEach((label, i) => {
    const y = spread(outputs.length, i);
    wires += wire(colHub + hubW, H / 2 + (i - (outputs.length - 1) / 2) * 14, colOut, y, { live: i === 0 });
    nodes += node(colOut, y - nodeH / 2, nodeW, nodeH, label, { live: i === 0 });
  });
  // Human hand-off: the dashed return path the spec reserves for escalation.
  const lastOut = spread(outputs.length, outputs.length - 1);
  wires += `<path d="M ${colOut + nodeW / 2} ${lastOut + nodeH / 2} V ${H - 70} H ${colHub + hubW / 2} V ${hubY + hubH}" fill="none" stroke="${C.tx3}" stroke-width="1" stroke-dasharray="6 6"/>`;
  nodes += node(colHub, hubY, hubW, hubH, spec.hub, { hub: true });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
      <stop offset="60%" stop-color="${C.ground}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${C.ground}" stop-opacity="0.85"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${C.ground}"/>
  <g opacity="0.55">${grid}</g>
  ${wires}
  ${nodes}
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
  <text x="48" y="${H - 40}" font-family="IBM Plex Mono, Consolas, monospace" font-size="16" letter-spacing="3" fill="${C.tx3}">RAANZLR / INSIGHTS</text>
</svg>`;
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error("No Chrome/Edge found. Set CHROME_PATH.");
  return found;
}

export function renderCoverPng(spec, outPng) {
  const dir = mkdtempSync(join(tmpdir(), "raanzlr-cover-"));
  const svgPath = join(dir, "cover.svg");
  writeFileSync(svgPath, renderCoverSvg(spec));
  execFileSync(findChrome(), [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--window-size=${W},${H}`,
    `--screenshot=${resolve(outPng)}`,
    pathToFileURL(svgPath).href,
  ], { stdio: "ignore" });
  if (!existsSync(outPng)) throw new Error("Chrome did not write the PNG");
  return resolve(outPng);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [specPath, outPng] = process.argv.slice(2);
  if (!specPath || !outPng) {
    console.error("usage: node tools/insights/cover.mjs spec.json out.png");
    process.exit(1);
  }
  const out = renderCoverPng(JSON.parse(readFileSync(specPath, "utf8")), outPng);
  console.log(`cover written: ${out}`);
}
