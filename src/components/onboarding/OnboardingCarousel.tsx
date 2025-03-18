import React from 'react'
import { Slide } from '@/types'

interface OnboardingCarouselProps {
  slides: Slide[]
  activeSlide: number
  setActiveSlide: (index: number) => void
}

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ 
  slides, 
  activeSlide, 
  setActiveSlide 
}) => {
  return (
    <div className="w-full max-w-md mb-8">
      <div className="relative h-64 overflow-hidden rounded-xl bg-white bg-opacity-10 p-6">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`absolute inset-0 transition-opacity duration-500 flex flex-col items-center justify-center p-6 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-32 h-32 mb-4" />
            <h2 className="text-xl font-bold mb-2">{slide.title}</h2>
            <p className="text-center opacity-90">{slide.description}</p>
          </div>
        ))}
      </div>
      
      {/* Indicateurs de slide */}
      <div className="flex justify-center space-x-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-3 h-3 rounded-full transition-standard ${
              index === activeSlide ? 'bg-white' : 'bg-white bg-opacity-40'
            }`}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default OnboardingCarousel 