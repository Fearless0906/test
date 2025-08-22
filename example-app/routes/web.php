<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    // Health check and CSRF token routes
    Route::get('/', function () {
        return response()->json(['message' => 'API is working']);
    })->name('api.health');

    Route::get('/csrf-token', function () {
        return response()->json(['token' => csrf_token()]);
    })->name('api.csrf');

    // Role routes
    Route::get('/roles', [RoleController::class, 'index'])->name('api.roles.index');

    // User routes
    Route::get('/users', [UserController::class, 'index'])->name('api.users.index');
    Route::post('/users', [UserController::class, 'store'])->name('api.users.store');
    Route::get('/users/{id}', [UserController::class, 'show'])->name('api.users.show');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('api.users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('api.users.destroy');
});

require __DIR__.'/auth.php';
