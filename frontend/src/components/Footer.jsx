import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import PulseDivider from "./PulseDivider";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer data-testid="site-footer" className="relative mt-24 sm:mt-32 overflow-hidden border-t border-white/5 bg-[#030303]">
      <PulseDivider />

      {/* Massive bg typography (always Latin) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-10 flex justify-center">
        <div className="font-display text-[22vw] md:text-[16vw] leading-none tracking-tighter text-chrome opacity-[0.06] select-none">
          Raanzlr
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <img src="/logo raanzlr.png" alt="Raanzlr Logo" className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(0,240,255,0.55)]" />
            <img src="/Raanzlr.png" alt="Raanzlr" className="h-7 w-auto object-contain drop-shadow-[0_0_10px_rgba(0,240,255,0.45)]" />
          </div>
          <p className="mt-5 max-w-sm text-white/60 text-sm leading-relaxed">
            {t.footer.tagline}
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs font-mono-accent uppercase tracking-[0.2em] text-cyan-300/80 mb-5">
            {t.footer.quickLinks}
          </div>
          <ul className="space-y-3 text-white/75 text-sm">
            <li><Link data-testid="footer-link-home" to="/" className="hover:text-cyan-200 transition-colors">{t.nav.home}</Link></li>
            <li><Link data-testid="footer-link-services" to="/services" className="hover:text-cyan-200 transition-colors">{t.nav.services}</Link></li>
            <li><Link data-testid="footer-link-about" to="/about" className="hover:text-cyan-200 transition-colors">{t.nav.about}</Link></li>
            <li><Link data-testid="footer-link-contact" to="/contact" className="hover:text-cyan-200 transition-colors">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-xs font-mono-accent uppercase tracking-[0.2em] text-cyan-300/80 mb-5">
            {t.footer.location}
          </div>
          <div className="space-y-4 text-sm text-white/75">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-cyan-300 mt-0.5 shrink-0" />
              <span dir="ltr">9 Branch Brook Dr #10030<br/>Belleville, NJ 07109</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-cyan-300 shrink-0" />
              <a href="mailto:contact@raanzlr.com" className="hover:text-cyan-200 break-all">contact@raanzlr.com</a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-white/40">
          <span>© {new Date().getFullYear()} Raanzlr. {t.footer.rights}</span>
          <span className="font-mono-accent uppercase tracking-[0.2em]">{t.footer.engineered}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
