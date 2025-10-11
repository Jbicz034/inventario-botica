<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductoController extends Controller
{
    public function index(): JsonResponse
    {
        $productos = Producto::where('activo', true)->get();
        return response()->json($productos);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'stock_minimo' => 'required|integer|min:0',
            'categoria' => 'required|string'
        ]);

        $producto = Producto::create($validated);
        return response()->json($producto, 201);
    }

    public function show(Producto $producto): JsonResponse
    {
        return response()->json($producto);
    }

    public function update(Request $request, Producto $producto): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'stock_minimo' => 'sometimes|integer|min:0',
            'categoria' => 'sometimes|string'
        ]);

        $producto->update($validated);
        return response()->json($producto);
    }

    public function destroy(Producto $producto): JsonResponse
    {
        $producto->update(['activo' => false]);
        return response()->json(['message' => 'Producto desactivado']);
    }

    public function stockBajo(): JsonResponse
    {
        $productos = Producto::where('activo', true)
                            ->stockBajo()
                            ->get();
        
        return response()->json($productos);
    }
}