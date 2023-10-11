<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    private $sale;

    public function __construct(Sale $sale)
    {
        $this->sale = $sale;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sale = $this->sale->paginate(10);

        if ($sale) {
            return $sale;
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $sale =  $this->sale->create($request->all());

        if ($sale) {
            return $sale;
        } else {
            return response()->json(['error' => 'Erro criação'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $sale =  $this->sale->find($id);

        if ($sale) {
            $sale->load('products');
            return $sale->load('client');
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $sale = $this->sale->find($id);

        if ($sale) {
            return $sale->update($request->all());
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $sale = $this->sale->find($id);

        if ($sale) {
            return $sale->update(['status' => 'cancelled']);
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }
}
