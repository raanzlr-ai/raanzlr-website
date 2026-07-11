import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import SEO from "../components/SEO";
import MagneticButton from "../components/MagneticButton";

const HELPFUL_LINKS = [
  { to: "/services", en: "Services", ar: "الخدمات" },
  { to: "/industries", en: "Industries", ar: "القطاعات" },
  { to: "/markets", en: "Markets", ar: "الأسواق" },
  { to: "/insights", en: "Insights", ar: "المدونة" },
  { to: "/faq", en: "FAQ", ar: "الأسئلة الشائعة" },
  { to: "/contact", en: "Contact", ar: "تواصل معنا" },
];

export default function NotFound() {
  const { isAr, localizedPath } = useLang();

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <SEO
        title="404 — Page Not Found · Raanzlr"
        titleAr="404 — الصفحة غير موجودة · Raanzlr"
        description="The page you're looking for doesn't exist or has moved."
        descriptionAr="الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
        path="/404"
        noIndex
      />

      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="noise absolute inset-0" />
      <div className="absolute -top-40 right-0 h-[460px] w-[460px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8 w-full py-32 text-center">
        <div className="font-display text-[6rem] sm:text-[9rem] font-bold leading-none text-electric glow-text">404</div>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-chrome">
          {isAr ? "الصفحة غير موجودة" : "Page not found"}
        </h1>
        <p className="mt-4 text-foreground/60 max-w-md mx-auto leading-relaxed">
          {isAr
            ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها. لنُعدك إلى المسار الصحيح."
            : "The page you're looking for doesn't exist or has moved. Let's get you back on track."}
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <MagneticButton to={localizedPath("/")}>
            {isAr ? "العودة للرئيسية" : "Back to Home"}
          </MagneticButton>
          <MagneticButton to={localizedPath("/contact")} variant="ghost">
            {isAr ? "تواصل معنا" : "Contact Us"}
          </MagneticButton>
        </div>

        <div className="mt-14">
          <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-foreground/40 mb-5">
            {isAr ? "// روابط مفيدة" : "// Helpful links"}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {HELPFUL_LINKS.map((l) => (
              <Link
                key={l.to}
                to={localizedPath(l.to)}
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.02] px-4 py-2 text-sm text-foreground/70 hover:border-cyan-400/40 hover:text-foreground transition-colors"
              >
                {isAr ? l.ar : l.en}
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
