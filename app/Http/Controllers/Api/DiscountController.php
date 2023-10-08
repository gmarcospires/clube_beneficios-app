<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductsDiscount;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
   private $productsDiscount;

    public function __construct(ProductsDiscount $productsDiscount)
    {
        $this->productsDiscount = $productsDiscount;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return $this->productsDiscount->paginate(10)->load('product');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->productsDiscount->create($request->all())->load('product');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->productsDiscount->find($id)->load('product');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $productsDiscount = $this->productsDiscount->find($id)->load('product');
        $productsDiscount->update($request->all());

        return $productsDiscount;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $productsDiscount = $this->productsDiscount->find($id)->load('product');
        $productsDiscount->update(['status' => 'inactive']);
        return $productsDiscount;
    }
}
