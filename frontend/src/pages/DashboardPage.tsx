// frontend/src/pages/DashboardPage.tsx

import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        🏠 Dashboard Principal
      </h1>
      <p className="text-gray-600">
        Bienvenido al sistema de gestión de inventario y ventas de Nova Salud.
        Aquí irán las métricas clave y las alertas de stock mínimo (requisito clave).
      </p>
      {/* Contenido del Dashboard */}
    </div>
  );
};

export default DashboardPage;