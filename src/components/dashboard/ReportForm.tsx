import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Location, Image, Category, CameraType } from '@/types';

interface ReportFormProps {
  onClose: () => void;
  onSubmit: (reportData: any) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onClose, onSubmit }) => {
  const [etape, setEtape] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [location, setLocation] = useState({
    address: '',
    details: '',
    loading: false,
    coordinates: null as { lat: number; lng: number } | null
  });
  const [details, setDetails] = useState({
    type: '',
    description: '',
    urgence: 'Modéré',
    acceptTerms: false
  });

  // Gérer le changement d'étape
  const allerEtapeSuivante = () => {
    setEtape(etape + 1);
  };

  const allerEtapePrecedente = () => {
    setEtape(etape - 1);
  };

  // Gestion des photos
  const ajouterPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (photos.length < 3 && e.target.files && e.target.files[0]) {
      const nouvellePhoto = URL.createObjectURL(e.target.files[0]);
      setPhotos([...photos, nouvellePhoto]);
    }
  };

  const supprimerPhoto = (index: number) => {
    const nouvellesPhotos = [...photos];
    nouvellesPhotos.splice(index, 1);
    setPhotos(nouvellesPhotos);
  };

  // Gérer la localisation
  const utiliserPositionActuelle = () => {
    setLocation({ ...location, loading: true });
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            ...location,
            address: `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`,
            loading: false,
            coordinates: { lat: latitude, lng: longitude }
          });
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          // Simuler la géolocalisation en cas d'erreur
          setTimeout(() => {
            setLocation({
              ...location,
              address: 'Plage de la Salie, 33115 Pyla-sur-Mer',
              loading: false,
              coordinates: { lat: 44.5866, lng: -1.2099 }
            });
          }, 1000);
        }
      );
    } else {
      // Simuler la géolocalisation si non supportée
      setTimeout(() => {
        setLocation({
          ...location,
          address: 'Plage de la Salie, 33115 Pyla-sur-Mer',
          loading: false,
          coordinates: { lat: 44.5866, lng: -1.2099 }
        });
      }, 1000);
    }
  };

  // Mise à jour des détails
  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setDetails({
      ...details,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Gérer la soumission du formulaire
  const soumettreSignalement = (e: React.FormEvent) => {
    e.preventDefault();
    // Préparer les données pour la soumission
    const reportData = {
      type: details.type,
      description: details.description,
      location: {
        latitude: location.coordinates?.lat || 0,
        longitude: location.coordinates?.lng || 0,
        address: location.address,
        details: location.details
      },
      urgency: details.urgence,
      images: photos
    };
    
    // Appeler la fonction onSubmit fournie par le parent
    onSubmit(reportData);
  };

  // Barre de progression
  const ProgressBar = () => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-600">Étape {etape} sur 3</span>
        <span className="text-sm text-gray-600">{Math.round((etape / 3) * 100)}%</span>
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-blue-600 rounded-full" 
          initial={{ width: 0 }}
          animate={{ width: `${(etape / 3) * 100}%` }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>
      <div className="flex justify-between mt-1">
        <span className={`text-xs ${etape >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Photos</span>
        <span className={`text-xs ${etape >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Localisation</span>
        <span className={`text-xs ${etape >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Détails</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col bg-gray-50">
      {/* En-tête avec dégradé */}
      <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => etape > 1 ? allerEtapePrecedente() : onClose()} 
            className="mr-4"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center">
            {etape === 1 && "Signaler une pollution"}
            {etape === 2 && "Localisation du signalement"}
            {etape === 3 && "Détails du signalement"}
            {etape === 4 && "Signalement envoyé"}
          </h1>
          <div className="w-6"></div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 container mx-auto px-4 py-6 max-w-md overflow-auto">
        {etape < 4 && <ProgressBar />}
        
        <AnimatePresence mode="wait">
          {/* Étape 1: Photos */}
          {etape === 1 && (
            <motion.div
              key="etape-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-medium mb-4">Ajoutez des photos</h2>
              <p className="text-gray-600 mb-6">
                Prenez ou sélectionnez des photos de la pollution marine pour aider à l'identification.
              </p>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="aspect-square relative">
                    {index < photos.length ? (
                      <div className="w-full h-full relative">
                        <img 
                          src={photos[index]} 
                          alt={`Photo ${index + 1}`} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <motion.button 
                          onClick={() => supprimerPhoto(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      </div>
                    ) : (
                      <label className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-xs text-gray-500 mt-1">Ajouter</span>
                        <input type="file" className="hidden" accept="image/*" onChange={ajouterPhoto} />
                      </label>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-3 mb-6">
                <motion.button 
                  className="flex-1 flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Appareil photo
                </motion.button>
                <motion.button 
                  className="flex-1 flex items-center justify-center border border-blue-600 text-blue-600 py-3 px-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Galerie
                </motion.button>
              </div>
              
              <div className="flex items-start mb-6 bg-blue-50 p-3 rounded-lg">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-700">
                  Assurez-vous que la pollution soit clairement visible et qu'aucune personne ne soit reconnaissable sur les photos.
                </p>
              </div>
              
              <motion.button 
                onClick={allerEtapeSuivante}
                disabled={photos.length === 0}
                className={`w-full py-3 rounded-lg font-medium ${photos.length === 0 ? 'bg-gray-300 text-gray-500' : 'bg-blue-600 text-white'}`}
                whileHover={photos.length > 0 ? { scale: 1.02 } : {}}
                whileTap={photos.length > 0 ? { scale: 0.98 } : {}}
              >
                Continuer
              </motion.button>
            </motion.div>
          )}
          
          {/* Étape 2: Localisation */}
          {etape === 2 && (
            <motion.div
              key="etape-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-medium mb-4">Où se trouve la pollution ?</h2>
              
              <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 relative overflow-hidden" style={{ zIndex: 20 }}>
                {/* Simuler une carte */}
                <div className="w-full h-full bg-blue-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="/src/assets/images/logo.png" 
                      alt="Carte" 
                      className="w-full h-full object-cover opacity-10"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <p>Carte interactive</p>
                    </div>
                  </div>
                  {location.coordinates && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <motion.button 
                    onClick={utiliserPositionActuelle}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md z-30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </motion.button>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse précise
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="address"
                    value={location.address}
                    onChange={(e) => setLocation({ ...location, address: e.target.value })}
                    placeholder="Saisissez une adresse ou un lieu connu"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 pr-10"
                  />
                  {location.loading ? (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  ) : (
                    <button 
                      onClick={utiliserPositionActuelle}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                  Précisions sur l'emplacement (facultatif)
                </label>
                <textarea
                  id="details"
                  value={location.details}
                  onChange={(e) => setLocation({ ...location, details: e.target.value })}
                  placeholder="Ex: près du rocher, sous le ponton, etc."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 h-24"
                ></textarea>
              </div>
              
              <motion.button 
                onClick={allerEtapeSuivante}
                disabled={!location.address}
                className={`w-full py-3 rounded-lg font-medium ${!location.address ? 'bg-gray-300 text-gray-500' : 'bg-blue-600 text-white'}`}
                whileHover={location.address ? { scale: 1.02 } : {}}
                whileTap={location.address ? { scale: 0.98 } : {}}
              >
                Continuer
              </motion.button>
            </motion.div>
          )}
          
          {/* Étape 3: Détails */}
          {etape === 3 && (
            <motion.div
              key="etape-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={soumettreSignalement}>
                <h2 className="text-xl font-medium mb-4">Détails de la pollution</h2>
                
                <div className="mb-6">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type de pollution
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={details.type}
                    onChange={handleDetailsChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
                  >
                    <option value="" disabled>Sélectionnez un type</option>
                    <option value="Déchets plastiques">Déchets plastiques</option>
                    <option value="Hydrocarbures">Hydrocarbures</option>
                    <option value="Filets de pêche">Filets de pêche</option>
                    <option value="Déversement chimique">Déversement chimique</option>
                    <option value="Verre/Métal">Verre/Métal</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={details.description}
                    onChange={handleDetailsChange}
                    placeholder="Décrivez la pollution que vous avez observée..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 h-24"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <p className="block text-sm font-medium text-gray-700 mb-2">Niveau d'urgence</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['Modéré', 'Urgent', 'Très urgent'].map((niveau) => (
                      <motion.button
                        key={niveau}
                        type="button"
                        className={`px-4 py-2 rounded-lg text-center transition-colors ${
                          details.urgence === niveau 
                            ? niveau === 'Modéré' 
                              ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-400' 
                              : niveau === 'Urgent' 
                                ? 'bg-orange-100 text-orange-800 border-2 border-orange-400' 
                                : 'bg-red-100 text-red-800 border-2 border-red-400'
                            : 'bg-gray-100 text-gray-800 border-2 border-transparent'
                        }`}
                        onClick={() => setDetails({ ...details, urgence: niveau })}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {niveau}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={details.acceptTerms}
                    onChange={handleDetailsChange}
                    required
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 mt-1 mr-2"
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                    J'accepte que mes informations soient utilisées pour la coordination des actions de nettoyage et les statistiques anonymisées.
                  </label>
                </div>
                
                <motion.button 
                  type="submit"
                  disabled={!details.type || !details.description || !details.acceptTerms}
                  className={`w-full py-3 rounded-lg font-medium ${
                    !details.type || !details.description || !details.acceptTerms 
                      ? 'bg-gray-300 text-gray-500' 
                      : 'bg-blue-600 text-white'
                  }`}
                  whileHover={details.type && details.description && details.acceptTerms ? { scale: 1.02 } : {}}
                  whileTap={details.type && details.description && details.acceptTerms ? { scale: 0.98 } : {}}
                >
                  Soumettre le signalement
                </motion.button>
              </form>
            </motion.div>
          )}
          
          {/* Confirmation */}
          {etape === 4 && (
            <motion.div 
              className="text-center pt-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                className="bg-green-100 text-green-800 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-bold mb-4">Merci pour votre signalement !</h2>
              <p className="text-gray-600 mb-8">
                Votre signalement a été enregistré avec succès et sera traité par nos équipes. Vous serez informé(e) des actions entreprises.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-8 text-left">
                <h3 className="font-semibold text-blue-800 mb-2">Récapitulatif</h3>
                <div className="text-sm text-blue-900">
                  <p><span className="font-medium">Type :</span> {details.type}</p>
                  <p><span className="font-medium">Lieu :</span> {location.address}</p>
                  <p><span className="font-medium">Urgence :</span> {details.urgence}</p>
                  <p><span className="font-medium">Status :</span> En attente de vérification</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <motion.button 
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center border border-blue-600 text-blue-600 py-3 px-4 rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Nouveau signalement
                </motion.button>
                <motion.button 
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Retour à l'accueil
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ReportForm; 