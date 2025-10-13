// frontend/src/components/ui/Modal.tsx
import React, { type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void; 
  children: ReactNode; 
  title?: string; 
  size?: 'sm' | 'md' | 'lg' | 'xl'; 
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  size = 'md' 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    // 1. Overlay (Fondo oscuro con z-index alto)
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm p-4 transition-opacity duration-300" 
      onClick={onClose} 
    >
      {/* 2. Contenedor del Modal */}
      <div 
        className={`w-full ${sizeClasses[size]} bg-white rounded-xl shadow-2xl transition-all duration-300 transform scale-100 opacity-100 dark:bg-card-dark`}
        onClick={(e) => e.stopPropagation()} // Evita que el click dentro cierre el modal
      >
        {/* 3. Encabezado del Modal */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-text-dark">
            {title || 'Ventana Flotante'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {/* Icono de cierre (X) */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* 4. Cuerpo del Contenido */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;