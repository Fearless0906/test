<?php

namespace App\Repositories;

use App\Models\User;
use App\Contracts\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\DB;

class UserRepository implements UserRepositoryInterface
{
    public function __construct(private User $model)
    {
    }

    public function all()
    {
        return $this->model->with('roles')->get();
    }

    public function findById(int $id)
    {
        return $this->model->with('roles')->findOrFail($id);
    }

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            $user = $this->model->create($data);
            if (isset($data['roles'])) {
                $user->roles()->attach($data['roles']);
            }
            return $user->load('roles');
        });
    }

    public function update(int $id, array $data)
    {
        $user = $this->findById($id);
        return DB::transaction(function () use ($user, $data) {
            $user->update($data);
            if (isset($data['roles'])) {
                $user->roles()->sync($data['roles']);
            }
            return $user->load('roles');
        });
    }

    public function delete(int $id)
    {
        $user = $this->findById($id);
        return DB::transaction(function () use ($user) {
            $user->roles()->detach();
            return $user->delete();
        });
    }

    public function attachRoles(int $userId, array $roleIds)
    {
        $user = $this->findById($userId);
        return $user->roles()->attach($roleIds);
    }

    public function detachRoles(int $userId, array $roleIds)
    {
        $user = $this->findById($userId);
        return $user->roles()->detach($roleIds);
    }
}
