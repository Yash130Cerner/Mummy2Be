import type { ReactNode } from 'react'

/** Section header with the small gold flourish - decorative discipline only. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = 'center',
}: {
  /** Set this to the id its <section aria-labelledby> points at, so the section has an accessible name. */
  id?: string
  eyebrow?: string
  title: string
  intro?: ReactNode
  align?: 'center' | 'left'
}) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <div className={`flex flex-col gap-3 ${alignClass} mb-10 md:mb-14`}>
      {eyebrow ? (
        <p className="text-caption uppercase tracking-[0.18em] text-cocoa-light">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="text-h2 max-w-2xl">
        {title}
      </h2>
      <span className="gold-rule" aria-hidden />
      {intro ? <p className="max-w-2xl text-body-lg text-cocoa-light">{intro}</p> : null}
    </div>
  )
}
