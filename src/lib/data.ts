import config from '@payload-config'
import { getPayload } from 'payload'

import type { BlogPost, Faq, Gown, Media, Page, RealMom, Testimonial } from '@/payload-types'

import { mediaAlt, mediaUrl } from '@/lib/media'

export const getPayloadClient = () => getPayload({ config })

/** Resolve a possibly-numeric relationship value to a populated Media doc. */
export const asMedia = (value: number | Media | null | undefined): Media | null =>
  value && typeof value === 'object' ? value : null

export type GownVideo = {
  url: string
  poster: { url: string; alt: string } | null
}

/** The gown’s movement video, if one has been uploaded. */
export function gownVideo(gown: Gown): GownVideo | null {
  const file = asMedia(gown.video?.file)
  const url = mediaUrl(file)
  if (!url) return null
  const posterMedia = asMedia(gown.video?.poster)
  const posterUrl = mediaUrl(posterMedia, 'gallery')
  return {
    url,
    poster: posterUrl
      ? { url: posterUrl, alt: mediaAlt(posterMedia, `${gown.name} maternity gown in motion`) }
      : null,
  }
}

// ── Gowns ────────────────────────────────────────────────────────────────────

export async function getGowns(): Promise<Gown[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'gowns',
    where: { published: { equals: true } },
    sort: 'displayOrder',
    limit: 100,
    depth: 1,
  })
  return result.docs
}

/**
 * Homepage featured selection. Gowns with a movement video lead automatically
 * (the footage works twice: desire on the homepage, conversion on the gown
 * page), then the featured-flagged gowns, capped at 8.
 */
export async function getFeaturedGowns(): Promise<Gown[]> {
  const gowns = await getGowns()
  const withVideo = gowns.filter((g) => gownVideo(g) !== null)
  const flagged = gowns.filter((g) => g.featured && !withVideo.some((v) => v.slug === g.slug))
  const combined = [...withVideo, ...flagged]
  return (combined.length > 0 ? combined : gowns).slice(0, 8)
}

/** The gowns that have a movement video - drives the “See them in motion” strip. */
export async function getVideoGowns(): Promise<Gown[]> {
  const gowns = await getGowns()
  return gowns.filter((g) => gownVideo(g) !== null).slice(0, 4)
}

export async function getGownBySlug(slug: string): Promise<Gown | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'gowns',
    where: { and: [{ slug: { equals: slug } }, { published: { equals: true } }] },
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}

export function relatedGowns(gown: Gown, all: Gown[], count = 3): Gown[] {
  const others = all.filter((g) => g.slug !== gown.slug)
  const sameEdit = others.filter((g) => g.cultureEdit === gown.cultureEdit)
  const rest = others.filter((g) => g.cultureEdit !== gown.cultureEdit)
  return [...sameEdit, ...rest].slice(0, count)
}

// ── Content ──────────────────────────────────────────────────────────────────

export async function getFaqs(): Promise<Faq[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'faqs',
    sort: 'displayOrder',
    limit: 100,
  })
  return result.docs
}

export async function getHomeFaqs(): Promise<Faq[]> {
  const faqs = await getFaqs()
  return faqs.filter((f) => f.featuredOnHome).slice(0, 5)
}

export async function getProductFaqs(): Promise<Faq[]> {
  const faqs = await getFaqs()
  return faqs.filter((f) => f.showOnProduct).slice(0, 6)
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'testimonials',
    sort: 'displayOrder',
    limit: 24,
    depth: 1,
  })
  return result.docs
}

export async function getRealMoms(): Promise<RealMom[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'real-moms',
    where: { consent: { equals: true } },
    sort: 'displayOrder',
    limit: 60,
    depth: 1,
  })
  return result.docs
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    where: { published: { equals: true } },
    sort: '-publishedAt',
    limit: 50,
    depth: 1,
  })
  return result.docs
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    where: { and: [{ slug: { equals: slug } }, { published: { equals: true } }] },
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}

export async function getPageContent(slug: string): Promise<Page | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}
