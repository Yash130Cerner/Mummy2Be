import Image from 'next/image'

import type { Testimonial } from '@/payload-types'

import { asMedia } from '@/lib/data'
import { mediaAlt, mediaUrl } from '@/lib/media'

/**
 * Real reviews from real moms - renders nothing when no testimonials exist
 * yet (never an empty shell, never fabricated reviews).
 */
export function TestimonialCards({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {testimonials.slice(0, 3).map((t) => {
        const photo = asMedia(t.photo)
        const photoUrl = mediaUrl(photo, 'card')
        return (
          <figure
            key={t.id}
            className="flex flex-col justify-between rounded-soft-lg bg-champagne p-6 shadow-warm"
          >
            <blockquote className="text-[15.5px] leading-relaxed">
              <span aria-hidden className="font-serif text-[28px] leading-none text-gold">
                “
              </span>
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={mediaAlt(photo, `${t.name}'s photo`)}
                  width={44}
                  height={44}
                  className="size-11 rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex size-11 items-center justify-center rounded-full bg-blush font-serif text-[18px] text-cocoa"
                >
                  {t.name.charAt(0)}
                </span>
              )}
              <span>
                <span className="block font-semibold">{t.name}</span>
                {t.context ? (
                  <span className="block text-[13px] text-cocoa-light">{t.context}</span>
                ) : null}
              </span>
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}
