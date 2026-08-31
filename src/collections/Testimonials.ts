import type { CollectionConfig } from 'payload'

import { admins, anyone } from '@/lib/access'
import { revalidateSite, revalidateSiteAfterDelete } from '@/lib/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'context', 'displayOrder'],
    group: 'Content',
    description:
      'Real customer reviews only - with their permission. Testimonial sections on the site appear automatically once entries exist here.',
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
    { name: 'name', type: 'text', required: true, label: 'First name (as she’d like it shown)' },
    { name: 'quote', type: 'textarea', required: true, label: 'Her words' },
    {
      name: 'context',
      type: 'text',
      label: 'Context',
      admin: { description: 'E.g. “Maternity photoshoot, 32 weeks - Toronto”.' },
    },
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Photo (optional, with consent)' },
    { name: 'gown', type: 'relationship', relationTo: 'gowns', label: 'Gown she rented (optional)' },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 99,
      admin: { position: 'sidebar' },
    },
  ],
}
