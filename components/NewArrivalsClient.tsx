"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/ui/Footer';
import { ProductsGrid } from '@/components/ui/Cards';
import { getAllProducts, Product } from '@/utils/productService';

interface NewArrivalsClientProps {
  subcategory?: string;
}

export default function NewArrivalsClient({ subcategory }: NewArrivalsClientProps) {
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
        case 'this-week':
          filtered = products.filter((product: any) => {
            const productDate = new Date(product.createdAt || Date.now());
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return productDate >= weekAgo;
          });
          break;
        case 'this-month':
          filtered = products.filter((product: any) => {
            const productDate = new Date(product.createdAt || Date.now());
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return productDate >= monthAgo;
          });
          break;
        case 'trending':
          filtered = products.filter((product: any) => 
            product.rating >= 4.5 || product.isTrending
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
      case 'this-week':
        return 'This Week';
      case 'this-month':
        return 'This Month';
      case 'trending':
        return 'Trending';
      default:
        return 'New Arrivals';
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
            Discover the latest additions to our collection
          </p>
        </div>

        {/* Subcategory Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <a
              href="/new-arrivals"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !currentSubcategory
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              All New Arrivals
            </a>
            <a
              href="/new-arrivals?subcategory=this-week"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSubcategory === 'this-week'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              This Week
            </a>
            <a
              href="/new-arrivals?subcategory=this-month"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSubcategory === 'this-month'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              This Month
            </a>
            <a
              href="/new-arrivals?subcategory=trending"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSubcategory === 'trending'
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--neutral)] text-[var(--neutral-foreground)] hover:bg-[var(--neutral)]/80'
              }`}
            >
              Trending
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
