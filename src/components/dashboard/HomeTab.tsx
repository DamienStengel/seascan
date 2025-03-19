import React from 'react'
import { motion } from 'framer-motion'
import { Signalement, Event } from '@/types'
import { useNavigate } from 'react-router-dom'

interface HomeTabProps {
  reports?: Signalement[];
  onReportClick?: (report: Signalement) => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ reports, onReportClick }) => {
  const navigate = useNavigate();
  
  // Si aucun signalement n'est fourni, utiliser des données fictives
  const recentReports: Signalement[] = reports || [
    {
      id: 1,
      type: 'Déversement de carburant',
      location: 'Plage de la Salie',
      time: 'Il y a 2 heures',
      status: 'Très urgent',
      imageUrl: '/assets/images/logo.png'
    },
    {
      id: 2,
      type: 'Déchets plastiques',
      location: 'Côte des Basques',
      time: 'Il y a 5 heures',
      status: 'Urgent',
      imageUrl: '/assets/images/logo.png'
    },
    {
      id: 3,
      type: 'Filets abandonnés',
      location: 'Port de Capbreton',
      time: 'Hier',
      status: 'En cours',
      imageUrl: '/assets/images/logo.png'
    }
  ]
  
  // Trier les signalements par date (plus récent en premier) et limiter à 5 résultats
  const sortedReports = [...recentReports].sort((a, b) => {
    // Si les objets ont une propriété date, l'utiliser
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    
    // Sinon, trier en fonction du champ 'time' (approximatif)
    const timeA = a.time || '';
    const timeB = b.time || '';
    
    // Plus la durée est courte, plus c'est récent
    if (timeA.includes('heures') && timeB.includes('heures')) {
      const hoursA = parseInt(timeA.match(/\d+/)?.[0] || '0');
      const hoursB = parseInt(timeB.match(/\d+/)?.[0] || '0');
      return hoursA - hoursB;
    }
    
    // Priorité par type de durée (heures > jour > semaine)
    if (timeA.includes('heures') && !timeB.includes('heures')) return -1;
    if (!timeA.includes('heures') && timeB.includes('heures')) return 1;
    
    if (timeA.includes('jour') && timeB.includes('jour')) {
      const daysA = parseInt(timeA.match(/\d+/)?.[0] || '0');
      const daysB = parseInt(timeB.match(/\d+/)?.[0] || '0');
      return daysA - daysB;
    }
    
    return 0;
  }).slice(0, 5);
  
  // Données fictives pour les événements à venir
  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: 'Nettoyage de plage',
      location: 'Plage du Grand Crohot',
      month: 'JUN',
      day: '15',
      participants: 17,
      maxParticipants: 30
    },
    {
      id: 2,
      title: 'Sensibilisation aux océans',
      location: 'Médiathèque de Biarritz',
      month: 'JUN',
      day: '22',
      participants: 9,
      maxParticipants: 20
    }
  ]
  
  // Fonction pour déterminer la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Très urgent':
        return 'bg-red-500'
      case 'Urgent':
        return 'bg-orange-500'
      case 'En cours':
        return 'bg-blue-500'
      case 'Résolu':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  // Handler pour cliquer sur un signalement
  const handleReportClick = (report: Signalement) => {
    if (onReportClick) {
      onReportClick(report);
    }
  };
  
  // Fonction pour naviguer vers tous les signalements
  const handleViewAllReports = () => {
    navigate('/all-reports');
  };
  
  // Fonction pour naviguer vers la page des événements
  const handleViewAllEvents = () => {
    navigate('/events');
  };
  
  return (
    <motion.div 
      className="py-4 px-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section impact collectif avec animation */}
      <motion.section 
        className="mb-2"
        variants={itemVariants}
      >
        <h2 className="text-xl font-bold mb-3">Impact collectif</h2>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">127</div>
              <div className="text-sm text-gray-600">Signalements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-500">43</div>
              <div className="text-sm text-gray-600">Actions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">512kg</div>
              <div className="text-sm text-gray-600">Déchets collectés</div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Section signalements récents avec animation */}
      <motion.section 
        className="mb-2"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Signalements récents</h2>
          <button 
            className="text-blue-600 text-sm font-medium"
            onClick={handleViewAllReports}
          >
            Voir tous
          </button>
        </div>
        
        <div className="space-y-3">
          {sortedReports.map(report => (
            <motion.div 
              key={report.id} 
              className="bg-white rounded-xl shadow-sm p-3 flex items-center cursor-pointer transform hover:translate-x-1 transition-transform"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleReportClick(report)}
            >
              <img 
                src={report.imageUrl || '/assets/images/plastique.jpg'} 
                alt={report.type} 
                className="w-16 h-16 rounded-lg object-cover mr-3" 
              />
              <div className="flex-1">
                <h3 className="font-semibold">{report.type}</h3>
                <div className="text-sm text-gray-600">{report.location}</div>
                <div className="text-xs text-gray-500">{report.time}</div>
              </div>
              <div className={`${getStatusColor(report.status)} text-white text-xs py-1 px-2 rounded-full`}>
                {report.status}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* Section événements à venir avec animation */}
      <motion.section
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Événements à venir</h2>
          <button 
            className="text-blue-600 text-sm font-medium"
            onClick={handleViewAllEvents}
          >
            Voir tous
          </button>
        </div>
        
        <div className="space-y-3">
          {upcomingEvents.map(event => (
            <motion.div 
              key={event.id} 
              className="bg-white rounded-xl shadow-sm p-3 flex"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-2 mr-3 w-16">
                <div className="text-sm font-bold text-blue-600">{event.month}</div>
                <div className="text-xl font-bold">{event.day}</div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{event.title}</h3>
                <div className="text-sm text-gray-600">{event.location}</div>
                <div className="mt-1 flex items-center">
                  <div className="bg-gray-200 h-2 flex-1 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-blue-600 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(event.participants / event.maxParticipants) * 100}%` 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                  <span className="text-xs text-gray-600 ml-2">
                    {event.participants}/{event.maxParticipants}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}

export default HomeTab 