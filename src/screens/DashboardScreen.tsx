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
    },
    {
      id: 6,
      type: 'Algues toxiques',
      location: 'Baie de Saint-Brieuc',
      time: 'Il y a 2 jours',
      status: 'Urgent',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Prolifération d\'algues vertes toxiques. Odeur nauséabonde et risques pour la santé. Zone à éviter absolument.',
      latitude: 48.5333,
      longitude: -2.7500,
      categories: ['Biologique', 'Toxique']
    },
    {
      id: 7,
      type: 'Déchets industriels',
      location: 'Étang de Berre',
      time: 'Il y a 4 jours',
      status: 'En cours',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Rejets industriels visibles à la surface de l\'eau. Forte odeur chimique et mousse suspecte.',
      latitude: 43.4453,
      longitude: 5.1033,
      categories: ['Industriel', 'Chimique']
    },
    {
      id: 8,
      type: 'Microplastiques',
      location: 'Plage de Porticcio',
      time: 'Il y a 1 semaine',
      status: 'En cours',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Concentration importante de microplastiques sur la plage. Petites particules visibles dans le sable sur plusieurs mètres.',
      latitude: 41.8836,
      longitude: 8.7946,
      categories: ['Plastique', 'Microparticules']
    },
    {
      id: 9,
      type: 'Nappes d\'hydrocarbures',
      location: 'Côte Bleue',
      time: 'Il y a 3 jours',
      status: 'Très urgent',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Nappes d\'hydrocarbures observées près de la côte. Probablement dues à un dégazage illégal. Plusieurs oiseaux mazoutés signalés.',
      latitude: 43.3349,
      longitude: 5.1842,
      categories: ['Hydrocarbures', 'Toxique']
    },
    {
      id: 10,
      type: 'Déchets médicaux',
      location: 'Plage de la Pointe Rouge',
      time: 'Hier',
      status: 'Très urgent',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Déchets médicaux échoués sur la plage (seringues, compresses, etc). Zone dangereuse nécessitant une intervention rapide.',
      latitude: 43.2467,
      longitude: 5.3699,
      categories: ['Médical', 'Dangereux']
    },
    {
      id: 11,
      type: 'Pollution sonore',
      location: 'Baie de Calvi',
      time: 'Il y a 5 jours',
      status: 'En cours',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Travaux maritimes générant une forte pollution sonore. Impact important sur les cétacés dans la zone.',
      latitude: 42.5667,
      longitude: 8.7667,
      categories: ['Sonore', 'Industriel']
    },
    {
      id: 12,
      type: 'Contamination fécale',
      location: 'Plage du Prophète',
      time: 'Il y a 8 heures',
      status: 'Urgent',
      imageUrl: '/src/assets/images/logo.png',
      description: 'Contamination de l\'eau par des bactéries fécales. Baignade fortement déconseillée. Forte odeur et couleur suspecte de l\'eau.',
      latitude: 43.2725,
      longitude: 5.3661,
      categories: ['Biologique', 'Sanitaire']
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
      title: 'Nettoyage sous-marin',
      location: 'Calanque de Sormiou, Marseille',
      description: 'Opération de nettoyage sous-marin pour plongeurs certifiés. Venez nous aider à retirer les déchets des fonds marins.',
      month: 'JUL',
      day: '12',
      participants: 6,
      maxParticipants: 12,
      date: new Date('2023-07-12T08:00:00'),
      imageUrl: '/src/assets/images/logo.png',
      organizer: 'Club de Plongée Marseillais',
      latitude: 43.2123,
      longitude: 5.4205
    },
    {
      id: 5,
      title: 'Ramassage de déchets',
      location: 'Plage du Prado, Marseille',
      description: 'Collecte de déchets sur la plage et ses environs. Événement familial, adapté aux enfants accompagnés.',
      month: 'JUN',
      day: '25',
      participants: 24,
      maxParticipants: 40,
      date: new Date('2023-06-25T09:30:00'),
      imageUrl: '/src/assets/images/logo.png',
      organizer: 'Marseille Écologie',
      latitude: 43.2585,
      longitude: 5.3728
    },
    {
      id: 6,
      title: 'Atelier recyclage créatif',
      location: 'Centre culturel de Lacanau',
      description: 'Transformez les déchets plastiques marins en objets d\'art. Atelier créatif pour tous niveaux.',
      month: 'JUL',
      day: '08',
      participants: 13,
      maxParticipants: 25,
      date: new Date('2023-07-08T14:00:00'),
      imageUrl: '/src/assets/images/logo.png',
      organizer: 'Art & Océan',
      latitude: 44.9772,
      longitude: -1.0795
    },
    {
      id: 7,
      title: 'Observation des cétacés',
      location: 'Port de Saint-Jean-Cap-Ferrat',
      description: 'Sortie en mer pour observer les dauphins et apprendre sur leur protection. Réservation obligatoire.',
      month: 'JUL',
      day: '18',
      participants: 8,
      maxParticipants: 15,
      date: new Date('2023-07-18T07:30:00'),
      imageUrl: '/src/assets/images/logo.png',
      organizer: 'SOS Dauphins',
      latitude: 43.6835,
      longitude: 7.3328
    },
    {
      id: 8,
      title: 'Recensement biodiversité',
      location: 'Réserve de Scandola, Corse',
      description: 'Participez au recensement annuel de la biodiversité marine. Formation fournie aux participants.',
      month: 'JUL',
      day: '20',
      participants: 4,
      maxParticipants: 8,
      date: new Date('2023-07-20T08:00:00'),
      imageUrl: '/src/assets/images/logo.png',
      organizer: 'Institut Marin Corse',
      latitude: 42.3584,
      longitude: 8.5508
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