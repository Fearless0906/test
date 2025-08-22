<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::with('roles')->get();
        $usersByRole = [];

        foreach ($users as $user) {
            foreach ($user->roles as $role) {
                if (!isset($usersByRole[$role->name])) {
                    $usersByRole[$role->name] = [];
                }
                $usersByRole[$role->name][] = [
                    'id' => $user->id,
                    'full_name' => $user->full_name,
                    'email' => $user->email
                ];
            }
        }

        return response()->json($usersByRole);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        try {
            \Log::info('Received user creation request', $request->all());

            // Add a default password for now
            $userData = $request->only(['full_name', 'email']);
            $userData['password'] = bcrypt('password'); // Add default password

            $user = User::create($userData);

            if ($request->has('roles')) {
                $user->roles()->attach($request->roles);
            }

            \Log::info('User created successfully', ['user' => $user->toArray()]);
            return response()->json($user->load('roles'), 201);
        } catch (\Exception $e) {
            \Log::error('User creation failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all()
            ]);
            return response()->json([
                'message' => 'Failed to create user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
