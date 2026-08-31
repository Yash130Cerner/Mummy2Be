'use client'

import { useEffect, useState } from 'react'

import { ChannelLink } from '@/components/contact/ChannelLink'
import { ButtonLink } from '@/components/ui/Button'
import { CheckIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'
import { BUSINESS, telLink, waLink } from '@/lib/constants'

/**
 * The locked confirmation copy (UX Spec §9), personalized from the just-sent
 * request (via sessionStorage - nothing personal in the URL).
 */

type ConfirmationData = {
  name?: string
  gowns?: string[]
  method?: string
  photographer?: boolean
}

const METHOD_LABELS: Record<string, string> = {
  call: 'call',
  text: 'text',
  whatsapp: 'WhatsApp',
  email: 'email',
}

export function ConfirmationContent() {
  const [data, setData] = useState<ConfirmationData | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('mummy2be:confirmation')
      if (raw) setData(JSON.parse(raw) as ConfirmationData)
    } catch {
      // Graceful default below.
    }
    setLoaded(true)
  }, [])

  if (!loaded) return <div className="min-h-[40vh]" aria-hidden />

  const firstName = data?.name?.split(' ')[0]
  const gownLabel =
    data?.gowns && data.gowns.length > 0
      ? data.gowns.length > 1
        ? data.gowns.join(', ')
        : data.gowns[0]
      : 'your gown'
  const method = data?.method ? (METHOD_LABELS[data.method] ?? data.method) : 'your preferred method'

  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-sage/15">
        <CheckIcon size={30} className="text-sage-text" />
      </span>

      <h1 className="text-display mt-6">
        Thank you{firstName ? `, ${firstName}` : ''} - we’ve received your request
        {data?.photographer ? '.' : ` for the ${gownLabel}.`}
      </h1>

      <div className="mx-auto mt-8 max-w-xl rounded-soft-lg bg-champagne p-6 text-left md:p-8">
        <h2 className="font-sans text-[17px] font-semibold">Here’s what happens next:</h2>
        <ul className="mt-4 space-y-3.5 text-[15.5px] leading-relaxed text-cocoa-light">
          <li className="flex gap-3">
            <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-terracotta" />
            <span>
              We’ll personally check availability for your dates and confirm - you’ll hear from us{' '}
              <strong className="text-cocoa">the same day</strong>, by your preferred method (
              <strong className="text-cocoa">{method}</strong>).
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-terracotta" />
            <span>
              We’ll share your full{' '}
              <strong className="text-cocoa">
                rental total, Canada Post shipping cost, and the $100 refundable deposit
              </strong>{' '}
              details.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-terracotta" />
            <span>
              <strong className="text-cocoa">No payment has been taken</strong> - nothing is
              charged online. When you’re ready, you can pay simply by{' '}
              <strong className="text-cocoa">e-transfer or cash</strong>.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-terracotta" />
            <span>
              Once confirmed, we ship your gown <strong className="text-cocoa">cleaned and ready</strong>,
              with a <strong className="text-cocoa">prepaid return label</strong> for an easy return
              within your rental window.
            </span>
          </li>
        </ul>
      </div>

      <p className="mt-7 text-[15px] italic text-cocoa-light">
        Prefer to talk now? Message us on WhatsApp or call {BUSINESS.phoneDisplay} for the fastest
        reply.
      </p>
      <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
        <ChannelLink
          channel="whatsapp"
          href={waLink('Hi Mummy2Be! I just sent a rental request.')}
          context="confirmation"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-soft bg-terracotta px-6 py-3 font-medium text-white shadow-warm hover:bg-terracotta-dark"
        >
          <WhatsAppIcon size={18} /> Message on WhatsApp
        </ChannelLink>
        <ChannelLink
          channel="call"
          href={telLink()}
          context="confirmation"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-soft border border-cocoa px-6 py-3 font-medium hover:bg-champagne"
        >
          <PhoneIcon size={18} /> Call {BUSINESS.phoneDisplay}
        </ChannelLink>
      </div>

      <p className="mt-10">
        <ButtonLink href="/gowns" variant="tertiary" size="sm">
          Keep browsing the collection
        </ButtonLink>
      </p>
    </div>
  )
}
