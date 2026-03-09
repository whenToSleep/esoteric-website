# Design Specification — Crimson Alchemy

> **Version**: 2.0 — Full redesign from "Cosmic Night" (purple/gold) to "Crimson Alchemy" (crimson/obsidian/emerald).
> **Read this file at the START of every Claude Code session.**

---

## 1. Design Philosophy

The site must feel like a **ritual space rendered in code**. Not a corporate SaaS landing page, not a generic template — a space where ancient wisdom meets modern craft.

**Core aesthetic**: alchemical, warm, alive. Words materialize like spells. Elements emerge from darkness. Movements are slow and deliberate — rewarding attention, not demanding it.

**Anti-patterns** (things that made the old site "too strict and computer-like"):
- Equal-sized uniform grids (→ replaced by asymmetric bento layouts)
- Abstract backgrounds without human presence (→ replaced by practitioner photo in hero)
- Cool purple/violet palette (→ replaced by warm crimson/gold)
- Minimal/absent animations (→ replaced by layered scroll reveals, text animations, parallax)
- Corporate typography rhythm (→ replaced by editorial, poetic spacing)

**Reference sites for mood**:
- Quantum Body (quantumbody.io) — spiritual UX blueprint, numbered content, star dividers
- Human Interest (humaninterest.co.nz) — editorial text reveals, line-by-line scroll
- Lando Norris (landonorris.com) — branded preloader, SVG path drawing, parallax

---

## 2. Color System

### 2.1 Palette Overview

**Rule: 60 / 25 / 5 / 5 / 5**
- 60% — Black foundation (void, obsidian, onyx)
- 25% — Crimson primary accent
- 5% — Emerald secondary accent
- 5% — Gold bridge color
- 5% — Warm off-white text

The biggest risk with red + black + green is Christmas associations. Three countermeasures:
1. **Shift both hues toward jewel tones** — crimson toward magenta/blood, green toward cool forest
2. **Never use red and green at equal visual weight** or adjacent at same brightness
3. **Gold as mandatory bridge** — breaks the red-green binary, adds occult luxury

### 2.2 Background Surfaces

All off-blacks carry a subtle blue-purple undertone for mystical depth. Never use pure #000000.

| Token | Hex | Tailwind Class | Role |
|-------|-----|---------------|------|
| `void` | `#0B0B0F` | `bg-void` | Page body, deepest layer |
| `obsidian` | `#131316` | `bg-obsidian` | Alternating sections, main content surface |
| `onyx` | `#1C1C22` | `bg-onyx` | Cards, panels, containers |
| `elevated` | `#26262E` | `bg-elevated` | Modals, dropdowns, popovers |
| `overlay` | `#32323C` | `bg-overlay` | Borders, dividers, tooltips |

**Section alternation**: sections on every page alternate `bg-void` ↔ `bg-obsidian` for visual rhythm and depth.

### 2.3 Crimson Family (Primary — 25%)

Shifted toward magenta/blood red (away from orange-red) to evoke wine, rubies, and ritual.

| Token | Hex | Tailwind | Contrast vs void | Role |
|-------|-----|---------|-------------------|------|
| `crimson-950` | `#2A0A0F` | `bg-crimson-950` | — | Dark background tints, subtle glows |
| `crimson-600` | `#7A1A2E` | `bg-crimson-600` | — | Primary brand red, key UI borders |
| `crimson-500` | `#B91C3C` | `bg-crimson-500` | 4.8:1 | CTA buttons, active highlights |
| `crimson-400` | `#E03E5C` | `text-crimson-400` | 6.2:1 | Hover states, links, small bright accents |

### 2.4 Emerald Family (Secondary — 5%)

Cool, dark, forest-like. Used **sparingly** — never adjacent to crimson at same brightness.

| Token | Hex | Tailwind | Contrast vs void | Role |
|-------|-----|---------|-------------------|------|
| `emerald-950` | `#0A1F14` | `bg-emerald-950` | — | Background variations, section tints |
| `emerald-600` | `#14532D` | `bg-emerald-600` | — | Section accents, category markers |
| `emerald-500` | `#1E7A4B` | `bg-emerald-500` | 4.5:1 | Secondary CTAs, success states |
| `emerald-400` | `#34D07B` | `text-emerald-400` | 8.5:1 | Small highlights, hover (sparingly!) |

### 2.5 Gold Bridge + Accent

Gold is **essential** — prevents Christmas associations and adds occult luxury.

| Token | Hex | Tailwind | Role |
|-------|-----|---------|------|
| `gold-700` | `#8B6F3A` | `text-gold-700` | Muted borders, subtle luxury accents |
| `gold-500` | `#C9A84C` | `text-gold-500` | Section heading accents, icons, dividers |
| `gold-300` | `#E8D48B` | `text-gold-300` | Highlights, hover on gold elements |

### 2.6 Amethyst (gradient overlays only)

| Token | Hex | Role |
|-------|-----|------|
| `amethyst-900` | `#2D1B4E` | Mystical gradient tints, deep overlays |

### 2.7 Text Hierarchy

Warm off-whites prevent harsh glare. Every level meets **WCAG AA minimum** on void (#0B0B0F).

| Token | Hex | Contrast vs void | Role |
|-------|-----|-------------------|------|
| `text-primary` | `#F0EBE0` | ~16.5:1 (AAA) | H1, H2, hero text |
| `text-body` | `#D4CFC4` | ~12:1 (AAA) | Paragraphs, content |
| `text-secondary` | `#A8A29E` | ~7:1 (AAA) | Captions, metadata, nav links |
| `text-muted` | `#78716C` | ~4:1 (AA large) | Timestamps, placeholders |

### 2.8 Service Category Accent Colors

Each service carries a distinct accent for icon color, hover glow, and subtle card gradient tint. The card structure stays identical — only accent color changes.

| Category | Accent Hex | Token Usage | Hover Glow |
|----------|-----------|-------------|------------|
| Таро | `#E03E5C` | `text-crimson-400` | `shadow-crimson-500/10` |
| Ритуалистика | `#C9A84C` | `text-gold-500` | `shadow-gold-500/10` |
| Сопровождение | `#F4A0B5` | Custom `text-[#F4A0B5]` | `shadow-[#F4A0B5]/10` |
| Обучение | `#34D07B` | `text-emerald-400` | `shadow-emerald-500/10` |
| Регресс | `#9F7AEA` | Custom `text-[#9F7AEA]` | `shadow-[#9F7AEA]/10` |

### 2.9 Tailwind v4 @theme Implementation

Drop this into `app/globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme inline {
  /* Backgrounds */
  --color-void: #0B0B0F;
  --color-obsidian: #131316;
  --color-onyx: #1C1C22;
  --color-elevated: #26262E;
  --color-overlay: #32323C;

  /* Crimson */
  --color-crimson-950: #2A0A0F;
  --color-crimson-600: #7A1A2E;
  --color-crimson-500: #B91C3C;
  --color-crimson-400: #E03E5C;

  /* Emerald */
  --color-emerald-950: #0A1F14;
  --color-emerald-600: #14532D;
  --color-emerald-500: #1E7A4B;
  --color-emerald-400: #34D07B;

  /* Gold */
  --color-gold-700: #8B6F3A;
  --color-gold-500: #C9A84C;
  --color-gold-300: #E8D48B;

  /* Amethyst */
  --color-amethyst-900: #2D1B4E;

  /* Text */
  --color-text-primary: #F0EBE0;
  --color-text-body: #D4CFC4;
  --color-text-secondary: #A8A29E;
  --color-text-muted: #78716C;

  /* Typography scale */
  --text-hero: clamp(2.5rem, 1.5rem + 3.5vw, 5rem);
  --text-section: clamp(2rem, 1.4rem + 2vw, 3.5rem);
  --text-card-title: clamp(1.25rem, 1.1rem + 0.5vw, 1.75rem);

  /* Fonts */
  --font-heading: var(--font-cormorant-garamond), "Georgia", serif;
  --font-body: var(--font-commissioner), "Segoe UI", sans-serif;
}
```

---

## 3. Typography

### 3.1 Font Stack

| Role | Font | Subsets | Weights | CSS Variable |
|------|------|---------|---------|-------------|
| Headings | Cormorant Garamond | cyrillic + latin | 400, 500, 600, 700 | `--font-heading` |
| Body | Commissioner | cyrillic + latin | 300, 400, 500 | `--font-body` |

Configuration in `lib/fonts.ts`:
```typescript
import { Cormorant_Garamond, Commissioner } from "next/font/google";

export const headingFont = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});

export const bodyFont = Commissioner({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-body",
});
```

⚠️ Cinzel has ZERO Cyrillic glyphs — never use.
⚠️ Inter has poor Cyrillic rendering — never use.

### 3.2 Typography Scale

| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| H1 hero | `clamp(2.5rem, 1.5rem + 3.5vw, 5rem)` | 600 | 1.1 | -0.01em | Hero headline only |
| H2 section | `clamp(2rem, 1.4rem + 2vw, 3.5rem)` | 600 | 1.2 | 0 | Section headings |
| H3 card | `clamp(1.25rem, 1.1rem + 0.5vw, 1.75rem)` | 500 | 1.3 | 0 | Card titles, sub-headings |
| Body | 1.0625rem (17px) | 400 | 1.7 | 0.02em | Paragraphs |
| Small | 0.9375rem (15px) | 400 | 1.6 | 0.02em | Captions, metadata |
| Tiny | 0.8125rem (13px) | 400 | 1.5 | 0.03em | Badges, timestamps |

### 3.3 Dark Theme Typography Adjustments

- Heading weights: **500–600 only** (NOT 700 — causes halation/glow on dark backgrounds)
- Body letter-spacing: +0.02em (compensates for dark-on-light letter crowding)
- `-webkit-font-smoothing: antialiased` is **mandatory** on body
- `-moz-osx-font-smoothing: grayscale` is **mandatory** on body

### 3.4 Heading Pattern

Every section follows this pattern:

```html
<!-- Accent label (optional) -->
<span class="text-gold-500 text-sm font-body uppercase tracking-widest">
  Направления
</span>

<!-- Main heading -->
<h2 class="font-heading text-section font-semibold text-text-primary mt-3">
  Мои услуги
</h2>

<!-- Subtitle (optional) -->
<p class="text-text-secondary text-lg mt-4 max-w-2xl">
  Description text here
</p>
```

---

## 4. Spacing and Layout

### 4.1 Section Spacing

Dark themes need **20–30% more padding** than light themes for readability.

| Element | Spacing |
|---------|---------|
| Section padding | `py-16 md:py-20 lg:py-30` |
| Section → heading gap | `mb-12 lg:mb-16` |
| Container | `max-w-7xl mx-auto px-5 sm:px-6 lg:px-8` |
| Card grid gap | `gap-4 lg:gap-6` |
| Card internal padding | `p-6 lg:p-8` |
| Between heading and content | `mt-4` (subtitle), `mt-8` (first content block) |

### 4.2 Border Radius

| Element | Radius |
|---------|--------|
| Cards, containers | `rounded-3xl` (24px) |
| Modals, popovers | `rounded-2xl` (16px) |
| Buttons (CTA) | `rounded-full` |
| Badges | `rounded-full` |
| Input fields | `rounded-xl` (12px) |
| Images | `rounded-2xl` (16px) |

### 4.3 Responsive Breakpoints

| Breakpoint | Width | Key Layout Changes |
|-----------|-------|-------------------|
| default | 0–639px | Single column, stacked hero, full-width CTAs |
| `sm` | 640px+ | 2-column grids start |
| `md` | 768px+ | 2-column service grid, side margins increase |
| `lg` | 1024px+ | Hero split (55/45), 3-column bento grid, desktop nav |
| `xl` | 1280px+ | Max-width container, full desktop experience |

---

## 5. Component Specifications

### 5.1 Hero Section (Homepage)

**Layout**: split with practitioner photo — the single most important change in this redesign.

```
DESKTOP (lg+):
┌─────────────────────────────┬────────────────────────┐
│                             │                        │
│   Accent label              │    ┌──────────────┐    │
│   H1 (blur reveal)         │    │              │    │
│   Subtitle                  │    │   PHOTO      │    │
│                             │    │   (gradient   │    │
│   [Primary CTA] [Ghost]    │    │    mask)      │    │
│                             │    │              │    │
│                             │    └──────────────┘    │
│                             │  radial glow behind    │
└─────────────────────────────┴────────────────────────┘
          55%                          45%
```

**Grid**: `grid grid-cols-1 lg:grid-cols-[55fr_45fr] items-center min-h-screen`

**Photo treatment stack** (right side):
1. `next/image` with `priority={true}`, `object-cover`, `object-center`
2. CSS gradient mask on left edge: `[mask-image:linear-gradient(to_right,transparent_0%,black_30%)]`
3. Bottom gradient fade: additional mask or pseudo-element
4. Radial glow behind: `bg-radial-[at_70%_50%] from-crimson-950/30 to-transparent` on parent
5. Subtle `mix-blend-multiply` with deep crimson to warm and unify photo with palette

**Mobile (<lg)**: stack vertically — text top, photo bottom (`max-h-[50vh]`). Mask switches to top-edge fade. Primary CTA goes full-width.

**Photo requirements**: practitioner's gaze should point toward text/CTA side. Desktop: vertical crop, WebP, < 300KB. Mobile: horizontal crop, WebP, < 150KB.

**CTAs**:
- Primary: `bg-linear-to-r from-crimson-600 to-crimson-500 text-text-primary rounded-full px-8 py-4 text-lg`
- Ghost: `border border-crimson-500/40 text-crimson-400 rounded-full px-8 py-4`

### 5.2 Services Bento Grid (Homepage)

**Layout**: asymmetric grid — creates visual hierarchy, feels premium, avoids the awkward 3+2 gap.

```
DESKTOP (lg+):
┌───────────────────────┬──────────────┐
│  🔮 ТАРО              │ 🕯️ РИТУАЛЫ   │
│  (col-span-2, tall)   │              │
├───────────┬───────────┼──────────────┤
│ 🤝 СОПР   │ 📚 ОБУЧ   │ 🌀 РЕГРЕСС  │
└───────────┴───────────┴──────────────┘

grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6
Tarot: lg:col-span-2 min-h-[320px]
Others: min-h-[280px]
```

**Card anatomy**:
```
┌─────────────────────────────┐
│  [SVG icon 40x40]           │  ← accent color per service
│                             │
│  Service Name               │  ← font-heading, text-xl, text-text-primary
│                             │
│  Short description text     │  ← text-text-secondary, text-sm, 2 lines max
│  that fits in two lines.    │
│                             │
│  Подробнее →                │  ← accent color, text-sm, hover:translate-x-1
└─────────────────────────────┘

bg-onyx border border-overlay/50 rounded-3xl p-8
hover: border-[accent]/30 shadow-lg shadow-[accent]/10 -translate-y-1 scale-[1.02]
transition: duration-500 ease-out
```

Each card gets a subtle gradient tint matching its accent color at 3-5% opacity on background.

### 5.3 About Brief (Homepage)

Numbered bio paragraphs inspired by Quantum Body:

```
┌─────────────────────────────────────────────┐
│                                             │
│  [Photo with     │  01                      │
│   gradient mask]  │  Путь в эзотерику       │
│                   │  Lorem ipsum dolor...    │
│                   │                          │
│                   │  02                      │
│                   │  Мой подход              │
│                   │  Lorem ipsum dolor...    │
│                   │                          │
│                   │  03                      │
│                   │  Миссия                  │
│                   │  Lorem ipsum dolor...    │
│                   │                          │
└─────────────────────────────────────────────┘
```

Numbers: `text-gold-500 text-6xl lg:text-8xl font-heading opacity-20` — large, decorative, semi-transparent.

### 5.4 Testimonials

Desktop: **Infinite Moving Cards** (Aceternity UI) — horizontal auto-scroll marquee.
Mobile: **Embla Carousel** — swipeable cards.

Card: `bg-onyx border border-overlay/50 rounded-2xl p-6`
Name: `text-gold-500 font-heading text-base`
Quote: `text-text-body italic text-sm leading-relaxed`
Avatar circle: `bg-crimson-950 text-crimson-400 w-10 h-10 rounded-full flex items-center justify-center font-heading`

### 5.5 CTA Section

Full-width atmospheric block before footer:
- Background: `bg-crimson-950` with `bg-radial from-crimson-600/10 to-transparent`
- Heading: `font-heading text-3xl lg:text-5xl text-text-primary text-center`
- Subtext: `text-text-secondary text-center max-w-xl mx-auto`
- Button: Primary CTA, centered
- Optional: subtle animated `crimson-glow` keyframe on outer edges

### 5.6 Navigation

**Header**: fixed, `bg-void/80 backdrop-blur-xl`, hide-on-scroll-down / show-on-scroll-up.
- Logo: left
- Nav links: center, `text-text-secondary hover:text-crimson-400`
- CTA button: right, `bg-crimson-500 text-text-primary rounded-full px-6 py-2`
- Language switcher: `text-text-muted`, active `text-gold-500`

**Mobile menu**: fullscreen overlay `bg-void`, staggered link reveals (motion fade-in + y offset, delay 0.05s per link). Close: X button.

**Mobile CTA**: consider a floating "Записаться" button at bottom of viewport (separate from hamburger menu) — reduces conversion loss from hidden navigation.

### 5.7 Footer

```
bg-void border-t border-overlay/50

┌─────────────┬─────────────┬─────────────┬─────────────┐
│  Brand      │ Навигация   │ Услуги      │ Связаться   │
│  Name +     │ Главная     │ Таро        │ TikTok      │
│  tagline    │ Блог        │ Ритуалы     │ Instagram   │
│             │ Обо мне     │ Сопровожд.  │ Telegram    │
│             │             │ Обучение    │ YouTube     │
│             │             │ Регресс     │             │
└─────────────┴─────────────┴─────────────┴─────────────┘
                   © 2026 Mori Norman
```

Link hover: `text-crimson-400`. Optional: marquee with brand name at top of footer.

### 5.8 Cards — Blog

**Blog card**:
```
┌──────────────────────────┐
│  ┌────────────────────┐  │
│  │  IMAGE              │  │  ← rounded-t-3xl, gradient overlay from-void/70
│  │  [Category badge]   │  │  ← absolute, top-4 left-4, bg-crimson-950 text-crimson-400
│  └────────────────────┘  │
│  Date · 5 min read       │  ← text-text-muted text-xs
│  Post Title              │  ← font-heading text-lg text-text-primary
│  Short excerpt text...   │  ← text-text-secondary text-sm line-clamp-2
└──────────────────────────┘

bg-onyx rounded-3xl overflow-hidden border border-overlay/50
hover: border-crimson-500/30 -translate-y-1
```

**Featured blog card**: larger, `md:col-span-2`, image on left / text on right on desktop.

### 5.9 Category Page

Hero: `bg-onyx` with subtle radial gradient using category accent color at 5-10% opacity.
Service grid: 2 columns desktop, 1 mobile.
CTA at bottom.

### 5.10 Service Detail Page

Structure: hero banner → full description (rich text) → info block (price, duration, format) → FAQ accordion → CTA.

FAQ accordion: `border-b border-overlay`, trigger text `text-text-primary hover:text-crimson-400`, content `text-text-body`.

### 5.11 About Page

Structure: hero (photo + name + mission quote) → numbered bio sections (01–04) with ScrollReveal → timeline → CTA.

Timeline line: `bg-crimson-500/30`. Dots: `bg-crimson-500`. Cards: `bg-onyx`.

---

## 6. Animation System

### 6.1 Core Principles

- **Slow, ethereal, emergent** — not snappy corporate
- Spring physics: `stiffness: 100-200`, `damping: 15-25`
- Default easing: `[0.17, 0.55, 0.55, 1]` (custom ease-out)
- Default duration: `0.6-0.8s` for reveals, `0.3-0.5s` for hovers
- Max **3 animated components** simultaneously visible on screen
- ALL animations must respect `prefers-reduced-motion`
- Import from `motion/react` (NOT `framer-motion`)
- Use `LazyMotion` with `domAnimation` features for bundle size

### 6.2 ScrollReveal (existing — update colors)

Foundation layer. Every section and card fades into view on scroll.

```tsx
<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
>
```

Directions: `up` (y: 40→0), `left` (x: -30→0), `right` (x: 30→0), `fade` (opacity only).

### 6.3 StaggerReveal (existing — update timing)

Container + item pattern for service cards, blog grids, and lists.

```tsx
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.17, 0.55, 0.55, 1] },
  },
};
```

### 6.4 TextReveal (NEW — create)

Three tiers, each for different contexts:

**Blur-to-sharp** (hero headline — "emerging from fog"):
```tsx
const charVariants = {
  hidden: { filter: "blur(10px)", opacity: 0, y: "20%" },
  visible: { filter: "blur(0px)", opacity: 1, y: "0%" },
};
// Stagger: 0.03s per character
```

**Word-by-word fade-up** (section headings):
```tsx
// Split heading into motion.span per word
// Stagger: 0.12s, spring: { damping: 12, stiffness: 100 }
```

**Line-by-line mask reveal** (about/philosophy — most premium):
```tsx
// Each line in overflow:hidden container
// Text translates from y:"100%" to y:"0%"
// Stagger: 0.075s per line
```

### 6.5 MagneticButton (NEW — create)

Desktop only (skip on `pointer: coarse`). CTA buttons subtly drift toward cursor on approach.

```tsx
const handleMouse = (e: React.MouseEvent) => {
  const { clientX, clientY } = e;
  const { height, width, left, top } = ref.current.getBoundingClientRect();
  const middleX = clientX - (left + width / 2);
  const middleY = clientY - (top + height / 2);
  x.set(middleX * 0.3);
  y.set(middleY * 0.3);
};
// x, y: useSpring(useMotionValue(0), { stiffness: 300, damping: 28 })
```

### 6.6 SectionDivider (NEW — create)

SVG sacred geometry (star ✦, triple moon ☽○☾, or alchemical symbol) placed between sections. Subtle animation on scroll:

```tsx
<motion.svg
  whileInView={{ rotate: 360, opacity: [0.3, 0.6, 0.3] }}
  transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                opacity: { duration: 3, repeat: Infinity } }}
  viewport={{ once: false }}
>
```

Alternative: gradient line divider `bg-linear-to-r from-transparent via-crimson-600/30 to-transparent h-px`.

### 6.7 SVG Path Drawing (decorative)

For sacred geometry elements, moon phase illustrations, or signature:

```tsx
<motion.path
  d="..."
  initial={{ pathLength: 0 }}
  whileInView={{ pathLength: 1 }}
  transition={{ duration: 2, ease: "easeInOut" }}
  stroke="var(--color-gold-500)"
  strokeWidth={1}
  fill="none"
/>
```

### 6.8 Parallax (existing — keep)

Background decorative elements (symbols, stars) at different scroll speeds.
```tsx
// useScroll + useTransform
// Speed multiplier: 0.2–0.5 for subtle, 0.8–1.2 for dramatic
```

### 6.9 Hover Effects

**Cards**:
```tsx
whileHover={{ y: -4, scale: 1.02 }}
transition={{ type: "spring", stiffness: 300, damping: 20 }}
// Plus CSS: hover:shadow-lg hover:shadow-crimson-500/10 hover:border-crimson-500/30
```

**Buttons**:
```tsx
whileHover={{ scale: 1.03 }}
whileTap={{ scale: 0.97 }}
```

**Links**: CSS only — `transition-colors duration-300`.

### 6.10 Page Load Sequence (hero)

Coordinated reveal on homepage load:

| Step | Element | Delay | Animation |
|------|---------|-------|-----------|
| 1 | Background glow | 0s | Fade in (opacity 0→1) |
| 2 | Photo | 0.2s | Fade + scale 1.05→1 |
| 3 | H1 headline | 0.3s | Blur-to-sharp character reveal |
| 4 | Subtitle | 0.6s | Fade up |
| 5 | CTA buttons | 0.8s | Fade up with stagger |
| 6 | Scroll indicator | 1.2s | Fade in + bounce |

### 6.11 Preloader (optional — iteration 9.11)

Sacred geometry SVG draws itself via `motion.path` (pathLength 0→1, 2s duration). Then `AnimatePresence` exit dissolves into main content. Show once per session (sessionStorage flag). Background: `bg-void`. Symbol color: `gold-500`.

### 6.12 Custom Cursor (optional — iteration 9.11)

Desktop only (`pointer: fine`). Small dot (8px, `bg-crimson-400`) + trailing circle (32px, `border border-crimson-400/50`) with spring lag. `mix-blend-mode: difference` for otherworldly effect. Hide on mobile.

### 6.13 Smooth Scroll

**Lenis** wraps root layout via `<ReactLenis root>` from `lenis/react`. Lenis handles scroll physics, Motion's `useScroll` tracks position for animation triggers. They complement each other.

---

## 7. CSS Effects (globals.css)

### 7.1 Keyframes

```css
@keyframes crimson-glow {
  0%, 100% { box-shadow: 0 0 20px -5px rgba(185, 28, 60, 0.2); }
  50%      { box-shadow: 0 0 40px -5px rgba(185, 28, 60, 0.4); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-10px); }
}

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes slow-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

### 7.2 Utility Classes

| Class | Description |
|-------|-------------|
| `.crimson-shimmer` | Animated crimson→gold gradient text (`background-clip: text`, shimmer) |
| `.gold-glow` | Pulsing gold `text-shadow` |
| `.noise-overlay` | SVG noise texture, `opacity: 0.03`, `pointer-events: none` |
| `.gradient-border` | Rotating gradient border via CSS `@property` |
| `.prose-alchemy` | Rich text styling for dark theme (links crimson, quotes gold border) |

### 7.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .crimson-shimmer { background: none; color: var(--color-crimson-400); }
  .noise-overlay { display: none; }
}
```

### 7.4 View Transitions

```css
::view-transition-old(root) { animation: vt-fade-out 200ms ease-in; }
::view-transition-new(root) { animation: vt-fade-in 300ms ease-out; }
```

---

## 8. Performance Guidelines

### 8.1 Animation Performance

- **Only animate `transform` and `opacity`** — GPU compositor thread
- Never animate `width`, `height`, `top`, `left`, `margin`
- Use `useMotionValue` instead of `useState` for animated values (prevents React re-renders)
- `will-change: transform` only on actively animating elements
- Max 3 animated components simultaneously in viewport

### 8.2 Image Optimization

- All images via `next/image` with `formats: ["image/avif", "image/webp"]`
- Hero photo: `priority={true}`, desktop < 300KB WebP, mobile < 150KB WebP
- Blog images: lazy loaded (default), `sizes` attribute for responsive
- Every extra 100KB in hero media increases bounce rate by ~1.8%

### 8.3 Bundle

- Motion: use `LazyMotion` + `domAnimation` (NOT `domMax`)
- Aceternity components: copy-paste only needed ones (not full library)
- Dynamic imports for animation-heavy below-fold components
- Target LCP < 2.5s

### 8.4 Mobile Optimizations

- Implement `useIsMobile()` hook to simplify animations on mobile
- Shorter durations on mobile (0.2s instead of 0.3s for hovers)
- Disable: magnetic cursor, custom cursor, complex parallax
- Simplify: text reveals → simple fade, reduce stagger count
- Touch: `active:scale-[0.97]` instead of hover effects

---

## 9. Color Migration Reference

When updating existing components from old Cosmic Night palette:

| Old Token | Old Hex | → New Token | New Hex |
|-----------|---------|-------------|---------|
| `cosmic-bg` | `#0A0A0F` | `void` | `#0B0B0F` |
| `cosmic-card` | `#0D1137` | `obsidian` | `#131316` |
| `surface-1` | `#0E0E14` | `obsidian` | `#131316` |
| `surface-2` | `#121218` | `onyx` | `#1C1C22` |
| `surface-3` | `#16161E` | `elevated` | `#26262E` |
| `surface-4` | `#1A1A24` | `overlay` | `#32323C` |
| `cosmic-purple` | `#2D1B69` | `crimson-950` | `#2A0A0F` |
| `cosmic-violet` | `#7C3AED` | `crimson-500` | `#B91C3C` |
| `cosmic-gold` | `#D4AF37` | `gold-500` | `#C9A84C` |
| `cosmic-gold-light` | `#F5E6A3` | `gold-300` | `#E8D48B` |
| `cosmic-gold-dark` | `#B8860B` | `gold-700` | `#8B6F3A` |
| `cosmic-white` / `star-white` | `#F0EAD6` | `text-primary` | `#F0EBE0` |
| `silver-mist` | `#C0C0D0` | `text-secondary` | `#A8A29E` |

**Context-dependent mappings** (choose based on usage):
- `cosmic-violet` for interactive elements → `crimson-500`
- `cosmic-violet` for hover states → `crimson-400`
- `cosmic-purple` for dark gradients → `amethyst-900`
- `cosmic-purple` for subtle backgrounds → `crimson-950`

---

## 10. Homepage Section Order

```
1. Preloader (optional, 2-3s, first visit only)
2. Hero — split layout with practitioner photo
3. Section Divider (sacred symbol SVG)
4. Services — bento grid (5 cards, asymmetric)
5. Section Divider
6. About Brief — photo + numbered bio (01, 02, 03)
7. Section Divider
8. Testimonials — marquee (desktop) / carousel (mobile)
9. Latest Blog Posts — featured + grid
10. CTA Section — atmospheric crimson
11. Footer
```

Section backgrounds alternate: `void` → `obsidian` → `void` → `obsidian` → `void` → `crimson-950` (CTA) → `void` (footer).
