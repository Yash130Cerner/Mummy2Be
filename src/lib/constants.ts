/**
 * Single-source business facts and the shared copy library.
 *
 * Deposit, shipping, returns, availability and reassurance copy is locked -
 * every page renders these exact strings so the facts never contradict each
 * other (Content & SEO spec, Part A §3).
 */

export const SITE = {
  name: 'Mummy2Be',
  url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  /**
   * The one real public address. Anything that must not happen before launch
   * - search indexing, AI crawling - is gated on SITE.url matching this, so
   * going live is a single env var change plus a redeploy. Nothing here or in
   * robots.ts needs editing again.
   */
  productionUrl: 'https://mummy2be.com',
  defaultTitle: 'Maternity Gown Rental in Ontario & Across Canada | Mummy2Be',
  defaultDescription:
    'Rent premium maternity gowns for your photoshoot, baby shower, and special moments. One size fits every bump, professionally cleaned, delivered across Canada. Reserve by message - same-day reply.',
}

// Tolerant on purpose: a stray trailing slash, different casing or a www.
// prefix in NEXT_PUBLIC_SERVER_URL would otherwise leave the live site
// silently noindexed, which is a failure nobody notices for weeks.
const normalizeUrl = (url: string): string =>
  url.trim().toLowerCase().replace(/\/+$/, '').replace('://www.', '://')

/**
 * True only when this build serves the real domain. False on localhost and on
 * *.vercel.app, which keeps preview builds out of every index - so content is
 * never attributed to a throwaway domain we later abandon.
 */
export const IS_LIVE_DOMAIN = normalizeUrl(SITE.url) === normalizeUrl(SITE.productionUrl)

export const BUSINESS = {
  name: 'Mummy2Be',
  phoneDisplay: '437-249-3769',
  phoneTel: '+14372493769',
  whatsappNumber: '14372493769',
  email: 'RentWithMummy2Be@gmail.com',
  baseArea: 'Based in the GTA, Ontario',
  serves: 'Serving all of Canada',
  hoursNote: 'Based in Eastern Time - we reply the same day.',
  /**
   * Instagram is a simple follow LINK only (header + footer) - never an
   * embedded feed, and no third-party Instagram scripts anywhere.
   */
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/_mummy2be_',
}

// ── Contact links ────────────────────────────────────────────────────────────

export const telLink = () => `tel:${BUSINESS.phoneTel}`

export const smsLink = (message?: string) =>
  message
    ? `sms:${BUSINESS.phoneTel}?body=${encodeURIComponent(message)}`
    : `sms:${BUSINESS.phoneTel}`

export const waLink = (message?: string) =>
  `https://wa.me/${BUSINESS.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`

export const mailtoLink = (subject?: string, body?: string) => {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString()
  return `mailto:${BUSINESS.email}${query ? `?${query.replace(/\+/g, '%20')}` : ''}`
}

export const DEFAULT_WA_MESSAGE = 'Hi Mummy2Be! I’m interested in renting a maternity gown.'

// ── Shared copy library (use verbatim - single source of truth) ─────────────

/** Trust microcopy - hero + footer + trust strip. Deliberately excludes the deposit. */
export const TRUST_MICROCOPY = [
  'Professionally cleaned',
  'One size, fits every bump',
  'Canada-wide delivery',
  'Same-day reply',
] as const

export type AvailabilityStatus = 'available' | 'limited' | 'on_rental' | 'contact_to_confirm'

export const AVAILABILITY: Record<
  AvailabilityStatus,
  { label: string; line: string; schema: string }
> = {
  available: {
    label: 'Available',
    line: 'Available now - message us to reserve for your dates.',
    schema: 'https://schema.org/InStock',
  },
  limited: {
    label: 'Limited',
    line: 'Booking up - contact us to secure your dates.',
    schema: 'https://schema.org/LimitedAvailability',
  },
  on_rental: {
    label: 'On rental',
    line: 'Currently on rental - message us for the next available dates.',
    schema: 'https://schema.org/OutOfStock',
  },
  contact_to_confirm: {
    label: 'Contact to confirm',
    line: 'Contact us to confirm availability for your event dates.',
    schema: 'https://schema.org/LimitedAvailability',
  },
}

export const COPY = {
  /** Shown under the badge on every gown page. */
  pdpAvailabilityLine:
    'Contact us to confirm availability for your event dates - we reply the same day.',

  /** Reservation reassurance - gown page reserve block + request form. */
  reserveReassurance:
    'No payment is taken online - we’ll confirm availability and details personally, the same day.',

  /**
   * Deposit messaging - evaluation pages ONLY (How It Works, gown page
   * “what’s included”, Shipping & Returns, FAQ, confirmation). Never the hero,
   * product cards, or trust strip.
   */
  deposit:
    'A $100 fully refundable deposit secures your gown - refunded within 24 hours of its return, once inspected. It simply helps us keep every gown beautiful for the next mom.',

  shipping:
    'Shipped anywhere in Canada via Canada Post - calculated by your address, paid at reservation - and it arrives cleaned and ready to wear. Moms in the GTA: ask us about free local hand-delivery and pickup.',

  returns:
    'When you’re ready to return, we send you a prepaid label - just ship it back within your rental window. No need to clean it; we take care of that.',

  fitLine:
    'One size, made to stretch and flatter every bump - from your first shoot to your due date.',

  oneSizeBanner:
    'Every gown is one size, beautifully stretchable - designed to fit and flatter every bump.',

  whatsIncluded:
    'Professionally cleaned and ready to wear, a prepaid return label, and your choice of a 5-day or 10-day rental.',
} as const

/** CTA label set - used consistently; never “Book Now”, “Add to Cart”, or “Checkout”. */
export const CTA = {
  browse: 'Browse Gowns',
  reserve: 'Reserve This Gown',
  ask: 'Ask About This Gown',
  findMyGown: 'Find My Gown',
  contact: 'Contact Us',
  whatsapp: 'Message on WhatsApp',
  howItWorks: 'How It Works',
  sendRequest: 'Send Request',
  partner: 'Partner With Us',
} as const

// ── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Gowns', href: '/gowns' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Our Story', href: '/about' },
  { label: 'Real Moms', href: '/real-moms' },
  { label: 'FAQ', href: '/faq' },
] as const

export const FOOTER_COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Browse all gowns', href: '/gowns' },
      { label: 'Photoshoot gowns', href: '/gowns/photoshoot' },
      { label: 'Baby shower gowns', href: '/gowns/baby-shower' },
      { label: 'Western gowns', href: '/gowns/western' },
      { label: 'South Asian gowns', href: '/gowns/south-asian' },
      { label: 'Find My Gown', href: '/find-my-gown' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Real Moms', href: '/real-moms' },
      { label: 'For Photographers', href: '/for-photographers' },
      { label: 'The Style Journal', href: '/blog' },
      { label: 'Toronto & GTA rental', href: '/gta-maternity-gown-rental' },
    ],
  },
  {
    heading: 'Info',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping & Returns', href: '/shipping-and-returns' },
      { label: 'Fit Guide', href: '/fit-guide' },
      { label: 'Rental Terms', href: '/rental-terms' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
] as const

// ── Rental facts ─────────────────────────────────────────────────────────────

export const RENTAL_PERIODS = [
  { value: '5_day', label: '5 days' },
  { value: '10_day', label: '10 days' },
] as const

export const DEPOSIT_AMOUNT = 100
