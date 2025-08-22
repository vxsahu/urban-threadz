import { Product } from './productService';
import { WithContext, Product as ProductSchema, Organization, WebSite, BreadcrumbList, ItemList } from 'schema-dts';

// Organization structured data
export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NextThread',
    url: `${require('@/utils/config').siteUrl}`,
    logo: `${require('@/utils/config').siteUrl}/logo.png`,
    description: 'Premium clothing and fashion retailer offering trendy apparel for men, women, and unisex.',
    sameAs: [
      `${require('@/utils/config').siteUrl}/redirect/instagram`,
      `${require('@/utils/config').siteUrl}/redirect/twitter`,
      `${require('@/utils/config').siteUrl}/redirect/facebook`
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+918502913816',
      contactType: 'customer service',
      email: 'urbanthreadz240@gmail.com'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Fashion Street',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US'
    }
  };
}

// Website structured data
export function generateWebsiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NextThread',
    url: `${require('@/utils/config').siteUrl}`,
    description: 'Premium clothing and fashion retailer',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${require('@/utils/config').siteUrl}/search?q={search_term_string}`
      },
      // 'query-input': 'required name=search_term_string'
    }
  };
}

// Product structured data
export function generateProductSchema(product: Product): WithContext<ProductSchema> {
  const productImage = product.images.find(img => img.isMain)?.url || product.images[0]?.url;
  const fullImageUrl = `${require('@/utils/config').siteUrl}${productImage}`;
  
  const offers = {
    '@type': 'Offer',
    price: product.discountedPrice || product.realPrice,
    priceCurrency: 'INR',
    availability: product.isAvailable && product.totalStock > 0 
      ? 'https://schema.org/InStock' 
      : 'https://schema.org/OutOfStock',
    url: `${require('@/utils/config').siteUrl}/productDetails/${product.id}`,
    seller: {
      '@type': 'Organization',
      name: 'NextThread'
    },
    priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  };

  if (product.discountedPrice && product.discountedPrice < product.realPrice) {
    offers.price = product.discountedPrice;
    // offers.highPrice = product.realPrice;
    // offers.lowPrice = product.discountedPrice;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: fullImageUrl,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'NextThread'
    },
    category: product.category,
    // offers,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.avgRating,
      reviewCount: product.numReviews,
      bestRating: 5,
      worstRating: 1
    },
    additionalProperty: product.tags?.map(tag => ({
      '@type': 'PropertyValue',
      name: 'tag',
      value: tag
    })) || []
  };
}

// Breadcrumb structured data
export function generateBreadcrumbSchema(paths: Array<{ name: string; url: string }>): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: paths.map((path, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: path.name,
      item: path.url
    }))
  };
}

// ItemList structured data for category pages
export function generateItemListSchema(products: Product[], category: string, subcategory?: string): WithContext<ItemList> {
  const categoryName = subcategory ? `${subcategory} - ${category}` : category;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: categoryName,
    description: `Products in ${categoryName} category`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        url: `${require('@/utils/config').siteUrl}/productDetails/${product.id}`,
        image: `${require('@/utils/config').siteUrl}${product.images.find(img => img.isMain)?.url || product.images[0]?.url}`,
        description: product.shortDescription || product.description,
        offers: {
          '@type': 'Offer',
          price: product.discountedPrice || product.realPrice,
          priceCurrency: 'INR',
          availability: product.isAvailable && product.totalStock > 0 
            ? 'https://schema.org/InStock' 
            : 'https://schema.org/OutOfStock'
        }
      }
    }))
  };
}

// FAQ structured data
export function generateFAQSchema(): WithContext<any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is NextThread?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NextThread is a premium clothing and fashion retailer offering trendy apparel for men, women, and unisex. We provide high-quality clothing with the latest fashion trends.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you offer free shipping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer free shipping on all orders. Your items will be delivered to your doorstep at no additional cost.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is your return policy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer easy returns within 30 days of purchase. If you\'re not satisfied with your order, you can return it for a full refund or exchange.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can I track my order?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package in real-time.'
        }
      },
      {
        '@type': 'Question',
        name: 'What payment methods do you accept?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept all major credit cards, debit cards, and digital payment methods including UPI, Google Pay, and PhonePe.'
        }
      }
    ]
  };
}

// Local Business structured data
export function generateLocalBusinessSchema(): WithContext<any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'NextThread',
    description: 'Premium clothing and fashion retailer',
    url: `${require('@/utils/config').siteUrl}`,
    telephone: '+91 8502913816',
    email: 'urbanthreadz240@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Fashion Street',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7128,
      longitude: -74.0060
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '16:00'
      }
    ],
    priceRange: '₹₹',
    servesCuisine: 'Fashion Retail'
  };
}
