<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('locations', function (Blueprint $table) {
            $table->foreignId('location_type_id')
                ->nullable()
                ->after('user_id')
                ->constrained('location_types')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('locations', function (Blueprint $table) {
            $table->dropForeign(['location_type_id']);
            $table->dropColumn('location_type_id');
        });
    }
};
