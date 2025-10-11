<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ventas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('usuario_id')->constrained('users');
            $table->decimal('total', 12, 2);
            $table->enum('estado', ['pendiente', 'completada', 'cancelada'])->default('completada');
            $table->timestamp('fecha_venta')->useCurrent();
            $table->timestamps();
        });

        // Tabla pivote para ventas y productos
        Schema::create('venta_productos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('venta_id')->constrained()->onDelete('cascade');
            $table->foreignId('producto_id')->constrained();
            $table->integer('cantidad');
            $table->decimal('precio_unitario', 10, 2);
            $table->decimal('subtotal', 12, 2);
            $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('venta_productos');
        Schema::dropIfExists('ventas');
    }
};
