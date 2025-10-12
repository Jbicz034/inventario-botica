// frontend/src/components/layout/LoginForm.tsx
import React, { useState } from 'react';
import Logo from '../../assets/logo-botica-novasalud.svg';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {

  const { login, closeLoginModal } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password); 
    // Nota: El modal se cerrará automáticamente al loguearse, gracias a la lógica en AuthContext.
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Nova Salud Logo" className="h-14 w-auto mb-2" />
        <h2 className="text-2xl font-extrabold text-center text-nova-primary">
          Ingreso al Sistema
        </h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        
        {/* Campo Email */}
        <div>
          <input
            id="email"
            type="email"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-nova-blue focus:border-nova-blue sm:text-sm"
            placeholder="Correo (ej: admin@novasalud.com)"
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
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-nova-blue focus:border-nova-blue sm:text-sm"
            placeholder="Contraseña (ej: 1234)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Botón de Ingreso */}
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-lg text-white bg-nova-primary hover:bg-nova-blue transition-colors"
          >
            Acceder
          </button>
        </div>
      </form>

      {/* Enlace a Registro */}
      <div className="mt-4 text-center text-sm">
        <p className="text-gray-600">¿Eres nuevo empleado?</p>
        <Link to="/register" className="text-nova-blue hover:text-nova-primary font-medium" onClick={closeLoginModal}>
          Solicitar registro de usuario
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;