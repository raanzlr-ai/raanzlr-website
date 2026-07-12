import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const basePath = process.env.BASE_PATH || "/";

// Load the built stylesheet without blocking first paint. Safe for this SPA:
// nothing renders before React mounts, and the theme bootstrap sets
// color-scheme on <html>, so async CSS cannot cause a visible unstyled flash.
const asyncCss = () => ({
  name: "async-css",
  enforce: "post" as const,
  transformIndexHtml(html: string) {
    return html.replace(
      /<link rel="stylesheet"([^>]*?href="[^"]*\/assets\/[^"]+\.css"[^>]*?)>/g,
      `<link rel="preload" as="style"$1 onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet"$1></noscript>`,
    );
  },
});

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    asyncCss(),
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
