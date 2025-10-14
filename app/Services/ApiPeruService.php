<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class ApiPeruService
{
    protected $baseUrl = 'https://apiperu.dev/api';
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = env('APIPERU_TOKEN');
    }

    /**
     * Consultar RUC en SUNAT
     */
    public function consultarRuc(string $ruc): array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Accept' => 'application/json',
            ])->get("{$this->baseUrl}/v1/ruc", [
                'numero' => $ruc
            ]);

            if ($response->successful()) {
                return [
                    'success' => true,
                    'data' => $response->json()
                ];
            }

            return [
                'success' => false,
                'error' => 'Error en la consulta: ' . $response->body()
            ];

        } catch (Exception $e) {
            Log::error('Error consultando RUC: ' . $e->getMessage());
            
            return [
                'success' => false,
                'error' => 'Error de conexión con API Perú'
            ];
        }
    }

    /**
     * Consultar DNI en RENIEC
     */
    public function consultarDni(string $dni): array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Accept' => 'application/json',
            ])->get("{$this->baseUrl}/v1/dni", [
                'numero' => $dni
            ]);

            if ($response->successful()) {
                return [
                    'success' => true,
                    'data' => $response->json()
                ];
            }

            return [
                'success' => false,
                'error' => 'Error en la consulta: ' . $response->body()
            ];

        } catch (Exception $e) {
            Log::error('Error consultando DNI: ' . $e->getMessage());
            
            return [
                'success' => false,
                'error' => 'Error de conexión con API Perú'
            ];
        }
    }
}