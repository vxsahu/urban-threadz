"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { addToCart, isItemInCart } from '@/utils/cartService';
import { Product } from '@/utils/productService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/ui/Footer';

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  // Check if item is in cart and wishlist on mount
  useState(() => {
    setIsInCart(isItemInCart(product.id));
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsWishlisted(wishlist.includes(product.id));
    }
  });

  const handleWishlist = () => {
    if (typeof window === 'undefined') return;
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const newWishlist = isWishlisted 
      ? wishlist.filter((id: string) => id !== product.id)
      : [...wishlist, product.id];
    
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      toast.error("Please select a size");
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    setIsInCart(true);
    toast.success("Item added to cart!");
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const mainImage = product.images.find(img => img.isMain) || product.images[0];
  const discountPercentage = product.discountedPrice < product.realPrice 
    ? Math.round(((product.realPrice - product.discountedPrice) / product.realPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--neutral)]">
              <Image
                src={mainImage?.url || "/placeholder.svg"}
                alt={mainImage?.alt || product.name}
                fill
                className="object-cover"
              />
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-[var(--foreground)] text-[var(--background)] text-sm font-bold px-3 py-1 rounded-full">
                  -{discountPercentage}%
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">{product.name}</h1>
              <p className="text-[var(--secondary)] text-lg">{product.shortDescription}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.avgRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-[var(--border)]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[var(--secondary)]">
                {product.avgRating} ({product.numReviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[var(--foreground)]">
                ₹{product.discountedPrice.toLocaleString('en-IN')}
              </span>
              {product.discountedPrice < product.realPrice && (
                <span className="text-xl line-through text-[var(--secondary)]">
                  ₹{product.realPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Description</h3>
              <p className="text-[var(--secondary)] leading-relaxed">{product.description}</p>
            </div>

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => handleSizeSelect(size.name)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedSize === size.name
                          ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]'
                          : 'border-[var(--border)] text-[var(--foreground)] hover:border-[var(--foreground)]'
                      } ${size.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={size.stock === 0}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 border border-[var(--border)] rounded-lg disabled:opacity-50"
                >
                  -
                </button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  className="p-2 border border-[var(--border)] rounded-lg disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.isAvailable || product.totalStock === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
                  isInCart
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'bg-[var(--foreground)] text-[var(--background)] hover:opacity-90'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ShoppingCart className="w-5 h-5" />
                {isInCart ? 'In Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={handleWishlist}
                className={`p-3 border border-[var(--border)] rounded-lg transition-colors ${
                  isWishlisted
                    ? 'bg-[var(--foreground)] text-[var(--background)]'
                    : 'text-[var(--foreground)] hover:border-[var(--foreground)]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[var(--secondary)]" />
                <span className="text-sm text-[var(--secondary)]">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[var(--secondary)]" />
                <span className="text-sm text-[var(--secondary)]">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-[var(--secondary)]" />
                <span className="text-sm text-[var(--secondary)]">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
