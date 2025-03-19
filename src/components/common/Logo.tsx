import React from 'react'

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  // Déterminer les tailles en fonction des options
  const sizes = {
    small: {
      size: 'w-12 h-12'
    },
    medium: {
      size: 'w-24 h-24'
    },
    large: {
      size: 'w-48 h-48'
    }
  }

  const imageSize = sizes[size].size

  return (
      <img
          src="/assets/images/logo.png"
          alt="Logo"
          className={`${imageSize} object-contain ${className}`}
      />
  )
}

export default Logo