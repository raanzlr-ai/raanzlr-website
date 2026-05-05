import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../lib/translations";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem("rz_lang") || "en");

  useEffect(() => {
    const isAr = lang === "ar";
    document.documentElement.setAttribute("dir", isAr ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
    document.body.classList.toggle("font-ar", isAr);
    localStorage.setItem("rz_lang", lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "ar" : "en"));
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t, isAr: lang === "ar" }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
};
