import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { translations, type Translations } from "../lib/translations";

type Lang = "en" | "ar";

interface LangContextValue {
  lang: Lang;
  isAr: boolean;
  t: Translations;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  localizedPath: (path: string, targetLang?: Lang) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

const LOCALES: Lang[] = ["en", "ar"];

function langFromPath(pathname: string): Lang | null {
  const first = pathname.split("/").filter(Boolean)[0];
  return first === "en" || first === "ar" ? first : null;
}

function stripLocale(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (LOCALES.includes(parts[0] as Lang)) parts.shift();
  return `/${parts.join("/")}`.replace(/\/$/, "") || "/";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Derived from the router location (not window.location) so this renders
  // identically during the build-time prerender and on the client. Only the
  // no-locale-prefix fallback touches browser storage, and that path never runs
  // on the server.
  const [lang, setLangState] = useState<Lang>(() => {
    const pathLang = langFromPath(location.pathname);
    if (pathLang) return pathLang;
    if (typeof window === "undefined") return "en";
    try {
      const stored = localStorage.getItem("raanzlr-lang");
      if (stored === "ar" || stored === "en") return stored;
    } catch {
      /* storage blocked (private mode / embedded webview) */
    }
    const browser = navigator.language?.toLowerCase() ?? "";
    return browser.startsWith("ar") ? "ar" : "en";
  });

  const isAr = lang === "ar";

  useEffect(() => {
    const pathLang = langFromPath(location.pathname);
    if (pathLang && pathLang !== lang) setLangState(pathLang);
  }, [location.pathname, lang]);

  useEffect(() => {
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("raanzlr-lang", lang);
    } catch {
      /* storage blocked — the URL prefix remains the source of truth */
    }
  }, [lang, isAr]);

  const localizedPath = (path: string, targetLang: Lang = lang) => {
    if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
    const [pathAndSearch, hash = ""] = path.split("#");
    const [rawPath, search = ""] = pathAndSearch.split("?");
    const normalizedPath = stripLocale(rawPath.startsWith("/") ? rawPath : `/${rawPath}`);
    // No trailing slash anywhere — "/en", "/en/faq". This is the site's single
    // canonical URL shape; Vercel 308-redirects the trailing-slash variants.
    const localized = `/${targetLang}${normalizedPath === "/" ? "" : normalizedPath}`;
    return `${localized}${search ? `?${search}` : ""}${hash ? `#${hash}` : ""}`;
  };

  const setLang = (l: Lang) => {
    setLangState(l);
    navigate(localizedPath(`${stripLocale(location.pathname)}${location.search}${location.hash}`, l));
  };
  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");

  const t = isAr ? translations.ar : translations.en;

  return (
    <LangContext.Provider value={{ lang, isAr, t, setLang, toggleLang, localizedPath }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
