<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'test@example.com',
            'password' => bcrypt('12345'),
            'role' => 'admin'
        ]);

        // \App\Models\User::factory(2)->create();


        // \App\Models\Client::factory(2)->create();

        \App\Models\Product::factory(20)->create();

        // \App\Models\ProductsDiscount::factory(3)->create();

        // \App\Models\Sale::factory(5)->create();

        // \App\Models\SaleProduct::factory(5)->create();
    }
}
