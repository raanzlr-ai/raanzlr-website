import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LanguageContext";
import Heartbeat from "./Heartbeat";

const ServiceModal = ({ service, onClose }) => {
  const { t } = useLang();
  const open = Boolean(service);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const onEsc = (e) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onEsc);
      };
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            data-testid="service-modal-backdrop"
          />
          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-400/25 bg-gradient-to-b from-[#0b0b0c] to-[#050505] shadow-[0_0_60px_-12px_rgba(0,240,255,0.45)]"
            data-testid="service-modal"
          >
            {/* Image */}
            <div className="relative h-56 md:h-72 overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]" />
              <div className="absolute inset-0 bg-grid opacity-30" />
              <button
                onClick={onClose}
                data-testid="service-modal-close"
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 h-10 w-10 rounded-full border border-white/15 bg-black/40 backdrop-blur-md text-white/80 hover:text-white hover:border-cyan-400/60 flex items-center justify-center"
                aria-label={t.cta.close}
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 rtl:left-auto rtl:right-6">
                <span className={`inline-block text-[10px] font-mono-accent uppercase tracking-[0.22em] px-2.5 py-1 rounded-full border ${service.tier === "high" ? "border-cyan-400/50 text-cyan-300 bg-cyan-400/10" : "border-white/15 text-white/60"}`}>
                  {service.tier === "high" ? t.services.highDemand : t.services.standard}
                </span>
                <h3 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
                  {service.title}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 md:px-10 py-8">
              <p className="text-white/75 leading-relaxed">{service.long}</p>

              <div className="mt-7">
                <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
                  // how this helps you
                </div>
                <ul className="grid md:grid-cols-2 gap-3">
                  {service.helps.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-4">
                      <Check className="h-4 w-4 text-cyan-300 mt-0.5 shrink-0" />
                      <span className="text-sm text-white/80">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Heartbeat className="w-full h-8 my-8 opacity-60" />

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <span className="text-xs text-white/40 font-mono-accent uppercase tracking-[0.2em]">
                  ready · to · build
                </span>
                <Link
                  to={`/contact?service=${service.key}`}
                  data-testid={`service-modal-request-${service.key}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400/15 border border-cyan-400/50 px-7 py-3.5 text-sm text-cyan-100 hover:bg-cyan-400/25 hover:text-white transition-colors"
                >
                  {t.cta.requestService}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
