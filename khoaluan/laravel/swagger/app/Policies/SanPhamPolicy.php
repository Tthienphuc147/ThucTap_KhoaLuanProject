<?php

namespace App\Policies;

use App\User;
use App\SanPhamBanMua;
use Illuminate\Auth\Access\HandlesAuthorization;
use DB;

class SanPhamPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the san pham ban mua.
     *
     * @param  \App\User  $user
     * @param  \App\SanPhamBanMua  $sanPhamBanMua
     * @return mixed
     */
    public function id_danhgia(User $user, SanPhamBanMua $sanpham)
    {
        $count=DB::table('chi_tiet_hoa_don_xuats')
        ->join('hoa_don_xuats','chi_tiet_hoa_don_xuats.idHDX','hoa_don_xuats.id')
        ->where('idSanPham',$sanpham->id)
        ->where('idUser',$user->id)
        ->where('idTrangThai',4)
        ->count();
        $count2=is_dadanhgia($sanpham->id);
        if($count){
            if($count2==0){
                return true;
            }        
        }
        return false;


    }
    public function view(User $user, SanPhamBanMua $sanpham)
    {

    }

    /**
     * Determine whether the user can create san pham ban muas.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the san pham ban mua.
     *
     * @param  \App\User  $user
     * @param  \App\SanPhamBanMua  $sanPhamBanMua
     * @return mixed
     */
    public function update(User $user, SanPhamBanMua $sanPhamBanMua)
    {
        //
    }

    /**
     * Determine whether the user can delete the san pham ban mua.
     *
     * @param  \App\User  $user
     * @param  \App\SanPhamBanMua  $sanPhamBanMua
     * @return mixed
     */
    public function delete(User $user, SanPhamBanMua $sanPhamBanMua)
    {
        //
    }

    /**
     * Determine whether the user can restore the san pham ban mua.
     *
     * @param  \App\User  $user
     * @param  \App\SanPhamBanMua  $sanPhamBanMua
     * @return mixed
     */
    public function restore(User $user, SanPhamBanMua $sanPhamBanMua)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the san pham ban mua.
     *
     * @param  \App\User  $user
     * @param  \App\SanPhamBanMua  $sanPhamBanMua
     * @return mixed
     */
    public function forceDelete(User $user, SanPhamBanMua $sanPhamBanMua)
    {
        //
    }
}
