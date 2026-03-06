import type { CollectionConfig } from 'payload'

export const ServiceCategories: CollectionConfig = {
  slug: 'service-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order'],
    group: 'Услуги',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Icon keyword: cards, candle, compass, book, spiral',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
