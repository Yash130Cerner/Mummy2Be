import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { BlogPosts } from '@/collections/BlogPosts'
import { Faqs } from '@/collections/Faqs'
import { Gowns } from '@/collections/Gowns'
import { Inquiries } from '@/collections/Inquiries'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { RealMoms } from '@/collections/RealMoms'
import { Reservations } from '@/collections/Reservations'
import { Testimonials } from '@/collections/Testimonials'
import { Users } from '@/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' - Mummy2Be Admin',
    },
    dateFormat: 'MMM d, yyyy',
  },
  collections: [
    Gowns,
    Media,
    Inquiries,
    Reservations,
    Faqs,
    Testimonials,
    RealMoms,
    BlogPosts,
    Pages,
    Users,
  ],
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
  graphQL: {
    disable: true,
  },
  upload: {
    limits: {
      // Movement videos can be large; local dev accepts up to 200 MB.
      // In production, uploads go straight from the browser to Vercel Blob
      // (clientUploads), bypassing the serverless body-size limit.
      fileSize: 200 * 1024 * 1024,
    },
  },
  plugins: [
    /**
     * Production media storage: Vercel Blob (persistent + CDN-served).
     * - Self-disables when BLOB_READ_WRITE_TOKEN is unset (local dev falls
     *   back to the /media folder on disk).
     * - `clientUploads` sends files straight from the browser to Blob,
     *   bypassing the ~4.5 MB serverless body limit (needed for videos).
     * - `disablePayloadAccessControl` makes media URLs point directly at the
     *   Blob CDN - images and videos stream from the CDN (with range-request
     *   support for video scrubbing), never through a serverless function.
     * - `alwaysInsertFields` keeps the database schema identical whether or
     *   not the token is present, so dev and production never drift.
     */
    vercelBlobStorage({
      collections: {
        media: {
          disablePayloadAccessControl: true,
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
      alwaysInsertFields: true,
    }),
  ],
})
