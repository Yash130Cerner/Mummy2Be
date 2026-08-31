import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { TestimonialCards } from '@/components/sections/TestimonialCards'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { asMedia, getRealMoms, getTestimonials } from '@/lib/data'
import { mediaAlt, mediaUrl } from '@/lib/media'
import { breadcrumbSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import type { Gown } from '@/payload-types'

export const revalidate = 300

export const metadata: Metadata = pageMeta({
  title: 'Real Moms in Our Gowns - Reviews | Mummy2Be',
  description:
    'See real moms in Mummy2Be maternity gowns and read their reviews - genuine photos and stories from photoshoots and baby showers across Canada.',
  path: '/real-moms',
})

export default async function RealMomsPage() {
  const [realMoms, testimonials] = await Promise.all([getRealMoms(), getTestimonials()])
  const hasContent = realMoms.length > 0 || testimonials.length > 0

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Real Moms', path: '/real-moms' }])}
      />

      <div className="container-page pt-10 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-display">Real moms, real moments.</h1>
          <p className="mt-4 text-body-lg text-cocoa-light">
            Every photo here is a real customer, shared with her permission - real bumps, real
            shoots, and honest words about how it felt.
          </p>
        </div>

        {/* Gallery */}
        {realMoms.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-3 lg:grid-cols-4">
            {realMoms.map((mom) => {
              const photo = asMedia(mom.photo)
              const url = mediaUrl(photo, 'card')
              if (!url) return null
              const gown = mom.gown && typeof mom.gown === 'object' ? (mom.gown as Gown) : null
              return (
                <figure key={mom.id}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-soft-lg shadow-warm">
                    <Image
                      src={url}
                      alt={mediaAlt(photo, `${mom.name} in a Mummy2Be maternity gown`)}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-[13.5px] text-cocoa-light">
                    {mom.name}
                    {mom.weeks ? `, ${mom.weeks}` : ''}
                    {gown ? (
                      <>
                        {' - '}
                        <Link
                          href={`/gowns/${gown.slug}`}
                          className="font-medium text-cocoa underline underline-offset-4 hover:decoration-gold"
                        >
                          {gown.name}
                        </Link>
                      </>
                    ) : null}
                    {mom.occasion ? `, ${mom.occasion}` : ''}
                  </figcaption>
                </figure>
              )
            })}
          </div>
        ) : null}

        {/* Testimonials */}
        {testimonials.length > 0 ? (
          <section aria-labelledby="reviews-heading" className="mt-16 md:mt-24">
            <h2 id="reviews-heading" className="text-h2 text-center">
              In their words
            </h2>
            <div className="mt-10">
              <TestimonialCards testimonials={testimonials} />
            </div>
          </section>
        ) : null}

        {/* Honest empty state - gallery launches as photos are consented */}
        {!hasContent ? (
          <div className="mx-auto mt-12 max-w-xl rounded-soft-lg bg-champagne p-8 text-center md:mt-16 md:p-12">
            <h2 className="text-h3">Our gallery is being gathered</h2>
            <p className="mt-3 text-[15.5px] text-cocoa-light">
              We only publish real customers, with their written permission - so this page grows
              shoot by shoot. In the meantime, every gown’s page has our own studio photos from
              every angle, and we’re happy to send more of any gown you love.
            </p>
            <ButtonLink href="/gowns" variant="primary" size="md" className="mt-6">
              Browse the gowns
            </ButtonLink>
          </div>
        ) : null}

        {/* Feature invite */}
        <div className="mx-auto mt-16 max-w-xl rounded-soft-lg border border-taupe p-6 text-center md:mt-24">
          <h2 className="font-sans text-[17px] font-semibold">Just had your shoot in one of our gowns?</h2>
          <p className="mt-2 text-[14.5px] text-cocoa-light">
            We’d be honoured to feature you (only ever with your permission - and moms who share
            get our warmest thank-you).
          </p>
          <ButtonLink href="/contact" variant="secondary" size="sm" className="mt-4">
            Share your photos
          </ButtonLink>
        </div>
      </div>
    </>
  )
}
