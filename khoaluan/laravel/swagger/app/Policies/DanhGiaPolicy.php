<?php

namespace App\Policies;

use App\User;
use App\DanhGia;
use Illuminate\Auth\Access\HandlesAuthorization;

class DanhGiaPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the danh gia.
     *
     * @param  \App\User  $user
     * @param  \App\DanhGia  $danhGia
     * @return mixed
     */
    public function view(User $user, DanhGia $danhGia)
    {
        return $danhGia->idUser==$user->id;
    }

    /**
     * Determine whether the user can create danh gias.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the danh gia.
     *
     * @param  \App\User  $user
     * @param  \App\DanhGia  $danhGia
     * @return mixed
     */
    public function update(User $user, DanhGia $danhGia)
    {
        //
    }

    /**
     * Determine whether the user can delete the danh gia.
     *
     * @param  \App\User  $user
     * @param  \App\DanhGia  $danhGia
     * @return mixed
     */
    public function delete(User $user, DanhGia $danhGia)
    {
        //
    }

    /**
     * Determine whether the user can restore the danh gia.
     *
     * @param  \App\User  $user
     * @param  \App\DanhGia  $danhGia
     * @return mixed
     */
    public function restore(User $user, DanhGia $danhGia)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the danh gia.
     *
     * @param  \App\User  $user
     * @param  \App\DanhGia  $danhGia
     * @return mixed
     */
    public function forceDelete(User $user, DanhGia $danhGia)
    {
        //
    }
}
