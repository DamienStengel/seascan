import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Signalement, User } from '@/types';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Composant pour centrer la carte sur une position
const SetViewOnChange = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

interface DetailedReportProps {
  report: Signalement;
  onClose: () => void;
}

const DetailedReport: React.FC<DetailedReportProps> = ({ report, onClose }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'photos' | 'map'>('info');
  const [mapReady, setMapReady] = useState(false);
  
  // Données mockées pour les utilisateurs ayant participé
  const participants: User[] = [
    {
      id: '1',
      firstName: 'Julie',
      lastName: 'Dupont',
      email: 'julie@example.com',
      profilePicture: '/assets/images/logo.png'
    },
    {
      id: '2',
      firstName: 'Thomas',
      lastName: 'Martin',
      email: 'thomas@example.com',
      profilePicture: '/assets/images/logo.png'
    }
  ];
  
  /*
  // Données mockées pour les commentaires
  const comments = [
    {
      id: 1,
      user: {
        id: 'u1',
        name: 'Claire Martin',
        role: 'Expert',
        profilePicture: '/assets/images/logo.png'
      },
      text: 'J\'ai observé plusieurs cas similaires dans cette zone. Nous devons agir rapidement pour éviter une propagation.',
      date: new Date('2023-06-15T16:30:00'),
      likes: 5
    },
    {
      id: 2,
      user: {
        id: 'u2',
        name: 'Thomas Dubois',
        role: 'Modérateur',
        profilePicture: '/assets/images/logo.png'
      },
      text: 'Une équipe de nettoyage a été mobilisée et devrait intervenir demain matin. Nous tiendrons la communauté informée.',
      date: new Date('2023-06-15T17:45:00'),
      likes: 8
    }
  ];
  */
  
  // Créer l'icône de marqueur pour la carte
  const locationMarkerIcon = divIcon({
    className: 'custom-div-icon',
    html: `<div class="location-marker">
            <div class="pulse"></div>
            <div class="pin"></div>
           </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  
  // Injecter le CSS nécessaire pour les marqueurs de carte
  useEffect(() => {
    if (!document.getElementById('location-marker-styles')) {
      const style = document.createElement('style');
      style.id = 'location-marker-styles';
      style.innerHTML = `
        .location-marker {
          position: relative;
        }
        .location-marker .pin {
          width: 20px;
          height: 20px;
          border-radius: 50% 50% 50% 0;
          background: #2563eb;
          position: absolute;
          transform: rotate(-45deg);
          left: 50%;
          top: 50%;
          margin: -10px 0 0 -10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }
        .location-marker .pin::after {
          content: '';
          width: 12px;
          height: 12px;
          margin: 4px 0 0 4px;
          background: white;
          position: absolute;
          border-radius: 50%;
        }
        .location-marker .pulse {
          background: rgba(37, 99, 235, 0.3);
          border-radius: 50%;
          height: 30px;
          width: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin: -15px 0 0 -15px;
          transform: rotateX(55deg);
          z-index: -1;
          animation: pulse 2s ease-out infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.1, 0.1);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1.2, 1.2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  // Simulation du chargement de la carte
  useEffect(() => {
    const timer = setTimeout(() => setMapReady(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Coordonnées du signalement
  const reportCoordinates: [number, number] = report.latitude && report.longitude
    ? [report.latitude, report.longitude]
    : [46.227, 2.213]; // Position par défaut (France)
  
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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div 
        className="bg-white rounded-xl overflow-hidden w-full max-w-lg max-h-[90vh] flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header avec image principale */}
        <div className="relative h-48">
          <img
            src={report.imageUrl || '/assets/images/logo.png'}
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
                    src={report.imageUrl || '/assets/images/logo.png'} 
                    alt="Photo principale" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Images supplémentaires */}
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5].map(index => (
                    <div key={index} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src="/assets/images/logo.png" 
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
                
                {/* Carte interactive */}
                <div className="h-64 bg-gray-200 rounded-lg overflow-hidden relative">
                  {mapReady ? (
                    <MapContainer
                      center={reportCoordinates}
                      zoom={13}
                      style={{ height: '100%', width: '100%' }}
                      zoomControl={true}
                      attributionControl={false}
                      className="z-10"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <SetViewOnChange center={reportCoordinates} zoom={13} />
                      <Marker
                        position={reportCoordinates}
                        icon={locationMarkerIcon}
                      >
                        <Popup>
                          {report.type}<br/>
                          {report.location}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
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