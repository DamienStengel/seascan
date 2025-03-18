import React from 'react'
import { motion } from 'framer-motion'
import { Event } from '@/types'

interface EventsTabProps {
  events?: Event[];
}

const EventsTab: React.FC<EventsTabProps> = ({ events }) => {
  // Si aucun événement n'est fourni, utiliser un tableau vide
  const upcomingEvents = events || [];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <motion.div 
      className="py-4 px-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-bold mb-3">Événements à venir</h2>
        
        {upcomingEvents.length > 0 ? (
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <motion.div 
                key={event.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {event.imageUrl && (
                  <div className="h-36 bg-blue-100">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <div className="text-sm text-gray-600">{event.location}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Organisé par {event.organizer || 'Association locale'}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-2 min-w-[60px]">
                      <div className="text-sm font-bold text-blue-600">{event.month}</div>
                      <div className="text-xl font-bold">{event.day}</div>
                    </div>
                  </div>
                  
                  {event.description && (
                    <div className="mt-3 text-sm text-gray-700">
                      {event.description}
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Participants</span>
                      <span className="text-sm font-medium">
                        {event.participants}/{event.maxParticipants}
                      </span>
                    </div>
                    <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        className="bg-blue-600 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${(event.participants / event.maxParticipants) * 100}%` 
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                  
                  <button 
                    className={`mt-4 w-full py-2 rounded-lg text-center ${
                      event.participants >= event.maxParticipants
                        ? 'bg-gray-300 text-gray-600'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } transition-colors`}
                    disabled={event.participants >= event.maxParticipants}
                  >
                    {event.participants >= event.maxParticipants
                      ? 'Complet'
                      : 'Participer'
                    }
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <svg className="w-16 h-16 text-blue-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium mb-2">Aucun événement à venir</h3>
            <p className="text-gray-500">Les prochains événements seront affichés ici dès qu'ils seront programmés.</p>
          </div>
        )}
      </motion.section>
      
      <motion.section variants={itemVariants}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Événements passés</h2>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <p className="text-gray-500">L'historique des événements sera disponible prochainement.</p>
        </div>
      </motion.section>
    </motion.div>
  )
}

export default EventsTab 