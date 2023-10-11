<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UserController extends Controller
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = $this->user->paginate(10);

        if ($user) {
            return $user;
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // return $this->user->create([
        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'role' => 'user',
        //     'password' => bcrypt($request->password),
        //     'remember_token' => Str::random(10),
        // ]);

        $user =  $this->user->create($request->all());

        if ($user) {
            return $user->load('clients');
        } else {
            return response()->json(['error' => 'Erro criação'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = $this->user->find($id);

        if ($user) {
            return $user->load('clients');
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $this->user->find($id);

        if ($user) {
            $user->load('clients');
            return $user->update($request->all());
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = $this->user->find($id);

        if ($user) {
            $user->load('clients');
            return $user->delete();
        } else {
            return response()->json(['error' => 'Not found'], 404);
        }
    }
}
