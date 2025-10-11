<?php

namespace App\Services;

use App\Models\Producto;
use Illuminate\Support\Collection;

class AlertaStockService
{
    public function obtenerProductosStockBajo(): Collection
    {
        return Producto::where('activo', true)
                      ->stockBajo()
                      ->get();
    }

    public function verificarNecesidadReposicion(Producto $producto): bool
    {
        return $producto->stock <= $producto->stock_minimo;
    }

    public function generarReporteStockBajo(): array
    {
        $productos = $this->obtenerProductosStockBajo();
        
        return [
            'total_productos_stock_bajo' => $productos->count(),
            'productos' => $productos,
            'fecha_generacion' => now()->toDateTimeString()
        ];
    }
}