import React, { useState } from 'react'
import { Event } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

interface EventsTabProps {
  events?: Event[];
}

const EventsTab: React.FC<EventsTabProps> = ({ events: propEvents }) => {
  const [showModal, setShowModal] = useState(false);
  
  // Données fictives pour les événements si aucune n'est fournie
  const defaultEvents: Event[] = [
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
  
  const eventsToDisplay = propEvents || defaultEvents;
  
  // Animation variants
  const eventItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <div className="py-4 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Événements à venir</h1>
        <motion.button
          className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-md flex items-center"
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Créer un événement
        </motion.button>
      </div>
      
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {eventsToDisplay.map((event) => (
          <motion.div 
            key={event.id} 
            className="bg-white rounded-xl shadow-sm overflow-hidden card-hover"
            variants={eventItemVariants}
            transition={{ duration: 0.3 }}
          >
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
              
              <motion.button 
                className="ml-4 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Participer
              </motion.button>
            </div>
            
            {event.description && (
              <div className="px-4 pb-4 text-gray-600 text-sm border-t border-gray-100 pt-3 mt-1">
                {event.description}
                {event.organizer && (
                  <p className="mt-2 italic text-gray-500">
                    Organisé par {event.organizer}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
      
      {/* Modal pour créer un nouvel événement */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div 
              className="bg-white rounded-xl shadow-lg w-full max-w-md"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Créer un nouvel événement</h2>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nom de l'événement"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Lieu de l'événement"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input 
                        type="date" 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max. participants</label>
                      <input 
                        type="number" 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                        placeholder="Nombre max"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                      placeholder="Description de l'événement"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-2">
                    <motion.button
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                      onClick={() => setShowModal(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Annuler
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Créer l'événement
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EventsTab 