'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ChannelLink } from '@/components/contact/ChannelLink'
import { Button } from '@/components/ui/Button'
import { Sheet } from '@/components/ui/Sheet'
import { MailIcon, MessageIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'
import { track } from '@/lib/analytics'
import {
  BUSINESS,
  COPY,
  CTA,
  mailtoLink,
  smsLink,
  telLink,
  waLink,
} from '@/lib/constants'

/**
 * The reserve-by-contact block: primary “Reserve This Gown” → pre-filled
 * rental request; secondary “Ask About This Gown” → a sheet of live channels
 * with a pre-filled message. No payment, no checkout - ever.
 */

export function ReserveButton({
  gownName,
  gownSlug,
  size = 'lg',
  className,
}: {
  gownName: string
  gownSlug: string
  size?: 'lg' | 'md'
  className?: string
}) {
  const router = useRouter()
  return (
    <Button
      variant="primary"
      size={size}
      className={className}
      onClick={() => {
        track('reserve_click', { gown: gownName })
        router.push(`/rental-request?gown=${encodeURIComponent(gownSlug)}`)
      }}
    >
      {CTA.reserve}
    </Button>
  )
}

export function AskButton({
  gownName,
  size = 'lg',
  className,
}: {
  gownName: string
  size?: 'lg' | 'md'
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const message = `Hi Mummy2Be! I’d love to ask about the ${gownName}.`

  const channels = [
    {
      channel: 'whatsapp' as const,
      href: waLink(message),
      label: 'WhatsApp us',
      detail: 'Fastest reply',
      icon: <WhatsAppIcon size={20} className="text-[#1faa55]" />,
    },
    {
      channel: 'call' as const,
      href: telLink(),
      label: `Call ${BUSINESS.phoneDisplay}`,
      detail: BUSINESS.hoursNote,
      icon: <PhoneIcon size={20} className="text-sage-text" />,
    },
    {
      channel: 'text' as const,
      href: smsLink(message),
      label: `Text ${BUSINESS.phoneDisplay}`,
      detail: 'We reply the same day',
      icon: <MessageIcon size={20} className="text-sage-text" />,
    },
    {
      channel: 'email' as const,
      href: mailtoLink(`Question about the ${gownName}`, message),
      label: 'Email us',
      detail: BUSINESS.email,
      icon: <MailIcon size={20} className="text-sage-text" />,
    },
  ]

  return (
    <>
      <Button
        variant="secondary"
        size={size}
        className={className}
        onClick={() => {
          track('ask_click', { gown: gownName })
          setOpen(true)
        }}
      >
        {CTA.ask}
      </Button>
      <Sheet open={open} onClose={() => setOpen(false)} title={`Ask about the ${gownName}`}>
        <p className="text-[15px] text-cocoa-light">{COPY.reserveReassurance}</p>
        <ul className="mt-4 space-y-2.5">
          {channels.map((c) => (
            <li key={c.channel}>
              <ChannelLink
                channel={c.channel}
                href={c.href}
                context={`ask:${gownName}`}
                className="flex min-h-[56px] items-center gap-4 rounded-soft border border-taupe bg-ivory px-4 py-3 hover:bg-champagne motion-safe:transition-colors"
              >
                {c.icon}
                <span>
                  <span className="block font-medium">{c.label}</span>
                  <span className="block text-[13px] text-cocoa-light">{c.detail}</span>
                </span>
              </ChannelLink>
            </li>
          ))}
        </ul>
      </Sheet>
    </>
  )
}

/** Mobile sticky bottom bar on gown pages - Reserve + Ask, always in thumb reach. */
export function StickyCtaBar({ gownName, gownSlug }: { gownName: string; gownSlug: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-taupe bg-ivory/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm md:hidden">
      <div className="flex gap-2.5">
        <ReserveButton gownName={gownName} gownSlug={gownSlug} size="md" className="flex-1" />
        <AskButton gownName={gownName} size="md" className="flex-1" />
      </div>
    </div>
  )
}
