import { Metadata } from 'next';
import { getAllProducts } from '@/utils/productService';
import { generateCategoryMetadata } from '@/utils/seo';
import StructuredData from '@/components/StructuredData';
import { generateItemListSchema, generateBreadcrumbSchema } from '@/utils/structuredData';
import SaleClient from '@/components/SaleClient';

interface SaleProps {
  searchParams: { subcategory?: string };
}

export async function generateMetadata({ searchParams }: SaleProps): Promise<Metadata> {
  return generateCategoryMetadata('sale', searchParams.subcategory);
}

export default function SalePage({ searchParams }: SaleProps) {
  const products = getAllProducts();
  const subcategory = searchParams.subcategory;

  let filteredProducts = [...products];

  // Filter based on subcategory
  if (subcategory) {
    switch (subcategory) {
      case 'clearance':
        filteredProducts = products.filter((product: any) => {
          if (!product.discountedPrice || !product.realPrice) return false;
          const discountPercentage = ((product.realPrice - product.discountedPrice) / product.realPrice) * 100;
          return discountPercentage >= 50;
        });
        break;
      case 'bundle-deals':
        filteredProducts = products.filter((product: any) => 
          product.isBundleDeal || 
          product.hasSpecialOffer ||
          product.tags?.some((tag: string) => 
            tag.toLowerCase().includes('bundle') || 
            tag.toLowerCase().includes('deal') ||
            tag.toLowerCase().includes('offer')
          )
        );
        break;
      default:
        filteredProducts = products.filter((product: any) => 
          product.discountedPrice && product.discountedPrice < product.realPrice
        );
        break;
    }
  } else {
    filteredProducts = products.filter((product: any) => 
      product.discountedPrice && product.discountedPrice < product.realPrice
    );
  }

  const breadcrumbPaths = [
    { name: 'Home', url: 'https://urbanthread.com' },
    { name: 'Sale', url: 'https://urbanthread.com/sale' },
    ...(subcategory ? [{ name: subcategory.replace('-', ' '), url: `https://urbanthread.com/sale?subcategory=${subcategory}` }] : [])
  ];

  return (
    <>
      <StructuredData data={generateItemListSchema(filteredProducts, 'sale', subcategory)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbPaths)} />
      <SaleClient subcategory={subcategory} />
    </>
  );
}
