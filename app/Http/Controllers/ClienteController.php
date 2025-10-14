<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Services\ApiPeruService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ClienteController extends Controller
{
    protected $apiPeruService;

    public function __construct(ApiPeruService $apiPeruService)
    {
        $this->apiPeruService = $apiPeruService;
    }

    /**
     * Consultar RUC/DNI en API Perú
     */
    public function consultarDocumento(Request $request): JsonResponse
    {
        $request->validate([
            'tipo' => 'required|in:ruc,dni',
            'numero' => 'required|string|max:20'
        ]);

        $tipo = $request->tipo;
        $numero = $request->numero;

        // Primero verificar si ya existe en la base de datos
        $clienteExistente = Cliente::porDocumento($numero)->first();
        if ($clienteExistente) {
            return response()->json([
                'success' => true,
                'data' => $clienteExistente,
                'source' => 'database'
            ]);
        }

        // Consultar API Perú
        if ($tipo === 'ruc') {
            $resultado = $this->apiPeruService->consultarRuc($numero);
        } else {
            $resultado = $this->apiPeruService->consultarDni($numero);
        }

        if (!$resultado['success']) {
            return response()->json([
                'success' => false,
                'error' => $resultado['error']
            ], 400);
        }

        // Formatear respuesta según el tipo de documento
        $datosApi = $resultado['data'];
        $clienteData = $this->formatearDatosCliente($tipo, $datosApi, $numero);

        return response()->json([
            'success' => true,
            'data' => $clienteData,
            'source' => 'apiperu'
        ]);
    }

    /**
     * Crear cliente con datos de API Perú
     */
    public function crearDesdeConsulta(Request $request): JsonResponse
    {
        $request->validate([
            'tipo_documento' => 'required|in:ruc,dni',
            'numero_documento' => 'required|string|max:20|unique:clientes',
            'razon_social' => 'required|string',
            'nombre_comercial' => 'nullable|string',
            'direccion' => 'nullable|string',
            'telefono' => 'nullable|string',
            'email' => 'nullable|email'
        ]);

        $cliente = Cliente::create($request->all());

        return response()->json($cliente, 201);
    }

    /**
     * Formatear datos de API Perú para cliente
     */
    private function formatearDatosCliente(string $tipo, array $datosApi, string $numero): array
    {
        if ($tipo === 'ruc') {
            return [
                'tipo_documento' => 'ruc',
                'numero_documento' => $numero,
                'razon_social' => $datosApi['razonSocial'] ?? '',
                'nombre_comercial' => $datosApi['nombreComercial'] ?? '',
                'direccion' => $datosApi['direccion'] ?? '',
                'estado' => 'activo'
            ];
        } else {
            // Para DNI
            return [
                'tipo_documento' => 'dni',
                'numero_documento' => $numero,
                'razon_social' => $datosApi['nombres'] . ' ' . $datosApi['apellidoPaterno'] . ' ' . $datosApi['apellidoMaterno'],
                'nombre_comercial' => $datosApi['nombres'] . ' ' . $datosApi['apellidoPaterno'] . ' ' . $datosApi['apellidoMaterno'],
                'direccion' => '',
                'estado' => 'activo'
            ];
        }
    }

}