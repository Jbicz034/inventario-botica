// frontend/src/components/layout/Sidebar.tsx
import React, { type JSX } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo-botica-novasalud.svg';

// === DEFINICIÓN DE ICONOS SVG ===
// Nota: Puedes reemplazar estas funciones con iconos de una librería como Lucide, Heroicons, etc.
const HomeIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-10v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1V9a1 1 0 011-1h2a1 1 0 011 1v3m-6 6h6"></path></svg>;
const ShoppingCartIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>;
const PackageIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10m0-4.492l-4.707 4.707a1 1 0 01-1.414 0L4 17.07V19a2 2 0 002 2h12a2 2 0 002-2v-1.93l-1.879-1.879a1 1 0 010-1.414L16 12"></path></svg>;
const UsersIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-3a1 1 0 01-1-1v-4a1 1 0 00-1-1H9a1 1 0 00-1 1v4a1 1 0 01-1 1H4a2 2 0 01-2-2v-2a4 4 0 014-4h1a4 4 0 014-4h2a4 4 0 014 4h1a4 4 0 014 4v2a2 2 0 01-2 2z"></path></svg>;
const ChartIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-0v8m-4-0v8m8-16v8m0-12v4"></path></svg>;

// === DEFINICIÓN DE LA NAVEGACIÓN ===
interface NavItem {
  name: string;
  href: string;
  icon: () => JSX.Element;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Venta Rápida', href: '/sales', icon: ShoppingCartIcon },
  { name: 'Inventario', href: '/inventory', icon: PackageIcon },
  { name: 'Clientes', href: '/clients', icon: UsersIcon },
  { name: 'Reportes', href: '/reports', icon: ChartIcon },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay para dispositivos móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-70 lg:hidden" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Menú Lateral Fijo */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 sidebar-bg text-white 
          transform transition-transform duration-300 ease-in-out shadow-xl 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static lg:flex lg:flex-col lg:z-0`}
      >
        {/* Área del Logo */}
        <div className="flex items-center justify-center h-16 border-b border-nova-primary-dark p-2">
          <img 
            src={Logo} 
            alt="Nova Salud Logo" 
            className="h-10 w-auto filter grayscale-0 brightness-150" 
          />
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => 
                `flex items-center px-4 py-2 text-sm font-medium rounded-lg 
                 transition-colors duration-200 
                 ${isActive 
                    ? 'bg-nova-secondary text-white shadow-md' 
                    : 'text-gray-100 hover:bg-nova-primary-light hover:text-white' 
                 }`
              }
              onClick={() => setIsOpen(false)} 
            >
              {/* Renderizar Icono SVG */}
              <item.icon />
              <span className="ml-3">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;