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

        $productsDiscount =  $this->productsDiscount->paginate(10);

        if ($productsDiscount) {
            $productsDiscount->load('product');
        }

        return $productsDiscount;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $productsDiscount =  $this->productsDiscount->create($request->all());

        if ($productsDiscount) {
            $productsDiscount->load('product');
        }

        return $productsDiscount;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $productsDiscount =  $this->productsDiscount->find($id);

        if ($productsDiscount) {
            $productsDiscount->load('product');
        }

        return $productsDiscount;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $productsDiscount = $this->productsDiscount->find($id);

        if ($productsDiscount) {
            $productsDiscount->load('product');
            $productsDiscount->update($request->all());
        }

        return $productsDiscount;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $productsDiscount = $this->productsDiscount->find($id);

        if ($productsDiscount) {
            $productsDiscount->load('product');
            $productsDiscount->update(['status' => 'inactive']);
        }

        return $productsDiscount;
    }
}
