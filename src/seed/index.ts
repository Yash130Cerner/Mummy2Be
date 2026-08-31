import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

import { SEED_BLOG_POSTS } from './blogPosts'
import { SEED_FAQS } from './faqs'
import { SEED_GOWNS } from './gowns'
import { SEED_PAGES } from './pages'

/**
 * Seeds the launch content: 13 gowns (Launch Content Pack), the FAQ set, the
 * founder story, the rental terms, and 3 Style Journal articles.
 *
 * Idempotent: existing records (matched by slug / question) are updated, so
 * the script is safe to re-run. Photos are NOT seeded - the owner uploads
 * them in the admin (see SETUP.md step 9); until then the site shows an
 * elegant art treatment per gown.
 *
 * Run with:  npm run seed
 */

const context = { disableRevalidate: true }

async function seedGowns(payload: Payload): Promise<void> {
  for (const gown of SEED_GOWNS) {
    const existing = await payload.find({
      collection: 'gowns',
      where: { slug: { equals: gown.slug } },
      limit: 1,
      depth: 0,
    })

    const data = {
      name: gown.name,
      slug: gown.slug,
      shortDescription: gown.shortDescription,
      fullDescription: gown.fullDescription as never,
      categories: gown.categories,
      cultureEdit: gown.cultureEdit,
      styleTags: gown.styleTags,
      colorPrimary: gown.colorPrimary,
      colorFamily: gown.colorFamily,
      rentalPrice5Day: gown.rentalPrice5Day,
      rentalPrice10Day: gown.rentalPrice10Day,
      fabric: gown.fabric,
      bestFor: gown.bestFor,
      featured: gown.featured,
      displayOrder: gown.displayOrder,
      published: true,
      // Launch default; the owner curates real statuses in the admin.
      availabilityStatus: 'available' as const,
      seo: {
        seoTitle: `${gown.name} - Maternity Gown Rental | Mummy2Be`,
        metaDescription:
          `Rent ${gown.name} - ${gown.shortDescription} One size fits every bump, professionally cleaned, delivered across Canada. Contact us to reserve.`.slice(
            0,
            170,
          ),
      },
    }

    if (existing.docs[0]) {
      await payload.update({ collection: 'gowns', id: existing.docs[0].id, data, context })
      payload.logger.info(`Updated gown: ${gown.name}`)
    } else {
      await payload.create({ collection: 'gowns', data, context })
      payload.logger.info(`Created gown: ${gown.name}`)
    }
  }
}

async function seedFaqs(payload: Payload): Promise<void> {
  for (const faq of SEED_FAQS) {
    const existing = await payload.find({
      collection: 'faqs',
      where: { question: { equals: faq.question } },
      limit: 1,
      depth: 0,
    })

    const data = {
      question: faq.question,
      answer: faq.answer,
      group: faq.group,
      displayOrder: faq.displayOrder,
      featuredOnHome: Boolean(faq.featuredOnHome),
      showOnProduct: Boolean(faq.showOnProduct),
    }

    if (existing.docs[0]) {
      await payload.update({ collection: 'faqs', id: existing.docs[0].id, data, context })
    } else {
      await payload.create({ collection: 'faqs', data, context })
    }
  }
  payload.logger.info(`Seeded ${SEED_FAQS.length} FAQs`)
}

async function seedPages(payload: Payload): Promise<void> {
  for (const page of SEED_PAGES) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      depth: 0,
    })

    const data = {
      title: page.title,
      slug: page.slug,
      ...(page.body ? { body: page.body as never } : {}),
    }

    if (existing.docs[0]) {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context })
      payload.logger.info(`Updated page content: ${page.slug}`)
    } else {
      await payload.create({ collection: 'pages', data, context })
      payload.logger.info(`Created page content: ${page.slug}`)
    }
  }
}

async function seedBlogPosts(payload: Payload): Promise<void> {
  for (const post of SEED_BLOG_POSTS) {
    const existing = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
      depth: 0,
    })

    const data = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      body: post.body as never,
      published: true,
      seo: {
        seoTitle: post.seoTitle,
        metaDescription: post.metaDescription,
      },
    }

    if (existing.docs[0]) {
      await payload.update({ collection: 'blog-posts', id: existing.docs[0].id, data, context })
      payload.logger.info(`Updated article: ${post.title}`)
    } else {
      await payload.create({ collection: 'blog-posts', data, context })
      payload.logger.info(`Created article: ${post.title}`)
    }
  }
}

async function run(): Promise<void> {
  const payload = await getPayload({ config })
  payload.logger.info('Seeding Mummy2Be launch content…')

  await seedGowns(payload)
  await seedFaqs(payload)
  await seedPages(payload)
  await seedBlogPosts(payload)

  payload.logger.info('')
  payload.logger.info('✔ Seed complete: 13 gowns, FAQs, Our Story, Rental Terms, 3 articles.')
  payload.logger.info('Next: open /admin to create your login and upload gown photos.')
}

// Top-level await is required: `payload run` exits the process as soon as the
// script module finishes evaluating.
try {
  await run()
} catch (error) {
  console.error('Seed failed:', error)
  process.exit(1)
}
