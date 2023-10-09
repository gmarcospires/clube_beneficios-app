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
        return $this->clientSales->where('client_id', $client)
            ->paginate(10)->load('client');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->clientSales->create($request->all())->load('client');
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
            $clientSales->load('client');
        }
        return $clientSales;
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
            $clientSales->update($request->all());
        }

        return $clientSales;
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
            $clientSales->update(['status' => 'cancelled']);
        }

        return $clientSales;
    }
}
