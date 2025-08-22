"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/ui/Footer';
import { ProductsGrid } from '@/components/ui/Cards';
import { getAllProducts, Product } from '@/utils/productService';

interface SaleClientProps {
  subcategory?: string;
}

export default function SaleClient({ subcategory }: SaleClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const currentSubcategory = searchParams.get('subcategory') || subcategory;

  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!products.length) return;

    let filtered = [...products];

    // Filter based on subcategory
    if (currentSubcategory) {
      switch (currentSubcategory) {
        case 'clearance':
          // Show products with significant discounts (50% or more)
          filtered = products.filter((product: any) => {
            if (!product.discountedPrice || !product.realPrice) return false;
            const discountPercentage = ((product.realPrice - product.discountedPrice) / product.realPrice) * 100;
            return discountPercentage >= 50;
          });
          break;
        case 'bundle-deals':
          // Show products that are part of bundle deals or have special offers
          filtered = products.filter((product: any) => 
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
          // Show all products with any discount
          filtered = products.filter((product: any) => 
            product.discountedPrice && product.discountedPrice < product.realPrice
          );
          break;
      }
    } else {
      // Show all products with any discount for the main sale page
      filtered = products.filter((product: any) => 
        product.discountedPrice && product.discountedPrice < product.realPrice
      );
    }

    setFilteredProducts(filtered);
  }, [products, currentSubcategory]);

  const getSubcategoryTitle = () => {
    switch (currentSubcategory) {
      case 'clearance':
        return 'Clearance Sale';
      case 'bundle-deals':
        return 'Bundle Deals';
      default:
        return 'Sale';
    }
  };

  const getSubcategoryDescription = () => {
    switch (currentSubcategory) {
      case 'clearance':
        return 'Up to 70% off on selected items - Limited time only!';
      case 'bundle-deals':
        return 'Special bundle offers and combo deals for maximum savings';
      default:
        return 'Amazing deals and discounts on premium clothing';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Navbar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="animate-pulse">
            <div className="h-8 bg-[var(--neutral)] rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-[var(--neutral)] rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
            {getSubcategoryTitle()}
          </h1>
          <p className="text-[var(--secondary)]">
            {getSubcategoryDescription()}
          </p>
        </div>

        {/* Subcategory Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <a
              href="/sale"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !currentSubcategory
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              All Sales
            </a>
            <a
              href="/sale?subcategory=clearance"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSubcategory === 'clearance'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              Clearance
            </a>
            <a
              href="/sale?subcategory=bundle-deals"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSubcategory === 'bundle-deals'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              Bundle Deals
            </a>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductsGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-16">
            <p className="text-[var(--secondary)] text-lg">
              No sale items found at the moment.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
