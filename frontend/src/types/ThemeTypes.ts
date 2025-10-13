// frontend/src/types/ThemeTypes.ts

// Tipos permitidos para el tema
export type ThemeMode = 'light' | 'dark' | 'system';

// Interfaz para el Contexto
export interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  isDarkMode: boolean; 
}