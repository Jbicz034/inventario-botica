// frontend/src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { LogIn, User, Lock, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Logo from "/logo-botica-novasalud.svg"; // Importación absoluta para el logo

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('admin@novasalud.com');
    const [password, setPassword] = useState('1234');
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // Si ya está logeado, redirige al dashboard.
    if (isLoggedIn) {
        navigate('/dashboard', { replace: true });
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md dark:bg-card-dark transform hover:scale-[1.01] transition-transform duration-300 border-t-4 border-nova-primary">
                
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="Nova Salud Logo" className="h-16" />
                </div>
                
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
                    Acceso al Sistema
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                    Gestión de Inventario y Ventas
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo Email */}
                    <div>
                        <label 
                            htmlFor="email" 
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-nova-primary focus:border-nova-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="tu.email@botica.com"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-400" />
                        </div>
                    </div>

                    {/* Campo Contraseña */}
                    <div>
                        <label 
                            htmlFor="password" 
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-nova-primary focus:border-nova-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-400" />
                        </div>
                    </div>
                    
                    {/* Botón de Login */}
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-nova-primary hover:bg-nova-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nova-primary-light transition-colors duration-200"
                    >
                        <LogIn className="w-5 h-5 mr-2" />
                        Iniciar Sesión
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button 
                        onClick={() => navigate('/')} 
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center mx-auto"
                    >
                        <X className="w-4 h-4 mr-1"/>
                        Volver a la Página Principal
                    </button>
                </div>
                
                {/* Nota de credenciales */}
                <p className="mt-8 text-xs text-center text-gray-400 dark:text-gray-500">
                    * Credenciales de prueba: admin@novasalud.com / 1234
                </p>
            </div>
        </div>
    );
};

export default LoginPage;