<?php

use App\Http\Controllers\Api\V1\ChartController;
use App\Http\Controllers\Api\V1\InvoiceController;
use App\Http\Controllers\Api\V1\PatientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')
    ->get('/user', function (Request $request) {
        return $request->user();
});

// api/v1/patients
Route::group(['prefix'=> 'v1', 'namespace' => 'App\Http\Controllers\Api\V1', 'middleware' => 'auth:sanctum'], function () {
    Route::apiResource('patients', PatientController::class);
    Route::apiResource('invoices', InvoiceController::class);
    Route::apiResource('charts', ChartController::class);


    Route::post('invoices/bulk', ['uses' => 'InvoiceController@bulkStore']);
    Route::post('charts/bulk', ['uses' => 'ChartController@bulkStore']);

    // Route::middleware('web')->post('/signup');
    // Route::middleware('web')->post('/signup', [AuthController::class, 'signup']);
    // Route::middleware('web')->post('/login', [AuthController::class, ',login']);
    // Route::post('/signup', [AuthController::class, 'signup']);
});