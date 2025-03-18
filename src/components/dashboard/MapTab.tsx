import React from 'react'

const MapTab: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="bg-blue-50 rounded-xl p-6 text-center max-w-md">
        <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <h2 className="text-xl font-bold mb-2">Carte des signalements</h2>
        <p className="text-gray-600 mb-4">
          La carte interactive des signalements sera disponible prochainement. Vous pourrez y visualiser tous les signalements à proximité.
        </p>
        <div className="bg-white rounded-lg p-4 shadow-inner">
          <div className="text-sm text-gray-500 mb-2">Fonctionnalités à venir :</div>
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
              Statistiques par zone géographique
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MapTab 