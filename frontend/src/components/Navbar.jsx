import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import MagneticButton from "./MagneticButton";

const Navbar = () => {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const links = [
    { to: "/", label: t.nav.home, id: "home" },
    { to: "/services", label: t.nav.services, id: "services" },
    { to: "/about", label: t.nav.about, id: "about" },
    { to: "/contact", label: t.nav.contact, id: "contact" },
  ];

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/70 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          <Link to="/" data-testid="nav-logo-link" className="flex items-center gap-2 group">
            <img src="/Raanzlr.png" alt="Raanzlr" className="h-7 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.55)]" />
            <span className="font-display text-xl font-bold text-chrome">Raanzlr</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.id}
                to={l.to}
                end={l.to === "/"}
                data-testid={`nav-link-${l.id}`}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                    isActive
                      ? "text-cyan-200"
                      : "text-white/75 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{l.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 h-px w-6 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle compact />
            <MagneticButton to="/contact" testId="nav-cta-contact">
              {t.cta.contactUs}
            </MagneticButton>
          </div>

          <button
            data-testid="nav-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-full border border-white/10 text-white hover:border-cyan-400/50"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#050505]/90 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.id}
                to={l.to}
                end={l.to === "/"}
                data-testid={`mobile-nav-link-${l.id}`}
                className={({ isActive }) =>
                  `text-lg font-display ${isActive ? "text-cyan-200" : "text-white/80"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <LanguageToggle />
              <MagneticButton to="/contact" testId="mobile-nav-cta-contact">{t.cta.contactUs}</MagneticButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
