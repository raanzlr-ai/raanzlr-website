# SEO Enhancements & Patches for Raanzlr.com

## 1. Update SEO Component (Add Canonical & Hreflang)

Update `raanzlr/frontend/src/components/SEO.jsx`:

```jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLang } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

const SEO = ({ title, description, keywords, path, image, pageKey }) => {
  const { lang } = useLang();
  const baseUrl = "https://www.raanzlr.com";
  const canonicalUrl = `${baseUrl}${path}`;
  
  // Get SEO data from translations if pageKey is provided
  const seoData = pageKey ? translations[lang].seo[pageKey] : null;
  
  const finalTitle = title || seoData?.title || "Raanzlr — AI Solutions, Automation & Software Engineering";
  const finalDescription = description || seoData?.description || "Raanzlr engineers AI agents, workflow automations, web platforms, and mobile apps for enterprises.";
  const finalKeywords = keywords || seoData?.keywords || "AI agency, software engineering, automation";
  const finalImage = image || "https://customer-assets.emergentagent.com/job_25748306-256e-4fd3-8ba5-5b010768163d/artifacts/uq5zckrf_logo%20raanzlr.png";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang Tags for Bilingual Support */}
      <link rel="alternate" hreflang="en" href={`${canonicalUrl}?lang=en`} />
      <link rel="alternate" hreflang="ar" href={`${canonicalUrl}?lang=ar`} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content="Raanzlr" />
      <meta property="og:locale" content={lang === "ar" ? "ar_SA" : "en_US"} />
      <meta property="og:locale:alternate" content={lang === "ar" ? "en_US" : "ar_SA"} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
};

export default SEO;
```

---

## 2. Add JSON-LD Structured Data for Organization

Add to `raanzlr/frontend/public/index.html` in the `<head>` section:

```html
<!-- JSON-LD Structured Data: Organization -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Raanzlr",
  "url": "https://www.raanzlr.com",
  "logo": "https://customer-assets.emergentagent.com/job_25748306-256e-4fd3-8ba5-5b010768163d/artifacts/uq5zckrf_logo%20raanzlr.png",
  "description": "Raanzlr engineers AI agents, workflow automations, web platforms, and mobile apps for enterprises in MENA, Türkiye, and Europe.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "9 Branch Brook Dr #10030",
    "addressLocality": "Belleville",
    "addressRegion": "NJ",
    "postalCode": "07109",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "Customer Service",
    "email": "contact@raanzlr.com",
    "availableLanguage": ["English", "Arabic", "Turkish"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/raanzlr",
    "https://twitter.com/raanzlr"
  ]
}
</script>

<!-- JSON-LD Structured Data: WebSite -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Raanzlr",
  "url": "https://www.raanzlr.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.raanzlr.com/services?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

---

## 3. Add Prefers-Reduced-Motion Support

Add to `raanzlr/frontend/src/index.css` at the end:

```css
/* Accessibility: Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Disable specific animations */
  .floaty,
  .slow-spin,
  .sweep,
  .pulse-line,
  .shimmer-layer::before {
    animation: none !important;
  }
}
```

---

## 4. Add Image Lazy Loading

Update all `<img>` tags in components to include `loading="lazy"` for below-fold images:

**Example (Home.jsx):**
```jsx
<img
  src="/Raanzlr.png"
  alt="Raanzlr"
  width="320"
  height="320"
  loading="eager"  // Above fold
  className="h-[50%] w-[50%] object-contain"
/>

<img
  src={s.image}
  alt={s.title}
  width="1200"
  height="675"
  loading="lazy"  // Below fold
  className="absolute inset-0 w-full h-full object-cover"
/>
```

---

## 5. Add Missing Alt Attributes

Ensure all decorative images have `alt=""` and meaningful images have descriptive alt text:

```jsx
// Decorative
<img src="/decoration.png" alt="" aria-hidden="true" />

// Meaningful
<img src="/service-icon.png" alt="AI Chatbot Service Icon" />
```

---

## 6. Update index.html Meta Tags

Replace the existing meta tags in `raanzlr/frontend/public/index.html` with:

```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#050505" />
<meta name="description" content="Raanzlr engineers AI chatbots, workflow automation, web & mobile apps, and custom AI for ambitious teams worldwide. Senior team. Multilingual." />
<meta name="keywords" content="AI solutions, AI chatbot agency, Arabic AI chatbot, WhatsApp AI, workflow automation, n8n, custom AI development, web development agency, mobile app development, software studio, AI agency MENA, AI agency Türkiye, AI agency Europe" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
<meta name="author" content="Raanzlr" />

<!-- Canonical URL (will be overridden by react-helmet-async per page) -->
<link rel="canonical" href="https://www.raanzlr.com/" />

<!-- Hreflang Tags (will be overridden by react-helmet-async per page) -->
<link rel="alternate" hreflang="en" href="https://www.raanzlr.com/?lang=en" />
<link rel="alternate" hreflang="ar" href="https://www.raanzlr.com/?lang=ar" />
<link rel="alternate" hreflang="x-default" href="https://www.raanzlr.com/" />

<!-- Search Engine Verification -->
<meta name="google-site-verification" content="y62dwmWlp0CkKSW6KUXw_5YaPFdV-A80PRFsdQ_RjMU" />
<meta name="msvalidate.01" content="CA2C7F98992C0506D4C8158F4A00E724" />
<meta name="yandex-verification" content="029c4d7cf26f3df5" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Raanzlr" />
<meta property="og:title" content="Raanzlr — AI Solutions, Automation & Software Engineering" />
<meta property="og:description" content="Engineering intelligent software for ambitious teams worldwide." />
<meta property="og:image" content="https://customer-assets.emergentagent.com/job_25748306-256e-4fd3-8ba5-5b010768163d/artifacts/uq5zckrf_logo%20raanzlr.png" />
<meta property="og:url" content="https://www.raanzlr.com/" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="ar_SA" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Raanzlr — AI Solutions, Automation & Software Engineering" />
<meta name="twitter:description" content="Engineering intelligent software for ambitious teams worldwide." />
<meta name="twitter:image" content="https://customer-assets.emergentagent.com/job_25748306-256e-4fd3-8ba5-5b010768163d/artifacts/uq5zckrf_logo%20raanzlr.png" />

<!-- Favicon -->
<link rel="icon" type="image/png" href="https://customer-assets.emergentagent.com/job_25748306-256e-4fd3-8ba5-5b010768163d/artifacts/uq5zckrf_logo%20raanzlr.png" />
<link rel="apple-touch-icon" href="https://customer-assets.emergentagent.com/job_25748306-256e-4fd3-8ba5-5b010768163d/artifacts/uq5zckrf_logo%20raanzlr.png" />

<!-- Preconnect for Performance -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://us.i.posthog.com" />
<link rel="dns-prefetch" href="https://us-assets.i.posthog.com" />
<link rel="preconnect" href="https://us.i.posthog.com" />
<link rel="preconnect" href="https://us-assets.i.posthog.com" crossorigin />

<title>Raanzlr — AI Solutions, Automation & Software Engineering</title>
```

---

## 7. Implementation Checklist

- [ ] Update `SEO.jsx` component with canonical and hreflang tags
- [ ] Add JSON-LD structured data to `index.html`
- [ ] Add `prefers-reduced-motion` CSS to `index.css`
- [ ] Add `loading="lazy"` to below-fold images
- [ ] Add/fix `alt` attributes on all images
- [ ] Update meta tags in `index.html`
- [ ] Test all pages with Google Rich Results Test
- [ ] Test all pages with Lighthouse SEO audit
- [ ] Submit updated sitemap to Google Search Console
- [ ] Test language switching and hreflang tags
- [ ] Test reduced motion with browser DevTools

---

## 8. Testing URLs

After deployment, test these URLs:

- https://www.raanzlr.com/
- https://www.raanzlr.com/?lang=ar
- https://www.raanzlr.com/services
- https://www.raanzlr.com/about
- https://www.raanzlr.com/contact
- https://www.raanzlr.com/privacy-policy
- https://www.raanzlr.com/terms-of-service
- https://www.raanzlr.com/faq

**Tools:**
- Google Rich Results Test: https://search.google.com/test/rich-results
- Lighthouse: Chrome DevTools > Lighthouse
- Schema Markup Validator: https://validator.schema.org/
- Hreflang Checker: https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/

---

## 9. Expected SEO Score Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| On-Page SEO Checklist | 5/11 (D+) | 11/11 (A+) | +6 points |
| Canonical URLs | ❌ | ✅ | Fixed |
| Hreflang Tags | ❌ | ✅ | Fixed |
| JSON-LD Structured Data | ❌ | ✅ | Fixed |
| Prefers-Reduced-Motion | ❌ | ✅ | Fixed |
| Image Optimization | ⚠️ | ✅ | Improved |
| Accessibility Score | B- | A- | +1 grade |

---

**Implementation Priority:** HIGH  
**Estimated Time:** 2-3 hours  
**Impact:** Critical for SEO and accessibility compliance
