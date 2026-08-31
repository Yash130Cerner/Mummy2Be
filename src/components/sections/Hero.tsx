import Image from 'next/image'

import type { Media } from '@/payload-types'

import { HeroArt } from '@/components/sections/HeroArt'
import { ButtonLink } from '@/components/ui/Button'
import { CheckIcon } from '@/components/ui/icons'
import { CTA, TRUST_MICROCOPY } from '@/lib/constants'
import { mediaAlt, mediaUrl } from '@/lib/media'

/**
 * Homepage hero. With a hero photo uploaded (CMS “home” page entry) it renders
 * full-bleed photography with a legibility scrim; until then, an editorial art
 * treatment carries the same message. Text is the LCP either way - fast.
 */
export function Hero({ image }: { image: Media | null }) {
  const imageUrl = mediaUrl(image)
  const hasPhoto = Boolean(imageUrl)

  return (
    <section className="relative overflow-hidden border-b border-taupe">
      <div className="absolute inset-0" aria-hidden>
        {hasPhoto && imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={mediaAlt(image, 'Expecting mom in a flowing maternity gown')}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cocoa/60 via-cocoa/30 to-transparent" />
          </>
        ) : (
          <HeroArt className="h-full w-full" />
        )}
      </div>

      <div className="container-page relative">
        <div className="flex min-h-[520px] max-w-2xl flex-col justify-center py-16 md:min-h-[620px] md:py-24">
          <p
            className={`text-caption uppercase tracking-[0.2em] ${
              hasPhoto ? 'text-ivory/90' : 'text-cocoa-light'
            }`}
          >
            Maternity gown rental in Ontario & across Canada
          </p>
          <h1 className={`text-display mt-4 ${hasPhoto ? 'text-ivory' : 'text-cocoa'}`}>
            Look and feel beautiful in the moments you’ll treasure forever.
          </h1>
          <p
            className={`text-body-lg mt-5 max-w-xl ${
              hasPhoto ? 'text-ivory/90' : 'text-cocoa-light'
            }`}
          >
            Premium maternity gowns for your photoshoot, baby shower, and every special bump
            moment - rented across Canada, personally confirmed.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/gowns" variant="primary" size="lg" className="w-full sm:w-auto">
              {CTA.browse}
            </ButtonLink>
            <ButtonLink
              href="/how-it-works"
              variant="secondary"
              size="lg"
              className={`w-full sm:w-auto ${
                hasPhoto ? 'border-ivory text-ivory hover:bg-ivory/10' : ''
              }`}
            >
              {CTA.howItWorks}
            </ButtonLink>
          </div>
          <ul
            className={`mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] ${
              hasPhoto ? 'text-ivory/85' : 'text-cocoa-light'
            }`}
          >
            {TRUST_MICROCOPY.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckIcon
                  size={14}
                  className={hasPhoto ? 'text-ivory/70' : 'text-sage-text'}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
