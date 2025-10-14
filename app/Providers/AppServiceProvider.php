<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator; // Necesitas importar el Facade Validator

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
         // 1. Regla de Validación para DNI (8 dígitos)
        Validator::extend('dni', function ($attribute, $value, $parameters, $validator) {
            // Regla de validación para DNI (ejemplo: 8 dígitos numéricos)
            return preg_match('/^\d{8}$/', $value);
        });
        
        // 2. Regla de Validación para RUC (11 dígitos)
        Validator::extend('ruc', function ($attribute, $value, $parameters, $validator) {
            // Regla de validación para RUC (ejemplo: 11 dígitos numéricos)
            return preg_match('/^\d{11}$/', $value);
        });
        
        // Opcional: Mensajes de error por defecto
        Validator::replacer('dni', function ($message, $attribute, $rule, $parameters) {
            return "El campo {$attribute} debe ser un DNI válido de 8 dígitos.";
        });
        Validator::replacer('ruc', function ($message, $attribute, $rule, $parameters) {
            return "El campo {$attribute} debe ser un RUC válido de 11 dígitos.";
        });
    }  
}