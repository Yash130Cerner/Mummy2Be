import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { CtaBand } from '@/components/sections/CtaBand'
import { JsonLd } from '@/components/ui/JsonLd'
import { asMedia, getBlogPosts } from '@/lib/data'
import { mediaAlt, mediaUrl } from '@/lib/media'
import { breadcrumbSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const revalidate = 300

export const metadata: Metadata = pageMeta({
  title: 'Maternity Style Guide & Photoshoot Tips | Mummy2Be',
  description:
    'Ideas and tips for your maternity photoshoot and baby shower - what to wear, when to book, and how to style your bump beautifully.',
  path: '/blog',
})

const CARD_ART = [
  'linear-gradient(150deg, #B4715E 0%, #E3C0AE 100%)',
  'linear-gradient(150deg, #6E2320 0%, #A65046 100%)',
  'linear-gradient(150deg, #9FB4C4 0%, #DCE6EC 100%)',
  'linear-gradient(150deg, #D9AFA4 0%, #F0DCD2 100%)',
]

function formatDate(value?: string | null): string | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'The Style Journal', path: '/blog' }])}
      />

      <div className="container-page pt-10 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-display">The Style Journal</h1>
          <p className="mt-4 text-body-lg text-cocoa-light">
            Honest, useful guidance for your maternity photoshoot and baby shower - what to wear,
            when to book, and how to make the moment yours.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => {
            const hero = asMedia(post.heroImage)
            const heroUrl = mediaUrl(hero, 'card')
            return (
              <article key={post.id} className="group">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block overflow-hidden rounded-soft-lg bg-champagne shadow-warm motion-safe:transition-shadow hover:shadow-warm-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {heroUrl ? (
                      <Image
                        src={heroUrl}
                        alt={mediaAlt(hero, post.title)}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="flex h-full w-full items-end p-5"
                        style={{ background: CARD_ART[i % CARD_ART.length] }}
                      >
                        <span className="font-serif text-[15px] italic text-ivory/90">
                          The Style Journal
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="px-5 pb-6 pt-4">
                    {formatDate(post.publishedAt) ? (
                      <p className="text-caption uppercase tracking-[0.14em] text-cocoa-light">
                        {formatDate(post.publishedAt)}
                      </p>
                    ) : null}
                    <h2 className="mt-1.5 font-serif text-[21px] leading-snug group-hover:text-terracotta-dark motion-safe:transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-[14.5px] text-cocoa-light">{post.excerpt}</p>
                    <p className="mt-3 text-[14px] font-medium">Read the article →</p>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>

        <div className="mt-16 md:mt-24">
          <CtaBand
            title="Reading done - gown next?"
            text="See the collection these guides are written around."
            ctaLabel="Browse Gowns"
            ctaHref="/gowns"
          />
        </div>
      </div>
    </>
  )
}
