<?php

namespace App\Services;

use App\Contracts\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function __construct(
        private UserRepositoryInterface $userRepository
    ) {
    }

    public function getAllUsers()
    {
        return $this->userRepository->all();
    }

    public function createUser(array $data)
    {
        // Add password hashing in service layer
        $data['password'] = Hash::make($data['password'] ?? 'password');
        return $this->userRepository->create($data);
    }

    public function updateUser(int $id, array $data)
    {
        // Hash password if it's being updated
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        return $this->userRepository->update($id, $data);
    }

    public function deleteUser(int $id)
    {
        return $this->userRepository->delete($id);
    }

    public function findUserById(int $id)
    {
        return $this->userRepository->findById($id);
    }
}
