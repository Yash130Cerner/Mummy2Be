import { BUSINESS } from '@/lib/constants'

/**
 * Transactional email builders (Resend). The customer auto-reply uses the
 * locked confirmation copy verbatim (UX Spec §9): what happens next, no
 * payment taken, e-transfer/cash, prepaid return label.
 */

export type InquiryEmailData = {
  fullName: string
  phone: string
  email: string
  preferredContactMethod: string
  city: string
  province: string
  gownNames: string[]
  eventDate: string
  rentalPeriod: string
  preferredRentalDates: string
  deliveryOrPickupPreference?: string
  sizingQuestions?: string
  message?: string
  inquiryType: 'customer' | 'photographer'
  sourcePage?: string
}

const METHOD_LABELS: Record<string, string> = {
  call: 'call',
  text: 'text',
  whatsapp: 'WhatsApp',
  email: 'email',
}

const PERIOD_LABELS: Record<string, string> = {
  '5_day': '5 days',
  '10_day': '10 days',
}

const DELIVERY_LABELS: Record<string, string> = {
  canada_post: 'Canada Post shipping',
  local_gta: 'Local GTA delivery / pickup',
}

const wrap = (title: string, body: string) => `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#FAF6EF;">
    <div style="max-width:560px;margin:0 auto;padding:32px 20px;font-family:Georgia,serif;color:#37291F;">
      <p style="font-size:26px;margin:0 0 4px;">Mummy2Be</p>
      <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#6E5C4F;margin:0 0 24px;">Maternity gown rental in Ontario &amp; across Canada</p>
      <div style="background:#FFFFFF;border:1px solid #E3D8C8;border-radius:12px;padding:28px 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;">
        <h1 style="font-family:Georgia,serif;font-size:22px;font-weight:500;margin:0 0 16px;">${title}</h1>
        ${body}
      </div>
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:#6E5C4F;margin:20px 0 0;text-align:center;">
        ${BUSINESS.name}, ${BUSINESS.phoneDisplay}, ${BUSINESS.email}<br/>
        Based in the GTA, Ontario, serving all of Canada with a same-day reply
      </p>
    </div>
  </body>
</html>`

const row = (label: string, value: string) =>
  `<tr>
    <td style="padding:6px 12px 6px 0;color:#6E5C4F;font-size:13px;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="padding:6px 0;font-size:14px;">${escapeHtml(value)}</td>
  </tr>`

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Notification to the business - everything needed to reply the same day. */
export function buildOwnerEmail(data: InquiryEmailData): { subject: string; html: string; text: string } {
  const gownList = data.gownNames.length > 0 ? data.gownNames.join(', ') : '(no gown selected)'
  const typeLabel = data.inquiryType === 'photographer' ? 'PHOTOGRAPHER PARTNERSHIP' : 'Rental request'
  const subject =
    data.inquiryType === 'photographer'
      ? `Photographer inquiry - ${data.fullName}`
      : `New rental request - ${gownList} - ${data.fullName}`

  const rows = [
    row('Type', typeLabel),
    row('Name', data.fullName),
    row('Phone', data.phone),
    row('Email', data.email),
    row('Preferred contact', METHOD_LABELS[data.preferredContactMethod] ?? data.preferredContactMethod),
    row('City / Province', `${data.city}, ${data.province}`),
    row('Gown(s)', gownList),
    row('Event date', data.eventDate || '-'),
    row('Rental period', PERIOD_LABELS[data.rentalPeriod] ?? data.rentalPeriod ?? '-'),
    row('Preferred dates', data.preferredRentalDates || '-'),
    row(
      'Delivery',
      data.deliveryOrPickupPreference
        ? (DELIVERY_LABELS[data.deliveryOrPickupPreference] ?? data.deliveryOrPickupPreference)
        : '-',
    ),
    row('Fit questions', data.sizingQuestions || '-'),
    row('Message', data.message || '-'),
    row('Came from', data.sourcePage || '-'),
  ].join('')

  const html = wrap(
    'New inquiry - reply today 💌',
    `<p style="margin:0 0 16px;">A new inquiry just arrived. She’s expecting a <strong>same-day reply</strong> by <strong>${
      METHOD_LABELS[data.preferredContactMethod] ?? data.preferredContactMethod
    }</strong>.</p>
    <table style="border-collapse:collapse;width:100%;">${rows}</table>
    <p style="margin:16px 0 0;font-size:13px;color:#6E5C4F;">This inquiry is also saved in the admin panel under <strong>Bookings → Inquiries</strong>.</p>`,
  )

  const text = [
    `${typeLabel} from ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Preferred contact: ${data.preferredContactMethod}`,
    `City/Province: ${data.city}, ${data.province}`,
    `Gown(s): ${gownList}`,
    `Event date: ${data.eventDate || '-'}`,
    `Rental period: ${PERIOD_LABELS[data.rentalPeriod] ?? '-'}`,
    `Preferred dates: ${data.preferredRentalDates || '-'}`,
    `Delivery: ${data.deliveryOrPickupPreference ?? '-'}`,
    `Fit questions: ${data.sizingQuestions || '-'}`,
    `Message: ${data.message || '-'}`,
  ].join('\n')

  return { subject, html, text }
}

/** Auto-reply to the customer - the locked confirmation copy, personalized. */
export function buildCustomerEmail(data: InquiryEmailData): {
  subject: string
  html: string
  text: string
} {
  const gownLabel =
    data.gownNames.length > 1
      ? data.gownNames.join(', ')
      : (data.gownNames[0] ?? 'your gown')
  const method = METHOD_LABELS[data.preferredContactMethod] ?? data.preferredContactMethod
  const firstName = data.fullName.split(' ')[0]

  const subject = `We’ve received your request, ${firstName} - Mummy2Be`

  const html = wrap(
    `Thank you, ${escapeHtml(firstName)} - we’ve received your request for the ${escapeHtml(gownLabel)}.`,
    `<p style="margin:0 0 12px;">Here’s what happens next:</p>
    <ul style="margin:0 0 16px;padding-left:20px;">
      <li style="margin-bottom:10px;">We’ll personally check availability for your dates and confirm - you’ll hear from us <strong>the same day</strong>, by your preferred method (<strong>${escapeHtml(method)}</strong>).</li>
      <li style="margin-bottom:10px;">We’ll share your full <strong>rental total, Canada Post shipping cost, and the $100 refundable deposit</strong> details.</li>
      <li style="margin-bottom:10px;"><strong>No payment has been taken</strong> - nothing is charged online. When you’re ready, you can pay simply by <strong>e-transfer or cash</strong>.</li>
      <li style="margin-bottom:0;">Once confirmed, we ship your gown <strong>cleaned and ready</strong>, with a <strong>prepaid return label</strong> for an easy return within your rental window.</li>
    </ul>
    <p style="margin:0;color:#6E5C4F;font-style:italic;">Prefer to talk now? Message us on <a href="https://wa.me/${BUSINESS.whatsappNumber}" style="color:#9E5340;">WhatsApp</a> or call <a href="tel:${BUSINESS.phoneTel}" style="color:#9E5340;">${BUSINESS.phoneDisplay}</a> for the fastest reply.</p>`,
  )

  const text = `Thank you, ${firstName} - we’ve received your request for the ${gownLabel}.

Here’s what happens next:
• We’ll personally check availability for your dates and confirm - you’ll hear from us the same day, by your preferred method (${method}).
• We’ll share your full rental total, Canada Post shipping cost, and the $100 refundable deposit details.
• No payment has been taken - nothing is charged online. When you’re ready, you can pay simply by e-transfer or cash.
• Once confirmed, we ship your gown cleaned and ready, with a prepaid return label for an easy return within your rental window.

Prefer to talk now? Message us on WhatsApp (https://wa.me/${BUSINESS.whatsappNumber}) or call ${BUSINESS.phoneDisplay} for the fastest reply.

- The Mummy2Be Family`

  return { subject, html, text }
}
