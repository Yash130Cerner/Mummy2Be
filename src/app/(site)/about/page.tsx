import type { Metadata } from 'next'
import Link from 'next/link'

import { LazyVideo } from '@/components/media/LazyVideo'
import { CtaBand } from '@/components/sections/CtaBand'
import { TestimonialCards } from '@/components/sections/TestimonialCards'
import { JsonLd } from '@/components/ui/JsonLd'
import { RichTextContent } from '@/components/ui/RichTextContent'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SparkleIcon } from '@/components/ui/icons'
import { asMedia, getPageContent, getTestimonials } from '@/lib/data'
import { mediaAlt, mediaUrl } from '@/lib/media'
import { breadcrumbSchema, localBusinessSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const revalidate = 300

export const metadata: Metadata = pageMeta({
  title: 'About Mummy2Be - Maternity Gown Rental in Ontario',
  description:
    'Mummy2Be is an Ontario-based maternity gown rental service, helping expecting moms across Canada look and feel beautiful for their special moments. Meet the team behind the gowns.',
  path: '/about',
})

const CARE_POINTS = [
  {
    title: 'Cleaned by us, every time',
    text: 'Every gown is professionally cleaned and inspected before it reaches you - we handle it personally, never in bulk.',
  },
  {
    title: 'Packed by hand',
    text: 'Folded, wrapped and boxed with care, so your gown arrives ready to wear - not ready to iron.',
  },
  {
    title: 'Confirmed with a conversation',
    text: 'No bots, no automated bookings. A real person confirms your dates, answers your questions, and stays reachable.',
  },
]

const VALUES = [
  { title: 'Authenticity', text: 'Our own gowns, photographed by us - honest availability, honest terms.' },
  { title: 'Quality', text: 'Premium, pregnancy-friendly fabrics chosen to feel as good as they photograph.' },
  { title: 'Trust', text: 'A refundable deposit, a same-day reply, and a person who answers - every time.' },
]

export default async function AboutPage() {
  const [story, testimonials] = await Promise.all([getPageContent('about-story'), getTestimonials()])

  // The single behind-the-scenes clip, if uploaded (Pages → about-story).
  const btsFile = asMedia(story?.btsVideo?.file)
  const btsUrl = mediaUrl(btsFile)
  const btsPosterMedia = asMedia(story?.btsVideo?.poster)
  const btsPosterUrl = mediaUrl(btsPosterMedia, 'gallery')
  const btsVideo = btsUrl
    ? {
        url: btsUrl,
        poster: btsPosterUrl
          ? { url: btsPosterUrl, alt: mediaAlt(btsPosterMedia, 'Behind the scenes at Mummy2Be') }
          : null,
      }
    : null

  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Our Story', path: '/about' }])}
      />

      <div className="container-page pt-10 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-caption uppercase tracking-[0.2em] text-cocoa-light">Our story</p>
          <h1 className="text-display mt-3">The story behind Mummy2Be</h1>
          <span className="gold-rule mx-auto mt-5" aria-hidden />
        </div>

        {/* The founder story - owner-editable in the CMS */}
        <article className="mx-auto mt-10 max-w-2xl md:mt-14">
          <RichTextContent data={story?.body} className="mx-auto text-[16.5px] leading-[1.75]" />
        </article>

        {/* Ontario roots */}
        <section aria-labelledby="roots-heading" className="mx-auto mt-16 max-w-3xl md:mt-24">
          <div className="rounded-soft-lg bg-champagne p-8 text-center md:p-10">
            <h2 id="roots-heading" className="text-h3">
              Based in the GTA, Ontario - serving all of Canada
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15.5px] text-cocoa-light">
              We’re a real Ontario business you can call, text, or WhatsApp any day. Moms across
              the GTA can ask about free local hand-delivery; everyone else receives their gown by
              tracked Canada Post - cleaned and ready to wear.
            </p>
            <p className="mt-4 text-[14.5px]">
              <Link href="/gta-maternity-gown-rental" className="font-medium underline underline-offset-4">
                Renting in Toronto or the GTA? Start here.
              </Link>
            </p>
          </div>
        </section>

        {/* Behind the scenes */}
        <section aria-labelledby="care-heading" className="mx-auto mt-16 max-w-4xl md:mt-24">
          <SectionHeading id="care-heading"
            eyebrow="Behind the scenes"
            title="The work behind every gown"
          />
          {btsVideo ? (
            <figure className="mx-auto mb-10 max-w-xs">
              <LazyVideo
                src={btsVideo.url}
                poster={btsVideo.poster}
                label="Behind the scenes at Mummy2Be"
                aspectClass="aspect-[3/4]"
                className="rounded-soft-lg shadow-warm"
                trackContext="about-bts"
              />
              <figcaption className="mt-3 text-center text-[13.5px] text-cocoa-light">
                On set at one of our own gown shoots.
              </figcaption>
            </figure>
          ) : null}
          <div className="grid gap-5 md:grid-cols-3">
            {CARE_POINTS.map((point) => (
              <div key={point.title} className="rounded-soft-lg border border-taupe p-6">
                <SparkleIcon size={22} className="text-sage-text" />
                <h3 className="mt-3 font-sans text-[16px] font-semibold">{point.title}</h3>
                <p className="mt-2 text-[14.5px] text-cocoa-light">{point.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section aria-labelledby="values-heading" className="mx-auto mt-16 max-w-4xl md:mt-24">
          <SectionHeading id="values-heading" eyebrow="What we stand by" title="What we care about" />
          <div className="grid gap-5 md:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-soft-lg bg-blush/40 p-6 text-center">
                <h3 className="font-serif text-[22px]">{value.title}</h3>
                <p className="mt-2 text-[14.5px] text-cocoa-light">{value.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Real moms proof */}
        {testimonials.length > 0 ? (
          <section aria-labelledby="about-testimonials" className="mx-auto mt-16 max-w-4xl md:mt-24">
            <SectionHeading id="about-testimonials" eyebrow="Real moms" title="In their words" />
            <TestimonialCards testimonials={testimonials} />
          </section>
        ) : null}

        <div className="mx-auto mt-16 max-w-3xl md:mt-24">
          <CtaBand
            title="We’d be honoured to be part of your story."
            text="Browse the collection, or say hello - we reply the same day."
            ctaLabel="Browse Gowns"
            ctaHref="/gowns"
            secondaryLabel="Contact Us"
            secondaryHref="/contact"
          />
        </div>
      </div>
    </>
  )
}
