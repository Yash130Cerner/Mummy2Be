import path from 'path'
import { fileURLToPath } from 'url'

import type { CollectionConfig } from 'payload'

import { admins, anyone } from '@/lib/access'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Photo / video', plural: 'Photos & videos' },
  admin: {
    group: 'Catalog',
    description:
      'All gown photos and movement videos live here. Upload files, give each a clear description (alt text), then attach them to gowns.',
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: ['image/*', 'video/mp4', 'video/webm', 'video/quicktime'],
    adminThumbnail: 'card',
    focalPoint: true,
    imageSizes: [
      // Uniform 3:4 portrait crop used on product cards - keeps the grid premium.
      { name: 'card', width: 640, height: 853, position: 'centre' },
      { name: 'gallery', width: 1280 },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Description (alt text)',
      admin: {
        description:
          'Describe only what is actually in the photo, e.g. “Dusty-rose flowing maternity gown with a full train, photographed on a model at an outdoor shoot”. Our catalog shots are of a hired model, so never describe her as a customer or an expecting mom - that language belongs only to the consented Real moms gallery. Used for accessibility and SEO.',
      },
    },
  ],
}
