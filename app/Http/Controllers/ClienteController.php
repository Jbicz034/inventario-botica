<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Services\ApiPeruService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

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
        // ✅ VALIDACIÓN MEJORADA Y COHERENTE
        $validator = Validator::make($request->all(), [
            'tipo' => [
                'required',
                'string',
                Rule::in(['dni', 'ruc'])
            ],
            'numero' => [
                'required',
                'string',
                'max:20',
                function ($attribute, $value, $fail) use ($request) {
                    // Validación condicional según el tipo de documento
                    if ($request->tipo === 'dni' && !preg_match('/^\d{8}$/', $value)) {
                        $fail('El DNI debe tener exactamente 8 dígitos.');
                    }
                    
                    if ($request->tipo === 'ruc' && !preg_match('/^\d{11}$/', $value)) {
                        $fail('El RUC debe tener exactamente 11 dígitos.');
                    }
                }
            ]
        ], [
            'tipo.required' => 'El tipo de documento es obligatorio.',
            'tipo.in' => 'El tipo de documento debe ser DNI o RUC.',
            'numero.required' => 'El número de documento es obligatorio.',
            'numero.max' => 'El número de documento no debe exceder 20 caracteres.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $tipo = $request->tipo;
        $numero = $request->numero;

        // Primero verificar si ya existe en la base de datos
        $clienteExistente = Cliente::where('numero_documento', $numero)->first();
        
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
        // ✅ VALIDACIÓN COHERENTE CON TU ESTRUCTURA DE BD
        $validator = Validator::make($request->all(), [
            'tipo_documento' => [
                'required',
                'string',
                Rule::in(['dni', 'ruc'])
            ],
            'numero_documento' => [
                'required',
                'string',
                'max:20',
                'unique:clientes,numero_documento',
                function ($attribute, $value, $fail) use ($request) {
                    // Validación coherente con consultarDocumento
                    if ($request->tipo_documento === 'dni' && !preg_match('/^\d{8}$/', $value)) {
                        $fail('El DNI debe tener exactamente 8 dígitos.');
                    }
                    
                    if ($request->tipo_documento === 'ruc' && !preg_match('/^\d{11}$/', $value)) {
                        $fail('El RUC debe tener exactamente 11 dígitos.');
                    }
                }
            ],
            'razon_social' => 'required|string|max:255',
            'nombre_comercial' => 'nullable|string|max:255',
            'direccion' => 'nullable|string|max:500',
            'telefono' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255'
        ], [
            'tipo_documento.required' => 'El tipo de documento es obligatorio.',
            'tipo_documento.in' => 'El tipo de documento debe ser DNI o RUC.',
            'numero_documento.required' => 'El número de documento es obligatorio.',
            'numero_documento.unique' => 'Este número de documento ya está registrado.',
            'razon_social.required' => 'La razón social es obligatoria.',
            'email.email' => 'El formato del email es inválido.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $cliente = Cliente::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $cliente
        ], 201);
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
                'nombre_comercial' => $datosApi['nombreComercial'] ?? ($datosApi['razonSocial'] ?? ''),
                'direccion' => $datosApi['direccion'] ?? '',
                'estado' => 'activo'
            ];
        } else {
            // Para DNI
            return [
                'tipo_documento' => 'dni',
                'numero_documento' => $numero,
                'razon_social' => trim(($datosApi['nombres'] ?? '') . ' ' . ($datosApi['apellidoPaterno'] ?? '') . ' ' . ($datosApi['apellidoMaterno'] ?? '')),
                'nombre_comercial' => trim(($datosApi['nombres'] ?? '') . ' ' . ($datosApi['apellidoPaterno'] ?? '') . ' ' . ($datosApi['apellidoMaterno'] ?? '')),
                'direccion' => '',
                'estado' => 'activo'
            ];
        }
    }

    // ... otros métodos del controlador
}