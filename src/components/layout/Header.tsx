import React from 'react'

interface HeaderProps {
  title?: string
  showBackButton?: boolean
  showSearch?: boolean
  transparent?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  onBackClick?: () => void
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showSearch = false,
  transparent = false,
  searchValue = '',
  onSearchChange,
  onBackClick,
}) => {
  return (
    <header 
      className={`${
        transparent 
          ? 'bg-transparent' 
          : 'bg-gradient-to-r from-blue-600 to-teal-500'
      } text-white px-4 py-3 flex items-center`}
    >
      {showBackButton && (
        <button 
          onClick={onBackClick} 
          className="mr-3 p-1"
          aria-label="Retour"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>
      )}

      {!showSearch && (
        <div className="flex items-center space-x-2 flex-1">
          <img src="@logo.png" alt="OcéaPulse" className="h-8 w-8" />
          <h1 className="text-xl font-semibold">OcéaPulse</h1>
        </div>
      )}

      {showSearch && (
        <div className="flex items-center flex-1">
          <img src="@logo.png" alt="OcéaPulse" className="h-8 w-8 mr-2" />
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchValue}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-1 focus:ring-white"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-2.5 text-white opacity-70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header 