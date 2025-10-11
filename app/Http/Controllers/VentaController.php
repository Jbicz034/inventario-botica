<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class VentaController extends Controller
{
    public function index(): JsonResponse
    {
        $ventas = Venta::with(['productos', 'usuario'])->get();
        return response()->json($ventas);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'productos' => 'required|array|min:1',
            'productos.*.id' => 'required|exists:productos,id',
            'productos.*.cantidad' => 'required|integer|min:1'
        ]);

        return DB::transaction(function () use ($validated) {

            // VERIFICA QUE EL USUARIO ESTÉ AUTENTICADO
            if (!Auth::check()) {
                return response()->json([
                    'error' => 'Usuario no autenticado'
                ], 401);
            }

            $venta = new Venta();
            $venta->usuario_id = Auth::user()->id; 
            $venta->fecha_venta = now();
            $venta->total = 0;
            $venta->save();

            $totalVenta = 0;

            foreach ($validated['productos'] as $item) {
                $producto = Producto::find($item['id']);
                
                // Verificar stock
                if ($producto->stock < $item['cantidad']) {
                    throw new \Exception("Stock insuficiente para: {$producto->nombre}");
                }

                $subtotal = $producto->precio * $item['cantidad'];
                $totalVenta += $subtotal;

                // Agregar producto a la venta
                $venta->productos()->attach($producto->id, [
                    'cantidad' => $item['cantidad'],
                    'precio_unitario' => $producto->precio,
                    'subtotal' => $subtotal
                ]);

                // Actualizar stock
                $producto->decrement('stock', $item['cantidad']);
            }

            $venta->total = $totalVenta;
            $venta->save();

            return response()->json($venta->load('productos'), 201);
        });
    }
}

