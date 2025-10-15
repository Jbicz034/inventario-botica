// frontend/src/pages/ClientsPage.tsx
import React, { useState } from 'react';
import { Users, Search, Plus, Edit, Trash2, Mail, Phone, MapPin } from 'lucide-react';
// Importamos el tipo Client basado en la base de datos (nova-salud-db.sql)
interface Client {
    id: number;
    nombre: string;
    email: string | null;
    telefono: string | null;
    direccion: string | null;
}

// Datos Simulados (coinciden con el volcado de nova-salud-db.sql)
const MOCK_CLIENTS: Client[] = [
    { id: 1, nombre: 'Carlos Rodríguez', email: 'carlos.rodriguez@email.com', telefono: '+51 987 654 321', direccion: 'Av. Los Jardines 123, Lima' },
    { id: 2, nombre: 'Ana María Torres', email: 'ana.torres@email.com', telefono: '+51 987 123 456', direccion: 'Calle Las Flores 456, Lima' },
    { id: 3, nombre: 'Roberto Silva', email: 'roberto.silva@email.com', telefono: '+51 987 555 888', direccion: 'Jr. Los Pinos 789, Lima' },
    { id: 4, nombre: 'Lucía Mendoza', email: 'lucia.mendoza@email.com', telefono: '+51 987 444 777', direccion: 'Av. Primavera 321, Lima' },
    { id: 5, nombre: 'Miguel Ángel Rojas', email: 'miguel.rojas@email.com', telefono: '+51 987 666 999', direccion: 'Calle Los Olivos 654, Lima' },
];


const ClientsPage: React.FC = () => {
    const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Filtra los clientes por nombre o correo
    const filteredClients = clients.filter(c =>
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 🚨 Funciones CRUD simuladas (Aquí irían las llamadas a tu backend)
    const handleEdit = (client: Client) => {
        console.log("Editar cliente:", client.id);
        // Lógica para abrir modal o formulario de edición
    };

    const handleDelete = (id: number) => {
        console.log("Eliminar cliente:", id);
        if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
            // await api.delete(`/clients/${id}`);
            setClients(prev => prev.filter(c => c.id !== id));
        }
    };
    
    const handleAdd = () => {
        console.log("Añadir nuevo cliente");
        // Lógica para abrir modal de nuevo cliente
    };

    // --- Renderizado ---

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-extrabold text-nova-primary dark:text-nova-secondary transition-colors duration-300 flex items-center">
                <Users className="w-8 h-8 mr-3" />
                Gestión de Clientes
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400">
                Administración centralizada de la base de datos de clientes para agilizar el proceso de venta.
            </p>
            
            {/* Panel Principal: Búsqueda y Tabla */}
            <div className="bg-white p-6 rounded-2xl shadow-xl dark:bg-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                    
                    {/* Búsqueda */}
                    <div className="relative w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Buscar cliente por nombre o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-nova-primary focus:border-nova-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-shadow"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    
                    {/* Botón de Agregar */}
                    <button
                        onClick={handleAdd}
                        className="w-full md:w-auto flex items-center justify-center py-2 px-6 rounded-xl shadow-md text-white bg-nova-secondary hover:bg-blue-600 transition-colors duration-200 font-semibold"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Añadir Nuevo Cliente
                    </button>
                </div>

                {/* Tabla de Clientes */}
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Contacto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Dirección</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {filteredClients.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {client.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {client.nombre}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center space-y-1 flex-col sm:flex-row sm:space-x-2 sm:space-y-0">
                                            {client.email && <span className="flex items-center"><Mail className="w-4 h-4 mr-1" /> {client.email}</span>}
                                            {client.telefono && <span className="flex items-center"><Phone className="w-4 h-4 mr-1 text-green-500" /> {client.telefono}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                        {client.direccion || 'Sin registrar'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button onClick={() => handleEdit(client)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1 rounded-full hover:bg-indigo-50 transition-colors">
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleDelete(client.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-50 transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredClients.length === 0 && (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            No se encontraron clientes que coincidan con la búsqueda.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientsPage;