<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
});
