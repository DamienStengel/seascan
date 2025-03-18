// Type pour l'utilisateur
export interface User {
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  profilePicture?: string
}

// Types pour les signalements
export interface Signalement {
  id: number
  type: string
  location: string
  time: string
  status: 'Très urgent' | 'Urgent' | 'En cours' | 'Résolu' | string
  imageUrl?: string
}

// Types pour les événements
export interface Event {
  id: number
  title: string
  location: string
  month: string
  day: string
  participants: number
  maxParticipants: number
  date?: Date
  description?: string
}

// Type pour les slides du carrousel
export interface Slide {
  id: number
  title: string
  description: string
  image: string
}

// Types pour les écrans
export type ScreenType = 'onboarding' | 'login' | 'register' | 'dashboard'

// Types pour les onglets du tableau de bord
export type TabType = 'home' | 'map' | 'events' | 'profile'

// Type pour les statuts d'authentification
export type AuthStatus = 'idle' | 'loading' | 'success' | 'error' 