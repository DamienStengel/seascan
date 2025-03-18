import { Routes, Route } from 'react-router-dom'
import { AppContextProvider } from './contexts/AppContext'

// Import des écrans principaux
import OnboardingScreen from './screens/OnboardingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import DashboardScreen from './screens/DashboardScreen'
import NotFoundScreen from './screens/NotFoundScreen'

function App() {
  return (
    <AppContextProvider>
      <div className="font-sans min-h-screen">
        <Routes>
          <Route path="/" element={<OnboardingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/dashboard/*" element={<DashboardScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </div>
    </AppContextProvider>
  )
}

export default App 