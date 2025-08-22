"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/ui/Footer';
import { ProductsGrid } from '@/components/ui/Cards';
import { getAllProducts, Product } from '@/utils/productService';

interface CollectionsClientProps {
  subcategory?: string;
}

export default function CollectionsClient({ subcategory }: CollectionsClientProps) {
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
        case 'graphic-tees':
          filtered = products.filter((product: any) => 
            product.category?.toLowerCase().includes('graphic') ||
            product.name?.toLowerCase().includes('graphic')
          );
          break;
        case 'minimalist':
          filtered = products.filter((product: any) => 
            product.category?.toLowerCase().includes('minimalist') ||
            product.name?.toLowerCase().includes('minimalist') ||
            product.tags?.some((tag: string) => tag.toLowerCase().includes('minimalist'))
          );
          break;
        case 'vintage':
          filtered = products.filter((product: any) => 
            product.category?.toLowerCase().includes('vintage') ||
            product.name?.toLowerCase().includes('vintage') ||
            product.tags?.some((tag: string) => tag.toLowerCase().includes('vintage'))
          );
          break;
        case 'limited-edition':
          filtered = products.filter((product: any) => 
            product.isLimitedEdition || 
            product.name?.toLowerCase().includes('limited') ||
            product.tags?.some((tag: string) => tag.toLowerCase().includes('limited'))
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
      case 'graphic-tees':
        return 'Graphic Tees';
      case 'minimalist':
        return 'Minimalist';
      case 'vintage':
        return 'Vintage';
      case 'limited-edition':
        return 'Limited Edition';
      default:
        return 'Collections';
    }
  };

  const getSubcategoryDescription = () => {
    switch (currentSubcategory) {
      case 'graphic-tees':
        return 'Bold designs and artistic expressions on comfortable tees';
      case 'minimalist':
        return 'Clean lines and simple elegance for everyday wear';
      case 'vintage':
        return 'Timeless classics with a retro twist';
      case 'limited-edition':
        return 'Exclusive pieces with unique designs and limited availability';
      default:
        return 'Explore our curated collections of premium clothing';
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
              href="/collections"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !currentSubcategory
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              All Collections
            </a>
            <a
              href="/collections?subcategory=graphic-tees"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSubcategory === 'graphic-tees'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              Graphic Tees
            </a>
            <a
              href="/collections?subcategory=minimalist"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSubcategory === 'minimalist'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              Minimalist
            </a>
            <a
              href="/collections?subcategory=vintage"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSubcategory === 'vintage'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              Vintage
            </a>
            <a
              href="/collections?subcategory=limited-edition"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSubcategory === 'limited-edition'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              Limited Edition
            </a>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductsGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-16">
            <p className="text-[var(--secondary)] text-lg">
              No products found in this collection.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
