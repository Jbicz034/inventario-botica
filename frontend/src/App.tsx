// frontend/src/App.tsx
import React, { useState, type ReactNode } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth'; 
import { type UserRole } from './types/AuthTypes'; // Importamos el tipo de rol

// 1. Importar el Layout y las Páginas
import Sidebar from './components/layout/Sidebar.tsx';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';

// Páginas
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx'; 
import DashboardPage from './pages/DashboardPage.tsx';
import SalesPage from './pages/SalesPage.tsx'; 
import InventoryPage from './pages/InventoryPage.tsx';
import ClientsPage from './pages/ClientsPage.tsx';
import ReportsPage from './pages/ReportsPage.tsx';


// === ROLES REQUERIDOS ===
// Rutas que solo pueden ver los usuarios de gestión (Administrador y Empleado)
const MANAGEMENT_ROLES: UserRole[] = ['ADMIN', 'EMPLOYEE'];
// Rutas que pueden ver todos los logeados (incluyendo el Cliente, ej. su historial de compras)
const ALL_LOGGED_ROLES: UserRole[] = ['ADMIN', 'EMPLOYEE', 'CLIENT'];


// === COMPONENTE DE PROTECCIÓN DE RUTA AVANZADA (Protección por Login y Rol) ===
interface ProtectedRouteProps {
    children: ReactNode;
    requiredRoles?: UserRole[]; // Lista de roles que tienen acceso a esta ruta
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
    const { isLoggedIn, hasRequiredRole, user } = useAuth(); 

    // 1. No logeado: Redirige a Login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // 2. Logeado, pero verificamos el rol
    if (requiredRoles && !hasRequiredRole(requiredRoles)) {
        // Si el usuario no tiene el rol requerido, lo enviamos a una ruta permitida.
        // ADMIN/EMPLOYEE -> Dashboard. CLIENTE -> Sales.
        const defaultPath = user?.role === 'CLIENT' ? '/sales' : '/dashboard';
        return <Navigate to={defaultPath} replace />; 
    }

    // 3. Permiso concedido
    return children;
};


// === Componente de Layout principal ===
const DefaultLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoggedIn } = useAuth(); 

  // Ajuste de margen para el contenido principal
  const contentMarginClass = isLoggedIn ? 'lg:ml-64' : 'ml-0'; 

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar solo si está logeado (y la visibilidad interna se filtra por rol) */}
      {isLoggedIn && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
      
      {/* Área principal de contenido */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${contentMarginClass}`}>
        
        {/* Header (Barra Superior) */}
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        
        {/* Contenido de la Página (Outlet para las rutas hijas) */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet /> 
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};


// 3. Componente Raíz de la Aplicación (Manejador de Rutas)
const App: React.FC = () => {
  return (
    <Routes>
      {/* RUTAS DE ACCESO PÚBLICO (No requieren login ni layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* NOTA: Para implementar la compra sin login, se debe crear un Layout Público que solo contenga Header/Footer y manejar la ruta de Ventas como pública en ese Layout. Por ahora, se mantiene protegida por simplicidad, usando el modal de login/DNI dentro de SalesPage. */}

      {/* Rutas Protegidas (Usan el DefaultLayout) */}
      <Route path="/" element={<ProtectedRoute requiredRoles={ALL_LOGGED_ROLES}><DefaultLayout /></ProtectedRoute>}>
        
        {/* 1. RUTAS DE GESTIÓN (Solo ADMIN/EMPLOYEE) */}
        <Route index element={<ProtectedRoute requiredRoles={MANAGEMENT_ROLES}><DashboardPage /></ProtectedRoute>} /> 
        <Route path="dashboard" element={<ProtectedRoute requiredRoles={MANAGEMENT_ROLES}><DashboardPage /></ProtectedRoute>} />
        <Route path="inventory" element={<ProtectedRoute requiredRoles={MANAGEMENT_ROLES}><InventoryPage /></ProtectedRoute>} />
        <Route path="clients" element={<ProtectedRoute requiredRoles={MANAGEMENT_ROLES}><ClientsPage /></ProtectedRoute>} />
        <Route path="reports" element={<ProtectedRoute requiredRoles={MANAGEMENT_ROLES}><ReportsPage /></ProtectedRoute>} />
        
        {/* 2. RUTA DE VENTA (Accesible para todos los logeados, incl. CLIENTE) */}
        <Route path="sales" element={<ProtectedRoute requiredRoles={ALL_LOGGED_ROLES}><SalesPage /></ProtectedRoute>} /> 
        
        {/* Capturar rutas no definidas dentro del layout */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* 404 para rutas fuera del sistema de layout */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <h1 className="text-4xl font-bold text-red-500">404 | Página no encontrada</h1>
        </div>
      } />
    </Routes>
  );
};

export default App;