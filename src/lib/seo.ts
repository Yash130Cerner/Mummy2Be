import type { Metadata } from 'next'

import { SITE } from '@/lib/constants'

type PageMetaArgs = {
  /** Exact SEO title (~50–60 chars, keyword near the front, brand at the end). */
  title: string
  /** Meta description (~150–160 chars). */
  description: string
  /** Canonical path, e.g. '/gowns/photoshoot'. */
  path: string
  /** Utility pages (rental-request, rental-terms, saved) are noindexed. */
  noindex?: boolean
  ogImage?: string | null
}

export function pageMeta({ title, description, path, noindex, ogImage }: PageMetaArgs): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE.name,
      locale: 'en_CA',
      type: 'website',
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
