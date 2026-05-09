# Raanzlr.com — Design System Reference Card

Quick reference for maintaining design consistency across all pages.

---

## 🎨 Color Palette

### Primary Colors
```css
Background:     #050505    /* Main dark background */
Foreground:     #FFFFFF    /* Primary text */
Cyan Accent:    #00F0FF    /* Primary brand color */
Blue Accent:    #2563EB    /* Secondary brand color */
```

### Opacity Variations
```css
White overlays:  /[0.02], /5, /10, /15, /30, /40, /60, /65, /75, /80
Cyan overlays:   /5, /10, /20, /30, /40, /50
```

### Gradients
```css
/* Chrome Text */
background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 45%, #64748b 55%, #e2e8f0 100%);

/* Electric Text */
background: linear-gradient(90deg, #2563EB 0%, #00F0FF 100%);

/* Radial Fade */
background: radial-gradient(ellipse at 50% 0%, rgba(0,240,255,0.12), transparent 60%);
```

---

## 📝 Typography

### Font Families
```css
/* English */
Headings:  'Space Grotesk', sans-serif
Body:      'Manrope', sans-serif
Mono:      'IBM Plex Mono', 'JetBrains Mono', monospace

/* Arabic (RTL) */
Headings:  'IBM Plex Sans Arabic', 'Tajawal', sans-serif
Body:      'Tajawal', 'IBM Plex Sans Arabic', sans-serif
```

### Font Sizes (Responsive)
```css
/* Hero H1 */
text-4xl sm:text-5xl md:text-6xl lg:text-7xl
/* 36px → 48px → 60px → 72px */

/* Section H2 */
text-3xl sm:text-4xl md:text-5xl
/* 30px → 36px → 48px */

/* Card H3 */
text-xl sm:text-2xl
/* 20px → 24px */

/* Body */
text-base md:text-lg
/* 16px → 18px */

/* Small */
text-sm
/* 14px */

/* Mono Labels */
text-[10px] sm:text-xs
/* 10px → 12px */
```

### Font Weights
```css
font-light:     300
font-normal:    400
font-medium:    500
font-semibold:  600
font-bold:      700
font-extrabold: 800  /* Arabic only */
```

---

## 🧩 Component Patterns

### Card
```jsx
<div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-cyan-400/30 transition-colors">
  <div className="shimmer-layer absolute inset-0 pointer-events-none" />
  <div className="relative">
    {/* Content */}
  </div>
</div>
```

### Icon Container
```jsx
<div className="h-12 w-12 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center justify-center">
  <Icon className="h-5 w-5 text-cyan-300" />
</div>
```

### Section Header
```jsx
<div className="max-w-3xl">
  <div className="text-xs font-mono-accent uppercase tracking-[0.22em] text-cyan-300/90">
    // label
  </div>
  <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-chrome">
    Heading
  </h2>
  <p className="mt-4 text-white/60">
    Description
  </p>
</div>
```

### Button (Primary)
```jsx
<MagneticButton to="/path" testId="button-id">
  Button Text
</MagneticButton>
```

### Button (Ghost)
```jsx
<MagneticButton to="/path" variant="ghost" testId="button-id">
  Button Text
</MagneticButton>
```

---

## 🎭 Animation Classes

### Utility Classes
```css
.glow-text        /* Cyan text shadow */
.glow-border      /* Cyan border glow */
.glow-soft        /* Soft cyan glow */
.text-chrome      /* Chrome gradient text */
.text-electric    /* Cyan-blue gradient text */
.shimmer-layer    /* Hover shimmer effect */
.floaty           /* Gentle float animation */
.slow-spin        /* 40s rotation */
.magnetic         /* Mouse-follow transform */
```

### Framer Motion Components
```jsx
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";

<Reveal delay={0.1}>
  {/* Content fades in on scroll */}
</Reveal>

<Stagger className="grid grid-cols-3 gap-5">
  <StaggerItem>Card 1</StaggerItem>
  <StaggerItem>Card 2</StaggerItem>
  <StaggerItem>Card 3</StaggerItem>
</Stagger>
```

---

## 📐 Spacing & Layout

### Container
```jsx
<div className="mx-auto max-w-7xl px-6 lg:px-8">
  {/* Content */}
</div>
```

### Content Width
```jsx
<div className="max-w-4xl">  {/* 1024px - for content pages */}
<div className="max-w-5xl">  {/* 1280px - for wide content */}
<div className="max-w-7xl">  {/* 1536px - for full sections */}
```

### Section Padding
```jsx
<section className="py-16 sm:py-20">  {/* Standard section */}
<section className="py-20 sm:py-28">  {/* Large section */}
```

### Grid Layouts
```jsx
/* 3-column grid */
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

/* 4-column grid */
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

/* 12-column grid */
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
  <div className="lg:col-span-6">Left</div>
  <div className="lg:col-span-6">Right</div>
</div>
```

---

## 🌐 Bilingual Support

### Language Detection
```jsx
import { useLang } from "../contexts/LanguageContext";

const MyComponent = () => {
  const { t, isAr, lang } = useLang();
  
  return (
    <div>
      <h1>{isAr ? "عنوان" : "Title"}</h1>
      <p>{t.page.content}</p>
    </div>
  );
};
```

### RTL Layout
```jsx
/* Automatic RTL mirroring */
<div className="text-left rtl:text-right">
<div className="ml-4 rtl:ml-0 rtl:mr-4">
<div className="left-4 rtl:left-auto rtl:right-4">
```

### Font Switching
```jsx
/* Automatically applied via body.font-ar class */
[dir="rtl"] .font-display,
[dir="rtl"] .font-body {
  font-family: 'IBM Plex Sans Arabic', 'Tajawal', sans-serif;
}
```

---

## 🎯 Hero Section Pattern

```jsx
<section className="relative min-h-[60vh] flex items-center overflow-hidden pt-28 sm:pt-32">
  {/* Background */}
  <div className="absolute inset-0 bg-grid" />
  <div className="absolute inset-0 bg-radial-fade" />
  <div className="absolute -top-20 right-1/4 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />
  <div className="noise absolute inset-0" />

  {/* Content */}
  <div className="relative mx-auto max-w-5xl px-6 lg:px-8 w-full py-16 sm:py-20">
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 text-[10px] sm:text-xs font-mono-accent uppercase tracking-[0.18em] text-cyan-300"
    >
      <Icon className="h-3.5 w-3.5" />
      LABEL
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.04] tracking-tighter text-chrome"
    >
      Page Title
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25 }}
      className="mt-5 max-w-2xl text-base md:text-lg text-white/65"
    >
      Description text
    </motion.p>
  </div>
</section>
```

---

## 🔧 SEO Pattern

```jsx
import SEO from "../components/SEO";

const MyPage = () => {
  const { isAr } = useLang();
  
  return (
    <div>
      <SEO
        title={isAr ? "عنوان الصفحة — Raanzlr" : "Page Title — Raanzlr"}
        description={isAr ? "وصف الصفحة" : "Page description"}
        path="/page-path"
      />
      {/* Page content */}
    </div>
  );
};
```

---

## 📱 Responsive Breakpoints

```css
/* Tailwind default breakpoints */
sm:  640px   /* Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large desktops */
```

### Mobile-First Approach
```jsx
/* Mobile (default) */
<div className="text-2xl">

/* Tablet and up */
<div className="text-2xl md:text-4xl">

/* Desktop and up */
<div className="text-2xl md:text-4xl lg:text-5xl">
```

---

## ✅ Accessibility Checklist

- [ ] All images have `alt` attributes
- [ ] Decorative images: `alt=""` and `aria-hidden="true"`
- [ ] Interactive elements have `aria-label` or visible text
- [ ] Color contrast meets WCAG AA (4.5:1 for body, 3:1 for large text)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Semantic HTML (`<main>`, `<nav>`, `<header>`, `<footer>`)
- [ ] `lang` attribute set on `<html>`
- [ ] `dir` attribute set for RTL
- [ ] Prefers-reduced-motion supported

---

## 🚀 Performance Best Practices

### Image Optimization
```jsx
/* Above fold */
<img src="/hero.png" alt="Hero" loading="eager" width="1200" height="675" />

/* Below fold */
<img src="/feature.png" alt="Feature" loading="lazy" width="800" height="600" />
```

### Code Splitting
```jsx
/* Lazy load pages */
const MyPage = lazy(() => import("./pages/MyPage"));
```

### Font Loading
```html
<!-- Preconnect for faster font loading -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

---

## 📦 Component Imports

```jsx
// Layout
import { useLang } from "../contexts/LanguageContext";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import PulseDivider from "../components/PulseDivider";
import MagneticButton from "../components/MagneticButton";
import Heartbeat from "../components/Heartbeat";
import SEO from "../components/SEO";

// UI Components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

// Icons
import { Icon1, Icon2 } from "lucide-react";

// Animation
import { motion } from "framer-motion";
```

---

## 🎨 Quick Copy-Paste Snippets

### Cyan Badge
```jsx
<span className="text-[10px] font-mono-accent uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-cyan-400/50 text-cyan-300 bg-cyan-400/10">
  HIGH DEMAND
</span>
```

### Divider Line
```jsx
<div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
```

### Glow Box
```jsx
<div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.06] to-transparent p-8">
  {/* Content */}
</div>
```

### Corner Ticks
```jsx
{[
  ["top-3 left-3", "border-t border-l"],
  ["top-3 right-3", "border-t border-r"],
  ["bottom-3 left-3", "border-b border-l"],
  ["bottom-3 right-3", "border-b border-r"],
].map(([pos, b], i) => (
  <span key={i} className={`absolute ${pos} h-5 w-5 ${b} border-cyan-400/40`} />
))}
```

---

**Last Updated:** May 9, 2026  
**Version:** 1.0  
**Maintained by:** Raanzlr Development Team
