import type { CollectionConfig } from 'payload'

import { admins, publishedOnly } from '@/lib/access'
import { revalidateSite, revalidateSiteAfterDelete } from '@/lib/revalidate'

/** Slugs used by category landing pages - a gown may not claim them. */
export const RESERVED_GOWN_SLUGS = ['photoshoot', 'baby-shower', 'western', 'south-asian']

const formatSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

export const Gowns: CollectionConfig = {
  slug: 'gowns',
  labels: { singular: 'Gown', plural: 'Gowns' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'availabilityStatus', 'featured', 'published', 'displayOrder'],
    listSearchableFields: ['name', 'slug', 'colorPrimary'],
    group: 'Catalog',
    description:
      'The collection. The availability badge shown on the site is the “Availability status” field in the sidebar - keep it current after every booking and return.',
  },
  access: {
    read: publishedOnly,
    create: admins,
    update: admins,
    delete: admins,
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (
          data?.availabilityStatus &&
          data.availabilityStatus !== originalDoc?.availabilityStatus
        ) {
          data.availabilityUpdatedAt = new Date().toISOString()
        }
        return data
      },
    ],
    afterChange: [revalidateSite],
    afterDelete: [revalidateSiteAfterDelete],
  },
  fields: [
    // ── Sidebar: the day-to-day controls ─────────────────────────────────────
    {
      name: 'availabilityStatus',
      type: 'select',
      required: true,
      defaultValue: 'contact_to_confirm',
      label: 'Availability status',
      admin: {
        position: 'sidebar',
        description:
          'The badge shown on the site. Set “On rental” when a gown goes out and switch it back to “Available” only after it is returned, inspected AND cleaned - that habit is the buffer between rentals.',
      },
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Limited', value: 'limited' },
        { label: 'On rental', value: 'on_rental' },
        { label: 'Contact to confirm', value: 'contact_to_confirm' },
      ],
    },
    {
      name: 'nextAvailableNote',
      type: 'text',
      label: 'Next-available note (optional)',
      admin: {
        position: 'sidebar',
        description: 'Shown with the badge, e.g. “Back after Nov 20”.',
        condition: (data) =>
          data?.availabilityStatus === 'on_rental' || data?.availabilityStatus === 'limited',
      },
    },
    {
      name: 'availabilityUpdatedAt',
      type: 'date',
      label: 'Availability last updated',
      admin: { position: 'sidebar', readOnly: true, date: { displayFormat: 'MMM d, yyyy h:mm a' } },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      label: 'Published (visible on the site)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured on homepage',
      admin: {
        position: 'sidebar',
        description:
          'Gowns with a movement video automatically appear first in the homepage featured section (and in “See them in motion”) - tick this to feature additional gowns.',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 99,
      label: 'Display order',
      admin: { position: 'sidebar', description: 'Lower numbers appear first in the collection.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'The gown’s web address: /gowns/[slug]. Filled automatically from the name.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            const source = typeof value === 'string' && value.length > 0 ? value : data?.name
            return typeof source === 'string' ? formatSlug(source) : value
          },
        ],
      },
      validate: (value: unknown) => {
        if (typeof value === 'string' && RESERVED_GOWN_SLUGS.includes(value)) {
          return `“${value}” is reserved for a category page - please choose a different slug.`
        }
        return true
      },
    },
    {
      name: 'condition',
      type: 'group',
      label: 'Condition (internal)',
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'conditionStatus',
          type: 'select',
          defaultValue: 'excellent',
          label: 'Condition',
          options: [
            { label: 'Excellent', value: 'excellent' },
            { label: 'Good', value: 'good' },
            { label: 'Needs repair', value: 'needs_repair' },
            { label: 'Retired', value: 'retired' },
          ],
        },
        { name: 'lastInspectedAt', type: 'date', label: 'Last inspected' },
        { name: 'conditionNotes', type: 'textarea', label: 'Condition notes' },
      ],
    },

    // ── Main: what she sees ──────────────────────────────────────────────────
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            { name: 'name', type: 'text', required: true, label: 'Gown name' },
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              maxLength: 160,
              label: 'One-liner',
              admin: {
                description:
                  'One evocative sentence used on cards and as the meta-description source, e.g. “Regal ruby-red lace, made for a grand moment.”',
              },
            },
            {
              name: 'fullDescription',
              type: 'richText',
              required: true,
              label: 'Full description',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'rentalPrice5Day',
                  type: 'number',
                  required: true,
                  min: 0,
                  label: '5-day rental price (CAD)',
                },
                {
                  name: 'rentalPrice10Day',
                  type: 'number',
                  required: true,
                  min: 0,
                  label: '10-day rental price (CAD)',
                },
              ],
            },
            {
              name: 'categories',
              type: 'select',
              hasMany: true,
              required: true,
              label: 'Occasions',
              options: [
                { label: 'Maternity photoshoot', value: 'photoshoot' },
                { label: 'Baby shower', value: 'baby-shower' },
              ],
            },
            {
              name: 'cultureEdit',
              type: 'select',
              required: true,
              defaultValue: 'classic',
              label: 'Curated edit',
              admin: {
                description:
                  '“For South-Asian shoots” gowns also appear in the South Asian collection page; “Classic / Western” gowns appear in the Western collection page. A styling grouping, not a garment type.',
              },
              options: [
                { label: 'Classic / Western', value: 'classic' },
                { label: 'For South-Asian shoots', value: 'south-asian-shoot' },
              ],
            },
            {
              name: 'styleTags',
              type: 'select',
              hasMany: true,
              label: 'Style / mood',
              options: [
                { label: 'Flowing', value: 'flowing' },
                { label: 'Fitted', value: 'fitted' },
                { label: 'Dramatic', value: 'dramatic' },
                { label: 'Minimal', value: 'minimal' },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'colorPrimary',
                  type: 'text',
                  required: true,
                  label: 'Colour (display name)',
                  admin: { description: 'E.g. “Ruby red”, “Dusty rose”.' },
                },
                {
                  name: 'colorFamily',
                  type: 'select',
                  required: true,
                  label: 'Colour family (for filtering)',
                  options: [
                    { label: 'Neutral', value: 'neutral' },
                    { label: 'Pastel', value: 'pastel' },
                    { label: 'Warm', value: 'warm' },
                    { label: 'Jewel', value: 'jewel' },
                    { label: 'Bold', value: 'bold' },
                  ],
                },
              ],
            },
            { name: 'fabric', type: 'text', label: 'Fabric & feel' },
            {
              name: 'bestFor',
              type: 'text',
              label: 'Best for',
              admin: {
                description: 'Occasion, setting and mood, e.g. “Grand photoshoots, indoor or ornate settings, regal drama”.',
              },
            },
          ],
        },
        {
          label: 'Photos & video',
          fields: [
            {
              name: 'primaryImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Primary image',
              admin: {
                description:
                  'The consistent catalogue image used on cards - same crop, lighting and background across every gown keeps the grid premium.',
              },
            },
            {
              name: 'images',
              type: 'array',
              label: 'Gallery images',
              labels: { singular: 'Image', plural: 'Images' },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                {
                  name: 'viewType',
                  type: 'select',
                  defaultValue: 'front',
                  options: [
                    { label: 'Front', value: 'front' },
                    { label: 'Side', value: 'side' },
                    { label: 'Back', value: 'back' },
                    { label: 'Detail', value: 'detail' },
                  ],
                },
              ],
            },
            {
              name: 'video',
              type: 'group',
              label: 'Movement video (optional)',
              admin: {
                description:
                  'Not every gown needs one - gowns without a video simply show their photos. Upload a compressed mp4 (720p, roughly 3–8 MB for a 6–10 second clip - see SETUP.md “Adding your videos”) plus a poster frame. Gowns with a video appear automatically in the homepage “See them in motion” strip.',
              },
              fields: [
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Video file (mp4)',
                },
                {
                  name: 'poster',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Poster frame (image shown before play)',
                },
              ],
            },
            {
              name: 'ugcPhotos',
              type: 'array',
              label: 'Real-customer photos',
              admin: {
                description:
                  'Only photos with the consent box ticked are ever shown on the site.',
              },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text' },
                {
                  name: 'consent',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Customer has consented to publication',
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'seoTitle',
                  type: 'text',
                  label: 'SEO title',
                  admin: {
                    description:
                      'Leave empty to use “[Name] - Maternity Gown Rental | Mummy2Be”.',
                  },
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  maxLength: 170,
                  label: 'Meta description',
                  admin: {
                    description:
                      'Leave empty to use “Rent [Name] - [one-liner] One size fits every bump…”.',
                  },
                },
                { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Social share image' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
