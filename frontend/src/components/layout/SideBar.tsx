// frontend/src/components/layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo-botica-novasalud.svg';

// 1. Definición de Tipos
interface NavItem {
  name: string;
  href: string;
  icon: string; 
}

// 2. Definición de la Navegación
const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'Venta Rápida', href: '/sales', icon: '🛒' },
  { name: 'Inventario', href: '/inventory', icon: '📦' },
  { name: 'Clientes', href: '/clients', icon: '🧑‍🤝‍🧑' },
  { name: 'Reportes', href: '/reports', icon: '📊' },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay para dispositivos móviles cuando el menú está abierto */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-70 lg:hidden" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 1. Menú Lateral Fijo */}
      <div 
        // sidebar-bg utiliza el color nova-primary (definido en index.css)
        className={`fixed inset-y-0 left-0 z-40 w-64 sidebar-bg text-white 
          transform transition-transform duration-300 ease-in-out shadow-xl 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static lg:flex lg:flex-col lg:z-0`}
      >
        {/* 2. Área del Logo */}
        <div className="flex items-center justify-center h-16 border-b border-nova-primary-dark p-2">
          <img 
            src={Logo} 
            alt="Nova Salud Logo" 
            className="h-10 w-auto filter grayscale-0 brightness-150" 
          />
        </div>

        {/* 3. Navegación (Enlaces) */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => 
                `flex items-center px-4 py-2 text-sm font-medium rounded-lg 
                 transition-colors duration-200 
                 ${isActive 
                    // Estilo Activo: Color de Acento (nova-secondary)
                    ? 'bg-nova-secondary text-white shadow-md' 
                    // Estilo Inactivo
                    : 'text-gray-100 hover:bg-nova-primary-light hover:text-white' 
                 }`
              }
              onClick={() => setIsOpen(false)} // Cerrar al seleccionar en móvil
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;