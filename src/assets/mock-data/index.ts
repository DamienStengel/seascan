import { Signalement, Event, User } from '@/types';

/**
 * Données mockées pour l'application OcéaPulse
 * Ces données servent à simuler une API backend pour la démo
 */

// Signalements mockés
export const mockReports: Signalement[] = [
  {
    id: 1,
    type: 'Déversement de carburant',
    location: 'Plage de la Salie',
    time: 'Il y a 2 heures',
    status: 'Très urgent',
    imageUrl: '/api/placeholder/80/80?text=Déversement',
    description: 'Déversement important de carburant observé près de la côte. Une nappe noire s\'étend sur environ 50 mètres. Risque majeur pour les oiseaux marins et la faune aquatique.',
    latitude: 44.6205,
    longitude: -1.1887,
    categories: ['Toxique', 'Hydrocarbures']
  },
  {
    id: 2,
    type: 'Déchets plastiques',
    location: 'Côte des Basques',
    time: 'Il y a 5 heures',
    status: 'Urgent',
    imageUrl: '/api/placeholder/80/80?text=Plastiques',
    description: 'Accumulation de déchets plastiques sur la plage, principalement des bouteilles et des emballages. Zone d\'environ 20m² très polluée.',
    latitude: 43.4789,
    longitude: -1.5686,
    categories: ['Plastique', 'Déchets divers']
  },
  {
    id: 3,
    type: 'Filets abandonnés',
    location: 'Port de Capbreton',
    time: 'Hier',
    status: 'En cours',
    imageUrl: '/api/placeholder/80/80?text=Filets',
    description: 'Filets de pêche abandonnés ou perdus, emmêlés autour des rochers. Danger potentiel pour la faune marine, risque d\'enchevêtrement.',
    latitude: 43.6435,
    longitude: -1.4468,
    categories: ['Matériel de pêche', 'Filets']
  },
  {
    id: 4,
    type: 'Méduses en nombre',
    location: 'Plage du Petit Nice',
    time: 'Aujourd\'hui',
    status: 'Information',
    imageUrl: '/api/placeholder/80/80?text=Méduses',
    description: 'Présence importante de méduses sur la plage et dans l\'eau. Baignade déconseillée pour les enfants et personnes sensibles.',
    latitude: 44.5652,
    longitude: -1.2009,
    categories: ['Phénomène naturel']
  },
  {
    id: 5,
    type: 'Érosion critique',
    location: 'Dune du Pilat',
    time: 'Il y a 3 jours',
    status: 'Préoccupant',
    imageUrl: '/api/placeholder/80/80?text=Érosion',
    description: 'Érosion importante observée au pied de la dune. Risque d\'effondrement de portions de la dune après les dernières tempêtes.',
    latitude: 44.5869,
    longitude: -1.2144,
    categories: ['Érosion', 'Dunes']
  },
  {
    id: 6,
    type: 'Algues toxiques',
    location: 'Plage de Contis',
    time: 'Il y a 1 semaine',
    status: 'Résolu',
    imageUrl: '/api/placeholder/80/80?text=Algues',
    description: 'Prolifération d\'algues potentiellement toxiques. La situation est maintenant sous contrôle et la plage a été nettoyée.',
    latitude: 44.0849,
    longitude: -1.3234,
    categories: ['Algues', 'Toxique']
  }
];

// Événements mockés
export const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Nettoyage de plage',
    location: 'Plage du Grand Crohot',
    month: 'JUN',
    day: '15',
    participants: 17,
    maxParticipants: 30,
    description: 'Venez participer à notre action de nettoyage des plages. Matériel fourni, prévoir des vêtements adaptés et une bouteille d\'eau.',
    date: new Date(2023, 5, 15),
    organizer: 'Association OcéanVie',
    imageUrl: '/api/placeholder/300/150?text=Nettoyage'
  },
  {
    id: 2,
    title: 'Sensibilisation aux océans',
    location: 'Médiathèque de Biarritz',
    month: 'JUN',
    day: '22',
    participants: 9,
    maxParticipants: 20,
    description: 'Conférence sur l\'importance de préserver nos océans et les gestes quotidiens pour réduire la pollution marine.',
    date: new Date(2023, 5, 22),
    organizer: 'Mairie de Biarritz',
    imageUrl: '/api/placeholder/300/150?text=Conférence'
  },
  {
    id: 3,
    title: 'Formation à la biodiversité',
    location: 'Réserve naturelle du Courant d\'Huchet',
    month: 'JUL',
    day: '05',
    participants: 12,
    maxParticipants: 15,
    description: 'Apprenez à identifier les espèces locales et comprendre l\'impact de la pollution sur la biodiversité marine.',
    date: new Date(2023, 6, 5),
    organizer: 'Guides naturalistes',
    imageUrl: '/api/placeholder/300/150?text=Formation'
  },
  {
    id: 4,
    title: 'Plantation de végétation dunaire',
    location: 'Lacanau Océan',
    month: 'JUL',
    day: '18',
    participants: 5,
    maxParticipants: 25,
    description: 'Participez à la restauration et au renforcement des dunes par la plantation d\'espèces adaptées.',
    date: new Date(2023, 6, 18),
    organizer: 'Conservatoire du littoral',
    imageUrl: '/api/placeholder/300/150?text=Plantation'
  }
];

// Utilisateurs mockés
export const mockUsers: User[] = [
  {
    id: 'mock-user-1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    profilePicture: '/api/placeholder/100/100?text=JD',
    badges: [
      { id: 1, name: 'Protecteur des océans', icon: '🌊', dateObtained: new Date(2023, 5, 15) },
      { id: 2, name: 'Observateur débutant', icon: '👁️', dateObtained: new Date(2023, 6, 20) }
    ],
    stats: {
      signalements: 12,
      participations: 5,
      points: 320,
      niveau: 'Débutant'
    }
  },
  {
    id: 'mock-user-2',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@example.com',
    profilePicture: '/api/placeholder/100/100?text=MM',
    badges: [
      { id: 1, name: 'Protecteur des océans', icon: '🌊', dateObtained: new Date(2023, 4, 10) },
      { id: 3, name: 'Nettoyeur expérimenté', icon: '🧹', dateObtained: new Date(2023, 7, 5) }
    ],
    stats: {
      signalements: 8,
      participations: 12,
      points: 450,
      niveau: 'Intermédiaire'
    }
  }
];

// API mockée pour remplacer les appels backend
// Ces fonctions simulent des appels asynchrones à une API
export const mockAPI = {
  // Récupérer tous les signalements
  getReports: (): Promise<Signalement[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockReports);
      }, 800); // Délai simulé de 800ms
    });
  },
  
  // Récupérer un signalement par son ID
  getReportById: (id: number): Promise<Signalement | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockReports.find(report => report.id === id));
      }, 500); // Délai simulé de 500ms
    });
  },
  
  // Ajouter un nouveau signalement
  addReport: (report: Omit<Signalement, 'id'>): Promise<Signalement> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReport = {
          ...report,
          id: mockReports.length + 1, // Génération d'un ID simple
          time: 'À l\'instant'
        };
        mockReports.push(newReport as Signalement);
        resolve(newReport as Signalement);
      }, 1000); // Délai simulé de 1000ms
    });
  },
  
  // Récupérer tous les événements
  getEvents: (): Promise<Event[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockEvents);
      }, 800); // Délai simulé de 800ms
    });
  },
  
  // Participer à un événement
  joinEvent: (eventId: number, userId: string): Promise<Event> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const event = mockEvents.find(e => e.id === eventId);
        if (!event) {
          reject(new Error('Événement non trouvé'));
          return;
        }
        
        if (event.participants >= event.maxParticipants) {
          reject(new Error('Événement complet'));
          return;
        }
        
        event.participants += 1;
        resolve(event);
      }, 700); // Délai simulé de 700ms
    });
  }
};

// Helper pour générer des placeholders d'images
export const getImagePlaceholder = (width: number, height: number, text: string): string => {
  return `/api/placeholder/${width}/${height}?text=${encodeURIComponent(text)}`;
}; 