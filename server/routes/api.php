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

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found. If error persists, contact ' . config('app.dev_email'), 'code' => 404
    ], 404);
});

// POST /api/login
Route::post('login', [\App\Http\Controllers\Api\LoginController::class, 'login']);


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


// GET /api/products/{id}/discount
// GET /api/products/{id}/discount/{id}
//POST /api/products/{id}/discount
//PUT /api/products/{id}/discount/{id}
//DELETE /api/products/{id}/discount/{id}
//PATCH /api/products/{id}/discount/{id}
Route::apiResource('products.discount', \App\Http\Controllers\Api\ProductsDiscountController::class);


// GET /api/discount
//GET /api/discount/{id}
//POST /api/discount
//PUT /api/discount/{id}
//DELETE /api/discount/{id}
//PATCH /api/discount/{id}

Route::apiResource('discount', \App\Http\Controllers\Api\DiscountController::class);

// GET /api/clients
//GET /api/clients/{id}
//POST /api/clients
//PUT /api/clients/{id}
//DELETE /api/clients/{id}
//PATCH /api/clients/{id}
Route::apiResource('clients', \App\Http\Controllers\Api\ClientController::class);


// GET /api/clients/{id}/sales
// GET /api/clients/{id}/sales/{id}
//POST /api/clients/{id}/sales
//PUT /api/clients/{id}/sales/{id}
//DELETE /api/clients/{id}/sales/{id}
//PATCH /api/clients/{id}/sales/{id}
Route::apiResource('clients.sales', \App\Http\Controllers\Api\ClientSales::class);


// GET /api/sales
//GET /api/sales/{id}
//POST /api/sales
//PUT /api/sales/{id}
//DELETE /api/sales/{id}
//PATCH /api/sales/{id}
Route::apiResource('sales', \App\Http\Controllers\Api\SaleController::class);


Route::apiResource('sales_products', \App\Http\Controllers\Api\SaleProductController::class);
