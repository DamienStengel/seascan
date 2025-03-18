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
import { Signalement, Event } from '@/types'

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
    },
    {
      id: 6,
      type: 'Pollution sonore',
      location: 'Baie de Saint-Brieuc',
      time: 'Il y a 2 jours',
      status: 'En cours',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Travaux maritimes générant une forte pollution sonore. Impact potentiel sur les mammifères marins dans la zone.',
      latitude: 48.5833,
      longitude: -2.85,
      categories: ['Sonore', 'Industriel']
    },
    {
      id: 7,
      type: 'Marée noire',
      location: 'Côte d\'Azur',
      time: 'Il y a 6 heures',
      status: 'Très urgent',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Petite marée noire détectée, probablement due à un dégazage sauvage. Urgence d\'intervention pour limiter les dégâts environnementaux.',
      latitude: 43.7031,
      longitude: 7.2661,
      categories: ['Hydrocarbures', 'Toxique']
    },
    {
      id: 8,
      type: 'Algues invasives',
      location: 'Côte Bretonne',
      time: 'Il y a 4 jours',
      status: 'Urgent',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Prolifération importante d\'algues vertes sur la plage. Odeur nauséabonde et risques sanitaires potentiels.',
      latitude: 48.6392,
      longitude: -2.0122,
      categories: ['Biologique', 'Eutrophisation']
    },
    {
      id: 9,
      type: 'Conteneur perdu',
      location: 'Large de Dunkerque',
      time: 'Il y a 1 semaine',
      status: 'En cours',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Conteneur de transport perdu en mer, contenant potentiellement des produits dangereux. Surveillance en cours.',
      latitude: 51.0667,
      longitude: 2.3833,
      categories: ['Industriel', 'Transport']
    },
    {
      id: 10,
      type: 'Déchets de pêche',
      location: 'Côte Vendéenne',
      time: 'Il y a 3 jours',
      status: 'En cours',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Accumulation de matériel de pêche abandonné (filets, lignes, flotteurs) sur une zone étendue. Danger pour la faune marine.',
      latitude: 46.4425,
      longitude: -1.8037,
      categories: ['Matériel de pêche', 'Filets']
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
    },
    {
      id: 4,
      title: 'Collecte et tri des déchets',
      location: 'Port de Capbreton',
      description: 'Opération de ramassage des déchets autour du port, suivie d\'un atelier de tri et de sensibilisation au recyclage.',
      month: 'JUL',
      day: '18',
      participants: 12,
      maxParticipants: 25,
      date: new Date('2023-07-18T09:30:00'),
      imageUrl: '/src/assets/images/logo.png',
      organizer: 'Capbreton Environnement',
      latitude: 43.6428,
      longitude: -1.4455
    },
    {
      id: 5,
      title: 'Opération Calanques Propres',
      location: 'Calanque de Sormiou, Marseille',
      description: 'Grande journée de nettoyage des calanques, à pied et en kayak. Venez nombreux pour préserver ce site exceptionnel.',
      month: 'JUN',
      day: '29',
      participants: 23,
      maxParticipants: 40,
      date: new Date('2023-06-29T08:30:00'),
      imageUrl: '/src/assets/images/logo.png',
      organizer: 'Marseille Environnement',
      latitude: 43.2102,
      longitude: 5.4218
    },
    {
      id: 6,
      title: 'Observation des cétacés',
      location: 'Port de Saint-Tropez',
      description: 'Sortie en mer pour observer les dauphins et sensibiliser à la préservation de leur habitat. Réservation obligatoire.',
      month: 'JUL',
      day: '10',
      participants: 8,
      maxParticipants: 12,
      date: new Date('2023-07-10T07:00:00'),
      imageUrl: '/src/assets/images/logo.png',
      organizer: 'SOS Dauphins',
      latitude: 43.2726,
      longitude: 6.6406
    },
    {
      id: 7,
      title: 'Atelier écosystème littoral',
      location: 'Plage de Pampelonne, Saint-Tropez',
      description: 'Découverte de l\'écosystème du littoral méditerranéen. Animation spéciale pour les enfants suivie d\'une action de nettoyage.',
      month: 'JUL',
      day: '22',
      participants: 14,
      maxParticipants: 30,
      date: new Date('2023-07-22T10:00:00'),
      imageUrl: '/src/assets/images/logo.png',
      organizer: 'Éducation Environnement 83',
      latitude: 43.2272,
      longitude: 6.6648
    },
    {
      id: 8,
      title: 'Journée sans plastique',
      location: 'Plage de Deauville',
      description: 'Sensibilisation aux alternatives au plastique à usage unique. Distribution de kits zéro déchet et ramassage de mégots.',
      month: 'AUG',
      day: '05',
      participants: 11,
      maxParticipants: 50,
      date: new Date('2023-08-05T14:00:00'),
      imageUrl: '/src/assets/images/logo.png',
      organizer: 'Normandie ZéroPlastic',
      latitude: 49.3536,
      longitude: 0.0622
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
                  <MapTab 
                    onReportClick={handleReportClick} 
                    reports={recentReports}
                    events={eventsData}
                  />
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
                  <EventsTab events={eventsData} />
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