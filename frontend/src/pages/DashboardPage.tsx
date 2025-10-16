// frontend/src/pages/DashboardPage.tsx
import React from 'react';
import { BarChart, Users, DollarSign, Package, XCircle } from 'lucide-react'; // Añadidos Lock y XCircle
import { useAuth } from '../hooks/useAuth';
import { type UserRole } from '../types/AuthTypes'; // Importamos el tipo de rol

// Roles de gestión que tienen acceso completo al dashboard
const MANAGEMENT_ROLES: UserRole[] = ['ADMIN', 'EMPLOYEE']; 

// Componente Card de Estadísticas
interface StatCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
    color: string; // Clase de Tailwind para el color del borde y el icono, ej: 'border-green-500'
}

// StatCard: Ajustado para usar el color dinámico y consistencia
const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
    // Extraemos el nombre del color (ej: 'green') de la clase 'border-green-500'
    const colorName = color.split('-')[1];

    return (
        // Uso de gray-800 para el fondo oscuro, más consistente con Header/Sidebar
        <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${color} dark:bg-gray-800 dark:shadow-xl dark:border-l-4`}> 
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
                </div>
                {/* Color del ícono dinámico */}
                <Icon className={`w-8 h-8 text-${colorName}-500`} /> 
            </div>
        </div>
    );
};

// === COMPONENTE PRINCIPAL ===
const DashboardPage: React.FC = () => {
    // Usamos hasRequiredRole para la verificación
    const { isLoggedIn, hasRequiredRole, user } = useAuth(); 
    const isManagementUser = isLoggedIn && hasRequiredRole(MANAGEMENT_ROLES);

    // --- 1. Bloque de acceso o Permisos insuficientes ---
    if (!isManagementUser) {
        // El bloqueo de "Inicia Sesión" se quita y se reemplaza por un chequeo de rol.
        
        return (
            <div className="p-10 text-center bg-red-100 rounded-xl shadow-lg dark:bg-red-900/50">
                 <XCircle className="w-10 h-10 mx-auto text-red-600 dark:text-red-300 mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {/* Mensaje dinámico según el estado del usuario */}
                    {isLoggedIn 
                        ? `Hola ${user?.name || 'Usuario'}, Acceso Restringido`
                        : 'Acceso No Autorizado'
                    }
                </h1>
                <p className="text-xl font-semibold text-red-700 dark:text-red-300">
                    {isLoggedIn 
                        // Si está logeado pero es CLIENTE (o rol sin permiso)
                        ? `Tu rol (${user?.role}) no tiene permisos para ver el Dashboard de Gestión.`
                        // Si no está logeado (aunque App.tsx debería redirigir primero)
                        : 'Por favor, inicia sesión con una cuenta de Administración o Empleado.'
                    }
                </p>
                
            </div>
        );
    }

    // --- 2. Contenido de Dashboard (Solo ADMIN/EMPLOYEE) ---
    return (
        <div className="space-y-6">
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard de Gestión
            </h1>

            {/* Fila de Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Ventas del Mes" 
                    value="$15,250" 
                    icon={DollarSign} 
                    color="border-green-500" 
                />
                <StatCard 
                    title="Nuevos Clientes" 
                    value="45" 
                    icon={Users} 
                    color="border-blue-500" 
                />
                <StatCard 
                    title="Productos Vendidos" 
                    value="1,200" 
                    icon={Package} 
                    color="border-indigo-500" 
                />
                <StatCard 
                    title="Tasa de Crecimiento" 
                    value="+8.5%" 
                    icon={BarChart} 
                    color="border-yellow-500" 
                />
            </div>

            {/* Fila de Gráficos y Alertas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gráfico de Ventas (2/3 del ancho) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800">
                    <h2 className="text-xl font-semibold mb-4 dark:text-white">Gráfico de Ventas Mensuales</h2>
                    <div className="h-72 flex items-center justify-center text-gray-500 dark:text-gray-400">
                       <p>Aquí irá un componente de gráfico real (ej. Recharts)</p> 
                    </div>
                </div>
                
                {/* Alertas de Stock (1/3 del ancho) */}
                <div className="bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800">
                    <h2 className="text-xl font-semibold mb-4 dark:text-white">Alertas de Stock</h2>
                    <ul className="space-y-3">
                        <li className="flex items-center text-red-600 dark:text-red-400 border-b border-gray-200 dark:border-gray-700 pb-2">
                            <Package className="w-5 h-5 mr-2" /> Vitamina C (3 en stock - ¡Pedir ya!)
                        </li>
                        <li className="flex items-center text-yellow-600 dark:text-yellow-400">
                             <Package className="w-5 h-5 mr-2" /> Amoxicilina (15 en stock - Nivel bajo)
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;