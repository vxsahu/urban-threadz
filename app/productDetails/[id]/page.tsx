import { Metadata } from 'next';
import { getProductById } from '@/utils/productService';
import { generateProductMetadata } from '@/utils/seo';
import StructuredData from '@/components/StructuredData';
import { generateProductSchema, generateBreadcrumbSchema } from '@/utils/structuredData';
import ProductDetailsClient from '@/components/ProductDetailsClient';

interface ProductDetailsProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ProductDetailsProps): Promise<Metadata> {
  const product = getProductById(params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  return generateProductMetadata(product);
}

export default function ProductDetails({ params }: ProductDetailsProps) {
  const product = getProductById(params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <div className="container max-w-7xl mx-auto px-4 py-8 mt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">Product not found</h1>
            <p className="text-[var(--secondary)]">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbPaths = [
    { name: 'Home', url: `${require('@/utils/config').siteUrl}` },
    { name: 'Products', url: `${require('@/utils/config').siteUrl}/products` },
    { name: product.name, url: `${require('@/utils/config').siteUrl}/productDetails/${product.id}` }
  ];

  return (
    <>
      <StructuredData data={generateProductSchema(product)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbPaths)} />
      <ProductDetailsClient product={product} />
    </>
  );
}

