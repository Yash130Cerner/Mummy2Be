'use client'

import Link from 'next/link'

import { HeartIcon } from '@/components/ui/icons'
import { useWishlist } from '@/lib/wishlist'

/** Header heart - links to /saved and shows a live count of saved gowns. */
export function SavedLink() {
  const { saved } = useWishlist()
  const count = saved.length

  return (
    <Link
      href="/saved"
      aria-label={count > 0 ? `Saved gowns (${count})` : 'Saved gowns'}
      className="relative flex size-11 items-center justify-center rounded-soft text-cocoa hover:bg-champagne motion-safe:transition-colors"
    >
      <HeartIcon size={21} filled={count > 0} className={count > 0 ? 'text-terracotta' : ''} />
      {count > 0 ? (
        <span
          aria-hidden
          className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-semibold leading-none text-white"
        >
          {count > 9 ? '9+' : count}
        </span>
      ) : null}
    </Link>
  )
}
