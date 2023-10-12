<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function login(Request $request)
    {
        // echo $request->all();
        auth()->attempt($request->only('email', 'password'));

        if (Auth::check()) {
            $user = $this->user->find(Auth::user()->id);
            $user->token = $user->createToken($user->email)->accessToken;
            return $user;
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
