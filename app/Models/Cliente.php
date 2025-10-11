<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'email',
        'telefono',
        'direccion',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Obtener las ventas del cliente.
     */
    public function ventas()
    {
        return $this->hasMany(Venta::class);
    }

    /**
     * Scope para buscar clientes por nombre o email.
     */
    public function scopeBuscar($query, $termino)
    {
        return $query->where('nombre', 'LIKE', "%{$termino}%")
                    ->orWhere('email', 'LIKE', "%{$termino}%");
    }

    /**
     * Obtener el nombre formateado.
     */
    public function getNombreCompletoAttribute()
    {
        return $this->nombre;
    }

    /**
     * Obtener las ventas totales del cliente.
     */
    public function getTotalVentasAttribute()
    {
        return $this->ventas()->count();
    }

    /**
     * Obtener el monto total gastado por el cliente.
     */
    public function getMontoTotalGastadoAttribute()
    {
        return $this->ventas()->sum('total');
    }
}