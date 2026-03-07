import type { Field } from 'payload'

const formatSlug = (val: string): string =>
  val
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')

export const slugField = (description?: string): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: description || 'URL-адрес (латиницей, без пробелов)',
  },
  hooks: {
    beforeValidate: [
      ({ value }) => {
        if (typeof value === 'string') {
          return formatSlug(value)
        }
        return value
      },
    ],
  },
})
