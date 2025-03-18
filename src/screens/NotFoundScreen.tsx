import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '@/components/common/Logo'

const NotFoundScreen: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center p-6">
      <Logo size="large" className="mb-8" />
      
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary w-full"
          >
            Retourner à l'accueil
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline w-full"
          >
            Retourner à la page précédente
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundScreen 