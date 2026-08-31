import type { Metadata } from 'next'

import { CollectionExplorer } from '@/components/product/CollectionExplorer'
import { CtaBand } from '@/components/sections/CtaBand'
import { JsonLd } from '@/components/ui/JsonLd'
import { toCardGown } from '@/lib/cardData'
import { HUB_INTRO } from '@/lib/categories'
import { COPY } from '@/lib/constants'
import { getGowns } from '@/lib/data'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const revalidate = 300

export const metadata: Metadata = pageMeta({
  title: 'Maternity Gown Rental - Browse Our Collection | Mummy2Be',
  description:
    'Browse our collection of maternity gowns for rent - Western and South Asian styles, one size to fit every bump, professionally cleaned and delivered across Canada.',
  path: '/gowns',
})

export default async function GownsHubPage() {
  const gowns = await getGowns()
  const cards = gowns.map(toCardGown)

  return (
    <>
      <JsonLd
        data={collectionPageSchema(
          'Our maternity gown collection',
          'Maternity gowns for rent - Western and South Asian styles, one size to fit every bump.',
          '/gowns',
          gowns,
        )}
      />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Gowns', path: '/gowns' }])} />

      <div className="container-page pt-10 md:pt-16">
        <h1 className="text-display max-w-2xl">Our maternity gown collection</h1>
        <p className="mt-4 max-w-2xl text-body-lg text-cocoa-light">{HUB_INTRO}</p>

        <p className="mt-8 rounded-soft border border-sage/40 bg-sage/10 px-4 py-3 text-center text-[14.5px] text-sage-text">
          {COPY.oneSizeBanner}
        </p>

        <div className="mt-8">
          <CollectionExplorer gowns={cards} />
        </div>

        <div className="mt-16 md:mt-24">
          <CtaBand
            title="Overwhelmed by beautiful options?"
            text="Four quick questions and we’ll shortlist gowns for your moment - or message us and a real person will help you choose."
            ctaLabel="Find My Gown"
            ctaHref="/find-my-gown"
            secondaryLabel="Contact Us"
            secondaryHref="/contact"
            tone="blush"
          />
        </div>
      </div>
    </>
  )
}
