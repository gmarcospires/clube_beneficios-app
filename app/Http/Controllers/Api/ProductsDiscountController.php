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

        return $this->productsDiscount->where('product_id', $product)
        ->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->productsDiscount->create($request->all());
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
        $productsDiscount->update($request->all());

        return $productsDiscount;
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
        $productsDiscount->update(['status' => 'inactive']);
        return $productsDiscount;
    }
}
