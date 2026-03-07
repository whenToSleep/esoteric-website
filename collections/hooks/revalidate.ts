import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidateAfterChange: CollectionAfterChangeHook = ({ collection }) => {
  const paths = getPathsForCollection(collection.slug)
  for (const p of paths) {
    revalidatePath(p, 'layout')
  }
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ collection }) => {
  const paths = getPathsForCollection(collection.slug)
  for (const p of paths) {
    revalidatePath(p, 'layout')
  }
}

function getPathsForCollection(slug: string): string[] {
  switch (slug) {
    case 'pages':
      return ['/[locale]/about']
    case 'services':
      return ['/[locale]/[categorySlug]', '/[locale]/[categorySlug]/[serviceSlug]', '/[locale]']
    case 'service-categories':
      return ['/[locale]/[categorySlug]', '/[locale]']
    case 'posts':
      return ['/[locale]/blog', '/[locale]/blog/[slug]', '/[locale]']
    case 'post-categories':
      return ['/[locale]/blog']
    case 'testimonials':
      return ['/[locale]']
    case 'media':
      return ['/[locale]']
    default:
      return ['/[locale]']
  }
}
