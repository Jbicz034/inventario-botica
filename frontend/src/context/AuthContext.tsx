// frontend/src/context/AuthContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Definición de Tipos con TypeScript
interface User { name: string; email: string }

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  isLoginModalOpen: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

// 2. Creación del Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  // 3. Lógica de Autenticación (Simulada)
  const login = (email: string, password: string) => {
    // Aquí se integraría la llamada a la API (authService.ts)
    if (email === 'admin@novasalud.com' && password === '1234') {
      setIsLoggedIn(true);
      setUser({ name: 'Administrador Nova Salud', email });
      setIsLoginModalOpen(false); // Cierra el modal
      navigate('/dashboard'); // Redirige
    } else {
      // Usar Alert.tsx en el futuro
      alert('Credenciales incorrectas. Intenta con admin@novasalud.com / 1234');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsLoginModalOpen(false);
    // Redirige a la raíz que a su vez forzará la apertura del modal al no estar logueado
    navigate('/'); 
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        user, 
        isLoginModalOpen,
        login, 
        logout,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 4. Hook de Consumo
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};