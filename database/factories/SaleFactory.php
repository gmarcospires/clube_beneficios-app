<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_id' => $this->faker->randomElement(\App\Models\Client::pluck('id')),
            'total' => $this->faker->randomFloat(2, 100, 1000),
            'status' => $this->faker->randomElement(['pending', 'completed', 'cancelled']),
        ];
    }
}
