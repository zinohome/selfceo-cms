import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { zh } from '@payloadcms/translations/languages/zh'
import path from 'path'
import { fileURLToPath } from 'url'

import { Meditations } from './collections/Meditations'
import { Courses } from './collections/Courses'
import { CourseLessons } from './collections/CourseLessons'
import { Fragments } from './collections/Fragments'
import { RelationshipScenarios } from './collections/RelationshipScenarios'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'CHANGE_THIS_IN_PRODUCTION',
  // Payload sanitize.js auto-adds serverURL to csrf; cookie auth requires Sec-Fetch-Site: same-origin
  // which all modern browsers send for same-origin JS fetch requests
  csrf: [],
  admin: {
    user: Users.slug,
    theme: 'auto',
  },
  i18n: {
    supportedLanguages: { zh },
    fallbackLanguage: 'zh',
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET || 'selfceo-media',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || 'minioadmin',
          secretAccessKey: process.env.S3_SECRET_KEY || 'minioadmin',
        },
        region: process.env.S3_REGION || 'us-east-1',
        ...(process.env.S3_ENDPOINT
          ? {
              endpoint: process.env.S3_ENDPOINT,
              forcePathStyle: true,  // MinIO requires path-style URLs
            }
          : {}),
      },
    }),
  ],
  collections: [Meditations, Courses, CourseLessons, Fragments, RelationshipScenarios, Media, Users],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL,
})
