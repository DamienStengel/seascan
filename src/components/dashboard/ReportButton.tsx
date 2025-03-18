import React from 'react'

interface ReportButtonProps {
  onClick: () => void
}

const ReportButton: React.FC<ReportButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-14 inset-x-0 flex justify-center z-20">
      <button
        className="bg-gradient-to-r from-blue-600 to-teal-500 w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white transform -translate-y-1/2"
        onClick={onClick}
        aria-label="Signaler"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </button>
    </div>
  )
}

export default ReportButton 