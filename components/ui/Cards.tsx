"use client"
import Image from "next/image"
import { Heart, ShoppingCart, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { addToCart, isItemInCart, generateWhatsAppMessage, openWhatsAppChat } from "@/utils/cartService"
import { Product } from "@/utils/productService"

export default function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if item is in cart
    setIsInCart(isItemInCart(product.id));
    
    // Check if item is in wishlist (localStorage)
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsWishlisted(wishlist.includes(product.id));
    }
  }, [product.id]);

  const images = Array.isArray(product.images) ? product.images : []
  const mainImage = images.find((img) => img.isMain) || images[0] || { url: "/logo.png", alt: product.name }

  const handleWishlist = () => {
    if (typeof window === 'undefined') return;
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const newWishlist = isWishlisted 
      ? wishlist.filter((id: string) => id !== product.id)
      : [...wishlist, product.id];
    
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  }

  const handleAddToCartAndOrder = () => {
    // Add to cart first
    addToCart(product, 1);
    setIsInCart(true);
    toast.success("Item added to cart!");
    
    // Then open WhatsApp for ordering
    const message = generateWhatsAppMessage(product, 1);
    openWhatsAppChat(message);
    toast.success("Opening WhatsApp for quick order!");
  }

  const discountPercentage = product.discountedPrice < product.realPrice 
    ? Math.round(((product.realPrice - product.discountedPrice) / product.realPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
      className="group relative bg-[var(--card)] border border-border rounded-2xl shadow-md transition-all duration-300 overflow-hidden w-full mx-auto flex flex-col hover:z-20"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {/* Image */}
      <div className="relative w-full size-60 mb-2 sm:mb-3 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--neutral)] flex items-center justify-center">
        <Image
          src={mainImage.url || "/placeholder.svg"}
          alt={mainImage.alt}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 aspect-square"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {discountPercentage > 0 && (
          <div className="absolute top-1 left-1 bg-[#5C7A4A] text-[var(--background)] text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
            -{discountPercentage}%
          </div>
        )}
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-4">
        <div className="overflow-hidden">
          <h2 className="text-sm sm:text-base font-semibold text-[var(--card-foreground)] mb-1 line-clamp-1 tracking-tight">
            {product.name}
          </h2>
          <p className="text-xs text-[var(--secondary)] mb-1 line-clamp-2">{product.shortDescription}</p>
          
          {/* Sizes Display - Mobile View */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2 sm:hidden">
              {product.sizes.slice(0, 4).map((size) => (
                <span 
                  key={size.name} 
                  className="px-2 py-0.5 bg-[var(--neutral)] text-[var(--neutral-foreground)] text-xs rounded border border-[var(--border)] font-medium"
                >
                  {size.name}
                </span>
              ))}
              {product.sizes.length > 4 && (
                <span className="px-2 py-0.5 bg-[var(--neutral)] text-[var(--neutral-foreground)] text-xs rounded border border-[var(--border)] font-medium">
                  +{product.sizes.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-base sm:text-lg font-bold text-[var(--card-foreground)]">
            ₹
            {typeof product.discountedPrice === "number"
              ? product.discountedPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : "0.00"}
          </span>
          {typeof product.discountedPrice === "number" &&
            typeof product.realPrice === "number" &&
            product.discountedPrice < product.realPrice && (
              <span className="text-xs line-through text-[var(--secondary)]">
                ₹{product.realPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
        </div>
        {!product.isAvailable || product.totalStock === 0 ? (
          <div className="mt-1 text-xs font-semibold text-red-600">Out of Stock</div>
        ) : null}
      </div>
      {/* Animated Actions on Hover */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={showDetails ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 bg-[var(--card)]/95 rounded-xl p-4 flex flex-col justify-between z-20 group-hover:shadow-xl backdrop-blur-xl ${showDetails ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div className="w-full flex-1 flex flex-col mt-1 justify-between">
          <div>
            <h3 className="text-base sm:text-xl font-semibold text-[var(--foreground)] mb-1 text-center">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--secondary)] mb-4 text-center line-clamp-3">
              {product.description}
            </p>
            {product.sizes?.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center mb-2">
                {product.sizes.slice(0, 3).map((size) => (
                  <span
                    key={size.name}
                    className="px-2 py-0.5 bg-[var(--neutral)] rounded-3xl text-xs text-[var(--neutral-foreground)] border border-[var(--border)]"
                  >
                    {size.name}
                  </span>
                ))}
                {product.sizes.length > 3 && (
                  <span className="px-2 py-0.5 bg-zinc-200 rounded-2xl text-xs text-[var(--neutral-foreground)] border border-[var(--border)]">
                    +{product.sizes.length - 3}
                  </span>
                )}
              </div>
            )}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center mb-2">
                {product.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-[var(--foreground)] text-[var(--background)] rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {product.tags.length > 2 && (
                  <span className="px-2 py-0.5 bg-[var(--foreground)] text-[var(--background)] rounded text-xs">
                    +{product.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-1 w-full justify-center mt-auto pt-2">
            {/* Wishlist button - Desktop only, minimal */}
            <button
              className="hidden sm:flex items-center justify-center p-1.5 rounded-full border border-[var(--border)] bg-transparent hover:bg-[var(--neutral)] transition-colors"
              aria-label="Add to wishlist"
              onClick={handleWishlist}
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? "fill-[var(--foreground)] text-[var(--foreground)] animate-pulse" : "text-[var(--secondary)]"} transition-all`}
              />
            </button>
            <Link
              href={product.isAvailable && product.totalStock > 0 ? `/productDetails/${product.id}` : "#"}
              onClick={(e) => {
                if (!product.isAvailable || product.totalStock === 0) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              className={`flex-1 min-w-0 bg-[var(--primary)] text-[var(--primary-foreground)] px-2 py-2 rounded-md hover:bg-[var(--primary)]/90 transition-colors text-xs font-semibold text-center ${
                !product.isAvailable || product.totalStock === 0
                  ? "opacity-60 cursor-not-allowed hover:bg-[var(--primary)]"
                  : ""
              }`}
            >
              View Details
            </Link>
            {/* Combined Add to Cart & WhatsApp Order Button */}
            <button
              className="flex items-center justify-center p-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
              aria-label="Add to cart and order via WhatsApp"
              onClick={handleAddToCartAndOrder}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProductsGrid({ heading, products }: { heading?: string; products?: Product[] }) {
  const [internalProducts, setInternalProducts] = useState<Product[]>([])

  useEffect(() => {
    if (products) {
      setInternalProducts(products)
      return
    }
    
    // Use the product service to get products
    const { getAllProducts, getProductsByCategory } = require('@/utils/productService');
    
    if (heading) {
      setInternalProducts(getProductsByCategory(heading));
    } else {
      setInternalProducts(getAllProducts());
    }
  }, [products, heading]);

  if (!internalProducts.length) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="relative bg-red-900 border border-gray-100 rounded-2xl shadow-sm p-4 h-[340px] w-full max-w-[320px] flex flex-col justify-between animate-pulse transition-all"
          >
            <div className="w-full h-[180px] rounded-xl bg-gray-100 mb-4" />
            <div className="flex-1 flex flex-col justify-end gap-2">
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-100 rounded w-1/4" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-8 w-20 bg-gray-100 rounded-lg" />
              <div className="h-8 w-8 bg-gray-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  let displayProducts = internalProducts
  if (heading) {
    displayProducts = internalProducts.slice(0, 8)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center sm:px-0">
      {displayProducts.slice(0, 8).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
