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
        return $this->user->paginate(10)->load('clients');
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

        return $this->user->create($request->all())->load('clients');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->user->find($id)->load('clients');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $this->user->find($id)->load('clients');
        $user->update($request->all());

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = $this->user->find($id)->load('clients');
        $user->delete();

        return $user;
    }
}
