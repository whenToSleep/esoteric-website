# Лог разработки

> **Правило:** этот файл обновляется в конце КАЖДОЙ сессии Claude Code.
> Новая запись добавляется **в начало** файла (самая свежая сессия — всегда сверху).
> Этот лог — главный способ передать контекст между сессиями.

---

## Сессия 25 — 2026-03-07 — Category page: heroImage support, CTA glow, i18n fix

### Сделано:
- **CategoryHero**: добавлена поддержка heroImage — next/image fill + gradient overlay (from-cosmic-bg via-cosmic-bg/70 to-cosmic-bg/30), fallback gradient + orbs когда фото нет
- **Hero layout**: min-h-[40vh] md:min-h-[50vh] с items-end (контент прижат к низу как на киноафишах), pt-32 md:pt-40 для пространства под навигацией
- **ServiceCategories CMS**: добавлено поле heroImage (upload, relationTo: media) с описанием для админки
- **Migration**: создана 20260307_203346_add_hero_image — ALTER TABLE hero_image_id + FK + INDEX
- **CTA section**: переработана — абсолютный gradient фон (from-cosmic-bg via-cosmic-purple/20 to-cosmic-bg) + декоративный violet glow blur, кнопка с hover:bg-cosmic-violet
- **i18n**: добавлен ключ `category.coming_soon` на 3 языках (ru/en/uk) — ранее использовался несуществующий ключ
- TypeScript + ESLint — 0 ошибок

### Файлы изменены:
- components/category/category-hero.tsx — heroImage prop, next/image, gradient overlay, fallback orbs, items-end layout
- app/[locale]/[categorySlug]/page.tsx — heroImage prop передача, CTA с absolute gradient + glow
- collections/ServiceCategories.ts — добавлено поле heroImage (upload)
- migrations/index.ts — подключена миграция add_hero_image
- messages/ru.json, en.json, uk.json — добавлен category.coming_soon

### Файлы созданы:
- migrations/20260307_203346_add_hero_image.ts — SQL миграция для hero_image_id
- migrations/20260307_203346_add_hero_image.json — метаданные миграции

---

## Сессия 24 — 2026-03-07 — Category page redesign (mini-hero, styled cards, CTA)

### Сделано:
- **CategoryHero**: полная переработка — gradient orbs, breadcrumb (Home -> Category), fluid text-hero, убран framer-motion (теперь server component)
- **ServiceCard**: редизайн под стиль главной — gradient bg (#1A1A24 -> #141419), highlight line, hover glow + lift, active:scale, цена (gold) + время внизу через border-t
- **Page layout**: секции чередуют bg (cosmic-bg -> surface-1), gradient divider между hero и услугами, celestial gold line между услугами и CTA
- **CTA**: gradient фон (cosmic-purple/30), pill-shaped кнопка (rounded-full, bg-cosmic-violet/90, hover glow)
- Убрана иконка из карточек услуг (есть только у категорий)
- JS бандл страницы: снизился (убран framer-motion из hero)
- `npm run build` — 0 ошибок

### Файлы изменены:
- components/category/category-hero.tsx — полная переработка
- components/category/service-card.tsx — полная переработка
- app/[locale]/[categorySlug]/page.tsx — layout, dividers, CTA

---

## Сессия 23 — 2026-03-07 — Service cards: equal height, centering, visible bg

### Сделано:
- Фон карточек: bg-cosmic-card (#0D1137) → gradient surface-4 (#1A1A24 → #141419) — Δ16 от body, чётко видны
- Равная высота: h-full flex flex-col на карточке, flex-1 на описании
- Описание: line-clamp-3 для единообразия (длинный текст обрезается ...)
- Ссылка "Подробнее": mt-auto pt-4 — всегда внизу карточки
- Border: white/[0.08], highlight-линия сверху via-white/[0.06]
- Hover: двухслойный фиолетовый glow + lift
- Grid 3+2 с lg:col-start-2 на index 3 — нижний ряд центрирован
- `npm run build` — 0 ошибок

### Файлы изменены:
- components/home/service-category-card.tsx — полный редизайн стилей карточки

---

## Сессия 22 — 2026-03-07 — Fix: Hero mobile height and spacing

### Сделано:
- Hero min-height на мобильном: 70vh → 100svh (полный экран с учётом адресной строки)
- Контент Hero: добавлен pt-20 pb-12 на мобильном, md:pt-0 md:pb-0 на desktop
- `npm run build` — 0 ошибок

### Файлы изменены:
- components/home/hero-section.tsx — min-height + content padding

---

## Сессия 21 — 2026-03-07 — Fix: Hero mobile issues (logo, buttons)

### Сделано:
- Убран дублирующийся логотип: logo.svg уже содержит текст "Mori Norman", удалён лишний `<span>`, увеличен размер SVG (120x24)
- CTA кнопка: bg-astral-violet → bg-astral-violet/90 (убрана кислотная яркость на мобильном)
- Обе кнопки: padding px-6 py-2.5 на мобильном, sm:px-8 sm:py-3 на desktop (компактнее)
- Вторая кнопка: добавлен bg-celestial-gold/5 (лёгкий золотистый тинт)
- `npm run build` — 0 ошибок

### Файлы изменены:
- components/header.tsx — убран дубль логотипа, увеличен SVG
- components/home/hero-section.tsx — обновлены стили CTA кнопок

---

## Сессия 20 — 2026-03-07 — Hero: pure CSS cosmic background (aurora + starfield)

### Сделано:
- Удалён Aceternity AuroraBackground из Hero — заменён на чистый CSS
- Добавлены CSS-классы: .hero-aurora (animated purple blobs), .hero-aurora-accent (gold blob), .hero-stars (22 radial-gradient star dots с twinkle)
- @keyframes aurora-drift (20-30s, translate+scale+opacity) — плавное движение пятен
- @keyframes twinkle (4-5s) — мерцание звёзд
- Gradient orbs увеличены (500px/400px) с blur-[150px]/blur-[120px]
- prefers-reduced-motion: отключает все анимации aurora и звёзд
- CTA кнопки: rounded-full (без изменений — уже были)
- `npm run build` — 0 ошибок

### Файлы изменены:
- app/globals.css — заменён .starfield на .hero-aurora + .hero-aurora-accent + .hero-stars + @keyframes aurora-drift + twinkle
- components/home/hero-section.tsx — удалён импорт AuroraBackground, новые CSS-слои

---

## Сессия 19 — 2026-03-07 — Итерация 8.5: Service cards — grid 3+2, violet hover glow + lift

### Сделано:
- Grid карточек услуг: 6-колоночный layout (lg:grid-cols-6, col-span-2), нижний ряд из 2 карточек центрирован (col-start-2)
- Hover: фиолетовый glow (cosmic-violet/20) + lift (-translate-y-1), НЕ золотой как раньше
- Active: scale-[0.98] для мобильных
- border-radius: rounded-2xl (16px) вместо rounded-xl (12px)
- Border: cosmic-purple/20 вместо celestial-gold/20
- Bg: cosmic-card вместо midnight-navy
- Иконка: w-12 h-12 в контейнере rounded-xl bg-cosmic-purple/30 text-cosmic-violet
- Заголовок карточки: font-heading text-card-title text-cosmic-white
- Описание: text-small text-cosmic-white/70
- Добавлена стрелка-ссылка "Подробнее →" с group-hover:translate-x-1
- Заголовок секции: text-section text-cosmic-gold (fluid typography)
- i18n: добавлен ключ home.services.learn_more (ru/en/uk)
- focus-visible стили для accessibility
- `npm run build` — 0 ошибок

### Файлы изменены:
- components/home/service-category-card.tsx — полная переделка карточки
- components/home/service-categories-section.tsx — 6-col grid + обёртки col-span
- messages/ru.json, messages/en.json, messages/uk.json — добавлен learn_more

---

## Сессия 18 — 2026-03-07 — Итерация 8.4: Hero — Aurora Background + CSS starfield + gradient orbs + CTA rounded-full

### Сделано:
- Hero секция полностью переделана: убран Canvas-based Sparkles (Tier 3), добавлены CSS-only эффекты
- Aurora Background рефакторинг: компонент теперь работает как абсолютный фоновый слой (не обёртка)
- CSS starfield: radial-gradient звёзды с twinkle анимацией (4s alternate)
- Floating gradient orbs: два blur-элемента (cosmic-purple/15, astral-violet/10)
- CTA кнопки: rounded-full, primary — violet с glow hover, secondary — gold border
- Tagline (подзаголовок): uppercase tracking-[0.3em] gold текст над заголовком
- Typography: h1 использует text-hero (fluid clamp), font-heading
- Высота hero: min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] (тизер контента ниже fold)
- i18n: добавлен ключ home.hero.tagline во все 3 языка (ru/en/uk)
- prefers-reduced-motion: глобальное правило в globals.css отключает все анимации
- `npm run build` — 0 ошибок

### Файлы изменены:
- components/home/hero-section.tsx — полная переделка Hero
- components/ui/aceternity/aurora-background.tsx — рефакторинг в background layer
- app/globals.css — добавлен .starfield + @keyframes twinkle
- messages/ru.json, messages/en.json, messages/uk.json — добавлен tagline

---

## Сессия 17 — 2026-03-07 — Итерация 8.3: Spacing — увеличение padding секций на 20–30%

### Сделано:
- Все секции главной страницы: py-12 md:py-16 lg:py-20 → py-16 md:py-20 lg:py-30
- CTA секция: py-16 md:py-20 lg:py-24 → py-20 md:py-25 lg:py-40
- Container padding-x: добавлен sm:px-6 lg:px-8 ко всем секциям (кроме hero/testimonials)
- Grid gap: gap-6 → gap-4 md:gap-6 lg:gap-8 (services, blog)
- H2 margin-bottom: добавлен lg:mb-16 ко всем заголовкам секций
- Card padding: service cards p-6 → p-5 md:p-6 lg:p-8, blog cards p-5 → p-5 md:p-6 lg:p-8
- About grid gap: gap-8 md:gap-12 → gap-8 md:gap-12 lg:gap-16
- `npm run build` — 0 ошибок

### Файлы изменены:
- components/home/service-categories-section.tsx — section py, px, h2 mb, grid gap
- components/home/about-brief-section.tsx — section py, px, h2 mb, grid gap
- components/home/latest-posts-section.tsx — section py, px, h2 mb, grid gap
- components/home/testimonials-section.tsx — section py, h2 mb
- components/home/cta-section.tsx — section py, px (hero/cta spacing)
- components/home/service-category-card.tsx — card padding responsive
- components/home/blog-card.tsx — card content padding responsive

---

## Сессия 16 — 2026-03-07 — Итерация 8.2: Elevation surfaces + gold tokens + section bg alternation

### Сделано:
- Добавлены elevation surface цвета в @theme: surface-1 (#0E0E14), surface-2 (#121218), surface-3 (#16161E), surface-4 (#1A1A24)
- Добавлены gold gradient токены: cosmic-gold-light (#F5E6A3), cosmic-gold-dark (#B8860B)
- Добавлены animation tokens в @theme: animate-aurora, animate-float, animate-scroll, animate-gold-shimmer, animate-gold-glow
- Добавлены @keyframes: aurora, float, scroll, gold-shimmer, gold-glow-pulse
- Чередование фонов секций: About Brief -> bg-surface-1, Footer -> bg-surface-1
- `npm run build` — 0 ошибок

### Файлы изменены:
- app/globals.css — @theme tokens (surfaces, gold, animations) + @keyframes
- components/home/about-brief-section.tsx — bg-surface-1
- components/footer.tsx — bg-cosmic-black -> bg-surface-1

---

## Сессия 15 — 2026-03-07 — Итерация 8.1: Замена шрифтов + типографическая шкала

### Сделано:
- Заменён heading font: Cormorant_SC -> Cormorant Garamond (полная поддержка кириллицы)
- Заменён body font: Inter -> Commissioner (качественная кириллица)
- CSS-переменные: --font-sans -> --font-body, утилита font-sans -> font-body
- Добавлены fluid typography токены в @theme: text-hero, text-section, text-card-title, text-body, text-small
- Исправлены веса заголовков: font-bold (700) -> font-semibold (600) на всех h1 (6 файлов)
- prose-cosmic: h1/h2 weight 700->600, h3 weight 700->500
- font-heading утилита: weight 700->600
- Body: 17px, line-height 1.7, letter-spacing 0.02em, antialiased
- Удалена тестовая страница font-test
- `npm run build` — 0 ошибок

### Файлы изменены:
- lib/fonts.ts — Cormorant_Garamond + Commissioner
- app/[locale]/layout.tsx — headingFont/bodyFont переменные, font-body
- app/globals.css — @theme tokens, @layer base, font-heading utility, prose-cosmic weights
- components/home/hero-section.tsx — font-bold -> font-semibold
- components/category/category-hero.tsx — font-bold -> font-semibold
- components/about/about-hero.tsx — font-bold -> font-semibold
- app/[locale]/blog/[slug]/page.tsx — font-bold -> font-semibold
- app/[locale]/blog/page.tsx — font-bold -> font-semibold
- app/[locale]/[categorySlug]/[serviceSlug]/page.tsx — font-bold -> font-semibold
- app/[locale]/font-test/page.tsx — удалён

---

## Сессия 14 — 2026-03-07 — Итерация 7 (продолжение): Revalidation fix for About section

### Сделано:
- Исправлена проблема: при сохранении описания в блоке «Обо мне» через админку текст не обновлялся на главной странице
- Причина: revalidation hook для коллекции `pages` очищал кеш только для `/[locale]/about`, но НЕ для `/[locale]` (главная страница)
- Главная страница показывает секцию «Обо мне» (AboutBriefSection) из той же коллекции `pages` (slug: about) — без revalidation главной страницы кеш оставался старым
- Теперь при редактировании любой страницы в Pages обновляются и `/[locale]/about`, и `/[locale]` (главная)
- `npm run build` — 0 ошибок

### Файлы изменены:
- collections/hooks/revalidate.ts — добавлен `/[locale]` в пути revalidation для коллекции `pages`

### Проблемы:
- Нет — одна строка исправления

### Следующая сессия:
- Деплой на Vercel
- Заполнить контент на EN и UK через админку
- Финальная полировка UI

---

## Сессия 13 — 2026-03-07 — Итерация 7 (продолжение): Localization audit & fallback fix

### Сделано:
- Полный аудит мультиязычности Payload CMS: localization конфиг УЖЕ был настроен в payload.config.ts, переключатель языков в админке работает (появляется в edit view документа)
- Добавлен `fallbackLocale: 'ru'` для локалей EN и UK — теперь если контент на EN/UK не заполнен, показывается RU (ранее fallback был только глобальный)
- Локализованы поля `price` и `duration` в Services (содержат текст на естественном языке: "60 минут" vs "60 minutes")
- Создана и применена миграция БД: перенос price/duration из services в services_locales с сохранением существующих данных
- Обновлена документация docs/api.md: price/duration отмечены как localized, конфиг локалей обновлён
- `npm run build` — 0 ошибок (после clean rebuild с rm -rf .next)

### Файлы изменены:
- payload.config.ts — добавлен fallbackLocale: 'ru' для EN и UK локалей
- collections/Services.ts — добавлен localized: true для price и duration
- docs/api.md — обновлена таблица полей Services (price, duration → localized), обновлён конфиг локалей

### Файлы созданы:
- migrations/20260307_145738.ts — миграция: перенос price/duration в services_locales с копированием данных

### Проблемы:
- Build ломался после добавления localized: true к price/duration — БД ожидала старую структуру (колонки в services, а не services_locales) → решено миграцией
- Автосгенерированная миграция DROP'ала данные → исправлена вручную: добавлен UPDATE для копирования данных перед DROP

### Следующая сессия:
- Деплой на Vercel: подключить Blob Store, добавить BLOB_READ_WRITE_TOKEN
- Заполнить контент на EN и UK через админку (переключатель языков теперь работает)
- Финальная полировка UI

---

## Сессия 12 — 2026-03-07 — Итерация 7 (продолжение): About page layout fix

### Сделано:
- Исправлен layout страницы /about на десктопе: текст описания (rich text из CMS) теперь отображается СПРАВА от фото рядом с заголовком, а не снизу под фото
- AboutHero компонент теперь принимает children и рендерит их внутри правой колонки (под заголовком)
- Rich text контент передаётся как children в AboutHero вместо отдельной секции
- Gap между колонками увеличен до md:gap-16 (64px)
- Мобильный layout не затронут (фото сверху, текст снизу)
- `npm run build` — 0 ошибок

### Файлы изменены:
- components/about/about-hero.tsx — добавлен children prop, контент рендерится внутри правой колонки рядом с заголовком, gap увеличен
- app/[locale]/about/page.tsx — RichTextRenderer передаётся как children в AboutHero вместо отдельной секции

### Проблемы:
- Нет — простой layout fix

### Следующая сессия:
- Деплой на Vercel: подключить Blob Store, добавить BLOB_READ_WRITE_TOKEN
- Тестирование загрузки медиа через админку на Vercel
- Финальная полировка UI

---

## Сессия 11 — 2026-03-07 — Итерация 7 (продолжение): Vercel Blob + Admin UX

### Сделано:
- Подключён @payloadcms/storage-vercel-blob для загрузки медиа на Vercel (serverless-совместимость)
- Плагин подключается условно: только при наличии BLOB_READ_WRITE_TOKEN (локально — сохранение на диск как обычно)
- clientUploads: true — поддержка файлов >4.5MB
- Добавлены admin.description на русском для КАЖДОГО поля во ВСЕХ коллекциях (ServiceCategories, Services, Posts, PostCategories, Pages, Media, Testimonials)
- Добавлены admin.description на уровне коллекций
- slugField() теперь принимает опциональный параметр description
- Исправлены типы в cascade delete hooks: `null as unknown as string` → `null as unknown as number` (Payload 3 использует числовые ID)
- Исправлена типизация Lexical richText в seed.ts: direction/format теперь используют `as const`
- `npm run build` — 0 ошибок

### Файлы изменены:
- payload.config.ts — добавлен vercelBlobStorage плагин (условный)
- collections/hooks/slugField.ts — добавлен опциональный параметр description
- collections/ServiceCategories.ts — admin.description для всех полей + коллекции, fix type cast
- collections/Services.ts — admin.description для всех полей + коллекции
- collections/Posts.ts — admin.description для всех полей + коллекции
- collections/PostCategories.ts — admin.description для всех полей + коллекции, fix type cast
- collections/Pages.ts — admin.description для всех полей + коллекции
- collections/Media.ts — admin.description для всех полей + коллекции
- collections/Testimonials.ts — admin.description для всех полей + коллекции
- scripts/seed.ts — fix Lexical richText типизация (direction: as const)
- .env.example — добавлен BLOB_READ_WRITE_TOKEN

### Проблемы:
- Type error в PostCategories/ServiceCategories: cascade delete hooks использовали `null as unknown as string`, но Payload 3 с postgres использует числовые ID → исправлено на `number`
- Type error в seed.ts: Lexical richText `direction: 'ltr'` выводился как `string` вместо литерального типа → исправлено через `as const`

### Следующая сессия:
- Деплой на Vercel: подключить Blob Store, добавить BLOB_READ_WRITE_TOKEN
- Тестирование загрузки медиа через админку на Vercel
- Финальная полировка UI

---

## Сессия 10 — 2026-03-07 — Итерация 7: Исправление админ-панели и CMS

### Сделано:
- Исправлена критическая ошибка Payload CMS: админ-панель не загружалась ("Loading chunk failed" + "Cannot destructure property 'config'")
- Корневая причина: `app/(payload)/layout.tsx` был голым HTML-обёрткой без Payload `RootLayout` — контекст конфигурации не инициализировался
- Исправлен `@next/bundle-analyzer` version mismatch: ^16.1.6 (Next 16) → ^15.4.0 (Next 15)
- Добавлен slug sanitizer: пробелы → дефисы, lowercase, удаление спецсимволов — для всех 5 коллекций с slug-полями
- Исправлена ошибка удаления записей (FK constraint ломал транзакцию PostgreSQL): добавлены `beforeDelete` хуки на ServiceCategories и PostCategories для каскадного удаления/обнуления связей

### Файлы созданы:
- collections/hooks/slugField.ts — shared slug field с beforeValidate хуком (sanitize: trim, lowercase, spaces→dashes, remove specials)

### Файлы изменены:
- app/(payload)/layout.tsx — полная переработка: голый HTML → Payload RootLayout с config, importMap, serverFunction
- package.json — @next/bundle-analyzer ^16.1.6 → ^15.4.0
- collections/ServiceCategories.ts — slugField(), beforeDelete хук (каскадное удаление services, обнуление testimonials)
- collections/PostCategories.ts — slugField(), beforeDelete хук (обнуление category в posts)
- collections/Services.ts — slugField()
- collections/Posts.ts — slugField()
- collections/Pages.ts — slugField()

### Проблемы:
- `app/(payload)/layout.tsx` был сгенерирован как простой HTML layout вместо Payload RootLayout — это ломало весь admin UI (useConfig() → undefined)
- `@next/bundle-analyzer@16` в цепочке webpack config мог влиять на генерацию чанков
- Удаление ServiceCategory с привязанными Services вызывало FK constraint error → aborted transaction → каскадный отказ последующих запросов

### Следующая сессия:
- Итерация 7 (продолжение): Polish & deploy
- Проверить все CRUD операции в админ-панели
- Финальная полировка UI, deployment

---

## Сессия 9 — 2026-03-06 — Итерация 6: SEO и производительность

### Сделано:
- Создан `app/robots.ts` — динамический robots.txt, разрешает всё кроме /admin и /api, ссылка на sitemap
- Создан `app/sitemap.ts` — динамический sitemap.xml со всеми страницами × 3 локали, hreflang аннотации через alternates.languages, приоритеты и lastModified
- Проверены hreflang на всех страницах — были на всех кроме главной, добавлен generateMetadata на home page
- JSON-LD: добавлен WebSite schema на главную страницу, существующие BlogPosting/Person/ProfessionalService уже на месте
- Open Graph: добавлены og:title, og:description, og:url, og:locale, og:site_name на ВСЕ страницы (home, blog list, blog post, about, category, service)
- Blog post OG расширен: type: article, publishedTime, images
- About page OG: type: profile
- Базовый OG (siteName, locale) добавлен в layout.tsx как fallback
- next/image: проверено — sizes и priority уже корректно настроены на всех LCP-критичных изображениях
- next.config.ts: добавлены images.formats: ['image/avif', 'image/webp'] для современных форматов
- Установлен @next/bundle-analyzer, добавлен скрипт `npm run analyze`
- `npm run build` — 0 ошибок, sitemap.xml и robots.txt генерируются как static routes

### Файлы созданы:
- app/robots.ts — динамический robots.txt (disallow /admin, /api)
- app/sitemap.ts — динамический sitemap с Payload CMS запросами, hreflang, priorities

### Файлы изменены:
- lib/json-ld.ts — добавлен generateWebSiteJsonLd
- app/[locale]/page.tsx — добавлен generateMetadata (title, description, alternates, OG) + WebSite JSON-LD
- app/[locale]/layout.tsx — добавлен базовый openGraph в metadata (siteName, locale)
- app/[locale]/blog/page.tsx — добавлен openGraph в metadata
- app/[locale]/blog/[slug]/page.tsx — расширен openGraph (type: article, publishedTime, images)
- app/[locale]/about/page.tsx — добавлен openGraph (type: profile)
- app/[locale]/[categorySlug]/page.tsx — добавлен openGraph
- app/[locale]/[categorySlug]/[serviceSlug]/page.tsx — добавлен openGraph
- next.config.ts — images.formats + @next/bundle-analyzer
- package.json — добавлен скрипт analyze, devDep @next/bundle-analyzer
- CLAUDE.md — отмечена Iteration 6, добавлен analyze скрипт

### Проблемы:
- Нет — всё скомпилировалось с первого раза

### Следующая сессия:
- Итерация 7: Polish & deploy (финальная полировка, deployment)

---

## Сессия 8 — 2026-03-06 — Итерация 5.1: Улучшения блога и расширение seed

### Сделано:
- Исправлена ошибка запуска: повреждённый кеш .next (ENOENT page.js, missing vendor-chunks) — решено удалением .next
- Добавлены 2 новых поста в seed: "Энергетическая защита: как не терять силы" (support), "Развитие интуиции: практическое руководство" (education)
- Оба поста с полным rich text контентом на 3 языках (RU/EN/UK), по 5-6 секций каждый
- Убрана логика featured поста на странице блога — все посты рендерятся одинаковыми карточками BlogCard
- Изменён лимит постов на странице: 3 -> 6 (2 ряда по 3 на десктопе), пагинация при >6
- Сетка блога: desktop 3 колонки, tablet 2, mobile 1 (без изменений)
- Карточки: изображение сверху aspect-video (16/9), object-cover (без изменений)

### Файлы изменены:
- scripts/seed.ts — добавлены 2 новых поста с локализованным контентом (energy-protection-guide, intuition-development)
- app/[locale]/blog/page.tsx — убран импорт FeaturedBlogCard, убрана логика featured/gridPosts, limit 3->6, все посты в единой сетке
- CLAUDE.md — добавлен статус Iteration 5.1

### Проблемы:
- Повреждённый .next кеш после предыдущей сессии — решено `rm -rf .next`
- NVM не загружается в sandbox bash — не критично, node 22 уже в PATH

### Следующая сессия:
- Итерация 6: SEO & performance (sitemap, robots.txt, OG images, Core Web Vitals)

---

## Сессия 7 — 2026-03-06 — Итерация 5: Блог

### Сделано:
- Страница блога /[locale]/blog с фильтрацией по категориям, пагинацией (3 поста/стр), featured пост (span-2)
- Страница поста /[locale]/blog/[slug] с featured image, мета (дата, категория, время чтения), rich text, prev/next навигация, похожие посты
- Автоматический расчёт времени чтения из длины content (200 слов/мин), fallback на ручное значение из CMS
- Фильтр по категориям через search params (?category=slug&page=N), серверный рендеринг
- JSON-LD BlogPosting для каждого поста
- RSS фид /[locale]/blog/rss.xml для каждого языка
- ISR revalidate: 3600 для списка блога
- SSG через generateStaticParams для постов (3 поста × 3 локали = 9 страниц)
- hreflang alternates в generateMetadata для всех новых страниц
- i18n: расширен namespace blog на 3 языках
- `npm run build` — 0 ошибок

### Файлы созданы:
- lib/reading-time.ts — calculateReadingTime из Lexical content
- components/blog/category-filter.tsx — server, фильтр по категориям (pill-кнопки)
- components/blog/blog-pagination.tsx — server, пагинация prev/next
- components/blog/featured-blog-card.tsx — server, большая карточка featured поста (горизонтальная на desktop)
- components/blog/post-navigation.tsx — server, навигация prev/next между постами
- components/blog/related-posts.tsx — server, секция похожих постов (переиспользует BlogCard)
- app/[locale]/blog/[slug]/page.tsx — страница поста (server component)
- app/[locale]/blog/rss.xml/route.ts — RSS route handler

### Файлы изменены:
- app/[locale]/blog/page.tsx — полная переработка: placeholder → список с фильтрацией и пагинацией
- lib/json-ld.ts — добавлен generateBlogPostingJsonLd
- messages/ru.json — расширен blog namespace (all_categories, no_posts, prev/next_post, related_posts, back_to_blog, page_of, read_more, min_read)
- messages/en.json — то же
- messages/uk.json — то же
- CLAUDE.md — отмечена Iteration 5

### Проблемы:
- @typescript-eslint/no-explicit-any для Payload docs.map — решено через eslint-disable блоки (как в category page)

### Следующая сессия:
- Итерация 6: SEO & performance (sitemap, robots.txt, OG images, Core Web Vitals)

---

## Сессия 6 — 2026-03-06 — Итерация 4: Страницы разделов, услуг и "Обо мне"

### Сделано:
- Исправлен мисматч nav slugs: guidance→support, regression→regress (теперь совпадают с CMS)
- Создана страница раздела /[locale]/[categorySlug] с Hero, сеткой карточек услуг и CTA
- Создана страница услуги /[locale]/[categorySlug]/[serviceSlug] с rich text, info block (цена/длительность/формат), FAQ аккордеон, CTA
- Создана страница "Обо мне" /[locale]/about с hero, rich text контент, timeline, CTA
- Создана placeholder-страница /[locale]/blog (предотвращает конфликт с [categorySlug])
- Rich text renderer — обёртка над @payloadcms/richtext-lexical/react с .prose-cosmic стилями
- FAQ аккордеон с Framer Motion AnimatePresence (плавное раскрытие)
- Timeline "Мой путь" с placeholder данными, вертикальная линия, stagger-анимация
- JSON-LD: Person для /about, ProfessionalService для услуг
- generateStaticParams для SSG: 5 категорий × 3 локали = 15, ~10 услуг × 3 = 30, about × 3, blog × 3
- hreflang alternates в generateMetadata всех новых страниц
- i18n: добавлены namespaces category, service, about, blog на 3 языках
- `npm run build` — 0 ошибок

### Файлы созданы:
- app/[locale]/[categorySlug]/page.tsx — страница раздела (server component)
- app/[locale]/[categorySlug]/[serviceSlug]/page.tsx — страница услуги (server component)
- app/[locale]/about/page.tsx — страница "Обо мне" (server component)
- app/[locale]/blog/page.tsx — placeholder блога (server component)
- components/category/category-hero.tsx — client, hero раздела с Framer Motion + icon
- components/category/service-card.tsx — server, карточка услуги с ценой и длительностью
- components/service/service-info-block.tsx — server, 3 карточки: цена/длительность/формат
- components/service/service-faq.tsx — client, FAQ аккордеон с AnimatePresence
- components/service/service-cta.tsx — server, CTA "Записаться на {title}"
- components/about/about-hero.tsx — client, hero с фото и fade-in
- components/about/about-timeline.tsx — client, вертикальный timeline с placeholder данными
- components/rich-text-renderer.tsx — обёртка Payload RichText с cosmic стилями
- lib/json-ld.ts — генераторы Person и ProfessionalService JSON-LD

### Файлы изменены:
- lib/navigation.ts — guidance→support, regression→regress
- messages/ru.json — исправлены nav ключи, добавлены category/service/about/blog namespaces
- messages/en.json — то же
- messages/uk.json — то же
- app/globals.css — добавлены .prose-cosmic стили

### Проблемы:
- @ts-expect-error для async server components не нужен в Next.js 15.4 — убраны

### Следующая сессия:
- Итерация 5: Блог (список постов, фильтр по категориям, пагинация, страница поста)

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
