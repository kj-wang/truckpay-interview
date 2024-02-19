<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Api\V1\AuthController;
use App\Models\User;
use Illuminate\Http\Request;

use function Laravel\Prompts\password;

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

            // return ['token' => $token];
            return response(compact('user', 'token'));

        }
    }
    return response()->json(['message' => 'Failed to create user or generate token'], 500);
})->middleware('api');


Route::post('/login', function (Request $request) {
    // Validate the request data
    $request->validate([
        'email' => 'email',
        'password'=> 'required'
    ]);

    $email = $request->input('email');
    // $password = $request->input('password');

    // Retrieve the user by email
    // $user = Auth::user();   
    // $token = $user->tokens()->where('personal_access_tokens.name', $email)->first();
    $user = User::where('email', $email)->first();

    if ($user) {
        $token = $user->auth;
        $userInputPassword = $request->input('password');
        if (Hash::check($userInputPassword, $user->password)) {
            return response(compact('user', 'token'));
        } else {
            return response()->json(['error' => 'User password wrong'], 404);
        }
        // return ['auth' => $user->auth]; // 'auth' is the name of the authorization token
    }
    // If user or token not found, return an error response
    return response()->json(['error' => 'User or token not found'], 404);
});

Route::post('/logout', function (Request $request) {
    // Validate the request data
    // $user = $request->user();
    // $user->currentAccessToken()->delete();
    // If user or token not found, return an error response
    return response()->json([''], 204);
});