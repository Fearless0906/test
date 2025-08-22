<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        \Log::info('Fetching roles');
        $roles = Role::all();
        \Log::info('Roles found:', $roles->toArray());
        return response()->json($roles, 200, [
            'Content-Type' => 'application/json',
            'Access-Control-Allow-Origin' => '*'
        ]);
    }
}
