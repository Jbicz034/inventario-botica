<?php

namespace Database\Seeders;

use App\Models\Producto;
use Illuminate\Database\Seeder;

class ProductoSeeder extends Seeder
{
    public function run()
    {
        $productos = [
            // ANALGÉSICOS
            [
                'codigo' => 'ANA001',
                'nombre' => 'Paracetamol 500mg',
                'descripcion' => 'Analgésico y antipirético, caja con 20 tabletas',
                'precio' => 8.50,
                'stock' => 45,
                'stock_minimo' => 10,
                'categoria' => 'Analgésicos',
                'activo' => true,
            ],
            [
                'codigo' => 'ANA002',
                'nombre' => 'Ibuprofeno 400mg',
                'descripcion' => 'Antiinflamatorio no esteroideo, caja con 30 tabletas',
                'precio' => 12.80,
                'stock' => 32,
                'stock_minimo' => 8,
                'categoria' => 'Analgésicos',
                'activo' => true,
            ],
            [
                'codigo' => 'ANA003',
                'nombre' => 'Aspirina 500mg',
                'descripcion' => 'Ácido acetilsalicílico, caja con 16 tabletas',
                'precio' => 6.20,
                'stock' => 18,
                'stock_minimo' => 5,
                'categoria' => 'Analgésicos',
                'activo' => true,
            ],

            // ANTIBIÓTICOS
            [
                'codigo' => 'ANT001',
                'nombre' => 'Amoxicilina 500mg',
                'descripcion' => 'Antibiótico de amplio espectro, caja con 12 cápsulas',
                'precio' => 25.90,
                'stock' => 15,
                'stock_minimo' => 5,
                'categoria' => 'Antibióticos',
                'activo' => true,
            ],
            [
                'codigo' => 'ANT002',
                'nombre' => 'Azitromicina 500mg',
                'descripcion' => 'Antibiótico macrólido, caja con 3 tabletas',
                'precio' => 32.50,
                'stock' => 8,
                'stock_minimo' => 3,
                'categoria' => 'Antibióticos',
                'activo' => true,
            ],

            // ANTIGRIPALES
            [
                'codigo' => 'AGR001',
                'nombre' => 'Jarabe para la Tos',
                'descripcion' => 'Jarabe expectorante, frasco 120ml',
                'precio' => 18.75,
                'stock' => 22,
                'stock_minimo' => 6,
                'categoria' => 'Antigripales',
                'activo' => true,
            ],
            [
                'codigo' => 'AGR002',
                'nombre' => 'Antigripal Combo',
                'descripcion' => 'Tabletas para síntomas de gripe, caja con 10 unidades',
                'precio' => 15.40,
                'stock' => 28,
                'stock_minimo' => 8,
                'categoria' => 'Antigripales',
                'activo' => true,
            ],

            // PRODUCTOS CON STOCK BAJO (PARA PROBAR ALERTAS)
            [
                'codigo' => 'VIT001',
                'nombre' => 'Vitamina C 1000mg',
                'descripcion' => 'Tabletas masticables de vitamina C, caja con 30 unidades',
                'precio' => 28.90,
                'stock' => 3,  // STOCK BAJO
                'stock_minimo' => 10,
                'categoria' => 'Vitaminas',
                'activo' => true,
            ],
            [
                'codigo' => 'DER001',
                'nombre' => 'Crema Hidratante',
                'descripcion' => 'Crema para piel seca, tubo 100g',
                'precio' => 14.20,
                'stock' => 2,  // STOCK BAJO
                'stock_minimo' => 5,
                'categoria' => 'Dermatológicos',
                'activo' => true,
            ],
        ];

        foreach ($productos as $producto) {
            Producto::create($producto);
        }

        $this->command->info('✅ Productos creados exitosamente!');
        $this->command->info('📦 Productos con stock bajo: ' . Producto::stockBajo()->count());
    }
}