// Type pour l'utilisateur
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  profilePicture?: string
  badges?: Badge[]
  stats?: UserStats
}

// Types pour les statistiques utilisateur
export interface UserStats {
  signalements: number
  participations: number
  points: number
  niveau: string
}

// Types pour les badges
export interface Badge {
  id: number
  name: string
  icon: string
  description?: string
  dateObtained?: Date
}

// Types pour les signalements
export interface Signalement {
  id: number
  type: string
  location: string
  time: string
  status: string
  imageUrl?: string
  description?: string
  latitude?: number
  longitude?: number
  categories?: string[]
  urgency?: string
  quantity?: string
  createdBy?: string
  createdAt?: Date
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
  description?: string
  date?: Date
  organizer?: string
  imageUrl?: string
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

// Types pour le formulaire de signalement
export interface SignalementFormData {
  type: string
  description: string
  location: Location
  images: string[]
  urgency: string
  quantity: string
  categories: string[]
}

// Type pour la localisation
export interface Location {
  latitude: number
  longitude: number
  address: string
}

// Types pour la caméra et les photos
export interface Camera {
  type: CameraType
  constraints: MediaStreamConstraints
}

export enum CameraType {
  Front = 'user',
  Back = 'environment'
}

// Type pour les images
export interface Image {
  id: string
  url: string
  thumbnail?: string
  description?: string
}

// Type pour les catégories de déchets
export interface Category {
  id: string
  name: string
  icon: string
  description?: string
}

// Types pour l'état global de l'application
export interface AppState {
  user: User | null
  isAuthenticated: boolean
  activeTab: string
  searchQuery: string
  theme: 'light' | 'dark'
  notifications: Notification[]
}

// Type pour les notifications
export interface Notification {
  id: number
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
  read: boolean
  createdAt: Date
} 