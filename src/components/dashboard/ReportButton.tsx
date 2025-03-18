import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import ReportForm from './ReportForm';

interface ReportButtonProps {
  onClick: () => void
}

const ReportButton: React.FC<ReportButtonProps> = ({ onClick }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleButtonClick = () => {
    setIsFormOpen(true);
    onClick();
  };
  
  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  
  const handleFormSubmit = (reportData: any) => {
    console.log('Rapport soumis:', reportData);
    setIsFormOpen(false);
    // Ici on pourrait envoyer les données à une API
  };
  
  // Variants pour l'animation du bouton
  const buttonVariants = {
    initial: { 
      scale: 1,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    tap: { 
      scale: 0.95
    }
  };
  
  // Variants pour le pulse autour du bouton
  const pulseVariants = {
    initial: {
      scale: 1,
      opacity: 0.7
    },
    animate: {
      scale: 1.5,
      opacity: 0,
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <div className="fixed bottom-14 inset-x-0 flex justify-center z-20">
        <div className="relative">
          {/* Effet de pulse */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-teal-500/30"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, scale: 1, transition: { duration: 0.3 } }}
              />
            )}
          </AnimatePresence>
          
          {/* Bouton principal */}
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-teal-500 w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white transform -translate-y-1/2"
            onClick={handleButtonClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
          </motion.button>
        </div>
      </div>
      
      {/* Formulaire de signalement */}
      {isFormOpen && (
        <ReportForm 
          onClose={handleFormClose} 
          onSubmit={handleFormSubmit} 
        />
      )}
    </>
  )
}

export default ReportButton 