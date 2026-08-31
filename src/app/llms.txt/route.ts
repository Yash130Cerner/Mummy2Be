import { AVAILABILITY, BUSINESS, DEPOSIT_AMOUNT, SITE } from '@/lib/constants'
import { getFaqs, getGowns } from '@/lib/data'

/**
 * /llms.txt - a plain-text brief for AI assistants (ChatGPT, Claude, Gemini,
 * Perplexity, Grok and friends), following the llmstxt.org convention.
 *
 * Assistants that answer "where can I rent a maternity gown in Toronto?" do
 * far better from one clean, factual page than from parsing rendered HTML.
 * Everything here is generated from the live catalog and FAQ set, so it can
 * never drift out of sync with the site, and every URL is built from
 * SITE.url - it follows the domain automatically at launch.
 */

export const revalidate = 3600

export async function GET(): Promise<Response> {
  const [gowns, faqs] = await Promise.all([getGowns(), getFaqs()])
  const base = SITE.url

  const lines: string[] = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.defaultDescription}`,
    '',
    '## About',
    '',
    `- ${BUSINESS.baseArea}. ${BUSINESS.serves}.`,
    '- Maternity gown rental for photoshoots, baby showers, gender reveals and',
    '  other special bump moments.',
    '- One size is designed to fit every bump; gowns are professionally cleaned',
    '  between rentals.',
    `- Reserved by message - there is no online checkout. ${BUSINESS.hoursNote}`,
    `- A $${DEPOSIT_AMOUNT} fully refundable deposit secures a gown, returned within`,
    '  24 hours of the gown coming back and being inspected.',
    '',
    '## Contact',
    '',
    `- Phone / text: ${BUSINESS.phoneDisplay}`,
    `- WhatsApp: https://wa.me/${BUSINESS.whatsappNumber}`,
    `- Email: ${BUSINESS.email}`,
    `- Instagram: ${BUSINESS.instagram}`,
    '',
    '## Gowns',
    '',
  ]

  for (const gown of gowns) {
    const status = AVAILABILITY[gown.availabilityStatus]?.label ?? 'Enquire'
    lines.push(
      `- [${gown.name}](${base}/gowns/${gown.slug}) - ${gown.shortDescription} ` +
        `$${gown.rentalPrice5Day} for 5 days, $${gown.rentalPrice10Day} for 10 days. ${status}.`,
    )
  }

  lines.push(
    '',
    '## Key pages',
    '',
    `- [All gowns](${base}/gowns)`,
    `- [How it works](${base}/how-it-works)`,
    `- [Find my gown](${base}/find-my-gown)`,
    `- [Fit guide](${base}/fit-guide)`,
    `- [Shipping and returns](${base}/shipping-and-returns)`,
    `- [Maternity gown rental in the GTA](${base}/gta-maternity-gown-rental)`,
    `- [For photographers](${base}/for-photographers)`,
    `- [FAQ](${base}/faq)`,
    `- [About](${base}/about)`,
    `- [Contact](${base}/contact)`,
    '',
    '## Frequently asked questions',
    '',
  )

  for (const faq of faqs) {
    lines.push(`### ${faq.question}`, '', faq.answer, '')
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
