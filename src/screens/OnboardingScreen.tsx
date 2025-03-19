import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '@/components/common/Logo'
import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel'
import { Slide } from '@/types'

// Import your SVG assets
import signalerSvg from '@/assets/svg/photo.svg'
import participerSvg from '@/assets/svg/trash-bag.svg'
import impactSvg from '@/assets/svg/stat.svg'

const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)

  // Données du carrousel avec références aux SVG
  const slides: Slide[] = [
    {
      id: 1,
      title: "Signalez la pollution marine",
      description: "Prenez une photo, localisez et partagez pour alerter la communauté",
      image: signalerSvg
    },
    {
      id: 2,
      title: "Participez aux actions",
      description: "Rejoignez des événements de nettoyage près de chez vous",
      image: participerSvg
    },
    {
      id: 3,
      title: "Suivez votre impact",
      description: "Visualisez votre contribution et gagnez des récompenses",
      image: impactSvg
    }
  ]

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  }

  const buttonVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.4 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
  }

  return (
      <motion.div
          className="flex flex-col h-screen bg-gradient-to-b from-blue-600 to-teal-500 text-white overflow-hidden"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
      >
        {/* Header avec logo plus petit - reduced padding */}
        <header className="pt-4 px-4 flex items-center">
          <Logo size="medium" className="mr-2" />
          <h1 className="text-2xl font-bold">O'sea Pulse</h1>
        </header>

        <div className="flex-1 flex flex-col px-4 justify-between py-4 overflow-hidden">
          {/* Carousel section */}
          <div className="flex-1 flex items-center justify-center">
            <OnboardingCarousel
                slides={slides}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
          </div>

          {/* Sous-titre et boutons */}
          <div className="mt-4 text-center">
            <div className="space-y-3 max-w-xs mx-auto">
              <motion.button
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-white text-blue-600 font-medium py-3 rounded-lg shadow-lg transition-standard"
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
              >
                Commencer
              </motion.button>

              <motion.button
                  onClick={() => navigate('/login')}
                  className="w-full border border-white/50 text-white font-medium py-3 rounded-lg transition-standard"
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
              >
                Déjà membre ? Se connecter
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
  )
}

export default OnboardingScreen