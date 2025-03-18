import React from 'react'
import { motion } from 'framer-motion'
import { Signalement, Event } from '@/types'
import MapView from './MapView'

interface MapTabProps {
  reports?: Signalement[];
  events?: Event[];
  onReportClick?: (report: Signalement) => void;
}

const MapTab: React.FC<MapTabProps> = ({ reports = [], events = [], onReportClick }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <motion.div 
      className="h-full flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex-1 relative">
        <MapView 
          reports={reports} 
          events={events}
          onReportClick={onReportClick}
          center={[46.603354, 1.888334]} // Centre approximatif de la France
          zoom={6}
        />
      </div>
    </motion.div>
  )
}

export default MapTab 