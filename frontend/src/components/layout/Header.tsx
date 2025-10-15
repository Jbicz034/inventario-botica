// frontend/src/components/layout/Header.tsx
import React from 'react';
import { Menu, Search, Moon, Sun, Monitor } from 'lucide-react';
import { NavLink } from 'react-router-dom'; // Cambiado: importación correcta de NavLink
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { type ThemeMode } from '../../types/ThemeTypes';

interface HeaderProps {
    setIsSidebarOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen }) => {
    const { isLoggedIn, user } = useAuth(); // Cambiado: extraer user directamente del hook
    const { theme, setTheme } = useTheme();

    // Iconos para el selector de tema
    const themeIcons: Record<ThemeMode, React.ElementType> = {
        light: Sun,
        dark: Moon,
        system: Monitor,
    };
    
    // Función para alternar el tema
    const toggleTheme = () => {
        const themes: ThemeMode[] = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    return (
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 p-4 shadow-sm dark:bg-card-dark/90 dark:border-gray-700 transition-colors duration-300">
            <div className="flex justify-between items-center">
                
                <div className="flex items-center">
                    {/* Botón para abrir Sidebar */}
                    {isLoggedIn && (
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="text-gray-600 hover:text-nova-primary lg:hidden p-2 mr-4 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:text-nova-secondary dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    )}
                    
                    {/* Barra de Búsqueda Principal */}
                    {isLoggedIn && (
                        <div className="hidden md:block relative w-96">
                            <input
                                type="text"
                                placeholder="Buscar productos, clientes o reportes..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:ring-nova-primary focus:border-nova-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-shadow duration-200"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    )}
                </div>

                {/* Controles de Usuario y Tema */}
                <div className="flex items-center space-x-4">
                    
                    {/* Título de Bienvenida */}
                    {!isLoggedIn && (
                        <span className="text-lg font-semibold text-gray-800 dark:text-white">
                            Bienvenido a Nova Salud
                        </span>
                    )}

                    {/* Botón/Selector de Tema */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-gray-600 hover:text-nova-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:text-nova-secondary dark:hover:bg-gray-700 transition-colors duration-200"
                        title={`Modo actual: ${theme}`}
                    >
                        {React.createElement(themeIcons[theme], { className: "w-6 h-6" })}
                    </button>

                    {/* Elemento de usuario */}
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-2">
                           <span className="text-gray-800 dark:text-white text-sm hidden sm:inline">
                               {user?.name || 'Admin'} {/* Cambiado: usar user extraído del hook */}
                           </span>
                           <div className="w-8 h-8 rounded-full bg-nova-primary flex items-center justify-center text-white font-bold text-sm">
                               {user?.name?.charAt(0) || 'A'} {/* Cambiado: manejo seguro de opcional */}
                           </div>
                        </div>
                    ) : (
                        <NavLink 
                            to="/login" 
                            className="bg-nova-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-nova-primary-dark transition-colors duration-200"
                        >
                            Iniciar Sesión
                        </NavLink>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;