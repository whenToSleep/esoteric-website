# Mori Norman — Esoteric Personal Website (v2: Crimson Alchemy)

## Brand
- Name: Mori Norman
- Logo: image in public/images/ (placeholder until replaced)
- Contact: Telegram (personal account) — link in env or CMS settings
- Social: TikTok, Instagram, Telegram channel, YouTube
- All CTA buttons → Telegram link
- All content: placeholders, will be replaced via admin panel
- Tone: mystical, warm, alive — NOT corporate, NOT sterile

## Stack
- Next.js 15 (App Router) + TypeScript
- Payload CMS 3.0 (embedded in Next.js)
- PostgreSQL via @payloadcms/db-postgres
- next-intl v4 for i18n (RU/EN/UK)
- Tailwind CSS v4 + shadcn/ui + Aceternity UI
- Motion (framer-motion v12+, import from `motion/react`)
- Embla Carousel (mobile testimonials)
- next-view-transitions (page transitions)
- Lenis (smooth scroll)
- Lucide React (icons)

## Design: Crimson Alchemy
→ Full spec in **docs/design.md** (READ EVERY SESSION!)

### Design Philosophy
Redesigned from "Cosmic Night" (purple/gold) to "Crimson Alchemy" (crimson/obsidian/emerald).
The site must feel like a **ritual space rendered in code**: slow, ethereal, emergent.
Words materialize like spells, elements fade from darkness, subtle movements reward attention.
NEVER snappy corporate springs. Use gentle physics: stiffness 100–200, damping 15–25.

### Color System — Crimson Alchemy

**Palette rule: 60/30/10** → 60% black, 25% crimson, 5% emerald, 5% gold, 5% warm text.

```
BACKGROUNDS (60% foundation)
--color-void:       #0B0B0F   (body, deepest layer)
--color-obsidian:   #131316   (main content surface, alternating sections)
--color-onyx:       #1C1C22   (cards, panels, containers)
--color-elevated:   #26262E   (modals, dropdowns, popovers)
--color-overlay:    #32323C   (borders, dividers, tooltips)

CRIMSON (25% primary accent)
--color-crimson-950: #2A0A0F  (dark bg tints, subtle glows)
--color-crimson-600: #7A1A2E  (primary brand red, key borders)
--color-crimson-500: #B91C3C  (CTA buttons, active highlights)
--color-crimson-400: #E03E5C  (hover states, small bright accents)

EMERALD (5% secondary accent)
--color-emerald-950: #0A1F14  (background variations, section tints)
--color-emerald-600: #14532D  (section accents, category markers)
--color-emerald-500: #1E7A4B  (secondary CTAs, success states)
--color-emerald-400: #34D07B  (sparingly — small highlights, hover)

GOLD (5% bridge color — breaks the red/green binary)
--color-gold-700:    #8B6F3A  (muted borders, subtle luxury)
--color-gold-500:    #C9A84C  (headings, icons, dividers, key accents)
--color-gold-300:    #E8D48B  (highlights, hover on gold elements)

AMETHYST (gradient overlays only)
--color-amethyst-900: #2D1B4E (mystical gradient tints)

TEXT HIERARCHY (all WCAG AA+ on void)
--color-text-primary:   #F0EBE0  (~16.5:1 — H1, H2, hero)
--color-text-body:      #D4CFC4  (~12:1   — paragraphs)
--color-text-secondary: #A8A29E  (~7:1    — captions, metadata)
--color-text-muted:     #78716C  (~4:1    — timestamps, placeholders)
```

⚠️ **CRITICAL COLOR RULES:**
- Crimson and emerald NEVER adjacent at same brightness. Always separate with black, gold, or neutral.
- Colored text (crimson-400, emerald-400) ONLY for large headings — never body copy.
- Gold is ESSENTIAL as bridge — it prevents Christmas associations.
- No pure #000000 — always use void (#0B0B0F) or darker offsets.
- Sections alternate: `bg-void` ↔ `bg-obsidian`.

### Шрифты
```
Headings: Cormorant Garamond (cyrillic + latin) — var(--font-heading)
Body:     Commissioner (cyrillic + latin) — var(--font-body)
```
⚠️ Cinzel НЕ поддерживает кириллицу — заменён на Cormorant Garamond.
⚠️ Inter имеет плохую кириллицу — заменён на Commissioner.

### Typography scale
```
H1 hero:  clamp(2.5rem, 1.5rem + 3.5vw, 5rem), weight 600, lh 1.1
H2:       clamp(2rem, 1.4rem + 2vw, 3.5rem), weight 600, lh 1.2
H3:       clamp(1.25rem, 1.1rem + 0.5vw, 1.75rem), weight 500, lh 1.3
Body:     1.0625rem (17px), weight 400, lh 1.7, letter-spacing 0.02em
Small:    0.9375rem (15px), weight 400, lh 1.6
```

### Service Accent Colors
Each service category has a distinct accent for icon color, hover glow, and subtle card tint:
```
Таро:          crimson   (crimson-400 icon, crimson glow)
Ритуалистика:  gold      (gold-500 icon, gold glow)
Сопровождение: rose      (#F4A0B5 icon, rose glow)
Обучение:      emerald   (emerald-400 icon, emerald glow)
Регресс:       amethyst  (#9F7AEA icon, amethyst glow)
```

### Component Styling Quick Reference
```
BUTTONS:
  Primary CTA: bg-linear-to-r from-crimson-600 to-crimson-500 text-text-primary rounded-full px-8 py-4
  Ghost CTA:   border border-crimson-500/40 text-crimson-400 rounded-full px-8 py-4
  Hover:       Primary → brightness-110, Ghost → bg-crimson-500/10
  Tap:         active:scale-[0.98]

CARDS:
  Base:     bg-onyx border border-overlay/50 rounded-3xl p-8
  Hover:    border-crimson-500/30 shadow-lg shadow-crimson-500/10 -translate-y-1 scale-[1.02]
  Transition: duration-500 ease-out

LINKS:
  Default:  text-crimson-400
  Hover:    text-crimson-300

BADGES:
  Default:  bg-crimson-950 text-crimson-400 rounded-full px-3 py-1 text-xs

SECTION HEADINGS:
  Accent:   text-gold-500 (for label above heading)
  Main:     text-text-primary font-heading

DIVIDERS:
  Gradient line: bg-linear-to-r from-transparent via-crimson-600/30 to-transparent h-px
  Sacred symbol: SVG ✦ or ☽○☾ with subtle rotate/pulse on scroll
```

### Hero Section (homepage)
Split layout with practitioner photo — the most important section.
```
DESKTOP (lg+):
  Grid: grid-cols-[55fr_45fr], min-h-screen, items-center
  Left (55%):  H1 + subtitle + 2 CTA buttons
  Right (45%): Practitioner photo with:
    - CSS mask-image: linear-gradient(to right, transparent 0%, black 30%) on left edge
    - Bottom gradient fade to void
    - Radial gradient glow behind photo (crimson-950/30) — "aura" effect
    - object-cover, object-center
    - next/image with priority={true}

MOBILE (<lg):
  Stack: text top → photo bottom (max-h-[50vh])
  Mask: top edge instead of left
  CTA: full width

ATMOSPHERE:
  Radial gradient (crimson-950/20) behind text block
  Optional: subtle noise overlay

ANIMATION:
  H1: blur-to-sharp reveal (blur 10px→0, opacity 0→1, y 20%→0)
  Subtitle: fade-up delay 0.3s
  CTAs: fade-up delay 0.5s
  Photo: fade-in delay 0.2s, scale 1.05→1
```

### Services — Bento Grid (homepage)
```
DESKTOP LAYOUT:
┌─────────────────────┬──────────────┐
│  🔮 ТАРО            │ 🕯️ РИТУАЛЫ   │
│  (lg:col-span-2)    │              │
├──────────┬──────────┼──────────────┤
│ 🤝 СОПР  │ 📚 ОБУЧ  │ 🌀 РЕГРЕСС  │
└──────────┴──────────┴──────────────┘

Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6
Таро: lg:col-span-2 min-h-[320px]
Others: min-h-[280px]
Animation: StaggerReveal (staggerChildren: 0.1)
```

### Aceternity UI — allowed components
✅ Infinite Moving Cards (testimonials), Meteor Effect, Spotlight, Tracing Beam
⚠️ 3D Card, Text Generate (max 1 on screen)
❌ Aurora Background, Background Beams, Sparkles, Wavy Background, Glowing Stars — DO NOT USE (replaced by new hero)

### Animation Components
```
EXISTING (update colors):
  ScrollReveal    — scroll-triggered entrance (up/left/right/fade)
  StaggerReveal   — container + item stagger pattern
  ParallaxLayer   — scroll-based vertical translation

NEW (create):
  TextReveal      — blur/words/lines reveal variants
  MagneticButton  — cursor-attracted button (desktop only)
  SectionDivider  — SVG sacred geometry with scroll animation
  Preloader       — branded loading animation (SVG path draw)
```

## Data Schema
→ Full spec in docs/api.md
Collections: ServiceCategories, Services, Posts, PostCategories,
Media, Pages, Testimonials
All text fields: localized: true, fallback: uk>ru>en

## Architecture
```
/app/[locale]/          — public pages
/app/(payload)/         — CMS admin at /admin
/collections/           — Payload collections config
/messages/              — i18n JSON (ru.json, en.json, uk.json)
/components/            — UI components
/components/ui/         — shadcn/ui + Aceternity components
/components/home/       — Home page sections
  hero-section.tsx        — ⚡ Split layout with practitioner photo
  service-categories-section.tsx — ⚡ Bento grid
  service-category-card.tsx      — ⚡ Card with accent colors
  about-brief-section.tsx        — ⚡ Numbered bio (01, 02, 03)
  latest-posts-section.tsx       — ⚡ Featured + grid
  testimonials-section.tsx       — Infinite Moving Cards / Embla
  cta-section.tsx                — ⚡ Crimson atmospheric CTA
/components/layout/     — Header, Footer, Navigation, Mobile Menu
/components/animations/ — ScrollReveal, StaggerReveal, ParallaxLayer, TextReveal, MagneticButton
/components/about/      — ⚡ Numbered bio sections + text reveals
/components/category/   — Category hero + service cards
/components/service/    — Service detail + FAQ
/components/blog/       — Featured card, pagination, filter, navigation
/lib/fonts.ts           — Cormorant Garamond + Commissioner
/lib/motion-features.ts — LazyMotion features (domAnimation)
/lib/utils.ts           — cn() — clsx + tailwind-merge
/lib/navigation.ts      — Nav items config
/lib/json-ld.ts         — JSON-LD schema generators
/app/providers.tsx      — MotionProviders (LazyMotion + MotionConfig) + Lenis
/public/images/         — Logo, hero-photo.webp, hero-photo-mobile.webp
```
(⚡ = redesigned in v2)

## Conventions
- Server Components by default, 'use client' only when needed
- Commit after each logical step
- prefers-reduced-motion for ALL animations (MotionConfig reducedMotion="user")
- All pages: hreflang + JSON-LD
- All CTA → Telegram (placeholder)
- UI texts → next-intl (messages/*.json)
- Use `@/` import alias for all project imports
- Use `font-body` for body text (Commissioner), `font-heading` for headings (Cormorant Garamond)
- Always use `setRequestLocale(locale)` in server components within `[locale]/`
- shadcn/ui components → `components/ui/`
- Aceternity UI components → `components/ui/aceternity/` (copy-paste, not npm)
- Animation components → `components/animations/`
- Payload admin at `/admin`, API at `/api`
- Env vars: DATABASE_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL
- Heading weights: 500–600 (NOT 700 — halation on dark bg)
- Body: 17px, line-height 1.7, letter-spacing 0.02em
- Card border-radius: rounded-3xl (24px for cards), buttons: rounded-full
- Hover: crimson glow + lift (desktop), active:scale-[0.98] (mobile)
- Max 3 animated components simultaneously visible on screen
- Tailwind v4: `bg-linear-to-r` (not bg-gradient-to-r), any spacing integer works
- Section spacing: py-16 md:py-20 lg:py-30
- Sections alternate bg: void ↔ obsidian
- Animation timing: slow and ethereal — duration 0.6-0.8s, ease [0.17, 0.55, 0.55, 1]
- Stagger: 0.08-0.12s between children
- Spring physics: stiffness 100-200, damping 15-25 (NOT snappy corporate 300+)

## Color Migration Map (old → new)
When updating existing components, use this reference:
```
cosmic-bg      → void
cosmic-card    → obsidian (or onyx for cards)
surface-1      → obsidian
surface-2      → onyx
surface-3      → elevated
surface-4      → overlay
cosmic-purple  → crimson-950 (dark bg) or amethyst-900 (gradients)
cosmic-violet  → crimson-500 (interactive) or crimson-400 (hover)
cosmic-gold    → gold-500
cosmic-gold-light → gold-300
cosmic-gold-dark  → gold-700
cosmic-white   → text-primary
star-white     → text-primary
silver-mist    → text-secondary
```

## Docs (READ at session start!)
- docs/log.md     — session log (update EVERY session!)
- docs/design.md  — design spec (⚡ Crimson Alchemy system)
- docs/api.md     — data schema + API examples

## Rules
- After adding/removing any plugin in payload.config.ts:
  npx payload generate:importmap
  Commit the updated importMap.js
- Update EVERY session docs/log.md
- Clear .next cache if phantom bugs appear: rm -rf .next
- Always verify npm run build passes before committing
- Hero photo MUST be in public/images/ — the hero won't work without it

## Commands
- `npm run dev` — localhost:3000
- `npm run build` — must pass!
- `npm run lint` — ESLint
- `npm run seed` — fill test data
- `npm run analyze` — bundle analysis (opens browser)

## Current Status
- [x] Iteration 0: Project init
- [x] Iteration 1: Data schema & CMS
- [x] Iteration 2: Layout & navigation
- [x] Iteration 3: Home page
- [x] Iteration 4: Section & service pages
- [x] Iteration 5: Blog
- [x] Iteration 5.1: Blog improvements & seed expansion
- [x] Iteration 6: SEO & performance
- [x] Iteration 7: Polish & deploy
- [x] Iteration 8: Design upgrade (Cosmic Night audit) — SUPERSEDED by v2 redesign
- [ ] **Iteration 9: Crimson Alchemy Redesign**
  - [ ] 9.1  Color palette: replace @theme with Crimson Alchemy system
  - [ ] 9.2  Component migration: find-replace all old color tokens
  - [ ] 9.3  Hero: split layout with practitioner photo + gradient mask + blur text reveal
  - [ ] 9.4  Services: bento grid with accent colors per category
  - [ ] 9.5  Header + Footer + Mobile Menu: new palette + structure
  - [ ] 9.6  Home sections: About Brief (numbered bio) + Blog Preview + Testimonials + CTA
  - [ ] 9.7  Category + Service pages: new palette + hero atmospheric glow
  - [ ] 9.8  Blog: list + article pages — new palette + gradient overlays
  - [ ] 9.9  About page: numbered bio sections + line-by-line text reveal
  - [ ] 9.10 Advanced animations: TextReveal + MagneticButton + SectionDividers + Lenis
  - [ ] 9.11 Polish: Preloader + custom cursor + noise overlay + final checks
  - [ ] 9.12 Seed update + full QA across all pages/locales/viewports
