import type { Metadata } from 'next'

import { CtaBand } from '@/components/sections/CtaBand'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { breadcrumbSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const revalidate = 3600

export const metadata: Metadata = pageMeta({
  title: 'Maternity Gowns for Photographers | Mummy2Be',
  description:
    'Partner with Mummy2Be for beautiful, reliable maternity gowns for your clients’ shoots - one size (no sizing headaches), Western and South Asian styles, same-day responsiveness across the GTA and Canada.',
  path: '/for-photographers',
})

const WHY_PARTNER = [
  {
    title: 'No sizing headaches',
    text: 'Every gown is one size and stretchable - it fits your 20-week client and your 38-week client, no measuring, no returns drama.',
  },
  {
    title: 'Consistent, camera-ready quality',
    text: 'Professionally cleaned before every rental, inspected by hand, and chosen specifically for how they move and photograph.',
  },
  {
    title: 'Western & South Asian range',
    text: 'Soft classics and rich, expressive showstoppers in one collection - style any client’s vision without juggling suppliers.',
  },
  {
    title: 'Reliable, same-day responsiveness',
    text: 'Message us a date and a gown; we confirm the same day. Canada Post anywhere in Canada, free hand-delivery around the GTA.',
  },
]

const HOW_IT_WORKS = [
  { title: 'Tell us your shoot', text: 'The date, the location, and the look your client wants - by WhatsApp, call, or the partner form.' },
  { title: 'We confirm same-day', text: 'Availability, logistics, and the simple rental details, person to person.' },
  { title: 'The gown arrives ready', text: 'Cleaned, packed, and on time - with a prepaid return label for after the shoot.' },
  { title: 'Shoot, return, repeat', text: 'Send it back within the window; we handle cleaning. Your next shoot is one message away.' },
]

export default function ForPhotographersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'For Photographers', path: '/for-photographers' },
        ])}
      />

      <div className="container-page pt-10 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-caption uppercase tracking-[0.2em] text-cocoa-light">For photographers</p>
          <h1 className="text-display mt-3">Beautiful gowns for your maternity shoots.</h1>
          <p className="mt-4 text-body-lg text-cocoa-light">
            Consistent quality, reliable delivery, and one-size gowns that fit every client - so
            you can style shoots without the sizing guesswork.
          </p>
          <ButtonLink href="/rental-request?type=photographer" variant="primary" size="lg" className="mt-7">
            Partner With Us
          </ButtonLink>
        </div>

        <section aria-labelledby="why-partner" className="mx-auto mt-16 max-w-4xl md:mt-24">
          <SectionHeading id="why-partner" eyebrow="Why partner" title="Why photographers work with us" />
          <div className="grid gap-5 sm:grid-cols-2">
            {WHY_PARTNER.map((item) => (
              <div key={item.title} className="rounded-soft-lg border border-taupe p-6">
                <span className="gold-rule" aria-hidden />
                <h3 className="mt-3 font-sans text-[16.5px] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[14.5px] text-cocoa-light">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="partner-how" className="mx-auto mt-16 max-w-3xl md:mt-24">
          <SectionHeading id="partner-how" eyebrow="Simple by design" title="How partnering works" />
          <ol className="space-y-6">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span
                  aria-hidden
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cocoa font-serif text-[16px] text-white"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-sans text-[16.5px] font-semibold">{step.title}</h3>
                  <p className="mt-1 text-[14.5px] text-cocoa-light">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="collab" className="mx-auto mt-16 max-w-3xl md:mt-24">
          <div className="rounded-soft-lg bg-blush/40 p-6 text-center md:p-8">
            <h2 id="collab" className="text-h3">
              Collaborations & styled shoots
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-[15px] text-cocoa-light">
              Lend us your lens and enjoy access to our gowns in return - we love creative
              collaborations that show real bumps beautifully. Tell us your idea and we’ll make it
              easy.
            </p>
          </div>
        </section>

        <div className="mx-auto mt-16 max-w-3xl md:mt-24">
          <CtaBand
            title="Let’s make your next shoot effortless."
            text="Send a partner inquiry, or browse the collection your clients will be choosing from."
            ctaLabel="Partner With Us"
            ctaHref="/rental-request?type=photographer"
            secondaryLabel="Browse Gowns"
            secondaryHref="/gowns"
          />
        </div>
      </div>
    </>
  )
}
