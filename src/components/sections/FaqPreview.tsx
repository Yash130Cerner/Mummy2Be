import Link from 'next/link'

import type { Faq } from '@/payload-types'

import { AccordionItem } from '@/components/ui/Accordion'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** Homepage FAQ preview - the top questions, then a path to the full FAQ. */
export function FaqPreview({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null

  return (
    <section aria-labelledby="faq-preview-heading" className="container-page py-16 md:py-24">
      <SectionHeading id="faq-preview-heading" eyebrow="Good to know" title="Questions? We’ve got answers." />
      <div className="mx-auto max-w-2xl border-t border-taupe">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} title={faq.question}>
            <p>{faq.answer}</p>
          </AccordionItem>
        ))}
      </div>
      <p className="mt-8 text-center">
        <Link
          href="/faq"
          className="text-[15.5px] font-medium underline underline-offset-4 hover:decoration-gold hover:decoration-2"
        >
          Read all questions & answers
        </Link>
      </p>
    </section>
  )
}
