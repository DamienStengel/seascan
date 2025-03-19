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
import AllReportsTab from '@/components/dashboard/AllReportsTab'
import { Signalement, Event } from '@/types'

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate()
  const { state, setActiveTab, setSearchQuery } = useAppContext()
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showReportForm, setShowReportForm] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Signalement | null>(null)
  
  // Fonction pour obtenir l'image appropriée selon le type de signalement
  const getImageForReportType = (type: string): string => {
    type = type.toLowerCase();
    
    if (type.includes('plastique') || type.includes('déchet') || type.includes('micro')) {
      return '/src/assets/images/plastique.jpg';
    } else if (type.includes('hydrocarbure') || type.includes('marée') || type.includes('carburant')) {
      return '/src/assets/images/marée-noire.jpg';
    } else if (type.includes('filet') || type.includes('pêche')) {
      return '/src/assets/images/filet.jpg';
    } else if (type.includes('chimique') || type.includes('algue') || type.includes('biologique')) {
      return '/src/assets/images/chimique.jpg';
    }
    
    // Image par défaut selon les catégories
    return '/src/assets/images/plastique.jpg';
  };
  
  // Fonction pour obtenir l'image appropriée selon le type d'événement
  const getImageForEventType = (title: string): string => {
    title = title.toLowerCase();
    
    if (title.includes('nettoyage') || title.includes('collecte') || title.includes('ramassage')) {
      return '/src/assets/images/plastique.jpg';
    } else if (title.includes('sensibilisation') || title.includes('formation') || title.includes('atelier')) {
      return '/src/assets/images/chimique.jpg';
    } else if (title.includes('observation') || title.includes('cétacés')) {
      return '/src/assets/images/marée-noire.jpg';
    }
    
    // Image par défaut
    return '/src/assets/images/plastique.jpg';
  };
  
  // Données mockées pour les signalements avec images mises à jour
  const recentReports: Signalement[] = [
    {
      id: 1,
      type: 'Déversement de carburant',
      location: 'Plage de la Salie',
      time: 'Il y a 2 heures',
      status: 'Très urgent',
      imageUrl: '/src/assets/images/marée-noire.jpg',
      description: 'Déversement important de carburant observé près de la côte. Une nappe noire s\'étend sur environ 50 mètres. Risque majeur pour les oiseaux marins et la faune aquatique.',
      latitude: 44.6205,
      longitude: -1.1887,
      categories: ['Toxique', 'Hydrocarbures'],
      createdAt: new Date('2023-06-15T15:30:00')
    },
    {
      id: 2,
      type: 'Déchets plastiques',
      location: 'Côte des Basques',
      time: 'Il y a 5 heures',
      status: 'Urgent',
      imageUrl: '/src/assets/images/plastique.jpg',
      description: 'Accumulation de déchets plastiques sur la plage, principalement des bouteilles et des emballages. Zone d\'environ 20m² très polluée.',
      latitude: 43.4789,
      longitude: -1.5686,
      categories: ['Plastique', 'Déchets divers'],
      createdAt: new Date('2023-06-15T12:15:00')
    },
    {
      id: 3,
      type: 'Filets abandonnés',
      location: 'Port de Capbreton',
      time: 'Hier',
      status: 'En cours',
      imageUrl: '/src/assets/images/filet.jpg',
      description: 'Filets de pêche abandonnés ou perdus, emmêlés autour des rochers. Danger potentiel pour la faune marine, risque d\'enchevêtrement.',
      latitude: 43.6435,
      longitude: -1.4468,
      categories: ['Matériel de pêche', 'Filets'],
      createdAt: new Date('2023-06-14T10:45:00')
    },
    {
      id: 4,
      type: 'Pollution chimique',
      location: 'Port de Marseille',
      time: 'Il y a 3 jours',
      status: 'En cours',
      imageUrl: '/src/assets/images/chimique.jpg',
      description: 'Traces de pollution chimique dans l\'eau, mousse blanchâtre et odeur caractéristique. Plusieurs poissons morts observés à proximité.',
      latitude: 43.2965,
      longitude: 5.3698,
      categories: ['Chimique', 'Toxique'],
      createdAt: new Date('2023-06-12T16:20:00')
    },
    {
      id: 5,
      type: 'Macro-déchets',
      location: 'Plage de l\'Espiguette',
      time: 'Il y a 1 jour',
      status: 'Urgent',
      imageUrl: '/src/assets/images/plastique.jpg',
      description: 'Grande quantité de déchets plastiques et autres matériaux rejetés par la mer suite à une tempête. Plusieurs centaines de mètres sont concernés.',
      latitude: 43.5219,
      longitude: 4.1369,
      categories: ['Plastique', 'Déchets divers'],
      createdAt: new Date('2023-06-14T09:10:00')
    },
    {
      id: 6,
      type: 'Algues toxiques',
      location: 'Baie de Saint-Brieuc',
      time: 'Il y a 2 jours',
      status: 'Urgent',
      imageUrl: '/src/assets/images/chimique.jpg',
      description: 'Prolifération d\'algues vertes toxiques. Odeur nauséabonde et risques pour la santé. Zone à éviter absolument.',
      latitude: 48.5333,
      longitude: -2.7500,
      categories: ['Biologique', 'Toxique'],
      createdAt: new Date('2023-06-13T11:30:00')
    },
    {
      id: 7,
      type: 'Déchets industriels',
      location: 'Étang de Berre',
      time: 'Il y a 4 jours',
      status: 'En cours',
      imageUrl: '/src/assets/images/chimique.jpg',
      description: 'Rejets industriels visibles à la surface de l\'eau. Forte odeur chimique et mousse suspecte.',
      latitude: 43.4453,
      longitude: 5.1033,
      categories: ['Industriel', 'Chimique'],
      createdAt: new Date('2023-06-11T14:15:00')
    },
    {
      id: 8,
      type: 'Microplastiques',
      location: 'Plage de Porticcio',
      time: 'Il y a 1 semaine',
      status: 'En cours',
      imageUrl: '/src/assets/images/plastique.jpg',
      description: 'Concentration importante de microplastiques sur la plage. Petites particules visibles dans le sable sur plusieurs mètres.',
      latitude: 41.8836,
      longitude: 8.7946,
      categories: ['Plastique', 'Microparticules'],
      createdAt: new Date('2023-06-08T10:00:00')
    },
    {
      id: 9,
      type: 'Nappes d\'hydrocarbures',
      location: 'Côte Bleue',
      time: 'Il y a 3 jours',
      status: 'Très urgent',
      imageUrl: '/src/assets/images/marée-noire.jpg',
      description: 'Nappes d\'hydrocarbures observées près de la côte. Probablement dues à un dégazage illégal. Plusieurs oiseaux mazoutés signalés.',
      latitude: 43.3349,
      longitude: 5.1842,
      categories: ['Hydrocarbures', 'Toxique'],
      createdAt: new Date('2023-06-12T09:45:00')
    },
    {
      id: 10,
      type: 'Déchets médicaux',
      location: 'Plage de la Pointe Rouge',
      time: 'Hier',
      status: 'Très urgent',
      imageUrl: '/src/assets/images/plastique.jpg',
      description: 'Déchets médicaux échoués sur la plage (seringues, compresses, etc). Zone dangereuse nécessitant une intervention rapide.',
      latitude: 43.2467,
      longitude: 5.3699,
      categories: ['Médical', 'Dangereux'],
      createdAt: new Date('2023-06-14T16:30:00')
    },
    {
      id: 11,
      type: 'Pollution sonore',
      location: 'Baie de Calvi',
      time: 'Il y a 5 jours',
      status: 'En cours',
      imageUrl: '/src/assets/images/chimique.jpg',
      description: 'Travaux maritimes générant une forte pollution sonore. Impact important sur les cétacés dans la zone.',
      latitude: 42.5667,
      longitude: 8.7667,
      categories: ['Sonore', 'Industriel'],
      createdAt: new Date('2023-06-10T13:20:00')
    },
    {
      id: 12,
      type: 'Marée noire',
      location: 'Plage du Prophète',
      time: 'Il y a 8 heures',
      status: 'Urgent',
      imageUrl: '/src/assets/images/marée-noire.jpg',
      description: 'Petite marée noire détectée. Baignade fortement déconseillée. Forte odeur et couleur suspecte de l\'eau.',
      latitude: 43.2725,
      longitude: 5.3661,
      categories: ['Hydrocarbures', 'Toxique'],
      createdAt: new Date('2023-06-15T09:00:00')
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
      imageUrl: '/src/assets/images/plastique.jpg',
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
      imageUrl: '/src/assets/images/chimique.jpg',
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
      imageUrl: '/src/assets/images/chimique.jpg',
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
      imageUrl: '/src/assets/images/plastique.jpg',
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
      imageUrl: '/src/assets/images/plastique.jpg',
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
      imageUrl: '/src/assets/images/marée-noire.jpg',
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
      imageUrl: '/src/assets/images/chimique.jpg',
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
      imageUrl: '/src/assets/images/plastique.jpg',
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
            <Route 
              path="/all-reports" 
              element={
                <motion.div
                  key="all-reports"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  className="h-full"
                >
                  <AllReportsTab reports={recentReports} onReportClick={handleReportClick} />
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