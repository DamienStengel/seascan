import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Signalement } from '@/types';
import { useNavigate } from 'react-router-dom';

interface AllReportsTabProps {
  reports: Signalement[];
  onReportClick: (report: Signalement) => void;
}

const AllReportsTab: React.FC<AllReportsTabProps> = ({ reports, onReportClick }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'recent' | 'urgent'>('recent');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.05
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
  
  // Types de pollution pour le filtre
  const pollutionTypes = [
    { value: '', label: 'Tous les types' },
    { value: 'plastique', label: 'Déchets plastiques' },
    { value: 'hydrocarbure', label: 'Hydrocarbures' },
    { value: 'chimique', label: 'Pollution chimique' },
    { value: 'filet', label: 'Filets et matériel' },
    { value: 'biologique', label: 'Pollution biologique' }
  ];
  
  // Filtrage et tri des signalements
  const filteredReports = useMemo(() => {
    // D'abord filtrer
    let results = reports.filter(report => {
      // Filtre par recherche textuelle
      const matchesSearch = 
        searchTerm === '' || 
        report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (report.description && report.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filtre par type
      const matchesType = 
        filterType === '' ||
        (report.type && report.type.toLowerCase().includes(filterType.toLowerCase())) ||
        (report.categories && report.categories.some(cat => cat.toLowerCase().includes(filterType.toLowerCase())));
      
      return matchesSearch && matchesType;
    });
    
    // Ensuite trier
    return results.sort((a, b) => {
      if (sortOrder === 'recent') {
        // Tri par date (plus récent d'abord)
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      } else {
        // Tri par urgence
        const urgencyOrder = {
          'Très urgent': 3,
          'Urgent': 2,
          'En cours': 1,
          'Résolu': 0
        };
        
        const urgencyA = urgencyOrder[a.status as keyof typeof urgencyOrder] || 0;
        const urgencyB = urgencyOrder[b.status as keyof typeof urgencyOrder] || 0;
        
        return urgencyB - urgencyA;
      }
    });
  }, [reports, searchTerm, filterType, sortOrder]);
  
  // Calculer les stats
  const stats = {
    total: reports.length,
    urgent: reports.filter(r => r.status === 'Très urgent' || r.status === 'Urgent').length,
    enCours: reports.filter(r => r.status === 'En cours').length,
    resolved: reports.filter(r => r.status === 'Résolu').length
  };

  // Fonction pour retourner à la page d'accueil
  const handleBackClick = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="h-full">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-4 text-white relative">
        <button onClick={handleBackClick} className="absolute left-2 top-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-center">Tous les signalements</h1>
      </div>
      
      {/* Barre de recherche et filtres */}
      <div className="bg-white p-4 shadow-sm">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Rechercher un signalement..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {pollutionTypes.map(type => (
            <button
              key={type.value}
              className={`px-3 py-1 rounded-full text-sm ${
                filterType === type.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setFilterType(type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between">
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 rounded-lg text-sm ${sortOrder === 'recent' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setSortOrder('recent')}
            >
              Plus récents
            </button>
            <button 
              className={`px-3 py-1 rounded-lg text-sm ${sortOrder === 'urgent' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setSortOrder('urgent')}
            >
              Plus urgents
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            {filteredReports.length} sur {reports.length} signalements
          </div>
        </div>
      </div>
      
      {/* Statistiques */}
      <div className="bg-white mt-2 p-4 shadow-sm">
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-red-500">{stats.urgent}</div>
            <div className="text-xs text-gray-600">Urgents</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-orange-500">{stats.enCours}</div>
            <div className="text-xs text-gray-600">En cours</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-500">{stats.resolved}</div>
            <div className="text-xs text-gray-600">Résolus</div>
          </div>
        </div>
      </div>
      
      {/* Liste des signalements */}
      <motion.div 
        className="p-4 space-y-3 overflow-auto pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredReports.length > 0 ? (
          filteredReports.map(report => (
            <motion.div 
              key={report.id} 
              className="bg-white rounded-xl shadow-sm p-3 flex items-center cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onReportClick(report)}
            >
              <img 
                src={report.imageUrl || '/assets/images/plastique.jpg'} 
                alt={report.type} 
                className="w-16 h-16 rounded-lg object-cover mr-3" 
              />
              <div className="flex-1">
                <h3 className="font-semibold">{report.type}</h3>
                <div className="text-sm text-gray-600">{report.location}</div>
                <div className="text-xs text-gray-500">{report.time}</div>
                {report.categories && report.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {report.categories.map((category, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded">
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className={`${getStatusColor(report.status)} text-white text-xs py-1 px-2 rounded-full ml-2`}>
                {report.status}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Aucun signalement ne correspond à votre recherche</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllReportsTab; 