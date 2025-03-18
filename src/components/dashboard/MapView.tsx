import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression, LatLngBounds } from 'leaflet';
import { motion } from 'framer-motion';
import { Signalement } from '@/types';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  reports: Signalement[];
  center?: [number, number];
  zoom?: number;
  onReportClick?: (report: Signalement) => void;
}

// Composant pour centrer la carte sur une position
const SetViewOnChange = ({ center, zoom }: { center: LatLngExpression, zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Composant de carte pour visualiser les signalements
const MapView: React.FC<MapViewProps> = ({ reports, center = [46.2276, 2.2137], zoom = 5, onReportClick }) => {
  const [selectedReport, setSelectedReport] = useState<Signalement | null>(null);
  const [mapReady, setMapReady] = useState(false);
  
  // Fonction pour déterminer l'icône en fonction du type de signalement
  const getMarkerIcon = (type: string) => {
    // Définir différentes couleurs pour différents types de signalements
    const iconColor = 
      type === 'Déversement de carburant' ? 'red' :
      type === 'Déchets plastiques' ? 'blue' :
      type === 'Filets abandonnés' ? 'green' :
      'gray';
    
    return new Icon({
      iconUrl: `/api/placeholder/30/30?text=💧&color=${iconColor}`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15]
    });
  };
  
  // Traiter les coordonnées pour les marqueurs
  const reportMarkers = reports.map(report => {
    // Utiliser les coordonnées si disponibles, sinon générer aléatoirement autour du centre
    const hasCoordinates = report.latitude && report.longitude;
    const position: [number, number] = hasCoordinates
      ? [report.latitude!, report.longitude!]
      : [
          center[0] + (Math.random() - 0.5) * 2,
          center[1] + (Math.random() - 0.5) * 2
        ];
    
    return { ...report, position };
  });
  
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
  
  // Animation de l'apparition de la carte
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <motion.div
      className="w-full h-full relative"
      variants={containerVariants}
      initial="hidden"
      animate={mapReady ? "visible" : "hidden"}
    >
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <svg className="animate-spin w-10 h-10 mx-auto mb-3 text-blue-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="text-gray-600 font-medium">Chargement de la carte...</div>
          </div>
        </div>
      )}
      
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        whenReady={() => setMapReady(true)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <SetViewOnChange center={center} zoom={zoom} />
        
        {reportMarkers.map((report) => (
          <Marker
            key={report.id}
            position={report.position}
            icon={getMarkerIcon(report.type)}
            eventHandlers={{
              click: () => {
                setSelectedReport(report);
                // Si une fonction onReportClick est fournie, appeler cette fonction
                if (onReportClick) {
                  onReportClick(report);
                }
              }
            }}
          >
            <Popup>
              <div className="p-1">
                <div className="font-bold text-sm mb-1">{report.type}</div>
                <div className="flex items-center justify-between text-xs">
                  <span>{report.location}</span>
                  <span className={`${getStatusColor(report.status)} text-white px-2 py-0.5 rounded-full ml-2`}>
                    {report.status}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Légende */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-2 rounded-lg shadow-md z-[1000]">
        <div className="text-sm font-semibold mb-1">Types de pollution</div>
        <div className="grid grid-cols-1 gap-1">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-xs">Déversement de carburant</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-xs">Déchets plastiques</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs">Filets abandonnés</span>
          </div>
        </div>
      </div>
      
      {/* Contrôles de filtrage */}
      <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-lg shadow-md z-[1000]">
        <div className="text-sm font-semibold mb-1">Filtres</div>
        <div className="grid grid-cols-2 gap-1">
          <label className="flex items-center text-xs">
            <input type="checkbox" className="mr-1" defaultChecked />
            Très urgent
          </label>
          <label className="flex items-center text-xs">
            <input type="checkbox" className="mr-1" defaultChecked />
            Urgent
          </label>
          <label className="flex items-center text-xs">
            <input type="checkbox" className="mr-1" defaultChecked />
            En cours
          </label>
          <label className="flex items-center text-xs">
            <input type="checkbox" className="mr-1" defaultChecked />
            Résolu
          </label>
        </div>
      </div>
    </motion.div>
  );
};

export default MapView; 