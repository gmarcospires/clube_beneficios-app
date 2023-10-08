<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductsDiscount>
 */
class ProductsDiscountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => $this->faker->randomDigit,
            'user_id' => 1,
            'discount' => $this->faker->randomFloat(2, 0, 100),
            'valid_until' => $this->faker->dateTimeBetween('now', '+1 week'),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
