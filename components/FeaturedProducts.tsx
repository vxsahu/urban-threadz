"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { ProductsGrid } from "@/components/ui/Cards";
import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <section className="max-w-5xl mx-auto py-16 lg:py-20 bg-muted/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-8 bg-[#5C7A4A] mr-2" />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
              Trending Drops
            </h2>
          </div>
          <Link 
            href="/products" 
            className="inline-flex items-center px-4 py-2 border border-[var(--primary)] text-[var(--primary)] font-medium rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
          >
            View All
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        <ProductsGrid />
      </div>
    </section>
  );
}
