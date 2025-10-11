<?php

namespace Database\Seeders;

use App\Models\Venta;
use App\Models\Producto;
use App\Models\User;
use App\Models\Cliente;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VentaSeeder extends Seeder
{
    public function run()
    {
        // Obtener usuarios, productos y clientes
        $usuario = User::first();
        $cliente = Cliente::first();
        $productos = Producto::all();

        // Verificar que existan datos necesarios
        if (!$usuario || $productos->isEmpty()) {
            $this->command->error('❌ No hay usuarios o productos para crear ventas');
            return;
        }

        $ventas = [
            [
                'usuario_id' => $usuario->id,
                'cliente_id' => $cliente->id,
                'total' => 45.60,
                'estado' => 'completada',
                'fecha_venta' => now()->subDays(2),
                'productos' => [
                    ['producto_id' => $productos[0]->id, 'cantidad' => 2],
                    ['producto_id' => $productos[1]->id, 'cantidad' => 1],
                ]
            ],
            [
                'usuario_id' => $usuario->id,
                'cliente_id' => Cliente::skip(1)->first()->id,
                'total' => 68.40,
                'estado' => 'completada',
                'fecha_venta' => now()->subDays(1),
                'productos' => [
                    ['producto_id' => $productos[2]->id, 'cantidad' => 3],
                    ['producto_id' => $productos[3]->id, 'cantidad' => 1],
                    ['producto_id' => $productos[4]->id, 'cantidad' => 2],
                ]
            ],
            [
                'usuario_id' => $usuario->id,
                'cliente_id' => Cliente::skip(2)->first()->id,
                'total' => 22.80,
                'estado' => 'completada',
                'fecha_venta' => now(),
                'productos' => [
                    ['producto_id' => $productos[5]->id, 'cantidad' => 1],
                    ['producto_id' => $productos[6]->id, 'cantidad' => 1],
                ]
            ],
        ];

        foreach ($ventas as $ventaData) {
            DB::transaction(function () use ($ventaData, $productos) {
                $venta = Venta::create([
                    'usuario_id' => $ventaData['usuario_id'],
                    'cliente_id' => $ventaData['cliente_id'],
                    'total' => $ventaData['total'],
                    'estado' => $ventaData['estado'],
                    'fecha_venta' => $ventaData['fecha_venta'],
                ]);

                foreach ($ventaData['productos'] as $item) {
                    $producto = $productos->find($item['producto_id']);
                    
                    $venta->productos()->attach($producto->id, [
                        'cantidad' => $item['cantidad'],
                        'precio_unitario' => $producto->precio,
                        'subtotal' => $producto->precio * $item['cantidad']
                    ]);

                    // Actualizar stock (pero en seeders no deberíamos modificar stock real)
                    $producto->decrement('stock', $item['cantidad']);
                }
            });
        }

        $this->command->info('✅ Ventas de ejemplo creadas exitosamente!');
    }
}