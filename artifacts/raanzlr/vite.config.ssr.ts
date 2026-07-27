import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * SSR bundle used only at build time by scripts/prerender.mjs.
 *
 * Deliberately separate from vite.config.ts: no Tailwind plugin (CSS is
 * irrelevant to a string render) and no async-css HTML transform.
 *
 * Output lands in dist-ssr/, which is never deployed.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  // Nothing from public/ belongs in the throwaway SSR bundle.
  publicDir: false,
  logLevel: "warn",
  build: {
    ssr: path.resolve(import.meta.dirname, "src/entry-server.tsx"),
    outDir: path.resolve(import.meta.dirname, "dist-ssr"),
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      output: { format: "esm", entryFileNames: "entry-server.mjs" },
    },
  },
  ssr: {
    // Bundle the UI libraries so the prerenderer runs against exactly the code
    // the browser gets, and so ESM-only packages resolve under plain Node.
    noExternal: [
      "react-helmet-async",
      "react-router",
      "react-router-dom",
      "next-themes",
      "framer-motion",
      "lucide-react",
      /^@radix-ui\//,
      /^@tsparticles\//,
      "recharts",
      "embla-carousel-react",
      "cmdk",
      "vaul",
      "sonner",
      "input-otp",
      "react-day-picker",
      "react-hook-form",
      "@hookform/resolvers",
      "react-resizable-panels",
      "react-icons",
      "class-variance-authority",
      "tailwind-merge",
      "clsx",
      "date-fns",
      "zod",
    ],
  },
});
