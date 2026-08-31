import type { Metadata } from 'next'

import { ButtonLink } from '@/components/ui/Button'
import { RichTextContent } from '@/components/ui/RichTextContent'
import { getPageContent } from '@/lib/data'
import { pageMeta } from '@/lib/seo'

export const revalidate = 300

// Reference page - deliberately noindexed.
export const metadata: Metadata = pageMeta({
  title: 'Rental Terms & Deposit Policy | Mummy2Be',
  description:
    'Mummy2Be’s rental terms in plain language - rental periods, the $100 refundable deposit, condition and care, shipping and returns.',
  path: '/rental-terms',
  noindex: true,
})

export default async function RentalTermsPage() {
  const page = await getPageContent('rental-terms')

  return (
    <div className="container-page pt-10 md:pt-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-display">Rental terms, in plain language</h1>
        <p className="mt-4 text-body-lg text-cocoa-light">
          Please read these before reserving - submitting a rental request means you agree to
          them. Questions about anything here? We’re happy to talk it through first.
        </p>

        <article className="mt-10">
          <RichTextContent data={page?.body} className="text-[15.5px]" />
        </article>

        <div className="mt-12 rounded-soft-lg bg-champagne p-6 text-center">
          <h2 className="text-h3">Anything unclear?</h2>
          <p className="mt-2 text-[15px] text-cocoa-light">
            We’d rather answer twice than have you wonder once.
          </p>
          <ButtonLink href="/contact" variant="primary" size="md" className="mt-4">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
