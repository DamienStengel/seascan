import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayerGroup } from 'react-leaflet';
import { divIcon, LatLngExpression } from 'leaflet';
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
  const [, setSelectedReport] = useState<Signalement | null>(null);
  const [mapReady, setMapReady] = useState(false);
  
  // Icône unique pour tous les signalements
  const getReportMarkerIcon = () => {
    return divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin bg-red-600">
              <span class="text-white text-xs font-bold">!</span>
             </div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });
  };
  
  // Icône unique pour tous les événements
  const getEventMarkerIcon = () => {
    return divIcon({
      className: 'custom-div-icon',
      html: `<div class="event-marker">
              <div class="event-pin bg-green-600">
                <span class="text-white text-xs font-bold">🧹</span>
              </div>
             </div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });
  };
  
  // Injecter le CSS nécessaire pour les marqueurs
  useEffect(() => {
    // Ajouter le style pour les marqueurs personnalisés s'il n'existe pas déjà
    if (!document.getElementById('marker-styles')) {
      const style = document.createElement('style');
      style.id = 'marker-styles';
      style.innerHTML = `
        .marker-pin {
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          position: relative;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        .marker-pin::after {
          content: '';
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: white;
          position: absolute;
          top: 4px;
          left: 4px;
        }
        .marker-pin span {
          transform: rotate(45deg);
          position: relative;
          z-index: 1;
          font-weight: bold;
        }
        
        .event-marker {
          position: relative;
        }
        .event-pin {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #16a34a;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .event-pin::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 10px solid #16a34a;
        }
        .event-pin span {
          font-size: 16px;
          position: relative;
          z-index: 1;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
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
        <div className="font-medium mb-2 text-gray-700">Légende</div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            <span>Signalements de pollution</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            <span>Événements de nettoyage</span>
          </div>
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
              icon={getReportMarkerIcon()}
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
              icon={getEventMarkerIcon()}
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