import { gownArt } from '@/lib/gownArt'

/**
 * Editorial stand-in shown wherever a gown has no photograph yet - a soft
 * wash in the gown’s own colour with its name set in serif italic. Looks
 * intentional rather than broken, and disappears as photos are uploaded.
 */
export function GownArtBlock({
  slug,
  colorFamily,
  name,
  colorPrimary,
  className = '',
}: {
  slug: string
  colorFamily: string
  name: string
  colorPrimary?: string
  className?: string
}) {
  const art = gownArt({ slug, colorFamily: colorFamily as never })
  const text = art.dark ? 'rgba(250,246,239,0.95)' : 'rgba(55,41,31,0.85)'
  const subtle = art.dark ? 'rgba(250,246,239,0.65)' : 'rgba(55,41,31,0.55)'

  return (
    <div
      aria-hidden
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(155deg, ${art.from} 0%, ${art.to} 100%)` }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 60% at 70% 20%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)',
        }}
      />
      <div className="relative px-6 text-center">
        <p className="font-serif text-[22px] italic leading-tight md:text-[26px]" style={{ color: text }}>
          {name}
        </p>
        {colorPrimary ? (
          <p
            className="mt-2 text-[11px] font-medium uppercase tracking-[0.22em]"
            style={{ color: subtle }}
          >
            {colorPrimary}
          </p>
        ) : null}
      </div>
    </div>
  )
}
