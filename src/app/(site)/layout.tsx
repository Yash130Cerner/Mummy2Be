import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import type { ReactNode } from 'react'

import { AnalyticsScripts } from '@/components/layout/AnalyticsScripts'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { JsonLd } from '@/components/ui/JsonLd'
import { IS_LIVE_DOMAIN, SITE } from '@/lib/constants'
import { organizationSchema } from '@/lib/schema'

import './globals.css'

/**
 * Font-loading strategy (measured with Lighthouse):
 * - Discrete weights instead of the full variable font (which carries every
 *   weight plus optical-size/soft/wonk axes) keep each file small.
 * - The files are preloaded and arrive well before first paint (~300ms vs
 *   ~1.8s on Lighthouse's slow-4G run), so `display: 'swap'` almost never
 *   produces a visible swap - and when it does, the metrics-matched fallback
 *   (Georgia / system-ui, the design system's own declared fallbacks) keeps
 *   layout shift at zero.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.defaultTitle,
    template: '%s | Mummy2Be',
  },
  description: SITE.defaultDescription,
  openGraph: {
    siteName: SITE.name,
    locale: 'en_CA',
    type: 'website',
  },
  // Belt and braces with robots.ts: a crawler that ignores robots.txt, or one
  // that finds a preview URL linked from elsewhere, still sees noindex. Clears
  // itself once NEXT_PUBLIC_SERVER_URL is the real domain.
  ...(IS_LIVE_DOMAIN ? {} : { robots: { index: false, follow: false } }),
}

export const viewport: Viewport = {
  themeColor: '#FAF6EF',
  width: 'device-width',
  initialScale: 1,
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-soft focus:bg-cocoa focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingContact />
        <AnalyticsScripts />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  )
}
