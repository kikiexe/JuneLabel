<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Tambah index untuk optimize query performance
     * Safe migration: Cek dulu sebelum tambah index
     */
    public function up(): void
    {
        // Helper function untuk cek index exist
        $indexExists = function ($table, $indexName) {
            $indexes = DB::select("SHOW INDEX FROM {$table} WHERE Key_name = ?", [$indexName]);
            return count($indexes) > 0;
        };

        // Products indexes
        Schema::table('products', function (Blueprint $table) use ($indexExists) {
            if (!$indexExists('products', 'products_is_active_index')) {
                $table->index('is_active');
            }
            if (!$indexExists('products', 'products_is_best_seller_index')) {
                $table->index('is_best_seller');
            }
            if (!$indexExists('products', 'products_is_active_created_at_index')) {
                $table->index(['is_active', 'created_at']);
            }
        });

        // Orders indexes
        Schema::table('orders', function (Blueprint $table) use ($indexExists) {
            if (!$indexExists('orders', 'orders_order_id_index')) {
                $table->index('order_id');
            }
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['is_active']);
            $table->dropIndex(['is_best_seller']);
            $table->dropIndex(['is_active', 'created_at']);
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex(['order_id']);
        });
    }
};
