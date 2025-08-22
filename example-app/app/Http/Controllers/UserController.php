<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use App\Models\User;
use Illuminate\Http\{JsonResponse, Request};

class UserController extends Controller
{
    public function __construct(
        private UserService $userService
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $users = $this->userService->getAllUsers();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        try {
            \Log::info('Received user creation request', $request->validated());

            $user = $this->userService->createUser($request->validated());

            \Log::info('User created successfully', ['user' => $user->toArray()]);
            return response()->json(new UserResource($user), 201);
        } catch (\Exception $e) {
            \Log::error('User creation failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->validated()
            ]);
            return response()->json([
                'message' => 'Failed to create user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, int $id): JsonResponse
    {
        try {
            \Log::info('Updating user', ['id' => $id, 'data' => $request->validated()]);

            $user = $this->userService->updateUser($id, $request->validated());

            \Log::info('User updated successfully', ['user' => $user->toArray()]);
            return response()->json(new UserResource($user));
        } catch (\Exception $e) {
            \Log::error('User update failed: ' . $e->getMessage(), [
                'exception' => $e,
                'id' => $id,
                'request' => $request->validated()
            ]);
            return response()->json([
                'message' => 'Failed to update user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            \Log::info('Deleting user', ['id' => $id]);

            $this->userService->deleteUser($id);

            \Log::info('User deleted successfully', ['id' => $id]);
            return response()->json([
                'message' => 'User deleted successfully'
            ]);
        } catch (\Exception $e) {
            \Log::error('User deletion failed: ' . $e->getMessage(), [
                'exception' => $e,
                'id' => $id
            ]);
            return response()->json([
                'message' => 'Failed to delete user',
                'error' => $e->getMessage()
            ], 500);
        }
    }    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        try {
            $user = $this->userService->findUserById($id);
            return response()->json(new UserResource($user));
        } catch (\Exception $e) {
            \Log::error('Failed to fetch user: ' . $e->getMessage(), [
                'exception' => $e,
                'id' => $id
            ]);
            return response()->json([
                'message' => 'User not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

}
