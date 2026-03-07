# Схема данных — Payload CMS Collections

> **Назначение:** полное описание всех коллекций, полей, связей и настроек Payload CMS.
> Claude Code должен сверяться с этим файлом при создании/изменении коллекций.
> Обновляется после каждого изменения в `payload/collections/`.

---

## Оглавление

1. [Общие правила](#общие-правила)
2. [Диаграмма связей](#диаграмма-связей)
3. [ServiceCategories](#servicecategories)
4. [Services](#services)
5. [Posts](#posts)
6. [PostCategories](#postcategories)
7. [Pages](#pages)
8. [Testimonials](#testimonials)
9. [Media](#media)
10. [Users](#users)
11. [Seed-данные](#seed-данные)
12. [Hooks и Revalidation](#hooks-и-revalidation)
13. [Плагины](#плагины)
14. [Local API — примеры запросов](#local-api--примеры-запросов)

---

## Общие правила

### Локализация

- Все текстовые поля контента — `localized: true`
- Поддерживаемые локали: `ru`, `en`, `uk`
- Порядок fallback: `uk → ru → en`
- Технические поля (slug, order, price, isActive) — **не** локализуются

### Конфигурация локалей в payload.config.ts

```typescript
localization: {
  locales: [
    { label: 'Русский', code: 'ru' },
    { label: 'English', code: 'en', fallbackLocale: 'ru' },
    { label: 'Українська', code: 'uk', fallbackLocale: 'ru' },
  ],
  defaultLocale: 'ru',
  fallback: true,
}
```

### Конвенции именования

| Элемент | Формат | Пример |
|---------|--------|--------|
| Collection slug | kebab-case | `service-categories` |
| Field name | camelCase | `shortDescription` |
| Relationship field | camelCase, singular | `category` |
| Файл коллекции | PascalCase.ts | `ServiceCategories.ts` |

### Общие поля (присутствуют в большинстве коллекций)

| Поле | Тип | Localized | Описание |
|------|-----|-----------|----------|
| `title` | text | ✅ | Заголовок, используется как `useAsTitle` |
| `slug` | text | ❌ | URL-идентификатор, `unique: true` |
| `order` | number | ❌ | Порядок сортировки |
| `seo` | group (plugin) | ✅ | Meta title, description, image |

---

## Диаграмма связей

```
┌─────────────────────┐
│  ServiceCategories   │
│  (5 разделов)        │
│  Таро, Ритуалистика, │
│  Сопровождение,      │
│  Обучение, Регресс   │
└────────┬────────────┘
         │ 1 : N
         ▼
┌─────────────────────┐
│      Services        │
│  (конкретные услуги) │
└─────────────────────┘

┌─────────────────────┐
│   PostCategories     │
└────────┬────────────┘
         │ 1 : N
         ▼
┌─────────────────────┐        ┌─────────────┐
│       Posts          │───────►│    Media     │
│  (блог-статьи)       │ N : 1  │ (изображения)│
└─────────────────────┘        └─────────────┘
                                      ▲
┌─────────────────────┐               │
│       Pages          │───────────────┘
│  (Обо мне, и др.)   │ N : 1
└─────────────────────┘

┌─────────────────────┐
│    Testimonials      │
│  (отзывы клиентов)   │
└─────────────────────┘

┌─────────────────────┐
│       Users          │
│  (админ, встроенная) │
└─────────────────────┘
```

---

## ServiceCategories

> 5 основных разделов сайта: Таро, Ритуалистика, Сопровождение, Обучение, Регресс.

**Файл:** `payload/collections/ServiceCategories.ts`
**Slug:** `service-categories`
**Admin group:** `Услуги`
**useAsTitle:** `title`

### Поля

| Поле | Тип | Localized | Required | Unique | Описание |
|------|-----|-----------|----------|--------|----------|
| `title` | text | ✅ | ✅ | — | Название раздела |
| `slug` | text | ❌ | ✅ | ✅ | URL: `tarot`, `rituals`, `support`, `education`, `regress` |
| `description` | richText (Lexical) | ✅ | — | — | Полное описание раздела для страницы |
| `shortDescription` | textarea | ✅ | — | — | Краткое описание для карточки на главной |
| `icon` | text | ❌ | — | — | Ключевое слово для SVG-иконки (`cards`, `candle`, `compass`, `book`, `spiral`) |
| `image` | relationship → Media | ❌ | — | — | Фоновое изображение для hero раздела |
| `order` | number | ❌ | — | — | Порядок отображения (1–5) |
| `seo` | group (plugin) | ✅ | — | — | SEO meta title, description, image |

### Access

```typescript
access: {
  read: () => true,              // публичный доступ
  create: ({ req }) => !!req.user,
  update: ({ req }) => !!req.user,
  delete: ({ req }) => !!req.user,
}
```

### Admin

```typescript
admin: {
  useAsTitle: 'title',
  defaultColumns: ['title', 'slug', 'order'],
  group: 'Услуги',
}
```

---

## Services

> Конкретные услуги внутри каждого раздела (категории).

**Файл:** `payload/collections/Services.ts`
**Slug:** `services`
**Admin group:** `Услуги`
**useAsTitle:** `title`

### Поля

| Поле | Тип | Localized | Required | Unique | Описание |
|------|-----|-----------|----------|--------|----------|
| `title` | text | ✅ | ✅ | — | Название услуги |
| `slug` | text | ❌ | ✅ | ✅ | URL-идентификатор |
| `shortDescription` | textarea | ✅ | — | — | 1–2 предложения для карточки |
| `fullDescription` | richText (Lexical) | ✅ | — | — | Полное описание: что это, кому подходит, что входит |
| `category` | relationship → ServiceCategories | ❌ | ✅ | — | К какому разделу относится |
| `price` | text | ✅ | — | — | Цена: число, «от ...», «по договорённости» |
| `duration` | text | ✅ | — | — | Длительность: «60 мин», «2–3 часа» |
| `format` | select | ❌ | — | — | Варианты: `online`, `offline`, `both` |
| `icon` | text | ❌ | — | — | Ключевое слово для SVG-иконки |
| `image` | relationship → Media | ❌ | — | — | Изображение услуги |
| `faq` | array | ✅ | — | — | Вопросы-ответы (FAQ аккордеон) |
| `faq.question` | text | ✅ | — | — | Вопрос |
| `faq.answer` | textarea | ✅ | — | — | Ответ |
| `isActive` | checkbox | ❌ | — | — | Показывать на сайте? Default: `true` |
| `order` | number | ❌ | — | — | Порядок сортировки |
| `seo` | group (plugin) | ✅ | — | — | SEO meta |

### Access

```typescript
access: {
  read: () => true,
  create: ({ req }) => !!req.user,
  update: ({ req }) => !!req.user,
  delete: ({ req }) => !!req.user,
}
```

### Admin

```typescript
admin: {
  useAsTitle: 'title',
  defaultColumns: ['title', 'category', 'price', 'isActive'],
  group: 'Услуги',
}
```

### Hooks

```typescript
hooks: {
  afterChange: [
    async ({ doc }) => {
      // Revalidate страницы услуги на всех языках
      revalidatePath(`/ru/${doc.category.slug}/${doc.slug}`)
      revalidatePath(`/en/${doc.category.slug}/${doc.slug}`)
      revalidatePath(`/uk/${doc.category.slug}/${doc.slug}`)
      // Revalidate страницу раздела
      revalidatePath(`/ru/${doc.category.slug}`)
      revalidatePath(`/en/${doc.category.slug}`)
      revalidatePath(`/uk/${doc.category.slug}`)
      // Revalidate главную (карточки разделов)
      revalidatePath('/ru')
      revalidatePath('/en')
      revalidatePath('/uk')
    }
  ]
}
```

---

## Posts

> Блог-статьи с rich text, featured image, категориями и статусом публикации.

**Файл:** `payload/collections/Posts.ts`
**Slug:** `posts`
**Admin group:** `Блог`
**useAsTitle:** `title`

### Поля

| Поле | Тип | Localized | Required | Unique | Описание |
|------|-----|-----------|----------|--------|----------|
| `title` | text | ✅ | ✅ | — | Заголовок статьи |
| `slug` | text | ❌ | ✅ | ✅ | URL-идентификатор |
| `content` | richText (Lexical) | ✅ | — | — | Основное содержание статьи |
| `excerpt` | textarea | ✅ | — | — | Краткое описание для карточки и SEO |
| `featuredImage` | relationship → Media | ❌ | — | — | Главное изображение статьи |
| `category` | relationship → PostCategories | ❌ | — | — | Категория блога |
| `publishedAt` | date | ❌ | — | — | Дата публикации |
| `status` | select | ❌ | ✅ | — | Варианты: `draft`, `published`. Default: `draft` |
| `readingTime` | number | ❌ | — | — | Время чтения в минутах (авто или ручное) |
| `seo` | group (plugin) | ✅ | — | — | SEO meta |

### Access

```typescript
access: {
  read: ({ req }) => {
    // Публичные пользователи видят только published
    if (!req.user) {
      return { status: { equals: 'published' } }
    }
    // Админ видит все
    return true
  },
  create: ({ req }) => !!req.user,
  update: ({ req }) => !!req.user,
  delete: ({ req }) => !!req.user,
}
```

### Admin

```typescript
admin: {
  useAsTitle: 'title',
  defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  group: 'Блог',
}
```

### Versions (черновики)

```typescript
versions: {
  drafts: {
    autosave: true,
  },
}
```

### Hooks

```typescript
hooks: {
  afterChange: [
    async ({ doc }) => {
      revalidatePath(`/ru/blog/${doc.slug}`)
      revalidatePath(`/en/blog/${doc.slug}`)
      revalidatePath(`/uk/blog/${doc.slug}`)
      // Revalidate список блога
      revalidatePath('/ru/blog')
      revalidatePath('/en/blog')
      revalidatePath('/uk/blog')
      // Revalidate главную (секция «последние посты»)
      revalidatePath('/ru')
      revalidatePath('/en')
      revalidatePath('/uk')
    }
  ]
}
```

---

## PostCategories

> Категории блога: Таро, Ритуалы, Развитие, Обучение и т.д.

**Файл:** `payload/collections/PostCategories.ts`
**Slug:** `post-categories`
**Admin group:** `Блог`
**useAsTitle:** `title`

### Поля

| Поле | Тип | Localized | Required | Unique | Описание |
|------|-----|-----------|----------|--------|----------|
| `title` | text | ✅ | ✅ | — | Название категории |
| `slug` | text | ❌ | ✅ | ✅ | URL-идентификатор |
| `description` | textarea | ✅ | — | — | Описание категории |
| `order` | number | ❌ | — | — | Порядок отображения |

### Admin

```typescript
admin: {
  useAsTitle: 'title',
  defaultColumns: ['title', 'slug'],
  group: 'Блог',
}
```

---

## Pages

> Статические страницы: «Обо мне» и любые другие страницы без привязки к разделам.

**Файл:** `payload/collections/Pages.ts`
**Slug:** `pages`
**Admin group:** `Контент`
**useAsTitle:** `title`

### Поля

| Поле | Тип | Localized | Required | Unique | Описание |
|------|-----|-----------|----------|--------|----------|
| `title` | text | ✅ | ✅ | — | Название страницы |
| `slug` | text | ❌ | ✅ | ✅ | URL: `about` |
| `content` | richText (Lexical) | ✅ | — | — | Основное содержание |
| `featuredImage` | relationship → Media | ❌ | — | — | Главное фото (напр. портрет для «Обо мне») |
| `gallery` | array | ❌ | — | — | Галерея изображений |
| `gallery.image` | relationship → Media | ❌ | — | — | Изображение |
| `gallery.caption` | text | ✅ | — | — | Подпись |
| `status` | select | ❌ | — | — | `draft` / `published`. Default: `published` |
| `seo` | group (plugin) | ✅ | — | — | SEO meta |

### Admin

```typescript
admin: {
  useAsTitle: 'title',
  defaultColumns: ['title', 'slug', 'status'],
  group: 'Контент',
}
```

### Hooks

```typescript
hooks: {
  afterChange: [
    async ({ doc }) => {
      revalidatePath(`/ru/${doc.slug}`)
      revalidatePath(`/en/${doc.slug}`)
      revalidatePath(`/uk/${doc.slug}`)
    }
  ]
}
```

---

## Testimonials

> Отзывы клиентов. Отображаются на главной в Infinite Moving Cards.

**Файл:** `payload/collections/Testimonials.ts`
**Slug:** `testimonials`
**Admin group:** `Контент`
**useAsTitle:** `clientName`

### Поля

| Поле | Тип | Localized | Required | Unique | Описание |
|------|-----|-----------|----------|--------|----------|
| `clientName` | text | ❌ | ✅ | — | Имя клиента |
| `text` | textarea | ✅ | ✅ | — | Текст отзыва |
| `serviceCategory` | relationship → ServiceCategories | ❌ | — | — | К какому разделу относится |
| `rating` | number | ❌ | — | — | Оценка 1–5 (опционально) |
| `isActive` | checkbox | ❌ | — | — | Показывать на сайте? Default: `true` |
| `order` | number | ❌ | — | — | Порядок отображения |

### Admin

```typescript
admin: {
  useAsTitle: 'clientName',
  defaultColumns: ['clientName', 'serviceCategory', 'isActive'],
  group: 'Контент',
}
```

---

## Media

> Все изображения сайта. Автоматический ресайз и оптимизация.

**Файл:** `payload/collections/Media.ts`
**Slug:** `media`
**Admin group:** `Контент`
**useAsTitle:** `alt`

### Поля

| Поле | Тип | Localized | Required | Unique | Описание |
|------|-----|-----------|----------|--------|----------|
| `alt` | text | ✅ | ✅ | — | Alt-текст для accessibility и SEO |
| `caption` | text | ✅ | — | — | Подпись к изображению |

### Upload

```typescript
upload: {
  mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  staticDir: 'media',
  imageSizes: [
    {
      name: 'thumbnail',
      width: 400,
      height: 300,
      position: 'centre',
    },
    {
      name: 'card',
      width: 768,
      height: 432,    // 16:9
      position: 'centre',
    },
    {
      name: 'hero',
      width: 1920,
      height: undefined,  // auto height
      position: 'centre',
    },
  ],
  adminThumbnail: 'thumbnail',
}
```

### Admin

```typescript
admin: {
  useAsTitle: 'alt',
  group: 'Контент',
}
```

---

## Users

> Встроенная коллекция Payload для аутентификации. Только администраторы.

**Файл:** `payload/collections/Users.ts`
**Slug:** `users`
**Auth:** `true` (встроенная аутентификация Payload)

### Поля

| Поле | Тип | Описание |
|------|-----|----------|
| `email` | email (встроен) | Логин администратора |
| `password` | password (встроен) | Пароль (хешируется автоматически) |
| `name` | text | Имя для отображения в админке |
| `role` | select | `admin` — единственная роль на старте |

### Access

```typescript
access: {
  read: ({ req }) => !!req.user,
  create: ({ req }) => !!req.user,
  update: ({ req }) => !!req.user,
  delete: ({ req }) => !!req.user,
}
```

---

## Seed-данные

> Скрипт `scripts/seed.ts` заполняет тестовый контент на 3 языках для разработки.

### Что создаёт seed

| Коллекция | Количество | Содержание |
|-----------|-----------|-----------|
| ServiceCategories | 5 | Таро, Ритуалистика, Сопровождение, Обучение, Регресс |
| Services | 10–15 | По 2–3 услуги на каждый раздел |
| PostCategories | 5 | По одной на раздел |
| Posts | 5 | По одной статье на раздел (status: published) |
| Pages | 1 | «Обо мне» с placeholder-текстом |
| Testimonials | 6–8 | Тестовые отзывы |
| Users | 1 | Админ: admin@example.com / password123 |

### Slugs категорий услуг (фиксированные)

| Раздел | slug | icon |
|--------|------|------|
| Таро | `tarot` | `cards` |
| Ритуалистика | `rituals` | `candle` |
| Сопровождение | `support` | `compass` |
| Обучение | `education` | `book` |
| Регресс | `regress` | `spiral` |

### Запуск

```bash
npx tsx scripts/seed.ts
```

---

## Hooks и Revalidation

> Каждое изменение в админке автоматически обновляет соответствующие страницы сайта.

### Принцип

Payload CMS hooks (`afterChange`) вызывают `revalidatePath()` из Next.js, чтобы обновить закешированные страницы.

### Карта revalidation

| Коллекция | Что обновляется |
|-----------|----------------|
| **ServiceCategories** | Главная (`/`), страница раздела (`/[slug]`) |
| **Services** | Главная (`/`), страница раздела (`/[catSlug]`), страница услуги (`/[catSlug]/[slug]`) |
| **Posts** | Главная (`/`), список блога (`/blog`), страница поста (`/blog/[slug]`) |
| **Pages** | Страница (`/[slug]`) |
| **Testimonials** | Главная (`/`) |

### Все пути revalidate на 3 языках

Каждый `revalidatePath` вызывается 3 раза: с `/ru/`, `/en/`, `/uk/`.

---

## Плагины

### @payloadcms/plugin-seo

Добавляет группу SEO-полей к выбранным коллекциям.

```typescript
// payload.config.ts
import { seoPlugin } from '@payloadcms/plugin-seo'

plugins: [
  seoPlugin({
    collections: [
      'service-categories',
      'services',
      'posts',
      'pages',
    ],
    // Автогенерация title и description
    generateTitle: ({ doc }) => `${doc.title} — Имя Эзотерика`,
    generateDescription: ({ doc }) => doc.shortDescription || doc.excerpt || '',
    generateURL: ({ doc, collectionSlug }) => {
      // логика генерации URL
    },
  }),
]
```

**Поля, добавляемые плагином (в каждую указанную коллекцию):**

| Поле | Тип | Localized | Описание |
|------|-----|-----------|----------|
| `meta.title` | text | ✅ | Meta title для `<title>` |
| `meta.description` | textarea | ✅ | Meta description |
| `meta.image` | relationship → Media | ❌ | OG image |

---

## Local API — примеры запросов

> Все страницы сайта получают данные через Payload Local API (без HTTP, напрямую из БД).

### Импорт

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
```

### Главная — категории услуг

```typescript
const categories = await payload.find({
  collection: 'service-categories',
  locale,
  sort: 'order',
})
// → categories.docs = [{ title, slug, shortDescription, icon, ... }]
```

### Главная — последние 3 поста

```typescript
const posts = await payload.find({
  collection: 'posts',
  locale,
  where: { status: { equals: 'published' } },
  sort: '-publishedAt',
  limit: 3,
})
```

### Главная — отзывы

```typescript
const testimonials = await payload.find({
  collection: 'testimonials',
  locale,
  where: { isActive: { equals: true } },
  sort: 'order',
})
```

### Страница раздела — категория + её услуги

```typescript
// Получить категорию
const category = await payload.find({
  collection: 'service-categories',
  where: { slug: { equals: categorySlug } },
  locale,
})

// Получить услуги этой категории
const services = await payload.find({
  collection: 'services',
  where: {
    category: { equals: category.docs[0].id },
    isActive: { equals: true },
  },
  locale,
  sort: 'order',
})
```

### Страница услуги

```typescript
const service = await payload.find({
  collection: 'services',
  where: { slug: { equals: serviceSlug } },
  locale,
  depth: 2,  // подгрузить связанную категорию и изображения
})
```

### Блог — список с пагинацией

```typescript
const posts = await payload.find({
  collection: 'posts',
  locale,
  where: { status: { equals: 'published' } },
  sort: '-publishedAt',
  page: currentPage,
  limit: 9,
})
// → posts.docs, posts.totalPages, posts.hasNextPage
```

### Блог — фильтр по категории

```typescript
const posts = await payload.find({
  collection: 'posts',
  locale,
  where: {
    status: { equals: 'published' },
    category: { equals: categoryId },
  },
  sort: '-publishedAt',
  limit: 9,
})
```

### Блог — один пост + prev/next

```typescript
const post = await payload.find({
  collection: 'posts',
  where: { slug: { equals: slug } },
  locale,
  depth: 2,
})

// Предыдущий пост
const prev = await payload.find({
  collection: 'posts',
  where: {
    status: { equals: 'published' },
    publishedAt: { less_than: post.docs[0].publishedAt },
  },
  sort: '-publishedAt',
  limit: 1,
  locale,
})

// Следующий пост
const next = await payload.find({
  collection: 'posts',
  where: {
    status: { equals: 'published' },
    publishedAt: { greater_than: post.docs[0].publishedAt },
  },
  sort: 'publishedAt',
  limit: 1,
  locale,
})
```

### Страница «Обо мне»

```typescript
const page = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'about' } },
  locale,
  depth: 2,
})
```

### generateStaticParams (SSG)

```typescript
// Для страниц разделов
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const categories = await payload.find({
    collection: 'service-categories',
    limit: 100,
  })

  const locales = ['ru', 'en', 'uk']

  return locales.flatMap(locale =>
    categories.docs.map(cat => ({
      locale,
      categorySlug: cat.slug,
    }))
  )
}
```

---

## Группировка в боковом меню админки

```
payload.config.ts → admin sidebar:

Услуги
├─ Категории услуг    (service-categories)   admin.group: 'Услуги'
└─ Услуги             (services)             admin.group: 'Услуги'

Блог
├─ Статьи             (posts)                admin.group: 'Блог'
└─ Категории блога    (post-categories)      admin.group: 'Блог'

Контент
├─ Страницы           (pages)                admin.group: 'Контент'
├─ Отзывы             (testimonials)         admin.group: 'Контент'
└─ Медиа              (media)                admin.group: 'Контент'
```

---

> ⚠️ При изменении коллекций — обнови этот файл и сделай коммит.
