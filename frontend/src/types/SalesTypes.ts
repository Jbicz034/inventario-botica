// frontend/src/types/SalesTypes.ts

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  stock: number; // Stock actual del producto (para validación)
  cantidad: number; // Cantidad en el carrito
  subtotal: number;
}

export interface SalesContextType {
  cart: CartItem[];
  cartTotal: number;
  // Funciones
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<boolean>;
}