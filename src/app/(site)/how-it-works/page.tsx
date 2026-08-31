import type { Metadata } from 'next'
import Link from 'next/link'

import { CtaBand } from '@/components/sections/CtaBand'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { COPY } from '@/lib/constants'
import { breadcrumbSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const revalidate = 3600

export const metadata: Metadata = pageMeta({
  title: 'How Maternity Gown Rental Works | Mummy2Be',
  description:
    'Renting a maternity gown is simple: browse, reserve by message, and we ship it cleaned and ready. Learn about our 5- and 10-day rentals, Canada-wide delivery, and refundable deposit.',
  path: '/how-it-works',
})

const STEPS = [
  { title: 'Browse', text: 'Explore the collection and see what’s available at a glance.' },
  { title: 'Reserve by message', text: 'Call, text, WhatsApp, email, or send the request form - whichever is easiest for you.' },
  { title: 'We confirm', text: 'The same day, we personally confirm availability, your dates, and your total.' },
  { title: 'Pay simply', text: 'By e-transfer or cash - nothing is ever charged online.' },
  { title: 'We ship it cleaned', text: 'Via Canada Post, tracked to your door (free local delivery in the GTA - just ask).' },
  { title: 'Wear it for your moment', text: 'Your photoshoot, your baby shower, your celebration - for your 5- or 10-day rental.' },
  { title: 'Return with a prepaid label', text: 'We send it when you’re ready; ship the gown back within your window. No cleaning needed.' },
  { title: 'Deposit back in 24 hours', text: 'Refunded within a day of your gown’s return, once inspected.' },
]

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'How It Works', path: '/how-it-works' },
        ])}
      />

      <div className="container-page pt-10 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-display">Renting a gown is simple</h1>
          <p className="mt-4 text-body-lg text-cocoa-light">
            No checkout, no guesswork - you browse, and a real person confirms everything with
            you the same day. Here’s the whole journey, start to finish.
          </p>
        </div>

        {/* The steps */}
        <ol className="mx-auto mt-12 max-w-2xl space-y-0 md:mt-16">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
              {i < STEPS.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute left-[17px] top-10 h-[calc(100%-2.5rem)] w-px bg-taupe"
                />
              ) : null}
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-terracotta font-serif text-[16px] text-white"
              >
                {i + 1}
              </span>
              <div className="pt-1">
                <h2 className="font-sans text-[18px] font-semibold">{step.title}</h2>
                <p className="mt-1 text-[15.5px] text-cocoa-light">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Deposit explained */}
        <section aria-labelledby="deposit-heading" className="mx-auto mt-16 max-w-3xl md:mt-24">
          <SectionHeading id="deposit-heading"
            eyebrow="Transparent, always"
            title="Your $100 deposit, explained"
            intro={COPY.deposit}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: 'Fully refundable', text: 'Every dollar comes back when the gown returns in good shape.' },
              { title: 'Back within 24 hours', text: 'Refunded within a day of return, once inspected.' },
              { title: 'Normal wear is fine', text: 'A photoshoot leaves traces - that’s expected and completely okay.' },
            ].map((item) => (
              <div key={item.title} className="rounded-soft-lg bg-champagne p-5 text-center">
                <h3 className="font-sans text-[15.5px] font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-[14px] text-cocoa-light">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping explained */}
        <section aria-labelledby="shipping-heading" className="mx-auto mt-16 max-w-3xl md:mt-24">
          <SectionHeading id="shipping-heading" eyebrow="Canada-wide" title="Shipping across Canada" intro={COPY.shipping} />
          <p className="rounded-soft-lg border border-taupe p-5 text-[15px] text-cocoa-light">
            {COPY.returns} We recommend reserving so your gown arrives a couple of days before
            your shoot - a relaxed fit-check, with time to spare. Full details on the{' '}
            <Link href="/shipping-and-returns" className="font-medium underline underline-offset-4">
              Shipping & Returns page
            </Link>
            .
          </p>
        </section>

        {/* Rental periods */}
        <section aria-labelledby="periods-heading" className="mx-auto mt-16 max-w-3xl md:mt-24">
          <SectionHeading id="periods-heading"
            eyebrow="Two easy windows"
            title="5 days or 10 days - your call"
            intro="Your rental window starts the day you receive the gown, so shipping time never eats into your rental."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-soft-lg bg-champagne p-6">
              <h3 className="font-serif text-[24px]">5-day rental</h3>
              <p className="mt-2 text-[15px] text-cocoa-light">
                Perfect for a single shoot or celebration - receive it, wear it, send it back with
                the prepaid label.
              </p>
            </div>
            <div className="rounded-soft-lg bg-champagne p-6">
              <h3 className="font-serif text-[24px]">10-day rental</h3>
              <p className="mt-2 text-[15px] text-cocoa-light">
                Extra breathing room for multiple moments, rescheduled shoots, or simply a
                stress-free week - just $15 more than the 5-day rate.
              </p>
            </div>
          </div>
        </section>

        {/* Cleaning reassurance */}
        <section aria-labelledby="cleaning-heading" className="mx-auto mt-16 max-w-3xl md:mt-24">
          <div className="rounded-soft-lg bg-sage/10 p-6 text-center md:p-8">
            <h2 id="cleaning-heading" className="text-h3">
              Cleaned before every rental
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15.5px] text-cocoa-light">
              Every gown is professionally cleaned, inspected and prepared before it reaches you -
              and you never need to clean it before returning. That part is on us.
            </p>
          </div>
        </section>

        {/* Close */}
        <div className="mx-auto mt-16 max-w-3xl md:mt-24">
          <CtaBand
            title="Ready to find your gown?"
            text="Browse the collection, or message us and we’ll help you choose - same-day reply, always."
            ctaLabel="Browse Gowns"
            ctaHref="/gowns"
            secondaryLabel="Contact Us"
            secondaryHref="/contact"
          />
          <p className="mt-8 text-center text-[15px] text-cocoa-light">
            Still curious?{' '}
            <ButtonLink href="/faq" variant="tertiary" size="sm">
              Read the FAQ
            </ButtonLink>
          </p>
        </div>
      </div>
    </>
  )
}
