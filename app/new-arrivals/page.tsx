import { Metadata } from 'next';
import { getAllProducts } from '@/utils/productService';
import { generateCategoryMetadata } from '@/utils/seo';
import StructuredData from '@/components/StructuredData';
import { generateItemListSchema, generateBreadcrumbSchema } from '@/utils/structuredData';
import NewArrivalsClient from '@/components/NewArrivalsClient';

interface NewArrivalsProps {
  searchParams: { subcategory?: string };
}

export async function generateMetadata({ searchParams }: NewArrivalsProps): Promise<Metadata> {
  return generateCategoryMetadata('new-arrivals', searchParams.subcategory);
}

export default function NewArrivalsPage({ searchParams }: NewArrivalsProps) {
  const products = getAllProducts();
  const subcategory = searchParams.subcategory;

  let filteredProducts = [...products];

  // Filter based on subcategory
  if (subcategory) {
    switch (subcategory) {
      case 'this-week':
        filteredProducts = products.filter((product: any) => {
          const productDate = new Date(product.createdAt || Date.now());
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return productDate >= weekAgo;
        });
        break;
      case 'this-month':
        filteredProducts = products.filter((product: any) => {
          const productDate = new Date(product.createdAt || Date.now());
          const monthAgo = new Date();
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return productDate >= monthAgo;
        });
        break;
      case 'trending':
        filteredProducts = products.filter((product: any) => 
          product.rating >= 4.5 || product.isTrending
        );
        break;
      default:
        break;
    }
  }

  const breadcrumbPaths = [
    { name: 'Home', url: 'https://urbanthread.com' },
    { name: 'New Arrivals', url: 'https://urbanthread.com/new-arrivals' },
    ...(subcategory ? [{ name: subcategory.replace('-', ' '), url: `https://urbanthread.com/new-arrivals?subcategory=${subcategory}` }] : [])
  ];

  return (
    <>
      <StructuredData data={generateItemListSchema(filteredProducts, 'new-arrivals', subcategory)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbPaths)} />
      <NewArrivalsClient subcategory={subcategory} />
    </>
  );
}


