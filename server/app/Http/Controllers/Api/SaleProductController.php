<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\saleProduct;
use Illuminate\Http\Request;

class SaleProductController extends Controller
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
        $saleProduct = $this->saleProduct->paginate(10);

        if ($saleProduct) {
            return $saleProduct;
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $saleProduct =  $this->saleProduct->create($request->all());

        if ($saleProduct) {
            return $saleProduct;
        } else {
            return response()->json(['error' => 'Erro criação'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $saleProduct = $this->saleProduct->find($id);

        if ($saleProduct) {
            return $saleProduct->load('product');
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $saleProduct = $this->saleProduct->find($id);
        if ($saleProduct) {
            return $saleProduct->update($request->all());
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $saleProduct = $this->saleProduct->find($id);
        if ($saleProduct) {
            return $saleProduct->update(['status' => 'cancelled']);
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }
}
