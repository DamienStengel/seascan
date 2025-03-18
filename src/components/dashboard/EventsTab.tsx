import React from 'react'
import { Event } from '@/types'

const EventsTab: React.FC = () => {
  // Données fictives pour les événements
  const events: Event[] = [
    {
      id: 1,
      title: 'Nettoyage de plage',
      location: 'Plage du Grand Crohot',
      month: 'JUN',
      day: '15',
      participants: 17,
      maxParticipants: 30,
      description: 'Rejoignez-nous pour une grande opération de nettoyage de la plage. Matériel fourni et collation offerte pour tous les participants.'
    },
    {
      id: 2,
      title: 'Sensibilisation aux océans',
      location: 'Médiathèque de Biarritz',
      month: 'JUN',
      day: '22',
      participants: 9,
      maxParticipants: 20,
      description: 'Conférence et atelier sur l\'impact des microplastiques dans l\'océan. Accessible à tous, entrée libre.'
    },
    {
      id: 3,
      title: 'Formation reconnaissance déchets',
      location: 'Maison de la Nature, Arcachon',
      month: 'JUL',
      day: '05',
      participants: 5,
      maxParticipants: 15,
      description: 'Apprenez à identifier les différents types de pollution marine et à les signaler efficacement sur notre application.'
    },
    {
      id: 4,
      title: 'Collecte et tri des déchets',
      location: 'Port de Capbreton',
      month: 'JUL',
      day: '18',
      participants: 12,
      maxParticipants: 25,
      description: 'Opération de ramassage des déchets autour du port, suivie d\'un atelier de tri et de sensibilisation au recyclage.'
    }
  ]
  
  return (
    <div className="py-4 px-4">
      <h1 className="text-2xl font-bold mb-4">Événements à venir</h1>
      
      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
            <div className="flex items-center p-4">
              <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-3 mr-4 w-20 h-20">
                <div className="text-sm font-bold text-blue-600">{event.month}</div>
                <div className="text-2xl font-bold">{event.day}</div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-lg">{event.title}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gray-200 h-2 flex-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 ml-2 whitespace-nowrap">
                    {event.participants}/{event.maxParticipants} participants
                  </span>
                </div>
              </div>
              
              <button className="ml-4 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors">
                Participer
              </button>
            </div>
            
            {event.description && (
              <div className="px-4 pb-4 text-gray-600 text-sm border-t border-gray-100 pt-3 mt-1">
                {event.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventsTab 