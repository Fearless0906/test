<?php

namespace App\Contracts\Repositories;

interface UserRepositoryInterface
{
    public function all();
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
    public function attachRoles(int $userId, array $roleIds);
    public function detachRoles(int $userId, array $roleIds);
}
