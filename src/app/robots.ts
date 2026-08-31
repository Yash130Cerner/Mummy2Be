import type { MetadataRoute } from 'next'

import { SITE } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        // Gown photos are served via /api/media/* - keep them crawlable for
        // image SEO while the rest of the API and utility pages stay out.
        allow: ['/', '/api/media/'],
        disallow: ['/admin', '/api/', '/rental-request', '/rental-terms', '/saved'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  }
}
