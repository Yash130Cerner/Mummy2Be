'use client'

import Image from 'next/image'
import Link from 'next/link'

import { GownArtBlock } from '@/components/product/GownArtBlock'
import { WishlistHeart } from '@/components/product/WishlistHeart'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import type { CardGown } from '@/lib/cardData'
import { cardPrice } from '@/lib/format'

/**
 * Product card: uniform 3:4 image, availability badge, name, transparent
 * pricing, wishlist heart. Hover reveals the second image (motion-safe).
 */
export function GownCard({ gown, priority = false }: { gown: CardGown; priority?: boolean }) {
  return (
    <article className="group relative">
      <Link
        href={`/gowns/${gown.slug}`}
        className="block overflow-hidden rounded-soft-lg bg-champagne shadow-warm motion-safe:transition-shadow hover:shadow-warm-lg"
        aria-label={`${gown.name} - view gown`}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          {gown.image ? (
            <>
              <Image
                src={gown.image.url}
                alt={gown.image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={priority}
                className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.03]"
              />
              {gown.hoverImage ? (
                <Image
                  src={gown.hoverImage.url}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover opacity-0 motion-safe:transition-opacity motion-safe:duration-300 group-hover:opacity-100"
                />
              ) : null}
            </>
          ) : (
            <GownArtBlock
              slug={gown.slug}
              colorFamily={gown.colorFamily}
              name={gown.name}
              colorPrimary={gown.colorPrimary}
            />
          )}
          <AvailabilityBadge
            status={gown.availabilityStatus}
            className="absolute left-3 top-3"
          />
        </div>
        <div className="px-4 pb-5 pt-4">
          <h3 className="font-serif text-[19px] leading-snug md:text-[20px]">{gown.name}</h3>
          <p className="mt-1 line-clamp-1 text-[13.5px] text-cocoa-light">{gown.shortDescription}</p>
          <p className="price mt-2.5 text-[14.5px]">{cardPrice(gown.price5, gown.price10)}</p>
        </div>
      </Link>
      <WishlistHeart slug={gown.slug} name={gown.name} className="absolute right-3 top-3" />
    </article>
  )
}
