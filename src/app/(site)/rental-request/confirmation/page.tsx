import type { Metadata } from 'next'

import { pageMeta } from '@/lib/seo'

import { ConfirmationContent } from './ConfirmationContent'

export const metadata: Metadata = pageMeta({
  title: 'Request Received | Mummy2Be',
  description: 'We’ve received your rental request and will confirm personally the same day.',
  path: '/rental-request/confirmation',
  noindex: true,
})

export default function ConfirmationPage() {
  return (
    <div className="container-page pt-12 md:pt-20">
      <ConfirmationContent />
    </div>
  )
}
