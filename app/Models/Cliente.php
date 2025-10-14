<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo_documento', // 'ruc' o 'dni'
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