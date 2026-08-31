import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    /**
     * Inline the site's (small, ~21 KB) stylesheet into the HTML instead of
     * loading it as a render-blocking request - on slow mobile connections
     * this removes an entire round trip from first paint / LCP.
     */
    inlineCss: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Vercel Blob storage (production media)
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
      // Local dev media served by Payload
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '127.0.0.1' },
    ],
  },
  async redirects() {
    // 301 redirects from the old Wix site to preserve any existing SEO equity.
    return [
      { source: '/product-page/:path*', destination: '/gowns', permanent: true },
      { source: '/category/all-products', destination: '/gowns', permanent: true },
      { source: '/category/:path*', destination: '/gowns', permanent: true },
      { source: '/faqs', destination: '/faq', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/rental-aggrement', destination: '/rental-terms', permanent: true },
      { source: '/rental-agreement', destination: '/rental-terms', permanent: true },
      { source: '/contact-6', destination: '/contact', permanent: true },
    ]
  },
}

const config = withPayload(nextConfig)

/**
 * Performance: withPayload adds `Accept-CH` / `Vary` / `Critical-CH`
 * (Sec-CH-Prefers-Color-Scheme) to EVERY route so the admin panel can detect
 * dark mode server-side. On the public site those headers are pure cost:
 * `Critical-CH` makes Chrome restart the very first request (an extra round
 * trip before anything paints) and the `Vary` fragments CDN caching. The site
 * has a fixed warm palette and never reads the hint - so keep the client-hint
 * headers for /admin only and strip them from public routes.
 */
const payloadHeaders = config.headers
config.headers = async () => {
  const rules = (await payloadHeaders()) || []
  const CH_KEYS = ['Accept-CH', 'Vary', 'Critical-CH']
  const adminRules = []
  const filtered = rules.map((rule) => {
    if (rule.source !== '/:path*') return rule
    const chHeaders = rule.headers.filter((h) => CH_KEYS.includes(h.key))
    if (chHeaders.length > 0) {
      adminRules.push({ source: '/admin/:path*', headers: chHeaders })
    }
    return { ...rule, headers: rule.headers.filter((h) => !CH_KEYS.includes(h.key)) }
  })
  return [...filtered, ...adminRules]
}

export default config
