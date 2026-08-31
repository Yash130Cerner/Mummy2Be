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
    <ul className="grid gap-3 sm:grid-cols-2">
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
              <span className="block truncate text-[13.5px] text-cocoa-light">{c.detail}</span>
            </span>
          </ChannelLink>
        </li>
      ))}
    </ul>
  )
}
