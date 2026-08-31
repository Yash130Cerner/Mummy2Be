'use client'

import { HeartIcon } from '@/components/ui/icons'
import { useWishlist } from '@/lib/wishlist'

/** Heart toggle - saves a gown to the localStorage wishlist. */
export function WishlistHeart({
  slug,
  name,
  className = '',
}: {
  slug: string
  name: string
  className?: string
}) {
  const { has, toggle } = useWishlist()
  const saved = has(slug)

  return (
    <button
      type="button"
      aria-label={saved ? `Remove ${name} from saved gowns` : `Save ${name}`}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(slug, name)
      }}
      className={`flex size-11 items-center justify-center rounded-full bg-ivory/90 shadow-warm hover:bg-ivory motion-safe:transition-transform motion-safe:active:scale-90 ${className}`}
    >
      <HeartIcon
        size={20}
        filled={saved}
        className={saved ? 'text-terracotta' : 'text-cocoa-light'}
      />
    </button>
  )
}
