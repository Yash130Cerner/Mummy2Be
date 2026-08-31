import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CollectionExplorer } from '@/components/product/CollectionExplorer'
import { Gallery, type GalleryItem } from '@/components/product/Gallery'
import { GownCard } from '@/components/product/GownCard'
import { RentalEssentials } from '@/components/product/RentalEssentials'
import { AskButton, ReserveButton, StickyCtaBar } from '@/components/product/ReserveActions'
import { TrackView } from '@/components/product/TrackView'
import { WishlistHeart } from '@/components/product/WishlistHeart'
import { CtaBand } from '@/components/sections/CtaBand'
import { AccordionItem } from '@/components/ui/Accordion'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { JsonLd } from '@/components/ui/JsonLd'
import { RichTextContent } from '@/components/ui/RichTextContent'
import { toCardGown } from '@/lib/cardData'
import { CATEGORY_VIEWS, getCategoryView } from '@/lib/categories'
import { AVAILABILITY, COPY, type AvailabilityStatus } from '@/lib/constants'
import { asMedia, getGownBySlug, getGowns, getProductFaqs, relatedGowns } from '@/lib/data'
import { price10, price5 } from '@/lib/format'
import { mediaAlt, mediaUrl } from '@/lib/media'
import { breadcrumbSchema, collectionPageSchema, productSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const revalidate = 300

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const gowns = await getGowns()
  return [
    ...CATEGORY_VIEWS.map((c) => ({ slug: c.slug })),
    ...gowns.map((g) => ({ slug: g.slug })),
  ]
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params

  const category = getCategoryView(slug)
  if (category) {
    return pageMeta({
      title: category.seoTitle,
      description: category.metaDescription,
      path: `/gowns/${category.slug}`,
    })
  }

  const gown = await getGownBySlug(slug)
  if (!gown) return {}

  const ogImage =
    mediaUrl(asMedia(gown.seo?.ogImage), 'og') ?? mediaUrl(asMedia(gown.primaryImage), 'og')
  return pageMeta({
    title: gown.seo?.seoTitle || `${gown.name} - Maternity Gown Rental | Mummy2Be`,
    description:
      gown.seo?.metaDescription ||
      `Rent the ${gown.name} - ${gown.shortDescription} One size fits every bump, professionally cleaned, delivered across Canada. Contact us to confirm availability for your dates.`,
    path: `/gowns/${gown.slug}`,
    ogImage,
  })
}

export default async function GownOrCategoryPage({ params }: Params) {
  const { slug } = await params

  const category = getCategoryView(slug)
  if (category) return <CategoryPage slug={slug} />

  return <GownDetailPage slug={slug} />
}

/* ── Category landing page - a filtered view of the one catalogue ─────────── */

async function CategoryPage({ slug }: { slug: string }) {
  const category = getCategoryView(slug)
  if (!category) notFound()

  const all = await getGowns()
  const gowns = all.filter(category.match)
  const cards = gowns.map(toCardGown)
  const hideDimensions =
    category.slug === 'photoshoot' || category.slug === 'baby-shower'
      ? (['occasion'] as const)
      : (['edit'] as const)

  return (
    <>
      <JsonLd
        data={collectionPageSchema(category.h1, category.metaDescription, `/gowns/${category.slug}`, gowns)}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Gowns', path: '/gowns' },
          { name: category.h1, path: `/gowns/${category.slug}` },
        ])}
      />

      <div className="container-page pt-10 md:pt-16">
        <nav aria-label="Breadcrumb" className="text-[13.5px] text-cocoa-light">
          <Link href="/gowns" className="hover:text-cocoa hover:underline">
            All gowns
          </Link>{' '}
          <span aria-hidden>/</span> <span aria-current="page">{category.h1}</span>
        </nav>
        <h1 className="text-display mt-3 max-w-2xl">{category.h1}</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-cocoa-light">{category.intro}</p>

        <p className="mt-8 rounded-soft border border-sage/40 bg-sage/10 px-4 py-3 text-center text-[14.5px] text-sage-text">
          {COPY.oneSizeBanner}
        </p>

        <div className="mt-8">
          <CollectionExplorer gowns={cards} hideDimensions={[...hideDimensions]} />
        </div>

        <div className="mt-16 md:mt-24">
          <CtaBand
            title="Not sure which gown?"
            text="Answer four quick questions and we’ll suggest gowns you’ll love."
            ctaLabel="Find My Gown"
            ctaHref="/find-my-gown"
            tone="blush"
          />
        </div>
      </div>
    </>
  )
}

/* ── Gown detail page - build confidence, drive a contact-based reservation ── */

async function GownDetailPage({ slug }: { slug: string }) {
  const gown = await getGownBySlug(slug)
  if (!gown) notFound()

  const [all, faqs] = await Promise.all([getGowns(), getProductFaqs()])
  const related = relatedGowns(gown, all).map(toCardGown)
  const status = gown.availabilityStatus as AvailabilityStatus
  const availability = AVAILABILITY[status]

  // Build the gallery: primary image, gallery images, then the movement video.
  const items: GalleryItem[] = []
  const primary = asMedia(gown.primaryImage)
  const primaryUrl = mediaUrl(primary, 'gallery')
  if (primaryUrl) {
    items.push({
      type: 'image',
      url: primaryUrl,
      alt: mediaAlt(primary, `${gown.colorPrimary} maternity gown - ${gown.name}`),
    })
  }
  for (const entry of gown.images ?? []) {
    const media = asMedia(entry.image)
    const url = mediaUrl(media, 'gallery')
    if (url && url !== primaryUrl) {
      items.push({
        type: 'image',
        url,
        alt: mediaAlt(media, `${gown.name} - ${entry.viewType ?? 'detail'} view`),
      })
    }
  }
  const videoMedia = asMedia(gown.video?.file)
  const videoUrl = mediaUrl(videoMedia)
  if (videoUrl) {
    items.push({
      type: 'video',
      url: videoUrl,
      alt: `${gown.name} - movement video`,
      poster: mediaUrl(asMedia(gown.video?.poster), 'gallery'),
    })
  }

  const consentedUgc = (gown.ugcPhotos ?? []).filter((p) => p.consent)

  const styleLabels: Record<string, string> = {
    flowing: 'Flowing',
    fitted: 'Fitted',
    dramatic: 'Dramatic',
    minimal: 'Minimal',
  }

  return (
    <>
      <TrackView gownName={gown.name} />
      <JsonLd data={productSchema(gown)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Gowns', path: '/gowns' },
          { name: gown.name, path: `/gowns/${gown.slug}` },
        ])}
      />

      <div className="container-page pb-28 pt-8 md:pb-0 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-[13.5px] text-cocoa-light">
          <Link href="/" className="hover:text-cocoa hover:underline">
            Home
          </Link>{' '}
          <span aria-hidden>/</span>{' '}
          <Link href="/gowns" className="hover:text-cocoa hover:underline">
            Gowns
          </Link>{' '}
          <span aria-hidden>/</span> <span aria-current="page">{gown.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div>
            <Gallery
              items={items}
              gownName={gown.name}
              slug={gown.slug}
              colorFamily={gown.colorFamily}
              colorPrimary={gown.colorPrimary}
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-serif text-[32px] leading-tight md:text-[40px]">{gown.name}</h1>
                <p className="mt-2 text-body-lg text-cocoa-light">{gown.shortDescription}</p>
              </div>
              <WishlistHeart slug={gown.slug} name={gown.name} className="shrink-0 border border-taupe" />
            </div>

            {/* Pricing - both durations, always unambiguous */}
            <div className="mt-6 flex flex-wrap gap-3">
              <p className="price rounded-soft bg-champagne px-4 py-2.5 text-[16px]">
                {price5(gown.rentalPrice5Day)}
              </p>
              <p className="price rounded-soft bg-champagne px-4 py-2.5 text-[16px]">
                {price10(gown.rentalPrice10Day)}
              </p>
            </div>

            {/* Availability - a badge and a human, never a calendar */}
            <section aria-label="Availability" className="mt-6 rounded-soft-lg border border-taupe p-5">
              <div className="flex flex-wrap items-center gap-3">
                <AvailabilityBadge status={status} className="border border-taupe" />
                <p className="text-[14.5px] text-cocoa-light">{availability.line}</p>
              </div>
              {gown.nextAvailableNote ? (
                <p className="mt-2 text-[14.5px] font-medium text-cocoa">{gown.nextAvailableNote}</p>
              ) : null}
              <p className="mt-3 text-[14.5px] text-cocoa-light">{COPY.pdpAvailabilityLine}</p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <ReserveButton gownName={gown.name} gownSlug={gown.slug} className="sm:flex-1" />
                <AskButton gownName={gown.name} className="sm:flex-1" />
              </div>
              <p className="mt-4 flex items-start gap-2 text-[13.5px] text-sage-text">
                <span aria-hidden className="mt-0.5 inline-block size-2 shrink-0 rounded-full bg-sage" />
                {COPY.reserveReassurance}
              </p>
            </section>

            {/* Fit reassurance - replaces any size selector, deliberately */}
            <section aria-label="Fit" className="mt-6 rounded-soft-lg bg-blush/40 p-5">
              <h2 className="font-sans text-[16px] font-semibold">Made to fit every bump</h2>
              <p className="mt-1.5 text-[14.5px] text-cocoa-light">
                {COPY.fitLine}{' '}
                <Link href="/fit-guide" className="font-medium underline underline-offset-4">
                  How the one-size fit works
                </Link>
              </p>
            </section>

            {/* About this gown */}
            <section aria-label="About this gown" className="mt-8">
              <RichTextContent data={gown.fullDescription} className="text-[15.5px]" />
            </section>

            {/* Best for + colour/fabric */}
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {gown.bestFor ? (
                <div className="rounded-soft border border-taupe p-4">
                  <dt className="text-caption uppercase tracking-[0.14em] text-cocoa-light">Best for</dt>
                  <dd className="mt-1.5 text-[14.5px]">{gown.bestFor}</dd>
                </div>
              ) : null}
              <div className="rounded-soft border border-taupe p-4">
                <dt className="text-caption uppercase tracking-[0.14em] text-cocoa-light">
                  Colour, fabric & style
                </dt>
                <dd className="mt-1.5 text-[14.5px]">
                  {gown.colorPrimary}
                  {gown.fabric ? `, ${gown.fabric}` : ''}
                  {(gown.styleTags ?? []).length > 0
                    ? `, ${(gown.styleTags ?? []).map((t) => styleLabels[t] ?? t).join(', ')}`
                    : ''}
                </dd>
              </div>
            </dl>

            {/* Rental essentials - deposit & shipping live here, transparently */}
            <section aria-label="Rental essentials" className="mt-8">
              <RentalEssentials />
            </section>
          </div>
        </div>

        {/* Per-gown FAQ */}
        {faqs.length > 0 ? (
          <section aria-labelledby="gown-faq" className="mx-auto mt-16 max-w-2xl md:mt-24">
            <h2 id="gown-faq" className="text-h3 text-center">
              Questions about this gown
            </h2>
            <div className="mt-8 border-t border-taupe">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} title={faq.question}>
                  <p>{faq.answer}</p>
                </AccordionItem>
              ))}
            </div>
            <p className="mt-6 text-center text-[14.5px] text-cocoa-light">
              Something else on your mind?{' '}
              <Link href="/contact" className="font-medium underline underline-offset-4">
                Ask us anything
              </Link>{' '}
              - same-day reply.
            </p>
          </section>
        ) : null}

        {/* Real customer photos (consent-cleared only) */}
        {consentedUgc.length > 0 ? (
          <section aria-labelledby="ugc" className="mt-16 md:mt-24">
            <h2 id="ugc" className="text-h3 text-center">
              Real moms in the {gown.name}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {consentedUgc.map((photo, i) => {
                const media = asMedia(photo.image)
                const url = mediaUrl(media, 'card')
                if (!url) return null
                return (
                  <figure key={i}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-soft-lg shadow-warm">
                      <Image
                        src={url}
                        alt={mediaAlt(media, `Customer wearing the ${gown.name}`)}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    {photo.caption ? (
                      <figcaption className="mt-2 text-[13px] text-cocoa-light">{photo.caption}</figcaption>
                    ) : null}
                  </figure>
                )
              })}
            </div>
          </section>
        ) : null}

        {/* Similar gowns */}
        {related.length > 0 ? (
          <section aria-labelledby="related" className="mt-16 md:mt-24">
            <h2 id="related" className="text-h3 text-center">
              You might also love
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
              {related.map((r) => (
                <GownCard key={r.slug} gown={r} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <StickyCtaBar gownName={gown.name} gownSlug={gown.slug} />
    </>
  )
}
