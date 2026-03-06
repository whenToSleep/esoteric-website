import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'serviceCategory', 'isActive'],
    group: 'Контент',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'serviceCategory',
      type: 'relationship',
      relationTo: 'service-categories',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
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
