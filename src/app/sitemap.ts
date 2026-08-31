import type { MetadataRoute } from 'next'

import { CATEGORY_VIEWS } from '@/lib/categories'
import { SITE } from '@/lib/constants'
import { getBlogPosts, getGowns } from '@/lib/data'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/gowns`, changeFrequency: 'daily', priority: 0.9 },
    ...CATEGORY_VIEWS.map((c) => ({
      url: `${base}/gowns/${c.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    { url: `${base}/how-it-works`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/find-my-gown`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/faq`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/shipping-and-returns`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/fit-guide`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/real-moms`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/for-photographers`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/gta-maternity-gown-rental`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const [gowns, posts] = await Promise.all([getGowns(), getBlogPosts()])

  return [
    ...staticRoutes,
    ...gowns.map((gown) => ({
      url: `${base}/gowns/${gown.slug}`,
      lastModified: gown.updatedAt ? new Date(gown.updatedAt) : undefined,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}
