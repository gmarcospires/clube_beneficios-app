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
        Schema::create('products_discounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users');
            $table->decimal(
                'discount',
                10,
                2
            );
            $table->timestamp('valid_until')->nullable();
            $table->enum(
                'status',
                ['active', 'inactive']
            )->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products_discounts');
    }
};
