<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// CSRF Token route
Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});

Route::group(['middleware' => ['api']], function() {
    // Health check route
    Route::get('/', function () {
        return response()->json(['message' => 'API is working']);
    })->name('health');

    // Role routes
    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');

    // User routes
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
});
