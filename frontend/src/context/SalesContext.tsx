// frontend/src/context/SalesContext.tsx
import React, { createContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import { type CartItem, type SalesContextType } from '../types/SalesTypes';

// === 1. Contexto ===
// eslint-disable-next-line react-refresh/only-export-components
export const SalesContext = createContext<SalesContextType | undefined>(undefined);

// === 2. Proveedor del Contexto (Componente) ===
interface SalesProviderProps {
  children: ReactNode;
}

const SalesProvider: React.FC<SalesProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.subtotal, 0);
  }, [cart]);

  const addToCart = useCallback((productToAdd: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);

      if (existingItem) {
        const newQuantity = existingItem.cantidad + 1;
        if (newQuantity > existingItem.stock) {
            alert(`No hay suficiente stock de ${productToAdd.nombre}. Stock disponible: ${existingItem.stock}`);
            return prevCart;
        }
        return prevCart.map(item =>
          item.id === productToAdd.id
            ? { ...item, cantidad: newQuantity, subtotal: newQuantity * item.precio }
            : item
        );
      } else {
        const newItem = {
            ...productToAdd,
            cantidad: 1,
            subtotal: productToAdd.precio,
        };
        return [...prevCart, newItem];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setCart(prevCart => 
        prevCart.map(item => {
            if (item.id === productId) {
                const newQuantity = Math.max(1, quantity);
                if (newQuantity > item.stock) {
                    alert(`No hay suficiente stock de ${item.nombre}. Stock disponible: ${item.stock}`);
                    return item;
                }
                return {
                    ...item,
                    cantidad: newQuantity,
                    subtotal: newQuantity * item.precio,
                };
            }
            return item;
        })
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const checkout = useCallback(async () => {
    // Lógica futura para llamar a salesService.createSale(cart)
    if (cart.length > 0) {
        alert(`Venta simulada completada por S/. ${cartTotal.toFixed(2)}`);
        clearCart();
        return true;
    }
    alert('El carrito está vacío.');
    return false;
  }, [cart, cartTotal, clearCart]);

  const value = useMemo(() => ({
    cart,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
  }), [cart, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart, checkout]);

  return (
    <SalesContext.Provider value={value}>
      {children}
    </SalesContext.Provider>
  );
};

export default SalesProvider;