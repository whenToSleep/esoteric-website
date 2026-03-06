import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from '@/collections/Users'
import { Pages } from '@/collections/Pages'
import { Media } from '@/collections/Media'
import { ServiceCategories } from '@/collections/ServiceCategories'
import { Services } from '@/collections/Services'
import { Posts } from '@/collections/Posts'
import { PostCategories } from '@/collections/PostCategories'
import { Testimonials } from '@/collections/Testimonials'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    ServiceCategories,
    Services,
    Posts,
    PostCategories,
    Pages,
    Media,
    Testimonials,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  localization: {
    locales: [
      { label: 'Русский', code: 'ru' },
      { label: 'English', code: 'en' },
      { label: 'Українська', code: 'uk' },
    ],
    defaultLocale: 'ru',
    fallback: true,
  },
  plugins: [
    seoPlugin({
      collections: ['service-categories', 'services', 'posts', 'pages'],
      generateTitle: ({ doc }) =>
        `${(doc as Record<string, unknown>).title ?? ''} — Mori Norman`,
      generateDescription: ({ doc }) => {
        const d = doc as Record<string, unknown>
        return ((d.shortDescription || d.excerpt || '') as string)
      },
    }),
  ],
})
