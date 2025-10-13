// frontend/src/App.tsx
import React, { useState } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// 1. Importar el Layout y las Páginas
import Sidebar from './components/layout/Sidebar.tsx';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';

// Páginas
import LoginPage from './pages/LoginPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import SalesPage from './pages/SalesPage.tsx'; 
import InventoryPage from './pages/InventoryPage.tsx';
import ClientsPage from './pages/ClientsPage.tsx';
import ReportsPage from './pages/ReportsPage.tsx';

// Componente de Layout principal
const DefaultLayout: React.FC = () => {
  const { isLoggedIn } = useAuth(); // Usamos el hook para proteger

  if (!isLoggedIn) {
      // Redirigir si no está logeado
      return <Navigate to="/login" replace />;
  }
  
  // Estado para controlar la apertura/cierre del Sidebar en móviles
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // Agregamos clases para que el fondo del cuerpo aplique el tema oscuro/claro
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* 1. Sidebar (Menú Lateral) */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* 2. Área principal de contenido */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        
        {/* Header (Barra Superior) */}
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        
        {/* Contenido de la Página (donde se renderizan las rutas) */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet /> {/* <-- Aquí se renderizarán DashboardPage, SalesPage, etc. */}
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
      {/* Ruta para la página de Login (sin Header, Sidebar o Footer) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas Protegidas (Usan el DefaultLayout) */}
      <Route element={<DefaultLayout />}>
        <Route index element={<DashboardPage />} /> 
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="sales" element={<SalesPage />} /> 
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      {/* Redirección para URLs sin /login y no protegidas */}
      <Route path="*" element={<h1>404 | Página no encontrada</h1>} />
    </Routes>
  );
};

export default App;