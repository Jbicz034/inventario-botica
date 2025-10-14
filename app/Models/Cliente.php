<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo_documento',
        'numero_documento',
        'razon_social',
        'nombre_comercial',
        'direccion',
        'telefono',
        'email',
        'estado'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relaciones
    public function ventas()
    {
        return $this->hasMany(Venta::class);
    }

    // Scopes
    public function scopePorDocumento($query, $numero)
    {
        return $query->where('numero_documento', $numero);
    }

    public function scopeActivos($query)
    {
        return $query->where('estado', 'activo');
    }

    // ✅ MÉTODOS DE VALIDACIÓN ESTÁTICOS
    public static function validarDocumento($tipo, $numero)
    {
        if ($tipo === 'dni') {
            return preg_match('/^\d{8}$/', $numero);
        }
        
        if ($tipo === 'ruc') {
            return preg_match('/^\d{11}$/', $numero);
        }
        
        return false;
    }

    public static function getValidationRules($clienteId = null)
    {
        $rules = [
            'tipo_documento' => 'required|in:dni,ruc',
            'numero_documento' => 'required|string|max:20',
            'razon_social' => 'required|string|max:255',
            'nombre_comercial' => 'nullable|string|max:255',
            'direccion' => 'nullable|string|max:500',
            'telefono' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'estado' => 'required|in:activo,inactivo'
        ];

        // Para actualización, ignorar el propio registro en unique
        if ($clienteId) {
            $rules['numero_documento'] .= '|unique:clientes,numero_documento,' . $clienteId;
        } else {
            $rules['numero_documento'] .= '|unique:clientes,numero_documento';
        }

        return $rules;
    }

    // Atributos calculados
    public function getTipoDocumentoCompletoAttribute()
    {
        return $this->tipo_documento === 'ruc' ? 'RUC' : 'DNI';
    }

    public function getNombreCompletoAttribute()
    {
        return $this->razon_social ?: $this->nombre_comercial;
    }
}