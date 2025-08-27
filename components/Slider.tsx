/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect, TouchEvent } from 'react'
import Image from 'next/image'

interface Slide {
  id: number
  image: string
  title: string
  description: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/gator.webp',
    title: 'New Collection',
    description: 'Discover our latest arrivals'
  },
  {
    id: 2,
    image: '/hang-out.webp',
    title: 'Summer Sale',
    description: 'Up to 50% off on selected items'
  },
  {
    id: 3,
    image: '/dark-shadow.webp',
    title: 'Limited Edition',
    description: 'Exclusive designs for a limited time'
  },
  {
    id: 4,
    image: '/maratha.jpg',
    title: 'Limited Edition',
    description: 'Exclusive designs for a limited time'
  },
]

export default function ProductSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }
  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStart) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    setTouchStart(null)
  }
  return (
    <div
      className="relative h-[380px] xs:h-[420px] sm:h-[460px] md:h-[600px] w-full overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-gray-900/60 to-gray-700/40"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${index === currentSlide
            ? 'translate-x-0 z-10'
            : index < currentSlide
              ? '-translate-x-full z-0'
              : 'translate-x-full z-0'
            }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className={`object-cover transition-transform duration-700 ${index === currentSlide ? 'scale-105' : 'scale-100'
              }`}
            priority={index === 0}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none rounded-b-2xl" />

        </div>
      ))}

      <div className="absolute bottom-6 sm:bottom-8 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 sm:space-x-4 md:space-x-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentSlide(index)
                setTimeout(() => setIsAnimating(false), 500)
              }
            }}
            className={`transition-all duration-200 rounded-full border border-white/40 shadow
              ${index === currentSlide ? 'bg-white/90 scale-110' : 'bg-white/40'}
              w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className={`block rounded-full ${index === currentSlide ? 'bg-black w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3' : 'bg-black/40 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5'}`}></span>
          </button>
        ))}
      </div>
    </div>
  )
}