import type { Metadata } from 'next'
import Link from 'next/link'

import { ContactOptions } from '@/components/contact/ContactOptions'
import { GownCard } from '@/components/product/GownCard'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { toCardGown } from '@/lib/cardData'
import { COPY } from '@/lib/constants'
import { getFeaturedGowns } from '@/lib/data'
import { breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const revalidate = 300

export const metadata: Metadata = pageMeta({
  title: 'Maternity Gown Rental in Toronto & the GTA | Mummy2Be',
  description:
    'Rent a premium maternity gown in Toronto, Mississauga, Brampton and across the GTA - with free local hand-delivery and pickup. One size fits every bump. Same-day reply.',
  path: '/gta-maternity-gown-rental',
})

const LOCAL_PERKS = [
  {
    title: 'Free hand-delivery & pickup',
    text: 'No shipping cost, no post-office run - we bring the gown to you and collect it after your shoot, arranged on our call.',
  },
  {
    title: 'Faster, more flexible timing',
    text: 'Local delivery means tighter timelines are workable - even shoots booked just days ahead. Message us and we’ll be honest about what’s possible.',
  },
  {
    title: 'A local business you can talk to',
    text: 'We’re your neighbours - based right here in the GTA, personally cleaning, packing and delivering every gown.',
  },
]

export default async function GtaPage() {
  const featured = await getFeaturedGowns()
  const cards = featured.slice(0, 4).map(toCardGown)

  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Toronto & GTA Maternity Gown Rental', path: '/gta-maternity-gown-rental' },
        ])}
      />

      <div className="container-page pt-10 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-caption uppercase tracking-[0.2em] text-cocoa-light">
            Toronto, Mississauga, Brampton and the GTA
          </p>
          <h1 className="text-display mt-3">Maternity gown rental in Toronto & the GTA</h1>
          <p className="mt-4 text-body-lg text-cocoa-light">
            Premium photoshoot and baby-shower gowns, rented from right here in the GTA - with{' '}
            <strong className="text-cocoa">free local hand-delivery and pickup</strong>. Browse,
            message us, and your gown arrives cleaned and ready, no shipping cost at all.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/gowns" variant="primary" size="lg">
              Browse Gowns
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              Ask About Local Delivery
            </ButtonLink>
          </div>
        </div>

        <section aria-labelledby="local-perks" className="mx-auto mt-16 max-w-4xl md:mt-24">
          <SectionHeading id="local-perks" eyebrow="The local advantage" title="Why GTA moms rent from us" />
          <div className="grid gap-5 md:grid-cols-3">
            {LOCAL_PERKS.map((perk) => (
              <div key={perk.title} className="rounded-soft-lg bg-champagne p-6">
                <h3 className="font-sans text-[16px] font-semibold">{perk.title}</h3>
                <p className="mt-2 text-[14.5px] text-cocoa-light">{perk.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[14.5px] text-cocoa-light">
            Outside the GTA? No problem - {COPY.shipping.split(' - ')[0].trim().toLowerCase()}. See{' '}
            <Link href="/shipping-and-returns" className="font-medium underline underline-offset-4">
              shipping & returns
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="gta-featured" className="mt-16 md:mt-24">
          <SectionHeading id="gta-featured"
            eyebrow="A few favourites"
            title="Gowns GTA moms are loving"
            intro="Every gown is one size and beautifully stretchable - made to fit and flatter every bump."
          />
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {cards.map((gown) => (
              <GownCard key={gown.slug} gown={gown} />
            ))}
          </div>
          <p className="mt-8 text-center">
            <ButtonLink href="/gowns" variant="secondary" size="md">
              See the whole collection
            </ButtonLink>
          </p>
        </section>

        <section aria-labelledby="gta-how" className="mx-auto mt-16 max-w-3xl md:mt-24">
          <SectionHeading id="gta-how" eyebrow="Simple and personal" title="How it works locally" />
          <ol className="space-y-5">
            {[
              'Browse and pick your gown - the badge shows availability at a glance.',
              'Message us (WhatsApp, call, text, email, or the request form) with your date and neighbourhood.',
              'We confirm the same day and arrange your free delivery window on the call.',
              'After your shoot, we pick it up - no cleaning, no post office, deposit back within 24 hours.',
            ].map((step, i) => (
              <li key={i} className="flex gap-4 text-[15.5px] text-cocoa-light">
                <span
                  aria-hidden
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-terracotta font-serif text-[15px] text-white"
                >
                  {i + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="gta-contact" className="mx-auto mt-16 max-w-2xl md:mt-24">
          <div className="rounded-soft-lg border border-taupe p-6 md:p-8">
            <h2 id="gta-contact" className="text-h3 text-center">
              Tell us your date - we’ll do the rest
            </h2>
            <p className="mt-2 text-center text-[15px] text-cocoa-light">
              Based in the GTA, with a same-day reply and free local delivery arranged on our call.
            </p>
            <div className="mt-6">
              <ContactOptions
                context="gta-page"
                message="Hi Mummy2Be! I’m in the GTA and interested in renting a gown with local delivery."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
