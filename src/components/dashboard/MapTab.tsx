import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Signalement } from '@/types'
import MapView from './MapView'

interface MapTabProps {
  reports?: Signalement[];
  onReportClick?: (report: Signalement) => void;
}

const MapTab: React.FC<MapTabProps> = ({ reports = [], onReportClick }) => {
  const [showMapPlaceholder, setShowMapPlaceholder] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Activer le mode "loaded" après 2 secondes (simulation de chargement)
  setTimeout(() => {
    setMapLoaded(true);
  }, 2000);
  
  // Handler pour charger la carte réelle
  const handleLoadRealMap = () => {
    setShowMapPlaceholder(false);
  };
  
  return (
    <motion.div 
      className="h-full flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {showMapPlaceholder ? (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <div className="bg-blue-50 rounded-xl p-6 text-center max-w-md">
            <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h2 className="text-xl font-bold mb-2">Carte des signalements</h2>
            <p className="text-gray-600 mb-4">
              {mapLoaded ? (
                "La carte interactive des signalements est maintenant disponible. Vous pouvez y visualiser tous les signalements à proximité."
              ) : (
                "Chargement de la carte interactive des signalements..."
              )}
            </p>
            
            {mapLoaded && (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-inner">
                  <div className="text-sm text-gray-500 mb-2">Fonctionnalités disponibles :</div>
                  <ul className="text-sm text-left space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Carte interactive avec filtres
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Navigation vers les signalements
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Visualisation des détails des signalements
                    </li>
                  </ul>
                </div>
                
                <motion.button
                  className="bg-blue-600 text-white w-full py-2 rounded-lg font-medium"
                  onClick={handleLoadRealMap}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Accéder à la carte
                </motion.button>
              </div>
            )}
            
            {!mapLoaded && (
              <div className="flex justify-center">
                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 relative">
          <MapView 
            reports={reports} 
            onReportClick={onReportClick}
            center={[46.603354, 1.888334]} // Centre approximatif de la France
            zoom={6}
          />
        </div>
      )}
    </motion.div>
  )
}

export default MapTab 