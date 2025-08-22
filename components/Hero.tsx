"use client";
import React from "react";
import { Check, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Scope_One } from "next/font/google";

const scope_one = Scope_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-scope-one',
});

export default function Hero() {
  return (
    <section className="relative min-h-screen max-w-5xl mx-auto justify-center flex flex-col bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Mobile-First Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          
          {/* Product Display Card - Mobile Optimized */}
          <div className="order-1 mb-8 lg:mb-0">
            <div className="relative w-full max-w-sm mx-auto lg:max-w-lg">
              {/* Product Card Container */}
              <div className="relative bg-[#A8B8A0] rounded-3xl p-4 shadow-xl">
                <div className="relative aspect-square bg-[#A8B8A0] rounded-2xl overflow-hidden">
                  <Image 
                    src="/hero-t.png" 
                    alt="Featured Product" 
                    width={500} 
                    height={500}
                    className="w-full h-full object-cover rounded-2xl"
                    priority
                  />
                  
                    {/* NEW STOCK Badge - Top Right */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-white border border-dashed border-[#5C7A4A] shadow-lg">
                        <span className="text-[10px] font-semibold text-[#5C7A4A] tracking-widest leading-tight">NEW</span>
                        <span className="text-[10px] font-semibold text-[#5C7A4A] tracking-widest leading-tight">STOCK</span>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details - Mobile Optimized */}
          <div className="order-2 flex flex-col justify-center space-y-6 lg:space-y-8">
            
            {/* Product Title */}
            <div className="text-center lg:text-left">
              <h1 className={`${scope_one.className} text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight`}>
                  Love others, love <br />
                   yourself, love more.
              </h1>
            </div>
            
            {/* Product Description */}
            <div className="text-center lg:text-left">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                Introducing The Next Threadz Collection — available for preorder February 8–22. Orders ship March 1st.
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mx-auto lg:mx-0">
              <Link
                href="/products"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-[#5C7A4A] text-white font-semibold rounded-xl hover:bg-[#46613a] transition-all duration-200 text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5C7A4A]/50"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Pre-Order Now!
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#5C7A4A]" />
                  Free Shipping
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#5C7A4A]" />
                  30-Day Returns
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#5C7A4A]" />
                  Premium Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
