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
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->string('identifier')->nullable()->comment('UUID untuk guest, null untuk authenticated user');
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->integer('quantity')->default(1);
            $table->timestamps();

            // Prevent duplicate products per user/guest
            // For guests: unique by identifier + product_id
            // For authenticated: unique by user_id + product_id
            $table->unique(['identifier', 'product_id'], 'unique_guest_product');
            $table->unique(['user_id', 'product_id'], 'unique_user_product');

            // Add index for faster queries
            $table->index('identifier');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
