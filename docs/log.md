# Лог разработки

> **Правило:** этот файл обновляется в конце КАЖДОЙ сессии Claude Code.
> Новая запись добавляется **в начало** файла (самая свежая сессия — всегда сверху).
> Этот лог — главный способ передать контекст между сессиями.

---

## Сессия 5 — 2026-03-06 — Итерация 3: Главная страница

### Сделано:
- Создана полная главная страница из 6 секций: Hero, Карточки разделов, Обо мне, Блог-превью, Отзывы, CTA
- Aceternity UI компоненты реализованы кастомно: Aurora Background, Sparkles (canvas), Infinite Moving Cards
- Все анимации обёрнуты в `useReducedMotion()` — при prefers-reduced-motion показываются статичные альтернативы
- Данные загружаются из CMS через Payload Local API (параллельные запросы через Promise.all)
- Hero секция: полноэкранная с Aurora фоном, Sparkles, 2 CTA кнопки (Telegram + scroll к услугам)
- 5 карточек категорий услуг из CMS с Lucide иконками, CSS hover glow + scale
- Секция "Обо мне" с Framer Motion fade-in on scroll, данные из Pages (slug: about)
- 3 последних поста блога с карточками (featured image, категория badge, дата, excerpt)
- Отзывы: бесконечный горизонтальный скролл (Infinite Moving Cards), данные из CMS
- CTA секция: градиент mystic-purple → midnight-navy, кнопка Telegram
- i18n: все тексты через next-intl на 3 языках (RU/EN/UK)
- `npm run build` — 0 ошибок, 0 warnings

### Файлы созданы:
- components/ui/aceternity/aurora-background.tsx — кастомный Aurora фон с космическими градиентами
- components/ui/aceternity/sparkles.tsx — canvas-based мерцающие звёзды (celestial-gold)
- components/ui/aceternity/infinite-moving-cards.tsx — бесконечный карусель отзывов
- components/home/hero-section.tsx — client, Hero с Aurora + Sparkles + CTA
- components/home/service-categories-section.tsx — server, секция карточек категорий
- components/home/service-category-card.tsx — server, карточка категории с иконкой
- components/home/about-brief-section.tsx — client, секция "Обо мне" с fade-in
- components/home/latest-posts-section.tsx — server, секция последних постов
- components/home/blog-card.tsx — server, карточка блога
- components/home/testimonials-section.tsx — client, секция отзывов
- components/home/cta-section.tsx — server, CTA секция
- components/home/scroll-button.tsx — client, smooth scroll к секции
- components/home/icon-map.tsx — маппинг icon keywords → Lucide компоненты
- lib/rich-text-utils.ts — extractPlainText() из Lexical JSON

### Файлы изменены:
- app/[locale]/page.tsx — полная переработка: Server Component с Payload API запросами и композицией секций
- messages/ru.json — добавлен namespace "home" (hero, services, about, blog, testimonials, cta)
- messages/en.json — то же
- messages/uk.json — то же

### Проблемы:
- Lint ошибки в scripts/patch-next-env.cjs — pre-existing, не связаны с этой итерацией

### Следующая сессия:
- Итерация 4: Страницы разделов и услуг (/[categorySlug], /[categorySlug]/[serviceSlug])
- Создать страницы-заглушки для маршрутов навигации (/tarot, /rituals, /guidance, /education, /regression, /blog, /about)
- Rich text рендеринг для описаний услуг и страниц

---

## Как заполнять

В конце каждой сессии попросите Claude Code:

```
Обнови docs/log.md: добавь запись о том что было сделано,
какие файлы созданы/изменены, какие проблемы возникли,
и что нужно сделать в следующей сессии.
Также обнови статус в CLAUDE.md.
Закоммить всё.
```

### Формат записи

```markdown
## Сессия [номер] — [дата] — Итерация [номер]: [название]

### Сделано:
- Что конкретно было реализовано (каждый пункт — одна задача)
- Какой функционал теперь работает

### Файлы созданы:
- path/to/new-file.ts — краткое описание
- path/to/another-file.tsx — краткое описание

### Файлы изменены:
- path/to/existing-file.ts — что именно изменилось

### Проблемы:
- Описание проблемы → как решили (или «не решено, перенесено»)

### Не завершено:
- Что планировалось, но не успели — причина

### Следующая сессия:
- Конкретные задачи для следующей сессии
- В каком порядке их делать
```

---

## Сессия 4 — 2026-03-06 — Итерация 2: Layout и навигация

### Сделано:
- Установлен framer-motion для анимаций
- Добавлены Cosmic Night Theme цвета в globals.css (@theme inline): cosmic-black, midnight-navy, mystic-purple, astral-violet, celestial-gold, star-white, silver-mist
- Обновлён .dark блок: --background → cosmic-black, --foreground → star-white
- Добавлено правило prefers-reduced-motion в CSS
- Создан i18n/navigation.ts с createNavigation (Link, useRouter, usePathname)
- Создан lib/navigation.ts — конфиг навигации (8 пунктов + 4 соцсети)
- Обновлены messages/{ru,en,uk}.json — добавлены nav, footer, languages ключи
- Header: фиксированный, midnight-navy/80 backdrop-blur, лого + 8 nav links + language switcher
- Footer: cosmic-black, 3 колонки (навигация, соцсети, CTA Telegram), копирайт
- Language Switcher: 3 кнопки RU/EN/UK, сохраняет путь при переключении
- Mobile Menu: hamburger → fullscreen overlay, fade-in анимация, stagger links
- Locale layout обновлён: Header + Footer обёрнуты, hreflang alternates в metadata
- `npm run build` — 0 ошибок

### Файлы созданы:
- i18n/navigation.ts — createNavigation helper (Link, useRouter, usePathname)
- lib/navigation.ts — navItems (8 routes) + socialLinks (4 items)
- components/header.tsx — client, fixed навигация с лого, меню, language switcher
- components/footer.tsx — server, 3-col grid, соцсети, CTA, копирайт
- components/language-switcher.tsx — client, переключатель RU/EN/UK
- components/mobile-menu.tsx — client, fullscreen overlay с Framer Motion

### Файлы изменены:
- app/globals.css — cosmic theme цвета, dark mode background/foreground, reduced-motion
- app/[locale]/layout.tsx — Header + Footer + hreflang metadata
- messages/ru.json — nav, footer, languages ключи (обновлены metadata)
- messages/en.json — то же самое
- messages/uk.json — то же самое
- package.json — добавлен framer-motion

### Проблемы:
- Cinzel не имеет кириллицы — nav items в кириллице fallback на serif. Допустимо для эстетики.
- lucide-react не имеет TikTok/Telegram иконок — используются Music2 и Send как заглушки
- Lint ошибки в scripts/patch-next-env.cjs — pre-existing, не связаны с этой итерацией

### Следующая сессия:
- Итерация 3: Главная страница (Hero, карточки разделов, секция "Обо мне", блог-превью, отзывы, CTA)
- Установить/настроить Aceternity UI компоненты (Aurora Background, Sparkles, Infinite Moving Cards)
- Создать страницы-заглушки для маршрутов навигации (/tarot, /rituals, /guidance, /education, /regression, /blog, /about)

---

## Сессия 3 — 2026-03-06 — Итерация 1: Схема данных и CMS

### Сделано:
- Все коллекции Payload CMS созданы и работают: ServiceCategories, Services, Posts, PostCategories, Pages, Testimonials, Media, Users
- @payloadcms/plugin-seo подключён для service-categories, services, posts, pages
- Исправлена двойная локализация в Services.faq (array localized + children localized)
- Seed-скрипт сделан самозапускаемым через `npx tsx` с патчем @next/env
- Seed заполнил: 5 категорий, 10 услуг, 5 категорий блога, 3 поста, 6 отзывов, страницу "Обо мне", админа
- `npm run build` — 0 ошибок

### Файлы созданы:
- collections/ServiceCategories.ts — 5 разделов услуг с локализацией
- collections/Services.ts — услуги с faq, category, price, duration, format
- collections/Posts.ts — блог с versions/drafts/autosave, status-based access
- collections/PostCategories.ts — категории блога
- collections/Testimonials.ts — отзывы клиентов
- scripts/seed.ts — seed-скрипт с данными на 3 языках
- scripts/patch-next-env.cjs — патч для совместимости @next/env с tsx

### Файлы изменены:
- collections/Media.ts — добавлены imageSizes (thumbnail, card, hero), upload config
- collections/Pages.ts — добавлены gallery, featuredImage, status
- collections/Users.ts — добавлены name, role fields
- payload.config.ts — подключены все коллекции, seoPlugin, localization config
- package.json — добавлен script "seed"

### Проблемы:
- @next/env несовместим с tsx (ESM/CJS interop) → решено через --require патч в patch-next-env.cjs
- DB migration prompt при первом запуске → решено через PAYLOAD_DROP_DATABASE=true
- Revalidation hooks (afterChange) отложены до Итерации 2+ когда появятся страницы

### Следующая сессия:
- Итерация 2: Layout и навигация (Header, Footer, мобильное меню)
- Применить Cosmic Night Theme CSS-переменные в globals.css
- Установить Framer Motion и Aceternity UI

---

## Сессия 2 — 2026-03-06 — Итерация 0: Финализация и проверка

### Сделано:
- PostgreSQL 16 запущен локально через Docker (`mori-norman-db`)
- Создан `.env` и `.env.local` с локальными credentials
- Placeholder SVG-лого «Mori Norman» в `public/images/logo.svg`
- Payload CMS auto-generated `importMap.js` с Lexical editor features
- Проверены все маршруты: `/ru`, `/en`, `/uk` → 200, `/admin` → 307 (login), `/` → 307 → `/ru`
- `npm run build` — 0 ошибок, 0 warnings
- docs/design.md и docs/api.md закоммичены

### Файлы созданы:
- public/images/logo.svg — placeholder лого «Mori Norman» (Cinzel gold SVG)
- .env.local — локальные переменные для Docker PostgreSQL
- docs/design.md — полная спецификация Cosmic Night Theme
- docs/api.md — документация схемы данных

### Файлы изменены:
- app/(payload)/admin/importMap.js — auto-generated Payload Lexical imports
- .env — обновлён пароль под Docker контейнер `mori-norman-db`

### Проблемы:
- Нет — всё заработало с первого раза после настройки Docker

### Следующая сессия:
- Итерация 1: Расширить коллекции (ServiceCategories, Services, Posts, PostCategories, Testimonials)
- Добавить `localized: true` на все текстовые поля, fallback uk → ru → en
- Применить Cosmic Night Theme CSS-переменные в globals.css
- Установить Framer Motion и Aceternity UI
- Или сразу Итерация 2: Layout и навигация (Header, Footer, мобильное меню)

---

## Сессия 1 — 2026-03-06 — Итерация 0: Инициализация проекта

### Сделано:
- Установлен nvm + Node.js 22 (требуется для Tailwind CSS v4)
- `create-next-app@latest` с TypeScript, Tailwind CSS v4, App Router
- Даунгрейд Next.js 16 → 15.4 (Payload CMS 3 не поддерживает Next 16 ещё)
- Payload CMS 3.0 с `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`, `sharp`
- next-intl настроен: middleware, `[locale]` routing, RU/EN/UK (дефолт RU)
- shadcn/ui инициализирован (base-nova, neutral, dark theme, CSS variables)
- Шрифты: Cinzel (headings, --font-heading) + Inter (body, --font-sans, latin+cyrillic)
- Создан CLAUDE.md, .env.example, docs/log.md
- Базовые коллекции: Users, Pages, Media
- `npm run build` проходит без ошибок и warnings

### Файлы созданы:
- app/layout.tsx — корневой passthrough layout (без `<html>`/`<body>`)
- app/globals.css — Tailwind v4 + shadcn/ui CSS variables (light + dark)
- app/[locale]/layout.tsx — locale layout с fonts, NextIntlClientProvider
- app/[locale]/page.tsx — заглушка главной страницы
- app/(payload)/layout.tsx — layout для CMS admin
- app/(payload)/admin/[[...segments]]/page.tsx — Payload admin page
- app/(payload)/admin/importMap.js — Payload import map
- app/(payload)/api/[...slug]/route.ts — Payload REST API routes
- collections/Users.ts — пользователи с auth
- collections/Pages.ts — страницы (title, slug, content, locale)
- collections/Media.ts — медиа (images)
- payload.config.ts — конфиг Payload CMS (postgres, lexical, sharp)
- middleware.ts — next-intl routing (исключает /api, /admin, /_next)
- i18n/config.ts — locales и defaultLocale
- i18n/routing.ts — defineRouting
- i18n/request.ts — getRequestConfig
- messages/ru.json, en.json, uk.json — базовые ключи (metadata, common)
- lib/fonts.ts — Cinzel + Inter через next/font/google
- lib/utils.ts — cn() helper (shadcn)
- components/ui/button.tsx — shadcn button
- components.json — shadcn/ui config
- .env.example — DATABASE_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL
- CLAUDE.md — проектная документация

### Файлы изменены:
- .gitignore — обновлён под Next.js + Payload
- tsconfig.json — добавлен alias `@payload-config`, jsx: preserve (Next.js)
- eslint.config.mjs — переписан на FlatCompat (ESLint 9 + eslint-config-next legacy)
- next.config.ts — withPayload + withNextIntl обёртки
- package.json — все зависимости (next 15.4, payload 3, next-intl, shadcn)

### Проблемы:
- Next.js 16.1.6 (create-next-app@latest) несовместим с Payload CMS 3 → даунгрейд до 15.4.x
- Next.js 15.5.x тоже не подходит (peer dep: `>=15.4.11 <15.5.0`) → точная версия 15.4.11
- ESLint 9 flat config vs eslint-config-next legacy формат → добавлен `@eslint/eslintrc` FlatCompat
- shadcn init перезаписывает root layout → пришлось восстанавливать passthrough layout
- Git identity не настроен → настроен для репо (whenToSleep)

### Следующая сессия:
- Настроить `.env` с реальными данными Neon PostgreSQL
- Проверить `npm run dev` и работу Payload admin panel
- Итерация 1: Расширить коллекции (ServiceCategories, Services, Posts, PostCategories, Testimonials)
- Добавить localized: true на все текстовые поля
- Применить Cosmic Night Theme в globals.css
- Установить Framer Motion и Aceternity UI

---

> ⬆️ Новые записи добавляются ВЫШЕ этой линии.
> Самая свежая сессия — всегда первая в файле.
