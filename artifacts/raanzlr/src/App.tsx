import React, { Suspense, lazy, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Industries = lazy(() => import("./pages/Industries"));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const Insights = lazy(() => import("./pages/Insights"));
const InsightPost = lazy(() => import("./pages/InsightPost"));
const Markets = lazy(() => import("./pages/Markets"));
const MarketDetail = lazy(() => import("./pages/MarketDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/not-found"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="h-8 w-8 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
  </div>
);

function AppContent() {
  const location = useLocation();
  // Match /admin and /:lang/admin, tolerating a trailing slash (Vercel may serve /admin/).
  // Without the trailing-slash tolerance the site Navbar renders on top of the Admin's own
  // top bar — the "two headers" bug.
  const isAdmin = /(^|\/)admin\/?$/.test(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
    // SPA page_view for GA4 — the gtag config sets send_page_view:false, so each
    // client-side navigation (and the initial load) is reported here exactly once.
    const id = window.setTimeout(() => {
      const gtag = (window as any).gtag;
      if (typeof gtag === "function") {
        gtag("event", "page_view", {
          page_path: location.pathname + location.search,
          page_location: window.location.href,
          page_title: document.title,
        });
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      {!isAdmin && <Navbar />}
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Routes without language prefix */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<InsightPost />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/markets/:slug" element={<MarketDetail />} />
            <Route path="/book-a-call" element={<Navigate to="/contact" replace />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/admin" element={<Admin />} />
            
            {/* Routes with language prefix — "en"/"ar" only (not a wildcard :lang
                param), so any other single-segment path (a typo, an old bookmark)
                falls through to the catch-all 404 below instead of silently
                rendering Home. useLang() derives language from the URL string
                itself, not from a route param, so this is safe to be explicit. */}
            <Route path="/en" element={<Home />} />
            <Route path="/en/services" element={<Services />} />
            <Route path="/en/services/:slug" element={<ServiceDetail />} />
            <Route path="/en/about" element={<About />} />
            <Route path="/en/contact" element={<Contact />} />
            <Route path="/en/faq" element={<FAQ />} />
            <Route path="/en/industries" element={<Industries />} />
            <Route path="/en/industries/:slug" element={<IndustryDetail />} />
            <Route path="/en/case-studies" element={<CaseStudies />} />
            <Route path="/en/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/en/insights" element={<Insights />} />
            <Route path="/en/insights/:slug" element={<InsightPost />} />
            <Route path="/en/markets" element={<Markets />} />
            <Route path="/en/markets/:slug" element={<MarketDetail />} />
            <Route path="/en/book-a-call" element={<Navigate to="/contact" replace />} />
            <Route path="/en/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/en/terms-of-service" element={<TermsOfService />} />
            <Route path="/en/admin" element={<Admin />} />

            <Route path="/ar" element={<Home />} />
            <Route path="/ar/services" element={<Services />} />
            <Route path="/ar/services/:slug" element={<ServiceDetail />} />
            <Route path="/ar/about" element={<About />} />
            <Route path="/ar/contact" element={<Contact />} />
            <Route path="/ar/faq" element={<FAQ />} />
            <Route path="/ar/industries" element={<Industries />} />
            <Route path="/ar/industries/:slug" element={<IndustryDetail />} />
            <Route path="/ar/case-studies" element={<CaseStudies />} />
            <Route path="/ar/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/ar/insights" element={<Insights />} />
            <Route path="/ar/insights/:slug" element={<InsightPost />} />
            <Route path="/ar/markets" element={<Markets />} />
            <Route path="/ar/markets/:slug" element={<MarketDetail />} />
            <Route path="/ar/book-a-call" element={<Navigate to="/contact" replace />} />
            <Route path="/ar/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/ar/terms-of-service" element={<TermsOfService />} />
            <Route path="/ar/admin" element={<Admin />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
      <Toaster position="bottom-right" />
    </div>
  );
}

function App() {
  const initParticles = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
      <LanguageProvider>
        <ParticlesProvider init={initParticles}>
          <AppContent />
        </ParticlesProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
