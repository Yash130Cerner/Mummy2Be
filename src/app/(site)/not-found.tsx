import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[55vh] flex-col items-center justify-center py-16 text-center">
      <p className="font-serif text-[64px] leading-none text-taupe">404</p>
      <h1 className="text-h2 mt-4">This page seems to have slipped away</h1>
      <p className="mt-3 max-w-md text-body-lg text-cocoa-light">
        The gown you’re looking for might have moved - but the collection is right here, and so
        are we.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/gowns" variant="primary" size="md">
          Browse Gowns
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary" size="md">
          Contact Us
        </ButtonLink>
      </div>
    </div>
  )
}
