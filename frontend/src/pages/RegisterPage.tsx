// frontend/src/pages/RegisterPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo-botica-novasalud.svg';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-light dark:bg-gray-900 p-4 transition-colors duration-300">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-2xl dark:bg-card-dark text-center">
        
        <img src={Logo} alt="Nova Salud Logo" className="h-16 w-auto mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-nova-primary dark:text-text-dark">
          Solicitud de Registro de Usuario
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Esta es la página dedicada al registro de nuevos empleados o usuarios.
          Implementarás aquí un formulario para solicitar acceso al sistema.
        </p>
        
        {/* Placeholder para el formulario de registro */}
        <div className="border border-dashed border-gray-300 p-8 rounded-lg dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-500">
            [FUTURO FORMULARIO DE REGISTRO]
          </p>
        </div>
        
        <div className="mt-6">
          <Link to="/" className="text-nova-secondary hover:text-nova-secondary-dark font-medium transition-colors">
            Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;