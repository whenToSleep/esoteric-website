# Design Specification — Cosmic Night Theme

> Этот файл — единственный источник правды для визуального дизайна.
> Claude Code должен ссылаться на него при создании любых UI-компонентов.
>
> **Обновлён по результатам дизайн-аудита (10 исследований).**
> Изменения помечены `⚡ ОБНОВЛЕНО` для отслеживания.

---

## Концепция

Тёмная космическая тема с золотыми акцентами. Профессионально, мистично, но не перегруженно.
Чистые лейауты, космические элементы — только как акцент, не как основа.

**Референсы:**
- CHANI — chaninicholas.com (editorial, монохром + gold quarantine)
- Co-Star — costarastrology.com (радикальный минимализм, negative space)
- Sanctuary — sanctuaryworld.co (deep navy marketplace, design system)
- The Pattern — thepattern.com (extreme tracking, cool-tone accents)

**Ключевые принципы:**
- Тёмный фон, светлый текст, золотые акценты
- Минимализм с эзотерическими деталями
- Читаемость важнее декоративности
- Mobile-first, responsive
- ⚡ **Dark-on-dark differentiation** — секции различаются elevation (+4–8 lightness), НЕ бордерами
- ⚡ **Generous breathing room** — spacing на тёмном фоне на 20–30% больше, чем на светлом
- ⚡ **Progressive enhancement of motion** — CSS-анимации (aurora, twinkle) на всех устройствах; JS-анимации отключаются на мобильном

---

## Цветовая палитра

### Основные цвета

```
--cosmic-black:    #0A0A0F    /* Основной фон body */
--midnight-navy:   #0D1137    /* Фон карточек, секций, навигации */
--mystic-purple:   #2D1B69    /* Вторичный фон, градиенты */
--astral-violet:   #7C3AED    /* Интерактивные элементы, hover, ссылки */
--celestial-gold:  #D4AF37    /* CTA кнопки, заголовки секций, акценты */
--star-white:      #F0EAD6    /* Основной текст */
--silver-mist:     #C0C0D0    /* Вторичный текст, подписи */
```

### ⚡ Система elevation (НОВОЕ)

Для создания глубины между секциями — вместо бордеров и теней, которые не работают на near-black:

```
--surface-1:  #0E0E14    /* Чередование секций (Δ +4 lightness) */
--surface-2:  #121218    /* Поверхность карточек (альтернатива midnight-navy) */
--surface-3:  #16161E    /* Поднятые карточки, модалы */
--surface-4:  #1A1A24    /* Active/hover состояния */
```

### ⚡ Золотой градиент — дополнительные точки (НОВОЕ)

```
--gold-light:  #F5E6A3    /* Светлая точка shimmer-градиента */
--gold-dark:   #B8860B    /* Тёмная точка shimmer-градиента */
```

### Применение

| Токен | HEX | Где использовать |
|-------|-----|-----------------|
| `cosmic-black` | `#0A0A0F` | Основной фон `body`, overlay мобильного меню |
| `midnight-navy` | `#0D1137` | Фон карточек, навигации, отзывов |
| `mystic-purple` | `#2D1B69` | Вторичный фон, градиенты, hover-состояния |
| `astral-violet` | `#7C3AED` | Интерактивные элементы, hover ссылок, бэйджи категорий |
| `celestial-gold` | `#D4AF37` | CTA кнопки, заголовки секций, лого, иконки — **макс 10–15% площади** |
| `star-white` | `#F0EAD6` | Основной текст, заголовки. Контраст на #0A0A0F: **~16.4:1** (WCAG AAA) |
| `silver-mist` | `#C0C0D0` | Вторичный текст, даты, подписи, placeholder |
| ⚡ `surface-1` | `#0E0E14` | Чередование секций (отличие от base: +4 lightness) |
| ⚡ `surface-2` | `#121218` | Альтернативный фон карточек |
| ⚡ `surface-3` | `#16161E` | Elevated карточки, модалы |
| ⚡ `surface-4` | `#1A1A24` | Active/hover фон |

### ⚡ Правила использования цвета (НОВОЕ)

- **Золотой** (`celestial-gold`): не более 10–15% площади экрана. CTA кнопки, заголовки секций, активный язык, иконки в карточках. НЕ для больших фонов.
- **Текст вторичный**: использовать `star-white` с opacity 70–80% (`text-cosmic-white/70`) вместо отдельного серого. Сохраняет тёплый тон.
- **Никогда** не использовать чистый `#FFFFFF` для текста — слишком резкий контраст (21:1), вызывает eyestrain.
- **Секции**: чередовать фон между `cosmic-black` (#0A0A0F) и `surface-1` (#0E0E14) для визуального разделения без бордеров.

### Прозрачности (часто используемые)

```css
rgba(212, 175, 55, 0.2)    /* celestial-gold/20 — border карточек, разделители */
rgba(212, 175, 55, 0.15)   /* celestial-gold/15 — glow-эффект при hover */
rgba(124, 58, 237, 0.1)    /* astral-violet/10 — фон бэйджей категорий */
rgba(13, 17, 55, 0.8)      /* midnight-navy/80 — фон навигации с blur */
```

### ⚡ Border opacity — калибровка для near-black (НОВОЕ)

На #0A0A0F эффективный диапазон очень узкий:

| Opacity | Tailwind | Эффект |
|---------|----------|--------|
| 6% | `ring-1 ring-white/[0.06]` | Еле видимый, шёпот края |
| 10% | `ring-1 ring-white/10` | Sweet spot для карточек |
| 15% | `border border-white/[0.15]` | Чёткое разделение, интерактивные элементы |
| 20% | `border border-white/20` | Максимум — больше ощущается тяжело |

Для цветных: `ring-1 ring-purple-400/20` или `border border-cosmic-gold/[0.12]`.

### Градиенты

```css
/* ⚡ Фон карточек — вертикальный (ОБНОВЛЕНО) */
background: linear-gradient(180deg, #0D1137, #0A0A1E);

/* ⚡ Космическая атмосфера секции — radial overlay (НОВОЕ) */
background:
  radial-gradient(ellipse at 20% 50%, rgba(45, 27, 105, 0.12) 0%, transparent 50%),
  radial-gradient(ellipse at 80% 30%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
  #0A0A0F;

/* Градиент для CTA-секций */
background: linear-gradient(135deg, var(--mystic-purple) 0%, var(--midnight-navy) 100%);

/* ⚡ Золотой shimmer-градиент для текста (НОВОЕ) */
background: linear-gradient(90deg, #D4AF37 0%, #F5E6A3 25%, #B8860B 50%, #F5E6A3 75%, #D4AF37 100%);
background-size: 200% 100%;
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
animation: gold-shimmer 3s linear infinite;
```

---

## Типографика

### ⚡ Шрифты (КРИТИЧЕСКОЕ ИЗМЕНЕНИЕ)

> **Cinzel НЕ поддерживает кириллицу** (0 кириллических глифов).
> **Inter** имеет плохое качество кириллицы (reverse contrast в Кк, плохая Лл — type.today).
> Оба шрифта заменены.

| Роль | Шрифт | Тип | Weights | Кириллица | Подмножества |
|------|-------|-----|---------|-----------|-------------|
| ⚡ Заголовки | **Cormorant Garamond** | Display serif | 400, 500, 600, 700 | Отличная | `cyrillic`, `latin` |
| ⚡ Основной текст | **Commissioner** | Humanist sans-serif | 300, 400, 500 | Высокая (CSTM) | `cyrillic`, `latin` |

**Почему Cormorant Garamond:** высококонтрастный display Garamond с тонкими засечками — мистический и неземной. Ближайший кириллический аналог Cinzel. Кириллица прошла ревью Алексея Ваняшина.

**Почему Commissioner:** гуманистический sans-serif с ренессансными пропорциями. Лучшее качество кириллицы среди sans-serif на Google Fonts. Не имеет курсива — это плюс для тёмной темы (курсив ухудшает читаемость на тёмном фоне).

**Запасная пара:** Playfair Display + IBM Plex Sans (editorial luxury стиль).

### ⚡ Подключение в Next.js (ОБНОВЛЕНО)

```typescript
// lib/fonts.ts
import { Cormorant_Garamond, Commissioner } from 'next/font/google';

export const headingFont = Cormorant_Garamond({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-heading',
});

export const bodyFont = Commissioner({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-body',
});
```

```tsx
// app/layout.tsx (root layout)
import { headingFont, bodyFont } from '@/lib/fonts';

<html className={`${headingFont.variable} ${bodyFont.variable}`}>
  <body className="font-body bg-cosmic-bg text-cosmic-white">
```

### ⚡ Размеры и высота строки (ОБНОВЛЕНО для тёмной темы)

> На тёмных фонах текст подвержен **halation** — светлые пиксели расплываются, текст выглядит жирнее.
> Компенсация: уменьшить weight на 1 шаг, увеличить line-height, добавить letter-spacing.
> **Cormorant Garamond** использовать ТОЛЬКО на 24px+ (тонкие штрихи исчезают на мелких размерах).

| Элемент | Размер | Шрифт | line-height | font-weight | letter-spacing |
|---------|--------|-------|------------|-------------|----------------|
| H1 (Hero) | `clamp(2.5rem, 1.5rem + 3.5vw, 5rem)` | Cormorant Garamond | 1.1 | 600 | 0.02em |
| H2 (Секция) | `clamp(2rem, 1.4rem + 2vw, 3.5rem)` | Cormorant Garamond | 1.2 | 600 | 0.015em |
| H3 (Карточка) | `clamp(1.25rem, 1.1rem + 0.5vw, 1.75rem)` | Cormorant Garamond | 1.3 | 500 | 0.015em |
| Body | 1.0625rem (17px) | Commissioner | 1.7 | 400 | 0.02em |
| Small / caption | 0.9375rem (15px) | Commissioner | 1.6 | 400 | 0.03em |
| Badge / label | 12px | Commissioner | 1.4 | 500 | 0.02em |

**Fluid typography tokens для Tailwind v4 `@theme`:**

```css
--text-hero: clamp(2.5rem, 1.5rem + 3.5vw, 5rem);
--text-hero--line-height: 1.1;
--text-hero--letter-spacing: 0.02em;
--text-hero--font-weight: 600;

--text-section: clamp(2rem, 1.4rem + 2vw, 3.5rem);
--text-section--line-height: 1.2;
--text-section--letter-spacing: 0.015em;
--text-section--font-weight: 600;

--text-card-title: clamp(1.25rem, 1.1rem + 0.5vw, 1.75rem);
--text-card-title--line-height: 1.3;
--text-card-title--font-weight: 500;

--text-body: 1.0625rem;
--text-body--line-height: 1.7;

--text-small: 0.9375rem;
--text-small--line-height: 1.6;
```

### ⚡ Обязательный CSS для тёмной темы (НОВОЕ)

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Это **критически важно** — на macOS subpixel antialiasing делает светлый текст на тёмном фоне толще. Grayscale antialiasing компенсирует halation.

**Дополнительные правила:**
- `max-width: 65ch` для текстовых блоков (About, блог-посты)
- Для акцента — менять weight или цвет (`cosmic-gold`), НЕ курсив
- Для вторичного текста — `cosmic-white/70`, не отдельный серый
- Никогда weight < 400 для текста менее 16px на тёмном фоне

### ⚡ Gold shimmer и glow эффекты (НОВОЕ)

**Shimmer (переливающийся градиент):**
```css
.gold-shimmer {
  background: linear-gradient(90deg, #D4AF37 0%, #F5E6A3 25%, #B8860B 50%, #F5E6A3 75%, #D4AF37 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gold-shimmer 3s linear infinite;
}
@keyframes gold-shimmer {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}
```

**Glow (пульсирующее свечение):**
```css
.gold-glow {
  color: #F0EAD6;
  animation: gold-glow-pulse 4s ease-in-out infinite;
}
@keyframes gold-glow-pulse {
  0%, 100% { text-shadow: 0 0 4px rgba(212,175,55,0.3), 0 0 8px rgba(212,175,55,0.2), 0 0 16px rgba(212,175,55,0.1); }
  50% { text-shadow: 0 0 8px rgba(212,175,55,0.6), 0 0 16px rgba(212,175,55,0.4), 0 0 32px rgba(212,175,55,0.2); }
}
```

**Reduced motion fallback:**
```css
@media (prefers-reduced-motion: reduce) {
  .gold-shimmer, .gold-glow { animation: none !important; }
  .gold-glow { text-shadow: 0 0 6px rgba(212,175,55,0.3), 0 0 12px rgba(212,175,55,0.15); }
}
```

### Цвета текста

| Роль | Цвет | Примеры |
|------|------|---------|
| Основной | `star-white` `#F0EAD6` | Заголовки, параграфы, меню |
| Вторичный | ⚡ `star-white/70` | Подзаголовки, даты, мета-текст (тёплый тон, не серый) |
| Акцент | `celestial-gold` `#D4AF37` | Лого, названия секций, цены |
| Ссылки | `astral-violet` `#7C3AED` | Ссылки в тексте, hover-состояния |

---

## Компоненты

### Header (навигация)

```
Позиция:    fixed, top: 0, width: 100%, z-index: 50
Фон:        midnight-navy/80 + backdrop-blur-xl
Высота:     64–72px
```

**Структура:**
```
┌──────────────────────────────────────────────────────────┐
│  [Лого Cormorant gold]    [Меню по центру]    [RU/EN/UK] │
└──────────────────────────────────────────────────────────┘
```

- **Лого:** ⚡ Cormorant Garamond, `celestial-gold`, слева
- **Меню:** Главная, Таро, Ритуалистика, Сопровождение, Обучение, Регресс, Блог, Обо мне
- **Языковой переключатель:** три кнопки RU / EN / UK, активная подсвечена `celestial-gold`
- ⚡ **Мобильное меню:** hamburger → **полноэкранное overlay** (не drawer!), `clipPath: circle()` через Framer Motion `AnimatePresence`. Ссылки по центру, `font-heading text-2xl`, staggered появление. Language switcher внизу overlay. Tap target: `min-h-12 min-w-12`.

### Footer

```
Фон:        ⚡ surface-1 (#0E0E14) — чуть светлее body
Разделитель: border-top 1px white/[0.06]
Колонки:    ⚡ 4 (desktop), 2 (tablet), 1 (mobile)
```

**Структура:**
```
┌──────────┬──────────┬──────────┬──────────┐
│  Бренд    │ Навигация │ Услуги    │ Контакты  │
└──────────┴──────────┴──────────┴──────────┘
─────────── border-t border-white/[0.06] ────────
              © Копирайт text-white/40 14px
```

⚡ Spacing: `py-12 md:py-16 lg:py-20`, gap: `gap-8 lg:gap-12`.

### Hero-секция (главная)

```
⚡ Фон:     Aceternity Aurora Background (CSS-only, Tier 1) + Spotlight (one-shot SVG)
⚡ Высота:  min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh]  (НЕ 100vh — тизер контента ниже)
Контент:    по центру, max-w-4xl
```

- ⚡ Подзаголовок: Commissioner, `tracking-[0.3em] uppercase`, `celestial-gold`, 15px
- ⚡ Заголовок: Cormorant Garamond, `text-hero` fluid, `star-white`, weight 600
- ⚡ Описание: Commissioner, `text-body`, `star-white/80`, max-w-2xl
- ⚡ **CSS Starfield** на фоне — radial-gradient звёзды (НЕ Canvas, НЕ Sparkles)
- ⚡ **Floating gradient orbs** — 2–3 размытых круга с `blur-[128px]` (`cosmic-purple/15`, `cosmic-violet/10`)
- **2 CTA кнопки:**
  - ⚡ Primary: `rounded-full bg-cosmic-violet text-cosmic-white px-8 py-3 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)]`
  - ⚡ Secondary: `rounded-full border border-cosmic-gold/40 text-cosmic-gold hover:bg-cosmic-gold/10`
- **`prefers-reduced-motion`:** отключить Aurora, оставить статичный gradient

### ⚡ Карточки услуг (ОБНОВЛЕНО)

```css
/* Базовое состояние */
background:    var(--midnight-navy);  /* или linear-gradient(180deg, #0D1137, #0A0A1E) */
border:        1px solid rgba(45, 27, 105, 0.2);  /* cosmic-purple/20 */
border-radius: 16px;  /* rounded-2xl */
padding:       20px (mobile) / 24px (md) / 32px (lg);  /* p-5 md:p-6 lg:p-8 */
transition:    all 0.3s ease;

/* Hover (desktop only — Tailwind v4 auto-wraps in @media (hover: hover)) */
border-color:  rgba(124, 58, 237, 0.4);  /* cosmic-violet/40 */
box-shadow:    0 0 25px -5px rgba(124, 58, 237, 0.2);  /* фиолетовый glow, не золотой */
transform:     translateY(-4px);

/* Active (mobile) */
transform:     scale(0.98);
```

**Содержимое карточки:**
- Иконка: `w-12 h-12 rounded-xl bg-cosmic-purple/30 text-cosmic-violet`
- ⚡ Заголовок: Cormorant Garamond, `text-card-title`, `star-white`
- ⚡ Описание: Commissioner, `text-small`, `star-white/70`, leading-relaxed
- Ссылка: `text-small text-cosmic-violet group-hover:translate-x-1`

**⚡ Grid (ОБНОВЛЕНО — 6 колонок для 3+2):**
```
Desktop (lg):  grid-cols-6, каждая карта col-span-2
               Ряд 1: 3 карты
               Ряд 2: 2 карты (col-start-2 — центрированы)
Tablet (sm):   grid-cols-2
Mobile:        grid-cols-1
Gap:           gap-4 md:gap-6 lg:gap-8
```

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
  <div class="lg:col-span-2">Card 1</div>
  <div class="lg:col-span-2">Card 2</div>
  <div class="lg:col-span-2">Card 3</div>
  <div class="lg:col-span-2 lg:col-start-2">Card 4</div>
  <div class="lg:col-span-2">Card 5</div>
</div>
```

### Карточки блога

```
border-radius: 16px   /* rounded-2xl */
overflow:      hidden
background:    midnight-navy
border:        1px solid cosmic-purple/15
```

**Содержимое:**
- Featured image: сверху, `aspect-video` (16:9), hover: `group-hover:scale-105 transition-transform duration-700`
- ⚡ Gradient overlay на featured: `from-cosmic-bg/90 via-cosmic-bg/40 to-transparent`
- Бэйдж категории: фон `astral-violet/10`, текст `astral-violet`, 12px, border-radius 6px
- Дата: `star-white/60`, Commissioner, 14px
- ⚡ Заголовок: Cormorant Garamond, `text-card-title`, `star-white`, line-clamp-2
- Excerpt: Commissioner, `text-small`, `star-white/60`, line-clamp-3

**Featured пост:**
- `md:col-span-2`, aspect ratio: `aspect-video lg:aspect-[21/9]`

**⚡ БЕЗ hover-анимаций** кроме Tailwind border (`hover:border-cosmic-violet/40`) — визуальный отдых после анимированных карточек услуг.

### Карточки отзывов

```
⚡ Desktop:   Aceternity Infinite Moving Cards (marquee), speed="slow" (80s), pauseOnHover
⚡ Mobile:    Embla Carousel (swipe), loop: true, align: "center", flex-[0_0_85%]
```

- Фон карточки: `linear-gradient(180deg, #0D1137, #0A0A1E)`
- Ширина: `w-[350px] md:w-[450px]`
- Border: `border border-cosmic-purple/20`
- ⚡ Имя клиента: Cormorant Garamond, 16px, `celestial-gold`
- ⚡ Текст отзыва: Commissioner, `text-body`, `star-white/80`, italic
- Инициал: `w-10 h-10 rounded-full bg-cosmic-purple/40 text-cosmic-gold font-heading`
- Padding: `px-8 py-6`
- Border-radius: 16px (`rounded-2xl`)

### Кнопки

**⚡ Primary CTA (ОБНОВЛЕНО — rounded-full):**
```css
background:    var(--astral-violet);  /* Фиолетовый вместо золотого */
color:         var(--star-white);
font-family:   Commissioner;
font-weight:   500;
font-size:     16px;
padding:       12px 32px;
border-radius: 9999px;  /* rounded-full */
min-height:    48px;    /* tap target */
transition:    all 0.3s ease;

/* Hover */
box-shadow:    0 0 30px -5px rgba(124, 58, 237, 0.5);
```

**Secondary:**
```css
background:    transparent;
color:         var(--celestial-gold);
border:        1px solid rgba(212, 175, 55, 0.4);
border-radius: 9999px;
min-height:    48px;

/* Hover */
background:    rgba(212, 175, 55, 0.1);
```

**Ghost (для навигации):**
```css
background:    transparent;
color:         var(--star-white);
/* Hover */
color:         var(--celestial-gold);
```

### ⚡ Разделители секций (НОВОЕ)

| Переход | Тип разделителя |
|---------|----------------|
| Hero → Услуги | Gradient fade (bg → bg) |
| Услуги → Обо мне | Золотая линия: `h-px w-20 bg-gradient-to-r from-transparent via-cosmic-gold/50 to-transparent` |
| Обо мне → Блог | Gradient fade (alternating bg) |
| Блог → Отзывы | SVG constellation dots (точки + линии) |
| Отзывы → CTA | Нет — CTA как продолжение |
| CTA → Footer | `border-t border-cosmic-purple/15` |

**Gradient Divider:**
```css
height: 64px (md: 80px);
background: linear-gradient(to bottom, #0A0A0F, #0E0E14);
```

**Celestial Divider (золотая линия):**
```css
height: 1px; width: 80px; margin: 32px auto;
background: linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent);
```

### Аккордеон (FAQ)

```
border:        1px solid cosmic-purple/20
border-radius: 12px
background:    midnight-navy
```

- ⚡ Заголовок: Commissioner, 16px, `star-white`, font-weight 500
- ⚡ Контент: Commissioner, 15–17px, `star-white/70`
- Иконка раскрытия: `celestial-gold`
- Анимация: плавное раскрытие (Framer Motion)

### Бэйджи

```css
/* Категория блога */
background:    rgba(124, 58, 237, 0.1);
color:         var(--astral-violet);
font-size:     12px;
font-weight:   500;
padding:       4px 12px;
border-radius: 6px;

/* Статус услуги */
background:    rgba(212, 175, 55, 0.1);
color:         var(--celestial-gold);
```

---

## Страницы — структура и лейаут

### Главная ( `/` )

```
⚡ Hero (70–90vh)                     bg: cosmic-bg + Aurora + Spotlight
    ↓ gradient fade
⚡ 5 карточек разделов (grid 6-col 3+2) bg: cosmic-bg
    ↓ celestial gold line
Обо мне кратко (фото + текст)          bg: surface-1
    ↓ gradient fade
Последние 3 поста блога (grid)          bg: cosmic-bg
    ↓ constellation dots
Отзывы (marquee desktop / embla mobile) bg: cosmic-bg
    ↓ (нет разделителя)
CTA секция                              bg: gradient mystic-purple → midnight-navy
    ↓ border-t
Footer                                  bg: surface-1
```

### Страница раздела ( `/[categorySlug]` )

```
Hero с названием раздела + описание из CMS
    ↓
Сетка карточек услуг (grid 3 col)
    ↓
CTA
    ↓
Footer
```

### Страница услуги ( `/[categorySlug]/[serviceSlug]` )

```
Полное описание услуги (richText, max-w-3xl)
    ↓
Цена + формат + длительность
    ↓
FAQ (аккордеон)
    ↓
CTA «Записаться»
    ↓
Footer
```

### Блог ( `/blog` )

```
Featured пост (md:col-span-2, aspect-[21/9])
    ↓
Фильтр по категориям (кнопки/табы)
    ↓
Сетка постов (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
    ↓
Пагинация
    ↓
Footer
```

### Пост блога ( `/blog/[slug]` )

```
single-column, max-w-3xl (65ch)
    ↓
Featured image (full-width внутри колонки)
    ↓
Заголовок + мета (дата, категория, время чтения)
    ↓
Rich text контент (Lexical render)
    ↓
Навигация prev / next
    ↓
Похожие посты (3 карточки)
    ↓
Footer
```

### Обо мне ( `/about` )

```
⚡ Фото + текст (чередуются, ScrollReveal left/right)
    ↓
⚡ Tracing Beam вдоль текста (desktop only, hidden lg:block)
    ↓
Timeline пути (вертикальная линия + события)
    ↓
Сертификаты / обучение
    ↓
CTA
    ↓
Footer
```

---

## ⚡ Анимации (ПОЛНОСТЬЮ ОБНОВЛЕНО)

### Библиотеки

- **Motion** (бывший Framer Motion) `motion/react` — кастомные анимации
- **Aceternity UI** — готовые компоненты (copy-paste, не npm)
- **Embla Carousel** (~6kb) — мобильные swipe-отзывы

### ⚡ Aceternity UI — Performance Tiers

| Тир | Компоненты | Технология | Статус |
|-----|-----------|------------|--------|
| 🟢 Tier 1 (safe) | Aurora Background, Meteor Effect, Spotlight, Tracing Beam, Infinite Moving Cards | CSS / one-shot SVG | ✅ Использовать |
| 🟡 Tier 2 (caution) | Lamp Effect, 3D Card, Text Generate, Typewriter Smooth | Framer Motion one-shot | ⚠️ Max 1 на экране |
| 🔴 Tier 3 (heavy) | Background Beams, Sparkles, Wavy Background, Glowing Stars | Canvas / 200+ DOM | ❌ НЕ использовать |

### Размещение по секциям

| Секция | Компонент | Настройки |
|--------|-----------|-----------|
| Hero | Aurora Background + Spotlight | CSS keyframes 30s + one-shot 2s SVG |
| Hero stars | CSS radial-gradient starfield | Нет Canvas/JS — чистый CSS |
| Карточки услуг | Meteor Effect | `number={8}` per card, pure CSS |
| Обо мне | Tracing Beam | `hidden lg:block`, scroll-driven |
| Блог | — | Только Tailwind hover |
| Отзывы (desktop) | Infinite Moving Cards | `speed="slow"` (80s), `pauseOnHover` |
| Отзывы (mobile) | Embla Carousel | `loop: true`, `align: "center"` |
| CTA | Typewriter Smooth | Single width animation |

**Правило: максимум 3 анимированных компонента одновременно видимых на экране.**

### Framer Motion компоненты

| Компонент | Путь | Применение |
|-----------|------|-----------|
| `ScrollReveal` | `components/animations/` | Секции, заголовки, fade-in/slide-up |
| `StaggerContainer` + `StaggerItem` | `components/animations/` | Сетки карточек — stagger 0.08s |
| `GlowCard` | `components/animations/` | Карточки услуг — cursor glow + lift |
| `ParallaxLayer` | `components/animations/` | Декоративные звёзды, speed 0.2–0.5 |

### Mobile — что оставить, что убрать

| Анимация | Mobile | Причина |
|----------|--------|---------|
| Aurora Background | ✅ (цикл 30s) | CSS-only, GPU |
| CSS Starfield | ✅ | Мизерная стоимость |
| Scroll fade-ins | ✅ (opacity only) | Упрощённые, 200–300ms |
| Meteor Effect | ✅ | CSS-only |
| Card hover glow | ❌ → `active:scale-[0.98]` | Нет hover на touch |
| Infinite marquee | ❌ → Embla Carousel | Swipe лучше |
| Tracing Beam | ❌ | Скрыт (`hidden lg:block`) |
| Parallax | ❌ на < 768px | Конфликт с touch scroll |
| Floating orbs | ✅ (уменьшить 3→1) | Убрать лишние |

### Accessibility: `prefers-reduced-motion`

**Уровень 1 — глобальный (app-level):**
```tsx
<MotionConfig reducedMotion="user">
  {children}
</MotionConfig>
```

**Уровень 2 — CSS-анимации:**
```html
<div class="motion-safe:animate-aurora motion-reduce:bg-gradient-to-br motion-reduce:from-cosmic-purple/20 motion-reduce:to-cosmic-bg" />
<ul class="motion-reduce:[animation-play-state:paused]">  <!-- marquee -->
```

**Уровень 3 — глобальный CSS:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### ⚡ LazyMotion для бандла (НОВОЕ)

Framer Motion ~34 KB → ~4.6 KB с `LazyMotion`:

```tsx
// app/providers.tsx
import { LazyMotion, MotionConfig } from "motion/react";
const loadFeatures = () => import("../lib/motion-features").then(r => r.default);

export function Providers({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}

// lib/motion-features.ts
import { domAnimation } from "motion/react";
export default domAnimation;
```

В компонентах: `import * as m from "motion/react-m"` → `<m.div>` вместо `<motion.div>`.

---

## Responsive Breakpoints

```css
/* Tailwind v4 defaults */
sm:   640px     /* Mobile landscape */
md:   768px     /* Tablet */
lg:   1024px    /* Desktop */
xl:   1280px    /* Wide desktop */
2xl:  1536px    /* Ultra-wide */
```

### ⚡ Tailwind v4 — важные отличия от v3

| Concept | v3 | v4 |
|---------|----|----|
| Gradient direction | `bg-gradient-to-r` | **`bg-linear-to-r`** |
| Color opacity | `bg-opacity-50` | **`bg-white/50`** (modifier) |
| Shadow | `shadow-sm` | **`shadow-xs`** |
| Ring default | `ring` (3px) | **`ring-3`** (explicit) |
| Border radius | `rounded` | **`rounded-sm`** |
| Spacing | фиксированные stops | **любое целое**: `py-15`, `gap-7`, `mt-18` |
| Hover on touch | applies on touch | **auto-wrapped** in `@media (hover: hover)` |

### Адаптация по компонентам

| Компонент | Mobile (<768) | Tablet (768–1024) | Desktop (>1024) |
|-----------|--------------|-------------------|-----------------|
| Карточки услуг | 1 col | 2 col | ⚡ 6-col (3+2 centered) |
| Карточки блога | 1 col | 2 col (featured span-2) | 3 col (featured span-2) |
| Footer | 1 col stacked | 2 col | ⚡ 4 col |
| Навигация | ⚡ Fullscreen overlay | Fullscreen overlay | Горизонтальное меню |
| Hero заголовок | clamp auto | clamp auto | clamp auto |
| Отзывы | ⚡ Embla Carousel (swipe) | Embla Carousel | Infinite marquee |

---

## ⚡ Spacing (ОБНОВЛЕНО — увеличено 20–30% для тёмной темы)

> Тёмные фоны создают оптическую иллюзию сжатого пространства.
> Все значения spacing увеличены по сравнению с эквивалентом на светлом фоне.

| Контекст | Mobile | Tablet (md:) | Desktop (lg:) | Tailwind |
|----------|--------|-------------|--------------|---------|
| Секция padding-y | 64px | 80px | 120px | `py-16 md:py-20 lg:py-30` |
| Hero / CTA (увеличенная) | 80px | 100px | 160px | `py-20 md:py-25 lg:py-40` |
| Container padding-x | 16px | 24px | 32px | `px-4 sm:px-6 lg:px-8` |
| Container max-width | 100% | 100% | 1280px | `mx-auto max-w-7xl` |
| Card padding | 20px | 24px | 32px | `p-5 md:p-6 lg:p-8` |
| Card gap | 16px | 24px | 32px | `gap-4 md:gap-6 lg:gap-8` |
| Heading → content | 32px | 48px | 64px | `mb-8 md:mb-12 lg:mb-16` |
| Prose max-width | — | — | 768px | `max-w-3xl` |
| Footer padding-y | 48px | 64px | 80px | `py-12 md:py-16 lg:py-20` |
| Footer gap | 32px | 32px | 48px | `gap-8 lg:gap-12` |

**Универсальный паттерн секции:**
```html
<section class="py-16 md:py-20 lg:py-30 bg-cosmic-bg">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <!-- Content -->
  </div>
</section>
```

---

## Иконки

- **Формат:** SVG, inline
- **Цвет:** `celestial-gold` (`#D4AF37`) по умолчанию, `cosmic-violet` для карточек
- ⚡ **Размер:** 48×48px (`w-12 h-12`) для карточек, 24×24px для UI, 20×20px для инлайн
- **Стиль:** stroke-based, линейные (не заливка)
- **Источник:** Lucide React или кастомные SVG
- ⚡ **Контейнер в карточках:** `rounded-xl bg-cosmic-purple/30 flex items-center justify-center`

### Иконки разделов

| Раздел | Ключевое слово | Описание иконки |
|--------|---------------|----------------|
| Таро | `cards` | Стилизованные карты таро |
| Ритуалистика | `candle` / `flame` | Свеча или пламя |
| Сопровождение | `compass` / `star` | Компас или путеводная звезда |
| Обучение | `book` / `graduation` | Книга или мудрость |
| Регресс | `spiral` / `eye` | Спираль или внутреннее зрение |

---

## Изображения

- **Компонент:** `next/image` (обязательно)
- **Форматы:** WebP (предпочтительно), JPEG fallback
- **Featured images блога:** `aspect-video` (16:9), featured: `aspect-[21/9]`
- **Фото «Обо мне»:** `aspect-ratio: 3/4` или `1/1`
- **LCP image:** атрибут `priority` на hero и первых видимых изображениях
- **Sizes:** всегда указывать для responsive (`sizes="(max-width: 768px) 100vw, 33vw"`)
- **Placeholder:** `blur` с автогенерируемым blurDataURL
- ⚡ **Gradient overlay на карточках блога:** `from-cosmic-bg/90 via-cosmic-bg/40 to-transparent`

---

## ⚡ Shadows и эффекты (ОБНОВЛЕНО)

> Традиционные `box-shadow` почти невидимы на #0A0A0F.
> Глубина создаётся через: colored glow, surface elevation, borders.

```css
/* ⚡ Card hover glow (фиолетовый, не золотой) */
box-shadow: 0 0 25px -5px rgba(124, 58, 237, 0.2);

/* ⚡ CTA button hover glow */
box-shadow: 0 0 30px -5px rgba(124, 58, 237, 0.5);

/* ⚡ Multi-layer cosmic glow */
box-shadow: 0 0 15px rgba(106, 13, 173, 0.15), 0 0 45px rgba(106, 13, 173, 0.05);

/* Навигация */
backdrop-filter: blur(16px);  /* backdrop-blur-xl — ТОЛЬКО для nav, не для карточек */
```

**⚠️ `backdrop-filter: blur()` — дорогая операция. Использовать ТОЛЬКО на навигации (1 элемент). Для карточек — solid `bg-cosmic-card`.**

---

## ⚡ Tailwind v4 Config — @theme (ОБНОВЛЕНО)

> Tailwind v4 заменяет `tailwind.config.ts` на CSS-first `@theme` в globals.css.

```css
/* globals.css */
@import "tailwindcss";

@theme {
  /* ===== FONTS ===== */
  --font-heading: "Cormorant Garamond", ui-serif, Georgia, serif;
  --font-body: "Commissioner", ui-sans-serif, system-ui, sans-serif;

  /* ===== FLUID TYPOGRAPHY ===== */
  --text-hero: clamp(2.5rem, 1.5rem + 3.5vw, 5rem);
  --text-hero--line-height: 1.1;
  --text-hero--letter-spacing: 0.02em;
  --text-hero--font-weight: 600;

  --text-section: clamp(2rem, 1.4rem + 2vw, 3.5rem);
  --text-section--line-height: 1.2;
  --text-section--letter-spacing: 0.015em;
  --text-section--font-weight: 600;

  --text-card-title: clamp(1.25rem, 1.1rem + 0.5vw, 1.75rem);
  --text-card-title--line-height: 1.3;
  --text-card-title--font-weight: 500;

  --text-body: 1.0625rem;
  --text-body--line-height: 1.7;

  --text-small: 0.9375rem;
  --text-small--line-height: 1.6;

  /* ===== COSMIC COLORS ===== */
  --color-cosmic-bg: #0A0A0F;
  --color-cosmic-card: #0D1137;
  --color-cosmic-purple: #2D1B69;
  --color-cosmic-violet: #7C3AED;
  --color-cosmic-gold: #D4AF37;
  --color-cosmic-gold-light: #F5E6A3;
  --color-cosmic-gold-dark: #B8860B;
  --color-cosmic-white: #F0EAD6;
  --color-cosmic-silver: #C0C0D0;

  /* ===== ELEVATION SURFACES ===== */
  --color-surface-1: #0E0E14;
  --color-surface-2: #121218;
  --color-surface-3: #16161E;
  --color-surface-4: #1A1A24;

  /* ===== ANIMATIONS ===== */
  --animate-aurora: aurora 30s ease-in-out infinite;
  --animate-float: float 6s ease-in-out infinite;
  --animate-scroll: scroll var(--animation-duration, 80s) var(--animation-direction, forwards) linear infinite;
  --animate-gold-shimmer: gold-shimmer 3s linear infinite;
  --animate-gold-glow: gold-glow-pulse 4s ease-in-out infinite;

  @keyframes aurora {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
    33% { transform: translate(-5%, 3%) scale(1.05); opacity: 0.8; }
    66% { transform: translate(3%, -2%) scale(0.98); opacity: 0.7; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes scroll {
    to { transform: translate(calc(-50% - 0.5rem)); }
  }
  @keyframes gold-shimmer {
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
  }
  @keyframes gold-glow-pulse {
    0%, 100% { text-shadow: 0 0 4px rgba(212,175,55,0.3), 0 0 8px rgba(212,175,55,0.2), 0 0 16px rgba(212,175,55,0.1); }
    50% { text-shadow: 0 0 8px rgba(212,175,55,0.6), 0 0 16px rgba(212,175,55,0.4), 0 0 32px rgba(212,175,55,0.2); }
  }
}

@layer base {
  body {
    background-color: var(--color-cosmic-bg);
    color: var(--color-cosmic-white);
    font-family: var(--font-body);
    font-size: 1.0625rem;
    line-height: 1.7;
    letter-spacing: 0.02em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

Это даёт утилиты: `text-hero`, `font-heading`, `bg-cosmic-bg`, `text-cosmic-gold`, `bg-surface-1`, `animate-aurora`, `animate-gold-shimmer` и т.д.

---

## Чеклист для Claude Code

При создании любого UI-компонента проверь:

- [ ] Цвета из палитры (не произвольные). Elevation через `surface-1..4`.
- [ ] ⚡ Шрифты: **Cormorant Garamond** для заголовков (24px+), **Commissioner** для текста
- [ ] ⚡ Body text: 17px, line-height 1.7, letter-spacing 0.02em, weight 400
- [ ] ⚡ Heading weights: 500–600 (НЕ 700 — halation на тёмном фоне)
- [ ] ⚡ Border-radius: 16px (`rounded-2xl`) для карточек, 9999px для кнопок, 6px для бэйджей
- [ ] ⚡ Hover: glow (фиолетовый) + lift, НЕ просто scale. Tailwind v4 auto `@media (hover: hover)`.
- [ ] ⚡ Mobile: `active:scale-[0.98]` вместо hover. Tap target: `min-h-12 min-w-12`.
- [ ] Responsive: mobile → tablet → desktop
- [ ] ⚡ Spacing: на 20–30% больше чем кажется нужным (тёмный фон сжимает)
- [ ] ⚡ `prefers-reduced-motion`: `MotionConfig reducedMotion="user"` + `motion-reduce:` Tailwind
- [ ] ⚡ Max 3 анимированных компонента одновременно видимых
- [ ] ⚡ НЕ использовать: Sparkles, Background Beams, Wavy Background, Glowing Stars
- [ ] ⚡ `-webkit-font-smoothing: antialiased` на body (уже в @layer base)
- [ ] `next/image` для всех изображений
- [ ] Server Component по умолчанию, `'use client'` только при необходимости
- [ ] ⚡ Tailwind v4: `bg-linear-to-r` (не `bg-gradient-to-r`), `ring-3` (не `ring`), любые spacing integers
