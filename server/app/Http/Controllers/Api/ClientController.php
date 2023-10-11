<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{

    private $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $client = $this->client->paginate(10);

        if ($client) {
            $client->load('user');
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }

        return $client;
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $client =  $this->client->create($request->all());

        if ($client) {
            return $client->load('user');
        } else {
            return response()->json(['error' => 'Erro criação'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $client =  $this->client->find($id);

        if ($client) {
            return $client->load('user');
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $client = $this->client->find($id);

        if ($client) {
            $client->load('user');
            return $client->update($request->all());
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $client = $this->client->find($id);

        if ($client) {
            $client->load('user');
            return $client->update(['status' => 'inactive']);
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }
}
