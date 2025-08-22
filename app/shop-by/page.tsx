import { Metadata } from 'next';
import { getAllProducts } from '@/utils/productService';
import { generateCategoryMetadata } from '@/utils/seo';
import StructuredData from '@/components/StructuredData';
import { generateItemListSchema, generateBreadcrumbSchema } from '@/utils/structuredData';
import ShopByClient from '@/components/ShopByClient';

interface ShopByProps {
  searchParams: { subcategory?: string };
}

export async function generateMetadata({ searchParams }: ShopByProps): Promise<Metadata> {
  return generateCategoryMetadata('shop-by', searchParams.subcategory);
}

export default function ShopByPage({ searchParams }: ShopByProps) {
  const products = getAllProducts();
  const subcategory = searchParams.subcategory;

  let filteredProducts = [...products];

  // Filter based on subcategory
  if (subcategory) {
    switch (subcategory) {
      case 'men':
        filteredProducts = products.filter((product: any) => 
          product.gender?.toLowerCase() === 'men' ||
          product.category?.toLowerCase().includes('men') ||
          product.tags?.some((tag: string) => tag.toLowerCase().includes('men'))
        );
        break;
      case 'women':
        filteredProducts = products.filter((product: any) => 
          product.gender?.toLowerCase() === 'women' ||
          product.category?.toLowerCase().includes('women') ||
          product.tags?.some((tag: string) => tag.toLowerCase().includes('women'))
        );
        break;
      case 'unisex':
        filteredProducts = products.filter((product: any) => 
          product.gender?.toLowerCase() === 'unisex' ||
          product.category?.toLowerCase().includes('unisex') ||
          product.tags?.some((tag: string) => tag.toLowerCase().includes('unisex'))
        );
        break;
      default:
        break;
    }
  }

  const breadcrumbPaths = [
    { name: 'Home', url: `${require('@/utils/config').siteUrl}` },
    { name: 'Shop By Category', url: `${require('@/utils/config').siteUrl}/shop-by` },
    ...(subcategory ? [{ name: subcategory.replace('-', ' '), url: `${require('@/utils/config').siteUrl}/shop-by?subcategory=${subcategory}` }] : [])
  ];

  return (
    <>
      <StructuredData data={generateItemListSchema(filteredProducts, 'shop-by', subcategory)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbPaths)} />
      <ShopByClient subcategory={subcategory} />
    </>
  );
}


