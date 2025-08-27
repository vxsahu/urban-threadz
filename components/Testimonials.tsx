"use client";
import React from "react";

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      {/* Blurred Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/samurai.webp')",
          filter: "blur(20px) brightness(0.2)",
          transform: "scale(1.1)"
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            What Our Customers Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { 
              quote: "The quality is 🔥 and print is superb.", 
              name: "Raj", 
              location: "Delhi",
              image: "/m.png"
            },
            { 
              quote: "Unique designs I couldn't find anywhere else.", 
              name: "Aditi", 
              location: "Pune",
              image: "/f.png"
            }
          ].map((testimonial, index) => (
            <div 
              key={index} 
              className="backdrop-blur-xl bg-black/40 border border-white/30 rounded-2xl p-6 shadow-2xl hover:bg-black/50 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src={testimonial.image} 
                    alt={`${testimonial.name}`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/40 shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white text-lg mb-2 font-semibold drop-shadow-md leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-white/90 text-sm font-medium drop-shadow-sm">
                    - {testimonial.name}, {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
