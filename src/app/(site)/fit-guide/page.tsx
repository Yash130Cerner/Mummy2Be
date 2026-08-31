import type { Metadata } from 'next'
import Image from 'next/image'

import { CtaBand } from '@/components/sections/CtaBand'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { asMedia, getRealMoms } from '@/lib/data'
import { mediaAlt, mediaUrl } from '@/lib/media'
import { breadcrumbSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const revalidate = 300

export const metadata: Metadata = pageMeta({
  title: 'Do Maternity Gowns Fit Everyone? Our One-Size Fit Guide | Mummy2Be',
  description:
    'Our maternity gowns are one size and beautifully stretchable - designed to fit and flatter every bump, at every stage. Here’s how the fit works and what to expect.',
  path: '/fit-guide',
})

export default async function FitGuidePage() {
  const realMoms = await getRealMoms()

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Fit Guide', path: '/fit-guide' }])}
      />

      <div className="container-page pt-10 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-display">Made to fit every bump.</h1>
          <p className="mt-4 text-body-lg text-cocoa-light">
            You don’t need to guess a size. Every Mummy2Be gown is one size and made from soft,
            stretchable fabric that flatters your bump from your earliest shoot right through to
            your due date - comfortably, and beautifully on camera. If you’d still like
            reassurance, message us and we’ll happily help.
          </p>
        </div>

        {/* How the stretch works */}
        <section aria-labelledby="stretch-heading" className="mx-auto mt-16 max-w-3xl md:mt-24">
          <SectionHeading id="stretch-heading" eyebrow="No size charts here" title="One size, made to flatter every stage" />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Fabric that moves with you',
                text: 'Soft stretch knits, laces and tulles are cut to expand gracefully - hugging where it flatters and flowing where it should.',
              },
              {
                title: 'Designed around the bump',
                text: 'Empire waists, wrap silhouettes and gathered skirts are shaped for pregnancy first - not adapted from regular dresses.',
              },
              {
                title: 'Early bump to due date',
                text: 'The same gown flatters at 20 weeks and at 40 - which is why photographers love working with our one-size fit.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-soft-lg bg-champagne p-6">
                <h3 className="font-sans text-[16px] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[14.5px] text-cocoa-light">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to expect */}
        <section aria-labelledby="expect-heading" className="mx-auto mt-16 max-w-3xl md:mt-24">
          <SectionHeading id="expect-heading" eyebrow="On the day" title="What to expect wearing it" />
          <ul className="space-y-4">
            {[
              'Comfortable for a full shoot - the stretch means nothing pinches, digs, or restricts.',
              'Easy to move in: sit, walk, twirl, and pose freely. The drape settles beautifully after every movement.',
              'Fitted styles gently sculpt; flowing styles float - both stretch to your bump, so pick the look you love rather than a size.',
              'Wondering about height, bust or anything specific? Message us - we know each gown intimately and will tell you honestly what will flatter.',
            ].map((line) => (
              <li key={line} className="flex gap-3 text-[15.5px] text-cocoa-light">
                <span aria-hidden className="mt-2 inline-block size-2 shrink-0 rounded-full bg-sage" />
                {line}
              </li>
            ))}
          </ul>
        </section>

        {/* Real moms, when available */}
        {realMoms.length > 0 ? (
          <section aria-labelledby="fit-real-moms" className="mx-auto mt-16 max-w-4xl md:mt-24">
            <SectionHeading id="fit-real-moms"
              eyebrow="See it on real moms"
              title="Every stage, every body - beautifully"
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {realMoms.slice(0, 4).map((mom) => {
                const photo = asMedia(mom.photo)
                const url = mediaUrl(photo, 'card')
                if (!url) return null
                return (
                  <figure key={mom.id}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-soft-lg shadow-warm">
                      <Image
                        src={url}
                        alt={mediaAlt(photo, `${mom.name} in a Mummy2Be gown`)}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 text-[13.5px] text-cocoa-light">
                      {mom.name}
                      {mom.weeks ? `, ${mom.weeks}` : ''}
                    </figcaption>
                  </figure>
                )
              })}
            </div>
          </section>
        ) : null}

        <div className="mx-auto mt-16 max-w-3xl md:mt-24">
          <CtaBand
            title="Still unsure? Let’s talk it through."
            text="Tell us your stage and your moment - we’ll suggest gowns that will love your bump back."
            ctaLabel="Find My Gown"
            ctaHref="/find-my-gown"
            secondaryLabel="Browse Gowns"
            secondaryHref="/gowns"
            tone="blush"
          />
        </div>
      </div>
    </>
  )
}
