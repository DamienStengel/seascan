import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppContext } from '@/contexts/AppContext'
import Header from '@/components/layout/Header'
import BottomNavigation from '@/components/layout/BottomNavigation'
import HomeTab from '@/components/dashboard/HomeTab'
import MapTab from '@/components/dashboard/MapTab'
import EventsTab from '@/components/dashboard/EventsTab'
import ProfileTab from '@/components/dashboard/ProfileTab'

const DashboardScreen: React.FC = () => {
  const { state, setActiveTab, setSearchQuery } = useAppContext()
  const [showReportModal, setShowReportModal] = useState(false)
  
  // Fonction pour gérer le changement d'onglet
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  
  // Fonction pour afficher le modal de signalement
  const handleAddReport = () => {
    setShowReportModal(true)
  }
  
  // Fonction pour fermer le modal de signalement
  const handleCloseReportModal = () => {
    setShowReportModal(false)
  }
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* En-tête avec barre de recherche */}
      <Header 
        showSearch 
        searchValue={state.searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {/* Contenu principal */}
      <main className="flex-1 overflow-auto pb-16">
        <Routes>
          <Route path="/" element={<HomeTab />} />
          <Route path="/map" element={<MapTab />} />
          <Route path="/events" element={<EventsTab />} />
          <Route path="/profile" element={<ProfileTab />} />
        </Routes>
      </main>
      
      {/* Navigation du bas avec bouton d'ajout */}
      <BottomNavigation 
        activeTab={state.activeTab} 
        onTabChange={handleTabChange} 
        onAddReport={handleAddReport}
      />
      
      {/* Modal de signalement (affiché conditionnellement) */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">Nouveau signalement</h2>
            <p className="mb-6">Cette fonctionnalité sera disponible prochainement.</p>
            <button 
              onClick={handleCloseReportModal}
              className="btn btn-primary w-full"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardScreen 