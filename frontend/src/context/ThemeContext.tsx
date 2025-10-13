// frontend/src/context/ThemeContext.tsx
import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { type ThemeMode, type ThemeContextType } from '../types/ThemeTypes'; // 👈 Ruta actualizada

// === 1. Contexto ===
// Exportado con nombre para que el hook lo pueda consumir
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// === 2. Proveedor del Contexto (Componente) ===
interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    return savedTheme || 'system';
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    
    const checkShouldBeDark = (mode: ThemeMode) => {
        return mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    
    const shouldBeDark = checkShouldBeDark(theme);
    
    if (shouldBeDark) {
      root.classList.add('dark');
      setIsDarkMode(true);
    } else {
      root.classList.remove('dark');
      setIsDarkMode(false);
    }

    localStorage.setItem('theme', theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateThemeBasedOnSystem = () => {
        if (theme === 'system') {
            const currentShouldBeDark = mediaQuery.matches;
            if (currentShouldBeDark) {
                root.classList.add('dark');
                setIsDarkMode(true);
            } else {
                root.classList.remove('dark');
                setIsDarkMode(false);
            }
        }
    };

    mediaQuery.addEventListener('change', updateThemeBasedOnSystem);
    
    return () => mediaQuery.removeEventListener('change', updateThemeBasedOnSystem);

  }, [theme]); 

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;