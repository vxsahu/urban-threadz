import { Metadata } from 'next';
import { getAllProducts } from '@/utils/productService';
import { generateCategoryMetadata } from '@/utils/seo';
import StructuredData from '@/components/StructuredData';
import { generateItemListSchema, generateBreadcrumbSchema } from '@/utils/structuredData';
import CollectionsClient from '@/components/CollectionsClient';

interface CollectionsProps {
  searchParams: { subcategory?: string };
}

export async function generateMetadata({ searchParams }: CollectionsProps): Promise<Metadata> {
  return generateCategoryMetadata('collections', searchParams.subcategory);
}

export default function CollectionsPage({ searchParams }: CollectionsProps) {
  const products = getAllProducts();
  const subcategory = searchParams.subcategory;

  let filteredProducts = [...products];

  // Filter based on subcategory
  if (subcategory) {
    switch (subcategory) {
      case 'graphic-tees':
        filteredProducts = products.filter((product: any) => 
          product.category?.toLowerCase().includes('graphic') ||
          product.name?.toLowerCase().includes('graphic')
        );
        break;
      case 'minimalist':
        filteredProducts = products.filter((product: any) => 
          product.category?.toLowerCase().includes('minimalist') ||
          product.name?.toLowerCase().includes('minimalist') ||
          product.tags?.some((tag: string) => tag.toLowerCase().includes('minimalist'))
        );
        break;
      case 'vintage':
        filteredProducts = products.filter((product: any) => 
          product.category?.toLowerCase().includes('vintage') ||
          product.name?.toLowerCase().includes('vintage') ||
          product.tags?.some((tag: string) => tag.toLowerCase().includes('vintage'))
        );
        break;
      case 'limited-edition':
        filteredProducts = products.filter((product: any) => 
          product.isLimitedEdition || 
          product.name?.toLowerCase().includes('limited') ||
          product.tags?.some((tag: string) => tag.toLowerCase().includes('limited'))
        );
        break;
      default:
        break;
    }
  }

  const breadcrumbPaths = [
    { name: 'Home', url: 'https://urbanthread.com' },
    { name: 'Collections', url: 'https://urbanthread.com/collections' },
    ...(subcategory ? [{ name: subcategory.replace('-', ' '), url: `https://urbanthread.com/collections?subcategory=${subcategory}` }] : [])
  ];

  return (
    <>
      <StructuredData data={generateItemListSchema(filteredProducts, 'collections', subcategory)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbPaths)} />
      <CollectionsClient subcategory={subcategory} />
    </>
  );
}


