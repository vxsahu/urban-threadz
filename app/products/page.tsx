import { Metadata } from 'next';
import { getAllProducts } from '@/utils/productService';
import { Product } from '@/utils/productService';
import { generateProductsMetadata } from '@/utils/seo';
import StructuredData from '@/components/StructuredData';
import { generateItemListSchema, generateBreadcrumbSchema } from '@/utils/structuredData';
import ProductsClient from '@/components/ProductsClient';

export const metadata: Metadata = generateProductsMetadata();

export default async function ProductsPage() {
  const products = await getAllProducts();

  const breadcrumbPaths = [
    { name: 'Home', url: 'https://urbanthread.com' },
    { name: 'All Products', url: 'https://urbanthread.com/products' }
  ];

  return (
    <>
      <StructuredData data={generateItemListSchema(products, 'all-products')} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbPaths)} />
      <ProductsClient products={products} />
    </>
  );
}
