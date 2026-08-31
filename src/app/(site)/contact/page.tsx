import type { Metadata } from 'next'

import { ContactOptions } from '@/components/contact/ContactOptions'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { BUSINESS } from '@/lib/constants'
import { breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const revalidate = 3600

export const metadata: Metadata = pageMeta({
  title: 'Contact Mummy2Be - Maternity Gown Rental',
  description:
    'Reach Mummy2Be by phone, text, WhatsApp, email, or our inquiry form. Based in Eastern Time - we reply the same day. Ask about availability, styling, or local delivery in the GTA.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])}
      />

      <div className="container-page pt-10 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-display">Reach us any way you like</h1>
          <p className="mt-4 text-body-lg text-cocoa-light">
            Have a question, or ready to reserve? Message us however’s easiest - we’re based in
            Eastern Time and reply the same day.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl md:mt-14">
          <ContactOptions context="contact-page" />
        </div>

        <section aria-labelledby="request-heading" className="mx-auto mt-12 max-w-2xl">
          <div className="rounded-soft-lg bg-champagne p-6 text-center md:p-8">
            <h2 id="request-heading" className="text-h3">
              Ready to reserve a gown?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[15px] text-cocoa-light">
              Send the quick request form and we’ll personally confirm availability, your dates,
              and your total - no payment is taken online.
            </p>
            <ButtonLink href="/rental-request" variant="primary" size="lg" className="mt-5">
              Send a rental request
            </ButtonLink>
          </div>
        </section>

        <section aria-labelledby="where-heading" className="mx-auto mt-12 max-w-2xl pb-4 text-center">
          <h2 id="where-heading" className="font-sans text-[16px] font-semibold">
            Where we are
          </h2>
          <p className="mt-2 text-[15px] text-cocoa-light">
            {BUSINESS.baseArea}, {BUSINESS.serves.toLowerCase()}
            <br />
            {BUSINESS.hoursNote} Availability is always confirmed personally - the badge on each
            gown gives you a live sense, and we confirm your exact dates when you message.
          </p>
        </section>
      </div>
    </>
  )
}
