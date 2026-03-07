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
- Framer Motion for animations

## Design
→ Full spec in docs/design.md
Key: cosmic-black #0A0A0F, midnight-navy #0D1137,
celestial-gold #D4AF37, star-white #F0EAD6
Fonts: Cinzel (headings) + Inter (body), subsets: latin, cyrillic

## Data Schema
→ Full spec in docs/api.md
Collections: ServiceCategories, Services, Posts, PostCategories,
Media, Pages, Testimonials
All text fields: localized: true, fallback: uk>ru>en

## Architecture
/app/[locale]/    — public pages
/app/(payload)/   — CMS admin at /admin
/collections/     — Payload collections config
/messages/        — i18n JSON (ru.json, en.json, uk.json)
/components/      — UI components

## Conventions
- Server Components by default, 'use client' only when needed
- Commit after each logical step
- prefers-reduced-motion for heavy animations
- All pages: hreflang + JSON-LD
- All CTA → Telegram (placeholder)
- UI texts → next-intl (messages/*.json)
- Use `@/` import alias for all project imports
- Use `font-sans` for body text (Inter), `font-heading` for headings (Cinzel)
- Always use `setRequestLocale(locale)` in server components within `[locale]/`
- shadcn/ui components go in `components/ui/`
- Payload admin at `/admin`, API at `/api`
- Env vars: DATABASE_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL

## Docs (READ at session start!)
- docs/log.md     — session log (update EVERY session!)
- docs/design.md  — design spec
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
- [x] Iteration 7: Polish & deploy (admin panel fixed, slug sanitizer, cascade delete hooks, about page layout fix)
