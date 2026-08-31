import type { Faq, Gown } from '@/payload-types'

import { AVAILABILITY, BUSINESS, SITE } from '@/lib/constants'
import { mediaUrl } from '@/lib/media'
import { asMedia } from '@/lib/data'

/**
 * JSON-LD builders. Everything marked up here is true and visible on the page:
 * a rental service reserved by contact - no fake reviews, ratings or prices.
 * Service-area business: no street address anywhere.
 */

const absolute = (path: string) => `${SITE.url}${path}`

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': absolute('/#organization'),
        name: BUSINESS.name,
        url: SITE.url,
        email: BUSINESS.email,
        telephone: BUSINESS.phoneTel,
        // Raster, not the SVG favicon - Google's Organization logo wants a bitmap.
        logo: absolute('/logo-512.png'),
      },
      {
        '@type': 'WebSite',
        '@id': absolute('/#website'),
        url: SITE.url,
        name: BUSINESS.name,
        publisher: { '@id': absolute('/#organization') },
      },
    ],
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': absolute('/#localbusiness'),
    name: `${BUSINESS.name} - Maternity Gown Rental`,
    url: SITE.url,
    email: BUSINESS.email,
    telephone: BUSINESS.phoneTel,
    priceRange: '$40–$95 CAD per rental',
    areaServed: ['Toronto', 'Mississauga', 'Brampton', 'Greater Toronto Area', 'Ontario', 'Canada'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS.phoneTel,
      email: BUSINESS.email,
      contactType: 'customer service',
      availableLanguage: 'English',
    },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  }
}

export function collectionPageSchema(name: string, description: string, path: string, gowns: Gown[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absolute(path),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: gowns.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: g.name,
        url: absolute(`/gowns/${g.slug}`),
      })),
    },
  }
}

export function productSchema(gown: Gown) {
  const availability =
    AVAILABILITY[gown.availabilityStatus]?.schema ?? 'https://schema.org/LimitedAvailability'
  const image = mediaUrl(asMedia(gown.primaryImage), 'gallery')
  const offer = (price: number, name: string) => ({
    '@type': 'Offer',
    name,
    price: String(price),
    priceCurrency: 'CAD',
    availability,
    // Honest representation: a rental reserved by contact, not an online purchase.
    availabilityStarts: undefined,
    url: absolute(`/gowns/${gown.slug}`),
  })
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${gown.name} - maternity gown rental`,
    description: gown.shortDescription,
    ...(image ? { image: image.startsWith('http') ? image : absolute(image) } : {}),
    url: absolute(`/gowns/${gown.slug}`),
    brand: { '@type': 'Brand', name: BUSINESS.name },
    offers: [offer(gown.rentalPrice5Day, '5-day rental'), offer(gown.rentalPrice10Day, '10-day rental')],
  }
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function articleSchema(args: {
  title: string
  description: string
  path: string
  publishedAt?: string | null
  image?: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: args.title,
    description: args.description,
    url: absolute(args.path),
    ...(args.publishedAt ? { datePublished: args.publishedAt } : {}),
    ...(args.image ? { image: args.image.startsWith('http') ? args.image : absolute(args.image) } : {}),
    author: { '@type': 'Organization', name: BUSINESS.name },
    publisher: { '@type': 'Organization', name: BUSINESS.name },
  }
}
