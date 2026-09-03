import { ChannelLink } from '@/components/contact/ChannelLink'
import { MailIcon, MessageIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'
import {
  BUSINESS,
  DEFAULT_WA_MESSAGE,
  mailtoLink,
  smsLink,
  telLink,
  waLink,
} from '@/lib/constants'

/**
 * Reaching a human, effortless: call, text, WhatsApp, email as large
 * tappable buttons with live links. Every click is a tracked conversion.
 */
export function ContactOptions({
  context,
  message = DEFAULT_WA_MESSAGE,
  emailSubject = 'Gown rental inquiry',
}: {
  context: string
  message?: string
  emailSubject?: string
}) {
  const channels = [
    {
      channel: 'whatsapp' as const,
      href: waLink(message),
      label: 'WhatsApp',
      detail: 'Fastest reply - tap to chat',
      icon: <WhatsAppIcon size={22} className="text-[#1faa55]" />,
    },
    {
      channel: 'call' as const,
      href: telLink(),
      label: `Call ${BUSINESS.phoneDisplay}`,
      detail: BUSINESS.hoursNote,
      icon: <PhoneIcon size={22} className="text-sage-text" />,
    },
    {
      channel: 'text' as const,
      href: smsLink(message),
      label: `Text ${BUSINESS.phoneDisplay}`,
      detail: 'We reply the same day',
      icon: <MessageIcon size={22} className="text-sage-text" />,
    },
    {
      channel: 'email' as const,
      href: mailtoLink(emailSubject, message),
      label: 'Email us',
      detail: BUSINESS.email,
      icon: <MailIcon size={22} className="text-sage-text" />,
    },
  ]

  return (
    // grid-cols-1 is load-bearing, not decorative: it compiles to
    // minmax(0,1fr). Without it the mobile grid has no column template, so
    // each <li> falls back to min-width:auto and sizes to its min-content -
    // which was wider than the phone and scrolled the whole page sideways.
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {channels.map((c) => (
        <li key={c.channel}>
          <ChannelLink
            channel={c.channel}
            href={c.href}
            context={context}
            className="flex min-h-[64px] items-center gap-4 rounded-soft-lg border border-taupe bg-ivory px-5 py-4 shadow-warm hover:bg-champagne motion-safe:transition-colors"
          >
            {c.icon}
            <span className="min-w-0">
              <span className="block font-semibold">{c.label}</span>
              {/*
                Wraps rather than truncating. `truncate` implies nowrap, which
                made this line's min-content the full sentence and was the root
                of the overflow - and an ellipsis would have hidden the
                reassurance copy on the one screen that converts. break-words
                keeps an unbreakable string (a long email) from overflowing.
              */}
              <span className="block break-words text-[13.5px] text-cocoa-light">{c.detail}</span>
            </span>
          </ChannelLink>
        </li>
      ))}
    </ul>
  )
}
