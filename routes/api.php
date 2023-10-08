<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// php artisan make:model ProductsSale -mf
// php artisan make:controller Api/ProductController --resource --api
// php artisan migrate
// php artisan db:seed

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', [\App\Http\Controllers\Api\HomeController::class, 'index']);


// GET /api/products
//GET /api/products/{id}
//POST /api/products
//PUT /api/products/{id}
//DELETE /api/products/{id}
//PATCH /api/products/{id}
Route::apiResource('products', \App\Http\Controllers\Api\ProductController::class);

// GET /api/users
//GET /api/users/{id}
//POST /api/users
//PUT /api/users/{id}
//DELETE /api/users/{id}
//PATCH /api/users/{id}
Route::apiResource('users', \App\Http\Controllers\Api\UserController::class);


// GET /api/products/{id}/sales
// GET /api/products/{id}/sales/{id}
//POST /api/products/{id}/sales
//PUT /api/products/{id}/sales/{id}
//DELETE /api/products/{id}/sales/{id}
//PATCH /api/products/{id}/sales/{id}
Route::apiResource('products.discount', \App\Http\Controllers\Api\ProductsDiscountController::class);


Route::apiResource('discount', \App\Http\Controllers\Api\DiscountController::class);



