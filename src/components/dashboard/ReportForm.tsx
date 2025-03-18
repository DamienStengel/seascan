import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Location, Image, Category, CameraType } from '@/types';

interface ReportFormProps {
  onClose: () => void;
  onSubmit: (reportData: any) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: { latitude: 0, longitude: 0, address: '' },
    images: [] as string[],
    urgency: 'normal',
    quantity: 'medium',
    categories: [] as string[]
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  
  // Catégories de déchets
  const wasteCategories = [
    { id: 'plastic', name: 'Plastique', icon: '🥤' },
    { id: 'glass', name: 'Verre', icon: '🍾' },
    { id: 'metal', name: 'Métal', icon: '🥫' },
    { id: 'fabric', name: 'Textile', icon: '👕' },
    { id: 'organic', name: 'Organique', icon: '🍎' },
    { id: 'toxic', name: 'Toxique', icon: '☣️' },
    { id: 'fishing', name: 'Matériel de pêche', icon: '🎣' },
    { id: 'other', name: 'Autre', icon: '📦' }
  ];
  
  // Niveaux d'urgence
  const urgencyLevels = [
    { id: 'low', name: 'Faible', color: 'bg-green-500' },
    { id: 'normal', name: 'Normale', color: 'bg-blue-500' },
    { id: 'high', name: 'Élevée', color: 'bg-orange-500' },
    { id: 'critical', name: 'Critique', color: 'bg-red-500' }
  ];
  
  // Quantités
  const quantities = [
    { id: 'small', name: 'Petite quantité', description: 'Quelques déchets' },
    { id: 'medium', name: 'Quantité moyenne', description: 'Plusieurs déchets' },
    { id: 'large', name: 'Grande quantité', description: 'Zone très polluée' },
    { id: 'massive', name: 'Déversement massif', description: 'Pollution majeure' }
  ];
  
  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => {
      const categories = [...prev.categories];
      if (categories.includes(categoryId)) {
        return { ...prev, categories: categories.filter(id => id !== categoryId) };
      } else {
        return { ...prev, categories: [...categories, categoryId] };
      }
    });
  };
  
  const handleUrgencyChange = (urgencyId: string) => {
    setFormData(prev => ({ ...prev, urgency: urgencyId }));
  };
  
  const handleQuantityChange = (quantityId: string) => {
    setFormData(prev => ({ ...prev, quantity: quantityId }));
  };
  
  const handleImageCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...newImages]
      }));
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };
  
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError('');
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Ici on pourrait utiliser une API comme Google Maps pour obtenir l'adresse
          setFormData(prev => ({
            ...prev,
            location: {
              latitude,
              longitude,
              address: `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`
            }
          }));
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          setLocationError("Impossible d'obtenir votre position. Veuillez vérifier vos paramètres de localisation.");
          setIsGettingLocation(false);
        }
      );
    } else {
      setLocationError("La géolocalisation n'est pas supportée par votre navigateur.");
      setIsGettingLocation(false);
    }
  };
  
  const handleSubmit = () => {
    onSubmit(formData);
  };
  
  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 250 : -250,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 250 : -250,
      opacity: 0
    })
  };
  
  // Render the form steps
  const renderStep = () => {
    const direction = currentStep > 1 ? -1 : 1;
    
    return (
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full"
        >
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Que souhaitez-vous signaler ?</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type de pollution*
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="debris">Débris plastiques</option>
                    <option value="oil">Déversement d'huile/carburant</option>
                    <option value="chemicals">Produits chimiques</option>
                    <option value="algae">Prolifération d'algues</option>
                    <option value="fishing">Matériel de pêche abandonné</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Décrivez ce que vous observez..."
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Catégorisation des déchets</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Types de déchets observés
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {wasteCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`flex items-center p-3 rounded-lg border transition-all ${
                        formData.categories.includes(category.id)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <span className="text-2xl mr-2">{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau d'urgence
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {urgencyLevels.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => handleUrgencyChange(level.id)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                        formData.urgency === level.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${level.color} mb-1`}></div>
                      <span className="text-sm">{level.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantité estimée
                </label>
                <div className="space-y-2">
                  {quantities.map((quantity) => (
                    <button
                      key={quantity.id}
                      type="button"
                      onClick={() => handleQuantityChange(quantity.id)}
                      className={`flex items-center w-full p-3 rounded-lg border transition-all ${
                        formData.quantity === quantity.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="font-medium">{quantity.name}</div>
                        <div className="text-sm text-gray-500">{quantity.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Photos et localisation</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ajouter des photos
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  
                  <button
                    type="button"
                    onClick={handleImageCapture}
                    className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
                  >
                    <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Prendre ou choisir des photos
                  </button>
                  
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localisation
                </label>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className={`w-full py-3 px-4 rounded-lg border border-gray-300 flex items-center justify-center ${
                      isGettingLocation ? 'bg-gray-100 text-gray-500' : 'text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {isGettingLocation ? (
                      <svg className="animate-spin w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {isGettingLocation ? 'Récupération de la position...' : 'Utiliser ma position actuelle'}
                  </button>
                  
                  {locationError && (
                    <div className="text-red-500 text-sm">{locationError}</div>
                  )}
                  
                  {formData.location.latitude !== 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="font-medium text-blue-800">Position enregistrée</div>
                      <div className="text-sm text-blue-600">{formData.location.address}</div>
                    </div>
                  )}
                  
                  {/* Ici on pourrait ajouter une carte interactive */}
                  <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    Carte interactive (à venir)
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Récapitulatif du signalement</h3>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="mb-4">
                  <div className="text-sm text-blue-700 mb-1">Type de pollution</div>
                  <div className="font-medium">{
                    formData.type === 'debris' ? 'Débris plastiques' :
                    formData.type === 'oil' ? 'Déversement d\'huile/carburant' :
                    formData.type === 'chemicals' ? 'Produits chimiques' :
                    formData.type === 'algae' ? 'Prolifération d\'algues' :
                    formData.type === 'fishing' ? 'Matériel de pêche abandonné' :
                    formData.type === 'other' ? 'Autre' : 'Non spécifié'
                  }</div>
                </div>
                
                {formData.description && (
                  <div className="mb-4">
                    <div className="text-sm text-blue-700 mb-1">Description</div>
                    <div className="text-sm">{formData.description}</div>
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="text-sm text-blue-700 mb-1">Catégories de déchets</div>
                  <div className="flex flex-wrap gap-1">
                    {formData.categories.length > 0 ? (
                      formData.categories.map(categoryId => {
                        const category = wasteCategories.find(c => c.id === categoryId);
                        return category ? (
                          <span key={categoryId} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            {category.icon} {category.name}
                          </span>
                        ) : null;
                      })
                    ) : (
                      <span className="text-gray-500">Non spécifié</span>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-blue-700 mb-1">Niveau d'urgence</div>
                  <div>
                    {urgencyLevels.find(level => level.id === formData.urgency)?.name || 'Non spécifié'}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-blue-700 mb-1">Quantité estimée</div>
                  <div>
                    {quantities.find(q => q.id === formData.quantity)?.name || 'Non spécifié'}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-blue-700 mb-1">Localisation</div>
                  <div>
                    {formData.location.address || 'Non spécifiée'}
                  </div>
                </div>
                
                {formData.images.length > 0 && (
                  <div>
                    <div className="text-sm text-blue-700 mb-1">Photos ({formData.images.length})</div>
                    <div className="grid grid-cols-4 gap-1">
                      {formData.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-16 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-center text-sm text-gray-500">
                Votre signalement sera examiné par notre équipe et les autorités compétentes.
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };
  
  // Progress bar calculation
  const progress = (currentStep / 4) * 100;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl overflow-hidden w-11/12 max-w-md max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Nouveau signalement</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Step indicators */}
          <div className="flex justify-between mt-2 text-xs">
            <div className={currentStep >= 1 ? 'font-medium' : 'opacity-70'}>Type</div>
            <div className={currentStep >= 2 ? 'font-medium' : 'opacity-70'}>Catégories</div>
            <div className={currentStep >= 3 ? 'font-medium' : 'opacity-70'}>Photos</div>
            <div className={currentStep >= 4 ? 'font-medium' : 'opacity-70'}>Récapitulatif</div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto">
          {renderStep()}
        </div>
        
        {/* Footer with navigation buttons */}
        <div className="p-4 border-t border-gray-200 flex justify-between">
          {currentStep > 1 ? (
            <button
              onClick={handlePrevStep}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Précédent
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
          )}
          
          {currentStep < 4 ? (
            <button
              onClick={handleNextStep}
              disabled={currentStep === 1 && !formData.type}
              className={`px-4 py-2 rounded-lg text-white transition-colors ${
                currentStep === 1 && !formData.type
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Suivant
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors"
            >
              Envoyer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportForm; 