// frontend/src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { Mail, Lock, User, UserPlus, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Descomentar para usar lógica real
// import { useToast } from '../context/ToastContext'; // Descomentar para notificaciones

const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    // const { register } = useAuth(); // Hook de autenticación
    // const { addToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            // addToast('Las contraseñas no coinciden.', 'error');
            return;
        }

        setLoading(true);
        try {
            // Lógica de Registro Simulada (reemplazar con: await register({ name, email, password });)
            console.log('Registrando:', { name, email, password });
            alert(`Registro exitoso para ${name}. Redirigiendo a Login.`);
            // navigate('/login'); // Redirigir después del registro
        } catch (error) {
            console.error("Registro fallido:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-8 transform transition-all duration-300">
                
                {/* Encabezado */}
                <div className="text-center">
                    <Factory className="w-10 h-10 mx-auto text-nova-primary dark:text-nova-secondary" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                        Registrar Nuevo Usuario
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Crea una cuenta para acceder al sistema Nova Salud.
                    </p>
                </div>
                
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    
                    {/* Campo de Nombre */}
                    <div>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nombre Completo"
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-nova-primary focus:border-nova-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm"
                            />
                        </div>
                    </div>
                    
                    {/* Campo de Email */}
                    <div>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Correo Electrónico"
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-nova-primary focus:border-nova-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm"
                            />
                        </div>
                    </div>
                    
                    {/* Campo de Contraseña */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-nova-primary focus:border-nova-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                name="confirm-password"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirmar Contraseña"
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-nova-primary focus:border-nova-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm"
                            />
                        </div>
                    </div>
                    
                    {/* Botón de Registro */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-lg font-bold text-white bg-nova-secondary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nova-secondary disabled:bg-gray-400 transition-colors duration-200"
                    >
                        {loading ? 'Registrando...' : (
                            <>
                                <UserPlus className="w-5 h-5 mr-2" />
                                Crear Cuenta
                            </>
                        )}
                    </button>
                    
                    {/* Enlace a Login */}
                    <div className="text-center pt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            ¿Ya tienes una cuenta?{' '}
                            <Link 
                                to="/login" 
                                className="font-medium text-nova-primary hover:text-nova-secondary transition-colors"
                            >
                                Inicia sesión aquí
                            </Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RegisterPage;