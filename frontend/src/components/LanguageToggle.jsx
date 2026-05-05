import React from "react";
import { useLang } from "../contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageToggle = ({ compact = false }) => {
  const { lang, toggle } = useLang();
  return (
    <button
      data-testid="language-toggle"
      onClick={toggle}
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-mono-accent uppercase tracking-[0.18em] text-white/80 hover:border-cyan-400/60 hover:text-cyan-200 transition-colors"
      aria-label="Toggle language"
    >
      <Globe className="h-3.5 w-3.5" />
      {compact ? (
        <span>{lang === "en" ? "AR" : "EN"}</span>
      ) : (
        <span>
          <span className={lang === "en" ? "text-cyan-300" : ""}>EN</span>
          <span className="mx-1 text-white/30">/</span>
          <span className={lang === "ar" ? "text-cyan-300" : ""}>AR</span>
        </span>
      )}
    </button>
  );
};

export default LanguageToggle;
