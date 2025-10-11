<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ClienteController extends Controller
{
    public function index(): JsonResponse
    {
        $clientes = Cliente::all();
        return response()->json($clientes);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'nullable|email|unique:clientes,email',
            'telefono' => 'nullable|string|max:20',
            'direccion' => 'nullable|string'
        ]);

        $cliente = Cliente::create($validated);
        return response()->json($cliente, 201);
    }

    public function show(Cliente $cliente): JsonResponse
    {
        return response()->json($cliente->load('ventas'));
    }

    public function update(Request $request, Cliente $cliente): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:clientes,email,' . $cliente->id,
            'telefono' => 'sometimes|string|max:20',
            'direccion' => 'sometimes|string'
        ]);

        $cliente->update($validated);
        return response()->json($cliente);
    }

    public function destroy(Cliente $cliente): JsonResponse
    {
        // Verificar si el cliente tiene ventas antes de eliminar
        if ($cliente->ventas()->count() > 0) {
            return response()->json([
                'error' => 'No se puede eliminar el cliente porque tiene ventas asociadas'
            ], 422);
        }

        $cliente->delete();
        return response()->json(['message' => 'Cliente eliminado correctamente']);
    }

    public function buscar(Request $request): JsonResponse
    {
        $termino = $request->query('q');
        
        if (!$termino) {
            return response()->json([]);
        }

        $clientes = Cliente::buscar($termino)->get();
        return response()->json($clientes);
    }
}