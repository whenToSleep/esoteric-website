# Mori Norman — Esoteric Personal Website

## Brand
- Name: Mori Norman
- Logo: image in public/images/ (placeholder until replaced)
- Contact: Telegram (personal account) — link in env or CMS settings
- Social: TikTok, Instagram, Telegram channel, YouTube
- All CTA buttons → Telegram link
- All content: placeholders, will be replaced via admin panel

## Stack
- Next.js 15 (App Router) + TypeScript
- Payload CMS 3.0 (embedded in Next.js)
- PostgreSQL via @payloadcms/db-postgres
- next-intl v4 for i18n (RU/EN/UK)
- Tailwind CSS v4 + shadcn/ui + Aceternity UI
- Motion (framer-motion v12+, import from `motion/react`)
- Embla Carousel (mobile testimonials)
- next-view-transitions (page transitions)

## Design: Cosmic Night Theme
→ Full spec in **docs/design.md** (ОБНОВЛЁН — читай КАЖДУЮ сессию!)

### Цвета (CSS variables из @theme в globals.css)
```
--color-cosmic-bg:      #0A0A0F   (body background)
--color-cosmic-card:    #0D1137   (cards, nav)
--color-cosmic-purple:  #2D1B69   (secondary bg, gradients)
--color-cosmic-violet:  #7C3AED   (interactive, hover, links)
--color-cosmic-gold:    #D4AF37   (CTA, accents, section headings)
--color-cosmic-white:   #F0EAD6   (primary text)
--color-cosmic-silver:  #C0C0D0   (secondary text)
--color-surface-1:      #0E0E14   (alternating sections, footer)
--color-surface-2:      #121218   (card surfaces)
--color-surface-3:      #16161E   (elevated cards, modals)
--color-surface-4:      #1A1A24   (active/hover states)
--color-cosmic-gold-light: #F5E6A3 (shimmer gradient)
--color-cosmic-gold-dark:  #B8860B (shimmer gradient)
```

### Шрифты
```
Headings: Cormorant Garamond (cyrillic + latin) — var(--font-heading)
Body:     Commissioner (cyrillic + latin) — var(--font-body)
```
⚠️ Cinzel НЕ поддерживает кириллицу — заменён на Cormorant Garamond.
⚠️ Inter имеет плохую кириллицу — заменён на Commissioner.

### Typography scale (dark theme adjusted)
```
H1 hero:  clamp(2.5rem, 1.5rem + 3.5vw, 5rem), weight 600, lh 1.1
H2:       clamp(2rem, 1.4rem + 2vw, 3.5rem), weight 600, lh 1.2
H3:       clamp(1.25rem, 1.1rem + 0.5vw, 1.75rem), weight 500, lh 1.3
Body:     1.0625rem (17px), weight 400, lh 1.7, letter-spacing 0.02em
Small:    0.9375rem (15px), weight 400, lh 1.6
```

### Aceternity UI — разрешённые компоненты
✅ Aurora Background, Meteor Effect, Spotlight, Tracing Beam, Infinite Moving Cards
⚠️ Lamp Effect, 3D Card, Text Generate, Typewriter Smooth (max 1 on screen)
❌ Background Beams, Sparkles, Wavy Background, Glowing Stars — НЕ ИСПОЛЬЗОВАТЬ

## Data Schema
→ Full spec in docs/api.md
Collections: ServiceCategories, Services, Posts, PostCategories,
Media, Pages, Testimonials
All text fields: localized: true, fallback: uk>ru>en

## Architecture
```
/app/[locale]/        — public pages
/app/(payload)/       — CMS admin at /admin
/collections/         — Payload collections config
/messages/            — i18n JSON (ru.json, en.json, uk.json)
/components/          — UI components
/components/ui/       — shadcn/ui + Aceternity components
/components/home/     — Home page sections
/components/layout/   — Header, Footer, Navigation
/components/animations/ — ScrollReveal, StaggerReveal, GlowCard, ParallaxLayer
/lib/fonts.ts         — Font configuration (Cormorant Garamond + Commissioner)
/lib/motion-features.ts — LazyMotion features (domAnimation)
/app/providers.tsx     — MotionProviders (LazyMotion + MotionConfig)
```

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
- shadcn/ui components go in `components/ui/`
- Aceternity UI components go in `components/ui/` (copy-paste, not npm)
- Animation components go in `components/animations/`
- Payload admin at `/admin`, API at `/api`
- Env vars: DATABASE_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL
- Heading weights: 500–600 (NOT 700 — halation on dark bg)
- Body: 17px, line-height 1.7, letter-spacing 0.02em
- Card border-radius: 16px (rounded-2xl), buttons: rounded-full
- Hover: violet glow + lift (desktop), active:scale-[0.98] (mobile)
- Max 3 animated components simultaneously visible on screen
- Tailwind v4: `bg-linear-to-r` (not bg-gradient-to-r), any spacing integer works
- Section spacing: py-16 md:py-20 lg:py-30 (20–30% more than light theme)
- Sections alternate bg: cosmic-bg ↔ surface-1

## Docs (READ at session start!)
- docs/log.md     — session log (update EVERY session!)
- docs/design.md  — design spec (⚡ UPDATED with design audit results)
- docs/api.md     — data schema + API examples

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
- [ ] **Iteration 8: Design upgrade (Cosmic Night audit)**
  - [ ] 8.1 Fonts: Cinzel→Cormorant Garamond, Inter→Commissioner + typography scale + antialiased
  - [ ] 8.2 Colors: elevation surfaces (surface-1..4) + @theme update + section bg alternation
  - [ ] 8.3 Spacing: increase all section padding 20–30% for dark theme
  - [ ] 8.4 Hero: Aurora Background + Spotlight + CSS starfield + gradient orbs + CTA rounded-full
  - [ ] 8.5 Service cards: grid 6-col 3+2 + violet hover glow + lift
  - [ ] 8.6 Testimonials: Infinite Moving Cards (desktop) + Embla Carousel (mobile)
  - [ ] 8.7 Blog cards: gradient overlay + About Me bg-surface-1
  - [ ] 8.8 Section dividers: GradientDivider + CelestialDivider + Footer update
  - [ ] 8.9 Animations: ScrollReveal + StaggerReveal components
  - [ ] 8.10 Gold shimmer/glow on hero heading
  - [ ] 8.11 Mobile nav: fullscreen overlay with clipPath circle reveal
  - [ ] 8.12 Polish: Meteor Effect on service cards + noise overlay on hero
  - [ ] 8.13 Polish: Tracing Beam (about) + ParallaxLayer (hero stars)
  - [ ] 8.14 Performance: LazyMotion + MotionConfig + reduced-motion global
  - [ ] 8.15 Polish: Typewriter CTA + animated gradient border
  - [ ] 8.16 Polish: Page transitions (next-view-transitions)
