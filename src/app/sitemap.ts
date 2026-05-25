import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tokokita.com' // Replace with your actual production domain

  const supabase = await createClient()
  
  // Fetch active products
  const { data: products } = await supabase
    .from('products')
    .select('slug, created_at')
    .eq('is_active', true)

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id')

  const productUrls = (products || []).map((product) => ({
    url: `${baseUrl}/produk/${product.slug}`,
    lastModified: product.created_at ? new Date(product.created_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryUrls = (categories || []).map((category) => ({
    url: `${baseUrl}/katalog?kategori=${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/katalog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  return [...routes, ...categoryUrls, ...productUrls]
}
