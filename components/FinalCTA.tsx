"use client";
import React from "react";
import { ShoppingCart, Truck, Shield, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[var(--accent)] via-[#6366f1]/70 to-[#0f172a] text-background overflow-hidden">
      {/* Decorative Blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-[var(--primary)] opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-32 right-0 w-96 h-96 bg-[#6366f1] opacity-10 rounded-full blur-3xl animate-pulse" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex flex-col items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-[var(--primary)] font-bold text-sm tracking-widest uppercase shadow-sm border border-white/10 backdrop-blur">
            <Sparkles className="w-4 h-4 animate-bounce" />
            New Drop Live
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-2 tracking-tight drop-shadow-lg">
            Unleash Your <span className="text-[var(--primary)]">Street Style</span>
          </h2>
          <p className="text-lg lg:text-xl mb-2 max-w-2xl mx-auto opacity-90 font-medium">
            Not just tees. <span className="text-[var(--primary)] font-semibold">Statement pieces</span> for the bold. <br className="hidden sm:inline" />
            Join the tribe. Stand out. Wear your vibe.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-10 py-4 bg-[var(--primary)] text-white font-bold rounded-2xl shadow-xl hover:bg-white hover:text-[var(--primary)] transition-all duration-300 text-xl tracking-wide border-2 border-[var(--primary)] hover:scale-105 focus:ring-4 focus:ring-[var(--primary)]/30"
          >
            <ShoppingCart className="w-6 h-6 mr-3" />
            Shop the Drop
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-[var(--primary)] transition-all duration-300 text-xl tracking-wide shadow-lg hover:scale-105"
          >
            Browse Collection
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-base opacity-90 font-medium">
          <span className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[var(--primary)]" />
            Free Shipping
          </span>
          <span className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[var(--primary)]" />
            Secure Payment
          </span>
          <span className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-[var(--primary)]" />
            Easy Returns
          </span>
        </div>
        {/* Subtle animated underline */}
        <div className="mx-auto mt-8 w-32 h-2 bg-gradient-to-r from-[var(--primary)]/60 via-white/60 to-[var(--primary)]/60 rounded-full blur-sm animate-pulse" />
      </div>
    </section>
  );
}
