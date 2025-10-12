// frontend/src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  isDarkMode: boolean; 
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook de Consumo
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Inicializamos el tema con el valor de localStorage o 'system'
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    return savedTheme || 'system';
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // 1. Función para determinar si se debe aplicar el modo oscuro
    const checkShouldBeDark = (mode: ThemeMode) => {
        return mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    
    const shouldBeDark = checkShouldBeDark(theme);
    
    // 2. Aplicar/Remover la clase 'dark' del <html>
    if (shouldBeDark) {
      root.classList.add('dark');
      setIsDarkMode(true);
    } else {
      root.classList.remove('dark');
      setIsDarkMode(false);
    }

    // 3. Guardar la preferencia en localStorage
    localStorage.setItem('theme', theme);

    // 4. Listener para el modo 'system' (detecta cambios en el SO)
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
    
    // Cleanup: Remover el listener cuando el componente se desmonte o el tema cambie
    return () => mediaQuery.removeEventListener('change', updateThemeBasedOnSystem);

  }, [theme]); 

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};