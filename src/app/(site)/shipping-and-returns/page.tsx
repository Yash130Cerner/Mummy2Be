import type { Metadata } from 'next'
import Link from 'next/link'

import { CtaBand } from '@/components/sections/CtaBand'
import { JsonLd } from '@/components/ui/JsonLd'
import { COPY } from '@/lib/constants'
import { breadcrumbSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const revalidate = 3600

export const metadata: Metadata = pageMeta({
  title: 'Shipping & Returns - Maternity Gown Rental | Mummy2Be',
  description:
    'How Mummy2Be ships and handles returns: Canada Post delivery across Canada, free local delivery in the GTA, 5- and 10-day rentals, a prepaid return label, and a deposit back in 24 hours.',
  path: '/shipping-and-returns',
})

const SECTIONS = [
  {
    id: 'getting-your-gown',
    title: 'Getting your gown',
    body: (
      <>
        <p>{COPY.shipping}</p>
        <p className="mt-3">
          Shipping is tracked door-to-door, and every gown leaves us professionally cleaned,
          inspected, and carefully packed. We recommend reserving so your gown arrives a couple of
          days before your shoot - a relaxed fit-check, with time to spare.
        </p>
      </>
    ),
  },
  {
    id: 'rental-window',
    title: 'Your rental window',
    body: (
      <p>
        Choose <strong>5 days or 10 days</strong>. Your window starts the day you{' '}
        <strong>receive</strong> the gown - not the day we ship it - so transit time never eats
        into your rental. Wear it for your moment, then send it back within your window.
      </p>
    ),
  },
  {
    id: 'sending-it-back',
    title: 'Sending it back',
    body: (
      <>
        <p>{COPY.returns}</p>
        <p className="mt-3">
          When you’re ready, message us and we’ll email your prepaid Canada Post label - print it,
          attach it, and drop the parcel at any post office. That’s the whole return.
        </p>
      </>
    ),
  },
  {
    id: 'your-deposit-back',
    title: 'Your deposit back',
    body: (
      <>
        <p>{COPY.deposit}</p>
        <p className="mt-3">
          Once your gown arrives back and passes its quick inspection, your full $100 comes back
          by e-transfer <strong>within 24 hours</strong>. Normal wear from a shoot is completely
          fine - the details live in our{' '}
          <Link href="/rental-terms" className="font-medium underline underline-offset-4">
            rental terms
          </Link>
          .
        </p>
      </>
    ),
  },
]

export default function ShippingReturnsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Shipping & Returns', path: '/shipping-and-returns' },
        ])}
      />

      <div className="container-page pt-10 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-display">Shipping & returns, made simple</h1>
          <p className="mt-4 text-body-lg text-cocoa-light">
            Anywhere in Canada, tracked both ways, with a prepaid return label and your deposit
            back within 24 hours. Here’s exactly how it works.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl space-y-10 md:mt-16">
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-h`}>
              <h2 id={`${section.id}-h`} className="text-h3">
                {section.title}
              </h2>
              <div className="mt-3 text-[15.5px] leading-relaxed text-cocoa-light">{section.body}</div>
            </section>
          ))}

          <section className="rounded-soft-lg bg-champagne p-6">
            <h2 className="font-sans text-[17px] font-semibold">In the GTA? Even easier.</h2>
            <p className="mt-2 text-[15px] text-cocoa-light">
              We offer free local hand-delivery and pickup around the GTA, arranged on our call -
              no shipping cost, no post office.{' '}
              <Link href="/gta-maternity-gown-rental" className="font-medium underline underline-offset-4">
                More about Toronto & GTA rentals
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="mx-auto mt-16 max-w-2xl md:mt-24">
          <CtaBand
            title="Questions about delivery to your city?"
            text="Tell us where you are and your shoot date - we’ll confirm timing and cost the same day."
            ctaLabel="Contact Us"
            ctaHref="/contact"
            secondaryLabel="Browse Gowns"
            secondaryHref="/gowns"
          />
        </div>
      </div>
    </>
  )
}
