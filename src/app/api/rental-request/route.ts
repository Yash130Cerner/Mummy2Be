import config from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { Resend } from 'resend'

import { PROVINCES } from '@/collections/Inquiries'
import { buildCustomerEmail, buildOwnerEmail, type InquiryEmailData } from '@/emails/inquiry'

/**
 * POST /api/rental-request - the site’s primary conversion.
 * (a) validates, (b) stores the Inquiry in Payload, (c) emails the owner,
 * (d) sends the customer auto-reply. NO payment step of any kind.
 *
 * Email sending is best-effort: once the inquiry is safely stored, an email
 * hiccup never turns into a lost lead (it’s in the admin inbox regardless).
 */

type Body = Record<string, unknown>

const CONTACT_METHODS = ['call', 'text', 'whatsapp', 'email']
const RENTAL_PERIODS = ['5_day', '10_day']
const DELIVERY_PREFS = ['canada_post', 'local_gta']

const str = (value: unknown, max = 2000): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

export async function POST(request: Request) {
  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success.
  if (str(body.website)) {
    return NextResponse.json({ ok: true })
  }

  const inquiryType = str(body.inquiryType) === 'photographer' ? 'photographer' : 'customer'

  const fullName = str(body.fullName, 120)
  const phone = str(body.phone, 40)
  const email = str(body.email, 160)
  const preferredContactMethod = str(body.preferredContactMethod)
  const city = str(body.city, 120)
  const province = str(body.province, 60)
  const gownSlugs = Array.isArray(body.gowns)
    ? body.gowns.filter((g): g is string => typeof g === 'string').slice(0, 20)
    : []
  const eventDate = str(body.eventDate, 30)
  const rentalPeriod = str(body.rentalPeriod)
  const preferredRentalDates = str(body.preferredRentalDates, 200)
  const deliveryOrPickupPreference = str(body.deliveryOrPickupPreference)
  const sizingQuestions = str(body.sizingQuestions)
  const message = str(body.message)
  const consent = body.consent === true
  const sourcePage = str(body.sourcePage, 200)

  // ── Validation ─────────────────────────────────────────────────────────────
  const errors: Record<string, string> = {}
  if (fullName.length < 2) errors.fullName = 'Please tell us your name.'
  if (phone.replace(/\D/g, '').length < 7) errors.phone = 'Please enter a phone number we can reach you on.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.'
  if (!CONTACT_METHODS.includes(preferredContactMethod))
    errors.preferredContactMethod = 'Please choose how you’d like us to reach you.'
  if (!consent) errors.consent = 'Please agree to the rental terms.'

  if (inquiryType === 'customer') {
    if (!city) errors.city = 'Please enter your city.'
    if (!PROVINCES.includes(province)) errors.province = 'Please choose your province.'
    if (gownSlugs.length === 0) errors.gowns = 'Please choose at least one gown.'
    if (!eventDate) errors.eventDate = 'Please tell us your event or photoshoot date.'
    if (!RENTAL_PERIODS.includes(rentalPeriod)) errors.rentalPeriod = 'Please choose a rental period.'
    if (!preferredRentalDates) errors.preferredRentalDates = 'Please tell us your preferred rental dates.'
  }
  if (deliveryOrPickupPreference && !DELIVERY_PREFS.includes(deliveryOrPickupPreference)) {
    errors.deliveryOrPickupPreference = 'Please choose a delivery option.'
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 })
  }

  // ── Store the inquiry ──────────────────────────────────────────────────────
  const payload = await getPayload({ config })

  let gownIds: number[] = []
  let gownNames: string[] = []
  if (gownSlugs.length > 0) {
    const found = await payload.find({
      collection: 'gowns',
      where: { slug: { in: gownSlugs } },
      limit: 20,
      depth: 0,
    })
    gownIds = found.docs.map((g) => g.id)
    gownNames = found.docs.map((g) => g.name)
    if (inquiryType === 'customer' && gownIds.length === 0) {
      return NextResponse.json(
        { ok: false, errors: { gowns: 'We couldn’t find that gown - please pick it again.' } },
        { status: 422 },
      )
    }
  }

  try {
    await payload.create({
      collection: 'inquiries',
      data: {
        inquiryType,
        fullName,
        phone,
        email,
        preferredContactMethod: preferredContactMethod as 'call' | 'text' | 'whatsapp' | 'email',
        city,
        province: (PROVINCES.includes(province) ? province : undefined) as never,
        gowns: gownIds,
        gownNames: gownNames.join(', '),
        eventDate: eventDate || undefined,
        rentalPeriod: (RENTAL_PERIODS.includes(rentalPeriod) ? rentalPeriod : undefined) as never,
        preferredRentalDates,
        deliveryOrPickupPreference: (DELIVERY_PREFS.includes(deliveryOrPickupPreference)
          ? deliveryOrPickupPreference
          : undefined) as never,
        sizingQuestions,
        message,
        consent,
        sourcePage,
        status: 'new',
      },
      context: { disableRevalidate: true },
    })
  } catch (error) {
    payload.logger.error({ err: error }, 'Failed to store inquiry')
    return NextResponse.json(
      { ok: false, error: 'store_failed' },
      { status: 500 },
    )
  }

  // ── Send emails (best-effort - the lead is already safe) ──────────────────
  const emailData: InquiryEmailData = {
    fullName,
    phone,
    email,
    preferredContactMethod,
    city,
    province,
    gownNames,
    eventDate,
    rentalPeriod,
    preferredRentalDates,
    deliveryOrPickupPreference: deliveryOrPickupPreference || undefined,
    sizingQuestions: sizingQuestions || undefined,
    message: message || undefined,
    inquiryType,
    sourcePage: sourcePage || undefined,
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM || 'Mummy2Be <onboarding@resend.dev>'
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || 'RentWithMummy2Be@gmail.com'

  if (apiKey) {
    const resend = new Resend(apiKey)
    const owner = buildOwnerEmail(emailData)
    const customer = buildCustomerEmail(emailData)

    const [ownerResult, customerResult] = await Promise.allSettled([
      resend.emails.send({
        from,
        to: ownerEmail,
        replyTo: email,
        subject: owner.subject,
        html: owner.html,
        text: owner.text,
      }),
      resend.emails.send({
        from,
        to: email,
        replyTo: ownerEmail,
        subject: customer.subject,
        html: customer.html,
        text: customer.text,
      }),
    ])
    if (ownerResult.status === 'rejected') {
      payload.logger.error({ err: ownerResult.reason }, 'Owner notification email failed')
    } else if (ownerResult.value.error) {
      payload.logger.error({ err: ownerResult.value.error }, 'Owner notification email failed')
    }
    if (customerResult.status === 'rejected') {
      payload.logger.error({ err: customerResult.reason }, 'Customer auto-reply email failed')
    } else if (customerResult.value.error) {
      payload.logger.error({ err: customerResult.value.error }, 'Customer auto-reply email failed')
    }
  } else {
    payload.logger.warn(
      'RESEND_API_KEY is not set - inquiry stored, but no notification emails were sent.',
    )
  }

  return NextResponse.json({ ok: true })
}
