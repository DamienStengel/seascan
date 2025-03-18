import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppContext } from '@/contexts/AppContext'
import Header from '@/components/layout/Header'
import BottomNavigation from '@/components/layout/BottomNavigation'
import HomeTab from '@/components/dashboard/HomeTab'
import MapTab from '@/components/dashboard/MapTab'
import EventsTab from '@/components/dashboard/EventsTab'
import ProfileTab from '@/components/dashboard/ProfileTab'
import ReportForm from '@/components/dashboard/ReportForm'
import DetailedReport from '@/components/dashboard/DetailedReport'
import { Signalement, Event } from '@/types'

const DashboardScreen: React.FC = () => {
  const { state, setActiveTab, setSearchQuery } = useAppContext()
  const [showReportForm, setShowReportForm] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Signalement | null>(null)
  
  // Données mockées pour les signalements
  const recentReports: Signalement[] = [
    {
      id: 1,
      type: 'Déversement de carburant',
      location: 'Plage de la Salie',
      time: 'Il y a 2 heures',
      status: 'Très urgent',
      imageUrl: '/src/assets/images/logo.png',
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
      imageUrl: '/src/assets/images/logo.png',
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
      imageUrl: '/src/assets/images/logo.png',
      description: 'Filets de pêche abandonnés ou perdus, emmêlés autour des rochers. Danger potentiel pour la faune marine, risque d\'enchevêtrement.',
      latitude: 43.6435,
      longitude: -1.4468,
      categories: ['Matériel de pêche', 'Filets']
    },
    {
      id: 4,
      type: 'Pollution chimique',
      location: 'Port de Marseille',
      time: 'Il y a 3 jours',
      status: 'En cours',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Traces de pollution chimique dans l\'eau, mousse blanchâtre et odeur caractéristique. Plusieurs poissons morts observés à proximité.',
      latitude: 43.2965,
      longitude: 5.3698,
      categories: ['Chimique', 'Toxique']
    },
    {
      id: 5,
      type: 'Macro-déchets',
      location: 'Plage de l\'Espiguette',
      time: 'Il y a 1 jour',
      status: 'Urgent',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Grande quantité de déchets plastiques et autres matériaux rejetés par la mer suite à une tempête. Plusieurs centaines de mètres sont concernés.',
      latitude: 43.5219,
      longitude: 4.1369,
      categories: ['Plastique', 'Déchets divers']
    }
  ];
  
  // Données mockées pour les événements
  const eventsData: Event[] = [
    {
      id: 1,
      title: 'Nettoyage de plage',
      location: 'Plage du Grand Crohot, Aquitaine',
      description: 'Rejoignez-nous pour une grande opération de nettoyage de la plage. Matériel fourni et collation offerte pour tous les participants.',
      month: 'JUN',
      day: '15',
      participants: 17,
      maxParticipants: 30,
      date: new Date('2023-06-15T09:00:00'),
      imageUrl: '/src/assets/images/logo.png',
      organizer: 'Association Mer Propre',
      latitude: 44.7372,
      longitude: -1.2347
    },
    {
      id: 2,
      title: 'Sensibilisation aux océans',
      location: 'Médiathèque de Biarritz',
      description: 'Conférence et atelier sur l\'impact des microplastiques dans l\'océan. Accessible à tous, entrée libre.',
      month: 'JUN',
      day: '22',
      participants: 9,
      maxParticipants: 20,
      date: new Date('2023-06-22T14:30:00'),
      imageUrl: '/src/assets/images/logo.png',
      organizer: 'Fondation Océans Bleus',
      latitude: 43.4832,
      longitude: -1.5586
    },
    {
      id: 3,
      title: 'Formation reconnaissance déchets',
      location: 'Maison de la Nature, Arcachon',
      description: 'Apprenez à identifier les différents types de pollution marine et à les signaler efficacement sur notre application.',
      month: 'JUL',
      day: '05',
      participants: 5,
      maxParticipants: 15,
      date: new Date('2023-07-05T10:00:00'),
      imageUrl: '/src/assets/images/logo.png',
      organizer: 'OcéaPulse Team',
      latitude: 44.6611,
      longitude: -1.1681
    }
  ];
  
  // Fonction pour gérer le changement d'onglet
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  
  // Fonction pour afficher le formulaire de signalement
  const handleAddReport = () => {
    setShowReportForm(true)
  }
  
  // Fonction pour fermer le formulaire de signalement
  const handleCloseReportForm = () => {
    setShowReportForm(false)
  }
  
  // Gestion des clics sur les signalements
  const handleReportClick = (report: Signalement) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };
  
  // Fonction pour fermer le modal de détail
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };
  
  // Fonction pour traiter la soumission du formulaire
  const handleSubmitReport = (reportData: any) => {
    console.log('Nouveau signalement:', reportData)
    // Traitement des données du signalement (à implémenter plus tard)
    setShowReportForm(false)
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
          <Route path="/" element={<HomeTab reports={recentReports} onReportClick={handleReportClick} />} />
          <Route path="/map" element={<MapTab reports={recentReports} events={eventsData} onReportClick={handleReportClick} />} />
          <Route path="/events" element={<EventsTab events={eventsData} />} />
          <Route path="/profile" element={<ProfileTab />} />
        </Routes>
      </main>
      
      {/* Navigation du bas avec bouton d'ajout */}
      <BottomNavigation 
        activeTab={state.activeTab} 
        onTabChange={handleTabChange} 
        onAddReport={handleAddReport}
      />
      
      {/* Formulaire de signalement */}
      {showReportForm && (
        <ReportForm 
          onClose={handleCloseReportForm} 
          onSubmit={handleSubmitReport} 
        />
      )}
      
      {/* Modal de détails d'un signalement */}
      {showDetailModal && selectedReport && (
        <DetailedReport 
          report={selectedReport} 
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  )
}

export default DashboardScreen 