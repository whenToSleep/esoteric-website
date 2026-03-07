import type { CollectionConfig } from 'payload'
import { slugField } from './hooks/slugField.ts'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate.ts'

export const PostCategories: CollectionConfig = {
  slug: 'post-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    group: 'Блог',
    description: 'Категории для статей блога (для фильтрации).',
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
        await req.payload.update({
          collection: 'posts',
          where: { category: { equals: id } },
          data: { category: null as unknown as number },
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
        description: 'Название категории блога',
      },
    },
    slugField('URL-адрес категории (латиницей)'),
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Описание категории (необязательно)',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Порядок отображения (1 = первая)',
      },
    },
  ],
}
