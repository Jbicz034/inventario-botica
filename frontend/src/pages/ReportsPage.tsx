// frontend/src/pages/RegisterPage.tsx
import React from 'react';

const RegisterPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-10 bg-white rounded-xl shadow-lg dark:bg-card-dark w-full max-w-md">
            <h1 className="text-2xl font-bold text-center dark:text-white mb-4">Registro de Usuario</h1>
            <p className="text-center text-gray-600 dark:text-gray-400">Formulario de registro de nuevos empleados.</p>
        </div>
    </div>
  );
};

export default RegisterPage;