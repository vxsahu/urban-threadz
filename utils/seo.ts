import { Metadata } from 'next';
import { Product } from './productService';
import { config } from './config';

// Base metadata for the site
export const baseMetadata: Metadata = {
  title: {
    default: 'Next Threadz - Premium Clothing & Fashion',
    template: '%s | Next Threadz'
  },
  description: 'Discover premium clothing and fashion items at Next Threadz. Shop the latest trends in men\'s, women\'s, and unisex clothing with free shipping and easy returns.',
  keywords: ['clothing', 'fashion', 'premium', 'next', 'threadz', 'apparel', 'style', 'trendy'],
  authors: [{ name: 'Next Threadz' }],
  creator: 'Next Threadz',
  publisher: 'Next Threadz',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(config.siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: config.siteUrl,
    siteName: 'Next Threadz',
    title: 'Next Threadz - Premium Clothing & Fashion',
    description: 'Discover premium clothing and fashion items at Next Threadz. Shop the latest trends in men\'s, women\'s, and unisex clothing.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Next Threadz - Premium Clothing & Fashion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next Threadz - Premium Clothing & Fashion',
    description: 'Discover premium clothing and fashion items at Next Threadz. Shop the latest trends in men\'s, women\'s, and unisex clothing.',
    images: ['/og-image.png'],
    creator: '@nextthreadz',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

// Generate metadata for product pages
export function generateProductMetadata(product: Product): Metadata {
  const productUrl = `${config.siteUrl}/productDetails/${product.id}`;
  const productImage = product.images.find(img => img.isMain)?.url || product.images[0]?.url;
  const fullImageUrl = `${config.siteUrl}${productImage}`;
  
  return {
    title: product.name,
    description: product.shortDescription || product.description,
    keywords: [...(product.tags || []), 'clothing', 'fashion', 'premium', 'next', 'threadz'],
    openGraph: {
      type: 'website',
      url: productUrl,
      title: product.name,
      description: product.shortDescription || product.description,
      images: [
        {
          url: fullImageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      siteName: 'Next Threadz',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription || product.description,
      images: [fullImageUrl],
    },
    alternates: {
      canonical: productUrl,
    },
  };
}

// Generate metadata for category pages
export function generateCategoryMetadata(category: string, subcategory?: string): Metadata {
  const categoryTitles: Record<string, string> = {
    'new-arrivals': 'New Arrivals',
    'collections': 'Collections',
    'shop-by': 'Shop By Category',
    'sale': 'Sale & Deals',
  };

  const categoryDescriptions: Record<string, string> = {
    'new-arrivals': 'Discover the latest additions to our collection. Shop new arrivals and trending items.',
    'collections': 'Explore our curated collections of premium clothing. From graphic tees to limited editions.',
    'shop-by': 'Browse our collections by category. Find the perfect style for men, women, and unisex.',
    'sale': 'Amazing deals and discounts on premium clothing. Save big on clearance and bundle deals.',
  };

  const title = subcategory 
    ? `${subcategory} - ${categoryTitles[category] || category}`
    : categoryTitles[category] || category;

  const description = categoryDescriptions[category] || 'Discover premium clothing and fashion items.';

  return {
    title,
    description,
    keywords: [category, subcategory, 'clothing', 'fashion', 'premium', 'next', 'threadz'].filter(Boolean) as string[],
    openGraph: {
      type: 'website',
      url: `${config.siteUrl}/${category}${subcategory ? `?subcategory=${subcategory}` : ''}`,
      title,
      description,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `${config.siteUrl}/${category}${subcategory ? `?subcategory=${subcategory}` : ''}`,
    },
  };
}

// Generate metadata for products page
export function generateProductsMetadata(): Metadata {
  return {
    title: 'All Products',
    description: 'Browse our complete collection of premium clothing and fashion items. Find your perfect style.',
    keywords: ['all products', 'clothing', 'fashion', 'premium', 'next', 'threadz', 'apparel'],
    openGraph: {
      type: 'website',
      url: `${config.siteUrl}/products`,
      title: 'All Products - Next Threadz',
      description: 'Browse our complete collection of premium clothing and fashion items.',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'All Products - Next Threadz',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'All Products - Next Threadz',
      description: 'Browse our complete collection of premium clothing and fashion items.',
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `${config.siteUrl}/products`,
    },
  };
}

// Generate metadata for home page
export function generateHomeMetadata(): Metadata {
  return {
    title: 'Next Threadz - Premium Clothing & Fashion',
    description: 'Welcome to Next Threadz. Discover premium clothing and fashion items with the latest trends in men\'s, women\'s, and unisex clothing. Free shipping and easy returns.',
    keywords: ['home', 'clothing', 'fashion', 'premium', 'Next', 'threadz', 'apparel', 'style', 'trendy'],
    openGraph: {
      type: 'website',
      url: config.siteUrl,
      title: 'Next Threadz - Premium Clothing & Fashion',
      description: 'Welcome to Next Threadz. Discover premium clothing and fashion items with the latest trends.',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Next Threadz - Premium Clothing & Fashion',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Next Threadz - Premium Clothing & Fashion',
      description: 'Welcome to Next Threadz. Discover premium clothing and fashion items with the latest trends.',
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: config.siteUrl,
    },
  };
}
