import type { Metadata } from 'next'

import { ChannelLink } from '@/components/contact/ChannelLink'
import { RentalRequestForm } from '@/components/forms/RentalRequestForm'
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'
import { BUSINESS, COPY, DEFAULT_WA_MESSAGE, telLink, waLink } from '@/lib/constants'
import { getGowns } from '@/lib/data'
import { pageMeta } from '@/lib/seo'

export const revalidate = 300

// Transactional utility page - deliberately noindexed.
export const metadata: Metadata = pageMeta({
  title: 'Reserve Your Gown - Rental Request | Mummy2Be',
  description:
    'Send your rental request - we personally confirm availability and details the same day. No payment is taken online.',
  path: '/rental-request',
  noindex: true,
})

type Props = {
  searchParams: Promise<{ gown?: string; gowns?: string; type?: string }>
}

export default async function RentalRequestPage({ searchParams }: Props) {
  const params = await searchParams
  const allGowns = await getGowns()
  const gownOptions = allGowns.map((g) => ({ slug: g.slug, name: g.name }))

  const preselected = [
    ...(params.gown ? [params.gown] : []),
    ...(params.gowns ? params.gowns.split(',') : []),
  ]
    .map((s) => s.trim())
    .filter(Boolean)

  const photographer = params.type === 'photographer'
  const selectedNames = allGowns
    .filter((g) => preselected.includes(g.slug))
    .map((g) => g.name)

  return (
    <div className="container-page pt-10 md:pt-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-display">
          {photographer
            ? 'Partner with Mummy2Be'
            : selectedNames.length === 1
              ? `Request the ${selectedNames[0]}`
              : 'Reserve your gown'}
        </h1>
        <p className="mt-4 text-body-lg text-cocoa-light">{COPY.reserveReassurance}</p>

        <div className="mt-8 rounded-soft border border-taupe bg-champagne/60 px-5 py-4">
          <p className="text-[14.5px]">
            <strong>Prefer to talk?</strong> Skip the form entirely:
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <ChannelLink
              channel="whatsapp"
              href={waLink(
                selectedNames.length > 0
                  ? `Hi Mummy2Be! I’d like to reserve the ${selectedNames.join(' and the ')}.`
                  : DEFAULT_WA_MESSAGE,
              )}
              context="rental-request"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-soft border border-taupe bg-ivory px-4 py-2 text-[14.5px] font-medium hover:bg-ivory/70"
            >
              <WhatsAppIcon size={16} className="text-[#1faa55]" /> WhatsApp
            </ChannelLink>
            <ChannelLink
              channel="call"
              href={telLink()}
              context="rental-request"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-soft border border-taupe bg-ivory px-4 py-2 text-[14.5px] font-medium hover:bg-ivory/70"
            >
              <PhoneIcon size={16} className="text-sage-text" /> {BUSINESS.phoneDisplay}
            </ChannelLink>
          </div>
        </div>

        <div className="mt-10">
          <RentalRequestForm
            gownOptions={gownOptions}
            preselectedSlugs={preselected}
            photographer={photographer}
          />
        </div>
      </div>
    </div>
  )
}
