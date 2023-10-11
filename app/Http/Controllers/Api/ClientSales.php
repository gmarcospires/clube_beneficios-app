<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;

class ClientSales extends Controller
{
    private $clientSales;

    public function __construct(Sale $clientSales)
    {
        $this->clientSales = $clientSales;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(string $client)
    {
        $clientSales =  $this->clientSales->where('client_id', $client)
            ->paginate(10);
        if ($clientSales) {
            return $clientSales->load('client');
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $clientSales = $this->clientSales->create($request->all());

        if ($clientSales) {
            return $clientSales->load('client');
        } else {
            return response()->json(['error' => 'Erro criação'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $client, string $id)
    {
        $clientSales = $this->clientSales->where(
            [
                'client_id' => $client,
                'id' => $id
            ]
        )->first();

        if ($clientSales) {
            return $clientSales->load('client');
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $client, string $id)
    {
        $clientSales = $this->clientSales->where(
            [
                'client_id' => $client,
                'id' => $id
            ]
        )->first();

        if ($clientSales) {
            $clientSales->load('client');
            return $clientSales->update($request->all());
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $client, string $id)
    {
        $clientSales = $this->clientSales->where(
            [
                'client_id' => $client,
                'id' => $id
            ]
        )->first();


        if ($clientSales) {
            $clientSales->load('client');
            return $clientSales->update(['status' => 'cancelled']);
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }
}
