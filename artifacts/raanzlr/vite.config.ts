import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const basePath = process.env.BASE_PATH || "/";

// NOTE: the stylesheet is intentionally render-blocking.
//
// It used to be deferred (preload + onload swap) on the grounds that "nothing
// renders before React mounts". That stopped being true once every route began
// shipping prerendered markup (scripts/prerender.mjs) — deferring the CSS now
// would flash unstyled content before the stylesheet lands.

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: Number(process.env.PORT || 5173),
    host: "0.0.0.0",
    allowedHosts: true,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.API_PORT || 3000}`,
        changeOrigin: true,
      },
    },
  },
});
