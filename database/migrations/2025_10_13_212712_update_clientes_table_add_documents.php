<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('clientes', function (Blueprint $table) {
            $table->enum('tipo_documento', ['dni', 'ruc'])->default('dni');
            $table->string('numero_documento', 20)->unique();
            $table->string('razon_social')->nullable();
            $table->enum('estado', ['activo', 'inactivo'])->default('activo');
            
        });
    }

    public function down()
    {
        Schema::table('clientes', function (Blueprint $table) {

            $table->dropColumn(['tipo_documento', 'numero_documento', 'razon_social', 'estado']);
        
        });
    }
};

