// frontend/src/types/AuthTypes.ts

// 1. Tipos de Roles
// Definimos los posibles roles que tendrá un usuario en el sistema.
export type UserRole = 'ADMIN' | 'EMPLOYEE' | 'CLIENT'; 

// 2. Interfaz de Usuario (User)
// Se añade el campo 'role' y el 'id' para diferenciar usuarios.
export interface User { 
  id: number;
  name: string; 
  email: string;
  role: UserRole; // Campo de rol añadido
}

// 3. Interfaz del Contexto de Autenticación (AuthContextType)
// Se añade la nueva función 'hasRequiredRole' y se actualiza la interfaz User.
export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  
  // Para la gestión de la compra rápida sin login inmediato:
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  
  // Funciones de autenticación:
  login: (email: string, password: string) => void;
  logout: () => void;
  
  // NUEVA FUNCIÓN: Gestión de Permisos por Rol
  /**
   * Verifica si el usuario logeado tiene alguno de los roles requeridos.
   * @param requiredRoles Un array con los roles que tienen permiso.
   */
  hasRequiredRole: (requiredRoles: UserRole[]) => boolean; 
}