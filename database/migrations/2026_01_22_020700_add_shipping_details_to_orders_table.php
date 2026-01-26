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
        Schema::table('orders', function (Blueprint $table) {
            // Shipping courier details for warehouse operations
            if (!Schema::hasColumn('orders', 'shipping_courier')) {
                $table->string('shipping_courier')->nullable()->after('shipping_cost'); // e.g., "JNE", "SICEPAT"
            }
            if (!Schema::hasColumn('orders', 'shipping_service')) {
                $table->string('shipping_service')->nullable()->after('shipping_courier'); // e.g., "REG", "YES"
            }
            if (!Schema::hasColumn('orders', 'shipping_etd')) {
                $table->string('shipping_etd')->nullable()->after('shipping_service'); // e.g., "1-2 day"
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['shipping_courier', 'shipping_service', 'shipping_etd']);
        });
    }
};
