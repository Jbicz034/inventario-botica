// frontend/src/components/layout/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
// Iconos de Lucide-React
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3,
  LogOut,
  X, // Para el botón de cerrar en móvil
  BriefcaseMedical 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme'; // Asumiendo que existe

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { isDarkMode } = useTheme();
  const { logout, user } = useAuth(); // Obtenemos la info de usuario y el logout
  
  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/sales", icon: ShoppingCart, label: "Ventas" },
    { to: "/inventory", icon: Package, label: "Inventario" },
    { to: "/clients", icon: Users, label: "Clientes" },
    { to: "/reports", icon: BarChart3, label: "Reportes" },
  ];

  // Estilos base de los enlaces
  const baseClasses = "flex items-center p-3 rounded-xl transition-all duration-200 text-sm font-medium group";
  const defaultClasses = "text-gray-600 dark:text-gray-300 hover:bg-nova-primary/10 dark:hover:bg-nova-primary-dark/20";
  const activeClasses = "bg-nova-primary text-white shadow-md shadow-nova-primary/30 dark:shadow-none";

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* 1. Overlay (Solo en Móviles) */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 backdrop-blur-sm bg-gray-900/50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      {/* 2. Sidebar Principal */}
      <div
        // w-64 es el ancho fijo. bg-white/dark es el fondo.
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:static lg:translate-x-0 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } dark:bg-card-dark flex-shrink-0`}
      >
        <div className="p-6 h-full flex flex-col">
          
          {/* Logo y Encabezado */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center">
              {/* Ícono de la Botica */}
              <BriefcaseMedical className="w-8 h-8 text-nova-primary mr-2" />
              <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">Nova Salud</h1>
            </div>
            
            {/* Botón de cerrar en móvil */}
            <button 
                onClick={handleClose} 
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navegación Principal */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={handleClose} 
                className={({ isActive }) => 
                  `${baseClasses} ${isActive ? activeClasses : defaultClasses}`
                }
              >
                {/* Renderizado de Íconos */}
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-nova-primary group-hover:text-nova-primary-dark'}`} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          
          {/* Pie de Sidebar (Usuario y Logout) */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            {/* Información del Usuario */}
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                <p className="text-xs font-semibold text-gray-800 dark:text-white">{user?.name || 'Usuario'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || 'admin@novasalud.com'}</p>
            </div>

            {/* Botón de Logout */}
            <button 
              onClick={logout}
              className={`${baseClasses} w-full justify-center bg-red-500 hover:bg-red-600 text-white`}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
