<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Client\PendingRequest;
use Exception;

class ApiPeruService
{
    // Propiedad para la instancia base del cliente HTTP
    protected PendingRequest $http;

    public function __construct()
    {
        $apiKey = env('APIPERU_TOKEN');
        $baseUrl = 'https://apiperu.dev/api'; 
        
        // Configuramos la instancia base con Base URL y headers
        $this->http = Http::baseUrl($baseUrl)
            ->withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Accept' => 'application/json',
            ])
            ->timeout(10); // Opcional: Establecer un tiempo de espera (timeout)
    }

    /**
     * Consultar RUC en SUNAT
     */
    public function consultarRuc(string $ruc): array
    {
        try {
            // Usamos la instancia base, solo especificamos el endpoint y los parámetros
            $response = $this->http->get('/v1/ruc', [
                'numero' => $ruc
            ]);

            if ($response->successful()) {
                return [
                    'success' => true,
                    'data' => $response->json(),
                ];
            }

            // Manejo de errores de la API (4xx o 5xx)
            return [
                'success' => false,
                'error' => 'Error API Perú (RUC): ' . $response->status() . ' - ' . $response->body(),
            ];

        } catch (Exception $e) {
            Log::error('Error consultando RUC: ' . $e->getMessage(), ['ruc' => $ruc]);
            
            return [
                'success' => false,
                'error' => 'Error de conexión/tiempo de espera con API Perú.',
            ];
        }
    }

    /**
     * Consultar DNI en RENIEC
     */
    public function consultarDni(string $dni): array
    {
        try {
            // Usamos la instancia base
            $response = $this->http->get('/v1/dni', [
                'numero' => $dni
            ]);

            if ($response->successful()) {
                return [
                    'success' => true,
                    'data' => $response->json(),
                ];
            }
            
            // Manejo de errores de la API (4xx o 5xx)
            return [
                'success' => false,
                'error' => 'Error API Perú (DNI): ' . $response->status() . ' - ' . $response->body(),
            ];

        } catch (Exception $e) {
            Log::error('Error consultando DNI: ' . $e->getMessage(), ['dni' => $dni]);
            
            return [
                'success' => false,
                'error' => 'Error de conexión/tiempo de espera con API Perú.',
            ];
        }
    }
}