import type { CollectionConfig } from 'payload'

import { admins, anyone } from '@/lib/access'

export const PROVINCES = [
  'Ontario',
  'Quebec',
  'British Columbia',
  'Alberta',
  'Manitoba',
  'Saskatchewan',
  'Nova Scotia',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Prince Edward Island',
  'Northwest Territories',
  'Yukon',
  'Nunavut',
]

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Inquiry', plural: 'Inquiries' },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'gownNames', 'eventDate', 'preferredContactMethod', 'status', 'createdAt'],
    group: 'Bookings',
    description:
      'Every rental request lands here the moment it is sent - reply the same day on the customer’s preferred channel. Create a Reservation from an inquiry once you confirm dates.',
  },
  access: {
    // Created by the public inquiry API route; only admins may read or manage.
    create: anyone,
    read: admins,
    update: admins,
    delete: admins,
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && data && !data.submittedAt) {
          data.submittedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'Inbox status',
      admin: { position: 'sidebar' },
      options: [
        { label: 'New - reply today', value: 'new' },
        { label: 'Replied', value: 'replied' },
        { label: 'Reservation created', value: 'reservation_created' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    {
      name: 'inquiryType',
      type: 'select',
      defaultValue: 'customer',
      label: 'Type',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Customer rental request', value: 'customer' },
        { label: 'Photographer partnership', value: 'photographer' },
      ],
    },
    { name: 'submittedAt', type: 'date', label: 'Submitted at', admin: { position: 'sidebar', readOnly: true } },
    { name: 'sourcePage', type: 'text', label: 'Came from page', admin: { position: 'sidebar', readOnly: true } },

    { name: 'fullName', type: 'text', required: true, label: 'Full name' },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', required: true, label: 'Phone' },
        { name: 'email', type: 'email', required: true, label: 'Email' },
      ],
    },
    {
      name: 'preferredContactMethod',
      type: 'select',
      required: true,
      label: 'Preferred contact method',
      options: [
        { label: 'Call', value: 'call' },
        { label: 'Text', value: 'text' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Email', value: 'email' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'city', type: 'text', label: 'City' },
        {
          name: 'province',
          type: 'select',
          label: 'Province',
          options: PROVINCES.map((p) => ({ label: p, value: p })),
        },
      ],
    },
    {
      name: 'gowns',
      type: 'relationship',
      relationTo: 'gowns',
      hasMany: true,
      label: 'Requested gown(s)',
    },
    {
      name: 'gownNames',
      type: 'text',
      label: 'Requested gown(s) - names',
      admin: { description: 'Snapshot of the gown names at the time of the request.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'eventDate', type: 'date', label: 'Event / photoshoot date' },
        {
          name: 'rentalPeriod',
          type: 'select',
          label: 'Rental period',
          options: [
            { label: '5 days', value: '5_day' },
            { label: '10 days', value: '10_day' },
          ],
        },
      ],
    },
    { name: 'preferredRentalDates', type: 'text', label: 'Preferred rental dates' },
    {
      name: 'deliveryOrPickupPreference',
      type: 'select',
      label: 'Delivery preference',
      options: [
        { label: 'Canada Post shipping', value: 'canada_post' },
        { label: 'Local GTA delivery / pickup', value: 'local_gta' },
      ],
    },
    { name: 'sizingQuestions', type: 'textarea', label: 'Sizing / fit questions' },
    { name: 'message', type: 'textarea', label: 'Message / special request' },
    { name: 'consent', type: 'checkbox', required: true, label: 'Agreed to rental terms' },
  ],
}
