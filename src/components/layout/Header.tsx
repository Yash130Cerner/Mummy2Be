import Link from 'next/link'

import { ChannelLink } from '@/components/contact/ChannelLink'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { SavedLink } from '@/components/layout/SavedLink'
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/icons'
import { BUSINESS, DEFAULT_WA_MESSAGE, NAV_LINKS, waLink } from '@/lib/constants'

/**
 * Sticky solid header: logo, nav, Contact button, Saved heart, WhatsApp.
 * Always solid ivory with a taupe hairline (the spec’s safe default).
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-taupe bg-ivory/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <Link href="/" className="shrink-0" aria-label="Mummy2Be - home">
          {/* Decorative: the link above carries the accessible name. */}
          <img src="/logo.png" alt="" width={287} height={165} className="h-11 w-auto md:h-14" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[15.5px] text-cocoa underline-offset-[6px] hover:underline hover:decoration-gold hover:decoration-2 motion-safe:transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 md:gap-2">
          <Link
            href="/contact"
            className="hidden min-h-[44px] items-center rounded-soft bg-terracotta px-5 py-2.5 text-[15px] font-medium text-white shadow-warm hover:bg-terracotta-dark motion-safe:transition-colors sm:inline-flex"
          >
            Contact
          </Link>
          <SavedLink />
          <ChannelLink
            channel="whatsapp"
            href={waLink(DEFAULT_WA_MESSAGE)}
            context="header"
            aria-label="Message us on WhatsApp"
            className="flex size-11 items-center justify-center rounded-soft text-[#1faa55] hover:bg-champagne motion-safe:transition-colors"
          >
            <WhatsAppIcon size={22} />
          </ChannelLink>
          {/* Follow link only - never an embedded feed, no Instagram scripts. */}
          <a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener"
            aria-label="Follow us on Instagram"
            className="flex min-h-[44px] items-center gap-1.5 rounded-soft px-2.5 text-cocoa hover:bg-champagne motion-safe:transition-colors"
          >
            <InstagramIcon size={21} />
            <span className="hidden text-[14.5px] xl:inline">Instagram</span>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
