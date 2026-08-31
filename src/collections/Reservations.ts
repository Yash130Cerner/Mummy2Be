import type { CollectionConfig } from 'payload'

import { admins } from '@/lib/access'

export const Reservations: CollectionConfig = {
  slug: 'reservations',
  labels: { singular: 'Reservation', plural: 'Reservations' },
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'gown', 'status', 'rentalStartDate', 'createdAt'],
    group: 'Bookings',
    description:
      'Your behind-the-scenes record of each rental, from first contact to deposit refund. Customers never see this - it exists so nothing is forgotten.',
  },
  access: {
    create: admins,
    read: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'inquiry_received',
      label: 'Reservation status',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Inquiry received', value: 'inquiry_received' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Confirmed (dates + total agreed)', value: 'confirmed' },
        { label: 'Paid (e-transfer / cash received)', value: 'paid' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Active rental', value: 'active_rental' },
        { label: 'Returned', value: 'returned' },
        { label: 'Inspected', value: 'inspected' },
        { label: 'Deposit refunded', value: 'deposit_refunded' },
        { label: 'Completed', value: 'completed' },
        { label: 'On hold', value: 'on_hold' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    { name: 'customerName', type: 'text', required: true, label: 'Customer name' },
    {
      type: 'row',
      fields: [
        { name: 'gown', type: 'relationship', relationTo: 'gowns', label: 'Gown' },
        { name: 'inquiry', type: 'relationship', relationTo: 'inquiries', label: 'Original inquiry' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'eventDate', type: 'date', label: 'Event date' },
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
    {
      type: 'row',
      fields: [
        {
          name: 'rentalStartDate',
          type: 'date',
          label: 'Rental start (day she receives it)',
        },
        { name: 'rentalEndDate', type: 'date', label: 'Return due' },
      ],
    },
    {
      name: 'totalAgreed',
      type: 'number',
      min: 0,
      label: 'Total agreed (CAD, incl. shipping, excl. deposit)',
    },
    {
      name: 'deposit',
      type: 'group',
      label: 'Deposit',
      fields: [
        { name: 'amount', type: 'number', defaultValue: 100, label: 'Amount (CAD)' },
        {
          name: 'depositStatus',
          type: 'select',
          defaultValue: 'not_collected',
          label: 'Status',
          options: [
            { label: 'Not collected', value: 'not_collected' },
            { label: 'Held', value: 'held' },
            { label: 'Refunded in full', value: 'refunded' },
            { label: 'Partially withheld', value: 'partially_withheld' },
            { label: 'Withheld', value: 'withheld' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'collectedAt', type: 'date', label: 'Collected' },
            {
              name: 'refundedAt',
              type: 'date',
              label: 'Refunded (target: within 24h of return)',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'withheldAmount', type: 'number', min: 0, label: 'Withheld amount' },
            { name: 'withheldReason', type: 'text', label: 'Withheld reason' },
          ],
        },
      ],
    },
    {
      name: 'shipping',
      type: 'group',
      label: 'Shipping & return',
      fields: [
        {
          name: 'method',
          type: 'select',
          label: 'Method',
          options: [
            { label: 'Canada Post', value: 'canada_post' },
            { label: 'Local GTA delivery', value: 'local_gta_delivery' },
            { label: 'Local GTA pickup', value: 'local_gta_pickup' },
          ],
        },
        { name: 'costCharged', type: 'number', min: 0, label: 'Shipping charged (CAD)' },
        {
          type: 'row',
          fields: [
            { name: 'outboundTracking', type: 'text', label: 'Outbound tracking #' },
            { name: 'returnTracking', type: 'text', label: 'Return tracking #' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'shippedAt', type: 'date', label: 'Shipped' },
            { name: 'deliveredAt', type: 'date', label: 'Delivered' },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'returnLabelSentAt',
              type: 'date',
              label: 'Prepaid return label sent (digitally, when she’s ready)',
            },
            { name: 'returnedAt', type: 'date', label: 'Returned' },
          ],
        },
      ],
    },
    {
      name: 'condition',
      type: 'group',
      label: 'Condition & inspection',
      fields: [
        { name: 'preRentalCondition', type: 'textarea', label: 'Condition before shipping' },
        { name: 'postRentalCondition', type: 'textarea', label: 'Condition on return' },
        { name: 'damageNotes', type: 'textarea', label: 'Damage notes (if any)' },
        {
          name: 'inspectionStatus',
          type: 'select',
          defaultValue: 'pending',
          label: 'Inspection',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Passed - refund deposit within 24h', value: 'passed' },
            { label: 'Issues found', value: 'issues_found' },
          ],
        },
      ],
    },
    { name: 'notes', type: 'textarea', label: 'Internal notes' },
  ],
}
