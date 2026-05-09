# Implementation Guide — New Pages & SEO Enhancements

## Overview

This guide provides step-by-step instructions for implementing the three new legal pages (Privacy Policy, Terms of Service, FAQ) and applying critical SEO enhancements to Raanzlr.com.

---

## Phase 1: New Pages Implementation

### Files Created

1. **`raanzlr/frontend/src/pages/PrivacyPolicy.jsx`** ✅
   - Bilingual (EN/AR) privacy policy
   - Matches existing design system
   - Includes all required sections (GDPR-compliant)

2. **`raanzlr/frontend/src/pages/TermsOfService.jsx`** ✅
   - Bilingual (EN/AR) terms of service
   - Covers all legal aspects
   - Matches existing design system

3. **`raanzlr/frontend/src/pages/FAQ.jsx`** ✅
   - Bilingual (EN/AR) FAQ with 16 questions
   - Searchable accordion UI
   - JSON-LD structured data for rich results
   - Organized in 4 categories: Services, Pricing, Process, Support

### Files Modified

1. **`raanzlr/frontend/src/App.js`** ✅
   - Added lazy-loaded routes for new pages
   - Routes: `/privacy-policy`, `/terms-of-service`, `/faq`

2. **`raanzlr/frontend/src/components/Footer.jsx`** ✅
   - Added links to new pages in footer
   - Bilingual link labels

3. **`raanzlr/frontend/src/lib/translations.js`** ✅
   - Added `isAr` property to both language objects

---

## Phase 2: SEO Enhancements

### Critical Fixes Required

#### 1. Update SEO Component

**File:** `raanzlr/frontend/src/components/SEO.jsx`

**Action:** Replace entire file with the enhanced version from `SEO-ENHANCEMENTS.md` section 1.

**What it adds:**
- Canonical URLs for all pages
- Hreflang tags for EN/AR language alternates
- Enhanced Open Graph tags with locale
- Per-page meta tag management

**Testing:**
```bash
# After implementation, view page source and verify:
# - <link rel="canonical" href="https://www.raanzlr.com/[page]" />
# - <link rel="alternate" hreflang="en" href="..." />
# - <link rel="alternate" hreflang="ar" href="..." />
```

---

#### 2. Add JSON-LD Structured Data

**File:** `raanzlr/frontend/public/index.html`

**Action:** Add the two JSON-LD scripts from `SEO-ENHANCEMENTS.md` section 2 inside the `<head>` tag, before the closing `</head>`.

**What it adds:**
- Organization schema (name, address, contact)
- WebSite schema (search action)

**Testing:**
```bash
# Test with Google Rich Results Test:
https://search.google.com/test/rich-results
# Enter: https://www.raanzlr.com/
```

---

#### 3. Add Prefers-Reduced-Motion Support

**File:** `raanzlr/frontend/src/index.css`

**Action:** Add the CSS from `SEO-ENHANCEMENTS.md` section 3 at the end of the file.

**What it adds:**
- Disables animations for users with motion sensitivity
- Accessibility compliance (WCAG 2.1 Level AA)

**Testing:**
```bash
# Chrome DevTools:
# 1. Open DevTools (F12)
# 2. Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
# 3. Type "Emulate CSS prefers-reduced-motion"
# 4. Select "prefers-reduced-motion: reduce"
# 5. Verify animations are disabled
```

---

#### 4. Update Sitemap

**Files:**
- `raanzlr/frontend/public/sitemap-updated.xml` ✅ (Created)
- `raanzlr/frontend/public/robots.txt` ✅ (Updated)

**Action:**
1. Replace `sitemap.xml` with `sitemap-updated.xml` content
2. Or keep both and update `sitemap.xml` to be a sitemap index

**What it adds:**
- All 7 main pages (Home, Services, About, Contact, Privacy, Terms, FAQ)
- Language variants (?lang=en, ?lang=ar)
- Individual service pages
- Proper hreflang tags in sitemap

**Testing:**
```bash
# Validate sitemap:
https://www.xml-sitemaps.com/validate-xml-sitemap.html

# Submit to Google Search Console:
https://search.google.com/search-console
# Property > Sitemaps > Add new sitemap > sitemap-updated.xml
```

---

## Phase 3: Image Optimization

### Add Lazy Loading

**Files to update:**
- `raanzlr/frontend/src/pages/Home.jsx`
- `raanzlr/frontend/src/pages/Services.jsx`
- `raanzlr/frontend/src/pages/About.jsx`

**Action:** Add `loading="lazy"` to all images below the fold.

**Example:**
```jsx
// Above fold (hero images)
<img src="/logo.png" alt="Raanzlr Logo" loading="eager" />

// Below fold (service images, decorative images)
<img src={service.image} alt={service.title} loading="lazy" />
```

---

### Fix Missing Alt Attributes

**Action:** Audit all `<img>` tags and ensure:
- Decorative images: `alt=""` and `aria-hidden="true"`
- Meaningful images: Descriptive alt text

**Example:**
```jsx
// Decorative
<img src="/decoration.png" alt="" aria-hidden="true" />

// Meaningful
<img src="/ai-chatbot.jpg" alt="AI chatbot interface showing conversation flow" />
```

---

## Phase 4: Testing & Validation

### 1. Local Testing

```bash
cd raanzlr/frontend
npm start

# Test all new pages:
# http://localhost:3000/privacy-policy
# http://localhost:3000/terms-of-service
# http://localhost:3000/faq

# Test language switching on each page
# Test search functionality on FAQ page
# Test accordion expand/collapse on FAQ page
```

---

### 2. Build & Deploy

```bash
cd raanzlr/frontend
npm run build

# Deploy to Vercel (or your hosting provider)
vercel --prod
```

---

### 3. Post-Deployment Validation

#### SEO Checklist

| Check | Tool | Expected Result |
|-------|------|-----------------|
| Canonical URLs | View Source | `<link rel="canonical" href="https://www.raanzlr.com/[page]" />` |
| Hreflang Tags | View Source | `<link rel="alternate" hreflang="en" ...>` |
| JSON-LD | Rich Results Test | Organization & WebSite schemas detected |
| FAQ Schema | Rich Results Test | FAQPage schema with 16 questions |
| Meta Tags | View Source | Unique title/description per page |
| Sitemap | XML Validator | Valid XML, all URLs accessible |
| Robots.txt | Direct URL | Accessible at /robots.txt |
| Mobile-Friendly | Mobile-Friendly Test | Pass |
| Page Speed | Lighthouse | Score > 90 |
| Accessibility | Lighthouse | Score > 90 |

#### Tools

1. **Google Rich Results Test**
   ```
   https://search.google.com/test/rich-results
   ```
   - Test: Homepage, FAQ page
   - Expected: Organization, WebSite, FAQPage schemas

2. **Google Mobile-Friendly Test**
   ```
   https://search.google.com/test/mobile-friendly
   ```
   - Test: All 7 pages
   - Expected: Mobile-friendly

3. **Lighthouse (Chrome DevTools)**
   ```
   F12 > Lighthouse > Generate Report
   ```
   - Categories: Performance, Accessibility, Best Practices, SEO
   - Expected: All > 90

4. **Schema Markup Validator**
   ```
   https://validator.schema.org/
   ```
   - Paste page source
   - Expected: No errors

5. **Hreflang Checker**
   ```
   https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/
   ```
   - Enter: https://www.raanzlr.com/
   - Expected: EN/AR alternates detected

---

## Phase 5: Google Search Console Submission

### 1. Submit Sitemap

```
1. Go to: https://search.google.com/search-console
2. Select property: www.raanzlr.com
3. Navigate to: Sitemaps
4. Add new sitemap: sitemap-updated.xml
5. Click: Submit
```

### 2. Request Indexing for New Pages

```
1. In Search Console, go to: URL Inspection
2. Enter URL: https://www.raanzlr.com/privacy-policy
3. Click: Request Indexing
4. Repeat for:
   - /terms-of-service
   - /faq
```

### 3. Monitor Coverage

```
1. Go to: Coverage report
2. Wait 3-7 days for Google to crawl
3. Verify: All new pages appear in "Valid" section
```

---

## Phase 6: Analytics & Monitoring

### 1. Verify Analytics Tracking

**Check PostHog:**
```javascript
// Verify events are firing for new pages
posthog.capture('$pageview', {
  $current_url: window.location.href,
  page: 'privacy-policy' // or 'terms-of-service', 'faq'
})
```

### 2. Set Up Search Console Alerts

```
1. Search Console > Settings > Users and permissions
2. Add email for notifications
3. Enable alerts for:
   - Coverage issues
   - Manual actions
   - Security issues
```

---

## Troubleshooting

### Issue: Pages not rendering

**Solution:**
```bash
# Clear build cache
rm -rf raanzlr/frontend/build
rm -rf raanzlr/frontend/node_modules/.cache

# Rebuild
npm run build
```

---

### Issue: Language toggle not working on new pages

**Solution:**
Check that `useLang()` hook is imported and used:
```jsx
import { useLang } from "../contexts/LanguageContext";

const MyPage = () => {
  const { t, isAr } = useLang();
  // ...
};
```

---

### Issue: FAQ search not working

**Solution:**
Verify `useState` and `useMemo` are imported:
```jsx
import React, { useState, useMemo } from "react";
```

---

### Issue: Accordion not expanding

**Solution:**
Check that shadcn/ui accordion component is installed:
```bash
cd raanzlr/frontend
npm install @radix-ui/react-accordion
```

---

## Success Metrics

After implementation, you should see:

### Immediate (Day 1)
- ✅ All 7 pages accessible
- ✅ Language toggle works on all pages
- ✅ FAQ search functional
- ✅ Footer links work
- ✅ No console errors

### Short-term (Week 1)
- ✅ Google indexes new pages
- ✅ Rich results appear for FAQ
- ✅ Lighthouse scores > 90
- ✅ No accessibility violations

### Long-term (Month 1)
- ✅ Organic traffic to new pages
- ✅ Reduced bounce rate on legal pages
- ✅ FAQ page appears in "People also ask"
- ✅ Improved overall SEO score

---

## Support

If you encounter issues:

1. Check browser console for errors (F12)
2. Verify all files are saved and deployed
3. Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
4. Check Vercel deployment logs
5. Review `SITE-AUDIT-REPORT.md` for reference

---

**Last Updated:** May 9, 2026  
**Version:** 1.0  
**Status:** Ready for Implementation
