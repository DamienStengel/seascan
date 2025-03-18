import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '@/contexts/AppContext'
import Header from '@/components/layout/Header'
import BottomNavigation from '@/components/layout/BottomNavigation'
import HomeTab from '@/components/dashboard/HomeTab'
import MapTab from '@/components/dashboard/MapTab'
import EventsTab from '@/components/dashboard/EventsTab'
import ProfileTab from '@/components/dashboard/ProfileTab'
import ReportForm from '@/components/dashboard/ReportForm'
import DetailedReport from '@/components/dashboard/DetailedReport'
import { Signalement } from '@/types'

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate()
  const { state, setActiveTab, setSearchQuery } = useAppContext()
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showReportForm, setShowReportForm] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Signalement | null>(null)
  
  // Données mockées pour les signalements
  const recentReports: Signalement[] = [
    {
      id: 1,
      type: 'Déversement de carburant',
      location: 'Plage de la Salie',
      time: 'Il y a 2 heures',
      status: 'Très urgent',
      imageUrl: '/assets/images/logo.png',
      description: 'Déversement important de carburant observé près de la côte. Une nappe noire s\'étend sur environ 50 mètres. Risque majeur pour les oiseaux marins et la faune aquatique.',
      latitude: 44.6205,
      longitude: -1.1887,
      categories: ['Toxique', 'Hydrocarbures']
    },
    {
      id: 2,
      type: 'Déchets plastiques',
      location: 'Côte des Basques',
      time: 'Il y a 5 heures',
      status: 'Urgent',
      imageUrl: '/assets/images/logo.png',
      description: 'Accumulation de déchets plastiques sur la plage, principalement des bouteilles et des emballages. Zone d\'environ 20m² très polluée.',
      latitude: 43.4789,
      longitude: -1.5686,
      categories: ['Plastique', 'Déchets divers']
    },
    {
      id: 3,
      type: 'Filets abandonnés',
      location: 'Port de Capbreton',
      time: 'Hier',
      status: 'En cours',
      imageUrl: '/assets/images/logo.png',
      description: 'Filets de pêche abandonnés ou perdus, emmêlés autour des rochers. Danger potentiel pour la faune marine, risque d\'enchevêtrement.',
      latitude: 43.6435,
      longitude: -1.4468,
      categories: ['Matériel de pêche', 'Filets']
    }
  ];
  
  // Fonction pour gérer le changement d'onglet
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigateToTab(tab);
  };
  
  // Fonction pour naviguer vers l'onglet correspondant
  const navigateToTab = (tab: string) => {
    switch (tab) {
      case 'home':
        navigate('/dashboard');
        break;
      case 'map':
        navigate('/dashboard/map');
        break;
      case 'events':
        navigate('/dashboard/events');
        break;
      case 'profile':
        navigate('/dashboard/profile');
        break;
    }
  };
  
  // Gestion des clics sur les signalements
  const handleReportClick = (report: Signalement) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };
  
  // Fonction pour ouvrir le formulaire de signalement
  const handleAddReport = () => {
    setShowReportForm(true);
  };
  
  // Fonction pour fermer le formulaire de signalement
  const handleCloseReportForm = () => {
    setShowReportForm(false);
  };
  
  // Fonction pour soumettre un signalement
  const handleSubmitReport = (reportData: any) => {
    console.log('Rapport soumis:', reportData);
    setShowReportForm(false);
    // Ici on pourrait ajouter le nouveau signalement aux données mockées
  };
  
  // Animation pour les transitions de page
  const pageVariants = {
    initial: { 
      opacity: 0,
      x: 30
    },
    in: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    out: { 
      opacity: 0,
      x: -30,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };
  
  // Fonction pour fermer le modal de détails
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* En-tête avec barre de recherche */}
      <Header 
        showSearch 
        searchValue={state.searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {/* Contenu principal */}
      <main className="flex-1 overflow-auto pb-16">
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <motion.div
                  key="home"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  className="h-full"
                >
                  <HomeTab onReportClick={handleReportClick} reports={recentReports} />
                </motion.div>
              } 
            />
            <Route 
              path="/map" 
              element={
                <motion.div
                  key="map"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  className="h-full"
                >
                  <MapTab onReportClick={handleReportClick} reports={recentReports} />
                </motion.div>
              } 
            />
            <Route 
              path="/events" 
              element={
                <motion.div
                  key="events"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  className="h-full"
                >
                  <EventsTab />
                </motion.div>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <motion.div
                  key="profile"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  className="h-full"
                >
                  <ProfileTab />
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
      
      {/* Navigation du bas avec bouton d'ajout intégré */}
      <BottomNavigation 
        activeTab={state.activeTab} 
        onTabChange={handleTabChange}
        onAddReport={handleAddReport}
      />
      
      {/* Modal de détails d'un signalement */}
      {showDetailModal && selectedReport && (
        <DetailedReport 
          report={selectedReport} 
          onClose={handleCloseDetailModal}
        />
      )}
      
      {/* Formulaire de signalement */}
      {showReportForm && (
        <ReportForm 
          onClose={handleCloseReportForm} 
          onSubmit={handleSubmitReport} 
        />
      )}
    </div>
  )
}

export default DashboardScreen 