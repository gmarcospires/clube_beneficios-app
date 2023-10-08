<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sale_id' => $this->faker->randomElement(\App\Models\Sale::pluck('id')),
            'product_id' => $this->faker->randomElement(\App\Models\Product::pluck('id')),
            'price' => $this->faker->randomFloat(2, 100, 1000),
            'quantity' => $this->faker->randomFloat(2, 1, 10),
            'status' => $this->faker->randomElement(['active', 'cancelled']),
        ];
    }
}
