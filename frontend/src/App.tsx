// frontend/src/App.tsx
import React, { useState } from 'react'; 
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.ts'; 

// 1. Importar el Layout y las Páginas
import Sidebar from './components/layout/Sidebar.tsx';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';

// Páginas Importadas
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx'; 
import DashboardPage from './pages/DashboardPage.tsx';
import SalesPage from './pages/SalesPage.tsx'; 
import InventoryPage from './pages/InventoryPage.tsx';
import ClientsPage from './pages/ClientsPage.tsx';
import ReportsPage from './pages/ReportsPage.tsx';


// === Componente de Layout principal ===
const DefaultLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoggedIn } = useAuth(); 

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar solo si está logeado */}
      {isLoggedIn && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
      
      {/* Área principal de contenido */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isLoggedIn ? 'lg:ml-64' : 'ml-0'}`}>
        
        {/* Header */}
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};


// === COMPONENTE DE PROTECCIÓN DE RUTA ===
// Usamos React.FC para tipar las props, evitando importar 'type ReactNode'
interface ProtectedRouteProps {
    component: React.FC;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const { isLoggedIn } = useAuth(); 

    return isLoggedIn ? <Component /> : <Navigate to="/login" replace />;
};


// 3. Componente Raíz de la Aplicación (Manejador de Rutas)
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        {/* Rutas Públicas */}
        <Route index element={<DashboardPage />} /> 
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Rutas Privadas */}
        <Route path="sales" element={<ProtectedRoute component={SalesPage} />} />
        <Route path="inventory" element={<ProtectedRoute component={InventoryPage} />} />
        <Route path="clients" element={<ProtectedRoute component={ClientsPage} />} />
        <Route path="reports" element={<ProtectedRoute component={ReportsPage} />} />
      </Route>

      {/* Ruta 404 */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <h1 className="text-4xl font-bold text-red-500">404 | Página no encontrada</h1>
        </div>
      } />
    </Routes>
  );
};

export default App;