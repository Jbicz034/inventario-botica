<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\ClienteController;

// Rutas públicas
Route::post('/login', [AuthController::class, 'login']);
Route::get('/health', function () {
    return response()->json(['status' => 'OK', 'timestamp' => now()]);
});

// Rutas protegidas
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Productos
    Route::apiResource('productos', ProductoController::class);
    Route::get('productos/stock/bajo', [ProductoController::class, 'stockBajo']);
    
    // Ventas
    Route::apiResource('ventas', VentaController::class);

    // Dentro del grupo de rutas protegidas
    Route::apiResource('clientes', ClienteController::class);
    Route::get('clientes/buscar/q', [ClienteController::class, 'buscar']);


});



