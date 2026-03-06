# Design Specification — Cosmic Night Theme

> Этот файл — единственный источник правды для визуального дизайна.
> Claude Code должен ссылаться на него при создании любых UI-компонентов.

---

## Концепция

Тёмная космическая тема с золотыми акцентами. Профессионально, мистично, но не перегруженно.
Чистые лейауты, космические элементы — только как акцент, не как основа.

**Референсы:**
- CHANI — chaninicholas.com
- Co-Star — costarastrology.com
- Jessica Lanyadoo

**Ключевые принципы:**
- Тёмный фон, светлый текст, золотые акценты
- Минимализм с эзотерическими деталями
- Читаемость важнее декоративности
- Mobile-first, responsive

---

## Цветовая палитра

### Основные цвета

```
--cosmic-black:    #0A0A0F    hsl(240, 25%, 4%)
--midnight-navy:   #0D1137    hsl(233, 64%, 13%)
--mystic-purple:   #2D1B69    hsl(261, 59%, 26%)
--astral-violet:   #7C3AED    hsl(263, 83%, 58%)
--celestial-gold:  #D4AF37    hsl(47, 65%, 52%)
--star-white:      #F0EAD6    hsl(47, 47%, 89%)
--silver-mist:     #C0C0D0    hsl(240, 11%, 78%)
```

### Применение

| Токен | HEX | Где использовать |
|-------|-----|-----------------|
| `cosmic-black` | `#0A0A0F` | Основной фон `body`, overlay мобильного меню |
| `midnight-navy` | `#0D1137` | Фон карточек, секций, навигации, отзывов |
| `mystic-purple` | `#2D1B69` | Вторичный фон, градиенты, hover-состояния |
| `astral-violet` | `#7C3AED` | Интерактивные элементы, hover ссылок, бэйджи категорий |
| `celestial-gold` | `#D4AF37` | CTA кнопки, заголовки секций, лого, иконки, акценты |
| `star-white` | `#F0EAD6` | Основной текст, заголовки |
| `silver-mist` | `#C0C0D0` | Вторичный текст, даты, подписи, placeholder |

### Прозрачности (часто используемые)

```css
rgba(212, 175, 55, 0.2)    /* celestial-gold/20 — border карточек, разделители */
rgba(212, 175, 55, 0.15)   /* celestial-gold/15 — glow-эффект при hover */
rgba(124, 58, 237, 0.1)    /* astral-violet/10 — фон бэйджей категорий */
rgba(13, 17, 55, 0.8)      /* midnight-navy/80 — фон навигации с blur */
```

### Градиенты

```css
/* Фоновый градиент секций */
background: linear-gradient(180deg, var(--cosmic-black) 0%, var(--midnight-navy) 50%, var(--cosmic-black) 100%);

/* Градиент для CTA-секций */
background: linear-gradient(135deg, var(--mystic-purple) 0%, var(--midnight-navy) 100%);

/* Градиент текста (опционально, для заголовков) */
background: linear-gradient(90deg, var(--celestial-gold), var(--star-white));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## Типографика

### Шрифты

| Роль | Шрифт | Тип | Подмножества | Подключение |
|------|-------|-----|-------------|-------------|
| Заголовки | **Cinzel** | Serif (римские надписи) | `latin`, `cyrillic` | `next/font/google` |
| Основной текст | **Inter** | Sans-serif | `latin`, `cyrillic` | `next/font/google` |

### Подключение в Next.js

```typescript
import { Cinzel, Inter } from 'next/font/google'

const cinzel = Cinzel({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-cinzel',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})
```

### Размеры и высота строки

| Элемент | Размер | Шрифт | line-height | font-weight |
|---------|--------|-------|------------|-------------|
| H1 | 48–64px | Cinzel | 1.2 | 700 |
| H2 | 32–40px | Cinzel | 1.2 | 600 |
| H3 | 24–28px | Cinzel | 1.2 | 600 |
| Body | 16–18px | Inter | 1.6–1.8 | 400 |
| Small / caption | 14px | Inter | 1.6 | 400 |
| Badge / label | 12px | Inter | 1.4 | 500 |

### Цвета текста

| Роль | Цвет | Примеры |
|------|------|---------|
| Основной | `star-white` `#F0EAD6` | Заголовки, параграфы, меню |
| Вторичный | `silver-mist` `#C0C0D0` | Подзаголовки, даты, мета-текст |
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
┌──────────────────────────────────────────────────────┐
│  [Лого Cinzel gold]    [Меню по центру]    [RU/EN/UK] │
└──────────────────────────────────────────────────────┘
```

- **Лого:** Cinzel, `celestial-gold`, слева
- **Меню:** Главная, Таро, Ритуалистика, Сопровождение, Обучение, Регресс, Блог, Обо мне
- **Языковой переключатель:** три кнопки RU / EN / UK, активная подсвечена `celestial-gold`
- **Мобильное меню:** hamburger → полноэкранное overlay, фон `cosmic-black`, ссылки по центру, анимация fade-in

### Footer

```
Фон:        cosmic-black
Разделитель: border-top 1px celestial-gold/20
Колонки:    3 (desktop), 1 (mobile)
```

**Структура:**
```
┌──────────────────┬──────────────────┬──────────────────┐
│   Навигация       │  Контакты/соцсети │    Языки          │
└──────────────────┴──────────────────┴──────────────────┘
                    © Копирайт silver-mist 12px
```

### Hero-секция (главная)

```
Фон:        Aceternity Aurora Background или Background Beams
Высота:     100vh или min-height: 80vh
Контент:    по центру
```

- Заголовок: Cinzel, 48–64px, `star-white`
- Подзаголовок: Inter, 18–20px, `silver-mist`
- Aceternity Sparkles на фоне — мерцающие звёзды
- **2 CTA кнопки:**
  - Primary: фон `celestial-gold`, текст `cosmic-black`, font-weight 600
  - Secondary: border `celestial-gold`, фон transparent, текст `celestial-gold`
- **`prefers-reduced-motion`:** отключить Aurora/Beams, оставить статичный gradient

### Карточки услуг

```css
/* Базовое состояние */
background:    var(--midnight-navy);
border:        1px solid rgba(212, 175, 55, 0.2);
border-radius: 12px;
padding:       24px;
transition:    all 0.3s ease;

/* Hover */
box-shadow:    0 0 20px rgba(212, 175, 55, 0.15);
transform:     scale(1.02);
```

**Содержимое карточки:**
- SVG-иконка: `celestial-gold`, 40×40px
- Заголовок: Cinzel, 20px, `star-white`
- Описание: Inter, 14px, `silver-mist`
- Ссылка / кнопка внизу

**Grid:**
- Desktop: 3 колонки
- Tablet: 2 колонки
- Mobile: 1 колонка
- Gap: 24px

### Карточки блога

```
border-radius: 12px
overflow:      hidden
background:    midnight-navy
```

**Содержимое:**
- Featured image: сверху, `aspect-ratio: 16/9`, `border-radius: 12px 12px 0 0`
- Бэйдж категории: фон `astral-violet/10`, текст `astral-violet`, 12px, border-radius 6px
- Дата: `silver-mist`, Inter, 14px
- Заголовок: Cinzel, 18px, `star-white`
- Excerpt: Inter, 14px, `silver-mist`, line-clamp: 3

**Featured пост:**
- Большая карточка, `grid-column: span 2` на desktop

### Карточки отзывов

```
Компонент:  Aceternity Infinite Moving Cards
Скролл:     бесконечный горизонтальный, автоматический
```

- Фон карточки: `midnight-navy`
- Имя клиента: Cinzel, 16px, `celestial-gold`
- Текст отзыва: Inter, 14px, `star-white`
- Padding: 24px
- Border-radius: 12px

### Кнопки

**Primary (CTA):**
```css
background:    var(--celestial-gold);
color:         var(--cosmic-black);
font-family:   Inter;
font-weight:   600;
font-size:     16px;
padding:       12px 32px;
border-radius: 8px;
transition:    all 0.3s ease;

/* Hover */
filter:        brightness(1.1);
transform:     translateY(-1px);
box-shadow:    0 4px 12px rgba(212, 175, 55, 0.3);
```

**Secondary:**
```css
background:    transparent;
color:         var(--celestial-gold);
border:        1px solid var(--celestial-gold);
/* Остальное как у primary */

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

### Аккордеон (FAQ)

```
border:        1px solid celestial-gold/20
border-radius: 8px
background:    midnight-navy
```

- Заголовок: Inter, 16px, `star-white`, font-weight 500
- Контент: Inter, 14–16px, `silver-mist`
- Иконка раскрытия: `celestial-gold`
- Анимация: плавное раскрытие (Framer Motion)

### Бэйджи

```css
/* Категория блога */
background:    rgba(124, 58, 237, 0.1);  /* astral-violet/10 */
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
Hero (100vh)
    ↓
5 карточек разделов (grid 3 col)
    ↓
Обо мне кратко (фото + текст, fade-in)
    ↓
Последние 3 поста блога (grid)
    ↓
Отзывы (Infinite Moving Cards)
    ↓
CTA секция
    ↓
Footer
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
Полное описание услуги (richText)
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
Featured пост (большая карточка span-2)
    ↓
Фильтр по категориям (кнопки/табы)
    ↓
Сетка постов (grid)
    ↓
Пагинация
    ↓
Footer
```

### Пост блога ( `/blog/[slug]` )

```
single-column, max-w-prose (65ch)
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
Фото + текст (чередуются слева-справа)
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

## Анимации

### Библиотеки

- **Aceternity UI** — готовые компоненты (Aurora Background, Sparkles, Infinite Moving Cards, Background Beams)
- **Framer Motion** — кастомные анимации (fade-in, slide-up, stagger)

### Используемые эффекты

| Эффект | Где | Библиотека |
|--------|-----|-----------|
| Aurora Background / Beams | Hero главной | Aceternity UI |
| Sparkles | Фон hero | Aceternity UI |
| Infinite Moving Cards | Отзывы | Aceternity UI |
| Fade-in on scroll | Секции, «Обо мне» | Framer Motion |
| Hover glow | Карточки услуг | CSS transition |
| Scale on hover | Карточки | CSS transition |
| Slide-up stagger | Списки карточек | Framer Motion |
| Menu overlay | Мобильное меню | Framer Motion |

### Accessibility: `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  /* Отключить: Aurora, Beams, Sparkles, Infinite scroll */
  /* Оставить: статичные градиенты, простые hover */
  /* Заменить анимации на мгновенные переходы */
}
```

**Правило:** все тяжёлые анимации (Aurora, Beams, Sparkles, Infinite Moving Cards) должны быть обёрнуты в проверку `prefers-reduced-motion` и заменяться на статичные альтернативы.

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

### Адаптация по компонентам

| Компонент | Mobile (<768) | Tablet (768–1024) | Desktop (>1024) |
|-----------|--------------|-------------------|-----------------|
| Карточки услуг | 1 col | 2 col | 3 col |
| Карточки блога | 1 col | 2 col | 3 col (featured span-2) |
| Footer | 1 col stacked | 2 col | 3 col |
| Навигация | Hamburger overlay | Hamburger overlay | Горизонтальное меню |
| Hero заголовок | 32–40px | 40–48px | 48–64px |
| Секции padding | 48px 16px | 64px 32px | 80px 48px |

---

## Spacing

Базовая система — кратные 4px (Tailwind):

| Токен | Значение | Использование |
|-------|---------|--------------|
| `4` | 16px | Padding карточек mobile |
| `6` | 24px | Padding карточек desktop, gap grid |
| `8` | 32px | Секции padding horizontal |
| `12` | 48px | Секции padding vertical (mobile) |
| `16` | 64px | Секции padding vertical (tablet) |
| `20` | 80px | Секции padding vertical (desktop) |

---

## Иконки

- **Формат:** SVG, inline
- **Цвет:** `celestial-gold` (`#D4AF37`) по умолчанию
- **Размер:** 40×40px для карточек, 24×24px для UI-элементов, 20×20px для инлайн
- **Стиль:** stroke-based, линейные (не заливка)
- **Источник:** Lucide React или кастомные SVG

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
- **Featured images блога:** `aspect-ratio: 16/9`
- **Фото «Обо мне»:** `aspect-ratio: 3/4` или `1/1`
- **LCP image:** атрибут `priority` на hero и первых видимых изображениях
- **Sizes:** всегда указывать для responsive (`sizes="(max-width: 768px) 100vw, 33vw"`)
- **Placeholder:** `blur` с автогенерируемым blurDataURL

---

## Shadows и эффекты

```css
/* Glow карточек при hover */
box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);

/* Тень кнопок при hover */
box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);

/* Мягкая тень карточек (default) */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

/* Навигация */
backdrop-filter: blur(16px);  /* backdrop-blur-xl */
```

---

## Tailwind CSS Config (ключевые расширения)

```typescript
// tailwind.config.ts — ключевые кастомизации
{
  theme: {
    extend: {
      colors: {
        'cosmic-black':   '#0A0A0F',
        'midnight-navy':  '#0D1137',
        'mystic-purple':  '#2D1B69',
        'astral-violet':  '#7C3AED',
        'celestial-gold': '#D4AF37',
        'star-white':     '#F0EAD6',
        'silver-mist':    '#C0C0D0',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        inter:  ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(212,175,55,0.1)' },
          '50%':      { boxShadow: '0 0 20px rgba(212,175,55,0.2)' },
        },
      },
    },
  },
}
```

---

## Чеклист для Claude Code

При создании любого UI-компонента проверь:

- [ ] Цвета из палитры (не произвольные)
- [ ] Шрифты: Cinzel для заголовков, Inter для текста
- [ ] Border-radius: 12px для карточек, 8px для кнопок, 6px для бэйджей
- [ ] Hover-эффекты с `transition: all 0.3s ease`
- [ ] Responsive: mobile → tablet → desktop
- [ ] `prefers-reduced-motion` для анимаций
- [ ] `next/image` для всех изображений
- [ ] Server Component по умолчанию, `'use client'` только при необходимости
