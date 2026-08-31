'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { track } from '@/lib/analytics'

export type Channel = 'whatsapp' | 'call' | 'text' | 'email'

const EVENT: Record<Channel, string> = {
  whatsapp: 'whatsapp_click',
  call: 'call_click',
  text: 'text_click',
  email: 'email_click',
}

/**
 * A live contact link (tel: / wa.me / sms: / mailto:) that fires its
 * conversion event on click. Used everywhere a channel appears.
 */
export function ChannelLink({
  channel,
  href,
  context,
  children,
  className,
  ...rest
}: {
  channel: Channel
  href: string
  context?: string
  children: ReactNode
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'onClick'>) {
  const external = channel === 'whatsapp'
  return (
    <a
      href={href}
      className={className}
      onClick={() => track(EVENT[channel], context ? { context } : undefined)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
