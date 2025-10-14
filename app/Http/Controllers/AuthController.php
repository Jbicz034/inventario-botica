<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse; // Para tipar el retorno correctamente
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User; // Asegúrate de que este sea el path correcto a tu modelo User

class AuthController extends Controller
{
    /**
     * Maneja la autenticación del usuario y genera un token de Sanctum.
     */
    public function login(Request $request): JsonResponse
    {
        // 1. Validación
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. Buscar Usuario y Verificar Contraseña
        $user = User::where('email', $request->email)->first();

        // Verifica si el usuario existe Y si la contraseña coincide.
        if (!$user || !Hash::check($request->password, $user->password)) {
            // Lanza una excepción de validación con un mensaje de error 422
            throw ValidationException::withMessages([
                'credenciales' => ['Las credenciales proporcionadas son incorrectas.'],
            ]);
        }

        // 3. Generación del Token Bearer
        $token = $user->createToken('auth-token')->plainTextToken;

        // 4. Respuesta Exitosa
        return response()->json([
            'message' => '¡Autenticación exitosa! Usa el token para las rutas protegidas.',
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
            ],
            'access_token' => $token, // Este es el token que usarás en el header 'Authorization'
            'token_type' => 'Bearer',
        ], 200);
    }

}