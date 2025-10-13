// frontend/src/hooks/useTheme.ts
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Ruta al Provider
import { type ThemeContextType } from '../types/ThemeTypes'; // Ruta a los Tipos

// Hook de Consumo
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};