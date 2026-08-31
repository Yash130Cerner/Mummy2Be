import type { Metadata } from 'next'

import { QuizFlow } from '@/components/quiz/QuizFlow'
import { JsonLd } from '@/components/ui/JsonLd'
import { toCardGown } from '@/lib/cardData'
import { getGowns } from '@/lib/data'
import { breadcrumbSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const revalidate = 300

export const metadata: Metadata = pageMeta({
  title: 'Find Your Maternity Gown - Style Help | Mummy2Be',
  description:
    'Not sure which maternity gown to choose? Answer a few quick questions and we’ll suggest gowns you’ll love - or message us and we’ll help you decide.',
  path: '/find-my-gown',
})

export default async function FindMyGownPage() {
  const gowns = await getGowns()
  const cards = gowns.map(toCardGown)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Find My Gown', path: '/find-my-gown' },
        ])}
      />

      <div className="container-page pt-10 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-display">Let’s find your gown</h1>
          <p className="mt-4 text-body-lg text-cocoa-light">
            Overwhelmed by beautiful options? That’s the best kind of problem - and we can solve
            it in under a minute.
          </p>
        </div>

        <div className="mt-10 md:mt-14">
          <QuizFlow gowns={cards} />
        </div>
      </div>
    </>
  )
}
