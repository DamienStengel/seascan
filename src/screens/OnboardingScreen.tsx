import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel'
import Logo from '@/components/common/Logo'
import { Slide } from '@/types'

const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)
  
  // Données du carrousel
  const slides: Slide[] = [
    {
      id: 1,
      title: "Signalez la pollution marine",
      description: "Prenez une photo, localisez et partagez pour alerter la communauté",
      image: "/api/placeholder/240/240?text=Signaler"
    },
    {
      id: 2,
      title: "Participez aux actions",
      description: "Rejoignez des événements de nettoyage près de chez vous",
      image: "/api/placeholder/240/240?text=Participer"
    },
    {
      id: 3,
      title: "Suivez votre impact",
      description: "Visualisez votre contribution et gagnez des récompenses",
      image: "/api/placeholder/240/240?text=Impact"
    }
  ]

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-600 to-teal-500 text-white">
      <div className="flex flex-col items-center justify-center flex-1 px-6">
        {/* Logo */}
        <Logo size="large" className="mb-8" />
        
        {/* Titre et sous-titre */}
        <h1 className="text-3xl font-bold mb-2">OceaPulse</h1>
        <p className="text-lg mb-8 opacity-90">Ensemble pour des océans plus propres</p>
        
        {/* Carrousel */}
        <OnboardingCarousel 
          slides={slides} 
          activeSlide={activeSlide} 
          setActiveSlide={setActiveSlide} 
        />
        
        {/* Boutons */}
        <button 
          onClick={() => navigate('/dashboard')} 
          className="w-4/5 max-w-xs bg-white text-blue-600 font-medium py-3 rounded-lg shadow-lg mb-4 transition-standard"
        >
          Commencer
        </button>
        <button 
          onClick={() => navigate('/login')} 
          className="text-white text-base transition-standard"
        >
          Déjà membre ? Se connecter
        </button>
      </div>
    </div>
  )
}

export default OnboardingScreen 