<?php

namespace Database\Seeders;

use App\Models\Cliente;
use Illuminate\Database\Seeder;

class ClienteSeeder extends Seeder
{
    public function run()
    {
        $clientes = [
            [
                'nombre' => 'Carlos Rodríguez',
                'email' => 'carlos.rodriguez@email.com',
                'telefono' => '+51 987 654 321',
                'direccion' => 'Av. Los Jardines 123, Lima',
            ],
            [
                'nombre' => 'Ana María Torres',
                'email' => 'ana.torres@email.com',
                'telefono' => '+51 987 123 456',
                'direccion' => 'Calle Las Flores 456, Lima',
            ],
            [
                'nombre' => 'Roberto Silva',
                'email' => 'roberto.silva@email.com',
                'telefono' => '+51 987 555 888',
                'direccion' => 'Jr. Los Pinos 789, Lima',
            ],
            [
                'nombre' => 'Lucía Mendoza',
                'email' => 'lucia.mendoza@email.com',
                'telefono' => '+51 987 444 777',
                'direccion' => 'Av. Primavera 321, Lima',
            ],
            [
                'nombre' => 'Miguel Ángel Rojas',
                'email' => 'miguel.rojas@email.com',
                'telefono' => '+51 987 666 999',
                'direccion' => 'Calle Los Olivos 654, Lima',
            ],
        ];

        foreach ($clientes as $cliente) {
            Cliente::create($cliente);
        }

        $this->command->info('✅ Clientes creados exitosamente!');
    }
}