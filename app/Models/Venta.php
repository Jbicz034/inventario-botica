<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;

    protected $fillable = [
        'usuario_id',
        'cliente_id', 
        'total',
        'estado',
        'fecha_venta'
    ];

    protected $casts = [
        'total' => 'decimal:2',
        'fecha_venta' => 'datetime'
    ];

    /**
     * Obtener el cliente de la venta.
     */
    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    /**
     * Obtener el usuario (vendedor) de la venta.
     */
    public function usuario()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Obtener los productos de la venta.
     */
    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'venta_productos')
                    ->withPivot('cantidad', 'precio_unitario', 'subtotal')
                    ->withTimestamps();
    }

    /**
     * Scope para ventas completadas.
     */
    public function scopeCompletadas($query)
    {
        return $query->where('estado', 'completada');
    }

    /**
     * Scope para ventas de una fecha específica.
     */
    public function scopeDeFecha($query, $fecha)
    {
        return $query->whereDate('fecha_venta', $fecha);
    }

    /**s
     * Obtener el total formateado.
     */
    public function getTotalFormateadoAttribute()
    {
        return 'S/ ' . number_format($this->total, 2);
    }
}