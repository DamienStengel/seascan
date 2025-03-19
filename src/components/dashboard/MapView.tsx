import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayerGroup } from 'react-leaflet';
import { Icon, LatLngExpression, LatLngBounds } from 'leaflet';
import { motion } from 'framer-motion';
import { Signalement, Event } from '@/types';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  reports: Signalement[];
  events?: Event[];
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
const MapView: React.FC<MapViewProps> = ({ reports, events = [], center = [46.2276, 2.2137], zoom = 5, onReportClick }) => {
  const [selectedReport, setSelectedReport] = useState<Signalement | null>(null);
  const [mapReady, setMapReady] = useState(false);
  
  // Fonction pour déterminer l'icône en fonction du type de signalement
  const getMarkerIcon = (type: string, isEvent = false) => {
    if (isEvent) {
      // Icône pour les événements (verte)
      return new Icon({
        iconUrl: '/src/assets/images/event-marker.png',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -35],
        className: 'event-marker'
      });
    } else {
      // Utiliser une couleur différente selon le type de signalement
      let color = 'text-red-600';
      
      if (type.toLowerCase().includes('plastique') || type.toLowerCase().includes('déchet')) {
        color = 'text-orange-600';
      } else if (type.toLowerCase().includes('hydrocarbure') || type.toLowerCase().includes('chimique')) {
        color = 'text-red-600';
      } else if (type.toLowerCase().includes('filet') || type.toLowerCase().includes('pêche')) {
        color = 'text-yellow-600';
      } else if (type.toLowerCase().includes('algue') || type.toLowerCase().includes('biologique')) {
        color = 'text-green-700';
      }
      
      return new Icon({
        iconUrl: '/src/assets/images/pollution-marker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -30],
        className: `report-marker ${color}`
      });
    }
  };
  
  // Traiter les coordonnées pour les marqueurs de signalements
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

  // Traiter les coordonnées pour les marqueurs d'événements
  const eventMarkers = events.map(event => {
    // Utiliser les coordonnées si disponibles, sinon générer aléatoirement autour du centre
    const hasCoordinates = event.latitude && event.longitude;
    const position: [number, number] = hasCoordinates
      ? [event.latitude!, event.longitude!]
      : [
          center[0] + (Math.random() - 0.5) * 2,
          center[1] + (Math.random() - 0.5) * 2
        ];
    
    return { ...event, position };
  });
  
  // Animation variants
  const mapVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  // Effet pour simuler le chargement de la carte
  useEffect(() => {
    const timer = setTimeout(() => setMapReady(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  if (!mapReady) {
    return (
      <div className="flex items-center justify-center h-full bg-blue-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-blue-500 text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-medium">Chargement de la carte...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="h-full w-full relative"
      variants={mapVariants}
      initial="hidden"
      animate="visible"
      style={{ zIndex: 10 }}
    >
      {/* Légende de la carte */}
      <div className="absolute bottom-4 right-4 z-30 bg-white p-3 rounded-lg shadow-md text-sm">
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span>Signalements</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-600 rounded-full mr-2"></div>
          <span>Événements</span>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
        className="z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SetViewOnChange center={center} zoom={zoom} />
        
        {/* Groupe de couche pour les signalements */}
        <LayerGroup>
          {reportMarkers.map((report) => (
            <Marker
              key={`report-${report.id}`}
              position={report.position}
              icon={getMarkerIcon(report.type)}
              eventHandlers={{
                click: () => {
                  if (onReportClick) {
                    onReportClick(report);
                  } else {
                    setSelectedReport(report);
                  }
                }
              }}
            >
              {!onReportClick && (
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold">{report.type}</h3>
                    <p className="text-sm">{report.description ? report.description.substring(0, 100) + '...' : 'Aucune description'}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Signalé le {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'date inconnue'}
                    </p>
                  </div>
                </Popup>
              )}
            </Marker>
          ))}
        </LayerGroup>
        
        {/* Groupe de couche pour les événements */}
        <LayerGroup>
          {eventMarkers.map((event) => (
            <Marker
              key={`event-${event.id}`}
              position={event.position}
              icon={getMarkerIcon(event.title, true)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{event.title}</h3>
                  {event.description && <p className="text-sm">{event.description.substring(0, 100)}...</p>}
                  <p className="text-xs mt-1">
                    {event.day} {event.month} · {event.participants}/{event.maxParticipants} participants
                  </p>
                  {event.organizer && (
                    <p className="text-xs text-gray-500 mt-1">
                      Organisé par {event.organizer}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      </MapContainer>
    </motion.div>
  );
};

export default MapView; 