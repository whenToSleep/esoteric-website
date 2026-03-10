# Project Documentation — Next.js 15 + Payload CMS 3 + next-intl

> Reusable reference for building multilingual websites with embedded CMS, dark theme design system, and scroll animations.

---

## Table of Contents

1. [Stack Overview](#1-stack-overview)
2. [Project Structure](#2-project-structure)
3. [Environment Variables](#3-environment-variables)
4. [Configuration Files](#4-configuration-files)
5. [Design System](#5-design-system)
6. [Payload CMS — Data Model](#6-payload-cms--data-model)
7. [Internationalization (i18n)](#7-internationalization-i18n)
8. [Routing & Pages](#8-routing--pages)
9. [Components Architecture](#9-components-architecture)
10. [Data Fetching Patterns](#10-data-fetching-patterns)
11. [Animation System](#11-animation-system)
12. [SEO](#12-seo)
13. [Scripts & Commands](#13-scripts--commands)
14. [Conventions & Patterns](#14-conventions--patterns)

---

## 1. Stack Overview

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.4 |
| UI Library | React | 19.x |
| Language | TypeScript | 5.x |
| CMS | Payload CMS (embedded in Next.js) | 3.79+ |
| Database | PostgreSQL (via @payloadcms/db-postgres) | — |
| Styling | Tailwind CSS v4 + PostCSS | 4.x |
| Component Library | shadcn/ui (base-nova style) | 4.x |
| Custom UI | Aceternity UI (copy-paste components) | — |
| Animations | Framer Motion (import from `motion/react`) | 12.x |
| i18n | next-intl | 4.x |
| Page Transitions | next-view-transitions | 0.3.x |
| Carousel | Embla Carousel React | 8.x |
| Icons | Lucide React | 0.577+ |
| Image Processing | Sharp | 0.34+ |
| Rich Text Editor | Lexical (@payloadcms/richtext-lexical) | — |
| SEO Plugin | @payloadcms/plugin-seo | — |
| Storage (optional) | @payloadcms/storage-vercel-blob | — |
| Bundle Analyzer | @next/bundle-analyzer | — |
| CSS Utilities | clsx + tailwind-merge | — |
| Animations CSS | tw-animate-css | — |

### Key Dependencies (package.json)

```json
{
  "type": "module",
  "dependencies": {
    "@payloadcms/db-postgres": "^3.79.0",
    "@payloadcms/next": "^3.79.0",
    "@payloadcms/plugin-seo": "^3.79.0",
    "@payloadcms/richtext-lexical": "^3.79.0",
    "@payloadcms/storage-vercel-blob": "^3.79.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.35.0",
    "lucide-react": "^0.577.0",
    "next": "15.4",
    "next-intl": "^4.8.3",
    "next-view-transitions": "^0.3.5",
    "payload": "^3.79.0",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "shadcn": "^4.0.0",
    "sharp": "^0.34.5",
    "tailwind-merge": "^3.5.0",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^15.4.0",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "typescript": "^5",
    "eslint": "^9",
    "eslint-config-next": "15.4"
  }
}
```

---

## 2. Project Structure

```
/
├── app/
│   ├── layout.tsx                    # Root layout — passthrough (children only, no <html>/<body>)
│   ├── providers.tsx                 # MotionProviders (LazyMotion + MotionConfig)
│   ├── globals.css                   # Tailwind v4 @theme, keyframes, custom classes
│   ├── robots.ts                     # Dynamic robots.txt
│   ├── sitemap.ts                    # Dynamic sitemap with all locales
│   │
│   ├── (payload)/                    # Payload CMS admin (route group)
│   │   ├── layout.tsx                # Payload admin layout
│   │   ├── api/[...slug]/route.ts    # REST API catch-all route
│   │   └── admin/[[...segments]]/    # Admin panel at /admin
│   │       └── page.tsx
│   │
│   └── [locale]/                     # Public pages (i18n routing)
│       ├── layout.tsx                # Main layout: <html>, <body>, Header, Footer, providers
│       ├── page.tsx                  # Home page
│       ├── about/page.tsx            # About page
│       ├── blog/
│       │   ├── page.tsx              # Blog list (pagination, category filter)
│       │   ├── rss.xml/route.ts      # RSS feed
│       │   └── [slug]/page.tsx       # Blog post detail
│       └── [categorySlug]/
│           ├── page.tsx              # Service category page
│           └── [serviceSlug]/page.tsx # Individual service page
│
├── collections/                      # Payload CMS collection configs
│   ├── Users.ts
│   ├── ServiceCategories.ts
│   ├── Services.ts
│   ├── Posts.ts
│   ├── PostCategories.ts
│   ├── Pages.ts
│   ├── Media.ts
│   ├── Testimonials.ts
│   └── hooks/
│       ├── slugField.ts              # Reusable slug field with auto-formatting
│       └── revalidate.ts             # ISR revalidation hooks
│
├── components/
│   ├── header.tsx                    # Fixed header + desktop nav + mobile menu trigger
│   ├── footer.tsx                    # 4-column footer with CMS data
│   ├── mobile-menu.tsx               # Full-screen mobile nav overlay
│   ├── language-switcher.tsx         # Locale switcher (compact & full modes)
│   ├── rich-text-renderer.tsx        # Lexical richText → React
│   ├── transition-link.tsx           # Link with view transitions
│   │
│   ├── home/                         # Home page sections
│   │   ├── hero-section.tsx          # Hero: aurora, stars, parallax, CTA
│   │   ├── service-categories-section.tsx
│   │   ├── service-category-card.tsx
│   │   ├── about-brief-section.tsx
│   │   ├── latest-posts-section.tsx
│   │   ├── blog-card.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── cta-section.tsx
│   │   ├── scroll-button.tsx
│   │   ├── cta-heading.tsx
│   │   └── icon-map.tsx
│   │
│   ├── about/
│   │   ├── about-hero.tsx
│   │   └── about-timeline.tsx
│   │
│   ├── blog/
│   │   ├── featured-blog-card.tsx
│   │   ├── blog-pagination.tsx
│   │   ├── category-filter.tsx
│   │   ├── post-navigation.tsx
│   │   └── related-posts.tsx
│   │
│   ├── category/
│   │   ├── category-hero.tsx
│   │   └── service-card.tsx
│   │
│   ├── service/
│   │   ├── service-info-block.tsx
│   │   └── service-faq.tsx
│   │
│   ├── animations/                   # Reusable animation wrappers
│   │   ├── index.ts
│   │   ├── ScrollReveal.tsx
│   │   ├── StaggerReveal.tsx
│   │   └── ParallaxLayer.tsx
│   │
│   └── ui/                           # shadcn/ui + Aceternity components
│       ├── button.tsx
│       ├── gradient-divider.tsx
│       ├── celestial-divider.tsx
│       ├── typewriter-effect.tsx
│       ├── transition-link.tsx
│       ├── tracing-beam.tsx
│       └── aceternity/
│           ├── aurora-background.tsx
│           ├── infinite-moving-cards.tsx
│           ├── meteors.tsx
│           └── sparkles.tsx
│
├── i18n/                             # Internationalization config
│   ├── config.ts                     # Locale list + default
│   ├── routing.ts                    # next-intl routing definition
│   ├── request.ts                    # getRequestConfig for message loading
│   └── navigation.ts                 # Navigation helpers (Link, redirect, useRouter)
│
├── lib/                              # Utilities & helpers
│   ├── fonts.ts                      # Next.js Google Fonts config
│   ├── motion-features.ts            # Lazy-loaded Framer Motion features
│   ├── utils.ts                      # cn() — clsx + tailwind-merge
│   ├── navigation.ts                 # Nav items config
│   ├── getServerURL.ts               # Server URL resolution
│   ├── json-ld.ts                    # JSON-LD schema generators
│   ├── reading-time.ts               # Blog reading time calculator
│   └── rich-text-utils.ts            # Lexical → plain text extractor
│
├── messages/                         # i18n translation files
│   ├── ru.json                       # Russian (default)
│   ├── en.json                       # English
│   └── uk.json                       # Ukrainian
│
├── scripts/
│   ├── seed.ts                       # Database seeding script
│   └── patch-next-env.cjs            # Env patching for seed
│
├── migrations/                       # Payload DB migrations
├── media/                            # Uploaded media files
├── public/images/                    # Static assets
│
├── payload.config.ts                 # Payload CMS main config
├── payload-types.ts                  # Auto-generated TypeScript types
├── next.config.ts                    # Next.js config (withPayload + withNextIntl + analyzer)
├── tsconfig.json                     # TypeScript config
├── postcss.config.mjs                # PostCSS config (Tailwind v4)
├── components.json                   # shadcn/ui config
├── middleware.ts                     # next-intl middleware
├── eslint.config.mjs                 # ESLint config
├── .env.example                      # Environment template
└── .env                              # Environment variables (git-ignored)
```

---

## 3. Environment Variables

```bash
# .env.example

# Database (PostgreSQL — Neon, Supabase, etc.)
DATABASE_URI=postgresql://user:password@host/dbname?sslmode=require

# Payload CMS (min 32 characters)
PAYLOAD_SECRET=your-payload-secret-here-min-32-chars

# Application URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Optional: Vercel Blob Storage for media uploads
BLOB_READ_WRITE_TOKEN=
```

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URI` | Yes | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Yes | Encryption key for Payload CMS (min 32 chars) |
| `NEXT_PUBLIC_SERVER_URL` | Yes | Canonical URL for links, sitemap, OG tags |
| `BLOB_READ_WRITE_TOKEN` | No | Vercel Blob Storage token for media hosting |
| `ANALYZE` | No | Set to `"true"` to enable bundle analyzer |

---

## 4. Configuration Files

### next.config.ts

Three wrappers are composed: Payload CMS, next-intl, and bundle analyzer.

```typescript
import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withPayload(withBundleAnalyzer(withNextIntl(nextConfig)));
```

### payload.config.ts

```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, ServiceCategories, Services, Posts, PostCategories, Pages, Media, Testimonials],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
  }),
  sharp,
  localization: {
    locales: [
      { label: 'Русский', code: 'ru' },
      { label: 'English', code: 'en', fallbackLocale: 'ru' },
      { label: 'Українська', code: 'uk', fallbackLocale: 'ru' },
    ],
    defaultLocale: 'ru',
    fallback: true,
  },
  plugins: [
    // Conditional Vercel Blob storage
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [vercelBlobStorage({ collections: { media: true }, token: process.env.BLOB_READ_WRITE_TOKEN, clientUploads: true })]
      : []),
    // SEO meta fields on specified collections
    seoPlugin({
      collections: ['service-categories', 'services', 'posts', 'pages'],
      generateTitle: ({ doc }) => `${doc.title ?? ''} — Site Name`,
      generateDescription: ({ doc }) => (doc.shortDescription || doc.excerpt || '') as string,
    }),
  ],
})
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "strict": true,
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    "paths": {
      "@/*": ["./*"],
      "@payload-config": ["./payload.config.ts"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

### postcss.config.mjs

Tailwind v4 uses PostCSS plugin (no `tailwind.config.ts` needed):

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### components.json (shadcn/ui)

```json
{
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### middleware.ts

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // All paths except: /api, /admin, /_next, static files, files with extensions
    "/((?!api|admin|_next|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*)",
  ],
};
```

---

## 5. Design System

### Color Palette

Defined as CSS variables in `app/globals.css` via Tailwind v4 `@theme inline` block. Usable directly as Tailwind classes (e.g., `bg-cosmic-bg`, `text-star-white`).

```css
@theme inline {
  /* Core colors */
  --color-cosmic-bg:      #0A0A0F;   /* Body background */
  --color-cosmic-card:    #0D1137;   /* Cards, nav background */
  --color-cosmic-purple:  #2D1B69;   /* Secondary bg, gradients */
  --color-cosmic-violet:  #7C3AED;   /* Interactive elements, hover, links */
  --color-cosmic-gold:    #D4AF37;   /* CTA, accents, section headings */
  --color-cosmic-white:   #F0EAD6;   /* Primary text */
  --color-silver-mist:    #C0C0D0;   /* Secondary text */

  /* Elevation surfaces (dark theme depth) */
  --color-surface-1:      #0E0E14;   /* Alternating sections, footer */
  --color-surface-2:      #121218;   /* Card surfaces */
  --color-surface-3:      #16161E;   /* Elevated cards, modals */
  --color-surface-4:      #1A1A24;   /* Active/hover states */

  /* Gold gradient extras */
  --color-cosmic-gold-light: #F5E6A3; /* Shimmer highlight */
  --color-cosmic-gold-dark:  #B8860B; /* Shimmer shadow */
}
```

**Section alternation pattern:** Sections alternate between `cosmic-bg` (#0A0A0F) and `surface-1` (#0E0E14) backgrounds.

### Typography

**Fonts** (configured in `lib/fonts.ts`):

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

Usage: `font-body` class for body text, `font-heading` utility for headings.

**Typography scale** (CSS variables in `@theme`):

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `text-hero` | `clamp(2.5rem, 1.5rem + 3.5vw, 5rem)` | 600 | 1.1 | H1 hero |
| `text-section` | `clamp(2rem, 1.4rem + 2vw, 3.5rem)` | 600 | 1.2 | H2 sections |
| `text-card-title` | `clamp(1.25rem, 1.1rem + 0.5vw, 1.75rem)` | 500 | 1.3 | H3 cards |
| `text-body` | `1.0625rem` (17px) | 400 | 1.7 | Body text |
| `text-small` | `0.9375rem` (15px) | 400 | 1.6 | Small text |

**Body defaults** (set in `@layer base`):
```css
body {
  font-size: 1.0625rem;
  line-height: 1.7;
  letter-spacing: 0.02em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Spacing

Dark theme requires increased spacing for readability:
- Section padding: `py-16 md:py-20 lg:py-30` (20–30% more than light themes)
- Card border-radius: `rounded-2xl` (16px)
- Button border-radius: `rounded-full`

### Hover Effects

Desktop:
```
hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)]  /* violet glow */
hover:-translate-y-1                                  /* lift */
hover:border-cosmic-violet/40                        /* border glow */
```

Mobile:
```
active:scale-[0.97]  /* tap feedback */
```

### CSS Effects (globals.css)

| Class | Description |
|-------|-------------|
| `.gold-shimmer` | Animated gold gradient text (background-clip: text) |
| `.gold-glow` | Pulsing gold text-shadow |
| `.hero-aurora` | Aurora gradient blobs (pseudo-elements + blur) |
| `.hero-stars` | CSS starfield with twinkle animation |
| `.hero-aurora-accent` | Central gold glow orb |
| `.meteor` | Falling star CSS animation |
| `.noise-overlay` | SVG noise texture overlay (3% opacity) |
| `.gradient-border` | Rotating gradient border (CSS @property) |
| `.prose-cosmic` | Rich text styling for dark theme |

### View Transitions

```css
::view-transition-old(root) { animation: vt-fade-out 200ms ease-in; }
::view-transition-new(root) { animation: vt-fade-in 300ms ease-out; }
```

### Reduced Motion

All animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .gold-shimmer { background: none; color: #D4AF37; }
  .meteor { opacity: 0 !important; }
}
```

---

## 6. Payload CMS — Data Model

### Collections Overview

| Collection | Slug | Admin Group | Auth | Versioning |
|-----------|------|-------------|------|------------|
| Users | `users` | — | Yes | No |
| ServiceCategories | `service-categories` | Услуги | No | No |
| Services | `services` | Услуги | No | No |
| Posts | `posts` | Блог | No | Yes (drafts + autosave) |
| PostCategories | `post-categories` | Блог | No | No |
| Pages | `pages` | Контент | No | No |
| Media | `media` | Контент | No | No |
| Testimonials | `testimonials` | Контент | No | No |

### Access Control Pattern

All collections follow the same pattern:

```typescript
access: {
  read: () => true,                    // Public read
  create: ({ req }) => !!req.user,     // Authenticated only
  update: ({ req }) => !!req.user,
  delete: ({ req }) => !!req.user,
}
```

Exception: `Posts` — public read only returns `status: "published"`.

### Collection: ServiceCategories

| Field | Type | Localized | Required | Notes |
|-------|------|-----------|----------|-------|
| `title` | text | Yes | Yes | Category name |
| `slug` | text | No | Yes | URL slug (unique, auto-formatted) |
| `description` | richText | Yes | No | Full description for detail page |
| `shortDescription` | textarea | Yes | No | Card text on homepage |
| `icon` | text | No | No | Icon key identifier |
| `image` | relationship→Media | No | No | Feature image |
| `heroImage` | upload→Media | No | No | Hero background (1920x800) |
| `order` | number | No | No | Display order |

**Hooks:**
- `afterChange/afterDelete` → revalidates `/[categorySlug]`, `/[locale]`
- `beforeDelete` → cascade deletes related Services, nullifies Testimonials.serviceCategory

### Collection: Services

| Field | Type | Localized | Required | Notes |
|-------|------|-----------|----------|-------|
| `title` | text | Yes | Yes | Service name |
| `slug` | text | No | Yes | URL slug |
| `shortDescription` | textarea | Yes | No | Card description |
| `fullDescription` | richText | Yes | No | Detail page content |
| `category` | relationship→ServiceCategories | No | Yes | Parent category |
| `price` | text | Yes | No | Price display text |
| `duration` | text | Yes | No | Duration text |
| `format` | select | No | No | `online` / `offline` / `both` |
| `icon` | text | No | No | Icon key |
| `image` | relationship→Media | No | No | Service image |
| `faq` | array | Yes | No | FAQ items (`question`, `answer`) |
| `isActive` | checkbox | No | No | Default: true |
| `order` | number | No | No | Sort order |

### Collection: Posts

| Field | Type | Localized | Required | Notes |
|-------|------|-----------|----------|-------|
| `title` | text | Yes | Yes | Article title |
| `slug` | text | No | Yes | URL slug |
| `content` | richText | Yes | No | Full article |
| `excerpt` | textarea | Yes | No | Summary for cards/SEO |
| `featuredImage` | relationship→Media | No | No | 16:9 image (1200x675) |
| `category` | relationship→PostCategories | No | No | Blog category |
| `publishedAt` | date | No | No | Publication date |
| `status` | select | No | Yes | `draft` / `published` |
| `readingTime` | number | No | No | Minutes |

**Versioning:** Drafts enabled with autosave.

### Collection: PostCategories

| Field | Type | Localized | Required |
|-------|------|-----------|----------|
| `title` | text | Yes | Yes |
| `slug` | text | No | Yes |
| `description` | textarea | Yes | No |
| `order` | number | No | No |

### Collection: Pages

| Field | Type | Localized | Required | Notes |
|-------|------|-----------|----------|-------|
| `title` | text | Yes | Yes | Page name |
| `slug` | text | No | Yes | URL slug |
| `content` | richText | Yes | No | Page content |
| `featuredImage` | relationship→Media | No | No | Portrait (800x800) |
| `gallery` | array | No | No | Additional images + captions |
| `timeline` | array | No | No | Timeline entries: `year`, `title` (localized) |
| `status` | select | No | No | `draft` / `published` |

### Collection: Testimonials

| Field | Type | Localized | Required |
|-------|------|-----------|----------|
| `clientName` | text | No | Yes |
| `text` | textarea | Yes | Yes |
| `serviceCategory` | relationship→ServiceCategories | No | No |
| `rating` | number | No | No (1–5) |
| `isActive` | checkbox | No | No |
| `order` | number | No | No |

### Collection: Media

| Field | Type | Localized | Required |
|-------|------|-----------|----------|
| `alt` | text | Yes | Yes |
| `caption` | text | Yes | No |

**Upload config:**
- Allowed formats: JPEG, PNG, WebP, SVG
- Auto-generated sizes:
  - `thumbnail`: 400×300
  - `card`: 768×432 (16:9)
  - `hero`: 1920×auto

### Relationships Diagram

```
ServiceCategories ──1:N──→ Services
ServiceCategories ──1:N──→ Testimonials (optional)
PostCategories    ──1:N──→ Posts
Media ←── referenced by all content collections
```

### Shared Hooks

**Slug field** (`collections/hooks/slugField.ts`):
```typescript
const formatSlug = (val: string): string =>
  val.trim().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')

export const slugField = (description?: string): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  admin: { position: 'sidebar', description },
  hooks: {
    beforeValidate: [({ value }) => typeof value === 'string' ? formatSlug(value) : value],
  },
})
```

**ISR revalidation** (`collections/hooks/revalidate.ts`):

Each collection change triggers `revalidatePath()` for affected routes:

| Collection | Revalidated Paths |
|-----------|-------------------|
| `service-categories` | `/[locale]`, `/[locale]/[categorySlug]` |
| `services` | `/[locale]`, `/[locale]/[categorySlug]`, `/[locale]/[categorySlug]/[serviceSlug]` |
| `posts` | `/[locale]`, `/[locale]/blog`, `/[locale]/blog/[slug]` |
| `post-categories` | `/[locale]/blog` |
| `pages` | `/[locale]/about` |
| `testimonials` | `/[locale]` |

### Payload Admin Notes

After adding/removing any plugin in `payload.config.ts`, run:
```bash
npx payload generate:importmap
```
And commit the updated `importMap.js`.

---

## 7. Internationalization (i18n)

### Configuration

**i18n/config.ts** — locale list and types:
```typescript
export const locales = ["ru", "en", "uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";
```

**i18n/routing.ts** — next-intl routing:
```typescript
import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./config";

export const routing = defineRouting({ locales, defaultLocale });
```

**i18n/request.ts** — message loading:
```typescript
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

### Message File Structure

Files: `messages/ru.json`, `messages/en.json`, `messages/uk.json`

```json
{
  "metadata": {
    "title": "Site Title",
    "description": "Site description"
  },
  "nav": {
    "home": "Home",
    "blog": "Blog",
    "about": "About"
  },
  "footer": {
    "brand": "...",
    "navigation": "Navigation",
    "services": "Services",
    "contact": "Contact",
    "copyright": "..."
  },
  "languages": { "ru": "RU", "en": "EN", "uk": "UK" },
  "home": {
    "hero": { "title": "...", "subtitle": "...", "cta": "...", "cta_secondary": "..." },
    "services": { "title": "...", "subtitle": "..." },
    "about": { "title": "...", "text": "...", "cta": "..." },
    "blog": { "title": "...", "view_all": "..." },
    "testimonials": { "title": "...", "subtitle": "..." },
    "cta": { "title": "...", "button": "..." }
  },
  "category": { "services_title": "...", "book_service": "...", "cta_title": "..." },
  "service": { "book_title": "...", "price_label": "...", "duration_label": "...", "format_label": "..." },
  "about": { "title": "...", "timeline_title": "...", "cta_title": "..." },
  "blog": { "title": "...", "all_categories": "...", "read_more": "...", "related_posts": "..." }
}
```

### Usage in Components

**Server components:**
```typescript
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home.hero" });

  return <h1>{t("title")}</h1>;
}
```

**Client components:**
```typescript
"use client";
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("home.hero");
  return <h1>{t("title")}</h1>;
}
```

### Payload CMS Localization

Payload's localization is separate from next-intl. Pass `locale` when querying:

```typescript
const data = await payload.find({
  collection: 'posts',
  locale: locale as 'ru' | 'en' | 'uk',
});
```

Fallback chain: `uk` → `ru`, `en` → `ru`.

---

## 8. Routing & Pages

### Layout Architecture

```
app/layout.tsx (Root)
  ↓ children passthrough — no <html> or <body>
  ├── app/(payload)/ — Payload admin (own layout)
  └── app/[locale]/layout.tsx (Locale Layout)
        ↓ Wraps with:
        <ViewTransitions>
          <html lang={locale} className="dark">
            <body className="font-body antialiased">
              <NextIntlClientProvider>
                <MotionProviders>
                  <Header />
                  <main>{children}</main>
                  <Footer />
                </MotionProviders>
              </NextIntlClientProvider>
            </body>
          </html>
        </ViewTransitions>
```

**Why passthrough root layout?** Payload CMS admin requires its own `<html>/<body>` setup. The root layout returns `children` only, and the locale layout provides the full HTML shell for public pages.

### Dynamic Routes

| Route Pattern | Page | Data Source |
|--------------|------|-------------|
| `/[locale]` | Home | ServiceCategories, Posts, Testimonials, Pages |
| `/[locale]/about` | About | Pages (slug: "about") |
| `/[locale]/blog` | Blog list | Posts (paginated, filtered) |
| `/[locale]/blog/[slug]` | Blog post | Posts (single) |
| `/[locale]/[categorySlug]` | Service category | ServiceCategories, Services |
| `/[locale]/[categorySlug]/[serviceSlug]` | Service detail | Services (single) |

### Static Generation

Pages use `generateStaticParams` for all locales:
```typescript
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
```

Blog and service pages generate params from CMS data:
```typescript
export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const posts = await payload.find({ collection: 'posts', where: { status: { equals: 'published' } }, limit: 1000 });
  return posts.docs.flatMap(post =>
    locales.map(locale => ({ locale, slug: post.slug }))
  );
}
```

---

## 9. Components Architecture

### Server vs Client Components

| Pattern | Type | Example |
|---------|------|---------|
| Data fetching sections | Server | `ServiceCategoriesSection`, `LatestPostsSection`, `Footer` |
| Interactive/animated | Client | `HeroSection`, `MobileMenu`, `TestimonialsSection` |
| Layout wrappers | Server | `Header` shell, page layouts |
| Animation wrappers | Client | `ScrollReveal`, `StaggerReveal`, `ParallaxLayer` |

### Component Organization

```
/components/
  ├── Layout components (header, footer, mobile-menu, language-switcher)
  ├── /home/        — Home page sections (one file per section)
  ├── /about/       — About page sections
  ├── /blog/        — Blog page components
  ├── /category/    — Category page components
  ├── /service/     — Service detail components
  ├── /animations/  — Reusable animation wrappers
  └── /ui/          — shadcn/ui + Aceternity UI components
       └── /aceternity/ — Copy-pasted Aceternity components
```

### Utility: cn()

All components use `cn()` from `lib/utils.ts` for conditional class merging:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Rich Text Rendering

Lexical rich text from Payload is rendered via `rich-text-renderer.tsx`, which converts Lexical JSON to React elements. The `.prose-cosmic` class provides dark-theme-aware typography styling.

### Aceternity UI Components

Copy-pasted (not npm-installed) into `components/ui/aceternity/`:

| Component | File | Usage |
|-----------|------|-------|
| Aurora Background | `aurora-background.tsx` | Hero section background |
| Infinite Moving Cards | `infinite-moving-cards.tsx` | Testimonials carousel |
| Meteors | `meteors.tsx` | Service card decorations |
| Sparkles | `sparkles.tsx` | Available but not used |

**Rules for Aceternity components:**
- Max 1 heavy effect (Lamp, 3D Card, Typewriter) visible on screen at a time
- Never use: Background Beams, Sparkles, Wavy Background, Glowing Stars

---

## 10. Data Fetching Patterns

### Server-Side Queries (Payload Local API)

All data fetching uses Payload's local API in Server Components:

```typescript
import { getPayload } from "payload";
import config from "@payload-config";

// In a Server Component or page:
const payload = await getPayload({ config });

// Find many
const categories = await payload.find({
  collection: "service-categories",
  locale: locale as "ru" | "en" | "uk",
  sort: "order",
  limit: 100,
});

// Find with filters
const posts = await payload.find({
  collection: "posts",
  locale: locale as "ru" | "en" | "uk",
  where: {
    status: { equals: "published" },
    category: { equals: categoryId },
  },
  sort: "-publishedAt",
  limit: 6,
  page: currentPage,
  depth: 2, // Resolve relationships 2 levels deep
});

// Find one by slug
const post = await payload.find({
  collection: "posts",
  where: { slug: { equals: slug }, status: { equals: "published" } },
  locale: locale as "ru" | "en" | "uk",
  limit: 1,
  depth: 2,
});
const doc = post.docs[0];
```

### Parallel Data Fetching

Home page fetches all data in parallel:

```typescript
const [categoriesData, postsData, testimonialsData, aboutData] = await Promise.all([
  payload.find({ collection: "service-categories", locale, sort: "order" }),
  payload.find({ collection: "posts", locale, where: { status: { equals: "published" } }, sort: "-publishedAt", limit: 3 }),
  payload.find({ collection: "testimonials", locale, where: { isActive: { equals: true } }, sort: "order" }),
  payload.find({ collection: "pages", locale, where: { slug: { equals: "about" } }, limit: 1 }),
]);
```

### ISR (Incremental Static Regeneration)

Blog and category pages use ISR with revalidation:

```typescript
export const revalidate = 3600; // Revalidate every hour
```

Combined with collection hooks that call `revalidatePath()` on data changes for instant updates.

### REST API

Payload auto-generates REST endpoints at `/api/`:

```
GET    /api/service-categories
GET    /api/services?where[category][equals]=123
GET    /api/posts?where[status][equals]=published&sort=-publishedAt&limit=10
POST   /api/posts          (authenticated)
PATCH  /api/posts/123      (authenticated)
DELETE /api/posts/123      (authenticated)
```

---

## 11. Animation System

### Provider Setup

`app/providers.tsx` wraps the app with Framer Motion providers:

```typescript
"use client";
import { LazyMotion, MotionConfig } from "framer-motion";

const loadFeatures = () =>
  import("../lib/motion-features").then((res) => res.default);

export function MotionProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
```

**`lib/motion-features.ts`** exports `domAnimation` for lazy loading:
```typescript
export { domAnimation as default } from "framer-motion";
```

### ScrollReveal

Scroll-triggered entrance animation with direction options:

```typescript
import { ScrollReveal } from "@/components/animations";

<ScrollReveal direction="up" delay={0} duration={0.5}>
  <h2>Section Title</h2>
</ScrollReveal>

<ScrollReveal direction="left" delay={0.2}>
  <div>Content slides in from left</div>
</ScrollReveal>
```

Directions: `up` (y: 40→0), `left` (x: -30→0), `right` (x: 30→0), `fade` (opacity only).

### StaggerReveal

Container + item pattern for staggered children:

```typescript
import { StaggerContainer, StaggerItem } from "@/components/animations";

<StaggerContainer className="grid grid-cols-3 gap-6">
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card>{item.title}</Card>
    </StaggerItem>
  ))}
</StaggerContainer>
```

Stagger delay: 0.08s between children, 0.1s initial delay.

### ParallaxLayer

Scroll-based vertical translation:

```typescript
import { ParallaxLayer } from "@/components/animations";

<ParallaxLayer speed={0.3}>
  <div className="absolute ...">Parallax content</div>
</ParallaxLayer>
```

Speed multiplier controls translation range (-250 to 250px).

### Reduced Motion

All animation components check `useReducedMotion()` and return plain `<div>` when reduced motion is preferred. CSS animations are also disabled via the `@media (prefers-reduced-motion: reduce)` block in globals.css.

---

## 12. SEO

### Metadata Generation

Each page generates metadata with locale-aware alternates:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${baseUrl}/${loc}`])
      ),
    },
    openGraph: { siteName: "Site Name", locale, type: "website" },
  };
}
```

### JSON-LD Structured Data

`lib/json-ld.ts` provides generators for:

| Function | Schema Type | Used On |
|----------|-------------|---------|
| `generateWebSiteJsonLd(locale)` | WebSite | Home page |
| `generateBlogPostingJsonLd(post, locale)` | BlogPosting | Blog posts |
| `generatePersonJsonLd(locale)` | Person | About page |
| `generateServiceJsonLd(service, categorySlug, locale)` | ProfessionalService | Service pages |

Usage in pages:
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{
  __html: JSON.stringify(generateWebSiteJsonLd(locale))
}} />
```

### Sitemap (`app/sitemap.ts`)

Dynamic sitemap generated from Payload CMS data:
- Fetches all published content (categories, services, posts, pages)
- Generates localized alternates for all 3 locales
- Sets priorities: home (1.0), categories (0.8), services (0.7), blog (0.6)

### Robots (`app/robots.ts`)

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/admin/*", "/api", "/api/*"] }],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

### Payload SEO Plugin

Auto-generates `meta.title`, `meta.description`, `meta.image` fields on:
- service-categories, services, posts, pages

Title format: `{title} — Site Name`

---

## 13. Scripts & Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Production
npm run build        # Production build (must pass!)
npm run start        # Start production server

# Quality
npm run lint         # ESLint check

# Data
npm run seed         # Fill database with test data (all collections)

# Analysis
npm run analyze      # Bundle analysis (opens browser report)

# CI Pipeline
npm run ci           # Generate importmap → run migrations → build

# Payload CMS
npx payload generate:importmap   # Regenerate after plugin changes
npx payload migrate              # Run database migrations
npx payload generate:types       # Regenerate payload-types.ts
```

### Database Seeding

`scripts/seed.ts`:
- Clears all existing collections
- Creates admin user
- Seeds localized test data for all collections
- Run with: `npm run seed`

---

## 14. Conventions & Patterns

### Component Rules

1. **Server Components by default** — only add `'use client'` when needed (interactivity, hooks, animations)
2. **Always call `setRequestLocale(locale)`** in server components within `[locale]/`
3. **Use `@/` import alias** for all project imports
4. **Font classes:** `font-body` for body text, `font-heading` for headings
5. **shadcn/ui components** → `components/ui/`
6. **Aceternity UI components** → `components/ui/aceternity/` (copy-paste, not npm)
7. **Animation components** → `components/animations/`

### Styling Rules (Tailwind v4)

1. Use `bg-linear-to-r` (not `bg-gradient-to-r`) — Tailwind v4 syntax
2. Any spacing integer works (no predefined scale restriction)
3. Card radius: `rounded-2xl`, button radius: `rounded-full`
4. Heading weights: 500–600 (NOT 700 — causes halation on dark backgrounds)
5. Max 3 animated components simultaneously visible on screen

### Data Rules

1. All text fields use `localized: true` with fallback `uk→ru→en`
2. All CTA buttons link to Telegram
3. UI texts go through `next-intl` (`messages/*.json`)
4. CMS content fields go through Payload localization
5. Access: public read, authenticated write

### Git & Deployment

1. Commit after each logical step
2. After plugin changes: `npx payload generate:importmap` + commit `importMap.js`
3. Environment: `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL` are required
4. Node.js 22+ required (for Tailwind v4 compatibility)

### Animation Best Practices

1. Use `MotionProviders` (LazyMotion + MotionConfig) globally
2. All components must respect `prefers-reduced-motion`
3. Use `useReducedMotion()` hook in client animation components
4. CSS animations: include reduced-motion media query
5. Maximum 3 animated components visible simultaneously
6. Lazy-load motion features via `lib/motion-features.ts`
