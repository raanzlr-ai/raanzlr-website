import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
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
