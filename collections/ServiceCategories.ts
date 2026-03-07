import type { CollectionConfig } from 'payload'
import { slugField } from './hooks/slugField.ts'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate.ts'

export const ServiceCategories: CollectionConfig = {
  slug: 'service-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order'],
    group: 'Услуги',
    description: 'Разделы услуг (Таро, Ритуалистика и др.). Каждый раздел содержит несколько услуг.',
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
    beforeDelete: [
      async ({ id, req }) => {
        await req.payload.delete({
          collection: 'services',
          where: { category: { equals: id } },
        })
        await req.payload.update({
          collection: 'testimonials',
          where: { serviceCategory: { equals: id } },
          data: { serviceCategory: null as unknown as number },
        })
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Название раздела. Отображается в меню и на странице раздела.',
      },
    },
    slugField('URL-адрес раздела (латиницей, без пробелов). Например: tarot, rituals'),
    {
      name: 'description',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Подробное описание раздела. Отображается на странице раздела.',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Краткое описание для карточки на главной странице (1-2 предложения).',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Ключевое слово для иконки (cards, candle, compass, book, spiral)',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Фоновое изображение для Hero секции раздела (рекомендуемый размер: 1920x800)',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Порядок отображения на сайте (1 = первый)',
      },
    },
  ],
}
