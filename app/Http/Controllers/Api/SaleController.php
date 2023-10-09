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
        return $this->sale->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->sale->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $sale =  $this->sale->find($id);

        if ($sale) {
            $sale->load('products');
            $sale->load('client');
        }

        return $sale;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $sale = $this->sale->find($id);
        if ($sale) {
            $sale->update($request->all());
        }

        return $sale;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $sale = $this->sale->find($id);
        $sale->update(['status' => 'cancelled']);

        return $sale;
    }
}
