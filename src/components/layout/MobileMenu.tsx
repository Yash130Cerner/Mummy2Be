'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { ChannelLink } from '@/components/contact/ChannelLink'
import { CloseIcon, InstagramIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/icons'
import { BUSINESS, DEFAULT_WA_MESSAGE, NAV_LINKS, telLink, waLink } from '@/lib/constants'

/**
 * Slide-in navigation panel on a native <dialog> (focus is trapped and
 * restored automatically; ESC closes). Contact, WhatsApp and Saved stay in
 * the header bar - the menu is for navigation, not the only route to contact.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDialogElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // Close when navigation happens.
  useEffect(() => {
    setOpen(false)
    document.body.style.overflow = ''
  }, [pathname])

  const close = () => {
    document.body.style.overflow = ''
    setOpen(false)
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex size-11 items-center justify-center rounded-soft text-cocoa hover:bg-champagne"
      >
        <MenuIcon size={22} />
      </button>

      <dialog
        ref={ref}
        onClose={close}
        onClick={(e) => {
          if (e.target === ref.current) close()
        }}
        aria-label="Menu"
        className="sheet m-0 ml-auto h-dvh max-h-dvh w-[min(20rem,85vw)] max-w-full bg-ivory"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-taupe px-5 py-4">
            <img src="/logo.png" alt="Mummy2Be" width={287} height={165} className="h-8 w-auto" />
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex size-11 items-center justify-center rounded-soft text-cocoa-light hover:bg-champagne"
            >
              <CloseIcon size={22} />
            </button>
          </div>

          <nav aria-label="Main menu" className="flex-1 overflow-y-auto px-3 py-4">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-soft px-3 py-3.5 text-[17px] min-h-[48px] hover:bg-champagne ${
                      pathname === link.href ? 'font-semibold text-terracotta-dark' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/find-my-gown"
                  className="block rounded-soft px-3 py-3.5 text-[17px] min-h-[48px] hover:bg-champagne"
                >
                  Find My Gown
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block rounded-soft px-3 py-3.5 text-[17px] min-h-[48px] hover:bg-champagne"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="border-t border-taupe px-5 py-5">
            <p className="text-caption uppercase tracking-[0.14em] text-cocoa-light">
              Same-day reply
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              <ChannelLink
                channel="whatsapp"
                href={waLink(DEFAULT_WA_MESSAGE)}
                context="mobile-menu"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-soft bg-terracotta px-5 py-3 font-medium text-white hover:bg-terracotta-dark"
              >
                <WhatsAppIcon size={18} /> Message on WhatsApp
              </ChannelLink>
              <ChannelLink
                channel="call"
                href={telLink()}
                context="mobile-menu"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-soft border border-cocoa px-5 py-3 font-medium text-cocoa hover:bg-champagne"
              >
                <PhoneIcon size={18} /> Call {BUSINESS.phoneDisplay}
              </ChannelLink>
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Follow us on Instagram"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-soft px-5 py-3 text-[15px] text-cocoa-light hover:bg-champagne hover:text-cocoa"
              >
                <InstagramIcon size={18} /> Follow us on Instagram
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  )
}
