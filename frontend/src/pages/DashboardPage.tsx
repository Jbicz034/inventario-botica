// frontend/src/pages/DashboardPage.tsx
import React from 'react';
import { BarChart, Users, DollarSign, Package } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

// Componente Card de Estadísticas
interface StatCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
    color: string;
    isLocked?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, isLocked = false }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${color} dark:bg-card-dark dark:shadow-xl dark:border-l-4 dark:border-${color.replace('border-', '')}`} >
        {isLocked && (
            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center rounded-xl backdrop-blur-sm z-10">
                <p className="text-white font-bold text-lg">🔒 Inicia Sesión</p>
            </div>
        )}
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
            </div>
            <Icon className={`w-8 h-8 text-${color.split('-')[1]}-500`} />
        </div>
    </div>
);


const DashboardPage: React.FC = () => {
    const { isLoggedIn } = useAuth();
    const { isDarkMode } = useTheme();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-nova-primary dark:text-nova-secondary transition-colors duration-300">
                Resumen de Operaciones
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Ventas Diarias" 
                    value="S/ 1,250.00" 
                    icon={DollarSign} 
                    color="border-green-500"
                    isLocked={!isLoggedIn} 
                />
                <StatCard 
                    title="Stock Crítico" 
                    value="9 Productos" 
                    icon={Package} 
                    color="border-red-500" 
                    isLocked={!isLoggedIn}
                />
                <StatCard 
                    title="Clientes Registrados" 
                    value="5 Clientes" 
                    icon={Users} 
                    color="border-indigo-500"
                    isLocked={!isLoggedIn}
                />
                <StatCard 
                    title="Productos Totales" 
                    value="150 SKU" 
                    icon={BarChart} 
                    color="border-yellow-500" 
                />
            </div>

            {/* Sección de Alertas y Gráficos (Solo visibles si está logeado) */}
            {isLoggedIn ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg dark:bg-card-dark">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">Gráfico de Ventas Mensuales</h2>
                        <div className="h-64 flex items-center justify-center text-gray-500">
                           {/* Aquí irá un componente de gráfico real */}
                           <p>Contenido del Gráfico...</p> 
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg dark:bg-card-dark">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">Alertas de Stock</h2>
                        <ul className="space-y-2">
                            <li className="text-red-600 dark:text-red-400">Vitamina C (3 en stock)</li>
                            <li className="text-red-600 dark:text-red-400">Crema Hidratante (2 en stock)</li>
                            <li className="text-yellow-600 dark:text-yellow-400">Amoxicilina (15 en stock)</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="p-10 text-center bg-indigo-100 rounded-xl dark:bg-indigo-900/50">
                    <p className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                        Inicia sesión para acceder a la gestión completa, gráficos y alertas de stock.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;