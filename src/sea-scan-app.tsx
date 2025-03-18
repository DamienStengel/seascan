import React, { useState } from 'react';

const SEAScanApp = () => {
  const [currentScreen, setCurrentScreen] = useState('onboarding'); // 'onboarding', 'login', 'register', 'dashboard'
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction pour changer d'écran
  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  // Rendu conditionnel selon l'écran actif
  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen navigateTo={navigateTo} />;
      case 'login':
        return <LoginScreen navigateTo={navigateTo} />;
      case 'register':
        return <RegisterScreen navigateTo={navigateTo} />;
      case 'dashboard':
        return <DashboardScreen activeTab={activeTab} setActiveTab={setActiveTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} navigateTo={navigateTo} />;
      default:
        return <OnboardingScreen navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="font-sans h-screen bg-gray-100">
      {renderScreen()}
    </div>
  );
};

// Écran d'onboarding avec carrousel
const OnboardingScreen = ({ navigateTo }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Signalez la pollution marine",
      description: "Prenez une photo, localisez et partagez pour alerter la communauté",
      image: "/api/placeholder/240/240?text=Signaler"
    },
    {
      id: 2,
      title: "Participez aux actions",
      description: "Rejoignez des événements de nettoyage près de chez vous",
      image: "/api/placeholder/240/240?text=Participer"
    },
    {
      id: 3,
      title: "Suivez votre impact",
      description: "Visualisez votre contribution et gagnez des récompenses",
      image: "/api/placeholder/240/240?text=Impact"
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-600 to-teal-500 text-white">
      <div className="flex flex-col items-center justify-center flex-1 px-6">
        {/* Logo */}
        <div className="w-30 h-30 bg-white rounded-full flex items-center justify-center shadow-lg mb-8">
          <div className="w-24 h-24 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-16 h-16 text-blue-600" fill="currentColor">
              <path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zm-2.99-3.9l1.05 4.37c.1.42.01.84-.25 1.17-.14.18-.44.47-.94.47-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93-.01zM13 5h1.96l.54 4.52c.05.39-.07.78-.33 1.07-.22.26-.54.41-.95.41-.67 0-1.22-.59-1.22-1.31V5zM8.49 9.52L9.04 5H11v4.69c0 .72-.55 1.31-1.29 1.31-.34 0-.65-.15-.89-.41-.25-.29-.37-.68-.33-1.07zm-4.45-.16L5.05 5h1.97l-.58 4.86c-.08.65-.6 1.14-1.21 1.14-.49 0-.8-.29-.93-.47-.27-.32-.36-.75-.26-1.17zM5 19v-6.03c.08-.01.15-.03.23-.03.87 0 1.66-.36 2.24-.95.6.6 1.4.95 2.31.95.87 0 1.65-.36 2.23-.93.59.57 1.39.93 2.29.93.84 0 1.64-.35 2.24-.95.58.59 1.37.95 2.24.95.08 0 .15.02.23.03V19H5z"/>
            </svg>
          </div>
        </div>
        
        {/* Titre et sous-titre */}
        <h1 className="text-3xl font-bold mb-2">SEA Scan</h1>
        <p className="text-lg mb-8 opacity-90">Ensemble pour des océans plus propres</p>
        
        {/* Carrousel */}
        <div className="w-full max-w-md mb-8">
          <div className="relative h-64 overflow-hidden rounded-xl bg-white bg-opacity-10 p-6">
            {slides.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`absolute inset-0 transition-opacity duration-500 flex flex-col items-center justify-center p-6 ${index === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                <img src={slide.image} alt={slide.title} className="w-32 h-32 mb-4" />
                <h2 className="text-xl font-bold mb-2">{slide.title}</h2>
                <p className="text-center opacity-90">{slide.description}</p>
              </div>
            ))}
          </div>
          
          {/* Indicateurs de slide */}
          <div className="flex justify-center space-x-2 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-white' : 'bg-white bg-opacity-40'}`}
              ></button>
            ))}
          </div>
        </div>
        
        {/* Boutons */}
        <button 
          onClick={() => navigateTo('dashboard')} 
          className="w-4/5 max-w-xs bg-white text-blue-600 font-medium py-3 rounded-lg shadow-lg mb-4"
        >
          Commencer
        </button>
        <button 
          onClick={() => navigateTo('login')} 
          className="text-white text-base"
        >
          Déjà membre ? Se connecter
        </button>
      </div>
    </div>
  );
};

// Écran de connexion
const LoginScreen = ({ navigateTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* En-tête */}
      <header className="flex items-center h-14 px-4 border-b border-gray-200">
        <button onClick={() => navigateTo('onboarding')} className="mr-4">
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-center flex-1">Connexion</h1>
        <div className="w-6"></div> {/* Élément vide pour centrer le titre */}
      </header>
      
      <div className="flex-1 px-6 pt-8 pb-16 overflow-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="currentColor">
              <path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89z"/>
            </svg>
          </div>
        </div>
        
        {/* Formulaire */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <button type="button" className="text-sm text-blue-600">Mot de passe oublié ?</button>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => navigateTo('dashboard')}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Se connecter
          </button>
        </form>
        
        {/* Séparateur */}
        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600">ou</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        {/* Autres méthodes de connexion */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center bg-white border border-gray-300 py-3 rounded-lg shadow-sm hover:bg-gray-50 transition duration-200">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuer avec Google
          </button>
          
          <button className="w-full flex items-center justify-center bg-black text-white py-3 rounded-lg shadow-sm hover:bg-gray-900 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="white" viewBox="0 0 24 24">
              <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-3.97 2.08-3.368 5.05-3.368 5.05z"/>
            </svg>
            Continuer avec Apple
          </button>
          
          <button className="w-full flex items-center justify-center bg-blue-700 text-white py-3 rounded-lg shadow-sm hover:bg-blue-800 transition duration-200">
            <svg className="w-5 h-5 mr-3" fill="white" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continuer avec Facebook
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigateTo('register')} 
            className="text-blue-600 font-medium"
          >
            Nouveau ? Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
};

// Écran d'inscription
const RegisterScreen = ({ navigateTo }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* En-tête */}
      <header className="flex items-center h-14 px-4 border-b border-gray-200">
        <button onClick={() => navigateTo('login')} className="mr-4">
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-center flex-1">Créer un compte</h1>
        <div className="w-6"></div> {/* Élément vide pour centrer le titre */}
      </header>
      
      <div className="flex-1 px-6 pt-6 pb-16 overflow-auto">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Jean"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Dupont"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="regEmail" className="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
            <input
              type="email"
              id="regEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="regPassword" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="regPassword"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-start mt-4">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1"
            />
            <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
              J'accepte les <a href="#" className="text-blue-600">conditions d'utilisation</a> et la <a href="#" className="text-blue-600">politique de confidentialité</a>.
            </label>
          </div>
          
          <button
            type="button"
            onClick={() => navigateTo('dashboard')}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 mt-4"
          >
            Créer un compte
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigateTo('login')} 
            className="text-blue-600 font-medium"
          >
            Déjà membre ? Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};

// Tableau de bord principal
const DashboardScreen = ({ activeTab, setActiveTab, searchQuery, setSearchQuery, navigateTo }) => {
  // Données de démonstration
  const signalements = [
    { 
      id: 1, 
      type: 'Déchets plastiques', 
      location: 'Plage des Marinières, Villefranche', 
      time: 'Il y a 2h', 
      status: 'Urgent'
    },
    { 
      id: 2, 
      type: 'Pollution aux hydrocarbures', 
      location: 'Port de Nice, Quai Lunel', 
      time: 'Il y a 5h', 
      status: 'Très urgent'
    },
    { 
      id: 3, 
      type: 'Filets de pêche abandonnés', 
      location: 'Calanques de Piana, Corse', 
      time: 'Il y a 8h', 
      status: 'En cours'
    },
  ];

  const events = [
    {
      id: 1,
      title: 'Nettoyage de la plage du Larvotto',
      location: 'Monaco, Plage du Larvotto',
      month: 'Mar',
      day: '22',
      participants: 18,
      maxParticipants: 30
    },
    {
      id: 2,
      title: 'Intervention récifs coraliens',
      location: 'Antibes, Plage de la Gravette',
      month: 'Mar',
      day: '28',
      participants: 12,
      maxParticipants: 15
    }
  ];

  // Fonction utilitaire pour obtenir la couleur de fond du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'Très urgent':
        return 'bg-red-100 text-red-700';
      case 'Urgent':
        return 'bg-orange-100 text-orange-700';
      case 'En cours':
        return 'bg-blue-100 text-blue-700';
      case 'Résolu':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Barre de navigation principale */}
      <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-600" fill="currentColor">
                <path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89z"/>
              </svg>
            </div>
            <h1 className="ml-2 text-xl font-bold">SEA Scan</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </button>
            <div className="w-10 h-10 bg-teal-300 rounded-full flex items-center justify-center text-blue-800 font-bold">
              MS
            </div>
          </div>
        </div>
        
        {/* Barre de recherche */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-full flex items-center px-4 py-2 shadow-sm">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Rechercher des signalements, événements..."
              className="ml-2 flex-1 outline-none text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 overflow-auto pb-16">
        {/* Impact collectif */}
        <section className="mx-4 mt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Impact Collectif</h2>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-blue-600">184</p>
                <p className="text-xs text-gray-500">Signalements</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-blue-600">32</p>
                <p className="text-xs text-gray-500">Actions</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-blue-600">586</p>
                <p className="text-xs text-gray-500">kg collectés</p>
              </div>
            </div>
          </div>
        </section>

        {/* Signalements récents */}
        <section className="mx-4 mt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Signalements récents</h2>
              <a href="#" className="text-blue-600 text-sm">Voir tout</a>
            </div>
            <div className="space-y-3">
              {signalements.map((item) => (
                <div key={item.id} className="flex space-x-3 border-b border-gray-100 pb-3 last:border-0">
                  <img 
                    src={`/api/placeholder/72/72?text=${encodeURIComponent(item.type.substring(0, 1))}`} 
                    alt={item.type} 
                    className="w-16 h-16 object-cover rounded-lg bg-blue-200" 
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-800">{item.type}</h3>
                      <span className="text-xs text-gray-400">{item.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {item.location}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Événements à venir */}
        <section className="mx-4 mt-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Événements à venir</h2>
              <a href="#" className="text-blue-600 text-sm">Voir tout</a>
            </div>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-teal-100 rounded-full flex flex-col items-center justify-center">
                      <span className="text-xs font-bold text-teal-800 uppercase">{event.month}</span>
                      <span className="text-lg font-bold text-teal-800">{event.day}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.location}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="w-24">
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-teal-500 rounded-full" 
                            style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{event.participants}/{event.maxParticipants} participants</p>
                      </div>
                      <button className="bg-teal-500 text-white text-sm rounded-full px-4 py-1">
                        Participer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Navigation inférieure */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
        <button 
          className={`flex flex-col items-center ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('home')}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Accueil</span>
        </button>
        <button 
          className={`flex flex-col items-center ${activeTab === 'map' ? 'text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('map')}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span className="text-xs mt-1">Carte</span>
        </button>
        <button className="flex flex-col items-center relative -mt-3">
          <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="text-xs mt-1 text-blue-600">Signaler</span>
        </button>
        <button 
          className={`flex flex-col items-center ${activeTab === 'events' ? 'text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('events')}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs mt-1">Événements</span>
        </button>
        <button 
          className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('profile')}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs mt-1">Profil</span>
        </button>
      </nav>
    </div>
  );
};

export default SEAScanApp;
