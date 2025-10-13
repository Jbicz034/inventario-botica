// frontend/src/components/layout/Header.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

// Iconos Placeholders (se pueden reemplazar con un paquete como lucide-react)
const SunIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
const MoonIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>;
const SystemIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1-4-5-4 10.334 1.294A1 1 0 0014 10.038V12a1 1 0 001 1h2a1 1 0 001-1V8.683a1 1 0 00-.732-.958l-5.356-1.607a2 2 0 00-2.316 1.156L8.684 10.57"></path></svg>;


interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { theme, setTheme, isDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-20 w-full bg-white shadow-sm dark:bg-card-dark transition-colors duration-300">
      <div className="flex items-center justify-between h-16 px-4 lg:pl-6">
        
        {/* 1. Botón de Menú Hamburguesa (Móvil) */}
        <button
          className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-nova-primary focus:outline-none"
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* 2. Título (Solo visible en escritorio) */}
        <div className="flex-1 text-lg font-semibold text-gray-800 dark:text-text-dark hidden lg:block">
          Bienvenido(a), {user?.name || 'Usuario'}
        </div>
        
        {/* 3. Módulo de Usuario y Tema */}
        <div className="flex items-center space-x-4">
          
          {/* Selector de Tema */}
          <div className="flex items-center space-x-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            <button 
              onClick={() => setTheme('light')} 
              className={`p-2 rounded-full transition-colors ${theme === 'light' ? 'bg-nova-secondary text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              title="Modo Claro"
            >
              <SunIcon />
            </button>
            <button 
              onClick={() => setTheme('dark')} 
              className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-nova-secondary text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              title="Modo Oscuro"
            >
              <MoonIcon />
            </button>
            <button 
              onClick={() => setTheme('system')} 
              className={`p-2 rounded-full transition-colors ${theme === 'system' ? 'bg-nova-secondary text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              title="Modo Sistema"
            >
              <SystemIcon />
            </button>
          </div>

          {/* Botón de Logout */}
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;