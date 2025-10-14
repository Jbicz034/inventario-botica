<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\ClienteController;

// Rutas PÚBLICAS
Route::get('/health', function () {
    return response()->json([
        'status' => 'OK',
        'message' => 'Nova Salud API funcionando',
        'timestamp' => now()
    ]);
});

Route::post('/login', [AuthController::class, 'login']);

// Rutas PROTEGIDAS con Sanctum
Route::middleware(['auth:sanctum'])->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Productos
    Route::apiResource('productos', ProductoController::class);
    Route::get('productos/stock/bajo', [ProductoController::class, 'stockBajo']);
    
    // Clientes
    Route::apiResource('clientes', ClienteController::class);
    Route::get('clientes/buscar/q', [ClienteController::class, 'buscar']);
    
    // RUTAS PARA APIPERU
    Route::post('clientes/consultar-documento', [ClienteController::class, 'consultarDocumento']);
    Route::post('clientes/crear-desde-consulta', [ClienteController::class, 'crearDesdeConsulta']);
    
    // Ventas
    Route::apiResource('ventas', VentaController::class);
});