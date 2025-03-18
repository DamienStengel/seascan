import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '@/contexts/AppContext'
import Header from '@/components/layout/Header'
import Logo from '@/components/common/Logo'

const LoginScreen: React.FC = () => {
  const navigate = useNavigate()
  const { setUser } = useAppContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    // Simuler une connexion (à remplacer par une vraie API)
    if (email && password) {
      setUser({
        id: '1',
        firstName: 'Marie',
        lastName: 'Durand',
        email: email
      })
      navigate('/dashboard')
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* En-tête */}
      <Header 
        title="Connexion" 
        showBackButton 
        onBackClick={() => navigate('/')}
      />
      
      <div className="flex-1 px-6 pt-8 pb-16 overflow-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo size="large" />
        </div>
        
        {/* Formulaire */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              className="input-field"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <button type="button" className="text-sm text-blue-600">
                Mot de passe oublié ?
              </button>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleLogin}
            className="btn btn-primary w-full"
          >
            Se connecter
          </button>
        </form>
        
        {/* Séparateur */}
        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600">ou</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        {/* Autres méthodes de connexion */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center bg-white border border-gray-300 py-3 rounded-lg shadow-sm hover:bg-gray-50 transition-standard">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuer avec Google
          </button>
          
          <button className="w-full flex items-center justify-center bg-black text-white py-3 rounded-lg shadow-sm hover:bg-gray-900 transition-standard">
            <svg className="w-5 h-5 mr-3" fill="white" viewBox="0 0 24 24">
              <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-3.97 2.08-3.368 5.05-3.368 5.05z"/>
            </svg>
            Continuer avec Apple
          </button>
          
          <button className="w-full flex items-center justify-center bg-blue-700 text-white py-3 rounded-lg shadow-sm hover:bg-blue-800 transition-standard">
            <svg className="w-5 h-5 mr-3" fill="white" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continuer avec Facebook
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/register')} 
            className="text-blue-600 font-medium"
          >
            Nouveau ? Créer un compte
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen 