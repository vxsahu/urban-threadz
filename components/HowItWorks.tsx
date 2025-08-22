"use client";
import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { InstagramIcon, MessageCircleHeart, Truck } from "lucide-react";

// Memoize icons to avoid unnecessary re-renders
const StepIcon = memo(function StepIcon({ idx }: { idx: number }) {
  switch (idx) {
    case 0:
      return <InstagramIcon size={32} strokeWidth={1.5} />;
    case 1:
      return <MessageCircleHeart size={32} strokeWidth={1.5} />;
    case 2:
      return <Truck size={32} strokeWidth={1.5} />;
    default:
      return null;
  }
});

const steps = [
  {
    title: "Choose Your Style",
    desc: "Browse and pick your favorite designs on our instagram page @urban__threadz__",
    action: "Visit Instagram",
    actionHref: "https://www.instagram.com/urban__threadz__/",
    actionTarget: "_blank",
    actionRel: "noopener noreferrer",
  },
  {
    title: "Place Your Order",
    desc: "DM us on Instagram or message on WhatsApp to confirm your size & style.",
    action: "Start Chat",
    actionHref: "https://wa.me/918502913816", 
    actionTarget: "_blank",
    actionRel: "noopener noreferrer",
  },
  {
    title: "Get Delivered Fast",
    desc: "Free shipping across India with 30-day return policy",
    action: "Track Order",
    actionHref: "#track-order", 
    actionTarget: "_self",
    actionRel: "",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // UseCallback for stable handler
  const goToStep = useCallback((idx: number) => {
    setActiveStep(idx);
  }, []);

  // Only auto-advance if the user hasn't interacted recently
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Accessibility: focus management for step change
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (stepRefs.current[activeStep]) {
      // Only scroll into view on mobile for better UX
      if (window.innerWidth < 768) {
        stepRefs.current[activeStep]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeStep]);

  return (
    <section
      className="py-16 min-h-screen flex items-center bg-neutral-950 relative overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2
            id="how-it-works-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            How It Works
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get your perfect streetwear in just 3 simple steps
          </p>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          role="list"
          aria-label="How it works steps"
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              ref={el => {
                stepRefs.current[idx] = el;
              }}
              className={`rounded-xl p-8 border transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                activeStep === idx
                  ? "bg-white shadow border-gray-200"
                  : "bg-neutral-900 border-neutral-800 hover:bg-neutral-800"
              }`}
              onClick={() => goToStep(idx)}
              tabIndex={0}
              role="listitem"
              aria-current={activeStep === idx}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  goToStep(idx);
                }
              }}
            >
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-5 text-2xl border ${
                  activeStep === idx
                    ? "bg-purple-100 text-purple-700 border-purple-200"
                    : "bg-neutral-800 text-gray-300 border-neutral-700"
                }`}
                aria-hidden="true"
              >
                <StepIcon idx={idx} />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 text-center ${
                  activeStep === idx ? "text-neutral-900" : "text-gray-100"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`text-sm mb-6 text-center ${
                  activeStep === idx ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {step.desc}
              </p>
              <a
                className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors duration-150 inline-block w-full text-center ${
                  activeStep === idx
                    ? "bg-purple-700 text-white"
                    : "bg-neutral-800 text-gray-200 hover:bg-neutral-700"
                }`}
                href={step.actionHref}
                target={step.actionTarget}
                rel={step.actionRel}
                tabIndex={-1}
                aria-label={step.action}
              >
                {step.action}
              </a>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 space-x-3" aria-label="Step navigation">
          {steps.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                activeStep === idx
                  ? "bg-purple-700 scale-110"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              onClick={() => goToStep(idx)}
              aria-label={`Go to step ${idx + 1}`}
              aria-current={activeStep === idx}
              type="button"
              tabIndex={0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
