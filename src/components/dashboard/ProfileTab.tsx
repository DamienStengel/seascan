import React from 'react'
import { motion } from 'framer-motion'
import { User, Badge } from '@/types'

interface ProfileTabProps {
  user?: User | null;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ user }) => {
  // Utiliser un utilisateur par défaut si aucun n'est fourni
  const currentUser = user || {
    id: 'default',
    firstName: 'Utilisateur',
    lastName: 'Anonyme',
    email: 'user@example.com',
    profilePicture: '/api/placeholder/100/100?text=UA',
    badges: [],
    stats: {
      signalements: 0,
      participations: 0,
      points: 0,
      niveau: 'Débutant'
    }
  };

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
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center">
            <img 
              src={currentUser.profilePicture} 
              alt={`${currentUser.firstName} ${currentUser.lastName}`} 
              className="w-16 h-16 rounded-full object-cover" 
            />
            <div className="ml-4">
              <h1 className="text-xl font-bold">{currentUser.firstName} {currentUser.lastName}</h1>
              <div className="text-gray-600">{currentUser.email}</div>
              <div className="flex mt-1">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                  Niveau: {currentUser.stats?.niveau || 'Débutant'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      
      <motion.section variants={itemVariants}>
        <h2 className="text-lg font-bold mb-3">Mes statistiques</h2>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentUser.stats?.signalements || 0}</div>
              <div className="text-sm text-gray-600">Signalements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{currentUser.stats?.participations || 0}</div>
              <div className="text-sm text-gray-600">Participations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{currentUser.stats?.points || 0}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
          </div>
          
          {currentUser.stats && currentUser.stats.points > 0 && (
            <div className="mt-4">
              <div className="text-sm text-gray-600 mb-1">
                Progression vers le prochain niveau
              </div>
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-blue-600 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentUser.stats.points % 100) / 100 * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Niveau {currentUser.stats.niveau}</span>
                <span>{100 - (currentUser.stats.points % 100)} points pour le niveau suivant</span>
              </div>
            </div>
          )}
        </div>
      </motion.section>
      
      <motion.section variants={itemVariants}>
        <h2 className="text-lg font-bold mb-3">Mes badges</h2>
        {currentUser.badges && currentUser.badges.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="grid grid-cols-2 gap-3">
              {currentUser.badges.map((badge: Badge) => (
                <div key={badge.id} className="flex items-center p-2 bg-blue-50 rounded-lg">
                  <div className="text-2xl mr-3">{badge.icon}</div>
                  <div>
                    <div className="font-medium">{badge.name}</div>
                    {badge.dateObtained && (
                      <div className="text-xs text-gray-500">
                        Obtenu le {badge.dateObtained.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-5xl mb-3">🏆</div>
            <h3 className="text-lg font-medium mb-2">Pas encore de badge</h3>
            <p className="text-gray-500">
              Participez à des événements et signalez des pollutions pour gagner des badges.
            </p>
          </div>
        )}
      </motion.section>
      
      <motion.section variants={itemVariants}>
        <h2 className="text-lg font-bold mb-3">Paramètres</h2>
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
          <button className="flex items-center justify-between w-full py-2 text-left">
            <span>Préférences de notification</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="border-t border-gray-100"></div>
          
          <button className="flex items-center justify-between w-full py-2 text-left">
            <span>Confidentialité</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="border-t border-gray-100"></div>
          
          <button className="flex items-center justify-between w-full py-2 text-left">
            <span>Aide et support</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="border-t border-gray-100"></div>
          
          <button className="flex items-center justify-between w-full py-2 text-left text-red-500">
            <span>Déconnexion</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </motion.section>
      
      <div className="text-center text-xs text-gray-400 mt-8">
        OcéaPulse v1.0.0
      </div>
    </motion.div>
  )
}

export default ProfileTab 