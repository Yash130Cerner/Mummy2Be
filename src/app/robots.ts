import type { MetadataRoute } from 'next'

import { IS_LIVE_DOMAIN, SITE } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  // Before launch the site is served from a *.vercel.app URL. Let anything
  // index it and the content gets attributed to a domain we are about to
  // abandon, splitting authority with mummy2be.com on day one. Block
  // everything until NEXT_PUBLIC_SERVER_URL is the real domain - no code
  // change needed at launch, just the env var and a redeploy.
  if (!IS_LIVE_DOMAIN) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

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
