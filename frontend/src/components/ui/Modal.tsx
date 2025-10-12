// frontend/src/components/ui/Modal.tsx
import React, { type ReactNode } from 'react';

// 1. Definición de Tipos con TypeScript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void; // Función para cerrar el modal
  children: ReactNode; // El contenido que se mostrará dentro
  title?: string; // Título opcional
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Tamaño del modal (por defecto: md)
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  size = 'md' 
}) => {
  if (!isOpen) return null;

  // Clases dinámicas para controlar el tamaño del modal
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    // 2. Overlay (Fondo oscuro)
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity duration-300 p-4" 
      onClick={onClose} // Cierra el modal al hacer clic fuera
    >
      {/* 3. Contenedor del Modal */}
      <div 
        className={`w-full ${sizeClasses[size]} bg-white rounded-xl shadow-2xl transition-all duration-300 transform scale-100 opacity-100`}
        onClick={(e) => e.stopPropagation()} // Evita que el click dentro cierre el modal
      >
        {/* 4. Encabezado del Modal */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">
            {title || 'Ventana Flotante'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {/* Icono de cierre (X) */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* 5. Cuerpo del Contenido (children) */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;