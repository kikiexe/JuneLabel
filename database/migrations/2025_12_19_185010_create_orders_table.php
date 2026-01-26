<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('order_id')->unique();

            // Pricing
            $table->decimal('subtotal', 15, 2);
            $table->decimal('shipping_cost', 15, 2)->default(0);
            $table->decimal('gross_amount', 15, 2);

            // Payment
            $table->string('snap_token')->nullable();
            $table->string('transaction_id')->nullable()->index();
            $table->string('payment_method')->nullable();
            $table->enum('payment_status', ['pending', 'success', 'failed', 'expired'])
                ->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('payment_status_updated_at')->nullable();

            // Order Status
            $table->enum('order_status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
                ->default('pending');
            $table->timestamp('order_status_updated_at')->nullable();

            // Shipping Info
            $table->string('customer_name');
            $table->string('customer_phone');
            $table->text('shipping_address');
            $table->text('notes')->nullable();

            $table->timestamps();

            // Performance Indexes
            $table->index('payment_status');
            $table->index('order_status');
            $table->index('created_at');
            $table->index(['user_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
