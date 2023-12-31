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
        \App\Models\User::factory()->create([
            'name' => 'client',
            'email' => 'client@example.com',
            'password' => bcrypt('123'),
            'role' => 'user'
        ]);

        \App\Models\User::factory()->create([
            'name' => 'client 2',
            'email' => 'client2@example.com',
            'password' => bcrypt('123'),
            'role' => 'user'
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'test@example.com',
            'password' => bcrypt('12345'),
            'role' => 'admin'
        ]);

        \App\Models\User::factory(10)->create();

        \App\Models\Client::factory()->create([
            'user_id' => 1,
            'points' => 1000,
            'status' => 'active'
        ]);

        \App\Models\Client::factory()->create([
            'user_id' => 2,
            'points' => 20000,
            'status' => 'active'
        ]);

        \App\Models\Product::factory(30)->create();

        // \App\Models\ProductsDiscount::factory(3)->create();

        // \App\Models\Sale::factory(5)->create();

        // \App\Models\SaleProduct::factory(5)->create();
    }
}
