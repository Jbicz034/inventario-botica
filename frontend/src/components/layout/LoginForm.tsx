// frontend/src/components/layout/LoginForm.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/logo-botica-novasalud.svg';

const LoginForm: React.FC = () => {
  const { login, closeLoginModal } = useAuth(); 
  const [email, setEmail] = useState('admin@novasalud.com');
  const [password, setPassword] = useState('1234');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password); 
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Nova Salud Logo" className="h-14 w-auto mb-2" />
        <h2 className="text-2xl font-extrabold text-center text-nova-primary">
          Ingreso de Personal
        </h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        
        {/* Campo Email */}
        <div>
          <input
            id="email"
            type="email"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-nova-secondary focus:border-nova-secondary sm:text-sm transition-colors"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Campo Contraseña */}
        <div>
          <input
            id="password"
            type="password"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-nova-secondary focus:border-nova-secondary sm:text-sm transition-colors"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Botón de Ingreso */}
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-lg text-white bg-nova-primary hover:bg-nova-primary-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nova-primary"
          >
            Acceder
          </button>
        </div>
      </form>

      {/* Enlace a Registro */}
      <div className="mt-4 text-center text-sm">
        <p className="text-gray-600 dark:text-gray-400">¿Eres nuevo empleado?</p>
        <Link to="/register" className="text-nova-secondary hover:text-nova-secondary-dark font-medium transition-colors" onClick={closeLoginModal}>
          Solicitar registro de usuario
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;