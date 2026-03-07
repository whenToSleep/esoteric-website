import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users.ts'
import { Pages } from './collections/Pages.ts'
import { Media } from './collections/Media.ts'
import { ServiceCategories } from './collections/ServiceCategories.ts'
import { Services } from './collections/Services.ts'
import { Posts } from './collections/Posts.ts'
import { PostCategories } from './collections/PostCategories.ts'
import { Testimonials } from './collections/Testimonials.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
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
      { label: 'English', code: 'en', fallbackLocale: 'ru' },
      { label: 'Українська', code: 'uk', fallbackLocale: 'ru' },
    ],
    defaultLocale: 'ru',
    fallback: true,
  },
  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [vercelBlobStorage({
          collections: { media: true },
          token: process.env.BLOB_READ_WRITE_TOKEN,
          clientUploads: true,
        })]
      : []),
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
