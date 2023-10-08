<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\saleProduct;
use Illuminate\Http\Request;

class saleProductProductController extends Controller
{
    private $saleProduct;

    public function __construct(SaleProduct $saleProduct)
    {
        $this->saleProduct = $saleProduct;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->saleProduct->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->saleProduct->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->saleProduct->find($id)->load('product');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $saleProduct = $this->saleProduct->find($id);
        $saleProduct->update($request->all());

        return $saleProduct;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $saleProduct = $this->saleProduct->find($id);
        $saleProduct->update(['status' => 'cancelled']);

        return $saleProduct;
    }
}
