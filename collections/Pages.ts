import type { CollectionConfig } from 'payload'
import { slugField } from './hooks/slugField.ts'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate.ts'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
    group: 'Контент',
    description: 'Статические страницы сайта (Обо мне и др.)',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Название страницы',
      },
    },
    slugField('URL-адрес страницы (латиницей)'),
    {
      name: 'content',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Содержание страницы. Для «Обо мне»: расскажите о себе, вашем пути и опыте.',
      },
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Главное фото. Для «Обо мне» — ваш портрет. Рекомендуемый размер: 800×800px',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      admin: {
        description: 'Дополнительные фото (сертификаты, рабочее место, атмосфера)',
      },
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
          admin: {
            description: 'Подпись к фото (необязательно)',
          },
        },
      ],
    },
    {
      name: 'timeline',
      type: 'array',
      admin: {
        description: 'Таймлайн «Мой путь». Отображается на странице «Обо мне» в виде вертикальной линии с событиями.',
      },
      fields: [
        {
          name: 'year',
          type: 'text',
          required: true,
          admin: {
            description: 'Год или период. Например: «2018» или «2020-2022»',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Краткое описание события. Например: «Начало пути в эзотерике»',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Черновик или опубликовано',
      },
    },
  ],
}
