import React from 'react'
import { Link } from 'react-router-dom'

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  // Définir les onglets de navigation
  const tabs = [
    {
      id: 'home',
      label: 'Accueil',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/dashboard'
    },
    {
      id: 'map',
      label: 'Carte',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      path: '/dashboard/map'
    },
    {
      id: 'placeholder',
      label: '',
      icon: <div></div>,
      path: ''
    },
    {
      id: 'events',
      label: 'Événements',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      path: '/dashboard/events'
    },
    {
      id: 'profile',
      label: 'Profil',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      path: '/dashboard/profile'
    }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="flex items-center justify-around">
        {tabs.map(tab => (
          <Link
            key={tab.id}
            to={tab.path}
            className={`flex flex-col items-center py-2 flex-1 ${
              tab.id === 'placeholder' ? 'pointer-events-none' : ''
            }`}
            onClick={() => tab.id !== 'placeholder' && onTabChange(tab.id)}
          >
            <div 
              className={`p-1 rounded-full ${
                activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {tab.icon}
            </div>
            {tab.label && (
              <span 
                className={`text-xs mt-1 ${
                  activeTab === tab.id ? 'font-medium text-blue-600' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default BottomNavigation 