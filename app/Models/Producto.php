<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;


    protected $fillable = [
        'codigo',
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'stock_minimo',
        'categoria',
        'activo'
    ];

     protected $casts = [
        'precio' => 'decimal:2',
        'activo' => 'boolean'
    ];

    // Scope para productos con stock bajo
    public function scopeStockBajo($query)
    {
        return $query->whereColumn('stock', '<=', 'stock_minimo');
    }

    // Relación con ventas
    public function ventas()
    {
        return $this->belongsToMany(Venta::class, 'venta_productos')
                    ->withPivot('cantidad', 'precio_unitario')
                    ->withTimestamps();
    }




    
}
