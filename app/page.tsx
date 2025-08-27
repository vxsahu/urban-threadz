"use client";
import React, { useState } from "react";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/ui/Preloader";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div style={{ opacity: showPreloader ? 0 : 1, transition: "opacity 0.3s" }}>
        <Navbar />
        
        <Hero />
        <FeaturedProducts />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <FinalCTA />

        <Footer />
      </div>
    </>
  );
}
