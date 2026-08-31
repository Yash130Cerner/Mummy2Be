'use client'

import { useEffect, useState } from 'react'

import { GownCard } from '@/components/product/GownCard'
import { ButtonLink } from '@/components/ui/Button'
import type { CardGown } from '@/lib/cardData'
import { useWishlist } from '@/lib/wishlist'

/**
 * Saved gowns - reads the browser wishlist, shows the cards, and offers the
 * multi-gown inquiry (“ask about my saved gowns”). No account, no cart.
 */
export function SavedContent() {
  const { saved } = useWishlist()
  const [gowns, setGowns] = useState<CardGown[] | null>(null)

  useEffect(() => {
    let cancelled = false
    if (saved.length === 0) {
      setGowns([])
      return
    }
    fetch(`/api/wishlist?slugs=${encodeURIComponent(saved.join(','))}`)
      .then((r) => r.json())
      .then((data: { gowns: CardGown[] }) => {
        if (!cancelled) setGowns(data.gowns ?? [])
      })
      .catch(() => {
        if (!cancelled) setGowns([])
      })
    return () => {
      cancelled = true
    }
  }, [saved])

  if (saved.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-soft-lg bg-champagne p-8 text-center md:p-12">
        <h2 className="text-h3">You haven’t saved any gowns yet</h2>
        <p className="mt-3 text-[15.5px] text-cocoa-light">
          Tap the heart on any gown to keep it here while you decide - then ask about all your
          favourites in one message.
        </p>
        <ButtonLink href="/gowns" variant="primary" size="md" className="mt-6">
          Browse Gowns
        </ButtonLink>
      </div>
    )
  }

  if (gowns === null) {
    // Skeletons while the saved gowns load.
    return (
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4" aria-hidden>
        {saved.slice(0, 4).map((slug) => (
          <div key={slug} className="overflow-hidden rounded-soft-lg bg-champagne shadow-warm">
            <div className="aspect-[3/4] motion-safe:animate-pulse bg-taupe/50" />
            <div className="space-y-2 px-4 py-5">
              <div className="h-4 w-2/3 rounded bg-taupe/50 motion-safe:animate-pulse" />
              <div className="h-3 w-1/2 rounded bg-taupe/40 motion-safe:animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {gowns.map((gown) => (
          <GownCard key={gown.slug} gown={gown} />
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-xl rounded-soft-lg bg-champagne p-6 text-center md:p-8">
        <h2 className="text-h3">Love more than one?</h2>
        <p className="mt-2 text-[15px] text-cocoa-light">
          Send one request for all your saved gowns - we’ll check availability for your dates and
          help you choose between them. No payment is taken online.
        </p>
        <ButtonLink
          href={`/rental-request?gowns=${encodeURIComponent(gowns.map((g) => g.slug).join(','))}`}
          variant="primary"
          size="lg"
          className="mt-5"
        >
          Ask about my saved gowns
        </ButtonLink>
      </div>
    </div>
  )
}
