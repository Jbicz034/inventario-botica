// frontend/src/pages/DashboardPage.tsx
import React from 'react';

// === Tipos y Componentes ===

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'green' | 'blue' | 'nova-primary' | 'purple';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => (
  // La tarjeta usa bg-white y se adapta al modo oscuro (dark:bg-card-dark)
  <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 border-${color} transition-all duration-300 hover:shadow-xl`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className={`mt-1 text-3xl font-extrabold text-${color} dark:text-text-dark`}>{value}</p>
      </div>
      <div className={`text-4xl text-${color}/50`}>{icon}</div>
    </div>
  </div>
);

// Componente clave para el requisito de Inventario
const StockAlerts: React.FC = () => {
    // Datos simulados (deberán ser reemplazados por una llamada al servicio de API)
    const criticalItems = [
        { id: 8, name: 'Vitamina C 1000mg', stock: 3, min: 10 }, 
        { id: 9, name: 'Crema Hidratante', stock: 2, min: 5 }, 
    ];

    if (criticalItems.length === 0) {
        return (
            <div className="bg-green-100 p-4 rounded-lg text-green-700 border border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-600">
                ✅ **Inventario Saludable:** No hay productos en stock crítico.
            </div>
        );
    }

    return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md dark:bg-red-900/20 dark:border-red-700">
            <h3 className="text-xl font-bold text-red-700 flex items-center mb-3 dark:text-red-400">
                ⚠️ Alerta de Stock Crítico ({criticalItems.length})
            </h3>
            <p className="text-red-600 mb-4 dark:text-red-300">
                ¡Acción requerida! Reponer los siguientes productos para evitar desabastecimiento:
            </p>
            <ul className="space-y-2">
                {criticalItems.map((item) => (
                    <li key={item.id} className="text-sm bg-red-100 p-2 rounded-md flex justify-between dark:bg-red-900/40 dark:text-red-200">
                        <span className="font-semibold">{item.name}</span>
                        <span>Stock Actual: <span className="text-red-700 font-bold dark:text-red-300">{item.stock}</span> (Mínimo: {item.min})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


// === Página Principal ===
const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-text-dark">
        🏠 Dashboard Principal
      </h1>
      
      {/* Sección 1: Alertas de Stock */}
      <StockAlerts />

      {/* Sección 2: Métricas Clave (Usando colores de Tailwind y la paleta Nova Salud) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Ventas Hoy" value="S/. 850.50" icon="💵" color="green" />
        <MetricCard title="Transacciones" value={18} icon="🛒" color="blue" />
        <MetricCard title="Productos en Stock" value={210} icon="📦" color="nova-primary" />
        <MetricCard title="Clientes Registrados" value={5} icon="🧑‍🤝‍🧑" color="purple" />
      </div>

      {/* Sección 3: Área de Gráficos (Contenedores) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg h-96 dark:bg-card-dark">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-text-dark">Tendencia de Ventas</h3>
          <p className="text-gray-500 dark:text-gray-400">Aquí irá un gráfico de línea.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg h-96 dark:bg-card-dark">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-text-dark">Productos Más Vendidos</h3>
          <p className="text-gray-500 dark:text-gray-400">Aquí irá un gráfico de pastel.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;