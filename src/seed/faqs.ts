/**
 * The launch FAQ set - the verbatim Q&As from the Content & SEO spec.
 * `featuredOnHome` deliberately excludes deposit/payment questions (the
 * deposit is disclosed on evaluation pages, never the homepage).
 */

export type SeedFaq = {
  question: string
  answer: string
  group: 'gowns-fit' | 'booking-availability' | 'payment-deposit' | 'shipping-returns' | 'about-us'
  displayOrder: number
  featuredOnHome?: boolean
  showOnProduct?: boolean
}

export const SEED_FAQS: SeedFaq[] = [
  // The gowns & fit
  {
    question: 'What size are the gowns?',
    answer:
      'One size, and beautifully stretchable - designed to fit and flatter every bump, at every stage.',
    group: 'gowns-fit',
    displayOrder: 1,
    featuredOnHome: true,
    showOnProduct: true,
  },
  {
    question: 'Will it still fit later in my pregnancy?',
    answer:
      'Yes. The stretch fabric is made to flatter from your first shoot right through to your due date.',
    group: 'gowns-fit',
    displayOrder: 2,
    featuredOnHome: true,
    showOnProduct: true,
  },
  {
    question: 'Are the gowns cleaned between rentals?',
    answer: 'Always. Every gown is professionally cleaned before it reaches you.',
    group: 'gowns-fit',
    displayOrder: 3,
    showOnProduct: true,
  },

  // Booking & availability
  {
    question: 'How do I reserve a gown?',
    answer:
      'See availability on the gown’s page, then reach us by call, text, WhatsApp, email, or the form - we confirm your dates personally, the same day.',
    group: 'booking-availability',
    displayOrder: 1,
    featuredOnHome: true,
    showOnProduct: true,
  },
  {
    question: 'Can I book online?',
    answer:
      'Availability shows online so you can browse confidently. We handle the final reservation personally, so we can confirm your exact dates and answer any questions.',
    group: 'booking-availability',
    displayOrder: 2,
  },
  {
    question: 'How quickly do you reply?',
    answer: 'The same day.',
    group: 'booking-availability',
    displayOrder: 3,
    featuredOnHome: true,
  },
  {
    question: 'How do I know if a gown is free for my date?',
    answer:
      'The availability badge gives you a live sense, and we confirm your exact dates when you message us.',
    group: 'booking-availability',
    displayOrder: 4,
  },

  // Payment & deposit
  {
    question: 'How do I pay?',
    answer:
      'After we confirm your rental, simply by e-transfer or cash - nothing is charged online.',
    group: 'payment-deposit',
    displayOrder: 1,
  },
  {
    question: 'Is there a deposit?',
    answer:
      'Yes - a $100 fully refundable deposit, returned within 24 hours of your gown’s return, once inspected. It helps us keep every gown beautiful for the next mom.',
    group: 'payment-deposit',
    displayOrder: 2,
  },

  // Shipping & returns
  {
    question: 'Do you deliver across Canada?',
    answer:
      'Yes, via Canada Post. Shipping is calculated by your address and paid at reservation.',
    group: 'shipping-returns',
    displayOrder: 1,
    featuredOnHome: true,
  },
  {
    question: 'Do you offer local delivery?',
    answer:
      'For moms in the GTA, we offer free local hand-delivery and pickup - just ask, and we’ll arrange it on our call.',
    group: 'shipping-returns',
    displayOrder: 2,
  },
  {
    question: 'How long is the rental?',
    answer: '5 or 10 days, starting from when you receive the gown.',
    group: 'shipping-returns',
    displayOrder: 3,
  },
  {
    question: 'How do I return it?',
    answer:
      'When you’re ready, we send a prepaid return label - ship it back within your window. No need to clean it.',
    group: 'shipping-returns',
    displayOrder: 4,
    showOnProduct: true,
  },

  // About us
  {
    question: 'Are you a real business?',
    answer:
      'Yes - we’re an Ontario-based maternity gown rental service, and you can reach a real person by phone, WhatsApp, or email any day, with a reply the same day. Every gown on this site is one we own, photograph, clean and ship ourselves. Moms in the GTA are welcome to arrange free hand-delivery and meet us in person.',
    group: 'about-us',
    displayOrder: 1,
  },
  {
    question: 'Where are you located?',
    answer: 'We’re based in the GTA (Ontario) and deliver across Canada.',
    group: 'about-us',
    displayOrder: 2,
  },
]
