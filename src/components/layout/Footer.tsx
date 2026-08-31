import Link from 'next/link'

import { ChannelLink } from '@/components/contact/ChannelLink'
import { CheckIcon, InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'
import {
  BUSINESS,
  DEFAULT_WA_MESSAGE,
  FOOTER_COLUMNS,
  TRUST_MICROCOPY,
  mailtoLink,
  telLink,
  waLink,
} from '@/lib/constants'

/**
 * Trust reinforcement on every page: full navigation, legal, real contact
 * details (no street address - service-area business) and the trust microcopy.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-taupe bg-champagne md:mt-24">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 md:py-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-serif text-[24px]">
            Mummy2Be
            <span aria-hidden className="ml-1 inline-block size-1.5 rounded-full bg-gold align-middle" />
          </p>
          <p className="mt-3 max-w-sm text-[15px] text-cocoa-light">
            Premium maternity gown rentals for photoshoots, baby showers, and every special bump
            moment - personally confirmed, delivered across Canada.
          </p>
          <ul className="mt-5 space-y-2.5 text-[15px]">
            <li>
              <ChannelLink
                channel="call"
                href={telLink()}
                context="footer"
                className="inline-flex min-h-[44px] items-center gap-2.5 hover:text-terracotta-dark"
              >
                <PhoneIcon size={17} className="text-sage-text" /> {BUSINESS.phoneDisplay}
              </ChannelLink>
            </li>
            <li>
              <ChannelLink
                channel="whatsapp"
                href={waLink(DEFAULT_WA_MESSAGE)}
                context="footer"
                className="inline-flex min-h-[44px] items-center gap-2.5 hover:text-terracotta-dark"
              >
                <WhatsAppIcon size={17} className="text-sage-text" /> WhatsApp us
              </ChannelLink>
            </li>
            <li>
              <ChannelLink
                channel="email"
                href={mailtoLink('Gown rental inquiry')}
                context="footer"
                className="inline-flex min-h-[44px] items-center gap-2.5 break-all hover:text-terracotta-dark"
              >
                <MailIcon size={17} className="text-sage-text" /> {BUSINESS.email}
              </ChannelLink>
            </li>
          </ul>
          <p className="mt-4 text-[14px] text-cocoa-light">
            {BUSINESS.baseArea}, {BUSINESS.serves.toLowerCase()}
            <br />
            {BUSINESS.hoursNote}
          </p>
          {/* Follow link only - never an embedded feed, no Instagram scripts. */}
          <p className="mt-4">
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Follow us on Instagram"
              className="inline-flex min-h-[44px] items-center gap-2.5 text-[15px] hover:text-terracotta-dark"
            >
              <InstagramIcon size={17} className="text-sage-text" />
              Follow us on Instagram
            </a>
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.heading} aria-label={`Footer - ${column.heading}`}>
            <h2 className="font-sans text-caption uppercase tracking-[0.16em] text-cocoa-light">
              {column.heading}
            </h2>
            <ul className="mt-4 space-y-1">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[38px] items-center text-[15px] hover:text-terracotta-dark motion-safe:transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-taupe">
        <div className="container-page flex flex-col items-center gap-2 py-6 text-center text-[13.5px] text-cocoa-light md:flex-row md:justify-between md:text-left">
          <p>© {year} Mummy2Be. All rights reserved.</p>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 md:justify-end">
            {TRUST_MICROCOPY.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckIcon size={13} className="text-sage-text" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
