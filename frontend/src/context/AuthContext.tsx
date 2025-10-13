// frontend/src/context/AuthContext.tsx
import React, { createContext, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { type User, type AuthContextType } from '../types/AuthTypes'; // Importar tipos

// === 1. Contexto ===
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// === 2. Proveedor del Contexto (Componente) ===
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    if (email === 'admin@novasalud.com' && password === '1234') {
      setIsLoggedIn(true);
      setUser({ name: 'Administrador Nova Salud', email });
      setIsLoginModalOpen(false); 
      navigate('/dashboard'); 
    } else {
      alert('Credenciales incorrectas. Intenta con admin@novasalud.com / 1234');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsLoginModalOpen(false);
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

export default AuthProvider;