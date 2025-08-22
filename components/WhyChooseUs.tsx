"use client";
import { Shield, Truck, RotateCcw } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "Premium Quality",
      description: "We source only the finest materials and work with skilled artisans to create clothing that lasts. Every piece is crafted with attention to detail and quality assurance."
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Enjoy free shipping on all orders with no minimum purchase required. Fast and reliable delivery to your doorstep with real-time tracking."
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "Not satisfied? No problem. We offer hassle-free returns within 30 days. Your satisfaction is our top priority with easy exchange and refund process."
    }
  ];

  return (
    <section className="py-16 bg-[var(--background)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--neutral)] to-[var(--neutral)]/50">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-[var(--foreground)] rounded-full flex items-center justify-center">
                    <span className="text-[var(--background)] text-4xl font-bold">UT</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                    UrbanThread
                  </h3>
                  <p className="text-[var(--secondary)]">
                    Premium Clothing & Fashion
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-[var(--accent)] rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[var(--accent)] rounded-full opacity-10"></div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-4">
                Why Choose UrbanThread?
              </h2>
              <p className="text-lg text-[var(--secondary)] leading-relaxed">
                We're not just another clothing brand. We're a community of fashion enthusiasts 
                who believe in quality, style, and sustainability. Here's what makes us different.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-[var(--primary-foreground)]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--secondary)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
