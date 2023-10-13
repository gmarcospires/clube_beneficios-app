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

        $productsDiscount =  $this->productsDiscount->with('product')->with('user')->orderBy('status', 'asc')->orderBy('valid_until', 'desc')->paginate(10);


        if ($productsDiscount) {
            return $productsDiscount;
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $productsDiscount = $this->productsDiscount->where('product_id', $request->product_id)->where('status', 'active');

        if ($productsDiscount) {
            $productsDiscount->update(['status' => 'inactive']);
        }

        $productsDiscount =  $this->productsDiscount->create($request->all());

        if ($productsDiscount) {
            return $productsDiscount->load('product')->load('user');
        } else {
            return response()->json(['error' => 'Erro criação'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $productsDiscount =  $this->productsDiscount->find($id);

        if ($productsDiscount) {
            return $productsDiscount->load('product')->load('user');
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $productsDiscount = $this->productsDiscount->find($id);

        if ($productsDiscount) {
            $productsDiscount->load('product')->load('user');
            return $productsDiscount->update($request->all());
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $productsDiscount = $this->productsDiscount->find($id);

        if ($productsDiscount) {
            $productsDiscount->load('product')->load('user');
            return $productsDiscount->update(['status' => 'inactive']);
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }
}
