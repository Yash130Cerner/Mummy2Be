import Link from 'next/link'

import type { Gown } from '@/payload-types'

import { LazyVideo } from '@/components/media/LazyVideo'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowRightIcon } from '@/components/ui/icons'
import { gownVideo } from '@/lib/data'

/**
 * “See them in motion” - short clips of the gowns that have movement video,
 * each linking to its gown page. Auto-populates from whichever gowns have a
 * video uploaded; renders nothing while there are none. Clips show only
 * their poster frame until tapped (no video bytes load before that).
 */
export function MotionStrip({ gowns }: { gowns: Gown[] }) {
  const clips = gowns
    .map((gown) => ({ gown, video: gownVideo(gown) }))
    .filter((c): c is { gown: Gown; video: NonNullable<ReturnType<typeof gownVideo>> } =>
      Boolean(c.video),
    )
    .slice(0, 4)

  if (clips.length === 0) return null

  return (
    <section aria-labelledby="motion-heading" className="container-page py-16 md:py-24">
      <SectionHeading id="motion-heading"
        eyebrow="Movement sells the moment"
        title="See them in motion"
        intro="Stills show the gown - movement shows how it will feel. Tap a clip to watch, then see the full gallery on its page."
      />
      <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:gap-6 md:overflow-visible md:px-0 md:[grid-template-columns:repeat(auto-fit,minmax(0,1fr))]">
        {clips.map(({ gown, video }) => (
          <div key={gown.slug} className="w-[68vw] max-w-[260px] shrink-0 snap-start md:w-auto md:max-w-none">
            <LazyVideo
              src={video.url}
              poster={video.poster}
              label={`${gown.name} - gown in motion`}
              aspectClass="aspect-[3/4]"
              className="rounded-soft-lg shadow-warm"
              trackContext="home-motion-strip"
            />
            <Link
              href={`/gowns/${gown.slug}`}
              className="group mt-3 block"
              aria-label={`View the ${gown.name}`}
            >
              <span className="font-serif text-[18px] leading-snug group-hover:text-terracotta-dark motion-safe:transition-colors">
                {gown.name}
              </span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[13.5px] font-medium text-cocoa-light group-hover:text-cocoa">
                View this gown
                <ArrowRightIcon
                  size={14}
                  className="motion-safe:transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
