import type { CollectionConfig } from 'payload'
import { slugField } from './hooks/slugField.ts'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidate.ts'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'isActive'],
    group: 'Услуги',
    description: 'Все услуги, которые вы предоставляете. Каждая услуга принадлежит одному из разделов.',
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
        description: 'Название услуги. Например: «Персональный расклад Таро»',
      },
    },
    slugField('URL-адрес услуги (латиницей). Например: personal-reading'),
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Краткое описание для карточки (1-2 предложения). Видно на странице раздела.',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Полное описание услуги. Видно на отдельной странице услуги.',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'service-categories',
      required: true,
      admin: {
        description: 'К какому разделу относится эта услуга',
      },
    },
    {
      name: 'price',
      type: 'text',
      admin: {
        description: 'Цена. Можно написать число, «от 50€» или «по договорённости»',
      },
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        description: 'Длительность. Например: «60 минут», «1.5-2 часа»',
      },
    },
    {
      name: 'format',
      type: 'select',
      options: [
        { label: 'Online', value: 'online' },
        { label: 'Offline', value: 'offline' },
        { label: 'Both', value: 'both' },
      ],
      admin: {
        description: 'Формат проведения: онлайн, оффлайн или оба варианта',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Ключевое слово для иконки (необязательно)',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'faq',
      type: 'array',
      localized: true,
      admin: {
        description: 'Вопросы и ответы. Отображаются как аккордеон на странице услуги.',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          admin: {
            description: 'Вопрос',
          },
        },
        {
          name: 'answer',
          type: 'textarea',
          admin: {
            description: 'Ответ',
          },
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Снимите галочку, чтобы скрыть услугу с сайта (не удаляя её)',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Порядок отображения внутри раздела (1 = первая)',
      },
    },
  ],
}
