# Esoteric Personal Website

## Stack
- Next.js 15 (App Router) + TypeScript
- Payload CMS 3.0 (embedded in Next.js)
- PostgreSQL via @payloadcms/db-postgres
- next-intl v4 for i18n (RU/EN/UK)
- Tailwind CSS v4 + shadcn/ui + Aceternity UI
- Framer Motion for animations

## Design: Cosmic Night Theme
CSS Variables (HSL for shadcn/ui):
--cosmic-black: #0A0A0F (body background)
--midnight-navy: #0D1137 (cards, sections)
--mystic-purple: #2D1B69 (secondary bg)
--astral-violet: #7C3AED (interactive)
--celestial-gold: #D4AF37 (CTA, accents)
--star-white: #F0EAD6 (primary text)
--silver-mist: #C0C0D0 (secondary text)

Fonts: Cinzel (headings), Inter (body) via next/font
Subsets: latin, cyrillic

## Architecture
/app/[locale]/    — public pages
/app/(payload)/   — CMS admin at /admin
/payload/         — collections config
/messages/        — i18n JSON (ru.json, en.json, uk.json)
/components/      — UI components

## Collections
ServiceCategories: Таро, Ритуалистика, Сопровождение, Обучение, Регресс
Services: individual services per category
Posts: blog with Lexical rich text
PostCategories, Media, Pages, Testimonials
All text fields: localized: true, fallback: uk>ru>en

## Conventions
- Server Components by default, 'use client' only when needed
- Commit after each logical step
- ISR for blog list, SSG + on-demand revalidation for posts
- prefers-reduced-motion for heavy animations
- All pages need hreflang tags and JSON-LD
- Use `@/` import alias for all project imports
- Use `font-sans` for body text (Inter), `font-heading` for headings (Cinzel)
- Always use `setRequestLocale(locale)` in server components within `[locale]/`
- shadcn/ui components go in `components/ui/`
- Payload admin at `/admin`, API at `/api`
- Env vars: DATABASE_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL

## Commands
- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint

## Docs
- docs/log.md     — session log (update every session!)
- docs/design.md  — design spec (colors, fonts, components)
- docs/api.md     — data schema (all collections and fields)

## Current Status
- [x] Iteration 0: Project init
- [ ] Iteration 1: Data schema & CMS
- [ ] Iteration 2: Layout & navigation
- [ ] Iteration 3: Home page
- [ ] Iteration 4: Section & service pages
- [ ] Iteration 5: Blog
- [ ] Iteration 6: SEO & performance
- [ ] Iteration 7: Polish & deploy
