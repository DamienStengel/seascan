import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '@/contexts/AppContext'
import { mockAPI } from '@/assets/mock-data'
import Header from '@/components/layout/Header'
import BottomNavigation from '@/components/layout/BottomNavigation'
import HomeTab from '@/components/dashboard/HomeTab'
import MapTab from '@/components/dashboard/MapTab'
import EventsTab from '@/components/dashboard/EventsTab'
import ProfileTab from '@/components/dashboard/ProfileTab'
import DetailedReport from '@/components/dashboard/DetailedReport'
import ReportForm from '@/components/dashboard/ReportForm'
import { Signalement, Event } from '@/types'

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate()
  const { state, setActiveTab, setSearchQuery } = useAppContext()
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showReportForm, setShowReportForm] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Signalement | null>(null)
  const [reports, setReports] = useState<Signalement[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Charger les données mockées au chargement
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // Charger les signalements
        const reportsData = await mockAPI.getReports()
        setReports(reportsData)
        // Charger les événements
        const eventsData = await mockAPI.getEvents()
        setEvents(eventsData)
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
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

  // Gestion de l'ouverture du formulaire de signalement
  const handleAddClick = () => {
    setShowReportForm(true);
  };

  // Fermeture du formulaire de signalement
  const handleFormClose = () => {
    setShowReportForm(false);
  };

  // Soumission du formulaire de signalement
  const handleFormSubmit = async (reportData: any) => {
    try {
      setIsLoading(true);
      // Ajouter le signalement via l'API mockée
      const newReport = await mockAPI.addReport(reportData);
      // Mettre à jour la liste des signalements
      setReports(prev => [newReport, ...prev]);
      setShowReportForm(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du signalement:', error);
    } finally {
      setIsLoading(false);
    }
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
  
  // Afficher un état de chargement si nécessaire
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin w-12 h-12 mx-auto mb-3 text-blue-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="text-xl font-medium text-blue-600">Chargement...</div>
          </div>
        </div>
      </div>
    );
  }
  
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
                  <HomeTab onReportClick={handleReportClick} reports={reports} />
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
                  <MapTab onReportClick={handleReportClick} reports={reports} />
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
                  <EventsTab events={events} />
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
                  <ProfileTab user={state.user} />
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
        onAddClick={handleAddClick}
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
          onClose={handleFormClose} 
          onSubmit={handleFormSubmit} 
        />
      )}
    </div>
  )
}

export default DashboardScreen 