import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CtaBand } from '@/components/sections/CtaBand'
import { JsonLd } from '@/components/ui/JsonLd'
import { RichTextContent } from '@/components/ui/RichTextContent'
import { asMedia, getBlogPostBySlug, getBlogPosts } from '@/lib/data'
import { mediaAlt, mediaUrl } from '@/lib/media'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const revalidate = 300

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return {}
  return pageMeta({
    title: post.seo?.seoTitle || `${post.title} | Mummy2Be`,
    description: post.seo?.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: mediaUrl(asMedia(post.heroImage), 'og'),
  })
}

function formatDate(value?: string | null): string | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogArticlePage({ params }: Params) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const related = (await getBlogPosts()).filter((p) => p.slug !== post.slug).slice(0, 2)
  const hero = asMedia(post.heroImage)
  const heroUrl = mediaUrl(hero, 'gallery')

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          publishedAt: post.publishedAt,
          image: heroUrl,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'The Style Journal', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <article className="container-page pt-10 md:pt-16">
        <div className="mx-auto max-w-2xl">
          <nav aria-label="Breadcrumb" className="text-[13.5px] text-cocoa-light">
            <Link href="/blog" className="hover:text-cocoa hover:underline">
              The Style Journal
            </Link>{' '}
            <span aria-hidden>/</span> <span aria-current="page">{post.title}</span>
          </nav>

          <h1 className="text-display mt-4">{post.title}</h1>
          {formatDate(post.publishedAt) ? (
            <p className="mt-3 text-caption uppercase tracking-[0.14em] text-cocoa-light">
              By Mummy2Be, {formatDate(post.publishedAt)}
            </p>
          ) : null}
          <p className="mt-5 text-body-lg text-cocoa-light">{post.excerpt}</p>

          {heroUrl ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-soft-lg shadow-warm">
              <Image
                src={heroUrl}
                alt={mediaAlt(hero, post.title)}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                priority
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="mt-10">
            <RichTextContent data={post.body} className="text-[16px] leading-[1.75]" />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <CtaBand
            title="Found your look? The gown is one message away."
            text="Every gown is one size, professionally cleaned, and delivered across Canada."
            ctaLabel="Browse Gowns"
            ctaHref="/gowns"
            tone="blush"
          />
        </div>

        {related.length > 0 ? (
          <aside aria-label="Related articles" className="mx-auto mt-16 max-w-2xl pb-4">
            <h2 className="text-h3">Keep reading</h2>
            <ul className="mt-4 space-y-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group block rounded-soft-lg border border-taupe p-5 hover:bg-champagne motion-safe:transition-colors"
                  >
                    <span className="font-serif text-[19px] group-hover:text-terracotta-dark">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-[14px] text-cocoa-light">{p.excerpt}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </article>
    </>
  )
}
