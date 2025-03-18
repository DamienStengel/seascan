import React from 'react'
import { Signalement, Event } from '@/types'

const HomeTab: React.FC = () => {
  // Données fictives pour les signalements récents
  const recentReports: Signalement[] = [
    {
      id: 1,
      type: 'Déversement de carburant',
      location: 'Plage de la Salie',
      time: 'Il y a 2 heures',
      status: 'Très urgent',
      imageUrl: '/api/placeholder/80/80?text=Déversement'
    },
    {
      id: 2,
      type: 'Déchets plastiques',
      location: 'Côte des Basques',
      time: 'Il y a 5 heures',
      status: 'Urgent',
      imageUrl: '/api/placeholder/80/80?text=Plastiques'
    },
    {
      id: 3,
      type: 'Filets abandonnés',
      location: 'Port de Capbreton',
      time: 'Hier',
      status: 'En cours',
      imageUrl: '/api/placeholder/80/80?text=Filets'
    }
  ]
  
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
  
  return (
    <div className="py-4 px-4">
      {/* Section impact collectif */}
      <section className="mb-6">
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
      </section>
      
      {/* Section signalements récents */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Signalements récents</h2>
          <button className="text-blue-600 text-sm">Voir tous</button>
        </div>
        
        <div className="space-y-3">
          {recentReports.map(report => (
            <div key={report.id} className="bg-white rounded-xl shadow-sm p-3 flex items-center card-hover">
              <img 
                src={report.imageUrl} 
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
            </div>
          ))}
        </div>
      </section>
      
      {/* Section événements à venir */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Événements à venir</h2>
          <button className="text-blue-600 text-sm">Voir tous</button>
        </div>
        
        <div className="space-y-3">
          {upcomingEvents.map(event => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm p-3 flex card-hover">
              <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-2 mr-3 w-16">
                <div className="text-sm font-bold text-blue-600">{event.month}</div>
                <div className="text-xl font-bold">{event.day}</div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{event.title}</h3>
                <div className="text-sm text-gray-600">{event.location}</div>
                <div className="mt-1 flex items-center">
                  <div className="bg-gray-200 h-2 flex-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 ml-2">
                    {event.participants}/{event.maxParticipants}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomeTab 