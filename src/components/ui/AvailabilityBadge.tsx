import { AVAILABILITY, type AvailabilityStatus } from '@/lib/constants'

const DOT: Record<AvailabilityStatus, string> = {
  available: 'bg-avail-green',
  limited: 'bg-avail-amber',
  on_rental: 'bg-avail-grey',
  contact_to_confirm: 'bg-cocoa-light',
}

/**
 * The honest, at-a-glance availability pill. A manually-set status - never a
 * calendar. “On rental” and “Contact to confirm” always route to contact.
 */
export function AvailabilityBadge({
  status,
  className = '',
}: {
  status: AvailabilityStatus
  className?: string
}) {
  const config = AVAILABILITY[status] ?? AVAILABILITY.contact_to_confirm
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-soft-sm bg-ivory/95 px-2.5 py-1 text-caption text-cocoa shadow-warm ${className}`}
    >
      <span aria-hidden className={`size-2 rounded-full ${DOT[status] ?? DOT.contact_to_confirm}`} />
      {config.label}
    </span>
  )
}
