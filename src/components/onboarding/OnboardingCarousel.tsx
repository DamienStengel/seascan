import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Slide } from '@/types'

interface OnboardingCarouselProps {
    slides: Slide[]
    activeSlide: number
    setActiveSlide: (index: number) => void
}

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({
                                                                   slides = [],
                                                                   activeSlide = 0,
                                                                   setActiveSlide
                                                               }) => {
    // Check if slides is undefined or empty
    if (!slides || slides.length === 0) {
        return <div className="text-center p-8">No slides available</div>;
    }

    // Animation variants
    const slideVariants = {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, x: -100, transition: { duration: 0.3 } }
    }

    // Function to navigate to next slide
    const nextSlide = () => {
        setActiveSlide((activeSlide + 1) % slides.length)
    }

    // Function to navigate to previous slide
    const prevSlide = () => {
        setActiveSlide((activeSlide - 1 + slides.length) % slides.length)
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Main Carousel */}
            <div className="relative h-80 overflow-hidden rounded-xl bg-white bg-opacity-10 backdrop-blur-sm">
                {/* Navigation arrows */}
                <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors focus:outline-none"
                    onClick={prevSlide}
                    aria-label="Diapositive précédente"
                >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors focus:outline-none"
                    onClick={nextSlide}
                    aria-label="Diapositive suivante"
                >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Slides */}
                <AnimatePresence mode="wait">
                    {slides.map((slide, index) => (
                        activeSlide === index && (
                            <motion.div
                                key={slide.id}
                                className="absolute inset-0 flex flex-col items-center justify-center p-6"
                                variants={slideVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                {/* Reduced padding and size */}
                                <div className="bg-white/10 rounded-lg p-3 mb-5">
                                    <div className="w-28 h-28 flex items-center justify-center">
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="w-24 h-24 object-contain filter brightness-0 invert"
                                        />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold mb-3 text-center">{slide.title}</h2>
                                <p className="text-center text-white/90 max-w-xs">{slide.description}</p>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>

            {/* Indicators */}
            <div className="flex justify-center space-x-3 mt-6">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === activeSlide
                                ? 'bg-white scale-125'
                                : 'bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Aller à la diapositive ${index + 1}`}
                    />
                ))}
            </div>

            {/* Progress text */}
            <div className="text-center mt-3 text-white/70 text-sm">
                {activeSlide + 1} sur {slides.length}
            </div>
        </div>
    )
}

export default OnboardingCarousel