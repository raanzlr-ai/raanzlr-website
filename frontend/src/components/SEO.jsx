import React from "react";
import { Helmet } from "react-helmet-async";
import { useLang } from "../contexts/LanguageContext";

const SITE_URL = "https://raanzlr.com";
const LOGO = "https://customer-assets.emergentagent.com/job_25748306-256e-4fd3-8ba5-5b010768163d/artifacts/uq5zckrf_logo%20raanzlr.png";

const SEO = ({ pageKey = "home", path = "/", image = LOGO }) => {
  const { lang, t } = useLang();
  const meta = t.seo[pageKey];
  const url = `${SITE_URL}${path}`;

  // Enhanced Organization Schema with more details
  const orgLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "Corporation", "ProfessionalService"],
    name: "Raanzlr",
    alternateName: "Raanzlr AI Solutions",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO,
      width: "320",
      height: "320"
    },
    image: {
      "@type": "ImageObject",
      url: image,
      width: "1200",
      height: "630"
    },
    description: meta.description,
    email: "contact@raanzlr.com",
    telephone: "+1-XXX-XXX-XXXX",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9 Branch Brook Dr #10030",
      addressLocality: "Belleville",
      addressRegion: "NJ",
      postalCode: "07109",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.7936",
      longitude: "-74.1504"
    },
    areaServed: [
      {
        "@type": "Country",
        name: "United States"
      },
      {
        "@type": "Place",
        name: "MENA Region"
      },
      {
        "@type": "Country",
        name: "United Arab Emirates"
      },
      {
        "@type": "Country",
        name: "Saudi Arabia"
      },
      {
        "@type": "Country",
        name: "Turkey"
      },
      {
        "@type": "Place",
        name: "Europe"
      },
      {
        "@type": "Place",
        name: "Worldwide"
      }
    ],
    sameAs: [
      // Add social media profiles when available
      // "https://www.linkedin.com/company/raanzlr",
      // "https://twitter.com/raanzlr",
      // "https://github.com/raanzlr"
    ],
    foundingDate: "2024",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "10-50"
    },
    slogan: "Engineering intelligent software for ambitious teams",
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Workflow Automation",
      "Web Development",
      "Mobile App Development",
      "Custom AI Solutions",
      "CRM Integration",
      "UI/UX Design",
      "Technical Consulting",
      "Software Engineering",
      "AI Chatbots",
      "Natural Language Processing",
      "API Integration"
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Chatbots & Agents",
          description: "Intelligent, multilingual AI assistants for customer support and sales"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Workflow Automation",
          description: "Automated business processes and data workflows"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Development",
          description: "High-performance web platforms and SaaS applications"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile App Development",
          description: "iOS and Android mobile applications"
        }
      }
    ]
  };

  // Enhanced WebSite Schema with SearchAction
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Raanzlr",
    alternateName: "Raanzlr AI Solutions",
    url: SITE_URL,
    description: meta.description,
    inLanguage: lang === "ar" ? "ar" : "en",
    publisher: {
      "@type": "Organization",
      name: "Raanzlr",
      logo: {
        "@type": "ImageObject",
        url: LOGO
      }
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/services?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Enhanced Service Schema for Services Page
  const serviceLd = pageKey === "services" ? {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Raanzlr",
    url: SITE_URL + "/services",
    description: meta.description,
    provider: {
      "@type": "Organization",
      name: "Raanzlr"
    },
    areaServed: ["United States", "MENA", "Europe", "Turkey", "Worldwide"],
    serviceType: [
      "AI Chatbots",
      "Workflow Automation",
      "Web Development",
      "Mobile App Development",
      "Custom AI Solutions",
      "CRM Integration",
      "UI/UX Design",
      "Tech Consulting"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Raanzlr Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Agents & Chatbots",
            description: "Intelligent, multilingual assistants across WhatsApp, Web, and Instagram",
            provider: {
              "@type": "Organization",
              name: "Raanzlr"
            }
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Workflow Automation",
            description: "Eliminate manual data entry with resilient, automated workflows",
            provider: {
              "@type": "Organization",
              name: "Raanzlr"
            }
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Platforms & Apps",
            description: "High-performance marketing sites, SaaS applications, and e-commerce storefronts",
            provider: {
              "@type": "Organization",
              name: "Raanzlr"
            }
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description: "Premium iOS and Android applications",
            provider: {
              "@type": "Organization",
              name: "Raanzlr"
            }
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom AI Solutions",
            description: "Proprietary AI models, RAG, and data pipelines",
            provider: {
              "@type": "Organization",
              name: "Raanzlr"
            }
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "API & Systems Integration",
            description: "Connect your entire technological ecosystem",
            provider: {
              "@type": "Organization",
              name: "Raanzlr"
            }
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX & Product Design",
            description: "Strategic product design and design systems",
            provider: {
              "@type": "Organization",
              name: "Raanzlr"
            }
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Technical Audits & Consulting",
            description: "Expert analysis and strategic roadmaps",
            provider: {
              "@type": "Organization",
              name: "Raanzlr"
            }
          }
        }
      ]
    }
  } : null;

  // BreadcrumbList Schema
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL
      },
      ...(pageKey !== "home" ? [{
        "@type": "ListItem",
        position: 2,
        name: meta.title.split(" — ")[0],
        item: url
      }] : [])
    ]
  };

  // ContactPage Schema for Contact Page
  const contactLd = pageKey === "contact" ? {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Raanzlr",
    description: meta.description,
    url: url,
    mainEntity: {
      "@type": "Organization",
      name: "Raanzlr",
      email: "contact@raanzlr.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "9 Branch Brook Dr #10030",
        addressLocality: "Belleville",
        addressRegion: "NJ",
        postalCode: "07109",
        addressCountry: "US"
      }
    }
  } : null;

  // AboutPage Schema for About Page
  const aboutLd = pageKey === "about" ? {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Raanzlr",
    description: meta.description,
    url: url,
    mainEntity: {
      "@type": "Organization",
      name: "Raanzlr",
      description: "An engineering studio for the AI era",
      foundingDate: "2024",
      address: {
        "@type": "PostalAddress",
        streetAddress: "9 Branch Brook Dr #10030",
        addressLocality: "Belleville",
        addressRegion: "NJ",
        postalCode: "07109",
        addressCountry: "US"
      }
    }
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

      {/* Open Graph - Enhanced */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Raanzlr" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={meta.title} />
      <meta property="og:locale" content={lang === "ar" ? "ar_AE" : "en_US"} />

      {/* Twitter Card - Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={meta.title} />
      <meta name="twitter:site" content="@raanzlr" />
      <meta name="twitter:creator" content="@raanzlr" />

      {/* Additional Meta Tags for Better SEO */}
      <meta name="application-name" content="Raanzlr" />
      <meta name="apple-mobile-web-app-title" content="Raanzlr" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Theme */}
      <meta name="theme-color" content="#050505" />
      <meta name="msapplication-TileColor" content="#050505" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(orgLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      {serviceLd && <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>}
      {contactLd && <script type="application/ld+json">{JSON.stringify(contactLd)}</script>}
      {aboutLd && <script type="application/ld+json">{JSON.stringify(aboutLd)}</script>}
    </Helmet>
  );
};

export default SEO;
