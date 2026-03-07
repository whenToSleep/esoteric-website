import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate.ts'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'serviceCategory', 'isActive'],
    group: 'Контент',
    description: 'Отзывы клиентов. Отображаются на главной странице.',
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
      name: 'clientName',
      type: 'text',
      required: true,
      admin: {
        description: 'Имя клиента (как отображается на сайте)',
      },
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Текст отзыва',
      },
    },
    {
      name: 'serviceCategory',
      type: 'relationship',
      relationTo: 'service-categories',
      admin: {
        description: 'Какую услугу получил клиент (для бэйджа на карточке)',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Оценка от 1 до 5 (необязательно)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Снимите галочку, чтобы скрыть отзыв с сайта',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Порядок отображения (1 = первый)',
      },
    },
  ],
}
