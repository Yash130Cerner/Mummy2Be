'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

import { track } from '@/lib/analytics'

/**
 * Performance-first video: renders only the (lazy-loaded) poster frame until
 * the visitor explicitly taps play - zero video bytes are fetched before
 * that. Playback is user-initiated, so it may start with sound (“sound on
 * play”); if the browser refuses unmuted playback, we retry muted and the
 * native controls let her unmute. Never autoplays, which also satisfies
 * prefers-reduced-motion. Fixed aspect container = zero layout shift.
 */
export function LazyVideo({
  src,
  poster,
  label,
  aspectClass = 'aspect-[3/4]',
  className = '',
  trackContext,
}: {
  src: string
  poster?: { url: string; alt: string } | null
  label: string
  /** Tailwind aspect-ratio class for the reserved box, e.g. 'aspect-[9/16]'. */
  aspectClass?: string
  className?: string
  trackContext?: string
}) {
  const [activated, setActivated] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const activate = () => {
    setActivated(true)
    track('video_play', { video: label, context: trackContext ?? 'site' })
  }

  return (
    <div className={`relative overflow-hidden bg-cocoa ${aspectClass} ${className}`}>
      {activated ? (
        <video
          ref={(el) => {
            videoRef.current = el
            if (el) {
              // User-initiated: sound allowed. If the browser still refuses,
              // fall back to muted playback - controls allow unmuting.
              el.play().catch(() => {
                el.muted = true
                el.play().catch(() => {
                  /* She can press the native play control. */
                })
              })
            }
          }}
          controls
          playsInline
          preload="metadata"
          poster={poster?.url}
          // contain (not cover) so the full frame is visible during playback,
          // letterboxed on the warm dark background when ratios differ.
          className="h-full w-full object-contain"
          aria-label={label}
        >
          <source src={src} />
          Your browser can’t play this video - message us and we’ll send it directly.
        </video>
      ) : (
        <button
          type="button"
          onClick={activate}
          aria-label={`Play video - ${label}`}
          className="group/play absolute inset-0 h-full w-full text-left"
        >
          {poster ? (
            <Image
              src={poster.url}
              alt={poster.alt}
              fill
              sizes="(max-width: 768px) 60vw, 320px"
              className="object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="absolute inset-0 flex items-end bg-gradient-to-br from-cocoa to-cocoa-light p-4"
            >
              <span className="font-serif text-[15px] italic text-ivory/85">{label}</span>
            </span>
          )}
          {/* Play affordance */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center bg-cocoa/10 motion-safe:transition-colors group-hover/play:bg-cocoa/20"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-ivory/95 shadow-warm-lg motion-safe:transition-transform group-hover/play:scale-105">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#37291F" aria-hidden>
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
