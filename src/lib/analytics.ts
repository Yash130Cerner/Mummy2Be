'use client'

/**
 * GA4 event helper. The conversion of this site is contact - the starred
 * events are marked as conversions inside GA4 (see SETUP.md):
 * reserve_click★, ask_click★, inquiry_form_submit★, whatsapp_click★,
 * call_click★, email_click★.
 */

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function track(eventName: string, params?: EventParams): void {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  window.gtag('event', eventName, params ?? {})
}
