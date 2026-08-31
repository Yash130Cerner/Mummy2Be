import type { CollectionConfig } from 'payload'

import { admins, anyone } from '@/lib/access'
import { revalidateSite, revalidateSiteAfterDelete } from '@/lib/revalidate'

/**
 * Long-form, owner-editable page content. The designed marketing pages keep
 * their layouts in code; the prose that genuinely changes over time lives here:
 *
 *  - `home`         → optional hero photo for the homepage (upload when the
 *                     hero photography is ready; until then an editorial art
 *                     treatment is shown).
 *  - `about-story`  → the founder story shown on /about.
 *  - `rental-terms` → the full rental terms shown on /rental-terms.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page content', plural: 'Page content' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    group: 'Content',
    description:
      'Editable content used by specific pages: “home” (hero photo), “about-story” (Our Story + behind-the-scenes video), “rental-terms” (Rental Terms). Do not change the slugs.',
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSiteAfterDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero image',
      admin: {
        description:
          'Only used by the “home” entry: upload the hero photo (a gown shot, studio or consented customer) and the homepage switches from the art treatment to full-bleed photography.',
      },
    },
    {
      name: 'btsVideo',
      type: 'group',
      label: 'Behind-the-scenes video',
      admin: {
        description:
          'Only used by the “about-story” entry: upload the single behind-the-scenes clip (compressed mp4) and a poster frame, and it appears in the “behind the scenes” section of the About page.',
      },
      fields: [
        { name: 'file', type: 'upload', relationTo: 'media', label: 'Video file (mp4)' },
        {
          name: 'poster',
          type: 'upload',
          relationTo: 'media',
          label: 'Poster frame (image shown before play)',
        },
      ],
    },
    { name: 'body', type: 'richText', label: 'Body' },
  ],
}
