"use client";
import React from "react";
import { ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-16 lg:py-20 bg-[var(--accent)] text-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Find Your Style?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of customers who love our premium streetwear collection
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--primary)] font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Shop Now
          </Link>
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-[var(--primary)] transition-all duration-300 text-lg"
          >
            Browse Collection
          </Link>
        </div>
        <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-80">
          <span className="flex items-center gap-1">
            <Truck className="w-4 h-4" />
            Free Shipping
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            Secure Payment
          </span>
          <span className="flex items-center gap-1">
            <RotateCcw className="w-4 h-4" />
            Easy Returns
          </span>
        </div>
      </div>
    </section>
  );
}
