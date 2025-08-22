"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/ui/Footer';
import { ProductsGrid } from '@/components/ui/Cards';
import { getAllProducts, Product } from '@/utils/productService';

interface ShopByClientProps {
  subcategory?: string;
}

export default function ShopByClient({ subcategory }: ShopByClientProps) {
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
        case 'men':
          filtered = products.filter((product: any) => 
            product.gender?.toLowerCase() === 'men' ||
            product.category?.toLowerCase().includes('men') ||
            product.tags?.some((tag: string) => tag.toLowerCase().includes('men'))
          );
          break;
        case 'women':
          filtered = products.filter((product: any) => 
            product.gender?.toLowerCase() === 'women' ||
            product.category?.toLowerCase().includes('women') ||
            product.tags?.some((tag: string) => tag.toLowerCase().includes('women'))
          );
          break;
        case 'unisex':
          filtered = products.filter((product: any) => 
            product.gender?.toLowerCase() === 'unisex' ||
            product.category?.toLowerCase().includes('unisex') ||
            product.tags?.some((tag: string) => tag.toLowerCase().includes('unisex'))
          );
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [products, currentSubcategory]);

  const getSubcategoryTitle = () => {
    switch (currentSubcategory) {
      case 'men':
        return 'Men\'s Collection';
      case 'women':
        return 'Women\'s Collection';
      case 'unisex':
        return 'Unisex Collection';
      default:
        return 'Shop By Category';
    }
  };

  const getSubcategoryDescription = () => {
    switch (currentSubcategory) {
      case 'men':
        return 'Stylish and comfortable clothing designed for men';
      case 'women':
        return 'Elegant and trendy fashion for women';
      case 'unisex':
        return 'Versatile styles that work for everyone';
      default:
        return 'Browse our collections by category';
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
              href="/shop-by"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !currentSubcategory
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              All Categories
            </a>
            <a
              href="/shop-by?subcategory=men"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSubcategory === 'men'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              Men
            </a>
            <a
              href="/shop-by?subcategory=women"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSubcategory === 'women'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              Women
            </a>
            <a
              href="/shop-by?subcategory=unisex"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSubcategory === 'unisex'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              Unisex
            </a>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductsGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-16">
            <p className="text-[var(--secondary)] text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
