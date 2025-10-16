// frontend/src/components/layout/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3,
  LogOut,
  X,
  BriefcaseMedical 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { type UserRole } from '../../types/AuthTypes'; // Importamos el tipo de rol

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  // EXTRAEMOS hasRequiredRole de useAuth
  const { logout, user, hasRequiredRole } = useAuth(); 
  
  // Roles de gestión vs. roles públicos
  const MANAGEMENT_ROLES: UserRole[] = ['ADMIN', 'EMPLOYEE'];
  const PUBLIC_ROLES: UserRole[] = ['ADMIN', 'EMPLOYEE', 'CLIENT'];

  // Definición de ítems con sus roles requeridos
  const allNavItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", requiredRoles: MANAGEMENT_ROLES },
    { to: "/sales", icon: ShoppingCart, label: "Punto de Venta", requiredRoles: PUBLIC_ROLES }, 
    { to: "/inventory", icon: Package, label: "Inventario", requiredRoles: MANAGEMENT_ROLES },
    { to: "/clients", icon: Users, label: "Clientes", requiredRoles: MANAGEMENT_ROLES },
    { to: "/reports", icon: BarChart3, label: "Reportes", requiredRoles: MANAGEMENT_ROLES },
  ];

  // FILTRO: Solo se muestran los ítems a los que el usuario tiene acceso
  const navItems = allNavItems.filter(item => hasRequiredRole(item.requiredRoles));

  // Estilos base, etc. (manteniendo la estructura que enviaste)
  const baseClasses = "flex items-center p-3 rounded-xl transition-all duration-200 text-sm font-medium group"; 
  const defaultClasses = "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
  const activeClasses = "bg-nova-primary text-white shadow-lg shadow-nova-primary/30";

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `${baseClasses} ${isActive ? activeClasses : defaultClasses}`;

  const handleClose = () => setIsOpen(false);

  return (
    // ... (El resto del JSX es idéntico) ...
    <>
      {/* Overlay para móviles */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-4">
          
          {/* Logo y Botón de Cierre (Mobile) */}
          <div className="flex items-center justify-between h-16 border-b dark:border-gray-700 mb-6">
            <div className="flex items-center">
                <BriefcaseMedical className="w-8 h-8 text-nova-primary mr-2" />
                <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">Nova Salud</h1>
            </div>
            <button 
              className="p-1 lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400" 
              onClick={handleClose}
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navegación Principal */}
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => ( // Mapea los ítems FILTRADOS
              <NavLink 
                key={item.to}
                to={item.to}
                className={navLinkClass}
                onClick={handleClose}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-nova-primary dark:text-nova-secondary group-hover:text-nova-primary-dark'}`} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          
          {/* Pie de Sidebar (Usuario y Logout) */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            {/* Información del Usuario */}
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl">
                <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{user?.name || 'Usuario'}</p>
                {/* AÑADIDO: Muestra el rol en el sidebar */}
                <p className="text-xs text-nova-primary dark:text-nova-secondary font-medium uppercase">{user?.role || 'Invitado'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || 'admin@novasalud.com'}</p>
            </div>

            {/* Botón de Logout */}
            <button 
              onClick={() => { logout(); handleClose(); }}
              className="w-full flex items-center p-3 rounded-xl text-red-500 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;