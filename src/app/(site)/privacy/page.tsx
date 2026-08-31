import type { Metadata } from 'next'
import Link from 'next/link'

import { BUSINESS } from '@/lib/constants'
import { pageMeta } from '@/lib/seo'

export const revalidate = 3600

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy | Mummy2Be',
  description:
    'How Mummy2Be handles your information: what we collect through inquiries, how we use it to arrange your rental, and how to reach us about it.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <div className="container-page pt-10 md:pt-16">
      <div className="prose-m2b mx-auto max-w-2xl text-[15.5px] leading-relaxed text-cocoa-light">
        <h1 className="text-display text-cocoa">Privacy, in plain language</h1>
        <p>
          Mummy2Be is a small Ontario business, and we treat your information the way we’d want
          ours treated. Here’s exactly what we collect and why.
        </p>

        <h2 className="text-cocoa">What we collect</h2>
        <p>
          When you send an inquiry or rental request, we collect what you type into the form: your
          name, phone number, email, city and province, your preferred contact method, the gown(s)
          and dates you’re interested in, and any message you include. If you save gowns with the
          heart button, that list is stored only in your own browser - it never reaches us.
        </p>

        <h2 className="text-cocoa">How we use it</h2>
        <p>
          For one purpose: arranging your rental. We use your details to confirm availability,
          agree on dates and totals, ship your gown, and return your deposit. We send you a
          confirmation email when you submit a request. We don’t run marketing lists, and we never
          sell or share your information with anyone except the services that make the site work
          (our website host, database, and email provider).
        </p>

        <h2 className="text-cocoa">Analytics</h2>
        <p>
          We use Google Analytics to understand how the site is used (which pages are visited,
          which buttons are tapped) so we can improve it. This data is aggregated and doesn’t
          include what you type into forms.
        </p>

        <h2 className="text-cocoa">Photos</h2>
        <p>
          Customer photos appear on the site only with the customer’s explicit permission - and
          you can withdraw that permission at any time with a single message.
        </p>

        <h2 className="text-cocoa">Your choices</h2>
        <p>
          Want to see, correct, or delete the information we hold from your inquiries? Just ask -
          email{' '}
          <a href={`mailto:${BUSINESS.email}`} className="font-medium">
            {BUSINESS.email}
          </a>{' '}
          or message us on WhatsApp and we’ll take care of it promptly.
        </p>

        <h2 className="text-cocoa">Questions</h2>
        <p>
          Anything unclear? <Link href="/contact">Reach us any way you like</Link> - we reply the
          same day.
        </p>
      </div>
    </div>
  )
}
