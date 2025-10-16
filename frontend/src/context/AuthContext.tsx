// frontend/src/context/AuthContext.tsx
import React, { createContext, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
// Asegúrate de que AuthTypes.ts tenga las interfaces UserRole, User y AuthContextType
import { type UserRole, type User, type AuthContextType } from '../types/AuthTypes'; 

// === SEEDERS SIMULADOS (Para pruebas de diseño) ===
// Contraseña simulada para todos: '1234'
const SEED_USERS: Record<string, User> = {
    // Usuario de Gestión
    'admin@novasalud.com': { id: 101, name: 'Admin Maestro', email: 'admin@novasalud.com', role: 'ADMIN' },
    'empleado@novasalud.com': { id: 102, name: 'Juan Empleado', email: 'empleado@novasalud.com', role: 'EMPLOYEE' },
    // Usuario de Cliente
    'cliente@novasalud.com': { id: 103, name: 'Carlos Cliente', email: 'cliente@novasalud.com', role: 'CLIENT' },
};


// === 2. Contexto ===
// ¡LA CORRECCIÓN ESTÁ AQUÍ! Usar 'export const' para permitir la importación con nombre en useAuth.ts
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);


// === 4. Proveedor del Contexto (Componente) ===
interface AuthProviderProps { children: ReactNode; }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Inicialización de estado: Si hay un usuario guardado en localStorage, lo usamos.
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('user'));
  const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    const simulatedUser = SEED_USERS[email];

    if (simulatedUser && password === '1234') { 
        setIsLoggedIn(true);
        setUser(simulatedUser);
        localStorage.setItem('user', JSON.stringify(simulatedUser)); // Persistencia
        setIsLoginModalOpen(false); 
        
        // Redirección basada en el rol
        if (simulatedUser.role === 'CLIENT') {
            navigate('/sales'); // Clientes van directo al punto de venta
        } else {
            navigate('/dashboard'); // Admin/Empleado van al dashboard de gestión
        }
    } else {
        alert('Credenciales incorrectas o usuario no encontrado. Use las cuentas de prueba.');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user'); // Limpiar persistencia
    setIsLoginModalOpen(false);
    navigate('/'); // Redirigir a la página pública (Dashboard/Inicio)
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  
  // IMPLEMENTACIÓN DE VERIFICACIÓN DE ROL
  const hasRequiredRole = (requiredRoles: UserRole[]): boolean => {
    // Si no hay usuario logeado, no tiene el rol
    if (!user) return false; 
    return requiredRoles.includes(user.role);
  }

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
        hasRequiredRole 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};