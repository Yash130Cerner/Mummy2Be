import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactOptions } from '@/components/contact/ContactOptions'
import { GownCard } from '@/components/product/GownCard'
import { CtaBand } from '@/components/sections/CtaBand'
import { FaqPreview } from '@/components/sections/FaqPreview'
import { Hero } from '@/components/sections/Hero'
import { MotionStrip } from '@/components/sections/MotionStrip'
import { TestimonialCards } from '@/components/sections/TestimonialCards'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowRightIcon } from '@/components/ui/icons'
import { toCardGown } from '@/lib/cardData'
import { getCategoryView } from '@/lib/categories'
import { SITE } from '@/lib/constants'
import {
  asMedia,
  getFeaturedGowns,
  getGowns,
  getHomeFaqs,
  getPageContent,
  getRealMoms,
  getTestimonials,
  getVideoGowns,
} from '@/lib/data'
import { mediaAlt, mediaUrl } from '@/lib/media'
import { localBusinessSchema } from '@/lib/schema'

export const revalidate = 300

export const metadata: Metadata = {
  title: { absolute: SITE.defaultTitle },
  description: SITE.defaultDescription,
  alternates: { canonical: '/' },
}

const OCCASION_TILES = [
  {
    href: '/gowns/photoshoot',
    category: 'photoshoot',
    title: 'Maternity Photoshoot',
    line: 'Gowns that move, drape, and catch the light.',
    art: 'linear-gradient(150deg, #B4715E 0%, #E3C0AE 100%)',
    dark: true,
  },
  {
    href: '/gowns/baby-shower',
    category: 'baby-shower',
    title: 'Baby Shower',
    line: 'Celebrate comfortably, beautifully.',
    art: 'linear-gradient(150deg, #D9AFA4 0%, #F0DCD2 100%)',
    dark: false,
  },
  {
    href: '/gowns/western',
    category: 'western',
    title: 'Western',
    line: 'Timeless, elegant silhouettes.',
    art: 'linear-gradient(150deg, #B9AB97 0%, #EDE4D3 100%)',
    dark: false,
  },
  {
    href: '/gowns/south-asian',
    category: 'south-asian',
    title: 'South Asian',
    line: 'Rich colour for culturally-styled shoots.',
    art: 'linear-gradient(150deg, #6E2320 0%, #A65046 100%)',
    dark: true,
  },
]

const HOME_STEPS = [
  {
    title: 'Browse',
    text: 'Explore the collection and see availability at a glance.',
  },
  {
    title: 'Reserve by contact',
    text: 'Call, text, WhatsApp, email, or send the quick request form.',
  },
  {
    title: 'We ship it cleaned',
    text: 'Confirmed personally the same day, delivered via Canada Post.',
  },
  {
    title: 'Return with a prepaid label',
    text: 'Wear it for your moment, then ship it back - we handle the cleaning.',
  },
]

const WHY_US = [
  {
    title: 'One size, zero sizing stress',
    text: 'Every gown is beautifully stretchable - made to fit and flatter every bump, from your first shoot to your due date.',
  },
  {
    title: 'Our gowns, our photos',
    text: 'Every photo is a gown we own, photographed by us - never a supplier’s stock image. What you see is what arrives.',
  },
  {
    title: 'Western & South Asian styles',
    text: 'Soft, timeless classics and rich, expressive showstoppers - one collection that celebrates every kind of shoot.',
  },
  {
    title: 'A real person, the same day',
    text: 'Every reservation is personally confirmed. Message us any way you like - you’ll hear back today.',
  },
  {
    title: 'Reliable Canada-wide delivery',
    text: 'Tracked Canada Post shipping anywhere in Canada, and free local hand-delivery in the GTA - just ask.',
  },
]

export default async function HomePage() {
  const [gowns, featured, videoGowns, faqs, testimonials, realMoms, homeContent] =
    await Promise.all([
      getGowns(),
      getFeaturedGowns(),
      getVideoGowns(),
      getHomeFaqs(),
      getTestimonials(),
      getRealMoms(),
      getPageContent('home'),
    ])
  const featuredCards = featured.map(toCardGown)
  const heroImage = asMedia(homeContent?.heroImage)

  const withPhoto = gowns.filter((g) => asMedia(g.primaryImage))

  /**
   * One real gown photo per collection tile, resolved from the catalogue via
   * each category's own match predicate - so the tiles stay current as gowns
   * come and go, with no filenames to maintain.
   *
   * Categories overlap (one gown can be both a photoshoot and a western gown),
   * so each pick is claimed to keep all four tiles visually distinct. Falls
   * back to the gradient art if a category runs out of unclaimed gowns with
   * photos.
   */
  const claimed = new Set<string>()
  const tiles = OCCASION_TILES.map((tile) => {
    const view = getCategoryView(tile.category)
    const match = withPhoto.find((g) => view?.match(g) && !claimed.has(g.slug))
    if (match) claimed.add(match.slug)
    const media = asMedia(match?.primaryImage)
    const url = mediaUrl(media, 'card')
    return {
      ...tile,
      photo: url ? { url, alt: mediaAlt(media, `${match?.name} maternity gown`) } : null,
    }
  })

  return (
    <>
      <JsonLd data={localBusinessSchema()} />

      <Hero image={heroImage} />
      <TrustStrip />

      {/* Shop by moment */}
      <section aria-labelledby="shop-by-moment" className="container-page py-16 md:py-24">
        <SectionHeading id="shop-by-moment"
          eyebrow="The collection"
          title="Shop by moment"
          intro="Four ways in - every gown one size, beautifully stretchable."
        />
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {tiles.map((tile) => {
            // With a photo the text sits on a dark scrim, so it is always ivory.
            const onPhoto = Boolean(tile.photo)
            const light = onPhoto || tile.dark
            return (
              <Link
                key={tile.href}
                href={tile.href}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-soft-lg p-5 shadow-warm motion-safe:transition-shadow hover:shadow-warm-lg"
                style={tile.photo ? undefined : { background: tile.art }}
              >
                {tile.photo ? (
                  <>
                    <Image
                      src={tile.photo.url}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105"
                    />
                    {/* Legibility scrim - keeps the gown's real colour readable. */}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-cocoa/85 via-cocoa/35 to-cocoa/5"
                    />
                  </>
                ) : null}
                <span
                  className={`relative font-serif text-[20px] leading-tight md:text-[24px] ${
                    light ? 'text-ivory' : 'text-cocoa'
                  }`}
                >
                  {tile.title}
                </span>
                <span
                  className={`relative mt-1.5 text-[13px] leading-snug md:text-[14px] ${
                    light ? 'text-ivory/85' : 'text-cocoa-light'
                  }`}
                >
                  {tile.line}
                </span>
                <span
                  className={`relative mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-medium ${
                    light ? 'text-ivory' : 'text-cocoa'
                  }`}
                >
                  Explore
                  <ArrowRightIcon
                    size={15}
                    className="motion-safe:transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured gowns */}
      <section aria-labelledby="featured-gowns" className="bg-champagne/60 py-16 md:py-24">
        <div className="container-page">
          <SectionHeading id="featured-gowns"
            eyebrow="Loved right now"
            title="Featured gowns"
            intro="A few favourites - see the badge for availability, then message us to reserve your dates."
          />
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {featuredCards.map((gown) => (
              <GownCard key={gown.slug} gown={gown} />
            ))}
          </div>
          <p className="mt-10 text-center">
            <ButtonLink href="/gowns" variant="secondary" size="md">
              Browse all gowns
            </ButtonLink>
          </p>
        </div>
      </section>

      {/* See them in motion - auto-populates from gowns with video */}
      <MotionStrip gowns={videoGowns} />

      {/* How renting works */}
      <section aria-labelledby="how-it-works-preview" className="container-page py-16 md:py-24">
        <SectionHeading id="how-it-works-preview"
          eyebrow="Simple, personal, no online payment"
          title="How renting works"
          intro="You browse; a real person confirms everything - the same day."
        />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_STEPS.map((step, i) => (
            <li key={step.title} className="rounded-soft-lg border border-taupe bg-ivory p-6">
              <span
                aria-hidden
                className="flex size-9 items-center justify-center rounded-full bg-terracotta font-serif text-[17px] text-white"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-sans text-[17px] font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-[14.5px] text-cocoa-light">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center text-[15px] text-cocoa-light">
          The full details - deposit, shipping, returns -{' '}
          <Link href="/how-it-works" className="font-medium underline underline-offset-4 hover:decoration-gold hover:decoration-2">
            are all explained here
          </Link>
          .
        </p>
      </section>

      {/* Why moms choose us */}
      <section aria-labelledby="why-us" className="bg-champagne/60 py-16 md:py-24">
        <div className="container-page">
          <SectionHeading id="why-us" eyebrow="The Mummy2Be difference" title="Why moms choose Mummy2Be" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => (
              <div key={item.title} className="rounded-soft-lg bg-ivory p-6 shadow-warm">
                <span className="gold-rule" aria-hidden />
                <h3 className="mt-4 font-sans text-[17px] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[15px] text-cocoa-light">{item.text}</p>
              </div>
            ))}
            <div className="flex flex-col justify-center rounded-soft-lg bg-cocoa p-6 text-ivory shadow-warm">
              <h3 className="font-serif text-[22px]">Made to fit every bump</h3>
              <p className="mt-2 text-[15px] text-ivory/85">
                No size charts, no guessing - just soft stretch fabric designed to flatter every
                stage.
              </p>
              <ButtonLink href="/fit-guide" variant="primary" size="sm" className="mt-5 self-start">
                Read the fit guide
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Western & South Asian split feature */}
      <section aria-labelledby="two-collections" className="container-page py-16 md:py-24">
        <SectionHeading id="two-collections"
          eyebrow="Two edits, one collection"
          title="Western & South Asian styles"
          intro="Every mom’s moment looks different - the collection celebrates both."
        />
        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href="/gowns/western"
            className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-soft-lg p-8 shadow-warm hover:shadow-warm-lg motion-safe:transition-shadow"
            style={{ background: 'linear-gradient(160deg, #B9AB97 0%, #EFE7D9 70%)' }}
          >
            <h3 className="font-serif text-[26px] text-cocoa md:text-[30px]">Western classics</h3>
            <p className="mt-2 max-w-sm text-[15px] text-cocoa-light">
              Soft pastels, clean neutrals, and timeless drama - flowing trains and elegant
              silhouettes that photograph beautifully.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-medium text-cocoa">
              Explore Western gowns
              <ArrowRightIcon size={16} className="motion-safe:transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <Link
            href="/gowns/south-asian"
            className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-soft-lg p-8 shadow-warm hover:shadow-warm-lg motion-safe:transition-shadow"
            style={{ background: 'linear-gradient(160deg, #5C1F1C 0%, #A65046 100%)' }}
          >
            <h3 className="font-serif text-[26px] text-ivory md:text-[30px]">
              For South-Asian shoots
            </h3>
            <p className="mt-2 max-w-sm text-[15px] text-ivory/85">
              Rich ruby, jewel green, sapphire and rose - expressive gowns made to shine in
              vibrant, culturally-styled photoshoots.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-medium text-ivory">
              Explore South Asian gowns
              <ArrowRightIcon size={16} className="motion-safe:transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* Real moms strip - appears once consent-cleared photos exist */}
      {realMoms.length > 0 ? (
        <section aria-labelledby="real-moms-strip" className="bg-champagne/60 py-16 md:py-24">
          <div className="container-page">
            <SectionHeading id="real-moms-strip" eyebrow="Real moms, real shoots" title="Worn for moments like yours" />
            <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2">
              {realMoms.slice(0, 8).map((mom) => {
                const photo = asMedia(mom.photo)
                const url = mediaUrl(photo, 'card')
                if (!url) return null
                return (
                  <figure key={mom.id} className="w-56 shrink-0 snap-start">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-soft-lg shadow-warm">
                      <Image
                        src={url}
                        alt={mediaAlt(photo, `${mom.name} in a Mummy2Be gown`)}
                        fill
                        sizes="224px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 text-[13.5px] text-cocoa-light">
                      {mom.name}
                      {mom.weeks ? `, ${mom.weeks}` : ''}
                      {mom.occasion ? ` - ${mom.occasion}` : ''}
                    </figcaption>
                  </figure>
                )
              })}
            </div>
            <p className="mt-6 text-center">
              <ButtonLink href="/real-moms" variant="secondary" size="md">
                See real moms & reviews
              </ButtonLink>
            </p>
          </div>
        </section>
      ) : null}

      {/* Style help band */}
      <section className="container-page py-8 md:py-12">
        <CtaBand
          title="Not sure which gown?"
          text="Answer four quick questions and we’ll suggest gowns you’ll love - or just message us and we’ll help you choose."
          ctaLabel="Find My Gown"
          ctaHref="/find-my-gown"
          secondaryLabel="Contact Us"
          secondaryHref="/contact"
          tone="blush"
        />
      </section>

      {/* Testimonials - real reviews only; hidden until they exist */}
      {testimonials.length > 0 ? (
        <section aria-labelledby="testimonials" className="container-page py-16 md:py-24">
          <SectionHeading id="testimonials" eyebrow="In their words" title="Real moms, real words" />
          <TestimonialCards testimonials={testimonials} />
        </section>
      ) : null}

      {/* Photographers band */}
      <section className="container-page py-8 md:py-12">
        <CtaBand
          title="Are you a maternity photographer?"
          text="Beautiful, reliable gowns for your clients’ shoots - one size, no sizing headaches, same-day responsiveness."
          ctaLabel="Partner With Us"
          ctaHref="/for-photographers"
          tone="cocoa"
        />
      </section>

      {/* FAQ preview */}
      <FaqPreview faqs={faqs} />

      {/* Contact close */}
      <section aria-labelledby="home-contact" className="container-page pb-4">
        <div className="rounded-soft-lg border border-taupe bg-ivory p-6 md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="home-contact" className="text-h3">
              Ready when you are
            </h2>
            <p className="mt-2 text-[15.5px] text-cocoa-light">
              See a gown you love? Reach us any way you like - we confirm availability and details
              personally, the same day.
            </p>
          </div>
          <div className="mx-auto mt-6 max-w-2xl">
            <ContactOptions context="home" />
          </div>
        </div>
      </section>
    </>
  )
}
