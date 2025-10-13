// frontend/src/types/AuthTypes.ts

export interface User { 
  name: string; 
  email: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  isLoginModalOpen: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}