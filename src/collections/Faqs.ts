import type { CollectionConfig } from 'payload'

import { admins, anyone } from '@/lib/access'
import { revalidateSite, revalidateSiteAfterDelete } from '@/lib/revalidate'

export const FAQ_GROUPS = [
  { label: 'The gowns & fit', value: 'gowns-fit' },
  { label: 'Booking & availability', value: 'booking-availability' },
  { label: 'Payment & deposit', value: 'payment-deposit' },
  { label: 'Shipping & returns', value: 'shipping-returns' },
  { label: 'About us', value: 'about-us' },
]

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'group', 'featuredOnHome', 'displayOrder'],
    group: 'Content',
    description: 'Questions and answers shown on the FAQ page (and previewed on the homepage and gown pages).',
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
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    {
      name: 'group',
      type: 'select',
      required: true,
      options: FAQ_GROUPS,
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 99,
      admin: { position: 'sidebar', description: 'Lower numbers appear first within their group.' },
    },
    {
      name: 'featuredOnHome',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show in the homepage FAQ preview',
      admin: { position: 'sidebar' },
    },
    {
      name: 'showOnProduct',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show on gown pages',
      admin: { position: 'sidebar' },
    },
  ],
}
