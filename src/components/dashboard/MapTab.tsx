import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Signalement, Event } from '@/types'
import MapView from './MapView'

interface MapTabProps {
  reports?: Signalement[];
  events?: Event[];
  onReportClick?: (report: Signalement) => void;
}

const MapTab: React.FC<MapTabProps> = ({ reports = [], events = [], onReportClick }) => {
  // État pour les filtres
  const [filters, setFilters] = useState({
    showReports: true,
    showEvents: true
  });

  // Filtrer les données selon les filtres actifs
  const filteredReports = filters.showReports ? reports : [];
  const filteredEvents = filters.showEvents ? events : [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Fonction pour basculer un filtre
  const toggleFilter = (filterName: 'showReports' | 'showEvents') => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };
  
  return (
    <motion.div 
      className="h-full flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Contrôles de filtre */}
      <div className="bg-white p-3 shadow-sm mb-2 flex items-center justify-center space-x-3 z-20">
        <button 
          className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center ${
            filters.showReports 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => toggleFilter('showReports')}
        >
          <span className={`w-3 h-3 rounded-full mr-2 ${filters.showReports ? 'bg-white' : 'bg-gray-400'}`}></span>
          Signalements ({reports.length})
        </button>
        <button 
          className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center ${
            filters.showEvents 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => toggleFilter('showEvents')}
        >
          <span className={`w-3 h-3 rounded-full mr-2 ${filters.showEvents ? 'bg-white' : 'bg-gray-400'}`}></span>
          Événements ({events.length})
        </button>
      </div>

      <div className="flex-1 relative">
        <MapView 
          reports={filteredReports} 
          events={filteredEvents}
          onReportClick={onReportClick}
          center={[46.603354, 1.888334]} // Centre approximatif de la France
          zoom={6}
        />
      </div>
    </motion.div>
  )
}

export default MapTab 