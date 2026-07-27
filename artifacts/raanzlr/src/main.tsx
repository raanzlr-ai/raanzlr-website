import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;

const tree = (
  <HelmetProvider>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="raanzlr-theme"
      disableTransitionOnChange={false}
    >
      <App />
    </ThemeProvider>
  </HelmetProvider>
);

// Every route ships prerendered markup (scripts/prerender.mjs marks it with
// data-ssr), so adopt it instead of throwing it away and repainting. The plain
// createRoot path still covers `vite dev` and the SPA fallback shell.
if (container.dataset.ssr === "true") {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
