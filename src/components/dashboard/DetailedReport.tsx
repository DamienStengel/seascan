import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Signalement, User } from '@/types';

interface DetailedReportProps {
  report: Signalement;
  onClose: () => void;
}

const DetailedReport: React.FC<DetailedReportProps> = ({ report, onClose }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'photos' | 'map'>('info');
  
  // Données mockées pour les utilisateurs ayant participé
  const participants: User[] = [
    {
      id: '1',
      firstName: 'Julie',
      lastName: 'Dupont',
      email: 'julie@example.com',
      profilePicture: '/src/assets/images/logo.png'
    },
    {
      id: '2',
      firstName: 'Thomas',
      lastName: 'Martin',
      email: 'thomas@example.com',
      profilePicture: '/src/assets/images/logo.png'
    }
  ];
  
  // Fonction pour déterminer la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Très urgent':
        return 'bg-red-500';
      case 'Urgent':
        return 'bg-orange-500';
      case 'En cours':
        return 'bg-blue-500';
      case 'Résolu':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Animation variants pour les transitions d'onglets
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div 
        className="bg-white rounded-xl overflow-hidden w-full max-w-lg max-h-[90vh] flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header avec image principale */}
        <div className="relative h-48">
          <img
            src={report.imageUrl || '/src/assets/images/logo.png'}
            alt={report.type}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
          
          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Informations en overlay sur l'image */}
          <div className="absolute bottom-0 left-0 w-full p-4 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold truncate">{report.type}</h2>
              <span className={`${getStatusColor(report.status)} px-2 py-1 rounded-full text-white text-xs font-medium`}>
                {report.status}
              </span>
            </div>
            <div className="flex items-center text-sm mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{report.location}</span>
            </div>
            <div className="flex items-center text-sm mt-1">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{report.time}</span>
            </div>
          </div>
        </div>
        
        {/* Onglets de navigation */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === 'info' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Informations
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === 'photos' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('photos')}
          >
            Photos
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === 'map' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('map')}
          >
            Carte
          </button>
        </div>
        
        {/* Contenu des onglets */}
        <div className="overflow-y-auto flex-1 p-4">
          {activeTab === 'info' && (
            <motion.div
              key="info-tab"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4"
            >
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">
                  {report.description || 
                    `Ce signalement concerne une zone de ${report.type.toLowerCase()} observée à ${report.location}. 
                    Le problème a été identifié ${report.time.toLowerCase()} et est actuellement classé comme "${report.status}".`
                  }
                </p>
              </div>
              
              {/* Détails supplémentaires */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Caractéristiques</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Type</div>
                    <div className="font-medium">{report.type}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Statut</div>
                    <div className="font-medium">{report.status}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Date de signalement</div>
                    <div className="font-medium">{report.time}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Catégories</div>
                    <div className="font-medium">
                      {report.categories?.length 
                        ? report.categories.join(', ') 
                        : "Plastiques, Déchets divers"}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Participants à la résolution */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Participants</h3>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-700 mb-3">
                    Ces personnes ont rejoint l'action pour ce signalement :
                  </p>
                  
                  <div className="space-y-2">
                    {participants.map(participant => (
                      <div key={participant.id} className="flex items-center bg-white p-2 rounded-lg">
                        <img
                          src={participant.profilePicture}
                          alt={`${participant.firstName} ${participant.lastName}`}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-medium">{participant.firstName} {participant.lastName}</div>
                          <div className="text-xs text-gray-500">A rejoint il y a 3 jours</div>
                        </div>
                      </div>
                    ))}
                    
                    <button className="bg-blue-600 text-white w-full py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors mt-2">
                      Rejoindre l'action
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'photos' && (
            <motion.div
              key="photos-tab"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">Galerie photos</h3>
                
                {/* Images principales */}
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={report.imageUrl || '/src/assets/images/logo.png'} 
                    alt="Photo principale" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Images supplémentaires */}
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5].map(index => (
                    <div key={index} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src="/src/assets/images/logo.png" 
                        alt={`Photo ${index}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Ajouter des photos */}
                <button className="mt-4 bg-blue-600 text-white w-full py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Ajouter des photos
                </button>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'map' && (
            <motion.div
              key="map-tab"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">Localisation</h3>
                
                {/* Carte (placeholder) */}
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <div className="text-sm font-medium">Carte interactive</div>
                    <div className="text-xs">(Fonctionnalité disponible)</div>
                  </div>
                </div>
                
                {/* Coordonnées GPS */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-blue-800 mb-1">Coordonnées</div>
                  <div className="flex items-center text-sm text-blue-600">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>
                      {report.latitude 
                        ? `Lat: ${report.latitude.toFixed(4)}, Long: ${report.longitude?.toFixed(4)}` 
                        : `Position approximative: ${report.location}`
                      }
                    </span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Itinéraire
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Partager
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Footer avec boutons d'action */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Rejoindre l'action
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailedReport; 