import React, { createContext, useContext, useState, ReactNode } from 'react'
import { AppState, User, Notification } from '@/types'

interface AppContextType {
  state: AppState
  setActiveTab: (tab: string) => void
  setSearchQuery: (query: string) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void
  markNotificationAsRead: (id: number) => void
}

const defaultAppState: AppState = {
  user: {
    id: 'mock-user-1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    profilePicture: '/api/placeholder/100/100?text=JD',
    badges: [
      { id: 1, name: 'Protecteur des océans', icon: '🌊', dateObtained: new Date(2023, 5, 15) },
      { id: 2, name: 'Observateur débutant', icon: '👁️', dateObtained: new Date(2023, 6, 20) }
    ],
    stats: {
      signalements: 12,
      participations: 5,
      points: 320,
      niveau: 'Débutant'
    }
  },
  isAuthenticated: true,
  activeTab: 'home',
  searchQuery: '',
  theme: 'light',
  notifications: [
    {
      id: 1,
      type: 'info',
      message: 'Bienvenue sur OcéaPulse !',
      read: true,
      createdAt: new Date(2023, 8, 1)
    },
    {
      id: 2,
      type: 'success',
      message: 'Votre signalement a été pris en compte',
      read: false,
      createdAt: new Date(2023, 8, 15)
    },
    {
      id: 3,
      type: 'warning',
      message: 'Un nouvel événement a lieu près de chez vous',
      read: false,
      createdAt: new Date(2023, 8, 20)
    }
  ]
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(defaultAppState)

  const setActiveTab = (tab: string) => {
    setState(prev => ({ ...prev, activeTab: tab }))
  }

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }))
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulation d'une vérification d'authentification
    if (email && password) {
      // Mode mockée : on accepte n'importe quelle combinaison avec email et password
      setState(prev => ({ 
        ...prev, 
        isAuthenticated: true,
        user: defaultAppState.user // Utiliser l'utilisateur par défaut
      }))
      return true
    }
    return false
  }

  const logout = () => {
    setState(prev => ({ 
      ...prev, 
      isAuthenticated: false,
      user: null
    }))
  }

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: state.notifications.length + 1, // Générer un ID simple
      createdAt: new Date(),
      read: false
    }
    
    setState(prev => ({ 
      ...prev, 
      notifications: [...prev.notifications, newNotification] 
    }))
  }

  const markNotificationAsRead = (id: number) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    }))
  }

  const contextValue: AppContextType = {
    state,
    setActiveTab,
    setSearchQuery,
    login,
    logout,
    addNotification,
    markNotificationAsRead
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export default AppContext 