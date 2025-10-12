// frontend/src/App.tsx

import React, { useState } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

// =========================================================================
// === CONTEXTOS Y HOOKS NECESARIOS ===
// =========================================================================

// useAuth: Maneja el estado de sesión (isLoggedIn, login, logout, modal)
import { useAuth } from './context/AuthContext';
// useTheme: Controla el modo de color (claro/oscuro/sistema)
import { useTheme } from './context/ThemeContext'; 

// =========================================================================
// === COMPONENTES UI/LAYOUT ESENCIALES ===
// =========================================================================

// Componente genérico y reutilizable para ventanas flotantes
import Modal from './components/ui/Modal.tsx'; 
// Componente de formulario de Login (contenido del Modal)
import LoginForm from './components/layout/LoginForm.tsx';
// Elementos de Layout
import Sidebar from './components/layout/Sidebar.tsx';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';

// =========================================================================
// === PÁGINAS (VISTAS PRINCIPALES) ===
// =========================================================================

// Páginas esenciales y placeholders para el Router
import DashboardPage from './pages/DashboardPage.tsx';

// Componentes Placeholder: Se definen aquí para evitar errores de importación en el Router
// Serán reemplazados con lógica real en el futuro.
const RegisterPage = () => (
  <div className="p-8 text-center text-xl text-gray-800 dark:text-gray-200">
    Página de Registro de Usuarios (En desarrollo).
  </div>
);
const SalesPage = () => <div className="p-8 text-xl text-gray-800 dark:text-gray-200">Módulo de Venta Rápida (En desarrollo).</div>;
const InventoryPage = () => <div className="p-8 text-xl text-gray-800 dark:text-gray-200">Módulo de Inventario (En desarrollo).</div>;
const ReportsPage = () => <div className="p-8 text-xl text-gray-800 dark:text-gray-200">Módulo de Reportes (En desarrollo).</div>;


// ----------------------------------------------------------------------
// 1. LÓGICA DE PROTECCIÓN DE RUTA (Protected Route HOC)
// ----------------------------------------------------------------------

/**
 * Verifica si el usuario está logueado. Si no lo está, abre el modal de login
 * y redirige a la ruta principal para forzar la autenticación antes de acceder al contenido.
 */
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isLoggedIn, openLoginModal } = useAuth();

  if (!isLoggedIn) {
    openLoginModal(); 
    return <Navigate to="/" replace />; 
  }

  return children;
};


// ----------------------------------------------------------------------
// 2. LAYOUT PRINCIPAL (DefaultLayout)
// ----------------------------------------------------------------------

/**
 * Estructura principal de la aplicación: Contiene Sidebar, Header, Footer y la vista activa (Outlet).
 * Usa clases de Tailwind para manejar la adaptabilidad del modo claro/oscuro.
 */
const DefaultLayout: React.FC = () => {
  // Estado para controlar la apertura/cierre del Sidebar en móviles (menú hamburguesa)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // Fondo de la aplicación. bg-bg-light y dark:bg-gray-900 usan los colores definidos en tailwind.config.js
    <div className="flex min-h-screen bg-bg-light dark:bg-gray-900 transition-colors duration-300">
      
      {/* 1. Sidebar (Menú Lateral) */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* 2. Área principal de contenido y navegación */}
      {/* lg:pl-64: En escritorio, este padding empuja el contenido para no quedar debajo del Sidebar fijo */}
      <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-300"> 
        
        {/* Header (Barra Superior) */}
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        
        {/* Contenido de la Página (el cuerpo principal) */}
        <main className="flex-1 p-4 lg:p-6">
          {/* Outlet renderiza el componente de la ruta activa */}
          <Outlet /> 
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};


// ----------------------------------------------------------------------
// 3. COMPONENTE RAÍZ DE LA APLICACIÓN (App)
// ----------------------------------------------------------------------

/**
 * Punto de entrada principal para el enrutamiento y la gestión de modales globales.
 */
const App: React.FC = () => {
  // Obtenemos el estado de visibilidad del modal y la función para cerrarlo
  const { isLoginModalOpen, closeLoginModal } = useAuth();

  // El hook useTheme es importado, pero no necesita lógica directa en este componente
  const { theme } = useTheme(); 

  return (
    <>
      {/* Definición de las Rutas de la Aplicación */}
      <Routes>
        
        {/* Ruta Pública: /register (no requiere login, usa componente simple) */}
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Rutas Protegidas: Envueltas en ProtectedRoute y usan DefaultLayout */}
        <Route path="/" element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>}>
          
          {/* index: La ruta por defecto '/' */}
          <Route index element={<DashboardPage />} /> 
          
          {/* Rutas secundarias (con placeholders) */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* Ruta 404: Para cualquier URL no definida */}
        <Route path="*" element={
          <h1 className="text-center mt-20 text-3xl font-bold text-gray-800 dark:text-gray-200">
            404 | Página no encontrada
          </h1>
        } />
      </Routes>
      
      {/* Modal Global: Muestra la ventana de login cuando es necesario */}
      <Modal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal} 
        title="Ingreso de Personal"
        size="sm" // Modal pequeño para un formulario simple
      >
        <LoginForm /> {/* Contenido del modal */}
      </Modal>
    </>
  );
};

export default App;