<?php

namespace Database\Factories;

use App\Enum\OrderStatus;
use App\Enum\PaymentStatus;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = $this->faker->numberBetween(50000, 500000);
        $shippingCost = $this->faker->numberBetween(10000, 50000);
        $grossAmount = $subtotal + $shippingCost;

        return [
            'user_id' => \App\Models\User::factory(),
            'order_id' => 'ORD-' . Str::upper(Str::random(10)),
            'subtotal' => $subtotal,
            'shipping_cost' => $shippingCost,
            'gross_amount' => $grossAmount,
            'payment_status' => PaymentStatus::Pending,
            'order_status' => OrderStatus::Pending,
            'customer_name' => $this->faker->name(),
            'email' => $this->faker->safeEmail(),
            'customer_phone' => $this->faker->phoneNumber(),
            'shipping_address' => $this->faker->address(),
            'shipping_courier' => 'jne',
            'shipping_service' => 'REG',
        ];
    }
}
