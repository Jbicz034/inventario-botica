// frontend/src/hooks/useSales.ts
import { useContext } from 'react';
import { SalesContext } from '../context/SalesContext';
import { type SalesContextType } from '../types/SalesTypes';

// Hook de Consumo
export const useSales = (): SalesContextType => {
  const context = useContext(SalesContext);
  if (context === undefined) {
    throw new Error('useSales debe ser usado dentro de un SalesProvider');
  }
  return context;
};