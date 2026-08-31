import type { Metadata } from 'next'

import { pageMeta } from '@/lib/seo'

import { SavedContent } from './SavedContent'

export const metadata: Metadata = pageMeta({
  title: 'Your Saved Gowns | Mummy2Be',
  description: 'The gowns you’ve saved while browsing - ask about them all in one message.',
  path: '/saved',
  noindex: true,
})

export default function SavedPage() {
  return (
    <div className="container-page pt-10 md:pt-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-display">Your saved gowns</h1>
        <p className="mt-4 text-body-lg text-cocoa-light">
          Kept safely in your browser while you decide - hearts sync across this device only.
        </p>
      </div>
      <SavedContent />
    </div>
  )
}
