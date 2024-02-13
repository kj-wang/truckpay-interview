<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Api\V1\AuthController;
use App\Models\User;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/setup', function () {
    $credentials = [
        'email' => 'admin@admin.com',
        'password'=> 'password'
    ];

    if (!Auth::attempt($credentials)) {
        $user = new \App\Models\User();

        $user->name = 'Admin';
        $user->email = $credentials['email'];
        $user->password = Hash::make($credentials['password']);

        $user->save();

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            $adminToken = $user->createToken('admin-token', ['create', 'update', 'delete']);
            $updateToken = $user->createToken('update-token', ['create', 'update']);
            $basicToken = $user->createToken('basic-token');

            return [
                'admin' => $adminToken->plainTextToken,
                'update' => $updateToken->plainTextToken,
                'basic' => $basicToken->plainTextToken
            ];

        }
    }
});

Route::post('/signup', function (Request $request) {
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8',
        'permissions' => 'array',
    ]);

    $credentials = [
        'email' => $request->email,
        'password'=> $request->password
    ];

    if (!Auth::attempt($credentials)) {
        $user = new \App\Models\User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            $token = $user->createToken($user->email, $request->permissions)->plainTextToken;

            $user->auth = ($token);
            $user->save();

            return ['token' => $token];
        }
    }
    return response()->json(['message' => 'Failed to create user or generate token'], 500);
});


Route::get('/login', function (Request $request) {
    // Validate the request data
    $request->validate([
        'email' => 'required',
    ]);

    $email = $request->input('email');
    // Retrieve the user by email
    // $user = Auth::user();   
    // $token = $user->tokens()->where('personal_access_tokens.name', $email)->first();
    $user = User::where('email', $email)->first();

    if ($user) {
        return ['auth' => $user->auth]; // Assuming 'auth' is the name of the column
    } else {
        return response()->json(['message' => 'User not found'], 404);
    }

    // return ['token'=> $token];

    // $user = User::where('name', $email)->first();

    // // if the user exists
    // if ($user) {
    //     // return response()->json(['message'=> 'this is here'],200);
    //     $token = $user->tokens()->first();

    //     if ($token) {
    //         // Return the token in plain text
    //         return ['token' => $token->plainTextToken];
    //     }
    // }

    // If user or token not found, return an error response
    return response()->json(['error' => 'User or token not found'], 404);
});
