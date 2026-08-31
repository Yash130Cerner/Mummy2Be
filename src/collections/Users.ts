import type { CollectionConfig } from 'payload'

import { admins } from '@/lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Admin user', plural: 'Admin users' },
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
    description: 'People who can log in to this admin panel.',
  },
  auth: true,
  access: {
    read: admins,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
    },
  ],
}
