<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductsDiscount;
use Illuminate\Http\Request;

class ProductsDiscountController extends Controller
{
    private $productsDiscount;

    public function __construct(ProductsDiscount $productsDiscount)
    {
        $this->productsDiscount = $productsDiscount;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(string $product)
    {

        $productsDiscount =  $this->productsDiscount->where('product_id', $product);

        if ($productsDiscount) {
            return $productsDiscount->load('product');
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $productsDiscount = $this->productsDiscount->create($request->all());

        if ($productsDiscount) {
            return $productsDiscount;
        } else {
            return response()->json(['error' => 'Erro criação'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $product, string $id)
    {
        return $this->productsDiscount->where(
            [
                'product_id' => $product,
                'id' => $id
            ]
        )->first();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $product, string $id)
    {
        $productsDiscount = $this->productsDiscount->where(
            [
                'product_id' => $product,
                'id' => $id
            ]
        )->first();

        if ($productsDiscount) {
            return $productsDiscount->update($request->all());
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $product, string $id)
    {
        $productsDiscount = $this->productsDiscount->where(
            [
                'product_id' => $product,
                'id' => $id
            ]
        )->first();

        if ($productsDiscount) {
            return $productsDiscount->update(['status' => 'inactive']);
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }
}
