'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ChannelLink } from '@/components/contact/ChannelLink'
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'
import { DEFAULT_WA_MESSAGE, telLink, waLink } from '@/lib/constants'

/**
 * Floating WhatsApp + call buttons - mobile only, appear after scrolling.
 * Hidden on gown pages (which have their own sticky Reserve/Ask bar) and on
 * the rental-request flow, so the bottom of the screen is never crowded.
 */
export function FloatingContact() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const categoryPages = ['/gowns', '/gowns/photoshoot', '/gowns/baby-shower', '/gowns/western', '/gowns/south-asian']
  const isPdp = pathname.startsWith('/gowns/') && !categoryPages.includes(pathname)
  const isRequestFlow = pathname.startsWith('/rental-request')
  if (isPdp || isRequestFlow) return null

  return (
    <div
      className={`fixed bottom-5 right-4 z-40 flex flex-col gap-3 md:hidden motion-safe:transition-opacity ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <ChannelLink
        channel="whatsapp"
        href={waLink(DEFAULT_WA_MESSAGE)}
        context="floating"
        aria-label="Message us on WhatsApp"
        className="flex size-13 h-[52px] w-[52px] items-center justify-center rounded-full border border-taupe bg-ivory text-[#1faa55] shadow-warm-lg"
      >
        <WhatsAppIcon size={24} />
      </ChannelLink>
      <ChannelLink
        channel="call"
        href={telLink()}
        context="floating"
        aria-label="Call us"
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-terracotta text-white shadow-warm-lg"
      >
        <PhoneIcon size={22} />
      </ChannelLink>
    </div>
  )
}
