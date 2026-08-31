'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { LazyVideo } from '@/components/media/LazyVideo'
import { GownArtBlock } from '@/components/product/GownArtBlock'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/icons'

export type GalleryItem =
  | { type: 'image'; url: string; alt: string }
  | { type: 'video'; url: string; alt: string; poster?: string | null }

/**
 * Gown gallery: swipeable scroll-snap carousel (native touch), arrows and
 * thumbnails on desktop, movement video inline with controls - never
 * autoplayed with sound. Falls back to the art treatment when no media exists.
 */
export function Gallery({
  items,
  gownName,
  slug,
  colorFamily,
  colorPrimary,
}: {
  items: GalleryItem[]
  gownName: string
  slug: string
  colorFamily: string
  colorPrimary: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth)
      setIndex(Math.max(0, Math.min(items.length - 1, i)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [items.length])

  const goTo = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(items.length - 1, i))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: clamped * el.clientWidth, behavior: reduced ? 'auto' : 'smooth' })
  }

  if (items.length === 0) {
    return (
      <div className="overflow-hidden rounded-soft-lg shadow-warm">
        <div className="aspect-[3/4] w-full">
          <GownArtBlock
            slug={slug}
            colorFamily={colorFamily}
            name={gownName}
            colorPrimary={colorPrimary}
          />
        </div>
        <p className="bg-champagne px-4 py-3 text-center text-[13.5px] text-cocoa-light">
          Photos of this gown are on their way - message us and we’ll happily send them today.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="group relative overflow-hidden rounded-soft-lg bg-champagne shadow-warm">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          aria-label={`${gownName} - photo gallery`}
        >
          {items.map((item, i) => (
            <div key={i} className="relative aspect-[3/4] w-full shrink-0 snap-center">
              {item.type === 'image' ? (
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                  className="object-cover"
                />
              ) : (
                <LazyVideo
                  src={item.url}
                  poster={item.poster ? { url: item.poster, alt: '' } : null}
                  label={item.alt}
                  aspectClass="h-full w-full"
                  trackContext="gallery"
                />
              )}
            </div>
          ))}
        </div>

        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous photo"
              disabled={index === 0}
              className="absolute left-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 text-cocoa shadow-warm hover:bg-ivory disabled:opacity-40 md:flex"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next photo"
              disabled={index === items.length - 1}
              className="absolute right-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 text-cocoa shadow-warm hover:bg-ivory disabled:opacity-40 md:flex"
            >
              <ChevronRightIcon size={20} />
            </button>
            <div
              className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5"
              role="tablist"
              aria-label="Gallery position"
            >
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to item ${i + 1} of ${items.length}`}
                  onClick={() => goTo(i)}
                  className={`size-2.5 rounded-full border border-ivory/70 ${
                    i === index ? 'bg-ivory' : 'bg-ivory/30'
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {items.length > 1 ? (
        <div className="mt-3 hidden gap-2.5 md:flex">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show item ${i + 1}`}
              aria-current={i === index}
              className={`relative aspect-[3/4] w-16 overflow-hidden rounded-soft-sm border-2 lg:w-20 ${
                i === index ? 'border-terracotta' : 'border-transparent hover:border-taupe'
              }`}
            >
              {item.type === 'image' ? (
                <Image src={item.url} alt="" fill sizes="80px" className="object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-cocoa text-[10px] font-semibold uppercase tracking-wide text-ivory">
                  Video
                </span>
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
