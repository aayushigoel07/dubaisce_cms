//@ts-nocheck
import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/pages'
import { Translations } from './collections/translations'
import { Cards }  from './collections/cards'
import { News } from './collections/News'
import { SubFooter } from './globals/SubFooter'
import { SiteFooter } from './globals/SiteFooter'
import { Header } from './globals/SIteHeader'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL
const frontendURL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:5173'
const allowedOrigins = Array.from(
  new Set([
    frontendURL,
    process.env.NEXT_PUBLIC_SERVER_URL,
    'http://localhost:3000',
    'http://localhost:3001',
  ].filter((origin): origin is string => Boolean(origin))),
)

export default buildConfig({
  ...(serverURL ? { serverURL } : {}),
  cors: allowedOrigins,
  csrf: allowedOrigins,

  localization: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    fallback: true,
  },
  
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users, 
    Media, 
    Pages,
    Cards,
    News,
    Translations,
  ],
   globals: [SubFooter, SiteFooter, Header],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
  collections: {
    media: true, // Just set to true for now to use default behavior
  },
  bucket: process.env.R2_BUCKET || '',
  config: {
    endpoint: process.env.R2_ENDPOINT || '',
    region: 'auto',
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
  },
}),
  ],
})
