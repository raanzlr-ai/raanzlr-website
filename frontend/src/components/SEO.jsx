import React from "react";
import { Helmet } from "react-helmet-async";
import { useLang } from "../contexts/LanguageContext";

const SITE_URL = "https://raanzlr.com";
const LOGO = "https://customer-assets.emergentagent.com/job_25748306-256e-4fd3-8ba5-5b010768163d/artifacts/uq5zckrf_logo%20raanzlr.png";

const SEO = ({ pageKey = "home", path = "/", image = LOGO }) => {
  const { lang, t } = useLang();
  const meta = t.seo[pageKey];
  const url = `${SITE_URL}${path}`;

  // Schema.org structured data
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Raanzlr",
    url: SITE_URL,
    logo: LOGO,
    image,
    description: meta.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "9 Branch Brook Dr #10030",
      addressLocality: "Belleville",
      addressRegion: "NJ",
      postalCode: "07109",
      addressCountry: "US",
    },
    sameAs: [],
    areaServed: ["MENA", "Middle East", "GCC", "Türkiye", "Syria", "Europe", "Worldwide"],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Raanzlr",
    url: SITE_URL,
    inLanguage: lang === "ar" ? "ar" : "en",
  };

  const serviceLd = pageKey === "services" ? {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Raanzlr",
    url: SITE_URL + "/services",
    description: meta.description,
    serviceType: [
      "AI Chatbots",
      "Workflow Automation",
      "Web Development",
      "Mobile App Development",
      "Custom AI Solutions",
      "CRM Integration",
      "UI/UX Design",
      "Tech Consulting",
    ],
  } : null;

  return (
    <Helmet>
      {/* Language & Direction */}
      <html lang={lang === "ar" ? "ar" : "en"} dir={lang === "ar" ? "rtl" : "ltr"} />
      
      {/* Primary Meta Tags */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="author" content="Raanzlr" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* 
        NOTE: hreflang tags removed intentionally.
        Reason: Language switching is client-side only (localStorage).
        No actual language-specific URLs exist (e.g., /en/, /ar/).
        Adding hreflang without proper URL structure sends conflicting signals to Google.
        
        Future: When implementing proper i18n URLs, add:
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en${path}`} />
        <link rel="alternate" hrefLang="ar" href={`${SITE_URL}/ar${path}`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en${path}`} />
      */}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Raanzlr" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={lang === "ar" ? "ar_AE" : "en_US"} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />

      {/* Theme */}
      <meta name="theme-color" content="#050505" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(orgLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
      {serviceLd && <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>}
    </Helmet>
  );
};

export default SEO;
