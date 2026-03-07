import type { CollectionConfig } from 'payload'
import { slugField } from './hooks/slugField.ts'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate.ts'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    group: 'Блог',
    description: 'Статьи блога. Черновики видите только вы, опубликованные — все посетители.',
  },
  access: {
    read: ({ req }) => {
      if (!req.user) {
        return { status: { equals: 'published' } }
      }
      return true
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Заголовок статьи',
      },
    },
    slugField('URL-адрес статьи (латиницей). Например: tarot-beginners-guide'),
    {
      name: 'content',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Текст статьи. Используйте форматирование: заголовки, списки, жирный текст, изображения.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Краткое описание для карточки и SEO (2-3 предложения). Если пустое — будет взято из начала текста.',
      },
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Главное изображение статьи. Рекомендуемый размер: 1200×675px (16:9)',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'post-categories',
      admin: {
        description: 'Категория блога. Используется для фильтрации.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Дата публикации. Отображается на сайте.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Черновик — видите только вы. Опубликовано — видят все посетители.',
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Время чтения в минутах. Рассчитывается автоматически, но можно указать вручную.',
      },
    },
  ],
}
