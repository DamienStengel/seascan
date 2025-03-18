import React from 'react'

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  // Déterminer les tailles en fonction des options
  const sizes = {
    small: {
      container: 'w-12 h-12',
      icon: 'w-8 h-8'
    },
    medium: {
      container: 'w-24 h-24',
      icon: 'w-16 h-16'
    },
    large: {
      container: 'w-48 h-48',
      icon: 'w-32 h-32'
    }
  }

  const containerSize = sizes[size].container
  const iconSize = sizes[size].icon

  return (
    <div className={`${containerSize} bg-white rounded-full flex items-center justify-center shadow-lg ${className}`}>
      <div className={`${iconSize} flex items-center justify-center`}>
        <svg viewBox="0 0 24 24" className="text-blue-600" fill="currentColor">
          <path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89z"/>
        </svg>
      </div>
    </div>
  )
}

export default Logo
