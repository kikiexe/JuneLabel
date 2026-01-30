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
        $indexes = [
            'price' => 'products_price_index',
            'stock' => 'products_stock_index',
            'is_active' => 'products_is_active_index',
            'is_best_seller' => 'products_is_best_seller_index',
        ];

        foreach ($indexes as $column => $indexName) {
            try {
                Schema::table('products', function (Blueprint $table) use ($column, $indexName) {
                    $table->index($column, $indexName);
                });
            } catch (\Exception $e) {
                // Ignore if index exists
            }
        }

        try {
            Schema::table('products', function (Blueprint $table) {
                $table->index(['is_active', 'created_at'], 'products_is_active_created_at_index');
            });
        } catch (\Exception $e) {
            // Ignore if index exists
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['price']);
            $table->dropIndex(['stock']);
            $table->dropIndex(['is_active']);
            $table->dropIndex(['is_best_seller']);
            $table->dropIndex(['is_active', 'created_at']);
        });
    }
};
