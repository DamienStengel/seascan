import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '@/contexts/AppContext'

const ProfileTab: React.FC = () => {
  const navigate = useNavigate()
  const { state, logout } = useAppContext()
  
  // Fonction pour se déconnecter
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  
  // Données fictives pour les statistiques
  const userStats = {
    signalements: 8,
    participations: 3,
    points: 156,
    niveau: 'Éco-gardien',
    badges: [
      { id: 1, name: 'Premier signalement', icon: '🌊' },
      { id: 2, name: 'Participation événement', icon: '👥' },
      { id: 3, name: 'Explorateur', icon: '🔭' }
    ]
  }
  
  return (
    <div className="py-4 px-4">
      {/* En-tête du profil */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 text-center">
        <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
          {state.user?.profilePicture ? (
            <img 
              src={state.user.profilePicture} 
              alt="Avatar" 
              className="w-full h-full object-cover rounded-full" 
            />
          ) : (
            <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          )}
        </div>
        
        <h1 className="text-xl font-bold mb-1">
          {state.user?.firstName} {state.user?.lastName}
        </h1>
        <div className="text-gray-600 mb-3">{state.user?.email}</div>
        
        <div className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
          {userStats.niveau}
        </div>
      </div>
      
      {/* Statistiques */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h2 className="text-lg font-bold mb-3">Mes statistiques</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{userStats.signalements}</div>
            <div className="text-sm text-gray-600">Signalements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-500">{userStats.participations}</div>
            <div className="text-sm text-gray-600">Événements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{userStats.points}</div>
            <div className="text-sm text-gray-600">Points</div>
          </div>
        </div>
      </div>
      
      {/* Badges */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h2 className="text-lg font-bold mb-3">Mes badges</h2>
        <div className="flex flex-wrap gap-3">
          {userStats.badges.map(badge => (
            <div key={badge.id} className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-1">{badge.icon}</div>
              <div className="text-xs text-gray-700">{badge.name}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Actions */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 space-y-2">
        <button className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
          <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Paramètres
        </button>
        
        <button className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
          <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Aide et support
        </button>
        
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Se déconnecter
        </button>
      </div>
    </div>
  )
}

export default ProfileTab 