import React, { createContext, useContext, useState, ReactNode } from 'react'

// Types d'état global
interface AppState {
  currentScreen: string
  searchQuery: string
  activeTab: string
  user: User | null
  isAuthenticated: boolean
}

// Type pour l'utilisateur
interface User {
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  profilePicture?: string
}

// Interface du contexte
interface AppContextInterface {
  state: AppState
  setCurrentScreen: (screen: string) => void
  setSearchQuery: (query: string) => void
  setActiveTab: (tab: string) => void
  setUser: (user: User | null) => void
  logout: () => void
}

// Valeurs par défaut du contexte
const defaultAppContext: AppContextInterface = {
  state: {
    currentScreen: 'onboarding',
    searchQuery: '',
    activeTab: 'home',
    user: null,
    isAuthenticated: false
  },
  setCurrentScreen: () => {},
  setSearchQuery: () => {},
  setActiveTab: () => {},
  setUser: () => {},
  logout: () => {}
}

// Création du contexte
const AppContext = createContext<AppContextInterface>(defaultAppContext)

// Hook personnalisé pour utiliser le contexte
export const useAppContext = () => useContext(AppContext)

// Provider du contexte
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    currentScreen: 'onboarding',
    searchQuery: '',
    activeTab: 'home',
    user: null,
    isAuthenticated: false
  })

  // Fonctions pour mettre à jour l'état
  const setCurrentScreen = (screen: string) => {
    setState(prev => ({ ...prev, currentScreen: screen }))
  }

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }))
  }

  const setActiveTab = (tab: string) => {
    setState(prev => ({ ...prev, activeTab: tab }))
  }

  const setUser = (user: User | null) => {
    setState(prev => ({ 
      ...prev, 
      user, 
      isAuthenticated: !!user 
    }))
  }

  const logout = () => {
    setState(prev => ({ 
      ...prev, 
      user: null, 
      isAuthenticated: false 
    }))
  }

  // Valeur du contexte
  const contextValue = {
    state,
    setCurrentScreen,
    setSearchQuery,
    setActiveTab,
    setUser,
    logout
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
} 