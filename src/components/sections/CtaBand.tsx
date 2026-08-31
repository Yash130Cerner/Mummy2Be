import type { ReactNode } from 'react'

import { ButtonLink } from '@/components/ui/Button'

/** One clear action per band - never stacked competing CTAs. */
export function CtaBand({
  title,
  text,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  tone = 'champagne',
}: {
  title: string
  text?: ReactNode
  ctaLabel: string
  ctaHref: string
  secondaryLabel?: string
  secondaryHref?: string
  tone?: 'champagne' | 'blush' | 'cocoa'
}) {
  const tones = {
    champagne: 'bg-champagne',
    blush: 'bg-blush/50',
    cocoa: 'bg-cocoa text-ivory',
  }
  const subText = tone === 'cocoa' ? 'text-ivory/80' : 'text-cocoa-light'

  return (
    <section className={`${tones[tone]} rounded-soft-lg`}>
      <div className="flex flex-col items-center gap-5 px-6 py-12 text-center md:py-16">
        <h2 className="text-h2 max-w-xl">{title}</h2>
        {text ? <p className={`max-w-xl text-body-lg ${subText}`}>{text}</p> : null}
        <div className="mt-1 flex flex-col items-center gap-3 sm:flex-row">
          <ButtonLink
            href={ctaHref}
            variant={tone === 'cocoa' ? 'primary' : 'primary'}
            size="lg"
            className="w-full sm:w-auto"
          >
            {ctaLabel}
          </ButtonLink>
          {secondaryLabel && secondaryHref ? (
            <ButtonLink
              href={secondaryHref}
              variant="secondary"
              size="lg"
              className={`w-full sm:w-auto ${tone === 'cocoa' ? 'border-ivory text-ivory hover:bg-ivory/10' : ''}`}
            >
              {secondaryLabel}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </section>
  )
}
