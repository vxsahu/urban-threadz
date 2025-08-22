import { MetadataRoute } from 'next';
import { getAllProducts } from '@/utils/productService';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://urbanthread.com';
  const products = getAllProducts();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/new-arrivals`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop-by`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sale`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // Category pages with subcategories
  const categoryPages = [
    // New Arrivals subcategories
    {
      url: `${baseUrl}/new-arrivals?subcategory=this-week`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/new-arrivals?subcategory=this-month`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/new-arrivals?subcategory=trending`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    // Collections subcategories
    {
      url: `${baseUrl}/collections?subcategory=graphic-tees`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/collections?subcategory=minimalist`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/collections?subcategory=vintage`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/collections?subcategory=limited-edition`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // Shop By subcategories
    {
      url: `${baseUrl}/shop-by?subcategory=men`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shop-by?subcategory=women`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shop-by?subcategory=unisex`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // Sale subcategories
    {
      url: `${baseUrl}/sale?subcategory=clearance`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sale?subcategory=bundle-deals`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
  ];

  // Product pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/productDetails/${product.id}`,
    lastModified: new Date(product.updatedAt || product.createdAt || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
