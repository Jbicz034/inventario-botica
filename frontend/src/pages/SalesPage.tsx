// frontend/src/pages/SalesPage.tsx
import React from 'react';
import { Search, ShoppingCart, DollarSign, Plus, Minus, Trash2 } from 'lucide-react';
// import { useSales } from '../hooks/useSales'; // Descomenta cuando lo implementes

const SalesPage: React.FC = () => {
    // const { cart, addItem, removeItem, updateQuantity } = useSales(); 
    
    // Datos de ejemplo
    const cart = [
        { id: 1, name: "Paracetamol 500mg", price: 8.50, quantity: 2 },
        { id: 2, name: "Ibuprofeno 400mg", price: 12.80, quantity: 1 },
    ];
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.18; // Ejemplo de IGV (18%)
    const total = subtotal + tax;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-nova-primary dark:text-nova-secondary transition-colors duration-300">
                Punto de Venta Rápida (POS)
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* Columna 1-3: Búsqueda y Lista de Productos */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar producto por nombre o código..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-nova-primary focus:border-nova-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-shadow duration-200"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-lg dark:bg-card-dark h-[60vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">Productos Populares</h2>
                        {/* Lista de productos de ejemplo */}
                        <div className="space-y-2">
                            {Array(10).fill(0).map((_, index) => (
                                <div key={index} className="flex justify-between items-center p-3 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 rounded-md">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-900 dark:text-white">Medicamento #{index + 1}</span>
                                        <span className="text-sm text-gray-500">Stock: 50 | S/ 15.00</span>
                                    </div>
                                    <button 
                                        className="text-nova-primary hover:text-nova-primary-dark"
                                        // onClick={() => addItem({ ...producto })}
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Columna 4-5: Carrito y Resumen */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-6 rounded-xl shadow-lg dark:bg-card-dark">
                        <h2 className="text-2xl font-bold mb-4 flex items-center dark:text-white">
                            <ShoppingCart className="w-6 h-6 mr-2 text-nova-primary"/>
                            Carrito de Venta ({cart.length})
                        </h2>
                        
                        {/* Lista de Items en el Carrito */}
                        <div className="h-64 overflow-y-auto pr-2 space-y-4 mb-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate dark:text-white">{item.name}</p>
                                        <p className="text-sm text-gray-500">S/ {item.price.toFixed(2)} c/u</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="p-1 rounded-full text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"><Minus className="w-4 h-4" /></button>
                                        <span className="font-semibold dark:text-white">{item.quantity}</span>
                                        <button className="p-1 rounded-full text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"><Plus className="w-4 h-4" /></button>
                                        <button className="text-red-500 hover:text-red-700 ml-2"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <span className="font-bold w-16 text-right dark:text-white">S/ {(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        
                        {/* Resumen de Totales */}
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Subtotal:</span>
                                <span>S/ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>IGV (18%):</span>
                                <span>S/ {tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-2xl font-bold text-nova-primary dark:text-nova-secondary pt-2">
                                <span>TOTAL:</span>
                                <span>S/ {total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Botón de Pago */}
                        <button
                            className="mt-6 w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-xl text-lg font-bold text-white bg-green-500 hover:bg-green-600 transition-colors duration-200"
                            // onClick={handleCheckout}
                        >
                            <DollarSign className="w-6 h-6 mr-2" />
                            Pagar Venta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesPage;