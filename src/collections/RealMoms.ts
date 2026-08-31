import type { CollectionConfig } from 'payload'

import { admins } from '@/lib/access'
import { revalidateSite, revalidateSiteAfterDelete } from '@/lib/revalidate'

export const RealMoms: CollectionConfig = {
  slug: 'real-moms',
  labels: { singular: 'Real-mom photo', plural: 'Real moms gallery' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'gown', 'occasion', 'consent', 'displayOrder'],
    group: 'Content',
    description:
      'Real customer shoot photos. A photo only appears on the site once its consent box is ticked - never publish without permission.',
  },
  access: {
    // The site only ever shows consented entries; admins see everything.
    read: ({ req }) => (req.user ? true : { consent: { equals: true } }),
    create: admins,
    update: admins,
    delete: admins,
  },
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSiteAfterDelete],
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Mom’s first name' },
    { name: 'photo', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'weeks',
      type: 'text',
      label: 'Bump stage',
      admin: { description: 'E.g. “34 weeks”.' },
    },
    { name: 'occasion', type: 'text', label: 'Occasion / setting', admin: { description: 'E.g. “golden-hour photoshoot, Mississauga”.' } },
    { name: 'gown', type: 'relationship', relationTo: 'gowns', label: 'Gown in the photo' },
    {
      name: 'consent',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      label: 'She has consented to this photo being published',
    },
    { name: 'displayOrder', type: 'number', defaultValue: 99, admin: { position: 'sidebar' } },
  ],
}
