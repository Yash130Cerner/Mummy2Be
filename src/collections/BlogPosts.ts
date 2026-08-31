import type { CollectionConfig } from 'payload'

import { admins, publishedOnly } from '@/lib/access'
import { revalidateSite, revalidateSiteAfterDelete } from '@/lib/revalidate'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: { singular: 'Article', plural: 'Style Journal articles' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'published'],
    group: 'Content',
    description:
      'The Style Journal. Every article should link readers to at least one collection page and one gown.',
  },
  access: {
    read: publishedOnly,
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
      admin: { position: 'sidebar', description: 'URL: /blog/[slug]' },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      label: 'Published (visible on the site)',
      admin: { position: 'sidebar' },
    },
    { name: 'publishedAt', type: 'date', label: 'Publish date', admin: { position: 'sidebar' } },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: { description: 'Shown on the article card and used as the default meta description.' },
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero image (optional)' },
    { name: 'body', type: 'richText', required: true },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'seoTitle', type: 'text', label: 'SEO title' },
        { name: 'metaDescription', type: 'textarea', maxLength: 170, label: 'Meta description' },
      ],
    },
  ],
}
