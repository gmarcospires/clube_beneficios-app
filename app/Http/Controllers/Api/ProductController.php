<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->product->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->product->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->product->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = $this->product->find($id);
        $product->update($request->all());

        return $product;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = $this->product->find($id);
        $product->delete();

        return $product;
    }
}
