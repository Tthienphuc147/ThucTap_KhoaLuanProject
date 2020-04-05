<?php

namespace App\Providers;
use Cart;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
        'App\User'=>'App\Policies\UserPolicy',
        'App\SanPhamBanMua'=>'App\Policies\SanPhamPolicy',
        'App\DanhGia'=>'App\Policies\DanhGiaPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::before(function ($user) {
            if($user->idQuyen==1) {
                return true;
            }
        });
      
        Gate::define('is_cart_not_empty', function () {
            return Cart::count();
        });
        Gate::define('is_admin', function ($user) {
            return $user->idQuyen == 1;
        });
        Gate::define('is_nhanvien', function ($user) {
            return $user->idQuyen == 2;
        });
        Gate::define('is_admin_or_nhanvien', function ($user) {
            return $user->idQuyen < 3;
        });
    }
}
